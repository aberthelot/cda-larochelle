'use strict';

angular.module('cdaLarochelleApp')
  .filter('groupFilter', function () {
    return function (items, source) {

      var arrayToReturn = [];
      for (var i=0; i<items.length; i++) {
        if (source.name == items[i].source.type) {

            var item = items[i];
            var parametersSource = source.parameters;

            var dismatch = false;

            for (var k = 0; k < parametersSource.length; k++) {
              //
              var parameter = parametersSource[k];
              // parametersSource[k]
              // console.log(parameter.label);

              // console.log('Model : ' + parameter.model);
              // console.log('ID : ' + item.id);
              // console.log('parameter.value : ' + parameter.value + ' =?= item.source[parameter.model] ' + item.source[parameter.model]);
              dismatch = dismatch || checkMulti(parameter.model, parameter.value, item.source);
              // console.log('dismatch : ' + dismatch);

            };

            if (!dismatch) {
              arrayToReturn.push(item);
            }



          // arrayToReturn.push(items[i]);
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
        var item = items[i];
        // console.log('ID item : ' + item.id);
        // console.log('Nb sources : ' + selectedSources.length);
        for (var j = 0; j < selectedSources.length; j++) {
          var selectedSource = selectedSources[j];
          // console.log('Test source : ' + selectedSources[j].name +
          //   ' =?= ' + item.source.type);
          // filtre par type de source
          if (selectedSource.name == item.source.type) {
            var parametersSource = selectedSource.parameters;

            var dismatch = false;

            for (var k = 0; k < parametersSource.length; k++) {
              //
              var parameter = parametersSource[k];
              // parametersSource[k]
              // console.log(parameter.label);

              // console.log('Model : ' + parameter.model);
              // console.log('ID : ' + item.id);
              // console.log('parameter.value : ' + parameter.value + ' =?= item.source[parameter.model] ' + item.source[parameter.model]);
              dismatch = dismatch || checkMulti(parameter.model, parameter.value, item.source);
              // console.log('dismatch : ' + dismatch);

            };

            if (!dismatch) {
              arrayToReturn.push(item);
            }


            // console.log('Push item : ' + item.id);
            
          }
        }
      }
      // console.log(arrayToReturn.length + ' result(s) found');

      return arrayToReturn;
    };
  });

function checkMulti(parameterModel, parameterValue, itemSource) {

  var dismatch = false;

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
      var justOneMatch = false;
      for (var i = 0; i < itemSource[split[0]].length; i++) {

        // console.log('TEST : ' + itemSource[split[0]][i][split[1]]);
        if (!checkMatchingText(parameterValue, itemSource[split[0]][i][split[1]])) {
          justOneMatch = true;
        }

      };

      if (!justOneMatch) {
        dismatch = true;
      } 


    } else {
      if (checkMatchingText(parameterValue, itemSource[split[0]][split[1]])) {
        dismatch = true;
      }
    }



    // itemValue = itemSource[split[0]][split[1]];
  } else {
    itemValue = itemSource[parameterModel];
    if (checkMatchingText(parameterValue, itemValue)) {
      dismatch = true;
    }
  }

  return dismatch;
}

function checkMatchingText(parameterValue, itemValue) {

  var dismatch = false;

  if (parameterValue !== '' && itemValue.indexOf(parameterValue) == -1) {
    dismatch = true;
  }
  // console.log('checkMatchingText(' + parameterValue + ', ' + itemValue + ') : ' + dismatch)
  return dismatch;
}