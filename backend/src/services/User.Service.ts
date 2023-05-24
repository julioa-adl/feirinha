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

  public async create(user: IUser) {
    const { name, email, password } = user;

    const existingUser = await this.model.findOne({email: email});
    if (existingUser) return { type: 409, payload: { token: null } };

    const saltRounds = 10;
    const validPwd = await bcrypt.hash(password, saltRounds);
    const newUser = await this.model.create({ name, email, password: validPwd });

    const { password: _password, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);
    return { type: null, payload: { token } };
  }

  public async login(user: ILogin) {
    const { email, password } = user;

    const existingUser = await this.model.findOne({email: email});
    if (!existingUser) return { type: 409, payload: { token: null } };

    const match = await bcrypt.compare(password, existingUser.password);
    if (match) {
      const { password: _password, ...userWithoutPassword } = existingUser;
      const token = createToken(userWithoutPassword);
      return { type: null, payload: { token } };
    } else {
      return { type: 404, payload: { token: null } };
    }
  }

  public async delete(id: string) {
    return await this.model.delete(id)
  }
}
