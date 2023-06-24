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

  public async getById(id: string) {
    const user = await this.model.findById(id);
    return user;
  }

  public async getUsers() {
    const allUsers = await this.model.findAll();
    if (!allUsers) return { type: 404, payload: { token: null } };

    const listUsers = allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }));
    return { type: null, payload: listUsers };
  }

  public async firstUser() {
    const superUser = {
      name: 'Super',
      email: 'julioader@gmail.com',
      password: '$2b$10$gb0VWzCVlkyawResekje5e56.HVL0QFCvuLqnuy7Tw5ROyO72K19e',
      birthday: '11-12-1994',
      role: 'Super'
    }
    const allUsers = await this.model.findAll();
    if (allUsers.length === 0) {
      const { name, email, password, birthday, role } = superUser;
      await this.model.create({ name, email, password, birthday, role });
    }
  }

  public async create(user: IUser) {
    await this.firstUser()
    const { name, email, password, birthday, role } = user;

    const existingUser = await this.model.findOne({email: email});
    if (existingUser) return { type: 409, payload: { token: null } };

    const saltRounds = 10;
    const validPwd = await bcrypt.hash(password, saltRounds);
    const newUser = await this.model.create({ name, email, password: validPwd, birthday, role });

    newUser.password = '';

    const token = createToken(newUser);
    // const token = newUser;
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

  public async update(id: string, obj: IUser) {
    const { password } = obj;
    if (password) {
      const saltRounds = 10;
      const validPwd = await bcrypt.hash(password, saltRounds);
      obj.password = validPwd;
    }
    return await this.model.update(id, obj)
  }

  public async deleteUser(id: string) {
    return await this.model.delete(id)
  }
}
