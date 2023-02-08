export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IState {
  authToken: string;
  id: string;
  boardId: string;
  name: string;
  pageLoaded: boolean;
  selectedUserId: string;
}

export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export enum FormsData {
  name = 'name',
  email = 'email',
  password = 'password',
  signin = 'signin',
  signup = 'signup',
}

export interface IColumns {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}
export interface ITasks {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  users: string[];
}

export type sign = 'signin' | 'signup';

export type User = {
  _id: string;
  name: string;
  login: string;
};

export enum ToastrType {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}

