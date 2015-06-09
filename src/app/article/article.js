/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBlog.article', [
  'ui.router',
  'plusOne',
  'ngAnimate',
  'ui.bootstrap',
  'firebase',
  'btford.markdown'

])
/*.filter('orderObjectBy', function(){
 return function(input, attribute) {
    if (!angular.isObject(input)) return input;

    var array = [];
    for(var objectKey in input) {
        input[objectKey]['_key'] = objectKey; 
        array.push(input[objectKey]);
    }

    return array;
 }
})*/

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
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

/**
 * And of course we define a controller for our route.
 */
.controller( 'ArticleCtrl', 
  function($scope,$http,$firebaseAuth){
  $scope.article='';
  $scope.articles=[];

  $scope.displayArticle = function(){
  $http.get('https://torrid-heat-2114.firebaseio.com/articles.json')
    .success(function(data){
     $scope.articles=data;
     console.log(data);
    
    /*var articleArray = _.values(data);
    articleArray =_.sortByOrder(articleArray, ['date'],[false]);
     console.log(articleArray);*/

     //$scope.articleArray =_.sortByOrder(data, ['date'],[false]);
    });
  
  };
  $scope.displayArticle();
  /*$scope.sliderInterval=6000;
  $scope.slides =[
  {image:'https://40.media.tumblr.com/46097fdb08441c677ac3c9dc6aaa0e2f/tumblr_nopwhjQNd41te26r3o1_1280.jpg'},
  {image:'https://40.media.tumblr.com/6a0aacb77ad7c9aa349b493440d4baab/tumblr_nopwhz1f7S1te26r3o1_1280.jpg'},
  {image:'https://36.media.tumblr.com/4581565c414ed58b28e202a82c234413/tumblr_nopwia5phy1te26r3o1_1280.jpg'},
  {image:'https://40.media.tumblr.com/43e51dd230d55d313cce1a17578ca07a/tumblr_nopwjpK8sD1te26r3o1_1280.jpg'}
  ];*/


  });

  


