import angular from 'angular';

let careersModule = angular.module('app.careers', []);

import CareersConfig from './careers.config';
careersModule.config(CareersConfig);

import CareersCtrl from './careers.controller';
careersModule.controller('CareersCtrl', CareersCtrl);

export default careersModule;