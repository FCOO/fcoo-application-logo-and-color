/****************************************************************************
	fcoo-web-pages.js,

	(c) 2023, FCOO

	https://github.com/FCOO/fcoo-web-pages
	https://github.com/FCOO

****************************************************************************/

(function ($, window, document/*, undefined*/) {
	"use strict";

	//Create fcoo-namespace
    var ns = window.fcoo = window.fcoo || {};
    var $html = $('html');
    var $body = $('body');

    ns.setApplicationLogo('fcoo');

    /**********************************************************************
    ***********************************************************************
    METHODS FOR CREATING <META> IN <HEAD> AND WRITING FCOO-LOGO IN CONSOLE
    ***********************************************************************
    **********************************************************************/
    var metaList = [
	        {'charset': "utf-8"},
            {'http-equiv': 'x-dns-prefetch-control', 'content': 'on'},
            {'name': 'viewport',                     'content': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
            {'name': 'copyright',                    'content': 'fcoo.dk'},
            {'name': 'google',                       'content': 'notranslate'}
        ];

    var faviconList = [
            {'tag': 'link', 'rel': 'apple-touch-icon', 'sizes': '180x180',                          'href'   : '{PATH}apple-touch-icon.png{PARAM}'},
            {'tag': 'link', 'rel': 'icon',              'type': 'image/png', 'sizes': '32x32',      'href'   : '{PATH}favicon-32x32.png{PARAM}'},
            {'tag': 'link', 'rel': 'icon',              'type': 'image/png', 'sizes': '230x230',    'href'   : '{PATH}favicon-230x230.png{PARAM}'},
            {'tag': 'link', 'rel': 'icon',              'type': 'image/png', 'sizes': '192x192',    'href'   : '{PATH}android-chrome-192x192.png{PARAM}'},
            {'tag': 'link', 'rel': 'icon',              'type': 'image/png', 'sizes': '228x228',    'href'   : '{PATH}coast-228x228.png{PARAM}'},
            {'tag': 'link', 'rel': 'icon',              'type': 'image/png', 'sizes': '16x16',      'href'   : '{PATH}favicon-16x16.png{PARAM}'},
            {'tag': 'link', 'rel': 'manifest',                                                      'href'   : '{PATH}site.webmanifest{PARAM}'},
            {'tag': 'link', 'rel': 'mask-icon',         'color': '{COLOR}',                         'href'   : '{PATH}safari-pinned-tab.svg{PARAM}'},
            {'tag': 'link', 'rel': 'shortcut icon',                                                 'href'   : '{PATH}favicon.ico{PARAM}'},
            {'tag': 'link', 'rel': 'yandex-tableau-widget',                                         'href'   : '{PATH}yandex-browser-manifest.json{PARAM}'},
            {'tag': 'meta',                             'property': 'og:image',                     'content': '{PATH}open-graph.png{PARAM}'},
            {'tag': 'meta', 'name': 'apple-mobile-web-app-title',                                   'content': 'FCOO.dk'},
            {'tag': 'meta', 'name': 'application-name',                                             'content': 'FCOO.dk'},
            {'tag': 'meta', 'name': 'msapplication-TileColor',                                      'content': '{COLOR}'},
            {'tag': 'meta', 'name': 'msapplication-TileImage',                                      'content': '{PATH}mstile-144x144.png{PARAM}'},
            {'tag': 'meta', 'name': 'msapplication-config',                                         'content': '{PATH}browserconfig.xml{PARAM}'},
            {'tag': 'meta', 'name': 'theme-color',                                                  'content': '{COLOR}'}
        ];

    //Add title
    document.title = 'FCOO';

    //Create date-str as YYYYMMDD
    function pad( nr ){ nr = ''+nr; if (nr.length < 2) nr = '0'+nr; return nr; }
    var date = new Date();
    var values = {
            '{PATH}' : '/assets/favicon/',
            '{COLOR}': '#3f5b58',
            '{PARAM}': '?v='+ pad(date.getFullYear()) + pad(date.getMonth()) + pad(date.getDate())
        }
    //Updates faviconList
    faviconList.forEach( (opt, index) => {
        for (var id in opt){
            var value = opt[id];
            for (var valuesId in values)
                value = value.replace(valuesId, values[valuesId]);
            opt[id] = value;
        }
        faviconList[index] = opt;
    });

    //******************************************************************************







    //******************************************************************************
    // ns.setMeta(name, content)
    ns.setMeta = function(name, content){
        var link = document.createElement('meta');
        link.name = name;
        link.content = content;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    //******************************************************************************
    function updateHead(){
        var head = document.getElementsByTagName('head')[0];

        //Add meta-tags
        metaList.forEach( (opt) => {
            var link = document.createElement('meta');
            for (var id in opt)
                link.setAttribute(id, opt[id]);
            head.appendChild(link);
        });

        //Add favicon
        faviconList.forEach( (opt) => {
            var link = document.createElement(opt.tag);
            for (var id in opt)
                if (id != 'tag')
                    link.setAttribute(id, opt[id]);
            head.appendChild(link);
        });
    }
    //******************************************************************************

    document.addEventListener("DOMContentLoaded", updateHead, false);


    /**********************************************************************
    ***********************************************************************
    METHODS FOR CREATING CONTENT AND LOADING CONTENT FROM MD-FILE
    ***********************************************************************
    **********************************************************************/

    /******************************************************
    createLinkImg( options )
    ******************************************************/
    function createLinkImg( options ){
        function getValue(id){
            if (options.lang)
                return options[id+'_'+options.lang] || options[id+'_da'] || options[id] || '';
            else
                return options[id] || '';
        }
        var $result = $('<a/>').addClass( getValue('aClass') );
        if (getValue('href'))
            $result.attr('href', getValue('href'));

        $('<img/>')
            .attr('src', '/assets/logos/' + options.src)
            .addClass(getValue('class'))
            .attr('lang', options.lang || '')
            .appendTo( $result );

        return $result;
    }

    /******************************************************
    setLang
    ******************************************************/
    function setLang( newLang='da' ){
        var $html  = $('html'),
            href   = document.location.href,
            url    = new URL(href),
            params = new URLSearchParams(url.search),
            title;

        newLang = newLang.toLowerCase() ;
        if ((newLang == 'da') || (newLang == 'en')){
            $html.attr('lang', newLang );
            title = newLang == 'da' ? ns.headerDA : ns.headerEN || ns.headerDA;
            title = 'FCOO.dk - '+ title;
            document.title = title;

            //Update ?lang=...
            params.set("lang", newLang);
            href = href.split('?')[0] + '?' + params.toString();
            window.history.replaceState("stateObj", title, href);
        }
    };

    /******************************************************
    changeLang
    ******************************************************/
    function changeLang(){
        var currentLang = $('html').attr('lang') || 'en';
        setLang( currentLang == 'da' ? 'en' : 'da' );
    };


    /******************************************************
    Scroll-position
    From https://pqina.nl/blog/applying-styles-based-on-the-user-scroll-position-with-smart-css/
    ******************************************************/
    // Reads out the scroll position and stores it in the data attribute
    // so we can use it in our stylesheets
    const storeScroll = () => {
        document.documentElement.dataset.scroll = window.scrollY;
    };

    // Listen for new scroll events
    document.addEventListener('scroll', storeScroll);

    // Update scroll position for first time
    storeScroll();


    //Toggle html-class 'scrollbar-visible'
    $body.resize( (e) => {
        $html.toggleClass('scrollbar-visible', document.body.scrollHeight > window.innerHeight);
    });


    /******************************************************
    init
    ******************************************************/
    window.init = function(headerDA, headerEN, mdFileName){
        ns.headerDA = headerDA;
        ns.headerEN = headerEN;

        if (ns.centerConsole){
            if (ns.headerDA)
                ns.centerConsole(ns.headerDA);

            if (ns.headerEN && (ns.headerEN != ns.headerDA))
                ns.centerConsole(ns.headerEN);
        }

        /***********************************
        Save content in $content
        ***********************************/
        var $content = $('<div/>').addClass('content container');
        $body.children().each( function(index, elem){
            var tagName = elem.tagName;
            if ((tagName != 'SCRIPT') && (tagName != 'STYLE'))
                $(elem).detach().appendTo($content);
        });

        /***********************************
        Header
        ***********************************/
        var $headerContainer = $('<header/>').appendTo($body),
            $header =
                $('<div/>')
                    .addClass('container header d-flex flex-row justify-content-between align-items-center')
                    .appendTo($headerContainer),
            $logoContainer = $('<div/>').appendTo($header);
        //Append logos
        [{src: 'fmi_dk80pix.svg',   class: 'logo-da',    aClass: 'logo-container',       lang:'da'},
         {src: 'dalo_uk80pix.svg',  class: 'logo-en',    aClass: 'logo-container',       lang:'en'},
         {src: 'fmn_graa_logo.svg', class: 'small-logo', aClass: 'small-logo-container', lang:'da'},
         {src: 'fmn_graa_logo.svg', class: 'small-logo', aClass: 'small-logo-container', lang:'en'}].forEach( (imgOpt) => {

            createLinkImg({
                "src"       : imgOpt.src,
                "class"     : imgOpt.class,
                "aClass"    : imgOpt.aClass,
                "href_da"   : 'https://www.fmi.dk/',
                "href_en"   : 'https://www.fmi.dk/en/',
                "lang"      : imgOpt.lang
            }).appendTo($logoContainer);
        });

        //Links to change language
        $('<a>English</a>')
            .attr('lang', 'da')
            .addClass('lang-link')
            .on('click', changeLang)
            .appendTo($header);

        $('<a>Dansk</a>')
            .attr('lang', 'en')
            .addClass('lang-link')
            .on('click', changeLang)
            .appendTo($header);


        //Header
        $('<h1>'+headerDA+'</h1>')
            .attr('lang', 'da')
            .addClass('container')
            .appendTo($body);

        $('<h1>'+(headerEN || headerDA)+'</h1>')
            .attr('lang', 'en')
            .addClass('container')
            .appendTo($body);


        /***********************************
        Content
        ***********************************/
        $body.append( $content );

        /***********************************
        Load content  from markdown-file (if any)
        ***********************************/
        if (mdFileName){
            $appendAfter = $content;
            loadAndAppendMarkdown(mdFileName );
        }


        /***********************************
        Footer
        ***********************************/
        var $footer = $('<div/>').addClass('container footer d-flex flex-row flex-wrap').appendTo($body),
            $row;

        function addTitle( titleDA, titleEN ){
            $('<div/>').addClass('title').attr('lang','da').text(titleDA).appendTo($row);
            $('<div/>').addClass('title').attr('lang','en').text(titleEN).appendTo($row);
        }

        //Create three columns: Contact, Links, Follow on FB
        var rowClass = 'block col-12 col-lg-4 d-flex flex-column footer-row ';
        $row = $('<div/>').addClass(rowClass + 'd-flex flex-column').appendTo($footer);
        addTitle('Kontakt', 'Contact');

        $('<a class="fcoo-app-standard-logo" href="https://www.fmi.dk/da/forsvarets-center-for-operativ-oceanografi/"/>').appendTo($row);
        createLinkImg({
            "src"       : 'FCOO.svg',
            "class"     : 'fcoo-logo',
            "aClass"    : 'fcoo-logo-container',
            "href"      : 'https://www.fmi.dk/da/forsvarets-center-for-operativ-oceanografi/'
        }).appendTo($row);

        [ {da: 'Forsvarets Center for Operativ Oceanografi',        en: 'Defence Centre for Operational Oceanography',                      newLineBefore: true, bold: true },
          {da: 'Forsvarsministeriets Materiel- og Indkøbsstyrelse', en: 'Danish Ministry of Defence Acquisition and Logistics Organisation'                                 },
          {da: 'Lautrupbjerg 1-5'},
          {da: '2750 Ballerup', en: 'DK-2750 Ballerup'},
          {
            da: 'E-mail:&nbsp;<a class="link" tabindex="0" href="mailto: info@fcoo.dk">info@fcoo.dk</a>',
            en:  'Email:&nbsp;<a class="link" tabindex="0" href="mailto: info@fcoo.dk">info@fcoo.dk</a>',
            newLineBefore: true
          }
        ].forEach( (opt) => {
            var $span = $('<span/>').addClass('description horizontal').toggleClass('first', !!opt.newLineBefore).toggleClass('fw-semibold', !!opt.bold).html(opt.da).appendTo($row);
            if (opt.en){
                $span.attr('lang', 'da');
                $span.clone().attr('lang', 'en').html(opt.en).appendTo($row);
            }

        });

        //Shortcuts
        $row = $('<div/>').addClass(rowClass).appendTo($footer);
        addTitle('Genveje', 'Shortcuts');
        [
          {da: 'Sejladsudsigt', en: 'Information for Mariners', linkDA: 'https://app.fcoo.dk/ifm-maps',  linkEN: 'https://app.fcoo.dk/ifm-maps/?lang=en'},
          {da: 'Om Sejladsudsigt', en: 'About Information for Mariners (only in Danish)', linkDA: 'https://www.fmi.dk/da/forsvarets-center-for-operativ-oceanografi/sejladsudsigt/'},
          {da: 'Om FCOO', en: 'About FCOO (only in Danish)',    linkDA: 'https://www.fmi.dk/da/forsvarets-center-for-operativ-oceanografi/om-fcoo/'},

        ].forEach( (opt, index) => {
            $('<a/>').addClass('description link').toggleClass('first', !!index).attr('lang', 'da').text(opt.da).attr('href', opt.linkDA).appendTo($row);
            $('<a/>').addClass('description link').toggleClass('first', !!index).attr('lang', 'en').text(opt.en).attr('href', opt.linkEN || opt.linkDA).appendTo($row);

        });

        //Follow
        $row = $('<div/>').addClass(rowClass).appendTo($footer);
        addTitle('Følg Forsvarets Center for Operativ Oceanografi', 'Follow Defence Centre for Operational Oceanography');

        var $div = $('<div/>').addClass('horizontal').appendTo($row);
        $div .append('<span class="d-inline-block"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path></svg></span>');
        $('<a/>')
            .addClass('description link d-inline-block')
            .text('Facebook')
            .css({
                'font-size'  : '16px',
                'margin-left': '16px'
            })
            .attr('href', 'https://www.facebook.com/fcoodk/')
            .appendTo($div);


        /***********************************
        Page bottom (Below footer)
        ***********************************/
        $('<div/>').addClass('page-bottom').appendTo($body);


    };

    /**********************************************************************
    ***********************************************************************
    METHODS FOR LOADING CONTENT FROM MD-FILE
    ***********************************************************************
    **********************************************************************/
    var $appendAfter;
    function loadAndAppendMarkdown( fileName ){
        window.Promise.getText(fileName, {resolve: resolve, reject: reject});
    }

    function resolve( content ){
        var showDownExtensions = [];
        function addExtension( name, ext ){
            window.showdown.extension(name, ext);
            showDownExtensions.push(name);
        }
        /***********************************
        Add showdoen extensions
        ***********************************/
        /*
        //Add extentions to add default class-names to tags.
        var classMap = {
            table: 'table table-striped table-hover table-bordered table-responsive',
            h1    : 'd-none', //Hide header
            //td   : 'text-nowrap'
        };
        addExtension('bindings',
                Object.keys(classMap).map(function( key ){
                    return {
                        type: 'output',
                        regex: new RegExp('<'+key , 'g'),
                        replace: '<' + key + ' class="' + classMap[key] + '"'
                    };
                })
        );
        */

        addExtension('daEnd',       {type: 'output', regex: /<\/da>/g,  replace: '</span>'          });
        addExtension('daTarget',    {type: 'output', regex: /<da>/g,    replace: '<span lang="da">' });
        addExtension('enEnd',       {type: 'output', regex: /<\/en>/g,  replace: '</span>'          });
        addExtension('enTarget',    {type: 'output', regex: /<en>/g,    replace: '<span lang="en">' });


        /***********************************
        Create showdown
        ***********************************/
        var converter = new window.showdown.Converter({
                extensions                          : showDownExtensions,

                noHeaderId                          : true, //Disable the automatic generation of header ids. Setting to true overrides prefixHeaderId
                simplifiedAutoLink                  : true, //Enable automatic linking in plain text urls
                excludeTrailingPunctuationFromURLs  : true, //Excludes trailing punctuation from autolinked urls
                literalMidWordUnderscores           : true, //Treats underscores in middle of words as literal characters
                strikethrough                       : true, //Enable support for strikethrough syntax
                tables                              : true, //Enable support for tables syntax
                takslists                           : true, //Enable support for GFM takslists
                ghMentions                          : true, //Enable support for github @mentions
                simpleLineBreaks                    : true, //Parse line breaks as <br/> in paragraphs (like GitHub does)
                omitExtraWLInCodeBlocks             : true  //Omit the trailing newline in a code block

            });

//            this.converter.setOption('url', this.options.url);

        $appendAfter.append( converter.makeHtml( content ) );
    }

    function reject( error ){
        $appendAfter.append(
            '<h2  class="error" lang="da">*** FEJL ***</h2>',
            '<div class="error" lang="da">Kunne ikke læse <code>'+ error.url+'</code></div>',
            '<h2  class="error" lang="en">*** ERROR ***</h2>',
            '<div class="error" lang="en">Unable to read <code>'+ error.url+'</code></div>'
        );
    }

	/******************************************
	Initialize/ready
	*******************************************/
	$(function() {
        setLang( new URLSearchParams(location.search).get('lang') || '' );
	});
	//******************************************

}(jQuery, this, document));