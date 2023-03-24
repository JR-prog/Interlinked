import { JobPosting } from '@/types/JobPost';
import { User, UserWithId } from '@/types/User';
import Link from 'next/link';
import LinkButtonNoNumber from '../Buttons/LinkButton/LinkButtonNoNumber';
import ImageOptimized from '../ImageOptimized/ImageOptimized';

const JobPostHeader = ({
  author,
  jobPost,
  currentUser,
}: {
  author?: UserWithId;
  jobPost?: JobPosting;
  currentUser?: User;
}) => {
  return (
    <div className="mb-3 flex items-center justify-start space-x-4">
      {/* <Link
        href={`/profile/${author.userId}`}
        className="flex items-center justify-start space-x-4"
      > */}
      <span>
        <ImageOptimized
          data-testid="test-coverphoto"
          className="h-8 min-h-[2rem] w-8 min-w-[2rem] rounded-full md:h-12 md:w-12"
          src={author?.profilePicture}
          alt={author?.name || author?.email || 'Author profile picture'}
          width={32}
          height={32}
        />
      </span>
      <div className="flex flex-col" data-testid="test-post-author">
        <div className="break-all text-sm md:text-lg">
          {author?.name || author?.email || 'Unknown'}
        </div>
        <div
          data-testid="test-date"
          className="text-sm font-light max-md:hidden"
        >
          {'Posted: ' +
            jobPost?.datePosted?.toDate().toLocaleString('en-US', {
              month: 'long',
              year: 'numeric',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
        <div className="text-sm font-light md:hidden">
          {'Posted: ' +
            jobPost?.datePosted?.toDate().toLocaleString('en-US', {
              month: '2-digit',
              year: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              hour12: false,
              minute: '2-digit',
            }) || 'Unknown'}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
};

export default JobPostHeader;
