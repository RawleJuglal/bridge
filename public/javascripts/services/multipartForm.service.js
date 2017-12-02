export default class multipartForm {
  //On creation you will need AppConstants and $window
  constructor(AppConstants, $http) {
    'ngInject';

    this._$http = $http;
  }

  // upload(uploadUrl, data){
  //   console.log('called upload');
  //     var fd = new FormData();
  //     for(var key in data){
  //         fd.append(key, data[key]);
  //     }
  //     return this._$http.post(uploadUrl, fd, {
  //             transformRequest:angular.identity,
  //             headers: {'Content-Type': undefined}
  //         }).then(
  //           (res) => {
  //             return res;
  //           } 
  //         )
  // }

  upload(uploadUrl, data) {
    console.log('called upload');
    var fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }
    // When you upload a form, you have to change the default content-type to
    // Multipart/form-data, otherwise it will try to send json
    // and when you send a form and expect json, body parser will try to 
    // parse it, which triggers the error before it ever gets to the route itself.


    return this._$http.post(uploadUrl, fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(
      (res) => {
        return res;
      }
    )
  }




}
