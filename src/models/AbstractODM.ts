import { model, Model, models, Schema } from 'mongoose';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async findOne(conditions: Partial<T>): Promise<T | null> {
    return this.model.findOne(conditions);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  async update(id: string, obj: Partial<T>):
  Promise<T | null> {
    const result = this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj },
      { new: true },
    ); 
    return result;
  }

  public async insertMany(data: T[]): Promise<T[]> {
    try {
      const insertedDocuments = await this.model.insertMany(data);
      return insertedDocuments;
    } catch (error) {
      throw new Error(`Erro ao inserir vários documentos: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }
}

export default AbstractODM;