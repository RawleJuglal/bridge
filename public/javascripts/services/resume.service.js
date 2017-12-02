export default class Resume{
    constructor(AppConstants, $http, $state, $q){
        'ngInject';
        
        this._AppConstants = AppConstants;
        //User creates var _$http and assigns angular provided $http module
        this._$http = $http;
        //User creates var _$state and assigns angular provided $state module
        this._$state = $state;
        
        this._$q = $q;
    }
    
    get() {
        let deferred = this._$q.defer();
     
         
        this._$http({
          url: this._AppConstants.api + '/resumes',
          method: 'GET'
        }).then(
           (res) => deferred.resolve(res.data),
           (err) => deferred.reject(err)
         );
     
         return deferred.promise;
      }
      
    // Delete an article
    destroy(slug) {
        return this._$http({
           url: this._AppConstants.api + '/resumes/' + slug,
           method: 'DELETE'
        });
    }
}