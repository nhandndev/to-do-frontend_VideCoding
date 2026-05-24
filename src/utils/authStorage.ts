export const ACCESS_TOKEN_KEY = 'accessToken';
export const LEGACY_TOKEN_KEY = 'token';

export const getStoredToken = (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) ?? localStorage.getItem(LEGACY_TOKEN_KEY);
};

export const persistToken = (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
};

export const clearStoredToken = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(LEGACY_TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
    return Boolean(getStoredToken());
};
