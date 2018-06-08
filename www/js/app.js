(function() {

    var app = angular.module('starter', ['ionic', 'angularMoment']);
    var urlRedditAPI = 'https://www.reddit.com/r/pics/new/.json';

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

        $scope.loadMorePost = function() {

            var paramsFromURL = {};

            if ($scope.posts.lenght > 0) {
                paramsFromURL['after'] = $scope.posts[$scope.posts.lenght - 1].name;
            }

            $http.get(urlRedditAPI, { params: paramsFromURL })
                .success(function(posts) {
                    // console.log(posts);
                    angular.forEach(posts.data.children, function(post) {
                        $scope.posts.push(post.data);
                        console.log(post);
                    });

                    $scope.$broadcast('scroll.infiniteScrollComplete');

                });
        };
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