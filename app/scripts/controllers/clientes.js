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
 
           for (var i = 0 ; i <  $scope.clientesData.length ; i++) {
             
             // console.log($scope.clientesData[i].$id + " -- " + uidCliente );
              if(uidCliente === $scope.clientesData[i].$id ){
                  console.log("entra edit");
                  if($scope.clientesData[i].edit){
                    console.log("activa");
                      $scope.clientesData[i].edit = false ; 
                      
                    //alert("editar" + uidCliente);
                      if($scope.clientesData[i].recomiendaSkink === undefined){
                        $scope.clientesData[i].recomiendaSkink = false;
                      }
                      ref.child(uidCliente).update(
                          {
                            nombreCliente :$scope.clientesData[i].nombreCliente,
                            direccion :$scope.clientesData[i].direccion,
                            quienTomaDesicion :$scope.clientesData[i].quienTomaDesicion,
                            distribuidorPrincipal :$scope.clientesData[i].distribuidorPrincipal,
                            observaciones :$scope.clientesData[i].observaciones,
                            clienteSkink :$scope.clientesData[i].clienteSkink,
                            usaProductosSkink :$scope.clientesData[i].usaProductosSkink,
                            recomiendaSkink :$scope.clientesData[i].recomiendaSkink,
                          }

                      );
                 }else{
                  console.log("inactiva");
                  $scope.clientesData[i].edit = true;                  
                 }
    	        }
         }

    }
  });
