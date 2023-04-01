import { JobPosting, JobPostingWithId, JobType } from '@/types/JobPost';
import Card from '../Card/Card';
import CardGrid from '../Card/CardGrid';
import { GoLocation } from 'react-icons/go';
import { BsCalendar3 } from 'react-icons/bs';
import {
  AiOutlineExclamationCircle,
  AiOutlineClockCircle,
} from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../Buttons/Button';
import FileButton from '../Buttons/FileButton/FileButton';
import { Dispatch, SetStateAction, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db, typeCollection } from '@/config/firestore';

export default function Jobs({
  job,
  setJob,
  postingId,
}: {
  job: JobPosting;
  setJob: Dispatch<SetStateAction<JobPosting[]>>;
  postingId: string;
}) {
  const { currentUser, authUser } = useAuth();
  const [isEditable, setEditing] = useState<boolean>(true);
  return (
    <div className="mb-3 flex items-stretch justify-between">
      <CardGrid
        data-testid="card-grid"
        // className={`grid-cols-2 lg:grid-cols-2-1 `}
        style={{ backgroundColor: '', flex: 3 }}
      >
        {/* Post card */}
        <div className="inline-block" data-testid="job-post-card">
          <div>
            <Card className="">
              <div className="mb-7 text-sm font-light max-md:hidden">
                {job?.datePosted?.toDate().toLocaleString('en-US', {
                  month: 'long',
                  year: 'numeric',
                  day: '2-digit',
                })}
              </div>
              <Card className="mb-3">
                <div className="break-all text-2xl font-extrabold">
                  <p>{job.title}</p>
                </div>
                <div className="font-lg break-all text-2xl">
                  <p>{job.companyName}</p>
                </div>

                <Card className="mb-3">
                  <div className="mr-2 max-w-fit">
                    <p style={{ overflowWrap: 'break-word' }}>
                      {job.description}
                    </p>
                  </div>
                </Card>
                <ul
                  className="inline-flex flex-wrap"
                  data-testid="live-code-langs" // MUST CHANGE DATA-TESTID
                >
                  {job.skills.map((sk, index) => (
                    <li
                      key={index}
                      data-testid={`live-coding-lang-${index}`} // MUST CHANGE DATA-TESTID
                      className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-light"
                    >
                      {sk}
                    </li>
                  ))}
                </ul>
                <div>
                  <div className="flex gap-1">
                    <GoLocation className="text-accent-orange" /> {job.location}
                  </div>
                  <div>
                    {job.jobType === JobType.FULLTIME && (
                      <div
                        data-testid="full-time-job-display"
                        className="flex gap-1"
                      >
                        <BsCalendar3 className="text-accent-orange" />
                        Full-time
                      </div>
                    )}
                    {job.jobType === JobType.PARTTIME && (
                      <div
                        data-testid="part-time-job-display"
                        className="flex gap-1"
                      >
                        <BsCalendar3 className="text-accent-orange" />
                        Part-time
                      </div>
                    )}
                    {job.jobType === JobType.INTERNSHIP && (
                      <div
                        data-testid="internship-job-display"
                        className="flex gap-1"
                      >
                        <BsCalendar3 className="text-accent-orange" />
                        Internship
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <AiOutlineClockCircle className="text-accent-orange" />
                    <div>
                      {'Apply before ' +
                        job.deadline.toDate().toLocaleString('en-US', {
                          month: 'long',
                          year: 'numeric',
                          day: '2-digit',
                        })}
                    </div>
                  </div>
                  {job.coverLetterRequired && job.cvRequired && (
                    <div className="flex gap-1">
                      <AiOutlineExclamationCircle className="text-accent-orange" />
                      Submit with resume and cover letter
                    </div>
                  )}
                  {job.coverLetterRequired && !job.cvRequired && (
                    <div className="flex gap-1">
                      <AiOutlineExclamationCircle className="text-accent-orange" />
                      Submit with cover letter
                    </div>
                  )}
                  {!job.coverLetterRequired && job.cvRequired && (
                    <div className="flex gap-1">
                      <AiOutlineExclamationCircle className="text-accent-orange" />
                      Submit with resume
                    </div>
                  )}
                </div>
              </Card>
              {isEditable && (
                <div className="flex flex-wrap gap-3">
                  {/* Main apply button */}
                  <div>
                    <Button
                      data-testid="apply-button"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditing((curr) => !curr);
                      }}
                    >
                      Apply <FaPaperPlane className="" />
                    </Button>
                  </div>
                  {/* Quick apply to job button */}
                  <div>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        if (job.cvRequired && !currentUser.resume) {
                          alert('You need a resume to apply to this job.');
                        } else if (
                          job.coverLetterRequired &&
                          !currentUser.coverLetter
                        ) {
                          alert(
                            'You need a cover letter to apply to this job.'
                          );
                        } else {
                          setJob((jobs) => {
                            let actJob = jobs.find(
                              (tempJob) => job === tempJob
                            );
                            let newApp = {
                              applicantId: authUser.uid,
                              applicantName: currentUser.name,
                              applicantProfilePic: currentUser.profilePicture,
                              documents: [
                                currentUser?.resume,
                                currentUser?.coverLetter,
                              ],
                            };
                            actJob.applications.push(newApp);
                            return jobs;
                          });
                          updateDoc(
                            doc(
                              collection(
                                doc(db.users, job.companyId),
                                'jobPosts'
                              ),
                              postingId
                            ),
                            job
                          );
                          alert('application sent!');
                        }
                      }}
                    >
                      Quick Apply <FaPaperPlane className="" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Apply button innards */}
          {!isEditable && (
            <div className="mt-2 flex justify-start">
              <CardGrid>
                <Card>
                  <div className="mb-4 flex gap-1 text-xl font-bold text-accent-orange">
                    Job Application
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex flex-wrap gap-2">
                      <div>
                        <FileButton link={'should link to resume'}>
                          My Resume
                        </FileButton>
                      </div>
                      <div>
                        <FileButton link={'should link to cover letter'}>
                          My Cover Letter
                        </FileButton>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setEditing((curr) => !curr);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div>
                        <Button>
                          Send Application <FaPaperPlane className="ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardGrid>
            </div>
          )}
        </div>
      </CardGrid>
    </div>
  );
}
