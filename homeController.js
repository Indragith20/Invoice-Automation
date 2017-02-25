
app.controller('homeController',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){
						

			
						$http(
							{								
								url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceSampleList')/items?$top=4000",
								type : "GET",
								
								headers : {
									"accept" : "application/json;odata=verbose",
									
								}
							})
							.then(
									function(data) {
										console.log(data);
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

										$rootScope.filterData = groups;

										$rootScope.filterTSG = [];
										
										$rootScope.filterLocation = [];
										
										for (var i = 0; i < $rootScope.filterData.length; i++) {
											$rootScope.filterTSG.push($rootScope.filterData[i].Title);
											$rootScope.filterLocation.push($rootScope.filterData[i].Location);
											
										}
										
										$rootScope.filterTSG = $filter('unique')($rootScope.filterTSG);
										
										$rootScope.filterLocation = $filter('unique')($rootScope.filterLocation);
										
										console.log($rootScope.filterTSG);

									}
									);
					
					$scope.selection = [];
					$scope.tsg=[];
					$scope.location=[];
					

					$scope.toggleSelection = function toggleSelection(asg) {
						var idx = $scope.selection.indexOf(asg);
						if (idx > -1) {
							$scope.selection.splice(idx, 1);
							sessionStorage.setItem("selection", JSON.stringify($scope.selection));
						} else {
							$scope.selection.push(asg);							
							sessionStorage.setItem("selection", JSON.stringify($scope.selection));
						}
						console.log($scope.selection);
						
					};

					$scope.toggleTsg = function toggleTsg(tsg) {
						$rootScope.filterASG = [];
						var idx = $scope.tsg.indexOf(tsg);
						if (idx > -1) {
							$scope.tsg.splice(idx, 1);
							sessionStorage.setItem("tsg", JSON.stringify($scope.tsg));
						} else {
							$scope.tsg.push(tsg);
							sessionStorage.setItem("tsg", JSON.stringify($scope.tsg));
						}
						console.log($scope.tsg);
						$rootScope.tsg = $scope.tsg;
						console.log("$rootScope.tsg-->"+$rootScope.tsg);
						getASG();
					};
					
					$scope.showList = function showList(event){
						event.stopPropagation();
					};

					$scope.toggleLocation = function toggleLocation(location) {
						var idx = $scope.location.indexOf(location);
						if (idx > -1) {
							$scope.location.splice(idx, 1);
							sessionStorage.setItem("location", JSON.stringify($scope.location));
						} else {
							$scope.location.push(location);
							sessionStorage.setItem("location", JSON.stringify($scope.location));
						}
						console.log($scope.location)
					};

			
					
					$rootScope.fieldvalues = {};

					function buildParameterString() {
						var tempParamString = '$filter=';
						var queryAppended = false;

						var fieldValues = $rootScope.fieldvalues;
						console.log("fieldValue", fieldValues)
												
						if ($scope.tsg && $scope.tsg != null
								&& $scope.tsg != '') {
							var last = $scope.tsg.length;
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.tsg.length; i++) {

								tempParamString = tempParamString + "(Title eq '"
										+ $scope.tsg[i] + "')";
								if (i + 1 < $scope.tsg.length) {
									tempParamString = tempParamString + " or ";
								}								
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";
						}
						
						if ($scope.location && $scope.location != null
								&& $scope.location != '') {
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.location.length; i++) {
								tempParamString = tempParamString
										+ "(Location eq '" + $scope.location[i]
										+ "')";
								if (i + 1 < $scope.location.length) {
									tempParamString = tempParamString + " or ";
								}
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";

						}

						if ($scope.selection && $scope.selection != null
								&& $scope.selection != '') {
							if (queryAppended) {
								tempParamString = tempParamString + " and ";
							}
							
							tempParamString = tempParamString + "(";
							for (var i = 0; i < $scope.selection.length; i++) {
								tempParamString = tempParamString
										+ "(ASG eq '" + $scope.selection[i]
										+ "')";
								if (i + 1 < $scope.selection.length) {
									tempParamString = tempParamString + " or ";
								}
								queryAppended = true;
							}
							tempParamString = tempParamString + ")";

						}
						

						return tempParamString;
					}
					function getASG(){
						console.log($rootScope.fieldvalues.tsg);

						$rootScope.groups = [ {
							txt : 'Loading..'
						} ];
						console.log("$rootScope.fieldvalues",
								$rootScope.fieldvalues);
						var paramString = buildParameterString();

						console.log("paramString", paramString);

						$http(
								{
									
									url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceSampleList')/items?$top=4000&"
											+ paramString,
									type : "GET",
									headers : {
										"accept" : "application/json;odata=verbose",
										
									}
								})
								.then(
										function(data) {
											console.log(data);
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
												//                delete groups[i]["ID"];            
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
												
											};
											
											$rootScope.groups = groups;
											console.log($rootScope.groups);
											for (var i = 0; i < $rootScope.groups.length; i++) {
											
											$rootScope.filterASG
													.push($rootScope.groups[i].ASG);
											
											
											}
											$rootScope.filterASG = $filter('unique')
												($rootScope.filterASG);
											console.log($rootScope.filterASG);


										})
							
						}
					$scope.back = function() {
				$location.path('/main');
			}
					

					$scope.submit = function() {
						$rootScope.tsg=$scope.tsg[0];
						$rootScope.asg=$scope.selection[0];
						$rootScope.location=$scope.location[0];
						console.log($rootScope.fieldvalues.tsg);

						$rootScope.groups = [ {
							txt : 'Loading..'
						} ];
						console.log("$rootScope.fieldvalues",
								$rootScope.fieldvalues);
						var paramString = buildParameterString();

						console.log("paramString", paramString);

						$http(
								{
									
									url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceSampleList')/items?$top=4000&"
											+ paramString,
									type : "GET",
									headers : {
										"accept" : "application/json;odata=verbose",
										
									}
								})
								.then(
										function(data) {
											console.log(data);
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
												//                delete groups[i]["ID"];            
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
												$location.path('/main');
											};
											
											$rootScope.groups = groups;
											console.log($rootScope.groups);
											for (var i = 0; i < $rootScope.groups.length; i++) {
											$rootScope.filterTSG
													.push($rootScope.filterData[i].Title);
											$rootScope.filterASG
													.push($rootScope.filterData[i].ASG);
											$rootScope.filterLocation
													.push($rootScope.filterData[i].Location);
											
											}
											$rootScope.filterASG = $filter('unique')
												($rootScope.filterASG);
											


										})
					};






}]);