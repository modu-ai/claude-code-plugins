class RefreshTokenRequest {
  constructor(body) {
    this.refreshToken = body.refreshToken;
    if (!this.refreshToken) {
      throw new Error('refresh_token이 필요합니다.');
    }
  }
}

module.exports = RefreshTokenRequest;
