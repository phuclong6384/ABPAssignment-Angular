import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'AbpAssignment',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44322/',
    redirectUri: baseUrl,
    clientId: 'AbpAssignment_App',
    responseType: 'code',
    scope: 'offline_access AbpAssignment',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44322',
      rootNamespace: 'AbpAssignment',
    },
  },
} as Environment;
