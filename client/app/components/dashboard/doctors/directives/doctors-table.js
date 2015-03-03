angular.module('dashboard')
  .directive('doctorsTable', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/components/dashboard/doctors/views/doctors.html',
      controller: 'SafeController',
      controllerAs: 'safeCtrl'
    };
  })
  .controller('SafeController', ['$scope', function ($scope) {

    var Names = ['David Fincher', 'Mardy Bum', 'Alex Turner', 'Haruki Murakami'];
    var Email = ['powell@ucsd.edu', 'peter@ucsd.edu', 'robo@ucsd.edu', '112@ucsd.edu'];
    var Phone = ["(626)342-0347", "(234)343-3489", "(232)342-0193", "(342)347-2938"];
    var id = 1;

    function generateRandomItem(id) {
        var docName = Names[Math.floor(Math.random() * 3)];
        var phoneNumber = Phone[Math.floor(Math.random() * 3)];
        var docEmail = Email[Math.floor(Math.random() * 3)];

        return {
            id: id,
            Name: docName,
            PhoneNumber: phoneNumber,
            Email: docEmail
        }
    }

    $scope.rowCollection = [];

    for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
    }

    //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
    $scope.displayedCollection = [].concat($scope.rowCollection);

    //add to the real data holder
    $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    };
}]);
