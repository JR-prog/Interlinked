import Button from '@/components/Buttons/Button';
import PostButton from '@/components/Buttons/PostButton/PostButton';
import { useAuth } from '@/contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import type { User } from '@/types/User';
import Link from 'next/link';
import { useState } from 'react';

export default function CreatePost(props: any) {
  const { currentUser } = useAuth();
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    props.getText(message);
    setMessage('');
  };

  return (
    <>
      <div className="  font-para-med ">
        <div className=" w-full  rounded-lg bg-purple-component p-4 px-7 font-para-med shadow-lg ">
          <div className="flex flex-row gap-3 pb-2">
            <div data-testid="profile-pic">
              {currentUser.coverPhoto == null ? (
                <FaUserCircle data-testid="placeholder-pic" size="2em" />
              ) : (
                currentUser.coverPhoto
              )}
            </div>

            <div>
              <h1 className="font-para-heavy text-2xl font-bold">
                Create a Post{' '}
              </h1>
              <h4>Write anything to your heart's content</h4>
            </div>
          </div>
          <div>
            <form>
              <textarea
                id="message"
                data-testid="post-content"
                className="   row-span-4 h-[10rem] w-full rounded-lg bg-purple-text-area p-1 text-sm text-white shadow-lg "
                placeholder="Write text here..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </form>
          </div>

          <div className="flex justify-end">
            <button
              className="flex grow justify-end  "
              data-testid="post-button"
              onClick={handleSubmit}
            >
              <PostButton></PostButton>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}