import angular from 'angular';

let servicesModule = angular.module('app.services', []);

//Services
import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

import PostService from './post.service';
servicesModule.service('Post', PostService);

import MultipartFormService from './multipartForm.service';
servicesModule.service('MultipartForm', MultipartFormService);

import ResumeService from './resume.service';
servicesModule.service('Resume', ResumeService);

export default servicesModule;