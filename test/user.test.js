const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');

const { expect } = chai;
chai.use(chaiHttp);

describe('Utilisateur Controller Tests', () => {
    // Test pour la création d'un nouvel utilisateur
    describe('POST /api/signup', () => {
        it('Should create a new user', (done) => {
            chai.request(app)
                .post('/api/signup')
                .send({
                    nom: 'Test',
                    prenom: 'User',
                    mail: 'test@example.com',
                    mdp: 'testpassword',
                    role: 'botaniste'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('nom', 'Test');
                    done();
                });
        });
    });

    // Autres tests peuvent être ajoutés pour login, getUtilisateur, getBotanistes, etc.
});
