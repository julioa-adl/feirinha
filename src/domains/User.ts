import IUser from '../interfaces/IUser';

export default class User {
  protected id?: number | undefined;
  protected name: string;
  protected email: string;
  protected password: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
  }
}
