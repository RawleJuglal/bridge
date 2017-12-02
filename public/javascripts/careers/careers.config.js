function CareersConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('app.careers', {
            url: '/careers',
            controller: 'CareersCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'careers/careers.html',
            title: 'Careers'
        });

};

export default CareersConfig;