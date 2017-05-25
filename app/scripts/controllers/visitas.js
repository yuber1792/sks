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
      $scope.dataExport = [];
    $scope.exportar=function(tipo){
      $scope.dataExport = [];
      if(tipo === "Apoyo"){
  
        
        for (var i = 0; i <$scope.apoyoVisitas.length ; i++) {
            $scope.export  = {};
            $scope.export.idCLiente = $scope.apoyoVisitas[i].idCliente;
            $scope.export.fecha = new Date($scope.apoyoVisitas[i].fecha);
            $scope.export.nombreCLiente = $scope.apoyoVisitas[i].nombreCliente;
            $scope.export.observaciones = $scope.apoyoVisitas[i].observaciones;
            $scope.export.vendedor = $scope.apoyoVisitas[i].vendedor;
            $scope.dataExport.push($scope.export);    

        }

         alasql('SELECT * INTO XLSX("apoyo.xlsx",{headers:true}) FROM ?',[ $scope.dataExport]);

      }

       if(tipo === "Cumplimiento"){
  
        
        for (var i = 0; i <$scope.apoyoCumplimiento.length ; i++) {
          $scope.export  = {};
            $scope.export.idCliente = $scope.apoyoCumplimiento[i].icCliente;
            $scope.export.fecha = new Date($scope.apoyoCumplimiento[i].fecha);
            $scope.export.nombreCLiente = $scope.apoyoCumplimiento[i].nombreCliente;
            $scope.export.observaciones = $scope.apoyoCumplimiento[i].observaciones;
            $scope.export.vendedor = $scope.apoyoCumplimiento[i].vendedor;
            $scope.dataExport.push($scope.export);    

        }

         alasql('SELECT * INTO XLSX("cumplimiento.xlsx",{headers:true}) FROM ?',[ $scope.dataExport]);

      }

        if(tipo === "Cobro"){
  
        
        for (var i = 0; i <$scope.apoyoCobro.length ; i++) {
          $scope.export  = {};
            $scope.export.idCliente = $scope.apoyoCobro[i].icCliente;
            $scope.export.fecha = new Date($scope.apoyoCobro[i].fecha);
            $scope.export.nombreCLiente = $scope.apoyoCobro[i].nombreCliente;
            $scope.export.observaciones = $scope.apoyoCobro[i].observaciones;
            $scope.export.vendedor = $scope.apoyoCobro[i].vendedor;
            if($scope.apoyoCobro[i].realizoPago){
                $scope.export.realizoPago = "Si";
            }else{
                $scope.export.realizoPago = "No";
            }

            $scope.dataExport.push($scope.export);    

        }

         alasql('SELECT * INTO XLSX("cobro.xlsx",{headers:true}) FROM ?',[ $scope.dataExport]);

      }


       if(tipo === "Entrega"){
  
        
        for (var i = 0; i <$scope.apoyoEntrega.length ; i++) {
          $scope.export  = {};
            $scope.export.idCliente = $scope.apoyoEntrega[i].icCliente;
            $scope.export.fecha = new Date($scope.apoyoEntrega[i].fecha);
            $scope.export.nombreCLiente = $scope.apoyoEntrega[i].nombreCliente;
            $scope.export.observaciones = $scope.apoyoEntrega[i].observaciones;
            $scope.export.vendedor = $scope.apoyoEntrega[i].vendedor;

            if($scope.apoyoEntrega[i].facturaNumero === undefined ||  $scope.apoyoEntrega[i].facturaNumero === null ){
                $scope.export.facturaNumero= "";
            }else{
                $scope.export.facturaNumero = $scope.apoyoEntrega[i].facturaNumero;
            }

            if($scope.apoyoEntrega[i].facturaCancelada){
                $scope.export.realizoPago = "Si";
            }else{
                $scope.export.realizoPago = "No";
            }

            $scope.dataExport.push($scope.export);    

        }

         alasql('SELECT * INTO XLSX("entrega.xlsx",{headers:true}) FROM ?',[ $scope.dataExport]);

      }

       if(tipo === "Reclamacion"){
  
        
        for (var i = 0; i <$scope.apoyoReclamacion.length ; i++) {
          $scope.export  = {};
            $scope.export.idCliente = $scope.apoyoReclamacion[i].icCliente;
            $scope.export.fecha = new Date($scope.apoyoReclamacion[i].fecha);
            $scope.export.nombreCLiente = $scope.apoyoReclamacion[i].nombreCliente;
            $scope.export.observaciones = $scope.apoyoReclamacion[i].observaciones;
            $scope.export.vendedor = $scope.apoyoReclamacion[i].vendedor;
            $scope.dataExport.push($scope.export);    

        }

         alasql('SELECT * INTO XLSX("reclamacion.xlsx",{headers:true}) FROM ?',[ $scope.dataExport]);

      }


    }

  });
