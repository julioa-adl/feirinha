import MarketingModel from '../models/Marketing.Model';
import Marketing from '../domains/Marketing';
import IMarket from '../interfaces/IMarket';

export default class MarketingService {
  public model = new MarketingModel();
  public createMarketingDomain(marketing: IMarket | null): Marketing | null {
    if (marketing) {
      return new Marketing(marketing);
    }
    return null;
  }

  public async create(marketing: IMarket) {
    const { name } = marketing;

    const existingMarketing = await this.model.findOne({name: name});
    if (existingMarketing) return { type: 409, message: 'Marketing alredy register'};

    const newMarketing = await this.model.create({ name });
    return { type: null, message: `Marketing ${newMarketing.name} successfully registered`};
  }

  public async delete(id: string) {
    return await this.model.delete(id)
  }
}