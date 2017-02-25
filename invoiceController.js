	app.controller('invoiceController',['$scope','$http','$rootScope','$location','$filter','$q',function($scope,$http,$rootScope,$location,$filter,$q){
		
		$scope.visible=false;
		$scope.checked=true;
		$scope.Total=0;
		$scope.Total1=0;
		$scope.Total2=0;
		$scope.Total3=0;
		$scope.Total4=0;
		$scope.Total5=0;
		
		$scope.setTotals=function(item){
			$scope.Total+=item.firstMonth;
			$scope.Total1+=item.secMonth;
			$scope.Total2+=item.thiMonth;
			$scope.Total3+=item.fouMonth;
			$scope.Total4+=item.fifMonth;
			$scope.Total5+=item.sixMonth;
		}
		$scope.init=function(){
			var final=[];
					$scope.Total=0;
					$scope.Total1=0;
					$scope.Total2=0;
					$scope.Total3=0;
					$scope.Total4=0;
					$scope.Total5=0;
			for(var i=0;i<$rootScope.finalValueArrayView2.length;i++){
				if($scope.searchFilter!=null || $scope.searchFilter!=""){
					if($rootScope.finalValueArrayView2[i].ClarityId==parseInt($scope.searchFilter)){
						final.push({
							"ProjectName":$rootScope.uniqueNames[i],
							"ASG":$rootScope.uniqueASG[i],
							"Portfolio":$rootScope.uniquePortfolio[i],
							"ClarityId":$rootScope.uniqueClarityId[i],
							"firstMonth":$rootScope.firstMonth[i],
							"secMonth":$rootScope.secMonth[i],
							"thiMonth":$rootScope.thiMonth[i],
							"fouMonth":$rootScope.fouMonth[i],
							"fifMonth":$rootScope.fifMonth[i],
							"sixMonth":$rootScope.sixMonth[i]				
						
											});

						}
				}
				else{
						final.push({
							"ProjectName":$rootScope.uniqueNames[i],
							"ASG":$rootScope.uniqueASG[i],
							"Portfolio":$rootScope.uniquePortfolio[i],
							"ClarityId":$rootScope.uniqueClarityId[i],
							"firstMonth":$rootScope.firstMonth[i],
							"secMonth":$rootScope.secMonth[i],
							"thiMonth":$rootScope.thiMonth[i],
							"fouMonth":$rootScope.fouMonth[i],
							"fifMonth":$rootScope.fifMonth[i],
							"sixMonth":$rootScope.sixMonth[i]				
						
											});					
				}
			}
					
					for(var i=0;i<final.length;i++){
									$scope.Total+=final.firstMonth;
									$scope.Total1+=final.secMonth;
									$scope.Total2+=final.thiMonth;
									$scope.Total3+=final.fouMonth;
									$scope.Total4+=final.fifMonth;
									$scope.Total5+=final.sixMonth;
					}
				$rootScope.finalValueArrayView2=final;	
					
		}

		$rootScope.projectDet=[];
		$rootScope.ProjectMonthValue=[];
		$rootScope.finalProjectValue=[];
		console.log("tsg valuie=====>"+$rootScope.tsg);
			$scope.back = function(){
			$location.path("/main");
			}
	/*$scope.months=["January","February","March"];*/
	$scope.months = [
	{
	"Id":0,
	"Name":"January"
	},
	{
	"Id":1,
	"Name":"February"
	},
	{
	"Id":2,
	"Name":"March"
	},
	{
	"Id":3,
	"Name":"April"
	},
	{
	"Id":4,
	"Name":"May"
	},
	{
	"Id":5,
	"Name":"June"
	},
	{
	"Id":6,
	"Name":"July"
	},
	{
	"Id":7,
	"Name":"August"
	},
	{
	"Id":8,
	"Name":"September"
	},
	{
	"Id":9,
	"Name":"October"
	},
	{
	"Id":10,
	"Name":"November"
	},
	{
	"Id":11,
	"Name":"December"
	}
	];

	$scope.showLoader = true;

	$http(
	{								
	url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceNewListFinal')/items?$top=6000",
	type : "GET",

	headers : {
	"accept" : "application/json;odata=verbose",

	}
	})
	.then(
	function(data) {
		//////console.log(data);
		$scope.showLoader = false;
		groups1 = data.data.d.results;

		//console.log(groups.length);
		for (var i = 0; i < groups1.length; i++) {

			delete groups1[i]["Attachments"];
			delete groups1[i]["AttachmentFiles"];
			delete groups1[i]["AuthorId"];
			delete groups1[i]["ContentTypeId"];
			delete groups1[i]["Created"];
			delete groups1[i]["EditorId"];
			delete groups1[i]["FileSystemObjectType"];
			delete groups1[i]["GUID"];
			//	         1       delete groups[i]["ID"];            
			delete groups1[i]["Id"];
			delete groups1[i]["Modified"];
			delete groups1[i]["OData__UIVersionString"];
			delete groups1[i]["RoleAssignments"];
			delete groups1[i]["ContentType"];
			delete groups1[i]["FieldValuesAsHtml"];
			delete groups1[i]["FieldValuesAsText"];
			delete groups1[i]["FieldValuesForEdit"];
			delete groups1[i]["File"];
			delete groups1[i]["FirstUniqueAncestorSecurableObject"];
			delete groups1[i]["Folder"];
			delete groups1[i]["ParentList"];
		}
		;

		$rootScope.Invoicedata = groups1;
		$rootScope.ssgCoreValuesArray = [];
		$rootScope.ssgFlexArray = [];
		$rootScope.ssgRateArray=[]
		$rootScope.imqaArray = [];
		$rootScope.imdevArray = [];
		$rootScope.dasgArray = [];
		$rootScope.etsgpsArray = [];
		$rootScope.etsgqaArray = [];
		$rootScope.ssgCoreOffArray=[];
		$rootScope.ssgCoreOnArray=[];
		$rootScope.ssgCoreNearArray=[];

		
		for(var i=0;i<$rootScope.Invoicedata.length;i++){
			if($rootScope.Invoicedata[i].TSG == $rootScope.tsg){
				/*if($rootScope.Invoicedata[i].Title == "SSG QA"){*/
				if(null != $rootScope.Invoicedata[i].Role_x0020_type && $rootScope.Invoicedata[i].Role_x0020_type.toLowerCase()==="flex"){
					$rootScope.ssgFlexArray.push($rootScope.Invoicedata[i]);
				}
				else if(null != $rootScope.Invoicedata[i].Role_x0020_type && $rootScope.Invoicedata[i].Role_x0020_type.toLowerCase()==="core"){
					$rootScope.ssgCoreValuesArray.push($rootScope.Invoicedata[i]);
							if($rootScope.Invoicedata[i].Location.toLowerCase()==="offshore"){
								$rootScope.ssgCoreOffArray.push($rootScope.Invoicedata[i]);
						}
							else if($rootScope.Invoicedata[i].Location.toLowerCase()==="onshore"){
								$rootScope.ssgCoreOnArray.push($rootScope.Invoicedata[i]);
								
						}	
							else if($rootScope.Invoicedata[i].Location.toLowerCase()==="nearshore"){
								$rootScope.ssgCoreNearArray.push($rootScope.Invoicedata[i]);
								
							}
						}
						else if(null != $rootScope.Invoicedata[i].Role_x0020_type && $rootScope.Invoicedata[i].Role_x0020_type.toLowerCase()==="ratecard"){
							$rootScope.ssgRateArray.push($rootScope.Invoicedata[i]);
						}
				}

			
		}
		getProjectDetails();
	});
	
	function getProjectDetails(){
		$rootScope.uniqueNames = [];
		$rootScope.uniqueASG=[];
		$rootScope.uniqueClarityId=[];	
		var uniqueObj = [];
		$rootScope.uniquePortfolio=[];
		$rootScope.projectArray=[];
		$rootScope.projectNameRateArray=[];
		$rootScope.projectNameCoreArray=[];
		for(i = 0; i< $rootScope.Invoicedata.length; i++){    
			if($rootScope.Invoicedata[i].TSG == $rootScope.tsg){
		    if($rootScope.uniqueNames.indexOf($rootScope.Invoicedata[i].Invoice_x0020_Forecast) === -1){
		        uniqueObj.push($rootScope.Invoicedata[i])
		        $rootScope.uniqueNames.push($rootScope.Invoicedata[i].Invoice_x0020_Forecast);
		        $rootScope.uniqueClarityId.push($rootScope.Invoicedata[i].Clarity_x0020_Id);
		        $rootScope.uniqueASG.push($rootScope.Invoicedata[i].ASG);
		        $rootScope.uniquePortfolio.push($rootScope.Invoicedata[i].Portfolio);
		    	}
		   } 
		}
		
	}


	$scope.monthDisabled=true;
	$scope.getYear=function(){
		$scope.monthDisabled=false;
	}

	$scope.GetValue=function(){
		$scope.visible=true;
		$rootScope.headerArray=[];
		$rootScope.coreAmtArray=[];
		$rootScope.ssgFlexValues=[];
		$rootScope.ssgRateValues=[];
		
		var monthId=$scope.ddlmonth;
		var monthIdConst=monthId;
		if(null!=monthId){
		var year=$scope.year;
		/*var monthName=$scope.months[monthId-1].Name;*/
		var d=new Date();
		var n = d.getMonth();
		/*if(monthId<n){
			var neededMonths=[$scope.months[monthId-1].Name,$scope.months[monthId].Name
							,$scope.months[monthId+1].Name,$scope.months[monthId+2].Name
							,$scope.months[monthId+3].Name,$scope.months[monthId+4].Name];
			$scope.displayMonths=[$scope.months[monthId].Name,$scope.months[monthId+1].Name,
								$scope.months[monthId+2].Name,$scope.months[monthId+3].Name,
								$scope.months[monthId+4].Name,$scope.months[monthId+5].Name];*/
		/******************/						
			$scope.displayMonths=[];
			var neededMonths=[];
			var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			for (var i = 0; i < 6; ++i) {

		        $scope.displayMonths.push(names[monthId] + ' ' + year+' Invoice');
		    	
		    	neededMonths.push(names[monthId]+' '+year);

		        ++monthId;
		        if(monthId === 12){
		            monthId = 0;
		            ++year;
		        }
		    }

		/**********************/
			$rootScope.headerArray.push("Type");
			for(var i=0;i<$scope.displayMonths.length;i++){
				$rootScope.headerArray.push($scope.displayMonths[i]);
			}

				
				for(var i=0;i<neededMonths.length;i++){
					console.log("neededMonths=====>"+neededMonths[i]);
					var selectedMonth=neededMonths[i].substring(0,3);
					var selectedYear=neededMonths[i].substring(4,8);
					//console.log("selected ==>"+selectedMonth);
					if(monthIdConst == 0){
						var previousYear=selectedYear-1;
						var monthString="Dec_x002d_"+previousYear+"_x000a__x0028_Actual";

					}else{
						if(monthIdConst<=n){
						var monthString=selectedMonth+"_x0020_"+selectedYear+"_x0020_Actual";
						console.log("monthString=====>"+monthString);
						}
						else{
							var monthString=selectedMonth+"_x0020_"+selectedYear;	
						}
						monthIdConst++;
					}	

				var ssgFlexTotlVal= getKeys(monthString,$rootScope.ssgFlexArray);
				$rootScope.ssgFlexValues.push(ssgFlexTotlVal);
				
				var ssgRateTotlVal= getKeys(monthString,$rootScope.ssgRateArray);
				$rootScope.ssgRateValues.push(ssgRateTotlVal);
				
				var TotalFlexProjectValue=getTotalProjectValue(monthString,$rootScope.ssgFlexArray);
				var TotalRateProjectValue=getTotalProjectValue(monthString,$rootScope.ssgRateArray);
				
				var totalFteCountCoreValue=getTotalCount(monthString,$rootScope.ssgCoreValuesArray);
				


				getProjectMonthValue(TotalFlexProjectValue,TotalRateProjectValue);		
				var TotalCoreProjectValue=getTotalCoreProjectValue(monthString,selectedYear,totalFteCountCoreValue)
												.then(function(data) {
										var coreProjectValue=data;
										
										totalFinalProjectValue(coreProjectValue);
															
						    							});
				
						var fteoffvalue=getBillAmount(monthString,$rootScope.ssgCoreOffArray);	
							
						var fteonvalue=getBillAmount(monthString,$rootScope.ssgCoreOnArray);	
						var ftenearvalue=getBillAmount(monthString,$rootScope.ssgCoreNearArray);	
						console.log("fteoffvalue-"+fteoffvalue+"-fteonvalue-"+fteonvalue+"-ftenearvalue-"+ftenearvalue);
				
						getListData(monthId,monthString,selectedYear,fteoffvalue,fteonvalue,ftenearvalue);	
					
				}
			/*}
			else{
				alert("Actuals Not Entered For the Month You Have Selected.Please Select Different Month");
			}
		*/
		$rootScope.flexTax=getData($rootScope.ssgFlexValues);
		$rootScope.rateTax=getData($rootScope.ssgRateValues);	
		getFinalList();
		}
		else{
			alert("Please Select Month");
		}
			
	}
	

	function getTotalCount(monthString,coreValuesArray){
		var projectTotalDetails=[];
		for(var i=0;i<$rootScope.uniqueNames.length;i++){
			var ftecount=0;
			for(var j=0;j<coreValuesArray.length;j++){
				
				if($rootScope.uniqueNames[i] == coreValuesArray[j].Invoice_x0020_Forecast){
					var obj =coreValuesArray[j];
					ftecount=ftecount+obj[monthString];
				}
			}
			projectTotalDetails.push({"ProjectName":$rootScope.uniqueNames[i],
											"ftecount":ftecount,
											"Month":monthString	
											});	
		}
		return projectTotalDetails;
	}











	function getTotalCoreProjectValue(monthString,year,coredetails){
		var defer = $q.defer();
		var month=monthString.substring(0,3);
		var selYear=year.substring(2,4);
		var selectedString=month+"_x002d_"+selYear;
		var paramString='$filter=';
		 paramString=paramString+"(TSG eq '"+ $rootScope.tsg + "')";

		$http(
			{								
			url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceListData')/items?$top=100&"+paramString,
			type : "GET",

			headers : {
			"accept" : "application/json;odata=verbose",

			}
			})
			.success(function(data) {
				
				$rootScope.coreValues=data.d.results;
				
				$rootScope.coreArray=[];
					for(var i=0;i<$rootScope.coreValues.length;i++){
						var obj =$rootScope.coreValues[i];
					
						$rootScope.coreArray.push(obj[selectedString]);
					}
					console.log("coreArray===>"+$rootScope.coreArray);
					var finaldata=getCoreAmt(monthString,$rootScope.coreArray,coredetails);
					defer.resolve(finaldata);
						
					/*return finaldata;	*/		
			});
		return defer.promise;
	}


	function getCoreAmt(monthString,core,coredetails){
		var returndata=0;
		var finalreturndata=0;
		var projectdetails=[];
		for(var i=0;i<coredetails.length;i++){
			var returndata=coredetails[i].ftecount/core[3];	
			var finalreturndata=returndata*core[4];
			projectdetails.push({
				"ProjectName":coredetails[i].ProjectName,
				"ProjectValue":finalreturndata,
				"Month":monthString
			})
		}
		return projectdetails;
		
	}
	
	

	var countValue=0;
	$rootScope.firstMonth=[];
	$rootScope.secMonth=[];
	$rootScope.thiMonth=[];
	$rootScope.fouMonth=[];
	$rootScope.fifMonth=[];
	$rootScope.sixMonth=[];

	function totalFinalProjectValue(coreProjectValue){
		countValue++;
		for(var i=0;i<coreProjectValue.length;i++){
				for(var j=0;j<$rootScope.ProjectMonthValue.length;j++){
					if(coreProjectValue[i].ProjectName === $rootScope.ProjectMonthValue[j].ProjectName && coreProjectValue[i].Month===$rootScope.ProjectMonthValue[j].Month){
						var total=$rootScope.ProjectMonthValue[j].ProjectValue+coreProjectValue[i].ProjectValue;
						if(countValue==1){
							$rootScope.firstMonth.push(total);
						}
						else if(countValue==2){
							$rootScope.secMonth.push(total);
						}
						else if(countValue==3){
							$rootScope.thiMonth.push(total);
						}
						else if(countValue==4){
							$rootScope.fouMonth.push(total);
						}
						else if(countValue==5){
							$rootScope.fifMonth.push(total);
						}
						else if(countValue==6){
							$rootScope.sixMonth.push(total);
							finalView2Data();
						}
						else{
							break;
						}

						
						

					}
					
				}
			
		}

	}


function finalView2Data(){

	$rootScope.finalValueArrayView2=[];
				for(var i=0;i<$rootScope.uniqueNames.length;i++){
					$rootScope.finalValueArrayView2.push({
						"ProjectName":$rootScope.uniqueNames[i],
						"ASG":$rootScope.uniqueASG[i],
						"Portfolio":$rootScope.uniquePortfolio[i],
						"ClarityId":$rootScope.uniqueClarityId[i],
						"firstMonth":$rootScope.firstMonth[i],
						"secMonth":$rootScope.secMonth[i],
						"thiMonth":$rootScope.thiMonth[i],
						"fouMonth":$rootScope.fouMonth[i],
						"fifMonth":$rootScope.fifMonth[i],
						"sixMonth":$rootScope.sixMonth[i]				
					
										});
				}
		//	console.log("finalArray======>"+finalValueArray);

}
				
	








/*	function getFinalValuesArray(){
		for(var i=0;i<$rootScope.uniqueNames.length;i++){
			for(var j=0;j<$rootScope.finalProjectValue.length;j++){
				if($rootScope.uniqueNames[i]===$rootScope.finalProjectValue[j].ProjectName){
					$rootScope.finalArray.push(
						$rootScope.finalProjectValue[j].ProjectName.push({
						"Month":$rootScope.finalProjectValue[j].Month,
						"Value":$rootScope.finalProjectValue[j].ProjectValue
						}));
				}
			}
		}
	}*/





	function getProjectMonthValue(TotalFlexProjectValue,TotalRateProjectValue){


		var count=0;
		for(var i=0;i<TotalFlexProjectValue.length;i++){
			for(var j=0;j<TotalRateProjectValue.length;j++){
				
				if(TotalFlexProjectValue[i].ProjectName === TotalRateProjectValue[j].ProjectName){
					count++;		
					var total=TotalFlexProjectValue[i].ProjectValue+TotalRateProjectValue[j].ProjectValue;
						$rootScope.ProjectMonthValue.push({
							"ProjectName":TotalFlexProjectValue[i].ProjectName,
							"ProjectValue":total,
							"Month":TotalFlexProjectValue[i].Month
							});
					}
				
			}
		}
		console.log("count value is====>"+count);

		
	}








	function getTotalProjectValue(monthString,neededarray){
			var projectTotalDetails=[];			
			for(var i=0;i<$rootScope.uniqueNames.length;i++){
					var projectValue=0;
					
				for(var j=0;j<neededarray.length;j++){
					var ftecount=0;
					var time =0;
					var billamt=0;	
					var tot=0;
					if($rootScope.uniqueNames[i] == neededarray[j].Invoice_x0020_Forecast){
					
					var obj =neededarray[j];
					//console.log("i=="+j+"Name="+obj["Resource_x0020_Name"]);
						if(j!=1862 && j!=135 && j!=41){

							ftecount=obj[monthString];
					//		console.log("ftecount======>"+ftecount);		
						if(obj["Location"]=="Onshore" || obj["Location"]=="onshore"){
								
								time=8;
								if(monthString=="Jan_x0020_2016_x0020_Actual" || monthString=="Feb_x0020_2016_x0020_Actual" || monthString=="Mar_x0020_2016_x0020_Actual" || monthString=="Apr_x0020_2016_x0020_Actual"|| monthString=="May_x0020_2016_x0020_Actual"||monthString=="Jun_x0020_2016_x0020_Actual"){
									
									var x=0;
									x=calculate(obj["Rate_x0020_Aug_x0020_2015_x0020_"]);
									var y=Number(x);
									billamt=y;
									
								}
								else{
									var x=0;x=calculate(obj["Rate_x0020_Jul_x0020_2016_x0020_"]);
									var y=Number(x);
									billamt=y;
									
							}
								
						}
						else if(obj["Location"]=="Offshore" || obj["Location"]=="offshore"){
								time=9;
								if(monthString=="Jan_x0020_2016_x0020_Actual" || monthString=="Feb_x0020_2016_x0020_Actual" || monthString=="Mar_x0020_2016_x0020_Actual" || monthString=="Apr_x0020_2016_x0020_Actual"|| monthString=="May_x0020_2016_x0020_Actual"||monthString=="Jun_x0020_2016_x0020_Actual"){
									var x=0;
									x=calculate(obj["Rate_x0020_Aug_x0020_2015_x0020_"]);
									var y=Number(x);
									billamt=y;
								}
								else{
									var x=0;x=calculate(obj["Rate_x0020_Jul_x0020_2016_x0020_"]);
									var y=Number(x);
									billamt=y;
										
								}
								
						}
					
				else if(obj["Location"]=="Nearshore" || obj["Location"]=="nearshore"){
					time=8.6;
					if(monthString=="Jan_x0020_2016_x0020_Actual" || monthString=="Feb_x0020_2016_x0020_Actual" || monthString=="Mar_x0020_2016_x0020_Actual" || monthString=="Apr_x0020_2016_x0020_Actual"|| monthString=="May_x0020_2016_x0020_Actual"||monthString=="Jun_x0020_2016_x0020_Actual"){
							var x=0;
							x=calculate(obj["Rate_x0020_Aug_x0020_2015_x0020_"]);
							var y=Number(x);
							billamt=y;
							
							
						}
						else{
							var x=0;x=calculate(obj["Rate_x0020_Jul_x0020_2016_x0020_"]);
							var y=Number(x);
							billamt=y;
									}
								}

								projectValue=projectValue+(ftecount*time*21*billamt);
								//console.log("proopp====>"+projectValue);
							}
						
						}		

					}
					projectTotalDetails.push({"ProjectName":$rootScope.uniqueNames[i],
											"ProjectValue":projectValue,
											"Month":monthString	
											});	
				
				
		}
		return projectTotalDetails;
	} 




	function getFinalList(){
		$rootScope.ssgFlexFinal=[];
		$rootScope.ssgRateFinal=[];
		$rootScope.ssgFlexTaxFinal=[];
		$rootScope.ssgRateTaxFinal=[];

		for(var i=0;i<$rootScope.ssgFlexValues.length;i++){
			if(!isNaN($rootScope.ssgFlexValues[i]) ||null!=$rootScope.ssgFlexValues[i]){
			$rootScope.ssgFlexFinal.push(parseFloat($rootScope.ssgFlexValues[i].toFixed(2)));
			}
			else{
				$rootScope.ssgFlexFinal.push(0);	
			}
		}
		for(var i=0;i<$rootScope.ssgRateValues.length;i++){
			if(!isNaN($rootScope.ssgRateValues[i]) ||null!=$rootScope.ssgRateValues[i]){
			$rootScope.ssgRateFinal.push(parseFloat($rootScope.ssgRateValues[i].toFixed(2)));
			}
			else{
				$rootScope.ssgRateFinal.push(0);	
			}
		}
		for(var i=0;i<$rootScope.flexTax.length;i++){
			if(!isNaN($rootScope.flexTax[i]) ||null!=$rootScope.ssgFlexTaxFinal[i]){
			$rootScope.ssgFlexTaxFinal.push(parseFloat($rootScope.flexTax[i].toFixed(2)));
			}
			else{
				$rootScope.ssgFlexTaxFinal.push(0);	
			}
		}
		for(var i=0;i<$rootScope.rateTax.length;i++){
			if(!isNaN($rootScope.rateTax[i]) ||null!=$rootScope.rateTax[i]){
			$rootScope.ssgRateTaxFinal.push(parseFloat($rootScope.rateTax[i].toFixed(2)));
			}
			else{
				$rootScope.ssgRateTaxFinal.push(0);	
			}
		}
		
	}
	


	function getFinalListData(){
		$rootScope.coreFinalArray=[];
		$rootScope.coreTaxFinalArray=[];
		
		for(var i=0;i<$rootScope.coreAmtArray.length;i++){
			if(!isNaN($rootScope.coreAmtArray[i]) ||null!=$rootScope.coreAmtArray[i]){
			$rootScope.coreFinalArray.push(parseFloat($rootScope.coreAmtArray[i].toFixed(2)));
			}
			else{
				$rootScope.coreFinalArray.push(0);	
			}
		}
		for(var i=0;i<$rootScope.coreTax.length;i++){
			if(!isNaN($rootScope.coreTax[i]) ||null!=$rootScope.coreTax[i]){
			$rootScope.coreTaxFinalArray.push(parseFloat($rootScope.coreTax[i].toFixed(2)));
			}
			else{
				$rootScope.coreTaxFinalArray.push(0);	
			}	
		}
	}	
	

	function getData(detArray){
		$rootScope.coreWithTax=[];
		for(var i=0;i<detArray.length;i++){
			$scope.taxCore=detArray[i]*1.01;
			$rootScope.coreWithTax.push($scope.taxCore);
		}
		return $rootScope.coreWithTax;
	}

	

	function getListData(monthId,monthString,year,fteoffvalue,fteonvalue,ftenearvalue){
		console.log("getListData monthString-->"+monthString);
		var month=monthString.substring(0,3);
		var selYear=year.substring(2,4);
		var selectedString=month+"_x002d_"+selYear;
		var fteoffvalue=Math.round(fteoffvalue);
		var fteonvalue=Math.round(fteonvalue);
		var ftenearvalue=Math.round(ftenearvalue);
		var d=new Date();
		var n=d.getMonth();
		
		var paramString='$filter=';
		 paramString=paramString+"(TSG eq '"+ $rootScope.tsg + "')";
		 console.log("paramString==========>"+paramString);
		$http(
			{								
			url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceListData')/items?$top=100&"+paramString,
			type : "GET",

			headers : {
			"accept" : "application/json;odata=verbose",

			}
			})
			.success(function(data) {
				
				$rootScope.coreValues=data.d.results;
				
				$rootScope.coreArray=[];
					for(var i=0;i<$rootScope.coreValues.length;i++){
						var obj =$rootScope.coreValues[i];
					
						$rootScope.coreArray.push(obj[selectedString]);
					}
					console.log("coreArray===>"+$rootScope.coreArray);
					getFinalData(monthId,month,$rootScope.coreArray,n,fteoffvalue,fteonvalue,ftenearvalue)
								
			});
	}





	function getFinalData(monthId,month,coreArray,n,fteoffvalue,fteonvalue,ftenearvalue){
		if(monthId==n){
						if(coreArray[0]==fteoffvalue && coreArray[2]==fteonvalue && coreArray[1]==ftenearvalue){
							$rootScope.coreAmount=coreArray[4];
							console.log("monthString==>"+monthString+"coreAmount==>"+$rootScope.coreAmount);
							$rootScope.coreAmtArray.push($rootScope.coreAmount);
							getFinalListData();
						}
						else{
							var maxOffVal=(coreArray[0]>fteoffvalue)?"CoreValue":"FteCount";
							var maxOnVal=(coreArray[2]>fteonvalue)?"CoreValue":"FteCount";
							var maxNearVal=(coreArray[1]>ftenearvalue)?"CoreValue":"FteCount";
									
						}
					}
					else{	
						
						$rootScope.coreAmount=coreArray[4];
						$rootScope.coreAmtArray.push($rootScope.coreAmount);
						$rootScope.coreTax=getData($rootScope.coreAmtArray);
						getFinalListData();
						
					}
					
	}

	



	function getBillAmount(monthString,ssgcorearray){
		 
		var ftecount=0;
					
				
						for(var j=0;j<ssgcorearray.length;j++){
							var obj =ssgcorearray[j];
							if(null != obj[monthString]){
							ftecount =ftecount + obj[monthString];
						
						}
					}
					return ftecount;	
				}
			
			
		
	function getKeys(monthString,ssgArray){
		$rootScope.keys=[];
				
				var ssgvalue=0;
				console.log("monthString====>"+monthString);
				
				for(var i=0;i<ssgArray.length;i++){
					
					var ftecount=0;
					var time =0;
					var billamt=0;	
					var tot=0;
					var obj =ssgArray[i];
				console.log("i=="+i+"Name="+obj["Resource_x0020_Name"]);
						

							ftecount=obj[monthString];
							console.log("ftecount====>"+ftecount);			
						if(obj["Location"]=="Onshore" || obj["Location"]=="onshore"){
								
								time=8;
								if(monthString=="Jan_x0020_2016_x0020_Actual" || monthString=="Feb_x0020_2016_x0020_Actual" || monthString=="Mar_x0020_2016_x0020_Actual" || monthString=="Apr_x0020_2016_x0020_Actual"|| monthString=="May_x0020_2016_x0020_Actual"||monthString=="Jun_x0020_2016_x0020_Actual"){
									
									var x=0;
									x=calculate(obj["Rate_x0020_Aug_x0020_2015_x0020_"]);
									var y=Number(x);
									billamt=y;
									
								}
								else{
									var x=0;x=calculate(obj["Rate_x0020_Jul_x0020_2016_x0020_"]);
									var y=Number(x);
									billamt=y;
									
							}
								
						}
						else if(obj["Location"]=="Offshore" || obj["Location"]=="offshore"){
								time=9;
								if(monthString=="Jan_x0020_2016_x0020_Actual" || monthString=="Feb_x0020_2016_x0020_Actual" || monthString=="Mar_x0020_2016_x0020_Actual" || monthString=="Apr_x0020_2016_x0020_Actual"|| monthString=="May_x0020_2016_x0020_Actual"||monthString=="Jun_x0020_2016_x0020_Actual"){
									var x=0;
									x=calculate(obj["Rate_x0020_Aug_x0020_2015_x0020_"]);
									var y=Number(x);
									billamt=y;
								}
								else{
									var x=0;x=calculate(obj["Rate_x0020_Jul_x0020_2016_x0020_"]);
									var y=Number(x);
									billamt=y;
										
								}
								
						}
					
				else if(obj["Location"]=="Nearshore" || obj["Location"]=="nearshore"){
					time=8.6;
					if(monthString=="Jan_x0020_2016_x0020_Actual" || monthString=="Feb_x0020_2016_x0020_Actual" || monthString=="Mar_x0020_2016_x0020_Actual" || monthString=="Apr_x0020_2016_x0020_Actual"|| monthString=="May_x0020_2016_x0020_Actual"||monthString=="Jun_x0020_2016_x0020_Actual"){
							var x=0;
							x=calculate(obj["Rate_x0020_Aug_x0020_2015_x0020_"]);
							var y=Number(x);
							billamt=y;
							
							
						}
						else{
							var x=0;x=calculate(obj["Rate_x0020_Jul_x0020_2016_x0020_"]);
							var y=Number(x);
							billamt=y;
									}
								}

					ssgvalue=ssgvalue+(ftecount*time*21*billamt);
					console.log("ssgvalue===>"+ssgvalue);					

			}
			return ssgvalue;
			
	}

	function calculate(value){
						var a=value;
								if(null!=a){
											/*a=a.trim();*/
											return a;	
										}
										/*var b=a.length;
										
										
										if(a.contains("-")){
											a=0;
										}
										var substringvalue=(a!=0)?a.substring(1,b):a;*/
										

									
	}

	function exportToExcel() {
		console.log("$rootScope.headerArray"+$rootScope.headerArray);
		console.log("$rootScope.ssgFlexFinal"+$rootScope.ssgFlexFinal);
		console.log("$rootScope.ssgRateFinal"+$rootScope.ssgRateFinal);
		console.log("$rootScope.ssgFlexTaxFinal"+$rootScope.ssgFlexTaxFinal);
		console.log("$rootScope.ssgRateTaxFinal"+$rootScope.ssgRateTaxFinal);
		console.log("$rootScope.coreFinalArray"+$rootScope.coreFinalArray);
		console.log("$rootScope.coreTaxFinalArray"+$rootScope.coreTaxFinalArray);
	}


		$scope.expenseTax=function(expenses){
			$scope.expenses=parseFloat(expenses);
			$scope.expensesTax=expenses*1.01;


		}
		$scope.expenseTax1=function(expenses){
			$scope.expenses1=parseFloat(expenses);
			$scope.expensesTax1=expenses*1.01;
		}
		$scope.expenseTax2=function(expenses){
			$scope.expenses2=parseFloat(expenses);
			$scope.expensesTax2=expenses*1.01;
		}
		$scope.expenseTax3=function(expenses){
			$scope.expenses3=parseFloat(expenses);
			$scope.expensesTax3=expenses*1.01;
		}
		$scope.expenseTax4=function(expenses){
			$scope.expenses4=parseFloat(expenses);
			$scope.expensesTax4=expenses*1.01;
		}
		$scope.expenseTax5=function(expenses){
			$scope.expenses5=parseFloat(expenses);
			$scope.expensesTax5=expenses*1.01;
		}
		

	


$scope.saveFile = function () {


	var totalRowFirst=0;
	var totalRowSec=0;
	var totalRowThir=0;
	var totalRowFou=0;
	var totalRowFif=0;
	var totalRowSix=0;
	var finalValueArray=[];
	$rootScope.rowTotalArray=[];
				for(var i=0;i<$rootScope.uniqueNames.length;i++){
					var totalColumn=0;
					totalRowFirst+=$rootScope.firstMonth[i];
					totalRowSec+=$rootScope.secMonth[i];
					totalRowThir+=$rootScope.thiMonth[i];
					totalRowFou+=$rootScope.fouMonth[i];
					totalRowFif+=$rootScope.fifMonth[i];
					totalRowSix+=$rootScope.sixMonth[i];
					 totalColumn=$rootScope.firstMonth[i]+$rootScope.secMonth[i]+$rootScope.thiMonth[i]
										+$rootScope.fouMonth[i]+$rootScope.fifMonth[i]+$rootScope.sixMonth[i];
					$rootScope.rowTotalArray.push(totalColumn);
					
					finalValueArray[i]=[$rootScope.uniqueNames[i],$rootScope.uniqueASG[i],$rootScope.uniquePortfolio[i],$rootScope.uniqueClarityId[i],$rootScope.firstMonth[i],$rootScope.secMonth[i],$rootScope.thiMonth[i]
										,$rootScope.fouMonth[i],$rootScope.fifMonth[i],$rootScope.sixMonth[i],$rootScope.rowTotalArray[i]];					
					
										}
			console.log("finalArray======>"+finalValueArray);
			
			$rootScope.totalRowCountFinal=["","","","",totalRowFirst,totalRowSec,totalRowThir,totalRowFou,totalRowFif,totalRowSix];
			

			$rootScope.totalArray=[];
			$rootScope.totalTaxArray=[];
			$rootScope.flexTrueUpArray=[$scope.FlexTrueups,$scope.FlexTrueups1,$scope.FlexTrueups2,$scope.FlexTrueups3,$scope.FlexTrueups4,$scope.FlexTrueups5];
			$rootScope.rateTrueUpArray=[$scope.RateTrueups,$scope.RateTrueups1,$scope.RateTrueups2,$scope.RateTrueups3,$scope.RateTrueups4,$scope.RateTrueups5];

			$rootScope.expensesArray=[$scope.expenses,$scope.expenses1,$scope.expenses2,$scope.expenses3,$scope.expenses4,$scope.expenses5];
			$rootScope.expensesTaxArray=[$scope.expensesTax,$scope.expensesTax1,$scope.expensesTax2,$scope.expensesTax3,$scope.expensesTax4,$scope.expensesTax5];

	for(var i=0;i<6;i++){
		var totalValue=$rootScope.coreFinalArray[i]+$rootScope.ssgFlexFinal[i]+$rootScope.ssgRateFinal[i];
			
		var totalTaxValue=$rootScope.coreTaxFinalArray[i]+$rootScope.ssgFlexTaxFinal[i]+$rootScope.ssgRateTaxFinal[i];					   

			if(i==0){
				totalFinalValue=totalValue+$scope.expenses+$scope.RateTrueups+$scope.FlexTrueups;
				totalFinalTaxValue=totalTaxValue+$scope.expensesTax+$scope.RateTrueups+$scope.FlexTrueups;				
				$rootScope.totalArray.push(totalFinalValue);
				$rootScope.totalTaxArray.push(totalFinalTaxValue);
			}
			else if(i==1){
				totalValue=totalValue+$scope.expenses1+$scope.RateTrueups1+$scope.FlexTrueups1;
				totalFinalTaxValue=totalTaxValue+$scope.expensesTax1+$scope.RateTrueups1+$scope.FlexTrueups1;
				$rootScope.totalArray.push(totalValue);
				$rootScope.totalTaxArray.push(totalFinalTaxValue);	
			}
			else if(i==2){
				totalValue=totalValue+$scope.expenses2+$scope.RateTrueups2+$scope.FlexTrueups2;
				totalFinalTaxValue=totalTaxValue+$scope.expensesTax2+$scope.RateTrueups2+$scope.FlexTrueups2;
				$rootScope.totalArray.push(totalValue);
				$rootScope.totalTaxArray.push(totalFinalTaxValue);
			}
			else if(i==3){
				totalValue=totalValue+$scope.expenses3+$scope.RateTrueups3+$scope.FlexTrueups3;
				totalFinalTaxValue=totalTaxValue+$scope.expensesTax3+$scope.RateTrueups3+$scope.FlexTrueups3;
				$rootScope.totalArray.push(totalValue);
				$rootScope.totalTaxArray.push(totalFinalTaxValue);
			}
			else if(i==4){
				totalValue=totalValue+$scope.expenses4+$scope.RateTrueups4+$scope.FlexTrueups4;
				totalFinalTaxValue=totalTaxValue+$scope.expensesTax4+$scope.RateTrueups4+$scope.FlexTrueups4;
				$rootScope.totalArray.push(totalValue);
				$rootScope.totalTaxArray.push(totalFinalTaxValue);
			}
			else if(i==5){
				totalValue=totalValue+$scope.expenses5+$scope.RateTrueups5+$scope.FlexTrueups5;
				totalFinalTaxValue=totalTaxValue+$scope.expensesTax5+$scope.RateTrueups5+$scope.FlexTrueups5;
				$rootScope.totalArray.push(totalValue);
				$rootScope.totalTaxArray.push(totalFinalTaxValue);
			}				   

	}

	console.log("totalArray===========>"+$rootScope.totalArray);
	console.log("totalTaxarraty===========>"+$rootScope.totalTaxArray);
	console.log("expensesArrat========>"+$rootScope.expensesArray);
	console.log("taxtxtxtx======>"+$rootScope.expensesTaxArray);


		alert("hiiiiii");
		console.log("taxxx=====>"+$scope.expenses[0]);
		/*console.log("taxxx=====>"+$scope.expensesTax[0]);*/
		console.log("tax====>"+$scope.expensesTax);
		console.log("taxxx=====>"+$scope.totaltax4);
		


		$rootScope.headerArray1=$rootScope.headerArray;
		$rootScope.totalTaxArray1=$rootScope.totalTaxArray;
		$rootScope.coreFinalArray1=$rootScope.coreFinalArray;
		$rootScope.coreTaxFinalArray1=$rootScope.coreTaxFinalArray;
		$rootScope.ssgFlexFinal1=$rootScope.ssgFlexFinal;
		$rootScope.flexTrueUpArray1=$rootScope.flexTrueUpArray;
		$rootScope.ssgFlexTaxFinal1=$rootScope.ssgFlexTaxFinal;
		$rootScope.ssgRateFinal1=$rootScope.ssgRateFinal;
		$rootScope.rateTrueUpArray1=$rootScope.rateTrueUpArray;
		$rootScope.ssgRateTaxFinal1=$rootScope.ssgRateTaxFinal;
		$rootScope.expensesArray1=$rootScope.expensesArray;
		$rootScope.expensesTaxArray1=$rootScope.expensesTaxArray;
		$rootScope.totalArray1=$rootScope.totalArray;
		var headerArray2=[];
		headerArray2.push("ProjectName");
		headerArray2.push("ASG");
		headerArray2.push("Portfolio");
		headerArray2.push("ClarityId");
		for(var i=1;i<$rootScope.headerArray1.length;i++){
			headerArray2.push($rootScope.headerArray1[i]);
		}
		
		

		$rootScope.headerArray1.unshift("","","");
		$rootScope.headerArray1.push("");
		$rootScope.totalTaxArray1.unshift("","","","Total Inclusive of Taxes");
		$rootScope.coreFinalArray1.unshift("","","","Core");
		$rootScope.coreTaxFinalArray1.unshift("","","","CoreInclusiveOfTaxes");
		$rootScope.ssgFlexFinal1.unshift("","","","Flex");
		$rootScope.flexTrueUpArray1.unshift("","","","Flex Trueup");
		$rootScope.ssgFlexTaxFinal1.unshift("","","","FlexInclusiveOfTaxes");
		$rootScope.ssgRateFinal1.unshift("","","","Ratecard");
		$rootScope.rateTrueUpArray1.unshift("","","","Ratecard Trueup");
		$rootScope.ssgRateTaxFinal1.unshift("","","","RatecardInclusiveOfTaxes");
		$rootScope.expensesArray1.unshift("","","","Expenses");
		$rootScope.expensesTaxArray1.unshift("","","","Expenses Inclusive Of Taxes");
		$rootScope.totalArray1.unshift("","","","Total");
		

		console.log("$rootScope.headerArray1"+$rootScope.headerArray1);
		console.log("$rootScope.ssgFlexFinal1"+$rootScope.ssgFlexFinal1);
		console.log("$rootScope.ssgRateFinal1"+$rootScope.ssgRateFinal1);
		console.log("$rootScope.ssgFlexTaxFinal1"+$rootScope.ssgFlexTaxFinal1);
		console.log("$rootScope.ssgRateTaxFinal1"+$rootScope.ssgRateTaxFinal1);
		console.log("$rootScope.coreFinalArray1"+$rootScope.coreFinalArray1);
		console.log("$rootScope.coreTaxFinalArray1"+$rootScope.coreTaxFinalArray1);

		var jsonObject = {};
		var jsonObject1 = {};
		var jsonObject2 = {};
		var jsonObject3 = {};
		var jsonObject4 = {};
		var jsonObject5 = {};
		var jsonObject6 = {};
		var jsonObject7 = {};
		var jsonObject8 = {};
		var jsonObject9 = {};
		var jsonObject10 = {};
		var jsonObject11 = {};
		var jsonObject12 = {};
		var jsonObject13={};
		var jsonObject14={};
		var jsonObject15={};
		var jsonObject16={};


		for(var i=0;i<$rootScope.totalRowCountFinal.length;i++){
			jsonObject16[i]=$rootScope.totalRowCountFinal[i];			
		}
		for(var i=0;i<headerArray2.length;i++){
			jsonObject15[i]=headerArray2[i];			
		}

		for (var l = 0; l < $rootScope.headerArray.length; l++)
		{  
			if($rootScope.headerArray[l] !== undefined) 
		  		jsonObject[l] = $rootScope.headerArray[l];
		}

		for(var i=0;i<$rootScope.totalTaxArray1.length;i++){
			if($rootScope.totalTaxArray1[i] !== undefined) 
		  		jsonObject1[i] = $rootScope.totalTaxArray1[i];	
		}

		for(var i=0;i<finalValueArray.length;i++){
			jsonObject13[i] = finalValueArray[i];	
		}	  		

  		for (var i = 0; i < $rootScope.coreFinalArray1.length; ++i)
		{  
			if ($rootScope.coreFinalArray1[i] !== undefined) 
		  		jsonObject2[i] = $rootScope.coreFinalArray1[i];
		}

		for (var j = 0; j < $rootScope.coreTaxFinalArray1.length; ++j)
		{  
			if ($rootScope.coreTaxFinalArray1[j] !== undefined) 
		  		jsonObject3[j] = $rootScope.coreTaxFinalArray1[j];
		}

		for (var k = 0; k < $rootScope.ssgFlexFinal1.length; ++k)
		{  
			if ($rootScope.ssgFlexFinal1[k] !== undefined) 
		  		jsonObject4[k] = $rootScope.ssgFlexFinal1[k];
		}
		
		for(var i=0;i<$rootScope.flexTrueUpArray1.length;i++){
			if($rootScope.flexTrueUpArray1[i] !== undefined) 
		  		jsonObject5[i] = $rootScope.flexTrueUpArray1[i];	
		}

		for (var x = 0; x < $rootScope.ssgFlexTaxFinal1.length; ++x)
		{  
			if ($rootScope.ssgFlexTaxFinal1[x] !== undefined) 
		  		jsonObject6[x] = $rootScope.ssgFlexTaxFinal1[x];
		}

		for (var y = 0; y < $rootScope.ssgRateFinal1.length; ++y)
		{  
			if ($rootScope.ssgRateFinal1[y] !== undefined) 
		  		jsonObject7[y] = $rootScope.ssgRateFinal1[y];
		}
		for(var i=0;i<$rootScope.rateTrueUpArray1.length;i++){
			if($rootScope.rateTrueUpArray1[i] !== undefined) 
		  		jsonObject8[i] = $rootScope.rateTrueUpArray1[i];	
		}
		for (var z = 0; z < $rootScope.ssgRateTaxFinal1.length; ++z)
		{  
			if ($rootScope.ssgRateTaxFinal1[z] !== undefined) 
		  		jsonObject9[z] = $rootScope.ssgRateTaxFinal1[z];
		}
		for(var i=0;i<$rootScope.expensesArray1.length;i++){
			if($rootScope.expensesArray1[i] !== undefined) 
		  		jsonObject10[i] = $rootScope.expensesArray1[i];	
		}
		for(var i=0;i<$rootScope.expensesTaxArray1.length;i++){
			if($rootScope.expensesTaxArray1[i] !== undefined) 
		  		jsonObject11[i] = $rootScope.expensesTaxArray1[i];	
		}
		for(var i=0;i<$rootScope.totalArray1.length;i++){
			if($rootScope.totalArray1[i] !== undefined) 
		  		jsonObject12[i] = $rootScope.totalArray1[i];	
		}


		var data1 = [jsonObject,jsonObject1,jsonObject2,jsonObject3,jsonObject4,jsonObject5,jsonObject6,jsonObject7,jsonObject8,jsonObject9,jsonObject10,jsonObject11,jsonObject12,jsonObject14,jsonObject15]; 
		for(var q=0;q<finalValueArray.length;q++){
			var jsonobj=jsonObject13[q];
			data1.push(jsonobj);
		}
		data1.push(jsonObject16);




		console.log("excel data===>"+data1);
		var opts = [{sheetid:'InvoiceList',headers:false,
					 style:'background:#00FF00',
				        column: {
				          style:'font-size:30px'
				        }}];
	    var res = alasql('SELECT INTO XLSX("Invoice.xlsx",?) FROM ?',[opts,[data1]]);
	}

		


	
	
}]);