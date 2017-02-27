'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:VisitasCtrl
 * @description
 * # VisitasCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('VisitasCtrl', function ($scope ,$firebaseArray) {
  
   	//$scope.apoyoVisitas  = [];
  
    var ref = firebase.database().ref().child("VisitaApoyo");
    $scope.apoyoVisitas = $firebaseArray(ref);

    var refCobro = firebase.database().ref().child("VisitaCobro");
    $scope.apoyoCobro = $firebaseArray(refCobro);
    
    var refCumplimiento = firebase.database().ref().child("VisitaCumplimiento");
    $scope.apoyoCumplimiento = $firebaseArray(refCumplimiento);

    var refReclamacion = firebase.database().ref().child("VisitaReclamacion");
    $scope.apoyoReclamacion = $firebaseArray(refReclamacion);    

    var refEntrega = firebase.database().ref().child("VisitaEntrega");
    $scope.apoyoEntrega = $firebaseArray(refEntrega); 
  	
    $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };
  });
