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
  
  upload(uploadUrl, data){
    console.log('called upload');
      var fd = new FormData();
      for(var key in data){
          fd.append(key, data[key]);
      }
      return this._$http.post(uploadUrl, fd).then(
             (res) => {
               return res;
             } 
          )
  }




}