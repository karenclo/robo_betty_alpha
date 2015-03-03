'use strict';

angular.module('signin')
  .service('SigninService', ['$http', function($http) {
  	  //API call to login
      this.login = function(user) {
        return $http.post('https://blue-jay.herokuapp.com/api/login', user);
      };
  }]);