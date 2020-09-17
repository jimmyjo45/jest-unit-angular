export const environment = {
  name: 'RINA',
  production: true,
  // keycloak: keycloakConfig,
  // company: companyConfig,
  auth: {
    refreshing_time: 5000,
    token_lifespan: 60,
    bearerExcludedUrls: []
  },
  logger: {
    serverLoggingUrl: 'http://localhost:3000/logs',
    // level: NgxLoggerLevel.DEBUG,
    // serverLogLevel: NgxLoggerLevel.ERROR
  },
  render_delay: 400,
  refreshing_time: '10s',
  warn_timeout: 5000,
  error_timeout: 10000,
  snackbar_duration: 1500,
  snackbar_error_duration: 3000,
  date_format: 'MM-dd-yyyy HH:mm',
  supportUrl: 'https://support.cube.rina.org',
  apiUrl: 'http://localhost:5020/api/v1/',
  google: {
    analytics: {
      active: true,
      uaId: 'UA-128968550-2',
      logging: {
        debug: false,
        exceptions: true,
        verbose: false
      }
    }
  }
};
