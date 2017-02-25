/*app.directive('calendar', function () {
            return {
                require: 'ngModel',
                link: function (scope, el, attr, ngModel) {
                    $(el).datepicker({
                        dateFormat: 'yy-mm-dd',
                        onSelect: function (dateText) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(dateText);
                            });
                        }
                    });
                }
            };
        });*/
     /*   app.directive("datepicker", function () {
			    return {
			        restrict: "A",
			        link: function (scope, el, attr) {
			            el.datepicker({
			                            dateFormat: 'yy-mm-dd'
			                        });
			        }
			    };
			});*/

app.controller('configController',['$scope','$http','$rootScope','$location','$filter',function($scope,$http,$rootScope,$location,$filter){

	$scope.menu="";
	  $('#calendar').datepicker({
        dateFormat: 'dd-mm-yy',
        altField: '#thealtdate',
        altFormat: 'yy-mm-dd'
		});
	  $('#calendar1').datepicker({
        dateFormat: 'dd-mm-yy',
        altField: '#thealtdate',
        altFormat: 'yy-mm-dd'
		});
	$scope.contractDet=function(){
		$scope.menu="contract";
		$('#calendar').datepicker({
        dateFormat: 'dd-mm-yy',
        altField: '#thealtdate',
        altFormat: 'yy-mm-dd'
		});
	}
	$scope.monthChange=function(){
		$scope.menu="month";	
	}
    $scope.saveConfig=function(){
    	console.log("startdate"+$scope.startdate);
    	console.log("enddate"+$scope.enddate);
    	var siteUrl = 'https://ts.accenture.com/sites/CignaSharepoint/projectdelivery/';

							    var clientContext = new SP.ClientContext(siteUrl);
    						    var oList = clientContext.get_web().get_lists().getByTitle('InvoiceConfiguration');

								
								    var itemCreateInfo = new SP.ListItemCreationInformation();
   									var oListItem = oList.addItem(itemCreateInfo);	
				
									oListItem.set_item('StartDate',$scope.startdate);
									oListItem.set_item('EndDate',$scope.enddate);
									oListItem.update();
								  								

			 					clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));

								function onQuerySucceeded() {
								    alert('Item updated!');
								}
								function onQueryFailed(sender, args) {
								    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
								}	
    }
}]);