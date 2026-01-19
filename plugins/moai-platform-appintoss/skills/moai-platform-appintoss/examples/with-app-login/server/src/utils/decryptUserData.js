const crypto = require('crypto');

/**
 * AES-256-GCM 복호화 함수
 * @param {string} encryptedBase64 - 암호문 (Base64 인코딩, IV + 암호문 + 태그)
 * @param {string} base64EncodedKey - AES 키 (Base64)
 * @param {string} aad - AAD 문자열
 * @returns {string} 복호화된 평문
 */
function decryptUserData(encryptedBase64, base64EncodedKey, aad) {
  const IV_LENGTH = 12;

  const decoded = Buffer.from(encryptedBase64, 'base64');
  const key = Buffer.from(base64EncodedKey, 'base64');

  const iv = Buffer.from(decoded.subarray(0, IV_LENGTH));
  const ciphertext = Buffer.from(decoded.subarray(IV_LENGTH));

  const tag = Buffer.from(ciphertext.subarray(ciphertext.length - 16));
  const encrypted = Buffer.from(ciphertext.subarray(0, ciphertext.length - 16));

  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAAD(Buffer.from(aad));
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString('utf-8');
}

module.exports = decryptUserData;
