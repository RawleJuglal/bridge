import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import AppHeader from './header.component';
componentsModule.component('appHeader', AppHeader);

import Navigation from './navigation.component';
componentsModule.component('navigation', Navigation);

export default componentsModule;