import { redirect } from 'react-router-dom';

export function getToken() {
    return localStorage.getItem('token');
}

export function clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_expiration');
}

export function tokenLoader() {
    const token = getToken();

    if (!token) {
        return null;
    }

    const duration = getTokenDuration();
    console.log('Token duration:', duration);

    if (duration <= 0) {
        return "EXPIRED";
    }
    return token;
}

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('token_expiration');
    if (!storedExpirationDate) {
        return -1;
    }

    const expirationDate = new Date(storedExpirationDate);

    const now = new Date();
    return expirationDate.getTime() - now.getTime();
}
   

export function checkAuthLoader() {
    const token = getToken();
    if (!token) {
        return redirect('/');
    }
}