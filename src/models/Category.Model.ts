/* eslint-disable no-console */
import { Schema } from 'mongoose';
import ICategory from '../interfaces/ICategory';
import AbstractODM from './AbstractODM';
import fs from 'fs';
import path from 'path';

class CategoryModel extends AbstractODM<ICategory> {
  constructor() {
    const schema = new Schema<ICategory>({
      name: { type: String, required: true },
    })
    super(schema, 'Categories');
  }

  public async seedCategories() {
    try {
      const filePath = path.resolve(__dirname, '../seeders/categories.json');
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(rawData);
      const categories = data.categories;

      await this.insertMany(categories);
      console.log('Categorias inseridas com sucesso!');
    } catch (error) {
      console.error('Erro ao inserir categorias:', error);
    }
  }
}

const categoryModel = new CategoryModel();

// Chame o método seedCategories() para inserir as categorias no banco de dados
categoryModel.seedCategories();
