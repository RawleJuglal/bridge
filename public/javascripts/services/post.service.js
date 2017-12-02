export default class Post{
    constructor(AppConstants, $http, $state, $q){
        'ngInject';
        
        this._AppConstants = AppConstants;
        //User creates var _$http and assigns angular provided $http module
        this._$http = $http;
        //User creates var _$state and assigns angular provided $state module
        this._$state = $state;
        
        this._$q = $q;
    }
    
    addPost(formData){
        let route = '/posts/entry';
        
        return this._$http({
       //use url https://conduit.productionready.io/api/login or https://conduit.productionready.io/api 
       url:route,
       //find the POST method of this url
       method: 'POST',
       //send data object with key user and field credentials
       data: formData
     }).then(
       // On success...
       (res) => {
         return res;
       }
     );
    }
    
    get() {
        let deferred = this._$q.defer();
      
        this._$http({ 
          url:'/posts/all',
          method: 'GET'
        }).then(
           (res) => 
           {
            console.log(res)
            deferred.resolve(res.data)
           },
           (err) => deferred.reject(err)
         );
     
         return deferred.promise;
      }
      
    // Delete an article
    destroy(slug) {
        return this._$http({
           url:'/posts/' + slug,
           method: 'DELETE'
        });
    }
}