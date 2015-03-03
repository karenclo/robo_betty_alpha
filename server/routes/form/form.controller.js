'use strict';

/* This module is meant to house all of the API
 * routes that pertain to forms
 */
var express = require('express');
var router = express.Router();

var SubmittedForm = require('../../models/form/SubmittedForm');
var mongoose = require('mongoose');
var TemplateForm = require('../../models/form/FormTemplate');

/********** FORM TEMPLATE ROUTES **********/
module.exports.template = {};

module.exports.template.findById =  function(req, res) {
  TemplateForm.findOne({'_id' : req.params.id}, function(err, template) {
    if(err)
      res.status(400).json({error: "There was an error finding the template form."});
    else
      res.json(template);
  });
};


module.exports.template.findByCompanyId =  function(req, res) {
  TemplateForm.findOne({'_admin_id' : req.params.id}, function(err, template) {
    if(err)
      res.status(400).json({error: "There was an error finding the template form."});
    else
      res.json(template);
  });
};

module.exports.template.create =  function(req, res) {
  var newTemplate = new TemplateForm();
  newTemplate._admin_id = new mongoose.Types.ObjectId(req.body._admin_id);
  newTemplate.template = req.body.template;

  newTemplate.save(function(err, template) {
    if(err)
        res.status(400).json(err);
    else
      res.json(template);
  });
};

/* Accept PUT request at /form/template */
module.exports.template.update =  function(req, res) {
    var update = {template: req.body.template};
    var options = {new: true};

    TemplateForm.findOneAndUpdate({_id: req.body.template_id}, update, options,
      function(err, template) {
          if(err)
            res.status(400).json({error: "There was an error updating a template."});
          else
            res.json(template);
      });
};

/* accept DELETE request at /form/template/:template_id */
module.exports.template.delete =  function (req, res) {
    /* Get id param from request */
    var templateID = req.params.template_id;

    if(!templateID) {
      res.status(400).json({error: 'need a template id'});
      return;
    }

    TemplateForm.findOneAndRemove({_id: templateID}, function(err, result) {
      if(err) {
        res.status(500).json({error: 'There was problem removing the form template'});
        return;
      }
      res.json(result);
    });
};

/********** PATIENT FORM ROUTES **********/
module.exports.submitted_form = {};

module.exports.submitted_form.findById = function(req, res) {
  SubmittedForm.findOne({ '_id': req.params.form_id }, function (err, submittedForm) {
    if (err) {
      res.status(400).json({error: "An error occured while finding patient form"});
      return;
    }
    res.json(submittedForm);
  });
};

module.exports.submitted_form.create = function(req, res) {
  var form = new SubmittedForm();
  form.form = req.body.form;
  form._admin_id = req.body._admin_id;
  form.firstName = req.body.firstName;
  form.lastName = req.body.lastName;
  form.email = req.body.patientEmail;
  form.date = new Date();
  form.save(function(err, savedForm){
    if (err){
      res.status(400).json({error: "An error occured while saving the submitted form"});
    }
    res.json(savedForm);
  });
};

module.exports.submitted_form.findByCompanyId = function(req, res) {
  var query = {},
    firstName = req.query.firstName,
    lastName = req.query.lastName,
    email = req.query.patientEmail;

  if(!((firstName && lastName) || email)) {
    res.status(400).json({error: "You must specify either both first and last name or email"});
    return;
  }
  query.firstName = firstName || null;
  query.lastName = lastName || null;
  query.email = email || null;

  if(req.query.mostRecent == "true") {
    SubmittedForm.findOne(query).sort('-date').exec(function (err, submittedForm) {
      if (err) {
        res.status(400).json({error: "An error occured while finding patient form"});
        return;
      }
      res.json(submittedForm);
    });
  }
  else {
    SubmittedForm.find(query, function(err, submittedForms) {
      if (err) {
        res.status(400).json({error: "An error occured while finding patient forms"});
        return;
      }
      res.json(submittedForms);
    });
  }
};
