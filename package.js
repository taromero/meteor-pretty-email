Package.describe({
  summary: "Send pretty emails (fork:hashbang & coffeescript free!)",
  version: "0.0.3",
  git: "https://github.com/gliesesoftware/meteor-pretty-email",
  name: "gliese:pretty-email"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');

  api.use('coffeescript');
  api.use('email');
  api.use('underscore');
  api.use('accounts-password');
  api.use('cmather:handlebars-server@0.2.0');
  
  api.addFiles(
    [
      'lib/server/pretty-emails.js',
      'lib/templates/shared/footer.handlebars',
      'lib/templates/call-to-action.handlebars'
    ], 
    'server');
  api.export && api.export('PrettyEmail', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('yogiben:pretty-emails');
});

