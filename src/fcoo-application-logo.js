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
