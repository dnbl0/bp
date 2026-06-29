var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
    r = {},
    n = {},
    o = e.parcelRequirefee8;
null == o && ((o = function(e) {
    if (e in r) return r[e].exports;
    if (e in n) {
        var o = n[e];
        delete n[e];
        var t = {
            id: e,
            exports: {}
        };
        return r[e] = t, o.call(t.exports, t, t.exports), t.exports
    }
    var i = Error("Cannot find module '" + e + "'");
    throw i.code = "MODULE_NOT_FOUND", i
}).register = function(e, r) {
    n[e] = r
}, e.parcelRequirefee8 = o), o.register;
var t = o("6WVAc");
document.addEventListener("DOMContentLoaded", () => {
    (0, t.refreshGuestSession)()
});
//# sourceMappingURL=index.9cfed9a4.js.map