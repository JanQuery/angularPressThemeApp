<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <base href="<?php echo site_url(); ?>/" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
    <title>
        <?php echo $blog_title = get_bloginfo( 'name' ); ?>
    </title>
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
    <?php wp_head(); ?>
</head>

<body>
    <div id="page" ng-app="angularPressThemeApp">
        
<!-- Navigation in header - navbar -->
        <div class="navbar-fixed">

            <nav id="site-navigation" class="main-navigation" role="navigation" button-collapse>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="brand-logo">
                    <?php if ( get_theme_mod( 'angularpressthemeapp_logo' ) ) :
	echo '<img src="' . esc_url( get_theme_mod( 'angularpressthemeapp_logo' ) ) . '" width="64px" height="64px" />';
else:
	echo '<img src="' . esc_url( get_bloginfo('template_directory') . '/app/images/default-logo.png')  . '" width="64px" height="64px" />';
endif; ?>
                </a>
                <a href="#" data-activates="mobile-nav" class="button-collapse"><i class="material-icons"><i class="fa fa-bars" aria-hidden="true"></i></i></a>

                <a href="#" id="sidebar-menu" class="hide-on-large-only right"><i class="material-icons"><i id="sidebar-icon" class="fa fa-ellipsis-v" aria-hidden="true"></i></i></i></a>

                <!-- Main Navigation on big screens -->
                <ul class="right hide-on-med-and-down">
                    <header-menu></header-menu>
                </ul>
                <!-- Main Navigation on big screens / -->
                
                <!-- Mobile Navigation right -->
                <ul id="mobile-nav" class="side-nav">
                    <li id="close-sidenav-btn" onclick="$('.button-collapse').sideNav('hide');">&nbsp;&nbsp;<i class="material-icons black-text right pointer"><i class="fa fa-times" aria-hidden="true"></i></i></li>
                    <li class="blue-text"><a ng-href="{{blog.url}}" onclick="$('.button-collapse').sideNav('hide');"><h3 class="flow-text bolder">{{blog.name}}</h3></a></li>
                    <header-menu-mobile></header-menu-mobile>
                </ul>
                <!-- Mobile Navigation right / -->
                
            </nav>
        </div>
<!-- Navigation in header - navbar / -->
        
<!-- mobile sidebar left -->
            <apt-sidebar id="sidebar-nav" mobile-sidebar></apt-sidebar>
<!-- mobile sidebar left / -->

        <main class="container-fluid">
           <div id="preloader" class="progress">
              <div class="indeterminate"></div>
          </div>
            <div id="main-content" class="row none-visible">
<!--Main Section - Main content -->
               <div class="col s12 l9 ui-view-container">
                    <div id="main-content-view" class="animate" ui-view></div>
                </div>
<!--Main Section - Main content / -->

<!-- Main Sidebar on big screens -->
                <apt-sidebar class="col l3 hide-on-med-and-down z-depth-3"></apt-sidebar>
<!-- Main Sidebar on big screens / -->
            </div>
        </main>

        <footer class="page-footer">
            <div class="container">
                <div class="row">
                    <div class="col m6 s12">
                        <footer-sidebar-left></footer-sidebar-left>
                    </div>
                    <div class="col m6 s12">
                        <footer-sidebar-right></footer-sidebar-right>
                    </div>
                </div>
            </div>
            <div class="hide-on-med-and-down" footer-menu footer-dropdown-button></div>
            <div class="footer-copyright z-depth-2">
                <div class="row">
                    <div class="container">
                        <span class="left white-text"><?php if ( get_theme_mod('copyright_details') ) :
	echo get_theme_mod('copyright_details');
else:
	echo '&copy; 2016 webdesignofpassion.de';
endif; ?></span> <span class="right">Theme made by <a class="brown-text text-lighten-3" href="http://webdesignofpassion.de">webdesignofpassion.de</a></span>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    
    <?php wp_footer(); ?>
</body>

</html>