function DashboardConfig($stateProvider) {
    'ngInject';
    
    $stateProvider
        .state('app.dashboard', {
            url: '/dashboard',
            controller: 'DashboardCtrl',
            controllerAs: '$ctrl',
            templateUrl: 'dashboard/dashboard.html',
            title: 'Dasboard',
            resolve: {
              //response will be saved in article for ./article.controller.js to use 
              //it is a function using Articles service from ../services/article.service.js,
              //$state and $stateParams from angular modules
              posts: function(Post) {
                 //return res from Article service method get with ($stateParams.slug) on success
                 return Post.get().then(
                  //article will be either article object or null
                  (posts) => posts
                 );
              },
              resumes: function(Resume){
                  return Resume.get().then(
                    (resumes) => resumes    
                  );
              }
             }
        });

};

export default DashboardConfig;