'use strict';

var draganddropUI = angular.module('draganddropUI', []);

draganddropUI.directive('drag', ["$rootScope", function($rootScope) {

  function dragStart(evt, element, dragStyle) {
    element.addClass(dragStyle);
    /**
    on ne peut pas utiliser directement evt.dataTransfer à cause jQuery ...
    **/
    evt.originalEvent.dataTransfer.setData('data-id', evt.target.getAttribute('data-id'));
    evt.originalEvent.dataTransfer.setData('data-title', evt.target.getAttribute('data-title'));
    evt.originalEvent.dataTransfer.setData('data-category-id', evt.target.getAttribute('data-category-id'));
    evt.originalEvent.dataTransfer.setData('data-category-title', evt.target.getAttribute('data-category-title'));
    // evt.dataTransfer.effectAllowed = 'move';
  };
  function dragEnd(evt, element, dragStyle) {
    element.removeClass(dragStyle);
  };

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      attrs.$set('draggable', 'true');
      scope.dragStyle = attrs["dragstyle"];
      element.bind('dragstart', function(evt) {
        $rootScope.draggedElement = scope[attrs["drag"]];
        dragStart(evt, element, scope.dragStyle);
      });
      element.bind('dragend', function(evt) {
        dragEnd(evt, element, scope.dragStyle);
      });
    }
  };


}]);

draganddropUI.directive('drop', function() {

  function dragEnter(evt, element, dropStyle) {
    evt.preventDefault();
    element.addClass(dropStyle);
  };
  function dragLeave(evt, element, dropStyle) {
    element.removeClass(dropStyle);
  };
  function dragOver(evt) {
    evt.preventDefault();
  };
  function drop(evt, element, dropStyle) {
    // evt.preventDefault();

    // evt.target.innerHTML += '<p>' + evt.originalEvent.dataTransfer.getData('data-id') + '</p>';
    evt.target.innerHTML += '<p><span class="label label-category-'
    + evt.originalEvent.dataTransfer.getData('data-category-id')
    +'">' + evt.originalEvent.dataTransfer.getData('data-category-title') + '</p>';
    evt.target.innerHTML += '<p>' + evt.originalEvent.dataTransfer.getData('data-title') + '</p>';

    element.removeClass(dropStyle);
  };
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs)  {
      scope.dropData = scope[attrs["drop"]];
      scope.dropStyle = attrs["dropstyle"];
      element.bind('dragenter', function(evt) {
        dragEnter(evt, element, scope.dropStyle);
      });
      element.bind('dragleave', function(evt) {
        dragLeave(evt, element, scope.dropStyle);
      });
      element.bind('dragover', dragOver);
      element.bind('drop', function(evt) {
        drop(evt, element, scope.dropStyle);
        // $rootScope.$broadcast('dropEvent', $rootScope.draggedElement, scope.dropData);
      });
    }
  }


});
