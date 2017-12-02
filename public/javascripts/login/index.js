import angular from 'angular';

let loginModule = angular.module('app.login', []);

import LoginConfig from './login.config';
loginModule.config(LoginConfig);

import LoginCtrl from './login.controller';
loginModule.controller('LoginCtrl', LoginCtrl);

export default loginModule;