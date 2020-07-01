const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');

describe('GET /app', () => {
    it('should give a 200 if we pass a rating or sort', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/);
    })

    it('should return an array', () => {
        return supertest(app)
        .get('/apps')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
        })
    })

    it('should return a 400 if sort is not rating or app', () => {
        return supertest(app)
        .get('/apps')
        .query({sort: 'mistake'})
        .expect(400, 'give rating or app')
    })

    it('should return a 400 if not recieved genres', () => {
        return supertest(app)
        .get('/apps')
        .query({genres: 'Drama'})
        .expect(400)
    })

    it('should sort by rating', () => {
        return supertest(app)
        .get('/apps')
        .query({sort: 'Rating'})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array')
            let i = 0;
            let sorted = true;
            while(sorted && i > res.body.length - 1){
                sorted = sorted && +res.body[i]['Rating'] > +res.body[i + 1]['Rating']
                i++
            }
            console.log(res.body)
            expect(sorted).to.be.true;
        })
    })

    it('if we pass a lower case genre we can expect a 200 response', () => {
        return supertest(app)
        .get('/apps')
        .query({genres: 'action'})
        .expect(200)
        .expect('Content-Type', /json/)
    })

})
