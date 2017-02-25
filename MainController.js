var app = angular.module("app",['ngRoute','angular.filter','angularUtils.directives.dirPagination']);
app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'loading.html',
            controller:'credentialsController'
       }).
        when('/home', {
            templateUrl: 'home.html',
            controller:'homeController'
           
       }).
	when('/main', {
            templateUrl: 'main.html',
            controller:'Ctrl'
           
       }).
	when('/edit', {
            templateUrl: 'edit.html',
            controller:'Ctrl'
           
       }).
	when('/allocate', {
            templateUrl: 'allocate.html',
            controller:'allocateController'
           
       }).
	when('/config', {
            templateUrl: 'config.html',
            controller:'configController'
           
       }).
	
	when('/dashboard', {
            templateUrl: 'dashboard.html',
            controller:'invoiceController'
           
       }).
	when('/rdashboard', {
            templateUrl: 'rdashboard.html',
            controller:'rdashboardController'
           
       }).
	
	when('/year2016', {
            templateUrl: 'year2016.html',
            controller:'Ctrl'
           
       }).
	
       
       
        otherwise({
            redirectTo: '/'
        });
    }]);

	app.controller('Ctrl',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){
				$scope.visible=false;
				$scope.tableview=false;

				$scope.back = function(){
					$location.path("/main");
				}

				$scope.back1 = function(){
					$location.path("/");
				}

				$scope.backToMain = function(){
					$location.path("/main");
				}

				$scope.backToHome = function(){
					$location.path("/");
				}

				$scope.showContent=function(){
						$scope.tableview=true;
				}
    			$http(
                            {                               
                                url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('ResourceTable')/items?$top=20",
                                type : "GET",
                                headers : {
                                    "accept" : "application/json;odata=verbose",
                                }
                     }) //http call ends here
                .then(
                    function(data) {
                        console.log(data);
                        groups = data.data.d.results;

                        console.log(groups.length);

                            $rootScope.filterData = groups;
							console.log($rootScope.filterData);
                        }) //then ends here

                		/***************************************************/
                		for(var x=0;x<$rootScope.groups.length;x++){
                			  /*console.log("Eid-->"+$rootScope.groups[x].Enterprise_x0020_ID);*/
                			  if(null != $rootScope.groups[x].Enterprise_x0020_ID){
                            	  $rootScope.groups[x].Enterprise_x0020_ID = removeJunks($rootScope.groups[x].Enterprise_x0020_ID);
                          	}
                        }
                        
                               
                        
                        function removeJunks(eid){
                                                
                                                var re = /<font size="2" color="black">/gi
                                                var str = eid;
                                                var newStr = str.replace(re," ");

                                                var re1 = /font>/gi;
                                                var str1 = newStr;
                                                var newStr1 = str1.replace(re1," ");
                                                
                                                /*console.log("newStr1-->"+newStr1);*/
                                                
                                                if(newStr1.endsWith("</ ") || newStr1.endsWith("</") ){
                                                                newStr1 = newStr1.substring(0,newStr1.length-3);
                                                }

                                                return newStr1;
                                    }

                        


                   		/***************************************************/
						$scope.enterRes=function(){
							console.log($rootScope.tsg);
								if($rootScope.tsg=='undefined' || $rootScope.asg=='undefined'|| $rootScope.tsg==null || $rootScope.asg==null){
									alert("Please select TSG and ASG to continue");
									$location.path('/');
								}
								else{
									$location.path('/edit');
								}	
						} //enterRes ends here
			
						$scope.invoiceDashboard = function() {
								$location.path('/dashboard');			
						}

						$scope.rdashboard = function() {
								$location.path('/rdashboard');			
						}
			
						$scope.editData=function(){
								$location.path('/modify');							
						}
			
						$scope.enterActuals=function(){
							var d = new Date();
							var month = new Array();
				
							month[0] = "January";
							month[1] = "February";
							month[2] = "March";
							month[3] = "April";
							month[4] = "May";
							month[5] = "June";
							month[6] = "July";
							month[7] = "August";
							month[8] = "September";
							month[9] = "October";
							month[10] = "November";
							month[11] = "December";

					
							$rootScope.month  = month[d.getMonth()];			
								$location.path('/actuals');	
						}  //enterActuals ends here
			
						$rootScope.invoice={
									items: [{	}]
						};

						$rootScope.editIds=[];
						
						$scope.editItems=function(id){
								$rootScope.editIds.push(id);
								console.log($rootScope.editIds);
						}
			
						$scope.update=function(){
								var siteUrl = 'https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/';

							    var clientContext = new SP.ClientContext(siteUrl);
    						    var oList = clientContext.get_web().get_lists().getByTitle('InvoiceSampleList');

								for(var i=0;i<$rootScope.editIds.length;i++){	
								    var oListItem = oList.getItemById($rootScope.editIds[i].ID);
				
									oListItem.set_item('Title',$rootScope.editIds[i].Title);
									oListItem.set_item('ASG',$rootScope.editIds[i].ASG);
									oListItem.set_item('Location',$rootScope.editIds[i].Location);
									oListItem.set_item('Role_x0020_type',$rootScope.editIds[i].Role_x0020_type);
									oListItem.set_item('Portfolio',$rootScope.editIds[i].Portfolio);

									oListItem.set_item('Sub_x0020__x002d__x0020_Portfoli',$rootScope.editIds[i].Sub_x0020__x002d__x0020_Portfoli);
									oListItem.set_item('Sub_x0020_Project',$rootScope.editIds[i].Sub_x0020_Project);
									oListItem.set_item('Invoice_x0020_Forecast',$rootScope.editIds[i].Invoice_x0020_Forecast);
									oListItem.set_item('Resource_x0020_Forecast_x0020__x',$rootScope.editIds[i].Resource_x0020_Forecast_x0020__x);
									oListItem.set_item('Clarity_x0020_Id',$rootScope.editIds[i].Clarity_x0020_Id);

									oListItem.set_item('Jan_x002d_16',$rootScope.editIds[i].Jan_x002d_16);
									oListItem.set_item('Feb_x002d_16',$rootScope.editIds[i].Feb_x002d_16);
									oListItem.set_item('Mar_x002d_16',$rootScope.editIds[i].Mar_x002d_16);
									oListItem.set_item('Apr_x002d_16',$rootScope.editIds[i].Apr_x002d_16);

									oListItem.set_item('May_x002d_16',$rootScope.editIds[i].May_x002d_16);
									oListItem.set_item('Jun_x002d_16',$rootScope.editIds[i].Jun_x002d_16);
									oListItem.set_item('Jul_x002d_16',$rootScope.editIds[i].Jul_x002d_16);
									oListItem.set_item('Aug_x002d_16',$rootScope.editIds[i].Aug_x002d_16);

									oListItem.set_item('Sep_x002d_16',$rootScope.editIds[i].Sep_x002d_16);
									oListItem.set_item('Oct_x002d_16',$rootScope.editIds[i].Oct_x002d_16);
							        oListItem.set_item('Nov_x002d_16',$rootScope.editIds[i].Nov_x002d_16);
							        oListItem.set_item('Dec_x002d_16',$rootScope.editIds[i].Dec_x002d_16);
						
								    oListItem.update();
								    //$rootScope.$apply();
								    //$location.url('/main')
								}

			 					clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

								function onQuerySucceeded() {
								    alert('Item updated!');
								}
								function onQueryFailed(sender, args) {
								    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
								}	
						}//update function ends here

			$scope.addItem = function(item) {

					console.log(item);
        				$rootScope.invoice.items.push({
           					Name: item.resourceName,
            					RollType: item.rollType,
	    					Eid: item.eid,
						ClarityId: item.clarityId,
						Pname: item.projectname,
						Portfolio:item.portfolio
        			});
				console.log($rootScope.invoice.items);
	
    			};

			
			
			$scope.remove = function (x) {
        			$rootScope.invoice.items.splice(x, 1);
    			} 

    			/*************************************************/

    			/*$scope.test=function(){*/
    					
    							$scope.finalActuals=[];
    							$scope.finalUniqueActuals=[];
    							
										console.log($rootScope.groups.length);
										for(var i=0;i<$rootScope.groups.length;i++){
											var num=i;
											var actuals=0;
											$scope.flag=0;
											$scope.forecast=[];	
											console.log($rootScope.groups[num]);
											methodTest($rootScope.groups[num],num,actuals);
										}
										//finalMethod();

									/*}*/
	
						$rootScope.activeProjects=[];	
						$scope.checkbox=[];	
							
						/*$scope.next=function(data,index){
							if($scope.checkbox[$index]){
								$scope.activeProjects.push(data);
							}
							else{

							}

						}*/
						/*$scope.checkAll=function(){
							if($scope.selectALl){
								$scope.selectALl=true;
							}
							else{
								$scope.selectALl=false;	
							}
							angular.forEach($scope.finalActuals, function (item) {
						            item.Selected = $scope.selectedAll;
						        });
						}*/
						$scope.selectedAsgValue=function(asgValue){
							var filter=[];
							
							if(asgValue!="asg"){
								for(var i=0;i<$scope.finalActuals.length;i++){
									if($scope.finalActuals[i].SubPortfolio==asgValue){
										filter.push($scope.finalActuals[i]);
									}
								}
								$scope.finalActuals=filter;								
							}
							else{
								$scope.finalActuals=$scope.backup;
							}
						}
						$scope.next=function(){

							for(var i=0;i<$scope.finalActuals.length;i++){
							
							if($scope.checkbox[i]){
								$rootScope.activeProjects.push($scope.finalActuals[i]);
								
							}
							else{
								//do nothing
							}
							}
							console.log("length is"+$scope.activeProjects.length);
							$location.path('/allocate');
						}				
						
							function methodTest(values,num,actuals){
								var count=0;
								
								$scope.monthsFrActuals = [];
								$scope.monthFrForecast=[];
							    
							    var monthString = "";

							    var now = new Date();
							    var month = now.getMonth();
							    var year = now.getFullYear();
							    var oYear=2016;
							    var oMonth=0;
							    var fMonth=month;
							    var fYear=oYear;

    							var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
							    
    							for(var i=0;i<6;i++){
    								$scope.monthFrForecast.push(names[fMonth]+'_x0020_'+fYear);
    								fMonth++;
    								if(fMonth===12){
    									fMonth=0;
    									++fYear;
    								}
    							}
    							$rootScope.neededMonthsForecast=$scope.monthFrForecast;
							    while(oYear!=year+1){
							    	
							    	 $scope.monthsFrActuals.push(names[oMonth]+'_x0020_'+oYear+'_x0020_Actual');
							    	 ++oMonth;


							        if(oMonth==month+1 && oYear==year){
							        		break;
							            }

							        if(oMonth === 12){
							            oMonth = 0;
							            
							            	++oYear;	
							            

							        }
							    }

							    $rootScope.monthActualsG=$scope.monthsFrActuals;
							    $rootScope.monthForecastG=$scope.monthFrForecast;
							    

							    for(var i=0;i<$rootScope.groups.length;i++){
									var obj =$rootScope.groups[i];
										
										if($rootScope.groups[num].ASG==$rootScope.groups[i].ASG && $rootScope.groups[num].Portfolio==$rootScope.groups[i].Portfolio && $rootScope.groups[num].Sub_x0020__x002d__x0020_Portfoli==$rootScope.groups[i].Sub_x0020__x002d__x0020_Portfoli && $rootScope.groups[num].Invoice_x0020_Forecast==$rootScope.groups[i].Invoice_x0020_Forecast && $rootScope.groups[num].Clarity_x0020_Id==$rootScope.groups[i].Clarity_x0020_Id){
											count++;

											for(var j=0;j<$scope.monthsFrActuals.length;j++){
												var monthString=$scope.monthsFrActuals[j];
												if(obj[monthString]!=null){
												actuals=actuals+obj[monthString];

												}
											}
											if($scope.flag==0){
												for(var k=0;k<$scope.monthFrForecast.length;k++){
														var foreCastString=$scope.monthFrForecast[k];
															if(obj[foreCastString]!=null){	
																	$scope.forecast.push(obj[foreCastString]);
																}
												}
												$scope.flag++;
											}
											else{
												for(var k=0;k<$scope.monthFrForecast.length;k++){
													var foreCastString=$scope.monthFrForecast[k];
															if(obj[foreCastString]!=null){	
																	$scope.forecast[k]+=obj[foreCastString];
																}
												}
											}
											/*for(var k=0;k<$scope.monthFrForecast.length;k++){
														var foreCastString=$scope.monthFrForecast[k];
														if(obj[foreCastString]!=null){
													if($scope.forecast.length!=0 ){
														for(var x=0;x<$scope.forecast.length;x++){
														if(obj[foreCastString]==$scope.forecast[x]){
															$scope.forecast[x]+=obj[foreCastString];
															}else{
															$scope.forecast.push(obj[foreCastString]);
														}
													}
													
													}
													else{
														$scope.forecast.push(obj[foreCastString]);
													}		
													
														}
														
													}*/
											
										}
									
									
								}
								console.log("forecast length is"+$scope.forecast.length);
								
								var check=0;
								for(var k=0;k<$scope.finalActuals.length;k++){
									if($scope.finalActuals[k].ASG==$rootScope.groups[num].ASG && $scope.finalActuals[k].Portfolio==$rootScope.groups[num].Portfolio
										&& $scope.finalActuals[k].SubPortfolio==$rootScope.groups[num].Sub_x0020__x002d__x0020_Portfoli &&  $scope.finalActuals[k].Project==$rootScope.groups[num].Invoice_x0020_Forecast
										&& $scope.finalActuals[k].ClarityId==$rootScope.groups[num].Clarity_x0020_Id){
										check=1;
										break;
									}
								}
								if(check==0){
									$scope.finalActuals.push({
										"ASG":$rootScope.groups[num].ASG,
										"Portfolio":$rootScope.groups[num].Portfolio,
										"SubPortfolio":$rootScope.groups[num].Sub_x0020__x002d__x0020_Portfoli,
										"Project":$rootScope.groups[num].Invoice_x0020_Forecast,
										"ClarityId":$rootScope.groups[num].Clarity_x0020_Id,
										"Actuals":actuals,
										"Forecast1":$scope.forecast[0],
										"Forecast2":$scope.forecast[1],
										"Forecast3":$scope.forecast[2],
										"Forecast4":$scope.forecast[3],
										"Forecast5":$scope.forecast[4]
									});
								}
								console.log("final length is"+$scope.finalActuals.length);
								$scope.backup=$scope.finalActuals;
							}






    			/*************************************************/

		
		$scope.addUser=function(){
			
				
				var siteUrl = "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/";

                                                var clientContext = new SP.ClientContext(siteUrl);

                                                var oList = clientContext.get_web().get_lists().getByTitle('ResourceTable');

                                                var itemCreateInfo = new SP.ListItemCreationInformation();

                                              

 

						for(var i=1;i<$rootScope.invoice.items.length;i++){
                                              
						var oListItem = oList.addItem(itemCreateInfo);
						oListItem.set_item('Resource_x0020_Name',$rootScope.invoice.items[i].Name);
						
						oListItem.set_item('Project',$rootScope.tsg);

                        oListItem.set_item('ASG',$rootScope.asg);

                        oListItem.set_item('Location',$rootScope.location);

                        oListItem.set_item('Role_x0020_type',$rootScope.invoice.items[i].RollType);

                        oListItem.set_item('Enterprise_x0020_ID',$rootScope.invoice.items[i].Eid);
                                                
 						oListItem.set_item('Clarity_x0020_Id',$rootScope.invoice.items[i].ClarityId);
						
						oListItem.set_item('ProjectName',$rootScope.invoice.items[i].Pname);
						
						oListItem.set_item('Portfolio',$rootScope.invoice.items[i].Portfolio);

                        oListItem.update();

                        clientContext.load(oListItem);
						
						
                                               } 
						
						clientContext.executeQueryAsync(Function.createDelegate(oListItem, this.onSaved), Function.createDelegate(oListItem, this.onQueryFailed));
                                                
						
						function onSaved() {

                                                  alert('Successfully Saved');

                                                   id=oListItem.get_id();

                                                                submits=1;

                                                    }

 

                                                function onQueryFailed(sender, args) {

                                                    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());

                                                } 					



						}	



		/**********************************************************************/
								$scope.res = [];
							    $scope.neededMonths = [];
							    $scope.selectedMonth = [];

							    var monthString = " ";

							    var now = new Date();
							    var month = now.getMonth();
							    var year = now.getFullYear();

    							var names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
							    
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

							    for(var j = 0; j<$scope.neededMonths.length;j++){
							    	$scope.selectedMonth.push($scope.neededMonths[j] + "_x002d_16"); 
								}
		/**********************************************************************/
 
}]);