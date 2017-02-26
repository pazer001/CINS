const cron      =   require('node-cron');
const moment    =   require('moment');
const media     =   require('./Media/media');
media.init();
let mediaCron   =   cron.schedule('*/60 * * * *', () => {
    console.log('Start Media: ', moment().format("dddd, MMMM Do YYYY, h:mm:ss a"));
    media.init();
});

mediaCron.start();