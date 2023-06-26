/* eslint-disable */
import request from 'supertest';
import sinon from 'sinon';
import { expect } from 'chai';

import app from '../src/app';
import jwt from 'jsonwebtoken';
import ProductModel from '../src/models/Product.Model';

import {
  prodInput,
  prodOutPut,
} from './mocks/product.mocks';

describe('Product - Testando a Rota /product', function () { 
  beforeEach(function () { sinon.restore(); });

  it('1 - /product ao não receber um name, retorne um erro', async () => {
      sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
      sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

      const { name, ...prodWithoutInfos } = prodInput;

      const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('2 - /product ao não receber um subName, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { subName, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('3 - /product ao não receber um manufacturer, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { manufacturer, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('4 - /product ao não receber uma category, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { category, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('5 - /product ao não receber um code, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { code, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('6 - /product ao não receber um unitMeasure, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { unitMeasure, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('7 - /product ao não receber um size, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { size, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('8 - /product ao não receber image, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { image, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('9 - /product receber tudo okay, retorne status 201', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const httpResponse = await request(app).post('/product').send(prodInput);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal({ message: 
      `Product ${prodOutPut.name}-${prodOutPut.subName}-${prodOutPut.size} successfuly registered` });
  });

})
