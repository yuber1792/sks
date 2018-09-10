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
      var ref = firebase.database().ref().child("ClientesDesplazamiento");
      $scope.clientesData = $firebaseArray(ref);
      //$scope.clientes1  = JSON.stringify($scope.clientes);
      console.log($scope.clientesData);
       for (var i = 0; i <  $scope.clientesData.length ; i++) {
    	   $scope.clientesData[i].edit = false ; 
         if($scope.clientesData[i].requiereQr === undefined || $scope.clientesData[i].requiereQr === false){
            $scope.clientesData[i].requiereQr = false ;
         }else{
              $scope.clientesData[i].requiereQr = true ;
         }
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
                    if($scope.clientesData[i].requiereQr === undefined){
                        $scope.clientesData[i].requiereQr = false;
                      }

                      if($scope.clientesData[i].recomiendaSkink === undefined){
                        $scope.clientesData[i].recomiendaSkink = false;
                      }
                        
                         if($scope.clientesData[i].dispensador === undefined){
                        $scope.clientesData[i].dispensador = false;
                      }

                       if($scope.clientesData[i].dispensadorRecomiendaSkink === undefined){
                        $scope.clientesData[i].dispensadorRecomiendaSkink = false;
                      } 

                       if($scope.clientesData[i].usaProductosSkink === undefined){
                        $scope.clientesData[i].usaProductosSkink = false;
                      }  

                       if($scope.clientesData[i].clienteSkink === undefined){
                        $scope.clientesData[i].clienteSkink = false;
                      }                      

                       if($scope.clientesData[i].alias === undefined){
                        $scope.clientesData[i].alias = '';
                      }  

                       if($scope.clientesData[i].nitCC === undefined){
                        $scope.clientesData[i].nitCC = '';
                      }
                       if($scope.clientesData[i].tipoCliente === undefined){
                        $scope.clientesData[i].tipoCliente = '';
                      } 
                       if($scope.clientesData[i].nombreNegocio === undefined){
                        $scope.clientesData[i].nombreNegocio = '';
                      }
                       if($scope.clientesData[i].ciudad === undefined){
                        $scope.clientesData[i].ciudad = '';
                      }  
                        if($scope.clientesData[i].telefono === undefined){
                        $scope.clientesData[i].telefono = '';
                      }  
                        if($scope.clientesData[i].email === undefined){
                        $scope.clientesData[i].email = '';
                      } 

                        if($scope.clientesData[i].redesSociales === undefined){
                        $scope.clientesData[i].redesSociales = '';
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
                            dispensador:$scope.clientesData[i].dispensador,
                            dispensadorRecomiendaSkink:$scope.clientesData[i].dispensadorRecomiendaSkink,
                            //nuevos campos para export excel 
                            alias:$scope.clientesData[i].alias,
                            nitCC :$scope.clientesData[i].nitCC,
                            latitud :$scope.clientesData[i].latitud,
                            longitud :$scope.clientesData[i].longitud,
                            tipoCliente : $scope.clientesData[i].tipoCliente,
                            nombreNegocio : $scope.clientesData[i].nombreNegocio,
                            ciudad : $scope.clientesData[i].ciudad,
                            telefono : $scope.clientesData[i].telefono,
                            email : $scope.clientesData[i].email,
                            redesSociales : $scope.clientesData[i].redesSociales,
                            requiereQr :  $scope.clientesData[i].requiereQr

                          }

                      );
                 }else{
                  console.log("inactiva");
                  $scope.clientesData[i].edit = true;                  
                 }
    	        }
         }

    }


     $scope.exportInfo  = [];
     $scope.exportData = function () {
       
       for (var i =0; i <  $scope.clientesData.length; i++) {
        $scope.export = {};
        console.log("alias = " + $scope.clientesData[i].alias);

            if($scope.clientesData[i].alias === undefined || $scope.clientesData[i].alias === null) {
              $scope.export.alias =   " " ; 
            }
            else{ 
              $scope.export.alias = $scope.clientesData[i].alias ; 
            }

            if($scope.clientesData[i].nombreCliente === undefined ) {
              $scope.export.nombreCliente =   "" ; 
            }
            else{ 
              $scope.export.nombreCliente = $scope.clientesData[i].nombreCliente ; 
            }

            if($scope.clientesData[i].nitCC === undefined) {
              $scope.export.nitCC =   "" ; 
            }
            else{ 
              $scope.export.nitCC = $scope.clientesData[i].nitCC ; 
            }

            if($scope.clientesData[i].nombreNegocio === undefined) {
              $scope.export.nombreNegocio =   "" ; 
            }
            else{ 
              $scope.export.nombreNegocio = $scope.clientesData[i].nombreNegocio ; 
            }

            if($scope.clientesData[i].tipoCliente === undefined) {
              $scope.export.tipoCliente =   "" ; 
            }
            else{ 
              $scope.export.tipoCliente = $scope.clientesData[i].tipoCliente ; 
            }

            if($scope.clientesData[i].ciudad === undefined) {
              $scope.export.ciudad =   "" ; 
            }
            else{ 
              $scope.export.ciudad = $scope.clientesData[i].ciudad ; 
            }

            if($scope.clientesData[i].telefono === undefined) {
              $scope.export.telefono =   "" ; 
            }
            else{ 
              $scope.export.telefono = $scope.clientesData[i].telefono ; 
            }

             if($scope.clientesData[i].direccion === undefined) {
              $scope.export.direccion =   "" ; 
            }
            else{ 
              $scope.export.direccion = $scope.clientesData[i].direccion ; 
            }

             if($scope.clientesData[i].email === undefined) {
              $scope.export.email =   "" ; 
            }
            else{ 
              $scope.export.email = $scope.clientesData[i].email ; 
            }

            if($scope.clientesData[i].redesSociales === undefined) {
              $scope.export.redesSociales =   "" ; 
            }
            else{ 
              $scope.export.redesSociales = $scope.clientesData[i].redesSociales ; 
            }
             if($scope.clientesData[i].requiereQr === undefined) {
              $scope.export.requiereQr =   false ; 
            }
            else{ 
              $scope.export.requiereQr = $scope.clientesData[i].requiereQr ; 
            }
             $scope.exportInfo.push($scope.export);
      
       }

        alasql('SELECT * INTO XLSX("ClienteData.xlsx",{headers:true}) FROM ?',[ $scope.exportInfo]);
    };
    
  
  });
