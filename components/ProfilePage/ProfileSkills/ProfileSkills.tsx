import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import { useTranslations } from 'next-intl';

export default function ProfileSkills({
  skills,
  isEditable = false,
  skillsEditing,
  setSkillsEditing,
  setSkills,
}: {
  skills: User['skills'];
  isEditable?: boolean;
  skillsEditing?: boolean[];
  setSkillsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setSkills?: Dispatch<SetStateAction<User['skills']>>;
}) {
  const t = useTranslations('Profile.Skills');
  // Live version of skills component
  if (!isEditable) {
    if (!skills || !skills[0]) return;

    return (
      <div className="mb-7">
        <h2 className="mb-2 text-2xl font-extrabold">{t('skills')} 💪</h2>
        <ul className="inline-flex flex-wrap">
          {skills.map((skill, index) => (
            <p
              data-testid={`live-skill-${index}`}
              key={index}
              className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-semibold"
            >
              {skill}
            </p>
          ))}
        </ul>
      </div>
    );
  }
  // editable version
  return (
    <div className="mb-3">
      <h2 className="text-2xl font-extrabold">{t('skills')} 💪</h2>
      {skills.map((skill, index) => (
        <form
          action=""
          data-testid="skills-form"
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSkillsEditing((skeditds) =>
              skeditds.map((ski, i) => (i === index ? !ski : ski))
            );
          }}
        >
          {skillsEditing && skillsEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                Skill <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`skill-input-${index}`}
                type="text"
                name="skill"
                id="profileSkill"
                value={skill}
                onChange={(e) =>
                  setSkills((s) => {
                    let tempArr = [...s];
                    tempArr[index] = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
            </div>
          ) : (
            <p className="self-center text-xl" key={index}>
              {skill}
            </p>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit skill button */}
              {skillsEditing && skillsEditing[index] ? (
                <Button
                  data-testid={`skill-save-${index}`}
                  className="mr-2"
                  type="submit"
                >
                  Save Skill
                </Button>
              ) : (
                <EditButton
                  data-testid={`skill-edit-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSkillsEditing((skeditds) =>
                      skeditds.map((skill, i) => (i === index ? !skill : skill))
                    );
                  }}
                />
              )}
              {/* External delete skill button */}
              <DeleteButton
                data-testid={`skill-delete-button-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setSkills((s) => s.filter((_, i) => index !== i));

                  setSkillsEditing((skeditds) =>
                    skeditds.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new skills, appears after all skill list */}
      {isEditable && (
        <Button
          className="inline"
          data-testid="skill-add-button"
          onClick={() => {
            // Append new empty skill to current array of skills
            setSkills((s) => [...s, '']);

            setSkillsEditing((skeditds) => [...skeditds, true]);
          }}
        >
          {t('add-new')}
        </Button>
      )}
    </div>
  );
}
