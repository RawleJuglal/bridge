class LoginCtrl {
    constructor(AppConstants, User,  $state) {
        'ngInject';
        
        this.appName = AppConstants.appName;
        
        //var _User assigns User module
        this._User = User;
        
        this._$state = $state;
        
        this.title = $state.current.title;
    }
    
    //when html form clicks submit
  submitForm () {
     //change isSubmitting to true
     this.isSubmitting = true;
     
      //invoke _User.attemptAuth found in services/user.service.js
      //params of this.authType and formData entered in form inputs
      this._User.attemptAuth(this.formData).then(
        // Callback for success
        (res) => {
          //change var isSubmitting back to false
          this._$state.go('app.dashboard');
        },
        // Callback for failure
        (err) => {
          //change var isSubmitting back to false
          this.isSubmitting = false;
          //show the errors
          console.log(err.data.errors);
        //   this.errors = err.data.errors;
        }
      );
  }
  
}

export default LoginCtrl;