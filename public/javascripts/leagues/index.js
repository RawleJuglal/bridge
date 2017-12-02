import angular from 'angular';

let leaguesModule = angular.module('app.leagues', []);

import LeaguesConfig from './leagues.config';
leaguesModule.config(LeaguesConfig);

import LeaguesCtrl from './leagues.controller';
leaguesModule.controller('LeaguesCtrl', LeaguesCtrl);

export default leaguesModule;