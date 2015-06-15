angular.module( 'fireBlog.detail', [
  'btford.markdown',
  'ui.router',
  'plusOne',
  'ui.bootstrap'
])

.filter('toArray',function(){
  return function(input){
    function getValue(value,key){
      //store key as id into articles' new array
      value.id=key;
      return value;
    }
    var array = _.map(input,getValue);
    return array;
};
})

.config(function config( $stateProvider ) {
  $stateProvider.state( 'detail', {
    url: '/article/:articleId',
    views: {
      "main":{
        controller: 'DetailCtrl',
        templateUrl: 'detail/detail.tpl.html'
      }
    },
    data:{ pageTitle: 'Detail' }
  });
})
.controller('DetailCtrl', 
  function($scope,$stateParams, $http,$rootScope,$location,$state,$firebaseObject){
    $scope.id_to_get = $stateParams.articleId;
    $rootScope.numComments = 0;
    $http.get(API_URL+'/articles/'+$scope.id_to_get+'.json').
    success(function(data){
      $scope.article=data;
    });
    $http.get(API_URL+'/articles/'+$scope.id_to_get+'/comments.json').
      success(function(data){
      $rootScope.numComments = Object.keys(data).length;
      $scope.comments=data;
      console.log(data);
      /*var commentArray = _.values(data);
      commentArray =_.sortByOrder(commentArray, ['date'],[false]);
      console.log(commentArray);*/

      //var commentFire = new Firebase('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'/comments');
      //commentFire.on('value',
        //function(dataSnapshot){
          //$rootScope.numComments = dataSnapshot.numChildren();
          //$scope.$apply();
          //console.log(numComments);
        //});
    });
        
      $scope.addComment = function(){
        $scope.date = new Date().valueOf();
        var commentJSON = {
          name: $scope.name,
          comment: $scope.comment,
          date: $scope.date
        };
        $http.post(API_URL+'/articles/'+$scope.id_to_get+'/comments.json',commentJSON).
        success(function(data){
          //reloading the page for a given route path
          $location.path('/article/'+$scope.id_to_get);
          $state.reload();
        });
    };
  });
  