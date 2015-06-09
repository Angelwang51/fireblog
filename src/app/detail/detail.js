angular.module( 'ngBlog.detail', [
  'btford.markdown',
  'ui.router',
  'plusOne',
  'ui.bootstrap'
])
/*.filter('object2Array', function() {
    return function(input) {
      var out = []; 
      for(i in input){
        out.push(input[i]);
      }
      return out;
    }
  })*/
. filter('toArray',function(){
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
    $http.get('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'.json').
    success(function(data){
      $scope.article=data;
    });
    $http.get('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'/comments.json').
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

     /* $scope.addComment = function(){
      // Create a unique ID
        var timestamp = new Date().valueOf()
      // Get the Firebase reference of the item
        var itemRef = new Firebase('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'/comments/'+timestamp);
        //var commentObject = $firebaseObject(itemRef);
       // commentObject.$bindTo($scope,'comment');
        commentObject.set({
          id: timestamp,
          name:$scope.name,
          email:$scope.email,
          comment: $scope.comment
        });
      };*/

        
      $scope.addComment = function(){
      $scope.date = new Date().valueOf();
      var commentJSON = {
        name: $scope.name,
        comment: $scope.comment,
        date: $scope.date
      };
      $http.post('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'/comments.json',commentJSON).
      success(function(data){
        //reloading the page for a given route path
        $location.path('/article/'+$scope.id_to_get);
        $state.reload();
      });
    };
  });
  