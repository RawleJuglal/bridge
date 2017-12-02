class CareersCtrl {
    constructor(AppConstants, MultipartForm, $state) {
        'ngInject';
        
        this.appName = AppConstants.appName;
        this._AppConstants = AppConstants;
        this._MultipartForm = MultipartForm;
        this._$state = $state;
        this.formData = {};
    }
    
    onSubmit(){
        this.isSubmitting = true;
        // console.log('called submit');
        var uploadUrl = '/resumes/upload';
        console.log(this.formData);
        this._MultipartForm.upload(uploadUrl, this.formData).then(
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
}

export default CareersCtrl;