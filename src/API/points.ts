import i18next from 'i18next';
import { POINTS } from '../constants/constants';
import { ToastrType } from '../data/types';
import getRedirect from '../features/getRedirect';
import popUpMessages from '../features/popUpMessages/popupMessages';
import { getSpinner, removeSpinner } from '../features/spinner/spinner';

export const createPoint = async (
  token: string,
  body: {
    title: string;
    taskId: string;
    boardId: string;
    done: boolean;
    startDate: string;
    endDate: string;
  }
) => {
  try {
    getSpinner();
    const response = await fetch(`${POINTS}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }

    return await response.json();
  } catch (err) {
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || i18next.t('defaultError'));
    return true;
  } finally {
    removeSpinner();
  }
};

export const getPointsByTaskId = async (token: string, taskId: string) => {
  try {
    getSpinner();
    const response = await fetch(`${POINTS}/${taskId}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }

    return await response.json();
  } catch (err) {
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || i18next.t('defaultError'));
    return true;
  } finally {
    removeSpinner();
  }
};

export const updatePoints = async (
  token: string,
  pointId: string,
  body: { title: string; done: boolean; startDate: string; endDate: string }
) => {
  try {
    const response = await fetch(`${POINTS}/${pointId}`, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (response.status !== 200) {
      throw { ...(await response.json()) }.message;
    }
    await response.json();
  } catch (err) {
    getRedirect(String(err));
    popUpMessages(ToastrType.error, String(err) || i18next.t('defaultError'));
  }
};

export const deletePointById = async (token: string, pointId: string) =>
  (
    await fetch(`${POINTS}/${pointId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
