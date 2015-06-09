angular.module( 'ngBlog.post', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'firebase'

])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'post', {
    url: '/post',
    views: {
        'main':{
        controller: 'PostCtrl',
        templateUrl: 'post/post.tpl.html'
      }
    },
    data:{ pageTitle: 'Post' }
  });
})

.controller( 'PostCtrl', 
  function($scope,$http,$location,$state,$rootScope){
    $scope.addArticle = function(){
      $scope.date = new Date().valueOf();
      var articleJSON = {
        body: $scope.body,
        date: $scope.date,
        title: $scope.title,
        summary:$scope.summary,
        coverImage: $scope.coverImage
      };
      $http.post('https://torrid-heat-2114.firebaseio.com/articles.json',articleJSON)
      .success(function(data){
        console.log(data);
        $location.path('/article');

      });
      //$rootScope.$broadcast('addArticle');
      //console.log('broadcasting');

      //reloading the page for a given route path
      //$location.path('/article');
      //$state.reload();

    };
 /*.factory('Post',
  function($firebaseObject){
    return function(articles){
      // Create a unique ID
        var timestamp = new Date().valueOf();
      // Get the Firebase reference of the item
        var itemRef = new Firebase("https://torrid-heat-2114.firebaseio.com/articles"+ timestamp);
      // create a reference to the Firebase database where we will store our data
        var articleRef = itemRef.child(articles)  
    }
  })*/
    /*var articleRef = new Firebase("https://torrid-heat-2114.firebaseio.com/articles")
    $scope.newArticle = $firebaseObject(articleRef);

    $scope.addItem = function(){
      // Create a unique ID
        var timestamp = new Date().valueOf()
      // Get the Firebase reference of the item
        var itemRef = new Firebase("https://torrid-heat-2114.firebaseio.com/articles/"+ timestamp);
        itemRef.set({
            id: timestamp,
            body: $scope.body,
            title: $scope.title,
            summary:$scope.summary,
            coverImage: $scope.coverImage
         }); 
         $location.path("/article"); 

    };
    // Create a unique ID
        var timestamp = new Date().valueOf()
      // Get the Firebase reference of the item
        var itemRef = new Firebase("https://torrid-heat-2114.firebaseio.com/articles/"+ timestamp);
        var articleObject = $firebaseObject(itemRef);
        articleObject.$bindTo($scope,"article");*/
  });
