process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
// const token = process.env.testToken;

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(done => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => {
            return knex.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  describe('GET /api/v1/cute-puppies', () => {
    it('should return all puppies', (done) => {
      chai.request(server)
        .get('/api/v1/cute-puppies')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[0].should.have.property('name');
          response.body[0].name.should.equal("Yvette");
          response.body[0].should.have.property('age');
          response.body[0].age.should.equal(5);
          response.body[0].should.have.property('color');
          response.body[0].color.should.equal('white');
          done();
        });
    });

    it('should return a 404 for a route that does not exist', done => {
      chai.request(server)
        .get('/sad')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
})
