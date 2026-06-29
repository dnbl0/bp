! function(n, t, i, r) {
    function o(n, t) {
        return typeof n === t
    }

    function ht() {
        var i, n, r, f, e, t, s;
        for (s in a)
            if (a.hasOwnProperty(s)) {
                if (i = [], (n = a[s]).name && (i.push(n.name.toLowerCase()), n.options) && n.options.aliases && n.options.aliases.length)
                    for (r = 0; r < n.options.aliases.length; r++) i.push(n.options.aliases[r].toLowerCase());
                for (f = o(n.fn, "function") ? n.fn() : n.fn, e = 0; e < i.length; e++) 1 === (t = i[e].split(".")).length ? u[t[0]] = f : (u[t[0]] && (!u[t[0]] || u[t[0]] instanceof Boolean) || (u[t[0]] = new Boolean(u[t[0]])), u[t[0]][t[1]] = f), it.push((f ? "" : "no-") + t.join("-"))
            }
    }

    function b(n) {
        var r, t = h.className,
            i = u._config.classPrefix || "";
        v && (t = t.baseVal);
        u._config.enableJSClass && (r = new RegExp("(^|\\s)" + i + "no-js(\\s|$)"), t = t.replace(r, "$1" + i + "js$2"));
        u._config.enableClasses && (0 < n.length && (t += " " + i + n.join(" " + i)), v ? h.className.baseVal = t : h.className = t)
    }

    function k(n, t) {
        var r, i, f;
        if ("object" == typeof n)
            for (r in n) rt(n, r) && k(r, n[r]);
        else {
            if (i = (n = n.toLowerCase()).split("."), f = u[i[0]], void 0 !== (f = 2 === i.length ? f[i[1]] : f)) return u;
            t = "function" == typeof t ? t() : t;
            1 === i.length ? u[i[0]] = t : (!u[i[0]] || u[i[0]] instanceof Boolean || (u[i[0]] = new Boolean(u[i[0]])), u[i[0]][i[1]] = t);
            b([(t && !1 !== t ? "" : "no-") + i.join("-")]);
            u._trigger(n, t)
        }
        return u
    }

    function ct(n, t) {
        return ~("" + n).indexOf(t)
    }

    function c() {
        return "function" != typeof i.createElement ? i.createElement(arguments[0]) : v ? i.createElementNS.call(i, "http://www.w3.org/2000/svg", arguments[0]) : i.createElement.apply(i, arguments)
    }

    function lt() {
        var n = i.body;
        return n || ((n = c(v ? "svg" : "body")).fake = !0), n
    }

    function p(n, t, r, u) {
        var e, l, a, s = "modernizr",
            o = c("div"),
            f = lt();
        if (parseInt(r, 10))
            for (; r--;)(l = c("div")).id = u ? u[r] : s + (r + 1), o.appendChild(l);
        return (e = c("style")).type = "text/css", e.id = "s" + s, (f.fake ? f : o).appendChild(e), f.appendChild(o), e.styleSheet ? e.styleSheet.cssText = n : e.appendChild(i.createTextNode(n)), o.id = s, f.fake && (f.style.background = "", f.style.overflow = "hidden", a = h.style.overflow, h.style.overflow = "hidden", h.appendChild(f)), e = t(o, n), f.fake && f.parentNode ? (f.parentNode.removeChild(f), h.style.overflow = a, h.offsetHeight) : o.parentNode.removeChild(o), !!e
    }

    function d(n) {
        return n.replace(/([A-Z])/g, function(n, t) {
            return "-" + t.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function g(n, i, r) {
        var u, f;
        return "getComputedStyle" in t ? (u = getComputedStyle.call(t, n, i), f = t.console, null !== u ? r && (u = u.getPropertyValue(r)) : f && f[f.error ? "error" : "log"].call(f, "getComputedStyle returning null, its possible modernizr test results are inaccurate")) : u = !i && n.currentStyle && n.currentStyle[r], u
    }

    function at(n, i) {
        var u = n.length,
            f;
        if ("CSS" in t && "supports" in t.CSS) {
            for (; u--;)
                if (t.CSS.supports(d(n[u]), i)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in t) {
            for (f = []; u--;) f.push("(" + d(n[u]) + ":" + i + ")");
            return p("@supports (" + (f = f.join(" or ")) + ") { #modernizr { position: absolute; } }", function(n) {
                return "absolute" === g(n, null, "position")
            })
        }
        return r
    }

    function vt(n) {
        return n.replace(/([a-z])-([a-z])/g, function(n, t, i) {
            return t + i.toUpperCase()
        }).replace(/^-/, "")
    }

    function nt(n, t, i, u) {
        function h() {
            v && (delete s.style, delete s.modElem)
        }
        var l, v, e, y, f, p, a;
        if ((u = !o(u, "undefined") && u, !o(i, "undefined")) && (l = at(n, i), !o(l, "undefined"))) return l;
        for (a = ["modernizr", "tspan", "samp"]; !s.style && a.length;) v = !0, s.modElem = c(a.shift()), s.style = s.modElem.style;
        for (y = n.length, e = 0; e < y; e++)
            if (f = n[e], p = s.style[f], ct(f, "-") && (f = vt(f)), s.style[f] !== r) {
                if (u || o(i, "undefined")) return h(), "pfx" !== t || f;
                try {
                    s.style[f] = i
                } catch (n) {}
                if (s.style[f] !== p) return h(), "pfx" !== t || f
            }
        return h(), !1
    }

    function yt(n, t) {
        return function() {
            return n.apply(t, arguments)
        }
    }

    function pt(n, t, i) {
        var u, r;
        for (r in n)
            if (n[r] in t) return !1 === i ? n[r] : o(u = t[n[r]], "function") ? yt(u, i || t) : u;
        return !1
    }

    function tt(n, t, i, r, u) {
        var f = n.charAt(0).toUpperCase() + n.slice(1),
            e = (n + " " + ft.join(f + " ") + f).split(" ");
        return o(t, "string") || o(t, "undefined") ? nt(e, t, r, u) : pt((n + " " + et.join(f + " ") + f).split(" "), t, i)
    }

    function l(n, t, i) {
        return tt(n, r, r, t, i)
    }
    var a = [],
        f = {
            _version: "3.13.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function(n, t) {
                var i = this;
                setTimeout(function() {
                    t(i[n])
                }, 0)
            },
            addTest: function(n, t, i) {
                a.push({
                    name: n,
                    fn: t,
                    options: i
                })
            },
            addAsyncTest: function(n) {
                a.push({
                    name: null,
                    fn: n
                })
            }
        },
        u = function() {},
        it = (u.prototype = f, u = new u, []),
        h = i.documentElement,
        v = "svg" === h.nodeName.toLowerCase(),
        rt, w, s, wt, y;
    v || ! function(n, t) {
        function v(n, t) {
            var i = n.createElement("p"),
                n = n.getElementsByTagName("head")[0] || n.documentElement;
            return i.innerHTML = "x<style>" + t + "<\/style>", n.insertBefore(i.lastChild, n.firstChild)
        }

        function f() {
            var n = i.elements;
            return "string" == typeof n ? n.split(" ") : n
        }

        function e(n) {
            var t = w[n[p]];
            return t || (t = {}, a++, n[p] = a, w[a] = t), t
        }

        function y(n, i, u) {
            return i = i || t, r ? i.createElement(n) : !(i = (u = u || e(i)).cache[n] ? u.cache[n].cloneNode() : g.test(n) ? (u.cache[n] = u.createElem(n)).cloneNode() : u.createElem(n)).canHaveChildren || d.test(n) || i.tagUrn ? i : u.frag.appendChild(i)
        }

        function s(n) {
            var o, u, s = e(n = n || t);
            return !i.shivCSS || h || s.hasCSS || (s.hasCSS = !!v(n, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), r || (o = n, (u = s).cache || (u.cache = {}, u.createElem = o.createElement, u.createFrag = o.createDocumentFragment, u.frag = u.createFrag()), o.createElement = function(n) {
                return i.shivMethods ? y(n, o, u) : u.createElem(n)
            }, o.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + f().join().replace(/[\w\-:]+/g, function(n) {
                return u.createElem(n), u.frag.createElement(n), 'c("' + n + '")'
            }) + ");return n}")(i, u.frag)), n
        }

        function b(n) {
            for (var t, i = n.getElementsByTagName("*"), r = i.length, e = RegExp("^(?:" + f().join("|") + ")$", "i"), u = []; r--;) t = i[r], e.test(t.nodeName) && u.push(t.applyElement(function(n) {
                for (var t, r = n.attributes, u = r.length, i = n.ownerDocument.createElement(o + ":" + n.nodeName); u--;)(t = r[u]).specified && i.setAttribute(t.nodeName, t.nodeValue);
                return i.style.cssText = n.style.cssText, i
            }(t)));
            return u
        }

        function k(n) {
            function r() {
                clearTimeout(i._removeSheetTimer);
                t && t.removeNode(!0);
                t = null
            }
            var t, u, i = e(n),
                s = n.namespaces,
                h = n.parentWindow;
            return tt && !n.printShived && (void 0 === s[o] && s.add(o), h.attachEvent("onbeforeprint", function() {
                r();
                for (var l, h, e, a = n.styleSheets, s = [], i = a.length, c = Array(i); i--;) c[i] = a[i];
                for (; e = c.pop();)
                    if (!e.disabled && nt.test(e.media)) {
                        try {
                            h = (l = e.imports).length
                        } catch (l) {
                            h = 0
                        }
                        for (i = 0; i < h; i++) c.push(l[i]);
                        try {
                            s.push(e.cssText)
                        } catch (l) {}
                    }
                s = function(n) {
                    for (var t, i = n.split("{"), r = i.length, u = RegExp("(^|[\\s,>+~])(" + f().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi"), e = "$1" + o + "\\:$2"; r--;)(t = i[r] = i[r].split("}"))[t.length - 1] = t[t.length - 1].replace(u, e), i[r] = t.join("}");
                    return i.join("{")
                }(s.reverse().join(""));
                u = b(n);
                t = v(n, s)
            }), h.attachEvent("onafterprint", function() {
                for (var n = u, t = n.length; t--;) n[t].removeNode();
                clearTimeout(i._removeSheetTimer);
                i._removeSheetTimer = setTimeout(r, 500)
            }), n.printShived = !0), n
        }
        var h, r, c, l = n.html5 || {},
            d = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
            g = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
            p = "_html5shiv",
            a = 0,
            w = {},
            u;
        try {
            u = t.createElement("a");
            u.innerHTML = "<xyz><\/xyz>";
            h = "hidden" in u;
            r = 1 == u.childNodes.length || (t.createElement("a"), void 0 === (c = t.createDocumentFragment()).cloneNode) || void 0 === c.createDocumentFragment || void 0 === c.createElement
        } catch (n) {
            r = h = !0
        }
        var i = {
                elements: l.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",
                version: "3.7.3",
                shivCSS: !1 !== l.shivCSS,
                supportsUnknownElements: r,
                shivMethods: !1 !== l.shivMethods,
                type: "default",
                shivDocument: s,
                createElement: y,
                createDocumentFragment: function(n, i) {
                    if (n = n || t, r) return n.createDocumentFragment();
                    for (var o = (i = i || e(n)).frag.cloneNode(), u = 0, s = f(), h = s.length; u < h; u++) o.createElement(s[u]);
                    return o
                },
                addElements: function(n, t) {
                    var r = i.elements;
                    "string" != typeof r && (r = r.join(" "));
                    "string" != typeof n && (n = n.join(" "));
                    i.elements = r + " " + n;
                    s(t)
                }
            },
            nt = (n.html5 = i, s(t), /^$|\b(?:all|print)\b/),
            o = "html5shiv",
            tt = !(r || (u = t.documentElement, void 0 === t.namespaces) || void 0 === t.parentWindow || void 0 === u.applyElement || void 0 === u.removeNode || void 0 === n.attachEvent);
        i.type += " print";
        (i.shivPrint = k)(t);
        "object" == typeof module && module.exports && (module.exports = i)
    }(void 0 !== t ? t : this, i);
    ! function() {
        var n = {}.hasOwnProperty;
        rt = o(n, "undefined") || o(n.call, "undefined") ? function(n, t) {
            return t in n && o(n.constructor.prototype[t], "undefined")
        } : function(t, i) {
            return n.call(t, i)
        }
    }();
    f._l = {};
    f.on = function(n, t) {
        this._l[n] || (this._l[n] = []);
        this._l[n].push(t);
        u.hasOwnProperty(n) && setTimeout(function() {
            u._trigger(n, u[n])
        }, 0)
    };
    f._trigger = function(n, t) {
        var i;
        this._l[n] && (i = this._l[n], setTimeout(function() {
            for (var n = 0; n < i.length; n++) i[n](t)
        }, 0), delete this._l[n])
    };
    u._q.push(function() {
        f.addTest = k
    });
    w = {
        elem: c("modernizr")
    };
    s = (u._q.push(function() {
        delete w.elem
    }), {
        style: w.elem.style
    });
    u._q.unshift(function() {
        delete s.style
    });
    wt = f.testProp = function(n, t, i) {
        return nt([n], r, t, i)
    };
    u.addTest("svg", !!i.createElementNS && !!i.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
    var ut = "Moz O ms Webkit",
        ft = f._config.usePrefixes ? ut.split(" ") : [],
        et = (f._cssomPrefixes = ft, f._config.usePrefixes ? ut.toLowerCase().split(" ") : []);
    f._domPrefixes = et;
    f.testAllProps = tt;
    f.testAllProps = l;
    u.addTest("csstransitions", l("transition", "all", !0));
    var ot = f._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""],
        st = (f._prefixes = ot, function() {
            var n = t.matchMedia || t.msMatchMedia;
            return n ? function(t) {
                return t = n(t), t && t.matches || !1
            } : function(n) {
                var t = !1;
                return p("@media " + n + " { #modernizr { position: absolute; } }", function(n) {
                    t = "absolute" === g(n, null, "position")
                }), t
            }
        }()),
        e = (f.mq = st, u.addTest("touchevents", function() {
            var n;
            return !!("ontouchstart" in t || t.TouchEvent || t.DocumentTouch && i instanceof DocumentTouch) || (n = ["(", ot.join("touch-enabled),("), "heartz", ")"].join(""), st(n))
        }), c("input")),
        bt = (! function() {
            for (var n, o, t, s = ["search", "tel", "url", "email", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color"], f = 0; f < s.length; f++) e.setAttribute("type", n = s[f]), (t = "text" !== e.type && "style" in e) && (e.value = "1)", e.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(n) && e.style.WebkitAppearance !== r ? (h.appendChild(e), t = (o = i.defaultView).getComputedStyle && "textfield" !== o.getComputedStyle(e, null).WebkitAppearance && 0 !== e.offsetHeight, h.removeChild(e)) : /^(search|tel)$/.test(n) || (t = /^(url|email)$/.test(n) ? e.checkValidity && !1 === e.checkValidity() : "1)" !== e.value)), u.addTest("inputtypes." + n, !!t)
        }(), u.addTest("csspointerevents", function() {
            var n = c("a").style;
            return n.cssText = "pointer-events:auto", "auto" === n.pointerEvents
        }), u.addTest("proxy", "Proxy" in t), u.addTest("target", function() {
            var n = t.document;
            if (!("querySelectorAll" in n)) return !1;
            try {
                return n.querySelectorAll(":target"), !0
            } catch (n) {
                return !1
            }
        }), u.addTest("template", "content" in c("template")), u.addTest("arrow", function() {
            try {
                eval("()=>{}")
            } catch (e) {
                return !1
            }
            return !0
        }), u.addTest("contains", o(String.prototype.contains, "function")), u.addTest("cssanimations", l("animationName", "a", !0)), u.addTest("csstransforms", function() {
            return -1 === navigator.userAgent.indexOf("Android 2.") && l("transform", "scale(1)", !0)
        }), "CSS" in t && "supports" in t.CSS),
        kt = "supportsCSS" in t,
        dt = (u.addTest("supports", bt || kt), u.addTest("csstransforms3d", function() {
            return !!l("perspective", "1px", !0)
        }), f.testStyles = p);
    for (u.addTest("checked", function() {
            return dt("#modernizr {position:absolute} #modernizr input {margin-left:10px} #modernizr :checked {margin-left:20px;display:block}", function(n) {
                var t = c("input");
                return t.setAttribute("type", "checkbox"), t.setAttribute("checked", "checked"), n.appendChild(t), 20 === t.offsetLeft
            })
        }), ht(), b(it), delete f.addTest, delete f.addAsyncTest, y = 0; y < u._q.length; y++) u._q[y]();
    n.Modernizr = u
}(window, window, document)