'use strict';

/**
 * @ngdoc function
 * @name skinkApp.controller:UsuariosCtrl
 * @description
 * # UsuariosCtrl
 * Controller of the skinkApp
 */
angular.module('skinkApp')
  .controller('UsuariosCtrl', function ($scope ,$firebaseArray ,$mdDialog) {
  


    var refUser = firebase.database().ref().child("UsuariosRol");
    $scope.usuariosRol = $firebaseArray(refUser);
    console.log($scope.usuariosRol);

    
     for (var i = 0; i <  $scope.usuariosRol.length ; i++) {
    	$scope.usuariosRol[i].edit = false ; 
    }

    $scope.edit  = function(index  ,uid ){
		if($scope.usuariosRol[index].edit){
		     $scope.usuariosRol[index].edit = false;
		     	 refUser.child(uid).update(
    				{

    					nombre : $scope.usuariosRol[index].nombre,
    					clave : $scope.usuariosRol[index].clave ,
    					rol: $scope.usuariosRol[index].rol 
    					
    				}); 
		}else{
			$scope.usuariosRol[index].edit = true; 
		}

    }
    

    $scope.add = function (){
    	if($scope.muestraAdd){
    				if( $scope.nuevoUsuario.nombre  === " "
    				 ||  $scope.nuevoUsuario.nombre === undefined
    				 || $scope.nuevoUsuario.nombre === null  ){
    				 	 $scope.muestraAdd =false  ;
	    			     var ref = firebase.database().ref().child("UsuariosRol");
	    			     var newPostKey = firebase.database().ref().child("UsuariosRol").push().key;
	    			     ref.child(newPostKey).update(
    			   				{
    			   					nombre : $scope.nuevoUsuario.nombre ,
    			   					clave : $scope.nuevoUsuario.clave,
			    					rol : $scope.nuevoUsuario.rol
			    					
    			   				}
    			   			);
    			  		 $scope.nuevoUsuario = {};
    			  		 $scope.nuevoUsuario.nombre= " ";

    				}else{
    				  $scope.muestraAdd =true ;		
    				}
    			
		    }else{
		    	$scope.muestraAdd =true ;
		    }
    	
    }


     $scope.showConfirm = function(ev ,id ) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Eliminar usuario')
          .textContent('Esta seguro que desea eliminar el usuario ?.')
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


  $scope.idDelete = 0 ; 
    $scope.delete = function(id){
		$scope.idDelete = id ; 
   		$scope.showConfirm(id);
    }

    $scope.eliminar = function(){
    	var ref = firebase.database().ref().child("UsuariosRol");
    	console.log("id eliminar "  + $scope.idDelete ) ; 
    	ref.child($scope.idDelete).remove();
 
    }





  });
