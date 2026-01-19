class GetAccessTokenRequest {
  constructor(body) {
    this.authorizationCode = body.authorizationCode;
    this.referrer = body.referrer;

    if (!this.authorizationCode) {
      throw new Error('authorizationCode가 필요합니다.');
    }

    if (!this.referrer) {
      throw new Error('referrer가 필요합니다.');
    }
  }
}

module.exports = GetAccessTokenRequest;
