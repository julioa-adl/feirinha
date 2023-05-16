import { Schema } from 'mongoose';
import IUser from '../interfaces/IUser';
import AbstractODM from './AbstractODM';

export default class UserModel extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema<IUser>({
      name: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
    })
    super(schema, 'User');
  }
}