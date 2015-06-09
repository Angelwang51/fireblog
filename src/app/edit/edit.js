angular.module( 'ngBlog.edit', [
  'ui.router',
  'plusOne',
  'ui.bootstrap'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'edit', {
    url: '/article/:articleId/edit',
    views: {
      "main":{
        controller: 'EditCtrl',
        templateUrl: 'edit/edit.tpl.html'
      }
    },
    data:{ pageTitle: 'Edit' }
  });
})
.controller('EditCtrl',
    function($scope,$stateParams,$http,$location){
      //It will have one key per url parameter.
   $scope.id_to_get = $stateParams.articleId;
    
    $http.get('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'.json').
    success(function(data){
          $scope.editTitle=data.title;
          $scope.editCoverImage=data.coverImage;
          $scope.editSummary=data.summary;
          $scope.editBody=data.body;
    });
    /*$scope.updateArticle = function(){
      // Get the Firebase reference of the item
        var itemRef = new  Firebase('https://torrid-heat-2114.firebaseio.com/articles/' + $scope.id_to_get);
      // Firebase : Update the item
        itemRef.update({
          id: $scope.id_to_get,
          body: $scope.editBody,
          title: $scope.editTitle,
          summary: $scope.editSummary,
          coverImage: $scope.editCoverImage
        });
        $location.path("/article");  
    };
    $scope.deleteArticle = function(){
      var itemRef = new  Firebase('https://torrid-heat-2114.firebaseio.com/articles/' + $scope.id_to_get);
      itemRef.remove();
      $location.path("/article");
    }*/
    
    $scope.updateArticle = function(){
      $scope.editDate = new Date().valueOf();
      var articleData={
        body: $scope.editBody,
        date: $scope.editDate,
        title: $scope.editTitle,
        summary: $scope.editSummary,
        coverImage: $scope.editCoverImage
      };
      $http.patch('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'.json',articleData).
      success(function(data){
        console.log(data);
        $location.path('/article');
      });
      
      };
    $scope.deleteArticle=function(){
      $http.delete('https://torrid-heat-2114.firebaseio.com/articles/'+$scope.id_to_get+'.json').
      success(function(data){
        $location.path('/article');
      });
    };  
});