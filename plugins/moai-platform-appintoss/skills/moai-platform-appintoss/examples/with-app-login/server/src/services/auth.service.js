const TLSClient = require('../clients/TLSClient');
const {
  CLIENT_CERT_PATH,
  CLIENT_KEY_PATH,
  AUTH_API_BASE,
} = require('../../env.config');

const client = new TLSClient(CLIENT_CERT_PATH, CLIENT_KEY_PATH);

exports.getAccessToken = async ({ authorizationCode, referrer }) => {
  return client.post(`${AUTH_API_BASE}/generate-token`, {
    authorizationCode,
    referrer,
  });
};

exports.refreshAccessToken = async ({ refreshToken }) => {
  return client.post(`${AUTH_API_BASE}/refresh-token`, {
    refreshToken: refreshToken,
  });
};

exports.getUserInfo = async (accessToken) => {
  return client.get(`${AUTH_API_BASE}/login-me`, {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  });
};

exports.logoutByAccessToken = async (accessToken) => {
  return client.post(
    `${AUTH_API_BASE}/access/remove-by-access-token`,
    {},
    { Authorization: accessToken }
  );
};

exports.logoutByUserKey = async ({ userKey }) => {
  return client.post(`${AUTH_API_BASE}/access/remove-by-user-key`, { userKey });
};
