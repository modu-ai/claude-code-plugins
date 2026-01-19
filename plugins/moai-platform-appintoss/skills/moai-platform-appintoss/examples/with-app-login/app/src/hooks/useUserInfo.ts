import { useState } from 'react';
import { useToast } from '@toss/tds-react-native';
import { get } from 'utils/fetcher';
import type { GetUserInfoResponse, UserInfo, UserInfoState } from 'types/user';

export const useUserInfo = (): UserInfoState => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const getUserInfo = async (accessToken: string) => {
    if (!accessToken) {
      setError('AccessToken이 필요해요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await get<GetUserInfoResponse>(
        '/get-user-info',
        accessToken
      );
      const parsed = data?.data?.success;

      if (parsed) {
        setUserInfo(parsed);
        const keys = Object.entries(parsed)
          .filter(([_, value]) => value !== null)
          .map(([key]) => key);
        toast.open(`가져온 유저 정보, ${keys.join(', ')}`);
      } else {
        setError('유저 정보를 불러오지 못했어요.');
      }
    } catch (error) {
      console.error(error);
      setError('유저 정보를 가져오는 중 문제가 발생했어요.');
    } finally {
      setLoading(false);
    }
  };

  const clearUserInfo = () => {
    setUserInfo(null);
  };

  return {
    userInfo,
    loading,
    error,
    getUserInfo,
    clearUserInfo,
  };
};
