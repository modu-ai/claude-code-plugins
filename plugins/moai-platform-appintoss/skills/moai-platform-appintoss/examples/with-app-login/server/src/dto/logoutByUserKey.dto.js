class LogoutByUserKeyRequest {
  constructor(body) {
    this.userKey = body.userKey;

    if (!this.userKey) {
      throw new Error('userKey 값이 필요합니다.');
    }
  }
}

module.exports = LogoutByUserKeyRequest;
