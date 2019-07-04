const approuter = require('@sap/approuter');
const fs = require('fs');

process.env.destinations = '[' +
    '{"name": "backend","url": "https://services.odata.org/V4/(S(fdng4tbvlxgzpdtpfap2rqss))/TripPinServiceRW/"}' +
    ']';

const xsAppConfig = JSON.parse(fs.readFileSync('xs-app.json', 'utf8'));
const ar = approuter();
ar.start({
    xsappConfig: xsAppConfig
});
