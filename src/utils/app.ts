export const isLoggedIn = () => {
  return !!localStorage.getItem('logged-in');
};
