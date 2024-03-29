import Button from '@/components/Buttons/Button';
import DeleteButton from '@/components/Buttons/DeleteButton/DeleteButton';
import type { User } from '@/types/User';
import { Dispatch, SetStateAction } from 'react';
import InputField from '@/components/InputFields/Input/Input';
import type { Language } from '@/types/User';
import { useTranslations } from 'next-intl';

export default function ProfileLanguages({
  isEditable = false,
  languages,
  languagesHovering,
  newLanguage,
  setLanguages,
  setLanguagesHovering,
  setNewLanguage,
}: {
  isEditable?: boolean;
  languages: User['languages'];
  languagesHovering?: boolean[];
  newLanguage?: Language;
  addLanguages?: Dispatch<SetStateAction<boolean>>;
  setLanguages?: Dispatch<SetStateAction<User['languages']>>;
  setNewLanguages?: (Languages: User['languages']) => void;
  setLanguagesHovering?: Dispatch<SetStateAction<boolean[]>>;
  setNewLanguage?: Dispatch<SetStateAction<Language>>;
}) {
  const t = useTranslations('Profile.Languages');
  // every language string ends with a number from 1-5 that represents proficiency
  if (!isEditable) {
    if (!languages || !languages[0]) return;

    return (
      <div className="mb-7">
        <h2 className="mb-2 text-2xl font-extrabold">{t('languages')} 🗨 </h2>
        <ul className="inline-flex flex-wrap" data-testid="live-lang-profile">
          {languages.map((lang, index) => (
            <li
              key={index}
              data-testid={`live-lang-${index}`}
              className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-semibold"
            >
              {lang.title}
              {lang.proficiency && ' (' + lang.proficiency + ')'}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mb-3">
      <h2 className="text-2xl font-extrabold">{t('languages')} 🗨 </h2>
      {languages?.map((lang, index) => (
        <div key={index}>
          <ul className="inline-flex">
            <li>
              <form
                data-testid="editable-lang-form"
                action=""
                className="mb-3 mt-1 mr-3 flex max-w-fit flex-wrap items-start justify-between rounded-xl bg-white bg-opacity-[8%] p-3 text-lg font-semibold"
                onSubmit={(e) => {
                  e.preventDefault();
                  setLanguagesHovering((langedits) =>
                    langedits.map((lang, i) => (i === index ? !lang : lang))
                  );
                }}
              >
                {languagesHovering && languagesHovering[index] ? (
                  // On hover, reveal delete button and proficiency options
                  <div>
                    <div
                      data-testid={`lang-hovering-parent-${index}`}
                      className="relative"
                      onMouseLeave={(e) => {
                        e.preventDefault();
                        setLanguagesHovering((langhover) =>
                          langhover.map((lang, i) =>
                            index === i ? !lang : lang
                          )
                        );
                      }}
                    >
                      <div
                        data-testid={`lang-hovering-lang-name-${index}`}
                        onMouseOver={(e) => {
                          e.preventDefault();
                          setLanguagesHovering((langhover) =>
                            langhover.map((lang, i) =>
                              index === i ? true : false
                            )
                          );
                        }}
                      >
                        {lang.title}
                        {lang.proficiency && ' (' + lang.proficiency + ')'}
                      </div>
                      <div className="absolute -top-1 -right-52 items-center">
                        <DeleteButton
                          data-testid={`lang-hovering-delete-${index}`}
                          size={18}
                          onClick={(e) => {
                            e.preventDefault();
                            setLanguages((langs) =>
                              langs.filter((_, i) => index !== i)
                            );
                            setLanguagesHovering((langedits) =>
                              langedits.filter((_, i) => index !== i)
                            );
                          }}
                          onMouseOver={(e) => {
                            e.preventDefault();
                            setLanguagesHovering((langhover) =>
                              langhover.map((_, i) =>
                                index === i ? true : false
                              )
                            );
                          }}
                        />
                        <select
                          onMouseOver={(e) => {
                            e.preventDefault();
                            setLanguagesHovering((langhover) =>
                              langhover.map((_, i) =>
                                index === i ? true : false
                              )
                            );
                          }}
                          onChange={(e) =>
                            setLanguages((langs) => {
                              let tempArr = [...langs];
                              tempArr[index].proficiency = e.target.value;
                              return tempArr;
                            })
                          }
                          name="proficiency"
                          id="proficiency-select"
                          data-testid={`select-proficiency-${index}`}
                          className="m-2 inline-block min-h-[30px] appearance-none rounded border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                        >
                          {languages[index].proficiency === '1' ? (
                            <option value="1" selected>
                              {t('elementary')}
                            </option>
                          ) : (
                            <option value="1">{t('elementary')}</option>
                          )}
                          {languages[index].proficiency === '2' ? (
                            <option value="2" selected>
                              {t('limited-working')}
                            </option>
                          ) : (
                            <option value="2">{t('limited-working')}</option>
                          )}
                          {languages[index].proficiency === '3' ? (
                            <option value="3" selected>
                              {t('pro-working')}
                            </option>
                          ) : (
                            <option value="3">{t('pro-working')}</option>
                          )}
                          {languages[index].proficiency === '4' ? (
                            <option value="4" selected>
                              {t('full-pro')}
                            </option>
                          ) : (
                            <option value="4">{t('full-pro')}</option>
                          )}
                          {languages[index].proficiency === '5' ? (
                            <option value="5" selected>
                              {t('native')}
                            </option>
                          ) : (
                            <option value="5">{t('native')}</option>
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    data-testid={`lang-not-hovering-${index}`}
                    onMouseOver={(e) => {
                      e.preventDefault();
                      setLanguagesHovering((langhover) =>
                        langhover.map((lang, i) => (index === i ? true : false))
                      );
                    }}
                  >
                    {lang.title}
                    {lang.proficiency && ' (' + lang.proficiency + ')'}
                  </div>
                )}
              </form>
            </li>
          </ul>
        </div>
      ))}
      {/* Add new Language, appears after all coding languages */}
      <InputField
        name="newLanguage"
        className="flex max-w-xs"
        id="newLanguage"
        data-testid="new-lang-input"
        value={newLanguage.title}
        onChange={(e) =>
          setNewLanguage({ title: e.target.value, proficiency: '1' })
        }
      />
      <Button
        className="inline"
        data-testid="new-lang-button"
        onClick={() => {
          newLanguage.title.length > 0 &&
            setLanguages((langs) => [...langs, newLanguage]);
          setNewLanguage({ title: '' });
          setLanguagesHovering((langhovers) => [...langhovers, false]);
        }}
      >
        {t('add-new')}
      </Button>
    </div>
  );
}
