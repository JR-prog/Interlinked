import '@testing-library/jest-dom';
import { render } from '@/renderWrapper';
import RemoveImageButton from '../RemoveImageButton';

it('render remove image button', async () => {
  const { findByTestId } = render(<RemoveImageButton />);

  const removeImageButton = await findByTestId('remove-image-button', {
    exact: false,
  });
  expect(removeImageButton).toBeInTheDocument();
});
