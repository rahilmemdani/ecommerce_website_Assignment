//Unit testing

const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
const sendSms = require('../routes/otp');
const server = require('../server');
chai.use(chaiHttp);



//Testing signup page credentials
describe('Testing signup page credentials', function () {
    it("It should send the values to signup page", function (done) {
        chai.request(server)
            .post('/signUp')
            .type('form')
            .send({
                number: 9082368501,
                pass: "abcdefg@12",
                //email:'rmemdanib@gmail.com'
                email: 'abcd_ak@ways-2-sms.co.in',
            }).end(function (err, res) {
                //Status code
                expect(res.status).to.be.equal(200);
                // console.log(res.body);
                //False if the number already exists
                expect(res.body.inserted).to.be.equal(false);
                //True if the number doesn't exist 
                expect(res.body.inserted).to.be.equal(true);
                //If the emailid format is not correct
                expect(res.body.email).to.be.equal(false);
                //Testing email-> whether email id exists or it's a new one
                expect(res.body.exist).to.be.equal('Already Exists');

            })
        done();
    })
})



//Testing login page credentials
describe('Testing the login page credentials', function () {
    it('It should send values to the login page', function (done) {
        chai.request(server)
            .post('/loginCred')
            .type('form')
            .send({
                number: 9820025048
            })
            .end(function (err, res) {
                //Status code
                expect(res.status).to.be.equal(200);
                //If the number is not registered
                expect(res.body.msgs).to.be.equal('This number is not registered');
                //If the number is registered
                expect(res.body.registered).to.be.equal('Number is registered');
            })
        done();
    })
})

