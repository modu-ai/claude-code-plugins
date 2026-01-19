export interface LoginRequest {
  authorizationCode: string;
  referrer: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export type LogoutByAccessTokenRequest = Record<string, never>;

export interface LogoutByUserKeyRequest {
  userKey: string;
}

export interface TokenResponse {
  data?: {
    success?: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export type LogoutResult = { ok: boolean } | null;

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  login: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  logoutByAccessToken: () => Promise<LogoutResult>;
  logoutByUserKey: (userKey: string) => Promise<LogoutResult>;
}
