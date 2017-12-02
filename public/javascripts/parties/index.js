import angular from 'angular';

let partiesModule = angular.module('app.parties', []);

import PartiesConfig from './parties.config';
partiesModule.config(PartiesConfig);

import PartiesCtrl from './parties.controller';
partiesModule.controller('PartiesCtrl', PartiesCtrl);

export default partiesModule;