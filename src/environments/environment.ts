// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  contactsUrl: 'http://localhost:50274/api/contacts',
  companiesUrl: 'http://localhost:50274/api/companies',
  projectsUrl: 'http://localhost:50274/api/projects',
  productsUrl: 'http://localhost:50274/api/products',
  employmentsUrl: 'http://localhost:50274/api/employments',
  commandsUrl: 'http://localhost:50274/api/commands' // change to eventsource if you want to try posting to the eventsource backend
};
