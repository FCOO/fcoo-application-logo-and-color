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
