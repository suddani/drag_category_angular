# Drag Category Angular

Check it out https://suddani.github.io/drag_category_angular/example/index.html

## Usage
Add the module to your project:
```javascript
angular.module('example', ["drag_category_angular"])
```

Add the directive to your html
```html
<drag-category categories="categories" elements="elements" no-add-button="false" on-add="addCategory()" pool-name="'Unused'"></drag-category>
```

Provide some data to the directive for rendering and implement the addCategory method to add new categories
```javascript
  $scope.addCategory = function() {
    $scope.categories.push({label: "new Category"})
  }
  $scope.elements = [
    {
      label: "child 1"
    },
    {
      label: "child 2"
    }
  ];
  $scope.categories = [
    {
      label: "test 1"
    },
    {
      label: "test 2",
      children: [
        {
          label: "categories child 1"
        }
      ]
    }
  ]
```

The elements will end up in the pool of elements that can be added to the different categories.

You can rename the pool by providing an attribute:
```
pool-name="'Unused'"
```

## Styling
The demo uses the following css styles
```css
.drag-category-container {
  margin-left: 16px;
  margin-right: 16px;
  position: relative;
}
.drag-category-header {
  margin: 8px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 32px;
  background-color: blue;
  max-width: 128px;
  text-align: center;
  position: relative;
}
.drag-category-header.drag-category-header-pool {
  padding-right: 16px;
}
.drag-category-header.drag-category-header-add {
  padding-right: 16px;
  cursor: copy;
}
.drag-category-header-delete {
  padding: 4px;
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 0.5em;
  background-color: red;
}
.drag-category-body {
  position: relative;
  padding-left: 8px;
  padding-right: 8px;
}
.drag-category-child {
  margin: 8px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: red;
  position: relative;
  color: green;
  text-align: center;
}
```
