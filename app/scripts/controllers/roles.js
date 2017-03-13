'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:RolesCtrl
 * @description
 * # RolesCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('RolesCtrl', function ($scope , $firebaseArray) {
   
    var refRol= firebase.database().ref().child("Roles");
    $scope.rolesDat = $firebaseArray(refRol);
    console.log($scope.rolesDat);

    
     for (var i = 0; i <  $scope.rolesDat.length ; i++) {
    	$scope.rolesDat[i].edit = false ; 
    }
  });
