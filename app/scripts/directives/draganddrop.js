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












draganddropUI.directive('drag', ["$rootScope", function($rootScope) {

  function dragStart(evt, element, dragStyle) {
    element.addClass(dragStyle);

    var id = evt.target.parentNode.getAttribute('data-id');
    var title = evt.target.parentNode.getAttribute('data-title');
    var category_id = evt.target.parentNode.getAttribute('data-category-id');
    var category_title = evt.target.parentNode.getAttribute('data-category-title');
    var scheduled = evt.target.getAttribute('data-scheduled');


    /**
    on ne peut pas utiliser directement evt.dataTransfer à cause jQuery ...
    **/
    // informations propres à l'actualité
    evt.originalEvent.dataTransfer.setData('data-id', id);
    evt.originalEvent.dataTransfer.setData('data-title', title);
    evt.originalEvent.dataTransfer.setData('data-category-id', category_id);
    evt.originalEvent.dataTransfer.setData('data-category-title', category_title);
    // informations propres à la date
    evt.originalEvent.dataTransfer.setData('data-scheduled', scheduled);    


    // evt.originalEvent.dataTransfer.setData('data-dateFirst', evt.target.getAttribute('data-dateFirst'));
    // evt.dataTransfer.effectAllowed = 'move';

    // on mémorise l'identifiant de la catégorie pour les actions autres que drop
    // car il n'est pas possible d'utiliser dataTransfer hormis dans drop
    localStorage.setItem('id_dragged', id);
    localStorage.setItem('category_id_dragged', category_id);
  };
  function dragEnd(evt, element, dragStyle) {
    element.removeClass(dragStyle);
    localStorage.removeItem('id_dragged');
    localStorage.removeItem('category_id_dragged');
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

draganddropUI.directive('drop', function($rootScope) {

  function dragEnter(evt, element, dropStyle) {
    // evt.preventDefault();

    var id = localStorage.getItem('id_dragged');
    // console.log('ID : ' + id);
    var category_id = localStorage.getItem('category_id_dragged');
    // console.log('CATEGORY_ID : ' + category_id);
    var droppableElement = getDroppableElement(evt);

    // console.log('Vérification du drop : ' + checkAvailableCategory(droppableElement, id, category_id));

    if (checkAvailableCategory(droppableElement, id, category_id)) {
      element.addClass(dropStyle + '-success');
    } else {
      element.addClass(dropStyle + '-failure');
    }
    
  };
  function dragLeave(evt, element, dropStyle) {
    element.removeClass(dropStyle + '-success');
    element.removeClass(dropStyle + '-failure');
  };
  function dragOver(evt) {
    evt.preventDefault();
  };
  function drop(evt, element, dropStyle) {

    // evt.preventDefault();

    //
    var id = evt.originalEvent.dataTransfer.getData('data-id');
    var title = evt.originalEvent.dataTransfer.getData('data-title');
    var category_id = evt.originalEvent.dataTransfer.getData('data-category-id');
    var category_title = evt.originalEvent.dataTransfer.getData('data-category-title');
    //
    var scheduled = evt.originalEvent.dataTransfer.getData('data-scheduled');

    var droppableElement = getDroppableElement(evt);



    // element.removeClass(dropStyle);
    element.removeClass(dropStyle + '-success');
    element.removeClass(dropStyle + '-failure');

    localStorage.removeItem('category_id_dragged');



    if (checkAvailableCategory(droppableElement, id, category_id)) {
      // on récupère la date
      var dropDay = droppableElement.querySelectorAll('time')[0].getAttribute('datetime');
      // 
      $rootScope.$broadcast('dropEvent', id, dropDay, scheduled);
    }

  };
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs)  {
      scope.dropData = scope[attrs["drop"]];
      scope.dropStyle = attrs["dropstyle"];



//       scope.dropDay = attrs["dropday"];
// console.log('uyuy 2 :: ' + scope.dropDay);


      element.bind('dragenter', function(evt) {
        dragEnter(evt, element, scope.dropStyle);
      });
      element.bind('dragleave', function(evt) {
        dragLeave(evt, element, scope.dropStyle);
      });
      element.bind('dragover', dragOver);
      element.bind('drop', function(evt) {
        //
        drop(evt, element, scope.dropStyle);
        //
        // broadcastData(evt);
      });
    }
  }
});

function getDroppableElement(evt) {

  // on initialise l'élément où doit s'effectuer le drop par défaut
  var droppableElement = evt.target;
  // on s'assure d'être dans le bon élément, sinon on parcourt les ancêtres
  while (!droppableElement.hasAttribute('drop')) {
    droppableElement = droppableElement.parentNode;
  }

  return droppableElement;
}

function checkAvailableCategory(droppableElement, id, category_id) {

    var check = true;

    // sélection des éléments déjà présents
    var droppedArticles = droppableElement.querySelectorAll('article');

    // console.log('NB ARTICLES :: ' + droppedArticles.length);

    for (var i = 0; i < droppedArticles.length; i++) {
      // console.log(droppedArticles[i].getAttribute('data-category-id') + ' =?= ' + category_id);
      // console.log(droppedArticles[i].getAttribute('data-id') + ' =?= ' + id);

      if (droppedArticles[i].getAttribute('data-category-id') == category_id
        && droppedArticles[i].getAttribute('data-id') !== id) {
        check = false;
        // console.log('SOUCI');
      }
    };

    return check;
}
