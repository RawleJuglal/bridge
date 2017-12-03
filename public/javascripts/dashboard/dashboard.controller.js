class DashboardCtrl {
  constructor(AppConstants, User, Post, Resume, $state, posts, resumes) {
    'ngInject';

    this._AppConstants = AppConstants;
    this._User = User;
    this._Post = Post;
    this._Resume = Resume;
    this._$state = $state;
    this.posts = posts;
    this.resumes = resumes;

    this.logout = User.logout.bind(User);
    console.log(this.resumes);
  }

  submitForm() {
    this.isSubmitting = true;
    this._Post.addPost(this.formData).then(
      () => {
        this.formData = {};
        this.isSubmitting = false;
        this._$state.go(this._$state.$current, null, { reload: true });
      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
  
  deletePost(slug){
    this._Post.destroy(slug).then(
      () => {
        this._$state.go(this._$state.$current, null, { reload: true });
      },
      (err) => {
        this.errors = err.data.errors;
      }
    )
  }
  
  deleteResume(slug){
    this._Resume.destroy(slug).then(
      () => {
        this._$state.go(this._$state.$current, null, { reload: true });
      },
      (err) => {
        this.errors = err.data.errors;
      }
    )
  }

}

export default DashboardCtrl;