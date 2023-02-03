import { SIGN_UP_URL, SIGN_IN_URL, USERS_URL } from '../constants/constants';
import state from '../state/state';

export const signUp = async (body: { name: string; login: string; password: string }) => {
  const response = await fetch(SIGN_UP_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch();

  return response.status !== 200 ? false : { ...(await response.json()) };
};

export const signIn = async (body: { login: string; password: string }): Promise<{ id: string; token: string }> => {
  const response = await fetch(SIGN_IN_URL, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch();
  if (response.status === 200) {
    const result = await response.json();
    state.userId = result.id;
    state.authToken = result.token;
    return result;
  }
  return response.status !== 200 ? false : { ...(await response.json()) };
};

export const getUsers = async (token: string) => {
  const response = await fetch(USERS_URL, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const getUserById = async (token: string, id: string) => {
  const response = await fetch(`${USERS_URL}/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const result = await response.json();
  return result;
};

export const updateUser = async (token: string, id: string, body: { name: string; login: string; password: string }) =>
  (
    await fetch(`${USERS_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();

export const deleteUser = async (token: string, id: string) =>
  (
    await fetch(`${USERS_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
