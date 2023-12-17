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
            color = ns.getRootVar('--fcoo-app-base-color');

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