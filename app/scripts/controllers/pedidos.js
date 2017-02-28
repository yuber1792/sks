'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:PedidosCtrl
 * @description
 * # PedidosCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('PedidosCtrl', function ($scope ,$firebaseArray) {
   
    var ref = firebase.database().ref().child("VisitaVenta");
    $scope.pedidosData = $firebaseArray(ref);
    console.log($scope.pedidosData);

     $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };

     for (var i = 0; i <  $scope.pedidosData.length ; i++) {
    	$scope.pedidosData[i].edit = false ; 
    }

    $scope.edit = function(id ,uid){
    		if( $scope.pedidosData[id].edit){
    			 $scope.pedidosData[id].edit = false ; 
    			 if($scope.pedidosData[id].entregado === undefined){
 						$scope.pedidosData[id].entregado  = false ;
    			 }
    			 ref.child(uid).update(
    				{

    					total : $scope.pedidosData[id].total,
    					guia : $scope.pedidosData[id].guia ,
    					numeroFactura: $scope.pedidosData[id].numeroFactura ,
    					entregado : $scope.pedidosData[id].entregado  
    					
    				}
    			);
    		}else{
    			$scope.pedidosData[id].edit = true ; 
    		}
       

    }
    //$scope.dataProductos = [];
    $scope.detallePedido = function(id){
        console.log("entra");
        $scope.dataProductos  =$scope.pedidosData[id].productos ; 
        console.log($scope.dataProductos);
       /* for (var i = 0; i < $scope.dataProducts.length; i++) {
           // $scope.dataProducts[id].descripcion = "" ;
            console.log($scope.dataProducts[i].idProducto);
            var refProd = firebase.database().ref().child("Productos/"+$scope.dataProducts[i].idProducto);
            refProd.once('value', function(snapshot) {
              console.log(snapshot.val());
             // $scope.des = JSON.stringify(snapshot.val()) ;
             // console.log($scope.des); 
              $scope.dataProducts[i] = snapshot.val();
//              $scope.dataProducts[i].descripcion = $scope.des ;
            });

        }*/

    }


  });
