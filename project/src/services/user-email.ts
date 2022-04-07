const USER_EMAIL = 'user-email';

export type Email = string;

export const getEmail = (): Email => {
  const email = localStorage.getItem(USER_EMAIL);
  return email ?? '';
};

export const saveEmail = (email: Email): void => {
  localStorage.setItem(USER_EMAIL, email);
};

export const dropEmail = (): void => {
  localStorage.removeItem(USER_EMAIL);
};
