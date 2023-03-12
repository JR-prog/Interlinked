import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MessageCard from '../MessageCard';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case

it('renders with name not equal', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: 'SOMEThING',
    };
  });

  const { findByText } = render(
    <MessageCard
      message={{
        content: 'hi',
        sender: {
          name: 'me',
          profilePicture:
            'gs://interlinked-420e3.appspot.com/`image/1637773583.png`',
        },
        time_stamp: Timestamp.now(),
      }}
    />
  );

  const messageCard = await findByText('hi');
  expect(messageCard).toBeInTheDocument();
});

it('renders with name equal', async () => {
  mockedUseAuth.mockImplementation(() => {
    return {
      currentUser: 'me',
    };
  });

  const { findByText } = render(
    <MessageCard
      message={{
        content: 'hi',
        sender: {
          name: 'me',
          profilePicture:
            'gs://interlinked-420e3.appspot.com/`image/1637773583.png`',
        },
        time_stamp: Timestamp.now(),
      }}
    />
  );

  const messageCard = await findByText('hi');
  expect(messageCard).toBeInTheDocument();
});