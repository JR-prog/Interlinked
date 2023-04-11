import { Dispatch, SetStateAction, useState } from 'react';
import Button from '../Buttons/Button';
import { JobPosting, JobPostingWithId } from '@/types/JobPost';
import { typeCollection, db } from '@/config/firestore';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import Link from '@/components/Link/Link';

const PostFooter = ({
  jobPost,
  edits,
  setEdits,
  setJobArray,
  testKey,
}: {
  jobPost: JobPostingWithId;
  edits: boolean;
  setEdits: Dispatch<SetStateAction<boolean>>;
  setJobArray: Dispatch<SetStateAction<JobPostingWithId[]>>;
  testKey: number;
}) => {
  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this job post?')) {
      setJobArray((curr) => {
        return curr.filter((job) => job.postingId !== jobPost.postingId);
      });

      await deleteDoc(
        doc(
          typeCollection<JobPosting>(
            collection(doc(db.users, jobPost.companyId), 'jobPosts')
          ),
          jobPost.postingId
        )
      );
    }
    return;
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      <Button
        data-testid={`job-post-edit-${testKey}`}
        onClick={() => {
          if (edits && confirm('All unsaved changes will be lost!')) {
            setEdits((curr) => !curr);
          } else if (!edits) setEdits((curr) => !curr);
        }}
      >
        Edit Job Posting
      </Button>
      {/* TODO: Do view applicants when applications are being worked on */}
      <Link href={`manage-jobs/${jobPost.postingId}`}>
        <Button data-testid={`job-post-applicants-${testKey}`}>
          View Applicants
        </Button>
      </Link>
      <Button
        variant="danger"
        data-testid={`job-post-delete-${testKey}`}
        onClick={handleDelete}
      >
        Delete Job Posting
      </Button>
    </div>
  );
};

export default PostFooter;
