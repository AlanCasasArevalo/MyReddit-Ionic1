(function() {

    var app = angular.module('starter', ['ionic', 'angularMoment']);
    var urlRedditAPI = 'https://www.reddit.com/r/pics/.json';

    app.controller('RedditController', function($scope, $http) {
        $scope.posts = [];
        $http.get(urlRedditAPI)
            .success(function(posts) {
                // console.log(posts);
                angular.forEach(posts.data.children, function(post) {
                    $scope.posts.push(post.data);
                    console.log(post);
                });
            });
    });

    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

}());