/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/assets/canvasjs.min.js":
/*!******************************************!*\
  !*** ./resources/assets/canvasjs.min.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/*
 CanvasJS HTML5 & JavaScript Charts - v3.0.5 GA - https://canvasjs.com/ 
 Copyright 2020 fenopix

  --------------------- License Information --------------------
 CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
     https://canvasjs.com/license/

*/
/*eslint-disable*/
/*jshint ignore:start*/
(function () {
  function oa(k, l) {
    k.prototype = db(l.prototype);
    k.prototype.constructor = k;
    k.base = l.prototype;
  }
  function db(k) {
    function l() {}
    l.prototype = k;
    return new l();
  }
  function Wa(k, l, v) {
    "millisecond" === v ? k.setMilliseconds(k.getMilliseconds() + 1 * l) : "second" === v ? k.setSeconds(k.getSeconds() + 1 * l) : "minute" === v ? k.setMinutes(k.getMinutes() + 1 * l) : "hour" === v ? k.setHours(k.getHours() + 1 * l) : "day" === v ? k.setDate(k.getDate() + 1 * l) : "week" === v ? k.setDate(k.getDate() + 7 * l) : "month" === v ? k.setMonth(k.getMonth() + 1 * l) : "year" === v && k.setFullYear(k.getFullYear() + 1 * l);
    return k;
  }
  function X(k, l) {
    var v = !1;
    0 > k && (v = !0, k *= -1);
    k = "" + k;
    for (l = l ? l : 1; k.length < l;) k = "0" + k;
    return v ? "-" + k : k;
  }
  function Ga(k) {
    if (!k) return k;
    k = k.replace(/^\s\s*/, "");
    for (var l = /\s/, v = k.length; l.test(k.charAt(--v)););
    return k.slice(0, v + 1);
  }
  function Ca(k) {
    k.roundRect = function (k, v, s, t, ra, E, w, F) {
      w && (this.fillStyle = w);
      F && (this.strokeStyle = F);
      "undefined" === typeof ra && (ra = 5);
      this.lineWidth = E;
      this.beginPath();
      this.moveTo(k + ra, v);
      this.lineTo(k + s - ra, v);
      this.quadraticCurveTo(k + s, v, k + s, v + ra);
      this.lineTo(k + s, v + t - ra);
      this.quadraticCurveTo(k + s, v + t, k + s - ra, v + t);
      this.lineTo(k + ra, v + t);
      this.quadraticCurveTo(k, v + t, k, v + t - ra);
      this.lineTo(k, v + ra);
      this.quadraticCurveTo(k, v, k + ra, v);
      this.closePath();
      w && this.fill();
      F && 0 < E && this.stroke();
    };
  }
  function Qa(k, l) {
    return k - l;
  }
  function Q(k) {
    var l = ((k & 16711680) >> 16).toString(16),
      v = ((k & 65280) >> 8).toString(16);
    k = ((k & 255) >> 0).toString(16);
    l = 2 > l.length ? "0" + l : l;
    v = 2 > v.length ? "0" + v : v;
    k = 2 > k.length ? "0" + k : k;
    return "#" + l + v + k;
  }
  function eb(k, l) {
    var v = this.length >>> 0,
      s = Number(l) || 0,
      s = 0 > s ? Math.ceil(s) : Math.floor(s);
    for (0 > s && (s += v); s < v; s++) if (s in this && this[s] === k) return s;
    return -1;
  }
  function s(k) {
    return null === k || "undefined" === typeof k;
  }
  function Da(k) {
    k.indexOf || (k.indexOf = eb);
    return k;
  }
  function fb(k) {
    if (J.fSDec) k[Y("`eeDwdouMhrudods")](Y("e`u`@ohl`uhnoHuds`uhnoDoe"), function () {
      J._fTWm && J._fTWm(k);
    });
  }
  function Xa(k, l, v) {
    v = v || "normal";
    var s = k + "_" + l + "_" + v,
      t = Ya[s];
    if (isNaN(t)) {
      try {
        k = "position:absolute; left:0px; top:-20000px; padding:0px;margin:0px;border:none;white-space:pre;line-height:normal;font-family:" + k + "; font-size:" + l + "px; font-weight:" + v + ";";
        if (!wa) {
          var ra = document.body;
          wa = document.createElement("span");
          wa.innerHTML = "";
          var E = document.createTextNode("Mpgyi");
          wa.appendChild(E);
          ra.appendChild(wa);
        }
        wa.style.display = "";
        wa.setAttribute("style", k);
        t = Math.round(wa.offsetHeight);
        wa.style.display = "none";
      } catch (w) {
        t = Math.ceil(1.1 * l);
      }
      t = Math.max(t, l);
      Ya[s] = t;
    }
    return t;
  }
  function N(k, l) {
    var v = [];
    if (v = {
      solid: [],
      shortDash: [3, 1],
      shortDot: [1, 1],
      shortDashDot: [3, 1, 1, 1],
      shortDashDotDot: [3, 1, 1, 1, 1, 1],
      dot: [1, 2],
      dash: [4, 2],
      dashDot: [4, 2, 1, 2],
      longDash: [8, 2],
      longDashDot: [8, 2, 1, 2],
      longDashDotDot: [8, 2, 1, 2, 1, 2]
    }[k || "solid"]) for (var s = 0; s < v.length; s++) v[s] *= l;else v = [];
    return v;
  }
  function P(k, l, v, s, t) {
    s = s || [];
    t = t || !1;
    s.push([k, l, v, t]);
    return k.addEventListener ? (k.addEventListener(l, v, t), v) : k.attachEvent ? (s = function s(l) {
      l = l || window.event;
      l.preventDefault = l.preventDefault || function () {
        l.returnValue = !1;
      };
      l.stopPropagation = l.stopPropagation || function () {
        l.cancelBubble = !0;
      };
      v.call(k, l);
    }, k.attachEvent("on" + l, s), s) : !1;
  }
  function gb(k) {
    if (k._menuButton) k.exportEnabled ? La(k._menuButton) : ua(k._menuButton);else if (k.exportEnabled && t) {
      var l = !1;
      k._menuButton = document.createElement("button");
      va(k, k._menuButton, "menu");
      k._toolBar.appendChild(k._menuButton);
      P(k._menuButton, "touchstart", function (k) {
        l = !0;
      }, k.allDOMEventHandlers);
      P(k._menuButton, "click", function () {
        "none" !== k._dropdownMenu.style.display || k._dropDownCloseTime && 500 >= new Date().getTime() - k._dropDownCloseTime.getTime() || (k._dropdownMenu.style.display = "block", k._menuButton.blur(), k._dropdownMenu.focus());
      }, k.allDOMEventHandlers, !0);
      P(k._menuButton, "mouseover", function () {
        l || (pa(k, k._menuButton, {
          backgroundColor: k.toolbar.backgroundColorOnHover,
          color: k.toolbar.fontColorOnHover
        }), 0 >= navigator.userAgent.search("MSIE") && pa(k, k._menuButton.childNodes[0], {
          WebkitFilter: "invert(100%)",
          filter: "invert(100%)"
        }));
      }, k.allDOMEventHandlers, !0);
      P(k._menuButton, "mouseout", function () {
        l || (pa(k, k._menuButton, {
          backgroundColor: k.toolbar.backgroundColor,
          color: k.toolbar.fontColor
        }), 0 >= navigator.userAgent.search("MSIE") && pa(k, k._menuButton.childNodes[0], {
          WebkitFilter: "invert(0%)",
          filter: "invert(0%)"
        }));
      }, k.allDOMEventHandlers, !0);
    }
    if (!k._dropdownMenu && k.exportEnabled && t) {
      l = !1;
      k._dropdownMenu = document.createElement("div");
      k._dropdownMenu.setAttribute("tabindex", -1);
      var v = -1 !== k.theme.indexOf("dark") ? "black" : "#888888";
      k._dropdownMenu.style.cssText = "position: absolute; z-index: 1; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; cursor: pointer;right: 0px;top: 25px;min-width: 120px;outline: 0;font-size: 14px; font-family: Arial, Helvetica, sans-serif;padding: 5px 0px 5px 0px;text-align: left;line-height: 10px;background-color:" + k.toolbar.backgroundColor + ";box-shadow: 2px 2px 10px " + v;
      k._dropdownMenu.style.display = "none";
      k._toolBar.appendChild(k._dropdownMenu);
      P(k._dropdownMenu, "blur", function () {
        ua(k._dropdownMenu);
        k._dropDownCloseTime = new Date();
      }, k.allDOMEventHandlers, !0);
      v = document.createElement("div");
      v.style.cssText = "padding: 12px 8px 12px 8px";
      v.innerHTML = k._cultureInfo.printText;
      v.style.backgroundColor = k.toolbar.backgroundColor;
      v.style.color = k.toolbar.fontColor;
      k._dropdownMenu.appendChild(v);
      P(v, "touchstart", function (k) {
        l = !0;
      }, k.allDOMEventHandlers);
      P(v, "mouseover", function () {
        l || (this.style.backgroundColor = k.toolbar.backgroundColorOnHover, this.style.color = k.toolbar.fontColorOnHover);
      }, k.allDOMEventHandlers, !0);
      P(v, "mouseout", function () {
        l || (this.style.backgroundColor = k.toolbar.backgroundColor, this.style.color = k.toolbar.fontColor);
      }, k.allDOMEventHandlers, !0);
      P(v, "click", function () {
        k.print();
        ua(k._dropdownMenu);
      }, k.allDOMEventHandlers, !0);
      v = document.createElement("div");
      v.style.cssText = "padding: 12px 8px 12px 8px";
      v.innerHTML = k._cultureInfo.saveJPGText;
      v.style.backgroundColor = k.toolbar.backgroundColor;
      v.style.color = k.toolbar.fontColor;
      k._dropdownMenu.appendChild(v);
      P(v, "touchstart", function (k) {
        l = !0;
      }, k.allDOMEventHandlers);
      P(v, "mouseover", function () {
        l || (this.style.backgroundColor = k.toolbar.backgroundColorOnHover, this.style.color = k.toolbar.fontColorOnHover);
      }, k.allDOMEventHandlers, !0);
      P(v, "mouseout", function () {
        l || (this.style.backgroundColor = k.toolbar.backgroundColor, this.style.color = k.toolbar.fontColor);
      }, k.allDOMEventHandlers, !0);
      P(v, "click", function () {
        k.exportChart({
          format: "jpeg",
          fileName: k.exportFileName
        });
        ua(k._dropdownMenu);
      }, k.allDOMEventHandlers, !0);
      v = document.createElement("div");
      v.style.cssText = "padding: 12px 8px 12px 8px";
      v.innerHTML = k._cultureInfo.savePNGText;
      v.style.backgroundColor = k.toolbar.backgroundColor;
      v.style.color = k.toolbar.fontColor;
      k._dropdownMenu.appendChild(v);
      P(v, "touchstart", function (k) {
        l = !0;
      }, k.allDOMEventHandlers);
      P(v, "mouseover", function () {
        l || (this.style.backgroundColor = k.toolbar.backgroundColorOnHover, this.style.color = k.toolbar.fontColorOnHover);
      }, k.allDOMEventHandlers, !0);
      P(v, "mouseout", function () {
        l || (this.style.backgroundColor = k.toolbar.backgroundColor, this.style.color = k.toolbar.fontColor);
      }, k.allDOMEventHandlers, !0);
      P(v, "click", function () {
        k.exportChart({
          format: "png",
          fileName: k.exportFileName
        });
        ua(k._dropdownMenu);
      }, k.allDOMEventHandlers, !0);
    }
  }
  function Za(k, l, v) {
    k *= ha;
    l *= ha;
    k = v.getImageData(k, l, 2, 2).data;
    l = !0;
    for (v = 0; 4 > v; v++) if (k[v] !== k[v + 4] | k[v] !== k[v + 8] | k[v] !== k[v + 12]) {
      l = !1;
      break;
    }
    return l ? k[0] << 16 | k[1] << 8 | k[2] : 0;
  }
  function la(k, l, v) {
    return k in l ? l[k] : v[k];
  }
  function Ma(k, l, v) {
    if (t && $a) {
      var s = k.getContext("2d");
      Na = s.webkitBackingStorePixelRatio || s.mozBackingStorePixelRatio || s.msBackingStorePixelRatio || s.oBackingStorePixelRatio || s.backingStorePixelRatio || 1;
      ha = Ra / Na;
      k.width = l * ha;
      k.height = v * ha;
      Ra !== Na && (k.style.width = l + "px", k.style.height = v + "px", s.scale(ha, ha));
    } else k.width = l, k.height = v;
  }
  function hb(k) {
    if (!ib) {
      var l = !1,
        v = !1;
      "undefined" === typeof qa.Chart.creditHref ? (k.creditHref = Y("iuuqr;..b`ow`rkr/bnl."), k.creditText = Y("B`ow`rKR/bnl")) : (l = k.updateOption("creditText"), v = k.updateOption("creditHref"));
      if (k.creditHref && k.creditText) {
        k._creditLink || (k._creditLink = document.createElement("a"), k._creditLink.setAttribute("class", "canvasjs-chart-credit"), k._creditLink.setAttribute("title", "JavaScript Charts"), k._creditLink.setAttribute("style", "outline:none;margin:0px;position:absolute;right:2px;top:" + (k.height - 14) + "px;color:dimgrey;text-decoration:none;font-size:11px;font-family: Calibri, Lucida Grande, Lucida Sans Unicode, Arial, sans-serif"), k._creditLink.setAttribute("tabIndex", -1), k._creditLink.setAttribute("target", "_blank"));
        if (0 === k.renderCount || l || v) k._creditLink.setAttribute("href", k.creditHref), k._creditLink.innerHTML = k.creditText;
        k._creditLink && k.creditHref && k.creditText ? (k._creditLink.parentElement || k._canvasJSContainer.appendChild(k._creditLink), k._creditLink.style.top = k.height - 14 + "px") : k._creditLink.parentElement && k._canvasJSContainer.removeChild(k._creditLink);
      }
    }
  }
  function ta(k, l) {
    Ha && (this.canvasCount |= 0, window.console.log(++this.canvasCount));
    var v = document.createElement("canvas");
    v.setAttribute("class", "canvasjs-chart-canvas");
    Ma(v, k, l);
    t || "undefined" === typeof G_vmlCanvasManager || G_vmlCanvasManager.initElement(v);
    return v;
  }
  function pa(k, l, v) {
    for (var s in v) l.style[s] = v[s];
  }
  function va(k, l, v) {
    l.getAttribute("state") || (l.style.backgroundColor = k.toolbar.backgroundColor, l.style.color = k.toolbar.fontColor, l.style.border = "none", pa(k, l, {
      WebkitUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      userSelect: "none"
    }));
    l.getAttribute("state") !== v && (l.setAttribute("state", v), l.setAttribute("type", "button"), pa(k, l, {
      padding: "5px 12px",
      cursor: "pointer",
      "float": "left",
      width: "40px",
      height: "25px",
      outline: "0px",
      verticalAlign: "baseline",
      lineHeight: "0"
    }), l.setAttribute("title", k._cultureInfo[v + "Text"]), l.innerHTML = "<img style='height:95%; pointer-events: none;' src='" + jb[v].image + "' alt='" + k._cultureInfo[v + "Text"] + "' />");
  }
  function La() {
    for (var k = null, l = 0; l < arguments.length; l++) k = arguments[l], k.style && (k.style.display = "inline");
  }
  function ua() {
    for (var k = null, l = 0; l < arguments.length; l++) (k = arguments[l]) && k.style && (k.style.display = "none");
  }
  function Sa(k, l, v, s, t) {
    if (null === k || "undefined" === typeof k) return "undefined" === typeof v ? l : v;
    k = parseFloat(k.toString()) * (0 <= k.toString().indexOf("%") ? l / 100 : 1);
    "undefined" !== typeof s && (k = Math.min(s, k), "undefined" !== typeof t && (k = Math.max(t, k)));
    return !isNaN(k) && k <= l && 0 <= k ? k : "undefined" === typeof v ? l : v;
  }
  function V(k, l, v, t, w) {
    this._defaultsKey = k;
    this._themeOptionsKey = l;
    this._index = t;
    this.parent = w;
    this._eventListeners = [];
    k = {};
    this.theme && s(this.parent) && s(l) && s(t) ? k = s(this.predefinedThemes[this.theme]) ? this.predefinedThemes.light1 : this.predefinedThemes[this.theme] : this.parent && this.parent.themeOptions && this.parent.themeOptions[l] && (null === t ? k = this.parent.themeOptions[l] : 0 < this.parent.themeOptions[l].length && (t = Math.min(this.parent.themeOptions[l].length - 1, t), k = this.parent.themeOptions[l][t]));
    this.themeOptions = k;
    this.options = v ? v : {
      _isPlaceholder: !0
    };
    this.setOptions(this.options, k);
  }
  function Ea(k, l, v, s, t) {
    "undefined" === typeof t && (t = 0);
    this._padding = t;
    this._x1 = k;
    this._y1 = l;
    this._x2 = v;
    this._y2 = s;
    this._rightOccupied = this._leftOccupied = this._bottomOccupied = this._topOccupied = this._padding;
  }
  function ja(k, l) {
    ja.base.constructor.call(this, "TextBlock", null, l, null, null);
    this.ctx = k;
    this._isDirty = !0;
    this._wrappedText = null;
    this._initialize();
  }
  function Ta(k, l) {
    Ta.base.constructor.call(this, "Toolbar", "toolbar", l, null, k);
    this.chart = k;
    this.canvas = k.canvas;
    this.ctx = this.chart.ctx;
    this.optionsName = "toolbar";
  }
  function ya(k, l) {
    ya.base.constructor.call(this, "Title", "title", l, null, k);
    this.chart = k;
    this.canvas = k.canvas;
    this.ctx = this.chart.ctx;
    this.optionsName = "title";
    if (s(this.options.margin) && k.options.subtitles) for (var v = k.options.subtitles, t = 0; t < v.length; t++) if ((s(v[t].horizontalAlign) && "center" === this.horizontalAlign || v[t].horizontalAlign === this.horizontalAlign) && (s(v[t].verticalAlign) && "top" === this.verticalAlign || v[t].verticalAlign === this.verticalAlign) && !v[t].dockInsidePlotArea === !this.dockInsidePlotArea) {
      this.margin = 0;
      break;
    }
    "undefined" === typeof this.options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
    this.height = this.width = null;
    this.bounds = {
      x1: null,
      y1: null,
      x2: null,
      y2: null
    };
  }
  function Ia(k, l, v) {
    Ia.base.constructor.call(this, "Subtitle", "subtitles", l, v, k);
    this.chart = k;
    this.canvas = k.canvas;
    this.ctx = this.chart.ctx;
    this.optionsName = "subtitles";
    this.isOptionsInArray = !0;
    "undefined" === typeof this.options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
    this.height = this.width = null;
    this.bounds = {
      x1: null,
      y1: null,
      x2: null,
      y2: null
    };
  }
  function Ua() {
    this.pool = [];
  }
  function Ja(k) {
    var l;
    k && Ka[k] && (l = Ka[k]);
    Ja.base.constructor.call(this, "CultureInfo", null, l, null, null);
  }
  var Ha = !1,
    J = {},
    t = !!document.createElement("canvas").getContext,
    qa = {
      Chart: {
        width: 500,
        height: 400,
        zoomEnabled: !1,
        zoomType: "x",
        backgroundColor: "white",
        theme: "light1",
        animationEnabled: !1,
        animationDuration: 1200,
        dataPointWidth: null,
        dataPointMinWidth: null,
        dataPointMaxWidth: null,
        colorSet: "colorSet1",
        culture: "en",
        creditHref: "",
        creditText: "CanvasJS",
        interactivityEnabled: !0,
        exportEnabled: !1,
        exportFileName: "Chart",
        rangeChanging: null,
        rangeChanged: null,
        publicProperties: {
          title: "readWrite",
          subtitles: "readWrite",
          toolbar: "readWrite",
          toolTip: "readWrite",
          legend: "readWrite",
          axisX: "readWrite",
          axisY: "readWrite",
          axisX2: "readWrite",
          axisY2: "readWrite",
          data: "readWrite",
          options: "readWrite",
          bounds: "readOnly",
          container: "readOnly"
        }
      },
      Title: {
        padding: 0,
        text: null,
        verticalAlign: "top",
        horizontalAlign: "center",
        fontSize: 20,
        fontFamily: "Calibri",
        fontWeight: "normal",
        fontColor: "black",
        fontStyle: "normal",
        borderThickness: 0,
        borderColor: "black",
        cornerRadius: 0,
        backgroundColor: t ? "transparent" : null,
        margin: 5,
        wrap: !0,
        maxWidth: null,
        dockInsidePlotArea: !1,
        publicProperties: {
          options: "readWrite",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      Subtitle: {
        padding: 0,
        text: null,
        verticalAlign: "top",
        horizontalAlign: "center",
        fontSize: 14,
        fontFamily: "Calibri",
        fontWeight: "normal",
        fontColor: "black",
        fontStyle: "normal",
        borderThickness: 0,
        borderColor: "black",
        cornerRadius: 0,
        backgroundColor: null,
        margin: 2,
        wrap: !0,
        maxWidth: null,
        dockInsidePlotArea: !1,
        publicProperties: {
          options: "readWrite",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      Toolbar: {
        backgroundColor: "white",
        backgroundColorOnHover: "#2196f3",
        borderColor: "#2196f3",
        borderThickness: 1,
        fontColor: "black",
        fontColorOnHover: "white",
        publicProperties: {
          options: "readWrite",
          chart: "readOnly"
        }
      },
      Legend: {
        name: null,
        verticalAlign: "center",
        horizontalAlign: "right",
        fontSize: 14,
        fontFamily: "calibri",
        fontWeight: "normal",
        fontColor: "black",
        fontStyle: "normal",
        cursor: null,
        itemmouseover: null,
        itemmouseout: null,
        itemmousemove: null,
        itemclick: null,
        dockInsidePlotArea: !1,
        reversed: !1,
        backgroundColor: t ? "transparent" : null,
        borderColor: t ? "transparent" : null,
        borderThickness: 0,
        cornerRadius: 0,
        maxWidth: null,
        maxHeight: null,
        markerMargin: null,
        itemMaxWidth: null,
        itemWidth: null,
        itemWrap: !0,
        itemTextFormatter: null,
        publicProperties: {
          options: "readWrite",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      ToolTip: {
        enabled: !0,
        shared: !1,
        animationEnabled: !0,
        content: null,
        contentFormatter: null,
        reversed: !1,
        backgroundColor: t ? "rgba(255,255,255,.9)" : "rgb(255,255,255)",
        borderColor: null,
        borderThickness: 2,
        cornerRadius: 5,
        fontSize: 14,
        fontColor: "black",
        fontFamily: "Calibri, Arial, Georgia, serif;",
        fontWeight: "normal",
        fontStyle: "italic",
        updated: null,
        hidden: null,
        publicProperties: {
          options: "readWrite",
          chart: "readOnly"
        }
      },
      Axis: {
        minimum: null,
        maximum: null,
        viewportMinimum: null,
        viewportMaximum: null,
        interval: null,
        intervalType: null,
        reversed: !1,
        logarithmic: !1,
        logarithmBase: 10,
        title: null,
        titleFontColor: "black",
        titleFontSize: 20,
        titleFontFamily: "arial",
        titleFontWeight: "normal",
        titleFontStyle: "normal",
        titleWrap: !0,
        titleMaxWidth: null,
        titleBackgroundColor: t ? "transparent" : null,
        titleBorderColor: t ? "transparent" : null,
        titleBorderThickness: 0,
        titleCornerRadius: 0,
        labelAngle: 0,
        labelFontFamily: "arial",
        labelFontColor: "black",
        labelFontSize: 12,
        labelFontWeight: "normal",
        labelFontStyle: "normal",
        labelAutoFit: !0,
        labelWrap: !0,
        labelMaxWidth: null,
        labelFormatter: null,
        labelBackgroundColor: t ? "transparent" : null,
        labelBorderColor: t ? "transparent" : null,
        labelBorderThickness: 0,
        labelCornerRadius: 0,
        labelPlacement: "outside",
        prefix: "",
        suffix: "",
        includeZero: !1,
        tickLength: 5,
        tickColor: "black",
        tickThickness: 1,
        tickPlacement: "outside",
        lineColor: "black",
        lineThickness: 1,
        lineDashType: "solid",
        gridColor: "#A0A0A0",
        gridThickness: 0,
        gridDashType: "solid",
        interlacedColor: t ? "transparent" : null,
        valueFormatString: null,
        margin: 2,
        publicProperties: {
          options: "readWrite",
          stripLines: "readWrite",
          scaleBreaks: "readWrite",
          crosshair: "readWrite",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      StripLine: {
        value: null,
        startValue: null,
        endValue: null,
        color: "orange",
        opacity: null,
        thickness: 2,
        lineDashType: "solid",
        label: "",
        labelPlacement: "inside",
        labelAlign: "far",
        labelWrap: !0,
        labelMaxWidth: null,
        labelBackgroundColor: null,
        labelBorderColor: t ? "transparent" : null,
        labelBorderThickness: 0,
        labelCornerRadius: 0,
        labelFontFamily: "arial",
        labelFontColor: "orange",
        labelFontSize: 12,
        labelFontWeight: "normal",
        labelFontStyle: "normal",
        labelFormatter: null,
        showOnTop: !1,
        publicProperties: {
          options: "readWrite",
          axis: "readOnly",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      ScaleBreaks: {
        autoCalculate: !1,
        collapsibleThreshold: "25%",
        maxNumberOfAutoBreaks: 2,
        spacing: 8,
        type: "straight",
        color: "#FFFFFF",
        fillOpacity: 0.9,
        lineThickness: 2,
        lineColor: "#E16E6E",
        lineDashType: "solid",
        publicProperties: {
          options: "readWrite",
          customBreaks: "readWrite",
          axis: "readOnly",
          autoBreaks: "readOnly",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      Break: {
        startValue: null,
        endValue: null,
        spacing: 8,
        type: "straight",
        color: "#FFFFFF",
        fillOpacity: 0.9,
        lineThickness: 2,
        lineColor: "#E16E6E",
        lineDashType: "solid",
        publicProperties: {
          options: "readWrite",
          scaleBreaks: "readOnly",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      Crosshair: {
        enabled: !1,
        snapToDataPoint: !1,
        color: "grey",
        opacity: null,
        thickness: 2,
        lineDashType: "solid",
        label: "",
        labelWrap: !0,
        labelMaxWidth: null,
        labelBackgroundColor: t ? "grey" : null,
        labelBorderColor: t ? "grey" : null,
        labelBorderThickness: 0,
        labelCornerRadius: 0,
        labelFontFamily: t ? "Calibri, Optima, Candara, Verdana, Geneva, sans-serif" : "calibri",
        labelFontSize: 12,
        labelFontColor: "#fff",
        labelFontWeight: "normal",
        labelFontStyle: "normal",
        labelFormatter: null,
        valueFormatString: null,
        updated: null,
        hidden: null,
        publicProperties: {
          options: "readWrite",
          axis: "readOnly",
          bounds: "readOnly",
          chart: "readOnly"
        }
      },
      DataSeries: {
        name: null,
        dataPoints: null,
        label: "",
        bevelEnabled: !1,
        highlightEnabled: !0,
        cursor: "default",
        indexLabel: "",
        indexLabelPlacement: "auto",
        indexLabelOrientation: "horizontal",
        indexLabelFontColor: "black",
        indexLabelFontSize: 12,
        indexLabelFontStyle: "normal",
        indexLabelFontFamily: "Arial",
        indexLabelFontWeight: "normal",
        indexLabelBackgroundColor: null,
        indexLabelLineColor: "gray",
        indexLabelLineThickness: 1,
        indexLabelLineDashType: "solid",
        indexLabelMaxWidth: null,
        indexLabelWrap: !0,
        indexLabelFormatter: null,
        lineThickness: 2,
        lineDashType: "solid",
        connectNullData: !1,
        nullDataLineDashType: "dash",
        color: null,
        lineColor: null,
        risingColor: "white",
        fallingColor: "red",
        fillOpacity: null,
        startAngle: 0,
        radius: null,
        innerRadius: null,
        neckHeight: null,
        neckWidth: null,
        reversed: !1,
        valueRepresents: null,
        linkedDataSeriesIndex: null,
        whiskerThickness: 2,
        whiskerDashType: "solid",
        whiskerColor: null,
        whiskerLength: null,
        stemThickness: 2,
        stemColor: null,
        stemDashType: "solid",
        upperBoxColor: "white",
        lowerBoxColor: "white",
        type: "column",
        xValueType: "number",
        axisXType: "primary",
        axisYType: "primary",
        axisXIndex: 0,
        axisYIndex: 0,
        xValueFormatString: null,
        yValueFormatString: null,
        zValueFormatString: null,
        percentFormatString: null,
        showInLegend: null,
        legendMarkerType: null,
        legendMarkerColor: null,
        legendText: null,
        legendMarkerBorderColor: t ? "transparent" : null,
        legendMarkerBorderThickness: 0,
        markerType: "circle",
        markerColor: null,
        markerSize: null,
        markerBorderColor: t ? "transparent" : null,
        markerBorderThickness: 0,
        mouseover: null,
        mouseout: null,
        mousemove: null,
        click: null,
        toolTipContent: null,
        visible: !0,
        publicProperties: {
          options: "readWrite",
          axisX: "readWrite",
          axisY: "readWrite",
          chart: "readOnly"
        }
      },
      TextBlock: {
        x: 0,
        y: 0,
        width: null,
        height: null,
        maxWidth: null,
        maxHeight: null,
        padding: 0,
        angle: 0,
        text: "",
        horizontalAlign: "center",
        fontSize: 12,
        fontFamily: "calibri",
        fontWeight: "normal",
        fontColor: "black",
        fontStyle: "normal",
        borderThickness: 0,
        borderColor: "black",
        cornerRadius: 0,
        backgroundColor: null,
        textBaseline: "top"
      },
      CultureInfo: {
        decimalSeparator: ".",
        digitGroupSeparator: ",",
        zoomText: "Zoom",
        panText: "Pan",
        resetText: "Reset",
        menuText: "More Options",
        saveJPGText: "Save as JPEG",
        savePNGText: "Save as PNG",
        printText: "Print",
        days: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        shortDays: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
        months: "January February March April May June July August September October November December".split(" "),
        shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ")
      }
    },
    Ka = {
      en: {}
    },
    w = t ? "Trebuchet MS, Helvetica, sans-serif" : "Arial",
    Fa = t ? "Impact, Charcoal, sans-serif" : "Arial",
    za = {
      colorSet1: "#4F81BC #C0504E #9BBB58 #23BFAA #8064A1 #4AACC5 #F79647 #7F6084 #77A033 #33558B #E59566".split(" "),
      colorSet2: "#6D78AD #51CDA0 #DF7970 #4C9CA0 #AE7D99 #C9D45C #5592AD #DF874D #52BCA8 #8E7AA3 #E3CB64 #C77B85 #C39762 #8DD17E #B57952 #FCC26C".split(" "),
      colorSet3: "#8CA1BC #36845C #017E82 #8CB9D0 #708C98 #94838D #F08891 #0366A7 #008276 #EE7757 #E5BA3A #F2990B #03557B #782970".split(" ")
    },
    I,
    aa,
    $,
    ca,
    ia;
  aa = "#333333";
  $ = "#000000";
  I = "#666666";
  ia = ca = "#000000";
  var U = 20,
    F = 14,
    Va = {
      colorSet: "colorSet1",
      backgroundColor: "#FFFFFF",
      title: {
        fontFamily: Fa,
        fontSize: 32,
        fontColor: aa,
        fontWeight: "normal",
        verticalAlign: "top",
        margin: 5
      },
      subtitles: [{
        fontFamily: Fa,
        fontSize: F,
        fontColor: aa,
        fontWeight: "normal",
        verticalAlign: "top",
        margin: 5
      }],
      data: [{
        indexLabelFontFamily: w,
        indexLabelFontSize: F,
        indexLabelFontColor: aa,
        indexLabelFontWeight: "normal",
        indexLabelLineThickness: 1
      }],
      axisX: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: aa,
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: $,
        labelFontWeight: "normal",
        lineThickness: 1,
        lineColor: I,
        tickThickness: 1,
        tickColor: I,
        gridThickness: 0,
        gridColor: I,
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FF7300",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FF7300",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: ia,
          color: ca,
          thickness: 1,
          lineDashType: "dash"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      axisX2: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: aa,
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: $,
        labelFontWeight: "normal",
        lineThickness: 1,
        lineColor: I,
        tickThickness: 1,
        tickColor: I,
        gridThickness: 0,
        gridColor: I,
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FF7300",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FF7300",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: ia,
          color: ca,
          thickness: 1,
          lineDashType: "dash"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      axisY: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: aa,
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: $,
        labelFontWeight: "normal",
        lineThickness: 1,
        lineColor: I,
        tickThickness: 1,
        tickColor: I,
        gridThickness: 1,
        gridColor: I,
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FF7300",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FF7300",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: ia,
          color: ca,
          thickness: 1,
          lineDashType: "dash"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      axisY2: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: aa,
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: $,
        labelFontWeight: "normal",
        lineThickness: 1,
        lineColor: I,
        tickThickness: 1,
        tickColor: I,
        gridThickness: 1,
        gridColor: I,
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FF7300",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FF7300",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: ia,
          color: ca,
          thickness: 1,
          lineDashType: "dash"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      legend: {
        fontFamily: w,
        fontSize: 14,
        fontColor: aa,
        fontWeight: "bold",
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      toolTip: {
        fontFamily: w,
        fontSize: 14,
        fontStyle: "normal",
        cornerRadius: 0,
        borderThickness: 1
      }
    };
  $ = aa = "#F5F5F5";
  I = "#FFFFFF";
  ca = "#40BAF1";
  ia = "#F5F5F5";
  var U = 20,
    F = 14,
    ab = {
      colorSet: "colorSet2",
      title: {
        fontFamily: w,
        fontSize: 33,
        fontColor: "#3A3A3A",
        fontWeight: "bold",
        verticalAlign: "top",
        margin: 5
      },
      subtitles: [{
        fontFamily: w,
        fontSize: F,
        fontColor: "#3A3A3A",
        fontWeight: "normal",
        verticalAlign: "top",
        margin: 5
      }],
      data: [{
        indexLabelFontFamily: w,
        indexLabelFontSize: F,
        indexLabelFontColor: "#666666",
        indexLabelFontWeight: "normal",
        indexLabelLineThickness: 1
      }],
      axisX: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: "#666666",
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#666666",
        labelFontWeight: "normal",
        lineThickness: 1,
        lineColor: "#BBBBBB",
        tickThickness: 1,
        tickColor: "#BBBBBB",
        gridThickness: 1,
        gridColor: "#BBBBBB",
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FFA500",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FFA500",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: "black",
          color: "black",
          thickness: 1,
          lineDashType: "dot"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      axisX2: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: "#666666",
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#666666",
        labelFontWeight: "normal",
        lineThickness: 1,
        lineColor: "#BBBBBB",
        tickColor: "#BBBBBB",
        tickThickness: 1,
        gridThickness: 1,
        gridColor: "#BBBBBB",
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FFA500",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FFA500",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: "black",
          color: "black",
          thickness: 1,
          lineDashType: "dot"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      axisY: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: "#666666",
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#666666",
        labelFontWeight: "normal",
        lineThickness: 0,
        lineColor: "#BBBBBB",
        tickColor: "#BBBBBB",
        tickThickness: 1,
        gridThickness: 1,
        gridColor: "#BBBBBB",
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FFA500",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FFA500",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: "black",
          color: "black",
          thickness: 1,
          lineDashType: "dot"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      axisY2: [{
        titleFontFamily: w,
        titleFontSize: U,
        titleFontColor: "#666666",
        titleFontWeight: "normal",
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#666666",
        labelFontWeight: "normal",
        lineThickness: 0,
        lineColor: "#BBBBBB",
        tickColor: "#BBBBBB",
        tickThickness: 1,
        gridThickness: 1,
        gridColor: "#BBBBBB",
        stripLines: [{
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#FFA500",
          labelFontWeight: "normal",
          labelBackgroundColor: null,
          color: "#FFA500",
          thickness: 1
        }],
        crosshair: {
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: "#EEEEEE",
          labelFontWeight: "normal",
          labelBackgroundColor: "black",
          color: "black",
          thickness: 1,
          lineDashType: "dot"
        },
        scaleBreaks: {
          type: "zigzag",
          spacing: "2%",
          lineColor: "#BBBBBB",
          lineThickness: 1,
          lineDashType: "solid"
        }
      }],
      legend: {
        fontFamily: w,
        fontSize: 14,
        fontColor: "#3A3A3A",
        fontWeight: "bold",
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      toolTip: {
        fontFamily: w,
        fontSize: 14,
        fontStyle: "normal",
        cornerRadius: 0,
        borderThickness: 1
      }
    };
  $ = aa = "#F5F5F5";
  I = "#FFFFFF";
  ca = "#40BAF1";
  ia = "#F5F5F5";
  U = 20;
  F = 14;
  Fa = {
    colorSet: "colorSet12",
    backgroundColor: "#2A2A2A",
    title: {
      fontFamily: Fa,
      fontSize: 32,
      fontColor: aa,
      fontWeight: "normal",
      verticalAlign: "top",
      margin: 5
    },
    subtitles: [{
      fontFamily: Fa,
      fontSize: F,
      fontColor: aa,
      fontWeight: "normal",
      verticalAlign: "top",
      margin: 5
    }],
    toolbar: {
      backgroundColor: "#666666",
      backgroundColorOnHover: "#FF7372",
      borderColor: "#FF7372",
      borderThickness: 1,
      fontColor: "#F5F5F5",
      fontColorOnHover: "#F5F5F5"
    },
    data: [{
      indexLabelFontFamily: w,
      indexLabelFontSize: F,
      indexLabelFontColor: $,
      indexLabelFontWeight: "normal",
      indexLabelLineThickness: 1
    }],
    axisX: [{
      titleFontFamily: w,
      titleFontSize: U,
      titleFontColor: $,
      titleFontWeight: "normal",
      labelFontFamily: w,
      labelFontSize: F,
      labelFontColor: $,
      labelFontWeight: "normal",
      lineThickness: 1,
      lineColor: I,
      tickThickness: 1,
      tickColor: I,
      gridThickness: 0,
      gridColor: I,
      stripLines: [{
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#FF7300",
        labelFontWeight: "normal",
        labelBackgroundColor: null,
        color: "#FF7300",
        thickness: 1
      }],
      crosshair: {
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#000000",
        labelFontWeight: "normal",
        labelBackgroundColor: ia,
        color: ca,
        thickness: 1,
        lineDashType: "dash"
      },
      scaleBreaks: {
        type: "zigzag",
        spacing: "2%",
        lineColor: "#777777",
        lineThickness: 1,
        lineDashType: "solid",
        color: "#111111"
      }
    }],
    axisX2: [{
      titleFontFamily: w,
      titleFontSize: U,
      titleFontColor: $,
      titleFontWeight: "normal",
      labelFontFamily: w,
      labelFontSize: F,
      labelFontColor: $,
      labelFontWeight: "normal",
      lineThickness: 1,
      lineColor: I,
      tickThickness: 1,
      tickColor: I,
      gridThickness: 0,
      gridColor: I,
      stripLines: [{
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#FF7300",
        labelFontWeight: "normal",
        labelBackgroundColor: null,
        color: "#FF7300",
        thickness: 1
      }],
      crosshair: {
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#000000",
        labelFontWeight: "normal",
        labelBackgroundColor: ia,
        color: ca,
        thickness: 1,
        lineDashType: "dash"
      },
      scaleBreaks: {
        type: "zigzag",
        spacing: "2%",
        lineColor: "#777777",
        lineThickness: 1,
        lineDashType: "solid",
        color: "#111111"
      }
    }],
    axisY: [{
      titleFontFamily: w,
      titleFontSize: U,
      titleFontColor: $,
      titleFontWeight: "normal",
      labelFontFamily: w,
      labelFontSize: F,
      labelFontColor: $,
      labelFontWeight: "normal",
      lineThickness: 1,
      lineColor: I,
      tickThickness: 1,
      tickColor: I,
      gridThickness: 1,
      gridColor: I,
      stripLines: [{
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#FF7300",
        labelFontWeight: "normal",
        labelBackgroundColor: null,
        color: "#FF7300",
        thickness: 1
      }],
      crosshair: {
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#000000",
        labelFontWeight: "normal",
        labelBackgroundColor: ia,
        color: ca,
        thickness: 1,
        lineDashType: "dash"
      },
      scaleBreaks: {
        type: "zigzag",
        spacing: "2%",
        lineColor: "#777777",
        lineThickness: 1,
        lineDashType: "solid",
        color: "#111111"
      }
    }],
    axisY2: [{
      titleFontFamily: w,
      titleFontSize: U,
      titleFontColor: $,
      titleFontWeight: "normal",
      labelFontFamily: w,
      labelFontSize: F,
      labelFontColor: $,
      labelFontWeight: "normal",
      lineThickness: 1,
      lineColor: I,
      tickThickness: 1,
      tickColor: I,
      gridThickness: 1,
      gridColor: I,
      stripLines: [{
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#FF7300",
        labelFontWeight: "normal",
        labelBackgroundColor: null,
        color: "#FF7300",
        thickness: 1
      }],
      crosshair: {
        labelFontFamily: w,
        labelFontSize: F,
        labelFontColor: "#000000",
        labelFontWeight: "normal",
        labelBackgroundColor: ia,
        color: ca,
        thickness: 1,
        lineDashType: "dash"
      },
      scaleBreaks: {
        type: "zigzag",
        spacing: "2%",
        lineColor: "#777777",
        lineThickness: 1,
        lineDashType: "solid",
        color: "#111111"
      }
    }],
    legend: {
      fontFamily: w,
      fontSize: 14,
      fontColor: aa,
      fontWeight: "bold",
      verticalAlign: "bottom",
      horizontalAlign: "center"
    },
    toolTip: {
      fontFamily: w,
      fontSize: 14,
      fontStyle: "normal",
      cornerRadius: 0,
      borderThickness: 1,
      fontColor: $,
      backgroundColor: "rgba(0, 0, 0, .7)"
    }
  };
  I = "#FFFFFF";
  $ = aa = "#FAFAFA";
  ca = "#40BAF1";
  ia = "#F5F5F5";
  var U = 20,
    F = 14,
    bb = {
      light1: Va,
      light2: ab,
      dark1: Fa,
      dark2: {
        colorSet: "colorSet2",
        backgroundColor: "#32373A",
        title: {
          fontFamily: w,
          fontSize: 32,
          fontColor: aa,
          fontWeight: "normal",
          verticalAlign: "top",
          margin: 5
        },
        subtitles: [{
          fontFamily: w,
          fontSize: F,
          fontColor: aa,
          fontWeight: "normal",
          verticalAlign: "top",
          margin: 5
        }],
        toolbar: {
          backgroundColor: "#666666",
          backgroundColorOnHover: "#FF7372",
          borderColor: "#FF7372",
          borderThickness: 1,
          fontColor: "#F5F5F5",
          fontColorOnHover: "#F5F5F5"
        },
        data: [{
          indexLabelFontFamily: w,
          indexLabelFontSize: F,
          indexLabelFontColor: $,
          indexLabelFontWeight: "normal",
          indexLabelLineThickness: 1
        }],
        axisX: [{
          titleFontFamily: w,
          titleFontSize: U,
          titleFontColor: $,
          titleFontWeight: "normal",
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: $,
          labelFontWeight: "normal",
          lineThickness: 1,
          lineColor: I,
          tickThickness: 1,
          tickColor: I,
          gridThickness: 0,
          gridColor: I,
          stripLines: [{
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#FF7300",
            labelFontWeight: "normal",
            labelBackgroundColor: null,
            color: "#FF7300",
            thickness: 1
          }],
          crosshair: {
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#000000",
            labelFontWeight: "normal",
            labelBackgroundColor: ia,
            color: ca,
            thickness: 1,
            lineDashType: "dash"
          },
          scaleBreaks: {
            type: "zigzag",
            spacing: "2%",
            lineColor: "#777777",
            lineThickness: 1,
            lineDashType: "solid",
            color: "#111111"
          }
        }],
        axisX2: [{
          titleFontFamily: w,
          titleFontSize: U,
          titleFontColor: $,
          titleFontWeight: "normal",
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: $,
          labelFontWeight: "normal",
          lineThickness: 1,
          lineColor: I,
          tickThickness: 1,
          tickColor: I,
          gridThickness: 0,
          gridColor: I,
          stripLines: [{
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#FF7300",
            labelFontWeight: "normal",
            labelBackgroundColor: null,
            color: "#FF7300",
            thickness: 1
          }],
          crosshair: {
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#000000",
            labelFontWeight: "normal",
            labelBackgroundColor: ia,
            color: ca,
            thickness: 1,
            lineDashType: "dash"
          },
          scaleBreaks: {
            type: "zigzag",
            spacing: "2%",
            lineColor: "#777777",
            lineThickness: 1,
            lineDashType: "solid",
            color: "#111111"
          }
        }],
        axisY: [{
          titleFontFamily: w,
          titleFontSize: U,
          titleFontColor: $,
          titleFontWeight: "normal",
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: $,
          labelFontWeight: "normal",
          lineThickness: 0,
          lineColor: I,
          tickThickness: 1,
          tickColor: I,
          gridThickness: 1,
          gridColor: I,
          stripLines: [{
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#FF7300",
            labelFontWeight: "normal",
            labelBackgroundColor: null,
            color: "#FF7300",
            thickness: 1
          }],
          crosshair: {
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#000000",
            labelFontWeight: "normal",
            labelBackgroundColor: ia,
            color: ca,
            thickness: 1,
            lineDashType: "dash"
          },
          scaleBreaks: {
            type: "zigzag",
            spacing: "2%",
            lineColor: "#777777",
            lineThickness: 1,
            lineDashType: "solid",
            color: "#111111"
          }
        }],
        axisY2: [{
          titleFontFamily: w,
          titleFontSize: U,
          titleFontColor: $,
          titleFontWeight: "normal",
          labelFontFamily: w,
          labelFontSize: F,
          labelFontColor: $,
          labelFontWeight: "normal",
          lineThickness: 0,
          lineColor: I,
          tickThickness: 1,
          tickColor: I,
          gridThickness: 1,
          gridColor: I,
          stripLines: [{
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#FF7300",
            labelFontWeight: "normal",
            labelBackgroundColor: null,
            color: "#FF7300",
            thickness: 1
          }],
          crosshair: {
            labelFontFamily: w,
            labelFontSize: F,
            labelFontColor: "#000000",
            labelFontWeight: "normal",
            labelBackgroundColor: ia,
            color: ca,
            thickness: 1,
            lineDashType: "dash"
          },
          scaleBreaks: {
            type: "zigzag",
            spacing: "2%",
            lineColor: "#777777",
            lineThickness: 1,
            lineDashType: "solid",
            color: "#111111"
          }
        }],
        legend: {
          fontFamily: w,
          fontSize: 14,
          fontColor: aa,
          fontWeight: "bold",
          verticalAlign: "bottom",
          horizontalAlign: "center"
        },
        toolTip: {
          fontFamily: w,
          fontSize: 14,
          fontStyle: "normal",
          cornerRadius: 0,
          borderThickness: 1,
          fontColor: $,
          backgroundColor: "rgba(0, 0, 0, .7)"
        }
      },
      theme1: Va,
      theme2: ab,
      theme3: Va
    },
    R = {
      numberDuration: 1,
      yearDuration: 314496E5,
      monthDuration: 2592E6,
      weekDuration: 6048E5,
      dayDuration: 864E5,
      hourDuration: 36E5,
      minuteDuration: 6E4,
      secondDuration: 1E3,
      millisecondDuration: 1,
      dayOfWeekFromInt: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ")
    };
  (function () {
    J.fSDec = function (k) {
      for (var l = "", v = 0; v < k.length; v++) l += String.fromCharCode(Math.ceil(k.length / 57 / 5) ^ k.charCodeAt(v));
      return l;
    };
    J.obj = {
      trVs: "Ush`m!Wdsrhno",
      fntStr: "qy!B`mhcsh-!Mtbhe`!Fs`oed-!Mtbhe`!R`or!Tohbned-!@sh`m-!r`or,rdshg",
      txtBl: "udyuC`rdmhod",
      fnt: "gnou",
      fSy: "ghmmRuxmd",
      fTx: "ghmmUdyu",
      grClr: "fsdx",
      cntx: "buy",
      tp: "unq"
    };
    delete qa[J.fSDec("Bi`su")][J.fSDec("bsdehuIsdg")];
    J.pro = {
      sCH: qa[J.fSDec("Bi`su")][J.fSDec("bsdehuIsdg")]
    };
    J._fTWm = function (k) {
      if ("undefined" === typeof J.pro.sCH && !cb) try {
        var l = k[J.fSDec(J.obj.cntx)];
        l[J.fSDec(J.obj.txtBl)] = J.fSDec(J.obj.tp);
        l[J.fSDec(J.obj.fnt)] = 11 + J.fSDec(J.obj.fntStr);
        l[J.fSDec(J.obj.fSy)] = J.fSDec(J.obj.grClr);
        l[J.fSDec(J.obj.fTx)](J.fSDec(J.obj.trVs), 2, k.height - 11 - 2);
      } catch (v) {}
    };
  })();
  var Ya = {},
    wa = null,
    kb = function kb() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.backgroundColor && (this.ctx.fillStyle = this.backgroundColor, this.ctx.fillRect(0, 0, this.width, this.height));
    },
    lb = function lb(k, l, v) {
      l = Math.min(this.width, this.height);
      return Math.max("theme4" === this.theme ? 0 : 300 <= l ? 12 : 11, Math.round(l * (k / 400)));
    },
    Aa = function () {
      var k = /D{1,4}|M{1,4}|Y{1,4}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|f{1,3}|t{1,2}|T{1,2}|K|z{1,3}|"[^"]*"|'[^']*'/g,
        l = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
        v = "Sun Mon Tue Wed Thu Fri Sat".split(" "),
        s = "January February March April May June July August September October November December".split(" "),
        t = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
        w = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
        E = /[^-+\dA-Z]/g;
      return function (F, N, M) {
        var I = M ? M.days : l,
          Q = M ? M.months : s,
          P = M ? M.shortDays : v,
          R = M ? M.shortMonths : t;
        M = "";
        var J = !1;
        F = F && F.getTime ? F : F ? new Date(F) : new Date();
        if (isNaN(F)) throw SyntaxError("invalid date");
        "UTC:" === N.slice(0, 4) && (N = N.slice(4), J = !0);
        M = J ? "getUTC" : "get";
        var V = F[M + "Date"](),
          L = F[M + "Day"](),
          W = F[M + "Month"](),
          a = F[M + "FullYear"](),
          d = F[M + "Hours"](),
          c = F[M + "Minutes"](),
          b = F[M + "Seconds"](),
          e = F[M + "Milliseconds"](),
          f = J ? 0 : F.getTimezoneOffset();
        return M = N.replace(k, function (n) {
          switch (n) {
            case "D":
              return V;
            case "DD":
              return X(V, 2);
            case "DDD":
              return P[L];
            case "DDDD":
              return I[L];
            case "M":
              return W + 1;
            case "MM":
              return X(W + 1, 2);
            case "MMM":
              return R[W];
            case "MMMM":
              return Q[W];
            case "Y":
              return parseInt(String(a).slice(-2));
            case "YY":
              return X(String(a).slice(-2), 2);
            case "YYY":
              return X(String(a).slice(-3), 3);
            case "YYYY":
              return X(a, 4);
            case "h":
              return d % 12 || 12;
            case "hh":
              return X(d % 12 || 12, 2);
            case "H":
              return d;
            case "HH":
              return X(d, 2);
            case "m":
              return c;
            case "mm":
              return X(c, 2);
            case "s":
              return b;
            case "ss":
              return X(b, 2);
            case "f":
              return String(e).slice(0, 1);
            case "ff":
              return X(String(e).slice(0, 2), 2);
            case "fff":
              return X(String(e).slice(0, 3), 3);
            case "t":
              return 12 > d ? "a" : "p";
            case "tt":
              return 12 > d ? "am" : "pm";
            case "T":
              return 12 > d ? "A" : "P";
            case "TT":
              return 12 > d ? "AM" : "PM";
            case "K":
              return J ? "UTC" : (String(F).match(w) || [""]).pop().replace(E, "");
            case "z":
              return (0 < f ? "-" : "+") + Math.floor(Math.abs(f) / 60);
            case "zz":
              return (0 < f ? "-" : "+") + X(Math.floor(Math.abs(f) / 60), 2);
            case "zzz":
              return (0 < f ? "-" : "+") + X(Math.floor(Math.abs(f) / 60), 2) + X(Math.abs(f) % 60, 2);
            default:
              return n.slice(1, n.length - 1);
          }
        });
      };
    }(),
    ea = function ea(k, l, v) {
      if (null === k) return "";
      if (!isFinite(k)) return k;
      k = Number(k);
      var s = 0 > k ? !0 : !1;
      s && (k *= -1);
      var t = v ? v.decimalSeparator : ".",
        w = v ? v.digitGroupSeparator : ",",
        E = "";
      l = String(l);
      var E = 1,
        F = v = "",
        N = -1,
        M = [],
        I = [],
        Q = 0,
        J = 0,
        P = 0,
        R = !1,
        V = 0,
        F = l.match(/"[^"]*"|'[^']*'|[eE][+-]*[0]+|[,]+[.]|\u2030|./g);
      l = null;
      for (var L = 0; F && L < F.length; L++) if (l = F[L], "." === l && 0 > N) N = L;else {
        if ("%" === l) E *= 100;else if ("\u2030" === l) {
          E *= 1E3;
          continue;
        } else if ("," === l[0] && "." === l[l.length - 1]) {
          E /= Math.pow(1E3, l.length - 1);
          N = L + l.length - 1;
          continue;
        } else "E" !== l[0] && "e" !== l[0] || "0" !== l[l.length - 1] || (R = !0);
        0 > N ? (M.push(l), "#" === l || "0" === l ? Q++ : "," === l && P++) : (I.push(l), "#" !== l && "0" !== l || J++);
      }
      R && (l = Math.floor(k), F = -Math.floor(Math.log(k) / Math.LN10 + 1), V = 0 === k ? 0 : 0 === l ? -(Q + F) : String(l).length - Q, E /= Math.pow(10, V));
      0 > N && (N = L);
      E = (k * E).toFixed(J);
      l = E.split(".");
      E = (l[0] + "").split("");
      k = (l[1] + "").split("");
      E && "0" === E[0] && E.shift();
      for (R = F = L = J = N = 0; 0 < M.length;) if (l = M.pop(), "#" === l || "0" === l) {
        if (N++, N === Q) {
          var W = E,
            E = [];
          if ("0" === l) for (l = Q - J - (W ? W.length : 0); 0 < l;) W.unshift("0"), l--;
          for (; 0 < W.length;) v = W.pop() + v, R++, 0 === R % F && L === P && 0 < W.length && (v = w + v);
        } else 0 < E.length ? (v = E.pop() + v, J++, R++) : "0" === l && (v = "0" + v, J++, R++), 0 === R % F && L === P && 0 < E.length && (v = w + v);
      } else "E" !== l[0] && "e" !== l[0] || "0" !== l[l.length - 1] || !/[eE][+-]*[0]+/.test(l) ? "," === l ? (L++, F = R, R = 0, 0 < E.length && (v = w + v)) : v = 1 < l.length && ('"' === l[0] && '"' === l[l.length - 1] || "'" === l[0] && "'" === l[l.length - 1]) ? l.slice(1, l.length - 1) + v : l + v : (l = 0 > V ? l.replace("+", "").replace("-", "") : l.replace("-", ""), v += l.replace(/[0]+/, function (a) {
        return X(V, a.length);
      }));
      w = "";
      for (M = !1; 0 < I.length;) l = I.shift(), "#" === l || "0" === l ? 0 < k.length && 0 !== Number(k.join("")) ? (w += k.shift(), M = !0) : "0" === l && (w += "0", M = !0) : 1 < l.length && ('"' === l[0] && '"' === l[l.length - 1] || "'" === l[0] && "'" === l[l.length - 1]) ? w += l.slice(1, l.length - 1) : "E" !== l[0] && "e" !== l[0] || "0" !== l[l.length - 1] || !/[eE][+-]*[0]+/.test(l) ? w += l : (l = 0 > V ? l.replace("+", "").replace("-", "") : l.replace("-", ""), w += l.replace(/[0]+/, function (a) {
        return X(V, a.length);
      }));
      v += (M ? t : "") + w;
      return s ? "-" + v : v;
    },
    Oa = function Oa(k) {
      var l = 0,
        v = 0;
      k = k || window.event;
      k.offsetX || 0 === k.offsetX ? (l = k.offsetX, v = k.offsetY) : k.layerX || 0 == k.layerX ? (l = k.layerX, v = k.layerY) : (l = k.pageX - k.target.offsetLeft, v = k.pageY - k.target.offsetTop);
      return {
        x: l,
        y: v
      };
    },
    $a = !0,
    Ra = window.devicePixelRatio || 1,
    Na = 1,
    ha = $a ? Ra / Na : 1,
    ba = function ba(k, l, v, s, t, w, E, F, N, M, R, Q, I) {
      "undefined" === typeof I && (I = 1);
      E = E || 0;
      F = F || "black";
      var J = 15 < s - l && 15 < t - v ? 8 : 0.35 * Math.min(s - l, t - v);
      k.beginPath();
      k.moveTo(l, v);
      k.save();
      k.fillStyle = w;
      k.globalAlpha = I;
      k.fillRect(l, v, s - l, t - v);
      k.globalAlpha = 1;
      0 < E && (I = 0 === E % 2 ? 0 : 0.5, k.beginPath(), k.lineWidth = E, k.strokeStyle = F, k.moveTo(l, v), k.rect(l - I, v - I, s - l + 2 * I, t - v + 2 * I), k.stroke());
      k.restore();
      !0 === N && (k.save(), k.beginPath(), k.moveTo(l, v), k.lineTo(l + J, v + J), k.lineTo(s - J, v + J), k.lineTo(s, v), k.closePath(), E = k.createLinearGradient((s + l) / 2, v + J, (s + l) / 2, v), E.addColorStop(0, w), E.addColorStop(1, "rgba(255, 255, 255, .4)"), k.fillStyle = E, k.fill(), k.restore());
      !0 === M && (k.save(), k.beginPath(), k.moveTo(l, t), k.lineTo(l + J, t - J), k.lineTo(s - J, t - J), k.lineTo(s, t), k.closePath(), E = k.createLinearGradient((s + l) / 2, t - J, (s + l) / 2, t), E.addColorStop(0, w), E.addColorStop(1, "rgba(255, 255, 255, .4)"), k.fillStyle = E, k.fill(), k.restore());
      !0 === R && (k.save(), k.beginPath(), k.moveTo(l, v), k.lineTo(l + J, v + J), k.lineTo(l + J, t - J), k.lineTo(l, t), k.closePath(), E = k.createLinearGradient(l + J, (t + v) / 2, l, (t + v) / 2), E.addColorStop(0, w), E.addColorStop(1, "rgba(255, 255, 255, 0.1)"), k.fillStyle = E, k.fill(), k.restore());
      !0 === Q && (k.save(), k.beginPath(), k.moveTo(s, v), k.lineTo(s - J, v + J), k.lineTo(s - J, t - J), k.lineTo(s, t), E = k.createLinearGradient(s - J, (t + v) / 2, s, (t + v) / 2), E.addColorStop(0, w), E.addColorStop(1, "rgba(255, 255, 255, 0.1)"), k.fillStyle = E, E.addColorStop(0, w), E.addColorStop(1, "rgba(255, 255, 255, 0.1)"), k.fillStyle = E, k.fill(), k.closePath(), k.restore());
    },
    Y = function Y(k) {
      for (var l = "", s = 0; s < k.length; s++) l += String.fromCharCode(Math.ceil(k.length / 57 / 5) ^ k.charCodeAt(s));
      return l;
    },
    cb = window && window[Y("mnb`uhno")] && window[Y("mnb`uhno")].href && window[Y("mnb`uhno")].href.indexOf && (-1 !== window[Y("mnb`uhno")].href.indexOf(Y("b`ow`rkr/bnl")) || -1 !== window[Y("mnb`uhno")].href.indexOf(Y("gdonqhy/bnl")) || -1 !== window[Y("mnb`uhno")].href.indexOf(Y("gheemd"))),
    ib = cb && -1 === window[Y("mnb`uhno")].href.indexOf(Y("gheemd")),
    jb = {
      reset: {
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAYAAABJ/8wUAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPjSURBVFhHxVdJaFNRFP1J/jwkP5MxsbaC1WJEglSxOFAXIsFpVRE3ggi1K90obioRRBA33XXnQnciirhQcMCdorgQxBkXWlREkFKsWkv5npvckp/XnzRpKh64kLw733fffe9L/wrL0+mVUdO8uTSZ3MBL/we2qg4rkuSpodCELstXE46ziVkLQ6FQcGOmeSSq6wd4aV50d3drWjj8kQKZJTUc9kxFGenv79dZrDksTSTWWJp2QYtEPiErysyzdX0LsxsCQR8keX8gs6RHIk8ysdgKFg2G53mhuOPsshTlBjKaFo1g7SqLNoShKLdFXT8huQ/paLSbxatYnc2mHMM4hr18Vi8TIvCmXF3vYrW6cF23gGTOk0M1wA4RKvOmq6vLZRVJipvmSWT6tZ6CSEYkco5V50VPT4+D7RwOqi6RiSZm0fJ+vggSqkeoypdsNmuyelNwbXsbgvkWYMtzDWNvWaijoyOBqE+hVK8abcssUeXQ/YfKyi0gFYv1Ipgfoj34fYGTJLOYJA0ODirok32GLN8XhUWCwSes1hIwBg6LydJ/tEeRRapAdUp+wSAiZchtZZWWgAZ+JNpD8peYXQVK9UwUxNpzOK8pq97kURZhYTCKBwPD7h2zK+js7Myi7D8Fod+0TkMI8+EMAngLGc/WtBFWawkFHFnoj/t9KLgGmF0B3QfkxC+EarxkdhnFYlFLY06USqUwL7UMjICHfh/wOc2sCqhpxGbCkLvL7EUDbF73+6DkmVWB6zi7xUDQSLeYvWjAILvm9zEnkJhlbRcDQZcv6Kg2AipyT/Axw6wKlqVSqxDdjF8Izfod13qURdrG/nxehY+xGh+h0CSzKygGvSNQIcc097BI24jb9hax6kj2E7OrMFX1il+ICEf2NrPbhiXLl+fYl+U7zK4iYdsDcyLGf+ofFlkwcN+s10KhmpuYhhtm0hCLVIFL0MDsqNlDIqy9x2CLs1jL6OvrI7vPRbtohXG6eFmsFnHDGAp6n9AgyuVySRZrGvROxRgIfLXhzjrNYnNBUxNX/dMgRWT1mt4XLDovaApD53E9W3ilNX5M55LJHpRtIsgAvciR4WWcgK2Dvb1YqgXevmF8z2zEBTcKG39EfSKsT9EbhVUaI2FZO+oZIqImxol6j66/hcAu4sSN4vc1ZPoKeoE6RGhYL2YYA+ymOSSi0Z0wWntbtkGUWCvfSDXIxONraZ/FY90KUfNTpfC5spnNLgxoYNnR9RO4F8ofXEHOgogCQE99w+fF2Xw+b7O59rEOsyRqGEfpVoaDMQQ1CZrG46bcM6AZ0C/wPqNfHliqejyTySxh9TqQpL+xmbIlkB9SlAAAAABJRU5ErkJggg=="
      },
      pan: {
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAICSURBVEhLxZbPahNRGMUn/5MpuAiBEAIufQGfzr5E40YptBXajYzudCEuGqS+gGlrFwquDGRTutBdYfydzJ3LzeQmJGZue+Dw/Z17Mnfmu5Pof9Hr9Z61Wq0bWZMKj263O6xWq99wU9lOpzPMKgEhEcRucNOcioOK+0RzBhNvt9tPV4nmVF19+OWhVqt9xXgFXZq+8lCv119UKpUJ7iX2FmvFTKz8RH34YdBsNk8wVtjE4fGYwm8wrrDi3WBG5oKXZGRSS9hGuNFojLTe2lFz5xThWZIktayyiE2FdT3rzXBXz7krKiL8c17wAKFDjCus2AvW+YGZ9y2JF0VFRuMPfI//rsCE/C+s26s4gQu9ul7r4NteKx7H8XOC724xNNGbaNu++IrBqbOV7Tj3FgMRvc/YKOr3+3sE47wgEt/Bl/gaK5cHbNU11vYSXylfpK7XOvjuumPp4Wcoipu30Qsez2uMXYz4lfI+mOmwothY+SLiXJy7mKVpWs3Si0CoOMfeI9Od43Wic+jO+ZVv+crsm9QSNhUW9LXSeoPBYLXopthGuFQgdIxxhY+UDwlt1x5CZ1hX+NTUdt/OIvjKaDSmuOJfaIVNPKX+W18j/PLA2/kR44p5Sd8HbHngT/yTfNRWUXX14ZcL3wmX0+TLf8YO7CGT8yFE5zB3/gney25/OETRP9CtPDFe5jShAAAAAElFTkSuQmCC"
      },
      zoom: {
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALWSURBVEhLvZZLaBNRFIabyftBIgEfqCCBoCC6MYqiXYiIj4U76U4X7sUHbhQhUBfixhZEUBDB16YuFERaUaQLK7ooCOJj4UKtYEFU0EptShO/A9Ph3js3k8lo/eHnP7n3nP/M3LlzMz1hkUwmNziOcyKRSFyFt+LxeD/c2Wq1Ym7Kv0M2m11Os1OxWGycn1OwZXCGuXfwIhezkd9/jRgNT2L4ldhs1pbkX5OLJe4euVxuGQaPCa3mnUjtJx7BDuKusJTCV6jVVGHTMuYRjxma7yIOhTgFY6jNaAKew2xPKpVay9ganmkvj+M448/MfJdT5K5Gg4HJacRngPFgqVRaRNwW1B4i7yehWfsEDdz1K+A01AoxPIqGAiuwGfkOTY8+1A6u7AyiFTB2Hu0KPIrdiOnzHLWDybeImvy+Wq2mZa5bUHsD0Zpz+KxHdWQymV6kAb1ElqeORgJLvgnRdj1+R1AfzkIvSUjxVjQSarVakrueIPT8+H1F5jSUy+WXiJrUYBVWyVxU4PEU8TzhfaijUqnMIWrjaY492eWRwdKOIqrnIxnXwLLeRLwk2GQzrEMjg0avEbXxkIxr4OoOImpj2QwyFgms1koa/SZUG8s+0iGnEhNfCNXEhzIXBVz0McTzEvJ+70P9oNFtxEzei3aFYrFYxmuSUPWSv9Yi9IMm2xE1We56Mp1OV4nDwqFmBDV9gk9AEh4gZtFHNt8W4kAUCoXF5MorY9Z/kDni9nDv7hc0i2fhgLvTtX8a99PoMPPagTFPxofRzmDJ9yM+AyEmTfgGysYbQcfhDzPPJDmX0c7gDg4gs9BqFIWhm/Nct5H8gtBq1I7UfIbtvmIuoaGQcp+fdpbbSM43eEH5wrwLbXmhm/fU63VHXjcuok7hEByFY/AeHGC8L5/PL3HT5xGH1uYwfPOICGo+CBcU0vwO1BqzUqILDl/z/9VYIMfpddiAc47jDP8BsUpb13wOLRwAAAAASUVORK5CYII="
      },
      menu: {
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAeCAYAAABE4bxTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADoSURBVFhH7dc9CsJAFATgRxIIBCwCqZKATX5sbawsY2MvWOtF9AB6AU8gguAJbD2AnZ2VXQT/Ko2TYGCL2OYtYQc+BuYA+1hCtnCVwMm27SGaXpDJIAiCvCkVR05hGOZNN3HkFMdx3nQRR06+76/R1IcFLJlNQEWlmWlBTwJtKLKHynehZqnjOGM0PYWRVXk61C37p7xlZ3Hk5HneCk1dmMH811xGoKLSzDiQwIBZB4ocoPJdqNkDt2yKlueWRVGUtzy3rPwo3sWRU3nLjuLI6OO67oZM00wMw3hrmpZx0XU9syxrR0T0BeMpb9dneSR2AAAAAElFTkSuQmCC"
      }
    };
  V.prototype.setOptions = function (k, l) {
    if (qa[this._defaultsKey]) {
      var s = qa[this._defaultsKey],
        t;
      for (t in s) "publicProperties" !== t && s.hasOwnProperty(t) && (this[t] = k && t in k ? k[t] : l && t in l ? l[t] : s[t]);
    } else Ha && window.console && console.log("defaults not set");
  };
  V.prototype.get = function (k) {
    var l = qa[this._defaultsKey];
    if ("options" === k) return this.options && this.options._isPlaceholder ? null : this.options;
    if (l.hasOwnProperty(k) || l.publicProperties && l.publicProperties.hasOwnProperty(k)) return this[k];
    window.console && window.console.log('Property "' + k + "\" doesn't exist. Please check for typo.");
  };
  V.prototype.set = function (k, l, s) {
    s = "undefined" === typeof s ? !0 : s;
    var t = qa[this._defaultsKey];
    if ("options" === k) this.createUserOptions(l);else if (t.hasOwnProperty(k) || t.publicProperties && t.publicProperties.hasOwnProperty(k) && "readWrite" === t.publicProperties[k]) this.options._isPlaceholder && this.createUserOptions(), this.options[k] = l;else {
      window.console && (t.publicProperties && t.publicProperties.hasOwnProperty(k) && "readOnly" === t.publicProperties[k] ? window.console.log('Property "' + k + '" is read-only.') : window.console.log('Property "' + k + "\" doesn't exist. Please check for typo."));
      return;
    }
    s && (this.stockChart || this.chart || this).render();
  };
  V.prototype.addTo = function (k, l, s, t) {
    t = "undefined" === typeof t ? !0 : t;
    var w = qa[this._defaultsKey];
    w.hasOwnProperty(k) || w.publicProperties && w.publicProperties.hasOwnProperty(k) && "readWrite" === w.publicProperties[k] ? (this.options._isPlaceholder && this.createUserOptions(), "undefined" === typeof this.options[k] && (this.options[k] = []), k = this.options[k], s = "undefined" === typeof s || null === s ? k.length : s, k.splice(s, 0, l), t && (this.stockChart || this.chart || this).render()) : window.console && (w.publicProperties && w.publicProperties.hasOwnProperty(k) && "readOnly" === w.publicProperties[k] ? window.console.log('Property "' + k + '" is read-only.') : window.console.log('Property "' + k + "\" doesn't exist. Please check for typo."));
  };
  V.prototype.createUserOptions = function (k) {
    if ("undefined" !== typeof k || this.options._isPlaceholder) if (this.parent.options._isPlaceholder && this.parent.createUserOptions(), this.isOptionsInArray) {
      this.parent.options[this.optionsName] || (this.parent.options[this.optionsName] = []);
      var l = this.parent.options[this.optionsName],
        s = l.length;
      this.options._isPlaceholder || (Da(l), s = l.indexOf(this.options));
      this.options = "undefined" === typeof k ? {} : k;
      l[s] = this.options;
    } else this.options = "undefined" === typeof k ? {} : k, k = this.parent.options, this.optionsName ? l = this.optionsName : (l = this._defaultsKey) && 0 !== l.length ? (s = l.charAt(0).toLowerCase(), 1 < l.length && (s = s.concat(l.slice(1))), l = s) : l = void 0, k[l] = this.options;
  };
  V.prototype.remove = function (k) {
    k = "undefined" === typeof k ? !0 : k;
    if (this.isOptionsInArray) {
      var l = this.parent.options[this.optionsName];
      Da(l);
      var s = l.indexOf(this.options);
      0 <= s && l.splice(s, 1);
    } else delete this.parent.options[this.optionsName];
    k && (this.stockChart || this.chart || this).render();
  };
  V.prototype.updateOption = function (k) {
    !qa[this._defaultsKey] && Ha && window.console && console.log("defaults not set");
    var l = qa[this._defaultsKey],
      t = {},
      w = this[k],
      F = this._themeOptionsKey,
      J = this._index;
    this.theme && s(this.parent) && s(F) && s(J) ? t = s(this.predefinedThemes[this.theme]) ? this.predefinedThemes.light1 : this.predefinedThemes[this.theme] : this.parent && this.parent.themeOptions && this.parent.themeOptions[F] && (null === J ? t = this.parent.themeOptions[F] : 0 < this.parent.themeOptions[F].length && (t = Math.min(this.parent.themeOptions[F].length - 1, J), t = this.parent.themeOptions[F][t]));
    this.themeOptions = t;
    k in l && (w = k in this.options ? this.options[k] : t && k in t ? t[k] : l[k]);
    if (w === this[k]) return !1;
    this[k] = w;
    return !0;
  };
  V.prototype.trackChanges = function (k) {
    if (!this.sessionVariables) throw "Session Variable Store not set";
    this.sessionVariables[k] = this.options[k];
  };
  V.prototype.isBeingTracked = function (k) {
    this.options._oldOptions || (this.options._oldOptions = {});
    return this.options._oldOptions[k] ? !0 : !1;
  };
  V.prototype.hasOptionChanged = function (k) {
    if (!this.sessionVariables) throw "Session Variable Store not set";
    return this.sessionVariables[k] !== this.options[k];
  };
  V.prototype.addEventListener = function (k, l, s) {
    k && l && (this._eventListeners[k] = this._eventListeners[k] || [], this._eventListeners[k].push({
      context: s || this,
      eventHandler: l
    }));
  };
  V.prototype.removeEventListener = function (k, l) {
    if (k && l && this._eventListeners[k]) for (var s = this._eventListeners[k], t = 0; t < s.length; t++) if (s[t].eventHandler === l) {
      s[t].splice(t, 1);
      break;
    }
  };
  V.prototype.removeAllEventListeners = function () {
    this._eventListeners = [];
  };
  V.prototype.dispatchEvent = function (k, l, s) {
    if (k && this._eventListeners[k]) {
      l = l || {};
      for (var t = this._eventListeners[k], w = 0; w < t.length; w++) t[w].eventHandler.call(t[w].context, l);
    }
    "function" === typeof this[k] && this[k].call(s || this.chart, l);
  };
  Ea.prototype.registerSpace = function (k, l) {
    "top" === k ? this._topOccupied += l.height : "bottom" === k ? this._bottomOccupied += l.height : "left" === k ? this._leftOccupied += l.width : "right" === k && (this._rightOccupied += l.width);
  };
  Ea.prototype.unRegisterSpace = function (k, l) {
    "top" === k ? this._topOccupied -= l.height : "bottom" === k ? this._bottomOccupied -= l.height : "left" === k ? this._leftOccupied -= l.width : "right" === k && (this._rightOccupied -= l.width);
  };
  Ea.prototype.getFreeSpace = function () {
    return {
      x1: this._x1 + this._leftOccupied,
      y1: this._y1 + this._topOccupied,
      x2: this._x2 - this._rightOccupied,
      y2: this._y2 - this._bottomOccupied,
      width: this._x2 - this._x1 - this._rightOccupied - this._leftOccupied,
      height: this._y2 - this._y1 - this._bottomOccupied - this._topOccupied
    };
  };
  Ea.prototype.reset = function () {
    this._rightOccupied = this._leftOccupied = this._bottomOccupied = this._topOccupied = this._padding;
  };
  oa(ja, V);
  ja.prototype._initialize = function () {
    s(this.padding) || "object" !== _typeof(this.padding) ? this.topPadding = this.rightPadding = this.bottomPadding = this.leftPadding = Number(this.padding) | 0 : (this.topPadding = s(this.padding.top) ? 0 : Number(this.padding.top) | 0, this.rightPadding = s(this.padding.right) ? 0 : Number(this.padding.right) | 0, this.bottomPadding = s(this.padding.bottom) ? 0 : Number(this.padding.bottom) | 0, this.leftPadding = s(this.padding.left) ? 0 : Number(this.padding.left) | 0);
  };
  ja.prototype.render = function (k) {
    if (0 !== this.fontSize) {
      k && this.ctx.save();
      var l = this.ctx.font;
      this.ctx.textBaseline = this.textBaseline;
      var s = 0;
      this._isDirty && this.measureText(this.ctx);
      this.ctx.translate(this.x, this.y + s);
      "middle" === this.textBaseline && (s = -this._lineHeight / 2);
      this.ctx.font = this._getFontString();
      this.ctx.rotate(Math.PI / 180 * this.angle);
      var t = 0,
        w = this.topPadding,
        F = null;
      this.ctx.roundRect || Ca(this.ctx);
      (0 < this.borderThickness && this.borderColor || this.backgroundColor) && this.ctx.roundRect(0, s, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);
      this.ctx.fillStyle = this.fontColor;
      for (s = 0; s < this._wrappedText.lines.length; s++) F = this._wrappedText.lines[s], "right" === this.horizontalAlign ? t = this.width - F.width - this.rightPadding : "left" === this.horizontalAlign ? t = this.leftPadding : "center" === this.horizontalAlign && (t = (this.width - (this.leftPadding + this.rightPadding)) / 2 - F.width / 2 + this.leftPadding), this.ctx.fillText(F.text, t, w), w += F.height;
      this.ctx.font = l;
      k && this.ctx.restore();
    }
  };
  ja.prototype.setText = function (k) {
    this.text = k;
    this._isDirty = !0;
    this._wrappedText = null;
  };
  ja.prototype.measureText = function () {
    this._lineHeight = Xa(this.fontFamily, this.fontSize, this.fontWeight);
    if (null === this.maxWidth) throw "Please set maxWidth and height for TextBlock";
    this._wrapText(this.ctx);
    this._isDirty = !1;
    return {
      width: this.width,
      height: this.height
    };
  };
  ja.prototype._getLineWithWidth = function (k, l, s) {
    k = String(k);
    if (!k) return {
      text: "",
      width: 0
    };
    var t = s = 0,
      w = k.length - 1,
      F = Infinity;
    for (this.ctx.font = this._getFontString(); t <= w;) {
      var F = Math.floor((t + w) / 2),
        E = k.substr(0, F + 1);
      s = this.ctx.measureText(E).width;
      if (s < l) t = F + 1;else if (s > l) w = F - 1;else break;
    }
    s > l && 1 < E.length && (E = E.substr(0, E.length - 1), s = this.ctx.measureText(E).width);
    l = !0;
    if (E.length === k.length || " " === k[E.length]) l = !1;
    l && (k = E.split(" "), 1 < k.length && k.pop(), E = k.join(" "), s = this.ctx.measureText(E).width);
    return {
      text: E,
      width: s
    };
  };
  ja.prototype._wrapText = function () {
    var k = new String(Ga(String(this.text))),
      l = [],
      s = this.ctx.font,
      t = 0,
      w = 0;
    this.ctx.font = this._getFontString();
    if (0 === this.frontSize) w = t = 0;else for (; 0 < k.length;) {
      var F = this.maxHeight - (this.topPadding + this.bottomPadding),
        E = this._getLineWithWidth(k, this.maxWidth - (this.leftPadding + this.rightPadding), !1);
      E.height = this._lineHeight;
      l.push(E);
      var J = w,
        w = Math.max(w, E.width),
        t = t + E.height,
        k = Ga(k.slice(E.text.length, k.length));
      F && t > F && (E = l.pop(), t -= E.height, w = J);
    }
    this._wrappedText = {
      lines: l,
      width: w,
      height: t
    };
    this.width = w + (this.leftPadding + this.rightPadding);
    this.height = t + (this.topPadding + this.bottomPadding);
    this.ctx.font = s;
  };
  ja.prototype._getFontString = function () {
    var k;
    k = "" + (this.fontStyle ? this.fontStyle + " " : "");
    k += this.fontWeight ? this.fontWeight + " " : "";
    k += this.fontSize ? this.fontSize + "px " : "";
    var l = this.fontFamily ? this.fontFamily + "" : "";
    !t && l && (l = l.split(",")[0], "'" !== l[0] && '"' !== l[0] && (l = "'" + l + "'"));
    return k += l;
  };
  oa(Ta, V);
  oa(ya, V);
  ya.prototype.setLayout = function () {
    if (this.text) {
      var k = this.dockInsidePlotArea ? this.chart.plotArea : this.chart,
        l = k.layoutManager.getFreeSpace(),
        t = l.x1,
        w = l.y1,
        F = 0,
        J = 0,
        E = this.chart._menuButton && this.chart.exportEnabled && "top" === this.verticalAlign ? 22 : 0,
        N,
        I;
      "top" === this.verticalAlign || "bottom" === this.verticalAlign ? (null === this.maxWidth && (this.maxWidth = l.width - 4 - E * ("center" === this.horizontalAlign ? 2 : 1)), J = 0.5 * l.height - this.margin - 2, F = 0) : "center" === this.verticalAlign && ("left" === this.horizontalAlign || "right" === this.horizontalAlign ? (null === this.maxWidth && (this.maxWidth = l.height - 4), J = 0.5 * l.width - this.margin - 2) : "center" === this.horizontalAlign && (null === this.maxWidth && (this.maxWidth = l.width - 4), J = 0.5 * l.height - 4));
      var M;
      s(this.padding) || "number" !== typeof this.padding ? s(this.padding) || "object" !== _typeof(this.padding) || (M = this.padding.top ? this.padding.top : this.padding.bottom ? this.padding.bottom : 0, M += this.padding.bottom ? this.padding.bottom : this.padding.top ? this.padding.top : 0) : M = 2 * this.padding;
      this.wrap || (J = Math.min(J, 1.5 * this.fontSize + M));
      J = new ja(this.ctx, {
        fontSize: this.fontSize,
        fontFamily: this.fontFamily,
        fontColor: this.fontColor,
        fontStyle: this.fontStyle,
        fontWeight: this.fontWeight,
        horizontalAlign: this.horizontalAlign,
        verticalAlign: this.verticalAlign,
        borderColor: this.borderColor,
        borderThickness: this.borderThickness,
        backgroundColor: this.backgroundColor,
        maxWidth: this.maxWidth,
        maxHeight: J,
        cornerRadius: this.cornerRadius,
        text: this.text,
        padding: this.padding,
        textBaseline: "top"
      });
      M = J.measureText();
      "top" === this.verticalAlign || "bottom" === this.verticalAlign ? ("top" === this.verticalAlign ? (w = l.y1 + 2, I = "top") : "bottom" === this.verticalAlign && (w = l.y2 - 2 - M.height, I = "bottom"), "left" === this.horizontalAlign ? t = l.x1 + 2 : "center" === this.horizontalAlign ? t = l.x1 + l.width / 2 - M.width / 2 : "right" === this.horizontalAlign && (t = l.x2 - 2 - M.width - E), N = this.horizontalAlign, this.width = M.width, this.height = M.height) : "center" === this.verticalAlign && ("left" === this.horizontalAlign ? (t = l.x1 + 2, w = l.y2 - 2 - (this.maxWidth / 2 - M.width / 2), F = -90, I = "left", this.width = M.height, this.height = M.width) : "right" === this.horizontalAlign ? (t = l.x2 - 2, w = l.y1 + 2 + (this.maxWidth / 2 - M.width / 2), F = 90, I = "right", this.width = M.height, this.height = M.width) : "center" === this.horizontalAlign && (w = k.y1 + (k.height / 2 - M.height / 2), t = k.x1 + (k.width / 2 - M.width / 2), I = "center", this.width = M.width, this.height = M.height), N = "center");
      J.x = t;
      J.y = w;
      J.angle = F;
      J.horizontalAlign = N;
      this._textBlock = J;
      k.layoutManager.registerSpace(I, {
        width: this.width + ("left" === I || "right" === I ? this.margin + 2 : 0),
        height: this.height + ("top" === I || "bottom" === I ? this.margin + 2 : 0)
      });
      this.bounds = {
        x1: t,
        y1: w,
        x2: t + this.width,
        y2: w + this.height
      };
      this.ctx.textBaseline = "top";
    }
  };
  ya.prototype.render = function () {
    this._textBlock && this._textBlock.render(!0);
  };
  oa(Ia, V);
  Ia.prototype.setLayout = ya.prototype.setLayout;
  Ia.prototype.render = ya.prototype.render;
  Ua.prototype.get = function (k, l) {
    var s = null;
    0 < this.pool.length ? (s = this.pool.pop(), Ma(s, k, l)) : s = ta(k, l);
    return s;
  };
  Ua.prototype.release = function (k) {
    this.pool.push(k);
  };
  oa(Ja, V);
  var Pa = {
    addTheme: function addTheme(k, l) {
      bb[k] = l;
    },
    addColorSet: function addColorSet(k, l) {
      za[k] = l;
    },
    addCultureInfo: function addCultureInfo(k, l) {
      Ka[k] = l;
    },
    formatNumber: function formatNumber(k, l, s) {
      s = s || "en";
      if (Ka[s]) return ea(k, l || "#,##0.##", new Ja(s));
      throw "Unknown Culture Name";
    },
    formatDate: function formatDate(k, l, s) {
      s = s || "en";
      if (Ka[s]) return Aa(k, l || "DD MMM YYYY", new Ja(s));
      throw "Unknown Culture Name";
    }
  };
   true && "undefined" !== typeof module.exports ? module.exports = Pa :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return Pa;
  }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (0);
  w = Pa.Chart = function () {
    function k(a, d) {
      return a.x - d.x;
    }
    function l(a, d, c) {
      d = d || {};
      s(c) ? (this.predefinedThemes = bb, this.optionsName = this.parent = this.index = null) : (this.parent = c.parent, this.index = c.index, this.predefinedThemes = c.predefinedThemes, this.optionsName = c.optionsName, this.stockChart = c.stockChart, this.panel = a, this.isOptionsInArray = c.isOptionsInArray);
      this.theme = s(d.theme) || s(this.predefinedThemes[d.theme]) ? "light1" : d.theme;
      l.base.constructor.call(this, "Chart", this.optionsName, d, this.index, this.parent);
      var b = this;
      this._containerId = a;
      this._objectsInitialized = !1;
      this.overlaidCanvasCtx = this.ctx = null;
      this._indexLabels = [];
      this._panTimerId = 0;
      this._lastTouchEventType = "";
      this._lastTouchData = null;
      this.isAnimating = !1;
      this.renderCount = 0;
      this.disableToolTip = this.animatedRender = !1;
      this.canvasPool = new Ua();
      this.allDOMEventHandlers = [];
      this.panEnabled = !1;
      this._defaultCursor = "default";
      this.plotArea = {
        canvas: null,
        ctx: null,
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        width: 0,
        height: 0
      };
      this._dataInRenderedOrder = [];
      (this.container = "string" === typeof this._containerId ? document.getElementById(this._containerId) : this._containerId) ? (this.container.innerHTML = "", d = a = 0, a = this.options.width ? this.width : 0 < this.container.clientWidth ? this.container.clientWidth : this.width, d = this.options.height ? this.height : 0 < this.container.clientHeight ? this.container.clientHeight : this.height, this.width = a, this.height = d, this.x1 = this.y1 = 0, this.x2 = this.width, this.y2 = this.height, this._selectedColorSet = "undefined" !== typeof za[this.colorSet] ? za[this.colorSet] : za.colorSet1, this._canvasJSContainer = document.createElement("div"), this._canvasJSContainer.setAttribute("class", "canvasjs-chart-container"), this._canvasJSContainer.style.position = "relative", this._canvasJSContainer.style.textAlign = "left", this._canvasJSContainer.style.cursor = "auto", this._canvasJSContainer.style.direction = "ltr", t || (this._canvasJSContainer.style.height = "0px"), this.container.appendChild(this._canvasJSContainer), this.canvas = ta(a, d), this._preRenderCanvas = ta(a, d), this.canvas.style.position = "absolute", this.canvas.style.WebkitUserSelect = "none", this.canvas.style.MozUserSelect = "none", this.canvas.style.msUserSelect = "none", this.canvas.style.userSelect = "none", this.canvas.getContext && (this._canvasJSContainer.appendChild(this.canvas), this.ctx = this.canvas.getContext("2d"), this.ctx.textBaseline = "top", Ca(this.ctx), this._preRenderCtx = this._preRenderCanvas.getContext("2d"), this._preRenderCtx.textBaseline = "top", Ca(this._preRenderCtx), t ? this.plotArea.ctx = this.ctx : (this.plotArea.canvas = ta(a, d), this.plotArea.canvas.style.position = "absolute", this.plotArea.canvas.setAttribute("class", "plotAreaCanvas"), this._canvasJSContainer.appendChild(this.plotArea.canvas), this.plotArea.ctx = this.plotArea.canvas.getContext("2d")), this.overlaidCanvas = ta(a, d), this.overlaidCanvas.style.position = "absolute", this.overlaidCanvas.style.webkitTapHighlightColor = "transparent", this.overlaidCanvas.style.WebkitUserSelect = "none", this.overlaidCanvas.style.MozUserSelect = "none", this.overlaidCanvas.style.msUserSelect = "none", this.overlaidCanvas.style.userSelect = "none", this.overlaidCanvas.getContext && (this._canvasJSContainer.appendChild(this.overlaidCanvas), this.overlaidCanvasCtx = this.overlaidCanvas.getContext("2d"), this.overlaidCanvasCtx.textBaseline = "top", Ca(this.overlaidCanvasCtx)), this._eventManager = new ca(this), this.windowResizeHandler = P(window, "resize", function () {
        b._updateSize() && b.render();
      }, this.allDOMEventHandlers), this._toolBar = document.createElement("div"), this._toolBar.setAttribute("class", "canvasjs-chart-toolbar"), this._toolBar.style.cssText = "position: absolute; right: 1px; top: 1px;", this._canvasJSContainer.appendChild(this._toolBar), this.bounds = {
        x1: 0,
        y1: 0,
        x2: this.width,
        y2: this.height
      }, P(this.overlaidCanvas, "click", function (a) {
        b._mouseEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, "mousemove", function (a) {
        b._mouseEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, "mouseup", function (a) {
        b._mouseEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, "mousedown", function (a) {
        b._mouseEventHandler(a);
        ua(b._dropdownMenu);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, "mouseout", function (a) {
        b._mouseEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", function (a) {
        b._touchEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove", function (a) {
        b._touchEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend", function (a) {
        b._touchEventHandler(a);
      }, this.allDOMEventHandlers), P(this.overlaidCanvas, window.navigator.msPointerEnabled ? "MSPointerCancel" : "touchcancel", function (a) {
        b._touchEventHandler(a);
      }, this.allDOMEventHandlers), this.toolTip = new X(this, this.options.toolTip), this.data = null, this.axisX = [], this.axisX2 = [], this.axisY = [], this.axisY2 = [], this.sessionVariables = {
        axisX: [],
        axisX2: [],
        axisY: [],
        axisY2: []
      })) : window.console && window.console.log('CanvasJS Error: Chart Container with id "' + this._containerId + '" was not found');
    }
    function v(a, d) {
      for (var c = [], b, e = 0; e < a.length; e++) if (0 == e) c.push(a[0]);else {
        var f, n, m;
        m = e - 1;
        f = 0 === m ? 0 : m - 1;
        n = m === a.length - 1 ? m : m + 1;
        b = Math.abs((a[n].x - a[f].x) / (0 === a[n].x - a[m].x ? 0.01 : a[n].x - a[m].x)) * (d - 1) / 2 + 1;
        var A = (a[n].x - a[f].x) / b;
        b = (a[n].y - a[f].y) / b;
        c[c.length] = a[m].x > a[f].x && 0 < A || a[m].x < a[f].x && 0 > A ? {
          x: a[m].x + A / 3,
          y: a[m].y + b / 3
        } : {
          x: a[m].x,
          y: a[m].y + b / 9
        };
        m = e;
        f = 0 === m ? 0 : m - 1;
        n = m === a.length - 1 ? m : m + 1;
        b = Math.abs((a[n].x - a[f].x) / (0 === a[m].x - a[f].x ? 0.01 : a[m].x - a[f].x)) * (d - 1) / 2 + 1;
        A = (a[n].x - a[f].x) / b;
        b = (a[n].y - a[f].y) / b;
        c[c.length] = a[m].x > a[f].x && 0 < A || a[m].x < a[f].x && 0 > A ? {
          x: a[m].x - A / 3,
          y: a[m].y - b / 3
        } : {
          x: a[m].x,
          y: a[m].y - b / 9
        };
        c[c.length] = a[e];
      }
      return c;
    }
    function w(a, d, c, b, e, f, n, m, A, h) {
      var r = 0;
      h ? (n.color = f, m.color = f) : h = 1;
      r = A ? Math.abs(e - c) : Math.abs(b - d);
      r = 0 < n.trimLength ? Math.abs(r * n.trimLength / 100) : Math.abs(r - n.length);
      A ? (c += r / 2, e -= r / 2) : (d += r / 2, b -= r / 2);
      var r = 1 === Math.round(n.thickness) % 2 ? 0.5 : 0,
        q = 1 === Math.round(m.thickness) % 2 ? 0.5 : 0;
      a.save();
      a.globalAlpha = h;
      a.strokeStyle = m.color || f;
      a.lineWidth = m.thickness || 2;
      a.setLineDash && a.setLineDash(N(m.dashType, m.thickness));
      a.beginPath();
      A && 0 < m.thickness ? (a.moveTo(b - n.thickness / 2, Math.round((c + e) / 2) - q), a.lineTo(d + n.thickness / 2, Math.round((c + e) / 2) - q)) : 0 < m.thickness && (a.moveTo(Math.round((d + b) / 2) - q, c + n.thickness / 2), a.lineTo(Math.round((d + b) / 2) - q, e - n.thickness / 2));
      a.stroke();
      a.strokeStyle = n.color || f;
      a.lineWidth = n.thickness || 2;
      a.setLineDash && a.setLineDash(N(n.dashType, n.thickness));
      a.beginPath();
      A && 0 < n.thickness ? (a.moveTo(b - r, c), a.lineTo(b - r, e), a.moveTo(d + r, c), a.lineTo(d + r, e)) : 0 < n.thickness && (a.moveTo(d, c + r), a.lineTo(b, c + r), a.moveTo(d, e - r), a.lineTo(b, e - r));
      a.stroke();
      a.restore();
    }
    function F(a, d) {
      F.base.constructor.call(this, "Legend", "legend", d, null, a);
      this.chart = a;
      this.canvas = a.canvas;
      this.ctx = this.chart.ctx;
      this.ghostCtx = this.chart._eventManager.ghostCtx;
      this.items = [];
      this.optionsName = "legend";
      this.height = this.width = 0;
      this.orientation = null;
      this.dataSeries = [];
      this.bounds = {
        x1: null,
        y1: null,
        x2: null,
        y2: null
      };
      "undefined" === typeof this.options.fontSize && (this.fontSize = this.chart.getAutoFontSize(this.fontSize));
      this.lineHeight = Xa(this.fontFamily, this.fontSize, this.fontWeight);
      this.horizontalSpacing = this.fontSize;
    }
    function I(a, d, c, b) {
      I.base.constructor.call(this, "DataSeries", "data", d, c, a);
      this.chart = a;
      this.canvas = a.canvas;
      this._ctx = a.canvas.ctx;
      this.index = c;
      this.noDataPointsInPlotArea = 0;
      this.id = b;
      this.chart._eventManager.objectMap[b] = {
        id: b,
        objectType: "dataSeries",
        dataSeriesIndex: c
      };
      a = d.dataPoints ? d.dataPoints.length : 0;
      this.dataPointEOs = [];
      for (d = 0; d < a; d++) this.dataPointEOs[d] = {};
      this.dataPointIds = [];
      this.plotUnit = [];
      this.axisY = this.axisX = null;
      this.optionsName = "data";
      this.isOptionsInArray = !0;
      null === this.fillOpacity && (this.type.match(/area/i) ? this.fillOpacity = 0.7 : this.fillOpacity = 1);
      this.axisPlacement = this.getDefaultAxisPlacement();
      "undefined" === typeof this.options.indexLabelFontSize && (this.indexLabelFontSize = this.chart.getAutoFontSize(this.indexLabelFontSize));
    }
    function E(a, d, c, b, e, f) {
      E.base.constructor.call(this, "Axis", d, c, b, a);
      this.chart = a;
      this.canvas = a.canvas;
      this.ctx = a.ctx;
      this.intervalStartPosition = this.maxHeight = this.maxWidth = 0;
      this.labels = [];
      this.dataSeries = [];
      this._stripLineLabels = this._ticks = this._labels = null;
      this.dataInfo = {
        min: Infinity,
        max: -Infinity,
        viewPortMin: Infinity,
        viewPortMax: -Infinity,
        minDiff: Infinity
      };
      this.isOptionsInArray = !0;
      "axisX" === e ? ("left" === f || "bottom" === f ? (this.optionsName = "axisX", s(this.chart.sessionVariables.axisX[b]) && (this.chart.sessionVariables.axisX[b] = {}), this.sessionVariables = this.chart.sessionVariables.axisX[b]) : (this.optionsName = "axisX2", s(this.chart.sessionVariables.axisX2[b]) && (this.chart.sessionVariables.axisX2[b] = {}), this.sessionVariables = this.chart.sessionVariables.axisX2[b]), this.options.interval || (this.intervalType = null)) : "left" === f || "bottom" === f ? (this.optionsName = "axisY", s(this.chart.sessionVariables.axisY[b]) && (this.chart.sessionVariables.axisY[b] = {}), this.sessionVariables = this.chart.sessionVariables.axisY[b]) : (this.optionsName = "axisY2", s(this.chart.sessionVariables.axisY2[b]) && (this.chart.sessionVariables.axisY2[b] = {}), this.sessionVariables = this.chart.sessionVariables.axisY2[b]);
      "undefined" === typeof this.options.titleFontSize && (this.titleFontSize = this.chart.getAutoFontSize(this.titleFontSize));
      "undefined" === typeof this.options.labelFontSize && (this.labelFontSize = this.chart.getAutoFontSize(this.labelFontSize));
      this.type = e;
      "axisX" !== e || c && "undefined" !== typeof c.gridThickness || (this.gridThickness = 0);
      this._position = f;
      this.lineCoordinates = {
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        width: null
      };
      this.labelAngle = (this.labelAngle % 360 + 360) % 360;
      90 < this.labelAngle && 270 > this.labelAngle ? this.labelAngle -= 180 : 270 <= this.labelAngle && 360 >= this.labelAngle && (this.labelAngle -= 360);
      this.options.scaleBreaks && (this.scaleBreaks = new $(this.chart, this.options.scaleBreaks, ++this.chart._eventManager.lastObjectId, this));
      this.stripLines = [];
      if (this.options.stripLines && 0 < this.options.stripLines.length) for (a = 0; a < this.options.stripLines.length; a++) this.stripLines.push(new M(this.chart, this.options.stripLines[a], a, ++this.chart._eventManager.lastObjectId, this));
      this.options.crosshair && (this.crosshair = new aa(this.chart, this.options.crosshair, this));
      this._titleTextBlock = null;
      this.hasOptionChanged("viewportMinimum") && null === this.viewportMinimum && (this.options.viewportMinimum = void 0, this.sessionVariables.viewportMinimum = null);
      this.hasOptionChanged("viewportMinimum") || isNaN(this.sessionVariables.newViewportMinimum) || null === this.sessionVariables.newViewportMinimum ? this.sessionVariables.newViewportMinimum = null : this.viewportMinimum = this.sessionVariables.newViewportMinimum;
      this.hasOptionChanged("viewportMaximum") && null === this.viewportMaximum && (this.options.viewportMaximum = void 0, this.sessionVariables.viewportMaximum = null);
      this.hasOptionChanged("viewportMaximum") || isNaN(this.sessionVariables.newViewportMaximum) || null === this.sessionVariables.newViewportMaximum ? this.sessionVariables.newViewportMaximum = null : this.viewportMaximum = this.sessionVariables.newViewportMaximum;
      null !== this.minimum && null !== this.viewportMinimum && (this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum));
      null !== this.maximum && null !== this.viewportMaximum && (this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum));
      this.trackChanges("viewportMinimum");
      this.trackChanges("viewportMaximum");
    }
    function $(a, d, c, b) {
      $.base.constructor.call(this, "ScaleBreaks", "scaleBreaks", d, null, b);
      this.id = c;
      this.chart = a;
      this.ctx = this.chart.ctx;
      this.axis = b;
      this.optionsName = "scaleBreaks";
      this.isOptionsInArray = !1;
      this._appliedBreaks = [];
      this.customBreaks = [];
      this.autoBreaks = [];
      "string" === typeof this.spacing ? (this.spacing = parseFloat(this.spacing), this.spacing = isNaN(this.spacing) ? 8 : (10 < this.spacing ? 10 : this.spacing) + "%") : "number" !== typeof this.spacing && (this.spacing = 8);
      this.autoCalculate && (this.maxNumberOfAutoBreaks = Math.min(this.maxNumberOfAutoBreaks, 5));
      if (this.options.customBreaks && 0 < this.options.customBreaks.length) {
        for (a = 0; a < this.options.customBreaks.length; a++) this.customBreaks.push(new U(this.chart, "customBreaks", this.options.customBreaks[a], a, ++this.chart._eventManager.lastObjectId, this)), "number" === typeof this.customBreaks[a].startValue && "number" === typeof this.customBreaks[a].endValue && this.customBreaks[a].endValue !== this.customBreaks[a].startValue && this._appliedBreaks.push(this.customBreaks[a]);
        this._appliedBreaks.sort(function (a, b) {
          return a.startValue - b.startValue;
        });
        for (a = 0; a < this._appliedBreaks.length - 1; a++) this._appliedBreaks[a].endValue >= this._appliedBreaks[a + 1].startValue && (this._appliedBreaks[a].endValue = Math.max(this._appliedBreaks[a].endValue, this._appliedBreaks[a + 1].endValue), window.console && window.console.log("CanvasJS Error: Breaks " + a + " and " + (a + 1) + " are overlapping."), this._appliedBreaks.splice(a, 2), a--);
      }
    }
    function U(a, d, c, b, e, f) {
      U.base.constructor.call(this, "Break", d, c, b, f);
      this.id = e;
      this.chart = a;
      this.ctx = this.chart.ctx;
      this.scaleBreaks = f;
      this.optionsName = d;
      this.isOptionsInArray = !0;
      this.type = c.type ? this.type : f.type;
      this.fillOpacity = s(c.fillOpacity) ? f.fillOpacity : this.fillOpacity;
      this.lineThickness = s(c.lineThickness) ? f.lineThickness : this.lineThickness;
      this.color = c.color ? this.color : f.color;
      this.lineColor = c.lineColor ? this.lineColor : f.lineColor;
      this.lineDashType = c.lineDashType ? this.lineDashType : f.lineDashType;
      !s(this.startValue) && this.startValue.getTime && (this.startValue = this.startValue.getTime());
      !s(this.endValue) && this.endValue.getTime && (this.endValue = this.endValue.getTime());
      "number" === typeof this.startValue && "number" === typeof this.endValue && this.endValue < this.startValue && (a = this.startValue, this.startValue = this.endValue, this.endValue = a);
      this.spacing = "undefined" === typeof c.spacing ? f.spacing : c.spacing;
      "string" === typeof this.options.spacing ? (this.spacing = parseFloat(this.spacing), this.spacing = isNaN(this.spacing) ? 0 : (10 < this.spacing ? 10 : this.spacing) + "%") : "number" !== typeof this.options.spacing && (this.spacing = f.spacing);
      this.size = f.parent.logarithmic ? 1 : 0;
    }
    function M(a, d, c, b, e) {
      M.base.constructor.call(this, "StripLine", "stripLines", d, c, e);
      this.id = b;
      this.chart = a;
      this.ctx = this.chart.ctx;
      this.label = this.label;
      this.axis = e;
      this.optionsName = "stripLines";
      this.isOptionsInArray = !0;
      this._thicknessType = "pixel";
      null !== this.startValue && null !== this.endValue && (this.value = e.logarithmic ? Math.sqrt((this.startValue.getTime ? this.startValue.getTime() : this.startValue) * (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) : ((this.startValue.getTime ? this.startValue.getTime() : this.startValue) + (this.endValue.getTime ? this.endValue.getTime() : this.endValue)) / 2, this._thicknessType = null);
    }
    function aa(a, d, c) {
      aa.base.constructor.call(this, "Crosshair", "crosshair", d, null, c);
      this.chart = a;
      this.ctx = this.chart.ctx;
      this.axis = c;
      this.optionsName = "crosshair";
      this._thicknessType = "pixel";
    }
    function X(a, d) {
      X.base.constructor.call(this, "ToolTip", "toolTip", d, null, a);
      this.chart = a;
      this.canvas = a.canvas;
      this.ctx = this.chart.ctx;
      this.currentDataPointIndex = this.currentSeriesIndex = -1;
      this._prevY = this._prevX = NaN;
      this.containerTransitionDuration = 0.1;
      this.mozContainerTransition = this.getContainerTransition(this.containerTransitionDuration);
      this.optionsName = "toolTip";
      this._initialize();
    }
    function ca(a) {
      this.chart = a;
      this.lastObjectId = 0;
      this.objectMap = [];
      this.rectangularRegionEventSubscriptions = [];
      this.previousDataPointEventObject = null;
      this.ghostCanvas = ta(this.chart.width, this.chart.height);
      this.ghostCtx = this.ghostCanvas.getContext("2d");
      this.mouseoveredObjectMaps = [];
    }
    function ia(a) {
      this.chart = a;
      this.ctx = this.chart.plotArea.ctx;
      this.animations = [];
      this.animationRequestId = null;
    }
    oa(l, V);
    l.prototype.destroy = function () {
      var a = this.allDOMEventHandlers;
      this._animator && this._animator.cancelAllAnimations();
      this._panTimerId && clearTimeout(this._panTimerId);
      for (var d = 0; d < a.length; d++) {
        var c = a[d][0],
          b = a[d][1],
          e = a[d][2],
          f = a[d][3],
          f = f || !1;
        c.removeEventListener ? c.removeEventListener(b, e, f) : c.detachEvent && c.detachEvent("on" + b, e);
      }
      this.allDOMEventHandlers = [];
      for (this.removeAllEventListeners(); this._canvasJSContainer && this._canvasJSContainer.hasChildNodes();) this._canvasJSContainer.removeChild(this._canvasJSContainer.lastChild);
      for (; this.container && this.container.hasChildNodes();) this.container.removeChild(this.container.lastChild);
      for (; this._dropdownMenu && this._dropdownMenu.hasChildNodes();) this._dropdownMenu.removeChild(this._dropdownMenu.lastChild);
      this.overlaidCanvas = this.canvas = this.container = this._canvasJSContainer = null;
      this._toolBar = this._dropdownMenu = this._menuButton = this._resetButton = this._zoomButton = this._breaksCanvas = this._preRenderCanvas = this.toolTip.container = null;
    };
    l.prototype._updateOptions = function () {
      var a = this;
      this.updateOption("width");
      this.updateOption("height");
      this.updateOption("dataPointWidth");
      this.updateOption("dataPointMinWidth");
      this.updateOption("dataPointMaxWidth");
      this.updateOption("interactivityEnabled");
      this.updateOption("theme");
      this.updateOption("colorSet") && (this._selectedColorSet = "undefined" !== typeof za[this.colorSet] ? za[this.colorSet] : za.colorSet1);
      this.updateOption("backgroundColor");
      this.backgroundColor || (this.backgroundColor = "rgba(0,0,0,0)");
      this.updateOption("culture");
      this._cultureInfo = new Ja(this.options.culture);
      this.updateOption("animationEnabled");
      this.animationEnabled = this.animationEnabled && t;
      this.updateOption("animationDuration");
      this.updateOption("rangeChanging");
      this.updateOption("rangeChanged");
      this.updateOption("exportEnabled");
      this.updateOption("exportFileName");
      this.updateOption("zoomType");
      if (this.options.zoomEnabled || this.panEnabled) {
        if (!this._zoomButton) {
          var d = !1;
          ua(this._zoomButton = document.createElement("button"));
          va(this, this._zoomButton, "pan");
          this._toolBar.appendChild(this._zoomButton);
          this._zoomButton.style.borderRight = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor;
          P(this._zoomButton, "touchstart", function (a) {
            d = !0;
          }, this.allDOMEventHandlers);
          P(this._zoomButton, "click", function () {
            a.zoomEnabled ? (a.zoomEnabled = !1, a.panEnabled = !0, va(a, a._zoomButton, "zoom")) : (a.zoomEnabled = !0, a.panEnabled = !1, va(a, a._zoomButton, "pan"));
            a.render();
          }, this.allDOMEventHandlers);
          P(this._zoomButton, "mouseover", function () {
            d ? d = !1 : (pa(a, a._zoomButton, {
              backgroundColor: a.toolbar.backgroundColorOnHover,
              color: a.toolbar.fontColorOnHover,
              transition: "0.4s",
              WebkitTransition: "0.4s"
            }), 0 >= navigator.userAgent.search("MSIE") && pa(a, a._zoomButton.childNodes[0], {
              WebkitFilter: "invert(100%)",
              filter: "invert(100%)"
            }));
          }, this.allDOMEventHandlers);
          P(this._zoomButton, "mouseout", function () {
            d || (pa(a, a._zoomButton, {
              backgroundColor: a.toolbar.backgroundColor,
              color: a.toolbar.fontColor,
              transition: "0.4s",
              WebkitTransition: "0.4s"
            }), 0 >= navigator.userAgent.search("MSIE") && pa(a, a._zoomButton.childNodes[0], {
              WebkitFilter: "invert(0%)",
              filter: "invert(0%)"
            }));
          }, this.allDOMEventHandlers);
        }
        this._resetButton || (d = !1, ua(this._resetButton = document.createElement("button")), va(this, this._resetButton, "reset"), this._resetButton.style.borderRight = (this.exportEnabled ? this.toolbar.borderThickness : 0) + "px solid " + this.toolbar.borderColor, this._toolBar.appendChild(this._resetButton), P(this._resetButton, "touchstart", function (a) {
          d = !0;
        }, this.allDOMEventHandlers), P(this._resetButton, "click", function () {
          a.toolTip.hide();
          a.toolTip.dispatchEvent("hidden", {
            chart: a,
            toolTip: a.toolTip
          }, a.toolTip);
          a.zoomEnabled || a.panEnabled ? (a.zoomEnabled = !0, a.panEnabled = !1, va(a, a._zoomButton, "pan"), a._defaultCursor = "default", a.overlaidCanvas.style.cursor = a._defaultCursor) : (a.zoomEnabled = !1, a.panEnabled = !1);
          if (a.sessionVariables.axisX) for (var b = 0; b < a.sessionVariables.axisX.length; b++) a.sessionVariables.axisX[b].newViewportMinimum = null, a.sessionVariables.axisX[b].newViewportMaximum = null;
          if (a.sessionVariables.axisX2) for (b = 0; b < a.sessionVariables.axisX2.length; b++) a.sessionVariables.axisX2[b].newViewportMinimum = null, a.sessionVariables.axisX2[b].newViewportMaximum = null;
          if (a.sessionVariables.axisY) for (b = 0; b < a.sessionVariables.axisY.length; b++) a.sessionVariables.axisY[b].newViewportMinimum = null, a.sessionVariables.axisY[b].newViewportMaximum = null;
          if (a.sessionVariables.axisY2) for (b = 0; b < a.sessionVariables.axisY2.length; b++) a.sessionVariables.axisY2[b].newViewportMinimum = null, a.sessionVariables.axisY2[b].newViewportMaximum = null;
          a.resetOverlayedCanvas();
          ua(a._zoomButton, a._resetButton);
          a.stockChart && (a.stockChart._rangeEventParameter = {
            stockChart: a.stockChart,
            source: "chart",
            index: a.stockChart.charts.indexOf(a),
            minimum: null,
            maximum: null
          });
          a._dispatchRangeEvent("rangeChanging", "reset");
          a.stockChart && (a.stockChart._rangeEventParameter.type = "rangeChanging", a.stockChart.dispatchEvent("rangeChanging", a.stockChart._rangeEventParameter, a.stockChart));
          a.render();
          a.syncCharts && a.syncCharts(null, null);
          a._dispatchRangeEvent("rangeChanged", "reset");
          a.stockChart && (a.stockChart._rangeEventParameter.type = "rangeChanged", a.stockChart.dispatchEvent("rangeChanged", a.stockChart._rangeEventParameter, a.stockChart));
        }, this.allDOMEventHandlers), P(this._resetButton, "mouseover", function () {
          d || (pa(a, a._resetButton, {
            backgroundColor: a.toolbar.backgroundColorOnHover,
            color: a.toolbar.hoverFfontColorOnHoverontColor,
            transition: "0.4s",
            WebkitTransition: "0.4s"
          }), 0 >= navigator.userAgent.search("MSIE") && pa(a, a._resetButton.childNodes[0], {
            WebkitFilter: "invert(100%)",
            filter: "invert(100%)"
          }));
        }, this.allDOMEventHandlers), P(this._resetButton, "mouseout", function () {
          d || (pa(a, a._resetButton, {
            backgroundColor: a.toolbar.backgroundColor,
            color: a.toolbar.fontColor,
            transition: "0.4s",
            WebkitTransition: "0.4s"
          }), 0 >= navigator.userAgent.search("MSIE") && pa(a, a._resetButton.childNodes[0], {
            WebkitFilter: "invert(0%)",
            filter: "invert(0%)"
          }));
        }, this.allDOMEventHandlers), this.overlaidCanvas.style.cursor = a._defaultCursor);
        this.zoomEnabled || this.panEnabled || (this._zoomButton ? (a._zoomButton.getAttribute("state") === a._cultureInfo.zoomText ? (this.panEnabled = !0, this.zoomEnabled = !1) : (this.zoomEnabled = !0, this.panEnabled = !1), La(a._zoomButton, a._resetButton)) : (this.zoomEnabled = !0, this.panEnabled = !1));
      } else this.panEnabled = this.zoomEnabled = !1;
      gb(this);
      "none" !== this._toolBar.style.display && this._zoomButton && (this.panEnabled ? va(a, a._zoomButton, "zoom") : va(a, a._zoomButton, "pan"), a._resetButton.getAttribute("state") !== a._cultureInfo.resetText && va(a, a._resetButton, "reset"));
      this.options.toolTip && this.toolTip.options !== this.options.toolTip && (this.toolTip.options = this.options.toolTip);
      for (var c in this.toolTip.options) this.toolTip.options.hasOwnProperty(c) && this.toolTip.updateOption(c);
    };
    l.prototype._updateSize = function () {
      var a;
      a = [this.canvas, this.overlaidCanvas, this._eventManager.ghostCanvas];
      var d = 0,
        c = 0;
      this.options.width ? d = this.width : this.width = d = 0 < this.container.clientWidth ? this.container.clientWidth : this.width;
      this.options.height ? c = this.height : this.height = c = 0 < this.container.clientHeight ? this.container.clientHeight : this.height;
      if (this.canvas.width !== d * ha || this.canvas.height !== c * ha) {
        for (var b = 0; b < a.length; b++) Ma(a[b], d, c);
        this.bounds = {
          x1: 0,
          y1: 0,
          x2: this.width,
          y2: this.height,
          width: this.width,
          height: this.height
        };
        a = !0;
      } else a = !1;
      return a;
    };
    l.prototype._initialize = function () {
      this.isNavigator = s(this.parent) || s(this.parent._defaultsKey) || "Navigator" !== this.parent._defaultsKey ? !1 : !0;
      this.toolbar = new Ta(this, this.options.toolbar);
      this._animator ? this._animator.cancelAllAnimations() : this._animator = new ia(this);
      this.removeAllEventListeners();
      this.disableToolTip = !1;
      this._axes = [];
      this.funnelPyramidClickHandler = this.pieDoughnutClickHandler = null;
      this._updateOptions();
      this.animatedRender = t && this.animationEnabled && 0 === this.renderCount;
      this._updateSize();
      this.clearCanvas();
      this.ctx.beginPath();
      this.axisX = [];
      this.axisX2 = [];
      this.axisY = [];
      this.axisY2 = [];
      this._indexLabels = [];
      this._dataInRenderedOrder = [];
      this._events = [];
      this._eventManager && this._eventManager.reset();
      this.plotInfo = {
        axisPlacement: null,
        plotTypes: []
      };
      this.layoutManager = new Ea(0, 0, this.width, this.height, this.isNavigator ? 0 : 2);
      this.plotArea.layoutManager && this.plotArea.layoutManager.reset();
      this.data = [];
      var a = 0,
        d = null;
      if (this.options.data) {
        for (var c = 0; c < this.options.data.length; c++) if (a++, !this.options.data[c].type || 0 <= l._supportedChartTypes.indexOf(this.options.data[c].type)) {
          var b = new I(this, this.options.data[c], a - 1, ++this._eventManager.lastObjectId);
          "error" === b.type && (b.linkedDataSeriesIndex = s(this.options.data[c].linkedDataSeriesIndex) ? c - 1 : this.options.data[c].linkedDataSeriesIndex, 0 > b.linkedDataSeriesIndex || b.linkedDataSeriesIndex >= this.options.data.length || "number" !== typeof b.linkedDataSeriesIndex || "error" === this.options.data[b.linkedDataSeriesIndex].type) && (b.linkedDataSeriesIndex = null);
          null === b.name && (b.name = "DataSeries " + a);
          null === b.color ? 1 < this.options.data.length ? (b._colorSet = [this._selectedColorSet[b.index % this._selectedColorSet.length]], b.color = this._selectedColorSet[b.index % this._selectedColorSet.length]) : b._colorSet = "line" === b.type || "stepLine" === b.type || "spline" === b.type || "area" === b.type || "stepArea" === b.type || "splineArea" === b.type || "stackedArea" === b.type || "stackedArea100" === b.type || "rangeArea" === b.type || "rangeSplineArea" === b.type || "candlestick" === b.type || "ohlc" === b.type || "waterfall" === b.type || "boxAndWhisker" === b.type ? [this._selectedColorSet[0]] : this._selectedColorSet : b._colorSet = [b.color];
          null === b.markerSize && (("line" === b.type || "stepLine" === b.type || "spline" === b.type || 0 <= b.type.toLowerCase().indexOf("area")) && b.dataPoints && b.dataPoints.length < this.width / 16 || "scatter" === b.type) && (b.markerSize = 8);
          "bubble" !== b.type && "scatter" !== b.type || !b.dataPoints || (b.dataPoints.some ? b.dataPoints.some(function (a) {
            return a.x;
          }) && b.dataPoints.sort(k) : b.dataPoints.sort(k));
          this.data.push(b);
          var e = b.axisPlacement,
            d = d || e,
            f;
          "normal" === e ? "xySwapped" === this.plotInfo.axisPlacement ? f = 'You cannot combine "' + b.type + '" with bar chart' : "none" === this.plotInfo.axisPlacement ? f = 'You cannot combine "' + b.type + '" with pie chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "normal") : "xySwapped" === e ? "normal" === this.plotInfo.axisPlacement ? f = 'You cannot combine "' + b.type + '" with line, area, column or pie chart' : "none" === this.plotInfo.axisPlacement ? f = 'You cannot combine "' + b.type + '" with pie chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "xySwapped") : "none" === e ? "normal" === this.plotInfo.axisPlacement ? f = 'You cannot combine "' + b.type + '" with line, area, column or bar chart' : "xySwapped" === this.plotInfo.axisPlacement ? f = 'You cannot combine "' + b.type + '" with bar chart' : null === this.plotInfo.axisPlacement && (this.plotInfo.axisPlacement = "none") : null === e && "none" === this.plotInfo.axisPlacement && (f = 'You cannot combine "' + b.type + '" with pie chart');
          if (f && window.console) {
            window.console.log(f);
            return;
          }
        }
        for (c = 0; c < this.data.length; c++) {
          if ("none" == d && "error" === this.data[c].type && window.console) {
            window.console.log('You cannot combine "' + b.type + '" with error chart');
            return;
          }
          "error" === this.data[c].type && (this.data[c].axisPlacement = this.plotInfo.axisPlacement = d || "normal", this.data[c]._linkedSeries = null === this.data[c].linkedDataSeriesIndex ? null : this.data[this.data[c].linkedDataSeriesIndex]);
        }
      }
      this._objectsInitialized = !0;
      this._plotAreaElements = [];
    };
    l._supportedChartTypes = Da("line stepLine spline column area stepArea splineArea bar bubble scatter stackedColumn stackedColumn100 stackedBar stackedBar100 stackedArea stackedArea100 candlestick ohlc boxAndWhisker rangeColumn error rangeBar rangeArea rangeSplineArea pie doughnut funnel pyramid waterfall".split(" "));
    l.prototype.setLayout = function () {
      for (var a = this._plotAreaElements, d = 0; d < this.data.length; d++) if ("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) {
        if (!this.data[d].axisYType || "primary" === this.data[d].axisYType) if (this.options.axisY && 0 < this.options.axisY.length) {
          if (!this.axisY.length) for (var c = 0; c < this.options.axisY.length; c++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY[c] = new E(this, "axisY", this.options.axisY[c], c, "axisY", "left")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY[c] = new E(this, "axisY", this.options.axisY[c], c, "axisY", "bottom"));
          this.data[d].axisY = this.axisY[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY.length ? this.data[d].axisYIndex : 0];
          this.axisY[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY.length ? this.data[d].axisYIndex : 0].dataSeries.push(this.data[d]);
        } else this.axisY.length || ("normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY[0] = new E(this, "axisY", this.options.axisY, 0, "axisY", "left")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY[0] = new E(this, "axisY", this.options.axisY, 0, "axisY", "bottom"))), this.data[d].axisY = this.axisY[0], this.axisY[0].dataSeries.push(this.data[d]);
        if ("secondary" === this.data[d].axisYType) if (this.options.axisY2 && 0 < this.options.axisY2.length) {
          if (!this.axisY2.length) for (c = 0; c < this.options.axisY2.length; c++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY2[c] = new E(this, "axisY2", this.options.axisY2[c], c, "axisY", "right")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY2[c] = new E(this, "axisY2", this.options.axisY2[c], c, "axisY", "top"));
          this.data[d].axisY = this.axisY2[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY2.length ? this.data[d].axisYIndex : 0];
          this.axisY2[0 <= this.data[d].axisYIndex && this.data[d].axisYIndex < this.axisY2.length ? this.data[d].axisYIndex : 0].dataSeries.push(this.data[d]);
        } else this.axisY2.length || ("normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisY2[0] = new E(this, "axisY2", this.options.axisY2, 0, "axisY", "right")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisY2[0] = new E(this, "axisY2", this.options.axisY2, 0, "axisY", "top"))), this.data[d].axisY = this.axisY2[0], this.axisY2[0].dataSeries.push(this.data[d]);
        if (!this.data[d].axisXType || "primary" === this.data[d].axisXType) if (this.options.axisX && 0 < this.options.axisX.length) {
          if (!this.axisX.length) for (c = 0; c < this.options.axisX.length; c++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisX[c] = new E(this, "axisX", this.options.axisX[c], c, "axisX", "bottom")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX[c] = new E(this, "axisX", this.options.axisX[c], c, "axisX", "left"));
          this.data[d].axisX = this.axisX[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX.length ? this.data[d].axisXIndex : 0];
          this.axisX[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX.length ? this.data[d].axisXIndex : 0].dataSeries.push(this.data[d]);
        } else this.axisX.length || ("normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisX[0] = new E(this, "axisX", this.options.axisX, 0, "axisX", "bottom")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX[0] = new E(this, "axisX", this.options.axisX, 0, "axisX", "left"))), this.data[d].axisX = this.axisX[0], this.axisX[0].dataSeries.push(this.data[d]);
        if ("secondary" === this.data[d].axisXType) if (this.options.axisX2 && 0 < this.options.axisX2.length) {
          if (!this.axisX2.length) for (c = 0; c < this.options.axisX2.length; c++) "normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisX2[c] = new E(this, "axisX2", this.options.axisX2[c], c, "axisX", "top")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX2[c] = new E(this, "axisX2", this.options.axisX2[c], c, "axisX", "right"));
          this.data[d].axisX = this.axisX2[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX2.length ? this.data[d].axisXIndex : 0];
          this.axisX2[0 <= this.data[d].axisXIndex && this.data[d].axisXIndex < this.axisX2.length ? this.data[d].axisXIndex : 0].dataSeries.push(this.data[d]);
        } else this.axisX2.length || ("normal" === this.plotInfo.axisPlacement ? this._axes.push(this.axisX2[0] = new E(this, "axisX2", this.options.axisX2, 0, "axisX", "top")) : "xySwapped" === this.plotInfo.axisPlacement && this._axes.push(this.axisX2[0] = new E(this, "axisX2", this.options.axisX2, 0, "axisX", "right"))), this.data[d].axisX = this.axisX2[0], this.axisX2[0].dataSeries.push(this.data[d]);
      }
      if (this.axisY) {
        for (c = 1; c < this.axisY.length; c++) "undefined" === typeof this.axisY[c].options.gridThickness && (this.axisY[c].gridThickness = 0);
        for (c = 0; c < this.axisY.length - 1; c++) "undefined" === typeof this.axisY[c].options.margin && (this.axisY[c].margin = 10);
      }
      if (this.axisY2) {
        for (c = 1; c < this.axisY2.length; c++) "undefined" === typeof this.axisY2[c].options.gridThickness && (this.axisY2[c].gridThickness = 0);
        for (c = 0; c < this.axisY2.length - 1; c++) "undefined" === typeof this.axisY2[c].options.margin && (this.axisY2[c].margin = 10);
      }
      this.axisY && 0 < this.axisY.length && this.axisY2 && 0 < this.axisY2.length && (0 < this.axisY[0].gridThickness && "undefined" === typeof this.axisY2[0].options.gridThickness ? this.axisY2[0].gridThickness = 0 : 0 < this.axisY2[0].gridThickness && "undefined" === typeof this.axisY[0].options.gridThickness && (this.axisY[0].gridThickness = 0));
      if (this.axisX) for (c = 0; c < this.axisX.length; c++) "undefined" === typeof this.axisX[c].options.gridThickness && (this.axisX[c].gridThickness = 0);
      if (this.axisX2) for (c = 0; c < this.axisX2.length; c++) "undefined" === typeof this.axisX2[c].options.gridThickness && (this.axisX2[c].gridThickness = 0);
      this.axisX && 0 < this.axisX.length && this.axisX2 && 0 < this.axisX2.length && (0 < this.axisX[0].gridThickness && "undefined" === typeof this.axisX2[0].options.gridThickness ? this.axisX2[0].gridThickness = 0 : 0 < this.axisX2[0].gridThickness && "undefined" === typeof this.axisX[0].options.gridThickness && (this.axisX[0].gridThickness = 0));
      c = !1;
      if (0 < this._axes.length && this.options.zoomEnabled && (this.zoomEnabled || this.panEnabled)) for (d = 0; d < this._axes.length; d++) if (null !== this._axes[d].viewportMinimum || null !== this._axes[d].viewportMaximum) {
        c = !0;
        break;
      }
      c ? (La(this._zoomButton, this._resetButton), this._toolBar.style.border = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor, this._zoomButton.style.borderRight = this.toolbar.borderThickness + "px solid " + this.toolbar.borderColor, this._resetButton.style.borderRight = (this.exportEnabled ? this.toolbar.borderThickness : 0) + "px solid " + this.toolbar.borderColor) : (ua(this._zoomButton, this._resetButton), this._toolBar.style.border = this.toolbar.borderThickness + "px solid transparent", this.options.zoomEnabled && (this.zoomEnabled = !0, this.panEnabled = !1));
      fb(this);
      this._processData();
      this.options.title && (this.title = new ya(this, this.options.title), this.title.dockInsidePlotArea ? a.push(this.title) : this.title.setLayout());
      this.subtitles = [];
      if (this.options.subtitles) for (d = 0; d < this.options.subtitles.length; d++) c = new Ia(this, this.options.subtitles[d], d), this.subtitles.push(c), c.dockInsidePlotArea ? a.push(c) : c.setLayout();
      this.legend = new F(this, this.options.legend);
      for (d = 0; d < this.data.length; d++) (this.data[d].showInLegend || "pie" === this.data[d].type || "doughnut" === this.data[d].type || "funnel" === this.data[d].type || "pyramid" === this.data[d].type) && this.legend.dataSeries.push(this.data[d]);
      this.legend.dockInsidePlotArea ? a.push(this.legend) : this.legend.setLayout();
      for (d = 0; d < this._axes.length; d++) if (this._axes[d].scaleBreaks && this._axes[d].scaleBreaks._appliedBreaks.length) {
        t ? (this._breaksCanvas = ta(this.width, this.height, !0), this._breaksCanvasCtx = this._breaksCanvas.getContext("2d")) : (this._breaksCanvas = this.canvas, this._breaksCanvasCtx = this.ctx);
        break;
      }
      this._preRenderCanvas = ta(this.width, this.height);
      this._preRenderCtx = this._preRenderCanvas.getContext("2d");
      "normal" !== this.plotInfo.axisPlacement && "xySwapped" !== this.plotInfo.axisPlacement || E.setLayout(this.axisX, this.axisX2, this.axisY, this.axisY2, this.plotInfo.axisPlacement, this.layoutManager.getFreeSpace());
    };
    l.prototype.renderElements = function () {
      var a = this._plotAreaElements;
      this.title && !this.title.dockInsidePlotArea && this.title.render();
      for (var d = 0; d < this.subtitles.length; d++) this.subtitles[d].dockInsidePlotArea || this.subtitles[d].render();
      this.legend.dockInsidePlotArea || this.legend.render();
      if ("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) E.render(this.axisX, this.axisX2, this.axisY, this.axisY2, this.plotInfo.axisPlacement);else if ("none" === this.plotInfo.axisPlacement) this.preparePlotArea();else return;
      for (d = 0; d < a.length; d++) a[d].setLayout(), a[d].render();
      var c = [];
      if (this.animatedRender) {
        var b = ta(this.width, this.height);
        b.getContext("2d").drawImage(this.canvas, 0, 0, this.width, this.height);
      }
      hb(this);
      var a = this.ctx.miterLimit,
        e;
      this.ctx.miterLimit = 3;
      t && this._breaksCanvas && (this._preRenderCtx.drawImage(this.canvas, 0, 0, this.width, this.height), this._preRenderCtx.drawImage(this._breaksCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx.globalCompositeOperation = "source-atop", this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), this._preRenderCtx.clearRect(0, 0, this.width, this.height));
      for (d = 0; d < this.plotInfo.plotTypes.length; d++) for (var f = this.plotInfo.plotTypes[d], n = 0; n < f.plotUnits.length; n++) {
        var m = f.plotUnits[n],
          A = null;
        m.targetCanvas = null;
        this.animatedRender && (m.targetCanvas = ta(this.width, this.height), m.targetCanvasCtx = m.targetCanvas.getContext("2d"), e = m.targetCanvasCtx.miterLimit, m.targetCanvasCtx.miterLimit = 3);
        "line" === m.type ? A = this.renderLine(m) : "stepLine" === m.type ? A = this.renderStepLine(m) : "spline" === m.type ? A = this.renderSpline(m) : "column" === m.type ? A = this.renderColumn(m) : "bar" === m.type ? A = this.renderBar(m) : "area" === m.type ? A = this.renderArea(m) : "stepArea" === m.type ? A = this.renderStepArea(m) : "splineArea" === m.type ? A = this.renderSplineArea(m) : "stackedColumn" === m.type ? A = this.renderStackedColumn(m) : "stackedColumn100" === m.type ? A = this.renderStackedColumn100(m) : "stackedBar" === m.type ? A = this.renderStackedBar(m) : "stackedBar100" === m.type ? A = this.renderStackedBar100(m) : "stackedArea" === m.type ? A = this.renderStackedArea(m) : "stackedArea100" === m.type ? A = this.renderStackedArea100(m) : "bubble" === m.type ? A = A = this.renderBubble(m) : "scatter" === m.type ? A = this.renderScatter(m) : "pie" === m.type ? this.renderPie(m) : "doughnut" === m.type ? this.renderPie(m) : "funnel" === m.type ? A = this.renderFunnel(m) : "pyramid" === m.type ? A = this.renderFunnel(m) : "candlestick" === m.type ? A = this.renderCandlestick(m) : "ohlc" === m.type ? A = this.renderCandlestick(m) : "rangeColumn" === m.type ? A = this.renderRangeColumn(m) : "error" === m.type ? A = this.renderError(m) : "rangeBar" === m.type ? A = this.renderRangeBar(m) : "rangeArea" === m.type ? A = this.renderRangeArea(m) : "rangeSplineArea" === m.type ? A = this.renderRangeSplineArea(m) : "waterfall" === m.type ? A = this.renderWaterfall(m) : "boxAndWhisker" === m.type && (A = this.renderBoxAndWhisker(m));
        for (var h = 0; h < m.dataSeriesIndexes.length; h++) this._dataInRenderedOrder.push(this.data[m.dataSeriesIndexes[h]]);
        this.animatedRender && (m.targetCanvasCtx.miterLimit = e, A && c.push(A));
      }
      this.ctx.miterLimit = a;
      this.animatedRender && this._breaksCanvasCtx && c.push({
        source: this._breaksCanvasCtx,
        dest: this.plotArea.ctx,
        animationCallback: L.fadeInAnimation,
        easingFunction: L.easing.easeInQuad,
        animationBase: 0,
        startTimePercent: 0.7
      });
      this.animatedRender && 0 < this._indexLabels.length && (e = ta(this.width, this.height).getContext("2d"), c.push(this.renderIndexLabels(e)));
      var r = this;
      if (0 < c.length) r.disableToolTip = !0, r._animator.animate(200, r.animationDuration, function (a) {
        r.ctx.clearRect(0, 0, r.width, r.height);
        r.ctx.drawImage(b, 0, 0, Math.floor(r.width * ha), Math.floor(r.height * ha), 0, 0, r.width, r.height);
        for (var e = 0; e < c.length; e++) A = c[e], 1 > a && "undefined" !== typeof A.startTimePercent ? a >= A.startTimePercent && A.animationCallback(A.easingFunction(a - A.startTimePercent, 0, 1, 1 - A.startTimePercent), A) : A.animationCallback(A.easingFunction(a, 0, 1, 1), A);
        r.dispatchEvent("dataAnimationIterationEnd", {
          chart: r
        });
      }, function () {
        c = [];
        for (var a = 0; a < r.plotInfo.plotTypes.length; a++) for (var e = r.plotInfo.plotTypes[a], d = 0; d < e.plotUnits.length; d++) e.plotUnits[d].targetCanvas = null;
        b = null;
        r.disableToolTip = !1;
        r.dispatchEvent("dataAnimationEnd", {
          chart: r
        });
      });else {
        if (r._breaksCanvas) if (t) r.plotArea.ctx.drawImage(r._breaksCanvas, 0, 0, this.width, this.height);else for (h = 0; h < r._axes.length; h++) r._axes[h].createMask();
        0 < r._indexLabels.length && r.renderIndexLabels();
        r.dispatchEvent("dataAnimationIterationEnd", {
          chart: r
        });
        r.dispatchEvent("dataAnimationEnd", {
          chart: r
        });
      }
      this.attachPlotAreaEventHandlers();
      this.zoomEnabled || this.panEnabled || !this._zoomButton || "none" === this._zoomButton.style.display || ua(this._zoomButton, this._resetButton);
      this.toolTip._updateToolTip();
      this.renderCount++;
      Ha && (r = this, setTimeout(function () {
        var a = document.getElementById("ghostCanvasCopy");
        a && (Ma(a, r.width, r.height), a.getContext("2d").drawImage(r._eventManager.ghostCanvas, 0, 0));
      }, 2E3));
      this._breaksCanvas && (delete this._breaksCanvas, delete this._breaksCanvasCtx);
      for (h = 0; h < this._axes.length; h++) this._axes[h].maskCanvas && (delete this._axes[h].maskCanvas, delete this._axes[h].maskCtx);
    };
    l.prototype.render = function (a) {
      a && (this.options = a);
      this._initialize();
      this.setLayout();
      this.renderElements();
      this._preRenderCanvas = null;
    };
    l.prototype.attachPlotAreaEventHandlers = function () {
      this.attachEvent({
        context: this,
        chart: this,
        mousedown: this._plotAreaMouseDown,
        mouseup: this._plotAreaMouseUp,
        mousemove: this._plotAreaMouseMove,
        cursor: this.panEnabled ? "move" : "default",
        capture: !0,
        bounds: this.plotArea
      });
    };
    l.prototype.categoriseDataSeries = function () {
      for (var a = "", d = 0; d < this.data.length; d++) if (a = this.data[d], a.dataPoints && 0 !== a.dataPoints.length && a.visible && 0 <= l._supportedChartTypes.indexOf(a.type)) {
        for (var c = null, b = !1, e = null, f = !1, n = 0; n < this.plotInfo.plotTypes.length; n++) if (this.plotInfo.plotTypes[n].type === a.type) {
          b = !0;
          c = this.plotInfo.plotTypes[n];
          break;
        }
        b || (c = {
          type: a.type,
          totalDataSeries: 0,
          plotUnits: []
        }, this.plotInfo.plotTypes.push(c));
        for (n = 0; n < c.plotUnits.length; n++) if (c.plotUnits[n].axisYType === a.axisYType && c.plotUnits[n].axisXType === a.axisXType && c.plotUnits[n].axisYIndex === a.axisYIndex && c.plotUnits[n].axisXIndex === a.axisXIndex) {
          f = !0;
          e = c.plotUnits[n];
          break;
        }
        f || (e = {
          type: a.type,
          previousDataSeriesCount: 0,
          index: c.plotUnits.length,
          plotType: c,
          axisXType: a.axisXType,
          axisYType: a.axisYType,
          axisYIndex: a.axisYIndex,
          axisXIndex: a.axisXIndex,
          axisY: "primary" === a.axisYType ? this.axisY[0 <= a.axisYIndex && a.axisYIndex < this.axisY.length ? a.axisYIndex : 0] : this.axisY2[0 <= a.axisYIndex && a.axisYIndex < this.axisY2.length ? a.axisYIndex : 0],
          axisX: "primary" === a.axisXType ? this.axisX[0 <= a.axisXIndex && a.axisXIndex < this.axisX.length ? a.axisXIndex : 0] : this.axisX2[0 <= a.axisXIndex && a.axisXIndex < this.axisX2.length ? a.axisXIndex : 0],
          dataSeriesIndexes: [],
          yTotals: []
        }, c.plotUnits.push(e));
        c.totalDataSeries++;
        e.dataSeriesIndexes.push(d);
        a.plotUnit = e;
      }
      for (d = 0; d < this.plotInfo.plotTypes.length; d++) for (c = this.plotInfo.plotTypes[d], n = a = 0; n < c.plotUnits.length; n++) c.plotUnits[n].previousDataSeriesCount = a, a += c.plotUnits[n].dataSeriesIndexes.length;
    };
    l.prototype.assignIdToDataPoints = function () {
      for (var a = 0; a < this.data.length; a++) {
        var d = this.data[a];
        if (d.dataPoints) for (var c = d.dataPoints.length, b = 0; b < c; b++) d.dataPointIds[b] = ++this._eventManager.lastObjectId;
      }
    };
    l.prototype._processData = function () {
      this.assignIdToDataPoints();
      this.categoriseDataSeries();
      for (var a = 0; a < this.plotInfo.plotTypes.length; a++) for (var d = this.plotInfo.plotTypes[a], c = 0; c < d.plotUnits.length; c++) {
        var b = d.plotUnits[c];
        "line" === b.type || "stepLine" === b.type || "spline" === b.type || "column" === b.type || "area" === b.type || "stepArea" === b.type || "splineArea" === b.type || "bar" === b.type || "bubble" === b.type || "scatter" === b.type ? this._processMultiseriesPlotUnit(b) : "stackedColumn" === b.type || "stackedBar" === b.type || "stackedArea" === b.type ? this._processStackedPlotUnit(b) : "stackedColumn100" === b.type || "stackedBar100" === b.type || "stackedArea100" === b.type ? this._processStacked100PlotUnit(b) : "candlestick" === b.type || "ohlc" === b.type || "rangeColumn" === b.type || "rangeBar" === b.type || "rangeArea" === b.type || "rangeSplineArea" === b.type || "error" === b.type || "boxAndWhisker" === b.type ? this._processMultiYPlotUnit(b) : "waterfall" === b.type && this._processSpecificPlotUnit(b);
      }
      this.calculateAutoBreaks();
    };
    l.prototype._processMultiseriesPlotUnit = function (a) {
      if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) for (var d = a.axisY.dataInfo, c = a.axisX.dataInfo, b, e, f = !1, n = 0; n < a.dataSeriesIndexes.length; n++) {
        var m = this.data[a.dataSeriesIndexes[n]],
          A = 0,
          h = !1,
          r = !1,
          q;
        if ("normal" === m.axisPlacement || "xySwapped" === m.axisPlacement) var p = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : a.axisX.logarithmic ? 0 : -Infinity,
          g = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
        if (m.dataPoints[A].x && m.dataPoints[A].x.getTime || "dateTime" === m.xValueType) f = !0;
        for (A = 0; A < m.dataPoints.length; A++) {
          "undefined" === typeof m.dataPoints[A].x && (m.dataPoints[A].x = A + (a.axisX.logarithmic ? 1 : 0));
          m.dataPoints[A].x.getTime ? (f = !0, b = m.dataPoints[A].x.getTime()) : b = m.dataPoints[A].x;
          e = m.dataPoints[A].y;
          b < c.min && (c.min = b);
          b > c.max && (c.max = b);
          e < d.min && "number" === typeof e && (d.min = e);
          e > d.max && "number" === typeof e && (d.max = e);
          if (0 < A) {
            if (a.axisX.logarithmic) {
              var C = b / m.dataPoints[A - 1].x;
              1 > C && (C = 1 / C);
              c.minDiff > C && 1 !== C && (c.minDiff = C);
            } else C = b - m.dataPoints[A - 1].x, 0 > C && (C *= -1), c.minDiff > C && 0 !== C && (c.minDiff = C);
            null !== e && null !== m.dataPoints[A - 1].y && (a.axisY.logarithmic ? (C = e / m.dataPoints[A - 1].y, 1 > C && (C = 1 / C), d.minDiff > C && 1 !== C && (d.minDiff = C)) : (C = e - m.dataPoints[A - 1].y, 0 > C && (C *= -1), d.minDiff > C && 0 !== C && (d.minDiff = C)));
          }
          if (b < p && !h) null !== e && (q = b);else {
            if (!h && (h = !0, 0 < A)) {
              A -= 2;
              continue;
            }
            if (b > g && !r) r = !0;else if (b > g && r) continue;
            m.dataPoints[A].label && (a.axisX.labels[b] = m.dataPoints[A].label);
            b < c.viewPortMin && (c.viewPortMin = b);
            b > c.viewPortMax && (c.viewPortMax = b);
            null === e ? c.viewPortMin === b && q < b && (c.viewPortMin = q) : (e < d.viewPortMin && "number" === typeof e && (d.viewPortMin = e), e > d.viewPortMax && "number" === typeof e && (d.viewPortMax = e));
          }
        }
        m.axisX.valueType = m.xValueType = f ? "dateTime" : "number";
      }
    };
    l.prototype._processStackedPlotUnit = function (a) {
      if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) {
        for (var d = a.axisY.dataInfo, c = a.axisX.dataInfo, b, e, f = !1, n = [], m = [], A = Infinity, h = -Infinity, r = 0; r < a.dataSeriesIndexes.length; r++) {
          var q = this.data[a.dataSeriesIndexes[r]],
            p = 0,
            g = !1,
            C = !1,
            k;
          if ("normal" === q.axisPlacement || "xySwapped" === q.axisPlacement) var da = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : -Infinity,
            u = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
          if (q.dataPoints[p].x && q.dataPoints[p].x.getTime || "dateTime" === q.xValueType) f = !0;
          for (p = 0; p < q.dataPoints.length; p++) {
            "undefined" === typeof q.dataPoints[p].x && (q.dataPoints[p].x = p + (a.axisX.logarithmic ? 1 : 0));
            q.dataPoints[p].x.getTime ? (f = !0, b = q.dataPoints[p].x.getTime()) : b = q.dataPoints[p].x;
            e = s(q.dataPoints[p].y) ? 0 : q.dataPoints[p].y;
            b < c.min && (c.min = b);
            b > c.max && (c.max = b);
            if (0 < p) {
              if (a.axisX.logarithmic) {
                var l = b / q.dataPoints[p - 1].x;
                1 > l && (l = 1 / l);
                c.minDiff > l && 1 !== l && (c.minDiff = l);
              } else l = b - q.dataPoints[p - 1].x, 0 > l && (l *= -1), c.minDiff > l && 0 !== l && (c.minDiff = l);
              null !== e && null !== q.dataPoints[p - 1].y && (a.axisY.logarithmic ? 0 < e && (l = e / q.dataPoints[p - 1].y, 1 > l && (l = 1 / l), d.minDiff > l && 1 !== l && (d.minDiff = l)) : (l = e - q.dataPoints[p - 1].y, 0 > l && (l *= -1), d.minDiff > l && 0 !== l && (d.minDiff = l)));
            }
            if (b < da && !g) null !== q.dataPoints[p].y && (k = b);else {
              if (!g && (g = !0, 0 < p)) {
                p -= 2;
                continue;
              }
              if (b > u && !C) C = !0;else if (b > u && C) continue;
              q.dataPoints[p].label && (a.axisX.labels[b] = q.dataPoints[p].label);
              b < c.viewPortMin && (c.viewPortMin = b);
              b > c.viewPortMax && (c.viewPortMax = b);
              null === q.dataPoints[p].y ? c.viewPortMin === b && k < b && (c.viewPortMin = k) : (a.yTotals[b] = (a.yTotals[b] ? a.yTotals[b] : 0) + e, 0 <= e ? n[b] ? n[b] += e : (n[b] = e, A = Math.min(e, A)) : m[b] ? m[b] += e : (m[b] = e, h = Math.max(e, h)));
            }
          }
          a.axisY.scaleBreaks && a.axisY.scaleBreaks.autoCalculate && 1 <= a.axisY.scaleBreaks.maxNumberOfAutoBreaks && (d.dataPointYPositiveSums ? (d.dataPointYPositiveSums.push.apply(d.dataPointYPositiveSums, n), d.dataPointYNegativeSums.push.apply(d.dataPointYPositiveSums, m)) : (d.dataPointYPositiveSums = n, d.dataPointYNegativeSums = m));
          q.axisX.valueType = q.xValueType = f ? "dateTime" : "number";
        }
        for (p in n) n.hasOwnProperty(p) && !isNaN(p) && (a = n[p], a < d.min && (d.min = Math.min(a, A)), a > d.max && (d.max = a), p < c.viewPortMin || p > c.viewPortMax || (a < d.viewPortMin && (d.viewPortMin = Math.min(a, A)), a > d.viewPortMax && (d.viewPortMax = a)));
        for (p in m) m.hasOwnProperty(p) && !isNaN(p) && (a = m[p], a < d.min && (d.min = a), a > d.max && (d.max = Math.max(a, h)), p < c.viewPortMin || p > c.viewPortMax || (a < d.viewPortMin && (d.viewPortMin = a), a > d.viewPortMax && (d.viewPortMax = Math.max(a, h))));
      }
    };
    l.prototype._processStacked100PlotUnit = function (a) {
      if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) {
        for (var d = a.axisY.dataInfo, c = a.axisX.dataInfo, b, e, f = !1, n = !1, m = !1, A = [], h = 0; h < a.dataSeriesIndexes.length; h++) {
          var r = this.data[a.dataSeriesIndexes[h]],
            q = 0,
            p = !1,
            g = !1,
            C;
          if ("normal" === r.axisPlacement || "xySwapped" === r.axisPlacement) var k = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : -Infinity,
            l = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
          if (r.dataPoints[q].x && r.dataPoints[q].x.getTime || "dateTime" === r.xValueType) f = !0;
          for (q = 0; q < r.dataPoints.length; q++) {
            "undefined" === typeof r.dataPoints[q].x && (r.dataPoints[q].x = q + (a.axisX.logarithmic ? 1 : 0));
            r.dataPoints[q].x.getTime ? (f = !0, b = r.dataPoints[q].x.getTime()) : b = r.dataPoints[q].x;
            e = s(r.dataPoints[q].y) ? null : r.dataPoints[q].y;
            b < c.min && (c.min = b);
            b > c.max && (c.max = b);
            if (0 < q) {
              if (a.axisX.logarithmic) {
                var u = b / r.dataPoints[q - 1].x;
                1 > u && (u = 1 / u);
                c.minDiff > u && 1 !== u && (c.minDiff = u);
              } else u = b - r.dataPoints[q - 1].x, 0 > u && (u *= -1), c.minDiff > u && 0 !== u && (c.minDiff = u);
              s(e) || null === r.dataPoints[q - 1].y || (a.axisY.logarithmic ? 0 < e && (u = e / r.dataPoints[q - 1].y, 1 > u && (u = 1 / u), d.minDiff > u && 1 !== u && (d.minDiff = u)) : (u = e - r.dataPoints[q - 1].y, 0 > u && (u *= -1), d.minDiff > u && 0 !== u && (d.minDiff = u)));
            }
            if (b < k && !p) null !== e && (C = b);else {
              if (!p && (p = !0, 0 < q)) {
                q -= 2;
                continue;
              }
              if (b > l && !g) g = !0;else if (b > l && g) continue;
              r.dataPoints[q].label && (a.axisX.labels[b] = r.dataPoints[q].label);
              b < c.viewPortMin && (c.viewPortMin = b);
              b > c.viewPortMax && (c.viewPortMax = b);
              null === e ? c.viewPortMin === b && C < b && (c.viewPortMin = C) : (a.yTotals[b] = (a.yTotals[b] ? a.yTotals[b] : 0) + e, 0 <= e ? n = !0 : 0 > e && (m = !0), A[b] = A[b] ? A[b] + Math.abs(e) : Math.abs(e));
            }
          }
          r.axisX.valueType = r.xValueType = f ? "dateTime" : "number";
        }
        a.axisY.logarithmic ? (d.max = s(d.viewPortMax) ? 99 * Math.pow(a.axisY.logarithmBase, -0.05) : Math.max(d.viewPortMax, 99 * Math.pow(a.axisY.logarithmBase, -0.05)), d.min = s(d.viewPortMin) ? 1 : Math.min(d.viewPortMin, 1)) : n && !m ? (d.max = s(d.viewPortMax) ? 99 : Math.max(d.viewPortMax, 99), d.min = s(d.viewPortMin) ? 1 : Math.min(d.viewPortMin, 1)) : n && m ? (d.max = s(d.viewPortMax) ? 99 : Math.max(d.viewPortMax, 99), d.min = s(d.viewPortMin) ? -99 : Math.min(d.viewPortMin, -99)) : !n && m && (d.max = s(d.viewPortMax) ? -1 : Math.max(d.viewPortMax, -1), d.min = s(d.viewPortMin) ? -99 : Math.min(d.viewPortMin, -99));
        d.viewPortMin = d.min;
        d.viewPortMax = d.max;
        a.dataPointYSums = A;
      }
    };
    l.prototype._processMultiYPlotUnit = function (a) {
      if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) for (var d = a.axisY.dataInfo, c = a.axisX.dataInfo, b, e, f, n, m = !1, A = 0; A < a.dataSeriesIndexes.length; A++) {
        var h = this.data[a.dataSeriesIndexes[A]],
          r = 0,
          q = !1,
          p = !1,
          g,
          C,
          k;
        if ("normal" === h.axisPlacement || "xySwapped" === h.axisPlacement) var l = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : a.axisX.logarithmic ? 0 : -Infinity,
          u = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
        if (h.dataPoints[r].x && h.dataPoints[r].x.getTime || "dateTime" === h.xValueType) m = !0;
        for (r = 0; r < h.dataPoints.length; r++) {
          "undefined" === typeof h.dataPoints[r].x && (h.dataPoints[r].x = r + (a.axisX.logarithmic ? 1 : 0));
          h.dataPoints[r].x.getTime ? (m = !0, b = h.dataPoints[r].x.getTime()) : b = h.dataPoints[r].x;
          if ((e = h.dataPoints[r].y) && e.length) {
            f = Math.min.apply(null, e);
            n = Math.max.apply(null, e);
            C = !0;
            for (var x = 0; x < e.length; x++) null === e.k && (C = !1);
            C && (q || (k = g), g = b);
          }
          b < c.min && (c.min = b);
          b > c.max && (c.max = b);
          f < d.min && (d.min = f);
          n > d.max && (d.max = n);
          0 < r && (a.axisX.logarithmic ? (C = b / h.dataPoints[r - 1].x, 1 > C && (C = 1 / C), c.minDiff > C && 1 !== C && (c.minDiff = C)) : (C = b - h.dataPoints[r - 1].x, 0 > C && (C *= -1), c.minDiff > C && 0 !== C && (c.minDiff = C)), e && null !== e[0] && h.dataPoints[r - 1].y && null !== h.dataPoints[r - 1].y[0] && (a.axisY.logarithmic ? (C = e[0] / h.dataPoints[r - 1].y[0], 1 > C && (C = 1 / C), d.minDiff > C && 1 !== C && (d.minDiff = C)) : (C = e[0] - h.dataPoints[r - 1].y[0], 0 > C && (C *= -1), d.minDiff > C && 0 !== C && (d.minDiff = C))));
          if (!(b < l) || q) {
            if (!q && (q = !0, 0 < r)) {
              r -= 2;
              g = k;
              continue;
            }
            if (b > u && !p) p = !0;else if (b > u && p) continue;
            h.dataPoints[r].label && (a.axisX.labels[b] = h.dataPoints[r].label);
            b < c.viewPortMin && (c.viewPortMin = b);
            b > c.viewPortMax && (c.viewPortMax = b);
            if (c.viewPortMin === b && e) for (x = 0; x < e.length; x++) if (null === e[x] && g < b) {
              c.viewPortMin = g;
              break;
            }
            null === e ? c.viewPortMin === b && g < b && (c.viewPortMin = g) : (f < d.viewPortMin && (d.viewPortMin = f), n > d.viewPortMax && (d.viewPortMax = n));
          }
        }
        h.axisX.valueType = h.xValueType = m ? "dateTime" : "number";
      }
    };
    l.prototype._processSpecificPlotUnit = function (a) {
      if ("waterfall" === a.type && a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) for (var d = a.axisY.dataInfo, c = a.axisX.dataInfo, b, e, f = !1, n = 0; n < a.dataSeriesIndexes.length; n++) {
        var m = this.data[a.dataSeriesIndexes[n]],
          A = 0,
          h = !1,
          r = !1,
          q = b = 0;
        if ("normal" === m.axisPlacement || "xySwapped" === m.axisPlacement) var p = a.axisX.sessionVariables.newViewportMinimum ? a.axisX.sessionVariables.newViewportMinimum : this.options.axisX && this.options.axisX.viewportMinimum ? this.options.axisX.viewportMinimum : this.options.axisX && this.options.axisX.minimum ? this.options.axisX.minimum : a.axisX.logarithmic ? 0 : -Infinity,
          g = a.axisX.sessionVariables.newViewportMaximum ? a.axisX.sessionVariables.newViewportMaximum : this.options.axisX && this.options.axisX.viewportMaximum ? this.options.axisX.viewportMaximum : this.options.axisX && this.options.axisX.maximum ? this.options.axisX.maximum : Infinity;
        if (m.dataPoints[A].x && m.dataPoints[A].x.getTime || "dateTime" === m.xValueType) f = !0;
        for (A = 0; A < m.dataPoints.length; A++) "undefined" !== typeof m.dataPoints[A].isCumulativeSum && !0 === m.dataPoints[A].isCumulativeSum ? (m.dataPointEOs[A].cumulativeSumYStartValue = 0, m.dataPointEOs[A].cumulativeSum = 0 === A ? 0 : m.dataPointEOs[A - 1].cumulativeSum, m.dataPoints[A].y = 0 === A ? 0 : m.dataPointEOs[A - 1].cumulativeSum) : "undefined" !== typeof m.dataPoints[A].isIntermediateSum && !0 === m.dataPoints[A].isIntermediateSum ? (m.dataPointEOs[A].cumulativeSumYStartValue = q, m.dataPointEOs[A].cumulativeSum = 0 === A ? 0 : m.dataPointEOs[A - 1].cumulativeSum, m.dataPoints[A].y = 0 === A ? 0 : b, q = 0 === A ? 0 : m.dataPointEOs[A - 1].cumulativeSum, b = 0) : (e = "number" !== typeof m.dataPoints[A].y ? 0 : m.dataPoints[A].y, m.dataPointEOs[A].cumulativeSumYStartValue = 0 === A ? 0 : m.dataPointEOs[A - 1].cumulativeSum, m.dataPointEOs[A].cumulativeSum = 0 === A ? e : m.dataPointEOs[A - 1].cumulativeSum + e, b += e);
        for (A = 0; A < m.dataPoints.length; A++) if ("undefined" === typeof m.dataPoints[A].x && (m.dataPoints[A].x = A + (a.axisX.logarithmic ? 1 : 0)), m.dataPoints[A].x.getTime ? (f = !0, b = m.dataPoints[A].x.getTime()) : b = m.dataPoints[A].x, e = m.dataPoints[A].y, b < c.min && (c.min = b), b > c.max && (c.max = b), m.dataPointEOs[A].cumulativeSum < d.min && (d.min = m.dataPointEOs[A].cumulativeSum), m.dataPointEOs[A].cumulativeSum > d.max && (d.max = m.dataPointEOs[A].cumulativeSum), 0 < A && (a.axisX.logarithmic ? (q = b / m.dataPoints[A - 1].x, 1 > q && (q = 1 / q), c.minDiff > q && 1 !== q && (c.minDiff = q)) : (q = b - m.dataPoints[A - 1].x, 0 > q && (q *= -1), c.minDiff > q && 0 !== q && (c.minDiff = q)), null !== e && null !== m.dataPoints[A - 1].y && (a.axisY.logarithmic ? (e = m.dataPointEOs[A].cumulativeSum / m.dataPointEOs[A - 1].cumulativeSum, 1 > e && (e = 1 / e), d.minDiff > e && 1 !== e && (d.minDiff = e)) : (e = m.dataPointEOs[A].cumulativeSum - m.dataPointEOs[A - 1].cumulativeSum, 0 > e && (e *= -1), d.minDiff > e && 0 !== e && (d.minDiff = e)))), !(b < p) || h) {
          if (!h && (h = !0, 0 < A)) {
            A -= 2;
            continue;
          }
          if (b > g && !r) r = !0;else if (b > g && r) continue;
          m.dataPoints[A].label && (a.axisX.labels[b] = m.dataPoints[A].label);
          b < c.viewPortMin && (c.viewPortMin = b);
          b > c.viewPortMax && (c.viewPortMax = b);
          0 < A && (m.dataPointEOs[A - 1].cumulativeSum < d.viewPortMin && (d.viewPortMin = m.dataPointEOs[A - 1].cumulativeSum), m.dataPointEOs[A - 1].cumulativeSum > d.viewPortMax && (d.viewPortMax = m.dataPointEOs[A - 1].cumulativeSum));
          m.dataPointEOs[A].cumulativeSum < d.viewPortMin && (d.viewPortMin = m.dataPointEOs[A].cumulativeSum);
          m.dataPointEOs[A].cumulativeSum > d.viewPortMax && (d.viewPortMax = m.dataPointEOs[A].cumulativeSum);
        }
        m.axisX.valueType = m.xValueType = f ? "dateTime" : "number";
      }
    };
    l.prototype.calculateAutoBreaks = function () {
      function a(a, b, c, e) {
        if (e) return c = Math.pow(Math.min(c * a / b, b / a), 0.2), 1 >= c && (c = Math.pow(1 > a ? 1 / a : Math.min(b / a, a), 0.25)), {
          startValue: a * c,
          endValue: b / c
        };
        c = 0.2 * Math.min(c - b + a, b - a);
        0 >= c && (c = 0.25 * Math.min(b - a, Math.abs(a)));
        return {
          startValue: a + c,
          endValue: b - c
        };
      }
      function d(a) {
        if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length)) {
          var b = a.axisX.scaleBreaks && a.axisX.scaleBreaks.autoCalculate && 1 <= a.axisX.scaleBreaks.maxNumberOfAutoBreaks,
            c = a.axisY.scaleBreaks && a.axisY.scaleBreaks.autoCalculate && 1 <= a.axisY.scaleBreaks.maxNumberOfAutoBreaks;
          if (b || c) for (var d = a.axisY.dataInfo, f = a.axisX.dataInfo, g, h = f.min, n = f.max, m = d.min, r = d.max, f = f._dataRanges, d = d._dataRanges, p, q = 0, A = 0; A < a.dataSeriesIndexes.length; A++) {
            var k = e.data[a.dataSeriesIndexes[A]];
            if (!(4 > k.dataPoints.length)) for (q = 0; q < k.dataPoints.length; q++) if (b && (p = (n + 1 - h) * Math.max(parseFloat(a.axisX.scaleBreaks.collapsibleThreshold) || 10, 10) / 100, g = k.dataPoints[q].x.getTime ? k.dataPoints[q].x.getTime() : k.dataPoints[q].x, p = Math.floor((g - h) / p), g < f[p].min && (f[p].min = g), g > f[p].max && (f[p].max = g)), c) {
              var l = (r + 1 - m) * Math.max(parseFloat(a.axisY.scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
              if ((g = "waterfall" === a.type ? k.dataPointEOs[q].cumulativeSum : k.dataPoints[q].y) && g.length) for (var t = 0; t < g.length; t++) p = Math.floor((g[t] - m) / l), g[t] < d[p].min && (d[p].min = g[t]), g[t] > d[p].max && (d[p].max = g[t]);else s(g) || (p = Math.floor((g - m) / l), g < d[p].min && (d[p].min = g), g > d[p].max && (d[p].max = g));
            }
          }
        }
      }
      function c(a) {
        if (a.dataSeriesIndexes && !(1 > a.dataSeriesIndexes.length) && a.axisX.scaleBreaks && a.axisX.scaleBreaks.autoCalculate && 1 <= a.axisX.scaleBreaks.maxNumberOfAutoBreaks) for (var b = a.axisX.dataInfo, c = b.min, d = b.max, f = b._dataRanges, g, h = 0, n = 0; n < a.dataSeriesIndexes.length; n++) {
          var m = e.data[a.dataSeriesIndexes[n]];
          if (!(4 > m.dataPoints.length)) for (h = 0; h < m.dataPoints.length; h++) g = (d + 1 - c) * Math.max(parseFloat(a.axisX.scaleBreaks.collapsibleThreshold) || 10, 10) / 100, b = m.dataPoints[h].x.getTime ? m.dataPoints[h].x.getTime() : m.dataPoints[h].x, g = Math.floor((b - c) / g), b < f[g].min && (f[g].min = b), b > f[g].max && (f[g].max = b);
        }
      }
      for (var b, e = this, f = !1, n = 0; n < this._axes.length; n++) if (this._axes[n].scaleBreaks && this._axes[n].scaleBreaks.autoCalculate && 1 <= this._axes[n].scaleBreaks.maxNumberOfAutoBreaks) {
        f = !0;
        this._axes[n].dataInfo._dataRanges = [];
        for (var m = 0; m < 100 / Math.max(parseFloat(this._axes[n].scaleBreaks.collapsibleThreshold) || 10, 10); m++) this._axes[n].dataInfo._dataRanges.push({
          min: Infinity,
          max: -Infinity
        });
      }
      if (f) {
        for (n = 0; n < this.plotInfo.plotTypes.length; n++) for (f = this.plotInfo.plotTypes[n], m = 0; m < f.plotUnits.length; m++) b = f.plotUnits[m], "line" === b.type || "stepLine" === b.type || "spline" === b.type || "column" === b.type || "area" === b.type || "stepArea" === b.type || "splineArea" === b.type || "bar" === b.type || "bubble" === b.type || "scatter" === b.type || "candlestick" === b.type || "ohlc" === b.type || "rangeColumn" === b.type || "rangeBar" === b.type || "rangeArea" === b.type || "rangeSplineArea" === b.type || "waterfall" === b.type || "error" === b.type || "boxAndWhisker" === b.type ? d(b) : 0 <= b.type.indexOf("stacked") && c(b);
        for (n = 0; n < this._axes.length; n++) if (this._axes[n].dataInfo._dataRanges) {
          var A = this._axes[n].dataInfo.min;
          b = (this._axes[n].dataInfo.max + 1 - A) * Math.max(parseFloat(this._axes[n].scaleBreaks.collapsibleThreshold) || 10, 10) / 100;
          var h = this._axes[n].dataInfo._dataRanges,
            r,
            q,
            f = [];
          if (this._axes[n].dataInfo.dataPointYPositiveSums) {
            var p = this._axes[n].dataInfo.dataPointYPositiveSums;
            r = h;
            for (m in p) if (p.hasOwnProperty(m) && !isNaN(m) && (q = p[m], !s(q))) {
              var g = Math.floor((q - A) / b);
              q < r[g].min && (r[g].min = q);
              q > r[g].max && (r[g].max = q);
            }
            delete this._axes[n].dataInfo.dataPointYPositiveSums;
          }
          if (this._axes[n].dataInfo.dataPointYNegativeSums) {
            p = this._axes[n].dataInfo.dataPointYNegativeSums;
            r = h;
            for (m in p) p.hasOwnProperty(m) && !isNaN(m) && (q = -1 * p[m], s(q) || (g = Math.floor((q - A) / b), q < r[g].min && (r[g].min = q), q > r[g].max && (r[g].max = q)));
            delete this._axes[n].dataInfo.dataPointYNegativeSums;
          }
          for (m = 0; m < h.length - 1; m++) if (r = h[m].max, isFinite(r)) for (; m < h.length - 1;) if (A = h[m + 1].min, isFinite(A)) {
            q = A - r;
            q > b && f.push({
              diff: q,
              start: r,
              end: A
            });
            break;
          } else m++;
          if (this._axes[n].scaleBreaks.customBreaks) for (m = 0; m < this._axes[n].scaleBreaks.customBreaks.length; m++) for (b = 0; b < f.length; b++) if (this._axes[n].scaleBreaks.customBreaks[m].startValue <= f[b].start && f[b].start <= this._axes[n].scaleBreaks.customBreaks[m].endValue || this._axes[n].scaleBreaks.customBreaks[m].startValue <= f[b].start && f[b].start <= this._axes[n].scaleBreaks.customBreaks[m].endValue || f[b].start <= this._axes[n].scaleBreaks.customBreaks[m].startValue && this._axes[n].scaleBreaks.customBreaks[m].startValue <= f[b].end || f[b].start <= this._axes[n].scaleBreaks.customBreaks[m].endValue && this._axes[n].scaleBreaks.customBreaks[m].endValue <= f[b].end) f.splice(b, 1), b--;
          f.sort(function (a, b) {
            return b.diff - a.diff;
          });
          for (m = 0; m < Math.min(f.length, this._axes[n].scaleBreaks.maxNumberOfAutoBreaks); m++) b = a(f[m].start, f[m].end, this._axes[n].logarithmic ? this._axes[n].dataInfo.max / this._axes[n].dataInfo.min : this._axes[n].dataInfo.max - this._axes[n].dataInfo.min, this._axes[n].logarithmic), this._axes[n].scaleBreaks.autoBreaks.push(new U(this, "autoBreaks", b, m, ++this._eventManager.lastObjectId, this._axes[n].scaleBreaks)), this._axes[n].scaleBreaks._appliedBreaks.push(this._axes[n].scaleBreaks.autoBreaks[this._axes[n].scaleBreaks.autoBreaks.length - 1]);
          this._axes[n].scaleBreaks._appliedBreaks.sort(function (a, b) {
            return a.startValue - b.startValue;
          });
        }
      }
    };
    l.prototype.renderCrosshairs = function (a) {
      for (var d = 0; d < this.axisX.length; d++) this.axisX[d] != a && this.axisX[d].crosshair && this.axisX[d].crosshair.enabled && !this.axisX[d].crosshair._hidden && this.axisX[d].showCrosshair(this.axisX[d].crosshair._updatedValue);
      for (d = 0; d < this.axisX2.length; d++) this.axisX2[d] != a && this.axisX2[d].crosshair && this.axisX2[d].crosshair.enabled && !this.axisX2[d].crosshair._hidden && this.axisX2[d].showCrosshair(this.axisX2[d].crosshair._updatedValue);
      for (d = 0; d < this.axisY.length; d++) this.axisY[d] != a && this.axisY[d].crosshair && this.axisY[d].crosshair.enabled && !this.axisY[d].crosshair._hidden && this.axisY[d].showCrosshair(this.axisY[d].crosshair._updatedValue);
      for (d = 0; d < this.axisY2.length; d++) this.axisY2[d] != a && this.axisY2[d].crosshair && this.axisY2[d].crosshair.enabled && !this.axisY2[d].crosshair._hidden && this.axisY2[d].showCrosshair(this.axisY2[d].crosshair._updatedValue);
    };
    l.prototype.getDataPointAtXY = function (a, d, c) {
      c = c || !1;
      for (var b = [], e = this._dataInRenderedOrder.length - 1; 0 <= e; e--) {
        var f = null;
        (f = this._dataInRenderedOrder[e].getDataPointAtXY(a, d, c)) && b.push(f);
      }
      a = null;
      d = !1;
      for (c = 0; c < b.length; c++) if ("line" === b[c].dataSeries.type || "stepLine" === b[c].dataSeries.type || "area" === b[c].dataSeries.type || "stepArea" === b[c].dataSeries.type) if (e = la("markerSize", b[c].dataPoint, b[c].dataSeries) || 8, b[c].distance <= e / 2) {
        d = !0;
        break;
      }
      for (c = 0; c < b.length; c++) d && "line" !== b[c].dataSeries.type && "stepLine" !== b[c].dataSeries.type && "area" !== b[c].dataSeries.type && "stepArea" !== b[c].dataSeries.type || (a ? b[c].distance <= a.distance && (a = b[c]) : a = b[c]);
      return a;
    };
    l.prototype.getObjectAtXY = function (a, d, c) {
      var b = null;
      if (c = this.getDataPointAtXY(a, d, c || !1)) b = c.dataSeries.dataPointIds[c.dataPointIndex];else if (t) b = Za(a, d, this._eventManager.ghostCtx);else for (c = 0; c < this.legend.items.length; c++) {
        var e = this.legend.items[c];
        a >= e.x1 && a <= e.x2 && d >= e.y1 && d <= e.y2 && (b = e.id);
      }
      return b;
    };
    l.prototype.getAutoFontSize = lb;
    l.prototype.resetOverlayedCanvas = function () {
      this.overlaidCanvasCtx.clearRect(0, 0, this.width, this.height);
    };
    l.prototype.clearCanvas = kb;
    l.prototype.attachEvent = function (a) {
      this._events.push(a);
    };
    l.prototype._touchEventHandler = function (a) {
      if (a.changedTouches && this.interactivityEnabled) {
        var d = [],
          c = a.changedTouches,
          b = c ? c[0] : a,
          e = null;
        switch (a.type) {
          case "touchstart":
          case "MSPointerDown":
            d = ["mousemove", "mousedown"];
            this._lastTouchData = Oa(b);
            this._lastTouchData.time = new Date();
            break;
          case "touchmove":
          case "MSPointerMove":
            d = ["mousemove"];
            break;
          case "touchend":
          case "MSPointerUp":
            var f = this._lastTouchData && this._lastTouchData.time ? new Date() - this._lastTouchData.time : 0,
              d = "touchstart" === this._lastTouchEventType || "MSPointerDown" === this._lastTouchEventType || 300 > f ? ["mouseup", "click"] : ["mouseup"];
            break;
          default:
            return;
        }
        if (!(c && 1 < c.length)) {
          e = Oa(b);
          e.time = new Date();
          try {
            var n = e.y - this._lastTouchData.y,
              f = e.time - this._lastTouchData.time;
            if (1 < Math.abs(n) && this._lastTouchData.scroll || 5 < Math.abs(n) && 250 > f) this._lastTouchData.scroll = !0;
          } catch (m) {}
          this._lastTouchEventType = a.type;
          if (this._lastTouchData.scroll && this.zoomEnabled) this.isDrag && this.resetOverlayedCanvas(), this.isDrag = !1;else for (c = 0; c < d.length; c++) if (e = d[c], n = document.createEvent("MouseEvent"), n.initMouseEvent(e, !0, !0, window, 1, b.screenX, b.screenY, b.clientX, b.clientY, !1, !1, !1, !1, 0, null), b.target.dispatchEvent(n), !s(this._lastTouchData.scroll) && !this._lastTouchData.scroll || !this._lastTouchData.scroll && 250 < f || "click" === e) a.preventManipulation && a.preventManipulation(), a.preventDefault && a.preventDefault();
        }
      }
    };
    l.prototype._dispatchRangeEvent = function (a, d) {
      var c = {
        chart: this
      };
      c.type = a;
      c.trigger = d;
      var b = [];
      this.axisX && 0 < this.axisX.length && b.push("axisX");
      this.axisX2 && 0 < this.axisX2.length && b.push("axisX2");
      this.axisY && 0 < this.axisY.length && b.push("axisY");
      this.axisY2 && 0 < this.axisY2.length && b.push("axisY2");
      for (var e = 0; e < b.length; e++) if (s(c[b[e]]) && (c[b[e]] = []), "axisY" === b[e]) for (var f = 0; f < this.axisY.length; f++) c[b[e]].push({
        viewportMinimum: this[b[e]][f].sessionVariables.newViewportMinimum,
        viewportMaximum: this[b[e]][f].sessionVariables.newViewportMaximum
      });else if ("axisY2" === b[e]) for (f = 0; f < this.axisY2.length; f++) c[b[e]].push({
        viewportMinimum: this[b[e]][f].sessionVariables.newViewportMinimum,
        viewportMaximum: this[b[e]][f].sessionVariables.newViewportMaximum
      });else if ("axisX" === b[e]) for (f = 0; f < this.axisX.length; f++) c[b[e]].push({
        viewportMinimum: this[b[e]][f].sessionVariables.newViewportMinimum,
        viewportMaximum: this[b[e]][f].sessionVariables.newViewportMaximum
      });else if ("axisX2" === b[e]) for (f = 0; f < this.axisX2.length; f++) c[b[e]].push({
        viewportMinimum: this[b[e]][f].sessionVariables.newViewportMinimum,
        viewportMaximum: this[b[e]][f].sessionVariables.newViewportMaximum
      });
      this.dispatchEvent(a, c, this);
    };
    l.prototype._mouseEventHandler = function (a) {
      "undefined" === typeof a.target && a.srcElement && (a.target = a.srcElement);
      var d = Oa(a),
        c = a.type,
        b,
        e;
      a.which ? e = 3 == a.which : a.button && (e = 2 == a.button);
      l.capturedEventParam && (b = l.capturedEventParam, "mouseup" === c && (l.capturedEventParam = null, b.chart.overlaidCanvas.releaseCapture ? b.chart.overlaidCanvas.releaseCapture() : document.documentElement.removeEventListener("mouseup", b.chart._mouseEventHandler, !1)), b.hasOwnProperty(c) && ("mouseup" !== c || b.chart.overlaidCanvas.releaseCapture ? a.target !== b.chart.overlaidCanvas && t || b[c].call(b.context, d.x, d.y) : a.target !== b.chart.overlaidCanvas && (b.chart.isDrag = !1)));
      if (this.interactivityEnabled) if (this._ignoreNextEvent) this._ignoreNextEvent = !1;else if (a.preventManipulation && a.preventManipulation(), a.preventDefault && a.preventDefault(), Ha && window.console && (window.console.log(c + " --\x3e x: " + d.x + "; y:" + d.y), e && window.console.log(a.which), "mouseup" === c && window.console.log("mouseup")), !e) {
        if (!l.capturedEventParam && this._events) {
          for (var f = 0; f < this._events.length; f++) if (this._events[f].hasOwnProperty(c)) if (b = this._events[f], e = b.bounds, d.x >= e.x1 && d.x <= e.x2 && d.y >= e.y1 && d.y <= e.y2) {
            b[c].call(b.context, d.x, d.y);
            "mousedown" === c && !0 === b.capture ? (l.capturedEventParam = b, this.overlaidCanvas.setCapture ? this.overlaidCanvas.setCapture() : document.documentElement.addEventListener("mouseup", this._mouseEventHandler, !1)) : "mouseup" === c && (b.chart.overlaidCanvas.releaseCapture ? b.chart.overlaidCanvas.releaseCapture() : document.documentElement.removeEventListener("mouseup", this._mouseEventHandler, !1));
            break;
          } else b = null;
          a.target.style.cursor = b && b.cursor ? b.cursor : this._defaultCursor;
        }
        c = this.plotArea;
        if (d.x < c.x1 || d.x > c.x2 || d.y < c.y1 || d.y > c.y2) if (this.toolTip && this.toolTip.enabled) {
          this.toolTip.hide();
          this.toolTip.dispatchEvent("hidden", {
            chart: this,
            toolTip: this.toolTip
          }, this.toolTip);
          for (f = 0; f < this.axisX.length; f++) this.axisX[f].crosshair && this.axisX[f].crosshair.enabled && this.axisX[f].crosshair.dispatchEvent("hidden", {
            chart: this,
            axis: this.axisX[f].options
          }, this.axisX[f].crosshair);
          for (f = 0; f < this.axisX2.length; f++) this.axisX2[f].crosshair && this.axisX2[f].crosshair.enabled && this.axisX2[f].crosshair.dispatchEvent("hidden", {
            chart: this,
            axis: this.axisX2[f].options
          }, this.axisX2[f].crosshair);
          for (f = 0; f < this.axisY.length; f++) this.axisY[f].crosshair && this.axisY[f].crosshair.enabled && this.axisY[f].crosshair.dispatchEvent("hidden", {
            chart: this,
            axis: this.axisY[f].options
          }, this.axisY[f].crosshair);
          for (f = 0; f < this.axisY2.length; f++) this.axisY2[f].crosshair && this.axisY2[f].crosshair.enabled && this.axisY2[f].crosshair.dispatchEvent("hidden", {
            chart: this,
            axis: this.axisY2[f].options
          }, this.axisY2[f].crosshair);
        } else this.resetOverlayedCanvas();
        this.isDrag && this.zoomEnabled || !this._eventManager || this._eventManager.mouseEventHandler(a);
      }
    };
    l.prototype._plotAreaMouseDown = function (a, d) {
      this.isDrag = !0;
      this.dragStartPoint = {
        x: a,
        y: d
      };
    };
    l.prototype._plotAreaMouseUp = function (a, d) {
      if (("normal" === this.plotInfo.axisPlacement || "xySwapped" === this.plotInfo.axisPlacement) && this.isDrag) {
        var c = d - this.dragStartPoint.y,
          b = a - this.dragStartPoint.x,
          e = 0 <= this.zoomType.indexOf("x"),
          f = 0 <= this.zoomType.indexOf("y"),
          n = !1;
        this.resetOverlayedCanvas();
        if ("xySwapped" === this.plotInfo.axisPlacement) var m = f,
          f = e,
          e = m;
        if (this.panEnabled || this.zoomEnabled) {
          if (this.panEnabled) for (e = f = 0; e < this._axes.length; e++) c = this._axes[e], c.logarithmic ? c.viewportMinimum < c.minimum ? (f = c.minimum / c.viewportMinimum, c.sessionVariables.newViewportMinimum = c.viewportMinimum * f, c.sessionVariables.newViewportMaximum = c.viewportMaximum * f, n = !0) : c.viewportMaximum > c.maximum && (f = c.viewportMaximum / c.maximum, c.sessionVariables.newViewportMinimum = c.viewportMinimum / f, c.sessionVariables.newViewportMaximum = c.viewportMaximum / f, n = !0) : c.viewportMinimum < c.minimum ? (f = c.minimum - c.viewportMinimum, c.sessionVariables.newViewportMinimum = c.viewportMinimum + f, c.sessionVariables.newViewportMaximum = c.viewportMaximum + f, n = !0) : c.viewportMaximum > c.maximum && (f = c.viewportMaximum - c.maximum, c.sessionVariables.newViewportMinimum = c.viewportMinimum - f, c.sessionVariables.newViewportMaximum = c.viewportMaximum - f, n = !0);else if ((!e || 2 < Math.abs(b)) && (!f || 2 < Math.abs(c)) && this.zoomEnabled) {
            if (!this.dragStartPoint) return;
            c = e ? this.dragStartPoint.x : this.plotArea.x1;
            b = f ? this.dragStartPoint.y : this.plotArea.y1;
            e = e ? a : this.plotArea.x2;
            f = f ? d : this.plotArea.y2;
            2 < Math.abs(c - e) && 2 < Math.abs(b - f) && this._zoomPanToSelectedRegion(c, b, e, f) && (n = !0);
          }
          n && (this._ignoreNextEvent = !0, this._dispatchRangeEvent("rangeChanging", "zoom"), this.stockChart && this.stockChart.navigator && this.stockChart.navigator.enabled && (this.stockChart._rangeEventParameter.type = "rangeChanging", this.stockChart.dispatchEvent("rangeChanging", this.stockChart._rangeEventParameter, this.stockChart)), this.render(), this._dispatchRangeEvent("rangeChanged", "zoom"), this.stockChart && this.stockChart.navigator && this.stockChart.navigator.enabled && (this.stockChart._rangeEventParameter.type = "rangeChanged", this.stockChart.dispatchEvent("rangeChanged", this.stockChart._rangeEventParameter, this.stockChart)), n && this.zoomEnabled && "none" === this._zoomButton.style.display && (La(this._zoomButton, this._resetButton), va(this, this._zoomButton, "pan"), va(this, this._resetButton, "reset")));
        }
      }
      this.isDrag = !1;
      if ("none" !== this.plotInfo.axisPlacement) {
        this.resetOverlayedCanvas();
        if (this.axisX && 0 < this.axisX.length) for (n = 0; n < this.axisX.length; n++) this.axisX[n].crosshair && this.axisX[n].crosshair.enabled && this.axisX[n].renderCrosshair(a, d);
        if (this.axisX2 && 0 < this.axisX2.length) for (n = 0; n < this.axisX2.length; n++) this.axisX2[n].crosshair && this.axisX2[n].crosshair.enabled && this.axisX2[n].renderCrosshair(a, d);
        if (this.axisY && 0 < this.axisY.length) for (n = 0; n < this.axisY.length; n++) this.axisY[n].crosshair && this.axisY[n].crosshair.enabled && this.axisY[n].renderCrosshair(a, d);
        if (this.axisY2 && 0 < this.axisY2.length) for (n = 0; n < this.axisY2.length; n++) this.axisY2[n].crosshair && this.axisY2[n].crosshair.enabled && this.axisY2[n].renderCrosshair(a, d);
      }
    };
    l.prototype._plotAreaMouseMove = function (a, d) {
      if (this.isDrag && "none" !== this.plotInfo.axisPlacement) {
        var c = 0,
          b = 0,
          e = c = null,
          e = 0 <= this.zoomType.indexOf("x"),
          f = 0 <= this.zoomType.indexOf("y"),
          n = this;
        "xySwapped" === this.plotInfo.axisPlacement && (c = f, f = e, e = c);
        c = this.dragStartPoint.x - a;
        b = this.dragStartPoint.y - d;
        2 < Math.abs(c) && 8 > Math.abs(c) && (this.panEnabled || this.zoomEnabled) ? (this.toolTip.hide(), this.toolTip.dispatchEvent("hidden", {
          chart: this,
          toolTip: this.toolTip
        }, this.toolTip)) : this.panEnabled || this.zoomEnabled || this.toolTip.mouseMoveHandler(a, d);
        if ((!e || 2 < Math.abs(c) || !f || 2 < Math.abs(b)) && (this.panEnabled || this.zoomEnabled)) if (this.panEnabled) e = {
          x1: e ? this.plotArea.x1 + c : this.plotArea.x1,
          y1: f ? this.plotArea.y1 + b : this.plotArea.y1,
          x2: e ? this.plotArea.x2 + c : this.plotArea.x2,
          y2: f ? this.plotArea.y2 + b : this.plotArea.y2
        }, clearTimeout(n._panTimerId), n._panTimerId = setTimeout(function (b, c, e, f) {
          return function () {
            n._zoomPanToSelectedRegion(b, c, e, f, !0) && (n._dispatchRangeEvent("rangeChanging", "pan"), n.stockChart && n.stockChart.navigator && n.stockChart.navigator.enabled && (n.stockChart._rangeEventParameter.type = "rangeChanging", n.stockChart.dispatchEvent("rangeChanging", n.stockChart._rangeEventParameter, n.stockChart)), n.render(), n._dispatchRangeEvent("rangeChanged", "pan"), n.stockChart && n.stockChart.navigator && n.stockChart.navigator.enabled && (n.stockChart._rangeEventParameter.type = "rangeChanged", n.stockChart.dispatchEvent("rangeChanged", n.stockChart._rangeEventParameter, n.stockChart)), n.dragStartPoint.x = a, n.dragStartPoint.y = d);
          };
        }(e.x1, e.y1, e.x2, e.y2), 0);else if (this.zoomEnabled) {
          this.resetOverlayedCanvas();
          c = this.overlaidCanvasCtx.globalAlpha;
          this.overlaidCanvasCtx.fillStyle = "#A89896";
          var b = e ? this.dragStartPoint.x : this.plotArea.x1,
            m = f ? this.dragStartPoint.y : this.plotArea.y1,
            A = e ? a - this.dragStartPoint.x : this.plotArea.x2 - this.plotArea.x1,
            h = f ? d - this.dragStartPoint.y : this.plotArea.y2 - this.plotArea.y1;
          this.validateRegion(b, m, e ? a : this.plotArea.x2 - this.plotArea.x1, f ? d : this.plotArea.y2 - this.plotArea.y1, "xy" !== this.zoomType).isValid && (this.resetOverlayedCanvas(), this.overlaidCanvasCtx.fillStyle = "#99B2B5");
          this.overlaidCanvasCtx.globalAlpha = 0.7;
          this.overlaidCanvasCtx.fillRect(b, m, A, h);
          this.overlaidCanvasCtx.globalAlpha = c;
        }
      } else if (this.toolTip.mouseMoveHandler(a, d), "none" !== this.plotInfo.axisPlacement) {
        if (this.axisX && 0 < this.axisX.length) for (e = 0; e < this.axisX.length; e++) this.axisX[e].crosshair && this.axisX[e].crosshair.enabled && this.axisX[e].renderCrosshair(a, d);
        if (this.axisX2 && 0 < this.axisX2.length) for (e = 0; e < this.axisX2.length; e++) this.axisX2[e].crosshair && this.axisX2[e].crosshair.enabled && this.axisX2[e].renderCrosshair(a, d);
        if (this.axisY && 0 < this.axisY.length) for (e = 0; e < this.axisY.length; e++) this.axisY[e].crosshair && this.axisY[e].crosshair.enabled && this.axisY[e].renderCrosshair(a, d);
        if (this.axisY2 && 0 < this.axisY2.length) for (e = 0; e < this.axisY2.length; e++) this.axisY2[e].crosshair && this.axisY2[e].crosshair.enabled && this.axisY2[e].renderCrosshair(a, d);
      }
    };
    l.prototype._zoomPanToSelectedRegion = function (a, d, c, b, e) {
      a = this.validateRegion(a, d, c, b, e);
      d = a.axesWithValidRange;
      c = a.axesRanges;
      if (a.isValid) for (b = 0; b < d.length; b++) e = c[b], d[b].setViewPortRange(e.val1, e.val2), this.syncCharts && "y" != this.zoomType && this.syncCharts(e.val1, e.val2), this.stockChart && (this.stockChart._rangeEventParameter = {
        stockChart: this.stockChart,
        source: "chart",
        index: this.stockChart.charts.indexOf(this),
        minimum: e.val1,
        maximum: e.val2
      });
      return a.isValid;
    };
    l.prototype.validateRegion = function (a, d, c, b, e) {
      e = e || !1;
      for (var f = 0 <= this.zoomType.indexOf("x"), n = 0 <= this.zoomType.indexOf("y"), m = !1, A = [], h = [], r = [], q = 0; q < this._axes.length; q++) ("axisX" === this._axes[q].type && f || "axisY" === this._axes[q].type && n) && h.push(this._axes[q]);
      for (n = 0; n < h.length; n++) {
        var q = h[n],
          f = !1,
          p = q.convertPixelToValue({
            x: a,
            y: d
          }),
          g = q.convertPixelToValue({
            x: c,
            y: b
          });
        if (p > g) var C = g,
          g = p,
          p = C;
        if (q.scaleBreaks) for (C = 0; !f && C < q.scaleBreaks._appliedBreaks.length; C++) f = q.scaleBreaks._appliedBreaks[C].startValue <= p && q.scaleBreaks._appliedBreaks[C].endValue >= g;
        if (isFinite(q.dataInfo.minDiff)) if (C = q.getApparentDifference(p, g, null, !0), !(f || !(this.panEnabled && q.scaleBreaks && q.scaleBreaks._appliedBreaks.length) && (q.logarithmic && C < Math.pow(q.dataInfo.minDiff, 3) || !q.logarithmic && C < 3 * Math.abs(q.dataInfo.minDiff)) || p < q.minimum || g > q.maximum)) A.push(q), r.push({
          val1: p,
          val2: g
        }), m = !0;else if (!e) {
          m = !1;
          break;
        }
      }
      return {
        isValid: m,
        axesWithValidRange: A,
        axesRanges: r
      };
    };
    l.prototype.preparePlotArea = function () {
      var a = this.plotArea;
      !t && (0 < a.x1 || 0 < a.y1) && a.ctx.translate(a.x1, a.y1);
      if ((this.axisX[0] || this.axisX2[0]) && (this.axisY[0] || this.axisY2[0])) {
        var d = this.axisX[0] ? this.axisX[0].lineCoordinates : this.axisX2[0].lineCoordinates;
        if (this.axisY && 0 < this.axisY.length && this.axisY[0]) {
          var c = this.axisY[0];
          a.x1 = d.x1 < d.x2 ? d.x1 : c.lineCoordinates.x1;
          a.y1 = d.y1 < c.lineCoordinates.y1 ? d.y1 : c.lineCoordinates.y1;
          a.x2 = d.x2 > c.lineCoordinates.x2 ? d.x2 : c.lineCoordinates.x2;
          a.y2 = d.y2 > d.y1 ? d.y2 : c.lineCoordinates.y2;
          a.width = a.x2 - a.x1;
          a.height = a.y2 - a.y1;
        }
        this.axisY2 && 0 < this.axisY2.length && this.axisY2[0] && (c = this.axisY2[0], a.x1 = d.x1 < d.x2 ? d.x1 : c.lineCoordinates.x1, a.y1 = d.y1 < c.lineCoordinates.y1 ? d.y1 : c.lineCoordinates.y1, a.x2 = d.x2 > c.lineCoordinates.x2 ? d.x2 : c.lineCoordinates.x2, a.y2 = d.y2 > d.y1 ? d.y2 : c.lineCoordinates.y2, a.width = a.x2 - a.x1, a.height = a.y2 - a.y1);
      } else d = this.layoutManager.getFreeSpace(), a.x1 = d.x1, a.x2 = d.x2, a.y1 = d.y1, a.y2 = d.y2, a.width = d.width, a.height = d.height;
      t || (a.canvas.width = a.width, a.canvas.height = a.height, a.canvas.style.left = a.x1 + "px", a.canvas.style.top = a.y1 + "px", (0 < a.x1 || 0 < a.y1) && a.ctx.translate(-a.x1, -a.y1));
      a.layoutManager = new Ea(a.x1, a.y1, a.x2, a.y2, 2);
    };
    l.prototype.renderIndexLabels = function (a) {
      var d = a || this.plotArea.ctx,
        c = this.plotArea,
        b = 0,
        e = 0,
        f = 0,
        n = 0,
        m = b = n = e = f = 0,
        A = 0;
      for (a = 0; a < this._indexLabels.length; a++) {
        var h = this._indexLabels[a],
          r = h.chartType.toLowerCase(),
          q,
          p,
          m = la("indexLabelFontColor", h.dataPoint, h.dataSeries),
          A = la("indexLabelFontSize", h.dataPoint, h.dataSeries);
        q = la("indexLabelFontFamily", h.dataPoint, h.dataSeries);
        p = la("indexLabelFontStyle", h.dataPoint, h.dataSeries);
        var n = la("indexLabelFontWeight", h.dataPoint, h.dataSeries),
          g = la("indexLabelBackgroundColor", h.dataPoint, h.dataSeries),
          e = la("indexLabelMaxWidth", h.dataPoint, h.dataSeries),
          f = la("indexLabelWrap", h.dataPoint, h.dataSeries),
          C = la("indexLabelLineDashType", h.dataPoint, h.dataSeries),
          k = la("indexLabelLineColor", h.dataPoint, h.dataSeries),
          l = s(h.dataPoint.indexLabelLineThickness) ? s(h.dataSeries.options.indexLabelLineThickness) ? 0 : h.dataSeries.options.indexLabelLineThickness : h.dataPoint.indexLabelLineThickness,
          b = 0 < l ? Math.min(10, ("normal" === this.plotInfo.axisPlacement ? this.plotArea.height : this.plotArea.width) << 0) : 0,
          u = {
            percent: null,
            total: null
          },
          x = null;
        if (0 <= h.dataSeries.type.indexOf("stacked") || "pie" === h.dataSeries.type || "doughnut" === h.dataSeries.type) u = this.getPercentAndTotal(h.dataSeries, h.dataPoint);
        if (h.dataSeries.indexLabelFormatter || h.dataPoint.indexLabelFormatter) x = {
          chart: this,
          dataSeries: h.dataSeries,
          dataPoint: h.dataPoint,
          index: h.indexKeyword,
          total: u.total,
          percent: u.percent
        };
        var z = h.dataPoint.indexLabelFormatter ? h.dataPoint.indexLabelFormatter(x) : h.dataPoint.indexLabel ? this.replaceKeywordsWithValue(h.dataPoint.indexLabel, h.dataPoint, h.dataSeries, null, h.indexKeyword) : h.dataSeries.indexLabelFormatter ? h.dataSeries.indexLabelFormatter(x) : h.dataSeries.indexLabel ? this.replaceKeywordsWithValue(h.dataSeries.indexLabel, h.dataPoint, h.dataSeries, null, h.indexKeyword) : null;
        if (null !== z && "" !== z) {
          var u = la("indexLabelPlacement", h.dataPoint, h.dataSeries),
            x = la("indexLabelOrientation", h.dataPoint, h.dataSeries),
            D = h.direction,
            y = h.dataSeries.axisX,
            B = h.dataSeries.axisY,
            v = !1,
            g = new ja(d, {
              x: 0,
              y: 0,
              maxWidth: e ? e : 0.5 * this.width,
              maxHeight: f ? 5 * A : 1.5 * A,
              angle: "horizontal" === x ? 0 : -90,
              text: z,
              padding: 0,
              backgroundColor: g,
              horizontalAlign: "left",
              fontSize: A,
              fontFamily: q,
              fontWeight: n,
              fontColor: m,
              fontStyle: p,
              textBaseline: "top"
            });
          g.measureText();
          h.dataSeries.indexLabelMaxWidth = g.maxWidth;
          if ("stackedarea100" === r) {
            if (h.point.x < c.x1 || h.point.x > c.x2 || h.point.y < c.y1 - 1 || h.point.y > c.y2 + 1) continue;
          } else if ("rangearea" === r || "rangesplinearea" === r) {
            if (h.dataPoint.x < y.viewportMinimum || h.dataPoint.x > y.viewportMaximum || Math.max.apply(null, h.dataPoint.y) < B.viewportMinimum || Math.min.apply(null, h.dataPoint.y) > B.viewportMaximum) continue;
          } else if (0 <= r.indexOf("line") || 0 <= r.indexOf("area") || 0 <= r.indexOf("bubble") || 0 <= r.indexOf("scatter")) {
            if (h.dataPoint.x < y.viewportMinimum || h.dataPoint.x > y.viewportMaximum || h.dataPoint.y < B.viewportMinimum || h.dataPoint.y > B.viewportMaximum) continue;
          } else if (0 <= r.indexOf("column") || "waterfall" === r || "error" === r && !h.axisSwapped) {
            if (h.dataPoint.x < y.viewportMinimum || h.dataPoint.x > y.viewportMaximum || h.bounds.y1 > c.y2 || h.bounds.y2 < c.y1) continue;
          } else if (0 <= r.indexOf("bar") || "error" === r) {
            if (h.dataPoint.x < y.viewportMinimum || h.dataPoint.x > y.viewportMaximum || h.bounds.x1 > c.x2 || h.bounds.x2 < c.x1) continue;
          } else if ("candlestick" === r || "ohlc" === r) {
            if (h.dataPoint.x < y.viewportMinimum || h.dataPoint.x > y.viewportMaximum || Math.max.apply(null, h.dataPoint.y) < B.viewportMinimum || Math.min.apply(null, h.dataPoint.y) > B.viewportMaximum) continue;
          } else if (h.dataPoint.x < y.viewportMinimum || h.dataPoint.x > y.viewportMaximum) continue;
          e = n = 2;
          "horizontal" === x ? (m = g.width, A = g.height) : (A = g.width, m = g.height);
          if ("normal" === this.plotInfo.axisPlacement) {
            if (0 <= r.indexOf("line") || 0 <= r.indexOf("area")) u = "auto", n = 4;else if (0 <= r.indexOf("stacked")) "auto" === u && (u = "inside");else if ("bubble" === r || "scatter" === r) u = "inside";
            q = h.point.x - m / 2;
            "inside" !== u ? (e = c.y1, f = c.y2, 0 < D ? (p = h.point.y - A - n - b, p < e && (p = "auto" === u ? Math.max(h.point.y, e) + n + b : e + n + b, v = p + A > h.point.y)) : (p = h.point.y + n + b, p > f - A - n - b && (p = "auto" === u ? Math.min(h.point.y, f) - A - n - b : f - A - n - b, v = p < h.point.y))) : (e = Math.max(h.bounds.y1, c.y1), f = Math.min(h.bounds.y2, c.y2), b = 0 <= r.indexOf("range") || "error" === r ? 0 < D ? Math.max(h.bounds.y1, c.y1) + A / 2 + n : Math.min(h.bounds.y2, c.y2) - A / 2 - n : (Math.max(h.bounds.y1, c.y1) + Math.min(h.bounds.y2, c.y2)) / 2, 0 < D ? (p = Math.max(h.point.y, b) - A / 2, p < e && ("bubble" === r || "scatter" === r) && (p = Math.max(h.point.y - A - n, c.y1 + n))) : (p = Math.min(h.point.y, b) - A / 2, p > f - A - n && ("bubble" === r || "scatter" === r) && (p = Math.min(h.point.y + n, c.y2 - A - n))), p = Math.min(p, f - A));
          } else 0 <= r.indexOf("line") || 0 <= r.indexOf("area") || 0 <= r.indexOf("scatter") ? (u = "auto", e = 4) : 0 <= r.indexOf("stacked") ? "auto" === u && (u = "inside") : "bubble" === r && (u = "inside"), p = h.point.y - A / 2, "inside" !== u ? (n = c.x1, f = c.x2, 0 > D ? (q = h.point.x - m - e - b, q < n && (q = "auto" === u ? Math.max(h.point.x, n) + e + b : n + e + b, v = q + m > h.point.x)) : (q = h.point.x + e + b, q > f - m - e - b && (q = "auto" === u ? Math.min(h.point.x, f) - m - e - b : f - m - e - b, v = q < h.point.x))) : (n = Math.max(h.bounds.x1, c.x1), Math.min(h.bounds.x2, c.x2), b = 0 <= r.indexOf("range") || "error" === r ? 0 > D ? Math.max(h.bounds.x1, c.x1) + m / 2 + e : Math.min(h.bounds.x2, c.x2) - m / 2 - e : (Math.max(h.bounds.x1, c.x1) + Math.min(h.bounds.x2, c.x2)) / 2, q = 0 > D ? Math.max(h.point.x, b) - m / 2 : Math.min(h.point.x, b) - m / 2, q = Math.max(q, n));
          "vertical" === x && (p += A);
          g.x = q;
          g.y = p;
          g.render(!0);
          l && "inside" !== u && (0 > r.indexOf("bar") && ("error" !== r || !h.axisSwapped) && h.point.x > c.x1 && h.point.x < c.x2 || !v) && (0 > r.indexOf("column") && ("error" !== r || h.axisSwapped) && h.point.y > c.y1 && h.point.y < c.y2 || !v) && (d.lineWidth = l, d.strokeStyle = k ? k : "gray", d.setLineDash && d.setLineDash(N(C, l)), d.beginPath(), d.moveTo(h.point.x, h.point.y), 0 <= r.indexOf("bar") || "error" === r && h.axisSwapped ? d.lineTo(q + (0 < h.direction ? 0 : m), p + ("horizontal" === x ? A : -A) / 2) : 0 <= r.indexOf("column") || "error" === r && !h.axisSwapped ? d.lineTo(q + m / 2, p + ((0 < h.direction ? A : -A) + ("horizontal" === x ? A : -A)) / 2) : d.lineTo(q + m / 2, p + ((p < h.point.y ? A : -A) + ("horizontal" === x ? A : -A)) / 2), d.stroke());
        }
      }
      d = {
        source: d,
        dest: this.plotArea.ctx,
        animationCallback: L.fadeInAnimation,
        easingFunction: L.easing.easeInQuad,
        animationBase: 0,
        startTimePercent: 0.7
      };
      for (a = 0; a < this._indexLabels.length; a++) h = this._indexLabels[a], g = la("indexLabelBackgroundColor", h.dataPoint, h.dataSeries), h.dataSeries.indexLabelBackgroundColor = s(g) ? t ? "transparent" : null : g;
      return d;
    };
    l.prototype.renderLine = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = this._eventManager.ghostCtx;
        c.save();
        var e = this.plotArea;
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        for (var f = [], n, m = 0; m < a.dataSeriesIndexes.length; m++) {
          var A = a.dataSeriesIndexes[m],
            h = this.data[A];
          c.lineWidth = h.lineThickness;
          var r = h.dataPoints,
            q = "solid";
          if (c.setLineDash) {
            var p = N(h.nullDataLineDashType, h.lineThickness),
              q = h.lineDashType,
              g = N(q, h.lineThickness);
            c.setLineDash(g);
          }
          var C = h.id;
          this._eventManager.objectMap[C] = {
            objectType: "dataSeries",
            dataSeriesIndex: A
          };
          C = Q(C);
          b.strokeStyle = C;
          b.lineWidth = 0 < h.lineThickness ? Math.max(h.lineThickness, 4) : 0;
          var C = h._colorSet,
            k = C = h.lineColor = h.options.lineColor ? h.options.lineColor : C[0];
          c.strokeStyle = C;
          var l = !0,
            u = 0,
            x,
            s;
          c.beginPath();
          if (0 < r.length) {
            for (var D = !1, u = 0; u < r.length; u++) if (x = r[u].x.getTime ? r[u].x.getTime() : r[u].x, !(x < a.axisX.dataInfo.viewPortMin || x > a.axisX.dataInfo.viewPortMax && (!h.connectNullData || !D))) if ("number" !== typeof r[u].y) 0 < u && !(h.connectNullData || D || l) && (c.stroke(), t && b.stroke()), D = !0;else {
              x = a.axisX.convertValueToPixel(x);
              s = a.axisY.convertValueToPixel(r[u].y);
              var y = h.dataPointIds[u];
              this._eventManager.objectMap[y] = {
                id: y,
                objectType: "dataPoint",
                dataSeriesIndex: A,
                dataPointIndex: u,
                x1: x,
                y1: s
              };
              l || D ? (!l && h.connectNullData ? (c.setLineDash && (h.options.nullDataLineDashType || q === h.lineDashType && h.lineDashType !== h.nullDataLineDashType) && (c.stroke(), c.beginPath(), c.moveTo(n.x, n.y), q = h.nullDataLineDashType, c.setLineDash(p)), c.lineTo(x, s), t && b.lineTo(x, s)) : (c.beginPath(), c.moveTo(x, s), t && (b.beginPath(), b.moveTo(x, s))), D = l = !1) : (c.lineTo(x, s), t && b.lineTo(x, s), 0 == u % 500 && (c.stroke(), c.beginPath(), c.moveTo(x, s), t && (b.stroke(), b.beginPath(), b.moveTo(x, s))));
              n = {
                x: x,
                y: s
              };
              u < r.length - 1 && (k !== (r[u].lineColor || C) || q !== (r[u].lineDashType || h.lineDashType)) && (c.stroke(), c.beginPath(), c.moveTo(x, s), k = r[u].lineColor || C, c.strokeStyle = k, c.setLineDash && (r[u].lineDashType ? (q = r[u].lineDashType, c.setLineDash(N(q, h.lineThickness))) : (q = h.lineDashType, c.setLineDash(g))));
              if (0 < r[u].markerSize || 0 < h.markerSize) {
                var B = h.getMarkerProperties(u, x, s, c);
                f.push(B);
                y = Q(y);
                t && f.push({
                  x: x,
                  y: s,
                  ctx: b,
                  type: B.type,
                  size: B.size,
                  color: y,
                  borderColor: y,
                  borderThickness: B.borderThickness
                });
              }
              (r[u].indexLabel || h.indexLabel || r[u].indexLabelFormatter || h.indexLabelFormatter) && this._indexLabels.push({
                chartType: "line",
                dataPoint: r[u],
                dataSeries: h,
                point: {
                  x: x,
                  y: s
                },
                direction: 0 > r[u].y === a.axisY.reversed ? 1 : -1,
                color: C
              });
            }
            c.stroke();
            t && b.stroke();
          }
        }
        W.drawMarkers(f);
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), b.beginPath());
        c.restore();
        c.beginPath();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderStepLine = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = this._eventManager.ghostCtx;
        c.save();
        var e = this.plotArea;
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        for (var f = [], n, m = 0; m < a.dataSeriesIndexes.length; m++) {
          var A = a.dataSeriesIndexes[m],
            h = this.data[A];
          c.lineWidth = h.lineThickness;
          var r = h.dataPoints,
            q = "solid";
          if (c.setLineDash) {
            var p = N(h.nullDataLineDashType, h.lineThickness),
              q = h.lineDashType,
              g = N(q, h.lineThickness);
            c.setLineDash(g);
          }
          var C = h.id;
          this._eventManager.objectMap[C] = {
            objectType: "dataSeries",
            dataSeriesIndex: A
          };
          C = Q(C);
          b.strokeStyle = C;
          b.lineWidth = 0 < h.lineThickness ? Math.max(h.lineThickness, 4) : 0;
          var C = h._colorSet,
            k = C = h.lineColor = h.options.lineColor ? h.options.lineColor : C[0];
          c.strokeStyle = C;
          var l = !0,
            u = 0,
            x,
            s;
          c.beginPath();
          if (0 < r.length) {
            for (var D = !1, u = 0; u < r.length; u++) if (x = r[u].getTime ? r[u].x.getTime() : r[u].x, !(x < a.axisX.dataInfo.viewPortMin || x > a.axisX.dataInfo.viewPortMax && (!h.connectNullData || !D))) if ("number" !== typeof r[u].y) 0 < u && !(h.connectNullData || D || l) && (c.stroke(), t && b.stroke()), D = !0;else {
              var y = s;
              x = a.axisX.convertValueToPixel(x);
              s = a.axisY.convertValueToPixel(r[u].y);
              var B = h.dataPointIds[u];
              this._eventManager.objectMap[B] = {
                id: B,
                objectType: "dataPoint",
                dataSeriesIndex: A,
                dataPointIndex: u,
                x1: x,
                y1: s
              };
              l || D ? (!l && h.connectNullData ? (c.setLineDash && (h.options.nullDataLineDashType || q === h.lineDashType && h.lineDashType !== h.nullDataLineDashType) && (c.stroke(), c.beginPath(), c.moveTo(n.x, n.y), q = h.nullDataLineDashType, c.setLineDash(p)), c.lineTo(x, y), c.lineTo(x, s), t && (b.lineTo(x, y), b.lineTo(x, s))) : (c.beginPath(), c.moveTo(x, s), t && (b.beginPath(), b.moveTo(x, s))), D = l = !1) : (c.lineTo(x, y), t && b.lineTo(x, y), c.lineTo(x, s), t && b.lineTo(x, s), 0 == u % 500 && (c.stroke(), c.beginPath(), c.moveTo(x, s), t && (b.stroke(), b.beginPath(), b.moveTo(x, s))));
              n = {
                x: x,
                y: s
              };
              u < r.length - 1 && (k !== (r[u].lineColor || C) || q !== (r[u].lineDashType || h.lineDashType)) && (c.stroke(), c.beginPath(), c.moveTo(x, s), k = r[u].lineColor || C, c.strokeStyle = k, c.setLineDash && (r[u].lineDashType ? (q = r[u].lineDashType, c.setLineDash(N(q, h.lineThickness))) : (q = h.lineDashType, c.setLineDash(g))));
              if (0 < r[u].markerSize || 0 < h.markerSize) y = h.getMarkerProperties(u, x, s, c), f.push(y), B = Q(B), t && f.push({
                x: x,
                y: s,
                ctx: b,
                type: y.type,
                size: y.size,
                color: B,
                borderColor: B,
                borderThickness: y.borderThickness
              });
              (r[u].indexLabel || h.indexLabel || r[u].indexLabelFormatter || h.indexLabelFormatter) && this._indexLabels.push({
                chartType: "stepLine",
                dataPoint: r[u],
                dataSeries: h,
                point: {
                  x: x,
                  y: s
                },
                direction: 0 > r[u].y === a.axisY.reversed ? 1 : -1,
                color: C
              });
            }
            c.stroke();
            t && b.stroke();
          }
        }
        W.drawMarkers(f);
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), b.beginPath());
        c.restore();
        c.beginPath();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderSpline = function (a) {
      function d(a) {
        a = v(a, 2);
        if (0 < a.length) {
          b.beginPath();
          t && e.beginPath();
          b.moveTo(a[0].x, a[0].y);
          a[0].newStrokeStyle && (b.strokeStyle = a[0].newStrokeStyle);
          a[0].newLineDashArray && b.setLineDash(a[0].newLineDashArray);
          t && e.moveTo(a[0].x, a[0].y);
          for (var c = 0; c < a.length - 3; c += 3) if (b.bezierCurveTo(a[c + 1].x, a[c + 1].y, a[c + 2].x, a[c + 2].y, a[c + 3].x, a[c + 3].y), t && e.bezierCurveTo(a[c + 1].x, a[c + 1].y, a[c + 2].x, a[c + 2].y, a[c + 3].x, a[c + 3].y), 0 < c && 0 === c % 3E3 || a[c + 3].newStrokeStyle || a[c + 3].newLineDashArray) b.stroke(), b.beginPath(), b.moveTo(a[c + 3].x, a[c + 3].y), a[c + 3].newStrokeStyle && (b.strokeStyle = a[c + 3].newStrokeStyle), a[c + 3].newLineDashArray && b.setLineDash(a[c + 3].newLineDashArray), t && (e.stroke(), e.beginPath(), e.moveTo(a[c + 3].x, a[c + 3].y));
          b.stroke();
          t && e.stroke();
        }
      }
      var c = a.targetCanvasCtx || this.plotArea.ctx,
        b = t ? this._preRenderCtx : c;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = this._eventManager.ghostCtx;
        b.save();
        var f = this.plotArea;
        b.beginPath();
        b.rect(f.x1, f.y1, f.width, f.height);
        b.clip();
        for (var n = [], m = 0; m < a.dataSeriesIndexes.length; m++) {
          var A = a.dataSeriesIndexes[m],
            h = this.data[A];
          b.lineWidth = h.lineThickness;
          var r = h.dataPoints,
            q = "solid";
          if (b.setLineDash) {
            var p = N(h.nullDataLineDashType, h.lineThickness),
              q = h.lineDashType,
              g = N(q, h.lineThickness);
            b.setLineDash(g);
          }
          var C = h.id;
          this._eventManager.objectMap[C] = {
            objectType: "dataSeries",
            dataSeriesIndex: A
          };
          C = Q(C);
          e.strokeStyle = C;
          e.lineWidth = 0 < h.lineThickness ? Math.max(h.lineThickness, 4) : 0;
          var C = h._colorSet,
            k = C = h.lineColor = h.options.lineColor ? h.options.lineColor : C[0];
          b.strokeStyle = C;
          var l = 0,
            u,
            s,
            z = [];
          b.beginPath();
          if (0 < r.length) for (s = !1, l = 0; l < r.length; l++) if (u = r[l].getTime ? r[l].x.getTime() : r[l].x, !(u < a.axisX.dataInfo.viewPortMin || u > a.axisX.dataInfo.viewPortMax && (!h.connectNullData || !s))) if ("number" !== typeof r[l].y) 0 < l && !s && (h.connectNullData ? b.setLineDash && 0 < z.length && (h.options.nullDataLineDashType || !r[l - 1].lineDashType) && (z[z.length - 1].newLineDashArray = p, q = h.nullDataLineDashType) : (d(z), z = [])), s = !0;else {
            u = a.axisX.convertValueToPixel(u);
            s = a.axisY.convertValueToPixel(r[l].y);
            var D = h.dataPointIds[l];
            this._eventManager.objectMap[D] = {
              id: D,
              objectType: "dataPoint",
              dataSeriesIndex: A,
              dataPointIndex: l,
              x1: u,
              y1: s
            };
            z[z.length] = {
              x: u,
              y: s
            };
            l < r.length - 1 && (k !== (r[l].lineColor || C) || q !== (r[l].lineDashType || h.lineDashType)) && (k = r[l].lineColor || C, z[z.length - 1].newStrokeStyle = k, b.setLineDash && (r[l].lineDashType ? (q = r[l].lineDashType, z[z.length - 1].newLineDashArray = N(q, h.lineThickness)) : (q = h.lineDashType, z[z.length - 1].newLineDashArray = g)));
            if (0 < r[l].markerSize || 0 < h.markerSize) {
              var y = h.getMarkerProperties(l, u, s, b);
              n.push(y);
              D = Q(D);
              t && n.push({
                x: u,
                y: s,
                ctx: e,
                type: y.type,
                size: y.size,
                color: D,
                borderColor: D,
                borderThickness: y.borderThickness
              });
            }
            (r[l].indexLabel || h.indexLabel || r[l].indexLabelFormatter || h.indexLabelFormatter) && this._indexLabels.push({
              chartType: "spline",
              dataPoint: r[l],
              dataSeries: h,
              point: {
                x: u,
                y: s
              },
              direction: 0 > r[l].y === a.axisY.reversed ? 1 : -1,
              color: C
            });
            s = !1;
          }
          d(z);
        }
        W.drawMarkers(n);
        t && (c.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(f.x1, f.y1, f.width, f.height), e.beginPath());
        b.restore();
        b.beginPath();
        return {
          source: c,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderColumn = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = 0,
          n,
          m,
          A,
          h = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          f = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
          r = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.width, 0.9 * (this.plotArea.width / a.plotType.totalDataSeries)) << 0,
          q = a.axisX.dataInfo.minDiff;
        isFinite(q) || (q = 0.3 * Math.abs(a.axisX.range));
        q = this.dataPointWidth = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(q) / Math.log(a.axisX.range) : Math.abs(q) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
        this.dataPointMaxWidth && f > r && (f = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, r));
        !this.dataPointMaxWidth && this.dataPointMinWidth && r < f && (r = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, f));
        q < f && (q = f);
        q > r && (q = r);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (r = 0; r < a.dataSeriesIndexes.length; r++) {
          var p = a.dataSeriesIndexes[r],
            g = this.data[p],
            C = g.dataPoints;
          if (0 < C.length) for (var k = 5 < q && g.bevelEnabled ? !0 : !1, f = 0; f < C.length; f++) if (C[f].getTime ? A = C[f].x.getTime() : A = C[f].x, !(A < a.axisX.dataInfo.viewPortMin || A > a.axisX.dataInfo.viewPortMax) && "number" === typeof C[f].y) {
            n = a.axisX.convertValueToPixel(A);
            m = a.axisY.convertValueToPixel(C[f].y);
            n = a.axisX.reversed ? n + a.plotType.totalDataSeries * q / 2 - (a.previousDataSeriesCount + r) * q << 0 : n - a.plotType.totalDataSeries * q / 2 + (a.previousDataSeriesCount + r) * q << 0;
            var l = a.axisX.reversed ? n - q << 0 : n + q << 0,
              u;
            0 <= C[f].y ? u = h : (u = m, m = h);
            m > u && (b = m, m = u, u = b);
            b = C[f].color ? C[f].color : g._colorSet[f % g._colorSet.length];
            ba(c, n, m, l, u, b, 0, null, k && 0 <= C[f].y, 0 > C[f].y && k, !1, !1, g.fillOpacity);
            b = g.dataPointIds[f];
            this._eventManager.objectMap[b] = {
              id: b,
              objectType: "dataPoint",
              dataSeriesIndex: p,
              dataPointIndex: f,
              x1: n,
              y1: m,
              x2: l,
              y2: u
            };
            b = Q(b);
            t && ba(this._eventManager.ghostCtx, n, m, l, u, b, 0, null, !1, !1, !1, !1);
            (C[f].indexLabel || g.indexLabel || C[f].indexLabelFormatter || g.indexLabelFormatter) && this._indexLabels.push({
              chartType: "column",
              dataPoint: C[f],
              dataSeries: g,
              point: {
                x: n + (l - n) / 2,
                y: 0 > C[f].y === a.axisY.reversed ? m : u
              },
              direction: 0 > C[f].y === a.axisY.reversed ? 1 : -1,
              bounds: {
                x1: n,
                y1: Math.min(m, u),
                x2: l,
                y2: Math.max(m, u)
              },
              color: b
            });
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.yScaleAnimation,
          easingFunction: L.easing.easeOutQuart,
          animationBase: h < a.axisY.bounds.y1 ? a.axisY.bounds.y1 : h > a.axisY.bounds.y2 ? a.axisY.bounds.y2 : h
        };
      }
    };
    l.prototype.renderStackedColumn = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = [],
          n = [],
          m = [],
          A = [],
          h = 0,
          r,
          q,
          p = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          h = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        r = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.width << 0;
        var g = a.axisX.dataInfo.minDiff;
        isFinite(g) || (g = 0.3 * Math.abs(a.axisX.range));
        g = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(g) / Math.log(a.axisX.range) : Math.abs(g) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
        this.dataPointMaxWidth && h > r && (h = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, r));
        !this.dataPointMaxWidth && this.dataPointMinWidth && r < h && (r = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, h));
        g < h && (g = h);
        g > r && (g = r);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (var C = 0; C < a.dataSeriesIndexes.length; C++) {
          var k = a.dataSeriesIndexes[C],
            l = this.data[k],
            u = l.dataPoints;
          if (0 < u.length) {
            var s = 5 < g && l.bevelEnabled ? !0 : !1;
            c.strokeStyle = "#4572A7 ";
            for (h = 0; h < u.length; h++) if (b = u[h].x.getTime ? u[h].x.getTime() : u[h].x, !(b < a.axisX.dataInfo.viewPortMin || b > a.axisX.dataInfo.viewPortMax) && "number" === typeof u[h].y) {
              r = a.axisX.convertValueToPixel(b);
              var z = r - a.plotType.plotUnits.length * g / 2 + a.index * g << 0,
                D = z + g << 0,
                y;
              if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < u[h].y) m[b] = u[h].y + (m[b] ? m[b] : 0), 0 < m[b] && (q = a.axisY.convertValueToPixel(m[b]), y = "undefined" !== typeof f[b] ? f[b] : p, f[b] = q);else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= u[h].y) A[b] = u[h].y + (A[b] ? A[b] : 0), y = a.axisY.convertValueToPixel(A[b]), q = "undefined" !== typeof n[b] ? n[b] : p, n[b] = y;else if (q = a.axisY.convertValueToPixel(u[h].y), 0 <= u[h].y) {
                var B = "undefined" !== typeof f[b] ? f[b] : 0;
                q -= B;
                y = p - B;
                f[b] = B + (y - q);
              } else B = n[b] ? n[b] : 0, y = q + B, q = p + B, n[b] = B + (y - q);
              b = u[h].color ? u[h].color : l._colorSet[h % l._colorSet.length];
              ba(c, z, q, D, y, b, 0, null, s && 0 <= u[h].y, 0 > u[h].y && s, !1, !1, l.fillOpacity);
              b = l.dataPointIds[h];
              this._eventManager.objectMap[b] = {
                id: b,
                objectType: "dataPoint",
                dataSeriesIndex: k,
                dataPointIndex: h,
                x1: z,
                y1: q,
                x2: D,
                y2: y
              };
              b = Q(b);
              t && ba(this._eventManager.ghostCtx, z, q, D, y, b, 0, null, !1, !1, !1, !1);
              (u[h].indexLabel || l.indexLabel || u[h].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                chartType: "stackedColumn",
                dataPoint: u[h],
                dataSeries: l,
                point: {
                  x: r,
                  y: 0 <= u[h].y ? q : y
                },
                direction: 0 > u[h].y === a.axisY.reversed ? 1 : -1,
                bounds: {
                  x1: z,
                  y1: Math.min(q, y),
                  x2: D,
                  y2: Math.max(q, y)
                },
                color: b
              });
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.yScaleAnimation,
          easingFunction: L.easing.easeOutQuart,
          animationBase: p < a.axisY.bounds.y1 ? a.axisY.bounds.y1 : p > a.axisY.bounds.y2 ? a.axisY.bounds.y2 : p
        };
      }
    };
    l.prototype.renderStackedColumn100 = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = [],
          n = [],
          m = [],
          A = [],
          h = 0,
          r,
          q,
          p = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          h = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        r = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.width << 0;
        var g = a.axisX.dataInfo.minDiff;
        isFinite(g) || (g = 0.3 * Math.abs(a.axisX.range));
        g = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(g) / Math.log(a.axisX.range) : Math.abs(g) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
        this.dataPointMaxWidth && h > r && (h = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, r));
        !this.dataPointMaxWidth && this.dataPointMinWidth && r < h && (r = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, h));
        g < h && (g = h);
        g > r && (g = r);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (var C = 0; C < a.dataSeriesIndexes.length; C++) {
          var k = a.dataSeriesIndexes[C],
            l = this.data[k],
            u = l.dataPoints;
          if (0 < u.length) for (var s = 5 < g && l.bevelEnabled ? !0 : !1, h = 0; h < u.length; h++) if (b = u[h].x.getTime ? u[h].x.getTime() : u[h].x, !(b < a.axisX.dataInfo.viewPortMin || b > a.axisX.dataInfo.viewPortMax) && "number" === typeof u[h].y) {
            r = a.axisX.convertValueToPixel(b);
            q = 0 !== a.dataPointYSums[b] ? 100 * (u[h].y / a.dataPointYSums[b]) : 0;
            var z = r - a.plotType.plotUnits.length * g / 2 + a.index * g << 0,
              D = z + g << 0,
              y;
            if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < u[h].y) {
              m[b] = q + ("undefined" !== typeof m[b] ? m[b] : 0);
              if (0 >= m[b]) continue;
              q = a.axisY.convertValueToPixel(m[b]);
              y = f[b] ? f[b] : p;
              f[b] = q;
            } else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= u[h].y) A[b] = q + ("undefined" !== typeof A[b] ? A[b] : 0), y = a.axisY.convertValueToPixel(A[b]), q = n[b] ? n[b] : p, n[b] = y;else if (q = a.axisY.convertValueToPixel(q), 0 <= u[h].y) {
              var B = "undefined" !== typeof f[b] ? f[b] : 0;
              q -= B;
              y = p - B;
              a.dataSeriesIndexes.length - 1 === C && 1 >= Math.abs(e.y1 - q) && (q = e.y1);
              f[b] = B + (y - q);
            } else B = "undefined" !== typeof n[b] ? n[b] : 0, y = q + B, q = p + B, a.dataSeriesIndexes.length - 1 === C && 1 >= Math.abs(e.y2 - y) && (y = e.y2), n[b] = B + (y - q);
            b = u[h].color ? u[h].color : l._colorSet[h % l._colorSet.length];
            ba(c, z, q, D, y, b, 0, null, s && 0 <= u[h].y, 0 > u[h].y && s, !1, !1, l.fillOpacity);
            b = l.dataPointIds[h];
            this._eventManager.objectMap[b] = {
              id: b,
              objectType: "dataPoint",
              dataSeriesIndex: k,
              dataPointIndex: h,
              x1: z,
              y1: q,
              x2: D,
              y2: y
            };
            b = Q(b);
            t && ba(this._eventManager.ghostCtx, z, q, D, y, b, 0, null, !1, !1, !1, !1);
            (u[h].indexLabel || l.indexLabel || u[h].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
              chartType: "stackedColumn100",
              dataPoint: u[h],
              dataSeries: l,
              point: {
                x: r,
                y: 0 <= u[h].y ? q : y
              },
              direction: 0 > u[h].y === a.axisY.reversed ? 1 : -1,
              bounds: {
                x1: z,
                y1: Math.min(q, y),
                x2: D,
                y2: Math.max(q, y)
              },
              color: b
            });
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.yScaleAnimation,
          easingFunction: L.easing.easeOutQuart,
          animationBase: p < a.axisY.bounds.y1 ? a.axisY.bounds.y1 : p > a.axisY.bounds.y2 ? a.axisY.bounds.y2 : p
        };
      }
    };
    l.prototype.renderBar = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = 0,
          n,
          m,
          A,
          h = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          f = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
          r = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / a.plotType.totalDataSeries)) << 0,
          q = a.axisX.dataInfo.minDiff;
        isFinite(q) || (q = 0.3 * Math.abs(a.axisX.range));
        q = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(q) / Math.log(a.axisX.range) : Math.abs(q) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
        this.dataPointMaxWidth && f > r && (f = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, r));
        !this.dataPointMaxWidth && this.dataPointMinWidth && r < f && (r = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, f));
        q < f && (q = f);
        q > r && (q = r);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (r = 0; r < a.dataSeriesIndexes.length; r++) {
          var p = a.dataSeriesIndexes[r],
            g = this.data[p],
            C = g.dataPoints;
          if (0 < C.length) {
            var k = 5 < q && g.bevelEnabled ? !0 : !1;
            c.strokeStyle = "#4572A7 ";
            for (f = 0; f < C.length; f++) if (C[f].getTime ? A = C[f].x.getTime() : A = C[f].x, !(A < a.axisX.dataInfo.viewPortMin || A > a.axisX.dataInfo.viewPortMax) && "number" === typeof C[f].y) {
              m = a.axisX.convertValueToPixel(A);
              n = a.axisY.convertValueToPixel(C[f].y);
              m = a.axisX.reversed ? m + a.plotType.totalDataSeries * q / 2 - (a.previousDataSeriesCount + r) * q << 0 : m - a.plotType.totalDataSeries * q / 2 + (a.previousDataSeriesCount + r) * q << 0;
              var l = a.axisX.reversed ? m - q << 0 : m + q << 0,
                u;
              0 <= C[f].y ? u = h : (u = n, n = h);
              b = C[f].color ? C[f].color : g._colorSet[f % g._colorSet.length];
              ba(c, u, m, n, l, b, 0, null, k, !1, !1, !1, g.fillOpacity);
              b = g.dataPointIds[f];
              this._eventManager.objectMap[b] = {
                id: b,
                objectType: "dataPoint",
                dataSeriesIndex: p,
                dataPointIndex: f,
                x1: u,
                y1: m,
                x2: n,
                y2: l
              };
              b = Q(b);
              t && ba(this._eventManager.ghostCtx, u, m, n, l, b, 0, null, !1, !1, !1, !1);
              (C[f].indexLabel || g.indexLabel || C[f].indexLabelFormatter || g.indexLabelFormatter) && this._indexLabels.push({
                chartType: "bar",
                dataPoint: C[f],
                dataSeries: g,
                point: {
                  x: 0 <= C[f].y ? n : u,
                  y: m + (l - m) / 2
                },
                direction: 0 > C[f].y === a.axisY.reversed ? 1 : -1,
                bounds: {
                  x1: Math.min(u, n),
                  y1: m,
                  x2: Math.max(u, n),
                  y2: l
                },
                color: b
              });
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.xScaleAnimation,
          easingFunction: L.easing.easeOutQuart,
          animationBase: h < a.axisY.bounds.x1 ? a.axisY.bounds.x1 : h > a.axisY.bounds.x2 ? a.axisY.bounds.x2 : h
        };
      }
    };
    l.prototype.renderStackedBar = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = [],
          n = [],
          m = [],
          A = [],
          h = 0,
          r,
          q,
          p = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          h = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        q = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.height << 0;
        var g = a.axisX.dataInfo.minDiff;
        isFinite(g) || (g = 0.3 * Math.abs(a.axisX.range));
        g = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(g) / Math.log(a.axisX.range) : Math.abs(g) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
        this.dataPointMaxWidth && h > q && (h = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, q));
        !this.dataPointMaxWidth && this.dataPointMinWidth && q < h && (q = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, h));
        g < h && (g = h);
        g > q && (g = q);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (var C = 0; C < a.dataSeriesIndexes.length; C++) {
          var k = a.dataSeriesIndexes[C],
            l = this.data[k],
            u = l.dataPoints;
          if (0 < u.length) {
            var s = 5 < g && l.bevelEnabled ? !0 : !1;
            c.strokeStyle = "#4572A7 ";
            for (h = 0; h < u.length; h++) if (b = u[h].x.getTime ? u[h].x.getTime() : u[h].x, !(b < a.axisX.dataInfo.viewPortMin || b > a.axisX.dataInfo.viewPortMax) && "number" === typeof u[h].y) {
              q = a.axisX.convertValueToPixel(b);
              var z = q - a.plotType.plotUnits.length * g / 2 + a.index * g << 0,
                D = z + g << 0,
                y;
              if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < u[h].y) m[b] = u[h].y + (m[b] ? m[b] : 0), 0 < m[b] && (y = f[b] ? f[b] : p, f[b] = r = a.axisY.convertValueToPixel(m[b]));else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= u[h].y) A[b] = u[h].y + (A[b] ? A[b] : 0), r = n[b] ? n[b] : p, n[b] = y = a.axisY.convertValueToPixel(A[b]);else if (r = a.axisY.convertValueToPixel(u[h].y), 0 <= u[h].y) {
                var B = f[b] ? f[b] : 0;
                y = p + B;
                r += B;
                f[b] = B + (r - y);
              } else B = n[b] ? n[b] : 0, y = r - B, r = p - B, n[b] = B + (r - y);
              b = u[h].color ? u[h].color : l._colorSet[h % l._colorSet.length];
              ba(c, y, z, r, D, b, 0, null, s, !1, !1, !1, l.fillOpacity);
              b = l.dataPointIds[h];
              this._eventManager.objectMap[b] = {
                id: b,
                objectType: "dataPoint",
                dataSeriesIndex: k,
                dataPointIndex: h,
                x1: y,
                y1: z,
                x2: r,
                y2: D
              };
              b = Q(b);
              t && ba(this._eventManager.ghostCtx, y, z, r, D, b, 0, null, !1, !1, !1, !1);
              (u[h].indexLabel || l.indexLabel || u[h].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                chartType: "stackedBar",
                dataPoint: u[h],
                dataSeries: l,
                point: {
                  x: 0 <= u[h].y ? r : y,
                  y: q
                },
                direction: 0 > u[h].y === a.axisY.reversed ? 1 : -1,
                bounds: {
                  x1: Math.min(y, r),
                  y1: z,
                  x2: Math.max(y, r),
                  y2: D
                },
                color: b
              });
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.xScaleAnimation,
          easingFunction: L.easing.easeOutQuart,
          animationBase: p < a.axisY.bounds.x1 ? a.axisY.bounds.x1 : p > a.axisY.bounds.x2 ? a.axisY.bounds.x2 : p
        };
      }
    };
    l.prototype.renderStackedBar100 = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = [],
          n = [],
          m = [],
          A = [],
          h = 0,
          r,
          q,
          p = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          h = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        q = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.15 * this.height << 0;
        var g = a.axisX.dataInfo.minDiff;
        isFinite(g) || (g = 0.3 * Math.abs(a.axisX.range));
        g = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(g) / Math.log(a.axisX.range) : Math.abs(g) / Math.abs(a.axisX.range)) / a.plotType.plotUnits.length) << 0;
        this.dataPointMaxWidth && h > q && (h = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, q));
        !this.dataPointMaxWidth && this.dataPointMinWidth && q < h && (q = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, h));
        g < h && (g = h);
        g > q && (g = q);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (var C = 0; C < a.dataSeriesIndexes.length; C++) {
          var k = a.dataSeriesIndexes[C],
            l = this.data[k],
            u = l.dataPoints;
          if (0 < u.length) {
            var s = 5 < g && l.bevelEnabled ? !0 : !1;
            c.strokeStyle = "#4572A7 ";
            for (h = 0; h < u.length; h++) if (b = u[h].x.getTime ? u[h].x.getTime() : u[h].x, !(b < a.axisX.dataInfo.viewPortMin || b > a.axisX.dataInfo.viewPortMax) && "number" === typeof u[h].y) {
              q = a.axisX.convertValueToPixel(b);
              var z;
              z = 0 !== a.dataPointYSums[b] ? 100 * (u[h].y / a.dataPointYSums[b]) : 0;
              var D = q - a.plotType.plotUnits.length * g / 2 + a.index * g << 0,
                y = D + g << 0;
              if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 < u[h].y) {
                m[b] = z + (m[b] ? m[b] : 0);
                if (0 >= m[b]) continue;
                z = f[b] ? f[b] : p;
                f[b] = r = a.axisY.convertValueToPixel(m[b]);
              } else if (a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length && 0 >= u[h].y) A[b] = z + (A[b] ? A[b] : 0), r = n[b] ? n[b] : p, n[b] = z = a.axisY.convertValueToPixel(A[b]);else if (r = a.axisY.convertValueToPixel(z), 0 <= u[h].y) {
                var B = f[b] ? f[b] : 0;
                z = p + B;
                r += B;
                a.dataSeriesIndexes.length - 1 === C && 1 >= Math.abs(e.x2 - r) && (r = e.x2);
                f[b] = B + (r - z);
              } else B = n[b] ? n[b] : 0, z = r - B, r = p - B, a.dataSeriesIndexes.length - 1 === C && 1 >= Math.abs(e.x1 - z) && (z = e.x1), n[b] = B + (r - z);
              b = u[h].color ? u[h].color : l._colorSet[h % l._colorSet.length];
              ba(c, z, D, r, y, b, 0, null, s, !1, !1, !1, l.fillOpacity);
              b = l.dataPointIds[h];
              this._eventManager.objectMap[b] = {
                id: b,
                objectType: "dataPoint",
                dataSeriesIndex: k,
                dataPointIndex: h,
                x1: z,
                y1: D,
                x2: r,
                y2: y
              };
              b = Q(b);
              t && ba(this._eventManager.ghostCtx, z, D, r, y, b, 0, null, !1, !1, !1, !1);
              (u[h].indexLabel || l.indexLabel || u[h].indexLabelFormatter || l.indexLabelFormatter) && this._indexLabels.push({
                chartType: "stackedBar100",
                dataPoint: u[h],
                dataSeries: l,
                point: {
                  x: 0 <= u[h].y ? r : z,
                  y: q
                },
                direction: 0 > u[h].y === a.axisY.reversed ? 1 : -1,
                bounds: {
                  x1: Math.min(z, r),
                  y1: D,
                  x2: Math.max(z, r),
                  y2: y
                },
                color: b
              });
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.xScaleAnimation,
          easingFunction: L.easing.easeOutQuart,
          animationBase: p < a.axisY.bounds.x1 ? a.axisY.bounds.x1 : p > a.axisY.bounds.x2 ? a.axisY.bounds.x2 : p
        };
      }
    };
    l.prototype.renderArea = function (a) {
      var d, c;
      function b() {
        y && (0 < g.lineThickness && f.stroke(), a.axisY.logarithmic || 0 >= a.axisY.viewportMinimum && 0 <= a.axisY.viewportMaximum ? D = z : 0 > a.axisY.viewportMaximum ? D = m.y1 : 0 < a.axisY.viewportMinimum && (D = z), f.lineTo(l, D), f.lineTo(y.x, D), f.closePath(), f.globalAlpha = g.fillOpacity, f.fill(), f.globalAlpha = 1, t && (n.lineTo(l, D), n.lineTo(y.x, D), n.closePath(), n.fill()), f.beginPath(), f.moveTo(l, u), n.beginPath(), n.moveTo(l, u), y = {
          x: l,
          y: u
        });
      }
      var e = a.targetCanvasCtx || this.plotArea.ctx,
        f = t ? this._preRenderCtx : e;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var n = this._eventManager.ghostCtx,
          m = a.axisY.lineCoordinates,
          A = [],
          h = this.plotArea,
          r;
        f.save();
        t && n.save();
        f.beginPath();
        f.rect(h.x1, h.y1, h.width, h.height);
        f.clip();
        t && (n.beginPath(), n.rect(h.x1, h.y1, h.width, h.height), n.clip());
        for (var q = 0; q < a.dataSeriesIndexes.length; q++) {
          var p = a.dataSeriesIndexes[q],
            g = this.data[p],
            C = g.dataPoints,
            A = g.id;
          this._eventManager.objectMap[A] = {
            objectType: "dataSeries",
            dataSeriesIndex: p
          };
          A = Q(A);
          n.fillStyle = A;
          A = [];
          d = !0;
          var k = 0,
            l,
            u,
            s,
            z = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
            D,
            y = null;
          if (0 < C.length) {
            var B = g._colorSet[k % g._colorSet.length],
              v = g.lineColor = g.options.lineColor || B,
              w = v;
            f.fillStyle = B;
            f.strokeStyle = v;
            f.lineWidth = g.lineThickness;
            c = "solid";
            if (f.setLineDash) {
              var T = N(g.nullDataLineDashType, g.lineThickness);
              c = g.lineDashType;
              var S = N(c, g.lineThickness);
              f.setLineDash(S);
            }
            for (var ka = !0; k < C.length; k++) if (s = C[k].x.getTime ? C[k].x.getTime() : C[k].x, !(s < a.axisX.dataInfo.viewPortMin || s > a.axisX.dataInfo.viewPortMax && (!g.connectNullData || !ka))) if ("number" !== typeof C[k].y) g.connectNullData || ka || d || b(), ka = !0;else {
              l = a.axisX.convertValueToPixel(s);
              u = a.axisY.convertValueToPixel(C[k].y);
              d || ka ? (!d && g.connectNullData ? (f.setLineDash && (g.options.nullDataLineDashType || c === g.lineDashType && g.lineDashType !== g.nullDataLineDashType) && (d = l, c = u, l = r.x, u = r.y, b(), f.moveTo(r.x, r.y), l = d, u = c, y = r, c = g.nullDataLineDashType, f.setLineDash(T)), f.lineTo(l, u), t && n.lineTo(l, u)) : (f.beginPath(), f.moveTo(l, u), t && (n.beginPath(), n.moveTo(l, u)), y = {
                x: l,
                y: u
              }), ka = d = !1) : (f.lineTo(l, u), t && n.lineTo(l, u), 0 == k % 250 && b());
              r = {
                x: l,
                y: u
              };
              k < C.length - 1 && (w !== (C[k].lineColor || v) || c !== (C[k].lineDashType || g.lineDashType)) && (b(), w = C[k].lineColor || v, f.strokeStyle = w, f.setLineDash && (C[k].lineDashType ? (c = C[k].lineDashType, f.setLineDash(N(c, g.lineThickness))) : (c = g.lineDashType, f.setLineDash(S))));
              var Z = g.dataPointIds[k];
              this._eventManager.objectMap[Z] = {
                id: Z,
                objectType: "dataPoint",
                dataSeriesIndex: p,
                dataPointIndex: k,
                x1: l,
                y1: u
              };
              0 !== C[k].markerSize && (0 < C[k].markerSize || 0 < g.markerSize) && (s = g.getMarkerProperties(k, l, u, f), A.push(s), Z = Q(Z), t && A.push({
                x: l,
                y: u,
                ctx: n,
                type: s.type,
                size: s.size,
                color: Z,
                borderColor: Z,
                borderThickness: s.borderThickness
              }));
              (C[k].indexLabel || g.indexLabel || C[k].indexLabelFormatter || g.indexLabelFormatter) && this._indexLabels.push({
                chartType: "area",
                dataPoint: C[k],
                dataSeries: g,
                point: {
                  x: l,
                  y: u
                },
                direction: 0 > C[k].y === a.axisY.reversed ? 1 : -1,
                color: B
              });
            }
            b();
            W.drawMarkers(A);
          }
        }
        t && (e.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), f.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && f.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && f.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), f.clearRect(h.x1, h.y1, h.width, h.height), this._eventManager.ghostCtx.restore());
        f.restore();
        return {
          source: e,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderSplineArea = function (a) {
      function d() {
        var c = v(s, 2);
        if (0 < c.length) {
          if (0 < r.lineThickness) {
            b.beginPath();
            b.moveTo(c[0].x, c[0].y);
            c[0].newStrokeStyle && (b.strokeStyle = c[0].newStrokeStyle);
            c[0].newLineDashArray && b.setLineDash(c[0].newLineDashArray);
            for (var d = 0; d < c.length - 3; d += 3) if (b.bezierCurveTo(c[d + 1].x, c[d + 1].y, c[d + 2].x, c[d + 2].y, c[d + 3].x, c[d + 3].y), t && e.bezierCurveTo(c[d + 1].x, c[d + 1].y, c[d + 2].x, c[d + 2].y, c[d + 3].x, c[d + 3].y), c[d + 3].newStrokeStyle || c[d + 3].newLineDashArray) b.stroke(), b.beginPath(), b.moveTo(c[d + 3].x, c[d + 3].y), c[d + 3].newStrokeStyle && (b.strokeStyle = c[d + 3].newStrokeStyle), c[d + 3].newLineDashArray && b.setLineDash(c[d + 3].newLineDashArray);
            b.stroke();
          }
          b.beginPath();
          b.moveTo(c[0].x, c[0].y);
          t && (e.beginPath(), e.moveTo(c[0].x, c[0].y));
          for (d = 0; d < c.length - 3; d += 3) b.bezierCurveTo(c[d + 1].x, c[d + 1].y, c[d + 2].x, c[d + 2].y, c[d + 3].x, c[d + 3].y), t && e.bezierCurveTo(c[d + 1].x, c[d + 1].y, c[d + 2].x, c[d + 2].y, c[d + 3].x, c[d + 3].y);
          a.axisY.logarithmic || 0 >= a.axisY.viewportMinimum && 0 <= a.axisY.viewportMaximum ? l = k : 0 > a.axisY.viewportMaximum ? l = f.y1 : 0 < a.axisY.viewportMinimum && (l = k);
          u = {
            x: c[0].x,
            y: c[0].y
          };
          b.lineTo(c[c.length - 1].x, l);
          b.lineTo(u.x, l);
          b.closePath();
          b.globalAlpha = r.fillOpacity;
          b.fill();
          b.globalAlpha = 1;
          t && (e.lineTo(c[c.length - 1].x, l), e.lineTo(u.x, l), e.closePath(), e.fill());
        }
      }
      var c = a.targetCanvasCtx || this.plotArea.ctx,
        b = t ? this._preRenderCtx : c;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = this._eventManager.ghostCtx,
          f = a.axisY.lineCoordinates,
          n = [],
          m = this.plotArea;
        b.save();
        t && e.save();
        b.beginPath();
        b.rect(m.x1, m.y1, m.width, m.height);
        b.clip();
        t && (e.beginPath(), e.rect(m.x1, m.y1, m.width, m.height), e.clip());
        for (var A = 0; A < a.dataSeriesIndexes.length; A++) {
          var h = a.dataSeriesIndexes[A],
            r = this.data[h],
            q = r.dataPoints,
            n = r.id;
          this._eventManager.objectMap[n] = {
            objectType: "dataSeries",
            dataSeriesIndex: h
          };
          n = Q(n);
          e.fillStyle = n;
          var n = [],
            p = 0,
            g,
            C,
            k = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
            l,
            u = null,
            s = [];
          if (0 < q.length) {
            var z = r._colorSet[p % r._colorSet.length],
              D = r.lineColor = r.options.lineColor || z,
              y = D;
            b.fillStyle = z;
            b.strokeStyle = D;
            b.lineWidth = r.lineThickness;
            var B = "solid";
            if (b.setLineDash) {
              var w = N(r.nullDataLineDashType, r.lineThickness),
                B = r.lineDashType,
                E = N(B, r.lineThickness);
              b.setLineDash(E);
            }
            for (C = !1; p < q.length; p++) if (g = q[p].x.getTime ? q[p].x.getTime() : q[p].x, !(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax && (!r.connectNullData || !C))) if ("number" !== typeof q[p].y) 0 < p && !C && (r.connectNullData ? b.setLineDash && 0 < s.length && (r.options.nullDataLineDashType || !q[p - 1].lineDashType) && (s[s.length - 1].newLineDashArray = w, B = r.nullDataLineDashType) : (d(), s = [])), C = !0;else {
              g = a.axisX.convertValueToPixel(g);
              C = a.axisY.convertValueToPixel(q[p].y);
              var T = r.dataPointIds[p];
              this._eventManager.objectMap[T] = {
                id: T,
                objectType: "dataPoint",
                dataSeriesIndex: h,
                dataPointIndex: p,
                x1: g,
                y1: C
              };
              s[s.length] = {
                x: g,
                y: C
              };
              p < q.length - 1 && (y !== (q[p].lineColor || D) || B !== (q[p].lineDashType || r.lineDashType)) && (y = q[p].lineColor || D, s[s.length - 1].newStrokeStyle = y, b.setLineDash && (q[p].lineDashType ? (B = q[p].lineDashType, s[s.length - 1].newLineDashArray = N(B, r.lineThickness)) : (B = r.lineDashType, s[s.length - 1].newLineDashArray = E)));
              if (0 !== q[p].markerSize && (0 < q[p].markerSize || 0 < r.markerSize)) {
                var S = r.getMarkerProperties(p, g, C, b);
                n.push(S);
                T = Q(T);
                t && n.push({
                  x: g,
                  y: C,
                  ctx: e,
                  type: S.type,
                  size: S.size,
                  color: T,
                  borderColor: T,
                  borderThickness: S.borderThickness
                });
              }
              (q[p].indexLabel || r.indexLabel || q[p].indexLabelFormatter || r.indexLabelFormatter) && this._indexLabels.push({
                chartType: "splineArea",
                dataPoint: q[p],
                dataSeries: r,
                point: {
                  x: g,
                  y: C
                },
                direction: 0 > q[p].y === a.axisY.reversed ? 1 : -1,
                color: z
              });
              C = !1;
            }
            d();
            W.drawMarkers(n);
          }
        }
        t && (c.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(m.x1, m.y1, m.width, m.height), this._eventManager.ghostCtx.restore());
        b.restore();
        return {
          source: c,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderStepArea = function (a) {
      var d, c;
      function b() {
        y && (0 < g.lineThickness && f.stroke(), a.axisY.logarithmic || 0 >= a.axisY.viewportMinimum && 0 <= a.axisY.viewportMaximum ? D = z : 0 > a.axisY.viewportMaximum ? D = m.y1 : 0 < a.axisY.viewportMinimum && (D = z), f.lineTo(l, D), f.lineTo(y.x, D), f.closePath(), f.globalAlpha = g.fillOpacity, f.fill(), f.globalAlpha = 1, t && (n.lineTo(l, D), n.lineTo(y.x, D), n.closePath(), n.fill()), f.beginPath(), f.moveTo(l, u), n.beginPath(), n.moveTo(l, u), y = {
          x: l,
          y: u
        });
      }
      var e = a.targetCanvasCtx || this.plotArea.ctx,
        f = t ? this._preRenderCtx : e;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var n = this._eventManager.ghostCtx,
          m = a.axisY.lineCoordinates,
          A = [],
          h = this.plotArea,
          r;
        f.save();
        t && n.save();
        f.beginPath();
        f.rect(h.x1, h.y1, h.width, h.height);
        f.clip();
        t && (n.beginPath(), n.rect(h.x1, h.y1, h.width, h.height), n.clip());
        for (var q = 0; q < a.dataSeriesIndexes.length; q++) {
          var p = a.dataSeriesIndexes[q],
            g = this.data[p],
            C = g.dataPoints,
            A = g.id;
          this._eventManager.objectMap[A] = {
            objectType: "dataSeries",
            dataSeriesIndex: p
          };
          A = Q(A);
          n.fillStyle = A;
          A = [];
          d = !0;
          var k = 0,
            l,
            u,
            s,
            z = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
            D,
            y = null;
          c = !1;
          if (0 < C.length) {
            var B = g._colorSet[k % g._colorSet.length],
              v = g.lineColor = g.options.lineColor || B,
              w = v;
            f.fillStyle = B;
            f.strokeStyle = v;
            f.lineWidth = g.lineThickness;
            var T = "solid";
            if (f.setLineDash) {
              var S = N(g.nullDataLineDashType, g.lineThickness),
                T = g.lineDashType,
                E = N(T, g.lineThickness);
              f.setLineDash(E);
            }
            for (; k < C.length; k++) if (s = C[k].x.getTime ? C[k].x.getTime() : C[k].x, !(s < a.axisX.dataInfo.viewPortMin || s > a.axisX.dataInfo.viewPortMax && (!g.connectNullData || !c))) {
              var Z = u;
              "number" !== typeof C[k].y ? (g.connectNullData || c || d || b(), c = !0) : (l = a.axisX.convertValueToPixel(s), u = a.axisY.convertValueToPixel(C[k].y), d || c ? (!d && g.connectNullData ? (f.setLineDash && (g.options.nullDataLineDashType || T === g.lineDashType && g.lineDashType !== g.nullDataLineDashType) && (d = l, c = u, l = r.x, u = r.y, b(), f.moveTo(r.x, r.y), l = d, u = c, y = r, T = g.nullDataLineDashType, f.setLineDash(S)), f.lineTo(l, Z), f.lineTo(l, u), t && (n.lineTo(l, Z), n.lineTo(l, u))) : (f.beginPath(), f.moveTo(l, u), t && (n.beginPath(), n.moveTo(l, u)), y = {
                x: l,
                y: u
              }), c = d = !1) : (f.lineTo(l, Z), t && n.lineTo(l, Z), f.lineTo(l, u), t && n.lineTo(l, u), 0 == k % 250 && b()), r = {
                x: l,
                y: u
              }, k < C.length - 1 && (w !== (C[k].lineColor || v) || T !== (C[k].lineDashType || g.lineDashType)) && (b(), w = C[k].lineColor || v, f.strokeStyle = w, f.setLineDash && (C[k].lineDashType ? (T = C[k].lineDashType, f.setLineDash(N(T, g.lineThickness))) : (T = g.lineDashType, f.setLineDash(E)))), s = g.dataPointIds[k], this._eventManager.objectMap[s] = {
                id: s,
                objectType: "dataPoint",
                dataSeriesIndex: p,
                dataPointIndex: k,
                x1: l,
                y1: u
              }, 0 !== C[k].markerSize && (0 < C[k].markerSize || 0 < g.markerSize) && (Z = g.getMarkerProperties(k, l, u, f), A.push(Z), s = Q(s), t && A.push({
                x: l,
                y: u,
                ctx: n,
                type: Z.type,
                size: Z.size,
                color: s,
                borderColor: s,
                borderThickness: Z.borderThickness
              })), (C[k].indexLabel || g.indexLabel || C[k].indexLabelFormatter || g.indexLabelFormatter) && this._indexLabels.push({
                chartType: "stepArea",
                dataPoint: C[k],
                dataSeries: g,
                point: {
                  x: l,
                  y: u
                },
                direction: 0 > C[k].y === a.axisY.reversed ? 1 : -1,
                color: B
              }));
            }
            b();
            W.drawMarkers(A);
          }
        }
        t && (e.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), f.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && f.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && f.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), f.clearRect(h.x1, h.y1, h.width, h.height), this._eventManager.ghostCtx.restore());
        f.restore();
        return {
          source: e,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderStackedArea = function (a) {
      function d() {
        if (!(1 > h.length)) {
          for (0 < B.lineThickness && b.stroke(); 0 < h.length;) {
            var a = h.pop();
            b.lineTo(a.x, a.y);
            t && s.lineTo(a.x, a.y);
          }
          b.closePath();
          b.globalAlpha = B.fillOpacity;
          b.fill();
          b.globalAlpha = 1;
          b.beginPath();
          t && (s.closePath(), s.fill(), s.beginPath());
          h = [];
        }
      }
      var c = a.targetCanvasCtx || this.plotArea.ctx,
        b = t ? this._preRenderCtx : c;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = null,
          f = null,
          n = [],
          m = this.plotArea,
          A = [],
          h = [],
          r = [],
          q = [],
          p = 0,
          g,
          k,
          l = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          s = this._eventManager.ghostCtx,
          u,
          x,
          z;
        t && s.beginPath();
        b.save();
        t && s.save();
        b.beginPath();
        b.rect(m.x1, m.y1, m.width, m.height);
        b.clip();
        t && (s.beginPath(), s.rect(m.x1, m.y1, m.width, m.height), s.clip());
        for (var e = [], D = 0; D < a.dataSeriesIndexes.length; D++) {
          var y = a.dataSeriesIndexes[D],
            B = this.data[y],
            v = B.dataPoints;
          B.dataPointIndexes = [];
          for (p = 0; p < v.length; p++) y = v[p].x.getTime ? v[p].x.getTime() : v[p].x, B.dataPointIndexes[y] = p, e[y] || (r.push(y), e[y] = !0);
          r.sort(Qa);
        }
        for (D = 0; D < a.dataSeriesIndexes.length; D++) {
          y = a.dataSeriesIndexes[D];
          B = this.data[y];
          v = B.dataPoints;
          x = !0;
          h = [];
          p = B.id;
          this._eventManager.objectMap[p] = {
            objectType: "dataSeries",
            dataSeriesIndex: y
          };
          p = Q(p);
          s.fillStyle = p;
          if (0 < r.length) {
            var e = B._colorSet[0],
              w = B.lineColor = B.options.lineColor || e,
              T = w;
            b.fillStyle = e;
            b.strokeStyle = w;
            b.lineWidth = B.lineThickness;
            z = "solid";
            if (b.setLineDash) {
              var S = N(B.nullDataLineDashType, B.lineThickness);
              z = B.lineDashType;
              var E = N(z, B.lineThickness);
              b.setLineDash(E);
            }
            for (var Z = !0, p = 0; p < r.length; p++) {
              var f = r[p],
                ga = null,
                ga = 0 <= B.dataPointIndexes[f] ? v[B.dataPointIndexes[f]] : {
                  x: f,
                  y: null
                };
              if (!(f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax && (!B.connectNullData || !Z))) if ("number" !== typeof ga.y) B.connectNullData || Z || x || d(), Z = !0;else {
                g = a.axisX.convertValueToPixel(f);
                var ma = A[f] ? A[f] : 0;
                if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length) {
                  q[f] = ga.y + (q[f] ? q[f] : 0);
                  if (0 >= q[f] && a.axisY.logarithmic) continue;
                  k = a.axisY.convertValueToPixel(q[f]);
                } else k = a.axisY.convertValueToPixel(ga.y), k -= ma;
                h.push({
                  x: g,
                  y: l - ma
                });
                A[f] = l - k;
                x || Z ? (!x && B.connectNullData ? (b.setLineDash && (B.options.nullDataLineDashType || z === B.lineDashType && B.lineDashType !== B.nullDataLineDashType) && (x = h.pop(), z = h[h.length - 1], d(), b.moveTo(u.x, u.y), h.push(z), h.push(x), z = B.nullDataLineDashType, b.setLineDash(S)), b.lineTo(g, k), t && s.lineTo(g, k)) : (b.beginPath(), b.moveTo(g, k), t && (s.beginPath(), s.moveTo(g, k))), Z = x = !1) : (b.lineTo(g, k), t && s.lineTo(g, k), 0 == p % 250 && (d(), b.moveTo(g, k), t && s.moveTo(g, k), h.push({
                  x: g,
                  y: l - ma
                })));
                u = {
                  x: g,
                  y: k
                };
                p < v.length - 1 && (T !== (v[p].lineColor || w) || z !== (v[p].lineDashType || B.lineDashType)) && (d(), b.beginPath(), b.moveTo(g, k), h.push({
                  x: g,
                  y: l - ma
                }), T = v[p].lineColor || w, b.strokeStyle = T, b.setLineDash && (v[p].lineDashType ? (z = v[p].lineDashType, b.setLineDash(N(z, B.lineThickness))) : (z = B.lineDashType, b.setLineDash(E))));
                if (0 <= B.dataPointIndexes[f]) {
                  var F = B.dataPointIds[B.dataPointIndexes[f]];
                  this._eventManager.objectMap[F] = {
                    id: F,
                    objectType: "dataPoint",
                    dataSeriesIndex: y,
                    dataPointIndex: B.dataPointIndexes[f],
                    x1: g,
                    y1: k
                  };
                }
                0 <= B.dataPointIndexes[f] && 0 !== ga.markerSize && (0 < ga.markerSize || 0 < B.markerSize) && (ma = B.getMarkerProperties(B.dataPointIndexes[f], g, k, b), n.push(ma), f = Q(F), t && n.push({
                  x: g,
                  y: k,
                  ctx: s,
                  type: ma.type,
                  size: ma.size,
                  color: f,
                  borderColor: f,
                  borderThickness: ma.borderThickness
                }));
                (ga.indexLabel || B.indexLabel || ga.indexLabelFormatter || B.indexLabelFormatter) && this._indexLabels.push({
                  chartType: "stackedArea",
                  dataPoint: ga,
                  dataSeries: B,
                  point: {
                    x: g,
                    y: k
                  },
                  direction: 0 > v[p].y === a.axisY.reversed ? 1 : -1,
                  color: e
                });
              }
            }
            d();
            b.moveTo(g, k);
            t && s.moveTo(g, k);
          }
          delete B.dataPointIndexes;
        }
        W.drawMarkers(n);
        t && (c.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(m.x1, m.y1, m.width, m.height), s.restore());
        b.restore();
        return {
          source: c,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderStackedArea100 = function (a) {
      function d() {
        for (0 < B.lineThickness && b.stroke(); 0 < h.length;) {
          var a = h.pop();
          b.lineTo(a.x, a.y);
          t && z.lineTo(a.x, a.y);
        }
        b.closePath();
        b.globalAlpha = B.fillOpacity;
        b.fill();
        b.globalAlpha = 1;
        b.beginPath();
        t && (z.closePath(), z.fill(), z.beginPath());
        h = [];
      }
      var c = a.targetCanvasCtx || this.plotArea.ctx,
        b = t ? this._preRenderCtx : c;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = null,
          f = null,
          n = this.plotArea,
          m = [],
          k = [],
          h = [],
          r = [],
          q = [],
          p = 0,
          g,
          l,
          s,
          da,
          u,
          x = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          z = this._eventManager.ghostCtx;
        b.save();
        t && z.save();
        b.beginPath();
        b.rect(n.x1, n.y1, n.width, n.height);
        b.clip();
        t && (z.beginPath(), z.rect(n.x1, n.y1, n.width, n.height), z.clip());
        for (var e = [], D = 0; D < a.dataSeriesIndexes.length; D++) {
          var y = a.dataSeriesIndexes[D],
            B = this.data[y],
            v = B.dataPoints;
          B.dataPointIndexes = [];
          for (p = 0; p < v.length; p++) y = v[p].x.getTime ? v[p].x.getTime() : v[p].x, B.dataPointIndexes[y] = p, e[y] || (r.push(y), e[y] = !0);
          r.sort(Qa);
        }
        for (D = 0; D < a.dataSeriesIndexes.length; D++) {
          y = a.dataSeriesIndexes[D];
          B = this.data[y];
          v = B.dataPoints;
          da = !0;
          e = B.id;
          this._eventManager.objectMap[e] = {
            objectType: "dataSeries",
            dataSeriesIndex: y
          };
          e = Q(e);
          z.fillStyle = e;
          h = [];
          if (0 < r.length) {
            var e = B._colorSet[p % B._colorSet.length],
              w = B.lineColor = B.options.lineColor || e,
              T = w;
            b.fillStyle = e;
            b.strokeStyle = w;
            b.lineWidth = B.lineThickness;
            u = "solid";
            if (b.setLineDash) {
              var S = N(B.nullDataLineDashType, B.lineThickness);
              u = B.lineDashType;
              var E = N(u, B.lineThickness);
              b.setLineDash(E);
            }
            for (var Z = !0, p = 0; p < r.length; p++) {
              var f = r[p],
                ga = null,
                ga = 0 <= B.dataPointIndexes[f] ? v[B.dataPointIndexes[f]] : {
                  x: f,
                  y: null
                };
              if (!(f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax && (!B.connectNullData || !Z))) if ("number" !== typeof ga.y) B.connectNullData || Z || da || d(), Z = !0;else {
                var ma;
                ma = 0 !== a.dataPointYSums[f] ? 100 * (ga.y / a.dataPointYSums[f]) : 0;
                g = a.axisX.convertValueToPixel(f);
                var F = k[f] ? k[f] : 0;
                if (a.axisY.logarithmic || a.axisY.scaleBreaks && 0 < a.axisY.scaleBreaks._appliedBreaks.length) {
                  q[f] = ma + (q[f] ? q[f] : 0);
                  if (0 >= q[f] && a.axisY.logarithmic) continue;
                  l = a.axisY.convertValueToPixel(q[f]);
                } else l = a.axisY.convertValueToPixel(ma), l -= F;
                h.push({
                  x: g,
                  y: x - F
                });
                k[f] = x - l;
                da || Z ? (!da && B.connectNullData ? (b.setLineDash && (B.options.nullDataLineDashType || u === B.lineDashType && B.lineDashType !== B.nullDataLineDashType) && (da = h.pop(), u = h[h.length - 1], d(), b.moveTo(s.x, s.y), h.push(u), h.push(da), u = B.nullDataLineDashType, b.setLineDash(S)), b.lineTo(g, l), t && z.lineTo(g, l)) : (b.beginPath(), b.moveTo(g, l), t && (z.beginPath(), z.moveTo(g, l))), Z = da = !1) : (b.lineTo(g, l), t && z.lineTo(g, l), 0 == p % 250 && (d(), b.moveTo(g, l), t && z.moveTo(g, l), h.push({
                  x: g,
                  y: x - F
                })));
                s = {
                  x: g,
                  y: l
                };
                p < v.length - 1 && (T !== (v[p].lineColor || w) || u !== (v[p].lineDashType || B.lineDashType)) && (d(), b.beginPath(), b.moveTo(g, l), h.push({
                  x: g,
                  y: x - F
                }), T = v[p].lineColor || w, b.strokeStyle = T, b.setLineDash && (v[p].lineDashType ? (u = v[p].lineDashType, b.setLineDash(N(u, B.lineThickness))) : (u = B.lineDashType, b.setLineDash(E))));
                if (0 <= B.dataPointIndexes[f]) {
                  var G = B.dataPointIds[B.dataPointIndexes[f]];
                  this._eventManager.objectMap[G] = {
                    id: G,
                    objectType: "dataPoint",
                    dataSeriesIndex: y,
                    dataPointIndex: B.dataPointIndexes[f],
                    x1: g,
                    y1: l
                  };
                }
                0 <= B.dataPointIndexes[f] && 0 !== ga.markerSize && (0 < ga.markerSize || 0 < B.markerSize) && (F = B.getMarkerProperties(p, g, l, b), m.push(F), f = Q(G), t && m.push({
                  x: g,
                  y: l,
                  ctx: z,
                  type: F.type,
                  size: F.size,
                  color: f,
                  borderColor: f,
                  borderThickness: F.borderThickness
                }));
                (ga.indexLabel || B.indexLabel || ga.indexLabelFormatter || B.indexLabelFormatter) && this._indexLabels.push({
                  chartType: "stackedArea100",
                  dataPoint: ga,
                  dataSeries: B,
                  point: {
                    x: g,
                    y: l
                  },
                  direction: 0 > v[p].y === a.axisY.reversed ? 1 : -1,
                  color: e
                });
              }
            }
            d();
            b.moveTo(g, l);
            t && z.moveTo(g, l);
          }
          delete B.dataPointIndexes;
        }
        W.drawMarkers(m);
        t && (c.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(n.x1, n.y1, n.width, n.height), z.restore());
        b.restore();
        return {
          source: c,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderBubble = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = this.plotArea,
          e = 0,
          f,
          n;
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(b.x1, b.y1, b.width, b.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(b.x1, b.y1, b.width, b.height), this._eventManager.ghostCtx.clip());
        for (var m = -Infinity, k = Infinity, h = 0; h < a.dataSeriesIndexes.length; h++) for (var r = a.dataSeriesIndexes[h], q = this.data[r], p = q.dataPoints, g = 0, e = 0; e < p.length; e++) f = p[e].getTime ? f = p[e].x.getTime() : f = p[e].x, f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax || "undefined" === typeof p[e].z || (g = p[e].z, g > m && (m = g), g < k && (k = g));
        for (var l = 25 * Math.PI, s = Math.max(Math.pow(0.25 * Math.min(b.height, b.width) / 2, 2) * Math.PI, l), h = 0; h < a.dataSeriesIndexes.length; h++) if (r = a.dataSeriesIndexes[h], q = this.data[r], p = q.dataPoints, 0 < p.length) for (c.strokeStyle = "#4572A7 ", e = 0; e < p.length; e++) if (f = p[e].getTime ? f = p[e].x.getTime() : f = p[e].x, !(f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax) && "number" === typeof p[e].y) {
          f = a.axisX.convertValueToPixel(f);
          n = a.axisY.convertValueToPixel(p[e].y);
          var g = p[e].z,
            da = 2 * Math.max(Math.sqrt((m === k ? s / 2 : l + (s - l) / (m - k) * (g - k)) / Math.PI) << 0, 1),
            g = q.getMarkerProperties(e, c);
          g.size = da;
          c.globalAlpha = q.fillOpacity;
          W.drawMarker(f, n, c, g.type, g.size, g.color, g.borderColor, g.borderThickness);
          c.globalAlpha = 1;
          var u = q.dataPointIds[e];
          this._eventManager.objectMap[u] = {
            id: u,
            objectType: "dataPoint",
            dataSeriesIndex: r,
            dataPointIndex: e,
            x1: f,
            y1: n,
            size: da
          };
          da = Q(u);
          t && W.drawMarker(f, n, this._eventManager.ghostCtx, g.type, g.size, da, da, g.borderThickness);
          (p[e].indexLabel || q.indexLabel || p[e].indexLabelFormatter || q.indexLabelFormatter) && this._indexLabels.push({
            chartType: "bubble",
            dataPoint: p[e],
            dataSeries: q,
            point: {
              x: f,
              y: n
            },
            direction: 1,
            bounds: {
              x1: f - g.size / 2,
              y1: n - g.size / 2,
              x2: f + g.size / 2,
              y2: n + g.size / 2
            },
            color: null
          });
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(b.x1, b.y1, b.width, b.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderScatter = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = this.plotArea,
          e = 0,
          f,
          n;
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(b.x1, b.y1, b.width, b.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(b.x1, b.y1, b.width, b.height), this._eventManager.ghostCtx.clip());
        for (var m = 0; m < a.dataSeriesIndexes.length; m++) {
          var k = a.dataSeriesIndexes[m],
            h = this.data[k],
            r = h.dataPoints;
          if (0 < r.length) {
            c.strokeStyle = "#4572A7 ";
            Math.pow(0.3 * Math.min(b.height, b.width) / 2, 2);
            for (var q = 0, p = 0, e = 0; e < r.length; e++) if (f = r[e].getTime ? f = r[e].x.getTime() : f = r[e].x, !(f < a.axisX.dataInfo.viewPortMin || f > a.axisX.dataInfo.viewPortMax) && "number" === typeof r[e].y) {
              f = a.axisX.convertValueToPixel(f);
              n = a.axisY.convertValueToPixel(r[e].y);
              var g = h.getMarkerProperties(e, f, n, c);
              c.globalAlpha = h.fillOpacity;
              W.drawMarker(g.x, g.y, g.ctx, g.type, g.size, g.color, g.borderColor, g.borderThickness);
              c.globalAlpha = 1;
              Math.sqrt((q - f) * (q - f) + (p - n) * (p - n)) < Math.min(g.size, 5) && r.length > Math.min(this.plotArea.width, this.plotArea.height) || (q = h.dataPointIds[e], this._eventManager.objectMap[q] = {
                id: q,
                objectType: "dataPoint",
                dataSeriesIndex: k,
                dataPointIndex: e,
                x1: f,
                y1: n
              }, q = Q(q), t && W.drawMarker(g.x, g.y, this._eventManager.ghostCtx, g.type, g.size, q, q, g.borderThickness), (r[e].indexLabel || h.indexLabel || r[e].indexLabelFormatter || h.indexLabelFormatter) && this._indexLabels.push({
                chartType: "scatter",
                dataPoint: r[e],
                dataSeries: h,
                point: {
                  x: f,
                  y: n
                },
                direction: 1,
                bounds: {
                  x1: f - g.size / 2,
                  y1: n - g.size / 2,
                  x2: f + g.size / 2,
                  y2: n + g.size / 2
                },
                color: null
              }), q = f, p = n);
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(b.x1, b.y1, b.width, b.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderCandlestick = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d,
        b = this._eventManager.ghostCtx;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = null,
          f = null,
          n = this.plotArea,
          m = 0,
          k,
          h,
          r,
          q,
          p,
          g,
          e = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
          f = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.015 * this.width,
          l = a.axisX.dataInfo.minDiff;
        isFinite(l) || (l = 0.3 * Math.abs(a.axisX.range));
        l = this.options.dataPointWidth ? this.dataPointWidth : 0.7 * n.width * (a.axisX.logarithmic ? Math.log(l) / Math.log(a.axisX.range) : Math.abs(l) / Math.abs(a.axisX.range)) << 0;
        this.dataPointMaxWidth && e > f && (e = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, f));
        !this.dataPointMaxWidth && this.dataPointMinWidth && f < e && (f = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, e));
        l < e && (l = e);
        l > f && (l = f);
        c.save();
        t && b.save();
        c.beginPath();
        c.rect(n.x1, n.y1, n.width, n.height);
        c.clip();
        t && (b.beginPath(), b.rect(n.x1, n.y1, n.width, n.height), b.clip());
        for (var fa = 0; fa < a.dataSeriesIndexes.length; fa++) {
          var da = a.dataSeriesIndexes[fa],
            u = this.data[da],
            x = u.dataPoints;
          if (0 < x.length) for (var z = 5 < l && u.bevelEnabled ? !0 : !1, m = 0; m < x.length; m++) if (x[m].getTime ? g = x[m].x.getTime() : g = x[m].x, !(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax) && !s(x[m].y) && x[m].y.length && "number" === typeof x[m].y[0] && "number" === typeof x[m].y[1] && "number" === typeof x[m].y[2] && "number" === typeof x[m].y[3]) {
            k = a.axisX.convertValueToPixel(g);
            h = a.axisY.convertValueToPixel(x[m].y[0]);
            r = a.axisY.convertValueToPixel(x[m].y[1]);
            q = a.axisY.convertValueToPixel(x[m].y[2]);
            p = a.axisY.convertValueToPixel(x[m].y[3]);
            var v = k - l / 2 << 0,
              y = v + l << 0,
              f = u.options.fallingColor ? u.fallingColor : u._colorSet[0],
              e = x[m].color ? x[m].color : u._colorSet[0],
              B = Math.round(Math.max(1, 0.15 * l)),
              w = 0 === B % 2 ? 0 : 0.5,
              E = u.dataPointIds[m];
            this._eventManager.objectMap[E] = {
              id: E,
              objectType: "dataPoint",
              dataSeriesIndex: da,
              dataPointIndex: m,
              x1: v,
              y1: h,
              x2: y,
              y2: r,
              x3: k,
              y3: q,
              x4: k,
              y4: p,
              borderThickness: B,
              color: e
            };
            c.strokeStyle = e;
            c.beginPath();
            c.lineWidth = B;
            b.lineWidth = Math.max(B, 4);
            "candlestick" === u.type ? (c.moveTo(k - w, r), c.lineTo(k - w, Math.min(h, p)), c.stroke(), c.moveTo(k - w, Math.max(h, p)), c.lineTo(k - w, q), c.stroke(), ba(c, v, Math.min(h, p), y, Math.max(h, p), x[m].y[0] <= x[m].y[3] ? u.risingColor : f, B, e, z, z, !1, !1, u.fillOpacity), t && (e = Q(E), b.strokeStyle = e, b.moveTo(k - w, r), b.lineTo(k - w, Math.min(h, p)), b.stroke(), b.moveTo(k - w, Math.max(h, p)), b.lineTo(k - w, q), b.stroke(), ba(b, v, Math.min(h, p), y, Math.max(h, p), e, 0, null, !1, !1, !1, !1))) : "ohlc" === u.type && (c.moveTo(k - w, r), c.lineTo(k - w, q), c.stroke(), c.beginPath(), c.moveTo(k, h), c.lineTo(v, h), c.stroke(), c.beginPath(), c.moveTo(k, p), c.lineTo(y, p), c.stroke(), t && (e = Q(E), b.strokeStyle = e, b.moveTo(k - w, r), b.lineTo(k - w, q), b.stroke(), b.beginPath(), b.moveTo(k, h), b.lineTo(v, h), b.stroke(), b.beginPath(), b.moveTo(k, p), b.lineTo(y, p), b.stroke()));
            (x[m].indexLabel || u.indexLabel || x[m].indexLabelFormatter || u.indexLabelFormatter) && this._indexLabels.push({
              chartType: u.type,
              dataPoint: x[m],
              dataSeries: u,
              point: {
                x: v + (y - v) / 2,
                y: a.axisY.reversed ? q : r
              },
              direction: 1,
              bounds: {
                x1: v,
                y1: Math.min(r, q),
                x2: y,
                y2: Math.max(r, q)
              },
              color: e
            });
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(n.x1, n.y1, n.width, n.height), b.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderBoxAndWhisker = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d,
        b = this._eventManager.ghostCtx;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = null,
          f = this.plotArea,
          n = 0,
          m,
          k,
          h,
          r,
          q,
          p,
          g,
          e = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1,
          n = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.015 * this.width,
          l = a.axisX.dataInfo.minDiff;
        isFinite(l) || (l = 0.3 * Math.abs(a.axisX.range));
        l = this.options.dataPointWidth ? this.dataPointWidth : 0.7 * f.width * (a.axisX.logarithmic ? Math.log(l) / Math.log(a.axisX.range) : Math.abs(l) / Math.abs(a.axisX.range)) << 0;
        this.dataPointMaxWidth && e > n && (e = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, n));
        !this.dataPointMaxWidth && this.dataPointMinWidth && n < e && (n = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, e));
        l < e && (l = e);
        l > n && (l = n);
        c.save();
        t && b.save();
        c.beginPath();
        c.rect(f.x1, f.y1, f.width, f.height);
        c.clip();
        t && (b.beginPath(), b.rect(f.x1, f.y1, f.width, f.height), b.clip());
        for (var fa = !1, fa = !!a.axisY.reversed, da = 0; da < a.dataSeriesIndexes.length; da++) {
          var u = a.dataSeriesIndexes[da],
            x = this.data[u],
            z = x.dataPoints;
          if (0 < z.length) for (var v = 5 < l && x.bevelEnabled ? !0 : !1, n = 0; n < z.length; n++) if (z[n].getTime ? g = z[n].x.getTime() : g = z[n].x, !(g < a.axisX.dataInfo.viewPortMin || g > a.axisX.dataInfo.viewPortMax) && !s(z[n].y) && z[n].y.length && "number" === typeof z[n].y[0] && "number" === typeof z[n].y[1] && "number" === typeof z[n].y[2] && "number" === typeof z[n].y[3] && "number" === typeof z[n].y[4] && 5 === z[n].y.length) {
            m = a.axisX.convertValueToPixel(g);
            k = a.axisY.convertValueToPixel(z[n].y[0]);
            h = a.axisY.convertValueToPixel(z[n].y[1]);
            r = a.axisY.convertValueToPixel(z[n].y[2]);
            q = a.axisY.convertValueToPixel(z[n].y[3]);
            p = a.axisY.convertValueToPixel(z[n].y[4]);
            var y = m - l / 2 << 0,
              B = m + l / 2 << 0,
              e = z[n].color ? z[n].color : x._colorSet[0],
              w = Math.round(Math.max(1, 0.15 * l)),
              E = 0 === w % 2 ? 0 : 0.5,
              T = z[n].whiskerColor ? z[n].whiskerColor : z[n].color ? x.whiskerColor ? x.whiskerColor : z[n].color : x.whiskerColor ? x.whiskerColor : e,
              S = "number" === typeof z[n].whiskerThickness ? z[n].whiskerThickness : "number" === typeof x.options.whiskerThickness ? x.whiskerThickness : w,
              F = z[n].whiskerDashType ? z[n].whiskerDashType : x.whiskerDashType,
              Z = s(z[n].whiskerLength) ? s(x.options.whiskerLength) ? l : x.whiskerLength : z[n].whiskerLength,
              Z = "number" === typeof Z ? 0 >= Z ? 0 : Z >= l ? l : Z : "string" === typeof Z ? parseInt(Z) * l / 100 > l ? l : parseInt(Z) * l / 100 : l,
              ga = 1 === Math.round(S) % 2 ? 0.5 : 0,
              ma = z[n].stemColor ? z[n].stemColor : z[n].color ? x.stemColor ? x.stemColor : z[n].color : x.stemColor ? x.stemColor : e,
              Ba = "number" === typeof z[n].stemThickness ? z[n].stemThickness : "number" === typeof x.options.stemThickness ? x.stemThickness : w,
              G = 1 === Math.round(Ba) % 2 ? 0.5 : 0,
              J = z[n].stemDashType ? z[n].stemDashType : x.stemDashType,
              I = z[n].lineColor ? z[n].lineColor : z[n].color ? x.lineColor ? x.lineColor : z[n].color : x.lineColor ? x.lineColor : e,
              M = "number" === typeof z[n].lineThickness ? z[n].lineThickness : "number" === typeof x.options.lineThickness ? x.lineThickness : w,
              R = z[n].lineDashType ? z[n].lineDashType : x.lineDashType,
              K = 1 === Math.round(M) % 2 ? 0.5 : 0,
              P = x.upperBoxColor,
              xa = x.lowerBoxColor,
              sa = s(x.options.fillOpacity) ? 1 : x.fillOpacity,
              O = x.dataPointIds[n];
            this._eventManager.objectMap[O] = {
              id: O,
              objectType: "dataPoint",
              dataSeriesIndex: u,
              dataPointIndex: n,
              x1: y,
              y1: k,
              x2: B,
              y2: h,
              x3: m,
              y3: r,
              x4: m,
              y4: q,
              y5: p,
              borderThickness: w,
              color: e,
              stemThickness: Ba,
              stemColor: ma,
              whiskerThickness: S,
              whiskerLength: Z,
              whiskerColor: T,
              lineThickness: M,
              lineColor: I
            };
            c.save();
            0 < Ba && (c.beginPath(), c.strokeStyle = ma, c.lineWidth = Ba, c.setLineDash && c.setLineDash(N(J, Ba)), c.moveTo(m - G, h), c.lineTo(m - G, k), c.stroke(), c.moveTo(m - G, q), c.lineTo(m - G, r), c.stroke());
            c.restore();
            b.lineWidth = Math.max(w, 4);
            c.beginPath();
            ba(c, y, Math.min(p, h), B, Math.max(h, p), xa, 0, e, fa ? v : !1, fa ? !1 : v, !1, !1, sa);
            c.beginPath();
            ba(c, y, Math.min(r, p), B, Math.max(p, r), P, 0, e, fa ? !1 : v, fa ? v : !1, !1, !1, sa);
            c.beginPath();
            c.lineWidth = w;
            c.strokeStyle = e;
            c.rect(y - E, Math.min(h, r) - E, B - y + 2 * E, Math.max(h, r) - Math.min(h, r) + 2 * E);
            c.stroke();
            c.save();
            0 < M && (c.beginPath(), c.globalAlpha = 1, c.setLineDash && c.setLineDash(N(R, M)), c.strokeStyle = I, c.lineWidth = M, c.moveTo(y, p - K), c.lineTo(B, p - K), c.stroke());
            c.restore();
            c.save();
            0 < S && (c.beginPath(), c.setLineDash && c.setLineDash(N(F, S)), c.strokeStyle = T, c.lineWidth = S, c.moveTo(m - Z / 2 << 0, q - ga), c.lineTo(m + Z / 2 << 0, q - ga), c.stroke(), c.moveTo(m - Z / 2 << 0, k + ga), c.lineTo(m + Z / 2 << 0, k + ga), c.stroke());
            c.restore();
            t && (e = Q(O), b.strokeStyle = e, b.lineWidth = Ba, 0 < Ba && (b.moveTo(m - E - G, h), b.lineTo(m - E - G, Math.max(k, q)), b.stroke(), b.moveTo(m - E - G, Math.min(k, q)), b.lineTo(m - E - G, r), b.stroke()), ba(b, y, Math.max(h, r), B, Math.min(h, r), e, 0, null, !1, !1, !1, !1), 0 < S && (b.beginPath(), b.lineWidth = S, b.moveTo(m + Z / 2, q - ga), b.lineTo(m - Z / 2, q - ga), b.stroke(), b.moveTo(m + Z / 2, k + ga), b.lineTo(m - Z / 2, k + ga), b.stroke()));
            (z[n].indexLabel || x.indexLabel || z[n].indexLabelFormatter || x.indexLabelFormatter) && this._indexLabels.push({
              chartType: x.type,
              dataPoint: z[n],
              dataSeries: x,
              point: {
                x: y + (B - y) / 2,
                y: a.axisY.reversed ? k : q
              },
              direction: 1,
              bounds: {
                x1: y,
                y1: Math.min(k, q),
                x2: B,
                y2: Math.max(k, q)
              },
              color: e
            });
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(f.x1, f.y1, f.width, f.height), b.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderRangeColumn = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = 0,
          n,
          m,
          k,
          f = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        n = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : 0.03 * this.width;
        var h = a.axisX.dataInfo.minDiff;
        isFinite(h) || (h = 0.3 * Math.abs(a.axisX.range));
        h = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.width * (a.axisX.logarithmic ? Math.log(h) / Math.log(a.axisX.range) : Math.abs(h) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
        this.dataPointMaxWidth && f > n && (f = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, n));
        !this.dataPointMaxWidth && this.dataPointMinWidth && n < f && (n = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, f));
        h < f && (h = f);
        h > n && (h = n);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (var r = 0; r < a.dataSeriesIndexes.length; r++) {
          var q = a.dataSeriesIndexes[r],
            p = this.data[q],
            g = p.dataPoints;
          if (0 < g.length) for (var l = 5 < h && p.bevelEnabled ? !0 : !1, f = 0; f < g.length; f++) if (g[f].getTime ? k = g[f].x.getTime() : k = g[f].x, !(k < a.axisX.dataInfo.viewPortMin || k > a.axisX.dataInfo.viewPortMax) && !s(g[f].y) && g[f].y.length && "number" === typeof g[f].y[0] && "number" === typeof g[f].y[1]) {
            b = a.axisX.convertValueToPixel(k);
            n = a.axisY.convertValueToPixel(g[f].y[0]);
            m = a.axisY.convertValueToPixel(g[f].y[1]);
            var fa = a.axisX.reversed ? b + a.plotType.totalDataSeries * h / 2 - (a.previousDataSeriesCount + r) * h << 0 : b - a.plotType.totalDataSeries * h / 2 + (a.previousDataSeriesCount + r) * h << 0,
              v = a.axisX.reversed ? fa - h << 0 : fa + h << 0,
              b = g[f].color ? g[f].color : p._colorSet[f % p._colorSet.length];
            if (n > m) {
              var u = n;
              n = m;
              m = u;
            }
            u = p.dataPointIds[f];
            this._eventManager.objectMap[u] = {
              id: u,
              objectType: "dataPoint",
              dataSeriesIndex: q,
              dataPointIndex: f,
              x1: fa,
              y1: n,
              x2: v,
              y2: m
            };
            ba(c, fa, n, v, m, b, 0, b, l, l, !1, !1, p.fillOpacity);
            b = Q(u);
            t && ba(this._eventManager.ghostCtx, fa, n, v, m, b, 0, null, !1, !1, !1, !1);
            if (g[f].indexLabel || p.indexLabel || g[f].indexLabelFormatter || p.indexLabelFormatter) this._indexLabels.push({
              chartType: "rangeColumn",
              dataPoint: g[f],
              dataSeries: p,
              indexKeyword: 0,
              point: {
                x: fa + (v - fa) / 2,
                y: g[f].y[1] >= g[f].y[0] ? m : n
              },
              direction: g[f].y[1] >= g[f].y[0] ? -1 : 1,
              bounds: {
                x1: fa,
                y1: Math.min(n, m),
                x2: v,
                y2: Math.max(n, m)
              },
              color: b
            }), this._indexLabels.push({
              chartType: "rangeColumn",
              dataPoint: g[f],
              dataSeries: p,
              indexKeyword: 1,
              point: {
                x: fa + (v - fa) / 2,
                y: g[f].y[1] >= g[f].y[0] ? n : m
              },
              direction: g[f].y[1] >= g[f].y[0] ? 1 : -1,
              bounds: {
                x1: fa,
                y1: Math.min(n, m),
                x2: v,
                y2: Math.max(n, m)
              },
              color: b
            });
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderError = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d,
        b = a.axisY._position ? "left" === a.axisY._position || "right" === a.axisY._position ? !1 : !0 : !1;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = null,
          f = !1,
          n = this.plotArea,
          m = 0,
          k,
          h,
          r,
          q,
          p,
          g,
          l,
          fa = a.axisX.dataInfo.minDiff;
        isFinite(fa) || (fa = 0.3 * Math.abs(a.axisX.range));
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(n.x1, n.y1, n.width, n.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(n.x1, n.y1, n.width, n.height), this._eventManager.ghostCtx.clip());
        for (var v = 0, u = 0; u < this.data.length; u++) !this.data[u].type.match(/(bar|column)/ig) || !this.data[u].visible || this.data[u].type.match(/(stacked)/ig) && v || v++;
        for (var x = 0; x < a.dataSeriesIndexes.length; x++) {
          var z = a.dataSeriesIndexes[x],
            D = this.data[z],
            y = D.dataPoints,
            B = s(D._linkedSeries) ? !1 : D._linkedSeries.type.match(/(bar|column)/ig) && D._linkedSeries.visible ? !0 : !1,
            E = 0;
          if (B) for (e = D._linkedSeries.id, u = 0; u < e; u++) !this.data[u].type.match(/(bar|column)/ig) || !this.data[u].visible || this.data[u].type.match(/(stacked)/ig) && E || (this.data[u].type.match(/(range)/ig) && (f = !0), E++);
          e = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
          m = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : b ? Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / (B ? v : 1))) << 0 : 0.3 * this.width;
          f && (m = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : b ? Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / (B ? v : 1))) << 0 : 0.03 * this.width);
          u = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * ((b ? n.height : n.width) * (a.axisX.logarithmic ? Math.log(fa) / Math.log(a.axisX.range) : Math.abs(fa) / Math.abs(a.axisX.range)) / (B ? v : 1)) << 0;
          this.dataPointMaxWidth && e > m && (e = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, m));
          !this.dataPointMaxWidth && this.dataPointMinWidth && m < e && (m = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, e));
          u < e && (u = e);
          u > m && (u = m);
          if (0 < y.length) for (var F = D._colorSet, m = 0; m < y.length; m++) {
            var e = D.lineColor = D.options.color ? D.options.color : F[0],
              T = {
                color: y[m].whiskerColor ? y[m].whiskerColor : y[m].color ? D.whiskerColor ? D.whiskerColor : y[m].color : D.whiskerColor ? D.whiskerColor : e,
                thickness: s(y[m].whiskerThickness) ? D.whiskerThickness : y[m].whiskerThickness,
                dashType: y[m].whiskerDashType ? y[m].whiskerDashType : D.whiskerDashType,
                length: s(y[m].whiskerLength) ? s(D.options.whiskerLength) ? u : D.options.whiskerLength : y[m].whiskerLength,
                trimLength: s(y[m].whiskerLength) ? s(D.options.whiskerLength) ? 50 : 0 : 0
              };
            T.length = "number" === typeof T.length ? 0 >= T.length ? 0 : T.length >= u ? u : T.length : "string" === typeof T.length ? parseInt(T.length) * u / 100 > u ? u : parseInt(T.length) * u / 100 > u : u;
            T.thickness = "number" === typeof T.thickness ? 0 > T.thickness ? 0 : Math.round(T.thickness) : 2;
            var S = {
              color: y[m].stemColor ? y[m].stemColor : y[m].color ? D.stemColor ? D.stemColor : y[m].color : D.stemColor ? D.stemColor : e,
              thickness: y[m].stemThickness ? y[m].stemThickness : D.stemThickness,
              dashType: y[m].stemDashType ? y[m].stemDashType : D.stemDashType
            };
            S.thickness = "number" === typeof S.thickness ? 0 > S.thickness ? 0 : Math.round(S.thickness) : 2;
            y[m].getTime ? l = y[m].x.getTime() : l = y[m].x;
            if (!(l < a.axisX.dataInfo.viewPortMin || l > a.axisX.dataInfo.viewPortMax) && !s(y[m].y) && y[m].y.length && "number" === typeof y[m].y[0] && "number" === typeof y[m].y[1]) {
              var ka = a.axisX.convertValueToPixel(l);
              b ? h = ka : k = ka;
              ka = a.axisY.convertValueToPixel(y[m].y[0]);
              b ? r = ka : p = ka;
              ka = a.axisY.convertValueToPixel(y[m].y[1]);
              b ? q = ka : g = ka;
              b ? (p = a.axisX.reversed ? h + (B ? v : 1) * u / 2 - (B ? E - 1 : 0) * u << 0 : h - (B ? v : 1) * u / 2 + (B ? E - 1 : 0) * u << 0, g = a.axisX.reversed ? p - u << 0 : p + u << 0) : (r = a.axisX.reversed ? k + (B ? v : 1) * u / 2 - (B ? E - 1 : 0) * u << 0 : k - (B ? v : 1) * u / 2 + (B ? E - 1 : 0) * u << 0, q = a.axisX.reversed ? r - u << 0 : r + u << 0);
              !b && p > g && (ka = p, p = g, g = ka);
              b && r > q && (ka = r, r = q, q = ka);
              ka = D.dataPointIds[m];
              this._eventManager.objectMap[ka] = {
                id: ka,
                objectType: "dataPoint",
                dataSeriesIndex: z,
                dataPointIndex: m,
                x1: Math.min(r, q),
                y1: Math.min(p, g),
                x2: Math.max(q, r),
                y2: Math.max(g, p),
                isXYSwapped: b,
                stemProperties: S,
                whiskerProperties: T
              };
              w(c, Math.min(r, q), Math.min(p, g), Math.max(q, r), Math.max(g, p), e, T, S, b);
              t && w(this._eventManager.ghostCtx, r, p, q, g, e, T, S, b);
              if (y[m].indexLabel || D.indexLabel || y[m].indexLabelFormatter || D.indexLabelFormatter) this._indexLabels.push({
                chartType: "error",
                dataPoint: y[m],
                dataSeries: D,
                indexKeyword: 0,
                point: {
                  x: b ? y[m].y[1] >= y[m].y[0] ? r : q : r + (q - r) / 2,
                  y: b ? p + (g - p) / 2 : y[m].y[1] >= y[m].y[0] ? g : p
                },
                direction: y[m].y[1] >= y[m].y[0] ? -1 : 1,
                bounds: {
                  x1: b ? Math.min(r, q) : r,
                  y1: b ? p : Math.min(p, g),
                  x2: b ? Math.max(r, q) : q,
                  y2: b ? g : Math.max(p, g)
                },
                color: e,
                axisSwapped: b
              }), this._indexLabels.push({
                chartType: "error",
                dataPoint: y[m],
                dataSeries: D,
                indexKeyword: 1,
                point: {
                  x: b ? y[m].y[1] >= y[m].y[0] ? q : r : r + (q - r) / 2,
                  y: b ? p + (g - p) / 2 : y[m].y[1] >= y[m].y[0] ? p : g
                },
                direction: y[m].y[1] >= y[m].y[0] ? 1 : -1,
                bounds: {
                  x1: b ? Math.min(r, q) : r,
                  y1: b ? p : Math.min(p, g),
                  x2: b ? Math.max(r, q) : q,
                  y2: b ? g : Math.max(p, g)
                },
                color: e,
                axisSwapped: b
              });
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(n.x1, n.y1, n.width, n.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderRangeBar = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = null,
          e = this.plotArea,
          f = 0,
          n,
          m,
          k,
          h,
          f = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        n = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.height, 0.9 * (this.plotArea.height / a.plotType.totalDataSeries)) << 0;
        var r = a.axisX.dataInfo.minDiff;
        isFinite(r) || (r = 0.3 * Math.abs(a.axisX.range));
        r = this.options.dataPointWidth ? this.dataPointWidth : 0.9 * (e.height * (a.axisX.logarithmic ? Math.log(r) / Math.log(a.axisX.range) : Math.abs(r) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
        this.dataPointMaxWidth && f > n && (f = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, n));
        !this.dataPointMaxWidth && this.dataPointMinWidth && n < f && (n = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, f));
        r < f && (r = f);
        r > n && (r = n);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(e.x1, e.y1, e.width, e.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.clip());
        for (var q = 0; q < a.dataSeriesIndexes.length; q++) {
          var p = a.dataSeriesIndexes[q],
            g = this.data[p],
            l = g.dataPoints;
          if (0 < l.length) {
            var fa = 5 < r && g.bevelEnabled ? !0 : !1;
            c.strokeStyle = "#4572A7 ";
            for (f = 0; f < l.length; f++) if (l[f].getTime ? h = l[f].x.getTime() : h = l[f].x, !(h < a.axisX.dataInfo.viewPortMin || h > a.axisX.dataInfo.viewPortMax) && !s(l[f].y) && l[f].y.length && "number" === typeof l[f].y[0] && "number" === typeof l[f].y[1]) {
              n = a.axisY.convertValueToPixel(l[f].y[0]);
              m = a.axisY.convertValueToPixel(l[f].y[1]);
              k = a.axisX.convertValueToPixel(h);
              k = a.axisX.reversed ? k + a.plotType.totalDataSeries * r / 2 - (a.previousDataSeriesCount + q) * r << 0 : k - a.plotType.totalDataSeries * r / 2 + (a.previousDataSeriesCount + q) * r << 0;
              var v = a.axisX.reversed ? k - r << 0 : k + r << 0;
              n > m && (b = n, n = m, m = b);
              b = l[f].color ? l[f].color : g._colorSet[f % g._colorSet.length];
              ba(c, n, k, m, v, b, 0, null, fa, !1, !1, !1, g.fillOpacity);
              b = g.dataPointIds[f];
              this._eventManager.objectMap[b] = {
                id: b,
                objectType: "dataPoint",
                dataSeriesIndex: p,
                dataPointIndex: f,
                x1: n,
                y1: k,
                x2: m,
                y2: v
              };
              b = Q(b);
              t && ba(this._eventManager.ghostCtx, n, k, m, v, b, 0, null, !1, !1, !1, !1);
              if (l[f].indexLabel || g.indexLabel || l[f].indexLabelFormatter || g.indexLabelFormatter) this._indexLabels.push({
                chartType: "rangeBar",
                dataPoint: l[f],
                dataSeries: g,
                indexKeyword: 0,
                point: {
                  x: l[f].y[1] >= l[f].y[0] ? n : m,
                  y: k + (v - k) / 2
                },
                direction: l[f].y[1] >= l[f].y[0] ? -1 : 1,
                bounds: {
                  x1: Math.min(n, m),
                  y1: k,
                  x2: Math.max(n, m),
                  y2: v
                },
                color: b
              }), this._indexLabels.push({
                chartType: "rangeBar",
                dataPoint: l[f],
                dataSeries: g,
                indexKeyword: 1,
                point: {
                  x: l[f].y[1] >= l[f].y[0] ? m : n,
                  y: k + (v - k) / 2
                },
                direction: l[f].y[1] >= l[f].y[0] ? 1 : -1,
                bounds: {
                  x1: Math.min(n, m),
                  y1: k,
                  x2: Math.max(n, m),
                  y2: v
                },
                color: b
              });
            }
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(e.x1, e.y1, e.width, e.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    l.prototype.renderRangeArea = function (a) {
      function d() {
        if (x) {
          var a = null;
          0 < r.lineThickness && b.stroke();
          for (var c = k.length - 1; 0 <= c; c--) a = k[c], b.lineTo(a.x, a.y), e.lineTo(a.x, a.y);
          b.closePath();
          b.globalAlpha = r.fillOpacity;
          b.fill();
          b.globalAlpha = 1;
          e.fill();
          if (0 < r.lineThickness) {
            b.beginPath();
            b.moveTo(a.x, a.y);
            for (c = 0; c < k.length; c++) a = k[c], b.lineTo(a.x, a.y);
            b.stroke();
          }
          b.beginPath();
          b.moveTo(l, s);
          e.beginPath();
          e.moveTo(l, s);
          x = {
            x: l,
            y: s
          };
          k = [];
          k.push({
            x: l,
            y: v
          });
        }
      }
      var c = a.targetCanvasCtx || this.plotArea.ctx,
        b = t ? this._preRenderCtx : c;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = this._eventManager.ghostCtx,
          f = [],
          n = this.plotArea;
        b.save();
        t && e.save();
        b.beginPath();
        b.rect(n.x1, n.y1, n.width, n.height);
        b.clip();
        t && (e.beginPath(), e.rect(n.x1, n.y1, n.width, n.height), e.clip());
        for (var m = 0; m < a.dataSeriesIndexes.length; m++) {
          var k = [],
            h = a.dataSeriesIndexes[m],
            r = this.data[h],
            q = r.dataPoints,
            f = r.id;
          this._eventManager.objectMap[f] = {
            objectType: "dataSeries",
            dataSeriesIndex: h
          };
          f = Q(f);
          e.fillStyle = f;
          var f = [],
            p = !0,
            g = 0,
            l,
            s,
            v,
            u,
            x = null;
          if (0 < q.length) {
            var z = r._colorSet[g % r._colorSet.length],
              D = r.lineColor = r.options.lineColor || z,
              y = D;
            b.fillStyle = z;
            b.strokeStyle = D;
            b.lineWidth = r.lineThickness;
            var B = "solid";
            if (b.setLineDash) {
              var w = N(r.nullDataLineDashType, r.lineThickness),
                B = r.lineDashType,
                E = N(B, r.lineThickness);
              b.setLineDash(E);
            }
            for (var T = !0; g < q.length; g++) if (u = q[g].x.getTime ? q[g].x.getTime() : q[g].x, !(u < a.axisX.dataInfo.viewPortMin || u > a.axisX.dataInfo.viewPortMax && (!r.connectNullData || !T))) if (null !== q[g].y && q[g].y.length && "number" === typeof q[g].y[0] && "number" === typeof q[g].y[1]) {
              l = a.axisX.convertValueToPixel(u);
              s = a.axisY.convertValueToPixel(q[g].y[0]);
              v = a.axisY.convertValueToPixel(q[g].y[1]);
              p || T ? (r.connectNullData && !p ? (b.setLineDash && (r.options.nullDataLineDashType || B === r.lineDashType && r.lineDashType !== r.nullDataLineDashType) && (k[k.length - 1].newLineDashArray = E, B = r.nullDataLineDashType, b.setLineDash(w)), b.lineTo(l, s), t && e.lineTo(l, s), k.push({
                x: l,
                y: v
              })) : (b.beginPath(), b.moveTo(l, s), x = {
                x: l,
                y: s
              }, k = [], k.push({
                x: l,
                y: v
              }), t && (e.beginPath(), e.moveTo(l, s))), T = p = !1) : (b.lineTo(l, s), k.push({
                x: l,
                y: v
              }), t && e.lineTo(l, s), 0 == g % 250 && d());
              u = r.dataPointIds[g];
              this._eventManager.objectMap[u] = {
                id: u,
                objectType: "dataPoint",
                dataSeriesIndex: h,
                dataPointIndex: g,
                x1: l,
                y1: s,
                y2: v
              };
              g < q.length - 1 && (y !== (q[g].lineColor || D) || B !== (q[g].lineDashType || r.lineDashType)) && (d(), y = q[g].lineColor || D, k[k.length - 1].newStrokeStyle = y, b.strokeStyle = y, b.setLineDash && (q[g].lineDashType ? (B = q[g].lineDashType, k[k.length - 1].newLineDashArray = N(B, r.lineThickness), b.setLineDash(k[k.length - 1].newLineDashArray)) : (B = r.lineDashType, k[k.length - 1].newLineDashArray = E, b.setLineDash(E))));
              if (0 !== q[g].markerSize && (0 < q[g].markerSize || 0 < r.markerSize)) {
                var S = r.getMarkerProperties(g, l, v, b);
                f.push(S);
                var F = Q(u);
                t && f.push({
                  x: l,
                  y: v,
                  ctx: e,
                  type: S.type,
                  size: S.size,
                  color: F,
                  borderColor: F,
                  borderThickness: S.borderThickness
                });
                S = r.getMarkerProperties(g, l, s, b);
                f.push(S);
                F = Q(u);
                t && f.push({
                  x: l,
                  y: s,
                  ctx: e,
                  type: S.type,
                  size: S.size,
                  color: F,
                  borderColor: F,
                  borderThickness: S.borderThickness
                });
              }
              if (q[g].indexLabel || r.indexLabel || q[g].indexLabelFormatter || r.indexLabelFormatter) this._indexLabels.push({
                chartType: "rangeArea",
                dataPoint: q[g],
                dataSeries: r,
                indexKeyword: 0,
                point: {
                  x: l,
                  y: s
                },
                direction: q[g].y[0] > q[g].y[1] === a.axisY.reversed ? -1 : 1,
                color: z
              }), this._indexLabels.push({
                chartType: "rangeArea",
                dataPoint: q[g],
                dataSeries: r,
                indexKeyword: 1,
                point: {
                  x: l,
                  y: v
                },
                direction: q[g].y[0] > q[g].y[1] === a.axisY.reversed ? 1 : -1,
                color: z
              });
            } else T || p || d(), T = !0;
            d();
            W.drawMarkers(f);
          }
        }
        t && (c.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(n.x1, n.y1, n.width, n.height), this._eventManager.ghostCtx.restore());
        b.restore();
        return {
          source: c,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderRangeSplineArea = function (a) {
      function d(a, c) {
        var d = v(s, 2);
        if (0 < d.length) {
          if (0 < h.lineThickness) {
            b.strokeStyle = c;
            b.setLineDash && b.setLineDash(a);
            b.beginPath();
            b.moveTo(d[0].x, d[0].y);
            for (var f = 0; f < d.length - 3; f += 3) {
              if (d[f].newStrokeStyle || d[f].newLineDashArray) b.stroke(), b.beginPath(), b.moveTo(d[f].x, d[f].y), d[f].newStrokeStyle && (b.strokeStyle = d[f].newStrokeStyle), d[f].newLineDashArray && b.setLineDash(d[f].newLineDashArray);
              b.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y);
            }
            b.stroke();
          }
          b.beginPath();
          b.moveTo(d[0].x, d[0].y);
          t && (e.beginPath(), e.moveTo(d[0].x, d[0].y));
          for (f = 0; f < d.length - 3; f += 3) b.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y), t && e.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y);
          d = v(da, 2);
          b.lineTo(da[da.length - 1].x, da[da.length - 1].y);
          for (f = d.length - 1; 2 < f; f -= 3) b.bezierCurveTo(d[f - 1].x, d[f - 1].y, d[f - 2].x, d[f - 2].y, d[f - 3].x, d[f - 3].y), t && e.bezierCurveTo(d[f - 1].x, d[f - 1].y, d[f - 2].x, d[f - 2].y, d[f - 3].x, d[f - 3].y);
          b.closePath();
          b.globalAlpha = h.fillOpacity;
          b.fill();
          t && (e.closePath(), e.fill());
          b.globalAlpha = 1;
          if (0 < h.lineThickness) {
            b.strokeStyle = c;
            b.setLineDash && b.setLineDash(a);
            b.beginPath();
            b.moveTo(d[0].x, d[0].y);
            for (var g = f = 0; f < d.length - 3; f += 3, g++) {
              if (s[g].newStrokeStyle || s[g].newLineDashArray) b.stroke(), b.beginPath(), b.moveTo(d[f].x, d[f].y), s[g].newStrokeStyle && (b.strokeStyle = s[g].newStrokeStyle), s[g].newLineDashArray && b.setLineDash(s[g].newLineDashArray);
              b.bezierCurveTo(d[f + 1].x, d[f + 1].y, d[f + 2].x, d[f + 2].y, d[f + 3].x, d[f + 3].y);
            }
            b.stroke();
          }
          b.beginPath();
        }
      }
      var c = a.targetCanvasCtx || this.plotArea.ctx,
        b = t ? this._preRenderCtx : c;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var e = this._eventManager.ghostCtx,
          f = [],
          n = this.plotArea;
        b.save();
        t && e.save();
        b.beginPath();
        b.rect(n.x1, n.y1, n.width, n.height);
        b.clip();
        t && (e.beginPath(), e.rect(n.x1, n.y1, n.width, n.height), e.clip());
        for (var m = 0; m < a.dataSeriesIndexes.length; m++) {
          var k = a.dataSeriesIndexes[m],
            h = this.data[k],
            r = h.dataPoints,
            f = h.id;
          this._eventManager.objectMap[f] = {
            objectType: "dataSeries",
            dataSeriesIndex: k
          };
          f = Q(f);
          e.fillStyle = f;
          var f = [],
            q = 0,
            p,
            g,
            l,
            s = [],
            da = [];
          if (0 < r.length) {
            var u = h._colorSet[q % h._colorSet.length],
              x = h.lineColor = h.options.lineColor || u,
              z = x;
            b.fillStyle = u;
            b.lineWidth = h.lineThickness;
            var D = "solid",
              y;
            if (b.setLineDash) {
              var B = N(h.nullDataLineDashType, h.lineThickness),
                D = h.lineDashType;
              y = N(D, h.lineThickness);
            }
            for (g = !1; q < r.length; q++) if (p = r[q].x.getTime ? r[q].x.getTime() : r[q].x, !(p < a.axisX.dataInfo.viewPortMin || p > a.axisX.dataInfo.viewPortMax && (!h.connectNullData || !g))) if (null !== r[q].y && r[q].y.length && "number" === typeof r[q].y[0] && "number" === typeof r[q].y[1]) {
              p = a.axisX.convertValueToPixel(p);
              g = a.axisY.convertValueToPixel(r[q].y[0]);
              l = a.axisY.convertValueToPixel(r[q].y[1]);
              var w = h.dataPointIds[q];
              this._eventManager.objectMap[w] = {
                id: w,
                objectType: "dataPoint",
                dataSeriesIndex: k,
                dataPointIndex: q,
                x1: p,
                y1: g,
                y2: l
              };
              s[s.length] = {
                x: p,
                y: g
              };
              da[da.length] = {
                x: p,
                y: l
              };
              q < r.length - 1 && (z !== (r[q].lineColor || x) || D !== (r[q].lineDashType || h.lineDashType)) && (z = r[q].lineColor || x, s[s.length - 1].newStrokeStyle = z, b.setLineDash && (r[q].lineDashType ? (D = r[q].lineDashType, s[s.length - 1].newLineDashArray = N(D, h.lineThickness)) : (D = h.lineDashType, s[s.length - 1].newLineDashArray = y)));
              if (0 !== r[q].markerSize && (0 < r[q].markerSize || 0 < h.markerSize)) {
                var E = h.getMarkerProperties(q, p, g, b);
                f.push(E);
                var T = Q(w);
                t && f.push({
                  x: p,
                  y: g,
                  ctx: e,
                  type: E.type,
                  size: E.size,
                  color: T,
                  borderColor: T,
                  borderThickness: E.borderThickness
                });
                E = h.getMarkerProperties(q, p, l, b);
                f.push(E);
                T = Q(w);
                t && f.push({
                  x: p,
                  y: l,
                  ctx: e,
                  type: E.type,
                  size: E.size,
                  color: T,
                  borderColor: T,
                  borderThickness: E.borderThickness
                });
              }
              if (r[q].indexLabel || h.indexLabel || r[q].indexLabelFormatter || h.indexLabelFormatter) this._indexLabels.push({
                chartType: "rangeSplineArea",
                dataPoint: r[q],
                dataSeries: h,
                indexKeyword: 0,
                point: {
                  x: p,
                  y: g
                },
                direction: r[q].y[0] <= r[q].y[1] ? -1 : 1,
                color: u
              }), this._indexLabels.push({
                chartType: "rangeSplineArea",
                dataPoint: r[q],
                dataSeries: h,
                indexKeyword: 1,
                point: {
                  x: p,
                  y: l
                },
                direction: r[q].y[0] <= r[q].y[1] ? 1 : -1,
                color: u
              });
              g = !1;
            } else 0 < q && !g && (h.connectNullData ? b.setLineDash && 0 < s.length && (h.options.nullDataLineDashType || !r[q - 1].lineDashType) && (s[s.length - 1].newLineDashArray = B, D = h.nullDataLineDashType) : (d(y, x), s = [], da = [])), g = !0;
            d(y, x);
            W.drawMarkers(f);
          }
        }
        t && (c.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && b.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && b.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), b.clearRect(n.x1, n.y1, n.width, n.height), this._eventManager.ghostCtx.restore());
        b.restore();
        return {
          source: c,
          dest: this.plotArea.ctx,
          animationCallback: L.xClipAnimation,
          easingFunction: L.easing.linear,
          animationBase: 0
        };
      }
    };
    l.prototype.renderWaterfall = function (a) {
      var d = a.targetCanvasCtx || this.plotArea.ctx,
        c = t ? this._preRenderCtx : d;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var b = this._eventManager.ghostCtx,
          e = null,
          f = this.plotArea,
          n = 0,
          m,
          k,
          h,
          r,
          q = a.axisY.convertValueToPixel(a.axisY.logarithmic ? a.axisY.viewportMinimum : 0),
          n = this.options.dataPointMinWidth ? this.dataPointMinWidth : this.options.dataPointWidth ? this.dataPointWidth : 1;
        k = this.options.dataPointMaxWidth ? this.dataPointMaxWidth : this.options.dataPointWidth ? this.dataPointWidth : Math.min(0.15 * this.width, 0.9 * (this.plotArea.width / a.plotType.totalDataSeries)) << 0;
        var p = a.axisX.dataInfo.minDiff;
        isFinite(p) || (p = 0.3 * Math.abs(a.axisX.range));
        p = this.options.dataPointWidth ? this.dataPointWidth : 0.6 * (f.width * (a.axisX.logarithmic ? Math.log(p) / Math.log(a.axisX.range) : Math.abs(p) / Math.abs(a.axisX.range)) / a.plotType.totalDataSeries) << 0;
        this.dataPointMaxWidth && n > k && (n = Math.min(this.options.dataPointWidth ? this.dataPointWidth : Infinity, k));
        !this.dataPointMaxWidth && this.dataPointMinWidth && k < n && (k = Math.max(this.options.dataPointWidth ? this.dataPointWidth : -Infinity, n));
        p < n && (p = n);
        p > k && (p = k);
        c.save();
        t && this._eventManager.ghostCtx.save();
        c.beginPath();
        c.rect(f.x1, f.y1, f.width, f.height);
        c.clip();
        t && (this._eventManager.ghostCtx.beginPath(), this._eventManager.ghostCtx.rect(f.x1, f.y1, f.width, f.height), this._eventManager.ghostCtx.clip());
        for (var g = 0; g < a.dataSeriesIndexes.length; g++) {
          var l = a.dataSeriesIndexes[g],
            s = this.data[l],
            v = s.dataPoints,
            e = s._colorSet[0];
          s.risingColor = s.options.risingColor ? s.options.risingColor : e;
          s.fallingColor = s.options.fallingColor ? s.options.fallingColor : "#e40a0a";
          var u = "number" === typeof s.options.lineThickness ? Math.round(s.lineThickness) : 1,
            x = 1 === Math.round(u) % 2 ? -0.5 : 0;
          if (0 < v.length) for (var z = 5 < p && s.bevelEnabled ? !0 : !1, D = !1, y = null, B = null, n = 0; n < v.length; n++) if (v[n].getTime ? r = v[n].x.getTime() : r = v[n].x, "number" !== typeof v[n].y) {
            if (0 < n && !D && s.connectNullData) var w = s.options.nullDataLineDashType || !v[n - 1].lineDashType ? s.nullDataLineDashType : v[n - 1].lineDashType;
            D = !0;
          } else {
            m = a.axisX.convertValueToPixel(r);
            k = 0 === s.dataPointEOs[n].cumulativeSum ? q : a.axisY.convertValueToPixel(s.dataPointEOs[n].cumulativeSum);
            h = 0 === s.dataPointEOs[n].cumulativeSumYStartValue ? q : a.axisY.convertValueToPixel(s.dataPointEOs[n].cumulativeSumYStartValue);
            m = a.axisX.reversed ? m + a.plotType.totalDataSeries * p / 2 - (a.previousDataSeriesCount + g) * p << 0 : m - a.plotType.totalDataSeries * p / 2 + (a.previousDataSeriesCount + g) * p << 0;
            var E = a.axisX.reversed ? m - p << 0 : m + p << 0;
            k > h && (e = k, k = h, h = e);
            a.axisY.reversed && (e = k, k = h, h = e);
            e = s.dataPointIds[n];
            this._eventManager.objectMap[e] = {
              id: e,
              objectType: "dataPoint",
              dataSeriesIndex: l,
              dataPointIndex: n,
              x1: m,
              y1: k,
              x2: E,
              y2: h
            };
            var T = v[n].color ? v[n].color : 0 < v[n].y ? s.risingColor : s.fallingColor;
            ba(c, m, k, E, h, T, 0, T, z, z, !1, !1, s.fillOpacity);
            e = Q(e);
            t && ba(this._eventManager.ghostCtx, m, k, E, h, e, 0, null, !1, !1, !1, !1);
            var S,
              T = m;
            S = "undefined" !== typeof v[n].isIntermediateSum && !0 === v[n].isIntermediateSum || "undefined" !== typeof v[n].isCumulativeSum && !0 === v[n].isCumulativeSum ? 0 < v[n].y ? k : h : 0 < v[n].y ? h : k;
            0 < n && y && (!D || s.connectNullData) && (D && c.setLineDash && c.setLineDash(N(w, u)), c.beginPath(), c.moveTo(y, B - x), c.lineTo(T, S - x), 0 < u && c.stroke(), t && (b.beginPath(), b.moveTo(y, B - x), b.lineTo(T, S - x), 0 < u && b.stroke()));
            D = !1;
            y = E;
            B = 0 < v[n].y ? k : h;
            T = v[n].lineDashType ? v[n].lineDashType : s.options.lineDashType ? s.options.lineDashType : "shortDash";
            c.strokeStyle = v[n].lineColor ? v[n].lineColor : s.options.lineColor ? s.options.lineColor : "#9e9e9e";
            c.lineWidth = u;
            c.setLineDash && (T = N(T, u), c.setLineDash(T));
            (v[n].indexLabel || s.indexLabel || v[n].indexLabelFormatter || s.indexLabelFormatter) && this._indexLabels.push({
              chartType: "waterfall",
              dataPoint: v[n],
              dataSeries: s,
              point: {
                x: m + (E - m) / 2,
                y: 0 <= v[n].y ? k : h
              },
              direction: 0 > v[n].y === a.axisY.reversed ? 1 : -1,
              bounds: {
                x1: m,
                y1: Math.min(k, h),
                x2: E,
                y2: Math.max(k, h)
              },
              color: e
            });
          }
        }
        t && (d.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.globalCompositeOperation = "source-atop", a.axisX.maskCanvas && c.drawImage(a.axisX.maskCanvas, 0, 0, this.width, this.height), a.axisY.maskCanvas && c.drawImage(a.axisY.maskCanvas, 0, 0, this.width, this.height), this._breaksCanvasCtx && this._breaksCanvasCtx.drawImage(this._preRenderCanvas, 0, 0, this.width, this.height), c.clearRect(f.x1, f.y1, f.width, f.height), this._eventManager.ghostCtx.restore());
        c.restore();
        return {
          source: d,
          dest: this.plotArea.ctx,
          animationCallback: L.fadeInAnimation,
          easingFunction: L.easing.easeInQuad,
          animationBase: 0
        };
      }
    };
    var Y = function Y(a, d, c, b, e, f, n, m, k) {
      if (!(0 > c)) {
        "undefined" === typeof m && (m = 1);
        if (!t) {
          var h = Number((n % (2 * Math.PI)).toFixed(8));
          Number((f % (2 * Math.PI)).toFixed(8)) === h && (n -= 1E-4);
        }
        a.save();
        a.globalAlpha = m;
        "pie" === e ? (a.beginPath(), a.moveTo(d.x, d.y), a.arc(d.x, d.y, c, f, n, !1), a.fillStyle = b, a.strokeStyle = "white", a.lineWidth = 2, a.closePath(), a.fill()) : "doughnut" === e && (a.beginPath(), a.arc(d.x, d.y, c, f, n, !1), 0 <= k && a.arc(d.x, d.y, k * c, n, f, !0), a.closePath(), a.fillStyle = b, a.strokeStyle = "white", a.lineWidth = 2, a.fill());
        a.globalAlpha = 1;
        a.restore();
      }
    };
    l.prototype.renderPie = function (a) {
      function d() {
        if (h && r) {
          for (var a = 0, b = 0, c = 0, d = 0, e = 0; e < r.length; e++) {
            var f = r[e],
              n = h.dataPointIds[e];
            g[e].id = n;
            g[e].objectType = "dataPoint";
            g[e].dataPointIndex = e;
            g[e].dataSeriesIndex = 0;
            var m = g[e],
              q = {
                percent: null,
                total: null
              },
              l = null,
              q = k.getPercentAndTotal(h, f);
            if (h.indexLabelFormatter || f.indexLabelFormatter) l = {
              chart: k.options,
              dataSeries: h,
              dataPoint: f,
              total: q.total,
              percent: q.percent
            };
            q = f.indexLabelFormatter ? f.indexLabelFormatter(l) : f.indexLabel ? k.replaceKeywordsWithValue(f.indexLabel, f, h, e) : h.indexLabelFormatter ? h.indexLabelFormatter(l) : h.indexLabel ? k.replaceKeywordsWithValue(h.indexLabel, f, h, e) : f.label ? f.label : "";
            k._eventManager.objectMap[n] = m;
            m.center = {
              x: z.x,
              y: z.y
            };
            m.y = f.y;
            m.radius = B;
            m.percentInnerRadius = E;
            m.indexLabelText = q;
            m.indexLabelPlacement = h.indexLabelPlacement;
            m.indexLabelLineColor = f.indexLabelLineColor ? f.indexLabelLineColor : h.options.indexLabelLineColor ? h.options.indexLabelLineColor : f.color ? f.color : h._colorSet[e % h._colorSet.length];
            m.indexLabelLineThickness = s(f.indexLabelLineThickness) ? h.indexLabelLineThickness : f.indexLabelLineThickness;
            m.indexLabelLineDashType = f.indexLabelLineDashType ? f.indexLabelLineDashType : h.indexLabelLineDashType;
            m.indexLabelFontColor = f.indexLabelFontColor ? f.indexLabelFontColor : h.indexLabelFontColor;
            m.indexLabelFontStyle = f.indexLabelFontStyle ? f.indexLabelFontStyle : h.indexLabelFontStyle;
            m.indexLabelFontWeight = f.indexLabelFontWeight ? f.indexLabelFontWeight : h.indexLabelFontWeight;
            m.indexLabelFontSize = s(f.indexLabelFontSize) ? h.indexLabelFontSize : f.indexLabelFontSize;
            m.indexLabelFontFamily = f.indexLabelFontFamily ? f.indexLabelFontFamily : h.indexLabelFontFamily;
            m.indexLabelBackgroundColor = f.indexLabelBackgroundColor ? f.indexLabelBackgroundColor : h.options.indexLabelBackgroundColor ? h.options.indexLabelBackgroundColor : h.indexLabelBackgroundColor;
            m.indexLabelMaxWidth = f.indexLabelMaxWidth ? f.indexLabelMaxWidth : h.indexLabelMaxWidth ? h.indexLabelMaxWidth : 0.33 * p.width;
            m.indexLabelWrap = "undefined" !== typeof f.indexLabelWrap ? f.indexLabelWrap : h.indexLabelWrap;
            m.startAngle = 0 === e ? h.startAngle ? h.startAngle / 180 * Math.PI : 0 : g[e - 1].endAngle;
            m.startAngle = (m.startAngle + 2 * Math.PI) % (2 * Math.PI);
            m.endAngle = m.startAngle + 2 * Math.PI / D * Math.abs(f.y);
            f = (m.endAngle + m.startAngle) / 2;
            f = (f + 2 * Math.PI) % (2 * Math.PI);
            m.midAngle = f;
            if (m.midAngle > Math.PI / 2 - u && m.midAngle < Math.PI / 2 + u) {
              if (0 === a || g[c].midAngle > m.midAngle) c = e;
              a++;
            } else if (m.midAngle > 3 * Math.PI / 2 - u && m.midAngle < 3 * Math.PI / 2 + u) {
              if (0 === b || g[d].midAngle > m.midAngle) d = e;
              b++;
            }
            m.hemisphere = f > Math.PI / 2 && f <= 3 * Math.PI / 2 ? "left" : "right";
            m.indexLabelTextBlock = new ja(k.plotArea.ctx, {
              fontSize: m.indexLabelFontSize,
              fontFamily: m.indexLabelFontFamily,
              fontColor: m.indexLabelFontColor,
              fontStyle: m.indexLabelFontStyle,
              fontWeight: m.indexLabelFontWeight,
              horizontalAlign: "left",
              backgroundColor: m.indexLabelBackgroundColor,
              maxWidth: m.indexLabelMaxWidth,
              maxHeight: m.indexLabelWrap ? 5 * m.indexLabelFontSize : 1.5 * m.indexLabelFontSize,
              text: m.indexLabelText,
              padding: 0,
              textBaseline: "top"
            });
            m.indexLabelTextBlock.measureText();
          }
          n = f = 0;
          q = !1;
          for (e = 0; e < r.length; e++) m = g[(c + e) % r.length], 1 < a && m.midAngle > Math.PI / 2 - u && m.midAngle < Math.PI / 2 + u && (f <= a / 2 && !q ? (m.hemisphere = "right", f++) : (m.hemisphere = "left", q = !0));
          q = !1;
          for (e = 0; e < r.length; e++) m = g[(d + e) % r.length], 1 < b && m.midAngle > 3 * Math.PI / 2 - u && m.midAngle < 3 * Math.PI / 2 + u && (n <= b / 2 && !q ? (m.hemisphere = "left", n++) : (m.hemisphere = "right", q = !0));
        }
      }
      function c(a) {
        var b = k.plotArea.ctx;
        b.clearRect(p.x1, p.y1, p.width, p.height);
        b.fillStyle = k.backgroundColor;
        b.fillRect(p.x1, p.y1, p.width, p.height);
        for (b = 0; b < r.length; b++) {
          var c = g[b].startAngle,
            d = g[b].endAngle;
          if (d > c) {
            var e = 0.07 * B * Math.cos(g[b].midAngle),
              f = 0.07 * B * Math.sin(g[b].midAngle),
              m = !1;
            if (r[b].exploded) {
              if (1E-9 < Math.abs(g[b].center.x - (z.x + e)) || 1E-9 < Math.abs(g[b].center.y - (z.y + f))) g[b].center.x = z.x + e * a, g[b].center.y = z.y + f * a, m = !0;
            } else if (0 < Math.abs(g[b].center.x - z.x) || 0 < Math.abs(g[b].center.y - z.y)) g[b].center.x = z.x + e * (1 - a), g[b].center.y = z.y + f * (1 - a), m = !0;
            m && (e = {}, e.dataSeries = h, e.dataPoint = h.dataPoints[b], e.index = b, k.toolTip.highlightObjects([e]));
            Y(k.plotArea.ctx, g[b].center, g[b].radius, r[b].color ? r[b].color : h._colorSet[b % h._colorSet.length], h.type, c, d, h.fillOpacity, g[b].percentInnerRadius);
          }
        }
        a = k.plotArea.ctx;
        a.save();
        a.fillStyle = "black";
        a.strokeStyle = "grey";
        a.textBaseline = "middle";
        a.lineJoin = "round";
        for (b = b = 0; b < r.length; b++) c = g[b], c.indexLabelText && (c.indexLabelTextBlock.y -= c.indexLabelTextBlock.height / 2, d = 0, d = "left" === c.hemisphere ? "inside" !== h.indexLabelPlacement ? -(c.indexLabelTextBlock.width + q) : -c.indexLabelTextBlock.width / 2 : "inside" !== h.indexLabelPlacement ? q : -c.indexLabelTextBlock.width / 2, c.indexLabelTextBlock.x += d, c.indexLabelTextBlock.render(!0), c.indexLabelTextBlock.x -= d, c.indexLabelTextBlock.y += c.indexLabelTextBlock.height / 2, "inside" !== c.indexLabelPlacement && 0 < c.indexLabelLineThickness && (d = c.center.x + B * Math.cos(c.midAngle), e = c.center.y + B * Math.sin(c.midAngle), a.strokeStyle = c.indexLabelLineColor, a.lineWidth = c.indexLabelLineThickness, a.setLineDash && a.setLineDash(N(c.indexLabelLineDashType, c.indexLabelLineThickness)), a.beginPath(), a.moveTo(d, e), a.lineTo(c.indexLabelTextBlock.x, c.indexLabelTextBlock.y), a.lineTo(c.indexLabelTextBlock.x + ("left" === c.hemisphere ? -q : q), c.indexLabelTextBlock.y), a.stroke()), a.lineJoin = "miter");
        a.save();
      }
      function b(a, b) {
        var c = 0,
          c = a.indexLabelTextBlock.y - a.indexLabelTextBlock.height / 2,
          d = a.indexLabelTextBlock.y + a.indexLabelTextBlock.height / 2,
          e = b.indexLabelTextBlock.y - b.indexLabelTextBlock.height / 2,
          f = b.indexLabelTextBlock.y + b.indexLabelTextBlock.height / 2;
        return c = b.indexLabelTextBlock.y > a.indexLabelTextBlock.y ? e - d : c - f;
      }
      function e(a) {
        for (var c = null, d = 1; d < r.length; d++) if (c = (a + d + g.length) % g.length, g[c].hemisphere !== g[a].hemisphere) {
          c = null;
          break;
        } else if (g[c].indexLabelText && c !== a && (0 > b(g[c], g[a]) || ("right" === g[a].hemisphere ? g[c].indexLabelTextBlock.y >= g[a].indexLabelTextBlock.y : g[c].indexLabelTextBlock.y <= g[a].indexLabelTextBlock.y))) break;else c = null;
        return c;
      }
      function f(a, c, d) {
        d = (d || 0) + 1;
        if (1E3 < d) return 0;
        c = c || 0;
        var h = 0,
          m = z.y - 1 * t,
          n = z.y + 1 * t;
        if (0 <= a && a < r.length) {
          var k = g[a];
          if (0 > c && k.indexLabelTextBlock.y < m || 0 < c && k.indexLabelTextBlock.y > n) return 0;
          var p = 0,
            q = 0,
            q = p = p = 0;
          0 > c ? k.indexLabelTextBlock.y - k.indexLabelTextBlock.height / 2 > m && k.indexLabelTextBlock.y - k.indexLabelTextBlock.height / 2 + c < m && (c = -(m - (k.indexLabelTextBlock.y - k.indexLabelTextBlock.height / 2 + c))) : k.indexLabelTextBlock.y + k.indexLabelTextBlock.height / 2 < m && k.indexLabelTextBlock.y + k.indexLabelTextBlock.height / 2 + c > n && (c = k.indexLabelTextBlock.y + k.indexLabelTextBlock.height / 2 + c - n);
          c = k.indexLabelTextBlock.y + c;
          m = 0;
          m = "right" === k.hemisphere ? z.x + Math.sqrt(Math.pow(t, 2) - Math.pow(c - z.y, 2)) : z.x - Math.sqrt(Math.pow(t, 2) - Math.pow(c - z.y, 2));
          q = z.x + B * Math.cos(k.midAngle);
          p = z.y + B * Math.sin(k.midAngle);
          p = Math.sqrt(Math.pow(m - q, 2) + Math.pow(c - p, 2));
          q = Math.acos(B / t);
          p = Math.acos((t * t + B * B - p * p) / (2 * B * t));
          c = p < q ? c - k.indexLabelTextBlock.y : 0;
          m = null;
          for (n = 1; n < r.length; n++) if (m = (a - n + g.length) % g.length, g[m].hemisphere !== g[a].hemisphere) {
            m = null;
            break;
          } else if (g[m].indexLabelText && g[m].hemisphere === g[a].hemisphere && m !== a && (0 > b(g[m], g[a]) || ("right" === g[a].hemisphere ? g[m].indexLabelTextBlock.y <= g[a].indexLabelTextBlock.y : g[m].indexLabelTextBlock.y >= g[a].indexLabelTextBlock.y))) break;else m = null;
          q = m;
          p = e(a);
          n = m = 0;
          0 > c ? (n = "right" === k.hemisphere ? q : p, h = c, null !== n && (q = -c, c = k.indexLabelTextBlock.y - k.indexLabelTextBlock.height / 2 - (g[n].indexLabelTextBlock.y + g[n].indexLabelTextBlock.height / 2), c - q < l && (m = -q, n = f(n, m, d + 1), +n.toFixed(x) > +m.toFixed(x) && (h = c > l ? -(c - l) : -(q - (n - m)))))) : 0 < c && (n = "right" === k.hemisphere ? p : q, h = c, null !== n && (q = c, c = g[n].indexLabelTextBlock.y - g[n].indexLabelTextBlock.height / 2 - (k.indexLabelTextBlock.y + k.indexLabelTextBlock.height / 2), c - q < l && (m = q, n = f(n, m, d + 1), +n.toFixed(x) < +m.toFixed(x) && (h = c > l ? c - l : q - (m - n)))));
          h && (d = k.indexLabelTextBlock.y + h, c = 0, c = "right" === k.hemisphere ? z.x + Math.sqrt(Math.pow(t, 2) - Math.pow(d - z.y, 2)) : z.x - Math.sqrt(Math.pow(t, 2) - Math.pow(d - z.y, 2)), k.midAngle > Math.PI / 2 - u && k.midAngle < Math.PI / 2 + u ? (m = (a - 1 + g.length) % g.length, m = g[m], a = g[(a + 1 + g.length) % g.length], "left" === k.hemisphere && "right" === m.hemisphere && c > m.indexLabelTextBlock.x ? c = m.indexLabelTextBlock.x - 15 : "right" === k.hemisphere && "left" === a.hemisphere && c < a.indexLabelTextBlock.x && (c = a.indexLabelTextBlock.x + 15)) : k.midAngle > 3 * Math.PI / 2 - u && k.midAngle < 3 * Math.PI / 2 + u && (m = (a - 1 + g.length) % g.length, m = g[m], a = g[(a + 1 + g.length) % g.length], "right" === k.hemisphere && "left" === m.hemisphere && c < m.indexLabelTextBlock.x ? c = m.indexLabelTextBlock.x + 15 : "left" === k.hemisphere && "right" === a.hemisphere && c > a.indexLabelTextBlock.x && (c = a.indexLabelTextBlock.x - 15)), k.indexLabelTextBlock.y = d, k.indexLabelTextBlock.x = c, k.indexLabelAngle = Math.atan2(k.indexLabelTextBlock.y - z.y, k.indexLabelTextBlock.x - z.x));
        }
        return h;
      }
      function n() {
        var a = k.plotArea.ctx;
        a.fillStyle = "grey";
        a.strokeStyle = "grey";
        a.font = "16px Arial";
        a.textBaseline = "middle";
        for (var c = a = 0, d = 0, m = !0, c = 0; 10 > c && (1 > c || 0 < d); c++) {
          if (h.radius || !h.radius && "undefined" !== typeof h.innerRadius && null !== h.innerRadius && B - d <= w) m = !1;
          m && (B -= d);
          d = 0;
          if ("inside" !== h.indexLabelPlacement) {
            t = B * v;
            for (a = 0; a < r.length; a++) {
              var n = g[a];
              n.indexLabelTextBlock.x = z.x + t * Math.cos(n.midAngle);
              n.indexLabelTextBlock.y = z.y + t * Math.sin(n.midAngle);
              n.indexLabelAngle = n.midAngle;
              n.radius = B;
              n.percentInnerRadius = E;
            }
            for (var u, s, a = 0; a < r.length; a++) {
              var n = g[a],
                y = e(a);
              if (null !== y) {
                u = g[a];
                s = g[y];
                var D = 0,
                  D = b(u, s) - l;
                if (0 > D) {
                  for (var F = s = 0, J = 0; J < r.length; J++) J !== a && g[J].hemisphere === n.hemisphere && (g[J].indexLabelTextBlock.y < n.indexLabelTextBlock.y ? s++ : F++);
                  s = D / (s + F || 1) * F;
                  var F = -1 * (D - s),
                    I = J = 0;
                  "right" === n.hemisphere ? (J = f(a, s), F = -1 * (D - J), I = f(y, F), +I.toFixed(x) < +F.toFixed(x) && +J.toFixed(x) <= +s.toFixed(x) && f(a, -(F - I))) : (J = f(y, s), F = -1 * (D - J), I = f(a, F), +I.toFixed(x) < +F.toFixed(x) && +J.toFixed(x) <= +s.toFixed(x) && f(y, -(F - I)));
                }
              }
            }
          } else for (a = 0; a < r.length; a++) n = g[a], t = "pie" === h.type ? 0.7 * B : 0.8 * B, y = z.x + t * Math.cos(n.midAngle), s = z.y + t * Math.sin(n.midAngle), n.indexLabelTextBlock.x = y, n.indexLabelTextBlock.y = s;
          for (a = 0; a < r.length; a++) if (n = g[a], y = n.indexLabelTextBlock.measureText(), 0 !== y.height && 0 !== y.width) y = y = 0, "right" === n.hemisphere ? (y = p.x2 - (n.indexLabelTextBlock.x + n.indexLabelTextBlock.width + q), y *= -1) : y = p.x1 - (n.indexLabelTextBlock.x - n.indexLabelTextBlock.width - q), 0 < y && (!m && n.indexLabelText && (s = "right" === n.hemisphere ? p.x2 - n.indexLabelTextBlock.x : n.indexLabelTextBlock.x - p.x1, 0.3 * n.indexLabelTextBlock.maxWidth > s ? n.indexLabelText = "" : n.indexLabelTextBlock.maxWidth = 0.85 * s, 0.3 * n.indexLabelTextBlock.maxWidth < s && (n.indexLabelTextBlock.x -= "right" === n.hemisphere ? 2 : -2)), Math.abs(n.indexLabelTextBlock.y - n.indexLabelTextBlock.height / 2 - z.y) < B || Math.abs(n.indexLabelTextBlock.y + n.indexLabelTextBlock.height / 2 - z.y) < B) && (y /= Math.abs(Math.cos(n.indexLabelAngle)), 9 < y && (y *= 0.3), y > d && (d = y)), y = y = 0, 0 < n.indexLabelAngle && n.indexLabelAngle < Math.PI ? (y = p.y2 - (n.indexLabelTextBlock.y + n.indexLabelTextBlock.height / 2 + 5), y *= -1) : y = p.y1 - (n.indexLabelTextBlock.y - n.indexLabelTextBlock.height / 2 - 5), 0 < y && (!m && n.indexLabelText && (s = 0 < n.indexLabelAngle && n.indexLabelAngle < Math.PI ? -1 : 1, 0 === f(a, y * s) && f(a, 2 * s)), Math.abs(n.indexLabelTextBlock.x - z.x) < B && (y /= Math.abs(Math.sin(n.indexLabelAngle)), 9 < y && (y *= 0.3), y > d && (d = y)));
          var K = function K(a, b, c) {
            for (var d = [], e = 0; d.push(g[b]), b !== c; b = (b + 1 + r.length) % r.length);
            d.sort(function (a, b) {
              return a.y - b.y;
            });
            for (b = 0; b < d.length; b++) if (c = d[b], e < 0.7 * a) e += c.indexLabelTextBlock.height, c.indexLabelTextBlock.text = "", c.indexLabelText = "", c.indexLabelTextBlock.measureText();else break;
          };
          (function () {
            for (var a = -1, c = -1, d = 0, f = !1, h = 0; h < r.length; h++) if (f = !1, u = g[h], u.indexLabelText) {
              var n = e(h);
              if (null !== n) {
                var m = g[n];
                D = 0;
                D = b(u, m);
                var k;
                if (k = 0 > D) {
                  k = u.indexLabelTextBlock.x;
                  var p = u.indexLabelTextBlock.y - u.indexLabelTextBlock.height / 2,
                    l = u.indexLabelTextBlock.y + u.indexLabelTextBlock.height / 2,
                    s = m.indexLabelTextBlock.y - m.indexLabelTextBlock.height / 2,
                    A = m.indexLabelTextBlock.x + m.indexLabelTextBlock.width,
                    C = m.indexLabelTextBlock.y + m.indexLabelTextBlock.height / 2;
                  k = u.indexLabelTextBlock.x + u.indexLabelTextBlock.width < m.indexLabelTextBlock.x - q || k > A + q || p > C + q || l < s - q ? !1 : !0;
                }
                k ? (0 > a && (a = h), n !== a && (c = n, d += -D), 0 === h % Math.max(r.length / 10, 3) && (f = !0)) : f = !0;
                f && 0 < d && 0 <= a && 0 <= c && (K(d, a, c), c = a = -1, d = 0);
              }
            }
            0 < d && K(d, a, c);
          })();
        }
      }
      function m() {
        k.plotArea.layoutManager.reset();
        k.title && (k.title.dockInsidePlotArea || "center" === k.title.horizontalAlign && "center" === k.title.verticalAlign) && k.title.render();
        if (k.subtitles) for (var a = 0; a < k.subtitles.length; a++) {
          var b = k.subtitles[a];
          (b.dockInsidePlotArea || "center" === b.horizontalAlign && "center" === b.verticalAlign) && b.render();
        }
        k.legend && (k.legend.dockInsidePlotArea || "center" === k.legend.horizontalAlign && "center" === k.legend.verticalAlign) && (k.legend.setLayout(), k.legend.render());
      }
      var k = this;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        var h = this.data[a.dataSeriesIndexes[0]],
          r = h.dataPoints,
          q = 10,
          p = this.plotArea,
          g = h.dataPointEOs,
          l = 2,
          t,
          v = 1.3,
          u = 20 / 180 * Math.PI,
          x = 6,
          z = {
            x: (p.x2 + p.x1) / 2,
            y: (p.y2 + p.y1) / 2
          },
          D = 0;
        a = !1;
        for (var y = 0; y < r.length; y++) D += Math.abs(r[y].y), !a && "undefined" !== typeof r[y].indexLabel && null !== r[y].indexLabel && 0 < r[y].indexLabel.toString().length && (a = !0), !a && "undefined" !== typeof r[y].label && null !== r[y].label && 0 < r[y].label.toString().length && (a = !0);
        if (0 !== D) {
          a = a || "undefined" !== typeof h.indexLabel && null !== h.indexLabel && 0 < h.indexLabel.toString().length;
          var B = "inside" !== h.indexLabelPlacement && a ? 0.75 * Math.min(p.width, p.height) / 2 : 0.92 * Math.min(p.width, p.height) / 2;
          h.radius && (B = Sa(h.radius, B));
          var w = "undefined" !== typeof h.innerRadius && null !== h.innerRadius ? Sa(h.innerRadius, B) : 0.7 * B;
          h.radius = B;
          "doughnut" === h.type && (h.innerRadius = w);
          var E = Math.min(w / B, (B - 1) / B);
          this.pieDoughnutClickHandler = function (a) {
            k.isAnimating || !s(a.dataSeries.explodeOnClick) && !a.dataSeries.explodeOnClick || (a = a.dataPoint, a.exploded = a.exploded ? !1 : !0, 1 < this.dataPoints.length && k._animator.animate(0, 500, function (a) {
              c(a);
              m();
            }));
          };
          d();
          n();
          n();
          n();
          n();
          this.disableToolTip = !0;
          this._animator.animate(0, this.animatedRender ? this.animationDuration : 0, function (a) {
            var b = k.plotArea.ctx;
            b.clearRect(p.x1, p.y1, p.width, p.height);
            b.fillStyle = k.backgroundColor;
            b.fillRect(p.x1, p.y1, p.width, p.height);
            a = g[0].startAngle + 2 * Math.PI * a;
            for (b = 0; b < r.length; b++) {
              var c = 0 === b ? g[b].startAngle : d,
                d = c + (g[b].endAngle - g[b].startAngle),
                e = !1;
              d > a && (d = a, e = !0);
              var f = r[b].color ? r[b].color : h._colorSet[b % h._colorSet.length];
              d > c && Y(k.plotArea.ctx, g[b].center, g[b].radius, f, h.type, c, d, h.fillOpacity, g[b].percentInnerRadius);
              if (e) break;
            }
            m();
          }, function () {
            k.disableToolTip = !1;
            k._animator.animate(0, k.animatedRender ? 500 : 0, function (a) {
              c(a);
              m();
            });
          });
        }
      }
    };
    var qa = function qa(a, d, c, b) {
      "undefined" === typeof c && (c = 1);
      0 >= Math.round(d.y4 - d.y1) || (a.save(), a.globalAlpha = c, a.beginPath(), a.moveTo(Math.round(d.x1), Math.round(d.y1)), a.lineTo(Math.round(d.x2), Math.round(d.y2)), a.lineTo(Math.round(d.x3), Math.round(d.y3)), a.lineTo(Math.round(d.x4), Math.round(d.y4)), "undefined" !== d.x5 && (a.lineTo(Math.round(d.x5), Math.round(d.y5)), a.lineTo(Math.round(d.x6), Math.round(d.y6))), a.closePath(), a.fillStyle = b ? b : d.color, a.fill(), a.globalAplha = 1, a.restore());
    };
    l.prototype.renderFunnel = function (a) {
      function d() {
        for (var a = 0, b = [], c = 0; c < x.length; c++) {
          if ("undefined" === typeof x[c].y) return -1;
          x[c].y = "number" === typeof x[c].y ? x[c].y : 0;
          a += Math.abs(x[c].y);
        }
        if (0 === a) return -1;
        for (c = b[0] = 0; c < x.length; c++) b.push(Math.abs(x[c].y) * E / a);
        return b;
      }
      function c() {
        var a = X,
          b = $,
          c = K,
          d = W,
          e,
          f;
        e = Z;
        f = R - P;
        d = Math.abs((f - e) * (b - a + (d - c)) / 2);
        c = W - K;
        e = f - e;
        f = c * (f - R);
        f = Math.abs(f);
        f = d + f;
        for (var d = [], g = 0, h = 0; h < x.length; h++) {
          if ("undefined" === typeof x[h].y) return -1;
          x[h].y = "number" === typeof x[h].y ? x[h].y : 0;
          g += Math.abs(x[h].y);
        }
        if (0 === g) return -1;
        for (var n = d[0] = 0, m = 0, k, r, b = b - a, n = !1, h = 0; h < x.length; h++) a = Math.abs(x[h].y) * f / g, n ? k = 0 == Number(c.toFixed(3)) ? 0 : a / c : (r = aa * aa * b * b - 4 * Math.abs(aa) * a, 0 > r ? (r = c, n = (b + r) * (e - m) / 2, a -= n, k = e - m, m += e - m, k += 0 == r ? 0 : a / r, m += a / r, n = !0) : (k = (Math.abs(aa) * b - Math.sqrt(r)) / 2, r = b - 2 * k / Math.abs(aa), m += k, m > e && (m -= k, r = c, n = (b + r) * (e - m) / 2, a -= n, k = e - m, m += e - m, k += a / r, m += a / r, n = !0), b = r)), d.push(k);
        return d;
      }
      function b() {
        if (u && x) {
          for (var a, b, c, d, e, f, h, m, n, k, r, p, q, l, A = [], C = [], v = {
              percent: null,
              total: null
            }, z = null, y = 0; y < x.length; y++) l = O[y], l = "undefined" !== typeof l.x5 ? (l.y2 + l.y4) / 2 : (l.y2 + l.y3) / 2, l = g(l).x2 + 1, A[y] = M - l - V;
          l = 0.5 * V;
          for (var y = 0, B = x.length - 1; y < x.length || 0 <= B; y++, B--) {
            b = u.reversed ? x[B] : x[y];
            a = b.color ? b.color : u.reversed ? u._colorSet[(x.length - 1 - y) % u._colorSet.length] : u._colorSet[y % u._colorSet.length];
            c = b.indexLabelPlacement || u.indexLabelPlacement || "outside";
            d = b.indexLabelBackgroundColor || u.indexLabelBackgroundColor || (t ? "transparent" : null);
            e = b.indexLabelFontColor || u.indexLabelFontColor || "#979797";
            f = s(b.indexLabelFontSize) ? u.indexLabelFontSize : b.indexLabelFontSize;
            h = b.indexLabelFontStyle || u.indexLabelFontStyle || "normal";
            m = b.indexLabelFontFamily || u.indexLabelFontFamily || "arial";
            n = b.indexLabelFontWeight || u.indexLabelFontWeight || "normal";
            a = b.indexLabelLineColor || u.options.indexLabelLineColor || a;
            k = "number" === typeof b.indexLabelLineThickness ? b.indexLabelLineThickness : "number" === typeof u.indexLabelLineThickness ? u.indexLabelLineThickness : 2;
            r = b.indexLabelLineDashType || u.indexLabelLineDashType || "solid";
            p = "undefined" !== typeof b.indexLabelWrap ? b.indexLabelWrap : "undefined" !== typeof u.indexLabelWrap ? u.indexLabelWrap : !0;
            q = u.dataPointIds[y];
            w._eventManager.objectMap[q] = {
              id: q,
              objectType: "dataPoint",
              dataPointIndex: y,
              dataSeriesIndex: 0,
              funnelSection: O[u.reversed ? x.length - 1 - y : y]
            };
            "inside" === u.indexLabelPlacement && (A[y] = y !== ba ? u.reversed ? O[y].x2 - O[y].x1 : O[y].x3 - O[y].x4 : O[y].x3 - O[y].x6, 20 > A[y] && (A[y] = y !== ba ? u.reversed ? O[y].x3 - O[y].x4 : O[y].x2 - O[y].x1 : O[y].x2 - O[y].x1, A[y] /= 2));
            q = b.indexLabelMaxWidth ? b.indexLabelMaxWidth : u.options.indexLabelMaxWidth ? u.indexLabelMaxWidth : A[y];
            if (q > A[y] || 0 > q) q = A[y];
            C[y] = "inside" === u.indexLabelPlacement ? O[y].height : !1;
            v = w.getPercentAndTotal(u, b);
            if (u.indexLabelFormatter || b.indexLabelFormatter) z = {
              chart: w.options,
              dataSeries: u,
              dataPoint: b,
              total: v.total,
              percent: v.percent
            };
            b = b.indexLabelFormatter ? b.indexLabelFormatter(z) : b.indexLabel ? w.replaceKeywordsWithValue(b.indexLabel, b, u, y) : u.indexLabelFormatter ? u.indexLabelFormatter(z) : u.indexLabel ? w.replaceKeywordsWithValue(u.indexLabel, b, u, y) : b.label ? b.label : "";
            0 >= k && (k = 0);
            1E3 > q && 1E3 - q < l && (q += 1E3 - q);
            Q.roundRect || Ca(Q);
            c = new ja(Q, {
              fontSize: f,
              fontFamily: m,
              fontColor: e,
              fontStyle: h,
              fontWeight: n,
              horizontalAlign: c,
              backgroundColor: d,
              maxWidth: q,
              maxHeight: !1 === C[y] ? p ? 4.28571429 * f : 1.5 * f : C[y],
              text: b,
              padding: ca
            });
            c.measureText();
            H.push({
              textBlock: c,
              id: u.reversed ? B : y,
              isDirty: !1,
              lineColor: a,
              lineThickness: k,
              lineDashType: r,
              height: c.height < c.maxHeight ? c.height : c.maxHeight,
              width: c.width < c.maxWidth ? c.width : c.maxWidth
            });
          }
        }
      }
      function e() {
        var a,
          b,
          c,
          d,
          e,
          f = [];
        e = !1;
        c = 0;
        for (var g, h = M - $ - V / 2, h = u.options.indexLabelMaxWidth ? u.indexLabelMaxWidth > h ? h : u.indexLabelMaxWidth : h, m = H.length - 1; 0 <= m; m--) {
          g = x[H[m].id];
          c = H[m];
          d = c.textBlock;
          b = (a = p(m) < O.length ? H[p(m)] : null) ? a.textBlock : null;
          c = c.height;
          a && d.y + c + ca > b.y && (e = !0);
          c = g.indexLabelMaxWidth || h;
          if (c > h || 0 > c) c = h;
          f.push(c);
        }
        if (e) for (m = H.length - 1; 0 <= m; m--) a = O[m], H[m].textBlock.maxWidth = f[f.length - (m + 1)], H[m].textBlock.measureText(), H[m].textBlock.x = M - h, c = H[m].textBlock.height < H[m].textBlock.maxHeight ? H[m].textBlock.height : H[m].textBlock.maxHeight, e = H[m].textBlock.width < H[m].textBlock.maxWidth ? H[m].textBlock.width : H[m].textBlock.maxWidth, H[m].height = c, H[m].width = e, c = "undefined" !== typeof a.x5 ? (a.y2 + a.y4) / 2 : (a.y2 + a.y3) / 2, H[m].textBlock.y = c - H[m].height / 2, u.reversed ? (H[m].textBlock.y + H[m].height > na + D && (H[m].textBlock.y = na + D - H[m].height), H[m].textBlock.y < sa - D && (H[m].textBlock.y = sa - D)) : (H[m].textBlock.y < na - D && (H[m].textBlock.y = na - D), H[m].textBlock.y + H[m].height > sa + D && (H[m].textBlock.y = sa + D - H[m].height));
      }
      function f() {
        var a, b, c, d;
        if ("inside" !== u.indexLabelPlacement) for (var e = 0; e < O.length; e++) 0 == H[e].textBlock.text.length ? H[e].isDirty = !0 : (a = O[e], c = "undefined" !== typeof a.x5 ? (a.y2 + a.y4) / 2 : (a.y2 + a.y3) / 2, b = u.reversed ? "undefined" !== typeof a.x5 ? c > xa ? g(c).x2 + 1 : (a.x2 + a.x3) / 2 + 1 : (a.x2 + a.x3) / 2 + 1 : "undefined" !== typeof a.x5 ? c < xa ? g(c).x2 + 1 : (a.x4 + a.x3) / 2 + 1 : (a.x2 + a.x3) / 2 + 1, H[e].textBlock.x = b + V, H[e].textBlock.y = c - H[e].height / 2, u.reversed ? (H[e].textBlock.y + H[e].height > na + D && (H[e].textBlock.y = na + D - H[e].height), H[e].textBlock.y < sa - D && (H[e].textBlock.y = sa - D)) : (H[e].textBlock.y < na - D && (H[e].textBlock.y = na - D), H[e].textBlock.y + H[e].height > sa + D && (H[e].textBlock.y = sa + D - H[e].height)));else for (e = 0; e < O.length; e++) 0 == H[e].textBlock.text.length ? H[e].isDirty = !0 : (a = O[e], b = a.height, c = H[e].height, d = H[e].width, b >= c ? (b = e != ba ? (a.x4 + a.x3) / 2 - d / 2 : (a.x5 + a.x4) / 2 - d / 2, c = e != ba ? (a.y1 + a.y3) / 2 - c / 2 : (a.y1 + a.y4) / 2 - c / 2, H[e].textBlock.x = b, H[e].textBlock.y = c) : H[e].isDirty = !0);
      }
      function n() {
        function a(b, c) {
          var d;
          if (0 > b || b >= H.length) return 0;
          var e,
            f = H[b].textBlock;
          if (0 > c) {
            c *= -1;
            e = q(b);
            d = m(e, b);
            if (d >= c) return f.y -= c, c;
            if (0 == b) return 0 < d && (f.y -= d), d;
            d += a(e, -(c - d));
            0 < d && (f.y -= d);
            return d;
          }
          e = p(b);
          d = m(b, e);
          if (d >= c) return f.y += c, c;
          if (b == O.length - 1) return 0 < d && (f.y += d), d;
          d += a(e, c - d);
          0 < d && (f.y += d);
          return d;
        }
        function b() {
          var a,
            d,
            e,
            f,
            g = 0,
            h;
          f = (R - Z + 2 * D) / k;
          h = k;
          for (var m, n = 1; n < h; n++) {
            e = n * f;
            for (var r = H.length - 1; 0 <= r; r--) !H[r].isDirty && H[r].textBlock.y < e && H[r].textBlock.y + H[r].height > e && (m = p(r), !(m >= H.length - 1) && H[r].textBlock.y + H[r].height + ca > H[m].textBlock.y && (H[r].textBlock.y = H[r].textBlock.y + H[r].height - e > e - H[r].textBlock.y ? e + 1 : e - H[r].height - 1));
          }
          for (m = O.length - 1; 0 < m; m--) if (!H[m].isDirty) {
            e = q(m);
            if (0 > e && (e = 0, H[e].isDirty)) break;
            if (H[m].textBlock.y < H[e].textBlock.y + H[e].height) {
              d = d || m;
              f = m;
              for (h = 0; H[f].textBlock.y < H[e].textBlock.y + H[e].height + ca;) {
                a = a || H[f].textBlock.y + H[f].height;
                h += H[f].height;
                h += ca;
                f = e;
                if (0 >= f) {
                  f = 0;
                  h += H[f].height;
                  break;
                }
                e = q(f);
                if (0 > e) {
                  f = 0;
                  h += H[f].height;
                  break;
                }
              }
              if (f != m) {
                g = H[f].textBlock.y;
                a -= g;
                a = h - a;
                g = c(a, d, f);
                break;
              }
            }
          }
          return g;
        }
        function c(a, b, d) {
          var e = [],
            f = 0,
            g = 0;
          for (a = Math.abs(a); d <= b; d++) e.push(O[d]);
          e.sort(function (a, b) {
            return a.height - b.height;
          });
          for (d = 0; d < e.length; d++) if (b = e[d], f < a) g++, f += H[b.id].height + ca, H[b.id].textBlock.text = "", H[b.id].indexLabelText = "", H[b.id].isDirty = !0, H[b.id].textBlock.measureText();else break;
          return g;
        }
        for (var d, e, f, g, h, n, k = 1, r = 0; r < 2 * k; r++) {
          for (var l = H.length - 1; 0 <= l && !(0 <= q(l) && q(l), f = H[l], g = f.textBlock, n = (h = p(l) < O.length ? H[p(l)] : null) ? h.textBlock : null, d = +f.height.toFixed(6), e = +g.y.toFixed(6), !f.isDirty && h && e + d + ca > +n.y.toFixed(6) && (d = g.y + d + ca - n.y, e = a(l, -d), e < d && (0 < e && (d -= e), e = a(p(l), d), e != d))); l--);
          b();
        }
      }
      function m(a, b) {
        return (b < O.length ? H[b].textBlock.y : u.reversed ? na + D : sa + D) - (0 > a ? u.reversed ? sa - D : na - D : H[a].textBlock.y + H[a].height + ca);
      }
      function k(a, b, c) {
        var d,
          e,
          g,
          m = [],
          n = D,
          q = [];
        -1 !== b && (0 <= Y.indexOf(b) ? (e = Y.indexOf(b), Y.splice(e, 1)) : (Y.push(b), Y = Y.sort(function (a, b) {
          return a - b;
        })));
        if (0 === Y.length) m = ha;else {
          e = D * (1 != Y.length || 0 != Y[0] && Y[0] != O.length - 1 ? 2 : 1) / h();
          for (var p = 0; p < O.length; p++) {
            if (1 == Y.length && 0 == Y[0]) {
              if (0 === p) {
                m.push(ha[p]);
                d = n;
                continue;
              }
            } else 0 === p && (d = -1 * n);
            m.push(ha[p] + d);
            if (0 <= Y.indexOf(p) || p < O.length && 0 <= Y.indexOf(p + 1)) d += e;
          }
        }
        g = function () {
          for (var a = [], b = 0; b < O.length; b++) a.push(m[b] - O[b].y1);
          return a;
        }();
        var s = {
          startTime: new Date().getTime(),
          duration: c || 500,
          easingFunction: function easingFunction(a, b, c, d) {
            return L.easing.easeOutQuart(a, b, c, d);
          },
          changeSection: function changeSection(a) {
            for (var b, c, d = 0; d < O.length; d++) b = g[d], c = O[d], b *= a, "undefined" === typeof q[d] && (q[d] = 0), 0 > q && (q *= -1), c.y1 += b - q[d], c.y2 += b - q[d], c.y3 += b - q[d], c.y4 += b - q[d], c.y5 && (c.y5 += b - q[d], c.y6 += b - q[d]), q[d] = b;
          }
        };
        a._animator.animate(0, c, function (c) {
          var d = a.plotArea.ctx || a.ctx;
          ia = !0;
          d.clearRect(z.x1, z.y1, z.x2 - z.x1, z.y2 - z.y1);
          d.fillStyle = a.backgroundColor;
          d.fillRect(z.x1, z.y1, z.width, z.height);
          s.changeSection(c, b);
          var e = {};
          e.dataSeries = u;
          e.dataPoint = u.reversed ? u.dataPoints[x.length - 1 - b] : u.dataPoints[b];
          e.index = u.reversed ? x.length - 1 - b : b;
          a.toolTip.highlightObjects([e]);
          for (e = 0; e < O.length; e++) qa(d, O[e], u.fillOpacity);
          v(d);
          I && ("inside" !== u.indexLabelPlacement ? r(d) : f(), l(d));
          1 <= c && (ia = !1);
        }, null, L.easing.easeOutQuart);
      }
      function h() {
        for (var a = 0, b = 0; b < O.length - 1; b++) (0 <= Y.indexOf(b) || 0 <= Y.indexOf(b + 1)) && a++;
        return a;
      }
      function r(a) {
        for (var b, c, d, e, f = 0; f < O.length; f++) e = 1 === H[f].lineThickness % 2 ? 0.5 : 0, c = ((O[f].y2 + O[f].y4) / 2 << 0) + e, b = g(c).x2 - 1, d = H[f].textBlock.x, e = (H[f].textBlock.y + H[f].height / 2 << 0) + e, H[f].isDirty || 0 == H[f].lineThickness || (a.strokeStyle = H[f].lineColor, a.lineWidth = H[f].lineThickness, a.setLineDash && a.setLineDash(N(H[f].lineDashType, H[f].lineThickness)), a.beginPath(), a.moveTo(b, c), a.lineTo(d, e), a.stroke());
      }
      function q(a) {
        for (a -= 1; -1 <= a && -1 != a && H[a].isDirty; a--);
        return a;
      }
      function p(a) {
        for (a += 1; a <= O.length && a != O.length && H[a].isDirty; a++);
        return a;
      }
      function g(a) {
        for (var b, c = 0; c < x.length; c++) if (O[c].y1 < a && O[c].y4 > a) {
          b = O[c];
          break;
        }
        return b ? (a = b.y6 ? a > b.y6 ? b.x3 + (b.x4 - b.x3) / (b.y4 - b.y3) * (a - b.y3) : b.x2 + (b.x3 - b.x2) / (b.y3 - b.y2) * (a - b.y2) : b.x2 + (b.x3 - b.x2) / (b.y3 - b.y2) * (a - b.y2), {
          x1: a,
          x2: a
        }) : -1;
      }
      function l(a) {
        for (var b = 0; b < O.length; b++) H[b].isDirty || (a && (H[b].textBlock.ctx = a), H[b].textBlock.render(!0));
      }
      function v(a) {
        w.plotArea.layoutManager.reset();
        a.roundRect || Ca(a);
        w.title && (w.title.dockInsidePlotArea || "center" === w.title.horizontalAlign && "center" === w.title.verticalAlign) && (w.title.ctx = a, w.title.render());
        if (w.subtitles) for (var b = 0; b < w.subtitles.length; b++) {
          var c = w.subtitles[b];
          if (c.dockInsidePlotArea || "center" === c.horizontalAlign && "center" === c.verticalAlign) w.subtitles.ctx = a, c.render();
        }
        w.legend && (w.legend.dockInsidePlotArea || "center" === w.legend.horizontalAlign && "center" === w.legend.verticalAlign) && (w.legend.ctx = a, w.legend.setLayout(), w.legend.render());
        J.fNg && J.fNg(w);
      }
      var w = this;
      if (!(0 >= a.dataSeriesIndexes.length)) {
        for (var u = this.data[a.dataSeriesIndexes[0]], x = u.dataPoints, z = this.plotArea, D = 0.025 * z.width, y = 0.01 * z.width, B = 0, E = z.height - 2 * D, F = Math.min(z.width - 2 * y, 2.8 * z.height), I = !1, S = 0; S < x.length; S++) if (!I && "undefined" !== typeof x[S].indexLabel && null !== x[S].indexLabel && 0 < x[S].indexLabel.toString().length && (I = !0), !I && "undefined" !== typeof x[S].label && null !== x[S].label && 0 < x[S].label.toString().length && (I = !0), !I && "function" === typeof u.indexLabelFormatter || "function" === typeof x[S].indexLabelFormatter) I = !0;
        I = I || "undefined" !== typeof u.indexLabel && null !== u.indexLabel && 0 < u.indexLabel.toString().length;
        "inside" !== u.indexLabelPlacement && I || (y = (z.width - 0.75 * F) / 2);
        var S = z.x1 + y,
          M = z.x2 - y,
          Z = z.y1 + D,
          R = z.y2 - D,
          Q = a.targetCanvasCtx || this.plotArea.ctx || this.ctx;
        if (0 != u.length && u.dataPoints && u.visible && 0 !== x.length) {
          var P, G;
          a = 75 * F / 100;
          var V = 30 * (M - a) / 100;
          "funnel" === u.type ? (P = s(u.options.neckHeight) ? 0.35 * E : u.neckHeight, G = s(u.options.neckWidth) ? 0.25 * a : u.neckWidth, "string" === typeof P && P.match(/%$/) ? (P = parseInt(P), P = P * E / 100) : P = parseInt(P), "string" === typeof G && G.match(/%$/) ? (G = parseInt(G), G = G * a / 100) : G = parseInt(G), P > E ? P = E : 0 >= P && (P = 0), G > a ? G = a - 0.5 : 0 >= G && (G = 0)) : "pyramid" === u.type && (G = P = 0, u.reversed = u.reversed ? !1 : !0);
          var y = S + a / 2,
            X = S,
            $ = S + a,
            na = u.reversed ? R : Z,
            K = y - G / 2,
            W = y + G / 2,
            xa = u.reversed ? Z + P : R - P,
            sa = u.reversed ? Z : R;
          a = [];
          var y = [],
            O = [],
            F = [],
            U = Z,
            ba,
            aa = (xa - na) / (K - X),
            ea = -aa,
            S = "area" === (u.valueRepresents ? u.valueRepresents : "height") ? c() : d();
          if (-1 !== S) {
            if (u.reversed) for (F.push(U), G = S.length - 1; 0 < G; G--) U += S[G], F.push(U);else for (G = 0; G < S.length; G++) U += S[G], F.push(U);
            if (u.reversed) for (G = 0; G < S.length; G++) F[G] < xa ? (a.push(K), y.push(W), ba = G) : (a.push((F[G] - na + aa * X) / aa), y.push((F[G] - na + ea * $) / ea));else for (G = 0; G < S.length; G++) F[G] < xa ? (a.push((F[G] - na + aa * X) / aa), y.push((F[G] - na + ea * $) / ea), ba = G) : (a.push(K), y.push(W));
            for (G = 0; G < S.length - 1; G++) U = u.reversed ? x[x.length - 1 - G].color ? x[x.length - 1 - G].color : u._colorSet[(x.length - 1 - G) % u._colorSet.length] : x[G].color ? x[G].color : u._colorSet[G % u._colorSet.length], G === ba ? O.push({
              x1: a[G],
              y1: F[G],
              x2: y[G],
              y2: F[G],
              x3: W,
              y3: xa,
              x4: y[G + 1],
              y4: F[G + 1],
              x5: a[G + 1],
              y5: F[G + 1],
              x6: K,
              y6: xa,
              id: G,
              height: F[G + 1] - F[G],
              color: U
            }) : O.push({
              x1: a[G],
              y1: F[G],
              x2: y[G],
              y2: F[G],
              x3: y[G + 1],
              y3: F[G + 1],
              x4: a[G + 1],
              y4: F[G + 1],
              id: G,
              height: F[G + 1] - F[G],
              color: U
            });
            var ca = 2,
              H = [],
              ia = !1,
              Y = [],
              ha = [],
              S = !1;
            a = a = 0;
            Da(Y);
            for (G = 0; G < x.length; G++) x[G].exploded && (S = !0, u.reversed ? Y.push(x.length - 1 - G) : Y.push(G));
            Q.clearRect(z.x1, z.y1, z.width, z.height);
            Q.fillStyle = w.backgroundColor;
            Q.fillRect(z.x1, z.y1, z.width, z.height);
            if (I && u.visible && (b(), f(), e(), "inside" !== u.indexLabelPlacement)) {
              n();
              for (G = 0; G < x.length; G++) H[G].isDirty || (a = H[G].textBlock.x + H[G].width, a = (M - a) / 2, 0 == G && (B = a), B > a && (B = a));
              for (G = 0; G < O.length; G++) O[G].x1 += B, O[G].x2 += B, O[G].x3 += B, O[G].x4 += B, O[G].x5 && (O[G].x5 += B, O[G].x6 += B), H[G].textBlock.x += B;
            }
            for (G = 0; G < O.length; G++) B = O[G], qa(Q, B, u.fillOpacity), ha.push(B.y1);
            v(Q);
            I && u.visible && ("inside" === u.indexLabelPlacement || w.animationEnabled || r(Q), w.animationEnabled || l());
            if (!I) for (G = 0; G < x.length; G++) B = u.dataPointIds[G], a = {
              id: B,
              objectType: "dataPoint",
              dataPointIndex: G,
              dataSeriesIndex: 0,
              funnelSection: O[u.reversed ? x.length - 1 - G : G]
            }, w._eventManager.objectMap[B] = a;
            !w.animationEnabled && S ? k(w, -1, 0) : w.animationEnabled && !w.animatedRender && k(w, -1, 0);
            this.funnelPyramidClickHandler = function (a) {
              var b = -1;
              if (!ia && !w.isAnimating && (s(a.dataSeries.explodeOnClick) || a.dataSeries.explodeOnClick) && (b = u.reversed ? x.length - 1 - a.dataPointIndex : a.dataPointIndex, 0 <= b)) {
                a = b;
                if ("funnel" === u.type || "pyramid" === u.type) u.reversed ? x[x.length - 1 - a].exploded = x[x.length - 1 - a].exploded ? !1 : !0 : x[a].exploded = x[a].exploded ? !1 : !0;
                k(w, b, 500);
              }
            };
            return {
              source: Q,
              dest: this.plotArea.ctx,
              animationCallback: function animationCallback(a, b) {
                L.fadeInAnimation(a, b);
                1 <= a && (k(w, -1, 500), v(w.plotArea.ctx || w.ctx));
              },
              easingFunction: L.easing.easeInQuad,
              animationBase: 0
            };
          }
        }
      }
    };
    l.prototype.requestAnimFrame = function () {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (a) {
        window.setTimeout(a, 1E3 / 60);
      };
    }();
    l.prototype.cancelRequestAnimFrame = window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout;
    l.prototype.set = function (a, d, c) {
      c = "undefined" === typeof c ? !0 : c;
      "options" === a ? (this.options = d, c && this.render()) : l.base.set.call(this, a, d, c);
    };
    l.prototype.exportChart = function (a) {
      a = "undefined" === typeof a ? {} : a;
      var d = a.format ? a.format : "png",
        c = a.fileName ? a.fileName : this.exportFileName;
      if (a.toDataURL) return this.canvas.toDataURL("image/" + d);
      var b = this.canvas;
      if (b && d && c) {
        c = c + "." + d;
        a = "image/" + d;
        var b = b.toDataURL(a),
          e = !1,
          f = document.createElement("a");
        f.download = c;
        f.href = b;
        if ("undefined" !== typeof Blob && new Blob()) {
          for (var n = b.replace(/^data:[a-z\/]*;base64,/, ""), n = atob(n), m = new ArrayBuffer(n.length), m = new Uint8Array(m), k = 0; k < n.length; k++) m[k] = n.charCodeAt(k);
          d = new Blob([m.buffer], {
            type: "image/" + d
          });
          try {
            window.navigator.msSaveBlob(d, c), e = !0;
          } catch (h) {
            f.dataset.downloadurl = [a, f.download, f.href].join(":"), f.href = window.URL.createObjectURL(d);
          }
        }
        if (!e) try {
          event = document.createEvent("MouseEvents"), event.initMouseEvent("click", !0, !1, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), f.dispatchEvent ? f.dispatchEvent(event) : f.fireEvent && f.fireEvent("onclick");
        } catch (r) {
          d = window.open(), d.document.write("<img src='" + b + "'></img><div>Please right click on the image and save it to your device</div>"), d.document.close();
        }
      }
    };
    l.prototype.print = function () {
      var a = this.exportChart({
          toDataURL: !0
        }),
        d = document.createElement("iframe");
      d.setAttribute("class", "canvasjs-chart-print-frame");
      d.setAttribute("style", "position:absolute; width:100%; border: 0px; margin: 0px 0px 0px 0px; padding 0px 0px 0px 0px;");
      d.style.height = this.height + "px";
      this._canvasJSContainer.appendChild(d);
      var c = this,
        b = d.contentWindow || d.contentDocument.document || d.contentDocument;
      b.document.open();
      b.document.write('<!DOCTYPE HTML>\n<html><body style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px;"><img src="' + a + '"/><body/></html>');
      b.document.close();
      setTimeout(function () {
        b.focus();
        b.print();
        setTimeout(function () {
          c._canvasJSContainer.removeChild(d);
        }, 1E3);
      }, 500);
    };
    l.prototype.getPercentAndTotal = function (a, d) {
      var c = null,
        b = null,
        e = null;
      if (0 <= a.type.indexOf("stacked")) b = 0, c = d.x.getTime ? d.x.getTime() : d.x, c in a.plotUnit.yTotals && (b = a.plotUnit.yTotals[c], e = isNaN(d.y) ? 0 : 100 * (d.y / b));else if ("pie" === a.type || "doughnut" === a.type || "funnel" === a.type || "pyramid" === a.type) {
        for (c = b = 0; c < a.dataPoints.length; c++) isNaN(a.dataPoints[c].y) || (b += a.dataPoints[c].y);
        e = isNaN(d.y) ? 0 : 100 * (d.y / b);
      }
      return {
        percent: e,
        total: b
      };
    };
    l.prototype.replaceKeywordsWithValue = function (a, d, c, b, e) {
      var f = this;
      e = "undefined" === typeof e ? 0 : e;
      if ((0 <= c.type.indexOf("stacked") || "pie" === c.type || "doughnut" === c.type || "funnel" === c.type || "pyramid" === c.type) && (0 <= a.indexOf("#percent") || 0 <= a.indexOf("#total"))) {
        var n = "#percent",
          m = "#total",
          k = this.getPercentAndTotal(c, d),
          m = isNaN(k.total) ? m : k.total,
          n = isNaN(k.percent) ? n : k.percent;
        do {
          k = "";
          if (c.percentFormatString) k = c.percentFormatString;else {
            var k = "#,##0.",
              h = Math.max(Math.ceil(Math.log(1 / Math.abs(n)) / Math.LN10), 2);
            if (isNaN(h) || !isFinite(h)) h = 2;
            for (var r = 0; r < h; r++) k += "#";
            c.percentFormatString = k;
          }
          a = a.replace("#percent", ea(n, k, f._cultureInfo));
          a = a.replace("#total", ea(m, c.yValueFormatString ? c.yValueFormatString : "#,##0.########", f._cultureInfo));
        } while (0 <= a.indexOf("#percent") || 0 <= a.indexOf("#total"));
      }
      return a.replace(/\{.*?\}|"[^"]*"|'[^']*'/g, function (a) {
        if ('"' === a[0] && '"' === a[a.length - 1] || "'" === a[0] && "'" === a[a.length - 1]) return a.slice(1, a.length - 1);
        a = Ga(a.slice(1, a.length - 1));
        a = a.replace("#index", e);
        var h = null;
        try {
          var g = a.match(/(.*?)\s*\[\s*(.*?)\s*\]/);
          g && 0 < g.length && (h = Ga(g[2]), a = Ga(g[1]));
        } catch (m) {}
        g = null;
        if ("color" === a) return "waterfall" === c.type ? d.color ? d.color : 0 < d.y ? c.risingColor : c.fallingColor : "error" === c.type ? c.color ? c.color : c._colorSet[h % c._colorSet.length] : d.color ? d.color : c.color ? c.color : c._colorSet[b % c._colorSet.length];
        if (d.hasOwnProperty(a)) g = d;else if (c.hasOwnProperty(a)) g = c;else return "";
        g = g[a];
        null !== h && (g = g[h]);
        if ("x" === a) {
          if ("dateTime" === c.axisX.valueType || "dateTime" === c.xValueType || d.x && d.x.getTime) {
            if (f.plotInfo.plotTypes[0].plotUnits[0].axisX && !f.plotInfo.plotTypes[0].plotUnits[0].axisX.logarithmic) return Aa(g, d.xValueFormatString ? d.xValueFormatString : c.xValueFormatString ? c.xValueFormatString : c.xValueFormatString = f.axisX && f.axisX.autoValueFormatString ? f.axisX.autoValueFormatString : "DD MMM YY", f._cultureInfo);
          } else return ea(g, d.xValueFormatString ? d.xValueFormatString : c.xValueFormatString ? c.xValueFormatString : c.xValueFormatString = "#,##0.########", f._cultureInfo);
        } else return "y" === a ? ea(g, d.yValueFormatString ? d.yValueFormatString : c.yValueFormatString ? c.yValueFormatString : c.yValueFormatString = "#,##0.########", f._cultureInfo) : "z" === a ? ea(g, d.zValueFormatString ? d.zValueFormatString : c.zValueFormatString ? c.zValueFormatString : c.zValueFormatString = "#,##0.########", f._cultureInfo) : g;
      });
    };
    oa(F, V);
    F.prototype.setLayout = function () {
      var a = this.dockInsidePlotArea ? this.chart.plotArea : this.chart,
        d = a.layoutManager.getFreeSpace(),
        c = null,
        b = 0,
        e = 0,
        f = 0,
        n = 0,
        m = this.markerMargin = this.chart.options.legend && !s(this.chart.options.legend.markerMargin) ? this.chart.options.legend.markerMargin : 0.3 * this.fontSize;
      this.height = 0;
      var k = [],
        h = [];
      "top" === this.verticalAlign || "bottom" === this.verticalAlign ? (this.orientation = "horizontal", c = this.verticalAlign, f = this.maxWidth = null !== this.maxWidth ? this.maxWidth : d.width, n = this.maxHeight = null !== this.maxHeight ? this.maxHeight : 0.5 * d.height) : "center" === this.verticalAlign && (this.orientation = "vertical", c = this.horizontalAlign, f = this.maxWidth = null !== this.maxWidth ? this.maxWidth : 0.5 * d.width, n = this.maxHeight = null !== this.maxHeight ? this.maxHeight : d.height);
      this.errorMarkerColor = [];
      for (var r = 0; r < this.dataSeries.length; r++) {
        var q = this.dataSeries[r];
        if (q.dataPoints && q.dataPoints.length) if ("pie" !== q.type && "doughnut" !== q.type && "funnel" !== q.type && "pyramid" !== q.type) {
          var p = q.legendMarkerType = q.legendMarkerType ? q.legendMarkerType : "line" !== q.type && "stepLine" !== q.type && "spline" !== q.type && "scatter" !== q.type && "bubble" !== q.type || !q.markerType ? "error" === q.type && q._linkedSeries ? q._linkedSeries.legendMarkerType ? q._linkedSeries.legendMarkerType : I.getDefaultLegendMarker(q._linkedSeries.type) : I.getDefaultLegendMarker(q.type) : q.markerType,
            g = q.legendText ? q.legendText : this.itemTextFormatter ? this.itemTextFormatter({
              chart: this.chart,
              legend: this.options,
              dataSeries: q,
              dataPoint: null
            }) : q.name,
            l = q.legendMarkerColor = q.legendMarkerColor ? q.legendMarkerColor : q.markerColor ? q.markerColor : "error" === q.type ? s(q.whiskerColor) ? q._colorSet[0] : q.whiskerColor : q._colorSet[0],
            t = q.markerSize || "line" !== q.type && "stepLine" !== q.type && "spline" !== q.type ? 0.75 * this.lineHeight : 0,
            v = q.legendMarkerBorderColor ? q.legendMarkerBorderColor : q.markerBorderColor,
            u = q.legendMarkerBorderThickness ? q.legendMarkerBorderThickness : q.markerBorderThickness ? Math.max(1, Math.round(0.2 * t)) : 0;
          "error" === q.type && this.errorMarkerColor.push(l);
          g = this.chart.replaceKeywordsWithValue(g, q.dataPoints[0], q, r);
          p = {
            markerType: p,
            markerColor: l,
            text: g,
            textBlock: null,
            chartType: q.type,
            markerSize: t,
            lineColor: q._colorSet[0],
            dataSeriesIndex: q.index,
            dataPointIndex: null,
            markerBorderColor: v,
            markerBorderThickness: u
          };
          k.push(p);
        } else for (var x = 0; x < q.dataPoints.length; x++) {
          var z = q.dataPoints[x],
            p = z.legendMarkerType ? z.legendMarkerType : q.legendMarkerType ? q.legendMarkerType : I.getDefaultLegendMarker(q.type),
            g = z.legendText ? z.legendText : q.legendText ? q.legendText : this.itemTextFormatter ? this.itemTextFormatter({
              chart: this.chart,
              legend: this.options,
              dataSeries: q,
              dataPoint: z
            }) : z.name ? z.name : "DataPoint: " + (x + 1),
            l = z.legendMarkerColor ? z.legendMarkerColor : q.legendMarkerColor ? q.legendMarkerColor : z.color ? z.color : q.color ? q.color : q._colorSet[x % q._colorSet.length],
            t = 0.75 * this.lineHeight,
            v = z.legendMarkerBorderColor ? z.legendMarkerBorderColor : q.legendMarkerBorderColor ? q.legendMarkerBorderColor : z.markerBorderColor ? z.markerBorderColor : q.markerBorderColor,
            u = z.legendMarkerBorderThickness ? z.legendMarkerBorderThickness : q.legendMarkerBorderThickness ? q.legendMarkerBorderThickness : z.markerBorderThickness || q.markerBorderThickness ? Math.max(1, Math.round(0.2 * t)) : 0,
            g = this.chart.replaceKeywordsWithValue(g, z, q, x),
            p = {
              markerType: p,
              markerColor: l,
              text: g,
              textBlock: null,
              chartType: q.type,
              markerSize: t,
              dataSeriesIndex: r,
              dataPointIndex: x,
              markerBorderColor: v,
              markerBorderThickness: u
            };
          (z.showInLegend || q.showInLegend && !1 !== z.showInLegend) && k.push(p);
        }
      }
      !0 === this.reversed && k.reverse();
      if (0 < k.length) {
        q = null;
        l = g = z = x = 0;
        z = null !== this.itemWidth ? null !== this.itemMaxWidth ? Math.min(this.itemWidth, this.itemMaxWidth, f) : this.itemMaxWidth = Math.min(this.itemWidth, f) : null !== this.itemMaxWidth ? Math.min(this.itemMaxWidth, f) : this.itemMaxWidth = f;
        t = 0 === t ? 0.75 * this.lineHeight : t;
        z -= t + m;
        for (r = 0; r < k.length; r++) {
          p = k[r];
          v = z;
          if ("line" === p.chartType || "spline" === p.chartType || "stepLine" === p.chartType) v -= 2 * 0.1 * this.lineHeight;
          if (!(0 >= n || "undefined" === typeof n || 0 >= v || "undefined" === typeof v)) {
            if ("horizontal" === this.orientation) {
              p.textBlock = new ja(this.ctx, {
                x: 0,
                y: 0,
                maxWidth: v,
                maxHeight: this.itemWrap ? n : this.lineHeight,
                angle: 0,
                text: p.text,
                horizontalAlign: "left",
                fontSize: this.fontSize,
                fontFamily: this.fontFamily,
                fontWeight: this.fontWeight,
                fontColor: this.fontColor,
                fontStyle: this.fontStyle,
                textBaseline: "middle"
              });
              p.textBlock.measureText();
              null !== this.itemWidth && (p.textBlock.width = this.itemWidth - (t + m + ("line" === p.chartType || "spline" === p.chartType || "stepLine" === p.chartType ? 2 * 0.1 * this.lineHeight : 0)));
              if (!q || q.width + Math.round(p.textBlock.width + t + m + (0 === q.width ? 0 : this.horizontalSpacing) + ("line" === p.chartType || "spline" === p.chartType || "stepLine" === p.chartType ? 2 * 0.1 * this.lineHeight : 0)) > f) q = {
                items: [],
                width: 0
              }, h.push(q), this.height += g, g = 0;
              g = Math.max(g, p.textBlock.height);
            } else p.textBlock = new ja(this.ctx, {
              x: 0,
              y: 0,
              maxWidth: z,
              maxHeight: !0 === this.itemWrap ? n : 1.5 * this.fontSize,
              angle: 0,
              text: p.text,
              horizontalAlign: "left",
              fontSize: this.fontSize,
              fontFamily: this.fontFamily,
              fontWeight: this.fontWeight,
              fontColor: this.fontColor,
              fontStyle: this.fontStyle,
              textBaseline: "middle"
            }), p.textBlock.measureText(), null !== this.itemWidth && (p.textBlock.width = this.itemWidth - (t + m + ("line" === p.chartType || "spline" === p.chartType || "stepLine" === p.chartType ? 2 * 0.1 * this.lineHeight : 0))), this.height < n - this.lineHeight ? (q = {
              items: [],
              width: 0
            }, h.push(q)) : (q = h[x], x = (x + 1) % h.length), this.height += p.textBlock.height;
            p.textBlock.x = q.width;
            p.textBlock.y = 0;
            q.width += Math.round(p.textBlock.width + t + m + (0 === q.width ? 0 : this.horizontalSpacing) + ("line" === p.chartType || "spline" === p.chartType || "stepLine" === p.chartType ? 2 * 0.1 * this.lineHeight : 0));
            q.items.push(p);
            this.width = Math.max(q.width, this.width);
            l = p.textBlock.width + (t + m + ("line" === p.chartType || "spline" === p.chartType || "stepLine" === p.chartType ? 2 * 0.1 * this.lineHeight : 0));
          }
        }
        this.itemWidth = l;
        this.height = !1 === this.itemWrap ? h.length * this.lineHeight : this.height + g;
        this.height = Math.min(n, this.height);
        this.width = Math.min(f, this.width);
      }
      "top" === this.verticalAlign ? (e = "left" === this.horizontalAlign ? d.x1 : "right" === this.horizontalAlign ? d.x2 - this.width : d.x1 + d.width / 2 - this.width / 2, b = d.y1) : "center" === this.verticalAlign ? (e = "left" === this.horizontalAlign ? d.x1 : "right" === this.horizontalAlign ? d.x2 - this.width : d.x1 + d.width / 2 - this.width / 2, b = d.y1 + d.height / 2 - this.height / 2) : "bottom" === this.verticalAlign && (e = "left" === this.horizontalAlign ? d.x1 : "right" === this.horizontalAlign ? d.x2 - this.width : d.x1 + d.width / 2 - this.width / 2, b = d.y2 - this.height);
      this.items = k;
      for (r = 0; r < this.items.length; r++) p = k[r], p.id = ++this.chart._eventManager.lastObjectId, this.chart._eventManager.objectMap[p.id] = {
        id: p.id,
        objectType: "legendItem",
        legendItemIndex: r,
        dataSeriesIndex: p.dataSeriesIndex,
        dataPointIndex: p.dataPointIndex
      };
      this.markerSize = t;
      this.rows = h;
      0 < k.length && a.layoutManager.registerSpace(c, {
        width: this.width + 2 + 2,
        height: this.height + 5 + 5
      });
      this.bounds = {
        x1: e,
        y1: b,
        x2: e + this.width,
        y2: b + this.height
      };
    };
    F.prototype.render = function () {
      var a = this.bounds.x1,
        d = this.bounds.y1,
        c = this.markerMargin,
        b = this.maxWidth,
        e = this.maxHeight,
        f = this.markerSize,
        n = this.rows;
      (0 < this.borderThickness && this.borderColor || this.backgroundColor) && this.ctx.roundRect(a, d, this.width, this.height, this.cornerRadius, this.borderThickness, this.backgroundColor, this.borderColor);
      for (var m = 0, k = 0; k < n.length; k++) {
        for (var h = n[k], r = 0, q = 0; q < h.items.length; q++) {
          var p = h.items[q],
            g = p.textBlock.x + a + (0 === q ? 0.2 * f : this.horizontalSpacing),
            l = d + m,
            s = g;
          this.chart.data[p.dataSeriesIndex].visible || (this.ctx.globalAlpha = 0.5);
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.rect(a, d, b, Math.max(e - e % this.lineHeight, 0));
          this.ctx.clip();
          if ("line" === p.chartType || "stepLine" === p.chartType || "spline" === p.chartType) this.ctx.strokeStyle = p.lineColor, this.ctx.lineWidth = Math.ceil(this.lineHeight / 8), this.ctx.beginPath(), this.ctx.moveTo(g - 0.1 * this.lineHeight, l + this.lineHeight / 2), this.ctx.lineTo(g + 0.85 * this.lineHeight, l + this.lineHeight / 2), this.ctx.stroke(), s -= 0.1 * this.lineHeight;
          if ("error" === p.chartType) {
            this.ctx.strokeStyle = this.errorMarkerColor[0];
            this.ctx.lineWidth = f / 8;
            this.ctx.beginPath();
            var t = g - 0.08 * this.lineHeight + 0.1 * this.lineHeight,
              u = l + 0.15 * this.lineHeight,
              v = 0.7 * this.lineHeight,
              z = v + 0.02 * this.lineHeight;
            this.ctx.moveTo(t, u);
            this.ctx.lineTo(t + v, u);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(t + v / 2, u);
            this.ctx.lineTo(t + v / 2, u + z);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(t, u + z);
            this.ctx.lineTo(t + v, u + z);
            this.ctx.stroke();
            this.errorMarkerColor.shift();
          }
          W.drawMarker(g + f / 2, l + this.lineHeight / 2, this.ctx, p.markerType, "error" === p.chartType || "line" === p.chartType || "spline" === p.chartType ? p.markerSize / 2 : p.markerSize, p.markerColor, p.markerBorderColor, p.markerBorderThickness);
          p.textBlock.x = g + c + f;
          if ("line" === p.chartType || "stepLine" === p.chartType || "spline" === p.chartType) p.textBlock.x += 0.1 * this.lineHeight;
          p.textBlock.y = Math.round(l + this.lineHeight / 2);
          p.textBlock.render(!0);
          this.ctx.restore();
          r = 0 < q ? Math.max(r, p.textBlock.height) : p.textBlock.height;
          this.chart.data[p.dataSeriesIndex].visible || (this.ctx.globalAlpha = 1);
          g = Q(p.id);
          this.ghostCtx.fillStyle = g;
          this.ghostCtx.beginPath();
          this.ghostCtx.fillRect(s, p.textBlock.y - this.lineHeight / 2, p.textBlock.x + p.textBlock.width - s, p.textBlock.height);
          p.x1 = this.chart._eventManager.objectMap[p.id].x1 = s;
          p.y1 = this.chart._eventManager.objectMap[p.id].y1 = p.textBlock.y - this.lineHeight / 2;
          p.x2 = this.chart._eventManager.objectMap[p.id].x2 = p.textBlock.x + p.textBlock.width;
          p.y2 = this.chart._eventManager.objectMap[p.id].y2 = p.textBlock.y + p.textBlock.height - this.lineHeight / 2;
        }
        m += r;
      }
    };
    oa(I, V);
    I.prototype.getDefaultAxisPlacement = function () {
      var a = this.type;
      if ("column" === a || "line" === a || "stepLine" === a || "spline" === a || "area" === a || "stepArea" === a || "splineArea" === a || "stackedColumn" === a || "stackedLine" === a || "bubble" === a || "scatter" === a || "stackedArea" === a || "stackedColumn100" === a || "stackedLine100" === a || "stackedArea100" === a || "candlestick" === a || "ohlc" === a || "rangeColumn" === a || "rangeArea" === a || "rangeSplineArea" === a || "boxAndWhisker" === a || "waterfall" === a) return "normal";
      if ("bar" === a || "stackedBar" === a || "stackedBar100" === a || "rangeBar" === a) return "xySwapped";
      if ("pie" === a || "doughnut" === a || "funnel" === a || "pyramid" === a) return "none";
      "error" !== a && window.console.log("Unknown Chart Type: " + a);
      return null;
    };
    I.getDefaultLegendMarker = function (a) {
      if ("column" === a || "stackedColumn" === a || "stackedLine" === a || "bar" === a || "stackedBar" === a || "stackedBar100" === a || "bubble" === a || "scatter" === a || "stackedColumn100" === a || "stackedLine100" === a || "stepArea" === a || "candlestick" === a || "ohlc" === a || "rangeColumn" === a || "rangeBar" === a || "rangeArea" === a || "rangeSplineArea" === a || "boxAndWhisker" === a || "waterfall" === a) return "square";
      if ("line" === a || "stepLine" === a || "spline" === a || "pie" === a || "doughnut" === a) return "circle";
      if ("area" === a || "splineArea" === a || "stackedArea" === a || "stackedArea100" === a || "funnel" === a || "pyramid" === a) return "triangle";
      if ("error" === a) return "none";
      window.console.log("Unknown Chart Type: " + a);
      return null;
    };
    I.prototype.getDataPointAtX = function (a, d) {
      if (!this.dataPoints || 0 === this.dataPoints.length) return null;
      var c = {
          dataPoint: null,
          distance: Infinity,
          index: NaN
        },
        b = null,
        e = 0,
        f = 0,
        n = 1,
        m = Infinity,
        k = 0,
        h = 0,
        r = 0;
      "none" !== this.chart.plotInfo.axisPlacement && (this.axisX.logarithmic ? (r = Math.log(this.dataPoints[this.dataPoints.length - 1].x / this.dataPoints[0].x), r = 1 < r ? Math.min(Math.max((this.dataPoints.length - 1) / r * Math.log(a / this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0) : (r = this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x, r = 0 < r ? Math.min(Math.max((this.dataPoints.length - 1) / r * (a - this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0));
      for (;;) {
        f = 0 < n ? r + e : r - e;
        if (0 <= f && f < this.dataPoints.length) {
          var b = this.dataPoints[f],
            q = this.axisX.logarithmic ? b.x > a ? b.x / a : a / b.x : Math.abs(b.x - a);
          q < c.distance && (c.dataPoint = b, c.distance = q, c.index = f);
          b = q;
          b <= m ? m = b : 0 < n ? k++ : h++;
          if (1E3 < k && 1E3 < h) break;
        } else if (0 > r - e && r + e >= this.dataPoints.length) break;
        -1 === n ? (e++, n = 1) : n = -1;
      }
      return d || (c.dataPoint.x.getTime ? c.dataPoint.x.getTime() : c.dataPoint.x) !== (a.getTime ? a.getTime() : a) ? d && null !== c.dataPoint ? c : null : c;
    };
    I.prototype.getDataPointAtXY = function (a, d, c) {
      if (!this.dataPoints || 0 === this.dataPoints.length || a < this.chart.plotArea.x1 || a > this.chart.plotArea.x2 || d < this.chart.plotArea.y1 || d > this.chart.plotArea.y2) return null;
      c = c || !1;
      var b = [],
        e = 0,
        f = 0,
        n = 1,
        m = !1,
        k = Infinity,
        h = 0,
        r = 0,
        q = 0;
      if ("none" !== this.chart.plotInfo.axisPlacement) if (q = (this.chart.axisX[0] ? this.chart.axisX[0] : this.chart.axisX2[0]).getXValueAt({
        x: a,
        y: d
      }), this.axisX.logarithmic) var p = Math.log(this.dataPoints[this.dataPoints.length - 1].x / this.dataPoints[0].x),
        q = 1 < p ? Math.min(Math.max((this.dataPoints.length - 1) / p * Math.log(q / this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0;else p = this.dataPoints[this.dataPoints.length - 1].x - this.dataPoints[0].x, q = 0 < p ? Math.min(Math.max((this.dataPoints.length - 1) / p * (q - this.dataPoints[0].x) >> 0, 0), this.dataPoints.length) : 0;
      for (;;) {
        f = 0 < n ? q + e : q - e;
        if (0 <= f && f < this.dataPoints.length) {
          var p = this.chart._eventManager.objectMap[this.dataPointIds[f]],
            g = this.dataPoints[f],
            l = null;
          if (p) {
            switch (this.type) {
              case "column":
              case "stackedColumn":
              case "stackedColumn100":
              case "bar":
              case "stackedBar":
              case "stackedBar100":
              case "rangeColumn":
              case "rangeBar":
              case "waterfall":
              case "error":
                a >= p.x1 && a <= p.x2 && d >= p.y1 && d <= p.y2 && (b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: Math.min(Math.abs(p.x1 - a), Math.abs(p.x2 - a), Math.abs(p.y1 - d), Math.abs(p.y2 - d))
                }), m = !0);
                break;
              case "line":
              case "stepLine":
              case "spline":
              case "area":
              case "stepArea":
              case "stackedArea":
              case "stackedArea100":
              case "splineArea":
              case "scatter":
                var s = la("markerSize", g, this) || 4,
                  t = c ? 20 : s,
                  l = Math.sqrt(Math.pow(p.x1 - a, 2) + Math.pow(p.y1 - d, 2));
                l <= t && b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: l
                });
                p = Math.abs(p.x1 - a);
                p <= k ? k = p : 0 < n ? h++ : r++;
                l <= s / 2 && (m = !0);
                break;
              case "rangeArea":
              case "rangeSplineArea":
                s = la("markerSize", g, this) || 4;
                t = c ? 20 : s;
                l = Math.min(Math.sqrt(Math.pow(p.x1 - a, 2) + Math.pow(p.y1 - d, 2)), Math.sqrt(Math.pow(p.x1 - a, 2) + Math.pow(p.y2 - d, 2)));
                l <= t && b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: l
                });
                p = Math.abs(p.x1 - a);
                p <= k ? k = p : 0 < n ? h++ : r++;
                l <= s / 2 && (m = !0);
                break;
              case "bubble":
                s = p.size;
                l = Math.sqrt(Math.pow(p.x1 - a, 2) + Math.pow(p.y1 - d, 2));
                l <= s / 2 && (b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: l
                }), m = !0);
                break;
              case "pie":
              case "doughnut":
                s = p.center;
                t = "doughnut" === this.type ? p.percentInnerRadius * p.radius : 0;
                l = Math.sqrt(Math.pow(s.x - a, 2) + Math.pow(s.y - d, 2));
                l < p.radius && l > t && (l = Math.atan2(d - s.y, a - s.x), 0 > l && (l += 2 * Math.PI), l = Number(((180 * (l / Math.PI) % 360 + 360) % 360).toFixed(12)), s = Number(((180 * (p.startAngle / Math.PI) % 360 + 360) % 360).toFixed(12)), t = Number(((180 * (p.endAngle / Math.PI) % 360 + 360) % 360).toFixed(12)), 0 === t && 1 < p.endAngle && (t = 360), s >= t && 0 !== g.y && (t += 360, l < s && (l += 360)), l > s && l < t && (b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: 0
                }), m = !0));
                break;
              case "funnel":
              case "pyramid":
                l = p.funnelSection;
                d > l.y1 && d < l.y4 && (l.y6 ? d > l.y6 ? (f = l.x6 + (l.x5 - l.x6) / (l.y5 - l.y6) * (d - l.y6), l = l.x3 + (l.x4 - l.x3) / (l.y4 - l.y3) * (d - l.y3)) : (f = l.x1 + (l.x6 - l.x1) / (l.y6 - l.y1) * (d - l.y1), l = l.x2 + (l.x3 - l.x2) / (l.y3 - l.y2) * (d - l.y2)) : (f = l.x1 + (l.x4 - l.x1) / (l.y4 - l.y1) * (d - l.y1), l = l.x2 + (l.x3 - l.x2) / (l.y3 - l.y2) * (d - l.y2)), a > f && a < l && (b.push({
                  dataPoint: g,
                  dataPointIndex: p.dataPointIndex,
                  dataSeries: this,
                  distance: 0
                }), m = !0));
                break;
              case "boxAndWhisker":
                if (a >= p.x1 - p.borderThickness / 2 && a <= p.x2 + p.borderThickness / 2 && d >= p.y4 - p.borderThickness / 2 && d <= p.y1 + p.borderThickness / 2 || Math.abs(p.x2 - a + p.x1 - a) < p.borderThickness && d >= p.y1 && d <= p.y4) b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: Math.min(Math.abs(p.x1 - a), Math.abs(p.x2 - a), Math.abs(p.y2 - d), Math.abs(p.y3 - d))
                }), m = !0;
                break;
              case "candlestick":
                if (a >= p.x1 - p.borderThickness / 2 && a <= p.x2 + p.borderThickness / 2 && d >= p.y2 - p.borderThickness / 2 && d <= p.y3 + p.borderThickness / 2 || Math.abs(p.x2 - a + p.x1 - a) < p.borderThickness && d >= p.y1 && d <= p.y4) b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: Math.min(Math.abs(p.x1 - a), Math.abs(p.x2 - a), Math.abs(p.y2 - d), Math.abs(p.y3 - d))
                }), m = !0;
                break;
              case "ohlc":
                if (Math.abs(p.x2 - a + p.x1 - a) < p.borderThickness && d >= p.y2 && d <= p.y3 || a >= p.x1 && a <= (p.x2 + p.x1) / 2 && d >= p.y1 - p.borderThickness / 2 && d <= p.y1 + p.borderThickness / 2 || a >= (p.x1 + p.x2) / 2 && a <= p.x2 && d >= p.y4 - p.borderThickness / 2 && d <= p.y4 + p.borderThickness / 2) b.push({
                  dataPoint: g,
                  dataPointIndex: f,
                  dataSeries: this,
                  distance: Math.min(Math.abs(p.x1 - a), Math.abs(p.x2 - a), Math.abs(p.y2 - d), Math.abs(p.y3 - d))
                }), m = !0;
            }
            if (m || 1E3 < h && 1E3 < r) break;
          }
        } else if (0 > q - e && q + e >= this.dataPoints.length) break;
        -1 === n ? (e++, n = 1) : n = -1;
      }
      a = null;
      for (d = 0; d < b.length; d++) a ? b[d].distance <= a.distance && (a = b[d]) : a = b[d];
      return a;
    };
    I.prototype.getMarkerProperties = function (a, d, c, b) {
      var e = this.dataPoints;
      return {
        x: d,
        y: c,
        ctx: b,
        type: e[a].markerType ? e[a].markerType : this.markerType,
        size: e[a].markerSize ? e[a].markerSize : this.markerSize,
        color: e[a].markerColor ? e[a].markerColor : this.markerColor ? this.markerColor : e[a].color ? e[a].color : this.color ? this.color : this._colorSet[a % this._colorSet.length],
        borderColor: e[a].markerBorderColor ? e[a].markerBorderColor : this.markerBorderColor ? this.markerBorderColor : null,
        borderThickness: e[a].markerBorderThickness ? e[a].markerBorderThickness : this.markerBorderThickness ? this.markerBorderThickness : null
      };
    };
    oa(E, V);
    E.prototype.createExtraLabelsForLog = function (a) {
      a = (a || 0) + 1;
      if (!(5 < a)) {
        var d = this.logLabelValues[0] || this.intervalStartPosition;
        if (Math.log(this.range) / Math.log(d / this.viewportMinimum) < this.noTicks - 1) {
          for (var c = E.getNiceNumber((d - this.viewportMinimum) / Math.min(Math.max(2, this.noTicks - this.logLabelValues.length), 3), !0), b = Math.ceil(this.viewportMinimum / c) * c; b < d; b += c) b < this.viewportMinimum || this.logLabelValues.push(b);
          this.logLabelValues.sort(Qa);
          this.createExtraLabelsForLog(a);
        }
      }
    };
    E.prototype.createLabels = function () {
      var a,
        d,
        c = 0,
        b = 0,
        e,
        f = 0,
        n = 0,
        b = 0,
        b = this.interval,
        m = 0,
        k,
        h = 0.6 * this.chart.height,
        l;
      a = !1;
      var q = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [],
        p = q.length ? s(this.scaleBreaks.firstBreakIndex) ? 0 : this.scaleBreaks.firstBreakIndex : 0;
      if ("axisX" !== this.type || "dateTime" !== this.valueType || this.logarithmic) {
        e = this.viewportMaximum;
        if (this.labels) {
          a = Math.ceil(b);
          for (var b = Math.ceil(this.intervalStartPosition), g = !1, c = b; c < this.viewportMaximum; c += a) if (this.labels[c]) g = !0;else {
            g = !1;
            break;
          }
          g && (this.interval = a, this.intervalStartPosition = b);
        }
        if (this.logarithmic && !this.equidistantInterval) for (this.logLabelValues || (this.logLabelValues = [], this.createExtraLabelsForLog()), b = 0, g = p; b < this.logLabelValues.length; b++) if (c = this.logLabelValues[b], c < this.viewportMinimum) b++;else {
          for (; g < q.length && c > q[g].endValue; g++);
          a = g < q.length && c >= q[g].startValue && c <= q[g].endValue;
          l = c;
          a || (a = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.options,
            value: l,
            label: this.labels[l] ? this.labels[l] : null
          }) : "axisX" === this.type && this.labels[l] ? this.labels[l] : ea(l, this.valueFormatString, this.chart._cultureInfo), a = new ja(this.ctx, {
            x: 0,
            y: 0,
            maxWidth: f,
            maxHeight: n,
            angle: this.labelAngle,
            text: this.prefix + a + this.suffix,
            backgroundColor: this.labelBackgroundColor,
            borderColor: this.labelBorderColor,
            cornerRadius: this.labelCornerRadius,
            horizontalAlign: "left",
            fontSize: this.labelFontSize,
            fontFamily: this.labelFontFamily,
            fontWeight: this.labelFontWeight,
            fontColor: this.labelFontColor,
            fontStyle: this.labelFontStyle,
            textBaseline: "middle",
            borderThickness: 0
          }), this._labels.push({
            position: l,
            textBlock: a,
            effectiveHeight: null
          }));
        }
        g = p;
        for (c = this.intervalStartPosition; c <= e; c = parseFloat(1E-12 > this.interval ? this.logarithmic && this.equidistantInterval ? c * Math.pow(this.logarithmBase, this.interval) : c + this.interval : (this.logarithmic && this.equidistantInterval ? c * Math.pow(this.logarithmBase, this.interval) : c + this.interval).toFixed(12))) {
          for (; g < q.length && c > q[g].endValue; g++);
          a = g < q.length && c >= q[g].startValue && c <= q[g].endValue;
          l = c;
          a || (a = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.options,
            value: l,
            label: this.labels[l] ? this.labels[l] : null
          }) : "axisX" === this.type && this.labels[l] ? this.labels[l] : ea(l, this.valueFormatString, this.chart._cultureInfo), a = new ja(this.ctx, {
            x: 0,
            y: 0,
            maxWidth: f,
            maxHeight: n,
            angle: this.labelAngle,
            text: this.prefix + a + this.suffix,
            horizontalAlign: "left",
            backgroundColor: this.labelBackgroundColor,
            borderColor: this.labelBorderColor,
            borderThickness: this.labelBorderThickness,
            cornerRadius: this.labelCornerRadius,
            fontSize: this.labelFontSize,
            fontFamily: this.labelFontFamily,
            fontWeight: this.labelFontWeight,
            fontColor: this.labelFontColor,
            fontStyle: this.labelFontStyle,
            textBaseline: "middle"
          }), this._labels.push({
            position: l,
            textBlock: a,
            effectiveHeight: null
          }));
        }
      } else for (this.intervalStartPosition = this.getLabelStartPoint(new Date(this.viewportMinimum), this.intervalType, this.interval), e = Wa(new Date(this.viewportMaximum), this.interval, this.intervalType), g = p, c = this.intervalStartPosition; c < e; Wa(c, b, this.intervalType)) {
        for (a = c.getTime(); g < q.length && a > q[g].endValue; g++);
        l = a;
        a = g < q.length && a >= q[g].startValue && a <= q[g].endValue;
        a || (a = this.labelFormatter ? this.labelFormatter({
          chart: this.chart,
          axis: this.options,
          value: new Date(l),
          label: this.labels[l] ? this.labels[l] : null
        }) : "axisX" === this.type && this.labels[l] ? this.labels[l] : Aa(l, this.valueFormatString, this.chart._cultureInfo), a = new ja(this.ctx, {
          x: 0,
          y: 0,
          maxWidth: f,
          backgroundColor: this.labelBackgroundColor,
          borderColor: this.labelBorderColor,
          borderThickness: this.labelBorderThickness,
          cornerRadius: this.labelCornerRadius,
          maxHeight: n,
          angle: this.labelAngle,
          text: this.prefix + a + this.suffix,
          horizontalAlign: "left",
          fontSize: this.labelFontSize,
          fontFamily: this.labelFontFamily,
          fontWeight: this.labelFontWeight,
          fontColor: this.labelFontColor,
          fontStyle: this.labelFontStyle,
          textBaseline: "middle"
        }), this._labels.push({
          position: l,
          textBlock: a,
          effectiveHeight: null,
          breaksLabelType: void 0
        }));
      }
      if ("bottom" === this._position || "top" === this._position) m = this.logarithmic && !this.equidistantInterval && 2 <= this._labels.length ? this.lineCoordinates.width * Math.log(Math.min(this._labels[this._labels.length - 1].position / this._labels[this._labels.length - 2].position, this._labels[1].position / this._labels[0].position)) / Math.log(this.range) : this.lineCoordinates.width / (this.logarithmic && this.equidistantInterval ? Math.log(this.range) / Math.log(this.logarithmBase) : Math.abs(this.range)) * R[this.intervalType + "Duration"] * this.interval, f = "undefined" === typeof this.options.labelMaxWidth ? 0.5 * this.chart.width >> 0 : this.options.labelMaxWidth, this.chart.panEnabled || (n = "undefined" === typeof this.options.labelWrap || this.labelWrap ? 0.8 * this.chart.height >> 0 : 1.5 * this.labelFontSize);else if ("left" === this._position || "right" === this._position) m = this.logarithmic && !this.equidistantInterval && 2 <= this._labels.length ? this.lineCoordinates.height * Math.log(Math.min(this._labels[this._labels.length - 1].position / this._labels[this._labels.length - 2].position, this._labels[1].position / this._labels[0].position)) / Math.log(this.range) : this.lineCoordinates.height / (this.logarithmic && this.equidistantInterval ? Math.log(this.range) / Math.log(this.logarithmBase) : Math.abs(this.range)) * R[this.intervalType + "Duration"] * this.interval, this.chart.panEnabled || (f = "undefined" === typeof this.options.labelMaxWidth ? 0.3 * this.chart.width >> 0 : this.options.labelMaxWidth), n = "undefined" === typeof this.options.labelWrap || this.labelWrap ? 0.3 * this.chart.height >> 0 : 1.5 * this.labelFontSize;
      for (b = 0; b < this._labels.length; b++) {
        a = this._labels[b].textBlock;
        a.maxWidth = f;
        a.maxHeight = n;
        var C = a.measureText();
        k = C.height;
      }
      e = [];
      p = q = 0;
      if (this.labelAutoFit || this.options.labelAutoFit) if (s(this.labelAngle) || (this.labelAngle = (this.labelAngle % 360 + 360) % 360, 90 < this.labelAngle && 270 > this.labelAngle ? this.labelAngle -= 180 : 270 <= this.labelAngle && 360 >= this.labelAngle && (this.labelAngle -= 360)), "bottom" === this._position || "top" === this._position) {
        if (f = 0.9 * m >> 0, p = 0, !this.chart.panEnabled && 1 <= this._labels.length) {
          this.sessionVariables.labelFontSize = this.labelFontSize;
          this.sessionVariables.labelMaxWidth = f;
          this.sessionVariables.labelMaxHeight = n;
          this.sessionVariables.labelAngle = this.labelAngle;
          this.sessionVariables.labelWrap = this.labelWrap;
          for (c = 0; c < this._labels.length; c++) if (!this._labels[c].breaksLabelType) {
            a = this._labels[c].textBlock;
            for (var v, g = a.text.split(" "), b = 0; b < g.length; b++) l = g[b], this.ctx.font = a.fontStyle + " " + a.fontWeight + " " + a.fontSize + "px " + a.fontFamily, l = this.ctx.measureText(l), l.width > p && (v = c, p = l.width);
          }
          c = 0;
          for (c = this.intervalStartPosition < this.viewportMinimum ? 1 : 0; c < this._labels.length; c++) if (!this._labels[c].breaksLabelType) {
            a = this._labels[c].textBlock;
            C = a.measureText();
            for (g = c + 1; g < this._labels.length; g++) if (!this._labels[g].breaksLabelType) {
              d = this._labels[g].textBlock;
              d = d.measureText();
              break;
            }
            e.push(a.height);
            this.sessionVariables.labelMaxHeight = Math.max.apply(Math, e);
            Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
            Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
            b = f * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (n - a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
            if (s(this.options.labelAngle) && isNaN(this.options.labelAngle) && 0 !== this.options.labelAngle) {
              if (this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? n : Math.min((b - f * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)), b), l = (h - (k + a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(-25))) / Math.sin(Math.PI / 180 * Math.abs(-25)), !s(this.options.labelWrap)) this.labelWrap ? s(this.options.labelMaxWidth) ? (this.sessionVariables.labelMaxWidth = Math.min(Math.max(f, p), l), this.sessionVariables.labelWrap = this.labelWrap, d && C.width + d.width >> 0 > 2 * f && (this.sessionVariables.labelAngle = -25)) : (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelAngle = this.sessionVariables.labelMaxWidth > f ? -25 : this.sessionVariables.labelAngle) : s(this.options.labelMaxWidth) ? (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelMaxWidth = f, d && C.width + d.width >> 0 > 2 * f && (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = l)) : (this.sessionVariables.labelAngle = this.sessionVariables.labelMaxWidth > f ? -25 : this.sessionVariables.labelAngle, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelWrap = this.labelWrap);else {
                if (s(this.options.labelWrap)) if (!s(this.options.labelMaxWidth)) this.options.labelMaxWidth < f ? (this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelMaxHeight = b) : (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth, this.sessionVariables.labelMaxHeight = n);else if (!s(d)) if (b = C.width + d.width >> 0, g = this.labelFontSize, p < f) b - 2 * f > q && (q = b - 2 * f, b >= 2 * f && b < 2.2 * f ? (this.sessionVariables.labelMaxWidth = f, s(this.options.labelFontSize) && 12 < g && (g = Math.floor(12 / 13 * g), a.measureText()), this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? g : this.options.labelFontSize, this.sessionVariables.labelAngle = this.labelAngle) : b >= 2.2 * f && b < 2.8 * f ? (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = l, this.sessionVariables.labelFontSize = g) : b >= 2.8 * f && b < 3.2 * f ? (this.sessionVariables.labelMaxWidth = Math.max(f, p), this.sessionVariables.labelWrap = !0, s(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? g : this.options.labelFontSize, this.sessionVariables.labelAngle = this.labelAngle) : b >= 3.2 * f && b < 3.6 * f ? (this.sessionVariables.labelAngle = -25, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelMaxWidth = l, this.sessionVariables.labelFontSize = this.labelFontSize) : b > 3.6 * f && b < 5 * f ? (s(this.options.labelFontSize) && 12 < g && (g = Math.floor(12 / 13 * g), a.measureText()), this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? g : this.options.labelFontSize, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = l) : b > 5 * f && (this.sessionVariables.labelWrap = !0, this.sessionVariables.labelMaxWidth = f, this.sessionVariables.labelFontSize = g, this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelAngle = this.labelAngle));else if (v === c && (0 === v && p + this._labels[v + 1].textBlock.measureText().width - 2 * f > q || v === this._labels.length - 1 && p + this._labels[v - 1].textBlock.measureText().width - 2 * f > q || 0 < v && v < this._labels.length - 1 && p + this._labels[v + 1].textBlock.measureText().width - 2 * f > q && p + this._labels[v - 1].textBlock.measureText().width - 2 * f > q)) q = 0 === v ? p + this._labels[v + 1].textBlock.measureText().width - 2 * f : p + this._labels[v - 1].textBlock.measureText().width - 2 * f, this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? g : this.options.labelFontSize, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelAngle = -25, this.sessionVariables.labelMaxWidth = l;else if (0 === q) for (this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? g : this.options.labelFontSize, this.sessionVariables.labelWrap = !0, b = 0; b < this._labels.length; b++) a = this._labels[b].textBlock, a.maxWidth = this.sessionVariables.labelMaxWidth = Math.min(Math.max(f, p), l), C = a.measureText(), b < this._labels.length - 1 && (g = b + 1, d = this._labels[g].textBlock, d.maxWidth = this.sessionVariables.labelMaxWidth = Math.min(Math.max(f, p), l), d = d.measureText(), C.width + d.width >> 0 > 2 * f && (this.sessionVariables.labelAngle = -25));
              }
            } else (this.sessionVariables.labelAngle = this.labelAngle, this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? n : Math.min((b - f * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)), b), l = 0 != this.labelAngle ? (h - (k + a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) : f, this.sessionVariables.labelMaxHeight = n = this.labelWrap ? (h - l * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) : 1.5 * this.labelFontSize, s(this.options.labelWrap)) ? s(this.options.labelWrap) && (this.labelWrap && !s(this.options.labelMaxWidth) ? (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : l, this.sessionVariables.labelMaxHeight = n) : (this.sessionVariables.labelAngle = this.labelAngle, this.sessionVariables.labelMaxWidth = l, this.sessionVariables.labelMaxHeight = b < 0.9 * m ? 0.9 * m : b, this.sessionVariables.labelWrap = this.labelWrap)) : (this.options.labelWrap ? (this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : l) : (s(this.options.labelMaxWidth), this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : l, this.sessionVariables.labelWrap = this.labelWrap), this.sessionVariables.labelMaxHeight = n);
          }
          for (b = 0; b < this._labels.length; b++) a = this._labels[b].textBlock, a.maxWidth = this.labelMaxWidth = this.sessionVariables.labelMaxWidth, a.fontSize = this.sessionVariables.labelFontSize, a.angle = this.labelAngle = this.sessionVariables.labelAngle, a.wrap = this.labelWrap = this.sessionVariables.labelWrap, a.maxHeight = this.sessionVariables.labelMaxHeight, a.measureText();
        } else for (c = 0; c < this._labels.length; c++) a = this._labels[c].textBlock, a.maxWidth = this.labelMaxWidth = s(this.options.labelMaxWidth) ? s(this.sessionVariables.labelMaxWidth) ? this.sessionVariables.labelMaxWidth = f : this.sessionVariables.labelMaxWidth : this.options.labelMaxWidth, a.fontSize = this.labelFontSize = s(this.options.labelFontSize) ? s(this.sessionVariables.labelFontSize) ? this.sessionVariables.labelFontSize = this.labelFontSize : this.sessionVariables.labelFontSize : this.options.labelFontSize, a.angle = this.labelAngle = s(this.options.labelAngle) ? s(this.sessionVariables.labelAngle) ? this.sessionVariables.labelAngle = this.labelAngle : this.sessionVariables.labelAngle : this.labelAngle, a.wrap = this.labelWrap = s(this.options.labelWrap) ? s(this.sessionVariables.labelWrap) ? this.sessionVariables.labelWrap = this.labelWrap : this.sessionVariables.labelWrap : this.options.labelWrap, a.maxHeight = s(this.sessionVariables.labelMaxHeight) ? this.sessionVariables.labelMaxHeight = n : this.sessionVariables.labelMaxHeight, a.measureText();
      } else if ("left" === this._position || "right" === this._position) if (f = s(this.options.labelMaxWidth) ? 0.3 * this.chart.width >> 0 : this.options.labelMaxWidth, n = "undefined" === typeof this.options.labelWrap || this.labelWrap ? 0.3 * this.chart.height >> 0 : 1.5 * this.labelFontSize, !this.chart.panEnabled && 1 <= this._labels.length) {
        this.sessionVariables.labelFontSize = this.labelFontSize;
        this.sessionVariables.labelMaxWidth = f;
        this.sessionVariables.labelMaxHeight = n;
        this.sessionVariables.labelAngle = s(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle;
        this.sessionVariables.labelWrap = this.labelWrap;
        for (c = 0; c < this._labels.length; c++) if (!this._labels[c].breaksLabelType) {
          a = this._labels[c].textBlock;
          C = a.measureText();
          for (g = c + 1; g < this._labels.length; g++) if (!this._labels[g].breaksLabelType) {
            d = this._labels[g].textBlock;
            d = d.measureText();
            break;
          }
          e.push(a.height);
          this.sessionVariables.labelMaxHeight = Math.max.apply(Math, e);
          b = f * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (n - a.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
          Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
          Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
          s(this.options.labelAngle) && isNaN(this.options.labelAngle) && 0 !== this.options.labelAngle ? s(this.options.labelWrap) ? s(this.options.labelWrap) && (s(this.options.labelMaxWidth) ? s(d) || (m = C.height + d.height >> 0, m - 2 * n > p && (p = m - 2 * n, m >= 2 * n && m < 2.4 * n ? (s(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize) : m >= 2.4 * n && m < 2.8 * n ? (this.sessionVariables.labelMaxHeight = b, this.sessionVariables.labelFontSize = this.labelFontSize, this.sessionVariables.labelWrap = !0) : m >= 2.8 * n && m < 3.2 * n ? (this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelWrap = !0, s(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize, this.sessionVariables.labelAngle = s(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle) : m >= 3.2 * n && m < 3.6 * n ? (this.sessionVariables.labelMaxHeight = b, this.sessionVariables.labelWrap = !0, this.sessionVariables.labelFontSize = this.labelFontSize) : m > 3.6 * n && m < 10 * n ? (s(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize, this.sessionVariables.labelMaxWidth = f, this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelAngle = s(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle) : m > 10 * n && m < 50 * n && (s(this.options.labelFontSize) && 12 < this.labelFontSize && (this.labelFontSize = Math.floor(12 / 13 * this.labelFontSize), a.measureText()), this.sessionVariables.labelFontSize = s(this.options.labelFontSize) ? this.labelFontSize : this.options.labelFontSize, this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelMaxWidth = f, this.sessionVariables.labelAngle = s(this.sessionVariables.labelAngle) ? 0 : this.sessionVariables.labelAngle))) : (this.sessionVariables.labelMaxHeight = n, this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth)) : (this.sessionVariables.labelMaxWidth = this.labelWrap ? this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth : this.labelMaxWidth ? this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth : f, this.sessionVariables.labelMaxHeight = n) : (this.sessionVariables.labelAngle = this.labelAngle, this.sessionVariables.labelMaxWidth = 0 === this.labelAngle ? f : Math.min((b - n * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle))) / Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)), n), s(this.options.labelWrap)) ? s(this.options.labelWrap) && (this.labelWrap && !s(this.options.labelMaxWidth) ? (this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth > this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth, this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxHeight = b) : (this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : f, this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? n : b, s(this.options.labelMaxWidth) && (this.sessionVariables.labelAngle = this.labelAngle))) : this.options.labelWrap ? (this.sessionVariables.labelMaxHeight = 0 === this.labelAngle ? n : b, this.sessionVariables.labelWrap = this.labelWrap, this.sessionVariables.labelMaxWidth = f) : (this.sessionVariables.labelMaxHeight = n, s(this.options.labelMaxWidth), this.sessionVariables.labelMaxWidth = this.options.labelMaxWidth ? this.options.labelMaxWidth : this.sessionVariables.labelMaxWidth, this.sessionVariables.labelWrap = this.labelWrap);
        }
        for (b = 0; b < this._labels.length; b++) a = this._labels[b].textBlock, a.maxWidth = this.labelMaxWidth = this.sessionVariables.labelMaxWidth, a.fontSize = this.labelFontSize = this.sessionVariables.labelFontSize, a.angle = this.labelAngle = this.sessionVariables.labelAngle, a.wrap = this.labelWrap = this.sessionVariables.labelWrap, a.maxHeight = this.sessionVariables.labelMaxHeight, a.measureText();
      } else for (c = 0; c < this._labels.length; c++) a = this._labels[c].textBlock, a.maxWidth = this.labelMaxWidth = s(this.options.labelMaxWidth) ? s(this.sessionVariables.labelMaxWidth) ? this.sessionVariables.labelMaxWidth = f : this.sessionVariables.labelMaxWidth : this.options.labelMaxWidth, a.fontSize = this.labelFontSize = s(this.options.labelFontSize) ? s(this.sessionVariables.labelFontSize) ? this.sessionVariables.labelFontSize = this.labelFontSize : this.sessionVariables.labelFontSize : this.options.labelFontSize, a.angle = this.labelAngle = s(this.options.labelAngle) ? s(this.sessionVariables.labelAngle) ? this.sessionVariables.labelAngle = this.labelAngle : this.sessionVariables.labelAngle : this.labelAngle, a.wrap = this.labelWrap = s(this.options.labelWrap) ? s(this.sessionVariables.labelWrap) ? this.sessionVariables.labelWrap = this.labelWrap : this.sessionVariables.labelWrap : this.options.labelWrap, a.maxHeight = s(this.sessionVariables.labelMaxHeight) ? this.sessionVariables.labelMaxHeight = n : this.sessionVariables.labelMaxHeight, a.measureText();
      for (c = 0; c < this.stripLines.length; c++) {
        var f = this.stripLines[c],
          w;
        if ("outside" === f.labelPlacement) {
          n = this.sessionVariables.labelMaxWidth;
          if ("bottom" === this._position || "top" === this._position) w = s(f.options.labelWrap) ? this.sessionVariables.labelMaxHeight : f.labelWrap ? 0.8 * this.chart.height >> 0 : 1.5 * this.labelFontSize;
          if ("left" === this._position || "right" === this._position) w = s(f.options.labelWrap) ? this.sessionVariables.labelMaxHeight : f.labelWrap ? 0.8 * this.chart.width >> 0 : 1.5 * this.labelFontSize;
          s(f.labelBackgroundColor) && (f.labelBackgroundColor = "#EEEEEE");
        } else n = "bottom" === this._position || "top" === this._position ? 0.9 * this.chart.width >> 0 : 0.9 * this.chart.height >> 0, w = s(f.options.labelWrap) || f.labelWrap ? "bottom" === this._position || "top" === this._position ? 0.8 * this.chart.width >> 0 : 0.8 * this.chart.height >> 0 : 1.5 * this.labelFontSize, s(f.labelBackgroundColor) && (s(f.startValue) && 0 !== f.startValue ? f.labelBackgroundColor = t ? "transparent" : null : f.labelBackgroundColor = "#EEEEEE");
        a = new ja(this.ctx, {
          x: 0,
          y: 0,
          backgroundColor: f.labelBackgroundColor,
          borderColor: f.labelBorderColor,
          borderThickness: f.labelBorderThickness,
          cornerRadius: f.labelCornerRadius,
          maxWidth: f.options.labelMaxWidth ? f.options.labelMaxWidth : n,
          maxHeight: w,
          angle: this.labelAngle,
          text: f.labelFormatter ? f.labelFormatter({
            chart: this.chart,
            axis: this,
            stripLine: f
          }) : f.label,
          horizontalAlign: "left",
          fontSize: "outside" === f.labelPlacement ? f.options.labelFontSize ? f.labelFontSize : this.labelFontSize : f.labelFontSize,
          fontFamily: "outside" === f.labelPlacement ? f.options.labelFontFamily ? f.labelFontFamily : this.labelFontFamily : f.labelFontFamily,
          fontWeight: "outside" === f.labelPlacement ? f.options.labelFontWeight ? f.labelFontWeight : this.labelFontWeight : f.labelFontWeight,
          fontColor: f.labelFontColor || f.color,
          fontStyle: "outside" === f.labelPlacement ? f.options.labelFontStyle ? f.labelFontStyle : this.fontWeight : f.labelFontStyle,
          textBaseline: "middle"
        });
        this._stripLineLabels.push({
          position: f.value,
          textBlock: a,
          effectiveHeight: null,
          stripLine: f
        });
      }
    };
    E.prototype.createLabelsAndCalculateWidth = function () {
      var a = 0,
        d = 0;
      this._labels = [];
      this._stripLineLabels = [];
      var c = this.chart.isNavigator ? 0 : 5;
      if ("left" === this._position || "right" === this._position) {
        this.createLabels();
        if ("inside" != this.labelPlacement || "inside" === this.labelPlacement && 0 < this._index) for (d = 0; d < this._labels.length; d++) {
          var b = this._labels[d].textBlock,
            e = b.measureText(),
            f = 0,
            f = 0 === this.labelAngle ? e.width : e.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - b.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle));
          a < f && (a = f);
          this._labels[d].effectiveWidth = f;
        }
        for (d = 0; d < this._stripLineLabels.length; d++) "outside" === this._stripLineLabels[d].stripLine.labelPlacement && this._stripLineLabels[d].stripLine.value >= this.viewportMinimum && this._stripLineLabels[d].stripLine.value <= this.viewportMaximum && (b = this._stripLineLabels[d].textBlock, e = b.measureText(), f = 0 === this.labelAngle ? e.width : e.width * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - b.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)), a < f && (a = f), this._stripLineLabels[d].effectiveWidth = f);
      }
      return (this.title ? this._titleTextBlock.measureText().height + 2 : 0) + a + ("inside" === this.tickPlacement ? 0 : this.tickLength) + c;
    };
    E.prototype.createLabelsAndCalculateHeight = function () {
      var a = 0;
      this._labels = [];
      this._stripLineLabels = [];
      var d,
        c = 0,
        b = this.chart.isNavigator ? 0 : 5;
      if ("bottom" === this._position || "top" === this._position) {
        this.createLabels();
        if ("inside" != this.labelPlacement || "inside" === this.labelPlacement && 0 < this._index) for (c = 0; c < this._labels.length; c++) {
          d = this._labels[c].textBlock;
          var e = d.measureText(),
            f = 0,
            f = 0 === this.labelAngle ? e.height : e.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - d.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle));
          a < f && (a = f);
          this._labels[c].effectiveHeight = f;
        }
        for (c = 0; c < this._stripLineLabels.length; c++) "outside" === this._stripLineLabels[c].stripLine.labelPlacement && this._stripLineLabels[c].stripLine.value >= this.viewportMinimum && this._stripLineLabels[c].stripLine.value <= this.viewportMaximum && (d = this._stripLineLabels[c].textBlock, e = d.measureText(), f = 0 === this.labelAngle ? e.height : e.width * Math.sin(Math.PI / 180 * Math.abs(this.labelAngle)) + (e.height - d.fontSize / 2) * Math.cos(Math.PI / 180 * Math.abs(this.labelAngle)), a < f && (a = f), this._stripLineLabels[c].effectiveHeight = f);
      }
      return (this.title ? this._titleTextBlock.measureText().height + 2 : 0) + a + ("inside" === this.tickPlacement ? 0 : this.tickLength) + b;
    };
    E.setLayout = function (a, d, c, b, e, f) {
      var n,
        m,
        k,
        h,
        l = a[0] ? a[0].chart : d[0].chart,
        q = l.isNavigator ? 0 : 10,
        p = l._axes;
      if (a && 0 < a.length) for (var g = 0; g < a.length; g++) a[g] && a[g].calculateAxisParameters();
      if (d && 0 < d.length) for (g = 0; g < d.length; g++) d[g].calculateAxisParameters();
      if (c && 0 < c.length) for (g = 0; g < c.length; g++) c[g].calculateAxisParameters();
      if (b && 0 < b.length) for (g = 0; g < b.length; g++) b[g].calculateAxisParameters();
      for (g = 0; g < p.length; g++) if (p[g] && p[g].scaleBreaks && p[g].scaleBreaks._appliedBreaks.length) for (var t = p[g].scaleBreaks._appliedBreaks, v = 0; v < t.length && !(t[v].startValue > p[g].viewportMaximum); v++) t[v].endValue < p[g].viewportMinimum || (s(p[g].scaleBreaks.firstBreakIndex) && (p[g].scaleBreaks.firstBreakIndex = v), t[v].startValue >= p[g].viewPortMinimum && (p[g].scaleBreaks.lastBreakIndex = v));
      for (var w = v = 0, u = 0, x = 0, z = 0, D = 0, y = 0, B, E, F = m = 0, I, J, L, t = I = J = L = !1, g = 0; g < p.length; g++) p[g] && p[g].title && (p[g]._titleTextBlock = new ja(p[g].ctx, {
        text: p[g].title,
        horizontalAlign: "center",
        fontSize: p[g].titleFontSize,
        fontFamily: p[g].titleFontFamily,
        fontWeight: p[g].titleFontWeight,
        fontColor: p[g].titleFontColor,
        fontStyle: p[g].titleFontStyle,
        borderColor: p[g].titleBorderColor,
        borderThickness: p[g].titleBorderThickness,
        backgroundColor: p[g].titleBackgroundColor,
        cornerRadius: p[g].titleCornerRadius,
        textBaseline: "top"
      }));
      for (g = 0; g < p.length; g++) if (p[g].title) switch (p[g]._position) {
        case "left":
          p[g]._titleTextBlock.maxWidth = p[g].titleMaxWidth || f.height;
          p[g]._titleTextBlock.maxHeight = p[g].titleWrap ? 0.8 * f.width : 1.5 * p[g].titleFontSize;
          p[g]._titleTextBlock.angle = -90;
          break;
        case "right":
          p[g]._titleTextBlock.maxWidth = p[g].titleMaxWidth || f.height;
          p[g]._titleTextBlock.maxHeight = p[g].titleWrap ? 0.8 * f.width : 1.5 * p[g].titleFontSize;
          p[g]._titleTextBlock.angle = 90;
          break;
        default:
          p[g]._titleTextBlock.maxWidth = p[g].titleMaxWidth || f.width, p[g]._titleTextBlock.maxHeight = p[g].titleWrap ? 0.8 * f.height : 1.5 * p[g].titleFontSize, p[g]._titleTextBlock.angle = 0;
      }
      if ("normal" === e) {
        for (var x = [], z = [], D = [], y = [], M = [], N = [], P = [], Q = []; 4 > v;) {
          var G = 0,
            R = 0,
            V = 0,
            Y = 0,
            X = e = 0,
            K = 0,
            $ = 0,
            U = 0,
            W = 0,
            O = 0,
            aa = 0;
          if (c && 0 < c.length) for (D = [], g = O = 0; g < c.length; g++) D.push(Math.ceil(c[g] ? c[g].createLabelsAndCalculateWidth() : 0)), O += D[g], K += c[g] && !l.isNavigator ? c[g].margin : 0;else D.push(Math.ceil(c[0] ? c[0].createLabelsAndCalculateWidth() : 0));
          P.push(D);
          if (b && 0 < b.length) for (y = [], g = aa = 0; g < b.length; g++) y.push(Math.ceil(b[g] ? b[g].createLabelsAndCalculateWidth() : 0)), aa += y[g], $ += b[g] ? b[g].margin : 0;else y.push(Math.ceil(b[0] ? b[0].createLabelsAndCalculateWidth() : 0));
          Q.push(y);
          n = Math.round(f.x1 + O + K);
          k = Math.round(f.x2 - aa - $ > l.width - q ? l.width - q : f.x2 - aa - $);
          if (a && 0 < a.length) for (x = [], g = U = 0; g < a.length; g++) a[g] && (a[g].lineCoordinates = {}), a[g].lineCoordinates.width = Math.abs(k - n), a[g].title && (a[g]._titleTextBlock.maxWidth = 0 < a[g].titleMaxWidth && a[g].titleMaxWidth < a[g].lineCoordinates.width ? a[g].titleMaxWidth : a[g].lineCoordinates.width), x.push(Math.ceil(a[g] ? a[g].createLabelsAndCalculateHeight() : 0)), U += x[g], e += a[g] && !l.isNavigator ? a[g].margin : 0;else x.push(Math.ceil(a[0] ? a[0].createLabelsAndCalculateHeight() : 0));
          M.push(x);
          if (d && 0 < d.length) for (z = [], g = W = 0; g < d.length; g++) d[g] && (d[g].lineCoordinates = {}), d[g].lineCoordinates.width = Math.abs(k - n), d[g].title && (d[g]._titleTextBlock.maxWidth = 0 < d[g].titleMaxWidth && d[g].titleMaxWidth < d[g].lineCoordinates.width ? d[g].titleMaxWidth : d[g].lineCoordinates.width), z.push(Math.ceil(d[g] ? d[g].createLabelsAndCalculateHeight() : 0)), W += z[g], X += d[g] && !l.isNavigator ? d[g].margin : 0;else z.push(Math.ceil(d[0] ? d[0].createLabelsAndCalculateHeight() : 0));
          N.push(z);
          if (a && 0 < a.length) for (g = 0; g < a.length; g++) a[g] && (a[g].lineCoordinates.x1 = n, k = Math.round(f.x2 - aa - $ > l.width - q ? l.width - q : f.x2 - aa - $), a[g]._labels && 1 < a[g]._labels.length && (m = h = 0, h = a[g]._labels[1], m = "dateTime" === a[g].valueType ? a[g]._labels[a[g]._labels.length - 2] : a[g]._labels[a[g]._labels.length - 1], w = h.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(h.textBlock.angle)) + (h.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(h.textBlock.angle)), u = m.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(m.textBlock.angle)) + (m.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(m.textBlock.angle))), !a[g] || !a[g].labelAutoFit || s(B) || s(E) || l.isNavigator || l.stockChart || (m = 0, 0 < a[g].labelAngle ? E + u > k && (m += 0 < a[g].labelAngle ? E + u - k - aa : 0) : 0 > a[g].labelAngle ? B - w < n && B - w < a[g].viewportMinimum && (F = n - (K + a[g].tickLength + D + B - w + a[g].labelFontSize / 2)) : 0 === a[g].labelAngle && (E + u > k && (m = E + u / 2 - k - aa), B - w < n && B - w < a[g].viewportMinimum && (F = n - K - a[g].tickLength - D - B + w / 2)), a[g].viewportMaximum === a[g].maximum && a[g].viewportMinimum === a[g].minimum && 0 < a[g].labelAngle && 0 < m ? k -= m : a[g].viewportMaximum === a[g].maximum && a[g].viewportMinimum === a[g].minimum && 0 > a[g].labelAngle && 0 < F ? n += F : a[g].viewportMaximum === a[g].maximum && a[g].viewportMinimum === a[g].minimum && 0 === a[g].labelAngle && (0 < F && (n += F), 0 < m && (k -= m))), l.panEnabled ? U = s(l.sessionVariables.axisX.height) ? l.sessionVariables.axisX.height = U : l.sessionVariables.axisX.height : l.sessionVariables.axisX.height = U, m = Math.round(f.y2 - U - e + G), h = Math.round(f.y2), a[g].lineCoordinates.x2 = k, a[g].lineCoordinates.width = k - n, a[g].lineCoordinates.y1 = m, a[g].lineCoordinates.y2 = m + a[g].lineThickness / 2, "inside" === a[g].labelPlacement && 0 < g && (a[g].lineCoordinates.y1 = a[g].lineCoordinates.y1 + x[g] - (a[g]._titleTextBlock ? a[g]._titleTextBlock.height : 0) - ("inside" === a[g].tickPlacement ? a[g].tickLength : 0), a[g].lineCoordinates.y2 = a[g].lineCoordinates.y1 + a[g].lineThickness / 2), a[g].bounds = {
            x1: n,
            y1: m,
            x2: k,
            y2: h - (U + e - x[g] - G),
            width: k - n,
            height: h - m
          }), G += x[g] + a[g].margin;
          if (d && 0 < d.length) for (g = 0; g < d.length; g++) d[g].lineCoordinates.x1 = Math.round(f.x1 + O + K), d[g].lineCoordinates.x2 = Math.round(f.x2 - aa - $ > l.width - q ? l.width - q : f.x2 - aa - $), d[g].lineCoordinates.width = Math.abs(k - n), d[g]._labels && 1 < d[g]._labels.length && (h = d[g]._labels[1], m = "dateTime" === d[g].valueType ? d[g]._labels[d[g]._labels.length - 2] : d[g]._labels[d[g]._labels.length - 1], w = h.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(h.textBlock.angle)) + (h.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(h.textBlock.angle)), u = m.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(m.textBlock.angle)) + (m.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(m.textBlock.angle))), l.panEnabled ? W = s(l.sessionVariables.axisX2.height) ? l.sessionVariables.axisX2.height = W : l.sessionVariables.axisX2.height : l.sessionVariables.axisX2.height = W, m = Math.round(f.y1), h = Math.round(f.y2 + d[g].margin), d[g].lineCoordinates.y1 = m + W + X - R, d[g].lineCoordinates.y2 = m, "inside" === d[g].labelPlacement && 0 < g && (d[g].lineCoordinates.y1 = d[g - 1].bounds.y1 - z[g] + (d[g]._titleTextBlock ? d[g]._titleTextBlock.height : 0)), d[g].bounds = {
            x1: n,
            y1: m + (W + X - z[g] - R),
            x2: k,
            y2: h,
            width: k - n,
            height: h - m
          }, R += z[g] + d[g].margin;
          if (c && 0 < c.length) for (g = 0; g < c.length; g++) K = l.isNavigator ? 0 : 10, c[g] && (n = Math.round(a[0] ? a[0].lineCoordinates.x1 : d[0].lineCoordinates.x1), K = c[g]._labels && 0 < c[g]._labels.length ? c[g]._labels[c[g]._labels.length - 1].textBlock.height / 2 : q, m = Math.round(f.y1 + W + X < Math.max(K, q) ? Math.max(K, q) : f.y1 + W + X), k = Math.round(a[0] ? a[0].lineCoordinates.x1 : d[0].lineCoordinates.x1), K = 0 < a.length ? 0 : c[g]._labels && 0 < c[g]._labels.length ? c[g]._labels[0].textBlock.height / 2 : q, h = Math.round(f.y2 - U - e - K), c[g].lineCoordinates = {
            x1: n - V,
            y1: m,
            x2: k - V,
            y2: h,
            height: Math.abs(h - m)
          }, "inside" === c[g].labelPlacement && 0 < g && (c[g].lineCoordinates.x1 = c[g].lineCoordinates.x1 - (D[g] - c[g]._titleTextBlock ? c[g]._titleTextBlock.height : 0) + ("outside" === c[g].tickPlacement ? c[g].tickLength : 0), c[g].lineCoordinates.x2 = c[g].lineCoordinates.x1 + c[g].lineThickness / 2), c[g].bounds = {
            x1: n - (D[g] + V),
            y1: m,
            x2: k,
            y2: h,
            width: k - n,
            height: h - m
          }, c[g].title && (c[g]._titleTextBlock.maxWidth = 0 < c[g].titleMaxWidth && c[g].titleMaxWidth < c[g].lineCoordinates.height ? c[g].titleMaxWidth : c[g].lineCoordinates.height), V += D[g] + c[g].margin);
          if (b && 0 < b.length) for (g = 0; g < b.length; g++) b[g] && (n = Math.round(a[0] ? a[0].lineCoordinates.x2 : d[0].lineCoordinates.x2), k = Math.round(n), K = b[g]._labels && 0 < b[g]._labels.length ? b[g]._labels[b[g]._labels.length - 1].textBlock.height / 2 : 0, m = Math.round(f.y1 + W + X < Math.max(K, q) ? Math.max(K, q) : f.y1 + W + X), K = 0 < a.length ? 0 : b[g]._labels && 0 < b[g]._labels.length ? b[g]._labels[0].textBlock.height / 2 : 0, h = Math.round(f.y2 - (U + e + K)), b[g].lineCoordinates = {
            x1: n + Y,
            y1: m,
            x2: n + Y,
            y2: h,
            height: Math.abs(h - m)
          }, "inside" === b[g].labelPlacement && 0 < g && (b[g].lineCoordinates.x1 = b[g].lineCoordinates.x1 + (y[g] - b[g]._titleTextBlock ? b[g]._titleTextBlock.height : 0) - ("outside" === b[g].tickPlacement ? b[g].tickLength : 0) - 2, b[g].lineCoordinates.x2 = b[g].lineCoordinates.x1 + b[g].lineThickness / 2), b[g].bounds = {
            x1: n,
            y1: m,
            x2: k + (y[g] + Y),
            y2: h,
            width: k - n,
            height: h - m
          }, b[g].title && (b[g]._titleTextBlock.maxWidth = 0 < b[g].titleMaxWidth && b[g].titleMaxWidth < b[g].lineCoordinates.height ? b[g].titleMaxWidth : b[g].lineCoordinates.height), Y += y[g] + b[g].margin);
          if (a && 0 < a.length) for (g = 0; g < a.length; g++) a[g] && (a[g].calculateValueToPixelConversionParameters(), a[g].calculateBreaksSizeInValues(), a[g]._labels && 1 < a[g]._labels.length && (B = (a[g].logarithmic ? Math.log(a[g]._labels[1].position / a[g].viewportMinimum) / a[g].conversionParameters.lnLogarithmBase : a[g]._labels[1].position - a[g].viewportMinimum) * Math.abs(a[g].conversionParameters.pixelPerUnit) + a[g].lineCoordinates.x1, n = a[g]._labels[a[g]._labels.length - ("dateTime" === a[g].valueType ? 2 : 1)].position, n = a[g].getApparentDifference(a[g].viewportMinimum, n), E = a[g].logarithmic ? (1 < n ? Math.log(n) / a[g].conversionParameters.lnLogarithmBase * Math.abs(a[g].conversionParameters.pixelPerUnit) : 0) + a[g].lineCoordinates.x1 : (0 < n ? n * Math.abs(a[g].conversionParameters.pixelPerUnit) : 0) + a[g].lineCoordinates.x1));
          if (d && 0 < d.length) for (g = 0; g < d.length; g++) d[g].calculateValueToPixelConversionParameters(), d[g].calculateBreaksSizeInValues(), d[g]._labels && 1 < d[g]._labels.length && (B = (d[g].logarithmic ? Math.log(d[g]._labels[1].position / d[g].viewportMinimum) / d[g].conversionParameters.lnLogarithmBase : d[g]._labels[1].position - d[g].viewportMinimum) * Math.abs(d[g].conversionParameters.pixelPerUnit) + d[g].lineCoordinates.x1, n = d[g]._labels[d[g]._labels.length - ("dateTime" === d[g].valueType ? 2 : 1)].position, n = d[g].getApparentDifference(d[g].viewportMinimum, n), E = d[g].logarithmic ? (1 < n ? Math.log(n) / d[g].conversionParameters.lnLogarithmBase * Math.abs(d[g].conversionParameters.pixelPerUnit) : 0) + d[g].lineCoordinates.x1 : (0 < n ? n * Math.abs(d[g].conversionParameters.pixelPerUnit) : 0) + d[g].lineCoordinates.x1);
          for (g = 0; g < p.length; g++) "axisY" === p[g].type && (p[g].calculateValueToPixelConversionParameters(), p[g].calculateBreaksSizeInValues());
          if (0 < v) {
            if (a && 0 < a.length) for (g = 0; g < a.length; g++) t = M[v - 1][g] === M[v][g] ? !0 : !1;else t = !0;
            if (d && 0 < d.length) for (g = 0; g < d.length; g++) I = N[v - 1][g] === N[v][g] ? !0 : !1;else I = !0;
            if (c && 0 < c.length) for (g = 0; g < c.length; g++) J = P[v - 1][g] === P[v][g] ? !0 : !1;else J = !0;
            if (b && 0 < b.length) for (g = 0; g < b.length; g++) L = Q[v - 1][g] === Q[v][g] ? !0 : !1;else L = !0;
          }
          if (t && I && J && L) break;
          v++;
        }
        if (a && 0 < a.length) for (g = 0; g < a.length; g++) a[g].calculateStripLinesThicknessInValues(), a[g].calculateBreaksInPixels();
        if (d && 0 < d.length) for (g = 0; g < d.length; g++) d[g].calculateStripLinesThicknessInValues(), d[g].calculateBreaksInPixels();
        if (c && 0 < c.length) for (g = 0; g < c.length; g++) c[g].calculateStripLinesThicknessInValues(), c[g].calculateBreaksInPixels();
        if (b && 0 < b.length) for (g = 0; g < b.length; g++) b[g].calculateStripLinesThicknessInValues(), b[g].calculateBreaksInPixels();
      } else {
        q = [];
        B = [];
        F = [];
        w = [];
        E = [];
        u = [];
        M = [];
        for (N = []; 4 > v;) {
          U = Y = R = V = $ = K = X = e = Q = P = G = W = 0;
          if (a && 0 < a.length) for (F = [], g = Y = 0; g < a.length; g++) F.push(Math.ceil(a[g] ? a[g].createLabelsAndCalculateWidth() : 0)), Y += F[g], e += a[g] && !l.isNavigator ? a[g].margin : 0;else F.push(Math.ceil(a[0] ? a[0].createLabelsAndCalculateWidth() : 0));
          M.push(F);
          if (d && 0 < d.length) for (w = [], g = U = 0; g < d.length; g++) w.push(Math.ceil(d[g] ? d[g].createLabelsAndCalculateWidth() : 0)), U += w[g], X += d[g] ? d[g].margin : 0;else w.push(Math.ceil(d[0] ? d[0].createLabelsAndCalculateWidth() : 0));
          N.push(w);
          if (c && 0 < c.length) for (g = 0; g < c.length; g++) c[g].lineCoordinates = {}, n = Math.round(f.x1 + Y + e), k = Math.round(f.x2 - U - X > l.width - 10 ? l.width - 10 : f.x2 - U - X), c[g].labelAutoFit && !s(x) && (0 < !a.length && (n = 0 > c[g].labelAngle ? Math.max(n, x) : 0 === c[g].labelAngle ? Math.max(n, x / 2) : n), 0 < !d.length && (k = 0 < c[g].labelAngle ? k - z / 2 : 0 === c[g].labelAngle ? k - z / 2 : k)), c[g].lineCoordinates.x1 = n, c[g].lineCoordinates.x2 = k, c[g].lineCoordinates.width = Math.abs(k - n), c[g].title && (c[g]._titleTextBlock.maxWidth = 0 < c[g].titleMaxWidth && c[g].titleMaxWidth < c[g].lineCoordinates.width ? c[g].titleMaxWidth : c[g].lineCoordinates.width);
          if (b && 0 < b.length) for (g = 0; g < b.length; g++) b[g].lineCoordinates = {}, n = Math.round(f.x1 + Y + e), k = Math.round(f.x2 - U - X > b[g].chart.width - 10 ? b[g].chart.width - 10 : f.x2 - U - X), b[g] && b[g].labelAutoFit && !s(D) && (0 < !a.length && (n = 0 < b[g].labelAngle ? Math.max(n, D) : 0 === b[g].labelAngle ? Math.max(n, D / 2) : n), 0 < !d.length && (k -= y / 2)), b[g].lineCoordinates.x1 = n, b[g].lineCoordinates.x2 = k, b[g].lineCoordinates.width = Math.abs(k - n), b[g].title && (b[g]._titleTextBlock.maxWidth = 0 < b[g].titleMaxWidth && b[g].titleMaxWidth < b[g].lineCoordinates.width ? b[g].titleMaxWidth : b[g].lineCoordinates.width);
          if (c && 0 < c.length) for (q = [], g = V = 0; g < c.length; g++) q.push(Math.ceil(c[g] ? c[g].createLabelsAndCalculateHeight() : 0)), V += q[g] + c[g].margin, K += c[g].margin;else q.push(Math.ceil(c[0] ? c[0].createLabelsAndCalculateHeight() : 0));
          E.push(q);
          if (b && 0 < b.length) for (B = [], g = R = 0; g < b.length; g++) B.push(Math.ceil(b[g] ? b[g].createLabelsAndCalculateHeight() : 0)), R += B[g], $ += b[g].margin;else B.push(Math.ceil(b[0] ? b[0].createLabelsAndCalculateHeight() : 0));
          u.push(B);
          if (c && 0 < c.length) for (g = 0; g < c.length; g++) 0 < c[g]._labels.length && (h = c[g]._labels[0], m = c[g]._labels[c[g]._labels.length - 1], x = h.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(h.textBlock.angle)) + (h.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(h.textBlock.angle)), z = m.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(m.textBlock.angle)) + (m.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(m.textBlock.angle)));
          if (b && 0 < b.length) for (g = 0; g < b.length; g++) b[g] && 0 < b[g]._labels.length && (h = b[g]._labels[0], m = b[g]._labels[b[g]._labels.length - 1], D = h.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(h.textBlock.angle)) + (h.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(h.textBlock.angle)), y = m.textBlock.width * Math.cos(Math.PI / 180 * Math.abs(m.textBlock.angle)) + (m.textBlock.height - m.textBlock.fontSize / 2) * Math.sin(Math.PI / 180 * Math.abs(m.textBlock.angle)));
          if (l.panEnabled) for (g = 0; g < c.length; g++) q[g] = s(l.sessionVariables.axisY.height) ? l.sessionVariables.axisY.height = q[g] : l.sessionVariables.axisY.height;else for (g = 0; g < c.length; g++) l.sessionVariables.axisY.height = q[g];
          if (c && 0 < c.length) for (g = c.length - 1; 0 <= g; g--) m = Math.round(f.y2), h = Math.round(f.y2 > c[g].chart.height ? c[g].chart.height : f.y2), c[g].lineCoordinates.y1 = m - (q[g] + c[g].margin + W), c[g].lineCoordinates.y2 = m - (q[g] + c[g].margin + W), "inside" === c[g].labelPlacement && 0 < g && (c[g].lineCoordinates.y1 = c[g].lineCoordinates.y1 + q[g] - (c[g]._titleTextBlock ? c[g]._titleTextBlock.height : 0) - ("inside" === c[g].tickPlacement ? c[g].tickLength : 0), c[g].lineCoordinates.y2 = c[g].lineCoordinates.y1 + c[g].lineThickness / 2), c[g].bounds = {
            x1: n,
            y1: m - (q[g] + W + c[g].margin),
            x2: k,
            y2: h - (W + c[g].margin),
            width: k - n,
            height: q[g]
          }, c[g].title && (c[g]._titleTextBlock.maxWidth = 0 < c[g].titleMaxWidth && c[g].titleMaxWidth < c[g].lineCoordinates.width ? c[g].titleMaxWidth : c[g].lineCoordinates.width), W += q[g] + c[g].margin;
          if (b && 0 < b.length) for (g = b.length - 1; 0 <= g; g--) b[g] && (m = Math.round(f.y1), h = Math.round(f.y1 + (B[g] + b[g].margin + G)), b[g].lineCoordinates.y1 = h, b[g].lineCoordinates.y2 = h, "inside" === b[g].labelPlacement && 0 < g && (b[g].lineCoordinates.y1 = h - B[g] + (b[g]._titleTextBlock ? b[g]._titleTextBlock.height : 0)), b[g].bounds = {
            x1: n,
            y1: m + (b[g].margin + G),
            x2: k,
            y2: h,
            width: k - n,
            height: R
          }, b[g].title && (b[g]._titleTextBlock.maxWidth = 0 < b[g].titleMaxWidth && b[g].titleMaxWidth < b[g].lineCoordinates.width ? b[g].titleMaxWidth : b[g].lineCoordinates.width), G += B[g] + b[g].margin);
          if (a && 0 < a.length) for (g = 0; g < a.length; g++) {
            K = a[g]._labels && 0 < a[g]._labels.length ? a[g]._labels[0].textBlock.fontSize / 2 : 0;
            n = Math.round(f.x1 + e);
            m = b && 0 < b.length ? Math.round(b[0] ? b[0].lineCoordinates.y2 : f.y1 < Math.max(K, 10) ? Math.max(K, 10) : f.y1) : f.y1 < Math.max(K, 10) ? Math.max(K, 10) : f.y1;
            k = Math.round(f.x1 + Y + e);
            h = c && 0 < c.length ? Math.round(c[0] ? c[0].lineCoordinates.y1 : f.y2 - V > l.height - Math.max(K, 10) ? l.height - Math.max(K, 10) : f.y2 - V) : f.y2 > l.height - Math.max(K, 10) ? l.height - Math.max(K, 10) : f.y2;
            if (c && 0 < c.length) for (K = 0; K < c.length; K++) c[K] && c[K].labelAutoFit && (k = 0 > c[K].labelAngle ? Math.max(k, x) : 0 === c[K].labelAngle ? Math.max(k, x / 2) : k, n = 0 > c[K].labelAngle || 0 === c[K].labelAngle ? k - Y : n);
            if (b && 0 < b.length) for (K = 0; K < b.length; K++) b[K] && b[K].labelAutoFit && (k = b[K].lineCoordinates.x1, n = k - Y);
            a[g].lineCoordinates = {
              x1: k - P,
              y1: m,
              x2: k - P,
              y2: h,
              height: Math.abs(h - m)
            };
            "inside" === a[g].labelPlacement && 0 < g && (a[g].lineCoordinates.x1 = a[g].lineCoordinates.x1 - (F[g] - (a[g]._titleTextBlock ? a[g]._titleTextBlock.height : 0)) + ("outside" === a[g].tickPlacement ? a[g].tickLength : 0), a[g].lineCoordinates.x2 = a[g].lineCoordinates.x1 + a[g].lineThickness / 2);
            a[g].bounds = {
              x1: k - (F[g] + P),
              y1: m,
              x2: k,
              y2: h,
              width: k - n,
              height: h - m
            };
            a[g].title && (a[g]._titleTextBlock.maxWidth = 0 < a[g].titleMaxWidth && a[g].titleMaxWidth < a[g].lineCoordinates.height ? a[g].titleMaxWidth : a[g].lineCoordinates.height);
            a[g].calculateValueToPixelConversionParameters();
            a[g].calculateBreaksSizeInValues();
            P += F[g] + a[g].margin;
          }
          if (d && 0 < d.length) for (g = 0; g < d.length; g++) {
            K = d[g]._labels && 0 < d[g]._labels.length ? d[g]._labels[0].textBlock.fontSize / 2 : 0;
            n = Math.round(f.x1 - e);
            m = b && 0 < b.length ? Math.round(b[0] ? b[0].lineCoordinates.y2 : f.y1 < Math.max(K, 10) ? Math.max(K, 10) : f.y1) : f.y1 < Math.max(K, 10) ? Math.max(K, 10) : f.y1;
            k = Math.round(f.x2 - U - X);
            h = c && 0 < c.length ? Math.round(c[0] ? c[0].lineCoordinates.y1 : f.y2 - V > l.height - Math.max(K, 10) ? l.height - Math.max(K, 10) : f.y2 - V) : f.y2 > l.height - Math.max(K, 10) ? l.height - Math.max(K, 10) : f.y2;
            if (c && 0 < c.length) for (K = 0; K < c.length; K++) c[K] && c[K].labelAutoFit && (k = 0 > c[K].labelAngle ? Math.max(k, x) : 0 === c[K].labelAngle ? Math.max(k, x / 2) : k, n = 0 > c[K].labelAngle || 0 === c[K].labelAngle ? k - U : n);
            if (b && 0 < b.length) for (K = 0; K < b.length; K++) b[K] && b[K].labelAutoFit && (k = b[K].lineCoordinates.x2, n = k - U);
            d[g].lineCoordinates = {
              x1: k + Q,
              y1: m,
              x2: k + Q,
              y2: h,
              height: Math.abs(h - m)
            };
            "inside" === d[g].labelPlacement && 0 < g && (d[g].lineCoordinates.x1 = d[g].lineCoordinates.x1 + (w[g] - (d[g]._titleTextBlock ? d[g]._titleTextBlock.height : 0) - 2) - ("outside" === d[g].tickPlacement ? d[g].tickLength : 0), d[g].lineCoordinates.x2 = d[g].lineCoordinates.x1 + d[g].lineThickness / 2);
            d[g].bounds = {
              x1: d[g].lineCoordinates.x1,
              y1: m,
              x2: k + w[g] + Q,
              y2: h,
              width: k - n,
              height: h - m
            };
            d[g].title && (d[g]._titleTextBlock.maxWidth = 0 < d[g].titleMaxWidth && d[g].titleMaxWidth < d[g].lineCoordinates.height ? d[g].titleMaxWidth : d[g].lineCoordinates.height);
            d[g].calculateValueToPixelConversionParameters();
            d[g].calculateBreaksSizeInValues();
            Q += w[g] + d[g].margin;
          }
          for (g = 0; g < p.length; g++) "axisY" === p[g].type && (p[g].calculateValueToPixelConversionParameters(), p[g].calculateBreaksSizeInValues());
          if (0 < v) {
            if (a && 0 < a.length) for (g = 0; g < a.length; g++) t = M[v - 1][g] === M[v][g] ? !0 : !1;else t = !0;
            if (d && 0 < d.length) for (g = 0; g < d.length; g++) I = N[v - 1][g] === N[v][g] ? !0 : !1;else I = !0;
            if (c && 0 < c.length) for (g = 0; g < c.length; g++) J = E[v - 1][g] === E[v][g] ? !0 : !1;else J = !0;
            if (b && 0 < b.length) for (g = 0; g < b.length; g++) L = u[v - 1][g] === u[v][g] ? !0 : !1;else L = !0;
          }
          if (t && I && J && L) break;
          v++;
        }
        if (c && 0 < c.length) for (g = 0; g < c.length; g++) c[g].calculateStripLinesThicknessInValues(), c[g].calculateBreaksInPixels();
        if (b && 0 < b.length) for (g = 0; g < b.length; g++) b[g].calculateStripLinesThicknessInValues(), b[g].calculateBreaksInPixels();
        if (a && 0 < a.length) for (g = 0; g < a.length; g++) a[g].calculateStripLinesThicknessInValues(), a[g].calculateBreaksInPixels();
        if (d && 0 < d.length) for (g = 0; g < d.length; g++) d[g].calculateStripLinesThicknessInValues(), d[g].calculateBreaksInPixels();
      }
    };
    E.render = function (a, d, c, b, e) {
      var f = a[0] ? a[0].chart : d[0].chart;
      e = f.ctx;
      var k = f._axes;
      f.alignVerticalAxes && f.alignVerticalAxes();
      e.save();
      e.beginPath();
      a[0] && e.rect(5, a[0].bounds.y1, a[0].chart.width - 10, a[0].bounds.height);
      d[0] && e.rect(5, d[d.length - 1].bounds.y1, d[0].chart.width - 10, d[0].bounds.height);
      e.clip();
      if (a && 0 < a.length) for (var m = 0; m < a.length; m++) a[m].renderLabelsTicksAndTitle();
      if (d && 0 < d.length) for (m = 0; m < d.length; m++) d[m].renderLabelsTicksAndTitle();
      e.restore();
      if (c && 0 < c.length) for (m = 0; m < c.length; m++) c[m].renderLabelsTicksAndTitle();
      if (b && 0 < b.length) for (m = 0; m < b.length; m++) b[m].renderLabelsTicksAndTitle();
      f.preparePlotArea();
      f = f.plotArea;
      e.save();
      e.beginPath();
      e.rect(f.x1, f.y1, Math.abs(f.x2 - f.x1), Math.abs(f.y2 - f.y1));
      e.clip();
      if (a && 0 < a.length) for (m = 0; m < k.length; m++) k[m].renderStripLinesOfThicknessType("value");
      if (d && 0 < d.length) for (m = 0; m < d.length; m++) d[m].renderStripLinesOfThicknessType("value");
      if (c && 0 < c.length) for (m = 0; m < c.length; m++) c[m].renderStripLinesOfThicknessType("value");
      if (b && 0 < b.length) for (m = 0; m < b.length; m++) b[m].renderStripLinesOfThicknessType("value");
      if (a && 0 < a.length) for (m = 0; m < a.length; m++) a[m].renderInterlacedColors();
      if (d && 0 < d.length) for (m = 0; m < d.length; m++) d[m].renderInterlacedColors();
      if (c && 0 < c.length) for (m = 0; m < c.length; m++) c[m].renderInterlacedColors();
      if (b && 0 < b.length) for (m = 0; m < b.length; m++) b[m].renderInterlacedColors();
      e.restore();
      if (a && 0 < a.length) for (m = 0; m < a.length; m++) a[m].renderGrid(), t && (a[m].createMask(), a[m].renderBreaksBackground());
      if (d && 0 < d.length) for (m = 0; m < d.length; m++) d[m].renderGrid(), t && (d[m].createMask(), d[m].renderBreaksBackground());
      if (c && 0 < c.length) for (m = 0; m < c.length; m++) c[m].renderGrid(), t && (c[m].createMask(), c[m].renderBreaksBackground());
      if (b && 0 < b.length) for (m = 0; m < b.length; m++) b[m].renderGrid(), t && (b[m].createMask(), b[m].renderBreaksBackground());
      if (a && 0 < a.length) for (m = 0; m < a.length; m++) a[m].renderAxisLine();
      if (d && 0 < d.length) for (m = 0; m < d.length; m++) d[m].renderAxisLine();
      if (c && 0 < c.length) for (m = 0; m < c.length; m++) c[m].renderAxisLine();
      if (b && 0 < b.length) for (m = 0; m < b.length; m++) b[m].renderAxisLine();
      if (a && 0 < a.length) for (m = 0; m < a.length; m++) a[m].renderStripLinesOfThicknessType("pixel");
      if (d && 0 < d.length) for (m = 0; m < d.length; m++) d[m].renderStripLinesOfThicknessType("pixel");
      if (c && 0 < c.length) for (m = 0; m < c.length; m++) c[m].renderStripLinesOfThicknessType("pixel");
      if (b && 0 < b.length) for (m = 0; m < b.length; m++) b[m].renderStripLinesOfThicknessType("pixel");
    };
    E.prototype.calculateStripLinesThicknessInValues = function () {
      for (var a = 0; a < this.stripLines.length; a++) if (null !== this.stripLines[a].startValue && null !== this.stripLines[a].endValue) {
        var d = Math.min(this.stripLines[a].startValue, this.stripLines[a].endValue),
          c = Math.max(this.stripLines[a].startValue, this.stripLines[a].endValue),
          d = this.getApparentDifference(d, c);
        this.stripLines[a].value = this.logarithmic ? this.stripLines[a].value * Math.sqrt(Math.log(this.stripLines[a].endValue / this.stripLines[a].startValue) / Math.log(d)) : this.stripLines[a].value + (Math.abs(this.stripLines[a].endValue - this.stripLines[a].startValue) - d) / 2;
        this.stripLines[a].thickness = d;
        this.stripLines[a]._thicknessType = "value";
      }
    };
    E.prototype.calculateBreaksSizeInValues = function () {
      for (var a = "left" === this._position || "right" === this._position ? this.lineCoordinates.height || this.chart.height : this.lineCoordinates.width || this.chart.width, d = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [], c = this.conversionParameters.pixelPerUnit || a / (this.logarithmic ? this.conversionParameters.maximum / this.conversionParameters.minimum : this.conversionParameters.maximum - this.conversionParameters.minimum), b = this.scaleBreaks && !s(this.scaleBreaks.options.spacing), e, f = 0; f < d.length; f++) e = b || !s(d[f].options.spacing), d[f].spacing = Sa(d[f].spacing, a, 8, e ? 0.1 * a : 8, e ? 0 : 3) << 0, d[f].size = 0 > d[f].spacing ? 0 : Math.abs(d[f].spacing / c), this.logarithmic && (d[f].size = Math.pow(this.logarithmBase, d[f].size));
    };
    E.prototype.calculateBreaksInPixels = function () {
      if (!(this.scaleBreaks && 0 >= this.scaleBreaks._appliedBreaks.length)) {
        var a = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [];
        a.length && (this.scaleBreaks.firstBreakIndex = this.scaleBreaks.lastBreakIndex = null);
        for (var d = 0; d < a.length && !(a[d].startValue > this.conversionParameters.maximum); d++) a[d].endValue < this.conversionParameters.minimum || (s(this.scaleBreaks.firstBreakIndex) && (this.scaleBreaks.firstBreakIndex = d), a[d].startValue >= this.conversionParameters.minimum && (a[d].startPixel = this.convertValueToPixel(a[d].startValue), this.scaleBreaks.lastBreakIndex = d), a[d].endValue <= this.conversionParameters.maximum && (a[d].endPixel = this.convertValueToPixel(a[d].endValue)));
      }
    };
    E.prototype.renderLabelsTicksAndTitle = function () {
      var a = this,
        d = !1,
        c = 0,
        b = 0,
        e = 1,
        f = 0;
      0 !== this.labelAngle && 360 !== this.labelAngle && (e = 1.2);
      if ("undefined" === typeof this.options.interval) {
        if ("bottom" === this._position || "top" === this._position) if (this.logarithmic && !this.equidistantInterval && this.labelAutoFit) {
          for (var c = [], e = 0 !== this.labelAngle && 360 !== this.labelAngle ? 1 : 1.2, k, m = this.viewportMaximum, l = this.lineCoordinates.width / Math.log(this.range), h = this._labels.length - 1; 0 <= h; h--) {
            q = this._labels[h];
            if (q.position < this.viewportMinimum) break;
            q.position > this.viewportMaximum || !(h === this._labels.length - 1 || k < Math.log(m / q.position) * l / e) || (c.push(q), m = q.position, k = q.textBlock.width * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.height * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)));
          }
          this._labels = c;
        } else {
          for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || (k = q.textBlock.width * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.height * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)), c += k);
          c > this.lineCoordinates.width * e && this.labelAutoFit && (d = !0);
        }
        if ("left" === this._position || "right" === this._position) if (this.logarithmic && !this.equidistantInterval && this.labelAutoFit) {
          for (var c = [], r, m = this.viewportMaximum, l = this.lineCoordinates.height / Math.log(this.range), h = this._labels.length - 1; 0 <= h; h--) {
            q = this._labels[h];
            if (q.position < this.viewportMinimum) break;
            q.position > this.viewportMaximum || !(h === this._labels.length - 1 || r < Math.log(m / q.position) * l) || (c.push(q), m = q.position, r = q.textBlock.height * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.width * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)));
          }
          this._labels = c;
        } else {
          for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || (r = q.textBlock.height * Math.abs(Math.cos(Math.PI / 180 * this.labelAngle)) + q.textBlock.width * Math.abs(Math.sin(Math.PI / 180 * this.labelAngle)), b += r);
          b > this.lineCoordinates.height * e && this.labelAutoFit && (d = !0);
        }
      }
      this.logarithmic && !this.equidistantInterval && this.labelAutoFit && this._labels.sort(function (a, b) {
        return a.position - b.position;
      });
      var h = 0,
        q,
        p;
      if ("bottom" === this._position) {
        for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || q.position > this.viewportMaximum || (p = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.tickPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, b = 1 === this.ctx.lineWidth % 2 ? (p.x << 0) + 0.5 : p.x << 0, this.ctx.beginPath(), this.ctx.moveTo(b, p.y << 0), this.ctx.lineTo(b, p.y + this.tickLength << 0), this.ctx.stroke()), d && 0 !== f++ % 2 && this.labelAutoFit || (0 === q.textBlock.angle ? (p.x -= q.textBlock.width / 2, p.y = "inside" === this.labelPlacement ? p.y - (("inside" === this.tickPlacement ? this.tickLength : 0) + q.textBlock.height - q.textBlock.fontSize / 2) : p.y + ("inside" === this.tickPlacement ? 0 : this.tickLength) + q.textBlock.fontSize / 2 + 5) : (p.x = "inside" === this.labelPlacement ? 0 > this.labelAngle ? p.x : p.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : p.x - (0 > this.labelAngle ? q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0), p.y = "inside" === this.labelPlacement ? 0 > this.labelAngle ? p.y - ("inside" === this.tickPlacement ? this.tickLength : 0) - 5 : p.y - ("inside" === this.tickPlacement ? 0 : this.tickLength) - Math.abs(q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + 5) : p.y + ("inside" === this.tickPlacement ? 0 : this.tickLength) + Math.abs(0 > this.labelAngle ? q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5)), q.textBlock.x = p.x, q.textBlock.y = p.y));
        "inside" === this.tickPlacement && this.chart.addEventListener("dataAnimationEnd", function () {
          for (h = 0; h < a._labels.length; h++) if (q = a._labels[h], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum) && (p = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
            a.ctx.lineWidth = a.tickThickness;
            a.ctx.strokeStyle = a.tickColor;
            var b = 1 === a.ctx.lineWidth % 2 ? (p.x << 0) + 0.5 : p.x << 0;
            a.ctx.save();
            a.ctx.beginPath();
            a.ctx.moveTo(b, p.y << 0);
            a.ctx.lineTo(b, p.y - a.tickLength << 0);
            a.ctx.stroke();
            a.ctx.restore();
          }
        }, this);
        this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2, this._titleTextBlock.y = this.bounds.y2 - this._titleTextBlock.height - 3, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0));
      } else if ("top" === this._position) {
        for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || q.position > this.viewportMaximum || (p = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.tickPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, b = 1 === this.ctx.lineWidth % 2 ? (p.x << 0) + 0.5 : p.x << 0, this.ctx.beginPath(), this.ctx.moveTo(b, p.y << 0), this.ctx.lineTo(b, p.y - this.tickLength << 0), this.ctx.stroke()), d && 0 !== f++ % 2 && this.labelAutoFit || (0 === q.textBlock.angle ? (p.x -= q.textBlock.width / 2, p.y = "inside" === this.labelPlacement ? p.y + this.labelFontSize / 2 + ("inside" === this.tickPlacement ? this.tickLength : 0) + 5 : p.y - (("inside" === this.tickPlacement ? 0 : this.tickLength) + q.textBlock.height - q.textBlock.fontSize / 2)) : (p.x = "inside" === this.labelPlacement ? 0 < this.labelAngle ? p.x : p.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : p.x + (q.textBlock.height - this.labelFontSize) * Math.sin(Math.PI / 180 * this.labelAngle) - (0 < this.labelAngle ? q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0), p.y = "inside" === this.labelPlacement ? 0 < this.labelAngle ? p.y + ("inside" === this.tickPlacement ? this.tickLength : 0) + 5 : p.y - q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) + ("inside" === this.tickPlacement ? this.tickLength : 0) + 5 : p.y - (("inside" === this.tickPlacement ? 0 : this.tickLength) + ((q.textBlock.height - q.textBlock.fontSize / 2) * Math.cos(Math.PI / 180 * this.labelAngle) + (0 < this.labelAngle ? q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0)))), q.textBlock.x = p.x, q.textBlock.y = p.y));
        "inside" === this.tickPlacement && this.chart.addEventListener("dataAnimationEnd", function () {
          for (h = 0; h < a._labels.length; h++) if (q = a._labels[h], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum) && (p = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
            a.ctx.lineWidth = a.tickThickness;
            a.ctx.strokeStyle = a.tickColor;
            var b = 1 === a.ctx.lineWidth % 2 ? (p.x << 0) + 0.5 : p.x << 0;
            a.ctx.save();
            a.ctx.beginPath();
            a.ctx.moveTo(b, p.y << 0);
            a.ctx.lineTo(b, p.y + a.tickLength << 0);
            a.ctx.stroke();
            a.ctx.restore();
          }
        }, this);
        this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.lineCoordinates.x1 + this.lineCoordinates.width / 2 - this._titleTextBlock.width / 2, this._titleTextBlock.y = this.bounds.y1 + 1, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0));
      } else if ("left" === this._position) {
        for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || q.position > this.viewportMaximum || (p = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.tickPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, b = 1 === this.ctx.lineWidth % 2 ? (p.y << 0) + 0.5 : p.y << 0, this.ctx.beginPath(), this.ctx.moveTo(p.x << 0, b), this.ctx.lineTo(p.x - this.tickLength << 0, b), this.ctx.stroke()), d && 0 !== f++ % 2 && this.labelAutoFit || (0 === this.labelAngle ? (q.textBlock.y = p.y, q.textBlock.x = "inside" === this.labelPlacement ? p.x + ("inside" === this.tickPlacement ? this.tickLength : 0) + 5 : p.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - ("inside" === this.tickPlacement ? 0 : this.tickLength) - 5) : (q.textBlock.y = "inside" === this.labelPlacement ? p.y : p.y - q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle), q.textBlock.x = "inside" === this.labelPlacement ? p.x + ("inside" === this.tickPlacement ? this.tickLength : 0) + 5 : 0 < this.labelAngle ? p.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - ("inside" === this.tickPlacement ? 0 : this.tickLength) - 5 : p.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + (q.textBlock.height - q.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) - ("inside" === this.tickPlacement ? 0 : this.tickLength))));
        "inside" === this.tickPlacement && this.chart.addEventListener("dataAnimationEnd", function () {
          for (h = 0; h < a._labels.length; h++) if (q = a._labels[h], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum) && (p = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
            a.ctx.lineWidth = a.tickThickness;
            a.ctx.strokeStyle = a.tickColor;
            var b = 1 === a.ctx.lineWidth % 2 ? (p.y << 0) + 0.5 : p.y << 0;
            a.ctx.save();
            a.ctx.beginPath();
            a.ctx.moveTo(p.x << 0, b);
            a.ctx.lineTo(p.x + a.tickLength << 0, b);
            a.ctx.stroke();
            a.ctx.restore();
          }
        }, this);
        this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.bounds.x1 + 1, this._titleTextBlock.y = this.lineCoordinates.height / 2 + this._titleTextBlock.width / 2 + this.lineCoordinates.y1, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0));
      } else if ("right" === this._position) {
        for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || q.position > this.viewportMaximum || (p = this.getPixelCoordinatesOnAxis(q.position), this.tickThickness && "inside" != this.tickPlacement && (this.ctx.lineWidth = this.tickThickness, this.ctx.strokeStyle = this.tickColor, b = 1 === this.ctx.lineWidth % 2 ? (p.y << 0) + 0.5 : p.y << 0, this.ctx.beginPath(), this.ctx.moveTo(p.x << 0, b), this.ctx.lineTo(p.x + this.tickLength << 0, b), this.ctx.stroke()), d && 0 !== f++ % 2 && this.labelAutoFit || (0 === this.labelAngle ? (q.textBlock.y = p.y, q.textBlock.x = "inside" === this.labelPlacement ? p.x - q.textBlock.width - ("inside" === this.tickPlacement ? this.tickLength : 0) - 5 : p.x + ("inside" === this.tickPlacement ? 0 : this.tickLength) + 5) : (q.textBlock.y = "inside" === this.labelPlacement ? p.y - q.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0 > this.labelAngle ? p.y : p.y - (q.textBlock.height - q.textBlock.fontSize / 2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle), q.textBlock.x = "inside" === this.labelPlacement ? p.x - q.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - ("inside" === this.tickPlacement ? this.tickLength : 0) - 5 : 0 < this.labelAngle ? p.x + (q.textBlock.height - q.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) + ("inside" === this.tickPlacement ? 0 : this.tickLength) : p.x + ("inside" === this.tickPlacement ? 0 : this.tickLength) + 5)));
        "inside" === this.tickPlacement && this.chart.addEventListener("dataAnimationEnd", function () {
          for (h = 0; h < a._labels.length; h++) if (q = a._labels[h], !(q.position < a.viewportMinimum || q.position > a.viewportMaximum) && (p = a.getPixelCoordinatesOnAxis(q.position), a.tickThickness)) {
            a.ctx.lineWidth = a.tickThickness;
            a.ctx.strokeStyle = a.tickColor;
            var b = 1 === a.ctx.lineWidth % 2 ? (p.y << 0) + 0.5 : p.y << 0;
            a.ctx.save();
            a.ctx.beginPath();
            a.ctx.moveTo(p.x << 0, b);
            a.ctx.lineTo(p.x - a.tickLength << 0, b);
            a.ctx.stroke();
            a.ctx.restore();
          }
        }, this);
        this.title && (this._titleTextBlock.measureText(), this._titleTextBlock.x = this.bounds.x2 - 1, this._titleTextBlock.y = this.lineCoordinates.height / 2 - this._titleTextBlock.width / 2 + this.lineCoordinates.y1, this.titleMaxWidth = this._titleTextBlock.maxWidth, this._titleTextBlock.render(!0));
      }
      f = 0;
      if ("inside" === this.labelPlacement) this.chart.addEventListener("dataAnimationEnd", function () {
        for (h = 0; h < a._labels.length; h++) q = a._labels[h], q.position < a.viewportMinimum || q.position > a.viewportMaximum || d && 0 !== f++ % 2 && a.labelAutoFit || (a.ctx.save(), a.ctx.beginPath(), q.textBlock.render(!0), a.ctx.restore());
      }, this);else for (h = 0; h < this._labels.length; h++) q = this._labels[h], q.position < this.viewportMinimum || q.position > this.viewportMaximum || d && 0 !== f++ % 2 && this.labelAutoFit || q.textBlock.render(!0);
    };
    E.prototype.renderInterlacedColors = function () {
      var a = this.chart.plotArea.ctx,
        d,
        c,
        b = this.chart.plotArea,
        e = 0;
      d = !0;
      if (("bottom" === this._position || "top" === this._position) && this.interlacedColor) for (a.fillStyle = this.interlacedColor, e = 0; e < this._labels.length; e++) d ? (d = this.getPixelCoordinatesOnAxis(this._labels[e].position), c = e + 1 > this._labels.length - 1 ? this.getPixelCoordinatesOnAxis(this.viewportMaximum) : this.getPixelCoordinatesOnAxis(this._labels[e + 1].position), a.fillRect(Math.min(c.x, d.x), b.y1, Math.abs(c.x - d.x), Math.abs(b.y1 - b.y2)), d = !1) : d = !0;else if (("left" === this._position || "right" === this._position) && this.interlacedColor) for (a.fillStyle = this.interlacedColor, e = 0; e < this._labels.length; e++) d ? (c = this.getPixelCoordinatesOnAxis(this._labels[e].position), d = e + 1 > this._labels.length - 1 ? this.getPixelCoordinatesOnAxis(this.viewportMaximum) : this.getPixelCoordinatesOnAxis(this._labels[e + 1].position), a.fillRect(b.x1, Math.min(c.y, d.y), Math.abs(b.x1 - b.x2), Math.abs(d.y - c.y)), d = !1) : d = !0;
      a.beginPath();
    };
    E.prototype.renderStripLinesOfThicknessType = function (a) {
      if (this.stripLines && 0 < this.stripLines.length && a) {
        for (var d = this, c, b = 0, e = 0, f = !1, k = !1, m = [], l = [], k = !1, b = 0; b < this.stripLines.length; b++) {
          var h = this.stripLines[b];
          h._thicknessType === a && ("pixel" === a && (h.value < this.viewportMinimum || h.value > this.viewportMaximum || s(h.value) || isNaN(this.range)) || m.push(h));
        }
        for (b = 0; b < this._stripLineLabels.length; b++) if (h = this.stripLines[b], c = this._stripLineLabels[b], !(c.position < this.viewportMinimum || c.position > this.viewportMaximum || isNaN(this.range))) {
          a = this.getPixelCoordinatesOnAxis(c.position);
          if ("outside" === c.stripLine.labelPlacement) {
            if (h && (this.ctx.strokeStyle = h.color, "pixel" === h._thicknessType && (this.ctx.lineWidth = h.thickness)), "bottom" === this._position) {
              var r = 1 === this.ctx.lineWidth % 2 ? (a.x << 0) + 0.5 : a.x << 0;
              this.ctx.beginPath();
              this.ctx.moveTo(r, a.y << 0);
              this.ctx.lineTo(r, a.y + this.tickLength << 0);
              this.ctx.stroke();
              0 === this.labelAngle ? (a.x -= c.textBlock.width / 2, a.y += this.tickLength + c.textBlock.fontSize / 2) : (a.x -= 0 > this.labelAngle ? c.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0, a.y += this.tickLength + Math.abs(0 > this.labelAngle ? c.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) - 5 : 5));
            } else "top" === this._position ? (r = 1 === this.ctx.lineWidth % 2 ? (a.x << 0) + 0.5 : a.x << 0, this.ctx.beginPath(), this.ctx.moveTo(r, a.y << 0), this.ctx.lineTo(r, a.y - this.tickLength << 0), this.ctx.stroke(), 0 === this.labelAngle ? (a.x -= c.textBlock.width / 2, a.y -= this.tickLength + c.textBlock.height) : (a.x += (c.textBlock.height - this.tickLength - this.labelFontSize / 2) * Math.sin(Math.PI / 180 * this.labelAngle) - (0 < this.labelAngle ? c.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) : 0), a.y -= this.tickLength + (c.textBlock.height * Math.cos(Math.PI / 180 * this.labelAngle) + (0 < this.labelAngle ? c.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle) : 0)))) : "left" === this._position ? (r = 1 === this.ctx.lineWidth % 2 ? (a.y << 0) + 0.5 : a.y << 0, this.ctx.beginPath(), this.ctx.moveTo(a.x << 0, r), this.ctx.lineTo(a.x - this.tickLength << 0, r), this.ctx.stroke(), 0 === this.labelAngle ? a.x = a.x - c.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5 : (a.y -= c.textBlock.width * Math.sin(Math.PI / 180 * this.labelAngle), a.x = 0 < this.labelAngle ? a.x - c.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) - this.tickLength - 5 : a.x - c.textBlock.width * Math.cos(Math.PI / 180 * this.labelAngle) + (c.textBlock.height - c.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) - this.tickLength)) : "right" === this._position && (r = 1 === this.ctx.lineWidth % 2 ? (a.y << 0) + 0.5 : a.y << 0, this.ctx.beginPath(), this.ctx.moveTo(a.x << 0, r), this.ctx.lineTo(a.x + this.tickLength << 0, r), this.ctx.stroke(), 0 === this.labelAngle ? a.x = a.x + this.tickLength + 5 : (a.y = 0 > this.labelAngle ? a.y : a.y - (c.textBlock.height - c.textBlock.fontSize / 2 - 5) * Math.cos(Math.PI / 180 * this.labelAngle), a.x = 0 < this.labelAngle ? a.x + (c.textBlock.height - c.textBlock.fontSize / 2 - 5) * Math.sin(Math.PI / 180 * this.labelAngle) + this.tickLength : a.x + this.tickLength + 5));
          } else c.textBlock.angle = -90, "bottom" === this._position ? (c.textBlock.maxWidth = this.options.stripLines[b].labelMaxWidth ? this.options.stripLines[b].labelMaxWidth : this.chart.plotArea.height - 3, c.textBlock.measureText(), a.x - c.textBlock.height > this.chart.plotArea.x1 ? s(h.startValue) ? a.x -= c.textBlock.height - c.textBlock.fontSize / 2 : a.x -= c.textBlock.height / 2 - c.textBlock.fontSize / 2 + 3 : (c.textBlock.angle = 90, s(h.startValue) ? a.x += c.textBlock.height - c.textBlock.fontSize / 2 : a.x += c.textBlock.height / 2 - c.textBlock.fontSize / 2 + 3), a.y = -90 === c.textBlock.angle ? "near" === c.stripLine.labelAlign ? this.chart.plotArea.y2 - 3 : "center" === c.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 + c.textBlock.width) / 2 : this.chart.plotArea.y1 + c.textBlock.width + 3 : "near" === c.stripLine.labelAlign ? this.chart.plotArea.y2 - c.textBlock.width - 3 : "center" === c.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 - c.textBlock.width) / 2 : this.chart.plotArea.y1 + 3) : "top" === this._position ? (c.textBlock.maxWidth = this.options.stripLines[b].labelMaxWidth ? this.options.stripLines[b].labelMaxWidth : this.chart.plotArea.height - 3, c.textBlock.measureText(), a.x - c.textBlock.height > this.chart.plotArea.x1 ? s(h.startValue) ? a.x -= c.textBlock.height - c.textBlock.fontSize / 2 : a.x -= c.textBlock.height / 2 - c.textBlock.fontSize / 2 + 3 : (c.textBlock.angle = 90, s(h.startValue) ? a.x += c.textBlock.height - c.textBlock.fontSize / 2 : a.x += c.textBlock.height / 2 - c.textBlock.fontSize / 2 + 3), a.y = -90 === c.textBlock.angle ? "near" === c.stripLine.labelAlign ? this.chart.plotArea.y1 + c.textBlock.width + 3 : "center" === c.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 + c.textBlock.width) / 2 : this.chart.plotArea.y2 - 3 : "near" === c.stripLine.labelAlign ? this.chart.plotArea.y1 + 3 : "center" === c.stripLine.labelAlign ? (this.chart.plotArea.y2 + this.chart.plotArea.y1 - c.textBlock.width) / 2 : this.chart.plotArea.y2 - c.textBlock.width - 3) : "left" === this._position ? (c.textBlock.maxWidth = this.options.stripLines[b].labelMaxWidth ? this.options.stripLines[b].labelMaxWidth : this.chart.plotArea.width - 3, c.textBlock.angle = 0, c.textBlock.measureText(), a.y - c.textBlock.height > this.chart.plotArea.y1 ? s(h.startValue) ? a.y -= c.textBlock.height - c.textBlock.fontSize / 2 : a.y -= c.textBlock.height / 2 - c.textBlock.fontSize + 3 : a.y - c.textBlock.height < this.chart.plotArea.y2 ? a.y += c.textBlock.fontSize / 2 + 3 : s(h.startValue) ? a.y -= c.textBlock.height - c.textBlock.fontSize / 2 : a.y -= c.textBlock.height / 2 - c.textBlock.fontSize + 3, a.x = "near" === c.stripLine.labelAlign ? this.chart.plotArea.x1 + 3 : "center" === c.stripLine.labelAlign ? (this.chart.plotArea.x2 + this.chart.plotArea.x1) / 2 - c.textBlock.width / 2 : this.chart.plotArea.x2 - c.textBlock.width - 3) : "right" === this._position && (c.textBlock.maxWidth = this.options.stripLines[b].labelMaxWidth ? this.options.stripLines[b].labelMaxWidth : this.chart.plotArea.width - 3, c.textBlock.angle = 0, c.textBlock.measureText(), a.y - +c.textBlock.height > this.chart.plotArea.y1 ? s(h.startValue) ? a.y -= c.textBlock.height - c.textBlock.fontSize / 2 : a.y -= c.textBlock.height / 2 - c.textBlock.fontSize / 2 - 3 : a.y - c.textBlock.height < this.chart.plotArea.y2 ? a.y += c.textBlock.fontSize / 2 + 3 : s(h.startValue) ? a.y -= c.textBlock.height - c.textBlock.fontSize / 2 : a.y -= c.textBlock.height / 2 - c.textBlock.fontSize / 2 + 3, a.x = "near" === c.stripLine.labelAlign ? this.chart.plotArea.x2 - c.textBlock.width - 3 : "center" === c.stripLine.labelAlign ? (this.chart.plotArea.x2 + this.chart.plotArea.x1) / 2 - c.textBlock.width / 2 : this.chart.plotArea.x1 + 3);
          c.textBlock.x = a.x;
          c.textBlock.y = a.y;
          l.push(c);
        }
        if (!k) {
          k = !1;
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
          this.ctx.clip();
          for (b = 0; b < m.length; b++) h = m[b], h.showOnTop ? f || (f = !0, this.chart.addEventListener("dataAnimationIterationEnd", function () {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
            this.ctx.clip();
            for (e = 0; e < m.length; e++) h = m[e], h.showOnTop && h.render();
            this.ctx.restore();
          }, h)) : h.render();
          for (b = 0; b < l.length; b++) c = l[b], c.stripLine.showOnTop ? k || (k = !0, this.chart.addEventListener("dataAnimationIterationEnd", function () {
            for (e = 0; e < l.length; e++) c = l[e], "inside" === c.stripLine.labelPlacement && c.stripLine.showOnTop && (d.ctx.save(), d.ctx.beginPath(), d.ctx.rect(d.chart.plotArea.x1, d.chart.plotArea.y1, d.chart.plotArea.width, d.chart.plotArea.height), d.ctx.clip(), c.textBlock.render(!0), d.ctx.restore());
          }, c.textBlock)) : "inside" === c.stripLine.labelPlacement && c.textBlock.render(!0);
          this.ctx.restore();
          k = !0;
        }
        if (k) for (k = !1, b = 0; b < l.length; b++) c = l[b], c.stripLine.showOnTop ? k || (k = !0, this.chart.addEventListener("dataAnimationIterationEnd", function () {
          for (e = 0; e < l.length; e++) c = l[e], "outside" === c.stripLine.labelPlacement && c.stripLine.showOnTop && c.textBlock.render(!0);
        }, c.textBlock)) : "outside" === c.stripLine.labelPlacement && c.textBlock.render(!0);
      }
    };
    E.prototype.renderBreaksBackground = function () {
      this.chart._breaksCanvas && this.scaleBreaks && 0 < this.scaleBreaks._appliedBreaks.length && this.maskCanvas && (this.chart._breaksCanvasCtx.save(), this.chart._breaksCanvasCtx.beginPath(), this.chart._breaksCanvasCtx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height), this.chart._breaksCanvasCtx.clip(), this.chart._breaksCanvasCtx.drawImage(this.maskCanvas, 0, 0, this.chart.width, this.chart.height), this.chart._breaksCanvasCtx.restore());
    };
    E.prototype.createMask = function () {
      if (this.scaleBreaks && 0 < this.scaleBreaks._appliedBreaks.length) {
        var a = this.scaleBreaks._appliedBreaks;
        t ? (this.maskCanvas = ta(this.chart.width, this.chart.height), this.maskCtx = this.maskCanvas.getContext("2d")) : (this.maskCanvas = this.chart.plotArea.canvas, this.maskCtx = this.chart.plotArea.ctx);
        this.maskCtx.save();
        this.maskCtx.beginPath();
        this.maskCtx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
        this.maskCtx.clip();
        for (var d = 0; d < a.length; d++) a[d].endValue < this.viewportMinimum || a[d].startValue > this.viewportMaximum || isNaN(this.range) || a[d].render(this.maskCtx);
        this.maskCtx.restore();
      }
    };
    E.prototype.renderCrosshair = function (a, d) {
      isFinite(this.minimum) && isFinite(this.maximum) && (this.crosshair.render(a, d), this.crosshair.dispatchEvent("updated", {
        chart: this.chart,
        crosshair: this.options,
        axis: this,
        value: this.crosshair.value
      }, this));
    };
    E.prototype.showCrosshair = function (a) {
      s(a) || a < this.viewportMinimum || a > this.viewportMaximum || ("top" === this._position || "bottom" === this._position ? this.crosshair.render(this.convertValueToPixel(a), null, a) : this.crosshair.render(null, this.convertValueToPixel(a), a));
    };
    E.prototype.renderGrid = function () {
      if (this.gridThickness && 0 < this.gridThickness) {
        var a = this.chart.ctx;
        a.save();
        var d,
          c = this.chart.plotArea;
        a.lineWidth = this.gridThickness;
        a.strokeStyle = this.gridColor;
        a.setLineDash && a.setLineDash(N(this.gridDashType, this.gridThickness));
        if ("bottom" === this._position || "top" === this._position) for (b = 0; b < this._labels.length; b++) this._labels[b].position < this.viewportMinimum || this._labels[b].position > this.viewportMaximum || this._labels[b].breaksLabelType || (a.beginPath(), d = this.getPixelCoordinatesOnAxis(this._labels[b].position), d = 1 === a.lineWidth % 2 ? (d.x << 0) + 0.5 : d.x << 0, a.moveTo(d, c.y1 << 0), a.lineTo(d, c.y2 << 0), a.stroke());else if ("left" === this._position || "right" === this._position) for (var b = 0; b < this._labels.length; b++) this._labels[b].position < this.viewportMinimum || this._labels[b].position > this.viewportMaximum || this._labels[b].breaksLabelType || (a.beginPath(), d = this.getPixelCoordinatesOnAxis(this._labels[b].position), d = 1 === a.lineWidth % 2 ? (d.y << 0) + 0.5 : d.y << 0, a.moveTo(c.x1 << 0, d), a.lineTo(c.x2 << 0, d), a.stroke());
        a.restore();
      }
    };
    E.prototype.renderAxisLine = function () {
      var a = this.chart.ctx,
        d = t ? this.chart._preRenderCtx : a,
        c = Math.ceil(this.tickThickness / (this.reversed ? -2 : 2)),
        b = Math.ceil(this.tickThickness / (this.reversed ? 2 : -2)),
        e,
        f;
      d.save();
      if ("bottom" === this._position || "top" === this._position) {
        if (this.lineThickness) {
          this.reversed ? (e = this.lineCoordinates.x2, f = this.lineCoordinates.x1) : (e = this.lineCoordinates.x1, f = this.lineCoordinates.x2);
          d.lineWidth = this.lineThickness;
          d.strokeStyle = this.lineColor ? this.lineColor : "black";
          d.setLineDash && d.setLineDash(N(this.lineDashType, this.lineThickness));
          var k = 1 === this.lineThickness % 2 ? (this.lineCoordinates.y1 << 0) + 0.5 : this.lineCoordinates.y1 << 0;
          d.beginPath();
          if (this.scaleBreaks && !s(this.scaleBreaks.firstBreakIndex)) if (s(this.scaleBreaks.lastBreakIndex)) e = this.scaleBreaks._appliedBreaks[this.scaleBreaks.firstBreakIndex].endPixel + b;else for (var m = this.scaleBreaks.firstBreakIndex; m <= this.scaleBreaks.lastBreakIndex; m++) d.moveTo(e, k), d.lineTo(this.scaleBreaks._appliedBreaks[m].startPixel + c, k), e = this.scaleBreaks._appliedBreaks[m].endPixel + b;
          e && (d.moveTo(e, k), d.lineTo(f, k));
          d.stroke();
        }
      } else if (("left" === this._position || "right" === this._position) && this.lineThickness) {
        this.reversed ? (e = this.lineCoordinates.y1, f = this.lineCoordinates.y2) : (e = this.lineCoordinates.y2, f = this.lineCoordinates.y1);
        d.lineWidth = this.lineThickness;
        d.strokeStyle = this.lineColor;
        d.setLineDash && d.setLineDash(N(this.lineDashType, this.lineThickness));
        k = 1 === this.lineThickness % 2 ? (this.lineCoordinates.x1 << 0) + 0.5 : this.lineCoordinates.x1 << 0;
        d.beginPath();
        if (this.scaleBreaks && !s(this.scaleBreaks.firstBreakIndex)) if (s(this.scaleBreaks.lastBreakIndex)) e = this.scaleBreaks._appliedBreaks[this.scaleBreaks.firstBreakIndex].endPixel + c;else for (m = this.scaleBreaks.firstBreakIndex; m <= this.scaleBreaks.lastBreakIndex; m++) d.moveTo(k, e), d.lineTo(k, this.scaleBreaks._appliedBreaks[m].startPixel + b), e = this.scaleBreaks._appliedBreaks[m].endPixel + c;
        e && (d.moveTo(k, e), d.lineTo(k, f));
        d.stroke();
      }
      t && (a.drawImage(this.chart._preRenderCanvas, 0, 0, this.chart.width, this.chart.height), this.chart._breaksCanvasCtx && this.chart._breaksCanvasCtx.drawImage(this.chart._preRenderCanvas, 0, 0, this.chart.width, this.chart.height), d.clearRect(0, 0, this.chart.width, this.chart.height));
      d.restore();
    };
    E.prototype.getPixelCoordinatesOnAxis = function (a) {
      var d = {};
      if ("bottom" === this._position || "top" === this._position) d.x = this.convertValueToPixel(a), d.y = this.lineCoordinates.y1;
      if ("left" === this._position || "right" === this._position) d.y = this.convertValueToPixel(a), d.x = this.lineCoordinates.x2;
      return d;
    };
    E.prototype.convertPixelToValue = function (a) {
      if ("undefined" === typeof a) return null;
      var d = 0,
        c = 0,
        b,
        d = !0,
        e = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [],
        c = "number" === typeof a ? a : "left" === this._position || "right" === this._position ? a.y : a.x;
      if (this.logarithmic) {
        a = b = Math.pow(this.logarithmBase, (c - this.conversionParameters.reference) / this.conversionParameters.pixelPerUnit);
        if (c <= this.conversionParameters.reference === ("left" === this._position || "right" === this._position) !== this.reversed) for (c = 0; c < e.length; c++) {
          if (!(e[c].endValue < this.conversionParameters.minimum)) if (d) {
            if (e[c].startValue < this.conversionParameters.minimum) {
              if (1 < e[c].size && this.conversionParameters.minimum * Math.pow(e[c].endValue / e[c].startValue, Math.log(b) / Math.log(e[c].size)) < e[c].endValue) {
                a = Math.pow(e[c].endValue / e[c].startValue, Math.log(b) / Math.log(e[c].size));
                break;
              } else a *= e[c].endValue / this.conversionParameters.minimum / Math.pow(e[c].size, Math.log(e[c].endValue / this.conversionParameters.minimum) / Math.log(e[c].endValue / e[c].startValue)), b /= Math.pow(e[c].size, Math.log(e[c].endValue / this.conversionParameters.minimum) / Math.log(e[c].endValue / e[c].startValue));
              d = !1;
            } else if (b > e[c].startValue / this.conversionParameters.minimum) {
              b /= e[c].startValue / this.conversionParameters.minimum;
              if (b < e[c].size) {
                a *= Math.pow(e[c].endValue / e[c].startValue, 1 === e[c].size ? 1 : Math.log(b) / Math.log(e[c].size)) / b;
                break;
              } else a *= e[c].endValue / e[c].startValue / e[c].size;
              b /= e[c].size;
              d = !1;
            } else break;
          } else if (b > e[c].startValue / e[c - 1].endValue) {
            b /= e[c].startValue / e[c - 1].endValue;
            if (b < e[c].size) {
              a *= Math.pow(e[c].endValue / e[c].startValue, 1 === e[c].size ? 1 : Math.log(b) / Math.log(e[c].size)) / b;
              break;
            } else a *= e[c].endValue / e[c].startValue / e[c].size;
            b /= e[c].size;
          } else break;
        } else for (c = e.length - 1; 0 <= c; c--) if (!(e[c].startValue > this.conversionParameters.minimum)) if (d) {
          if (e[c].endValue > this.conversionParameters.minimum) {
            if (1 < e[c].size && this.conversionParameters.minimum * Math.pow(e[c].endValue / e[c].startValue, Math.log(b) / Math.log(e[c].size)) > e[c].startValue) {
              a = Math.pow(e[c].endValue / e[c].startValue, Math.log(b) / Math.log(e[c].size));
              break;
            } else a *= e[c].startValue / this.conversionParameters.minimum * Math.pow(e[c].size, Math.log(e[c].startValue / this.conversionParameters.minimum) / Math.log(e[c].endValue / e[c].startValue)) * b, b *= Math.pow(e[c].size, Math.log(this.conversionParameters.minimum / e[c].startValue) / Math.log(e[c].endValue / e[c].startValue));
            d = !1;
          } else if (b < e[c].endValue / this.conversionParameters.minimum) {
            b /= e[c].endValue / this.conversionParameters.minimum;
            if (b > 1 / e[c].size) {
              a *= Math.pow(e[c].endValue / e[c].startValue, 1 >= e[c].size ? 1 : Math.log(b) / Math.log(e[c].size)) * b;
              break;
            } else a /= e[c].endValue / e[c].startValue / e[c].size;
            b *= e[c].size;
            d = !1;
          } else break;
        } else if (b < e[c].endValue / e[c + 1].startValue) {
          b /= e[c].endValue / e[c + 1].startValue;
          if (b > 1 / e[c].size) {
            a *= Math.pow(e[c].endValue / e[c].startValue, 1 >= e[c].size ? 1 : Math.log(b) / Math.log(e[c].size)) * b;
            break;
          } else a /= e[c].endValue / e[c].startValue / e[c].size;
          b *= e[c].size;
        } else break;
        d = a * this.viewportMinimum;
      } else {
        a = b = (c - this.conversionParameters.reference) / this.conversionParameters.pixelPerUnit;
        if (c <= this.conversionParameters.reference === ("left" === this._position || "right" === this._position) !== this.reversed) for (c = 0; c < e.length; c++) {
          if (!(e[c].endValue < this.conversionParameters.minimum)) if (d) {
            if (e[c].startValue < this.conversionParameters.minimum) {
              if (e[c].size && this.conversionParameters.minimum + b * (e[c].endValue - e[c].startValue) / e[c].size < e[c].endValue) {
                a = 0 >= e[c].size ? 0 : b * (e[c].endValue - e[c].startValue) / e[c].size;
                break;
              } else a += e[c].endValue - this.conversionParameters.minimum - e[c].size * (e[c].endValue - this.conversionParameters.minimum) / (e[c].endValue - e[c].startValue), b -= e[c].size * (e[c].endValue - this.conversionParameters.minimum) / (e[c].endValue - e[c].startValue);
              d = !1;
            } else if (b > e[c].startValue - this.conversionParameters.minimum) {
              b -= e[c].startValue - this.conversionParameters.minimum;
              if (b < e[c].size) {
                a += (e[c].endValue - e[c].startValue) * (0 === e[c].size ? 1 : b / e[c].size) - b;
                break;
              } else a += e[c].endValue - e[c].startValue - e[c].size;
              b -= e[c].size;
              d = !1;
            } else break;
          } else if (b > e[c].startValue - e[c - 1].endValue) {
            b -= e[c].startValue - e[c - 1].endValue;
            if (b < e[c].size) {
              a += (e[c].endValue - e[c].startValue) * (0 === e[c].size ? 1 : b / e[c].size) - b;
              break;
            } else a += e[c].endValue - e[c].startValue - e[c].size;
            b -= e[c].size;
          } else break;
        } else for (c = e.length - 1; 0 <= c; c--) if (!(e[c].startValue > this.conversionParameters.minimum)) if (d) {
          if (e[c].endValue > this.conversionParameters.minimum) {
            if (e[c].size && this.conversionParameters.minimum + b * (e[c].endValue - e[c].startValue) / e[c].size > e[c].startValue) {
              a = 0 >= e[c].size ? 0 : b * (e[c].endValue - e[c].startValue) / e[c].size;
              break;
            } else a += e[c].startValue - this.conversionParameters.minimum + e[c].size * (this.conversionParameters.minimum - e[c].startValue) / (e[c].endValue - e[c].startValue), b += e[c].size * (this.conversionParameters.minimum - e[c].startValue) / (e[c].endValue - e[c].startValue), d = !1;
          } else if (b < e[c].endValue - this.conversionParameters.minimum) {
            b -= e[c].endValue - this.conversionParameters.minimum;
            if (b > -1 * e[c].size) {
              a += (e[c].endValue - e[c].startValue) * (0 === e[c].size ? 1 : b / e[c].size) + b;
              break;
            } else a -= e[c].endValue - e[c].startValue - e[c].size;
            b += e[c].size;
            d = !1;
          } else break;
        } else if (b < e[c].endValue - e[c + 1].startValue) {
          b -= e[c].endValue - e[c + 1].startValue;
          if (b > -1 * e[c].size) {
            a += (e[c].endValue - e[c].startValue) * (0 === e[c].size ? 1 : b / e[c].size) + b;
            break;
          } else a -= e[c].endValue - e[c].startValue - e[c].size;
          b += e[c].size;
        } else break;
        d = this.conversionParameters.minimum + a;
      }
      return d;
    };
    E.prototype.convertValueToPixel = function (a) {
      a = this.getApparentDifference(this.conversionParameters.minimum, a, a);
      return this.logarithmic ? this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * Math.log(a / this.conversionParameters.minimum) / this.conversionParameters.lnLogarithmBase + 0.5 << 0 : "axisX" === this.type ? this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * (a - this.conversionParameters.minimum) + 0.5 << 0 : this.conversionParameters.reference + this.conversionParameters.pixelPerUnit * (a - this.conversionParameters.minimum) + 0.5;
    };
    E.prototype.getApparentDifference = function (a, d, c, b) {
      var e = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [];
      if (this.logarithmic) {
        c = s(c) ? d / a : c;
        for (var f = 0; f < e.length && !(d < e[f].startValue); f++) a > e[f].endValue || (a <= e[f].startValue && d >= e[f].endValue ? c = c / e[f].endValue * e[f].startValue * e[f].size : a >= e[f].startValue && d >= e[f].endValue ? c = c / e[f].endValue * a * Math.pow(e[f].size, Math.log(e[f].endValue / a) / Math.log(e[f].endValue / e[f].startValue)) : a <= e[f].startValue && d <= e[f].endValue ? c = c / d * e[f].startValue * Math.pow(e[f].size, Math.log(d / e[f].startValue) / Math.log(e[f].endValue / e[f].startValue)) : !b && a > e[f].startValue && d < e[f].endValue && (c = a * Math.pow(e[f].size, Math.log(d / a) / Math.log(e[f].endValue / e[f].startValue))));
      } else for (c = s(c) ? Math.abs(d - a) : c, f = 0; f < e.length && !(d < e[f].startValue); f++) a > e[f].endValue || (a <= e[f].startValue && d >= e[f].endValue ? c = c - e[f].endValue + e[f].startValue + e[f].size : a > e[f].startValue && d >= e[f].endValue ? c = c - e[f].endValue + a + e[f].size * (e[f].endValue - a) / (e[f].endValue - e[f].startValue) : a <= e[f].startValue && d < e[f].endValue ? c = c - d + e[f].startValue + e[f].size * (d - e[f].startValue) / (e[f].endValue - e[f].startValue) : !b && a > e[f].startValue && d < e[f].endValue && (c = a + e[f].size * (d - a) / (e[f].endValue - e[f].startValue)));
      return c;
    };
    E.prototype.setViewPortRange = function (a, d) {
      this.sessionVariables.newViewportMinimum = this.viewportMinimum = Math.min(a, d);
      this.sessionVariables.newViewportMaximum = this.viewportMaximum = Math.max(a, d);
    };
    E.prototype.getXValueAt = function (a) {
      if (!a) return null;
      var d = null;
      "left" === this._position ? d = this.convertPixelToValue(a.y) : "bottom" === this._position && (d = this.convertPixelToValue(a.x));
      return d;
    };
    E.prototype.calculateValueToPixelConversionParameters = function (a) {
      a = this.scaleBreaks ? this.scaleBreaks._appliedBreaks : [];
      var d = {
          pixelPerUnit: null,
          minimum: null,
          reference: null
        },
        c = this.lineCoordinates.width,
        b = this.lineCoordinates.height,
        c = "bottom" === this._position || "top" === this._position ? c : b,
        b = Math.abs(this.range);
      if (this.logarithmic) for (var e = 0; e < a.length && !(this.viewportMaximum < a[e].startValue); e++) this.viewportMinimum > a[e].endValue || (this.viewportMinimum >= a[e].startValue && this.viewportMaximum <= a[e].endValue ? c = 0 : this.viewportMinimum <= a[e].startValue && this.viewportMaximum >= a[e].endValue ? (b = b / a[e].endValue * a[e].startValue, c = 0 < a[e].spacing.toString().indexOf("%") ? c * (1 - parseFloat(a[e].spacing) / 100) : c - Math.min(a[e].spacing, 0.1 * c)) : this.viewportMinimum > a[e].startValue && this.viewportMaximum >= a[e].endValue ? (b = b / a[e].endValue * this.viewportMinimum, c = 0 < a[e].spacing.toString().indexOf("%") ? c * (1 - parseFloat(a[e].spacing) / 100 * Math.log(a[e].endValue / this.viewportMinimum) / Math.log(a[e].endValue / a[e].startValue)) : c - Math.min(a[e].spacing, 0.1 * c) * Math.log(a[e].endValue / this.viewportMinimum) / Math.log(a[e].endValue / a[e].startValue)) : this.viewportMinimum <= a[e].startValue && this.viewportMaximum < a[e].endValue && (b = b / this.viewportMaximum * a[e].startValue, c = 0 < a[e].spacing.toString().indexOf("%") ? c * (1 - parseFloat(a[e].spacing) / 100 * Math.log(this.viewportMaximum / a[e].startValue) / Math.log(a[e].endValue / a[e].startValue)) : c - Math.min(a[e].spacing, 0.1 * c) * Math.log(this.viewportMaximum / a[e].startValue) / Math.log(a[e].endValue / a[e].startValue)));else for (e = 0; e < a.length && !(this.viewportMaximum < a[e].startValue); e++) this.viewportMinimum > a[e].endValue || (this.viewportMinimum >= a[e].startValue && this.viewportMaximum <= a[e].endValue ? c = 0 : this.viewportMinimum <= a[e].startValue && this.viewportMaximum >= a[e].endValue ? (b = b - a[e].endValue + a[e].startValue, c = 0 < a[e].spacing.toString().indexOf("%") ? c * (1 - parseFloat(a[e].spacing) / 100) : c - Math.min(a[e].spacing, 0.1 * c)) : this.viewportMinimum > a[e].startValue && this.viewportMaximum >= a[e].endValue ? (b = b - a[e].endValue + this.viewportMinimum, c = 0 < a[e].spacing.toString().indexOf("%") ? c * (1 - parseFloat(a[e].spacing) / 100 * (a[e].endValue - this.viewportMinimum) / (a[e].endValue - a[e].startValue)) : c - Math.min(a[e].spacing, 0.1 * c) * (a[e].endValue - this.viewportMinimum) / (a[e].endValue - a[e].startValue)) : this.viewportMinimum <= a[e].startValue && this.viewportMaximum < a[e].endValue && (b = b - this.viewportMaximum + a[e].startValue, c = 0 < a[e].spacing.toString().indexOf("%") ? c * (1 - parseFloat(a[e].spacing) / 100 * (this.viewportMaximum - a[e].startValue) / (a[e].endValue - a[e].startValue)) : c - Math.min(a[e].spacing, 0.1 * c) * (this.viewportMaximum - a[e].startValue) / (a[e].endValue - a[e].startValue)));
      d.minimum = this.viewportMinimum;
      d.maximum = this.viewportMaximum;
      d.range = b;
      if ("bottom" === this._position || "top" === this._position) this.logarithmic ? (d.lnLogarithmBase = Math.log(this.logarithmBase), d.pixelPerUnit = (this.reversed ? -1 : 1) * c * d.lnLogarithmBase / Math.log(Math.abs(b))) : d.pixelPerUnit = (this.reversed ? -1 : 1) * c / Math.abs(b), d.reference = this.reversed ? this.lineCoordinates.x2 : this.lineCoordinates.x1;
      if ("left" === this._position || "right" === this._position) this.logarithmic ? (d.lnLogarithmBase = Math.log(this.logarithmBase), d.pixelPerUnit = (this.reversed ? 1 : -1) * c * d.lnLogarithmBase / Math.log(Math.abs(b))) : d.pixelPerUnit = (this.reversed ? 1 : -1) * c / Math.abs(b), d.reference = this.reversed ? this.lineCoordinates.y1 : this.lineCoordinates.y2;
      this.conversionParameters = d;
    };
    E.prototype.calculateAxisParameters = function () {
      if (this.logarithmic) this.calculateLogarithmicAxisParameters();else {
        var a = this.chart.layoutManager.getFreeSpace(),
          d = !1,
          c = !1;
        "bottom" === this._position || "top" === this._position ? (this.maxWidth = a.width, this.maxHeight = a.height) : (this.maxWidth = a.height, this.maxHeight = a.width);
        var a = "axisX" === this.type ? "xySwapped" === this.chart.plotInfo.axisPlacement ? 62 : 70 : "xySwapped" === this.chart.plotInfo.axisPlacement ? 50 : 40,
          b = 4;
        "axisX" === this.type && (b = 600 > this.maxWidth ? 8 : 6);
        var a = Math.max(b, Math.floor(this.maxWidth / a)),
          e,
          f,
          k,
          b = 0;
        !s(this.options.viewportMinimum) && !s(this.options.viewportMaximum) && this.options.viewportMinimum >= this.options.viewportMaximum && (this.viewportMinimum = this.viewportMaximum = null);
        if (s(this.options.viewportMinimum) && !s(this.sessionVariables.newViewportMinimum) && !isNaN(this.sessionVariables.newViewportMinimum)) this.viewportMinimum = this.sessionVariables.newViewportMinimum;else if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = this.minimum;
        if (s(this.options.viewportMaximum) && !s(this.sessionVariables.newViewportMaximum) && !isNaN(this.sessionVariables.newViewportMaximum)) this.viewportMaximum = this.sessionVariables.newViewportMaximum;else if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = this.maximum;
        if (this.scaleBreaks) for (b = 0; b < this.scaleBreaks._appliedBreaks.length; b++) if ((!s(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum >= this.scaleBreaks._appliedBreaks[b].startValue || !s(this.options.minimum) && this.options.minimum >= this.scaleBreaks._appliedBreaks[b].startValue || !s(this.options.viewportMinimum) && this.viewportMinimum >= this.scaleBreaks._appliedBreaks[b].startValue) && (!s(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum <= this.scaleBreaks._appliedBreaks[b].endValue || !s(this.options.maximum) && this.options.maximum <= this.scaleBreaks._appliedBreaks[b].endValue || !s(this.options.viewportMaximum) && this.viewportMaximum <= this.scaleBreaks._appliedBreaks[b].endValue)) {
          this.scaleBreaks._appliedBreaks.splice(b, 1);
          break;
        }
        if ("axisX" === this.type) {
          if (this.dataSeries && 0 < this.dataSeries.length) for (e = 0; e < this.dataSeries.length; e++) "dateTime" === this.dataSeries[e].xValueType && (c = !0);
          e = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin;
          f = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax;
          0 === f - e && (b = "undefined" === typeof this.options.interval ? 0.4 : this.options.interval, f += b, e -= b);
          Infinity !== this.dataInfo.minDiff ? k = this.dataInfo.minDiff : 1 < f - e ? k = 0.5 * Math.abs(f - e) : (k = 1, c && (d = !0));
        } else "axisY" === this.type && (e = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin, f = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax, isFinite(e) || isFinite(f) ? isFinite(e) ? isFinite(f) || (f = e) : e = f : (f = "undefined" === typeof this.options.interval ? -Infinity : this.options.interval, e = "undefined" !== typeof this.options.interval || isFinite(this.dataInfo.minDiff) ? 0 : Infinity), 0 === e && 0 === f ? (f += 9, e = 0) : 0 === f - e ? (b = Math.min(Math.abs(0.01 * Math.abs(f)), 5), f += b, e -= b) : e > f ? (b = Math.min(0.01 * Math.abs(this.getApparentDifference(f, e, null, !0)), 5), 0 <= f ? e = f - b : f = isFinite(e) ? e + b : 0) : (b = Math.min(0.01 * Math.abs(this.getApparentDifference(e, f, null, !0)), 0.05), 0 !== f && (f += b), 0 !== e && (e -= b)), k = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : 1 < f - e ? 0.5 * Math.abs(f - e) : 1, this.includeZero && (null === this.viewportMinimum || isNaN(this.viewportMinimum)) && 0 < e && (e = 0), this.includeZero && (null === this.viewportMaximum || isNaN(this.viewportMaximum)) && 0 > f && (f = 0));
        b = this.getApparentDifference(isNaN(this.viewportMinimum) || null === this.viewportMinimum ? e : this.viewportMinimum, isNaN(this.viewportMaximum) || null === this.viewportMaximum ? f : this.viewportMaximum, null, !0);
        if ("axisX" === this.type && c) {
          this.intervalType || (b / 1 <= a ? (this.interval = 1, this.intervalType = "millisecond") : b / 2 <= a ? (this.interval = 2, this.intervalType = "millisecond") : b / 5 <= a ? (this.interval = 5, this.intervalType = "millisecond") : b / 10 <= a ? (this.interval = 10, this.intervalType = "millisecond") : b / 20 <= a ? (this.interval = 20, this.intervalType = "millisecond") : b / 50 <= a ? (this.interval = 50, this.intervalType = "millisecond") : b / 100 <= a ? (this.interval = 100, this.intervalType = "millisecond") : b / 200 <= a ? (this.interval = 200, this.intervalType = "millisecond") : b / 250 <= a ? (this.interval = 250, this.intervalType = "millisecond") : b / 300 <= a ? (this.interval = 300, this.intervalType = "millisecond") : b / 400 <= a ? (this.interval = 400, this.intervalType = "millisecond") : b / 500 <= a ? (this.interval = 500, this.intervalType = "millisecond") : b / (1 * R.secondDuration) <= a ? (this.interval = 1, this.intervalType = "second") : b / (2 * R.secondDuration) <= a ? (this.interval = 2, this.intervalType = "second") : b / (5 * R.secondDuration) <= a ? (this.interval = 5, this.intervalType = "second") : b / (10 * R.secondDuration) <= a ? (this.interval = 10, this.intervalType = "second") : b / (15 * R.secondDuration) <= a ? (this.interval = 15, this.intervalType = "second") : b / (20 * R.secondDuration) <= a ? (this.interval = 20, this.intervalType = "second") : b / (30 * R.secondDuration) <= a ? (this.interval = 30, this.intervalType = "second") : b / (1 * R.minuteDuration) <= a ? (this.interval = 1, this.intervalType = "minute") : b / (2 * R.minuteDuration) <= a ? (this.interval = 2, this.intervalType = "minute") : b / (5 * R.minuteDuration) <= a ? (this.interval = 5, this.intervalType = "minute") : b / (10 * R.minuteDuration) <= a ? (this.interval = 10, this.intervalType = "minute") : b / (15 * R.minuteDuration) <= a ? (this.interval = 15, this.intervalType = "minute") : b / (20 * R.minuteDuration) <= a ? (this.interval = 20, this.intervalType = "minute") : b / (30 * R.minuteDuration) <= a ? (this.interval = 30, this.intervalType = "minute") : b / (1 * R.hourDuration) <= a ? (this.interval = 1, this.intervalType = "hour") : b / (2 * R.hourDuration) <= a ? (this.interval = 2, this.intervalType = "hour") : b / (3 * R.hourDuration) <= a ? (this.interval = 3, this.intervalType = "hour") : b / (6 * R.hourDuration) <= a ? (this.interval = 6, this.intervalType = "hour") : b / (1 * R.dayDuration) <= a ? (this.interval = 1, this.intervalType = "day") : b / (2 * R.dayDuration) <= a ? (this.interval = 2, this.intervalType = "day") : b / (4 * R.dayDuration) <= a ? (this.interval = 4, this.intervalType = "day") : b / (1 * R.weekDuration) <= a ? (this.interval = 1, this.intervalType = "week") : b / (2 * R.weekDuration) <= a ? (this.interval = 2, this.intervalType = "week") : b / (3 * R.weekDuration) <= a ? (this.interval = 3, this.intervalType = "week") : b / (1 * R.monthDuration) <= a ? (this.interval = 1, this.intervalType = "month") : b / (2 * R.monthDuration) <= a ? (this.interval = 2, this.intervalType = "month") : b / (3 * R.monthDuration) <= a ? (this.interval = 3, this.intervalType = "month") : b / (6 * R.monthDuration) <= a ? (this.interval = 6, this.intervalType = "month") : (this.interval = b / (1 * R.yearDuration) <= a ? 1 : b / (2 * R.yearDuration) <= a ? 2 : b / (4 * R.yearDuration) <= a ? 4 : Math.floor(E.getNiceNumber(b / (a - 1), !0) / R.yearDuration), this.intervalType = "year"));
          if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = e - k / 2;
          if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = f + k / 2;
          d ? this.autoValueFormatString = "MMM DD YYYY HH:mm" : "year" === this.intervalType ? this.autoValueFormatString = "YYYY" : "month" === this.intervalType ? this.autoValueFormatString = "MMM YYYY" : "week" === this.intervalType ? this.autoValueFormatString = "MMM DD YYYY" : "day" === this.intervalType ? this.autoValueFormatString = "MMM DD YYYY" : "hour" === this.intervalType ? this.autoValueFormatString = "hh:mm TT" : "minute" === this.intervalType ? this.autoValueFormatString = "hh:mm TT" : "second" === this.intervalType ? this.autoValueFormatString = "hh:mm:ss TT" : "millisecond" === this.intervalType && (this.autoValueFormatString = "fff'ms'");
          this.valueFormatString || (this.valueFormatString = this.autoValueFormatString);
        } else {
          this.intervalType = "number";
          b = E.getNiceNumber(b, !1);
          this.interval = this.options && 0 < this.options.interval ? this.options.interval : E.getNiceNumber(b / (a - 1), !0);
          if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = "axisX" === this.type ? e - k / 2 : Math.floor(e / this.interval) * this.interval;
          if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = "axisX" === this.type ? f + k / 2 : Math.ceil(f / this.interval) * this.interval;
          0 === this.viewportMaximum && 0 === this.viewportMinimum && (0 === this.options.viewportMinimum ? this.viewportMaximum += 10 : 0 === this.options.viewportMaximum && (this.viewportMinimum -= 10), this.options && "undefined" === typeof this.options.interval && (this.interval = E.getNiceNumber((this.viewportMaximum - this.viewportMinimum) / (a - 1), !0)));
        }
        if (null === this.minimum || null === this.maximum) if ("axisX" === this.type ? (e = null !== this.minimum ? this.minimum : this.dataInfo.min, f = null !== this.maximum ? this.maximum : this.dataInfo.max, 0 === f - e && (b = "undefined" === typeof this.options.interval ? 0.4 : this.options.interval, f += b, e -= b), k = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : 1 < f - e ? 0.5 * Math.abs(f - e) : 1) : "axisY" === this.type && (e = null !== this.minimum ? this.minimum : this.dataInfo.min, f = null !== this.maximum ? this.maximum : this.dataInfo.max, isFinite(e) || isFinite(f) ? 0 === e && 0 === f ? (f += 9, e = 0) : 0 === f - e ? (b = Math.min(Math.abs(0.01 * Math.abs(f)), 5), f += b, e -= b) : e > f ? (b = Math.min(0.01 * Math.abs(this.getApparentDifference(f, e, null, !0)), 5), 0 <= f ? e = f - b : f = isFinite(e) ? e + b : 0) : (b = Math.min(0.01 * Math.abs(this.getApparentDifference(e, f, null, !0)), 0.05), 0 !== f && (f += b), 0 !== e && (e -= b)) : (f = "undefined" === typeof this.options.interval ? -Infinity : this.options.interval, e = "undefined" !== typeof this.options.interval || isFinite(this.dataInfo.minDiff) ? 0 : Infinity), k = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : 1 < f - e ? 0.5 * Math.abs(f - e) : 1, this.includeZero && (null === this.minimum || isNaN(this.minimum)) && 0 < e && (e = 0), this.includeZero && (null === this.maximum || isNaN(this.maximum)) && 0 > f && (f = 0)), Math.abs(this.getApparentDifference(e, f, null, !0)), "axisX" === this.type && c) {
          this.valueType = "dateTime";
          if (null === this.minimum || isNaN(this.minimum)) this.minimum = e - k / 2;
          if (null === this.maximum || isNaN(this.maximum)) this.maximum = f + k / 2;
        } else this.intervalType = this.valueType = "number", null === this.minimum && (this.minimum = "axisX" === this.type ? e - k / 2 : Math.floor(e / this.interval) * this.interval, this.minimum = Math.min(this.minimum, null === this.sessionVariables.viewportMinimum || isNaN(this.sessionVariables.viewportMinimum) ? Infinity : this.sessionVariables.viewportMinimum)), null === this.maximum && (this.maximum = "axisX" === this.type ? f + k / 2 : Math.ceil(f / this.interval) * this.interval, this.maximum = Math.max(this.maximum, null === this.sessionVariables.viewportMaximum || isNaN(this.sessionVariables.viewportMaximum) ? -Infinity : this.sessionVariables.viewportMaximum)), 0 === this.maximum && 0 === this.minimum && (0 === this.options.minimum ? this.maximum += 10 : 0 === this.options.maximum && (this.minimum -= 10));
        s(this.sessionVariables.newViewportMinimum) && (this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum));
        s(this.sessionVariables.newViewportMaximum) && (this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum));
        this.range = this.viewportMaximum - this.viewportMinimum;
        this.intervalStartPosition = "axisX" === this.type && c ? this.getLabelStartPoint(new Date(this.viewportMinimum), this.intervalType, this.interval) : Math.floor((this.viewportMinimum + 0.2 * this.interval) / this.interval) * this.interval;
        this.valueFormatString || (this.valueFormatString = E.generateValueFormatString(this.range, 2));
      }
    };
    E.prototype.calculateLogarithmicAxisParameters = function () {
      var a = this.chart.layoutManager.getFreeSpace(),
        d = Math.log(this.logarithmBase),
        c;
      "bottom" === this._position || "top" === this._position ? (this.maxWidth = a.width, this.maxHeight = a.height) : (this.maxWidth = a.height, this.maxHeight = a.width);
      var a = "axisX" === this.type ? 500 > this.maxWidth ? 7 : Math.max(7, Math.floor(this.maxWidth / 100)) : Math.max(Math.floor(this.maxWidth / 50), 3),
        b,
        e,
        f,
        k;
      k = 1;
      if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = this.minimum;
      if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = this.maximum;
      if (this.scaleBreaks) for (k = 0; k < this.scaleBreaks._appliedBreaks.length; k++) if ((!s(this.sessionVariables.newViewportMinimum) && this.sessionVariables.newViewportMinimum >= this.scaleBreaks._appliedBreaks[k].startValue || !s(this.options.minimum) && this.options.minimum >= this.scaleBreaks._appliedBreaks[k].startValue || !s(this.options.viewportMinimum) && this.viewportMinimum >= this.scaleBreaks._appliedBreaks[k].startValue) && (!s(this.sessionVariables.newViewportMaximum) && this.sessionVariables.newViewportMaximum <= this.scaleBreaks._appliedBreaks[k].endValue || !s(this.options.maximum) && this.options.maximum <= this.scaleBreaks._appliedBreaks[k].endValue || !s(this.options.viewportMaximum) && this.viewportMaximum <= this.scaleBreaks._appliedBreaks[k].endValue)) {
        this.scaleBreaks._appliedBreaks.splice(k, 1);
        break;
      }
      "axisX" === this.type ? (b = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin, e = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax, 1 === e / b && (k = Math.pow(this.logarithmBase, "undefined" === typeof this.options.interval ? 0.4 : this.options.interval), e *= k, b /= k), f = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / b > this.logarithmBase ? e / b * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase) : "axisY" === this.type && (b = null !== this.viewportMinimum ? this.viewportMinimum : this.dataInfo.viewPortMin, e = null !== this.viewportMaximum ? this.viewportMaximum : this.dataInfo.viewPortMax, 0 >= b && !isFinite(e) ? (e = "undefined" === typeof this.options.interval ? 0 : this.options.interval, b = 1) : 0 >= b ? b = e : isFinite(e) || (e = b), 1 === b && 1 === e ? (e *= this.logarithmBase - 1 / this.logarithmBase, b = 1) : 1 === e / b ? (k = Math.min(e * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 5)), e *= k, b /= k) : b > e ? (k = Math.min(b / e * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 5)), 1 <= e ? b = e / k : e = b * k) : (k = Math.min(e / b * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 0.04)), 1 !== e && (e *= k), 1 !== b && (b /= k)), f = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / b > this.logarithmBase ? e / b * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase, this.includeZero && (null === this.viewportMinimum || isNaN(this.viewportMinimum)) && 1 < b && (b = 1), this.includeZero && (null === this.viewportMaximum || isNaN(this.viewportMaximum)) && 1 > e && (e = 1));
      k = (isNaN(this.viewportMaximum) || null === this.viewportMaximum ? e : this.viewportMaximum) / (isNaN(this.viewportMinimum) || null === this.viewportMinimum ? b : this.viewportMinimum);
      var m = (isNaN(this.viewportMaximum) || null === this.viewportMaximum ? e : this.viewportMaximum) - (isNaN(this.viewportMinimum) || null === this.viewportMinimum ? b : this.viewportMinimum);
      this.intervalType = "number";
      k = Math.pow(this.logarithmBase, E.getNiceNumber(Math.abs(Math.log(k) / d), !1));
      this.options && 0 < this.options.interval ? this.interval = this.options.interval : (this.interval = E.getNiceExponent(Math.log(k) / d / (a - 1), !0), c = E.getNiceNumber(m / (a - 1), !0));
      if (null === this.viewportMinimum || isNaN(this.viewportMinimum)) this.viewportMinimum = "axisX" === this.type ? b / Math.sqrt(f) : Math.pow(this.logarithmBase, this.interval * Math.floor(Math.log(b) / d / this.interval));
      if (null === this.viewportMaximum || isNaN(this.viewportMaximum)) this.viewportMaximum = "axisX" === this.type ? e * Math.sqrt(f) : Math.pow(this.logarithmBase, this.interval * Math.ceil(Math.log(e) / d / this.interval));
      1 === this.viewportMaximum && 1 === this.viewportMinimum && (1 === this.options.viewportMinimum ? this.viewportMaximum *= this.logarithmBase - 1 / this.logarithmBase : 1 === this.options.viewportMaximum && (this.viewportMinimum /= this.logarithmBase - 1 / this.logarithmBase), this.options && "undefined" === typeof this.options.interval && (this.interval = E.getNiceExponent(Math.ceil(Math.log(k) / d) / (a - 1)), c = E.getNiceNumber((this.viewportMaximum - this.viewportMinimum) / (a - 1), !0)));
      if (null === this.minimum || null === this.maximum) "axisX" === this.type ? (b = null !== this.minimum ? this.minimum : this.dataInfo.min, e = null !== this.maximum ? this.maximum : this.dataInfo.max, 1 === e / b && (k = Math.pow(this.logarithmBase, "undefined" === typeof this.options.interval ? 0.4 : this.options.interval), e *= k, b /= k), f = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / b > this.logarithmBase ? e / b * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase) : "axisY" === this.type && (b = null !== this.minimum ? this.minimum : this.dataInfo.min, e = null !== this.maximum ? this.maximum : this.dataInfo.max, isFinite(b) || isFinite(e) ? 1 === b && 1 === e ? (e *= this.logarithmBase, b /= this.logarithmBase) : 1 === e / b ? (k = Math.pow(this.logarithmBase, this.interval), e *= k, b /= k) : b > e ? (k = Math.min(0.01 * (b / e), 5), 1 <= e ? b = e / k : e = b * k) : (k = Math.min(e / b * Math.pow(this.logarithmBase, 0.01), Math.pow(this.logarithmBase, 0.04)), 1 !== e && (e *= k), 1 !== b && (b /= k)) : (e = "undefined" === typeof this.options.interval ? 0 : this.options.interval, b = 1), f = Infinity !== this.dataInfo.minDiff ? this.dataInfo.minDiff : e / b > this.logarithmBase ? e / b * Math.pow(this.logarithmBase, 0.5) : this.logarithmBase, this.includeZero && (null === this.minimum || isNaN(this.minimum)) && 1 < b && (b = 1), this.includeZero && (null === this.maximum || isNaN(this.maximum)) && 1 > e && (e = 1)), this.intervalType = "number", null === this.minimum && (this.minimum = "axisX" === this.type ? b / Math.sqrt(f) : Math.pow(this.logarithmBase, this.interval * Math.floor(Math.log(b) / d / this.interval)), this.minimum = Math.min(this.minimum, null === this.sessionVariables.viewportMinimum || isNaN(this.sessionVariables.viewportMinimum) ? "undefined" === typeof this.sessionVariables.newViewportMinimum ? Infinity : this.sessionVariables.newViewportMinimum : this.sessionVariables.viewportMinimum)), null === this.maximum && (this.maximum = "axisX" === this.type ? e * Math.sqrt(f) : Math.pow(this.logarithmBase, this.interval * Math.ceil(Math.log(e) / d / this.interval)), this.maximum = Math.max(this.maximum, null === this.sessionVariables.viewportMaximum || isNaN(this.sessionVariables.viewportMaximum) ? "undefined" === typeof this.sessionVariables.newViewportMaximum ? 0 : this.sessionVariables.newViewportMaximum : this.sessionVariables.viewportMaximum)), 1 === this.maximum && 1 === this.minimum && (1 === this.options.minimum ? this.maximum *= this.logarithmBase - 1 / this.logarithmBase : 1 === this.options.maximum && (this.minimum /= this.logarithmBase - 1 / this.logarithmBase));
      this.viewportMinimum = Math.max(this.viewportMinimum, this.minimum);
      this.viewportMaximum = Math.min(this.viewportMaximum, this.maximum);
      this.viewportMinimum > this.viewportMaximum && (!this.options.viewportMinimum && !this.options.minimum || this.options.viewportMaximum || this.options.maximum ? this.options.viewportMinimum || this.options.minimum || !this.options.viewportMaximum && !this.options.maximum || (this.viewportMinimum = this.minimum = (this.options.viewportMaximum || this.options.maximum) / Math.pow(this.logarithmBase, 2 * Math.ceil(this.interval))) : this.viewportMaximum = this.maximum = this.options.viewportMinimum || this.options.minimum);
      b = Math.pow(this.logarithmBase, Math.floor(Math.log(this.viewportMinimum) / (d * this.interval) + 0.2) * this.interval);
      this.range = this.viewportMaximum / this.viewportMinimum;
      this.noTicks = a;
      if (!this.options.interval && this.range < Math.pow(this.logarithmBase, 8 > this.viewportMaximum || 3 > a ? 2 : 3)) {
        for (d = Math.floor(this.viewportMinimum / c + 0.5) * c; d < this.viewportMinimum;) d += c;
        this.equidistantInterval = !1;
        this.intervalStartPosition = d;
        this.interval = c;
      } else this.options.interval || (c = Math.ceil(this.interval), this.range > this.interval && (this.interval = c, b = Math.pow(this.logarithmBase, Math.floor(Math.log(this.viewportMinimum) / (d * this.interval) + 0.2) * this.interval))), this.equidistantInterval = !0, this.intervalStartPosition = b;
      if (!this.valueFormatString && (this.valueFormatString = "#,##0.##", 1 > this.viewportMinimum)) {
        d = Math.floor(Math.abs(Math.log(this.viewportMinimum) / Math.LN10)) + 2;
        if (isNaN(d) || !isFinite(d)) d = 2;
        if (2 < d) for (k = 0; k < d - 2; k++) this.valueFormatString += "#";
      }
    };
    E.generateValueFormatString = function (a, d) {
      var c = "#,##0.",
        b = d;
      1 > a && (b += Math.floor(Math.abs(Math.log(a) / Math.LN10)), isNaN(b) || !isFinite(b)) && (b = d);
      for (var e = 0; e < b; e++) c += "#";
      return c;
    };
    E.getNiceExponent = function (a, d) {
      var c = Math.floor(Math.log(a) / Math.LN10),
        b = a / Math.pow(10, c),
        b = 0 > c ? 1 >= b ? 1 : 5 >= b ? 5 : 10 : Math.max(Math.floor(b), 1);
      return -20 > c ? Number(b * Math.pow(10, c)) : Number((b * Math.pow(10, c)).toFixed(20));
    };
    E.getNiceNumber = function (a, d) {
      var c = Math.floor(Math.log(a) / Math.LN10),
        b = a / Math.pow(10, c),
        b = d ? 1.5 > b ? 1 : 3 > b ? 2 : 7 > b ? 5 : 10 : 1 >= b ? 1 : 2 >= b ? 2 : 5 >= b ? 5 : 10;
      return -20 > c ? Number(b * Math.pow(10, c)) : Number((b * Math.pow(10, c)).toFixed(20));
    };
    E.prototype.getLabelStartPoint = function () {
      var a = R[this.intervalType + "Duration"] * this.interval,
        a = new Date(Math.floor(this.viewportMinimum / a) * a);
      if ("millisecond" !== this.intervalType) if ("second" === this.intervalType) 0 < a.getMilliseconds() && (a.setSeconds(a.getSeconds() + 1), a.setMilliseconds(0));else if ("minute" === this.intervalType) {
        if (0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setMinutes(a.getMinutes() + 1), a.setSeconds(0), a.setMilliseconds(0);
      } else if ("hour" === this.intervalType) {
        if (0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setHours(a.getHours() + 1), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
      } else if ("day" === this.intervalType) {
        if (0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setDate(a.getDate() + 1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
      } else if ("week" === this.intervalType) {
        if (0 < a.getDay() || 0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setDate(a.getDate() + (7 - a.getDay())), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
      } else if ("month" === this.intervalType) {
        if (1 < a.getDate() || 0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) a.setMonth(a.getMonth() + 1), a.setDate(1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
      } else "year" === this.intervalType && (0 < a.getMonth() || 1 < a.getDate() || 0 < a.getHours() || 0 < a.getMinutes() || 0 < a.getSeconds() || 0 < a.getMilliseconds()) && (a.setFullYear(a.getFullYear() + 1), a.setMonth(0), a.setDate(1), a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0));
      return a;
    };
    oa($, V);
    oa(U, V);
    U.prototype.createUserOptions = function (a) {
      if ("undefined" !== typeof a || this.options._isPlaceholder) {
        var d = 0;
        this.parent.options._isPlaceholder && this.parent.createUserOptions();
        this.options._isPlaceholder || (Da(this.parent[this.optionsName]), d = this.parent.options[this.optionsName].indexOf(this.options));
        this.options = "undefined" === typeof a ? {} : a;
        this.parent.options[this.optionsName][d] = this.options;
      }
    };
    U.prototype.render = function (a) {
      if (0 !== this.spacing || 0 !== this.options.lineThickness && ("undefined" !== typeof this.options.lineThickness || 0 !== this.parent.lineThickness)) {
        var d = this.ctx,
          c = this.ctx.globalAlpha;
        this.ctx = a || this.ctx;
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(this.chart.plotArea.x1, this.chart.plotArea.y1, this.chart.plotArea.width, this.chart.plotArea.height);
        this.ctx.clip();
        var b = this.scaleBreaks.parent.getPixelCoordinatesOnAxis(this.startValue),
          e = this.scaleBreaks.parent.getPixelCoordinatesOnAxis(this.endValue);
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.globalAlpha = 1;
        Q(this.id);
        var f, k, m, l, h, r;
        a = Math.max(this.spacing, 3);
        var q = Math.max(0, this.lineThickness);
        this.ctx.lineWidth = q;
        this.ctx.setLineDash && this.ctx.setLineDash(N(this.lineDashType, q));
        if ("bottom" === this.scaleBreaks.parent._position || "top" === this.scaleBreaks.parent._position) {
          if (b = 1 === q % 2 ? (b.x << 0) + 0.5 : b.x << 0, k = 1 === q % 2 ? (e.x << 0) + 0.5 : e.x << 0, "top" === this.scaleBreaks.parent._position ? (e = this.chart.plotArea.y1, m = this.chart.plotArea.y2 + q / 2 + 0.5 << 0) : (e = this.chart.plotArea.y2, m = this.chart.plotArea.y1 - q / 2 + 0.5 << 0, a *= -1), this.bounds = {
            x1: b - q / 2,
            y1: e,
            x2: k + q / 2,
            y2: m
          }, this.ctx.moveTo(b, e), "straight" === this.type || "top" === this.scaleBreaks.parent._position && 0 >= a || "bottom" === this.scaleBreaks.parent._position && 0 <= a) this.ctx.lineTo(b, m), this.ctx.lineTo(k, m), this.ctx.lineTo(k, e);else if ("wavy" === this.type) {
            l = b;
            h = e;
            f = 0.5;
            r = (m - h) / a / 3;
            for (var p = 0; p < r; p++) this.ctx.bezierCurveTo(l + f * a, h + a, l + f * a, h + 2 * a, l, h + 3 * a), h += 3 * a, f *= -1;
            this.ctx.bezierCurveTo(l + f * a, h + a, l + f * a, h + 2 * a, l, h + 3 * a);
            l = k;
            f *= -1;
            this.ctx.lineTo(l, h);
            for (p = 0; p < r; p++) this.ctx.bezierCurveTo(l + f * a, h - a, l + f * a, h - 2 * a, l, h - 3 * a), h -= 3 * a, f *= -1;
          } else {
            if ("zigzag" === this.type) {
              f = -1;
              h = e + a;
              l = b + a;
              r = (m - h) / a / 2;
              for (p = 0; p < r; p++) this.ctx.lineTo(l, h), l += 2 * f * a, h += 2 * a, f *= -1;
              this.ctx.lineTo(l, h);
              l += k - b;
              for (p = 0; p < r + 1; p++) this.ctx.lineTo(l, h), l += 2 * f * a, h -= 2 * a, f *= -1;
              this.ctx.lineTo(l + f * a, h + a);
            }
          }
        } else if ("left" === this.scaleBreaks.parent._position || "right" === this.scaleBreaks.parent._position) if (e = 1 === q % 2 ? (e.y << 0) + 0.5 : e.y << 0, m = 1 === q % 2 ? (b.y << 0) + 0.5 : b.y << 0, "left" === this.scaleBreaks.parent._position ? (b = this.chart.plotArea.x1, k = this.chart.plotArea.x2 + q / 2 + 0.5 << 0) : (b = this.chart.plotArea.x2, k = this.chart.plotArea.x1 - q / 2 + 0.5 << 0, a *= -1), this.bounds = {
          x1: b,
          y1: e - q / 2,
          x2: k,
          y2: m + q / 2
        }, this.ctx.moveTo(b, e), "straight" === this.type || "left" === this.scaleBreaks.parent._position && 0 >= a || "right" === this.scaleBreaks.parent._position && 0 <= a) this.ctx.lineTo(k, e), this.ctx.lineTo(k, m), this.ctx.lineTo(b, m);else if ("wavy" === this.type) {
          l = b;
          h = e;
          f = 0.5;
          r = (k - l) / a / 3;
          for (p = 0; p < r; p++) this.ctx.bezierCurveTo(l + a, h + f * a, l + 2 * a, h + f * a, l + 3 * a, h), l += 3 * a, f *= -1;
          this.ctx.bezierCurveTo(l + a, h + f * a, l + 2 * a, h + f * a, l + 3 * a, h);
          h = m;
          f *= -1;
          this.ctx.lineTo(l, h);
          for (p = 0; p < r; p++) this.ctx.bezierCurveTo(l - a, h + f * a, l - 2 * a, h + f * a, l - 3 * a, h), l -= 3 * a, f *= -1;
        } else if ("zigzag" === this.type) {
          f = 1;
          h = e - a;
          l = b + a;
          r = (k - l) / a / 2;
          for (p = 0; p < r; p++) this.ctx.lineTo(l, h), h += 2 * f * a, l += 2 * a, f *= -1;
          this.ctx.lineTo(l, h);
          h += m - e;
          for (p = 0; p < r + 1; p++) this.ctx.lineTo(l, h), h += 2 * f * a, l -= 2 * a, f *= -1;
          this.ctx.lineTo(l + a, h + f * a);
        }
        0 < q && this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.globalAlpha = this.fillOpacity;
        this.ctx.globalCompositeOperation = "destination-over";
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.globalAlpha = c;
        this.ctx = d;
      }
    };
    oa(M, V);
    M.prototype.createUserOptions = function (a) {
      if ("undefined" !== typeof a || this.options._isPlaceholder) {
        var d = 0;
        this.parent.options._isPlaceholder && this.parent.createUserOptions();
        this.options._isPlaceholder || (Da(this.parent.stripLines), d = this.parent.options.stripLines.indexOf(this.options));
        this.options = "undefined" === typeof a ? {} : a;
        this.parent.options.stripLines[d] = this.options;
      }
    };
    M.prototype.render = function () {
      this.ctx.save();
      var a = this.parent.getPixelCoordinatesOnAxis(this.value),
        d = Math.abs("pixel" === this._thicknessType ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness);
      if (0 < d) {
        var c = null === this.opacity ? 1 : this.opacity;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        var b = this.ctx.globalAlpha;
        this.ctx.globalAlpha = c;
        Q(this.id);
        var e, f, k, m;
        this.ctx.lineWidth = d;
        this.ctx.setLineDash && this.ctx.setLineDash(N(this.lineDashType, d));
        if ("bottom" === this.parent._position || "top" === this.parent._position) e = f = 1 === this.ctx.lineWidth % 2 ? (a.x << 0) + 0.5 : a.x << 0, k = this.chart.plotArea.y1, m = this.chart.plotArea.y2, this.bounds = {
          x1: e - d / 2,
          y1: k,
          x2: f + d / 2,
          y2: m
        };else if ("left" === this.parent._position || "right" === this.parent._position) k = m = 1 === this.ctx.lineWidth % 2 ? (a.y << 0) + 0.5 : a.y << 0, e = this.chart.plotArea.x1, f = this.chart.plotArea.x2, this.bounds = {
          x1: e,
          y1: k - d / 2,
          x2: f,
          y2: m + d / 2
        };
        this.ctx.moveTo(e, k);
        this.ctx.lineTo(f, m);
        this.ctx.stroke();
        this.ctx.globalAlpha = b;
      }
      this.ctx.restore();
    };
    oa(aa, V);
    aa.prototype.showAt = function (a) {
      if (!this.enabled) return !1;
      var d = this.chart,
        c = !1;
      d.resetOverlayedCanvas();
      d.clearedOverlayedCanvas = this.parent.type;
      if ("xySwapped" === d.plotInfo.axisPlacement) {
        if ("bottom" === this.parent._position) for (var b = 0; b < d.axisY.length; b++) this.parent === d.axisY[b] && (d.axisY[b]._crosshairValue = a >= d.axisY[b].viewportMinimum && a <= d.axisY[b].viewportMaximum ? a : null);else if ("top" === this.parent._position) for (b = 0; b < d.axisY2.length; b++) this.parent === d.axisY2[b] && (d.axisY2[b]._crosshairValue = a >= d.axisY2[b].viewportMinimum && a <= d.axisY2[b].viewportMaximum ? a : null);else if ("left" === this.parent._position) for (b = 0; b < d.axisX.length; b++) this.parent === d.axisX[b] && (d.axisX[b]._crosshairValue = a >= d.axisX[b].viewportMinimum && a <= d.axisX[b].viewportMaximum ? a : null);else {
          if ("right" === this.parent._position) for (b = 0; b < d.axisX2.length; b++) this.parent === d.axisX2[b] && (d.axisX2[b]._crosshairValue = a >= d.axisX2[b].viewportMinimum && a <= d.axisX2[b].viewportMaximum ? a : null);
        }
      } else if ("bottom" === this.parent._position) for (b = 0; b < d.axisX.length; b++) this.parent === d.axisX[b] && (d.axisX[b]._crosshairValue = a >= d.axisX[b].viewportMinimum && a <= d.axisX[b].viewportMaximum ? a : null);else if ("top" === this.parent._position) for (b = 0; b < d.axisX2.length; b++) this.parent === d.axisX2[b] && (d.axisX2[b]._crosshairValue = a >= d.axisX2[b].viewportMinimum && a <= d.axisX2[b].viewportMaximum ? a : null);else if ("left" === this.parent._position) for (b = 0; b < d.axisY.length; b++) this.parent === d.axisY[b] && (d.axisY[b]._crosshairValue = a >= d.axisY[b].viewportMinimum && a <= d.axisY[b].viewportMaximum ? a : null);else if ("right" === this.parent._position) for (b = 0; b < d.axisY2.length; b++) this.parent === d.axisY2[b] && (d.axisY2[b]._crosshairValue = a >= d.axisY2[b].viewportMinimum && a <= d.axisY2[b].viewportMaximum ? a : null);
      for (b = 0; b < d.axisX.length; b++) a = d.axisX[b]._crosshairValue, d.axisX[b].crosshair && d.axisX[b].crosshair.enabled && !s(a) && a >= d.axisX[b].viewportMinimum && a <= d.axisX[b].viewportMaximum && (d.axisX[b].showCrosshair(a), d.axisX[b].crosshair._updatedValue = a, this === d.axisX[b].crosshair && (c = !0));
      for (b = 0; b < d.axisX2.length; b++) a = d.axisX2[b]._crosshairValue, d.axisX2[b].crosshair && d.axisX2[b].crosshair.enabled && !s(a) && a >= d.axisX2[b].viewportMinimum && a <= d.axisX2[b].viewportMaximum && (d.axisX2[b].showCrosshair(a), d.axisX2[b].crosshair._updatedValue = a, this === d.axisX2[b].crosshair && (c = !0));
      for (b = 0; b < d.axisY.length; b++) a = d.axisY[b]._crosshairValue, d.axisY[b].crosshair && d.axisY[b].crosshair.enabled && !s(a) && a >= d.axisY[b].viewportMinimum && a <= d.axisY[b].viewportMaximum && (d.axisY[b].showCrosshair(a), d.axisY[b].crosshair._updatedValue = a, this === d.axisY[b].crosshair && (c = !0));
      for (b = 0; b < d.axisY2.length; b++) a = d.axisY2[b]._crosshairValue, d.axisY2[b].crosshair && d.axisY2[b].crosshair.enabled && !s(a) && d._crosshairY2Value >= d.axisY2[b].viewportMinimum && d._crosshairY2Value <= d.axisY2[b].viewportMaximum && (d.axisY2[b].showCrosshair(a), d.axisY2[b].crosshair._updatedValue = a, this === d.axisY2[b].crosshair && (c = !0));
      this.chart.toolTip && this.chart.toolTip._entries && this.chart.toolTip.highlightObjects(this.chart.toolTip._entries);
      return c;
    };
    aa.prototype.hide = function () {
      this.chart.resetOverlayedCanvas();
      this.chart.renderCrosshairs(this.parent);
      this._hidden = !0;
    };
    aa.prototype.render = function (a, d, c) {
      var b,
        e,
        f,
        k,
        m = null,
        l = null,
        h = null,
        r = "";
      if (!this.valueFormatString) if ("dateTime" === this.parent.valueType) this.valueFormatString = this.parent.valueFormatString;else {
        var q = 0,
          q = "xySwapped" === this.chart.plotInfo.axisPlacement ? 50 < this.parent.range ? 0 : 500 < this.chart.width && 25 > this.parent.range ? 2 : Math.floor(Math.abs(Math.log(this.parent.range) / Math.LN10)) + (5 > this.parent.range ? 2 : 10 > this.parent.range ? 1 : 0) : 50 < this.parent.range ? 0 : Math.floor(Math.abs(Math.log(this.parent.range) / Math.LN10)) + (5 > this.parent.range ? 2 : 10 > this.parent.range ? 1 : 0);
        this.valueFormatString = E.generateValueFormatString(this.parent.range, q);
      }
      var h = null === this.opacity ? 1 : this.opacity,
        q = Math.abs("pixel" === this._thicknessType ? this.thickness : this.parent.conversionParameters.pixelPerUnit * this.thickness),
        p = this.chart.overlaidCanvasCtx,
        g = p.globalAlpha;
      p.globalAlpha = h;
      p.beginPath();
      p.strokeStyle = this.color;
      p.lineWidth = q;
      p.save();
      this.labelFontSize = s(this.options.labelFontSize) ? this.parent.labelFontSize : this.labelFontSize;
      this.labelMaxWidth = s(this.options.labelMaxWidth) ? 0.3 * this.chart.width : this.labelMaxWidth;
      this.labelMaxHeight = s(this.options.labelWrap) || this.labelWrap ? 0.3 * this.chart.height : 2 * this.labelFontSize;
      0 < q && p.setLineDash && p.setLineDash(N(this.lineDashType, q));
      h = new ja(p, {
        x: 0,
        y: 0,
        padding: {
          top: 2,
          right: 3,
          bottom: 2,
          left: 4
        },
        backgroundColor: this.labelBackgroundColor,
        borderColor: this.labelBorderColor,
        borderThickness: this.labelBorderThickness,
        cornerRadius: this.labelCornerRadius,
        maxWidth: this.labelMaxWidth,
        maxHeight: this.labelMaxHeight,
        angle: this.labelAngle,
        text: r,
        horizontalAlign: "left",
        fontSize: this.labelFontSize,
        fontFamily: this.labelFontFamily,
        fontWeight: this.labelFontWeight,
        fontColor: this.labelFontColor,
        fontStyle: this.labelFontStyle,
        textBaseline: "middle"
      });
      if (this.snapToDataPoint) {
        var t = 0,
          r = [];
        if ("xySwapped" === this.chart.plotInfo.axisPlacement) {
          var v = null;
          if ("bottom" === this.parent._position || "top" === this.parent._position) t = this.parent.dataSeries[0].axisX.convertPixelToValue({
            y: d
          });else if ("left" === this.parent._position || "right" === this.parent._position) t = this.parent.convertPixelToValue({
            y: d
          });
          for (var w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (v.dataSeries = this.parent.dataSeries[w], null !== v.dataPoint.y && r.push(v));
          v = null;
          if (0 === r.length) return;
          r.sort(function (a, b) {
            return a.distance - b.distance;
          });
          v = Math.abs(a - this.parent.convertValueToPixel(r[0].dataPoint.y));
          w = 0;
          if ("rangeBar" === r[0].dataSeries.type || "error" === r[0].dataSeries.type) {
            for (var v = Math.abs(a - this.parent.convertValueToPixel(r[w].dataPoint.y[0])), u = 0, t = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (var x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(a - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else u = Math.abs(a - this.parent.convertValueToPixel(r[t].dataPoint.y)), u < v && (v = u, w = t);
          } else if ("stackedBar" === r[0].dataSeries.type) {
            for (var v = Math.abs(a - this.parent.convertValueToPixel(r[0].dataPoint.y)), z = u = 0, t = w = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(a - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else z += r[t].dataPoint.y, u = Math.abs(a - this.parent.convertValueToPixel(z)), u < v && (v = u, w = t);
          } else if ("stackedBar100" === r[0].dataSeries.type) {
            for (var v = Math.abs(a - this.parent.convertValueToPixel(r[0].dataPoint.y)), D = z = u = 0, t = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(a - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else z += r[t].dataPoint.y, D = r[t].dataPoint.x.getTime ? r[t].dataPoint.x.getTime() : r[t].dataPoint.x, D = 100 * (z / r[t].dataSeries.plotUnit.dataPointYSums[D]), u = Math.abs(a - this.parent.convertValueToPixel(D)), u < v && (v = u, w = t);
          } else for (v = Math.abs(a - this.parent.convertValueToPixel(r[0].dataPoint.y)), t = w = u = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(a - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else u = Math.abs(a - this.parent.convertValueToPixel(r[t].dataPoint.y)), u < v && (v = u, w = t);
          x = r[w];
          if ("bottom" === this.parent._position || "top" === this.parent._position) {
            b = 0;
            if ("rangeBar" === this.parent.dataSeries[w].type || "error" === this.parent.dataSeries[w].type) {
              v = Math.abs(a - this.parent.convertValueToPixel(x.dataPoint.y[0]));
              for (t = u = 0; t < x.dataPoint.y.length; t++) u = Math.abs(a - this.parent.convertValueToPixel(x.dataPoint.y[t])), u < v && (v = u, b = t);
              m = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(x.dataPoint.y[b]) << 0) + 0.5 : this.parent.convertValueToPixel(x.dataPoint.y[b]) << 0;
              h.text = this.labelFormatter ? this.labelFormatter({
                chart: this.chart,
                axis: this.parent.options,
                crosshair: this.options,
                value: c ? c : x.dataPoint.y[b]
              }) : s(this.options.label) ? ea(c ? c : x.dataPoint.y[b], this.valueFormatString, this.chart._cultureInfo) : this.label;
            } else if ("stackedBar" === this.parent.dataSeries[w].type) {
              v = Math.abs(a - this.parent.convertValueToPixel(r[0].dataPoint.y));
              z = u = 0;
              for (t = w; 0 <= t; t--) z += r[t].dataPoint.y, u = Math.abs(a - this.parent.convertValueToPixel(z)), u < v && (v = u, b = t);
              m = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(z) << 0) + 0.5 : this.parent.convertValueToPixel(z) << 0;
              h.text = this.labelFormatter ? this.labelFormatter({
                chart: this.chart,
                axis: this.parent.options,
                crosshair: this.options,
                value: c ? c : x.dataPoint.y
              }) : s(this.options.label) ? ea(c ? c : x.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label;
            } else if ("stackedBar100" === this.parent.dataSeries[w].type) {
              v = Math.abs(a - this.parent.convertValueToPixel(r[0].dataPoint.y));
              D = z = u = 0;
              for (t = w; 0 <= t; t--) z += r[t].dataPoint.y, D = r[t].dataPoint.x.getTime ? r[t].dataPoint.x.getTime() : r[t].dataPoint.x, D = 100 * (z / r[t].dataSeries.plotUnit.dataPointYSums[D]), u = Math.abs(a - this.parent.convertValueToPixel(D)), u < v && (v = u, b = t);
              m = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(D) << 0) + 0.5 : this.parent.convertValueToPixel(D) << 0;
              h.text = this.labelFormatter ? this.labelFormatter({
                chart: this.chart,
                axis: this.parent.options,
                crosshair: this.options,
                value: c ? c : D
              }) : s(this.options.label) ? ea(c ? c : D, this.valueFormatString, this.chart._cultureInfo) : this.label;
            } else m = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(x.dataPoint.y) << 0) + 0.5 : this.parent.convertValueToPixel(x.dataPoint.y) << 0, h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : x.dataPoint.y
            }) : s(this.options.label) ? ea(c ? c : x.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label;
            b = e = m;
            f = this.chart.plotArea.y1;
            k = this.chart.plotArea.y2;
            this.bounds = {
              x1: b - q / 2,
              y1: f,
              x2: e + q / 2,
              y2: k
            };
            h.x = b - h.measureText().width / 2;
            h.x + h.width > this.chart.bounds.x2 ? h.x = this.chart.bounds.x2 - h.width : h.x < this.chart.bounds.x1 && (h.x = this.chart.bounds.x1);
            h.y = this.parent.lineCoordinates.y2 + h.fontSize / 2 + 2;
            h.y + h.height > this.chart.bounds.y2 ? h.y = this.chart.bounds.y2 - h.height : h.y < this.chart.bounds.y1 && (h.y = this.chart.bounds.y1);
          } else if ("left" === this.parent._position || "right" === this.parent._position) {
            f = k = l = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(x.dataPoint.x) << 0) + 0.5 : this.parent.convertValueToPixel(x.dataPoint.x) << 0;
            b = this.chart.plotArea.x1;
            e = this.chart.plotArea.x2;
            this.bounds = {
              x1: b,
              y1: f - q / 2,
              x2: e,
              y2: k + q / 2
            };
            D = !1;
            if (this.parent.labels) for (r = Math.ceil(this.parent.interval), t = 0; t < this.parent.viewportMaximum; t += r) if (this.parent.labels[t]) D = !0;else {
              D = !1;
              break;
            }
            if (D) {
              if ("axisX" === this.parent.type) for (t = this.parent.convertPixelToValue({
                y: d
              }), v = null, w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (h.text = this.labelFormatter ? this.labelFormatter({
                chart: this.chart,
                axis: this.parent.options,
                crosshair: this.options,
                value: x.dataPoint.x
              }) : s(this.options.label) ? v.dataPoint.label : this.label);
            } else "dateTime" === this.parent.valueType ? h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : x.dataPoint.x
            }) : s(this.options.label) ? Aa(c ? c : x.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : x.dataPoint.x
            }) : s(this.options.label) ? ea(c ? c : x.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label);
            h.y = k + h.fontSize / 2 - h.measureText().height / 2 + 2;
            h.y - h.fontSize / 2 < this.chart.bounds.y1 ? h.y = this.chart.bounds.y1 + h.fontSize / 2 + 2 : h.y + h.measureText().height - h.fontSize / 2 > this.chart.bounds.y2 && (h.y = this.chart.bounds.y2 - h.measureText().height + h.fontSize / 2);
            "left" === this.parent._position ? h.x = this.parent.lineCoordinates.x2 - h.measureText().width : "right" === this.parent._position && (h.x = this.parent.lineCoordinates.x2);
          }
        } else if ("bottom" === this.parent._position || "top" === this.parent._position) {
          t = this.parent.convertPixelToValue({
            x: a
          });
          for (w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (v.dataSeries = this.parent.dataSeries[w], null !== v.dataPoint.y && r.push(v));
          if (0 === r.length) return;
          r.sort(function (a, b) {
            return a.distance - b.distance;
          });
          x = r[0];
          b = e = m = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(x.dataPoint.x) << 0) + 0.5 : this.parent.convertValueToPixel(x.dataPoint.x) << 0;
          f = this.chart.plotArea.y1;
          k = this.chart.plotArea.y2;
          this.bounds = {
            x1: b - q / 2,
            y1: f,
            x2: e + q / 2,
            y2: k
          };
          D = !1;
          if (this.parent.labels) for (r = Math.ceil(this.parent.interval), t = 0; t < this.parent.viewportMaximum; t += r) if (this.parent.labels[t]) D = !0;else {
            D = !1;
            break;
          }
          if (D) {
            if ("axisX" === this.parent.type) for (t = this.parent.convertPixelToValue({
              x: a
            }), v = null, w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: x.dataPoint.x
            }) : s(this.options.label) ? v.dataPoint.label : this.label);
          } else "dateTime" === this.parent.valueType ? h.text = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.parent.options,
            crosshair: this.options,
            value: x.dataPoint.x
          }) : s(this.options.label) ? Aa(c ? c : x.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (h.text = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.parent.options,
            crosshair: this.options,
            value: x.dataPoint.x
          }) : s(this.options.label) ? ea(c ? c : x.dataPoint.x, this.valueFormatString, this.chart._cultureInfo) : this.label);
          this.value = x.dataPoint.x;
          h.x = b - h.measureText().width / 2;
          h.x + h.width > this.chart.bounds.x2 && (h.x = this.chart.bounds.x2 - h.width);
          h.x < this.chart.bounds.x1 && (h.x = this.chart.bounds.x1);
          "bottom" === this.parent._position ? h.y = this.parent.lineCoordinates.y2 + h.fontSize / 2 + 2 : "top" === this.parent._position && (h.y = this.parent.lineCoordinates.y1 - h.height + h.fontSize / 2 + 2);
        } else if ("left" === this.parent._position || "right" === this.parent._position) {
          !s(this.parent.dataSeries) && 0 < this.parent.dataSeries.length && (t = this.parent.dataSeries[0].axisX.convertPixelToValue({
            x: a
          }));
          for (w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (v.dataSeries = this.parent.dataSeries[w], null !== v.dataPoint.y && r.push(v));
          if (0 === r.length) return;
          r.sort(function (a, b) {
            return a.distance - b.distance;
          });
          w = 0;
          if ("rangeColumn" === r[0].dataSeries.type || "rangeArea" === r[0].dataSeries.type || "error" === r[0].dataSeries.type || "rangeSplineArea" === r[0].dataSeries.type || "candlestick" === r[0].dataSeries.type || "ohlc" === r[0].dataSeries.type || "boxAndWhisker" === r[0].dataSeries.type) {
            for (v = Math.abs(d - this.parent.convertValueToPixel(r[0].dataPoint.y[0])), t = u = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(d - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else u = Math.abs(d - this.parent.convertValueToPixel(r[t].dataPoint.y)), u < v && (v = u, w = t);
          } else if ("stackedColumn" === r[0].dataSeries.type || "stackedArea" === r[0].dataSeries.type) {
            for (v = Math.abs(d - this.parent.convertValueToPixel(r[0].dataPoint.y)), t = z = u = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(d - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else z += r[t].dataPoint.y, u = Math.abs(d - this.parent.convertValueToPixel(z)), u < v && (v = u, w = t);
          } else if ("stackedColumn100" === r[0].dataSeries.type || "stackedArea100" === r[0].dataSeries.type) {
            for (v = Math.abs(d - this.parent.convertValueToPixel(r[0].dataPoint.y)), t = D = z = u = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(d - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else z += r[t].dataPoint.y, D = r[t].dataPoint.x.getTime ? r[t].dataPoint.x.getTime() : r[t].dataPoint.x, D = 100 * (z / r[t].dataSeries.plotUnit.dataPointYSums[D]), u = Math.abs(d - this.parent.convertValueToPixel(D)), u < v && (v = u, w = t);
          } else for (v = Math.abs(d - this.parent.convertValueToPixel(r[0].dataPoint.y)), t = u = 0; t < r.length; t++) if (r[t].dataPoint.y && r[t].dataPoint.y.length) for (x = 0; x < r[t].dataPoint.y.length; x++) u = Math.abs(d - this.parent.convertValueToPixel(r[t].dataPoint.y[x])), u < v && (v = u, w = t);else u = Math.abs(d - this.parent.convertValueToPixel(r[t].dataPoint.y)), u < v && (v = u, w = t);
          x = r[w];
          b = 0;
          if ("rangeColumn" === this.parent.dataSeries[w].type || "rangeArea" === this.parent.dataSeries[w].type || "error" === this.parent.dataSeries[w].type || "rangeSplineArea" === this.parent.dataSeries[w].type || "candlestick" === this.parent.dataSeries[w].type || "ohlc" === this.parent.dataSeries[w].type || "boxAndWhisker" === this.parent.dataSeries[w].type) {
            v = Math.abs(d - this.parent.convertValueToPixel(x.dataPoint.y[0]));
            for (t = u = 0; t < x.dataPoint.y.length; t++) u = Math.abs(d - this.parent.convertValueToPixel(x.dataPoint.y[t])), u < v && (v = u, b = t);
            l = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(x.dataPoint.y[b]) << 0) + 0.5 : this.parent.convertValueToPixel(x.dataPoint.y[b]) << 0;
            h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : x.dataPoint.y[b]
            }) : s(this.options.label) ? ea(c ? c : x.dataPoint.y[b], this.valueFormatString, this.chart._cultureInfo) : this.label;
            this.value = x.dataPoint.y[b];
          } else if ("stackedColumn" === this.parent.dataSeries[w].type || "stackedArea" === this.parent.dataSeries[w].type) {
            v = Math.abs(d - this.parent.convertValueToPixel(r[0].dataPoint.y));
            z = u = 0;
            for (t = w; 0 <= t; t--) z += r[t].dataPoint.y, u = Math.abs(d - this.parent.convertValueToPixel(z)), u < v && (v = u, b = t);
            l = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(z) << 0) + 0.5 : this.parent.convertValueToPixel(z) << 0;
            h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : x.dataPoint.y
            }) : s(this.options.label) ? ea(c ? c : x.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label;
            this.value = z;
          } else if ("stackedColumn100" === this.parent.dataSeries[w].type || "stackedArea100" === this.parent.dataSeries[w].type) {
            v = Math.abs(d - this.parent.convertValueToPixel(r[0].dataPoint.y));
            z = u = 0;
            for (t = w; 0 <= t; t--) z += r[t].dataPoint.y, D = r[t].dataPoint.x.getTime ? r[t].dataPoint.x.getTime() : r[t].dataPoint.x, D = 100 * (z / r[t].dataSeries.plotUnit.dataPointYSums[D]), u = Math.abs(d - this.parent.convertValueToPixel(D)), u < v && (v = u, b = t);
            l = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(D) << 0) + 0.5 : this.parent.convertValueToPixel(D) << 0;
            h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : D
            }) : s(this.options.label) ? ea(c ? c : D, this.valueFormatString, this.chart._cultureInfo) : this.label;
            this.value = D;
          } else "waterfall" === this.parent.dataSeries[w].type ? (l = 1 === p.lineWidth % 2 ? (this.parent.convertValueToPixel(x.dataSeries.dataPointEOs[x.index].cumulativeSum) << 0) + 0.5 : this.parent.convertValueToPixel(x.dataSeries.dataPointEOs[x.index].cumulativeSum) << 0, h.text = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.parent.options,
            crosshair: this.options,
            value: c ? c : x.dataSeries.dataPointEOs[x.index].cumulativeSum
          }) : s(this.options.label) ? ea(c ? c : x.dataSeries.dataPointEOs[x.index].cumulativeSum, this.valueFormatString, this.chart._cultureInfo) : this.label, this.value = x.dataSeries.dataPointEOs[x.index].cumulativeSum) : (l = 1 === p.lineWidth % 2 ? (s(a) ? d : this.parent.convertValueToPixel(x.dataPoint.y) << 0) + 0.5 : s(a) ? d : this.parent.convertValueToPixel(x.dataPoint.y) << 0, h.text = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.parent.options,
            crosshair: this.options,
            value: x.dataPoint.y
          }) : s(this.options.label) ? ea(c ? c : x.dataPoint.y, this.valueFormatString, this.chart._cultureInfo) : this.label, this.value = x.dataPoint.y);
          f = k = l;
          b = this.chart.plotArea.x1;
          e = this.chart.plotArea.x2;
          this.bounds = {
            x1: b,
            y1: f - q / 2,
            x2: e,
            y2: k + q / 2
          };
          h.y = k + h.fontSize / 2 - h.measureText().height / 2 + 2;
          h.y - h.fontSize / 2 < this.chart.bounds.y1 ? h.y = this.chart.bounds.y1 + h.fontSize / 2 + 2 : h.y + h.measureText().height - h.fontSize / 2 > this.chart.bounds.y2 && (h.y = this.chart.bounds.y2 - h.measureText().height + h.fontSize / 2);
          "left" === this.parent._position ? h.x = this.parent.lineCoordinates.x2 - h.measureText().width : "right" === this.parent._position && (h.x = this.parent.lineCoordinates.x2);
        }
        r = null;
        if ("bottom" === this.parent._position || "top" === this.parent._position) "top" === this.parent._position && h.y - h.fontSize / 2 < this.chart.bounds.y1 && (h.y = this.chart.bounds.y1 + h.fontSize / 2), "bottom" === this.parent._position && this.parent.lineCoordinates.y2 - h.fontSize / 2 + h.measureText().height > this.chart.bounds.y2 && (h.y = this.chart.bounds.y2 - h.height + h.fontSize / 2 + 2), b >= this.parent.convertValueToPixel(this.parent.viewportMinimum) && e <= this.parent.convertValueToPixel(this.parent.viewportMaximum) && (0 < q && (p.moveTo(b, f), p.lineTo(e, k), p.stroke(), this._hidden = !1), p.restore(), !s(h.text) && ("number" === typeof h.text.valueOf() || 0 < h.text.length) && h.render(!0));
        if ("left" === this.parent._position || "right" === this.parent._position) "left" === this.parent._position && h.x < this.chart.bounds.x1 && (h.x = this.chart.bounds.x1), "right" === this.parent._position && h.x + h.measureText().width > this.chart.bounds.x2 && (h.x = this.chart.bounds.x2 - h.measureText().width), k >= this.parent.convertValueToPixel(this.parent.viewportMaximum) && f <= this.parent.convertValueToPixel(this.parent.viewportMinimum) && (0 < q && (p.moveTo(b, f), p.lineTo(e, k), p.stroke(), this._hidden = !1), p.restore(), !s(h.text) && ("number" === typeof h.text.valueOf() || 0 < h.text.length) && h.render(!0));
      } else {
        if ("bottom" === this.parent._position || "top" === this.parent._position) b = e = m = 1 === p.lineWidth % 2 ? (a << 0) + 0.5 : a << 0, f = this.chart.plotArea.y1, k = this.chart.plotArea.y2, this.bounds = {
          x1: b - q / 2,
          y1: f,
          x2: e + q / 2,
          y2: k
        };else if ("left" === this.parent._position || "right" === this.parent._position) f = k = l = 1 === p.lineWidth % 2 ? (d << 0) + 0.5 : d << 0, b = this.chart.plotArea.x1, e = this.chart.plotArea.x2, this.bounds = {
          x1: b,
          y1: f - q / 2,
          x2: e,
          y2: k + q / 2
        };
        if ("xySwapped" === this.chart.plotInfo.axisPlacement) {
          if ("left" === this.parent._position || "right" === this.parent._position) {
            D = !1;
            if (this.parent.labels) for (r = Math.ceil(this.parent.interval), t = 0; t < this.parent.viewportMaximum; t += r) if (this.parent.labels[t]) D = !0;else {
              D = !1;
              break;
            }
            if (D) {
              if ("axisX" === this.parent.type) for (t = this.parent.convertPixelToValue({
                y: d
              }), v = null, w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (h.text = this.labelFormatter ? this.labelFormatter({
                chart: this.chart,
                axis: this.parent.options,
                crosshair: this.options,
                value: c ? c : this.parent.convertPixelToValue(a)
              }) : s(this.options.label) ? v.dataPoint.label : this.label);
            } else "dateTime" === this.parent.valueType ? h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : this.parent.convertPixelToValue(d)
            }) : s(this.options.label) ? Aa(c ? c : this.parent.convertPixelToValue(d), this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : this.parent.convertPixelToValue(d)
            }) : s(this.options.label) ? ea(c ? c : this.parent.convertPixelToValue(d), this.valueFormatString, this.chart._cultureInfo) : this.label);
            h.y = d + h.fontSize / 2 - h.measureText().height / 2 + 2;
            h.y - h.fontSize / 2 < this.chart.bounds.y1 ? h.y = this.chart.bounds.y1 + h.fontSize / 2 + 2 : h.y + h.measureText().height - h.fontSize / 2 > this.chart.bounds.y2 && (h.y = this.chart.bounds.y2 - h.measureText().height + h.fontSize / 2);
            "left" === this.parent._position ? h.x = this.parent.lineCoordinates.x1 - h.measureText().width : "right" === this.parent._position && (h.x = this.parent.lineCoordinates.x2);
          } else {
            if ("bottom" === this.parent._position || "top" === this.parent._position) h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : this.parent.convertPixelToValue(a)
            }) : s(this.options.label) ? ea(c ? c : this.parent.convertPixelToValue(a), this.valueFormatString, this.chart._cultureInfo) : this.label, h.x = b - h.measureText().width / 2, h.x + h.width > this.chart.bounds.x2 && (h.x = this.chart.bounds.x2 - h.width), h.x < this.chart.bounds.x1 && (h.x = this.chart.bounds.x1), "bottom" === this.parent._position ? h.y = this.parent.lineCoordinates.y2 + h.fontSize / 2 + 2 : "top" === this.parent._position && (h.y = this.parent.lineCoordinates.y1 - h.height + h.fontSize / 2 + 2);
          }
        } else if ("bottom" === this.parent._position || "top" === this.parent._position) {
          D = !1;
          r = "";
          if (this.parent.labels) for (r = Math.ceil(this.parent.interval), t = 0; t < this.parent.viewportMaximum; t += r) if (this.parent.labels[t]) D = !0;else {
            D = !1;
            break;
          }
          if (D) {
            if ("axisX" === this.parent.type) for (t = this.parent.convertPixelToValue({
              x: a
            }), v = null, w = 0; w < this.parent.dataSeries.length; w++) (v = this.parent.dataSeries[w].getDataPointAtX(t, !0)) && 0 <= v.index && (h.text = this.labelFormatter ? this.labelFormatter({
              chart: this.chart,
              axis: this.parent.options,
              crosshair: this.options,
              value: c ? c : this.parent.convertPixelToValue(a)
            }) : s(this.options.label) ? c ? c : v.dataPoint.label : this.label);
          } else "dateTime" === this.parent.valueType ? h.text = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.parent.options,
            crosshair: this.options,
            value: c ? c : this.parent.convertPixelToValue(a)
          }) : s(this.options.label) ? Aa(c ? c : this.parent.convertPixelToValue(a), this.valueFormatString, this.chart._cultureInfo) : this.label : "number" === this.parent.valueType && (h.text = this.labelFormatter ? this.labelFormatter({
            chart: this.chart,
            axis: this.parent.options,
            crosshair: this.options,
            value: c ? c : 0 < this.parent.dataSeries.length ? this.parent.convertPixelToValue(a) : ""
          }) : s(this.options.label) ? ea(c ? c : this.parent.convertPixelToValue(a), this.valueFormatString, this.chart._cultureInfo) : this.label);
          h.x = b - h.measureText().width / 2;
          h.x + h.width > this.chart.bounds.x2 && (h.x = this.chart.bounds.x2 - h.width);
          h.x < this.chart.bounds.x1 && (h.x = this.chart.bounds.x1);
          "bottom" === this.parent._position ? h.y = this.parent.lineCoordinates.y2 + h.fontSize / 2 + 2 : "top" === this.parent._position && (h.y = this.parent.lineCoordinates.y1 - h.height + h.fontSize / 2 + 2);
        } else if ("left" === this.parent._position || "right" === this.parent._position) h.text = this.labelFormatter ? this.labelFormatter({
          chart: this.chart,
          axis: this.parent.options,
          crosshair: this.options,
          value: c ? c : this.parent.convertPixelToValue(d)
        }) : s(this.options.label) ? ea(c ? c : this.parent.convertPixelToValue(d), this.valueFormatString, this.chart._cultureInfo) : this.label, h.y = d + h.fontSize / 2 - h.measureText().height / 2 + 2, h.y - h.fontSize / 2 < this.chart.bounds.y1 ? h.y = this.chart.bounds.y1 + h.fontSize / 2 + 2 : h.y + h.measureText().height - h.fontSize / 2 > this.chart.bounds.y2 && (h.y = this.chart.bounds.y2 - h.measureText().height + h.fontSize / 2), "left" === this.parent._position ? h.x = this.parent.lineCoordinates.x2 - h.measureText().width : "right" === this.parent._position && (h.x = this.parent.lineCoordinates.x2);
        "left" === this.parent._position && h.x < this.chart.bounds.x1 ? h.x = this.chart.bounds.x1 : "right" === this.parent._position && h.x + h.measureText().width > this.chart.bounds.x2 ? h.x = this.chart.bounds.x2 - h.measureText().width : "top" === this.parent._position && h.y - h.fontSize / 2 < this.chart.bounds.y1 ? h.y = this.chart.bounds.y1 + h.fontSize / 2 : "bottom" === this.parent._position && this.parent.lineCoordinates.y2 - h.fontSize / 2 + h.measureText().height > this.chart.bounds.y2 && (h.y = this.chart.bounds.y2 - h.height + h.fontSize / 2 + 2);
        0 < q && (p.moveTo(b, f), p.lineTo(e, k), p.stroke(), this._hidden = !1);
        p.restore();
        !s(h.text) && ("number" === typeof h.text.valueOf() || 0 < h.text.length) && h.render(!0);
        this.value = "bottom" === this.parent._position || "top" === this.parent._position ? this.parent.convertPixelToValue(a) : this.parent.convertPixelToValue(d);
      }
      if ("bottom" === this.parent._position || "top" === this.parent._position) this._updatedValue = this.parent.convertPixelToValue(m);
      if ("left" === this.parent._position || "right" === this.parent._position) this._updatedValue = this.parent.convertPixelToValue(l);
      p.globalAlpha = g;
    };
    oa(X, V);
    X.prototype._initialize = function () {
      this.updateOption("updated");
      this.updateOption("hidden");
      if (this.enabled) {
        this.container = document.createElement("div");
        this.container.setAttribute("class", "canvasjs-chart-tooltip");
        this.container.style.position = "absolute";
        this.container.style.height = "auto";
        this.container.style.boxShadow = "1px 1px 2px 2px rgba(0,0,0,0.1)";
        this.container.style.zIndex = "1000";
        this.container.style.pointerEvents = "none";
        this.container.style.display = "none";
        var a;
        a = '<div style=" width: auto;height: auto;min-width: 50px;';
        a += "line-height: auto;";
        a += "margin: 0px 0px 0px 0px;";
        a += "padding: 5px;";
        a += "font-family: Calibri, Arial, Georgia, serif;";
        a += "font-weight: normal;";
        a += "font-style: " + (t ? "italic;" : "normal;");
        a += "font-size: 14px;";
        a += "color: #000000;";
        a += "text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);";
        a += "text-align: left;";
        a += "border: 2px solid gray;";
        a += t ? "background: rgba(255,255,255,.9);" : "background: rgb(255,255,255);";
        a += "text-indent: 0px;";
        a += "white-space: nowrap;";
        a += "border-radius: 5px;";
        a += "-moz-user-select:none;";
        a += "-khtml-user-select: none;";
        a += "-webkit-user-select: none;";
        a += "-ms-user-select: none;";
        a += "user-select: none;";
        t || (a += "filter: alpha(opacity = 90);", a += "filter: progid:DXImageTransform.Microsoft.Shadow(Strength=3, Direction=135, Color='#666666');");
        a += '} "> Sample Tooltip</div>';
        this.container.innerHTML = a;
        this.contentDiv = this.container.firstChild;
        this.container.style.borderRadius = this.contentDiv.style.borderRadius;
        this.chart._canvasJSContainer.appendChild(this.container);
      }
    };
    X.prototype.mouseMoveHandler = function (a, d) {
      this._lastUpdated && 4 > new Date().getTime() - this._lastUpdated || (this._lastUpdated = new Date().getTime(), this.chart.resetOverlayedCanvas(), this._updateToolTip(a, d));
    };
    X.prototype._updateToolTip = function (a, d, c) {
      c = "undefined" === typeof c ? !0 : c;
      this.container || this._initialize();
      this.enabled || (this.hide(), this.dispatchEvent("hidden", {
        chart: this.chart,
        toolTip: this
      }, this));
      if (!this.chart.disableToolTip) {
        if ("undefined" === typeof a || "undefined" === typeof d) {
          if (isNaN(this._prevX) || isNaN(this._prevY)) return;
          a = this._prevX;
          d = this._prevY;
        } else this._prevX = a, this._prevY = d;
        var b = null,
          e = null,
          f = [],
          k = 0;
        if (this.shared && this.enabled && "none" !== this.chart.plotInfo.axisPlacement) {
          if ("xySwapped" === this.chart.plotInfo.axisPlacement) {
            var m = [];
            if (this.chart.axisX) for (var l = 0; l < this.chart.axisX.length; l++) {
              for (var k = this.chart.axisX[l].convertPixelToValue({
                  y: d
                }), h = null, b = 0; b < this.chart.axisX[l].dataSeries.length; b++) (h = this.chart.axisX[l].dataSeries[b].getDataPointAtX(k, c)) && 0 <= h.index && (h.dataSeries = this.chart.axisX[l].dataSeries[b], null !== h.dataPoint.y && m.push(h));
              h = null;
            }
            if (this.chart.axisX2) for (l = 0; l < this.chart.axisX2.length; l++) {
              k = this.chart.axisX2[l].convertPixelToValue({
                y: d
              });
              h = null;
              for (b = 0; b < this.chart.axisX2[l].dataSeries.length; b++) (h = this.chart.axisX2[l].dataSeries[b].getDataPointAtX(k, c)) && 0 <= h.index && (h.dataSeries = this.chart.axisX2[l].dataSeries[b], null !== h.dataPoint.y && m.push(h));
              h = null;
            }
          } else {
            m = [];
            if (this.chart.axisX) for (l = 0; l < this.chart.axisX.length; l++) for (k = this.chart.axisX[l].convertPixelToValue({
              x: a
            }), h = null, b = 0; b < this.chart.axisX[l].dataSeries.length; b++) (h = this.chart.axisX[l].dataSeries[b].getDataPointAtX(k, c)) && 0 <= h.index && (h.dataSeries = this.chart.axisX[l].dataSeries[b], null !== h.dataPoint.y && m.push(h));
            if (this.chart.axisX2) for (l = 0; l < this.chart.axisX2.length; l++) for (k = this.chart.axisX2[l].convertPixelToValue({
              x: a
            }), h = null, b = 0; b < this.chart.axisX2[l].dataSeries.length; b++) (h = this.chart.axisX2[l].dataSeries[b].getDataPointAtX(k, c)) && 0 <= h.index && (h.dataSeries = this.chart.axisX2[l].dataSeries[b], null !== h.dataPoint.y && m.push(h));
          }
          if (0 === m.length) return;
          m.sort(function (a, b) {
            return a.distance - b.distance;
          });
          c = m[0];
          for (b = 0; b < m.length; b++) m[b].dataPoint.x.valueOf() === c.dataPoint.x.valueOf() && f.push(m[b]);
          m = null;
        } else {
          if (h = this.chart.getDataPointAtXY(a, d, c)) this.currentDataPointIndex = h.dataPointIndex, this.currentSeriesIndex = h.dataSeries.index;else if (t) {
            if (h = Za(a, d, this.chart._eventManager.ghostCtx), 0 < h && "undefined" !== typeof this.chart._eventManager.objectMap[h]) {
              h = this.chart._eventManager.objectMap[h];
              if ("legendItem" === h.objectType) return;
              this.currentSeriesIndex = h.dataSeriesIndex;
              this.currentDataPointIndex = 0 <= h.dataPointIndex ? h.dataPointIndex : -1;
            } else this.currentDataPointIndex = -1;
          } else this.currentDataPointIndex = -1;
          if (0 <= this.currentSeriesIndex) {
            e = this.chart.data[this.currentSeriesIndex];
            h = {};
            if (0 <= this.currentDataPointIndex) b = e.dataPoints[this.currentDataPointIndex], h.dataSeries = e, h.dataPoint = b, h.index = this.currentDataPointIndex, h.distance = Math.abs(b.x - k), "waterfall" === e.type && (h.cumulativeSumYStartValue = e.dataPointEOs[this.currentDataPointIndex].cumulativeSumYStartValue, h.cumulativeSum = e.dataPointEOs[this.currentDataPointIndex].cumulativeSum);else {
              if (!this.enabled || "line" !== e.type && "stepLine" !== e.type && "spline" !== e.type && "area" !== e.type && "stepArea" !== e.type && "splineArea" !== e.type && "stackedArea" !== e.type && "stackedArea100" !== e.type && "rangeArea" !== e.type && "rangeSplineArea" !== e.type && "candlestick" !== e.type && "ohlc" !== e.type && "boxAndWhisker" !== e.type) return;
              k = e.axisX.convertPixelToValue({
                x: a
              });
              h = e.getDataPointAtX(k, c);
              s(h) || (h.dataSeries = e, this.currentDataPointIndex = h.index, b = h.dataPoint);
            }
            if (!s(h) && !s(h.dataPoint) && !s(h.dataPoint.y)) if (h.dataSeries.axisY) {
              if (0 < h.dataPoint.y.length) {
                for (b = c = 0; b < h.dataPoint.y.length; b++) h.dataPoint.y[b] < h.dataSeries.axisY.viewportMinimum ? c-- : h.dataPoint.y[b] > h.dataSeries.axisY.viewportMaximum && c++;
                c < h.dataPoint.y.length && c > -h.dataPoint.y.length && f.push(h);
              } else "column" === e.type || "bar" === e.type ? 0 > h.dataPoint.y ? 0 > h.dataSeries.axisY.viewportMinimum && h.dataSeries.axisY.viewportMaximum >= h.dataPoint.y && f.push(h) : h.dataSeries.axisY.viewportMinimum <= h.dataPoint.y && 0 <= h.dataSeries.axisY.viewportMaximum && f.push(h) : "bubble" === e.type ? (c = this.chart._eventManager.objectMap[e.dataPointIds[h.index]].size / 2, h.dataPoint.y >= h.dataSeries.axisY.viewportMinimum - c && h.dataPoint.y <= h.dataSeries.axisY.viewportMaximum + c && f.push(h)) : "waterfall" === e.type ? (c = 0, h.cumulativeSumYStartValue < h.dataSeries.axisY.viewportMinimum ? c-- : h.cumulativeSumYStartValue > h.dataSeries.axisY.viewportMaximum && c++, h.cumulativeSum < h.dataSeries.axisY.viewportMinimum ? c-- : h.cumulativeSum > h.dataSeries.axisY.viewportMaximum && c++, 2 > c && -2 < c && f.push(h)) : (0 <= h.dataSeries.type.indexOf("100") || "stackedColumn" === e.type || "stackedBar" === e.type || h.dataPoint.y >= h.dataSeries.axisY.viewportMinimum && h.dataPoint.y <= h.dataSeries.axisY.viewportMaximum) && f.push(h);
            } else f.push(h);
          }
        }
        if (0 < f.length) {
          this.highlightObjects(f);
          if (this.enabled) {
            var r = "",
              r = this.getToolTipInnerHTML({
                entries: f
              });
            if (null !== r) {
              this.contentDiv.innerHTML = r;
              c = !1;
              "none" === this.container.style.display && (c = !0, this.container.style.display = "block");
              try {
                this.contentDiv.style.background = this.backgroundColor ? this.backgroundColor : t ? "rgba(255,255,255,.9)" : "rgb(255,255,255)", this.borderColor = "waterfall" === f[0].dataSeries.type ? this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : f[0].dataPoint.color ? f[0].dataPoint.color : 0 < f[0].dataPoint.y ? f[0].dataSeries.risingColor : f[0].dataSeries.fallingColor : "error" === f[0].dataSeries.type ? this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : f[0].dataSeries.color ? f[0].dataSeries.color : f[0].dataSeries._colorSet[e.index % f[0].dataSeries._colorSet.length] : this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : f[0].dataPoint.color ? f[0].dataPoint.color : f[0].dataSeries.color ? f[0].dataSeries.color : f[0].dataSeries._colorSet[f[0].index % f[0].dataSeries._colorSet.length], this.contentDiv.style.borderWidth = this.borderThickness || 0 === this.borderThickness ? this.borderThickness + "px" : "2px", this.contentDiv.style.borderRadius = this.cornerRadius || 0 === this.cornerRadius ? this.cornerRadius + "px" : "5px", this.container.style.borderRadius = this.contentDiv.style.borderRadius, this.contentDiv.style.fontSize = this.fontSize || 0 === this.fontSize ? this.fontSize + "px" : "14px", this.contentDiv.style.color = this.fontColor ? this.fontColor : "#000000", this.contentDiv.style.fontFamily = this.fontFamily ? this.fontFamily : "Calibri, Arial, Georgia, serif;", this.contentDiv.style.fontWeight = this.fontWeight ? this.fontWeight : "normal", this.contentDiv.style.fontStyle = this.fontStyle ? this.fontStyle : t ? "italic" : "normal";
              } catch (q) {}
              "pie" === f[0].dataSeries.type || "doughnut" === f[0].dataSeries.type || "funnel" === f[0].dataSeries.type || "pyramid" === f[0].dataSeries.type || "bar" === f[0].dataSeries.type || "rangeBar" === f[0].dataSeries.type || "stackedBar" === f[0].dataSeries.type || "stackedBar100" === f[0].dataSeries.type ? a = a - 10 - this.container.clientWidth : (a = f[0].dataSeries.axisX.convertValueToPixel(f[0].dataPoint.x) - this.container.clientWidth << 0, a -= 10);
              0 > a && (a += this.container.clientWidth + 20);
              a + this.container.clientWidth > Math.max(this.chart.container.clientWidth, this.chart.width) && (a = Math.max(0, Math.max(this.chart.container.clientWidth, this.chart.width) - this.container.clientWidth));
              d = 1 !== f.length || this.shared || "line" !== f[0].dataSeries.type && "stepLine" !== f[0].dataSeries.type && "spline" !== f[0].dataSeries.type && "area" !== f[0].dataSeries.type && "stepArea" !== f[0].dataSeries.type && "splineArea" !== f[0].dataSeries.type ? "bar" === f[0].dataSeries.type || "rangeBar" === f[0].dataSeries.type || "stackedBar" === f[0].dataSeries.type || "stackedBar100" === f[0].dataSeries.type ? f[0].dataSeries.axisX.convertValueToPixel(f[0].dataPoint.x) : d : f[0].dataSeries.axisY.convertValueToPixel(f[0].dataPoint.y);
              d = -d + 10;
              0 < d + this.container.clientHeight + 5 && (d -= d + this.container.clientHeight + 5 - 0);
              this.fixMozTransitionDelay(a, d);
              !this.animationEnabled || c ? this.disableAnimation() : (this.enableAnimation(), this.container.style.MozTransition = this.mozContainerTransition);
              this.positionLeft = a;
              this.positionBottom = d;
              this.container.style.left = a + "px";
              this.container.style.bottom = d + "px";
            } else this.hide(!1), this.dispatchEvent("hidden", {
              chart: this.chart,
              toolTip: this
            }, this);
          }
          d = [];
          for (b = 0; b < f.length; b++) d.push({
            xValue: f[b].dataPoint.x,
            dataPoint: f[b].dataPoint,
            dataSeries: f[b].dataSeries,
            dataPointIndex: f[b].index,
            dataSeriesIndex: f[b].dataSeries._index
          });
          r = {
            chart: this.chart,
            toolTip: this.options,
            content: r,
            entries: d
          };
          this._entries = f;
          this.dispatchEvent("updated", r, this);
        } else this.hide();
      }
    };
    X.prototype.highlightObjects = function (a) {
      var d = this.chart.overlaidCanvasCtx;
      if (s(this.chart.clearedOverlayedCanvas) || "toolTip" === this.chart.clearedOverlayedCanvas) this.chart.resetOverlayedCanvas(), d.clearRect(0, 0, this.chart.width, this.chart.height), this.chart.clearedOverlayedCanvas = "toolTip";
      d.save();
      var c = this.chart.plotArea,
        b = 0;
      d.beginPath();
      d.rect(c.x1, c.y1, c.x2 - c.x1, c.y2 - c.y1);
      d.clip();
      for (c = 0; c < a.length; c++) {
        var e = a[c];
        if ((e = this.chart._eventManager.objectMap[e.dataSeries.dataPointIds[e.index]]) && e.objectType && "dataPoint" === e.objectType) {
          var b = this.chart.data[e.dataSeriesIndex],
            f = b.dataPoints[e.dataPointIndex],
            k = e.dataPointIndex;
          !1 === f.highlightEnabled || !0 !== b.highlightEnabled && !0 !== f.highlightEnabled || ("line" === b.type || "stepLine" === b.type || "spline" === b.type || "scatter" === b.type || "area" === b.type || "stepArea" === b.type || "splineArea" === b.type || "stackedArea" === b.type || "stackedArea100" === b.type || "rangeArea" === b.type || "rangeSplineArea" === b.type ? (f = b.getMarkerProperties(k, e.x1, e.y1, this.chart.overlaidCanvasCtx), f.size = Math.max(1.5 * f.size << 0, 10), f.borderColor = f.borderColor || "#FFFFFF", f.borderThickness = f.borderThickness || Math.ceil(0.1 * f.size), W.drawMarkers([f]), "undefined" !== typeof e.y2 && (f = b.getMarkerProperties(k, e.x1, e.y2, this.chart.overlaidCanvasCtx), f.size = Math.max(1.5 * f.size << 0, 10), f.borderColor = f.borderColor || "#FFFFFF", f.borderThickness = f.borderThickness || Math.ceil(0.1 * f.size), W.drawMarkers([f]))) : "bubble" === b.type ? (f = b.getMarkerProperties(k, e.x1, e.y1, this.chart.overlaidCanvasCtx), f.size = e.size, f.color = "white", f.borderColor = "white", d.globalAlpha = 0.3, W.drawMarkers([f]), d.globalAlpha = 1) : "column" === b.type || "stackedColumn" === b.type || "stackedColumn100" === b.type || "bar" === b.type || "rangeBar" === b.type || "stackedBar" === b.type || "stackedBar100" === b.type || "rangeColumn" === b.type || "waterfall" === b.type ? ba(d, e.x1, e.y1, e.x2, e.y2, "white", 0, null, !1, !1, !1, !1, 0.3) : "pie" === b.type || "doughnut" === b.type ? Y(d, e.center, e.radius, "white", b.type, e.startAngle, e.endAngle, 0.3, e.percentInnerRadius) : "funnel" === b.type || "pyramid" === b.type ? qa(d, e.funnelSection, 0.3, "white") : "candlestick" === b.type ? (d.globalAlpha = 1, d.strokeStyle = e.color, d.lineWidth = 2 * e.borderThickness, b = 0 === d.lineWidth % 2 ? 0 : 0.5, d.beginPath(), d.moveTo(e.x3 - b, Math.min(e.y2, e.y3)), d.lineTo(e.x3 - b, Math.min(e.y1, e.y4)), d.stroke(), d.beginPath(), d.moveTo(e.x3 - b, Math.max(e.y1, e.y4)), d.lineTo(e.x3 - b, Math.max(e.y2, e.y3)), d.stroke(), ba(d, e.x1, Math.min(e.y1, e.y4), e.x2, Math.max(e.y1, e.y4), "transparent", 2 * e.borderThickness, e.color, !1, !1, !1, !1), d.globalAlpha = 1) : "ohlc" === b.type ? (d.globalAlpha = 1, d.strokeStyle = e.color, d.lineWidth = 2 * e.borderThickness, b = 0 === d.lineWidth % 2 ? 0 : 0.5, d.beginPath(), d.moveTo(e.x3 - b, e.y2), d.lineTo(e.x3 - b, e.y3), d.stroke(), d.beginPath(), d.moveTo(e.x3, e.y1), d.lineTo(e.x1, e.y1), d.stroke(), d.beginPath(), d.moveTo(e.x3, e.y4), d.lineTo(e.x2, e.y4), d.stroke(), d.globalAlpha = 1) : "boxAndWhisker" === b.type ? (d.save(), d.globalAlpha = 1, d.strokeStyle = e.stemColor, d.lineWidth = 2 * e.stemThickness, 0 < e.stemThickness && (d.beginPath(), d.moveTo(e.x3, e.y2 + e.borderThickness / 2), d.lineTo(e.x3, e.y1 + e.whiskerThickness / 2), d.stroke(), d.beginPath(), d.moveTo(e.x3, e.y4 - e.whiskerThickness / 2), d.lineTo(e.x3, e.y3 - e.borderThickness / 2), d.stroke()), d.beginPath(), ba(d, e.x1 - e.borderThickness / 2, Math.max(e.y2 + e.borderThickness / 2, e.y3 + e.borderThickness / 2), e.x2 + e.borderThickness / 2, Math.min(e.y2 - e.borderThickness / 2, e.y3 - e.borderThickness / 2), "transparent", e.borderThickness, e.color, !1, !1, !1, !1), d.globalAlpha = 1, d.strokeStyle = e.whiskerColor, d.lineWidth = 2 * e.whiskerThickness, 0 < e.whiskerThickness && (d.beginPath(), d.moveTo(Math.floor(e.x3 - e.whiskerLength / 2), e.y4), d.lineTo(Math.ceil(e.x3 + e.whiskerLength / 2), e.y4), d.stroke(), d.beginPath(), d.moveTo(Math.floor(e.x3 - e.whiskerLength / 2), e.y1), d.lineTo(Math.ceil(e.x3 + e.whiskerLength / 2), e.y1), d.stroke()), d.globalAlpha = 1, d.strokeStyle = e.lineColor, d.lineWidth = 2 * e.lineThickness, 0 < e.lineThickness && (d.beginPath(), d.moveTo(e.x1, e.y5), d.lineTo(e.x2, e.y5), d.stroke()), d.restore(), d.globalAlpha = 1) : "error" === b.type && w(d, e.x1, e.y1, e.x2, e.y2, "white", e.whiskerProperties, e.stemProperties, e.isXYSwapped, 0.3));
        }
      }
      d.restore();
      d.globalAlpha = 1;
      d.beginPath();
    };
    X.prototype.getToolTipInnerHTML = function (a) {
      a = a.entries;
      for (var d = null, c = null, b = null, e = 0, f = "", k = !0, l = 0; l < a.length; l++) if (a[l].dataSeries.toolTipContent || a[l].dataPoint.toolTipContent) {
        k = !1;
        break;
      }
      if (k && (this.content && "function" === typeof this.content || this.contentFormatter)) a = {
        chart: this.chart,
        toolTip: this.options,
        entries: a
      }, d = this.contentFormatter ? this.contentFormatter(a) : this.content(a);else if (this.shared && "none" !== this.chart.plotInfo.axisPlacement) {
        for (var s = null, h = "", l = 0; l < a.length; l++) c = a[l].dataSeries, b = a[l].dataPoint, e = a[l].index, f = "", 0 === l && k && !this.content && (this.chart.axisX && 0 < this.chart.axisX.length ? h += "undefined" !== typeof this.chart.axisX[0].labels[b.x] ? this.chart.axisX[0].labels[b.x] : "{x}" : this.chart.axisX2 && 0 < this.chart.axisX2.length && (h += "undefined" !== typeof this.chart.axisX2[0].labels[b.x] ? this.chart.axisX2[0].labels[b.x] : "{x}"), h += "</br>", h = this.chart.replaceKeywordsWithValue(h, b, c, e)), null === b.toolTipContent || "undefined" === typeof b.toolTipContent && null === c.options.toolTipContent || ("line" === c.type || "stepLine" === c.type || "spline" === c.type || "area" === c.type || "stepArea" === c.type || "splineArea" === c.type || "column" === c.type || "bar" === c.type || "scatter" === c.type || "stackedColumn" === c.type || "stackedColumn100" === c.type || "stackedBar" === c.type || "stackedBar100" === c.type || "stackedArea" === c.type || "stackedArea100" === c.type || "waterfall" === c.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (f += s != c.axisXIndex ? c.axisX.title ? c.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), f += b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y}", s = c.axisXIndex) : "bubble" === c.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (f += s != c.axisXIndex ? c.axisX.title ? c.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), f += b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}") : "rangeColumn" === c.type || "rangeBar" === c.type || "rangeArea" === c.type || "rangeSplineArea" === c.type || "error" === c.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (f += s != c.axisXIndex ? c.axisX.title ? c.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), f += b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span>&nbsp;&nbsp;{y[0]},&nbsp;{y[1]}") : "candlestick" === c.type || "ohlc" === c.type ? (this.chart.axisX && 1 < this.chart.axisX.length && (f += s != c.axisXIndex ? c.axisX.title ? c.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), f += b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low:&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}") : "boxAndWhisker" === c.type && (this.chart.axisX && 1 < this.chart.axisX.length && (f += s != c.axisXIndex ? c.axisX.title ? c.axisX.title + "<br/>" : "X:{axisXIndex}<br/>" : ""), f += b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>{name}:</span><br/>Minimum: &nbsp;&nbsp;{y[0]}<br/>Q1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[1]}<br/>Q2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[4]}<br/>Q3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Maximum: &nbsp;{y[3]}"), null === d && (d = ""), !0 === this.reversed ? (d = this.chart.replaceKeywordsWithValue(f, b, c, e) + d, l < a.length - 1 && (d = "</br>" + d)) : (d += this.chart.replaceKeywordsWithValue(f, b, c, e), l < a.length - 1 && (d += "</br>")));
        null !== d && (d = h + d);
      } else {
        c = a[0].dataSeries;
        b = a[0].dataPoint;
        e = a[0].index;
        if (null === b.toolTipContent || "undefined" === typeof b.toolTipContent && null === c.options.toolTipContent) return null;
        "line" === c.type || "stepLine" === c.type || "spline" === c.type || "area" === c.type || "stepArea" === c.type || "splineArea" === c.type || "column" === c.type || "bar" === c.type || "scatter" === c.type || "stackedColumn" === c.type || "stackedColumn100" === c.type || "stackedBar" === c.type || "stackedBar100" === c.type || "stackedArea" === c.type || "stackedArea100" === c.type || "waterfall" === c.type ? f = b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (b.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}" : "bubble" === c.type ? f = b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (b.label ? "{label}" : "{x}") + ":</span>&nbsp;&nbsp;{y}, &nbsp;&nbsp;{z}" : "pie" === c.type || "doughnut" === c.type || "funnel" === c.type || "pyramid" === c.type ? f = b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (b.name ? "{name}:</span>&nbsp;&nbsp;" : b.label ? "{label}:</span>&nbsp;&nbsp;" : "</span>") + "{y}" : "rangeColumn" === c.type || "rangeBar" === c.type || "rangeArea" === c.type || "rangeSplineArea" === c.type || "error" === c.type ? f = b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (b.label ? "{label}" : "{x}") + " :</span>&nbsp;&nbsp;{y[0]}, &nbsp;{y[1]}" : "candlestick" === c.type || "ohlc" === c.type ? f = b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (b.label ? "{label}" : "{x}") + "</span><br/>Open: &nbsp;&nbsp;{y[0]}<br/>High: &nbsp;&nbsp;&nbsp;{y[1]}<br/>Low: &nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Close: &nbsp;&nbsp;{y[3]}" : "boxAndWhisker" === c.type && (f = b.toolTipContent ? b.toolTipContent : c.toolTipContent ? c.toolTipContent : this.content && "function" !== typeof this.content ? this.content : "<span style='\"" + (this.options.fontColor ? "" : "'color:{color};'") + "\"'>" + (b.label ? "{label}" : "{x}") + "</span><br/>Minimum: &nbsp;&nbsp;{y[0]}<br/>Q1: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[1]}<br/>Q2: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[4]}<br/>Q3: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{y[2]}<br/>Maximum: &nbsp;{y[3]}");
        null === d && (d = "");
        d += this.chart.replaceKeywordsWithValue(f, b, c, e);
      }
      return d;
    };
    X.prototype.enableAnimation = function () {
      if (!this.container.style.WebkitTransition) {
        var a = this.getContainerTransition(this.containerTransitionDuration);
        this.container.style.WebkitTransition = a;
        this.container.style.MsTransition = a;
        this.container.style.transition = a;
        this.container.style.MozTransition = this.mozContainerTransition;
      }
    };
    X.prototype.disableAnimation = function () {
      this.container.style.WebkitTransition && (this.container.style.WebkitTransition = "", this.container.style.MozTransition = "", this.container.style.MsTransition = "", this.container.style.transition = "");
    };
    X.prototype.hide = function (a) {
      this.container && (this.container.style.display = "none", this.currentSeriesIndex = -1, this._prevY = this._prevX = NaN, ("undefined" === typeof a || a) && this.chart.resetOverlayedCanvas());
    };
    X.prototype.show = function (a, d, c) {
      this._updateToolTip(a, d, "undefined" === typeof c ? !1 : c);
    };
    X.prototype.showAtIndex = function (a, d) {};
    X.prototype.showAtX = function (a, d) {
      if (!this.enabled) return !1;
      this.chart.clearedOverlayedCanvas = null;
      var c,
        b,
        e,
        f = [];
      e = !1;
      d = !s(d) && 0 <= d && d < this.chart.data.length ? d : 0;
      if (this.shared) for (var k = 0; k < this.chart.data.length; k++) c = this.chart.data[k], (b = c.getDataPointAtX(a, !1)) && b.dataPoint && !s(b.dataPoint.y) && c.visible && (b.dataSeries = c, f.push(b));else c = this.chart.data[d], (b = c.getDataPointAtX(a, !1)) && b.dataPoint && !s(b.dataPoint.y) && c.visible && (b.dataSeries = c, f.push(b));
      if (0 < f.length) {
        for (k = 0; k < f.length; k++) if (b = f[k], b.dataPoint.x < b.dataSeries.axisX.viewportMinimum || b.dataPoint.x > b.dataSeries.axisX.viewportMaximum || b.dataPoint.y < b.dataSeries.axisY.viewportMinimum || b.dataPoint.y > b.dataSeries.axisY.viewportMaximum) e = !0;else {
          e = !1;
          break;
        }
        if (e) return this.hide(), !1;
        this.highlightObjects(f);
        this._entries = f;
        b = "";
        b = this.getToolTipInnerHTML({
          entries: f
        });
        if (null !== b) {
          this.contentDiv.innerHTML = b;
          b = !1;
          "none" === this.container.style.display && (b = !0, this.container.style.display = "block");
          try {
            this.contentDiv.style.background = this.backgroundColor ? this.backgroundColor : t ? "rgba(255,255,255,.9)" : "rgb(255,255,255)", this.borderColor = "waterfall" === f[0].dataSeries.type ? this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : f[0].dataPoint.color ? f[0].dataPoint.color : 0 < f[0].dataPoint.y ? f[0].dataSeries.risingColor : f[0].dataSeries.fallingColor : "error" === f[0].dataSeries.type ? this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : f[0].dataSeries.color ? f[0].dataSeries.color : f[0].dataSeries._colorSet[c.index % f[0].dataSeries._colorSet.length] : this.contentDiv.style.borderRightColor = this.contentDiv.style.borderLeftColor = this.contentDiv.style.borderColor = this.options.borderColor ? this.options.borderColor : f[0].dataPoint.color ? f[0].dataPoint.color : f[0].dataSeries.color ? f[0].dataSeries.color : f[0].dataSeries._colorSet[f[0].index % f[0].dataSeries._colorSet.length], this.contentDiv.style.borderWidth = this.borderThickness || 0 === this.borderThickness ? this.borderThickness + "px" : "2px", this.contentDiv.style.borderRadius = this.cornerRadius || 0 === this.cornerRadius ? this.cornerRadius + "px" : "5px", this.container.style.borderRadius = this.contentDiv.style.borderRadius, this.contentDiv.style.fontSize = this.fontSize || 0 === this.fontSize ? this.fontSize + "px" : "14px", this.contentDiv.style.color = this.fontColor ? this.fontColor : "#000000", this.contentDiv.style.fontFamily = this.fontFamily ? this.fontFamily : "Calibri, Arial, Georgia, serif;", this.contentDiv.style.fontWeight = this.fontWeight ? this.fontWeight : "normal", this.contentDiv.style.fontStyle = this.fontStyle ? this.fontStyle : t ? "italic" : "normal";
          } catch (l) {}
          "pie" === f[0].dataSeries.type || "doughnut" === f[0].dataSeries.type || "funnel" === f[0].dataSeries.type || "pyramid" === f[0].dataSeries.type ? c = mouseX - 10 - this.container.clientWidth : (c = "bar" === f[0].dataSeries.type || "rangeBar" === f[0].dataSeries.type || "stackedBar" === f[0].dataSeries.type || "stackedBar100" === f[0].dataSeries.type ? f[0].dataSeries.axisY.convertValueToPixel(f[0].dataPoint.y) - this.container.clientWidth << 0 : f[0].dataSeries.axisX.convertValueToPixel(f[0].dataPoint.x) - this.container.clientWidth << 0, c -= 10);
          0 > c && (c += this.container.clientWidth + 20);
          c + this.container.clientWidth > Math.max(this.chart.container.clientWidth, this.chart.width) && (c = Math.max(0, Math.max(this.chart.container.clientWidth, this.chart.width) - this.container.clientWidth));
          f = 1 !== f.length || this.shared || "line" !== f[0].dataSeries.type && "stepLine" !== f[0].dataSeries.type && "spline" !== f[0].dataSeries.type && "area" !== f[0].dataSeries.type && "stepArea" !== f[0].dataSeries.type && "splineArea" !== f[0].dataSeries.type ? "bar" === f[0].dataSeries.type || "rangeBar" === f[0].dataSeries.type || "stackedBar" === f[0].dataSeries.type || "stackedBar100" === f[0].dataSeries.type ? f[0].dataSeries.axisX.convertValueToPixel(f[0].dataPoint.x) : f[0].dataSeries.axisY.convertValueToPixel(f[0].dataPoint.y) : f[0].dataSeries.axisY.convertValueToPixel(f[0].dataPoint.y);
          f = -f + 10;
          0 < f + this.container.clientHeight + 5 && (f -= f + this.container.clientHeight + 5 - 0);
          this.fixMozTransitionDelay(c, f);
          !this.animationEnabled || b ? this.disableAnimation() : (this.enableAnimation(), this.container.style.MozTransition = this.mozContainerTransition);
          this.container.style.left = c + "px";
          this.container.style.bottom = f + "px";
        } else return this.hide(!1), !1;
      } else return this.hide(), !1;
      return !0;
    };
    X.prototype.fixMozTransitionDelay = function (a, d) {
      if (20 < this.chart._eventManager.lastObjectId) this.mozContainerTransition = this.getContainerTransition(0);else {
        var c = parseFloat(this.container.style.left),
          c = isNaN(c) ? 0 : c,
          b = parseFloat(this.container.style.bottom),
          b = isNaN(b) ? 0 : b;
        10 < Math.sqrt(Math.pow(c - a, 2) + Math.pow(b - d, 2)) ? this.mozContainerTransition = this.getContainerTransition(0.1) : this.mozContainerTransition = this.getContainerTransition(0);
      }
    };
    X.prototype.getContainerTransition = function (a) {
      return "left " + a + "s ease-out 0s, bottom " + a + "s ease-out 0s";
    };
    ca.prototype.reset = function () {
      this.lastObjectId = 0;
      this.objectMap = [];
      this.rectangularRegionEventSubscriptions = [];
      this.previousDataPointEventObject = null;
      this.eventObjects = [];
      t && (this.ghostCtx.clearRect(0, 0, this.chart.width, this.chart.height), this.ghostCtx.beginPath());
    };
    ca.prototype.getNewObjectTrackingId = function () {
      return ++this.lastObjectId;
    };
    ca.prototype.mouseEventHandler = function (a) {
      if ("mousemove" === a.type || "click" === a.type) {
        var d = [],
          c = Oa(a),
          b = null;
        if ((b = this.chart.getObjectAtXY(c.x, c.y, !1)) && "undefined" !== typeof this.objectMap[b]) if (b = this.objectMap[b], "dataPoint" === b.objectType) {
          var e = this.chart.data[b.dataSeriesIndex],
            f = e.dataPoints[b.dataPointIndex],
            k = b.dataPointIndex;
          b.eventParameter = {
            x: c.x,
            y: c.y,
            dataPoint: f,
            dataSeries: e.options,
            dataPointIndex: k,
            dataSeriesIndex: e.index,
            chart: this.chart
          };
          b.eventContext = {
            context: f,
            userContext: f,
            mouseover: "mouseover",
            mousemove: "mousemove",
            mouseout: "mouseout",
            click: "click"
          };
          d.push(b);
          b = this.objectMap[e.id];
          b.eventParameter = {
            x: c.x,
            y: c.y,
            dataPoint: f,
            dataSeries: e.options,
            dataPointIndex: k,
            dataSeriesIndex: e.index,
            chart: this.chart
          };
          b.eventContext = {
            context: e,
            userContext: e.options,
            mouseover: "mouseover",
            mousemove: "mousemove",
            mouseout: "mouseout",
            click: "click"
          };
          d.push(this.objectMap[e.id]);
        } else "legendItem" === b.objectType && (e = this.chart.data[b.dataSeriesIndex], f = null !== b.dataPointIndex ? e.dataPoints[b.dataPointIndex] : null, b.eventParameter = {
          x: c.x,
          y: c.y,
          dataSeries: e.options,
          dataPoint: f,
          dataPointIndex: b.dataPointIndex,
          dataSeriesIndex: b.dataSeriesIndex,
          chart: this.chart
        }, b.eventContext = {
          context: this.chart.legend,
          userContext: this.chart.legend.options,
          mouseover: "itemmouseover",
          mousemove: "itemmousemove",
          mouseout: "itemmouseout",
          click: "itemclick"
        }, d.push(b));
        e = [];
        for (c = 0; c < this.mouseoveredObjectMaps.length; c++) {
          f = !0;
          for (b = 0; b < d.length; b++) if (d[b].id === this.mouseoveredObjectMaps[c].id) {
            f = !1;
            break;
          }
          f ? this.fireEvent(this.mouseoveredObjectMaps[c], "mouseout", a) : e.push(this.mouseoveredObjectMaps[c]);
        }
        this.mouseoveredObjectMaps = e;
        for (c = 0; c < d.length; c++) {
          e = !1;
          for (b = 0; b < this.mouseoveredObjectMaps.length; b++) if (d[c].id === this.mouseoveredObjectMaps[b].id) {
            e = !0;
            break;
          }
          e || (this.fireEvent(d[c], "mouseover", a), this.mouseoveredObjectMaps.push(d[c]));
          "click" === a.type ? this.fireEvent(d[c], "click", a) : "mousemove" === a.type && this.fireEvent(d[c], "mousemove", a);
        }
      }
    };
    ca.prototype.fireEvent = function (a, d, c) {
      if (a && d) {
        var b = a.eventParameter,
          e = a.eventContext,
          f = a.eventContext.userContext;
        f && e && f[e[d]] && f[e[d]].call(f, b);
        "mouseout" !== d ? f.cursor && f.cursor !== c.target.style.cursor && (c.target.style.cursor = f.cursor) : (c.target.style.cursor = this.chart._defaultCursor, delete a.eventParameter, delete a.eventContext);
        "click" === d && "dataPoint" === a.objectType && this.chart.pieDoughnutClickHandler && this.chart.pieDoughnutClickHandler.call(this.chart.data[a.dataSeriesIndex], b);
        "click" === d && "dataPoint" === a.objectType && this.chart.funnelPyramidClickHandler && this.chart.funnelPyramidClickHandler.call(this.chart.data[a.dataSeriesIndex], b);
      }
    };
    ia.prototype.animate = function (a, d, c, b, e) {
      var f = this;
      this.chart.isAnimating = !0;
      e = e || L.easing.linear;
      c && this.animations.push({
        startTime: new Date().getTime() + (a ? a : 0),
        duration: d,
        animationCallback: c,
        onComplete: b
      });
      for (a = []; 0 < this.animations.length;) if (d = this.animations.shift(), c = new Date().getTime(), b = 0, d.startTime <= c && (b = e(Math.min(c - d.startTime, d.duration), 0, 1, d.duration), b = Math.min(b, 1), isNaN(b) || !isFinite(b)) && (b = 1), 1 > b && a.push(d), d.animationCallback(b), 1 <= b && d.onComplete) d.onComplete();
      this.animations = a;
      0 < this.animations.length ? this.animationRequestId = this.chart.requestAnimFrame.call(window, function () {
        f.animate.call(f);
      }) : this.chart.isAnimating = !1;
    };
    ia.prototype.cancelAllAnimations = function () {
      this.animations = [];
      this.animationRequestId && this.chart.cancelRequestAnimFrame.call(window, this.animationRequestId);
      this.animationRequestId = null;
      this.chart.isAnimating = !1;
    };
    var L = {
        yScaleAnimation: function yScaleAnimation(a, d) {
          if (0 !== a) {
            var c = d.dest,
              b = d.source.canvas,
              e = d.animationBase;
            c.drawImage(b, 0, 0, b.width, b.height, 0, e - e * a, c.canvas.width / ha, a * c.canvas.height / ha);
          }
        },
        xScaleAnimation: function xScaleAnimation(a, d) {
          if (0 !== a) {
            var c = d.dest,
              b = d.source.canvas,
              e = d.animationBase;
            c.drawImage(b, 0, 0, b.width, b.height, e - e * a, 0, a * c.canvas.width / ha, c.canvas.height / ha);
          }
        },
        xClipAnimation: function xClipAnimation(a, d) {
          if (0 !== a) {
            var c = d.dest,
              b = d.source.canvas;
            c.save();
            0 < a && c.drawImage(b, 0, 0, b.width * a, b.height, 0, 0, b.width * a / ha, b.height / ha);
            c.restore();
          }
        },
        fadeInAnimation: function fadeInAnimation(a, d) {
          if (0 !== a) {
            var c = d.dest,
              b = d.source.canvas;
            c.save();
            c.globalAlpha = a;
            c.drawImage(b, 0, 0, b.width, b.height, 0, 0, c.canvas.width / ha, c.canvas.height / ha);
            c.restore();
          }
        },
        easing: {
          linear: function linear(a, d, c, b) {
            return c * a / b + d;
          },
          easeOutQuad: function easeOutQuad(a, d, c, b) {
            return -c * (a /= b) * (a - 2) + d;
          },
          easeOutQuart: function easeOutQuart(a, d, c, b) {
            return -c * ((a = a / b - 1) * a * a * a - 1) + d;
          },
          easeInQuad: function easeInQuad(a, d, c, b) {
            return c * (a /= b) * a + d;
          },
          easeInQuart: function easeInQuart(a, d, c, b) {
            return c * (a /= b) * a * a * a + d;
          }
        }
      },
      W = {
        drawMarker: function drawMarker(a, d, c, b, e, f, k, l) {
          if (c) {
            var s = 1;
            c.fillStyle = f ? f : "#000000";
            c.strokeStyle = k ? k : "#000000";
            c.lineWidth = l ? l : 0;
            c.setLineDash && c.setLineDash(N("solid", l));
            "circle" === b ? (c.moveTo(a, d), c.beginPath(), c.arc(a, d, e / 2, 0, 2 * Math.PI, !1), f && c.fill(), l && (k ? c.stroke() : (s = c.globalAlpha, c.globalAlpha = 0.15, c.strokeStyle = "black", c.stroke(), c.globalAlpha = s))) : "square" === b ? (c.beginPath(), c.rect(a - e / 2, d - e / 2, e, e), f && c.fill(), l && (k ? c.stroke() : (s = c.globalAlpha, c.globalAlpha = 0.15, c.strokeStyle = "black", c.stroke(), c.globalAlpha = s))) : "triangle" === b ? (c.beginPath(), c.moveTo(a - e / 2, d + e / 2), c.lineTo(a + e / 2, d + e / 2), c.lineTo(a, d - e / 2), c.closePath(), f && c.fill(), l && (k ? c.stroke() : (s = c.globalAlpha, c.globalAlpha = 0.15, c.strokeStyle = "black", c.stroke(), c.globalAlpha = s)), c.beginPath()) : "cross" === b && (c.strokeStyle = f, c.lineWidth = e / 4, c.beginPath(), c.moveTo(a - e / 2, d - e / 2), c.lineTo(a + e / 2, d + e / 2), c.stroke(), c.moveTo(a + e / 2, d - e / 2), c.lineTo(a - e / 2, d + e / 2), c.stroke());
          }
        },
        drawMarkers: function drawMarkers(a) {
          for (var d = 0; d < a.length; d++) {
            var c = a[d];
            W.drawMarker(c.x, c.y, c.ctx, c.type, c.size, c.color, c.borderColor, c.borderThickness);
          }
        }
      };
    return l;
  }();
  w.version = "v3.0.5 GA";
  window.CanvasJS && w && !window.CanvasJS.Chart && (window.CanvasJS.Chart = w);
})();

/*
  excanvas is used to support IE678 which do not implement HTML5 Canvas Element. You can safely remove the following excanvas code if you don't need to support older browsers.

  Copyright 2006 Google Inc. https://code.google.com/p/explorercanvas/
  Licensed under the Apache License, Version 2.0
*/
document.createElement("canvas").getContext || function () {
  function V() {
    return this.context_ || (this.context_ = new C(this));
  }
  function W(a, b, c) {
    var g = M.call(arguments, 2);
    return function () {
      return a.apply(b, g.concat(M.call(arguments)));
    };
  }
  function N(a) {
    return String(a).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  }
  function O(a) {
    a.namespaces.g_vml_ || a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML");
    a.namespaces.g_o_ || a.namespaces.add("g_o_", "urn:schemas-microsoft-com:office:office", "#default#VML");
    a.styleSheets.ex_canvas_ || (a = a.createStyleSheet(), a.owningElement.id = "ex_canvas_", a.cssText = "canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}");
  }
  function X(a) {
    var b = a.srcElement;
    switch (a.propertyName) {
      case "width":
        b.getContext().clearRect();
        b.style.width = b.attributes.width.nodeValue + "px";
        b.firstChild.style.width = b.clientWidth + "px";
        break;
      case "height":
        b.getContext().clearRect(), b.style.height = b.attributes.height.nodeValue + "px", b.firstChild.style.height = b.clientHeight + "px";
    }
  }
  function Y(a) {
    a = a.srcElement;
    a.firstChild && (a.firstChild.style.width = a.clientWidth + "px", a.firstChild.style.height = a.clientHeight + "px");
  }
  function D() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  }
  function t(a, b) {
    for (var c = D(), g = 0; 3 > g; g++) for (var e = 0; 3 > e; e++) {
      for (var f = 0, d = 0; 3 > d; d++) f += a[g][d] * b[d][e];
      c[g][e] = f;
    }
    return c;
  }
  function P(a, b) {
    b.fillStyle = a.fillStyle;
    b.lineCap = a.lineCap;
    b.lineJoin = a.lineJoin;
    b.lineWidth = a.lineWidth;
    b.miterLimit = a.miterLimit;
    b.shadowBlur = a.shadowBlur;
    b.shadowColor = a.shadowColor;
    b.shadowOffsetX = a.shadowOffsetX;
    b.shadowOffsetY = a.shadowOffsetY;
    b.strokeStyle = a.strokeStyle;
    b.globalAlpha = a.globalAlpha;
    b.font = a.font;
    b.textAlign = a.textAlign;
    b.textBaseline = a.textBaseline;
    b.arcScaleX_ = a.arcScaleX_;
    b.arcScaleY_ = a.arcScaleY_;
    b.lineScale_ = a.lineScale_;
  }
  function Q(a) {
    var b = a.indexOf("(", 3),
      c = a.indexOf(")", b + 1),
      b = a.substring(b + 1, c).split(",");
    if (4 != b.length || "a" != a.charAt(3)) b[3] = 1;
    return b;
  }
  function E(a, b, c) {
    return Math.min(c, Math.max(b, a));
  }
  function F(a, b, c) {
    0 > c && c++;
    1 < c && c--;
    return 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a;
  }
  function G(a) {
    if (a in H) return H[a];
    var b,
      c = 1;
    a = String(a);
    if ("#" == a.charAt(0)) b = a;else if (/^rgb/.test(a)) {
      c = Q(a);
      b = "#";
      for (var g, e = 0; 3 > e; e++) g = -1 != c[e].indexOf("%") ? Math.floor(255 * (parseFloat(c[e]) / 100)) : +c[e], b += v[E(g, 0, 255)];
      c = +c[3];
    } else if (/^hsl/.test(a)) {
      e = c = Q(a);
      b = parseFloat(e[0]) / 360 % 360;
      0 > b && b++;
      g = E(parseFloat(e[1]) / 100, 0, 1);
      e = E(parseFloat(e[2]) / 100, 0, 1);
      if (0 == g) g = e = b = e;else {
        var f = 0.5 > e ? e * (1 + g) : e + g - e * g,
          d = 2 * e - f;
        g = F(d, f, b + 1 / 3);
        e = F(d, f, b);
        b = F(d, f, b - 1 / 3);
      }
      b = "#" + v[Math.floor(255 * g)] + v[Math.floor(255 * e)] + v[Math.floor(255 * b)];
      c = c[3];
    } else b = Z[a] || a;
    return H[a] = {
      color: b,
      alpha: c
    };
  }
  function C(a) {
    this.m_ = D();
    this.mStack_ = [];
    this.aStack_ = [];
    this.currentPath_ = [];
    this.fillStyle = this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.lineJoin = "miter";
    this.lineCap = "butt";
    this.miterLimit = 1 * q;
    this.globalAlpha = 1;
    this.font = "10px sans-serif";
    this.textAlign = "left";
    this.textBaseline = "alphabetic";
    this.canvas = a;
    var b = "width:" + a.clientWidth + "px;height:" + a.clientHeight + "px;overflow:hidden;position:absolute",
      c = a.ownerDocument.createElement("div");
    c.style.cssText = b;
    a.appendChild(c);
    b = c.cloneNode(!1);
    b.style.backgroundColor = "red";
    b.style.filter = "alpha(opacity=0)";
    a.appendChild(b);
    this.element_ = c;
    this.lineScale_ = this.arcScaleY_ = this.arcScaleX_ = 1;
  }
  function R(a, b, c, g) {
    a.currentPath_.push({
      type: "bezierCurveTo",
      cp1x: b.x,
      cp1y: b.y,
      cp2x: c.x,
      cp2y: c.y,
      x: g.x,
      y: g.y
    });
    a.currentX_ = g.x;
    a.currentY_ = g.y;
  }
  function S(a, b) {
    var c = G(a.strokeStyle),
      g = c.color,
      c = c.alpha * a.globalAlpha,
      e = a.lineScale_ * a.lineWidth;
    1 > e && (c *= e);
    b.push("<g_vml_:stroke", ' opacity="', c, '"', ' joinstyle="', a.lineJoin, '"', ' miterlimit="', a.miterLimit, '"', ' endcap="', $[a.lineCap] || "square", '"', ' weight="', e, 'px"', ' color="', g, '" />');
  }
  function T(a, b, c, g) {
    var e = a.fillStyle,
      f = a.arcScaleX_,
      d = a.arcScaleY_,
      k = g.x - c.x,
      n = g.y - c.y;
    if (e instanceof w) {
      var h = 0,
        l = g = 0,
        u = 0,
        m = 1;
      if ("gradient" == e.type_) {
        h = e.x1_ / f;
        c = e.y1_ / d;
        var p = s(a, e.x0_ / f, e.y0_ / d),
          h = s(a, h, c),
          h = 180 * Math.atan2(h.x - p.x, h.y - p.y) / Math.PI;
        0 > h && (h += 360);
        1E-6 > h && (h = 0);
      } else p = s(a, e.x0_, e.y0_), g = (p.x - c.x) / k, l = (p.y - c.y) / n, k /= f * q, n /= d * q, m = x.max(k, n), u = 2 * e.r0_ / m, m = 2 * e.r1_ / m - u;
      f = e.colors_;
      f.sort(function (a, b) {
        return a.offset - b.offset;
      });
      d = f.length;
      p = f[0].color;
      c = f[d - 1].color;
      k = f[0].alpha * a.globalAlpha;
      a = f[d - 1].alpha * a.globalAlpha;
      for (var n = [], r = 0; r < d; r++) {
        var t = f[r];
        n.push(t.offset * m + u + " " + t.color);
      }
      b.push('<g_vml_:fill type="', e.type_, '"', ' method="none" focus="100%"', ' color="', p, '"', ' color2="', c, '"', ' colors="', n.join(","), '"', ' opacity="', a, '"', ' g_o_:opacity2="', k, '"', ' angle="', h, '"', ' focusposition="', g, ",", l, '" />');
    } else e instanceof I ? k && n && b.push("<g_vml_:fill", ' position="', -c.x / k * f * f, ",", -c.y / n * d * d, '"', ' type="tile"', ' src="', e.src_, '" />') : (e = G(a.fillStyle), b.push('<g_vml_:fill color="', e.color, '" opacity="', e.alpha * a.globalAlpha, '" />'));
  }
  function s(a, b, c) {
    a = a.m_;
    return {
      x: q * (b * a[0][0] + c * a[1][0] + a[2][0]) - r,
      y: q * (b * a[0][1] + c * a[1][1] + a[2][1]) - r
    };
  }
  function z(a, b, c) {
    isFinite(b[0][0]) && isFinite(b[0][1]) && isFinite(b[1][0]) && isFinite(b[1][1]) && isFinite(b[2][0]) && isFinite(b[2][1]) && (a.m_ = b, c && (a.lineScale_ = aa(ba(b[0][0] * b[1][1] - b[0][1] * b[1][0]))));
  }
  function w(a) {
    this.type_ = a;
    this.r1_ = this.y1_ = this.x1_ = this.r0_ = this.y0_ = this.x0_ = 0;
    this.colors_ = [];
  }
  function I(a, b) {
    if (!a || 1 != a.nodeType || "IMG" != a.tagName) throw new A("TYPE_MISMATCH_ERR");
    if ("complete" != a.readyState) throw new A("INVALID_STATE_ERR");
    switch (b) {
      case "repeat":
      case null:
      case "":
        this.repetition_ = "repeat";
        break;
      case "repeat-x":
      case "repeat-y":
      case "no-repeat":
        this.repetition_ = b;
        break;
      default:
        throw new A("SYNTAX_ERR");
    }
    this.src_ = a.src;
    this.width_ = a.width;
    this.height_ = a.height;
  }
  function A(a) {
    this.code = this[a];
    this.message = a + ": DOM Exception " + this.code;
  }
  var x = Math,
    k = x.round,
    J = x.sin,
    K = x.cos,
    ba = x.abs,
    aa = x.sqrt,
    q = 10,
    r = q / 2;
  navigator.userAgent.match(/MSIE ([\d.]+)?/);
  var M = Array.prototype.slice;
  O(document);
  var U = {
    init: function init(a) {
      a = a || document;
      a.createElement("canvas");
      a.attachEvent("onreadystatechange", W(this.init_, this, a));
    },
    init_: function init_(a) {
      a = a.getElementsByTagName("canvas");
      for (var b = 0; b < a.length; b++) this.initElement(a[b]);
    },
    initElement: function initElement(a) {
      if (!a.getContext) {
        a.getContext = V;
        O(a.ownerDocument);
        a.innerHTML = "";
        a.attachEvent("onpropertychange", X);
        a.attachEvent("onresize", Y);
        var b = a.attributes;
        b.width && b.width.specified ? a.style.width = b.width.nodeValue + "px" : a.width = a.clientWidth;
        b.height && b.height.specified ? a.style.height = b.height.nodeValue + "px" : a.height = a.clientHeight;
      }
      return a;
    }
  };
  U.init();
  for (var v = [], d = 0; 16 > d; d++) for (var B = 0; 16 > B; B++) v[16 * d + B] = d.toString(16) + B.toString(16);
  var Z = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      grey: "#808080",
      greenyellow: "#ADFF2F",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      oldlace: "#FDF5E6",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      whitesmoke: "#F5F5F5",
      yellowgreen: "#9ACD32"
    },
    H = {},
    L = {},
    $ = {
      butt: "flat",
      round: "round"
    },
    d = C.prototype;
  d.clearRect = function () {
    this.textMeasureEl_ && (this.textMeasureEl_.removeNode(!0), this.textMeasureEl_ = null);
    this.element_.innerHTML = "";
  };
  d.beginPath = function () {
    this.currentPath_ = [];
  };
  d.moveTo = function (a, b) {
    var c = s(this, a, b);
    this.currentPath_.push({
      type: "moveTo",
      x: c.x,
      y: c.y
    });
    this.currentX_ = c.x;
    this.currentY_ = c.y;
  };
  d.lineTo = function (a, b) {
    var c = s(this, a, b);
    this.currentPath_.push({
      type: "lineTo",
      x: c.x,
      y: c.y
    });
    this.currentX_ = c.x;
    this.currentY_ = c.y;
  };
  d.bezierCurveTo = function (a, b, c, g, e, f) {
    e = s(this, e, f);
    a = s(this, a, b);
    c = s(this, c, g);
    R(this, a, c, e);
  };
  d.quadraticCurveTo = function (a, b, c, g) {
    a = s(this, a, b);
    c = s(this, c, g);
    g = {
      x: this.currentX_ + 2 / 3 * (a.x - this.currentX_),
      y: this.currentY_ + 2 / 3 * (a.y - this.currentY_)
    };
    R(this, g, {
      x: g.x + (c.x - this.currentX_) / 3,
      y: g.y + (c.y - this.currentY_) / 3
    }, c);
  };
  d.arc = function (a, b, c, g, e, f) {
    c *= q;
    var d = f ? "at" : "wa",
      k = a + K(g) * c - r,
      n = b + J(g) * c - r;
    g = a + K(e) * c - r;
    e = b + J(e) * c - r;
    k != g || f || (k += 0.125);
    a = s(this, a, b);
    k = s(this, k, n);
    g = s(this, g, e);
    this.currentPath_.push({
      type: d,
      x: a.x,
      y: a.y,
      radius: c,
      xStart: k.x,
      yStart: k.y,
      xEnd: g.x,
      yEnd: g.y
    });
  };
  d.rect = function (a, b, c, g) {
    this.moveTo(a, b);
    this.lineTo(a + c, b);
    this.lineTo(a + c, b + g);
    this.lineTo(a, b + g);
    this.closePath();
  };
  d.strokeRect = function (a, b, c, g) {
    var e = this.currentPath_;
    this.beginPath();
    this.moveTo(a, b);
    this.lineTo(a + c, b);
    this.lineTo(a + c, b + g);
    this.lineTo(a, b + g);
    this.closePath();
    this.stroke();
    this.currentPath_ = e;
  };
  d.fillRect = function (a, b, c, g) {
    var e = this.currentPath_;
    this.beginPath();
    this.moveTo(a, b);
    this.lineTo(a + c, b);
    this.lineTo(a + c, b + g);
    this.lineTo(a, b + g);
    this.closePath();
    this.fill();
    this.currentPath_ = e;
  };
  d.createLinearGradient = function (a, b, c, g) {
    var e = new w("gradient");
    e.x0_ = a;
    e.y0_ = b;
    e.x1_ = c;
    e.y1_ = g;
    return e;
  };
  d.createRadialGradient = function (a, b, c, g, e, f) {
    var d = new w("gradientradial");
    d.x0_ = a;
    d.y0_ = b;
    d.r0_ = c;
    d.x1_ = g;
    d.y1_ = e;
    d.r1_ = f;
    return d;
  };
  d.drawImage = function (a, b) {
    var c, g, e, d, r, y, n, h;
    e = a.runtimeStyle.width;
    d = a.runtimeStyle.height;
    a.runtimeStyle.width = "auto";
    a.runtimeStyle.height = "auto";
    var l = a.width,
      u = a.height;
    a.runtimeStyle.width = e;
    a.runtimeStyle.height = d;
    if (3 == arguments.length) c = arguments[1], g = arguments[2], r = y = 0, n = e = l, h = d = u;else if (5 == arguments.length) c = arguments[1], g = arguments[2], e = arguments[3], d = arguments[4], r = y = 0, n = l, h = u;else if (9 == arguments.length) r = arguments[1], y = arguments[2], n = arguments[3], h = arguments[4], c = arguments[5], g = arguments[6], e = arguments[7], d = arguments[8];else throw Error("Invalid number of arguments");
    var m = s(this, c, g),
      p = [];
    p.push(" <g_vml_:group", ' coordsize="', 10 * q, ",", 10 * q, '"', ' coordorigin="0,0"', ' style="width:', 10, "px;height:", 10, "px;position:absolute;");
    if (1 != this.m_[0][0] || this.m_[0][1] || 1 != this.m_[1][1] || this.m_[1][0]) {
      var t = [];
      t.push("M11=", this.m_[0][0], ",", "M12=", this.m_[1][0], ",", "M21=", this.m_[0][1], ",", "M22=", this.m_[1][1], ",", "Dx=", k(m.x / q), ",", "Dy=", k(m.y / q), "");
      var v = s(this, c + e, g),
        w = s(this, c, g + d);
      c = s(this, c + e, g + d);
      m.x = x.max(m.x, v.x, w.x, c.x);
      m.y = x.max(m.y, v.y, w.y, c.y);
      p.push("padding:0 ", k(m.x / q), "px ", k(m.y / q), "px 0;filter:progid:DXImageTransform.Microsoft.Matrix(", t.join(""), ", sizingmethod='clip');");
    } else p.push("top:", k(m.y / q), "px;left:", k(m.x / q), "px;");
    p.push(' ">', '<g_vml_:image src="', a.src, '"', ' style="width:', q * e, "px;", " height:", q * d, 'px"', ' cropleft="', r / l, '"', ' croptop="', y / u, '"', ' cropright="', (l - r - n) / l, '"', ' cropbottom="', (u - y - h) / u, '"', " />", "</g_vml_:group>");
    this.element_.insertAdjacentHTML("BeforeEnd", p.join(""));
  };
  d.stroke = function (a) {
    var b = [];
    b.push("<g_vml_:shape", ' filled="', !!a, '"', ' style="position:absolute;width:', 10, "px;height:", 10, 'px;"', ' coordorigin="0,0"', ' coordsize="', 10 * q, ",", 10 * q, '"', ' stroked="', !a, '"', ' path="');
    for (var c = {
        x: null,
        y: null
      }, d = {
        x: null,
        y: null
      }, e = 0; e < this.currentPath_.length; e++) {
      var f = this.currentPath_[e];
      switch (f.type) {
        case "moveTo":
          b.push(" m ", k(f.x), ",", k(f.y));
          break;
        case "lineTo":
          b.push(" l ", k(f.x), ",", k(f.y));
          break;
        case "close":
          b.push(" x ");
          f = null;
          break;
        case "bezierCurveTo":
          b.push(" c ", k(f.cp1x), ",", k(f.cp1y), ",", k(f.cp2x), ",", k(f.cp2y), ",", k(f.x), ",", k(f.y));
          break;
        case "at":
        case "wa":
          b.push(" ", f.type, " ", k(f.x - this.arcScaleX_ * f.radius), ",", k(f.y - this.arcScaleY_ * f.radius), " ", k(f.x + this.arcScaleX_ * f.radius), ",", k(f.y + this.arcScaleY_ * f.radius), " ", k(f.xStart), ",", k(f.yStart), " ", k(f.xEnd), ",", k(f.yEnd));
      }
      if (f) {
        if (null == c.x || f.x < c.x) c.x = f.x;
        if (null == d.x || f.x > d.x) d.x = f.x;
        if (null == c.y || f.y < c.y) c.y = f.y;
        if (null == d.y || f.y > d.y) d.y = f.y;
      }
    }
    b.push(' ">');
    a ? T(this, b, c, d) : S(this, b);
    b.push("</g_vml_:shape>");
    this.element_.insertAdjacentHTML("beforeEnd", b.join(""));
  };
  d.fill = function () {
    this.stroke(!0);
  };
  d.closePath = function () {
    this.currentPath_.push({
      type: "close"
    });
  };
  d.save = function () {
    var a = {};
    P(this, a);
    this.aStack_.push(a);
    this.mStack_.push(this.m_);
    this.m_ = t(D(), this.m_);
  };
  d.restore = function () {
    this.aStack_.length && (P(this.aStack_.pop(), this), this.m_ = this.mStack_.pop());
  };
  d.translate = function (a, b) {
    z(this, t([[1, 0, 0], [0, 1, 0], [a, b, 1]], this.m_), !1);
  };
  d.rotate = function (a) {
    var b = K(a);
    a = J(a);
    z(this, t([[b, a, 0], [-a, b, 0], [0, 0, 1]], this.m_), !1);
  };
  d.scale = function (a, b) {
    this.arcScaleX_ *= a;
    this.arcScaleY_ *= b;
    z(this, t([[a, 0, 0], [0, b, 0], [0, 0, 1]], this.m_), !0);
  };
  d.transform = function (a, b, c, d, e, f) {
    z(this, t([[a, b, 0], [c, d, 0], [e, f, 1]], this.m_), !0);
  };
  d.setTransform = function (a, b, c, d, e, f) {
    z(this, [[a, b, 0], [c, d, 0], [e, f, 1]], !0);
  };
  d.drawText_ = function (a, b, c, d, e) {
    var f = this.m_;
    d = 0;
    var r = 1E3,
      t = 0,
      n = [],
      h;
    h = this.font;
    if (L[h]) h = L[h];else {
      var l = document.createElement("div").style;
      try {
        l.font = h;
      } catch (u) {}
      h = L[h] = {
        style: l.fontStyle || "normal",
        variant: l.fontVariant || "normal",
        weight: l.fontWeight || "normal",
        size: l.fontSize || 10,
        family: l.fontFamily || "sans-serif"
      };
    }
    var l = h,
      m = this.element_;
    h = {};
    for (var p in l) h[p] = l[p];
    p = parseFloat(m.currentStyle.fontSize);
    m = parseFloat(l.size);
    "number" == typeof l.size ? h.size = l.size : -1 != l.size.indexOf("px") ? h.size = m : -1 != l.size.indexOf("em") ? h.size = p * m : -1 != l.size.indexOf("%") ? h.size = p / 100 * m : -1 != l.size.indexOf("pt") ? h.size = m / 0.75 : h.size = p;
    h.size *= 0.981;
    p = h.style + " " + h.variant + " " + h.weight + " " + h.size + "px " + h.family;
    m = this.element_.currentStyle;
    l = this.textAlign.toLowerCase();
    switch (l) {
      case "left":
      case "center":
      case "right":
        break;
      case "end":
        l = "ltr" == m.direction ? "right" : "left";
        break;
      case "start":
        l = "rtl" == m.direction ? "right" : "left";
        break;
      default:
        l = "left";
    }
    switch (this.textBaseline) {
      case "hanging":
      case "top":
        t = h.size / 1.75;
        break;
      case "middle":
        break;
      default:
      case null:
      case "alphabetic":
      case "ideographic":
      case "bottom":
        t = -h.size / 2.25;
    }
    switch (l) {
      case "right":
        d = 1E3;
        r = 0.05;
        break;
      case "center":
        d = r = 500;
    }
    b = s(this, b + 0, c + t);
    n.push('<g_vml_:line from="', -d, ' 0" to="', r, ' 0.05" ', ' coordsize="100 100" coordorigin="0 0"', ' filled="', !e, '" stroked="', !!e, '" style="position:absolute;width:1px;height:1px;">');
    e ? S(this, n) : T(this, n, {
      x: -d,
      y: 0
    }, {
      x: r,
      y: h.size
    });
    e = f[0][0].toFixed(3) + "," + f[1][0].toFixed(3) + "," + f[0][1].toFixed(3) + "," + f[1][1].toFixed(3) + ",0,0";
    b = k(b.x / q) + "," + k(b.y / q);
    n.push('<g_vml_:skew on="t" matrix="', e, '" ', ' offset="', b, '" origin="', d, ' 0" />', '<g_vml_:path textpathok="true" />', '<g_vml_:textpath on="true" string="', N(a), '" style="v-text-align:', l, ";font:", N(p), '" /></g_vml_:line>');
    this.element_.insertAdjacentHTML("beforeEnd", n.join(""));
  };
  d.fillText = function (a, b, c, d) {
    this.drawText_(a, b, c, d, !1);
  };
  d.strokeText = function (a, b, c, d) {
    this.drawText_(a, b, c, d, !0);
  };
  d.measureText = function (a) {
    this.textMeasureEl_ || (this.element_.insertAdjacentHTML("beforeEnd", '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>'), this.textMeasureEl_ = this.element_.lastChild);
    var b = this.element_.ownerDocument;
    this.textMeasureEl_.innerHTML = "";
    this.textMeasureEl_.style.font = this.font;
    this.textMeasureEl_.appendChild(b.createTextNode(a));
    return {
      width: this.textMeasureEl_.offsetWidth
    };
  };
  d.clip = function () {};
  d.arcTo = function () {};
  d.createPattern = function (a, b) {
    return new I(a, b);
  };
  w.prototype.addColorStop = function (a, b) {
    b = G(b);
    this.colors_.push({
      offset: a,
      color: b.color,
      alpha: b.alpha
    });
  };
  d = A.prototype = Error();
  d.INDEX_SIZE_ERR = 1;
  d.DOMSTRING_SIZE_ERR = 2;
  d.HIERARCHY_REQUEST_ERR = 3;
  d.WRONG_DOCUMENT_ERR = 4;
  d.INVALID_CHARACTER_ERR = 5;
  d.NO_DATA_ALLOWED_ERR = 6;
  d.NO_MODIFICATION_ALLOWED_ERR = 7;
  d.NOT_FOUND_ERR = 8;
  d.NOT_SUPPORTED_ERR = 9;
  d.INUSE_ATTRIBUTE_ERR = 10;
  d.INVALID_STATE_ERR = 11;
  d.SYNTAX_ERR = 12;
  d.INVALID_MODIFICATION_ERR = 13;
  d.NAMESPACE_ERR = 14;
  d.INVALID_ACCESS_ERR = 15;
  d.VALIDATION_ERR = 16;
  d.TYPE_MISMATCH_ERR = 17;
  G_vmlCanvasManager = U;
  CanvasRenderingContext2D = C;
  CanvasGradient = w;
  CanvasPattern = I;
  DOMException = A;
}();
/*eslint-enable*/
/*jshint ignore:end*/

/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = __webpack_require__(/*! ./lib/has */ "./node_modules/prop-types/lib/has.js");

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) { /**/ }
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' +
              'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/prop-types/lib/has.js":
/*!********************************************!*\
  !*** ./node_modules/prop-types/lib/has.js ***!
  \********************************************/
/***/ ((module) => {

module.exports = Function.call.bind(Object.prototype.hasOwnProperty);


/***/ }),

/***/ "./node_modules/react/cjs/react.development.js":
/*!*****************************************************!*\
  !*** ./node_modules/react/cjs/react.development.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v16.14.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

var _assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var checkPropTypes = __webpack_require__(/*! prop-types/checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var ReactVersion = '16.14.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;
var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

/**
 * Keeps track of the current dispatcher.
 */
var ReactCurrentDispatcher = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

/**
 * Keeps track of the current batch's configuration such as how long an update
 * should suspend for if it needs to.
 */
var ReactCurrentBatchConfig = {
  suspense: null
};

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function describeComponentFrame (name, source, ownerName) {
  var sourceInfo = '';

  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');

    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);

        if (match) {
          var pathBeforeSlash = match[1];

          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }

    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }

  return '\n    in ' + (name || 'Unknown') + sourceInfo;
}

var Resolved = 1;
function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return "Profiler";

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';

      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        return getComponentName(type.type);

      case REACT_BLOCK_TYPE:
        return getComponentName(type.render);

      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);

          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }

          break;
        }
    }
  }

  return null;
}

var ReactDebugCurrentFrame = {};
var currentlyValidatingElement = null;
function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = ''; // Add an extra top frame while an element is being validated

    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    } // Delegate to the injected renderer-specific implementation


    var impl = ReactDebugCurrentFrame.getCurrentStack;

    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

/**
 * Used by act() to track whether you're inside an act() scope.
 */
var IsSomeRendererActing = {
  current: false
};

var ReactSharedInternals = {
  ReactCurrentDispatcher: ReactCurrentDispatcher,
  ReactCurrentBatchConfig: ReactCurrentBatchConfig,
  ReactCurrentOwner: ReactCurrentOwner,
  IsSomeRendererActing: IsSomeRendererActing,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.

function warn(format) {
  {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    printWarning('warn', format, args);
  }
}
function error(format) {
  {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }

    printWarning('error', format, args);
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var hasExistingStack = args.length > 0 && typeof args[args.length - 1] === 'string' && args[args.length - 1].indexOf('\n    in') === 0;

    if (!hasExistingStack) {
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      var stack = ReactDebugCurrentFrame.getStackAddendum();

      if (stack !== '') {
        format += '%s';
        args = args.concat([stack]);
      }
    }

    var argsWithFormat = args.map(function (item) {
      return '' + item;
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(message);
    } catch (x) {}
  }
}

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + "." + callerName;

    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }

    error("Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);

    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}
/**
 * This is the abstract API for an update queue.
 */


var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};

{
  Object.freeze(emptyObject);
}
/**
 * Base class helpers for the updating state of a component.
 */


function Component(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject; // We initialize the default updater but the real one gets injected by the
  // renderer.

  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};
/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */

Component.prototype.setState = function (partialState, callback) {
  if (!(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null)) {
    {
      throw Error( "setState(...): takes an object of state variables to update or a function which returns an object of state variables." );
    }
  }

  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};
/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */


Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */


{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        warn('%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);

        return undefined;
      }
    });
  };

  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}

ComponentDummy.prototype = Component.prototype;
/**
 * Convenience component with default shallow equality check for sCU.
 */

function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context; // If a component has string refs, we will assign a different object later.

  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent; // Avoid an extra prototype jump for these methods.

_assign(pureComponentPrototype, Component.prototype);

pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };

  {
    Object.seal(refObject);
  }

  return refObject;
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown, specialPropRefWarningShown, didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    }
  };

  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
      }
    }
  };

  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

function warnIfStringRefCannotBeAutoConverted(config) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && config.__self && ReactCurrentOwner.current.stateNode !== config.__self) {
      var componentName = getComponentName(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://fb.me/react-strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */

function createElement(type, config, children) {
  var propName; // Reserved names are extracted

  var props = {};
  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;

      {
        warnIfStringRefCannotBeAutoConverted(config);
      }
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source; // Remaining properties are added to a new props object

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }

    props.children = childArray;
  } // Resolve default props


  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;

    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);
  return newElement;
}
/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */

function cloneElement(element, config, children) {
  if (!!(element === null || element === undefined)) {
    {
      throw Error( "React.cloneElement(...): The argument must be a React element, but you passed " + element + "." );
    }
  }

  var propName; // Original props are copied

  var props = _assign({}, element.props); // Reserved names are extracted


  var key = element.key;
  var ref = element.ref; // Self is preserved since the owner is preserved.

  var self = element._self; // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.

  var source = element._source; // Owner will be preserved, unless ref is overridden

  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }

    if (hasValidKey(config)) {
      key = '' + config.key;
    } // Remaining properties override existing props


    var defaultProps;

    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }

    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  } // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.


  var childrenLength = arguments.length - 2;

  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);

    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }

    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */

function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';
/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });
  return '$' + escapedString;
}
/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */


var didWarnAboutMaps = false;
var userProvidedKeyEscapeRegex = /\/+/g;

function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];

function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;

  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}
/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;

      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }

    }
  }

  if (invokeCallback) {
    callback(traverseContext, children, // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.

  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);

    if (typeof iteratorFn === 'function') {

      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          if (!didWarnAboutMaps) {
            warn('Using Maps as children is deprecated and will be removed in ' + 'a future major release. Consider converting children to ' + 'an array of keyed ReactElements instead.');
          }

          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step;
      var ii = 0;

      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';

      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }

      var childrenString = '' + children;

      {
        {
          throw Error( "Objects are not valid as a React child (found: " + (childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString) + ")." + addendum );
        }
      }
    }
  }

  return subtreeCount;
}
/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */


function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}
/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */


function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  } // Implicit key determined by the index in the set


  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;
  func.call(context, child, bookKeeping.count++);
}
/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */


function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }

  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;
  var mappedChild = func.call(context, child, bookKeeping.count++);

  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild, // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }

    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';

  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }

  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}
/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */


function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }

  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}
/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */


function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}
/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */


function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}
/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */


function onlyChild(children) {
  if (!isValidElement(children)) {
    {
      throw Error( "React.Children.only expected to receive a single React element child." );
    }
  }

  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      if (calculateChangedBits !== null && typeof calculateChangedBits !== 'function') {
        error('createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits);
      }
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // Used to track how many concurrent renderers this context currently
    // supports within in a single renderer. Such as parallel server rendering.
    _threadCount: 0,
    // These are circular
    Provider: null,
    Consumer: null
  };
  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };
  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    }; // $FlowFixMe: Flow complains about not setting a value, which is intentional here

    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;

            error('Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }

          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      _threadCount: {
        get: function () {
          return context._threadCount;
        },
        set: function (_threadCount) {
          context._threadCount = _threadCount;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;

            error('Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }

          return context.Consumer;
        }
      }
    }); // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty

    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  var lazyType = {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };

  {
    // In production, this would just set it on the object.
    var defaultProps;
    var propTypes;
    Object.defineProperties(lazyType, {
      defaultProps: {
        configurable: true,
        get: function () {
          return defaultProps;
        },
        set: function (newDefaultProps) {
          error('React.lazy(...): It is not supported to assign `defaultProps` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          defaultProps = newDefaultProps; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'defaultProps', {
            enumerable: true
          });
        }
      },
      propTypes: {
        configurable: true,
        get: function () {
          return propTypes;
        },
        set: function (newPropTypes) {
          error('React.lazy(...): It is not supported to assign `propTypes` to ' + 'a lazy component import. Either specify them where the component ' + 'is defined, or create a wrapping component around it.');

          propTypes = newPropTypes; // Match production behavior more closely:

          Object.defineProperty(lazyType, 'propTypes', {
            enumerable: true
          });
        }
      }
    });
  }

  return lazyType;
}

function forwardRef(render) {
  {
    if (render != null && render.$$typeof === REACT_MEMO_TYPE) {
      error('forwardRef requires a render function but received a `memo` ' + 'component. Instead of forwardRef(memo(...)), use ' + 'memo(forwardRef(...)).');
    } else if (typeof render !== 'function') {
      error('forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      if (render.length !== 0 && render.length !== 2) {
        error('forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.');
      }
    }

    if (render != null) {
      if (render.defaultProps != null || render.propTypes != null) {
        error('forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?');
      }
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      error('memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }

  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

function resolveDispatcher() {
  var dispatcher = ReactCurrentDispatcher.current;

  if (!(dispatcher !== null)) {
    {
      throw Error( "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem." );
    }
  }

  return dispatcher;
}

function useContext(Context, unstable_observedBits) {
  var dispatcher = resolveDispatcher();

  {
    if (unstable_observedBits !== undefined) {
      error('useContext() second argument is reserved for future ' + 'use in React. Passing it is not supported. ' + 'You passed: %s.%s', unstable_observedBits, typeof unstable_observedBits === 'number' && Array.isArray(arguments[2]) ? '\n\nDid you call array.map(useContext)? ' + 'Calling Hooks inside a loop is not supported. ' + 'Learn more at https://fb.me/rules-of-hooks' : '');
    } // TODO: add a more generic warning for invalid values.


    if (Context._context !== undefined) {
      var realContext = Context._context; // Don't deduplicate because this legitimately causes bugs
      // and nobody should be using this in existing code.

      if (realContext.Consumer === Context) {
        error('Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be ' + 'removed in a future major release. Did you mean to call useContext(Context) instead?');
      } else if (realContext.Provider === Context) {
        error('Calling useContext(Context.Provider) is not supported. ' + 'Did you mean to call useContext(Context) instead?');
      }
    }
  }

  return dispatcher.useContext(Context, unstable_observedBits);
}
function useState(initialState) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
function useReducer(reducer, initialArg, init) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg, init);
}
function useRef(initialValue) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useRef(initialValue);
}
function useEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
function useLayoutEffect(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useLayoutEffect(create, deps);
}
function useCallback(callback, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useCallback(callback, deps);
}
function useMemo(create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useMemo(create, deps);
}
function useImperativeHandle(ref, create, deps) {
  var dispatcher = resolveDispatcher();
  return dispatcher.useImperativeHandle(ref, create, deps);
}
function useDebugValue(value, formatterFn) {
  {
    var dispatcher = resolveDispatcher();
    return dispatcher.useDebugValue(value, formatterFn);
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);

    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }

  return '';
}

function getSourceInfoErrorAddendum(source) {
  if (source !== undefined) {
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }

  return '';
}

function getSourceInfoErrorAddendumForProps(elementProps) {
  if (elementProps !== null && elementProps !== undefined) {
    return getSourceInfoErrorAddendum(elementProps.__source);
  }

  return '';
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

    if (parentName) {
      info = "\n\nCheck the top-level render call using <" + parentName + ">.";
    }
  }

  return info;
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }

  element._store.validated = true;
  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }

  ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.

  var childOwner = '';

  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
  }

  setCurrentlyValidatingElement(element);

  {
    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }

  setCurrentlyValidatingElement(null);
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }

  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];

      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);

    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;

        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var name = getComponentName(type);
    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      setCurrentlyValidatingElement(element);
      checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
      setCurrentlyValidatingElement(null);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true;

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    setCurrentlyValidatingElement(fragment);
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        break;
      }
    }

    if (fragment.ref !== null) {
      error('Invalid attribute `ref` supplied to `React.Fragment`.');
    }

    setCurrentlyValidatingElement(null);
  }
}
function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.

  if (!validType) {
    var info = '';

    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendumForProps(props);

    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString;

    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    {
      error('React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }
  }

  var element = createElement.apply(this, arguments); // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.

  if (element == null) {
    return element;
  } // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)


  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}
var didWarnAboutDeprecatedCreateFactory = false;
function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;

  {
    if (!didWarnAboutDeprecatedCreateFactory) {
      didWarnAboutDeprecatedCreateFactory = true;

      warn('React.createFactory() is deprecated and will be removed in ' + 'a future major release. Consider using JSX ' + 'or use React.createElement() directly instead.');
    } // Legacy hook: remove it


    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        warn('Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');

        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}
function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);

  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }

  validatePropTypes(newElement);
  return newElement;
}

{

  try {
    var frozenObject = Object.freeze({});
    var testMap = new Map([[frozenObject, null]]);
    var testSet = new Set([frozenObject]); // This is necessary for Rollup to not consider these unused.
    // https://github.com/rollup/rollup/issues/1771
    // TODO: we can remove these if Rollup fixes the bug.

    testMap.set(0, 0);
    testSet.add(0);
  } catch (e) {
  }
}

var createElement$1 =  createElementWithValidation ;
var cloneElement$1 =  cloneElementWithValidation ;
var createFactory =  createFactoryWithValidation ;
var Children = {
  map: mapChildren,
  forEach: forEachChildren,
  count: countChildren,
  toArray: toArray,
  only: onlyChild
};

exports.Children = Children;
exports.Component = Component;
exports.Fragment = REACT_FRAGMENT_TYPE;
exports.Profiler = REACT_PROFILER_TYPE;
exports.PureComponent = PureComponent;
exports.StrictMode = REACT_STRICT_MODE_TYPE;
exports.Suspense = REACT_SUSPENSE_TYPE;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
exports.cloneElement = cloneElement$1;
exports.createContext = createContext;
exports.createElement = createElement$1;
exports.createFactory = createFactory;
exports.createRef = createRef;
exports.forwardRef = forwardRef;
exports.isValidElement = isValidElement;
exports.lazy = lazy;
exports.memo = memo;
exports.useCallback = useCallback;
exports.useContext = useContext;
exports.useDebugValue = useDebugValue;
exports.useEffect = useEffect;
exports.useImperativeHandle = useImperativeHandle;
exports.useLayoutEffect = useLayoutEffect;
exports.useMemo = useMemo;
exports.useReducer = useReducer;
exports.useRef = useRef;
exports.useState = useState;
exports.version = ReactVersion;
  })();
}


/***/ }),

/***/ "./node_modules/react/index.js":
/*!*************************************!*\
  !*** ./node_modules/react/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react.development.js */ "./node_modules/react/cjs/react.development.js");
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!********************************************!*\
  !*** ./resources/assets/canvasjs.react.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/*
CanvasJS React Charts - https://canvasjs.com/
Copyright 2020 fenopix

--------------------- License Information --------------------
CanvasJS is a commercial product which requires purchase of license. Without a commercial license you can use it for evaluation purposes for upto 30 days. Please refer to the following link for further details.
https://canvasjs.com/license/

*/
var React = __webpack_require__(/*! react */ "./node_modules/react/index.js");
var CanvasJS = __webpack_require__(/*! ./canvasjs.min */ "./resources/assets/canvasjs.min.js");
CanvasJS = CanvasJS.Chart ? CanvasJS : window.CanvasJS;
var CanvasJSChart = /*#__PURE__*/function (_React$Component) {
  function CanvasJSChart(props) {
    var _this;
    _classCallCheck(this, CanvasJSChart);
    _this = _callSuper(this, CanvasJSChart, [props]);
    _this.options = props.options ? props.options : {};
    _this.containerProps = props.containerProps ? props.containerProps : {
      width: "100%",
      position: "relative"
    };
    _this.containerProps.height = props.containerProps && props.containerProps.height ? props.containerProps.height : _this.options.height ? _this.options.height + "px" : "400px";
    _this.chartContainerId = "canvasjs-react-chart-container-" + CanvasJSChart._cjsContainerId++;
    return _this;
  }
  _inherits(CanvasJSChart, _React$Component);
  return _createClass(CanvasJSChart, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //Create Chart and Render		
      this.chart = new CanvasJS.Chart(this.chartContainerId, this.options);
      this.chart.render();
      if (this.props.onRef) this.props.onRef(this.chart);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      //Check if Chart-options has changed and determine if component has to be updated
      return !(nextProps.options === this.options);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      //Update Chart Options & Render
      this.chart.options = this.props.options;
      this.chart.render();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      //Destroy chart and remove reference
      this.chart.destroy();
      if (this.props.onRef) this.props.onRef(undefined);
    }
  }, {
    key: "render",
    value: function render() {
      //return React.createElement('div', { id: this.chartContainerId, style: this.containerProps });		
      return /*#__PURE__*/React.createElement("div", {
        id: this.chartContainerId,
        style: this.containerProps
      });
    }
  }]);
}(React.Component);
_defineProperty(CanvasJSChart, "_cjsContainerId", 0);
var CanvasJSReact = {
  CanvasJSChart: CanvasJSChart,
  CanvasJS: CanvasJS
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasJSReact);
})();

/******/ })()
;