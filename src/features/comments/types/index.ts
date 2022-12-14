import { Dispatch, SetStateAction } from 'react';
import { UserType } from 'users/types';

export type Comment = {
  id: string;
  author: {
    name: string;
    image: string;
  };
  body: string;
  postedAt: string;
};

export type CommentListsProps = {
  articleId: string;
  commentLists: Comment[];
  setCommentLists: Dispatch<SetStateAction<Comment[]>>;
};

export type CommentItemProps = {
  comment: Comment;
  setCommentLists: Dispatch<SetStateAction<Comment[]>>;
};

export type CommentType = {
  id: string;
  attributes: {
    body: string;
    created_at: string;
  };
  relationships: {
    user: {
      data: {
        id: string;
        type: string;
      };
    };
  };
  type: 'comment';
};

export type ResponseCommentType = {
  data: CommentType[] | [];
  included: UserType[];
};

export type ResponsePostCommentType = {
  data: CommentType;
  included: UserType[];
};
