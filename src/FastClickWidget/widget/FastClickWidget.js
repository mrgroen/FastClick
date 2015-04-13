/*jslint white:true, nomen: true, plusplus: true */
/*global mx, define, require, browser, devel, console, window, document, setTimeout, $ */
/*mendix */
/*
    FastClickWidget
    ========================

    @file      : FastClickWidget.js
    @version   : 1.0
    @author    : Marcus Groen
    @date      : Wed, 08 Apr 2015 11:21:00 GMT
    @copyright : Incentro
    @license   : Apache 2

    Documentation
    ========================
    Describe your widget here.
*/

require({
    packages: [{ name: 'fastclick', location: '../../widgets/FastClickWidget/lib', main: 'fastclick' }]
}, [
    'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/dom-construct', 'dojo/_base/array', 'dojo/_base/lang', 'dojo/text',
    'fastclick'
], function (declare, _WidgetBase, dom, dojoDom, domQuery, domProp, domGeom, domClass, domStyle, domConstruct, dojoArray, lang, text, fastclick) {
    'use strict';
    
    // Declare widget's prototype.
    return declare('FastClickWidget.widget.FastClickWidget', [ _WidgetBase ], {

        // Parameters configured in the Modeler.
        mfToExecute: "",
        messageString: "",
        backgroundColor: "",

        // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
        _handle: null,
        _contextObj: null,
        _objProperty: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function () {
            this._objProperty = {};
            if (window.FastClick) { window.FastClick = fastclick; }
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function () {
            //console.log(this.id + '.postCreate');

            // wait for libs
            var waitForFastClickLibs = lang.hitch(this, function () {
                if(typeof $ !== "undefined" && typeof window.FastClick !== "undefined"){
                    // attach FastClick
                    $(document).ready(function(){
                        console.log('window.FastClick.attach(document.body);');
                        window.FastClick.attach(document.body);
                    });
                } else {
                    setTimeout(waitForFastClickLibs,250);
                }
            });
            setTimeout(waitForFastClickLibs,250);
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function (obj, callback) {
            //console.log(this.id + '.update');

            callback();
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable: function () {

        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable: function () {

        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize: function (box) {

        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function () {
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        }
    });
});
