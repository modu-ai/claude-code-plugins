export interface UserInfo {
  userKey: number;
  scope: string;
  agreedTerms: string[];
  policy: string;
  certTxId?: string;
  name: string | null;
  phone: string | null;
  birthday: string | null;
  ci: string | null;
  di: string | null;
  gender: string | null;
  nationality: string | null;
  email: string | null;
}

export interface UserInfoState {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  getUserInfo: (accessToken: string) => Promise<void>;
  clearUserInfo: () => void;
}

export type GetUserInfoResponse = {
  data?: {
    success?: UserInfo;
  };
};
