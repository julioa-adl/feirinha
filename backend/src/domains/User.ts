import IUser from '../interfaces/IUser';

export default class User {
  protected id?: string | undefined;
  protected name: string;
  protected email: string;
  protected password: string;
  protected birthday: string;
  protected role: string;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.birthday = user.birthday;
    this.role = user.role;
  }
}
