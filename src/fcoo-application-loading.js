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
