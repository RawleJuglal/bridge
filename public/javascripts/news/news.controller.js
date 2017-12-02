class NewsCtrl {
    constructor(AppConstants, User, Post, $state, posts) {
        'ngInject';
        
        this.appName = AppConstants.appName;
        this._User = User;
        this._Post = Post;
        this._$state = $state;
        this.posts = posts;
    }
}

export default NewsCtrl;