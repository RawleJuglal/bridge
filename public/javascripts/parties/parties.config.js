function PartiesConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('app.parties', {
            url: '/parties',
            controller: 'PartiesCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'parties/parties.html',
            title: 'Private Parties'
        });

};

export default PartiesConfig;