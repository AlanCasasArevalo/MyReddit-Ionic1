(function() {

    var app = angular.module('starter', ['ionic']);

    app.controller('RedditController', function($scope) {
        $scope.posts = [
            { title: 'Primer post' },
            { title: 'Segundo post' }
        ];
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