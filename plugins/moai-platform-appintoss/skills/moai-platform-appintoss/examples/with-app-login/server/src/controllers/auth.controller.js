const GetAccessTokenRequest = require('../dto/getAccessToken.dto');
const RefreshTokenRequest = require('../dto/refreshToken.dto');
const GetUserInfoRequest = require('../dto/getUserInfo.dto');
const LogoutByAccessTokenRequest = require('../dto/logoutByAccessToken.dto');
const LogoutByUserKeyRequest = require('../dto/logoutByUserKey.dto');
const authService = require('../services/auth.service');
const decryptUserInfo = require('../utils/decryptUserInfo');

exports.getAccessToken = async (req, res) => {
  try {
    const requestData = new GetAccessTokenRequest(req.body);
    const response = await authService.getAccessToken(requestData);

    res.status(200).json({
      statusCode: response.statusCode,
      data: JSON.parse(response.data),
    });
  } catch (error) {
    console.error('getAccessToken 실패:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const requestData = new RefreshTokenRequest(req.body);
    const response = await authService.refreshAccessToken(requestData);

    res.status(200).json({
      statusCode: response.statusCode,
      data: JSON.parse(response.data),
    });
  } catch (error) {
    console.error('refreshToken 실패:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const requestData = new GetUserInfoRequest(req.headers);
    const response = await authService.getUserInfo(requestData.authorization);

    const parsedData = JSON.parse(response.data);
    const decryptedUser = decryptUserInfo(parsedData.success);

    res.status(200).json({
      statusCode: response.statusCode,
      data: {
        ...parsedData,
        success: decryptedUser,
      },
    });
  } catch (error) {
    console.error('getUserInfo 실패:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.logoutByAccessToken = async (req, res) => {
  try {
    const requestData = new LogoutByAccessTokenRequest(req.headers);
    const response = await authService.logoutByAccessToken(
      requestData.authorization
    );

    res.status(200).json({
      statusCode: response.statusCode,
      data: JSON.parse(response.data),
    });
  } catch (error) {
    console.error('logout 실패:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.logoutByUserKey = async (req, res) => {
  try {
    const requestData = new LogoutByUserKeyRequest(req.body);
    const response = await authService.logoutByUserKey(requestData);

    res.status(200).json({
      statusCode: response.statusCode,
      data: JSON.parse(response.data),
    });
  } catch (error) {
    console.error('logoutByUserKey 실패:', error);
    res.status(500).json({ error: error.message });
  }
};
