function VenueConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('app.venue', {
            url: '/venue',
            controller: 'VenueCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'venue/venue.html',
            title: 'Venue Details'
        });

};

export default VenueConfig;