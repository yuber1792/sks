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
     $scope.pedidosData.$loaded().then(function() {
          


            for (var j = 0; j <  $scope.pedidosData.length ; j++) {
                console.log("for");
        
                $scope.pedidosData[j].editp = false ; 
              }

        });

  

     $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };


    $scope.edit = function(id ,uid){

    


       console.log("entra " + id + " uid  = " + uid);
        for (var j = 0; j <  $scope.pedidosData.length ; j++) {

            if($scope.pedidosData[j].$id === uid){
               console.log("encontro igual");

              if( $scope.pedidosData[j].editp){

                  $scope.pedidosData[j].editp = false ; 
                  if($scope.pedidosData[j].entregado === undefined){
                    $scope.pedidosData[j].entregado  = false ;
                 }
                  if($scope.pedidosData[j].guia === undefined || $scope.pedidosData[j].guia === null){
                     $scope.pedidosData[j].guia  =" ";

                  }    
                  ref.child(uid).update(
                    {

                      total : $scope.pedidosData[j].total,
                      guia : $scope.pedidosData[j].guia ,
                      numeroFactura: $scope.pedidosData[j].numeroFactura ,
                      entregado : $scope.pedidosData[j].entregado  
              
                    }
                  );
                }else{
            
                 $scope.pedidosData[j].editp = true ; 
                 console.log("activar" +   $scope.pedidosData[j].editp);
                }


            }
               
        }




       

    }
    //$scope.dataProductos = [];
    $scope.detallePedido = function(id){


         for (var j = 0; j <  $scope.pedidosData.length ; j++) {
             if($scope.pedidosData[j].$id === id){
                      console.log("entra");
                     $scope.dataProductos  =$scope.pedidosData[j].productos ; 
                      console.log($scope.dataProductos);
             }

         }

      
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
