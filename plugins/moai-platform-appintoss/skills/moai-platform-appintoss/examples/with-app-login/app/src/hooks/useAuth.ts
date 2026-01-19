import { useState } from 'react';
import { appLogin } from '@apps-in-toss/framework';
import { useToast } from '@toss/tds-react-native';
import { post } from 'utils/fetcher';
import type {
  LoginRequest,
  RefreshTokenRequest,
  TokenResponse,
  LogoutResult,
  AuthState,
  LogoutByAccessTokenRequest,
  LogoutByUserKeyRequest,
} from 'types/auth';

export const useAuth = (): AuthState => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };

  const login = async () => {
    try {
      setLoading(true);
      setError(null);

      const { authorizationCode, referrer } = await appLogin();

      const data = await post<TokenResponse, LoginRequest>(
        '/get-access-token',
        { authorizationCode, referrer }
      );

      const access = data?.data?.success?.accessToken;
      const refresh = data?.data?.success?.refreshToken;

      if (access) {
        setAccessToken(access);
        toast.open('로그인 성공, AccessToken을 가져왔어요.');
      } else {
        setError('AccessToken을 가져오지 못했어요.');
      }

      if (refresh) {
        setRefreshToken(refresh);
      }
    } catch (e) {
      console.error(e);
      setError('AccessToken을 가져오는 중 문제가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      setError('RefreshToken이 없어요. 먼저 로그인 해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await post<TokenResponse, RefreshTokenRequest>(
        '/refresh-token',
        { refreshToken }
      );

      const access = data?.data?.success?.accessToken;

      if (access) {
        setAccessToken(access);
        toast.open('재인증 성공, AccessToken을 다시 가져왔어요.');
      } else {
        setError('AccessToken 재발급에 실패했어요.');
      }
    } catch (e) {
      console.error(e);
      setError('AccessToken 재발급 중 문제가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  const logoutByAccessToken = async (): Promise<LogoutResult> => {
    if (!accessToken) {
      setError('AccessToken이 없어요. 먼저 로그인 해주세요.');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      await post<unknown, LogoutByAccessTokenRequest>(
        '/logout-by-access-token',
        {},
        accessToken
      );

      clearTokens();
      return { ok: true };
    } catch (error) {
      console.error(error);
      setError('AccessToken으로 로그아웃하는 중 문제가 발생했어요.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logoutByUserKey = async (userKey: string): Promise<LogoutResult> => {
    if (!userKey) {
      setError('userKey가 필요해요.');
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      await post<unknown, LogoutByUserKeyRequest>('/logout-by-user-key', {
        userKey,
      });

      clearTokens();
      return { ok: true };
    } catch (error) {
      console.error(error);
      setError('userKey로 로그아웃하는 중 문제가 발생했어요.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    accessToken,
    refreshToken,
    login,
    refreshAccessToken,
    logoutByAccessToken,
    logoutByUserKey,
  };
};
