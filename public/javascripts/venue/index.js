import angular from 'angular';

let venueModule = angular.module('app.venue', []);

import VenueConfig from './venue.config';
venueModule.config(VenueConfig);

import VenueCtrl from './venue.controller';
venueModule.controller('VenueCtrl', VenueCtrl);

export default venueModule;