'use strict';

angular.module('register')
  .service('RegisterService', ['$http', function($http) {
  	  //Works with the registration API to post to server
      this.reg = function(user) {
        return $http.post('https://blue-jay.herokuapp.com/api/register', user);
      };
  }]);