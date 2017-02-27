'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('ClientesCtrl', function ($scope ,$firebaseArray ) {
      var ref = firebase.database().ref().child("Clientes");
      $scope.clientesData = $firebaseArray(ref);
      //$scope.clientes1  = JSON.stringify($scope.clientes);
      console.log($scope.clientesData);
       for (var i = 0; i <  $scope.clientesData.length ; i++) {
    	$scope.clientesData[i].edit = false ; 
    }


    $scope.edit = function (id ,uidCliente){
    	if($scope.clientesData[id].edit){
    		$scope.clientesData[id].edit = false ; 
    		//alert("editar" + uidCliente);
    		if($scope.clientesData[id].recomiendaSkink === undefined){
   				$scope.clientesData[id].recomiendaSkink = false;

    		}
    		ref.child(uidCliente).update(
    							{
    								nombreCliente :$scope.clientesData[id].nombreCliente,
    								direccion :$scope.clientesData[id].direccion,
    								quienTomaDesicion :$scope.clientesData[id].quienTomaDesicion,
    								distribuidorPrincipal :$scope.clientesData[id].distribuidorPrincipal,
    								observaciones :$scope.clientesData[id].observaciones,
    								clienteSkink :$scope.clientesData[id].clienteSkink,
    								usaProductosSkink :$scope.clientesData[id].usaProductosSkink,
    								recomiendaSkink :$scope.clientesData[id].recomiendaSkink,
    							}

    			);
    	}else{
    		$scope.clientesData[id].edit = true; 
    	}


    }
  });
