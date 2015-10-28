(function(){
    'use strict';
    angular.module('restApp')

        .controller('IndexCtrl', ['$scope', '$http', '$route', '$location', '$routeParams', function($scope, $http, $route, $location, $routeParams) {
        var pp = this;
            pp.obj = 1;
            pp.classes = [];

            console.log('pp');

            (function(){
                return $http.get('rest.php/resource_classes')
                    .then(successHandler)
                    .catch(errorHandler);
                function successHandler(result) {
                    console.log(result);
                    pp.classes = result.data;
                }
                function errorHandler(result){
                    alert(result.data[0].message);
                    console.log(result.data[0].message);
                }
            }());

            pp.del = function(id){
                //console.log(id);
                (function(){
                    return $http.delete('http://web/rest.php/resource_classes/' + id)
                        .then(successHandler)
                        .catch(errorHandler);
                    function successHandler(result) {
                        console.log(result);
                        alert('Клас успішно видалений');
                        $route.reload();
                    }
                    function errorHandler(result){
                        alert(result.data[0].message);
                        console.log(result.data[0].message);
                    }
                }());
            }
            pp.addClass = function(){
                console.log(pp.addClassInput);
                var classObj = {
                    name: pp.addClassInput
                };
                (function(){
                    return $http.post('http://web/rest.php/resource_classes',classObj)
                        .then(successHandler)
                        .catch(errorHandler);
                    function successHandler(result) {
                        console.log(result);
                        alert('Клас успішно Доданий');
                        $route.reload();
                    }
                    function errorHandler(result){
                        alert(result.data[0].message);
                        console.log(result.data[0].message);
                    }
                }());
            }
        }]);


})();
