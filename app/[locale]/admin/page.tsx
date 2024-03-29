'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiBell } from 'react-icons/fi';
import { Report } from '@/types/Report';
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';
import ReportList from '@/components/Report/ReportList';
import Link from '@/components/Link/Link';
import Button from '@/components/Buttons/Button';
import LoadingScreen from '@/components/Loading/Loading';
import { useTranslations, useLocale } from 'next-intl';

const Admin = () => {
  const t = useTranslations('Admin');
  const router = useRouter();
  const locale = useLocale();
  const { authUser, currentAdmin, currentUser } = useAuth();

  // Uncomment for implementation
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState<Report[]>();

  useEffect(() => {
    // if not logged in, redirect to home page
    if (!currentAdmin) {
      router.push('/' + locale + '/');
    }

    // if account is locked or timed out, redirect to locked page
    if (currentUser?.accountLocked || currentUser?.accountTimeout) {
      router.push('/' + locale + '/locked');
    }

    // get all the reports of the admin and sort them by date most recent first
    async function getReports() {
      if (currentAdmin) {
        const res = await getDocs(
          query(
            typeCollection<Report>(
              collection(doc(db.users, authUser.uid), 'report')
            ),
            orderBy('reportTime', 'desc')
          )
        );
        return res.docs.map((resData) => resData.data());
      }
      return [];
    }

    // set the reports of the admin
    getReports().then((rep) => {
      setReports(rep);
      setLoading(false);
    });
  }, [currentAdmin, router, authUser, currentUser]);

  // mark all the admins's reports as read
  async function readAll() {
    const reportCollectionReference = typeCollection<Report>(
      collection(doc(db.users, authUser.uid), 'report')
    );
    const allReports = await getDocs(reportCollectionReference);
    allReports.forEach(async (rep) => {
      await updateDoc(
        doc(collection(doc(db.users, authUser.uid), 'report'), rep.id),
        {
          read: true,
        }
      );
    });

    // set the notifications to a new value
    setReports((curr) =>
      curr.map((rep) => ({
        ...rep,
        read: true,
      }))
    );
  }

  return (
    <div className="container mx-auto text-white" data-testid="admin-home">
      <div className="mb-3 justify-between sm:flex">
        <h1 className="my-2 text-3xl font-extrabold sm:my-0">{t('reports')}</h1>
        <Link href={'/admin/lockedList'}>
          <Button data-testid="list-of-banned-users-btn my-2 sm:my-0">
            {t('list-banned')}
          </Button>
        </Link>
        <div>
          <button
            data-testid="read-all-button"
            onClick={() => {
              readAll();
            }}
          >
            <div className="my-2 flex items-center gap-2 rounded-xl bg-white bg-opacity-[8%] p-3 sm:my-0">
              <FiBell />
              <p>{t('read-all')}</p>
            </div>
          </button>
        </div>
      </div>
      <div className="rounded-xl bg-white bg-opacity-[8%] p-5">
        {loading && <LoadingScreen />}
        {reports?.length > 0 ? (
          <ReportList reports={reports} setReports={setReports} />
        ) : (
          <p data-testid="no-reports">{t('empty')}</p>
        )}
      </div>
    </div>
  );
};

export default Admin;
