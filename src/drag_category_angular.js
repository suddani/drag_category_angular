angular.module('drag_category_angular', []).
directive("dragCategoryChild", ["$document", function($document) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      element.on("dragstart", function(event) {
        var identifier = scope.find_index(scope.child);
        event.dataTransfer.setData("child", identifier);
      });
      element.on("drop", function(event) {
        event.preventDefault();
        event.stopPropagation();
        var identifier = event.dataTransfer.getData("child");
        if (identifier) scope.move(identifier, scope.category, scope.child);

      });
      element.on("dragover", function(event) {
        event.preventDefault();
      });
    }
  };
}]).
directive("dragCategoryContainer", ["$document", function($document) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      element.on("drop", function(event) {
        event.preventDefault();
        event.stopPropagation();
        var identifier = event.dataTransfer.getData("child");
        if (identifier) scope.move(identifier, scope.category);
        else {
          identifier = event.dataTransfer.getData("category");
          if (identifier) scope.move_category(identifier, scope.category);
        }
      });
      element.on("dragover", function(event) {
        event.preventDefault();
      });
    }
  };
}]).
directive("dragCategoryHeader", ["$document", function($document) {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      element.on("dragstart", function(event) {
        var identifier = scope.find_category_index(scope.category);
        if (identifier) event.dataTransfer.setData("category", identifier);
      });
    }
  };
}]).
directive("dragCategory", [function() {
  return {
    restrict: 'E',
    scope: {
      categories: '=',
      elements: '=',
      noAddButton: "=",
      onAdd: "&",
      poolName: "="
    },
    transclude: {
        'title': '?paneTitle',
        'body': '?paneBody',
        'footer': '?paneFooter'
    },
    controller: ['$scope', function($scope) {
      $scope.move_category = function(identifier, target) {
        var source = $scope.categories[identifier];
        $scope.categories.splice(identifier,1);
        $scope.categories.splice($scope.categories.indexOf(target), 0, source);
        $scope.$apply();
      }

      $scope.move = function(identifier, target, before) {
        var category_id = identifier.split("_")[0];
        var child_id = identifier.split("_")[1];
        var source = $scope.categories[category_id];
        if (!source) source = $scope.elements;
        else source = source.children;

        var child = source[child_id];
        source.splice(child_id,1);

        if (target) {
          target.children = target.children||[];
          target = target.children;
        } else {
          target = $scope.elements;
        }
        var insert_at = target.indexOf(before);
        if (insert_at == -1) insert_at = target.length;
        target.splice(insert_at,0,child);

        $scope.$apply();
      }
      $scope.find_target = function(child) {
        var identifier = $scope.find_index(child);
        var category_id = identifier.split("_")[0];

        var target = $scope.categories[category_id];
        if (!target) target = $scope.elements;
        else target = source.children;
        return target;
      }
      $scope.find_index = function(child) {
        var identifier = $scope.find_index_elements("", $scope.elements, child);
        if (!identifier) {
          for (var i in $scope.categories) {
            identifier = $scope.find_index_elements(""+i, $scope.categories[i].children, child);
            if (identifier) break;
          }
        }
        return identifier;
      }
      $scope.find_index_elements =  function(prefix, elements, child) {
        for (var i in elements) {
          if (elements[i] == child)
            return prefix+"_"+i;
        }
        return null;
      }
      $scope.find_category_index = function(category) {
        var index = $scope.categories.indexOf(category);
        if (index < 0) return null;
        return index;
      }
      $scope.removeCategory = function(category) {
        $scope.categories.splice($scope.categories.indexOf(category),1);
        for (var i in category.children)
          $scope.elements.push(category.children[i]);
      }
    }],
    controllerAs: "ctrl",
    link: function(scope, element, attrs) {
      element.on("dragover", function(event) {
        event.preventDefault();
      });
    },
    template: `
<div class="drag-category">
  <div style="float:left;" ng-repeat="category in categories track by $index" class="drag-category-container">
    <div class="drag-category-header" draggable="true">
      <div class="drag-category-header-delete" ng-click="removeCategory(category)">Delete</div>
      {{category.label}}
    </div>
    <div class="drag-category-body">
      <div class="drag-category-child" draggable="true" ng-repeat="child in category.children track by $index">
        {{child.label}}
      </div>
    </div>
  </div>
  <div style="float:left;" ng-hide="noAddButton">
    <div class="drag-category-header drag-category-header-add" ng-click="onAdd()">Add</div>
  </div>

  <div style="float:left;" class="drag-category-container">
    <div class="drag-category-header drag-category-header-pool">{{poolName||"Pool"}}</div>
    <div class="drag-category-body">
      <div class="drag-category-child" draggable="true" ng-repeat="child in elements track by $index">
        {{child.label}}
      </div>
    </div>
  </div>
  <div style="clear:left;display:hidden"></div>
</div>
`
  };
}]);
