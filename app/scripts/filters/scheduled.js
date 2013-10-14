'use strict';

angular.module('cdaLarochelleApp')
  .filter('scheduled', function () {
    return function (items, day) {

      // console.log('TEST DAY :: ' + moment(day).format('L'));
      



      var arrayToReturn = [];

        for (var i=0; i<items.length; i++){

          var scheduledBegin = moment(items[i].scheduledBegin);
          var scheduledEnd = moment(items[i].scheduledEnd);

// console.log('TEST ITEM :: ' + scheduledBegin.format('L'));

            // console.log(moment(day).format('L')
            //   + ' AFTER ' + scheduledBegin.format('L')
            //   + ' :: ' + moment(day).isAfter(scheduledBegin.startOf('day')));

            // console.log(moment(day).format('L')
            //   + ' SAME ' + scheduledBegin.format('L')
            //   + ' :: ' + moment(day).isSame(scheduledBegin.startOf('day'), 'day'));

            // console.log(moment(day).format('L')
            //   + ' BEFORE ' + scheduledBegin.format('L')
            //   + ' :: ' + moment(day).isBefore(scheduledEnd.startOf('day')));

            // console.log('-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_');

            // if () {

            // } else if () {

            // } else if () {

            // }


            if ((moment(day).isAfter(items[i].scheduledBegin) || moment(day).isSame(scheduledBegin.startOf('day'), 'day'))
              && (moment(day).isBefore(items[i].scheduledEnd)) || moment(day).isSame(scheduledEnd.startOf('day'), 'day')) {
                arrayToReturn.push(items[i]);
            }
        }

      return arrayToReturn;
    };
  });
