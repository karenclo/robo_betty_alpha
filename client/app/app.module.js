'use strict';

angular.module('robobetty', 
  [
  'ui.router',
  'widget',
  'product', 
  'dashboard',
  'ui.bootstrap',
  'signin',
  'register',
  'DashboardFormBuilderModule'
  ])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/dashboard');
  $stateProvider
  .state('common',{
    templateUrl: 'views/components/dashboard/views/dashboard.html',
    abstract: true
  })
  .state('home', {
    url: '/home',
    templateUrl: 'views/components/home/views/home.html'
  })
  .state('createForm', {
    url: '/createform',
    controller: 'FormCreateController',
    templateUrl: 'views/components/dashboard/formBuilder/views/create.html'
  })
  .state('product', {
    url: '/product',
    templateUrl: 'views/components/product/views/product.html'
  })
  .state('dashboard', {
    url: '/dashboard',
    template: '',
    parent: 'common'
  })
  .state('doctors', {
    url: '/doctors',
    templateUrl: 'views/components/dashboard/doctors/views/doctors.html',
    parent: 'common'
  })
  .state('signin', {
    url: '/signin',
    templateUrl: 'views/components/receptionistPortal/signin/views/login.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: 'views/components/receptionistPortal/register/views/register.html'
  });
});

