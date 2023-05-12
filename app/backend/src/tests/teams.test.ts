import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
//import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
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

  it('Testa se rotas funcionam', async () => {
    //expect(false).to.be.eq(false);
    const res1 = await chai
    .request(app).get('/teams');
    expect(res1).to.have.status(200);

    const res2 = await chai
    .request(app).get('/teams/1');
    expect(res2).to.have.status(200);

    //Caso não haja equipe com o id
    const res3 = await chai
    .request(app).get('/teams/9999');
    expect(res3).to.have.status(404);
  });
});
