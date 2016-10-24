<?php
/**
 * AngularPressThemeApp functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package AngularPressThemeApp
 */

if ( ! function_exists( 'angularpressthemeapp_setup' ) ) :
/**
 *
 * functions.php use in development only - none minified styles and scripts
 *
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function angularpressthemeapp_setup() {
    

  register_nav_menus(
    array(
      'header-menu' => __( 'Header Menu' )
    )
  );

    
    // Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );
    
    
    /*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
    add_theme_support( 'post-thumbnails' );
}
endif;
add_action( 'after_setup_theme', 'angularpressthemeapp_setup' );


function angularpressthemeapp_widgets_init() {

	register_sidebar( array(
		'name' => __( 'Sidebar', 'angularpressthemeapp' ),
		'id' => 'main-sidebar',
		'description' => __( 'The sidebar appears on the right on each page except the front page template', 'angularpressthemeapp' ),
		'before_widget' => '<div id="%1$s" class="card-panel hoverable widget %2$s">',
		'after_widget' => '</div>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
    
    register_sidebar( array(
		'name' =>__( 'Footer Content Right', 'angularpresstheme'),
		'id' => 'footer-sidebar-right',
		'description' => __( 'Appears on the static front page template', 'angularpresstheme' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
    
	register_sidebar( array(
		'name' =>__( 'Footer Content Left', 'angularpresstheme'),
		'id' => 'footer-sidebar-left',
		'description' => __( 'Appears on the static front page template', 'angularpresstheme' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget' => '</aside>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	}

add_action( 'widgets_init', 'angularpressthemeapp_widgets_init' );


//Customize Theme in WP Customizer
function angularpressthemeapp_theme_customizer( $wp_customize ) {

    //Add custom Logo
    $wp_customize->add_section(
        'angularpressthemeapp_logo_section',
        array(
    	'title'       => __( 'Logo', 'angularpressthemeapp' ),
    	'priority'    => 30,
    	'description' => 'Upload a logo for the navigation bar',
	) );

	$wp_customize->add_setting(
        'angularpressthemeapp_logo', array(
				'width'    => 60,
	    	'height'   => 60,
        'uploads'       => true,
    ) );
    
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'angularpressthemeapp_logo', array(

    	'label'    => __( 'Logo', 'angularpressthemeapp' ),
		'section'  => 'angularpressthemeapp_logo_section',
		'settings' => 'angularpressthemeapp_logo',
	) ) );

    
    //Add custom copyright string
    $wp_customize->add_section(
        'angularpressthemeapp_copyright',
        array(
    	'title'       => __( 'Copyright Details', 'angularpressthemeapp' ),
    	'priority'    => 120,
    	'description' => 'Add/Edit copyright information',
	) );

	$wp_customize->add_setting('copyright_details', array(
        'default'   => '&copy; 2016 webdesignofpassion.de'
    ));
    
	$wp_customize->add_control('copyright_details', array(

    	'label'    => __( 'Copyright Information', 'angularpressthemeapp' ),
		'section'  => 'angularpressthemeapp_copyright',
		'settings' => 'copyright_details',
	) );
}
add_action('customize_register', 'angularpressthemeapp_theme_customizer');


// Make image link free from being rewritten by Angular
function angularpressthemeapp_add_link_target( $html ) {
	$html = preg_replace( '/(<a.*")>/', '$1 target="_self">', $html );
	return $html;
}
add_filter( 'image_send_to_editor', 'angularpressthemeapp_add_link_target', 10 );

/**
 * Enqueue scripts and styles in dev-mod.
 */
function angularpressthemeapp_scripts() {
    
    
//    wp_enqueue_style( 'vendor-style',
//        get_stylesheet_directory_uri() . '/dist/styles/vendor.075f080a.css'
//    );
//    
//    wp_enqueue_style( 'main-style',
//        get_stylesheet_directory_uri() . '/dist/styles/main.86d7de17.css'
//    );
//
//    wp_register_script(
//        'vendor-scripts',
//        get_stylesheet_directory_uri() . '/dist/scripts/vendor.js'
//        
//    );
//    wp_enqueue_script(
//        'scripts',
//		get_stylesheet_directory_uri() . '/dist/scripts/scripts.js',
//		array( 
//            'vendor-scripts',
//            'scripts'
//             )
//	);

    
    /*
    // Styles and Scripts in dev-mode
    */
    
    wp_enqueue_style( 'materialize-style',
        get_stylesheet_directory_uri() . '/bower_components/Materialize/dist/css/materialize.min.css'
    );
    wp_enqueue_style( 'font-awesome-style',
        get_stylesheet_directory_uri() . '/bower_components/components-font-awesome/css/font-awesome.css'
    );
    wp_enqueue_style( 'animate-css',
        get_stylesheet_directory_uri() . '/bower_components/animate.css/animate.min.css'
    );
     wp_enqueue_style( 'main-style',
        get_stylesheet_directory_uri() . '/style.css'
    );
    wp_register_script(
        'jQuery',
        get_stylesheet_directory_uri() . '/bower_components/jquery/dist/jquery.js'
        
    );
	wp_register_script(
		'materialize',
		get_stylesheet_directory_uri() . '/bower_components/materialize/dist/js/materialize.min.js'
	);
    wp_register_script(
        'angular',
        get_stylesheet_directory_uri() . '/bower_components/angular/angular.js'
    );
    wp_register_script(
        'angular-animate',
        get_stylesheet_directory_uri() . '/bower_components/angular-animate/angular-animate.js'
    );
    wp_register_script(
        'angularjs-ui-router',
        get_stylesheet_directory_uri() . '/bower_components/angular-ui-router/release/angular-ui-router.js'
    );
    wp_register_script(
        'angularjs-filter',
        get_stylesheet_directory_uri() . '/bower_components/angular-filter/dist/angular-filter.js'
    );
    wp_register_script(
		'angularjs-sanitize',
		get_stylesheet_directory_uri() . '/bower_components/angular-sanitize/angular-sanitize.min.js'
	);
    wp_register_script(
		'angular-bind-html-compile',
		get_stylesheet_directory_uri() . '/bower_components/angular-bind-html-compile/angular-bind-html-compile.js'
	);
     wp_register_script(
		'angularUtils-pagination',
		get_stylesheet_directory_uri() . '/bower_components/angularUtils-pagination/dirPagination.js'
	);
    wp_register_script(
		'angular-lazy-img',
		get_stylesheet_directory_uri() . '/bower_components/angular-lazy-img/release/angular-lazy-img.js'
	);
    wp_register_script(
		'nanoScroller',
		get_stylesheet_directory_uri() . '/app/scripts/vendor/nanoScroller.min.js'
	);
    wp_register_script(
		'sidr',
		get_stylesheet_directory_uri() . '/app/scripts/vendor/jquery.sidr.js'
	);
    wp_register_script(
		'ie-debug',
		get_stylesheet_directory_uri() . '/app/scripts/debugging/ie-debug.js'
	);
    
   //   AngularPressThemeApp register angular core scripts in deveploment only
    
    wp_register_script(
        'angularpressthemeapp-app',
		get_stylesheet_directory_uri() . '/app/scripts/app.js'
    );      
    
    
    // enqueue scripts in deveploment only
    
	wp_enqueue_script(
        'angularpressthemeapp-scripts',
		get_stylesheet_directory_uri() . '/app/scripts/app.js',
		array( 
            'jQuery',
            'materialize',
            'angular',
            'angular-animate',
            'angularjs-ui-router',
            'angularjs-filter',
            'angularjs-sanitize',
            'angular-bind-html-compile',
            'angularUtils-pagination',
            'angular-lazy-img',
            'nanoScroller',
            'sidr',
            'ie-debug',
            'angularpressthemeapp-app'
             )
	);
    
	wp_localize_script(
		'angularpressthemeapp-scripts',
		'localizePathTo',
		array(
			'app' => trailingslashit( get_template_directory_uri() ) . 'app/',
			'views' => trailingslashit( get_template_directory_uri() ) . 'app/views/',
            'img' => trailingslashit( get_template_directory_uri() ) . 'app/images/'
			)
	);
}
add_action( 'wp_enqueue_scripts', 'angularpressthemeapp_scripts' );


/**
 * Enqueue scripts and styles in production-mod.
 */

//function angularpressthemeapp_scripts() {
//
//    wp_enqueue_style( 'vendor-style',
//        get_stylesheet_directory_uri() . '/dist/styles/vendor.075f080a.86d7de17.css'
//    );
//    
//    wp_enqueue_style( 'main-style',
//        get_stylesheet_directory_uri() . '/dist/styles/main.86d7de17.css'
//    );
//
//    wp_register_script(
//        'vendor-scripts',
//        get_stylesheet_directory_uri() . '/dist/scripts/vendor.js'
//        
//    );
//    wp_enqueue_script(
//        'scripts',
//		get_stylesheet_directory_uri() . '/dist/scripts/scripts.js',
//		array( 
//            'vendor-scripts',
//            'scripts'
//             )
//	);
//    
//    wp_localize_script(
//		'angularpressthemeapp-scripts',
//		'localizePathTo',
//		array(
//			'app' => trailingslashit( get_template_directory_uri() ) . 'app/',
//			'views' => trailingslashit( get_template_directory_uri() ) . 'app/views/',
//            'img' => trailingslashit( get_template_directory_uri() ) . 'app/images/'
//			)
//	);
//    }
//add_action( 'wp_enqueue_scripts', 'angularpressthemeapp_scripts' );


function angularpressthemeapp_contact_form_shortcode() {
    return '<contact-form></contact-form>';
}
add_shortcode('contact-form', 'angularpressthemeapp_contact_form_shortcode');