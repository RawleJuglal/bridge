class HomeCtrl {
    constructor(AppConstants, User, Post, $state) {
        'ngInject';
        
        this.appName = AppConstants.appName;
        this._User = User;
        this._Post = Post;
        this._$state = $state;
        
        this.posts = [];
    }
    
    $onInit() {    
         this._Post.get().then(
             (result) => {
                     this.posts = result;
                 }
             )
     }
}

export default HomeCtrl;