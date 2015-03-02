var request = require('supertest');
var config = require('../config/config');
// Wrapper that creates admin user to allow api calls
var ConfigureAuth = require('./ConfigureAuth');
var Employee = require('../models/Employee');


var Email = require('../notification/email');
var Text = require('../notification/text');

// array of employees. PLEASE only use your emails and phone numbers
// inside this array if testing..
var employees = [{phone_number: "4254785233", email: "kolli.kris@yahoo.com"}];

describe("Notification", function() {

    it('It should send an email', function(done){
      this.timeout(9000);
      Email.sendEmail(employees, done);
      //done();
    });

    it('It should send an text', function(done){
      this.timeout(9000);
      Text.sendText(employees, done);
      //done();
    });
  }
);
