'use strict';

angular.module('register')
  .controller('RegisterController', ['$scope','$location', 'RegisterService',function($scope,$location, RegisterService){
  		$scope.user = {email: '', password: ''};
      $scope.pass = '';
      $scope.err=false;
      $scope.errorMessage='';
  		$scope.reg = function(){
        if($scope.user.email==''){
          $scope.errorMessage='Email and Password and mandatory fields';
        }
        //display the error message if passwords differ
        else if($scope.pass!=$scope.user.password){
          $scope.errorMessage='Please make sure your passwords match';
          return;
        }
        //display the error message if passwords differ
        else if($scope.pass.length<4){
          $scope.errorMessage='Password must be at least 4 characters';
          return;
        }
        else{
  		    RegisterService.reg($scope.user)
          //when the API call was a success
      	  .success(function(data){
        	account.dat = data;
          $location.path(data.successRedirect);
          return data;
      	 })
      	 .error(function(err){
            $scope.errorMessage = err;
       	  	return err;
     	  });
      }
        

  		};
  }]);
