function AppCtrl($scope, $http, $window){
	console.log("LOL ko");
	var idedit="";
	var  rf = "";
	var refresh = function(){
		

	$http.get('/apanel/data').success(function(response){
		$scope.v = "!a";
		    console.log("GOT IT BIT");
    $scope.contactlist = response;
    $scope.contact="";

	});
};
var refresh2 = function(){
	$http.get('/apanel/data2').success(function(response){
    console.log("GOT IT BIT");
    $scope.v = "a";
   

    $scope.contactlist = response;
    $scope.contact="";

	});
};
	refresh();
  $scope.addContact = function(){
console.log($scope.contact);
$http.get('/apanel/data2').success(function(response){
$scope.contact = response;
refresh2();

});
};
  $scope.ul = function(){
console.log($scope.contact);
$http.get('/apanel/data').success(function(response){
$scope.contact = response;
$scope.pgs = "!b";
refresh();
});
};

$scope.remove = function(id){
console.log(id);
if($scope.v=="!a"){
$http.delete('/apanel/delete/' + id).success(function(response){
	refresh();

});
}
if($scope.v=="a"){
	$http.delete('/apanel/deleteA/' + id).success(function(response){
	refresh2();

});
}
};
$scope.edit= function(id){
console.log(id);
$http.get('/apanel/editu/'+ id).success(function(response){
$scope.lol = response.local.username;
rf = $scope.lol;
idedit = response._id;

});

};
$scope.ma= function(id){
console.log(id);
$http.get('/apanel/ma/'+ id).success(function(response){
	  $scope.v = "a";
	  $scope.pgs ="b";
	refresh2();
});
};
$scope.rv= function(id){
console.log(id);
$http.get('/apanel/rv/'+ id).success(function(response){
	  $scope.v = "a";
	  $scope.pgs ="b";
	refresh2();
});
};
$scope.update = function(){
	console.log(idedit);
		$http.get('/apanel/updateuser/'+idedit+$scope.lol).success(function(response){
refresh();
$scope.lol="";
	});

};
$scope.deselect = function(){
	$http.get('/apanel/logout').success(function(response){
	$window.location = "/auth";
	});
}
}