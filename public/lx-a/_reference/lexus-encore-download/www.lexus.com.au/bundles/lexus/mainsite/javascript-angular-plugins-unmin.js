(function() {
    "use strict";
    var n = {
            backspace: 8,
            tab: 9,
            enter: 13,
            escape: 27,
            space: 32,
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            "delete": 46,
            comma: 188
        },
        i = 9007199254740991,
        r = ["text", "email", "url"],
        t;
    t = angular.module("ngTagsInput", []);
    t.directive("tagsInput", ["$timeout", "$document", "$window", "$q", "tagsInputConfig", "tiUtil", function(t, u, f, e, o, s) {
        function h(n, t, i, r) {
            var u = {},
                f, o, h, c;
            return f = function(t) {
                return s.safeToString(t[n.displayProperty])
            }, o = function(t, i) {
                t[n.displayProperty] = i
            }, h = function(t) {
                var r = f(t),
                    o = r && r.length >= n.minLength && r.length <= n.maxLength && n.allowedTagsPattern.test(r) && !s.findInObjectArray(u.items, t, n.keyProperty || n.displayProperty);
                return e.when(o && i({
                    $tag: t
                })).then(s.promisifyValue)
            }, c = function(n) {
                return e.when(r({
                    $tag: n
                })).then(s.promisifyValue)
            }, u.items = [], u.addText = function(n) {
                var t = {};
                return o(t, n), u.add(t)
            }, u.add = function(i) {
                var r = f(i);
                return n.replaceSpacesWithDashes && (r = s.replaceSpacesWithDashes(r)), o(i, r), h(i).then(function() {
                    u.items.push(i);
                    t.trigger("tag-added", {
                        $tag: i
                    })
                }).catch(function() {
                    r && t.trigger("invalid-tag", {
                        $tag: i
                    })
                })
            }, u.remove = function(n) {
                var i = u.items[n];
                return c(i).then(function() {
                    return u.items.splice(n, 1), u.clearSelection(), t.trigger("tag-removed", {
                        $tag: i
                    }), i
                })
            }, u.select = function(n) {
                n < 0 ? n = u.items.length - 1 : n >= u.items.length && (n = 0);
                u.index = n;
                u.selected = u.items[n]
            }, u.selectPrior = function() {
                u.select(--u.index)
            }, u.selectNext = function() {
                u.select(++u.index)
            }, u.removeSelected = function() {
                return u.remove(u.index)
            }, u.clearSelection = function() {
                u.selected = null;
                u.index = -1
            }, u.clearSelection(), u
        }

        function c(n) {
            return r.indexOf(n) !== -1
        }
        return {
            restrict: "E",
            require: "ngModel",
            scope: {
                tags: "=ngModel",
                text: "=?",
                templateScope: "=?",
                tagClass: "&",
                onTagAdding: "&",
                onTagAdded: "&",
                onInvalidTag: "&",
                onTagRemoving: "&",
                onTagRemoved: "&",
                onTagClicked: "&"
            },
            replace: !1,
            transclude: !0,
            templateUrl: "ngTagsInput/tags-input.html",
            controller: ["$scope", "$attrs", "$element", function(n, t, r) {
                n.events = s.simplePubSub();
                o.load("tagsInput", n, t, {
                    template: [String, "ngTagsInput/tag-item.html"],
                    type: [String, "text", c],
                    placeholder: [String, "Add a tag"],
                    tabindex: [Number, null],
                    removeTagSymbol: [String, String.fromCharCode(215)],
                    replaceSpacesWithDashes: [Boolean, !0],
                    minLength: [Number, 3],
                    maxLength: [Number, i],
                    addOnEnter: [Boolean, !0],
                    addOnSpace: [Boolean, !1],
                    addOnComma: [Boolean, !0],
                    addOnBlur: [Boolean, !0],
                    addOnPaste: [Boolean, !1],
                    pasteSplitPattern: [RegExp, /,/],
                    allowedTagsPattern: [RegExp, /.+/],
                    enableEditingLastTag: [Boolean, !1],
                    minTags: [Number, 0],
                    maxTags: [Number, i],
                    displayProperty: [String, "text"],
                    keyProperty: [String, ""],
                    allowLeftoverText: [Boolean, !1],
                    addFromAutocompleteOnly: [Boolean, !1],
                    spellcheck: [Boolean, !0],
                    selectOnBackspace: [Boolean, !0]
                });
                n.tagList = new h(n.options, n.events, s.handleUndefinedResult(n.onTagAdding, !0), s.handleUndefinedResult(n.onTagRemoving, !0));
                this.registerAutocomplete = function() {
                    var t = r.find("input");
                    return {
                        addTag: function(t) {
                            return n.tagList.add(t)
                        },
                        getTags: function() {
                            return n.tagList.items
                        },
                        getCurrentTagText: function() {
                            return n.newTag.text()
                        },
                        getOptions: function() {
                            return n.options
                        },
                        getTemplateScope: function() {
                            return n.templateScope
                        },
                        on: function(t, i) {
                            n.events.on(t, i, !0);
                            return this
                        }
                    }
                };
                this.registerTagItem = function() {
                    return {
                        getOptions: function() {
                            return n.options
                        },
                        removeTag: function(t) {
                            n.disabled || n.tagList.remove(t)
                        }
                    }
                }
            }],
            link: function(i, r, e, o) {
                var p = [n.enter, n.comma, n.space, n.backspace, n.delete, n.left, n.right],
                    h = i.tagList,
                    l = i.events,
                    c = i.options,
                    y = r.find("input"),
                    w = ["minTags", "maxTags", "allowLeftoverText"],
                    a, v;
                a = function() {
                    o.$setValidity("maxTags", h.items.length <= c.maxTags);
                    o.$setValidity("minTags", h.items.length >= c.minTags);
                    o.$setValidity("leftoverText", i.hasFocus || c.allowLeftoverText ? !0 : !i.newTag.text())
                };
                v = function() {
                    t(function() {
                        y[0].focus()
                    })
                };
                o.$isEmpty = function(n) {
                    return !n || !n.length
                };
                i.newTag = {
                    text: function(n) {
                        if (angular.isDefined(n)) i.text = n, l.trigger("input-change", n);
                        else return i.text || ""
                    },
                    invalid: null
                };
                i.track = function(n) {
                    return n[c.keyProperty || c.displayProperty]
                };
                i.getTagClass = function(n, t) {
                    var r = n === h.selected;
                    return [i.tagClass({
                        $tag: n,
                        $index: t,
                        $selected: r
                    }), {
                        selected: r
                    }]
                };
                i.$watch("tags", function(n) {
                    n ? (h.items = s.makeObjectArray(n, c.displayProperty), i.tags = h.items) : h.items = []
                });
                i.$watch("tags.length", function() {
                    a();
                    o.$validate()
                });
                e.$observe("disabled", function(n) {
                    i.disabled = n
                });
                i.eventHandlers = {
                    input: {
                        keydown: function(n) {
                            l.trigger("input-keydown", n)
                        },
                        focus: function() {
                            i.hasFocus || (i.hasFocus = !0, l.trigger("input-focus"))
                        },
                        blur: function() {
                            t(function() {
                                var n = u.prop("activeElement"),
                                    t = n === y[0],
                                    f = r[0].contains(n);
                                (t || !f) && (i.hasFocus = !1, l.trigger("input-blur"))
                            })
                        },
                        paste: function(n) {
                            n.getTextData = function() {
                                var t = n.clipboardData || n.originalEvent && n.originalEvent.clipboardData;
                                return t ? t.getData("text/plain") : f.clipboardData.getData("Text")
                            };
                            l.trigger("input-paste", n)
                        }
                    },
                    host: {
                        click: function() {
                            i.disabled || v()
                        }
                    },
                    tag: {
                        click: function(n) {
                            l.trigger("tag-clicked", {
                                $tag: n
                            })
                        }
                    }
                };
                l.on("tag-added", i.onTagAdded).on("invalid-tag", i.onInvalidTag).on("tag-removed", i.onTagRemoved).on("tag-clicked", i.onTagClicked).on("tag-added", function() {
                    i.newTag.text("")
                }).on("tag-added tag-removed", function() {
                    i.tags = h.items;
                    o.$setDirty();
                    v()
                }).on("invalid-tag", function() {
                    i.newTag.invalid = !0
                }).on("option-change", function(n) {
                    w.indexOf(n.name) !== -1 && a()
                }).on("input-change", function() {
                    h.clearSelection();
                    i.newTag.invalid = null
                }).on("input-focus", function() {
                    r.triggerHandler("focus");
                    o.$setValidity("leftoverText", !0)
                }).on("input-blur", function() {
                    c.addOnBlur && !c.addFromAutocompleteOnly && h.addText(i.newTag.text());
                    r.triggerHandler("blur");
                    a()
                }).on("input-keydown", function(t) {
                    var r = t.keyCode,
                        u = {},
                        f, e, o, l;
                    s.isModifierOn(t) || p.indexOf(r) === -1 || (u[n.enter] = c.addOnEnter, u[n.comma] = c.addOnComma, u[n.space] = c.addOnSpace, f = !c.addFromAutocompleteOnly && u[r], e = (r === n.backspace || r === n.delete) && (!c.selectOnBackspace && h.items.length != 0 || h.selected), l = r === n.backspace && i.newTag.text().length === 0 && c.enableEditingLastTag, o = (r === n.backspace || r === n.left || r === n.right) && i.newTag.text().length === 0 && !c.enableEditingLastTag, f ? h.addText(i.newTag.text()) : l ? (h.selectPrior(), h.removeSelected().then(function(n) {
                        n && i.newTag.text(n[c.displayProperty])
                    })) : e ? (c.selectOnBackspace || h.items.length == 0 || h.selectPrior(), h.removeSelected()) : o && (r === n.left || r === n.backspace ? h.selectPrior() : r === n.right && h.selectNext()), (f || o || e || l) && t.preventDefault())
                }).on("input-paste", function(n) {
                    if (c.addOnPaste) {
                        var i = n.getTextData(),
                            t = i.split(c.pasteSplitPattern);
                        t.length > 1 && (t.forEach(function(n) {
                            h.addText(n)
                        }), n.preventDefault())
                    }
                })
            }
        }
    }]);
    t.directive("tiTagItem", ["tiUtil", function(n) {
        return {
            restrict: "E",
            require: "^tagsInput",
            template: '<ng-include src="$$template"><\/ng-include>',
            scope: {
                $scope: "=scope",
                data: "="
            },
            link: function(t, i, r, u) {
                var e = u.registerTagItem(),
                    f = e.getOptions();
                t.$$template = f.template;
                t.$$removeTagSymbol = f.removeTagSymbol;
                t.$getDisplayText = function() {
                    return n.safeToString(t.data[f.displayProperty])
                };
                t.$removeTag = function() {
                    e.removeTag(t.$index)
                };
                t.$watch("$parent.$index", function(n) {
                    t.$index = n
                })
            }
        }
    }]);
    t.directive("autoComplete", ["$document", "$timeout", "$sce", "$q", "tagsInputConfig", "tiUtil", function(t, i, r, u, f, e) {
        function o(n, t, i) {
            var r = {},
                s, f, o;
            return o = function() {
                return t.tagsInput.keyProperty || t.tagsInput.displayProperty
            }, s = function(n, i) {
                return n.filter(function(n) {
                    return !e.findInObjectArray(i, n, o(), function(n, i) {
                        return t.tagsInput.replaceSpacesWithDashes && (n = e.replaceSpacesWithDashes(n), i = e.replaceSpacesWithDashes(i)), e.defaultComparer(n, i)
                    })
                })
            }, r.reset = function() {
                f = null;
                r.items = [];
                r.visible = !1;
                r.index = -1;
                r.selected = null;
                r.query = null
            }, r.show = function() {
                t.selectFirstMatch ? r.select(0) : r.selected = null;
                r.visible = !0
            }, r.load = e.debounce(function(i, h) {
                r.query = i;
                var c = u.when(n({
                    $query: i
                }));
                f = c;
                c.then(function(n) {
                    c === f && (n = e.makeObjectArray(n.data || n, o()), n = s(n, h), r.items = n.slice(0, t.maxResultsToShow), r.items.length > 0 ? r.show() : r.reset())
                })
            }, t.debounceDelay), r.selectNext = function() {
                r.select(++r.index)
            }, r.selectPrior = function() {
                r.select(--r.index)
            }, r.select = function(n) {
                n < 0 ? n = r.items.length - 1 : n >= r.items.length && (n = 0);
                r.index = n;
                r.selected = r.items[n];
                i.trigger("suggestion-selected", n)
            }, r.reset(), r
        }

        function s(n, t) {
            var u = n.find("li").eq(t),
                i = u.parent(),
                r = u.prop("offsetTop"),
                f = u.prop("offsetHeight"),
                e = i.prop("clientHeight"),
                o = i.prop("scrollTop");
            r < o ? i.prop("scrollTop", r) : r + f > e + o && i.prop("scrollTop", r + f - e)
        }
        return {
            restrict: "E",
            require: "^tagsInput",
            scope: {
                source: "&",
                matchClass: "&"
            },
            templateUrl: "ngTagsInput/auto-complete.html",
            controller: ["$scope", "$element", "$attrs", function(n, t, i) {
                n.events = e.simplePubSub();
                f.load("autoComplete", n, i, {
                    template: [String, "ngTagsInput/auto-complete-match.html"],
                    debounceDelay: [Number, 100],
                    minLength: [Number, 3],
                    highlightMatchedText: [Boolean, !0],
                    maxResultsToShow: [Number, 10],
                    loadOnDownArrow: [Boolean, !1],
                    loadOnEmpty: [Boolean, !1],
                    loadOnFocus: [Boolean, !1],
                    selectFirstMatch: [Boolean, !0],
                    displayProperty: [String, ""]
                });
                n.suggestionList = new o(n.source, n.options, n.events);
                this.registerAutocompleteMatch = function() {
                    return {
                        getOptions: function() {
                            return n.options
                        },
                        getQuery: function() {
                            return n.suggestionList.query
                        }
                    }
                }
            }],
            link: function(t, i, r, u) {
                var l = [n.enter, n.tab, n.escape, n.up, n.down],
                    f = t.suggestionList,
                    o = u.registerAutocomplete(),
                    h = t.options,
                    a = t.events,
                    c;
                h.tagsInput = o.getOptions();
                c = function(n) {
                    return n && n.length >= h.minLength || !n && h.loadOnEmpty
                };
                t.templateScope = o.getTemplateScope();
                t.addSuggestionByIndex = function(n) {
                    f.select(n);
                    t.addSuggestion()
                };
                t.addSuggestion = function() {
                    var n = !1;
                    return f.selected && (o.addTag(angular.copy(f.selected)), f.reset(), n = !0), n
                };
                t.track = function(n) {
                    return n[h.tagsInput.keyProperty || h.tagsInput.displayProperty]
                };
                t.getSuggestionClass = function(n, i) {
                    var r = n === f.selected;
                    return [t.matchClass({
                        $match: n,
                        $index: i,
                        $selected: r
                    }), {
                        selected: r
                    }]
                };
                o.on("tag-added tag-removed invalid-tag input-blur", function() {
                    f.reset()
                }).on("input-change", function(n) {
                    c(n) ? f.load(n, o.getTags()) : f.reset()
                }).on("input-focus", function() {
                    var n = o.getCurrentTagText();
                    h.loadOnFocus && c(n) && f.load(n, o.getTags())
                }).on("input-keydown", function(i) {
                    var r = i.keyCode,
                        u = !1;
                    if (!e.isModifierOn(i) && l.indexOf(r) !== -1) return f.visible ? r === n.down ? (f.selectNext(), u = !0) : r === n.up ? (f.selectPrior(), u = !0) : r === n.escape ? (f.reset(), u = !0) : (r === n.enter || r === n.tab) && (u = t.addSuggestion()) : r === n.down && t.options.loadOnDownArrow && (f.load(o.getCurrentTagText(), o.getTags()), u = !0), u ? (i.preventDefault(), i.stopImmediatePropagation(), !1) : void 0
                });
                a.on("suggestion-selected", function(n) {
                    s(i, n)
                })
            }
        }
    }]);
    t.directive("tiAutocompleteMatch", ["$sce", "tiUtil", function(n, t) {
        return {
            restrict: "E",
            require: "^autoComplete",
            template: '<ng-include src="$$template"><\/ng-include>',
            scope: {
                $scope: "=scope",
                data: "="
            },
            link: function(i, r, u, f) {
                var o = f.registerAutocompleteMatch(),
                    e = o.getOptions();
                i.$$template = e.template;
                i.$index = i.$parent.$index;
                i.$highlight = function(i) {
                    return e.highlightMatchedText && (i = t.safeHighlight(i, o.getQuery())), n.trustAsHtml(i)
                };
                i.$getDisplayText = function() {
                    return t.safeToString(i.data[e.displayProperty || e.tagsInput.displayProperty])
                }
            }
        }
    }]);
    t.directive("tiTranscludeAppend", function() {
        return function(n, t, i, r, u) {
            u(function(n) {
                t.append(n)
            })
        }
    });
    t.directive("tiAutosize", ["tagsInputConfig", function(n) {
        return {
            restrict: "A",
            require: "ngModel",
            link: function(t, i, r, u) {
                var o = n.getTextAutosizeThreshold(),
                    f, e;
                f = angular.element('<span class="input"><\/span>');
                f.css("display", "none").css("visibility", "hidden").css("width", "auto").css("white-space", "pre");
                i.parent().append(f);
                e = function(n) {
                    var t = n,
                        u;
                    return angular.isString(t) && t.length === 0 && (t = r.placeholder), t && (f.text(t), f.css("display", ""), u = f.prop("offsetWidth"), f.css("display", "none")), i.css("width", u ? u + o + "px" : ""), n
                };
                u.$parsers.unshift(e);
                u.$formatters.unshift(e);
                r.$observe("placeholder", function(n) {
                    u.$modelValue || e(n)
                })
            }
        }
    }]);
    t.directive("tiBindAttrs", function() {
        return function(n, t, i) {
            n.$watch(i.tiBindAttrs, function(n) {
                angular.forEach(n, function(n, t) {
                    i.$set(t, n)
                })
            }, !0)
        }
    });
    t.provider("tagsInputConfig", function() {
        var n = {},
            t = {},
            i = 3;
        this.setDefaults = function(t, i) {
            return n[t] = i, this
        };
        this.setActiveInterpolation = function(n, i) {
            return t[n] = i, this
        };
        this.setTextAutosizeThreshold = function(n) {
            return i = n, this
        };
        this.$get = ["$interpolate", function(r) {
            var u = {};
            return u[String] = function(n) {
                return n
            }, u[Number] = function(n) {
                return parseInt(n, 10)
            }, u[Boolean] = function(n) {
                return n.toLowerCase() === "true"
            }, u[RegExp] = function(n) {
                return new RegExp(n)
            }, {
                load: function(i, f, e, o) {
                    var s = function() {
                        return !0
                    };
                    f.options = {};
                    angular.forEach(o, function(o, h) {
                        var l, a, v, y, p, c;
                        l = o[0];
                        a = o[1];
                        v = o[2] || s;
                        y = u[l];
                        p = function() {
                            var t = n[i] && n[i][h];
                            return angular.isDefined(t) ? t : a
                        };
                        c = function(n) {
                            f.options[h] = n && v(n) ? y(n) : p()
                        };
                        t[i] && t[i][h] ? e.$observe(h, function(n) {
                            c(n);
                            f.events.trigger("option-change", {
                                name: h,
                                newValue: n
                            })
                        }) : c(e[h] && r(e[h])(f.$parent))
                    })
                },
                getTextAutosizeThreshold: function() {
                    return i
                }
            }
        }]
    });
    t.factory("tiUtil", ["$timeout", "$q", function(n, t) {
        var i = {};
        return i.debounce = function(t, i) {
            var r;
            return function() {
                var u = arguments;
                n.cancel(r);
                r = n(function() {
                    t.apply(null, u)
                }, i)
            }
        }, i.makeObjectArray = function(n, t) {
            if (!angular.isArray(n) || n.length === 0 || angular.isObject(n[0])) return n;
            var i = [];
            return n.forEach(function(n) {
                var r = {};
                r[t] = n;
                i.push(r)
            }), i
        }, i.findInObjectArray = function(n, t, r, u) {
            var f = null;
            return u = u || i.defaultComparer, n.some(function(n) {
                if (u(n[r], t[r])) return f = n, !0
            }), f
        }, i.defaultComparer = function(n, t) {
            return i.safeToString(n).toLowerCase() === i.safeToString(t).toLowerCase()
        }, i.safeHighlight = function(n, t) {
            function r(n) {
                return n.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1")
            }
            if (n = i.encodeHTML(n), t = i.encodeHTML(t), !t) return n;
            var u = new RegExp("&[^;]+;|" + r(t), "gi");
            return n.replace(u, function(n) {
                return n.toLowerCase() === t.toLowerCase() ? "<em>" + n + "<\/em>" : n
            })
        }, i.safeToString = function(n) {
            return angular.isUndefined(n) || n == null ? "" : n.toString().trim()
        }, i.encodeHTML = function(n) {
            return i.safeToString(n).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }, i.handleUndefinedResult = function(n, t) {
            return function() {
                var i = n.apply(null, arguments);
                return angular.isUndefined(i) ? t : i
            }
        }, i.replaceSpacesWithDashes = function(n) {
            return i.safeToString(n).replace(/\s/g, "-")
        }, i.isModifierOn = function(n) {
            return n.shiftKey || n.ctrlKey || n.altKey || n.metaKey
        }, i.promisifyValue = function(n) {
            return n = angular.isUndefined(n) ? !0 : n, t[n ? "when" : "reject"]()
        }, i.simplePubSub = function() {
            var n = {};
            return {
                on: function(t, i, r) {
                    return t.split(" ").forEach(function(t) {
                        n[t] || (n[t] = []);
                        var u = r ? [].unshift : [].push;
                        u.call(n[t], i)
                    }), this
                },
                trigger: function(t, r) {
                    var u = n[t] || [];
                    return u.every(function(n) {
                        return i.handleUndefinedResult(n, !0)(r)
                    }), this
                }
            }
        }, i
    }]);
    t.run(["$templateCache", function(n) {
        n.put("ngTagsInput/tags-input.html", '<div class="host" tabindex="-1" ng-click="eventHandlers.host.click()" ti-transclude-append><div class="tags" ng-class="{focused: hasFocus}"><ul class="tag-list"><li class="tag-item" ng-repeat="tag in tagList.items track by track(tag)" ng-class="getTagClass(tag, $index)" ng-click="eventHandlers.tag.click(tag)"><ti-tag-item scope="templateScope" data="::tag"><\/ti-tag-item><\/li><\/ul><input class="input" autocomplete="off" ng-model="newTag.text" ng-model-options="{getterSetter: true}" ng-keydown="eventHandlers.input.keydown($event)" ng-focus="eventHandlers.input.focus($event)" ng-blur="eventHandlers.input.blur($event)" ng-paste="eventHandlers.input.paste($event)" ng-trim="false" ng-class="{\'invalid-tag\': newTag.invalid}" ng-disabled="disabled" ti-bind-attrs="{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}" ti-autosize><\/div><\/div>');
        n.put("ngTagsInput/tag-item.html", '<span ng-bind="$getDisplayText()"><\/span> <a class="remove-button" ng-click="$removeTag()" ng-bind="::$$removeTagSymbol"><\/a>');
        n.put("ngTagsInput/auto-complete.html", '<div class="autocomplete" ng-if="suggestionList.visible"><ul class="suggestion-list"><li class="suggestion-item" ng-repeat="item in suggestionList.items track by track(item)" ng-class="getSuggestionClass(item, $index)" ng-click="addSuggestionByIndex($index)" ng-mouseenter="suggestionList.select($index)"><ti-autocomplete-match scope="templateScope" data="::item"><\/ti-autocomplete-match><\/li><\/ul><\/div>');
        n.put("ngTagsInput/auto-complete-match.html", '<span ng-bind-html="$highlight($getDisplayText())"><\/span>')
    }])
})();
angular.module("ng-directives-utils.transcludeReplace", []).directive("ngTranscludeReplace", ["$log", function(n) {
        return {
            terminal: !0,
            restrict: "EA",
            link: function(t, i, r, u, f) {
                if (!f) {
                    n.error("orphan", "Illegal use of lgTranscludeReplace directive in the template! No parent directive that requires a transclusion found. ");
                    return
                }
                f(function(n) {
                    n.length ? i.replaceWith(n) : i.remove()
                })
            }
        }
    }]),
    function(n) {
        "use strict";
        n.module("angulartics.debug", ["angulartics"]).config(["$analyticsProvider", function(n) {
            n.registerPageTrack(function(n) {
                console.log("Page tracking: ", n)
            });
            n.registerEventTrack(function(n, t) {
                console.log("Event tracking: ", n, t)
            })
        }])
    }(angular)