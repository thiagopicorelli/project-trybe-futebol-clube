import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
//import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

process.env.JWT_SECRET = 'jwt_secret';

describe('Login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Testa se login funciona', async () => {
    //expect(false).to.be.eq(false);
    const res = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: 'secret_user',
    });

    expect(res).to.have.status(200);
  });

  it('Testa se login não funciona com um dos campos vazio', async () => {
    //expect(false).to.be.eq(false);
    const res = await chai
    .request(app)
    .post('/login')
    .send({
      email: '',
      password: 'secret_user',
    });

    expect(res).to.have.status(400);
  });

  it('Testa se login não funciona com um dos campos inválido', async () => {
    //expect(false).to.be.eq(false);
    const res1 = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'aa@aa.com',
      password: 'secre',
    });

    expect(res1).to.have.status(401);
  });

  it('Testa se login não funciona com o email sem estar na database', async () => {
    //expect(false).to.be.eq(false);
    const res = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'aa@aa.com',
      password: 'secrett',
    });

    expect(res).to.have.status(401);
  });

  it('Testa se login não funciona com o email correto e a senha errada', async () => {
    //expect(false).to.be.eq(false);
    const res = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'user@user.com',
      password: 'secret_admin',
    });

    expect(res).to.have.status(401);
  });
});
