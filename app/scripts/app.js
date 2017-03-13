'use strict';

/**
 * @ngdoc overview
 * @name skinkApp
 * @description
 * # skinkApp
 *
 * Main module of the application.
 */
angular
  .module('skinkApp', [
    'ngMaterial',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'angularUtils.directives.dirPagination'
    
  ])
  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/inventario', {
        templateUrl: 'views/inventario.html',
        controller: 'InventarioCtrl',
        controllerAs: 'inventario'
      })
      .when('/clientes', {
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes'
      })
      .when('/visitas', {
        templateUrl: 'views/visitas.html',
        controller: 'VisitasCtrl',
        controllerAs: 'visitas'
      })
      .when('/pedidos', {
        templateUrl: 'views/pedidos.html',
        controller: 'PedidosCtrl',
        controllerAs: 'pedidos'
      })
      .when('/usuarios', {
        templateUrl: 'views/usuarios.html',
        controller: 'UsuariosCtrl',
        controllerAs: 'usuarios'
      })
      .when('/roles', {
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        controllerAs: 'roles'
      })
      .otherwise({
        redirectTo: '/visitas'
      });
  });
