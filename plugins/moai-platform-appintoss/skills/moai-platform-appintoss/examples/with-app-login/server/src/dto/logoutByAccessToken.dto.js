class LogoutByAccessTokenRequest {
  constructor(headers) {
    this.authorization = headers.authorization;

    if (!this.authorization) {
      throw new Error('Authorization 헤더가 필요합니다.');
    }
  }
}

module.exports = LogoutByAccessTokenRequest;
