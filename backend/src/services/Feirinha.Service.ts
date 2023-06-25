import Feirinha from '../domains/Feirinha';
import FeirinhaModel from '../models/Feirinha.Model';
import { IFeirinha } from '../interfaces/IFeirinha';

export default class FeirinhaService {
  public model = new FeirinhaModel();
  public createFeirinhaDomain(feirinha: IFeirinha | null): Feirinha | null {
    if (feirinha) {
      return new Feirinha(feirinha);
    }
    return null;
  }

  public async create(feirinha: IFeirinha) {
    const register = await this.model.create(feirinha);
    if (register) return { type: null, message: 'feirinha salva!' };
    return { type: 500, message: 'Erro ao cadastrar' };
  }

  public async getAll() {
    const search = await this.model.findAll();
    if (!search) return { type: 404, message: 'nenhuma feirinha encontrada' };
    return { type: null, message: search };
  }
}