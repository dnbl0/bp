/*
 Quantcast measurement tag
 Copyright (c) 2008-2024, Quantcast Corp.
*/
'use strict';
(function(a, m, k) {
    var n = function(e) {
            var f = k.createElement("a");
            f.href = e;
            return f
        },
        p = [/^http[s]?:\/\/((adservice.google.*)|([^\/]*fls\.doubleclick\.net))\/.*~oref=(?<url>[^;\n]*)/, /^http[s]?:\/\/[^\/]*tealium.*\/.*page_url=(?<url>[^&]*)/],
        l = function() {
            if (m.top !== m.self) {
                try {
                    for (var e = 0; e < p.length; e++) {
                        var f = k.location.href.match(p[e]);
                        if (f && f.groups.url) {
                            var g = decodeURIComponent(f.groups.url);
                            break
                        }
                    }
                } catch (h) {}
                return g ? n(g) : n(k.referrer)
            }
            return k.location
        },
        q = function(e, f, g) {
            return e ? "nc" ===
                e ? !f || !g || 0 > f.indexOf(g) : "eq" === e ? f === g : "sw" === e ? 0 === f.indexOf(g) : "ew" === e ? (e = f.length - g.length, f = f.lastIndexOf(g, e), -1 !== f && f === e) : "c" === e ? 0 <= f.indexOf(g) : !1 : !1
        },
        c = function(e, f, g) {
            var h = l().href;
            q(f, h, g) ? e(h) : e(!1)
        },
        d = function(e, f, g) {
            var h = l().pathname;
            q(f, h, g) ? e(h) : e(!1)
        },
        b = function(e) {
            return "array" === {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase() ? {
                labels: e.join(",")
            } : {
                labels: "" + e
            }
        };
    try {
        __qc("defaults", a, {
            labels: "_fp.event.Default"
        })
    } catch (e) {}
    c = ["rules", [a, null, [
                [b, "_fp.event.Homepage"]
            ],
            [
                [d, "eq", "/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Overview"]
            ],
            [
                [c, "c", "/models/lx/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Features"]
            ],
            [
                [d, "c", "/models/gs-f/features"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Accessories"]
            ],
            [
                [c, "c", "/models/lx/accessories"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Overview"]
            ],
            [
                [d, "c", "/models/rx/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Overview"]
            ],
            [
                [c, "c", "/models/nx/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Overview"]
            ],
            [
                [d, "c", "/models/rc-f/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/GS-F"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Features"]
            ],
            [
                [d, "c", "/models/rc-f/features"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/rc-f"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Features"]
            ],
            [
                [d, "c", "/models/lx/features"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Overview"]
            ],
            [
                [c, "c", "/models/lc/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Overview"]
            ],
            [
                [c, "c", "/models/gs/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Overview"]
            ],
            [
                [c, "c", "/models/is/overview"]
            ]
        ],
        [a, null, [
                [b,
                    "_fp.event.GS F Overview"
                ]
            ],
            [
                [d, "c", "/models/gs-f/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/lx"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Overview"]
            ],
            [
                [c, "c", "/models/rc/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Overview"]
            ],
            [
                [c, "c", "/models/ls/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Overview"]
            ],
            [
                [c, "c", "/models/es/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Overview"]
            ],
            [
                [c, "c", "/models/ct/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Performance"]
            ],
            [
                [d, "c", "/models/ct/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Interior"]
            ],
            [
                [d, "c", "/models/ct/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Virtual Tour"]
            ],
            [
                [d, "c", "/models/ct/virtual-tour"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/ct"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Exterior"]
            ],
            [
                [d, "c", "/models/is/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Exterior"]
            ],
            [
                [d, "c", "/models/es/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Performance"]
            ],
            [
                [d, "c", "/models/es/features/performance"]
            ]
        ],
        [a, null, [
                [b,
                    "_fp.event.ES Build and Price"
                ]
            ],
            [
                [d, "c", "/models/build-and-price/es"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Interior"]
            ],
            [
                [d, "c", "/models/ls/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Safety"]
            ],
            [
                [d, "c", "/models/ct/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Performance"]
            ],
            [
                [d, "c", "/models/is/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Safety"]
            ],
            [
                [d, "c", "/models/is/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/is"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Exterior"]
            ],
            [
                [d, "c", "/models/ct/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Interior"]
            ],
            [
                [d, "c", "/models/is/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Virtual Tour"]
            ],
            [
                [d, "c", "/models/is/virtual-tour"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Interior"]
            ],
            [
                [d, "c", "/models/es/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Safety"]
            ],
            [
                [d, "c", "/models/es/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Virtual Tour"]
            ],
            [
                [d, "c", "/models/es/virtual-tour"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Accessories"]
            ],
            [
                [d, "c", "/models/es/accessories"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Interior"]
            ],
            [
                [d, "c", "/models/gs/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Safety"]
            ],
            [
                [d, "c", "/models/gs/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/gs"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Exterior"]
            ],
            [
                [d, "c", "/models/ls/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Interior"]
            ],
            [
                [d, "c", "/models/rc/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Safety"]
            ],
            [
                [d, "c", "/models/rc/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Accessories"]
            ],
            [
                [d, "c", "/models/rc/accessories"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Safety"]
            ],
            [
                [d, "c", "/models/lc/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Discover ES 2018"]
            ],
            [
                [d, "c", "/models/es/discover-es-2018"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Exterior"]
            ],
            [
                [d, "c", "/models/gs/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Performance"]
            ],
            [
                [d, "c", "/models/gs/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Performance"]
            ],
            [
                [d, "c", "/models/ls/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Safety"]
            ],
            [
                [d, "c", "/models/ls/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.The Art of LS"]
            ],
            [
                [d, "c", "/models/ls/the-art-of-ls"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Build and Price"]
            ],
            [
                [d, "c", "/models/build-and-price/rc"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Exterior"]
            ],
            [
                [d, "c", "/models/lc/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Performance"]
            ],
            [
                [d, "c", "/models/lc/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Exterior"]
            ],
            [
                [d, "c", "/models/rc/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Performance"]
            ],
            [
                [d, "c", "/models/rc/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Interior"]
            ],
            [
                [d, "c", "/models/lc/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Build and Price"]
            ],
            [
                [c, "c", "/build-and-price/NX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Accessories"]
            ],
            [
                [d, "c", "/models/rx/accessories"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Build and Price"]
            ],
            [
                [d, "c", "/models/rc-f/build-and-price"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Build and Price"]
            ],
            [
                [d, "c", "/gs-f/build-and-price"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Exterior"]
            ],
            [
                [d, "c", "/models/nx/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Interior"]
            ],
            [
                [d, "c", "/models/nx/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Performance"]
            ],
            [
                [d, "c", "/models/nx/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Safety"]
            ],
            [
                [d, "c", "/models/nx/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Performance"]
            ],
            [
                [d, "c", "/models/rx/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Safety"]
            ],
            [
                [d, "c", "/models/rx/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Virtual Tour"]
            ],
            [
                [d, "c", "/models/lc/virtual-tour"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Accessories"]
            ],
            [
                [d, "c", "/models/nx/accessories"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Build and Price"]
            ],
            [
                [d, "c", "/models/rx/build-and-price"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Safety"]
            ],
            [
                [d, "c", "/models/lc/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Exterior"]
            ],
            [
                [d, "c", "/models/rx/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Interior"]
            ],
            [
                [d, "c", "/models/rx/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Exterior"]
            ],
            [
                [d, "c", "/models/lx/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Interior"]
            ],
            [
                [d, "c", "/models/lx/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Interior"]
            ],
            [
                [d, "c", "/models/gs-f/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Performance"]
            ],
            [
                [d, "c", "/models/gs-f/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.IS Features"]
            ],
            [
                [d, "c", "/models/is/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS Features"]
            ],
            [
                [d, "c", "/models/gs/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Features"]
            ],
            [
                [d, "c", "/models/lc/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Virtual Tour"]
            ],
            [
                [d, "c", "/models/nx/virtual-tour"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Virtual Tour"]
            ],
            [
                [d, "c", "/models/rx/virtual-tour"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Discover the RX 7 Seat"]
            ],
            [
                [d, "c", "/models/rx/discover-the-rx-7-seat"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Exterior"]
            ],
            [
                [d, "c", "/models/lc/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Interior"]
            ],
            [
                [d, "c", "/models/lc/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Performance"]
            ],
            [
                [d, "c", "/models/lc/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Performance"]
            ],
            [
                [d, "c", "/models/lx/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Exterior"]
            ],
            [
                [d, "c", "/models/rc-f/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Interior"]
            ],
            [
                [d, "c", "/models/rc-f/features/interior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Safety"]
            ],
            [
                [d, "c", "/models/rc-f/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Exterior"]
            ],
            [
                [d, "c", "/models/gs-f/features/exterior"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GS F Safety"]
            ],
            [
                [d, "c", "/models/gs-f/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.CT Features"]
            ],
            [
                [d, "c", "/models/ct/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Features"]
            ],
            [
                [d, "c", "/models/ls/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Safety"]
            ],
            [
                [d, "c", "/models/lx/features/safety"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC F Performance"]
            ],
            [
                [d, "c", "/models/rc-f/features/performance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Features"]
            ],
            [
                [d, "c", "/models/es/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Features"]
            ],
            [
                [d, "c", "/models/nx/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Features"]
            ],
            [
                [d, "c", "/models/rx/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RC Features"]
            ],
            [
                [d, "c", "/models/rc/features/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Request a corporate brochure"]
            ],
            [
                [c, "c", "/Corporate/Request-Form"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Corporate"]
            ],
            [
                [c, "c", "/corporate"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Features"]
            ],
            [
                [c, "c", "/ux/features"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Build And Price"]
            ],
            [
                [c, "c", "build-and-price/ux"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Overview"]
            ],
            [
                [c, "c", "/ux/overview"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Owners"]
            ],
            [
                [c, "c", "owners"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Owners - Update Details"]
            ],
            [
                [c, "c", "update-details"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Finance Calculator"]
            ],
            [
                [c, "c", "finance/calculator"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Request A Test Drive Page"]
            ],
            [
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Here for you"]
            ],
            [
                [d, "c", "/hereforyou"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Site Land"]
            ],
            [
                [d, "sw", "/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Personal Ownership Solutions"]
            ],
            [
                [c, "c", "personal-ownership-solutions"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX-300e"]
            ],
            [
                [c, "c", "ux-300e"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Model"]
            ],
            [
                [c, "c", "/nx"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Model"]
            ],
            [
                [c, "c", "\x3dNX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Models"]
            ],
            [
                [c, "c", "/models/"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.GX Model"]
            ],
            [
                [c,
                    "c", "models/gx"
                ]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LBX Model"]
            ],
            [
                [c, "c", "models/lbx"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX 300E Model"]
            ],
            [
                [c, "c", "models/ux-300e"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Model"]
            ],
            [
                [c, "c", "models/ux"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RZ Model"]
            ],
            [
                [c, "c", "models/rz"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Model"]
            ],
            [
                [c, "c", "models/rx"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Model"]
            ],
            [
                [c, "c", "models/lx"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Model"]
            ],
            [
                [c, "c", "models/es"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Model"]
            ],
            [
                [c, "c", "models/ls"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Model"]
            ],
            [
                [c, "nc", "-convertible"],
                [c, "c", "models/lc"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Convertible Model"]
            ],
            [
                [c, "c", "models/lc-convertible"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LM Model"]
            ],
            [
                [c, "c", "models/lm"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Find a Dealer"]
            ],
            [
                [c, "c", "/find-a-dealer"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Contact"]
            ],
            [
                [c, "c", "/contact"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Request a Brochure"]
            ],
            [
                [c, "c", "/request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Certified Pre-Owned"]
            ],
            [
                [c, "c", "/certified-pre-owned"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Lexus Electrified"]
            ],
            [
                [c, "c", "lexus-electrified"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Connectivity"]
            ],
            [
                [c, "c", "/connectivity"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Encore"]
            ],
            [
                [c, "c", "owners/benefits"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.Finance"]
            ],
            [
                [c, "c", "/finance"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.About"]
            ],
            [
                [c, "c", "/about-lexus"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.News"]
            ],
            [
                [c, "c", "/news"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dNX"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dNX"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LBX Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dLBX"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LBX Build and Price"]
            ],
            [
                [c, "c", "build-and-price/LBX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LBX Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dLBX"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX 300E Request a Brochure"]
            ],
            [
                [c, "c", "ALL-ELECTRIC"],
                [c, "c", "model\x3dUX"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Request a Brochure"]
            ],
            [
                [c, "nc", "ALL-ELECTRIC"],
                [c, "c", "request-a-brochure"],
                [c, "c", "model\x3dUX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RZ Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dRZ"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dRX"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dLX"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dES"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dLS"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Request a Brochure"]
            ],
            [
                [c, "nc", "CONVERTIBLE"],
                [c, "c", "model\x3dLC"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Convertible Request a Brochure"]
            ],
            [
                [c, "c", "CONVERTIBLE"],
                [c, "c", "model\x3dLC"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LM Request a Brochure"]
            ],
            [
                [c, "c", "model\x3dLM"],
                [c, "c", "request-a-brochure"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LBX Build and Price"]
            ],
            [
                [c, "c", "build-and-price/LBX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX 300E Build and Price"]
            ],
            [
                [c, "c", "build-and-price/UX-ALL_ELECTRIC"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Build and Price"]
            ],
            [
                [c, "nc", "ALL_ELECTRIC"],
                [c, "c", "build-and-price/UX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Build and Price"]
            ],
            [
                [c, "c", "build-and-price/RX"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Build and Price"]
            ],
            [
                [c, "c", "build-and-price/LS"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LM Build and Price"]
            ],
            [
                [c, "c", "build-and-price/LM"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX 300E Request a Test Drive"]
            ],
            [
                [c, "c", "ALL-ELECTRIC"],
                [c,
                    "c", "build-and-pricemodel\x3dUX"
                ],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.UX Request a Test Drive"]
            ],
            [
                [c, "nc", "ALL-ELECTRIC"],
                [c, "c", "model\x3dUX"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RZ Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dRZ"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.RX Request a Test Drive"]
            ],
            [
                [c, "c", "MODEL\x3dRX"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LX Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dLX"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.ES Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dES"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LS Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dLS"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.LC Request a Test Drive"]
            ],
            [
                [c, "c", "model\x3dLC"],
                [c, "c", "request-a-test-drive"]
            ]
        ],
        [a, null, [
                [b, "_fp.event.NX Model"]
            ],
            [
                [c, "c", "/NX"]
            ]
        ]
    ];
    __qc.apply(null, c);
    (function(e) {
        var f = l().href;
        setInterval(function() {
            var g = l().href;
            g !== f && (f = g, !1 === __qc.apply(null, e) && __qc("push", {
                qacct: a,
                event: "load"
            }, !0))
        }, 2E3)
    })(c)
})("p-ATr0UZxCszkBD", window, document);