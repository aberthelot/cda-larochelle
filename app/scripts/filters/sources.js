'use strict';

angular.module('cdaLarochelleApp')
  .filter('sourcefilter', function () {
    return function (items, sources) {

      var arrayToReturn = [];

      // console.log('Emails : ' + sources.email);
      // console.log('Contacts : ' + sources.contact);
      // console.log('Rendez-vous : ' + sources.meet);
      // console.log('Tâches : ' + sources.todo);
      // console.log('Pages : ' + sources.layout);
      // console.log('Articles : ' + sources.article);
      // console.log('Actualités : ' + sources.topic);
      // console.log('Applications : ' + sources.application);
      // console.log('RSS : ' + sources.rss);
      // console.log('GED : ' + sources.library);
      // console.log('Annuaire : ' + sources.directory);

      for (var i=0; i<items.length; i++) {
        if (items[i].source == 'Email' && sources.email) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Contact' && sources.contact) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Meet' && sources.meet) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Todo' && sources.todo) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Layout' && sources.layout) {
          arrayToReturn.push(items[i]);M
        } else if (items[i].source == 'Article' && sources.article) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Topic' && sources.topic) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Application' && sources.application) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Rss' && sources.rss) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Library' && sources.library) {
          arrayToReturn.push(items[i]);
        } else if (items[i].source == 'Directory' && sources.directory) {
          arrayToReturn.push(items[i]);
        }
      }

      return arrayToReturn;
    };
  });
