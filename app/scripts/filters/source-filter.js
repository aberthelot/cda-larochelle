'use strict';

angular.module('cdaLarochelleApp')
  .filter('groupFilter', function () {
    return function (items, source) {

      var arrayToReturn = [];
      // on parcourt les items à filtrer
      for (var i=0; i<items.length; i++) {
        // on vérifie qu'il s'agit bien du bon type de source
        if (source.name == items[i].source.type) {
          // on vérifie que les conditions des paramètres sont bien respectées
          if (checkItemWithParameters(items[i], source.parameters)) {
            arrayToReturn.push(items[i]);
          }
        }
      }
      // console.log(arrayToReturn.length + ' result(s) found');

      return arrayToReturn;
    };
  });

angular.module('cdaLarochelleApp')
  .filter('sourceFilter', function () {
    return function (items, sources) {

      // on récupère les sources sur lesquelles on veut filtrer
      var selectedSources = [];
      for (var i = 0; i < sources.length; i++) {
        if (sources[i].selected) {
          selectedSources.push(sources[i]);
        }
      }

      var arrayToReturn = [];
      // on parcourt les items à filtrer
      for (var i = 0; i < items.length; i++) {
        // on parcourt les sources qui ont été sélectionnées
        for (var j = 0; j < selectedSources.length; j++) {
          // on vérifie qu'il s'agit bien du bon type de source
          if (selectedSources[j].name == items[i].source.type) {
            // on vérifie que les conditions des paramètres sont bien respectées
            if (checkItemWithParameters(items[i], selectedSources[j].parameters)) {
              arrayToReturn.push(items[i]);
            }
          }
        }
      }
      // console.log(arrayToReturn.length + ' result(s) found');

      return arrayToReturn;
    };
  });

function checkItemWithParameters(item, parametersSource) {
  var check = true;
  // on parcourt sur les paramètres de la source
  for (var k = 0; k < parametersSource.length; k++) {
    // on récupère le paramètre que l'on souhaite tester
    var parameter = parametersSource[k];
    if ('text' == parameter.type) {
      check = check && checkMultiMatchingText(parameter.model, parameter.value, item.source);
    } else if ('selectdate' == parameter.type) {
      // console.log('cou');
      check = check && checkMatchingDate(parameter.model, parameter.value, item.source);
    }
  };
  // console.log('checkItemWithParameters(' + item + ', ' + parametersSource + ') : ' + check);
  return check
}

function checkMatchingDate(dateChoosen, period, itemSource) {

  var checkBegin = true;
  var checkEnd = true;

  // on vérifie que la date souhaitée de l'item n'est pas avant le début de la période de recherche
  if ('' != period.dateSearchBegin
    && moment(itemSource[dateChoosen]).startOf('day')
    .isBefore(moment(period.dateSearchBegin).startOf('day'))) {
    checkBegin = false;
  }
  // on vérifie que la date souhaitée de l'item n'est pas après la fin de la période de recherche
  if ('' != period.dateSearchEnd
    && moment(itemSource[dateChoosen]).startOf('day')
    .isAfter(moment(period.dateSearchEnd).startOf('day'))) {
    checkEnd = false;
  }

  // console.log('checkMatchingDate('
  //  + 'dateChoosen : ' + dateChoosen
  //  + ', period : ' + period
  //  + ', itemSource : ' + itemSource
  //  + ') : ' + checkBegin + '&&' + checkEnd);

  return checkBegin && checkEnd;
}

function checkMultiMatchingText(parameterModel, parameterValue, itemSource) {

  var check = true;

  // console.log('Parameter model : ' + parameterModel);

  var itemValue = '';
  if (parameterModel.indexOf('.') != -1) {
    var split = parameterModel.split('.');

    if (itemSource[split[0]]
      && typeof itemSource[split[0]] === 'object'
      && itemSource[split[0]].constructor === Array) {
      //
      // console.log('On est tombé sur un tableau !');
      //
      var oneMatch = false;
      for (var i = 0; i < itemSource[split[0]].length; i++) {

        // console.log('TEST : ' + itemSource[split[0]][i][split[1]]);
        if (checkMatchingText(parameterValue, itemSource[split[0]][i][split[1]])) {
          oneMatch = true;
        }

      };

      if (!oneMatch) {
        check = false;
      } 


    } else {
      if (!checkMatchingText(parameterValue, itemSource[split[0]][split[1]])) {
        check = false;
      }
    }
  } else {
    itemValue = itemSource[parameterModel];
    if (!checkMatchingText(parameterValue, itemValue)) {
      check = false;
    }
  }

  return check;
}

function checkMatchingText(parameterValue, itemValue) {

  var check = true;

  if (parameterValue !== '' && itemValue.indexOf(parameterValue) == -1) {
    check = false;
  }
  // console.log('checkMatchingText(' + parameterValue + ', ' + itemValue + ') : ' + check);
  return check;
}