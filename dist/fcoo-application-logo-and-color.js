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

Load logos and sets css-var
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
}(jQuery, this, document));
