export function getToken() {
    return localStorage.getItem('token');
}   

export function clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}