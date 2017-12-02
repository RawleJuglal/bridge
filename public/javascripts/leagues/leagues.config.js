function LeaguesConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('app.leagues', {
            url: '/leagues',
            controller: 'LeaguesCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'leagues/leagues.html',
            title: 'Leagues'
        });

};

export default LeaguesConfig;