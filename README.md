# angularPressThemeApp

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

Run `grunt` for building

### not

`grunt serve` will not work. It´s a Wordpress Theme. You have to have a running Wordpress installation.

## Testing

Running `grunt test` will run the unit tests with karma.

# AngularPressThemeApp
Angular.js redering the Frontend consuming the Data form WP Rest API (v2) edited in the Backend of WordPress. All Links of Posts and Pages are bookmarkable.

## Advantages
<ul>
    <li>The Website loads only once. While the user navigates through your website the content is allready within his device ( Angular.js)</li>
    <li>Add content with simplicity within the Wordpress-Backend ( WordPress)</li>
    <li>Modern, light-weight Material Design ( Materializecss)</li>
</ul>

## Installtion & requirements
In order to run AngularPressTheme you have to mind the following requirements:
<ol>
<li>Running <b>Wordpress</b> installation</li>
<li><b>Permalinks</b> by slug activated</li>
<li><b>3 Plugins</b> to install and activated:</li>
<li>download this repo in to Wordpress theme folder</li>
<li>Within a cmd run npm install & bower install</li>
<ul>
    <li><a href="https://wordpress.org/plugins/rest-api/" target="_blank">WordPress REST API (Version 2)</a> by <a href="http://v2.wp-api.org/" target="_blank">WP REST API Team</a></li>
    <li><a href="https://wordpress.org/plugins/wp-api-menus/" target="_blank">WP API Menus</a> by <a href="https://github.com/unfulvio" target="_blank">Fulvio Notarstefano</a></li>
    <li><a href="https://wordpress.org/plugins/wp-rest-api-sidebars/">WP Rest API Sidebars</a> by <a href="https://github.com/martin-pettersson" target="_blank">Martin Pettersson</a></li>
    </ul></li>
<li>Install the theme within your Wordpress theme folder extracting the downloaded zip file.</li>
<li>a little knowledge of HTML and Angular.js</li>
</ol>
<b><em>Note:</em></b> The build-in search form of Wordpress will not work. Remove it within the Dashboard at Design > Widgets > Main Sidebar. Use the build-in AngularPressTheme directive in THEME ROOT Folder > partials > includes > apt-sidebar.html:
```html
<sidebar-search-posts></sidebar-search-posts>
```
It´s allready coded in THEME ROOT Folder > partials > includes > apt-sidebar.html.
If you does not need this feature remove the directive there.

## No Theme as other
Within Wordpress you enter the data.
All of the data to display in frontend is managed by angular.js and the build in directive. Even there is no nav_walter. Its all Angular.js and a little bit of code.

To customize the frontpage you have to code the main.html within THEME ROOT Folder > partials > main.html.
For simplicity use the build-in directive.

## Build-in Directives

### Search form for posts
This directives add the ability to the user to search within your posts
There are two search-form-directives, which are independet form each other. 
```html
<content-search-posts></content-search-posts>
```
```html
<sidebar-search-posts></sidebar-search-posts>
```
For the case you need two searchforms. One within the main content and one for the sidebar. Adding the same directive in both sidebar and main content, would effect both forms while the user put input to it.

### Single Page
You can add mulitple pages within your frontpage like a SPA (Single Page App) using this directive. You only have to enter the page slug within the <em>page-slug</em> attribute.
```html
<single-page page-slug="SLUG OF PAGE TO DISPLAY"></single-page>
```

### Single Post
You can add mulitple posts within your frontpage using this directive. You only have to enter the post slug within the <em>post-slug</em> attribute.
```html
<single-post post-slug="SLUG OF PAGE TO DISPLAY"></single-post>
```

### Posts by category
With this directive you can display all posts by a certain category.
```html
<posts-by-category category-slug="'YOUR CATEGORY'"></posts-by-category>
```
<b><em>Note:</em></b> Mind the single quotes within the double quotes!

### Banner Image
It´s there for to display a full-width image with parallax effect. Within that image is a box that display the blog title and the blog description.

```html
<apt-banner-image></apt-banner-image>
```

You can pass two attributes to that directive:
<ol>
<li><em>wp-src</em> - to add your image url. Leaving it blank will display the default image.</li>
<li><em>wp-position</em> - to align the text within the box. the following parameters are to pass to this attribute</li>
<ul>
    <li>center</li>
    <li>left</li>
    <li>right</li>
</ul>
</ol>

```html 
<apt-banner-image wp-src="http://YOUR IMAGE URL" wp-position="ALGIN THE TEXT WITHIN THE BOX"></apt-banner-image>
```

### Image
It´s there for to display a full-width image with parallax effect <em>and</em> your customize text. 

```html
<apt-image></apt-image>
```
You can pass four attributes to that directive:
<ol>
<li><em>wp-src</em> - to add your image url. Leaving it blank will display the default image.</li>
<li><em>wp-position</em> - to align the text within the box. the following parameters are to pass to this attribute</li>
<ul>
    <li>center</li>
    <li>left</li>
    <li>right</li>
</ul>
<li><em>wp-header</em> - to display a H2 taged title entered within that attribute</li>
<li><em>wp-text</em> - to display a text (describtion) entered within that attribute</li>
<li>Leaving wp-header and wp-text unset will display the image with parallay effect without the box.</li>
</ol>
```html
<apt-image wp-header="YOUR AWSOME TITLE" wp-text="YOUR AWESOME DESCRPTION TEXT"  wp-src="http://YOUR IMAGE URL" wp-position="ALGIN THE TEXT WITHIN THE BOX"></apt-image>
```

## THEME Feautes
<ul>
    <li>Customize your Logo</li>
    <li>2 Navigation Postions - Header & Footer</li>
    <li>3 Widget - Main Sidebar - Footer Conten on the right side - Footer Content on the left side</li>
</ul>

## Credits
With this Repo I want to thank everyone how shares his code and its knowledge.
Special thanks to:
<ul>
    <li>My Family</li>
    <li><a href="https://wordpress.org/" target="_blank">Wordpress</a> and its community</li>
    <li><a href="https://angularjs.org/" target="_blank">Angualar.js and its community</a></li>
    <li><a href="http://materializecss.com/" target="_blank">materializecss for this great css framework</a></li>
</ul>

## License
This theme is like WordPress licensed under the terms of <a href="http://www.gnu.org/licenses/gpl-2.0.html" target="_blank">GPLv2</a> or later
