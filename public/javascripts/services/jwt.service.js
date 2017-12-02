export default class JWT {
    //On creation you will need AppConstants and $window
  constructor(AppConstants, $window) {
    'ngInject';
    
    //NOTE
    //we can't access $AppConstants and $window outside of the constructor function, as they are provided as arguments 
    //to the constructor function and are not saved anywhere for later use (which is what we need them for).
    //The answer is very straightforward - simply create a reference to the service object on this inside the
    //constructor function.
    
    //JWT creates var _AppConstants and assigns config/app.constants.js to it
    this._AppConstants = AppConstants;
    //JWT creates var _$window and assigns angular $window module
    this._$window = $window;
  }
  
  //METHODS of JWT class
  //save token in $window.localStorage needs token param
  save(token) {
    //token is assigned to _AppConstants.jwtkey and is saved in $window.localStorage
    this._$window.localStorage[this._AppConstants.jwtKey] = token;
  }

  //retrieve token from $window.localStorage
  get() {
    return this._$window.localStorage[this._AppConstants.jwtKey];
  }
  
  //remove token from $window.localStorage
  destroy() {
    this._$window.localStorage.removeItem(this._AppConstants.jwtKey);
  }

}