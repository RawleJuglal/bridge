import angular from 'angular';

let tournamentsModule = angular.module('app.tournaments', []);

import TournamentsConfig from './tournaments.config';
tournamentsModule.config(TournamentsConfig);

import TournamentsCtrl from './tournaments.controller';
tournamentsModule.controller('TournamentsCtrl', TournamentsCtrl);

export default tournamentsModule;