module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
      {
          name      : "Client",
          script    : "app.bundle.js",
          watch     : true
      }
  ]
};
