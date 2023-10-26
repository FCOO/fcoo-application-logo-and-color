/****************************************************************************
fcoo-application-loading.js

Create and display loading page
****************************************************************************/
(function ($, window/*, document, undefined*/) {
	"use strict";

    //Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {};

    //Set modernizr-test 'loading' off
    $('html').modernizrOff('loading');

    var loadingCreated = false;

    ns.createLoading = function( versionText ){
        loadingCreated = true;

        var $body = $('body');

        //Backward compability: Remove <dic class="loading">...</div>
        $body.find('div.loading').remove();

        var $loadingDiv = $('<div/>')
                .addClass('loading')
                .prependTo( $body );

        //Find or create div with branch and version-text (ex. "DEMO 6.2.0")
        if (versionText)
            $('<div/>')
                .addClass('version')
                .text( versionText )
                .appendTo( $loadingDiv );

        //Create div with logo
        $('<div class="logo"></div>').appendTo($loadingDiv);

        //Create div with flashing dots
        $('<div/>')
            .addClass('dots')
            .append('<span>.</span><span>.</span><span>.</span>')
            .appendTo($loadingDiv);

        $('html').modernizrOn('loading');

    };

    //On document.ready: Create loading if html has class loading
    $(function() {
        if ($('html').hasClass('loading') && !loadingCreated)
            ns.createLoading();
    });

}(jQuery, this, document));

;
/****************************************************************************
	fcoo-application-logo-and-color.js,

	(c) 2023, FCOO

	https://github.com/FCOO/fcoo-application-logo-and-color
	https://github.com/FCOO

****************************************************************************/

(function ($, window/*, document, undefined*/) {
	"use strict";

	//Create fcoo-namespace
	window.fcoo = window.fcoo || {};





	/******************************************
	Initialize/ready
	*******************************************/
	$(function() {


	});

}(jQuery, this, document));
;
/****************************************************************************
fcoo-application-logo.js

Load logos, sets css-var, and write logo etc. in console
****************************************************************************/
(function ($, window/*, document, undefined*/) {
	"use strict";

    //Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {};

    //Set modernizr-test 'logo-portrait' off
    $('html').modernizrOff('logo-portrait');

    function logoExists( img, fileName, fileNamePostfix){
        ns.path.setAssetsDataFileNameAsCssVar('fcoo-app-logo' + fileNamePostfix + '-url', 'logos', fileName);
        $('html').modernizrToggle('logo-portrait', img.height > img.width);

        //Set internal css-var _fcoo-app-logo-wh-ratio
        var root = document.querySelector(':root');
        root.style.setProperty('--_fcoo-app-logo-wh-ratio', img.width / img.height);
    }

    /********************************************************
    ns.setApplicationLogo( fileNamePrefix )
    ********************************************************/
    ns.setApplicationLogo = function( fileNamePrefix ){
        //First set fab-text-color-is-white (=fcoo-app-base-text-color-is-white)
        var fcooAppBaseTextColor = ns.path.getCssVar('fcoo-app-base-text-color') || '#ffffff',
            textColorIsWhite = fcooAppBaseTextColor.includes("000");
        $('html').modernizrToggle('fab-text-color-is-white', !!textColorIsWhite);

        //Check existens of the three versions of the logo
        var img = [];
        ['', '_white', '_black'].forEach((fileNamePostfix, index) => {
            var fileName = fileNamePrefix + fileNamePostfix + '.svg';
            img[index] = new Image();
            img[index].src = ns.path.assetsDataFileName('logos', fileName);
            if (img[index].complete)
                logoExists.call( null, img[index], fileName, fileNamePostfix  );
            else
                img[index].onload = () => {logoExists.call( null, img[index], fileName, fileNamePostfix  ); };
        });
    };



    /********************************************************
    ns.consoleApplicationLogo(ownerId,  textList = [] )
    Write the logo and strings in textList in console
    ********************************************************/
    /* eslint-disable no-console, no-constant-condition*/
    ns.consoleApplicationLogo = function(ownerId, textList = [] ){
        var i, ownerLogoAndText = ownerLogos[ownerId || 'dummy'] || [''];

        for (i=0; i<ownerLogoAndText.length; i++)
            ownerLogoAndText[i] = ownerLogoAndText[i].replaceAll('#', '█');

        ownerLogoAndText = ownerLogoAndText.concat(textList);
        var maxTextWidth = 0;
        for (i=0; i<ownerLogoAndText.length; i++)
            maxTextWidth = Math.max(maxTextWidth, ownerLogoAndText[i].length);

        for (i=0; i<ownerLogoAndText.length; i++){
            var txt = ownerLogoAndText[i];
            if (txt == '-')
                txt = String('-').repeat(maxTextWidth);
            if (txt.length < maxTextWidth)
                txt = txt.padStart((txt.length + maxTextWidth)/2);
            console.log(txt);
        }
    };
    /* eslint-enable no-console, no-constant-condition */

    //Created on https://www.messletters.com/en/big-text/ using style = banner3 and addded an extra space between the letters
    var ownerLogos = {
        fcoo: [
            '########   ######    #######    ####### ',
            '##        ##    ##  ##     ##  ##     ##',
            '##        ##        ##     ##  ##     ##',
            '######    ##        ##     ##  ##     ##',
            '##        ##        ##     ##  ##     ##',
            '##        ##    ##  ##     ##  ##     ##',
            '##         ######    #######    ####### '         ],


        geometoc: [
            ' ######    ########   #######   ##     ##  ########  ########   #######    ###### ',
            '##    ##   ##        ##     ##  ###   ###  ##           ##     ##     ##  ##    ##',
            '##         ##        ##     ##  #### ####  ##           ##     ##     ##  ##      ',
            '##   ####  ######    ##     ##  ## ### ##  ######       ##     ##     ##  ##      ',
            '##    ##   ##        ##     ##  ##     ##  ##           ##     ##     ##  ##      ',
            '##    ##   ##        ##     ##  ##     ##  ##           ##     ##     ##  ##    ##',
            ' ######    ########   #######   ##     ##  ########     ##      #######    ###### '
        ],

        nordefco: [
            '##    ##   #######   ########   ########   ########  ########   ######    ####### ',
            '###   ##  ##     ##  ##     ##  ##     ##  ##        ##        ##    ##  ##     ##',
            '####  ##  ##     ##  ##     ##  ##     ##  ##        ##        ##        ##     ##',
            '## ## ##  ##     ##  ########   ##     ##  ######    ######    ##        ##     ##',
            '##  ####  ##     ##  ##   ##    ##     ##  ##        ##        ##        ##     ##',
            '##   ###  ##     ##  ##    ##   ##     ##  ##        ##        ##    ##  ##     ##',
            '##    ##   #######   ##     ##  ########   ########  ##         ######    ####### '
        ]
    };



}(jQuery, this, document));

;
/****************************************************************************
fcoo-application-meta-and-favicon.js

Methods for creating <meta> in <head> and adding favicons
****************************************************************************/

(function ($, window, document/*, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {};


    //fcoo.viewport_no_scalable: BOOLEAN; If true the viewpoint gets no scalable. Must be set prio to addApplicationMetaAndFavicon is called
    ns.viewport_no_scalable = ns.viewport_no_scalable || false;

    ns.addApplicationMetaAndFavicon = function(owner = "fcoo", logo = 'fcoo'){
        var tagList = [
                {'tag': 'meta', 'charset': "utf-8"},
                {'tag': 'meta', 'http-equiv': 'x-dns-prefetch-control',     'content': 'on'},

                ns.viewport_no_scalable ?
                    {'tag': 'meta', 'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'} :
                    {'tag': 'meta', 'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0'},
                {'tag': 'meta', 'name'      : 'copyright',                  'content': '{OWNER}'},
                {'tag': 'meta', 'name'      : 'google',                     'content': 'notranslate'},

                {'tag': 'link', 'rel'       : 'apple-touch-icon',                                      'sizes': '180x180',  'href'   : '{PATH}apple-touch-icon.png{PARAM}'},
                {'tag': 'link', 'rel'       : 'icon',                       'type'   : 'image/png',    'sizes': '32x32',    'href'   : '{PATH}favicon-32x32.png{PARAM}'},
                {'tag': 'link', 'rel'       : 'icon',                       'type'   : 'image/png',    'sizes': '230x230',  'href'   : '{PATH}favicon-230x230.png{PARAM}'},
                {'tag': 'link', 'rel'       : 'icon',                       'type'   : 'image/png',    'sizes': '192x192',  'href'   : '{PATH}android-chrome-192x192.png{PARAM}'},
                {'tag': 'link', 'rel'       : 'icon',                       'type'   : 'image/png',    'sizes': '228x228',  'href'   : '{PATH}coast-228x228.png{PARAM}'},
                {'tag': 'link', 'rel'       : 'icon',                       'type'   : 'image/png',    'sizes': '16x16',    'href'   : '{PATH}favicon-16x16.png{PARAM}'},
                {'tag': 'link', 'rel'       : 'manifest',                                                                   'href'   : '{PATH}site.webmanifest{PARAM}'},
                {'tag': 'link', 'rel'       : 'mask-icon',                  'color'  : '{COLOR}',                           'href'   : '{PATH}safari-pinned-tab.svg{PARAM}'},
                {'tag': 'link', 'rel'       : 'shortcut icon',                                                              'href'   : '{PATH}favicon.ico{PARAM}'},
                {'tag': 'link', 'rel'       : 'yandex-tableau-widget',                                                      'href'   : '{PATH}yandex-browser-manifest.json{PARAM}'},

                {'tag': 'meta', 'property'  : 'og:image',                   'content': '{PATH}open-graph.png{PARAM}'},
                {'tag': 'meta', 'name'      : 'apple-mobile-web-app-title', 'content': '{OWNER}'},
                {'tag': 'meta', 'name'      : 'application-name',           'content': '{OWNER}'},
                {'tag': 'meta', 'name'      : 'msapplication-TileColor',    'content': '{COLOR}'},
                {'tag': 'meta', 'name'      : 'msapplication-TileImage',    'content': '{PATH}mstile-144x144.png{PARAM}'},
                {'tag': 'meta', 'name'      : 'msapplication-config',       'content': '{PATH}browserconfig.xml{PARAM}'},
                {'tag': 'meta', 'name'      : 'theme-color',                'content': '{COLOR}'}
            ];

        //Create date-str as YYYYMMDD
        function pad( nr ){ nr = ''+nr; if (nr.length < 2) nr = '0'+nr; return nr; }
        var date = new Date(),
            yyymmdd = pad(date.getFullYear()) + pad(date.getMonth()) + pad(date.getDate()),

            //Get color = value of css-var --fcoo-app-base-color
            root = document.querySelector(':root'),
            color = window.getComputedStyle(root).getPropertyValue('--fcoo-app-base-color');

        //values = {id:value} replacing id with value in meta and favicon
        var values = {
            '{PATH}' : ns.path.assetsDataFileName('favicon', logo) + '/',
            '{OWNER}': owner.toUpperCase(),
            '{COLOR}': color || '#3f5b58',
            '{PARAM}': '?v='+ yyymmdd
        };

        //Updates metaList and faviconList
        tagList.forEach( (opt, index) => {
            for (var id in opt){
                var value = opt[id];
                for (var valuesId in values)
                    value = value.replace(valuesId, values[valuesId]);
                opt[id] = value;
            }
            tagList[index] = opt;
        });


        var head = document.getElementsByTagName('head')[0];

        //Add meta-tags and favicons
        tagList.forEach( (opt) => {
            var link = document.createElement(opt.tag);
            for (var id in opt)
                if (id != 'tag')
                    link.setAttribute(id, opt[id]);
            head.appendChild(link);
        });
    };

}(jQuery, this, document));