Array.prototype.find || (Array.prototype.find = function(n) {
    if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
    if ("function" != typeof n) throw new TypeError("predicate must be a function");
    for (var i = Object(this), u = i.length >>> 0, f = arguments[1], r = void 0, t = 0; t < u; t++)
        if (r = i[t], n.call(f, r, t, i)) return r
});
Array.prototype.findIndex || Object.defineProperty(Array.prototype, "findIndex", {
    value: function(n) {
        var i, r, u, t, f;
        if (null == this) throw new TypeError('"this" is null or not defined');
        if (i = Object(this), r = i.length >>> 0, "function" != typeof n) throw new TypeError("predicate must be a function");
        for (u = arguments[1], t = 0; t < r;) {
            if (f = i[t], n.call(u, f, t, i)) return t;
            t++
        }
        return -1
    }
});
! function() {
    var t, n, i, r;
    Array.from || (Array.from = (t = Object.prototype.toString, n = function(n) {
        return "function" == typeof n || "[object Function]" === t.call(n)
    }, i = Math.pow(2, 53) - 1, r = function(n) {
        var t, r = (t = Number(n), isNaN(t) ? 0 : 0 !== t && isFinite(t) ? (0 < t ? 1 : -1) * Math.floor(Math.abs(t)) : t);
        return Math.min(Math.max(r, 0), i)
    }, function(t) {
        var h = Object(t),
            o, i;
        if (null == t) throw new TypeError("Array.from requires an array-like object - not null or undefined");
        if (i = 1 < arguments.length ? arguments[1] : void 0, void 0 !== i) {
            if (!n(i)) throw new TypeError("Array.from: when provided, the second argument must be a function");
            2 < arguments.length && (o = arguments[2])
        }
        for (var f, e = r(h.length), s = n(this) ? Object(new this(e)) : new Array(e), u = 0; u < e;) f = h[u], s[u] = i ? void 0 === o ? i(f, u) : i.call(o, f, u) : f, u += 1;
        return s.length = e, s
    }))
}();
! function() {
    function n(n, t) {
        t = t || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        };
        var i = document.createEvent("CustomEvent");
        return i.initCustomEvent(n, t.bubbles, t.cancelable, t.detail), i
    }
    "function" != typeof window.CustomEvent && (n.prototype = window.Event.prototype, window.CustomEvent = n)
}();
"function" != typeof Object.assign && (Object.assign = function(n) {
    var u, i, t, r;
    if (null == n) throw new TypeError("Cannot convert undefined or null to object");
    for (u = Object(n), i = 1; i < arguments.length; i++)
        if (t = arguments[i], null != t)
            for (r in t) t.hasOwnProperty(r) && (u[r] = t[r]);
    return u
})