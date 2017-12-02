export default class User {
  //On creation you will need JWT, AppConstants, $http, $q
  constructor(JWT, AppConstants, $http, $state, $q) {
    'ngInject';
    
    //NOTE
    //we can't access JWT, $AppConstants, $http, and $state outside of the constructor function, as they are provided as arguments 
    //to the constructor function and are not saved anywhere for later use (which is what we need them for).
    //The answer is very straightforward - simply create a reference to the service object on this inside the
    //constructor function.
    
    //User creates var _JWT and assigns ./jwt.service.js module
    this._JWT = JWT;
    //User creates var _AppConstants and assigns config/app.constants.js to it
    this._AppConstants = AppConstants;
    //User creates var _$http and assigns angular provided $http module
    this._$http = $http;
    //User creates var _$state and assigns angular provided $state module
    this._$state = $state;
    //User creates var _$q and assigns angular provided $q module
    this._$q = $q;

  }
  
  //Methods of User Class
  // Try to authenticate by registering or logging in
  //method will need type('login' || 'register') and credentials (object with user information)
  attemptAuth(credentials) {
     //var route is '/login' if type is 'login' or empty if not
     let route = '/login';
     //make $http request and return
     return this._$http({
       //use url https://conduit.productionready.io/api/login or https://conduit.productionready.io/api 
       url: this._AppConstants.api + route,
       //find the POST method of this url
       method: 'POST',
       //send data object with key user and field credentials
       data: credentials
     }).then(
       // On success...
       (res) => {
         // Set the JWT token
         this._JWT.save(res.data.token);
 
         return res;
       }
     );
  }
  
  //Log the user out of app
  logout() {
     //invoke JWT.destroy method in ./jwt.service.js
     this._JWT.destroy();
     // Do a hard reload of current state to ensure all data is flushed
     this._$state.go('app.home');
  }

}