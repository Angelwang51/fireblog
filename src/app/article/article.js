
angular.module( 'fireBlog.article', [
  'ui.router',
  'plusOne',
  'ngAnimate',
  'ui.bootstrap',
  'firebase',
  'btford.markdown'
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
  $stateProvider.state( 'article', {
    url: '/article',
    views: {
      "main":{
        controller: 'ArticleCtrl',
        templateUrl: 'article/article.tpl.html'
      }
    },
    data:{ pageTitle: 'Article' }
  });
})

.controller( 'ArticleCtrl', 
  function($scope,$http,$firebaseAuth, $q){
    $scope.article='';
    $scope.articles=[];

    $scope.displayArticle = function(){
      var deferred = $q.defer();
      $http.get(API_URL+'/articles.json')
        .success(function(data){
          $scope.articles=data;
          console.log(data);
          if (document.querySelector('div#lastDiv') && document.querySelector('.article-image')){
            deferred.resolve();
          }
        });
        return deferred.promise;
    };
    $scope.displayArticle();

  });

  


