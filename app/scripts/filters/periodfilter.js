'use strict';

angular.module('cdaLarochelleApp')
  .filter('periodFilter', function () {
    return function (items, period) {
      var arrayToReturn = [];

      // console.log('periodFilter'
      // 	+ ', period : ' + period.label
      // 	+ ', dateSearchBegin : ' + period.dateSearchBegin
      // 	+ ', dateSearchEnd : ' + period.dateSearchEnd
      // 	);

      for (var i = 0; i < items.length; i++) {
      	var checkBegin = true;
      	var checkEnd = true;

      	// console.log('');


      	if ('' != period.dateSearchBegin
      		&& moment(items[i].created).startOf('day')
      		.isBefore(moment(period.dateSearchBegin).startOf('day'))) {
      		checkBegin = false;
      	}
      	if ('' != period.dateSearchEnd
      		&& moment(items[i].created).startOf('day')
      		.isAfter(moment(period.dateSearchEnd).startOf('day'))) {
      		checkEnd = false;
      	}

      	if (checkBegin && checkEnd) {
      		arrayToReturn.push(items[i]);
      	}
      };


      return arrayToReturn;
    };
  });
