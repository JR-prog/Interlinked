import { useAuth } from '@/contexts/AuthContext';
import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';

import { Timestamp } from 'firebase/firestore';
import CommentHeader from '../CommentHeader';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('config/firebase', () => ({
  storage: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  getStorage: jest.fn(),
  getDownloadURL: jest.fn(),
  ref: jest.fn(),
  uploadBytesResumable: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  collection: () => {
    return {
      withConverter: jest.fn(),
    };
  },
}));

let mockedDate = {
  toDate: () => {
    return new Date();
  },
} as unknown as Timestamp;

const comment = {
  authorID: '',
  author: 'test_author',
  content: '',
  date: mockedDate,
};

const unknown_comment = {
  authorID: '',
  author: 'Unknown',
  content: '',
  date: mockedDate,
};

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
it('renders author in header for given comment', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {},
    };
  });
  const { findByText } = render(<CommentHeader comment={comment} />);

  const commentAuthor = await findByText('test_author', { exact: false });
  expect(commentAuthor).toBeInTheDocument();
});

it('renders unknown author in header for given comment', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {},
    };
  });
  const { findByText } = render(<CommentHeader comment={unknown_comment} />);

  const commentNoAuthor = await findByText('Unknown', { exact: false });
  expect(commentNoAuthor).toBeInTheDocument();
});

it('renders date for given comment', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {},
    };
  });
  const { findByTestId } = render(<CommentHeader comment={comment} />);

  const commentDate = await findByTestId('test-comment-date');
  expect(commentDate).toBeInTheDocument();
});

it('renders no date for given comment', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {},
      currentUser: {},
    };
  });
  const { findByTestId } = render(<CommentHeader />);

  const commentNoDate = await findByTestId('test-comment-date');
  expect(commentNoDate).toBeInTheDocument();
});

it('renders link button no number', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      authUser: {
        uid: 'notPosterID',
      },
      currentUser: {},
    };
  });
  const { findByTestId } = render(<CommentHeader />);

  const linkButtonNoNumber = await findByTestId('link-btn-no-number');
  expect(linkButtonNoNumber).toBeInTheDocument();
});
