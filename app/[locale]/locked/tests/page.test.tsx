import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import { render } from '@/renderWrapper';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Locked from '../page';

jest.mock('contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock<any>; // make useAuth modifiable based on the test case
const mockedRouter = useRouter as jest.Mock<any>;

describe('Locked', () => {
  const routerPushMock = jest.fn();
  const currentUserMock = {
    name: 'Testy Test',
    email: 'testy.test@example.com',
    accountLocked: true,
    accountTimeout: false,
  };
  const useAuthMock = {
    authUser: { uid: '123' },
    currentUser: currentUserMock,
    logout: jest.fn(),
  };

  beforeEach(() => {
    mockedRouter.mockReturnValue({ push: routerPushMock });
    mockedUseAuth.mockReturnValue(useAuthMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to home page if account is not locked, timed out, or not logged in', () => {
    useAuthMock.currentUser = null;

    render(<Locked />);

    expect(routerPushMock).toHaveBeenCalledWith('/');
  });

  it('redirects to home page if account is not locked or timed out', () => {
    useAuthMock.currentUser = {
      ...currentUserMock,
      accountLocked: false,
      accountTimeout: false,
    };

    render(<Locked />);

    expect(routerPushMock).toHaveBeenCalledWith('/');
  });

  it('shows locked message if account is locked', () => {
    useAuthMock.currentUser = {
      ...currentUserMock,
      accountLocked: true,
    };
    const { getByTestId } = render(<Locked />);

    expect(getByTestId('welcome-msg')).toHaveTextContent(
      `Welcome, ${currentUserMock.name}. Look's like you were up to no good. Your account has been locked. Uh oh 😢`
    );
  });

  it('shows timed out message if account is timed out', () => {
    useAuthMock.currentUser = {
      ...currentUserMock,
      accountLocked: false,
      accountTimeout: true,
    };
    const { getByTestId } = render(<Locked />);

    expect(getByTestId('welcome-msg')).toHaveTextContent(
      `Welcome, ${currentUserMock.name}. Look's like you were up to no good. You are in timeout for 0 mins. Uh oh 😢`
    );
  });

  it('logs out user if return to homepage button is clicked', () => {
    const { getByTestId } = render(<Locked />);

    fireEvent.click(getByTestId('timeout-account-logout'));

    expect(useAuthMock.logout).toHaveBeenCalled();
  });
});
