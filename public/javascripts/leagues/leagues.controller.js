class LeaguesCtrl {
  constructor(AppConstants, $location, $window) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$location = $location;
    this._$window = $window;

    if(this._$window.localStorage){
        if(!this._$window.localStorage.getItem('firstLoad')){
            console.log('made second statement');
            this._$window.localStorage['firstLoad'] = true;
            this._$window.location.reload(true);
        } else {
            this._$window.localStorage.removeItem('firstLoad');
        }

    }
  }

}

export default LeaguesCtrl;
