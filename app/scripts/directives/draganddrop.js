'use strict';

var draganddropUI = angular.module('draganddropUI', []);

draganddropUI.directive('dragsource', ["$rootScope", function($rootScope) {

  function dragStart(evt, element, dragStyle) {
    // console.log('dragsource.dragStart()');
    var index = evt.target.getAttribute('data-index');
    /**
    on ne peut pas utiliser directement evt.dataTransfer à cause jQuery ...
    **/
    // informations propres à l'actualité
    evt.originalEvent.dataTransfer.setData('data-index', index);

    // $("[dropsource]").removeClass('hidden');




    // // sélection des éléments "draggable"
    // var dropItems = document.querySelectorAll('[dropsource]');
    // // ajout de la méthode handleDragStart pour tous les éléments trouvés
    // [].forEach.call(dropItems, function(item) {
    //   item.innerHTML.removeClass('hidden');
    //   // item.addEventListener('dragstart', handleDragStart, false);
    //   // item.addEventListener('dragend', handleDragEnd, false);
    // });

    // on émet un événement
    // $rootScope.$broadcast('dropon');
  };
  function dragEnd(evt, element, dragStyle) {
    // console.log('dragsource.dragEnd()');
    // on émet un événement
    $rootScope.$broadcast('dropoff');
  };

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      attrs.$set('draggable', 'true');
      // scope.dragStyle = attrs["dragstyle"];
      element.bind('dragstart', function(evt) {
        // $rootScope.draggedElement = scope[attrs["drag"]];
        dragStart(evt, element, scope.dragStyle);
      });
      element.bind('dragend', function(evt) {
        dragEnd(evt, element, scope.dragStyle);
      });
    }
  };

}]);

draganddropUI.directive('dropsource', function($rootScope) {

  function dragEnter(evt, element, dropStyle) {
    // console.log('dropsource.dragEnter()');
  };
  function dragLeave(evt, element, dropStyle) {
    // console.log('dropsource.dragLeave()');
  };
  function dragOver(evt) {
    evt.preventDefault();
    // console.log('dropsource.dragDefault()');
  };
  function drop(evt, element, dropStyle) {
    // console.log('dropsource.drop()');

    // on récupère l'index de la source de départ
    var indexBegin = evt.originalEvent.dataTransfer.getData('data-index');

    // on récupère l'index de la source de fin
    var indexEnd = evt.target.getAttribute('data-index');

    // on émet un événement
    // console.log('Directive dropsource brodcast \'moveSource\' with parameters : indexBegin : '
    //   + indexBegin + ' indexEnd : ' + indexEnd);
    $rootScope.$broadcast('moveSource', indexBegin, indexEnd);
    // $rootScope.$broadcast('dropoff');
  };
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs)  {
      attrs.$set('dropzone', '');
      // scope.dropData = scope[attrs["drop"]];
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
      });
    }
  }
});