import User from '../domains/User';
import UserModel from '../models/User.Model';
import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';
import bcrypt from 'bcrypt';
import { createToken } from '../auth/jwtFunctions';

export default class UserService {
  public model = new UserModel();
  public createUserDomain(user: IUser | null): User | null {
    if (user) {
      return new User(user);
    }
    return null;
  }

  public async getUsers() {
    const allUsers = await this.model.findAll();
    if (!allUsers) return { type: 404, payload: { token: null } };

    const listUsers = allUsers.map((user) => user.name);
    return { type: null, payload: listUsers };
  }

  public async create(user: IUser) {
    const { name, email, password, birthday, role } = user;

    const existingUser = await this.model.findOne({email: email});
    if (existingUser) return { type: 409, payload: { token: null } };

    const saltRounds = 10;
    const validPwd = await bcrypt.hash(password, saltRounds);
    const newUser = await this.model.create({ name, email, password: validPwd, birthday, role });

    newUser.password = ''

    const token = createToken(newUser);
    return { type: null, payload: { token } };
  }

  public async login(user: ILogin) {
    const { email, password } = user;

    const existingUser = await this.model.findOne({email: email});
    if (!existingUser) return { type: 409, payload: { token: null } };

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      existingUser.password = '';
      const token = createToken(existingUser);
      return { type: null, payload: { token } };
    } else {
      return { type: 404, payload: { token: null } };
    }
  }

  public async update(id: string, obj: object) {
    return await this.model.update(id, obj)
  }

  public async deleteUser(id: string) {
    return await this.model.delete(id)
  }
}
