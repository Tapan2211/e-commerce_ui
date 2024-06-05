const TOKEN_KEY = 'auth_token';

export const setToke = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const removeToken = () => {
    return localStorage.removeItem(TOKEN_KEY);
}

export const isTokenExpired = () => {
    const storedToken = getToken();
    if (!storedToken) {
        return true;
    }
    const storedTokenData = JSON.parse(atob(storedToken.split('.')[1]));
    const expirationTime = storedTokenData.exp * 1000; // Convert expiration time to milliseconds
    return Date.now() >= expirationTime;
}