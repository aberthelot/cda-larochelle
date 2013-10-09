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
    evt.originalEvent.dataTransfer.setData('data-dateBegin', evt.target.getAttribute('data-dateBegin'));
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

    var check = true;

    //
    var title = evt.originalEvent.dataTransfer.getData('data-title');
    var category_id = evt.originalEvent.dataTransfer.getData('data-category-id');
    var category_title = evt.originalEvent.dataTransfer.getData('data-category-title');


    // on initialise l'élément où doit s'effectuer le drop par défaut
    var droppableElement = evt.target;
    // on s'assure d'être dans le bon élément, sinon on parcourt les ancêtres
    while (!droppableElement.hasAttribute('drop')) {
      droppableElement = droppableElement.parentNode;
    }

    // alert('DIV ::' + droppableElement.innerHTML);


    // sélection des éléments déjà prtésents
    var droppedArticles = droppableElement.querySelectorAll('article');

    for (var i = 0; i < droppedArticles.length; i++) {
      // alert('TEST :: ' + droppedArticles[i].innerHTML);
      if (droppedArticles[i].getAttribute('data-category-id') == category_id) {
        alert('SOUCI');
        check = false;
      }
    };

    if (check) {
      // evt.target.innerHTML += '<p>' + evt.originalEvent.dataTransfer.getData('data-id') + '</p>';
      droppableElement.innerHTML += '<article'
      + ' data-category-id="' + category_id +'">'
        + '<p>'
          + '<span class="label label-category-'
          + category_id +'">'
            + category_title
          + '</span>'
        + '</p>'
        + '<p>' + title + '</p>'
      // evt.target.innerHTML += '<p> <button>test</button>';
        + '</article>';
    }

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
