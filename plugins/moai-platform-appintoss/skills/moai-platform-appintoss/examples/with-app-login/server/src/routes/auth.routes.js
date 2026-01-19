const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// AccessToken 발급
router.post('/get-access-token', authController.getAccessToken);

// AccessToken 재발급
router.post('/refresh-token', authController.refreshToken);

// 사용자 정보 조회
router.get('/get-user-info', authController.getUserInfo);

// 로그인 연결 끊기
router.post('/logout-by-access-token', authController.logoutByAccessToken);

// 로그인 연결 끊기
router.post('/logout-by-user-key', authController.logoutByUserKey);

module.exports = router;
