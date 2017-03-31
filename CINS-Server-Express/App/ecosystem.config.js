module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
      {
          name      : "Server",
          script    : "app.js",
          watch     : true
      },
      {
          name      : "CRONJOBS",
          script    : "Cronjobs/cronjobs.js",
          watch     : true
      },
  ]
}
