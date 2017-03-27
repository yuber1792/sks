'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:BodegasCtrl
 * @description
 * # BodegasCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('BodegasCtrl', function ($scope , $firebaseArray ,$mdDialog) {
    $scope.nombreBodega  = "";
    var ref = firebase.database().ref().child("Productos");
    $scope.productos = $firebaseArray(ref);
   
    var refBodegas = firebase.database().ref().child("Bodegas");
    $scope.bodegasData = $firebaseArray(refBodegas);
    console.log("Bodegas");
    console.log($scope.bodegasData);    

    $scope.muestraAdd =false  ; 

   

   $scope.crearBodega  = function (){

   	  console.log($scope.nombreBodega);

   	  for (var i = 0; i <  $scope.productos.length ; i++) {
    	//console.log( $scope.productos[i].$id); 

    	firebase.database().ref('Bodegas/' + $scope.nombreBodega + "/"  +$scope.productos[i].$id ).set({
			    CodigoProducto : $scope.productos[i].$id ,
				codigoSkink : $scope.productos[i].codigoSkink,
				cantidadStock : 0,
				descripcion :  $scope.productos[i].descripcion,
				precioTatuador :  $scope.productos[i].precioTatuador,
				precioDistribuidor : $scope.productos[i].precioDistribuidor,
			  });
      }

   }
  $scope.nombreBodegaSel  = " " ; 
   $scope.editarBodega = function (nombreBodega){
      console.log(nombreBodega);
      $scope.nombreBodegaSel  = nombreBodega; 
       var ref = firebase.database().ref().child("Bodegas/"+nombreBodega);
    $scope.productosBod = $firebaseArray(ref);
      for (var i = 0; i <  $scope.productosBod.length ; i++) {
    	$scope.productosBod[i].edit = false ; 
    }
     console.log($scope.productosBod);


   }
   $scope.cantidadOriginal=  0 ;  
   $scope.editProducto = function (id){

   		if( $scope.productosBod[id].edit){
    		$scope.productosBod[id].edit = false ;
    		console.log("valor despues" +  $scope.productosBod[id].cantidadStock);
    		$scope.sumatoria = parseInt($scope.cantidadOriginal) + parseInt($scope.productosBod[id].cantidadStock);


    		//primera asignacion de stock a un producto en  la  bodega 
    		var refProdEdit = firebase.database().ref().child("Productos");
    		var refProdData = firebase.database().ref().child("Productos/"+$scope.productosBod[id].CodigoProducto);
    		if($scope.cantidadOriginal === 0 ){
    			console.log("cantidadOriginal  0 ");
    			


    			refProdData.once('value', function(snapshot) {
				  console.log("entra");
				  var originalBodega = snapshot.val().enBodega;
				   var total =parseInt(originalBodega) + parseInt($scope.sumatoria)  ; 
				   console.log(total);
					refProdEdit.child($scope.productosBod[id].CodigoProducto).update(
	    				{

	    					enBodega : total
	    					
	    				}
	    			);
				}); 
    		}else{
    			if(parseInt($scope.cantidadOriginal) < parseInt($scope.productosBod[id].cantidadStock) ){
				  		console.log("agrega a uno que ya tien en stock ");
				  		var restaTotal =  parseInt($scope.productosBod[id].cantidadStock) - $scope.cantidadOriginal ; 

				  		refProdData.once('value', function(snapshot) {
						  var originalBodega = snapshot.val().enBodega;
						   var total =parseInt(originalBodega) + parseInt(restaTotal)  ; 
						   console.log(total);
							refProdEdit.child($scope.productosBod[id].CodigoProducto).update(
			    				{

			    					enBodega : total
			    					
			    				}
			    			);
						}); 
				  }



				  if(parseInt($scope.cantidadOriginal) > parseInt($scope.productosBod[id].cantidadStock) && $scope.productosBod[id].cantidadStock  != 0 ){
				  		console.log("le quita  aun que ya tiene en stock  ");
				  		var restaTotal = $scope.cantidadOriginal  -   parseInt($scope.productosBod[id].cantidadStock) ; 

				  		refProdData.once('value', function(snapshot) {
						  var originalBodega = snapshot.val().enBodega;
						   var total =parseInt(originalBodega) - parseInt(restaTotal)  ; 
						   console.log(total);
							refProdEdit.child($scope.productosBod[id].CodigoProducto).update(
			    				{

			    					enBodega : total
			    					
			    				}
			    			);
						}); 
				  }
    			
    		}


    	

    		/*if($scope.productosBod[id].cantidadStock){


    		}else{

    		}*/

    		//alert($scope.productos[id]);
    		console.log($scope.productosBod[id]);	
    		var ref = firebase.database().ref().child("Bodegas/"+$scope.nombreBodegaSel);	
    		ref.child($scope.productosBod[id].CodigoProducto).update(
    				{

    					codigoSkink : $scope.productosBod[id].codigoSkink,
    					cantidadStock : $scope.productosBod[id].cantidadStock,
    					descripcion : $scope.productosBod[id].descripcion,
    					precioTatuador : $scope.productosBod[id].precioTatuador,
    					precioDistribuidor : $scope.productosBod[id].precioDistribuidor,
    				}
    			);



    	}else{
    		$scope.productosBod[id].edit = true ;
    		$scope.cantidadOriginal=   parseInt($scope.productosBod[id].cantidadStock) ;  
    		console.log("valor antes" + $scope.cantidadOriginal );

    	}

   }


   $scope.add  = function(){

	   	if($scope.muestraAdd){
	   		$scope.muestraAdd =false ; 
	   	}else{
	   	    $scope.muestraAdd =true ; 
	   	}

   }

     $scope.showConfirm = function(ev ,id ) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Eliminar Bodega')
          .textContent('Esta seguro que desea eliminar la bodega ?.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Si')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
      //alert("ok");
       $scope.eliminar();
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  }

  $scope.idDelete = "" ; 
    $scope.delete = function(id){
		$scope.idDelete = id ; 
   		$scope.showConfirm(id);
    }

    $scope.eliminar = function(){
    	var ref = firebase.database().ref().child("Bodegas");
    	console.log("id eliminar "  + $scope.idDelete ) ; 
    	ref.child($scope.idDelete).remove();
    }







  });
