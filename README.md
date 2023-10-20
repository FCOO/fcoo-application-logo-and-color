# fcoo-application-logo-and-color
>


## Description
css, scss-mixin, and js for
 
- setting application-colors
- setting logo
- console logo and application info
- adding `<mega>`-tags and adding favicon
- creating loading page for FCOO web applications and pages

## Installation
### bower
`bower install https://github.com/FCOO/fcoo-application-logo-and-color.git --save`

## Demo
http://FCOO.github.io/fcoo-application-logo-and-color/demo/

## Usage

### Application logo

To set the logo for the the application use
    
    window.fcoo..setApplicationLogo( fileNamePrefix );

The logo **must** be a svg-file in the `/assets/logos` directory (see [fcoo-data-files](https://github.com/FCOO/fcoo-data-files)) and in 3 versions:

    {fileNamePrefix}.svg        //The version in correct colors 
    {fileNamePrefix}_white.svg  //The version in white 
    {fileNamePrefix}_black.svg  //The version in black

There are currently two logos in production

- `"fcoo"`: [fcoo.svg](https://app.fcoo.dk/assets/logos/fcoo.svg) and [fcoo_black.svg](https://app.fcoo.dk/assets/logos/fcoo_black.svg)
- `"fnm"`: [fmm.svg](https://app.fcoo.dk/assets/logos/fmn.svg) and [fmm_black.svg](https://app.fcoo.dk/assets/logos/fmn_black.svg) 

**Default is "fcoo"**

### Console logo and application info

To 'write' logo and information about the application in the browser console call

    window.fcoo.consoleApplicationLogo( ownerId:STRING, textList:[]STRING );

It will console the logo and the text in `textList`

Logos for `ownerId` = `"fcoo"`, `"geometoc"`, and `"nordefco"` are defined 

    
### Adding `<mega>`-tags and adding favicon

To add default `<meta>` and favicons call

        window.fcoo.addApplicationMetaAndFavicon(owner:STRING (default = "fcoo"), logo:STRING (default = "fcoo"));

If will also set favicon color to the color set by `@mixin application-base-color($color)` (see below)

### Loading page

To create the loading-page call

    window.fcoo.createLoading( versionText );

If `versionText` is given a red bar at the top is shown (see [demo](http://FCOO.github.io/fcoo-application-logo-and-color/demo/))

The loading-page is hidden by setting modernizr-test `"loading"` off using [modernizr-javascript](https://github.com/FCOO/modernizr-javascript) (see [demo](http://FCOO.github.io/fcoo-application-logo-and-color/demo/)) 

    $('html').modernizrOff('loading');


### scss

#### Standard logo

To have the logo in a "standard" size (160-200px) just add class `"fcoo-app-standard-logo"` to a element

    <div class="fcoo-app-standard-logo"/>

See [demo](http://FCOO.github.io/fcoo-application-logo-and-color/demo/)

#### `@mixin application-base-color($color)`
Located in `src/_fcoo-application-base-color-mixin.scss`

Set the base color (eg. background-color on loading page). 
Automatic sets the base text-color (white or black) with best contrast to to base color

Both are saved in css-var:

    :root {
        --_fcoo-default-app-base-color: ...;
        --fcoo-app-base-color         : ...;
    }

The default values are <span style="background-color: #3f5b58; color: white">&nbsp;&nbsp;the "DALO green" (#3f5b58) with white text&nbsp;&nbsp;</span>     
 
<!--

### options
| Id | Type | Default | Description |
| :--: | :--: | :-----: | --- |
| options1 | boolean | true | If <code>true</code> the ... |
| options2 | string | null | Contain the ... |

### Methods

    .methods1( arg1, arg2,...): Do something
    .methods2( arg1, arg2,...): Do something else
 -->


## Copyright and License
This plugin is licensed under the [MIT license](https://github.com/FCOO/fcoo-application-logo-and-color/LICENSE).

Copyright (c) 2023 [FCOO](https://github.com/FCOO)

## Contact information

Niels Holt nho@fcoo.dk
