class NavigationCtrl {
  constructor(AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    //var currentUser assigns User.current
   
  }
}

let Navigation = {
  controller: NavigationCtrl,
  templateUrl: 'components/navigation.html'
};

export default Navigation;