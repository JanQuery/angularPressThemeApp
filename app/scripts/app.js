'use strict';

/*global localizePathTo:false, $:false */

angular.module('angularPressThemeApp', [
    'ui.router',
    'ngSanitize',
    'angular-bind-html-compile',
    'angular.filter',
    'angularUtils.directives.dirPagination',
    'ngAnimate',
    'angularLazyImg'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');

        $stateProvider
         
            .state('/', {
                url: '/',
                templateUrl: localizePathTo.views + 'main.html',
                controller: 'MainCtrl',
                resolve: {

                    dataFactory: 'dataFactory',

                    getAllData: function (dataFactory) {
                        return dataFactory;
                    }
                }
            })
            .state('contentDetails', {
                url: '/:slug/',
                templateUrl: localizePathTo.views + 'includes/content-details.html',
                controller: 'MainCtrl',
                resolve: {

                    dataFactory: 'dataFactory',

                    getdata: function (dataFactory) {
                        return dataFactory;
                    },
                    slug: function ($stateParams) {
                        return $stateParams;
                    },
                    getpages: function (dataFactory) {
                        return dataFactory.getPages();
                    },
                    getposts: function (dataFactory) {
                        return dataFactory.getPosts();
                    },
                    getpagesandposts: function (getpages, getposts, $q) {
                        $q.all([getpages, getposts]).then(function () {
                            return [].concat(getpages.data, getposts.data);
                        });
                    }
                }
            })
            .state('categoryOverview', {
                url: '/category/:slug/',
                templateUrl: localizePathTo.views + 'includes/content-categories.html',
                controller: 'CategoriesContent',
                resolve: {

                    dataFactory: 'dataFactory',

                    categoryslug: function ($stateParams) {
                        return $stateParams.slug;
                    },

                    getpostsbycategory: function (dataFactory) {
                        return dataFactory;
                    }
                }
            })
            .state('/wp-admin', {
                url: '/wp-admin/customize.php?return=',
                templateUrl: localizePathTo.views + 'main.html',
                controller: 'MainCtrl'
            })
            .state('wp-login', {
                url: "/wp-login.php",
                controller: "LoginCtrl"
            })
            .state('errorPage', {
                url: '/404-Error',
                templateUrl: localizePathTo.views + '404.html',
                controller: '404'
            });
      
        $urlRouterProvider.otherwise('/404-Error');
      
    }])
    .controller('LoginCtrl', ['$window', 'dataFactory', function($window, dataFactory) {
        
            dataFactory.getBlogInfo().success(function (data) {
                var url = data.url;
                
                $window.location.href = url + '/wp-login.php';
            } );        
    }])
    .controller('MainCtrl', ['$scope', '$state', '$stateParams', 'dataFactory', '$q', function ($scope, $state, $stateParams, dataFactory, $q) {
        
        dataFactory.getBlogInfo().success(function (data) {
            
            $scope.blog = data;
            
            if (angular.equals({}, $scope.blog)) {
                    $state.go('errorPage');
                    document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
                }
        }).error(function () {
                $state.go('errorPage');
                document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
            });
                         
        dataFactory.getMedia().success(function (data) {
            $scope.media = data;
        });

        $scope.slugParam = $stateParams.slug;

        var pages = dataFactory.getPages();

        var posts = dataFactory.getPosts();

        $q.all([pages, posts]).then(function (data) {

            var pages = data[0];

            var posts = data[1];

            $scope.pagesAndPost = [].concat(pages.data, posts.data);
            
        });

    }])
    .controller( 'CategoriesContent', ['$scope', '$rootScope', '$filter', 'dataFactory', 'categoryslug', function ($scope, $rootScope, $filter, dataFactory, categoryslug ) {

        $scope.categoryslugParam = categoryslug;

        dataFactory.getCategories().success(function (data) {
            
            $scope.categories = data;

            $scope.category = $scope.categories.$filter(function (data) {
                return (data.slug === $scope.categoryslugParam);
            });
            
            $rootScope.categoryId = $scope.category[0].id;
            
             if (angular.equals({}, $scope.blog)) {
                 
                    // $state.go('errorPage');
                 
                    document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
                }

        }).error(function () {
            
                // $state.go('errorPage');
            
                document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
            });


        dataFactory.getPosts().success(function (data) {

            $scope.postsByCategory = data;

            if (!data.length) {
                $scope.is404 = true;
                document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
            }
        }).error(function () {
            $scope.is404 = true;
            document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
        });
        }])
    .controller('404',  function () {
        document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
    })
    .factory('dataFactory', function ($http) {

        return {
            getMedia: function () {
                return $http({
                    url: 'wp-json/wp/v2/media/',
                    method: 'GET'
                });
            },
            getBlogInfo: function () {
                return $http({
                    url: 'wp-json',
                    method: 'GET'
                });
            },
            getPages: function () {
                return $http({
                    url: 'wp-json/wp/v2/pages/',
                    method: 'GET',
                    cache: 'true'
                });
            },
            getPosts: function () {
                return $http({
                    url: 'wp-json/wp/v2/posts/',
                    method: 'GET',
                    cache: 'true'
                });
            },
            getPostsByName: function () {
                return $http({
                    url: 'wp-json/wp/v2/posts?filter[name]=',
                    method: 'GET',
                    cache: 'true'
                });
            },
            postsByCategory: function () {
                return $http({
                    url: 'wp-json/wp/v2/posts/?filter[category_name]=',
                    method: 'GET'
                });
            },
            getCategories: function () {
                return $http({
                    url: 'wp-json/wp/v2/categories',
                    method: 'GET'
                });
            },
            getHeaderMenu: function () {
                return $http({
                    url: 'wp-json/wp-api-menus/v2/menu-locations/header-menu',
                    method: 'GET'
                });
            },
            getFooterMenu: function () {
                return $http({
                    url: 'wp-json/wp-api-menus/v2/menu-locations/footer-menu',
                    method: 'GET'
                });
            },
            getWidgetMainSidebar: function () {
                return $http({
                    url: 'wp-json/wp-rest-api-sidebars/v1/sidebars/main-sidebar',
                    method: 'GET'
                });
            },
            getWidgetFooterSidebarLeft: function () {
                return $http({
                    url: 'wp-json/wp-rest-api-sidebars/v1/sidebars/footer-sidebar-left',
                    method: 'GET'
                });
            },
            getWidgetFooterSidebarRight: function () {
                return $http({
                    url: 'wp-json/wp-rest-api-sidebars/v1/sidebars/footer-sidebar-right',
                    method: 'GET'
                });
            }
        };
    })
    .directive('singlePost', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/single-post.html',
            scope: {
                postSlug: '@postSlug'
            },
            controller:  function ($scope, $http) {

                var postSlug = $scope.postSlug;

                $http.get('wp-json/wp/v2/posts?filter[name]=' + postSlug).success(function (res) {
                    $scope.post = res[0];
                });
            }
        };
    })
    .directive('singlePage', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/single-page.html',
            scope: {
                pageSlug: '@pageSlug'
            },
            controller: function ($scope, $http ) {

                var pageSlug = $scope.pageSlug;

                $http.get('wp-json/wp/v2/pages?filter[name]=' + pageSlug).success(function (res) {
                    $scope.page = res[0];
                });
            }
        };
    })
    .directive('postsByCategory', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/posts-by-category.html',
            scope: {
                categorySlug: '=?categorySlug'
            },
            controller:['$scope', '$http', function ($scope, $http) {

                var category_slug = $scope.categorySlug.toLowerCase();
                

                $http.get('wp-json/wp/v2/posts?filter[category_name]=' + category_slug).success(function (res) {
                    $scope.postsByCategory = res;
                    
                });            
                
                
            }]
        };
    })
    .directive('featuredMedia', function() {
        return {
            restrict: 'EA',
            template: '<img lazy-img="{{featuredMediaImage}}"/>',
            scope: {
                mediaId:    '@?mediaId',
                mediaSize:  '@?mediaSize'
            },
            controller: ['$http', '$scope', function ( $http, $scope) {
                var mediaId     = $scope.mediaId;
                var mediaSize   = $scope.mediaSize;
                
                if ( mediaId !== 0 && !mediaSize) {
                    $http.get('wp-json/wp/v2/media/' + mediaId).success(function(data){
                        $scope.featuredMediaImage = data.media_details.sizes.medium.source_url;
                    });
                }
                
                if ( mediaId !== 0 && mediaSize === 'thumbnail' ) {
                    $http.get('wp-json/wp/v2/media/' + mediaId).success(function(data){
                        $scope.featuredMediaImage = data.media_details.sizes.thumbnail.source_url;
                    });
                }
                
                if ( mediaId !== 0 && mediaSize === 'medium' ) {
                    $http.get('wp-json/wp/v2/media/' + mediaId).success(function(data){
                        $scope.featuredMediaImage = data.media_details.sizes.medium.source_url;
                    });
                }
                if ( mediaId !== 0 && mediaSize === 'full' ) {
                    $http.get('wp-json/wp/v2/media/' + mediaId).success(function(data){
                        $scope.featuredMediaImage = data.media_details.sizes.full.source_url;
                    });
                }
                
            }]
//            compile: function (element, attrs, $scope) {
//                
////                if ( !attrs.mediaSize ) {
////                    $scope.featuredMediaImage = $scope.featuredMediaImageById.medium.source_url;
////                }
////                if ( attrs.mediaSize === 'thumbnail' ) {
////                    $scope.featuredMediaImage = $scope.featuredMediaImageById.thumbnail.source_url;
////                }
////                
////                if ( attrs.mediaSize === 'medium' ) {
////                    $scope.featuredMediaImage = $scope.featuredMediaImageById.medium.source_url;
////                }
////                if ( attrs.mediaSize === 'full' ) {
////                    $scope.featuredMediaImage = $scope.featuredMediaImageById.full.source_url;
////                }
////            }
        };
    })
    .directive('contentSearchPosts', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/content-search-posts.html',
            controller: ['$scope', '$http', function ($scope, $http) {

                $scope.resetSearchinposts = function () {
                    
                    $scope.filter = {
                        s: ''
                    };
                    
                    $scope.posts = {};
                };

                
                $scope.search = function () {
                        $http.get('wp-json/wp/v2/posts/?filter[s]=' + $scope.filter.s).success(function (data) {
                            $scope.posts = data;
                        });
                };

            }]

        };
    })
    .directive('sidebarSearchPosts', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/sidebar-search-posts.html',
            controller: ['$scope', '$http', function ($scope, $http) {

                $scope.resetSearchinpostssidebar = function () {
                    
                    $scope.filtersidebar = {
                        s: ''
                    };
                    
                    $scope.postsinsidebar = {};
                };
                
                $scope.searchsidebar = function () {

                        $http.get('wp-json/wp/v2/posts/?filter[s]=' + $scope.filtersidebar.s).success(function (data) {
                            $scope.postsinsidebar = data;
                        });
                    
                        $http.get('wp-json/wp/v2/media').success(function(data){
                            $scope.thumbnailinsidebar = data;
                        });
                };

            }]

        };
    })
    .directive('mainSidebar', function () {
        return {
            restrict: 'EC',
            templateUrl: localizePathTo.views + 'directives/main-sidebar.html',
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {
                
                dataFactory.getWidgetMainSidebar().success(function (data) {
                    $scope.mainSidebarData = data;
                });
            }]
        };
    })
    .directive('footerSidebarLeft', function () {
        return {
            restrict: 'EC',
            templateUrl: localizePathTo.views + 'directives/footer-sidebar-left.html',
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {
                dataFactory.getWidgetFooterSidebarLeft().success(function (data) {
                    $scope.footerSidebarLeftData = data;
                });
            }]
        };
    })
    .directive('footerSidebarRight', function () {
        return {
            restrict: 'EC',
            templateUrl: localizePathTo.views + 'directives/footer-sidebar-right.html',
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {
                
                dataFactory.getWidgetFooterSidebarRight().success(function (data) {
                    $scope.footerSidebarRightData = data;
                });
            }]
        };
    })
    .directive('aptSidebar', function () {
    return {
        restrict: 'EC',
        templateUrl: localizePathTo.views + 'includes/apt-sidebar.html',
        controller: 'MainCtrl'
    };
})
.directive('mobileSidebar', function () {
    return {
        link: function () {
            angular.element(document).ready(function () {
               
                $('#sidebar-menu').sidr({
                    name: 'sidebar-nav',
                    side: 'right',
                    onOpen: function () {
                            $('#sidebar-icon').removeClass('fa-ellipsis-v').addClass('fa-times fa-2x');
                        },
                    onClose: function () {
                            $('#sidebar-icon').removeClass('fa-times fa-2x').addClass('fa-ellipsis-v');
                        },
                });
            });
        }
    };
})
    .directive('headerMenu', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/menus/header-menu.html',
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {
                dataFactory.getHeaderMenu().success(function (data) {
                    $scope.headerMenu = data;
                });
            }]
        };
    })
    .directive('headerMenuMobile', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/menus/header-menu-mobile.html',
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {
                dataFactory.getHeaderMenu().success(function (data) {
                    $scope.headerMenuMobile = data;
                });
                
                $scope.toggleRotateIcon = function (index) {
                  
                    if( $('#chevron-mobile-menu-'+index).hasClass('rotate-icon') ){
                        
                        $('#chevron-mobile-menu-'+index).removeClass('rotate-icon');
                        
                    }
                    else {
                         $('#chevron-mobile-menu-'+index).addClass('rotate-icon');
                    }
                    
                };
            }]
        };
    })
    .directive('footerMenu', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/menus/footer-menu.html',
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {
                dataFactory.getFooterMenu().success(function (data) {
                    $scope.footerMenu = data;
                });
            }]
        };
    })
    .directive('aptBannerImage', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/apt-banner-image.html',
            scope: {
                wpSrc: '@?wpSrc',
                wpPosition: '@?wpPosition'
            },
            compile: function (element, attrs) {
                
                if (!attrs.wpSrc) {
                    attrs.wpSrc = localizePathTo.img + 'background1.jpg';
                }
                
                if (!attrs.wpPosition) {
                    attrs.wpPosition = 'center';
                }
                
            },
            controller: ['$scope', 'dataFactory', function ($scope, dataFactory) {

                dataFactory.getBlogInfo().success(function (data) {
                    $scope.blog = data;
                });
            }]
        };
    })
    .directive('aptImage', function () {
        return {
            restrict: 'EA',
            templateUrl: localizePathTo.views + 'directives/apt-image.html',
            scope: {
                wpSrc: '@?wpSrc',
                wpHeader: '@?wpHeader',
                wpText: '@?wpText',
                wpPosition: '@?wpPosition'
            },
            compile: function (element, attrs) {
                
                if (!attrs.wpSrc) {
                    attrs.wpSrc = localizePathTo.img + 'background1.jpg';
                }
                
                if (!attrs.wpPosition) {
                    attrs.wpPosition = 'center';
                }
            }
        };
    })
    .directive('parallax', function () {
    return {
        link: function () {
            
            angular.element(document).ready(function () {
                
                $('.parallax').parallax();
                
            });
            
        }
    };
})
    .directive('nanoscroller', function () {
        return {
            link: function () {
                
                angular.element(document).ready(function () {
                    
                    setTimeout(function () {
                        
                        $('.nano').nanoScroller();
                        
                    }, 500);
                    
                });
                
            }
        };
    })
.directive('buttonCollapse', function () {
    return {
        link: function () {
            
            angular.element(document).ready(function () {
                
                 $('.button-collapse').sideNav({
                        menuWidth: 300, // Default is 240
                        closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
                });
                
            });
        }
    };
})
.directive('navDropdownButton', function () {
        return {
            link: function () {
                
                angular.element(document).ready(function () {
                    
                    setTimeout(function () {
                        
                        $('.nav-dropdown-button').dropdown();
                        
                        $('.close-sidenav').click(function(){
                            
                            $('.button-collapse').sideNav('hide');
                            
                        });
                        
                    }, 500);
                    
                });                
            }
        };
})
.directive('footerDropdownButton', function () {
        return {
            link: function () {
                
                angular.element(document).ready(function () {
                    
                    setTimeout(function () {
                        
                    $('.footer-dropdown-button').dropdown({
                        inDuration: 300,
                        outDuration: 225,
                        constrain_width: true, // Does not change width of dropdown to that of the activator
                        hover: true, // Activate on hover
                        gutter: 0, // Spacing from edge
                        belowOrigin: true, // Displays dropdown below the button
                        alignment: 'left' // Displays dropdown with edge aligned to the left of button

                    });
                        
                        }, 500);
                    
                });                
            }
        };
    })
    .directive('sidenavCollapsible', function () {
        return {
            link: function () {
                
                angular.element(document).ready(function () {
                    
                    setTimeout(function () {
                        
                        $('.collapsible').collapsible();
                        
                        }, 500);
                    
                });                
            }
        };
    })
    .run(['$rootScope', function ($rootScope) {
                    $rootScope.$on('$stateChangeSuccess', function () {
                        $("html, body").animate({
                            scrollTop: 0
                        }, 500);
                        
                        $.sidr('close', 'sidebar-nav');
                        
                    });

                    angular.element(document).ready(function () {
                        setTimeout(function () {
                            $('#preloader').addClass('hide');
                            $('#main-content').removeClass('hide').addClass('animated fadeIn');
                        },2000);
                    });
    }]);