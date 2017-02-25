app.controller('allocateController',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){


	$scope.collapse=function(){
		$scope.person= false;
	}
	$scope.expand=function(data){
		$scope.resourceDetails=[];
		
		for(var i=0;i<$rootScope.groups.length;i++){
			var obj =$rootScope.groups[i];
										
			if(data.ASG==$rootScope.groups[i].ASG && data.Portfolio==$rootScope.groups[i].Portfolio 
				&& data.SubPortfolio==$rootScope.groups[i].Sub_x0020__x002d__x0020_Portfoli 
				&& data.Project==$rootScope.groups[i].Invoice_x0020_Forecast 
				&& data.ClarityId==$rootScope.groups[i].Clarity_x0020_Id){
				
				var actuals=0;
				var forecast=0;
				var forecastArray=[];
				for(var j=0;j<$rootScope.monthActualsG.length;j++){
					var monthString=$rootScope.monthActualsG[j];
					if(obj[monthString]!=null){
					actuals=actuals+obj[monthString];
						
					}
					//actuals=obj[monthString];
					
				}
				for(var k=0;k<$rootScope.monthForecastG.length;k++){
					var frmonthString=$rootScope.monthForecastG[k];
						forecastArray.push(obj[frmonthString]);
				}
				$scope.resourceDetails.push({
						Name:$rootScope.groups[i].Resource_x0020_Name,
						Actuals:actuals,
						forecast1:forecastArray[0],
						forecast2:forecastArray[1],
						forecast3:forecastArray[2],
						forecast4:forecastArray[3],
						forecast5:forecastArray[4]
						});
				
			}
		}
		console.log("length is"+$scope.resourceDetails.length);
		$scope.person=true;
	}
	




}]);