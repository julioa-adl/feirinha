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
  getAllProducts,
} from './mocks/product.mocks';
import {
  payLoadTokenUser,
  tokenUserMock,
} from './mocks/user.mocks';

describe('Product - Testando a Rota /product', function () { 
  beforeEach(function () { sinon.restore(); });

  it('1 - post /product product ao não receber um name, retorne um erro', async () => {
      sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
      sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

      const { name, ...prodWithoutInfos } = prodInput;

      const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('2 - post /product product ao não receber um subName, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { subName, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('3 - post /product product ao não receber um manufacturer, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { manufacturer, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('4 - post /product product ao não receber uma category, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { category, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('5 - post /product product ao não receber um code, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { code, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('6 - post /product product ao não receber um unitMeasure, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { unitMeasure, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('7 - post /product product ao não receber um size, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { size, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('8 - post /product product ao não receber image, retorne um erro', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const { image, ...prodWithoutInfos } = prodInput;

    const httpResponse = await request(app).post('/product').send(prodWithoutInfos);

    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });

  it('9 - post /product receber tudo okay, retorne status 201', async () => {
    sinon.stub(ProductModel.prototype, 'findOne').resolves(null);
    sinon.stub(ProductModel.prototype, 'create').resolves(prodOutPut);

    const httpResponse = await request(app).post('/product').send(prodInput);

    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal({ message: 
      `Product ${prodOutPut.name}-${prodOutPut.subName}-${prodOutPut.size} successfuly registered` });
  });

  it('10 - get /product lista todos os produtos, retorne status 200', async () => {
    sinon.stub(ProductModel.prototype, 'findAll').resolves(getAllProducts);

    const httpResponse = await request(app).get('/product');

    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(getAllProducts);
  });

  it('11 - put /product ao tentar atualizar um produto, retorna status 200', async () => {
    const { name, ...inputWithoutInfo } = prodOutPut;
    const realUpdate = { name: 'example prod', ...inputWithoutInfo }
    const sendUpdate = { id: 'a1b2c3d4e5f6g7h8i9', name: 'example prod'}

    sinon.stub(ProductModel.prototype, 'update').resolves(realUpdate);

    const httpResponse = await request(app).put('/product').send(sendUpdate);
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ message: 'example prod atualizado' });
  });

  it('12 - delete /product user tenta deletar um produto, retorna um erro', async () => {
    sinon.stub(jwt, 'verify').returns(payLoadTokenUser);
    
    const prodIdtoDelete = { id: 'a1b2c3d4e5f6g7h8i9' };

    const httpResponse = await request(app).delete('/product').set('headers', tokenUserMock).send(prodIdtoDelete);
    
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ error: 'YOU HAVE NO POWER HERE' });
  });
})
