function checkAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'index.html';
    }
    return token;
}
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}