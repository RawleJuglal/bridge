function LoginConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('app.login', {
            url: '/login',
            controller: 'LoginCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'login/login.html',
            title: 'Sign in',
        });

};

export default LoginConfig;