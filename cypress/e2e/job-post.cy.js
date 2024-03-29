import { jobEmail, jobPw } from '../support/e2e';

describe('Company register and post spec', () => {
  it('registers as company and posts a job', () => {
    // register as company
    cy.visit('register');

    cy.get('input[name=email]').type(jobEmail);
    cy.get('input[name=password]').type(jobPw);
    cy.get('input[name=confirmPassword]').type(jobPw);
    cy.get('[data-testid=company-check').click();

    cy.get('[data-testid=register]').click();

    cy.get('[data-testid=welcome-msg]').should('contain', 'Welcome'); // Makes sure we made it to the profile

    cy.visit('manage-jobs');

    cy.get('[data-testid=post-card-0]').should('not.exist');

    // create job
    cy.get('[data-testid=create-new-job]').click();

    cy.get('[data-testid=new-job-title]').should(
      'contain',
      'Create a Job Posting'
    );

    cy.get('[data-testid=change-title]').type('Senior Fullstack Programer');
    cy.get('[data-testid=change-description]').type(
      'Must be able to know what a boolean is.'
    );
    cy.get('[data-testid=change-location]').type('Behind you');
    cy.get('[data-testid=change-date]').type('2099-01-01');

    // skills
    let skill = 'dream walking';
    cy.get('[data-testid=skill-add-button]').click();
    cy.get('[data-testid=skill-input-0]').type(skill);
    cy.get('[data-testid=skill-save-0]').click();

    cy.get('[data-testid=cv-check]').click();
    cy.get('[data-testid=coverletter-check]').click();
    cy.get('[data-testid=hidden-check]').click();
    cy.get('[data-testid=external-check]').click();

    cy.get('[data-testid=job-add-button]').click();
    cy.get('[data-testid=job-platform-input-0]').type('InterLinked');
    cy.get('[data-testid=job-url-input-0]').type('https://interlinked.live');
    cy.get('[data-testid=job-add-button]').click();
    cy.get('[data-testid=job-platform-input-1]').type('InterLinked2');
    cy.get('[data-testid=job-url-input-1]').type('https://interlinked2.live');
    cy.get('[data-testid=job-save-1]').click();
    cy.get('[data-testid=job-edit-1]').click();
    cy.get('[data-testid=job-delete-button-1]').click();
    cy.get('[data-testid=job-save-0]').click();

    cy.get('[data-testid=new-job-submit]').click();
    // job is now posted

    // header
    cy.get('[data-testid=post-card-0]').should('exist');
    cy.get('[data-testid=test-coverphoto]').should('exist');
    cy.get('[data-testid=test-date]').should('exist');
    cy.get('[data-testid=test-post-author]').should('exist');

    // body
    cy.get('[data-testid=job-post-title]').should(
      'contain',
      'Senior Fullstack Programer'
    );
    cy.get('[data-testid=job-post-description]').should(
      'contain',
      'Must be able to know what a boolean is.'
    );
    cy.get('[data-testid=job-post-location]').should('contain', 'Behind you');
    cy.get('[data-testid=job-post-cv]').should('contain', 'Yes');
    cy.get('[data-testid=job-post-cl]').should('contain', 'Yes');
    cy.get('[data-testid=job-post-hidden]').should('contain', 'Yes');

    // footer
    cy.get('[data-testid=job-post-applicants-0]').should('not.exist');

    cy.logout();
  });

  it('Edits a job posting and then deletes it and the company', () => {
    cy.login(jobEmail, jobPw);
    cy.visit('manage-jobs');

    // editing
    cy.get('[data-testid=job-post-edit-0]').click();
    cy.get('[data-testid=new-job-title]').should('not.exist');

    cy.get('[data-testid=change-title]').type('Intern');
    cy.get('[data-testid=change-description]').type(
      '50 years experience in bootstrap, 3 cents a day, agile'
    );
    cy.get('[data-testid=change-location]').type('OpenAI');
    cy.get('[data-testid=change-date]').type('2024-01-01');
    cy.get('[data-testid=cv-check]').click();
    cy.get('[data-testid=coverletter-check]').click();
    cy.get('[data-testid=hidden-check]').click();
    cy.get('[data-testid=external-check]').click();

    cy.get('[data-testid=edit-job-submit]').click();

    cy.get('[data-testid=job-post-title]').should('contain', 'Intern');
    cy.get('[data-testid=job-post-description]').should(
      'contain',
      '50 years experience in bootstrap, 3 cents a day, agile'
    );
    cy.get('[data-testid=job-post-location]').should('contain', 'OpenAI');
    cy.get('[data-testid=job-post-cv]').should('contain', 'No');
    cy.get('[data-testid=job-post-cl]').should('contain', 'No');
    cy.get('[data-testid=job-post-hidden]').should('contain', 'No');

    // delete posting
    cy.get('[data-testid=job-post-delete-0]').click();

    // delete account
    cy.visit('edit-profile');
    cy.get('[data-testid=danger-zone]').click({ force: true }); // in emulator mode, the button is hidden so we need to force
    cy.get('[data-testid=pw-field]').type(jobPw);
    cy.get('[data-testid=del-acc]').click();
    cy.get('[data-testid=base-msg]').should(
      'contain',
      'We will become interlinked.'
    );
  });

  it('Looks at applicants', () => {
    cy.login('realrecruiter@recruiters.com', jobPw);

    //job with no applicants
    cy.visit('manage-jobs');

    cy.get('[data-testid=post-card-0]').should('exist');
    cy.get('[data-testid=job-post-applicants-0]').click();
    cy.get('[data-testid=no-apps-msg]').should('exist');

    //job with applicants
    cy.visit('manage-jobs');

    cy.get('[data-testid=post-card-1]').should('exist');
    cy.get('[data-testid=job-post-applicants-1]').click();
    cy.get('[data-testid=no-apps-msg]').should('not.exist');
    cy.get('[data-testid=profile-card-0]').should('exist');

    cy.logout();
  });
});
