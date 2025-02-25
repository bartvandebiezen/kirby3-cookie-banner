(() => {
    function e(e) {
        return e && e.__esModule ? e.default : e
    }
    var t = {};
    function o(e) {
        return document.querySelector(e)
    }
    !function(e) {
        var o;
        if ("function" == typeof define && define.amd && (define(e), o = !0), "object" == typeof t && (t = e(), o = !0), !o) {
            var i = window.Cookies,
                n = window.Cookies = e();
            n.noConflict = function() {
                return window.Cookies = i, n
            }
        }
    }((function() {
        function e() {
            for (var e = 0, t = {}; e < arguments.length; e++) {
                var o = arguments[e];
                for (var i in o)
                    t[i] = o[i]
            }
            return t
        }
        function t(e) {
            return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
        }
        return function o(i) {
            function n() {}
            function s(t, o, s) {
                if ("undefined" != typeof document) {
                    "number" == typeof (s = e({
                        path: "/"
                    }, n.defaults, s)).expires && (s.expires = new Date(1 * new Date + 864e5 * s.expires)),
                    s.expires = s.expires ? s.expires.toUTCString() : "";
                    try {
                        var r = JSON.stringify(o);
                        /^[\{\[]/.test(r) && (o = r)
                    } catch (e) {}
                    o = i.write ? i.write(o, t) : encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    t = encodeURIComponent(String(t)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                    var a = "";
                    for (var c in s)
                        s[c] && (a += "; " + c, !0 !== s[c] && (a += "=" + s[c].split(";")[0]));
                    return document.cookie = t + "=" + o + a
                }
            }
            function r(e, o) {
                if ("undefined" != typeof document) {
                    for (var n = {}, s = document.cookie ? document.cookie.split("; ") : [], r = 0; r < s.length; r++) {
                        var a = s[r].split("="),
                            c = a.slice(1).join("=");
                        o || '"' !== c.charAt(0) || (c = c.slice(1, -1));
                        try {
                            var d = t(a[0]);
                            if (c = (i.read || i)(c, d) || t(c), o)
                                try {
                                    c = JSON.parse(c)
                                } catch (e) {}
                            if (n[d] = c, e === d)
                                break
                        } catch (e) {}
                    }
                    return e ? n[e] : n
                }
            }
            return n.set = s, n.get = function(e) {
                return r(e, !1)
            }, n.getJSON = function(e) {
                return r(e, !0)
            }, n.remove = function(t, o) {
                s(t, "", e(o, {
                    expires: -1
                }))
            }, n.defaults = {}, n.withConverter = o, n
        }((function() {}))
    }));
    class i {
        constructor()
        {
            var e;
            this.$COOKIE_BANNER = o("#cookie-banner"),
            this.$OPTIONS = o("#cookie-options"),
            this.$FEATURES = (e = ".cookie-banner__checkbox", document.querySelectorAll(e)),
            this.$ACKNOWLEDGE_BUTTON = o("#cookie-acknowledge"),
            this.$ACCEPT_BUTTON = o("#cookie-accept"),
            this.$DENY_BUTTON = o("#cookie-deny"),
            this.$SAVE_BUTTON = o("#cookie-save"),
            this.BANNER_OPEN = !1,
            this.MINUMUM_FEATURES = ["essential"],
            this.MAXIMUM_FEATURES = [],
            this.CUSTOM_FEATURES = [],
            this.SHOW_ON_FIRST = "true" === this.$COOKIE_BANNER.dataset.showOnFirst,
            this.initCookieBanner().then((e => this.registerHooks()))
        }
        initCookieBanner()
        {
            const e = this;
            return new Promise((t => {
                e.loadMaximumFeatures(),
                e.loadCustomFeatures(),
                0 === e.CUSTOM_FEATURES.length && this.SHOW_ON_FIRST && e.openCookieBanner(),
                t()
            }))
        }
        registerHooks()
        {
            const e = this;
            Array.prototype.forEach.call(e.$FEATURES, (t => {
                t.addEventListener("change", (t => e.updateCustomFeatures()))
            })),
            e.$ACKNOWLEDGE_BUTTON.addEventListener("click", (t => e.save(e.MAXIMUM_FEATURES))),
            e.$ACCEPT_BUTTON.addEventListener("click", (t => e.save(e.MAXIMUM_FEATURES))),
            e.$DENY_BUTTON.addEventListener("click", (t => e.save(e.MINUMUM_FEATURES))),
            e.$SAVE_BUTTON.addEventListener("click", (t => e.save(e.CUSTOM_FEATURES))),
            o("body").addEventListener("cookies:update", (t => {
                e.loadCustomFeatures(),
                e.openCookieBanner()
            }))
        }
        loadMaximumFeatures()
        {
            const e = this;
            Array.prototype.forEach.call(e.$FEATURES, (t => {
                const o = t.dataset.cookieId.toLowerCase();
                e.MAXIMUM_FEATURES.push(o)
            }))
        }
        loadCustomFeatures()
        {
            const o = this;
            if (e(t).get("cookie_status")) {
                o.CUSTOM_FEATURES = e(t).get("cookie_status").split(",");
                const i = Array.prototype.filter.call(o.$FEATURES, (e => {
                    const t = e.dataset.cookieId.toLowerCase();
                    return o.CUSTOM_FEATURES.indexOf(t) > -1
                }));
                Array.prototype.forEach.call(i, (e => {
                    e.setAttribute("checked", !0)
                })),
                o.updateButtons()
            }
        }
        updateCustomFeatures()
        {
            const e = this;
            e.CUSTOM_FEATURES = [];
            const t = Array.prototype.filter.call(e.$FEATURES, (e => e.checked));
            Array.prototype.forEach.call(t, (t => {
                const o = t.dataset.cookieId.toLowerCase();
                e.CUSTOM_FEATURES.push(o)
            })),
            e.updateButtons()
        }
        save(e)
        {
            const t = this;
            event.preventDefault(),
            function(e, t={}) {
                let o = null;
                window.CustomEvent && "function" == typeof window.CustomEvent ? o = new CustomEvent(e, {
                    detail: t
                }) : (o = document.createEvent("CustomEvent"), o.initCustomEvent(e, !0, !0, t)),
                document.querySelector("body").dispatchEvent(o)
            }("cookies:saved", e),
            t.setCookie(e),
            t.CUSTOM_FEATURES = e,
            t.closeCookieBanner()
        }
        updateButtons()
        {
            let e = this;
            e.MAXIMUM_FEATURES.length == 1 ? (
              e.$ACKNOWLEDGE_BUTTON.classList.remove("is-hidden"),
              e.$ACCEPT_BUTTON.classList.add("is-hidden"),
              e.$DENY_BUTTON.classList.add("is-hidden"),
              e.$SAVE_BUTTON.classList.add("is-hidden"),
              e.$OPTIONS.classList.add("is-hidden")
            ) : e.CUSTOM_FEATURES.length > 1 ? (
              e.$ACKNOWLEDGE_BUTTON.classList.add("is-hidden"),
              e.$ACCEPT_BUTTON.classList.add("is-hidden"),
              e.$DENY_BUTTON.classList.add("is-hidden"),
              e.$SAVE_BUTTON.classList.remove("is-hidden")
            ) : (
              e.$ACKNOWLEDGE_BUTTON.classList.add("is-hidden"),
              e.$ACCEPT_BUTTON.classList.remove("is-hidden"),
              e.$DENY_BUTTON.classList.remove("is-hidden"),
              e.$SAVE_BUTTON.classList.add("is-hidden")
            )
        }
        setCookie(o)
        {
            e(t).set("cookie_status", o.join(","), {
                expires: 365,
                sameSite: "lax"
            })
        }
        closeCookieBanner()
        {
            this.$COOKIE_BANNER.classList.add("is-hidden"),
            this.BANNER_OPEN = !1
        }
        openCookieBanner()
        {
            this.$COOKIE_BANNER.classList.remove("is-hidden"),
            this.BANNER_OPEN = !0,
            this.updateButtons()
        }
    }
    document.addEventListener("DOMContentLoaded", (e => new i))
})();
