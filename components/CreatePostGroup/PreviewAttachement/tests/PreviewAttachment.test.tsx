import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import PreviewAttachement from '../PreviewAttachement';

it('renders', async () => {
  const { findByText } = render(<PreviewAttachement />);

  const previewAttachmentPrompt = await findByText('Preview Attachments');
  expect(previewAttachmentPrompt).toBeInTheDocument();
});