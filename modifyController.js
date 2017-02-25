app.controller('modifyController',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){

	console.log($rootScope.editIds);
	$scope.visible=false;	
	var months=[];
	
	var d = new Date();
		
		months[0] = "January";
		months[1] = "February";
		months[2] = "March";
		months[3] = "April";
		months[4] = "May";
		months[5] = "June";
		months[6] = "July";
		months[7] = "August";
		months[8] = "September";
		months[9] = "October";
		months[10] = "November";
		months[11] = "December";
		
			
		$scope.getmonth=function(value){
			
		var i,j,k;	
		
		for(i=0;i<months.length;i++) {
				if(value == months[i]) {
						j=i;
						k=i;
						break;	
					}	
				}
				getArrayOfMonths(j,k,months);	
		}
			
		function getArrayOfMonths(j,k,months){
				$scope.nextMonths=[];
				for(var i=j;i<=11;i++){
					$scope.nextMonths.push(months[i]);	
				}
				for(var i=0;i<k;i++){
					$scope.nextMonths.push(months[i]);
				}
				console.log($scope.nextMonths);	
				$scope.visible=true;
	}
			 



}]);