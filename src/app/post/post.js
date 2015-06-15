angular.module( 'fireBlog.post', [
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
      $http.post(API_URL+'/articles.json',articleJSON)
      .success(function(data){
        console.log(data);
        $location.path('/article');
      });
    };
  });
