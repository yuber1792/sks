'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:InventarioCtrl
 * @description
 * # InventarioCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('InventarioCtrl', function ($scope , $firebaseArray ,$mdDialog) {
     var ref = firebase.database().ref().child("Productos");
    $scope.productos = $firebaseArray(ref);
    var refBodegas = firebase.database().ref().child("Bodegas");
    $scope.bodegasLista =  $firebaseArray(refBodegas);
    console.log("Bodegas"); 
    console.log($scope.bodegasLista);
    $scope.muestraAdd =false  ; 

    console.log($scope.productos);

    for (var i = 0; i <  $scope.productos.length ; i++) {
    	$scope.productos[i].edit = false ; 
    }

    $scope.edit = function(id){
    	if( $scope.productos[id].edit){
    		$scope.productos[id].edit = false ;
    		//alert($scope.productos[id]);
    		console.log($scope.productos[id]);		
    		ref.child($scope.productos[id].CodigoProducto).update(
    				{

    					codigoSkink : $scope.productos[id].codigoSkink,
    					cantidadStock : $scope.productos[id].cantidadStock,
    					descripcion : $scope.productos[id].descripcion,
    					precioTatuador : $scope.productos[id].precioTatuador,
    					precioDistribuidor : $scope.productos[id].precioDistribuidor,
              precioCliente : $scope.productos[id].precioCliente
    				}
    			);
    	}else{
    		$scope.productos[id].edit = true ;

    	}
    }
 $scope.nuevoProducto = {};
    $scope.add = function(){
        console.log("entra nuevo producto");
    		if($scope.muestraAdd){

    			 $scope.muestraAdd =false  ;
    			   var ref = firebase.database().ref().child("Productos");
    			   var newPostKey = firebase.database().ref().child("Productos").push().key;
    			   ref.child(newPostKey).update(
    			   				{
    			   					CodigoProducto : newPostKey ,
    			   					codigoSkink : $scope.nuevoProducto.codigoSkink,
			    					  cantidadStock : $scope.nuevoProducto.cantidadStock,
			    					  descripcion : $scope.nuevoProducto.descripcion,
			    					  precioTatuador : $scope.nuevoProducto.precioTatuador,
			    				  	precioDistribuidor :$scope.nuevoProducto.precioDistribuidor,
                      precioCliente :$scope.nuevoProducto.precioCliente
    			   				}
    			   			);
              
            
            
              console.log("tamaño de  bodegas " +  $scope.bodegasLista.length );
               for (var i = 0; i <  $scope.bodegasLista.length ; i++) {
                  console.log("entra for " +$scope.bodegasLista[i].$id);
                   refBodegas.child($scope.bodegasLista[i].$id + "/"  +newPostKey ).set({
                        CodigoProducto : newPostKey ,
                        codigoSkink : $scope.nuevoProducto.codigoSkink,
                        cantidadStock : 0,
                        descripcion : $scope.nuevoProducto.descripcion,
                        precioTatuador : $scope.nuevoProducto.precioTatuador,
                        precioDistribuidor :$scope.nuevoProducto.precioDistribuidor,
                        precioCliente :$scope.nuevoProducto.precioCliente
                  }); 

               }

             
              

    		}else{
    			 $scope.muestraAdd =true  ;
    		}


    }


     $scope.showConfirm = function(ev ,id ) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Eliminar Producto')
          .textContent('Esta seguro que desea eliminar el producto ?.')
          .ariaLabel('Lucky day')
          .targetEvent(ev)
          .ok('Si')
          .cancel('Cancelar');

    $mdDialog.show(confirm).then(function() {
      $scope.status = 'You decided to get rid of your debt.';
     // alert("ok");
       $scope.eliminar();
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  }

  $scope.idDelete = 0 ; 
    $scope.delete = function(id){
		$scope.idDelete = id ; 
   		$scope.showConfirm(id);
    }

    $scope.eliminar = function(){
    	var ref = firebase.database().ref().child("Productos");
    	console.log("id eliminar "  + $scope.idDelete ) ; 
    	ref.child($scope.idDelete).remove();
      for (var i = 0; i <  $scope.bodegasLista.length ; i++) {
        console.log("entra for " + $scope.bodegasLista[i].$id);
        refBodegas.child($scope.bodegasLista[i].$id+"/"+$scope.idDelete).remove();
      }
 
    }



  });
