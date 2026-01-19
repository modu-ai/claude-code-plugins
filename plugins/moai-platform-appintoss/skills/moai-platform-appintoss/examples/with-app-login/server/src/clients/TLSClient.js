const https = require('https');
const fs = require('fs');
const path = require('path');

class TLSClient {
  constructor(certPath, keyPath) {
    const resolvedCertPath = path.resolve(__dirname, '..', '..', certPath);
    const resolvedKeyPath = path.resolve(__dirname, '..', '..', keyPath);

    this.options = {
      cert: fs.readFileSync(resolvedCertPath),
      key: fs.readFileSync(resolvedKeyPath),
      rejectUnauthorized: true,
    };
  }

  makeRequest(url, method = 'GET', data = null, headers = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);

      const requestOptions = {
        ...this.options,
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname + urlObj.search,
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          ...headers,
        },
      };

      const req = https.request(requestOptions, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data,
          });
        });
      });

      req.on('error', (error) => reject(error));

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async get(url, headers = {}) {
    return this.makeRequest(url, 'GET', null, headers);
  }

  async post(url, data, headers = {}) {
    return this.makeRequest(url, 'POST', data, headers);
  }
}

module.exports = TLSClient;
