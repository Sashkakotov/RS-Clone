export interface ICreateUser {
  name: string;
  login: string;
  password: string;
}
export interface IState {
  authToken: string;
  userId: string;
  boardId: string;
}

export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};
