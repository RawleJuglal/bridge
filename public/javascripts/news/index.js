import angular from 'angular';

let newsModule = angular.module('app.news', []);

import NewsConfig from './news.config';
newsModule.config(NewsConfig);

import NewsCtrl from './news.controller';
newsModule.controller('NewsCtrl', NewsCtrl);

export default newsModule;