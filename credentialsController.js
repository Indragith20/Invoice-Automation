app.controller('credentialsController',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){
	
			var len=0;
        	$rootScope.profiledet=[];
        	
        	$http(
							{								
								url : "https://ts.accenture.com/sites/CignaSharepoint/ProjectDelivery/_api/SP.UserProfiles.PeopleManager/GetMyProperties",
								type : "GET",
								headers : {
									"accept" : "application/json;odata=verbose",
									
								}
							})
							.then(
									function(data) {
										$scope.showLoader = false;
										console.log(data);
									    $rootScope.profiledet=data.data.d.Email;
										console.log("Profile Details Are " +$rootScope.profiledet);
										com();
							})

			function com(){
				$http(
                            {                               
                                url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('UserProfiles_1')/items?$top=4000",
                                type : "GET",
                                
                                headers : {
                                    "accept" : "application/json;odata=verbose",
                                    
                                }
                            })
				.then(function(data){
				
							console.log("from UserProfiles_1 list" + data);
							credentials = data.data.d.results;

							console.log(credentials.length);

							console.log("credentials"+credentials);

							for (var i = 0; i < credentials.length; i++) {
											delete credentials[i]["Attachments"];
											delete credentials[i]["AttachmentFiles"];
											delete credentials[i]["AuthorId"];
											delete credentials[i]["ContentTypeId"];
											delete credentials[i]["Created"];
											delete credentials[i]["EditorId"];
											delete credentials[i]["FileSystemObjectType"];
											delete credentials[i]["GUID"];
											//	                delete groups[i]["ID"];            
											delete credentials[i]["Id"];
											delete credentials[i]["Modified"];
											delete credentials[i]["OData__UIVersionString"];
											delete credentials[i]["RoleAssignments"];
											delete credentials[i]["ContentType"];
											delete credentials[i]["FieldValuesAsHtml"];
											delete credentials[i]["FieldValuesAsText"];
											delete credentials[i]["FieldValuesForEdit"];
											delete credentials[i]["File"];
											delete credentials[i]["FirstUniqueAncestorSecurableObject"];
											delete credentials[i]["Folder"];
											delete credentials[i]["ParentList"];
							};
								
							$rootScope.credentials = credentials;
							$rootScope.SSGQA = [];
							$rootScope.profiledet=$rootScope.profiledet.split('@')[0];
							for(var i=0;i<$rootScope.credentials.length;i++) {
								if($rootScope.profiledet===$rootScope.credentials[i].Eid)
									{
										if($rootScope.credentials[i].TSG!="All TSGs"){
											$rootScope.tsg=$rootScope.credentials[i].TSG;
											filter();
											break;
										}
										else{
											/*$location.path('/home');*/
											$location.path('/config');
										}
										
									}
							}
							
						});

					}



					function filter(){

						var paramString='$filter=';
		 				paramString=paramString+"(TSG eq '"+ $rootScope.tsg + "')";

						console.log("paramString", paramString);

						$http(
								{
									
									url : "https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/_api/web/lists/getbytitle('InvoiceNewListFinal')/items?$top=4000&"
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
											


										});
					}
}]);