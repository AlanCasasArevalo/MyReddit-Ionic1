(function() {

    var app = angular.module('starter', ['ionic', 'angularMoment']);
    var urlRedditAPIGaming = 'https://www.reddit.com/r/gaming/new/.json';
    var urlRedditAPIFunny = 'https://www.reddit.com/r/funny/new/.json';

    app.controller('RedditController', function($scope, $http) {
        $scope.posts = [];
        $http.get(urlRedditAPIGaming)
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

            $http.get(urlRedditAPIFunny, { params: paramsFromURL })
                .success(function(posts) {
                    // console.log(posts);
                    angular.forEach(posts.data.children, function(post) {
                        $scope.posts.push(post.data);
                        console.log(post);
                    });

                    $scope.$broadcast('scroll.infiniteScrollComplete');

                });
        };

        $scope.loadNewPost = function() {

            if ($scope.posts.lenght > 0) {
                var paramsFromURL = { 'before': $scope.posts[0].name };
            } else {
                return;
            }

            $http.get(urlRedditAPIGaming, { params: paramsFromURL })
                .success(function(posts) {

                    var newPosts = [];

                    angular.forEach(posts.data.children, function(post) {
                        newPosts.push(post.data);
                    });

                    $scope.posts = newPosts.concat($scope.posts);

                    $scope.$broadcast('scroll.refreshComplete');

                });

        };

        $scope.openPostLink = function(url) {
            window.open(url, 'blank');
        };

    });

    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {

                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.cordova && window.cordova.InAppBrowser) {
                window.open = cordova.InAppBrowser.open;
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });

}());