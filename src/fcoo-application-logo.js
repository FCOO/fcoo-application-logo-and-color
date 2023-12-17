/****************************************************************************
fcoo-application-logo.js

Load logos, sets css-var, and write logo etc. in console
****************************************************************************/
(function ($, window/*, document, undefined*/) {
	"use strict";

    //Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {}/*,
        nsColor = ns.color = ns.color || {}*/;

    //Set modernizr-test 'logo-portrait' off
    $('html').modernizrOff('logo-portrait');

    function logoExists( img, fileName, fileNamePostfix){
        ns.path.setAssetsDataFileNameAsCssVar('fcoo-app-logo' + fileNamePostfix + '-url', 'logos', fileName);
        $('html').modernizrToggle('logo-portrait', img.height > img.width);

        //Set internal css-var _fcoo-app-logo-wh-ratio
        ns.setRootVar('--_fcoo-app-logo-wh-ratio', img.width / img.height);
    }

    /********************************************************
    ns.setApplicationLogo( fileNamePrefix )
    ********************************************************/
    ns.setApplicationLogo = function( fileNamePrefix ){
        //First set fab-text-color-is-white (=fcoo-app-base-text-color-is-white)
        var fcooAppBaseTextColor = ns.getRootVar('fcoo-app-base-text-color') || '#ffffff',
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
    ns.consoleApplicationLogo(logoText,  textList = [] )
    Write the logo and strings in textList in console
    ********************************************************/
    /* eslint-disable no-console, no-constant-condition*/
    ns.consoleApplicationLogo = function(logoText, textList = [] ){
        const allLetters = [
                '   ###    ########   ######   ########  ########  ########   ######   ##     ## ####            ##  ##    ##  ##        ##     ## ##    ##   #######  ########   #######  ########   ######   ########  ##     ## ##     ## ##      ####     ## ##    ##  ########    ##       #######   #######  ##        ########   #######  ########   #######   #######    #####           ',
                '  ## ##   ##     ## ##    ##  ##     ## ##        ##        ##    ##  ##     ##  ##             ##  ##   ##   ##        ###   ### ###   ##  ##     ## ##     ## ##     ## ##     ## ##    ##     ##     ##     ## ##     ## ##  ##  ## ##   ##   ##  ##        ##   ####      ##     ## ##     ## ##    ##  ##        ##     ## ##    ##  ##     ## ##     ##  ##   ##          ',
                ' ##   ##  ##     ## ##        ##     ## ##        ##        ##        ##     ##  ##             ##  ##  ##    ##        #### #### ####  ##  ##     ## ##     ## ##     ## ##     ## ##           ##     ##     ## ##     ## ##  ##  ##  ## ##     ####        ##      ##             ##        ## ##    ##  ##        ##            ##    ##     ## ##     ## ##     ##         ',
                '##     ## ########  ##        ##     ## ######    ######    ##   #### #########  ##             ##  #####     ##        ## ### ## ## ## ##  ##     ## ########  ##     ## ########   ######      ##     ##     ## ##     ## ##  ##  ##   ###       ##        ##       ##       #######   #######  ##    ##  #######   ########     ##      #######   ######## ##     ## ####### ',
                '######### ##     ## ##        ##     ## ##        ##        ##    ##  ##     ##  ##       ##    ##  ##  ##    ##        ##     ## ##  ####  ##     ## ##        ##  ## ## ##   ##         ##     ##     ##     ##  ##   ##  ##  ##  ##  ## ##      ##       ##        ##      ##               ## #########       ##  ##     ##   ##      ##     ##        ## ##     ##         ',
                '##     ## ##     ## ##    ##  ##     ## ##        ##        ##    ##  ##     ##  ##       ##    ##  ##   ##   ##        ##     ## ##   ###  ##     ## ##        ##    ##  ##    ##  ##    ##     ##     ##     ##   ## ##   ##  ##  ## ##   ##     ##      ##         ##      ##        ##     ##       ##  ##    ##  ##     ##   ##      ##     ## ##     ##  ##   ##          ',
                '##     ## ########   ######   ########  ########  ##         ######   ##     ## ####       ######   ##    ##  ########  ##     ## ##    ##   #######  ##         ##### ## ##     ##  ######      ##      #######     ###     ###  ### ##     ##    ##     ########  ######    #########  #######        ##   ######    #######    ##       #######   #######    #####           '
            ];
        const allLettersStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-';

        var letters = {};
        for (var i=0; i<allLettersStr.length; i++){
            let letter = allLettersStr[i],
                letterArray = letters[letter] = [];
            for (var j=0; j<allLetters.length; j++)
                letterArray.push(allLetters[j].substring(i*10, i*10+10).trimEnd());

            let width = 0;
            for (j=0; j<allLetters.length; j++)
                width = Math.max(width, letterArray[j].length);
            for (j=0; j<allLetters.length; j++)
                letterArray[j] = letterArray[j].padEnd(width, ' ').replaceAll('#', '█') + '  ';
        }

        let space = letters['SPACE'] = [];
        for (i=0; i<allLetters.length; i++)
            space.push('      ');

        let text = logoText.toUpperCase();

        let ownerLogoAndText = [];
        let firstChar = true;
        for (i=0; i<text.length; i++){
            let letterArray = letters[text[i]] || letters['SPACE'];
            for (j=0; j<letterArray.length; j++){
             if (firstChar)
                    ownerLogoAndText.push('');
                ownerLogoAndText[j] = ownerLogoAndText[j] + letterArray[j];
            }
            firstChar = false;
        }

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

}(jQuery, this, document));


/*
   ###    ########   ######   ########  ########  ########   ######   ##     ## ####            ##  ##    ##  ##        ##     ## ##    ##   #######  ########   #######  ########   ######   ########  ##     ## ##     ## ##      ####     ## ##    ##  ########    ##       #######   #######  ##        ########   #######  ########   #######   #######    #####
  ## ##   ##     ## ##    ##  ##     ## ##        ##        ##    ##  ##     ##  ##             ##  ##   ##   ##        ###   ### ###   ##  ##     ## ##     ## ##     ## ##     ## ##    ##     ##     ##     ## ##     ## ##  ##  ## ##   ##   ##  ##        ##   ####      ##     ## ##     ## ##    ##  ##        ##     ## ##    ##  ##     ## ##     ##  ##   ##
 ##   ##  ##     ## ##        ##     ## ##        ##        ##        ##     ##  ##             ##  ##  ##    ##        #### #### ####  ##  ##     ## ##     ## ##     ## ##     ## ##           ##     ##     ## ##     ## ##  ##  ##  ## ##     ####        ##      ##             ##        ## ##    ##  ##        ##            ##    ##     ## ##     ## ##     ##
##     ## ########  ##        ##     ## ######    ######    ##   #### #########  ##             ##  #####     ##        ## ### ## ## ## ##  ##     ## ########  ##     ## ########   ######      ##     ##     ## ##     ## ##  ##  ##   ###       ##        ##       ##       #######   #######  ##    ##  #######   ########     ##      #######   ######## ##     ## #######
######### ##     ## ##        ##     ## ##        ##        ##    ##  ##     ##  ##       ##    ##  ##  ##    ##        ##     ## ##  ####  ##     ## ##        ##  ## ## ##   ##         ##     ##     ##     ##  ##   ##  ##  ##  ##  ## ##      ##       ##        ##      ##               ## #########       ##  ##     ##   ##      ##     ##        ## ##     ##
##     ## ##     ## ##    ##  ##     ## ##        ##        ##    ##  ##     ##  ##       ##    ##  ##   ##   ##        ##     ## ##   ###  ##     ## ##        ##    ##  ##    ##  ##    ##     ##     ##     ##   ## ##   ##  ##  ## ##   ##     ##      ##         ##      ##        ##     ##       ##  ##    ##  ##     ##   ##      ##     ## ##     ##  ##   ##
##     ## ########   ######   ########  ########  ##         ######   ##     ## ####       ######   ##    ##  ########  ##     ## ##    ##   #######  ##         ##### ## ##     ##  ######      ##      #######     ###     ###  ### ##     ##    ##     ########  ######    #########  #######        ##   ######    #######    ##       #######   #######    #####
*/