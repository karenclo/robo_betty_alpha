var request = require('supertest');

var config = require('../config/config');

var AdminUser = require('../models/Authmodel');

function setupAdmin(done) {
  var token;
  var admin;

  // Add random number to email to reduce concurrency issue chances on 
  // duplicate unique key errors.
  var email = "test" + Math.floor(Math.random() * 100000) + "@test.com";
  var password = "test_password";

  var url = "localhost:" + config.port;
  request(url)
    .post('/auth/signup')
    .send({
      email: email,
      password: password
    })
    .expect(200)
    .end(function(err){
      if(err)
        throw(err);
      login();
    }); 

  function login() {
    request(url)
      .post('/auth/login')
      .send({
        email: email,
        password: password
      })
      .expect(200)
      .end(function(err,res){
        if(err)
          throw(err);
        res.body.should.have.property('token');
        token = res.body.token;
        retrieveAdmin();
      });
  }

  function retrieveAdmin() {
    AdminUser.findOne({email: email}, function(err, dbAdmin) {
      if(err)
        throw(err);
      admin = dbAdmin;
      done({
        admin: admin,
        email: email,
        password: password,
        token: token
      });
    });
  }
    
}

function cleanupAuth(email, callback) {
  AdminUser.remove({email: email}, function(err) {
    if(err)
      throw(err);
    callback();
  });
}

function configureAuth(test_suite) {
	var url = "localhost:" + config.port;

	var email = "test@test.com";
	var password = "test_password";

	var admin;
	var token;

	describe("Signup User", function() {
      it("should signup new user", function(done) {
        request(url)
          .post('/auth/signup')
          .send({
            email: email,
            password: password
          })
          .expect(200)
          .end(function(){
            done();
          });
      });

      it("should login the user", function(done) {
        request(url)
          .post('/auth/login')
          .send({
            email: email,
            password: password
          })
          .expect(200)
          .end(function(err,res){
            if(err)
              throw(err);
            res.body.should.have.property('token');
            token = res.body.token;
            done();
          });
      });

      it("should retrieve admin document", function(done) {
        AdminUser.findOne({email: email}, function(err, dbAdmin) {
          if(err)
            throw(err);
          admin = dbAdmin;
          done();
        });
      });
    });

	// Call the actual test suite, pass it the auth credentials.
	describe("Test Suite", function() {
		it("should run the test suite", function(done) {
			// No matter what the timeout is set to it still exceeds it
			this.timeout(5000);
			test_suite({
				email: email,
				password: password,
				token: token,
				admin: admin
			}, done);
		});
	});

	describe("Clear Admins", function() {
    it("should clear the admin table", function(done) {
      AdminUser.remove({email: email}, function(err) {
        if(err)
          throw(err);

        done();
      });
    });
  });

}

module.exports.setupAdmin = setupAdmin;
module.exports.cleanupAuth = cleanupAuth;

//module.exports = configureAuth;