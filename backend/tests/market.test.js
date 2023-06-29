/* eslint-disable */
import request from 'supertest';
import sinon from 'sinon';
import { expect } from 'chai';

import app from '../src/app';
import jwt from 'jsonwebtoken';
import MarketModel from '../src/models/Market.Model';

import {
  marketInput,
  marketOutput,
} from './mocks/market.mocks';

describe('Market - Testando a Rota /market', function () { 
  beforeEach(function () { sinon.restore(); });

  it('1 - post /market ao não receber um name, retorne um erro', async () => {
      sinon.stub(MarketModel.prototype, 'findOne').resolves(null);
      sinon.stub(MarketModel.prototype, 'create').resolves(marketOutput);

      const { name, ...marketWithoutInfos } = marketInput;

      const httpResponse = await request(app).post('/market').send(marketWithoutInfos);

      expect(httpResponse.status).to.equal(400);
      expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
  });
});