/* eslint-disable */
import request from 'supertest';
import sinon from 'sinon';
import { expect } from 'chai';

import app from '../src/app';
import jwt from 'jsonwebtoken';
import UserModel from '../src/models/User.Model';
import {
    noPasswordLoginBody,
    noEmailLoginBody,
    userOutPut,
    userInput,
    tokenSuperMock,
    tokenUserMock,
    mockPayload,
    mockPayloadSuper,
 } from './mocks/user.mocks'

describe('1 - Testando a Rota Login', function () { 
    beforeEach(function () { sinon.restore(); });

    it('1.1 - /login ao não receber uma senha, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findOne').resolves(userOutPut);

        const httpResponse = await request(app).post('/login').send(noPasswordLoginBody);

        expect(httpResponse.status).to.equal(409);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect User or Password' });
    });

    it('1.2 - /login ao não receber um email, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);

        const httpResponse = await request(app).post('/login').send(noEmailLoginBody);

        expect(httpResponse.status).to.equal(409);
        expect(httpResponse.body).to.be.deep.equal({ message: 'User does not exist' });
    });
});

describe('2 - Testando cadastrar novo User', function () { 
    beforeEach(function () { sinon.restore(); });

    it('2.1 - post /user ao cadastrar novo usuário, retorna status 201', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const httpResponse = await request(app).post('/user').send(userInput);

        expect(httpResponse.status).to.equal(201);
        expect(httpResponse.body).to.have.property('token');
    });

    it('2.2 - post /user sem nome, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { name, ...inputWithoutInfo } = userInput;

        const httpResponse = await request(app).post('/user').send(inputWithoutInfo);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
    });

    it('2.3 - post /user sem email, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { email, ...inputWithoutInfo } = userInput;

        const httpResponse = await request(app).post('/user').send(inputWithoutInfo);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
    });

    it('2.4 - post /user sem password, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { password, ...inputWithoutInfo } = userInput;

        const httpResponse = await request(app).post('/user').send(inputWithoutInfo);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
    });

    it('2.5 - post /user sem birthday, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { birthday, ...inputWithoutInfo } = userInput;

        const httpResponse = await request(app).post('/user').send(inputWithoutInfo);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
    });

    it('2.6 - post /user sem role, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { role, ...inputWithoutInfo } = userInput;

        const httpResponse = await request(app).post('/user').send(inputWithoutInfo);

        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Faltam informações' });
    });
});

describe('3 - Testando Permissões de Users', function () { 
    beforeEach(function () { sinon.restore(); });

    it('3.1 - post /user ao tentar cadastrar um Admin, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { role, ...inputWithoutInfo } = userInput;
        const fakeAdmin = { role: 'Admin', ...inputWithoutInfo }

        const httpResponse = await request(app).post('/user').send(fakeAdmin);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Você não tem permissão para cadastrar admins' });
    });

    it('3.2 - post /user ao tentar cadastrar um Super, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'findAll').resolves([userInput]); //apenas para passar no create super
        sinon.stub(UserModel.prototype, 'findOne').resolves(null);
        sinon.stub(UserModel.prototype, 'create').resolves(userOutPut);

        const { name, ...inputWithoutInfo } = userInput;
        const fakeSuper = { name: 'Super', ...inputWithoutInfo }

        const httpResponse = await request(app).post('/user').send(fakeSuper);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Só Existe Um Super, e Ele não compartilha O PODER' });
    });

    it('3.3 - put /user ao tentar atualizar um User diferente do seu, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'update').resolves(null);
        sinon.stub(jwt, 'verify').returns(mockPayload);

        const { id, role, ...inputWithoutInfo } = userOutPut;
        const fakeUpdate = { id: '00000000000', ...inputWithoutInfo }

        const httpResponse = await request(app).put('/user').send(fakeUpdate);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Permission Danied - No Updated' });
    });

    it('3.4 - put /user ao tentar atualizar a role de User sem ser o Super, retorne um erro', async () => {
        sinon.stub(UserModel.prototype, 'update').resolves(null);
        sinon.stub(jwt, 'verify').returns(mockPayload);

        const { role, ...inputWithoutInfo } = userOutPut;
        const fakeUpdate = { role: 'Admin', ...inputWithoutInfo }

        const httpResponse = await request(app).put('/user').send(fakeUpdate);

        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ error: 'Apenas o Super pode alterar Role de usuários' });
    });

    it('3.5 - put /user ao tentar atualizar a role de User SENDO o Super, retorna status 200', async () => {
        sinon.stub(jwt, 'verify').returns(mockPayloadSuper);
        
        const { role, ...inputWithoutInfo } = userOutPut;
        const realUpdate = { role: 'Admin', ...inputWithoutInfo }

        sinon.stub(UserModel.prototype, 'findById').resolves(realUpdate);
        sinon.stub(UserModel.prototype, 'update').resolves(realUpdate);

        const httpResponse = await request(app).put('/user').set('headers', tokenSuperMock).send(realUpdate);
        
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Usuário example atualizado' });
    });

    it('3.6 - put /user ao tentar atualizar o próprio User, retorna status 200', async () => {
        sinon.stub(jwt, 'verify').returns(mockPayloadSuper);
        
        const { name, ...inputWithoutInfo } = userOutPut;
        const realUpdate = { name: 'example da silva', ...inputWithoutInfo }

        sinon.stub(UserModel.prototype, 'findById').resolves(realUpdate);
        sinon.stub(UserModel.prototype, 'update').resolves(realUpdate);

        const httpResponse = await request(app).put('/user').set('headers', tokenUserMock).send(realUpdate);
        
        expect(httpResponse.status).to.equal(200);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Usuário example da silva atualizado' });
    });
});