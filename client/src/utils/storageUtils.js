const USER_KEY = "userInfo";
const EXPIRY_KEY = "expirationTime";

export const saveUserToStorage = (user, rememberMe = true) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  if (rememberMe) {
    const expirationTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem(EXPIRY_KEY, expirationTime.toString());
  } else {
    localStorage.removeItem(EXPIRY_KEY);
  }
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  const expiry = localStorage.getItem(EXPIRY_KEY);

  if (expiry && Date.now() > parseInt(expiry)) {
    clearUserFromStorage();
    return null;
  }

  return user ? JSON.parse(user) : null;
};

export const clearUserFromStorage = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(EXPIRY_KEY);
};
