function AppCtrl($scope, $http, $interval, $window){
	var r=0;
	var count =0;
	var x=500;
	var p =0;
	var y = 1000;
	console.log("LOL ko");
	var data="";
	var key="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NWQ4ZjJlZjI4Nzk3MjIwMjMxZDA5Y2MiLCJsb2NhbCI6eyJwYXNzd29yZCI6IiQyYSQwOSRZdkxaOXAxSllHbGtJekcxdm5oVkJ1ZTFLcHJJbkNCcXplQ2JLVVBCeWo0ZU1VMldzbmUwNiIsInVzZXJuYW1lIjoia28ifX0.cxeqi6GsgoOJLw89zjRPmobBd1-DS0OqpA6Rm1SIC3M";
	var refresh = function(){
		$scope.c = "Data From Sensor Node: ";
	
	
	$http.get('/api/angData?token='+key).success(function(response){
		
    console.log("GOT IT BIT");
 

    	if(response.temp&&response.hum&&response.pot=="nan"){
       $scope.datalist = {
       	temp: "Not Available",
       	hum: "Not Available",
       	pot: "Not Available"
       };
	}
	else{
    $scope.datalist = response;
}
    $scope.types="";


	});
};
var gets = function(){
$http.get('/api/st?token='+key).success(function(response){
	count = 0;
	$scope.cl= "green";
$scope.t = "Connected!";
r=r+1;
});
if(p==r){
count= count+1;
var to = count;
if(to%2 == 0){
	var f = 10-(count/2);
	var ch = ".";
	var str;
	$scope.cl = "red";
$scope.t = "Error Connecting in "+ f;
}


if(count==20){
	$window.location = "/dash";
}

}
if(p!=r){
	p=r;
}
};
$interval(function(){
	gets();
refresh();
},x);
}