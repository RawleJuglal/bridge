import angular from 'angular';

let dashboardModule = angular.module('app.dashboard', []);

import DashboardConfig from './dashboard.config';
dashboardModule.config(DashboardConfig);

import DashboardCtrl from './dashboard.controller';
dashboardModule.controller('DashboardCtrl', DashboardCtrl);

export default dashboardModule;