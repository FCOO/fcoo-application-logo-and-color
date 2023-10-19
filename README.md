# fcoo-application-logo-and-color
>


## Description
css, scss-mixin, and js for setting application-colors, logo and creating loading page for FCOO web applications and pages

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

### Loading page

To create the loading-page call

    window.fcoo.createLoading( versionText );

If `versionText` is given a red bar at the top is shown (see [demo](http://FCOO.github.io/fcoo-application-logo-and-color/demo/))

The loading-page is hidden by setting modernizr-test `"loading"` off using [modernizr-javascript](https://github.com/FCOO/modernizr-javascript) (see [demo](http://FCOO.github.io/fcoo-application-logo-and-color/demo/)) 

    $('html').modernizrOff('loading');


### scss

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
