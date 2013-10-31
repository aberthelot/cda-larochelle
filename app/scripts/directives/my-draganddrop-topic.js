'use strict';

var draganddroptopic = angular.module('draganddroptopicDirectives', []);

//
draganddroptopic.directive('drag', ["$rootScope", function($rootScope) {

  function dragStart(evt, element, dragStyle) {
    element.addClass(dragStyle);

    var target = evt.target.parentNode.parentNode.parentNode;

    var id = target.getAttribute('data-id');
    var title = target.getAttribute('data-title');
    var category_id = target.getAttribute('data-category-id');
    var category_title = target.getAttribute('data-category-title');
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
    localStorage.setItem('scheduled_dragged', scheduled);
  };
  function dragEnd(evt, element, dragStyle) {
    element.removeClass(dragStyle);
    localStorage.removeItem('id_dragged');
    localStorage.removeItem('scheduled_dragged');
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
 
}])
//
draganddroptopic.directive('drop', function($rootScope) {

  function dragEnter(evt, element, dropStyle, topics) {
    // evt.preventDefault();

    var id = localStorage.getItem('id_dragged');
    var scheduled = localStorage.getItem('scheduled_dragged');
    // console.log('ID : ' + id);
    var droppableElement = getDroppableElement(evt);
    // on récupère le jour qui est train d'être survolé
    var day = droppableElement.querySelectorAll('time')[0].getAttribute('datetime');

    // on ajoute des styles en fonction de la possibilité de droper ou pas
    if (checkDroppingTopic(id, day, scheduled, topics)) {
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
  function drop(evt, element, dropStyle, topics) {

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


    // on récupère le jour qui est train d'être survolé
    var droppableElement = getDroppableElement(evt);
    var day = droppableElement.querySelectorAll('time')[0].getAttribute('datetime');
    //
    if (checkDroppingTopic(id, day, scheduled, topics)) {
      $rootScope.$broadcast('dropEvent', id, day, scheduled);
    }

  };
  
  return {
    restrict: 'A',
    // scope: {
    //   topics: '=topics'
    // },
    link: function(scope, element, attrs)  {
      scope.dropData = scope[attrs["drop"]];
      scope.dropStyle = attrs["dropstyle"];
      element.bind('dragenter', function(evt) {
        dragEnter(evt, element, scope.dropStyle, scope.topics);
      });
      element.bind('dragleave', function(evt) {
        dragLeave(evt, element, scope.dropStyle);
      });
      element.bind('dragover', dragOver);
      element.bind('drop', function(evt) {
        drop(evt, element, scope.dropStyle, scope.topics);
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

function checkAvailableCategory(topic, day, scheduled, topics) {

    var check = true;

    var scheduledBegin;
    var scheduledEnd;

    if ('begin' === scheduled) {
      scheduledBegin = day;
      scheduledEnd = topic.scheduledEnd;      
    } else if ('end' === scheduled) {
      scheduledEnd = day;
      scheduledBegin = topic.scheduledBegin;
    }

    for (var i = 0; i < topics.length; i++) {
      // vérifications avec les autres actualités, de la même catégorie
      if (topics[i].id !== topic.id && topics[i].category.id == topic.category.id) {
        // on vérifie que la date n'appartient pas à la période d'une autre actualité de même catégorie
        if ((moment(day).isAfter(topics[i].scheduledBegin) || moment(day).isSame(topics[i].scheduledBegin))
          && (moment(day).isBefore(topics[i].scheduledEnd) || moment(day).isSame(topics[i].scheduledEnd))) {
          check = false;
        }
        // on vérifie que la date de fin n'appartient pas à la période d'une autre actualité de même catégorie
        if ((moment(scheduledEnd).isAfter(topics[i].scheduledBegin) || moment(scheduledEnd).isSame(topics[i].scheduledBegin))
          && (moment(scheduledEnd).isBefore(topics[i].scheduledEnd) || moment(scheduledEnd).isSame(topics[i].scheduledEnd))) {
          check = false;
        }
        // on vérifie que la période que l'on veut créer n'englobe pas la période d'une autre actualité de même catégorie
        if ((moment(scheduledBegin).isBefore(topics[i].scheduledBegin) || moment(scheduledBegin).isSame(topics[i].scheduledBegin))
          && (moment(scheduledEnd).isAfter(topics[i].scheduledEnd) || moment(scheduledEnd).isSame(topics[i].scheduledEnd))) {
          check = false;
        }
      }
    };

    return check;
}

function checkDroppingTopic(id, day, scheduled, topics) {

    var check = true;

    // console.log('ID topic : ' + id);
    // console.log('Day hover : ' + day);

    //
    var topic = getTopicFromList(id, topics);
    // on vérifie que la date de mise à la une souhaitée est bien compatible avec la date de publication
    if (!checkPublishingPeriod(topic, day)) {
      check = false;
    }
    // on vérifie que la date de mise à la une souhaitée ne va pas créer un chevauchement de période
    // pour des actualités de la même catégorie 
    if (!checkAvailableCategory(topic, day, scheduled, topics)) {
      check = false;
    }

    return check;
}

function checkPublishingPeriod(topic, day) {
  var check = true;

  // on vérifie que la date de mise à la une appartient bien à la période de publication
  if (moment(day).isAfter(moment(topic.publishEnd).startOf('day'))
    || moment(day).isBefore(moment(topic.publishBegin).startOf('day'))) {
    check = false;
  }

  return check;
}

function getTopicFromList(id, topics) {
  var topic;
  // on parcourt toutes les actualités connues pour retrouver l'actualité en question
  for (var i = 0; i < topics.length; i++) {
    // vérification sur l'identifiant
    if (topics[i].id == id) {
      topic = topics[i];
    }
  }
  return topic;
}