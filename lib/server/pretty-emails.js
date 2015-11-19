/*global OriginalHandlebars, Meteor, Handlebars, Accounts, _ */
/* pretty emails logic */

// exported global, contains defaults and an options field
PrettyEmail = {
    options: {},
    defaults: {
        verifyEmail: {
            subject: 'Activate your account',
            heading: 'Just one more step...',
            message: 'Click on the big button below to activate your account',
            buttonText: 'Activate account'
        },
        resetPassword: {
            subject: 'Reset your password',
            heading: 'Reset your password',
            message: 'Click the big button below to reset your password',
            buttonText: 'Reset password'
        },
        enrollAccount: {
            subject: 'An account has been created for you',
            heading: 'To start using service, simply click the button below',
            buttonText: 'Change password'
        }
    },
    style: {
        fontFamily: 'Helvetica',
        fontColor: '#606060',
        buttonColor: '#FFFFFF',
        buttonBgColor: '#3071a9'
    },
    send: function (template, options) {
        return Email.send({
            from: options.from,
            to: options.to,
            subject: options.subject,
            html: this.render(template, options)
        });
    },
    render: function (template, options) {
        options.style = this.style;
        options = _.extend(this.options, options);
        return Handlebars.templates[template](options);
    }
};

/* Customise meteor email templates */

Accounts.emailTemplates.verifyEmail.html = function (user, verifyEmailUrl) {
    var options;
    options = _.extend({}, PrettyEmail.defaults.verifyEmail, {
        buttonUrl: verifyEmailUrl
    });
    return PrettyEmail.render('call-to-action', options);
};

Accounts.emailTemplates.resetPassword.html = function (user, resetPasswordUrl) {
    var options;
    options = _.extend({}, PrettyEmail.defaults.resetPassword, {
        buttonUrl: resetPasswordUrl
    });
    return PrettyEmail.render('call-to-action', options);
};

Accounts.emailTemplates.enrollAccount.html = function (user, enrollAccountUrl) {
    var options;
    options = _.extend({}, PrettyEmail.defaults.enrollAccount, {
        buttonUrl: enrollAccountUrl
    });
    return PrettyEmail.render('call-to-action', options);
};

Meteor.startup(function () {
    if (PrettyEmail.options.from) {
        return Accounts.emailTemplates.from = PrettyEmail.options.from;
    }
});

// register footer helper which adds PrettyEmail options to to context
OriginalHandlebars.registerHelper('footer', function () {
    var options;
    options = _.extend(this, PrettyEmail.options);
    if (options.companyName) {
        return Handlebars.templates.footer(options);
    }
});
