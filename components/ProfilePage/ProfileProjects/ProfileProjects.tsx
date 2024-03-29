import Button from '@/components/Buttons/Button';
import type { User } from '@/types/User';
import EditButton from '@/components/Buttons/EditButton/EditButton';
import { Dispatch, SetStateAction } from 'react';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import InputField from '@/components/InputFields/Input/Input';
import TextArea from '@/components/InputFields/TextArea/TextArea';
import { Timestamp } from 'firebase/firestore';
import Link from '@/components/Link/Link';

import CardStack from '@/components/CardStack/CardStack';
import ImageOptimized from '@/components/ImageOptimized/ImageOptimized';
import { useTranslations } from 'next-intl';

export default function ProfileProjects({
  projects,
  isEditable = false,
  projectsEditing,
  setProjectsEditing,
  setProjects,
}: {
  projects: User['projects'];
  isEditable?: boolean;
  projectsEditing?: boolean[];
  setProjectsEditing?: Dispatch<SetStateAction<boolean[]>>;
  setProjects?: Dispatch<SetStateAction<User['projects']>>;
}) {
  const t = useTranslations('Profile.Projects');

  if (!isEditable) {
    if (!projects || !projects[0]) return;

    return (
      <div className="mb-10">
        <h2 className="text-2xl font-extrabold">{t('projects')} 🛠</h2>
        <CardStack>
          {projects.map((proj, index) => (
            <div key={index} data-testid={`live-proj-${index}`}>
              <h3>{proj.title}</h3>
              <h6>
                {proj.startDate.toDate().getFullYear()} -{' '}
                {proj.endDate ? proj.endDate.toDate().getFullYear() : 'present'}
              </h6>
              <div>{proj.description}</div>
              <div className="flex gap-2">
                {proj.repoLink && (
                  <div>
                    <Link
                      data-testid={`live-proj-repo-${index}`}
                      href={proj.repoLink}
                    >
                      <Button>{t('view-repo')}</Button>
                    </Link>
                  </div>
                )}
                {proj.demoLink && (
                  <div>
                    <Link
                      data-testid={`live-proj-demo-${index}`}
                      href={proj.demoLink}
                    >
                      <Button>{t('view-demo')}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </CardStack>
      </div>
    );
  }
  return (
    <div className="mb-3">
      <h2 className="text-2xl font-extrabold">{t('projects')} 🛠</h2>
      {projects.map((project, index) => (
        <form
          action=""
          key={index}
          className="mb-3 flex flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-5"
          onSubmit={(e) => {
            e.preventDefault();
            setProjectsEditing((proedits) =>
              proedits.map((proj, i) => (i === index ? !proj : proj))
            );
          }}
        >
          {projectsEditing && projectsEditing[index] ? (
            <div className="mr-2 mb-3">
              <label>
                {t('title')} <span className="text-yellow-600">*</span>
              </label>
              <InputField
                data-testid={`edit-proj-title-${index}`}
                type="text"
                name="project"
                id="profileProject"
                value={project.title}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].title = e.target.value;
                    return tempArr;
                  })
                }
                required
              />
              <p>{t('description')}</p>
              <TextArea
                data-testid={`edit-proj-description-${index}`}
                name="info"
                value={project.description}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].description = e.target.value;
                    return tempArr;
                  })
                }
              />
              <div className="flex flex-wrap gap-2">
                <div className="w-full">
                  <label>
                    {t('start-date')} <span className="text-yellow-600">*</span>
                  </label>
                  <InputField
                    data-testid={`edit-proj-startDate-${index}`}
                    type="date"
                    name="startdate"
                    value={project.startDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setProjects((pro) => {
                        if (!e.target.valueAsDate) return pro;

                        let tempArr = [...pro];
                        tempArr[index].startDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    max={project.endDate?.toDate().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="w-full">
                  <label>{t('end-date')}</label>
                  <InputField
                    data-testid={`edit-proj-endDate-${index}`}
                    type="date"
                    name="enddate"
                    value={project.endDate
                      ?.toDate()
                      .toISOString()
                      .substring(0, 10)}
                    onChange={(e) =>
                      setProjects((pro) => {
                        let tempArr = [...pro];
                        tempArr[index].endDate = Timestamp.fromDate(
                          e.target.valueAsDate
                        );
                        return tempArr;
                      })
                    }
                    min={
                      project.startDate?.toDate().toISOString().split('T')[0]
                    }
                  />
                </div>
              </div>
              <label> {t('repo-link')} </label>
              <InputField
                data-testid={`edit-proj-repoLink-${index}`}
                type="link"
                name="repoLink"
                value={project.repoLink}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].repoLink = e.target.value;
                    return tempArr;
                  })
                }
              ></InputField>
              <label> {t('demo-link')} </label>
              <InputField
                data-testid={`edit-proj-demoLink-${index}`}
                type="link"
                name="demolink"
                value={project.demoLink}
                onChange={(e) =>
                  setProjects((pro) => {
                    let tempArr = [...pro];
                    tempArr[index].demoLink = e.target.value;
                    return tempArr;
                  })
                }
              ></InputField>
            </div>
          ) : (
            <div data-testid="editable-proj">
              <h3>{project.title}</h3>
              <h6>
                {project.startDate.toDate().getFullYear()} -{' '}
                {project.endDate
                  ? project.endDate.toDate().getFullYear()
                  : 'present'}
              </h6>
              <div>{project.description}</div>
              <div className="flex gap-2">
                {project.repoLink && (
                  <div>
                    <Link href={project.repoLink}>
                      <Button>{t('view-repo')}</Button>
                    </Link>
                  </div>
                )}
                {project.demoLink && (
                  <div>
                    <Link href={project.demoLink}>
                      <Button>{t('view-demo')}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
          {isEditable && (
            <div className="flex items-center">
              {/* External edit project button */}
              {projectsEditing && projectsEditing[index] ? (
                <Button
                  className="mr-2"
                  type="submit"
                  data-testid={`proj-save-button-${index}`}
                >
                  {t('save')}
                </Button>
              ) : (
                <EditButton
                  data-testid={`proj-edit-button-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setProjectsEditing((proedits) =>
                      proedits.map((proj, i) => (i === index ? !proj : proj))
                    );
                  }}
                />
              )}
              {/* External delete project button */}
              <DeleteButton
                data-testid={`proj-delete-button-${index}`}
                onClick={(e) => {
                  e.preventDefault();
                  setProjects((pro) => pro.filter((_, i) => index !== i));

                  setProjectsEditing((proedits) =>
                    proedits.filter((_, i) => index !== i)
                  );
                }}
              />
            </div>
          )}
        </form>
      ))}
      {/* Adding new skills, appears after all project list */}
      {isEditable && (
        <Button
          data-testid="proj-add-button"
          className="inline"
          onClick={() => {
            // Append new empty skill to current array of projects
            setProjects((pro) => [
              ...pro,
              {
                title: '',
                description: '',
                repoLink: '',
                demoLink: '',
                startDate: Timestamp.now(),
                image: '',
              },
            ]);

            setProjectsEditing((proedits) => [...proedits, true]);
          }}
        >
          {t('add-new')}
        </Button>
      )}
    </div>
  );
}
