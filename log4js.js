const log4js = require('log4js');
log4js.configure({
    appenders: {
        common: { type: 'file', filename: 'applogs/log.log' },
        domains : { type: 'file', filename: 'applogs/domains.log', maxLogSize: 1048576 },
        email: { type: 'file', filename: 'applogs/email.log', maxLogSize: 1048576 }
        },
    categories: {
        default: { appenders: ['common'], level: 'info' },
        email: { appenders: ['email'], level: 'info'},
        domains: { appenders: ['domains'], level: 'info' }
    }
});
const  logger_domains = log4js.getLogger('domains');
const  logger_email = log4js.getLogger('email');
exports.logger_domains = logger_domains;
exports.logger_email = logger_email;