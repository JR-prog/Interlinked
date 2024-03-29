import { Dispatch, SetStateAction, useState } from 'react';

import { Comment, Post } from '@/types/Post';
import CommentIcon from '../Icons/CommentIcon/CommentIcon';
import LikeIcon from '../Icons/LikeIcon/LikeIcon';
import { User } from '@/types/User';

const PostFooter = ({
  comments,
  commentState,
  setCommentState,
  post,
  postID,
  currentUser,
  userID,
  postAuthorID,
  testKey,
}: {
  comments?: Comment[];
  commentState?: boolean;
  setCommentState: Dispatch<SetStateAction<boolean>>;
  post?: Post;
  postID?: string;
  currentUser?: User;
  userID?: string;
  postAuthorID?: string;
  testKey?: number;
}) => {
  return (
    <div className="my-2 flex items-center space-x-4">
      <LikeIcon
        likes={post?.likes || []}
        userID={userID}
        postID={postID}
        postAuthorID={postAuthorID}
        data-testid={`like-${testKey}`}
      />
      <CommentIcon
        data-testid={`comment-${testKey}`}
        comments={
          comments?.length === 0 || comments === null || comments === undefined
            ? 0
            : comments.length
        }
        commentState={commentState}
        setCommentState={setCommentState}
      />
    </div>
  );
};

export default PostFooter;
