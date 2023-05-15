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

  it('Testa se matches funciona', async () => {
    //expect(false).to.be.eq(false);
    const res = await chai
    .request(app)
    .get('/matches');

    expect(res).to.have.status(200);
  });

  it('Testa se as queries funcionam', async () => {
    //expect(false).to.be.eq(false);
    const res1 = await chai
    .request(app)
    .get('/matches?inProgress=false');
    expect(res1.body[0].awayTeamId).to.eq(8);

    const res2 = await chai
    .request(app)
    .get('/matches?inProgress=true');
    expect(res2.body[0].awayTeamId).to.eq(9);
  });

});
