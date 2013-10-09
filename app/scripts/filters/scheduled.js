'use strict';

angular.module('cdaLarochelleApp')
  .filter('scheduled', function () {
    return function (items) {

    	var arrayToReturn = [];

        for (var i=0; i<items.length; i++){
            // if (items[i].title == 'Test B') {
            // console.log('TEST :: ' + items[i].scheduledBegin.);
            if (moment(items[i].scheduledBegin).isAfter('2013-10-08')
            	&& moment(items[i].scheduledEnd).isBefore('2013-10-20')) {
                arrayToReturn.push(items[i]);
            }
        }

      return arrayToReturn;
    };
  });
