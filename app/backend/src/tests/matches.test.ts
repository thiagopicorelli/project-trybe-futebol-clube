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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X3VzZXIifSwiaWF0IjoxNjgzOTI5MDA1LCJleHAiOjE2ODQ1MzM4MDV9.yxv3DhfPostdbkTUqzZleRjhCkGLi7lXgXo5oYgom7E';

describe('Matches', () => {
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
    const res = await chai
    .request(app)
    .get('/matches');

    expect(res).to.have.status(200);
  });

  it('Testa se as queries funcionam', async () => {
    const res1 = await chai
    .request(app)
    .get('/matches?inProgress=false');
    expect(res1.body[0].awayTeamId).to.eq(8);

    const res2 = await chai
    .request(app)
    .get('/matches?inProgress=true');
    expect(res2.body[0].awayTeamId).to.eq(9);
  });

  it('Testa se a criação de partidas funciona', async () => {
    //Testa se uma partida válida é adicionada
    const match1 = {
      "homeTeamId": 2, 
      "awayTeamId": 3,
      "homeTeamGoals": 2,
      "awayTeamGoals": 1
    };
    const res1 = await chai
    .request(app)
    .post('/matches')
    .set('authorization', token)
    .send(match1);
    expect(res1.body.homeTeamId).to.eq(2);

    //Testa se uma partida com o mesmo time duas vezes dá erro
    const match2 = {
      "homeTeamId": 2, 
      "awayTeamId": 2,
      "homeTeamGoals": 2,
      "awayTeamGoals": 1
    };
    const res2 = await chai
    .request(app)
    .post('/matches')
    .set('authorization', token)
    .send(match2);
    expect(res2.status).to.eq(422);

    //Testa se uma partida com um time invalido dá erro
    const match3 = {
      "homeTeamId": -1, 
      "awayTeamId": 2,
      "homeTeamGoals": 2,
      "awayTeamGoals": 1
    };
    const res3 = await chai
    .request(app)
    .post('/matches')
    .set('authorization', token)
    .send(match3);
    expect(res3.status).to.eq(404);
  });

  it('Testa se a modificação de partidas funciona', async () => {
    const match = {
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    };
    const res = await chai
    .request(app)
    .patch('/matches/1')
    .set('authorization', token)
    .send(match);
    expect(res.status).to.eq(200);
  });

  it('Testa se a finalização de partidas funciona', async () => {
    const res = await chai
    .request(app)
    .patch('/matches/1/finish')
    .set('authorization', token);
    expect(res.status).to.eq(200);
  });
});
