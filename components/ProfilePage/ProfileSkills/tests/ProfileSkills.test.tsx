import '@testing-library/jest-dom';
import { fireEvent, waitFor } from '@testing-library/react';
import ProfileSkills from '../ProfileSkills';
import { render } from '@/renderWrapper';

it('renders skills given user', async () => {
  const { findByText } = render(
    <ProfileSkills skills={['coding', 'juggling', 'eating']} />
  );
  const skillCode = await findByText('coding', { exact: false });
  const skillJug = await findByText('juggling', { exact: false });
  const skillEat = await findByText('eating', { exact: false });

  expect(skillCode).toBeInTheDocument();
  expect(skillJug).toBeInTheDocument();
  expect(skillEat).toBeInTheDocument();
});

it('can save a skill', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileSkills
      skills={['dancing']}
      isEditable={true}
      // skillsEditing={[true]}
      setSkillsEditing={mockSet}
    />
  );
  const skillsForm = await findByTestId('skills-form');
  fireEvent.submit(skillsForm);
  await waitFor(() => expect(mockSet).toBeCalled());
});

it('can modify a skill', async () => {
  const mockSet = jest.fn();
  const { findByTestId } = render(
    <ProfileSkills
      skills={['dancing']}
      isEditable={true}
      skillsEditing={[true]}
      setSkills={mockSet}
    />
  );
  const editBox = await findByTestId('skill-input-0');
  fireEvent.change(editBox, { target: { value: 'karaoke' } });
  await waitFor(() => expect(mockSet).toBeCalled());
});

it('can edit an existing skill', async () => {
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileSkills
      skills={['dancing']}
      isEditable={true}
      // skillsEditing={[true]}
      setSkillsEditing={mockClick}
    />
  );
  const editButton = await findByTestId('skill-edit-0');
  fireEvent.click(editButton);
  await waitFor(() => expect(mockClick).toBeCalled());
});

it('can delete an existing skill', async () => {
  const mockSet = jest.fn();
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileSkills
      skills={['dancing']}
      isEditable={true}
      skillsEditing={[true]}
      setSkills={mockSet}
      setSkillsEditing={mockClick}
    />
  );
  const deleteButton = await findByTestId('skill-delete-button-0');
  fireEvent.click(deleteButton);
  await waitFor(() => expect(mockSet).toBeCalled());
  await waitFor(() => expect(mockClick).toBeCalled());
});

it('can add a skill', async () => {
  const mockSet = jest.fn();
  const mockClick = jest.fn();
  const { findByTestId } = render(
    <ProfileSkills
      skills={['dancing']}
      isEditable={true}
      skillsEditing={[true]}
      setSkills={mockSet}
      setSkillsEditing={mockClick}
    />
  );
  const addButton = await findByTestId('skill-add-button');
  fireEvent.click(addButton);
  await waitFor(() => expect(mockSet).toBeCalled());
  await waitFor(() => expect(mockClick).toBeCalled());
});
