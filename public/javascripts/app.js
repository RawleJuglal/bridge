import angular from 'angular';

import constants from './config/app.constants';
import appConfig from './config/app.config';
import appRun from './config/app.run';
import 'angular-ui-router';

import './config/app.templates';

import './layout';
import './home';
import './components';
import './news';
import './careers';
import './venue';
import './parties';
import './leagues';
import './tournaments';
import './services';
import './login';
import './dashboard';

const requires = [
	'ui.router', 
	'templates',
	'app.layout',
	'app.home',
	'app.components',
	'app.news',
	'app.careers',
	'app.venue',
	'app.parties',
	'app.leagues',
	'app.tournaments',
	'app.services',
	'app.login',
	'app.dashboard'
];

window.app = angular.module('app', requires);

angular.module('app').constant('AppConstants', constants);
angular.module('app').config(appConfig);
angular.module('app').run(appRun);

angular.bootstrap(document, ['app'], {
	strictDi:false
});