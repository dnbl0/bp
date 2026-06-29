function t(t, e, r, n) {
    Object.defineProperty(t, e, {
        get: r,
        set: n,
        enumerable: !0,
        configurable: !0
    })
}
var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
    r = {},
    n = {},
    o = e.parcelRequirefee8;
null == o && ((o = function(t) {
    if (t in r) return r[t].exports;
    if (t in n) {
        var e = n[t];
        delete n[t];
        var o = {
            id: t,
            exports: {}
        };
        return r[t] = o, e.call(o.exports, o, o.exports), o.exports
    }
    var i = Error("Cannot find module '" + t + "'");
    throw i.code = "MODULE_NOT_FOUND", i
}).register = function(t, e) {
    n[t] = e
}, e.parcelRequirefee8 = o);
var i = o.register;
i("cT75T", function(e, r) {
    t(e.exports, "AccountManager", function() {
        return m
    });
    var n, i, u = o("7BrIz"),
        s = o("8jIBp"),
        f = o("33R1Y"),
        a = function(t, e, r, n) {
            return new(r || (r = Promise))(function(o, i) {
                function u(t) {
                    try {
                        f(n.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        f(n.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function f(t) {
                    var e;
                    t.done ? o(t.value) : ((e = t.value) instanceof r ? e : new r(function(t) {
                        t(e)
                    })).then(u, s)
                }
                f((n = n.apply(t, e || [])).next())
            })
        },
        c = function(t, e) {
            var r, n, o, i, u = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(s) {
                return function(f) {
                    return function(s) {
                        if (r) throw TypeError("Generator is already executing.");
                        for (; i && (i = 0, s[0] && (u = 0)), u;) try {
                            if (r = 1, n && (o = 2 & s[0] ? n.return : s[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, s[1])).done) return o;
                            switch (n = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return u.label++, {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++, n = s[1], s = [0];
                                    continue;
                                case 7:
                                    s = u.ops.pop(), u.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        u.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && u.label < o[1]) {
                                        u.label = o[1], o = s;
                                        break
                                    }
                                    if (o && u.label < o[2]) {
                                        u.label = o[2], u.ops.push(s);
                                        break
                                    }
                                    o[2] && u.ops.pop(), u.trys.pop();
                                    continue
                            }
                            s = e.call(t, u)
                        } catch (t) {
                            s = [6, t], n = 0
                        } finally {
                            r = o = 0
                        }
                        if (5 & s[0]) throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, f])
                }
            }
        },
        h = "keep_signed_in",
        p = "id_token",
        l = "refresh_token";
    (n = i || (i = {})).GuestRequired = "guestRequired", n.LoggedIn = "loggedIn", n.LoggedOut = "loggedOut";
    var y = /^(?:[^=]+)=(.+)$/,
        d = function(t) {
            var e;
            return null === (e = y.exec(("undefined" != typeof document ? document.cookie.split("; ").find(function(e) {
                return e.startsWith("".concat(t, "="))
            }) : void 0) || "")) || void 0 === e ? void 0 : e[1]
        },
        g = function(t) {
            "undefined" != typeof document && (document.cookie = "".concat(t, "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure=true; SameSite=none"))
        },
        v = function(t, e) {
            var r, n, o;
            return e ? null !== (r = window.localStorage.getItem(t)) && void 0 !== r ? r : d(t) : null !== (o = null !== (n = window.sessionStorage.getItem(t)) && void 0 !== n ? n : window.localStorage.getItem(t)) && void 0 !== o ? o : d(t)
        },
        w = function(t, e, r) {
            r ? window.localStorage.setItem(t, e) : window.sessionStorage.setItem(t, e)
        },
        b = function(t) {
            "undefined" != typeof window && (window.sessionStorage.removeItem(t), window.localStorage.removeItem(t))
        },
        m = function() {
            function t(t) {
                var e;
                this._registeredEvents = ((e = {})[i.GuestRequired] = new Set, e[i.LoggedIn] = new Set, e[i.LoggedOut] = new Set, e), this._identityProvider = t
            }
            return Object.defineProperty(t.prototype, "guest", {
                get: function() {
                    var t;
                    return (0, f.IdentityProvider).isTokenExpired((0, f.IdentityProvider).getInfoFromToken(null === (t = this._guest) || void 0 === t ? void 0 : t.idToken)) ? void 0 : this._guest
                },
                set: function(t) {
                    if (!t) throw Error("`guest` is undefined, please set a correct value!");
                    this._guest = t, w(p, t.idToken), t.refreshToken && w(l, t.refreshToken, t.keepSignedIn), this.fireLoggedInEvent(t)
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.resetState = function() {
                this._guest = void 0
            }, t.prototype.getGuestAsync = function(t) {
                var e, r;
                return a(this, void 0, Promise, function() {
                    var n, o, i;
                    return c(this, function(u) {
                        switch (u.label) {
                            case 0:
                                if (!(null !== (e = this.guest) && void 0 !== e)) return [3, 1];
                                return i = e, [3, 3];
                            case 1:
                                return [4, this.tryGetGuestSilentlyAsync()];
                            case 2:
                                i = u.sent(), u.label = 3;
                            case 3:
                                if (!(null !== (r = i) && void 0 !== r)) return [3, 4];
                                return o = r, [3, 6];
                            case 4:
                                return [4, this.fireGuestRequiredEventAsync()];
                            case 5:
                                o = u.sent(), u.label = 6;
                            case 6:
                                if (n = o, t && !n) throw this._guest = void 0, new s.UnauthorizedError("Unable to obtain guest information!");
                                return n && n !== this._guest && (this.guest = n), [2, n]
                        }
                    })
                })
            }, Object.defineProperty(t, "current", {
                get: function() {
                    return E
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.addEventListener = function(t, e) {
                if (t === i.GuestRequired) {
                    var r = this.getEventSet(t);
                    r.clear(), r.add(e)
                }
                this.getEventSet(t).add(e)
            }, t.prototype.removeEventListener = function(t, e) {
                this.getEventSet(t).delete(e)
            }, t.prototype.updateGuestDetailsAsync = function(t) {
                var e;
                if (!(null === (e = this.guest) || void 0 === e ? void 0 : e.idToken)) throw Error("Unauthorized request");
                return this.guest.getOrUpdateDetailsAsync(t)
            }, t.prototype.logOut = function() {
                b(p), b(l), g(p), g(l), g(h), this.fireLoggedOutEvent(), this.resetState()
            }, t.prototype.isTokenExpired = function(t) {
                var e = (0, f.IdentityProvider).getInfoFromToken(t);
                return !!(!(null == e ? void 0 : e.exp) || Date.now() >= e.exp * u.MILLISECONDS_PER_SECOND)
            }, Object.defineProperty(t.prototype, "cachedIdToken", {
                get: function() {
                    if ("undefined" != typeof window) {
                        var t = v(p);
                        if (!this.isTokenExpired(t)) return t
                    }
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "cachedRefreshToken", {
                get: function() {
                    if ("undefined" != typeof window) {
                        var t = v(l);
                        if (!this.isTokenExpired(t)) return t
                    }
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "cachedKeepSignedIn", {
                get: function() {
                    var t;
                    return "undefined" != typeof window && "undefined" != typeof document && (!!v(l, !0) || (null === (t = d(h)) || void 0 === t ? void 0 : t.toLowerCase()) === "true")
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.tryGetGuestSilentlyAsync = function() {
                return a(this, void 0, Promise, function() {
                    var t, e, r;
                    return c(this, function(n) {
                        switch (n.label) {
                            case 0:
                                t = this.cachedIdToken, e = this.cachedRefreshToken || void 0, r = this.cachedKeepSignedIn || void 0, n.label = 1;
                            case 1:
                                return n.trys.push([1, 3, , 4]), [4, this._identityProvider.getGuestFromTokenAsync(r || !1, e, t)];
                            case 2:
                                return [2, n.sent()];
                            case 3:
                                return n.sent(), [2, void 0];
                            case 4:
                                return [2]
                        }
                    })
                })
            }, t.prototype.fireGuestRequiredEventAsync = function() {
                return a(this, void 0, void 0, function() {
                    var t, e, r;
                    return c(this, function(n) {
                        switch (n.label) {
                            case 0:
                                e = (t = this._registeredEvents[i.GuestRequired].values()).next(), n.label = 1;
                            case 1:
                                if (e.done) return [3, 3];
                                return [4, e.value()];
                            case 2:
                                if (r = n.sent()) return [2, r];
                                return e = t.next(), [3, 1];
                            case 3:
                                return [2, void 0]
                        }
                    })
                })
            }, t.prototype.fireLoggedInEvent = function(t) {
                return Array.from(this._registeredEvents[i.LoggedIn].values()).forEach(function(e) {
                    return e(t)
                })
            }, t.prototype.fireLoggedOutEvent = function() {
                return Array.from(this._registeredEvents[i.LoggedOut].values()).forEach(function(t) {
                    return t()
                })
            }, t.prototype.getEventSet = function(t) {
                return this._registeredEvents[t]
            }, t
        }(),
        E = new m(f.IdentityProvider.current)
}), i("7BrIz", function(e, r) {
    t(e.exports, "MILLISECONDS_PER_SECOND", function() {
        return n
    }), t(e.exports, "MILLISECONDS_PER_MINUTE", function() {
        return o
    }), t(e.exports, "dateFromTotalSeconds", function() {
        return i
    });
    var n = 1e3,
        o = 6e4,
        i = function(t) {
            return new Date(t * n)
        }
}), i("8jIBp", function(e, r) {
    t(e.exports, "UnauthorizedError", function() {
        return i
    });
    var n, o = (n = function(t, e) {
            return (n = Object.setPrototypeOf || ({
                __proto__: []
            }) instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            })(t, e)
        }, function(t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function r() {
                this.constructor = t
            }
            n(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }),
        i = function(t) {
            function e(r) {
                var n = t.call(this, r) || this;
                return Object.setPrototypeOf(n, e.prototype), n
            }
            return o(e, t), e
        }(Error)
}), i("33R1Y", function(e, r) {
    t(e.exports, "OtpType", function() {
        return a
    }), t(e.exports, "IdentityProvider", function() {
        return R
    });
    var n, i, u, s, f, a, c = o("gau1J"),
        h = o("7BrIz"),
        p = o("03ABY"),
        l = o("3lWib"),
        y = o("h23aJ"),
        d = o("2oFxA"),
        g = o("aekix"),
        v = o("1Newx"),
        w = function() {
            return (w = Object.assign || function(t) {
                for (var e, r = 1, n = arguments.length; r < n; r++)
                    for (var o in e = arguments[r]) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                return t
            }).apply(this, arguments)
        },
        b = function(t, e, r, n) {
            return new(r || (r = Promise))(function(o, i) {
                function u(t) {
                    try {
                        f(n.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        f(n.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function f(t) {
                    var e;
                    t.done ? o(t.value) : ((e = t.value) instanceof r ? e : new r(function(t) {
                        t(e)
                    })).then(u, s)
                }
                f((n = n.apply(t, e || [])).next())
            })
        },
        m = function(t, e) {
            var r, n, o, i, u = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(s) {
                return function(f) {
                    return function(s) {
                        if (r) throw TypeError("Generator is already executing.");
                        for (; i && (i = 0, s[0] && (u = 0)), u;) try {
                            if (r = 1, n && (o = 2 & s[0] ? n.return : s[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, s[1])).done) return o;
                            switch (n = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return u.label++, {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++, n = s[1], s = [0];
                                    continue;
                                case 7:
                                    s = u.ops.pop(), u.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        u.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && u.label < o[1]) {
                                        u.label = o[1], o = s;
                                        break
                                    }
                                    if (o && u.label < o[2]) {
                                        u.label = o[2], u.ops.push(s);
                                        break
                                    }
                                    o[2] && u.ops.pop(), u.trys.pop();
                                    continue
                            }
                            s = e.call(t, u)
                        } catch (t) {
                            s = [6, t], n = 0
                        } finally {
                            r = o = 0
                        }
                        if (5 & s[0]) throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, f])
                }
            }
        };
    (n = s || (s = {})).JWTToken = "JWTToken", n.Bearer = "Bearer", (i = f || (f = {})).RefreshToken = "refresh_token", i.IdToken = "id_token", (u = a || (a = {}))[u.Registration = 0] = "Registration", u[u.Other = 1] = "Other";
    var E = function(t) {
            return (0, v.isDefinedUnknownObject)(t) && "error" in t && "string" == typeof t.error
        },
        A = function(t) {
            return (0, v.isDefinedUnknownObject)(t) && "id_token" in t && "string" == typeof t.id_token && "refresh_token" in t && "string" == typeof t.refresh_token && "expires_in" in t && ("string" == typeof t.expires_in || "number" == typeof t.expires_in)
        },
        I = function(t) {
            return (0, v.isDefinedUnknownObject)(t) && "messages" in t && Array.isArray(t.messages) && t.messages.every(function(t) {
                return "string" == typeof t && void 0 !== p.AuthenticationErrorType[t]
            }) && (!("authId" in t) || "string" == typeof t.authId)
        },
        x = function(t) {
            return (0, v.isDefinedUnknownObject)(t) && "authId" in t && "string" == typeof t.authId
        },
        T = function(t) {
            return (0, v.isDefinedUnknownObject)(t) && "accountId" in t && "string" == typeof t.accountId
        },
        O = function(t) {
            return A(t) || I(t) || E(t)
        },
        _ = function(t) {
            return A(t) || x(t) || I(t) || E(t)
        },
        S = function(t) {
            return I(t) || E(t)
        },
        k = function(t) {
            return x(t) || I(t) || E(t)
        },
        P = function(t) {
            return I(t) || E(t)
        },
        U = function(t) {
            return (0, v.isDefinedUnknownObject)(t) && "errorCode" in t && "string" == typeof t.errorCode && (!("caseNumber" in t) || "string" == typeof t.caseNumber)
        },
        B = function(t) {
            return T(t) || U(t) || E(t)
        },
        R = function() {
            function t() {
                var e = this;
                this._propsAwaitingQueue = new Set, this.updateGuestDetailsAsync = function(r, n) {
                    return b(e, void 0, Promise, function() {
                        var e, o, i, u;
                        return m(this, function(s) {
                            switch (s.label) {
                                case 0:
                                    return [4, this.getPropsAsync()];
                                case 1:
                                    if (e = s.sent(), !((o = t.getInfoFromToken(r)) && (null === (u = o.isDemoUser) || void 0 === u ? void 0 : u.toLowerCase()) === "true" && e.guestServiceDemoUrl)) return [3, 4];
                                    return [4, fetch(e.guestServiceDemoUrl, {})];
                                case 2:
                                    return [4, s.sent().json()];
                                case 3:
                                    return i = s.sent(), [3, 6];
                                case 4:
                                    return [4, this.postRequestAsync(e.guestServiceUrl, B, n, r)];
                                case 5:
                                    i = s.sent(), s.label = 6;
                                case 6:
                                    if (T(i)) return [2, i];
                                    if (U(i)) throw new d.SalesforceError(i.errorCode, i.caseNumber);
                                    throw this.getGenericError(i)
                            }
                        })
                    })
                }
            }
            return Object.defineProperty(t, "current", {
                get: function() {
                    return L
                },
                enumerable: !1,
                configurable: !0
            }), t.prototype.init = function(t) {
                this._props = w({}, t);
                for (var e = Array.from(this._propsAwaitingQueue), r = 0; r < e.length; r++)(0, e[r])(this._props);
                this._propsAwaitingQueue.clear()
            }, t.prototype.postRequestAsync = function(t, e, r, n) {
                return b(this, void 0, void 0, function() {
                    return m(this, function(o) {
                        switch (o.label) {
                            case 0:
                                return [4, (0, c.typedFetch)(t, e, {
                                    mode: "cors",
                                    headers: w({
                                        "Content-Type": "application/json"
                                    }, n ? {
                                        Authorization: "Bearer ".concat(n)
                                    } : {}),
                                    method: "POST",
                                    body: JSON.stringify(r)
                                })];
                            case 1:
                                return [2, o.sent().json()]
                        }
                    })
                })
            }, t.prototype.loginAsync = function(t, e, r, n, o) {
                return b(this, void 0, Promise, function() {
                    var i, u, s;
                    return m(this, function(f) {
                        switch (f.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return i = f.sent(), u = "".concat(i.guestServiceUrl, "/login"), [4, this.postRequestAsync(u, O, {
                                    username: e,
                                    password: r,
                                    newPhoneNumber: n,
                                    newPassword: o
                                })];
                            case 2:
                                if (A(s = f.sent())) return [2, this.getGuestFromLoginResponse(t, s)];
                                if (I(s)) throw new p.AuthenticationError(new Set(s.messages), s.authId || void 0);
                                throw this.getGenericError(s)
                        }
                    })
                })
            }, t.prototype.requestOtpAsync = function(t, e) {
                return b(this, void 0, Promise, function() {
                    var r, n, o;
                    return m(this, function(i) {
                        switch (i.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return r = i.sent(), n = "".concat(r.guestServiceUrl, "/resend-otp"), [4, this.postRequestAsync(n, k, {
                                    authId: t,
                                    requestType: e
                                })];
                            case 2:
                                if (x(o = i.sent())) return [2, o.authId];
                                if (I(o)) throw new p.AuthenticationError(new Set(o.messages), o.authId || void 0);
                                throw this.getGenericError(o)
                        }
                    })
                })
            }, t.prototype.resetPasswordAsync = function(t) {
                return b(this, void 0, Promise, function() {
                    var e, r, n;
                    return m(this, function(o) {
                        switch (o.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return e = o.sent(), r = "".concat(e.guestServiceUrl, "/reset-password"), [4, this.postRequestAsync(r, P, {
                                    username: t
                                })];
                            case 2:
                                if (I(n = o.sent())) {
                                    if (1 === n.messages.length && n.messages[0] === p.AuthenticationErrorType.OtpCodeRequired && n.authId) return [2, n.authId];
                                    throw new p.AuthenticationError(new Set(n.messages), n.authId || void 0)
                                }
                                throw this.getGenericError(n)
                        }
                    })
                })
            }, t.prototype.registerAsync = function(t, e, r, n, o) {
                return b(this, void 0, Promise, function() {
                    var i, u, s;
                    return m(this, function(f) {
                        switch (f.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return i = f.sent(), u = "".concat(i.guestServiceUrl, "/register"), [4, this.postRequestAsync(u, S, {
                                    email: t,
                                    password: e,
                                    mobileNumber: r,
                                    firstName: n,
                                    lastName: o
                                })];
                            case 2:
                                if (I(s = f.sent())) throw new p.AuthenticationError(new Set(s.messages), s.authId || void 0);
                                throw this.getGenericError(s)
                        }
                    })
                })
            }, t.prototype.submitOtpAsync = function(t, e, r, n) {
                return void 0 === n && (n = a.Registration), b(this, void 0, Promise, function() {
                    var o, i, u;
                    return m(this, function(s) {
                        switch (s.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return o = s.sent(), i = "".concat(o.guestServiceUrl, "/validate-otp"), [4, this.postRequestAsync(i, _, {
                                    authId: e,
                                    code: r,
                                    otpType: n
                                })];
                            case 2:
                                if (A(u = s.sent())) return [2, this.getGuestFromLoginResponse(t, u)];
                                if (x(u)) return [2, u.authId];
                                if (I(u)) throw new p.AuthenticationError(new Set(u.messages), u.authId || void 0);
                                throw this.getGenericError(u)
                        }
                    })
                })
            }, t.prototype.setNewPasswordAsync = function(t, e, r) {
                return b(this, void 0, Promise, function() {
                    var n, o, i;
                    return m(this, function(u) {
                        switch (u.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return n = u.sent(), o = "".concat(n.guestServiceUrl, "/submit-password"), [4, this.postRequestAsync(o, O, {
                                    authId: t,
                                    password: e
                                })];
                            case 2:
                                if (A(i = u.sent())) return [2, this.getGuestFromLoginResponse(r, i)];
                                if (I(i)) throw new p.AuthenticationError(new Set(i.messages), i.authId || void 0);
                                throw this.getGenericError(i)
                        }
                    })
                })
            }, t.prototype.saveNewPasswordAsync = function(t, e, r) {
                return b(this, void 0, Promise, function() {
                    var n, o, i;
                    return m(this, function(u) {
                        switch (u.label) {
                            case 0:
                                return [4, this.getPropsAsync()];
                            case 1:
                                return n = u.sent(), o = "".concat(n.guestServiceUrl, "/save-password"), [4, this.postRequestAsync(o, S, {
                                    email: t,
                                    password: e,
                                    mobileNumber: r
                                })];
                            case 2:
                                if (I(i = u.sent())) throw new p.AuthenticationError(new Set(i.messages), i.authId || void 0);
                                throw this.getGenericError(i)
                        }
                    })
                })
            }, t.prototype.getGuestFromTokenAsync = function(e, r, n) {
                return b(this, void 0, Promise, function() {
                    var o, i, u, s;
                    return m(this, function(a) {
                        switch (a.label) {
                            case 0:
                                if ((null == (o = t.getInfoFromToken(n)) ? void 0 : o.tokenName) === f.IdToken && n && !t.isTokenExpired(o)) try {
                                    return [2, new y.Guest(o.email, n, r, l.GuestAccountType.Default, e, this.updateGuestDetailsAsync)]
                                } catch (t) {
                                    return [2, void 0]
                                }
                                if (!r) return [2, void 0];
                                return [4, this.getPropsAsync()];
                            case 1:
                                return i = a.sent(), u = "".concat(i.guestServiceUrl, "/refresh-token"), [4, this.postRequestAsync(u, O, {
                                    refreshToken: r
                                })];
                            case 2:
                                if (A(s = a.sent())) return [2, this.getGuestFromLoginResponse(e, s)];
                                return [2, void 0]
                        }
                    })
                })
            }, t.prototype.getGuestFromLoginResponse = function(e, r) {
                var n = t.getInfoFromToken(r.id_token),
                    o = (null == n ? void 0 : n.tokenName) === f.IdToken ? n.email : void 0;
                if (!o) throw Error("Invalid ID token");
                return new y.Guest(o, r.id_token, r.refresh_token, l.GuestAccountType.Default, e, this.updateGuestDetailsAsync)
            }, t.prototype.getGenericError = function(t) {
                return Error(E(t) ? t.error || t.error_description : void 0)
            }, t.prototype.getPropsAsync = function() {
                var t = this;
                return this._props ? Promise.resolve(this._props) : new Promise(function(e) {
                    t._propsAwaitingQueue.add(e)
                })
            }, t.getInfoFromToken = function(t) {
                var e = null == t ? void 0 : t.split(".");
                if ((null == e ? void 0 : e.length) === 3 && e[1].length) {
                    var r = JSON.parse((g && g.__esModule ? g.default : g).decode(e[1]));
                    return (0, v.isDefinedUnknownObject)(r) && "tokenName" in r && r.tokenName === f.IdToken && "name" in r && "string" == typeof r.name && "given_name" in r && "string" == typeof r.given_name && "family_name" in r && "string" == typeof r.family_name && "email" in r && "string" == typeof r.email && "phone_number" in r && "string" == typeof r.phone_number && "exp" in r && "number" == typeof r.exp || (0, v.isDefinedUnknownObject)(r) && "tokenName" in r && r.tokenName === f.RefreshToken && "exp" in r && "number" == typeof r.exp ? r : void 0
                }
            }, t.isTokenExpired = function(t) {
                return null == t || !t.exp || ((0, h.dateFromTotalSeconds)(t.exp).getTime() - new Date().getTime()) / h.MILLISECONDS_PER_MINUTE < 3
            }, t
        }(),
        L = new R
}), i("gau1J", function(e, r) {
    t(e.exports, "typedFetch", function() {
        return o
    });
    var n = function(t, e) {
            var r, n, o, i, u = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(s) {
                return function(f) {
                    return function(s) {
                        if (r) throw TypeError("Generator is already executing.");
                        for (; i && (i = 0, s[0] && (u = 0)), u;) try {
                            if (r = 1, n && (o = 2 & s[0] ? n.return : s[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, s[1])).done) return o;
                            switch (n = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return u.label++, {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++, n = s[1], s = [0];
                                    continue;
                                case 7:
                                    s = u.ops.pop(), u.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        u.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && u.label < o[1]) {
                                        u.label = o[1], o = s;
                                        break
                                    }
                                    if (o && u.label < o[2]) {
                                        u.label = o[2], u.ops.push(s);
                                        break
                                    }
                                    o[2] && u.ops.pop(), u.trys.pop();
                                    continue
                            }
                            s = e.call(t, u)
                        } catch (t) {
                            s = [6, t], n = 0
                        } finally {
                            r = o = 0
                        }
                        if (5 & s[0]) throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, f])
                }
            }
        },
        o = function(t, e, r) {
            var o, i, u, s;
            return o = void 0, i = void 0, u = Promise, s = function() {
                var o, i, u;
                return n(this, function(n) {
                    switch (n.label) {
                        case 0:
                            return [4, fetch(t, r)];
                        case 1:
                            if (!(null !== (o = n.sent()).body)) return [3, 3];
                            return [4, o.json()];
                        case 2:
                            return u = n.sent(), [3, 4];
                        case 3:
                            u = null, n.label = 4;
                        case 4:
                            if (e(i = u)) return [2, new Proxy(o, {
                                get: function(t, e, r) {
                                    return "json" === e ? function() {
                                        return Promise.resolve(i)
                                    } : Reflect.get(t, e, r)
                                }
                            })];
                            throw console.error("Invalid response type", i), Error("Invalid response type")
                    }
                })
            }, new(u || (u = Promise))(function(t, e) {
                function r(t) {
                    try {
                        f(s.next(t))
                    } catch (t) {
                        e(t)
                    }
                }

                function n(t) {
                    try {
                        f(s.throw(t))
                    } catch (t) {
                        e(t)
                    }
                }

                function f(e) {
                    var o;
                    e.done ? t(e.value) : ((o = e.value) instanceof u ? o : new u(function(t) {
                        t(o)
                    })).then(r, n)
                }
                f((s = s.apply(o, i || [])).next())
            })
        }
}), i("03ABY", function(e, r) {
    t(e.exports, "AuthenticationErrorType", function() {
        return i
    }), t(e.exports, "AuthenticationError", function() {
        return s
    });
    var n, o, i, u = (o = function(t, e) {
        return (o = Object.setPrototypeOf || ({
            __proto__: []
        }) instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
        })(t, e)
    }, function(t, e) {
        if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

        function r() {
            this.constructor = t
        }
        o(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
    });
    (n = i || (i = {})).PhoneNotUnique = "PhoneNotUnique", n.PhoneMissing = "PhoneMissing", n.PhoneInvalid = "PhoneInvalid", n.PasswordInvalid = "PasswordInvalid", n.NewPasswordInvalid = "NewPasswordInvalid", n.PasswordIsTheSame = "PasswordIsTheSame", n.PasswordNotMatchingPolicy = "PasswordNotMatchingPolicy", n.UserNotFound = "UserNotFound", n.UserExists = "UserExists", n.OtpCodeRequired = "OtpCodeRequired", n.OtpInvalid = "OtpInvalid", n.EmailNotUnique = "EmailNotUnique", n.EmailInvalid = "EmailInvalid", n.TnCsInvalid = "TnCsInvalid", n.InvalidInput = "InvalidInput", n.AccountLocked = "AccountLocked", n.SessionTimeout = "SessionTimeout";
    var s = function(t) {
        function e(r, n) {
            var o = t.call(this, Array.from(r).join(" \n")) || this;
            return o._types = r, o._authId = n, Object.setPrototypeOf(o, e.prototype), o
        }
        return u(e, t), e.prototype.hasType = function(t) {
            return this._types.has(t)
        }, e.prototype.hasAnyType = function(t) {
            var e = this;
            return t.some(function(t) {
                return e._types.has(t)
            })
        }, Object.defineProperty(e.prototype, "types", {
            get: function() {
                return this._types
            },
            enumerable: !1,
            configurable: !0
        }), Object.defineProperty(e.prototype, "authId", {
            get: function() {
                return this._authId
            },
            enumerable: !1,
            configurable: !0
        }), e
    }(Error)
}), i("3lWib", function(e, r) {
    var n, o;
    t(e.exports, "GuestAccountType", function() {
        return n
    }), (o = n || (n = {}))[o.Default = 1] = "Default", o[o.Social = 2] = "Social"
}), i("h23aJ", function(e, r) {
    t(e.exports, "Guest", function() {
        return o
    });
    var n = function(t, e) {
            var r, n, o, i, u = {
                label: 0,
                sent: function() {
                    if (1 & o[0]) throw o[1];
                    return o[1]
                },
                trys: [],
                ops: []
            };
            return i = {
                next: s(0),
                throw: s(1),
                return: s(2)
            }, "function" == typeof Symbol && (i[Symbol.iterator] = function() {
                return this
            }), i;

            function s(s) {
                return function(f) {
                    return function(s) {
                        if (r) throw TypeError("Generator is already executing.");
                        for (; i && (i = 0, s[0] && (u = 0)), u;) try {
                            if (r = 1, n && (o = 2 & s[0] ? n.return : s[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, s[1])).done) return o;
                            switch (n = 0, o && (s = [2 & s[0], o.value]), s[0]) {
                                case 0:
                                case 1:
                                    o = s;
                                    break;
                                case 4:
                                    return u.label++, {
                                        value: s[1],
                                        done: !1
                                    };
                                case 5:
                                    u.label++, n = s[1], s = [0];
                                    continue;
                                case 7:
                                    s = u.ops.pop(), u.trys.pop();
                                    continue;
                                default:
                                    if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === s[0] || 2 === s[0])) {
                                        u = 0;
                                        continue
                                    }
                                    if (3 === s[0] && (!o || s[1] > o[0] && s[1] < o[3])) {
                                        u.label = s[1];
                                        break
                                    }
                                    if (6 === s[0] && u.label < o[1]) {
                                        u.label = o[1], o = s;
                                        break
                                    }
                                    if (o && u.label < o[2]) {
                                        u.label = o[2], u.ops.push(s);
                                        break
                                    }
                                    o[2] && u.ops.pop(), u.trys.pop();
                                    continue
                            }
                            s = e.call(t, u)
                        } catch (t) {
                            s = [6, t], n = 0
                        } finally {
                            r = o = 0
                        }
                        if (5 & s[0]) throw s[1];
                        return {
                            value: s[0] ? s[1] : void 0,
                            done: !0
                        }
                    }([s, f])
                }
            }
        },
        o = function() {
            function t(t, e, r, o, i, u) {
                var s = this;
                this.getOrUpdateDetailsAsync = function(t) {
                    var e, r, o;
                    return e = void 0, r = Promise, o = function() {
                        var e;
                        return n(this, function(r) {
                            switch (r.label) {
                                case 0:
                                    if (!(t || !this._cachedDetails)) return [3, 2];
                                    return e = this, [4, this._getOrUpdateDetailsAsync(this.idToken, null != t ? t : {})];
                                case 1:
                                    e._cachedDetails = r.sent(), r.label = 2;
                                case 2:
                                    return [2, this._cachedDetails]
                            }
                        })
                    }, new(r || (r = Promise))(function(t, n) {
                        function i(t) {
                            try {
                                f(o.next(t))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function u(t) {
                            try {
                                f(o.throw(t))
                            } catch (t) {
                                n(t)
                            }
                        }

                        function f(e) {
                            var n;
                            e.done ? t(e.value) : ((n = e.value) instanceof r ? n : new r(function(t) {
                                t(n)
                            })).then(i, u)
                        }
                        f((o = o.apply(s, e || [])).next())
                    })
                }, this._email = t, this._idToken = e, this._refreshToken = r, this._type = o, this._keepSignedIn = i, this._getOrUpdateDetailsAsync = u
            }
            return Object.defineProperty(t.prototype, "email", {
                get: function() {
                    return this._email
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "idToken", {
                get: function() {
                    return this._idToken
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "refreshToken", {
                get: function() {
                    return this._refreshToken
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "type", {
                get: function() {
                    return this._type
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(t.prototype, "keepSignedIn", {
                get: function() {
                    return this._keepSignedIn
                },
                enumerable: !1,
                configurable: !0
            }), t
        }()
}), i("2oFxA", function(e, r) {
    t(e.exports, "SalesforceError", function() {
        return i
    });
    var n, o = (n = function(t, e) {
            return (n = Object.setPrototypeOf || ({
                __proto__: []
            }) instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r])
            })(t, e)
        }, function(t, e) {
            if ("function" != typeof e && null !== e) throw TypeError("Class extends value " + String(e) + " is not a constructor or null");

            function r() {
                this.constructor = t
            }
            n(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r)
        }),
        i = function(t) {
            function e(r, n) {
                var o = t.call(this, r) || this;
                return o._errorCode = r, o._caseNumber = n, Object.setPrototypeOf(o, e.prototype), o
            }
            return o(e, t), Object.defineProperty(e.prototype, "errorCode", {
                get: function() {
                    return this._errorCode
                },
                enumerable: !1,
                configurable: !0
            }), Object.defineProperty(e.prototype, "caseNumber", {
                get: function() {
                    return this._caseNumber
                },
                enumerable: !1,
                configurable: !0
            }), e
        }(Error)
}), i("aekix", function(t, e) {
    t.exports = o("bECtT").default, t.exports.default = t.exports
}), i("bECtT", function(t, e) {
    var r = o("4lZp4").Buffer;
    Object.defineProperty(t.exports, "__esModule", {
        value: !0
    });
    var n = o("5Mjji");

    function i(t, e) {
        return (void 0 === e && (e = "utf8"), r.isBuffer(t)) ? s(t.toString("base64")) : s(r.from(t, e).toString("base64"))
    }

    function u(t) {
        return t = t.toString(), n.default(t).replace(/\-/g, "+").replace(/_/g, "/")
    }

    function s(t) {
        return t.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")
    }
    i.encode = i, i.decode = function(t, e) {
        return void 0 === e && (e = "utf8"), r.from(u(t), "base64").toString(e)
    }, i.toBase64 = u, i.fromBase64 = s, i.toBuffer = function(t) {
        return r.from(u(t), "base64")
    }, t.exports.default = i
}), i("4lZp4", function(e, r) {
    t(e.exports, "Buffer", function() {
        return n
    }, function(t) {
        return n = t
    }), t(e.exports, "INSPECT_MAX_BYTES", function() {
        return i
    }, function(t) {
        return i = t
    });
    var n, i, u = o("6WdfO"),
        s = o("24dbd"),
        f = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;

    function a(t) {
        if (t > 0x7fffffff) throw RangeError('The value "' + t + '" is invalid for option "size"');
        var e = new Uint8Array(t);
        return Object.setPrototypeOf(e, c.prototype), e
    }

    function c(t, e, r) {
        if ("number" == typeof t) {
            if ("string" == typeof e) throw TypeError('The "string" argument must be of type string. Received type number');
            return l(t)
        }
        return h(t, e, r)
    }

    function h(t, e, r) {
        if ("string" == typeof t) return function(t, e) {
            if (("string" != typeof e || "" === e) && (e = "utf8"), !c.isEncoding(e)) throw TypeError("Unknown encoding: " + e);
            var r = 0 | v(t, e),
                n = a(r),
                o = n.write(t, e);
            return o !== r && (n = n.slice(0, o)), n
        }(t, e);
        if (ArrayBuffer.isView(t)) return function(t) {
            if (B(t, Uint8Array)) {
                var e = new Uint8Array(t);
                return d(e.buffer, e.byteOffset, e.byteLength)
            }
            return y(t)
        }(t);
        if (null == t) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t);
        if (B(t, ArrayBuffer) || t && B(t.buffer, ArrayBuffer) || "undefined" != typeof SharedArrayBuffer && (B(t, SharedArrayBuffer) || t && B(t.buffer, SharedArrayBuffer))) return d(t, e, r);
        if ("number" == typeof t) throw TypeError('The "value" argument must not be of type number. Received type number');
        var n = t.valueOf && t.valueOf();
        if (null != n && n !== t) return c.from(n, e, r);
        var o = function(t) {
            if (c.isBuffer(t)) {
                var e, r = 0 | g(t.length),
                    n = a(r);
                return 0 === n.length || t.copy(n, 0, 0, r), n
            }
            return void 0 !== t.length ? "number" != typeof t.length || (e = t.length) != e ? a(0) : y(t) : "Buffer" === t.type && Array.isArray(t.data) ? y(t.data) : void 0
        }(t);
        if (o) return o;
        if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof t[Symbol.toPrimitive]) return c.from(t[Symbol.toPrimitive]("string"), e, r);
        throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof t)
    }

    function p(t) {
        if ("number" != typeof t) throw TypeError('"size" argument must be of type number');
        if (t < 0) throw RangeError('The value "' + t + '" is invalid for option "size"')
    }

    function l(t) {
        return p(t), a(t < 0 ? 0 : 0 | g(t))
    }

    function y(t) {
        for (var e = t.length < 0 ? 0 : 0 | g(t.length), r = a(e), n = 0; n < e; n += 1) r[n] = 255 & t[n];
        return r
    }

    function d(t, e, r) {
        var n;
        if (e < 0 || t.byteLength < e) throw RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < e + (r || 0)) throw RangeError('"length" is outside of buffer bounds');
        return Object.setPrototypeOf(n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), c.prototype), n
    }

    function g(t) {
        if (t >= 0x7fffffff) throw RangeError("Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes");
        return 0 | t
    }

    function v(t, e) {
        if (c.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || B(t, ArrayBuffer)) return t.byteLength;
        if ("string" != typeof t) throw TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof t);
        var r = t.length,
            n = arguments.length > 2 && !0 === arguments[2];
        if (!n && 0 === r) return 0;
        for (var o = !1;;) switch (e) {
            case "ascii":
            case "latin1":
            case "binary":
                return r;
            case "utf8":
            case "utf-8":
                return k(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return 2 * r;
            case "hex":
                return r >>> 1;
            case "base64":
                return P(t).length;
            default:
                if (o) return n ? -1 : k(t).length;
                e = ("" + e).toLowerCase(), o = !0
        }
    }

    function w(t, e, r) {
        var n, o, i = !1;
        if ((void 0 === e || e < 0) && (e = 0), e > this.length || ((void 0 === r || r > this.length) && (r = this.length), r <= 0 || (r >>>= 0) <= (e >>>= 0))) return "";
        for (t || (t = "utf8");;) switch (t) {
            case "hex":
                return function(t, e, r) {
                    var n = t.length;
                    (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
                    for (var o = "", i = e; i < r; ++i) o += R[t[i]];
                    return o
                }(this, e, r);
            case "utf8":
            case "utf-8":
                return A(this, e, r);
            case "ascii":
                return function(t, e, r) {
                    var n = "";
                    r = Math.min(t.length, r);
                    for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
                    return n
                }(this, e, r);
            case "latin1":
            case "binary":
                return function(t, e, r) {
                    var n = "";
                    r = Math.min(t.length, r);
                    for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);
                    return n
                }(this, e, r);
            case "base64":
                return n = e, o = r, 0 === n && o === this.length ? u.fromByteArray(this) : u.fromByteArray(this.slice(n, o));
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return function(t, e, r) {
                    for (var n = t.slice(e, r), o = "", i = 0; i < n.length - 1; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                    return o
                }(this, e, r);
            default:
                if (i) throw TypeError("Unknown encoding: " + t);
                t = (t + "").toLowerCase(), i = !0
        }
    }

    function b(t, e, r) {
        var n = t[e];
        t[e] = t[r], t[r] = n
    }

    function m(t, e, r, n, o) {
        var i;
        if (0 === t.length) return -1;
        if ("string" == typeof r ? (n = r, r = 0) : r > 0x7fffffff ? r = 0x7fffffff : r < -0x80000000 && (r = -0x80000000), (i = r = +r) != i && (r = o ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
            if (o) return -1;
            r = t.length - 1
        } else if (r < 0) {
            if (!o) return -1;
            r = 0
        }
        if ("string" == typeof e && (e = c.from(e, n)), c.isBuffer(e)) return 0 === e.length ? -1 : E(t, e, r, n, o);
        if ("number" == typeof e) return (e &= 255, "function" == typeof Uint8Array.prototype.indexOf) ? o ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : E(t, [e], r, n, o);
        throw TypeError("val must be string, number or Buffer")
    }

    function E(t, e, r, n, o) {
        var i, u = 1,
            s = t.length,
            f = e.length;
        if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
            if (t.length < 2 || e.length < 2) return -1;
            u = 2, s /= 2, f /= 2, r /= 2
        }

        function a(t, e) {
            return 1 === u ? t[e] : t.readUInt16BE(e * u)
        }
        if (o) {
            var c = -1;
            for (i = r; i < s; i++)
                if (a(t, i) === a(e, -1 === c ? 0 : i - c)) {
                    if (-1 === c && (c = i), i - c + 1 === f) return c * u
                } else -1 !== c && (i -= i - c), c = -1
        } else
            for (r + f > s && (r = s - f), i = r; i >= 0; i--) {
                for (var h = !0, p = 0; p < f; p++)
                    if (a(t, i + p) !== a(e, p)) {
                        h = !1;
                        break
                    }
                if (h) return i
            }
        return -1
    }

    function A(t, e, r) {
        r = Math.min(t.length, r);
        for (var n = [], o = e; o < r;) {
            var i, u, s, f, a = t[o],
                c = null,
                h = a > 239 ? 4 : a > 223 ? 3 : a > 191 ? 2 : 1;
            if (o + h <= r) switch (h) {
                case 1:
                    a < 128 && (c = a);
                    break;
                case 2:
                    (192 & (i = t[o + 1])) == 128 && (f = (31 & a) << 6 | 63 & i) > 127 && (c = f);
                    break;
                case 3:
                    i = t[o + 1], u = t[o + 2], (192 & i) == 128 && (192 & u) == 128 && (f = (15 & a) << 12 | (63 & i) << 6 | 63 & u) > 2047 && (f < 55296 || f > 57343) && (c = f);
                    break;
                case 4:
                    i = t[o + 1], u = t[o + 2], s = t[o + 3], (192 & i) == 128 && (192 & u) == 128 && (192 & s) == 128 && (f = (15 & a) << 18 | (63 & i) << 12 | (63 & u) << 6 | 63 & s) > 65535 && f < 1114112 && (c = f)
            }
            null === c ? (c = 65533, h = 1) : c > 65535 && (c -= 65536, n.push(c >>> 10 & 1023 | 55296), c = 56320 | 1023 & c), n.push(c), o += h
        }
        return function(t) {
            var e = t.length;
            if (e <= 4096) return String.fromCharCode.apply(String, t);
            for (var r = "", n = 0; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += 4096));
            return r
        }(n)
    }

    function I(t, e, r) {
        if (t % 1 != 0 || t < 0) throw RangeError("offset is not uint");
        if (t + e > r) throw RangeError("Trying to access beyond buffer length")
    }

    function x(t, e, r, n, o, i) {
        if (!c.isBuffer(t)) throw TypeError('"buffer" argument must be a Buffer instance');
        if (e > o || e < i) throw RangeError('"value" argument is out of bounds');
        if (r + n > t.length) throw RangeError("Index out of range")
    }

    function T(t, e, r, n, o, i) {
        if (r + n > t.length || r < 0) throw RangeError("Index out of range")
    }

    function O(t, e, r, n, o) {
        return e = +e, r >>>= 0, o || T(t, e, r, 4, 34028234663852886e22, -34028234663852886e22), s.write(t, e, r, n, 23, 4), r + 4
    }

    function _(t, e, r, n, o) {
        return e = +e, r >>>= 0, o || T(t, e, r, 8, 17976931348623157e292, -17976931348623157e292), s.write(t, e, r, n, 52, 8), r + 8
    }
    n = c, i = 50, c.TYPED_ARRAY_SUPPORT = function() {
        try {
            var t = new Uint8Array(1),
                e = {
                    foo: function() {
                        return 42
                    }
                };
            return Object.setPrototypeOf(e, Uint8Array.prototype), Object.setPrototypeOf(t, e), 42 === t.foo()
        } catch (t) {
            return !1
        }
    }(), c.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(c.prototype, "parent", {
        enumerable: !0,
        get: function() {
            if (c.isBuffer(this)) return this.buffer
        }
    }), Object.defineProperty(c.prototype, "offset", {
        enumerable: !0,
        get: function() {
            if (c.isBuffer(this)) return this.byteOffset
        }
    }), c.poolSize = 8192, c.from = function(t, e, r) {
        return h(t, e, r)
    }, Object.setPrototypeOf(c.prototype, Uint8Array.prototype), Object.setPrototypeOf(c, Uint8Array), c.alloc = function(t, e, r) {
        return (p(t), t <= 0) ? a(t) : void 0 !== e ? "string" == typeof r ? a(t).fill(e, r) : a(t).fill(e) : a(t)
    }, c.allocUnsafe = function(t) {
        return l(t)
    }, c.allocUnsafeSlow = function(t) {
        return l(t)
    }, c.isBuffer = function(t) {
        return null != t && !0 === t._isBuffer && t !== c.prototype
    }, c.compare = function(t, e) {
        if (B(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)), B(e, Uint8Array) && (e = c.from(e, e.offset, e.byteLength)), !c.isBuffer(t) || !c.isBuffer(e)) throw TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
        if (t === e) return 0;
        for (var r = t.length, n = e.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (t[o] !== e[o]) {
                r = t[o], n = e[o];
                break
            }
        return r < n ? -1 : n < r ? 1 : 0
    }, c.isEncoding = function(t) {
        switch (String(t).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return !0;
            default:
                return !1
        }
    }, c.concat = function(t, e) {
        if (!Array.isArray(t)) throw TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return c.alloc(0);
        if (void 0 === e)
            for (r = 0, e = 0; r < t.length; ++r) e += t[r].length;
        var r, n = c.allocUnsafe(e),
            o = 0;
        for (r = 0; r < t.length; ++r) {
            var i = t[r];
            if (B(i, Uint8Array)) o + i.length > n.length ? c.from(i).copy(n, o) : Uint8Array.prototype.set.call(n, i, o);
            else if (c.isBuffer(i)) i.copy(n, o);
            else throw TypeError('"list" argument must be an Array of Buffers');
            o += i.length
        }
        return n
    }, c.byteLength = v, c.prototype._isBuffer = !0, c.prototype.swap16 = function() {
        var t = this.length;
        if (t % 2 != 0) throw RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) b(this, e, e + 1);
        return this
    }, c.prototype.swap32 = function() {
        var t = this.length;
        if (t % 4 != 0) throw RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) b(this, e, e + 3), b(this, e + 1, e + 2);
        return this
    }, c.prototype.swap64 = function() {
        var t = this.length;
        if (t % 8 != 0) throw RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) b(this, e, e + 7), b(this, e + 1, e + 6), b(this, e + 2, e + 5), b(this, e + 3, e + 4);
        return this
    }, c.prototype.toString = function() {
        var t = this.length;
        return 0 === t ? "" : 0 == arguments.length ? A(this, 0, t) : w.apply(this, arguments)
    }, c.prototype.toLocaleString = c.prototype.toString, c.prototype.equals = function(t) {
        if (!c.isBuffer(t)) throw TypeError("Argument must be a Buffer");
        return this === t || 0 === c.compare(this, t)
    }, c.prototype.inspect = function() {
        var t = "",
            e = i;
        return t = this.toString("hex", 0, e).replace(/(.{2})/g, "$1 ").trim(), this.length > e && (t += " ... "), "<Buffer " + t + ">"
    }, f && (c.prototype[f] = c.prototype.inspect), c.prototype.compare = function(t, e, r, n, o) {
        if (B(t, Uint8Array) && (t = c.from(t, t.offset, t.byteLength)), !c.isBuffer(t)) throw TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof t);
        if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === o && (o = this.length), e < 0 || r > t.length || n < 0 || o > this.length) throw RangeError("out of range index");
        if (n >= o && e >= r) return 0;
        if (n >= o) return -1;
        if (e >= r) return 1;
        if (e >>>= 0, r >>>= 0, n >>>= 0, o >>>= 0, this === t) return 0;
        for (var i = o - n, u = r - e, s = Math.min(i, u), f = this.slice(n, o), a = t.slice(e, r), h = 0; h < s; ++h)
            if (f[h] !== a[h]) {
                i = f[h], u = a[h];
                break
            }
        return i < u ? -1 : u < i ? 1 : 0
    }, c.prototype.includes = function(t, e, r) {
        return -1 !== this.indexOf(t, e, r)
    }, c.prototype.indexOf = function(t, e, r) {
        return m(this, t, e, r, !0)
    }, c.prototype.lastIndexOf = function(t, e, r) {
        return m(this, t, e, r, !1)
    }, c.prototype.write = function(t, e, r, n) {
        if (void 0 === e) n = "utf8", r = this.length, e = 0;
        else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
        else if (isFinite(e)) e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
        else throw Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        var o, i, u, s, f, a, c, h, p = this.length - e;
        if ((void 0 === r || r > p) && (r = p), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw RangeError("Attempt to write outside buffer bounds");
        n || (n = "utf8");
        for (var l = !1;;) switch (n) {
            case "hex":
                return function(t, e, r, n) {
                    r = Number(r) || 0;
                    var o = t.length - r;
                    n ? (n = Number(n)) > o && (n = o) : n = o;
                    var i = e.length;
                    n > i / 2 && (n = i / 2);
                    for (var u = 0; u < n; ++u) {
                        var s = parseInt(e.substr(2 * u, 2), 16);
                        if (s != s) break;
                        t[r + u] = s
                    }
                    return u
                }(this, t, e, r);
            case "utf8":
            case "utf-8":
                return o = e, i = r, U(k(t, this.length - o), this, o, i);
            case "ascii":
            case "latin1":
            case "binary":
                return u = e, s = r, U(function(t) {
                    for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                    return e
                }(t), this, u, s);
            case "base64":
                return f = e, a = r, U(P(t), this, f, a);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
                return c = e, h = r, U(function(t, e) {
                    for (var r, n, o = [], i = 0; i < t.length && !((e -= 2) < 0); ++i) n = (r = t.charCodeAt(i)) >> 8, o.push(r % 256), o.push(n);
                    return o
                }(t, this.length - c), this, c, h);
            default:
                if (l) throw TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), l = !0
        }
    }, c.prototype.toJSON = function() {
        return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
        }
    }, c.prototype.slice = function(t, e) {
        var r = this.length;
        t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
        var n = this.subarray(t, e);
        return Object.setPrototypeOf(n, c.prototype), n
    }, c.prototype.readUintLE = c.prototype.readUIntLE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || I(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;
        return n
    }, c.prototype.readUintBE = c.prototype.readUIntBE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || I(t, e, this.length);
        for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);) n += this[t + --e] * o;
        return n
    }, c.prototype.readUint8 = c.prototype.readUInt8 = function(t, e) {
        return t >>>= 0, e || I(t, 1, this.length), this[t]
    }, c.prototype.readUint16LE = c.prototype.readUInt16LE = function(t, e) {
        return t >>>= 0, e || I(t, 2, this.length), this[t] | this[t + 1] << 8
    }, c.prototype.readUint16BE = c.prototype.readUInt16BE = function(t, e) {
        return t >>>= 0, e || I(t, 2, this.length), this[t] << 8 | this[t + 1]
    }, c.prototype.readUint32LE = c.prototype.readUInt32LE = function(t, e) {
        return t >>>= 0, e || I(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 0x1000000 * this[t + 3]
    }, c.prototype.readUint32BE = c.prototype.readUInt32BE = function(t, e) {
        return t >>>= 0, e || I(t, 4, this.length), 0x1000000 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
    }, c.prototype.readIntLE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || I(t, e, this.length);
        for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;
        return n >= (o *= 128) && (n -= Math.pow(2, 8 * e)), n
    }, c.prototype.readIntBE = function(t, e, r) {
        t >>>= 0, e >>>= 0, r || I(t, e, this.length);
        for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);) i += this[t + --n] * o;
        return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i
    }, c.prototype.readInt8 = function(t, e) {
        return (t >>>= 0, e || I(t, 1, this.length), 128 & this[t]) ? -((255 - this[t] + 1) * 1) : this[t]
    }, c.prototype.readInt16LE = function(t, e) {
        t >>>= 0, e || I(t, 2, this.length);
        var r = this[t] | this[t + 1] << 8;
        return 32768 & r ? 0xffff0000 | r : r
    }, c.prototype.readInt16BE = function(t, e) {
        t >>>= 0, e || I(t, 2, this.length);
        var r = this[t + 1] | this[t] << 8;
        return 32768 & r ? 0xffff0000 | r : r
    }, c.prototype.readInt32LE = function(t, e) {
        return t >>>= 0, e || I(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
    }, c.prototype.readInt32BE = function(t, e) {
        return t >>>= 0, e || I(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
    }, c.prototype.readFloatLE = function(t, e) {
        return t >>>= 0, e || I(t, 4, this.length), s.read(this, t, !0, 23, 4)
    }, c.prototype.readFloatBE = function(t, e) {
        return t >>>= 0, e || I(t, 4, this.length), s.read(this, t, !1, 23, 4)
    }, c.prototype.readDoubleLE = function(t, e) {
        return t >>>= 0, e || I(t, 8, this.length), s.read(this, t, !0, 52, 8)
    }, c.prototype.readDoubleBE = function(t, e) {
        return t >>>= 0, e || I(t, 8, this.length), s.read(this, t, !1, 52, 8)
    }, c.prototype.writeUintLE = c.prototype.writeUIntLE = function(t, e, r, n) {
        if (t = +t, e >>>= 0, r >>>= 0, !n) {
            var o = Math.pow(2, 8 * r) - 1;
            x(this, t, e, r, o, 0)
        }
        var i = 1,
            u = 0;
        for (this[e] = 255 & t; ++u < r && (i *= 256);) this[e + u] = t / i & 255;
        return e + r
    }, c.prototype.writeUintBE = c.prototype.writeUIntBE = function(t, e, r, n) {
        if (t = +t, e >>>= 0, r >>>= 0, !n) {
            var o = Math.pow(2, 8 * r) - 1;
            x(this, t, e, r, o, 0)
        }
        var i = r - 1,
            u = 1;
        for (this[e + i] = 255 & t; --i >= 0 && (u *= 256);) this[e + i] = t / u & 255;
        return e + r
    }, c.prototype.writeUint8 = c.prototype.writeUInt8 = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
    }, c.prototype.writeUint16LE = c.prototype.writeUInt16LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
    }, c.prototype.writeUint16BE = c.prototype.writeUInt16BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
    }, c.prototype.writeUint32LE = c.prototype.writeUInt32LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 4, 0xffffffff, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
    }, c.prototype.writeUint32BE = c.prototype.writeUInt32BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 4, 0xffffffff, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
    }, c.prototype.writeIntLE = function(t, e, r, n) {
        if (t = +t, e >>>= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            x(this, t, e, r, o - 1, -o)
        }
        var i = 0,
            u = 1,
            s = 0;
        for (this[e] = 255 & t; ++i < r && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + i - 1] && (s = 1), this[e + i] = (t / u >> 0) - s & 255;
        return e + r
    }, c.prototype.writeIntBE = function(t, e, r, n) {
        if (t = +t, e >>>= 0, !n) {
            var o = Math.pow(2, 8 * r - 1);
            x(this, t, e, r, o - 1, -o)
        }
        var i = r - 1,
            u = 1,
            s = 0;
        for (this[e + i] = 255 & t; --i >= 0 && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + i + 1] && (s = 1), this[e + i] = (t / u >> 0) - s & 255;
        return e + r
    }, c.prototype.writeInt8 = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
    }, c.prototype.writeInt16LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
    }, c.prototype.writeInt16BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
    }, c.prototype.writeInt32LE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 4, 0x7fffffff, -0x80000000), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
    }, c.prototype.writeInt32BE = function(t, e, r) {
        return t = +t, e >>>= 0, r || x(this, t, e, 4, 0x7fffffff, -0x80000000), t < 0 && (t = 0xffffffff + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
    }, c.prototype.writeFloatLE = function(t, e, r) {
        return O(this, t, e, !0, r)
    }, c.prototype.writeFloatBE = function(t, e, r) {
        return O(this, t, e, !1, r)
    }, c.prototype.writeDoubleLE = function(t, e, r) {
        return _(this, t, e, !0, r)
    }, c.prototype.writeDoubleBE = function(t, e, r) {
        return _(this, t, e, !1, r)
    }, c.prototype.copy = function(t, e, r, n) {
        if (!c.isBuffer(t)) throw TypeError("argument should be a Buffer");
        if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r || 0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw RangeError("targetStart out of bounds");
        if (r < 0 || r >= this.length) throw RangeError("Index out of range");
        if (n < 0) throw RangeError("sourceEnd out of bounds");
        n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
        var o = n - r;
        return this === t && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(e, r, n) : Uint8Array.prototype.set.call(t, this.subarray(r, n), e), o
    }, c.prototype.fill = function(t, e, r, n) {
        if ("string" == typeof t) {
            if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw TypeError("encoding must be a string");
            if ("string" == typeof n && !c.isEncoding(n)) throw TypeError("Unknown encoding: " + n);
            if (1 === t.length) {
                var o, i = t.charCodeAt(0);
                ("utf8" === n && i < 128 || "latin1" === n) && (t = i)
            }
        } else "number" == typeof t ? t &= 255 : "boolean" == typeof t && (t = Number(t));
        if (e < 0 || this.length < e || this.length < r) throw RangeError("Out of range index");
        if (r <= e) return this;
        if (e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0), "number" == typeof t)
            for (o = e; o < r; ++o) this[o] = t;
        else {
            var u = c.isBuffer(t) ? t : c.from(t, n),
                s = u.length;
            if (0 === s) throw TypeError('The value "' + t + '" is invalid for argument "value"');
            for (o = 0; o < r - e; ++o) this[o + e] = u[o % s]
        }
        return this
    };
    var S = /[^+/0-9A-Za-z-_]/g;

    function k(t, e) {
        e = e || 1 / 0;
        for (var r, n = t.length, o = null, i = [], u = 0; u < n; ++u) {
            if ((r = t.charCodeAt(u)) > 55295 && r < 57344) {
                if (!o) {
                    if (r > 56319 || u + 1 === n) {
                        (e -= 3) > -1 && i.push(239, 191, 189);
                        continue
                    }
                    o = r;
                    continue
                }
                if (r < 56320) {
                    (e -= 3) > -1 && i.push(239, 191, 189), o = r;
                    continue
                }
                r = (o - 55296 << 10 | r - 56320) + 65536
            } else o && (e -= 3) > -1 && i.push(239, 191, 189);
            if (o = null, r < 128) {
                if ((e -= 1) < 0) break;
                i.push(r)
            } else if (r < 2048) {
                if ((e -= 2) < 0) break;
                i.push(r >> 6 | 192, 63 & r | 128)
            } else if (r < 65536) {
                if ((e -= 3) < 0) break;
                i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
            } else if (r < 1114112) {
                if ((e -= 4) < 0) break;
                i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
            } else throw Error("Invalid code point")
        }
        return i
    }

    function P(t) {
        return u.toByteArray(function(t) {
            if ((t = (t = t.split("=")[0]).trim().replace(S, "")).length < 2) return "";
            for (; t.length % 4 != 0;) t += "=";
            return t
        }(t))
    }

    function U(t, e, r, n) {
        for (var o = 0; o < n && !(o + r >= e.length) && !(o >= t.length); ++o) e[o + r] = t[o];
        return o
    }

    function B(t, e) {
        return t instanceof e || null != t && null != t.constructor && null != t.constructor.name && t.constructor.name === e.name
    }
    var R = function() {
        for (var t = "0123456789abcdef", e = Array(256), r = 0; r < 16; ++r)
            for (var n = 16 * r, o = 0; o < 16; ++o) e[n + o] = t[r] + t[o];
        return e
    }()
}), i("6WdfO", function(e, r) {
    t(e.exports, "toByteArray", function() {
        return n
    }, function(t) {
        return n = t
    }), t(e.exports, "fromByteArray", function() {
        return o
    }, function(t) {
        return o = t
    }), n = function(t) {
        var e, r, n = function(t) {
                var e = t.length;
                if (e % 4 > 0) throw Error("Invalid string. Length must be a multiple of 4");
                var r = t.indexOf("="); - 1 === r && (r = e);
                var n = r === e ? 0 : 4 - r % 4;
                return [r, n]
            }(t),
            o = n[0],
            i = n[1],
            f = new s((o + i) * 3 / 4 - i),
            a = 0,
            c = i > 0 ? o - 4 : o;
        for (r = 0; r < c; r += 4) e = u[t.charCodeAt(r)] << 18 | u[t.charCodeAt(r + 1)] << 12 | u[t.charCodeAt(r + 2)] << 6 | u[t.charCodeAt(r + 3)], f[a++] = e >> 16 & 255, f[a++] = e >> 8 & 255, f[a++] = 255 & e;
        return 2 === i && (e = u[t.charCodeAt(r)] << 2 | u[t.charCodeAt(r + 1)] >> 4, f[a++] = 255 & e), 1 === i && (e = u[t.charCodeAt(r)] << 10 | u[t.charCodeAt(r + 1)] << 4 | u[t.charCodeAt(r + 2)] >> 2, f[a++] = e >> 8 & 255, f[a++] = 255 & e), f
    }, o = function(t) {
        for (var e, r = t.length, n = r % 3, o = [], u = 0, s = r - n; u < s; u += 16383) o.push(function(t, e, r) {
            for (var n, o = [], u = e; u < r; u += 3) o.push(i[(n = (t[u] << 16 & 0xff0000) + (t[u + 1] << 8 & 65280) + (255 & t[u + 2])) >> 18 & 63] + i[n >> 12 & 63] + i[n >> 6 & 63] + i[63 & n]);
            return o.join("")
        }(t, u, u + 16383 > s ? s : u + 16383));
        return 1 === n ? o.push(i[(e = t[r - 1]) >> 2] + i[e << 4 & 63] + "==") : 2 === n && o.push(i[(e = (t[r - 2] << 8) + t[r - 1]) >> 10] + i[e >> 4 & 63] + i[e << 2 & 63] + "="), o.join("")
    };
    for (var n, o, i = [], u = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = f.length; a < c; ++a) i[a] = f[a], u[f.charCodeAt(a)] = a;
    u["-".charCodeAt(0)] = 62, u["_".charCodeAt(0)] = 63
}), i("24dbd", function(e, r) {
    var n, o;
    t(e.exports, "read", function() {
        return n
    }, function(t) {
        return n = t
    }), t(e.exports, "write", function() {
        return o
    }, function(t) {
        return o = t
    }), n = function(t, e, r, n, o) {
        var i, u, s = 8 * o - n - 1,
            f = (1 << s) - 1,
            a = f >> 1,
            c = -7,
            h = r ? o - 1 : 0,
            p = r ? -1 : 1,
            l = t[e + h];
        for (h += p, i = l & (1 << -c) - 1, l >>= -c, c += s; c > 0; i = 256 * i + t[e + h], h += p, c -= 8);
        for (u = i & (1 << -c) - 1, i >>= -c, c += n; c > 0; u = 256 * u + t[e + h], h += p, c -= 8);
        if (0 === i) i = 1 - a;
        else {
            if (i === f) return u ? NaN : 1 / 0 * (l ? -1 : 1);
            u += Math.pow(2, n), i -= a
        }
        return (l ? -1 : 1) * u * Math.pow(2, i - n)
    }, o = function(t, e, r, n, o, i) {
        var u, s, f, a = 8 * i - o - 1,
            c = (1 << a) - 1,
            h = c >> 1,
            p = 23 === o ? 5960464477539062e-23 : 0,
            l = n ? 0 : i - 1,
            y = n ? 1 : -1,
            d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (isNaN(e = Math.abs(e)) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, u = c) : (u = Math.floor(Math.log(e) / Math.LN2), e * (f = Math.pow(2, -u)) < 1 && (u--, f *= 2), u + h >= 1 ? e += p / f : e += p * Math.pow(2, 1 - h), e * f >= 2 && (u++, f /= 2), u + h >= c ? (s = 0, u = c) : u + h >= 1 ? (s = (e * f - 1) * Math.pow(2, o), u += h) : (s = e * Math.pow(2, h - 1) * Math.pow(2, o), u = 0)); o >= 8; t[r + l] = 255 & s, l += y, s /= 256, o -= 8);
        for (u = u << o | s, a += o; a > 0; t[r + l] = 255 & u, l += y, u /= 256, a -= 8);
        t[r + l - y] |= 128 * d
    }
}), i("5Mjji", function(t, e) {
    var r = o("4lZp4").Buffer;
    Object.defineProperty(t.exports, "__esModule", {
        value: !0
    }), t.exports.default = function(t) {
        var e = t.length,
            n = e % 4;
        if (!n) return t;
        var o = e,
            i = 4 - n,
            u = e + i,
            s = r.alloc(u);
        for (s.write(t); i--;) s.write("=", o++);
        return s.toString()
    }
}), i("1Newx", function(e, r) {
    t(e.exports, "isDefinedUnknownObject", function() {
        return n
    }), t(e.exports, "isDefinedObject", function() {
        return o
    });
    var n = function(t) {
            return "object" == typeof t && null !== t
        },
        o = function(t) {
            return n(t)
        }
}), i("6WVAc", function(e, r) {
    t(e.exports, "refreshGuestSession", function() {
        return u
    }), t(e.exports, "logoutGuest", function() {
        return s
    }), t(e.exports, "postLogoutSuccessMessage", function() {
        return c
    }), t(e.exports, "postLogoutFailureMessage", function() {
        return h
    }), t(e.exports, "postLoginMessage", function() {
        return p
    });
    var n = o("cT75T");
    let i = () => {
            var t, e, r, o;
            return t = void 0, e = void 0, r = void 0, o = function*() {
                let t = yield(0, n.AccountManager).current.getGuestAsync(!1);
                if (t) {
                    f(t);
                    return
                }
                a()
            }, new(r || (r = Promise))(function(n, i) {
                function u(t) {
                    try {
                        f(o.next(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function s(t) {
                    try {
                        f(o.throw(t))
                    } catch (t) {
                        i(t)
                    }
                }

                function f(t) {
                    var e;
                    t.done ? n(t.value) : ((e = t.value) instanceof r ? e : new r(function(t) {
                        t(e)
                    })).then(u, s)
                }
                f((o = o.apply(t, e || [])).next())
            })
        },
        u = () => {
            try {
                i()
            } catch (t) {
                throw a(), t
            }
        },
        s = () => {
            try {
                (0, n.AccountManager).current.logOut(), c()
            } catch (t) {
                throw h(), t
            }
        },
        f = t => {
            let e = {
                type: "refresh-success",
                message: t.idToken
            };
            window.parent.postMessage(e, "*")
        },
        a = () => {
            window.parent.postMessage({
                type: "refresh-failure"
            }, "*")
        },
        c = () => {
            window.parent.postMessage({
                type: "logout-success"
            }, "*")
        },
        h = () => {
            window.parent.postMessage({
                type: "logout-failure"
            }, "*")
        },
        p = t => {
            let e = {
                type: "login-success",
                message: t.idToken
            };
            window.parent.postMessage(e, "*")
        }
});
//# sourceMappingURL=index.d783798d.js.map