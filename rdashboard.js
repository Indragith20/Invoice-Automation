app.controller('rdashboardController',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){
	$scope.back = function(){
		$location.path("/main");
	}

	$scope.backToMain = function(){
		$location.path("/");
	}

	$scope.showLoader = true;
	
	$http(
	{								
		url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceSampleList')/items?$top=4000",
		type : "GET",
		headers : {
			"accept" : "application/json;odata=verbose",
		}
	})
	.then (
			function(data) {
		$scope.showLoader = false;
		groups = data.data.d.results;

		console.log(groups.length);
		for (var i = 0; i < groups.length; i++) {
			delete groups[i]["Attachments"];
			delete groups[i]["AttachmentFiles"];
			delete groups[i]["AuthorId"];
			delete groups[i]["ContentTypeId"];
			delete groups[i]["Created"];
			delete groups[i]["EditorId"];
			delete groups[i]["FileSystemObjectType"];
			delete groups[i]["GUID"];
			//	                delete groups[i]["ID"];            
			delete groups[i]["Id"];
			delete groups[i]["Modified"];
			delete groups[i]["OData__UIVersionString"];
			delete groups[i]["RoleAssignments"];
			delete groups[i]["ContentType"];
			delete groups[i]["FieldValuesAsHtml"];
			delete groups[i]["FieldValuesAsText"];
			delete groups[i]["FieldValuesForEdit"];
			delete groups[i]["File"];
			delete groups[i]["FirstUniqueAncestorSecurableObject"];
			delete groups[i]["Folder"];
			delete groups[i]["ParentList"];
		}
		;

		
		
		$rootScope.groupMain = groups;
	
		
		$rootScope.flexArray = [];
		$rootScope.coreArray = [];
		$rootScope.ratecardArray = [];

		$scope.mainArray = [];
		
		for(var i=0;i<$rootScope.groupMain.length;i++) {
			
			if($rootScope.groupMain[i].Title == $rootScope.tsg) {
				
				if(null != $rootScope.groupMain[i].Role_x0020_type && $rootScope.groupMain[i].Role_x0020_type.toLowerCase()==="flex") {
					$rootScope.flexArray.push($rootScope.groupMain[i]);
					$scope.mainArray.push($rootScope.groupMain[i]);
				}

				else if(null != $rootScope.groupMain[i].Role_x0020_type && $rootScope.groupMain[i].Role_x0020_type.toLowerCase()==="core") {
					$rootScope.coreArray.push($rootScope.groupMain[i]);			
					$scope.mainArray.push($rootScope.groupMain[i]);
				}
				
				else if(null != $rootScope.groupMain[i].Role_x0020_type && $rootScope.groupMain[i].Role_x0020_type.toLowerCase()==="ratecard") {
					$rootScope.ratecardArray.push($rootScope.groupMain[i]);
					$scope.mainArray.push($rootScope.groupMain[i]);
				}

			}
		}
	
		console.log($rootScope.flexArray.length);
		console.log($rootScope.coreArray.length);
		console.log($rootScope.ratecardArray.length);
		console.log($scope.mainArray.length);
		/*********************************************************************************************************************/
		
		var month_core1 = 0;
		var month_core2 = 0;
		var month_core3 = 0;
		var month_core4 = 0;
		var month_core5 = 0;
		var month_core6 = 0;

		var month_flex1 = 0;
		var month_flex2 = 0;
		var month_flex3 = 0;
		var month_flex4 = 0;
		var month_flex5 = 0;
		var month_flex6 = 0;

		var month_rc1 = 0;
		var month_rc2 = 0;
		var month_rc3 = 0;
		var month_rc4 = 0;
		var month_rc5 = 0;
		var month_rc6 = 0;

		/*********************************************************************************************************************/
			$scope.res = [];
		    $scope.neededMonths = [];
		    $scope.selectedMonth = [];

		    var monthString = " ";

		    var now = new Date();
		    var month = now.getMonth();
		    var year = now.getFullYear();

			var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		    
		    $scope.res.push("Role Type");
		    $scope.res.push(names[month] + ' ' + year+' Actuals');

		    for (var i = 0; i < 6; ++i) {

		        $scope.res.push(names[month] + ' ' + year+' Forecast');
		    	$scope.neededMonths.push(names[month]);

		        ++month;
		        if(month === 12){
		            month = 0;
		            ++year;
		        }
		    }

		    for(var j = 0; j<$scope.neededMonths.length;j++) {
		    	$scope.selectedMonth.push($scope.neededMonths[j] + "_x002d_16"); 
			}

			console.log("$scope.selectedMonth-->"+$scope.selectedMonth);
		
		/************************************Core Calculation*********************************************************************************/
		for(var i=0;i<$rootScope.coreArray.length;i++){
				$rootScope.coreArray[i][$scope.selectedMonth[0]] = parseFloat($rootScope.coreArray[i][$scope.selectedMonth[0]]);
				if(!isNaN($rootScope.coreArray[i][$scope.selectedMonth[0]])) {
					month_core1 = month_core1 + $rootScope.coreArray[i][$scope.selectedMonth[0]];
					$scope.month_core1 = month_core1.toFixed(2);
					$scope.month_core1 = parseFloat($scope.month_core1);
				}
		}

		for(var i=0;i<$rootScope.coreArray.length;i++){
				$rootScope.coreArray[i][$scope.selectedMonth[1]] = parseFloat($rootScope.coreArray[i][$scope.selectedMonth[1]]);
				if(!isNaN($rootScope.coreArray[i][$scope.selectedMonth[1]])) {
					month_core2 = month_core2 + $rootScope.coreArray[i][$scope.selectedMonth[1]];
					$scope.month_core2 = month_core2.toFixed(2);
					$scope.month_core2 = parseFloat($scope.month_core2);
				}
		}

		for(var i=0;i<$rootScope.coreArray.length;i++){
				$rootScope.coreArray[i][$scope.selectedMonth[2]] = parseFloat($rootScope.coreArray[i][$scope.selectedMonth[2]]);
				if(!isNaN($rootScope.coreArray[i][$scope.selectedMonth[2]])) {
					month_core3 = month_core3 + $rootScope.coreArray[i][$scope.selectedMonth[2]];
					$scope.month_core3 = month_core3.toFixed(2);
					$scope.month_core3 = parseFloat($scope.month_core3);
				}
		}

		for(var i=0;i<$rootScope.coreArray.length;i++){
				$rootScope.coreArray[i][$scope.selectedMonth[3]] = parseFloat($rootScope.coreArray[i][$scope.selectedMonth[3]]);
				if(!isNaN($rootScope.coreArray[i][$scope.selectedMonth[3]])) {
					month_core4 = month_core4 + $rootScope.coreArray[i][$scope.selectedMonth[3]];
					$scope.month_core4 = month_core4.toFixed(2);
					$scope.month_core4 = parseFloat($scope.month_core4);
				}
		}

		for(var i=0;i<$rootScope.coreArray.length;i++){
				$rootScope.coreArray[i][$scope.selectedMonth[4]] = parseFloat($rootScope.coreArray[i][$scope.selectedMonth[4]]);
				if(!isNaN($rootScope.coreArray[i][$scope.selectedMonth[4]])) {
					month_core5 = month_core5 + $rootScope.coreArray[i][$scope.selectedMonth[4]];
					$scope.month_core5 = month_core5.toFixed(2);
					$scope.month_core5 = parseFloat($scope.month_core5);
				}
		}

		for(var i=0;i<$rootScope.coreArray.length;i++){
				$rootScope.coreArray[i][$scope.selectedMonth[5]] = parseFloat($rootScope.coreArray[i][$scope.selectedMonth[5]]);
				if(!isNaN($rootScope.coreArray[i][$scope.selectedMonth[5]])) {
					month_core6 = month_core6 + $rootScope.coreArray[i][$scope.selectedMonth[5]];
					$scope.month_core6 = month_core6.toFixed(2);
					$scope.month_core6 = parseFloat($scope.month_core6);
				}
		}
		
		/****************************Core Calculation******************************************************************************************/
		

		/****************************Flex Claculation*********************************************************************************************/
		for(var i=0;i<$rootScope.flexArray.length;i++){
				$rootScope.flexArray[i][$scope.selectedMonth[0]] = parseFloat($rootScope.flexArray[i][$scope.selectedMonth[0]]);
				if(!isNaN($rootScope.flexArray[i][$scope.selectedMonth[0]])) {
					month_flex1 = month_flex1 + $rootScope.flexArray[i][$scope.selectedMonth[0]];
					$scope.month_flex1 = month_flex1.toFixed(2);
					$scope.month_flex1 = parseFloat($scope.month_flex1);
				}
		}

		for(var i=0;i<$rootScope.flexArray.length;i++){
				$rootScope.flexArray[i][$scope.selectedMonth[1]] = parseFloat($rootScope.flexArray[i][$scope.selectedMonth[1]]);
				if(!isNaN($rootScope.flexArray[i][$scope.selectedMonth[1]])) {
					month_flex2 = month_flex2 + $rootScope.flexArray[i][$scope.selectedMonth[1]];
					$scope.month_flex2 = month_flex2.toFixed(2);
					$scope.month_flex2 = parseFloat($scope.month_flex2);
				}
		}

		for(var i=0;i<$rootScope.flexArray.length;i++){
				$rootScope.flexArray[i][$scope.selectedMonth[2]] = parseFloat($rootScope.flexArray[i][$scope.selectedMonth[2]]);
				if(!isNaN($rootScope.flexArray[i][$scope.selectedMonth[2]])) {
					month_flex3 = month_flex3 + $rootScope.flexArray[i][$scope.selectedMonth[2]];
					$scope.month_flex3 = month_flex3.toFixed(2);
					$scope.month_flex3 = parseFloat($scope.month_flex3);
				}
		}

		for(var i=0;i<$rootScope.flexArray.length;i++){
				$rootScope.flexArray[i][$scope.selectedMonth[3]] = parseFloat($rootScope.flexArray[i][$scope.selectedMonth[3]]);
				if(!isNaN($rootScope.flexArray[i][$scope.selectedMonth[3]])) {
					month_flex4 = month_flex4 + $rootScope.flexArray[i][$scope.selectedMonth[3]];
					$scope.month_flex4 = month_flex4.toFixed(2);
					$scope.month_flex4 = parseFloat($scope.month_flex4);
				}
		}

		for(var i=0;i<$rootScope.flexArray.length;i++){
				$rootScope.flexArray[i][$scope.selectedMonth[4]] = parseFloat($rootScope.flexArray[i][$scope.selectedMonth[4]]);
				if(!isNaN($rootScope.flexArray[i][$scope.selectedMonth[4]])) {
					month_flex5 = month_flex5 + $rootScope.flexArray[i][$scope.selectedMonth[4]];
					$scope.month_flex5 = month_flex5.toFixed(2);
					$scope.month_flex5 = parseFloat($scope.month_flex5);
				}
		}

		for(var i=0;i<$rootScope.flexArray.length;i++){
				$rootScope.flexArray[i][$scope.selectedMonth[5]] = parseFloat($rootScope.flexArray[i][$scope.selectedMonth[5]]);
				if(!isNaN($rootScope.flexArray[i][$scope.selectedMonth[5]])) {
					month_flex6 = month_flex6 + $rootScope.flexArray[i][$scope.selectedMonth[5]];
					$scope.month_flex6 = month_flex6.toFixed(2);
					$scope.month_flex6 = parseFloat($scope.month_flex6);
				}
		}
		/****************************Flex Calculation*********************************************************************************************/

		/**************************************Ratecard Calculation**************************************************************************************************/
		for(var i=0;i<$rootScope.ratecardArray.length;i++){
				$rootScope.ratecardArray[i][$scope.selectedMonth[0]] = parseFloat($rootScope.ratecardArray[i][$scope.selectedMonth[0]]);
				if(!isNaN($rootScope.ratecardArray[i][$scope.selectedMonth[0]])) {
					month_rc1 = month_rc1 + $rootScope.ratecardArray[i][$scope.selectedMonth[0]];
					$scope.month_rc1 = month_rc1.toFixed(2);
					$scope.month_rc1 = parseFloat($scope.month_rc1);
				}
		}

		for(var i=0;i<$rootScope.ratecardArray.length;i++){
				$rootScope.ratecardArray[i][$scope.selectedMonth[1]] = parseFloat($rootScope.ratecardArray[i][$scope.selectedMonth[1]]);
				if(!isNaN($rootScope.ratecardArray[i][$scope.selectedMonth[1]])) {
					month_rc2 = month_rc2 + $rootScope.ratecardArray[i][$scope.selectedMonth[1]];
					$scope.month_rc2 = month_rc2.toFixed(2);
					$scope.month_rc2 = parseFloat($scope.month_rc2);
				}
		}

		for(var i=0;i<$rootScope.ratecardArray.length;i++){
				$rootScope.ratecardArray[i][$scope.selectedMonth[2]] = parseFloat($rootScope.ratecardArray[i][$scope.selectedMonth[2]]);
				if(!isNaN($rootScope.ratecardArray[i][$scope.selectedMonth[2]])) {
					month_rc3 = month_rc3 + $rootScope.ratecardArray[i][$scope.selectedMonth[2]];
					$scope.month_rc3 = month_rc3.toFixed(2);
					$scope.month_rc3 = parseFloat($scope.month_rc3);
				}
		}

		for(var i=0;i<$rootScope.ratecardArray.length;i++){
				$rootScope.ratecardArray[i][$scope.selectedMonth[3]] = parseFloat($rootScope.ratecardArray[i][$scope.selectedMonth[3]]);
				if(!isNaN($rootScope.ratecardArray[i][$scope.selectedMonth[3]])) {
					month_rc4 = month_rc4 + $rootScope.ratecardArray[i][$scope.selectedMonth[3]];
					$scope.month_rc4 = month_rc4.toFixed(2);
					$scope.month_rc4 = parseFloat($scope.month_rc4);
				}
		}

		for(var i=0;i<$rootScope.ratecardArray.length;i++){
				$rootScope.ratecardArray[i][$scope.selectedMonth[4]] = parseFloat($rootScope.ratecardArray[i][$scope.selectedMonth[4]]);
				if(!isNaN($rootScope.ratecardArray[i][$scope.selectedMonth[4]])) {
					month_rc5 = month_rc5 + $rootScope.ratecardArray[i][$scope.selectedMonth[4]];
					$scope.month_rc5 = month_rc5.toFixed(2);
					$scope.month_rc5 = parseFloat($scope.month_rc5);
				}
		}

		for(var i=0;i<$rootScope.ratecardArray.length;i++){
				$rootScope.ratecardArray[i][$scope.selectedMonth[5]] = parseFloat($rootScope.ratecardArray[i][$scope.selectedMonth[5]]);
				if(!isNaN($rootScope.ratecardArray[i][$scope.selectedMonth[5]])) {
					month_rc6 = month_rc6 + $rootScope.ratecardArray[i][$scope.selectedMonth[5]];
					$scope.month_rc6 = month_rc6.toFixed(2);
					$scope.month_rc6 = parseFloat($scope.month_rc6);
				}
		}

		/**************************************Ratecard Calculation**************************************************************************************************/

		$scope.month_total1 = $scope.month_core1 + $scope.month_flex1 + $scope.month_rc1;
		$scope.month_total2 = $scope.month_core2 + $scope.month_flex2 + $scope.month_rc2;
		$scope.month_total3 = $scope.month_core3 + $scope.month_flex3 + $scope.month_rc3;
		$scope.month_total4 = $scope.month_core4 + $scope.month_flex4 + $scope.month_rc4;
		$scope.month_total5 = $scope.month_core5 + $scope.month_flex5 + $scope.month_rc5;
		$scope.month_total6 = $scope.month_core6 + $scope.month_flex6 + $scope.month_rc6;

	});	
}]);