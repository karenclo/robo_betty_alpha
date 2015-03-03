'use strict';

/*
 * This module is meant to house all of the API
 * routes that pertain to authentication of admins
 */
var express = require('express');
var router = express.Router();

/* need this to enable cross origin resource sharing.If disabled, we might
 * not need this later. This is just to get the example to work
 * when front end is served from a something other than our app server.
 */
var cors = require('cors');

var Authmodel = require('../models/Authmodel');
var jwt = require('jwt-simple');

router.post('/signup', function(req, res) {
  //Put them into the database
  var admin = new Authmodel();
  admin.email = req.body.email;
  admin.password = admin.generateHash(req.body.password);
  admin.token = jwt.encode(req.body.email, admin.generateHash(new Date().getTime()));
  // save the user
  admin.save(function(err) {
    if(err)
      return res.status(400).send(err);
    return res.sendStatus(200);
  });
});

router.post('/login', function(req, res) {
  //Give them a token
  // find a user whose email is the same as the forms email
  // we are checking to see if the user trying to login already exists
  Authmodel.findOne({email: req.body.email}, function(err, user) {
    // if there are any errors, return the error before anything else
    if(err || !user)
      return res.status(400).send(err);


    // if the user is found but the password is wrong
    if(!user.validPassword(req.body.password))
      return res.status(401).send('loginMessage', 'Oops! Wrong password');

    var newToken = jwt.encode(req.body.email, user.generateHash(new Date().getTime()));
    user.token = newToken;
    user.save(function(err) {
      if(err)
        return res.status(400);
      return res.json({token: newToken});
    });

  });
});

router.put("/setting/:user", function(req, res) {
   Authmodel.findOne({email: req.params.user}, function (err, admin) {
      if(err || !admin)
         res.json(err);
 	
     
     // if the user is found but the password is wrong
     if(!admin.validPassword(req.body.password))
       return res.status(401).send('loginMessage', 'Oops! Wrong password');
	 //update password
	
	 //upadate password
	 if (req.body.newpassword !== undefined)
	 	admin.password = admin.generateHash(req.body.newpassword);
	
	//update email
	 if (req.body.newemail !== undefined)
		 admin.email = req.body.newemail;
      admin.save(function(err) {
        if(err) {
          res.json(err);
        }
      });
      return res.sendStatus(200);
   });
});


module.exports = router;