"use strict";
! function(t) {
    function n(t) {
        (e = t.getAttribute("data-srcset")) && t.setAttribute("srcset", e);
        (e = t.getAttribute("data-src")) && (t.src = e);
        var e = t.getAttribute("data-preload") || "";
        o(e) && (t.preload = e)
    }

    function r(t) {
        t && Array.from(t).filter(function(t) {
            return "SOURCE" === t.nodeName
        }).forEach(n)
    }

    function e(n, t) {
        function r(t) {
            e(t), s(t), c(t)
        }
        void 0 === n && (n = ".lx-lazy");
        var o, a, i = Object.assign({}, d, t),
            e = i.load,
            c = i.loaded,
            u = "undefined" != typeof IntersectionObserver && new IntersectionObserver((o = e, a = c, function(t, e) {
                t.forEach(function(t) {
                    (0 < t.intersectionRatio || t.isIntersecting) && (e.unobserve(t.target), f(t.target) || (null != o && o(t.target), s(t.target), null != a && a(t.target)))
                })
            }), i) || void 0;
        return {
            observe: function() {
                return t = n, void 0 === (e = i.root || void 0) && (e = document), (t instanceof Element ? [t] : Array.from("string" == typeof t ? e.querySelectorAll(t) : t)).forEach(function(t) {
                    f(t) || (u ? u.observe(t) : r(t))
                });
                var t, e
            },
            load: function(t) {
                t && !f(t) && r(t)
            },
            observer: u
        }
    }
    var o = function(t) {
            return t && -1 < ["", "none", "metadata", "auto"].indexOf(t) || !1
        },
        d = {
            rootMargin: "0px",
            threshold: 0,
            load: function(t) {
                switch (t.nodeName) {
                    case "VIDEO":
                        r(t.children), t.load();
                        break;
                    case "IMG":
                        var e = t.parentElement;
                        e && "PICTURE" === e.nodeName && r(e.children)
                }
                n(t)
            },
            loaded: function() {}
        },
        s = function(t) {
            return t.setAttribute("data-loaded", "1")
        },
        f = function(t) {
            return "1" === t.getAttribute("data-loaded")
        };
    e.isLoaded = f, t.lexusLazy = e
}(this);;