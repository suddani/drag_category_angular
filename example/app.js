angular.module('example', ["drag_category_angular"]).
controller("app", ["$scope", function($scope) {
  $scope.addCategory = function() {
    console.log("add category")
    $scope.categories.push({label: "lol"})
  }
  $scope.elements = [
    {
      label: "child 1"
    },
    {
      label: "child 2"
    },
    {
      label: "child 3"
    },
    {
      label: "child 4"
    },
    {
      label: "child 5"
    },
    {
      label: "child 6"
    },
    {
      label: "child 7"
    },
    {
      label: "child 8"
    },
    {
      label: "child 9"
    }
  ];
  $scope.categories = [
    {
      label: "test 1"
    },
    {
      label: "test 2"
    },
    {
      label: "test 3",
      children: [
        {
          label: "child 1"
        },
        {
          label: "child 2"
        },
        {
          label: "child 3"
        },
        {
          label: "child 4"
        }
      ]
    },
    {
      label: "test 4"
    },
    {
      label: "test 5"
    },
    {
      label: "test 6"
    },
    {
      label: "test 7"
    },
    {
      label: "test 8"
    }
  ];
}]);
