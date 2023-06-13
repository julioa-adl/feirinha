import { Request, Response } from 'express';
import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';
import UserService from '../services/User.Service';

export default class UserController {
  public service: UserService;

  constructor() {
    this.service = new UserService();
    this.getUsers = this.getUsers.bind(this);
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async getUsers(_req: Request, res: Response) {
    try {
      const { type, payload } = await this.service.getUsers();
      if (type) {
        return res.status(404).json({ message: 'No Users Returned' }); 
      } 
      return res.status(200).json(payload);
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao buscar usuário no banco',
        error: String(err),
      });
    }
  } 

  public async create(req: Request, res: Response) {
    try {
      const user: IUser = req.body;
      const { type, payload: { token } } = await this.service.create(user);
      if (type) {
        return res.status(409).json({ message: 'User already registered' }); 
      } 
      return res.status(201).json({ token });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao criar usuário no banco',
        error: String(err),
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const user: ILogin = req.body;
      const { type, payload: { token } } = await this.service.login(user);
      if (type === 409) {
        return res.status(409).json({ message: 'User does not exist' }); 
      } if (type === 404) {
        return res.status(409).json({ message: 'Incorrect User or Password' }); 
      }
      return res.status(200).json({ token });
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'Erro ao fazer solicitação ao banco',
        error: String(err),
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const {id, ...obj} = req.body;
      const result = await this.service.update(id, obj);
      return res.status(200).json({ message: `Usuário ${result?.name} atualizado`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao atualizar usuario',
        error: String(err),
      })
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await this.service.deleteUser(id);
      if (result) return res.status(200).json({ 
        message: `usuário ${result.name} excluido com sucesso`});
    } catch(err: unknown) {
      return res.status(500).json({
        message: 'erro ao deletar usuário',
        error: String(err),
      })
    }
  }
}