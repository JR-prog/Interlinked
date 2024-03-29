import type { DeleteAccountPopupChildProps } from '@/types/DeleteAccountPopup';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Button from '../Buttons/Button';
import { useTranslations } from 'next-intl';

export default function DeleteAccountPopupEmail({
  onHide,
  onDeleteAccount,
}: DeleteAccountPopupChildProps) {
  const t = useTranslations('DeleteAccountEmail');
  const [password, setPassword] = useState<string>('');
  const [incorrectPassword, setIncorrectPassword] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(true);

  const { currentUser, reauthenticateEmail } = useAuth();

  // Clear password field before closing modal
  const onHideLocal = () => {
    setOpen(false);
    setPassword('');
    setIncorrectPassword(false);
    onHide();
  };

  // Incorrect password was given if on delete returned false
  const handleDeleteClick = async () => {
    try {
      await reauthenticateEmail(currentUser.email, password);
      await onDeleteAccount();
    } catch (err) {
      setIncorrectPassword(true);
    }
  };

  return (
    <div data-testid="delete-acc-email">
      <p className="mb-1 text-red-500">{t('delete-warning')}</p>
      <h5 className="mb-1">{t('pw-prompt')}</h5>
      <input
        data-testid="pw-field"
        className="mb-3 block w-full appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
        type="password"
        placeholder={t('pw-placeholder')}
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {incorrectPassword ? (
        <p className="mb-3 text-red-500" data-testid="incorrect-pw">
          {t('bad-pw')}
        </p>
      ) : null}
      <div className="flex justify-between">
        <Button
          data-testid="del-acc"
          variant="danger"
          onClick={() => handleDeleteClick()}
        >
          {t('delete')}
        </Button>
        <Button data-testid="close-popup" onClick={onHideLocal}>
          {t('close')}
        </Button>
      </div>
    </div>
  );
}
