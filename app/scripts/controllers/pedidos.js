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


     $scope.exportInfo  = [];
     $scope.exportData = function () {
      $scope.exportInfo = [];
       
       for (var i =0; i <  $scope.pedidosData.length; i++) {
             
           //  console.log($scope.pedidosData[i].productos);

             for (var j = 0; j < $scope.pedidosData[i].productos.length ; j++) {
                  $scope.export = {};

                  if($scope.pedidosData[i].numeroFactura === undefined || $scope.pedidosData[i].numeroFactura === null) {
                    $scope.export.numeroFactura =   " " ; 
                  }
                  else{ 
                    $scope.export.numeroFactura = $scope.pedidosData[i].numeroFactura ; 
                  }

                   if($scope.pedidosData[i].fecha === undefined || $scope.pedidosData[i].fecha === null) {
                    $scope.export.fecha =   " " ; 
                  }
                  else{ 
                    $scope.export.fecha = new Date($scope.pedidosData[i].fecha) ; 
                  }

                  if($scope.pedidosData[i].alias === undefined || $scope.pedidosData[i].alias === null) {
                    $scope.export.alias =   " " ; 
                  }
                  else{ 
                    $scope.export.alias = $scope.pedidosData[i].alias ; 
                  }

                  if($scope.pedidosData[i].cliente === undefined || $scope.pedidosData[i].cliente === null) {
                    $scope.export.cliente =   " " ; 
                  }
                  else{ 
                    $scope.export.cliente = $scope.pedidosData[i].cliente ; 
                  }
                   if($scope.pedidosData[i].nitCliente === undefined || $scope.pedidosData[i].nitCliente === null) {
                    $scope.export.nitCliente =   " " ; 
                  }
                  else{ 
                    $scope.export.nitCliente = $scope.pedidosData[i].nitCliente ; 
                  }

                   if($scope.pedidosData[i].tipoCliente === undefined || $scope.pedidosData[i].tipoCliente === null) {
                    $scope.export.tipoCliente =   " " ; 
                  }
                  else{ 
                    $scope.export.tipoCliente = $scope.pedidosData[i].tipoCliente ; 
                  }
                  
                  if($scope.pedidosData[i].ciudad === undefined || $scope.pedidosData[i].ciudad === null) {
                    $scope.export.ciudad =   " " ; 
                  }
                  else{ 
                    $scope.export.ciudad = $scope.pedidosData[i].ciudad ; 
                  }

                    console.log("******************************");

                    $scope.export.refProd = $scope.pedidosData[i].productos[j].codigoSkink ; 
                    console.log($scope.export.refProd);
                    console.log("******************************");                  

                  /*if($scope.pedidosData[i].cantidadVendidas === undefined || $scope.pedidosData[i].cantidadVendidas === null) {
                    $scope.export.cantidadVendidas =   " " ; 
                  }
                  else{ */
                    $scope.export.cantidadVendidas = $scope.pedidosData[i].productos[j].cantidad ; 
                 // }

                  /* if($scope.pedidosData[i].valorUnitario === undefined || $scope.pedidosData[i].valorUnitario === null) {
                    $scope.export.valorUnitario =   " " ; 
                  }
                  else{ */
                    $scope.export.valorUnitario = $scope.pedidosData[i].productos[j].valor ; 
                  //}

                   if($scope.pedidosData[i].descuento === undefined || $scope.pedidosData[i].descuento === null) {
                    $scope.export.descuento =   " " ; 
                  }
                  else{ 
                    $scope.export.descuento = $scope.pedidosData[i].descuento ; 
                  }

               /*   if($scope.pedidosData[i].valorVenta === undefined || $scope.pedidosData[i].valorVenta === null) {
                    $scope.export.valorVenta =   " " ; 
                  }
                  else{ */
                    $scope.export.valorVenta = $scope.pedidosData[i].productos[j].cantidad * $scope.pedidosData[i].productos[j].valor ; 
                 // }

                  if($scope.pedidosData[i].lote === undefined || $scope.pedidosData[i].lote === null) {
                    $scope.export.lote =   " " ; 
                  }
                  else{ 
                    $scope.export.lote = $scope.pedidosData[i].lote ; 
                  }

                  if($scope.pedidosData[i].tipoVenta === undefined || $scope.pedidosData[i].tipoVenta === null) {
                    $scope.export.tipoVenta =   " " ; 
                  }
                  else{ 
                    $scope.export.tipoVenta = $scope.pedidosData[i].tipoVenta ; 
                  }

                   if($scope.pedidosData[i].canalPago === undefined || $scope.pedidosData[i].canalPago === null) {
                    $scope.export.canalPago =   " " ; 
                  }
                  else{ 
                    $scope.export.canalPago = $scope.pedidosData[i].canalPago ; 
                  }

                   if($scope.pedidosData[i].entregado) {
                    $scope.export.estado =  "Entregado" ; 
                  }
                  else{ 
                   $scope.export.estado =  "Pedido" ; 
                  }

                  if($scope.pedidosData[i].guia === undefined || $scope.pedidosData[i].guia === null) {
                    $scope.export.guia =   " " ; 
                  }
                  else{ 
                    $scope.export.guia = $scope.pedidosData[i].guia ; 
                  }

                  if($scope.pedidosData[i].idVendedor === undefined || $scope.pedidosData[i].idVendedor === null) {
                    $scope.export.idVendedor =   " " ; 
                  }
                  else{ 
                    $scope.export.idVendedor = $scope.pedidosData[i].idVendedor ; 
                  }

                   if($scope.pedidosData[i].bodega === undefined || $scope.pedidosData[i].bodega === null) {
                    $scope.export.bodega =   " " ; 
                  }
                  else{ 
                    $scope.export.bodega = $scope.pedidosData[i].bodega ; 
                  }

                  if($scope.pedidosData[i].observaciones === undefined || $scope.pedidosData[i].observaciones === null) {
                    $scope.export.observaciones =   " " ; 
                  }
                  else{ 
                    $scope.export.observaciones = $scope.pedidosData[i].observaciones ; 
                  }


                   console.log($scope.export);
                  
                   $scope.exportInfo.push($scope.export);  

               
             }//fin segundo for 
        
    
       }//fin primer for 
       console.log($scope.exportInfo);
        alasql('SELECT * INTO XLSX("PediddosData.xlsx",{headers:true}) FROM ?',[ $scope.exportInfo]);
    };

  });
