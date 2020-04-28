import { LOCAL_STORAGE_USER } from './constants';

export const getUserFromLocalStorage = () => {
  try {
    const userFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_USER);
    return JSON.parse(userFromLocalStorage);
  } catch {
    return null;
  }
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER);
}

export const putUserToLocalStorage = (user) => {
  localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
};
