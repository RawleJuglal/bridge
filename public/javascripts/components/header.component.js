class AppHeaderCtrl {
  constructor(AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    //var currentUser assigns User.current
   
  }
}

let AppHeader = {
  controller: AppHeaderCtrl,
  templateUrl: 'components/header.html'
};

export default AppHeader;