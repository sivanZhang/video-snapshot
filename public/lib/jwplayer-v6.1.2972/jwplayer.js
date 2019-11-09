if(typeof jwplayer == "undefined") {
	jwplayer = function(a) {
		if(jwplayer.api) {
			return jwplayer.api.selectPlayer(a)
		}
	};
	jwplayer.version = "6.1.2972";
	jwplayer.vid = document.createElement("video");
	jwplayer.audio = document.createElement("audio");
	jwplayer.source = document.createElement("source");
	(function(d) {
		var j = document,
			g = window,
			b = navigator,
			h = "undefined",
			f = "string",
			c = "object";
		var k = d.utils = function() {};
		k.exists = function(m) {
			switch(typeof(m)) {
				case f:
					return(m.length > 0);
					break;
				case c:
					return(m !== null);
				case h:
					return false
			}
			return true
		};
		k.styleDimension = function(m) {
			return m + (m.toString().indexOf("%") > 0 ? "" : "px")
		};
		k.getAbsolutePath = function(s, r) {
			if(!k.exists(r)) {
				r = j.location.href
			}
			if(!k.exists(s)) {
				return undefined
			}
			if(a(s)) {
				return s
			}
			var t = r.substring(0, r.indexOf("://") + 3);
			var q = r.substring(t.length, r.indexOf("/", t.length + 1));
			var n;
			if(s.indexOf("/") === 0) {
				n = s.split("/")
			} else {
				var o = r.split("?")[0];
				o = o.substring(t.length + q.length + 1, o.lastIndexOf("/"));
				n = o.split("/").concat(s.split("/"))
			}
			var m = [];
			for(var p = 0; p < n.length; p++) {
				if(!n[p] || !k.exists(n[p]) || n[p] == ".") {
					continue
				} else {
					if(n[p] == "..") {
						m.pop()
					} else {
						m.push(n[p])
					}
				}
			}
			return t + q + "/" + m.join("/")
		};

		function a(n) {
			if(!k.exists(n)) {
				return
			}
			var o = n.indexOf("://");
			var m = n.indexOf("?");
			return(o > 0 && (m < 0 || (m > o)))
		}
		k.extend = function() {
			var m = k.extend["arguments"];
			if(m.length > 1) {
				for(var o = 1; o < m.length; o++) {
					for(var n in m[o]) {
						try {
							if(k.exists(m[o][n])) {
								m[0][n] = m[o][n]
							}
						} catch(p) {}
					}
				}
				return m[0]
			}
			return null
		};
		k.log = function(n, m) {
			if(typeof console != h && typeof console.log != h) {
				if(m) {
					console.log(n, m)
				} else {
					console.log(n)
				}
			}
		};
		var e = k.userAgentMatch = function(n) {
			var m = b.userAgent.toLowerCase();
			return(m.match(n) !== null)
		};

		function l(m) {
			return function() {
				return e(m)
			}
		}
		k.isIE = l(/msie/i);
		k.isFF = l(/firefox/i);
		k.isChrome = l(/chrome/i);
		k.isIOS = l(/iP(hone|ad|od)/i);
		k.isIPod = l(/iP(hone|od)/i);
		k.isIPad = l(/iPad/i);
		k.isAndroid = function(m) {
			if(m) {
				return e(new RegExp("android.*" + m, "i"))
			} else {
				return e(/android/i)
			}
		};
		k.isMobile = function() {
			return k.isIOS() || k.isAndroid()
		};
		k.saveCookie = function(m, n) {
			j.cookie = "jwplayer." + m + "=" + n + "; path=/"
		};
		k.getCookies = function() {
			var p = {};
			var o = j.cookie.split("; ");
			for(var n = 0; n < o.length; n++) {
				var m = o[n].split("=");
				if(m[0].indexOf("jwplayer.") == 0) {
					p[m[0].substring(9, m[0].length)] = m[1]
				}
			}
			return p
		};
		k.typeOf = function(n) {
			var m = typeof n;
			if(m === "object") {
				if(!n) {
					return "null"
				}
				return(n instanceof Array) ? "array" : m
			} else {
				return m
			}
		};
		k.translateEventResponse = function(o, m) {
			var q = k.extend({}, m);
			if(o == d.events.JWPLAYER_FULLSCREEN && !q.fullscreen) {
				q.fullscreen = q.message == "true" ? true : false;
				delete q.message
			} else {
				if(typeof q.data == c) {
					q = k.extend(q, q.data);
					delete q.data
				} else {
					if(typeof q.metadata == c) {
						k.deepReplaceKeyName(q.metadata, ["__dot__", "__spc__", "__dsh__"], [".", " ", "-"])
					}
				}
			}
			var n = ["position", "duration", "offset"];
			for(var p in n) {
				if(q[n[p]]) {
					q[n[p]] = Math.round(q[n[p]] * 1000) / 1000
				}
			}
			return q
		};
		k.flashVersion = function() {
			if(k.isAndroid()) {
				return 0
			}
			var m = b.plugins,
				n;
			if(m != h) {
				n = m["Shockwave Flash"];
				if(n) {
					return parseInt(n.description.replace(/\D+(\d+)\..*/, "$1"))
				}
			}
			if(typeof g.ActiveXObject != h) {
				try {
					n = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
					if(n) {
						return parseInt(n.GetVariable("$version").split(" ")[1].split(",")[0])
					}
				} catch(o) {}
			}
			return 0
		};
		k.getScriptPath = function(o) {
			var m = j.getElementsByTagName("script");
			for(var n = 0; n < m.length; n++) {
				var p = m[n].src;
				if(p && p.indexOf(o) >= 0) {
					return p.substr(0, p.indexOf(o))
				}
			}
			return ""
		};
		k.deepReplaceKeyName = function(t, o, m) {
			switch(d.utils.typeOf(t)) {
				case "array":
					for(var q = 0; q < t.length; q++) {
						t[q] = d.utils.deepReplaceKeyName(t[q], o, m)
					}
					break;
				case c:
					for(var p in t) {
						var s, r;
						if(o instanceof Array && m instanceof Array) {
							if(o.length != m.length) {
								continue
							} else {
								s = o;
								r = m
							}
						} else {
							s = [o];
							r = [m]
						}
						var n = p;
						for(var q = 0; q < s.length; q++) {
							n = n.replace(new RegExp(o[q], "g"), m[q])
						}
						t[n] = d.utils.deepReplaceKeyName(t[p], o, m);
						if(p != n) {
							delete t[p]
						}
					}
					break
			}
			return t
		};
		var i = k.pluginPathType = {
			ABSOLUTE: 0,
			RELATIVE: 1,
			CDN: 2
		};
		k.getPluginPathType = function(n) {
			if(typeof n != f) {
				return
			}
			n = n.split("?")[0];
			var o = n.indexOf("://");
			if(o > 0) {
				return i.ABSOLUTE
			}
			var m = n.indexOf("/");
			var p = k.extension(n);
			if(o < 0 && m < 0 && (!p || !isNaN(p))) {
				return i.CDN
			}
			return i.RELATIVE
		};
		k.getPluginName = function(m) {
			return m.replace(/^(.*\/)?([^-]*)-?.*\.(swf|js)$/, "$2")
		};
		k.getPluginVersion = function(m) {
			return m.replace(/[^-]*-?([^\.]*).*$/, "$1")
		};
		k.isYouTube = function(m) {
			return(m.indexOf("youtube.com") > -1 || m.indexOf("youtu.be") > -1)
		};
		k.isRtmp = function(m, n) {
			return(m.indexOf("rtmp") == 0 || n == "rtmp")
		};
		k.foreach = function(o, n) {
			for(var m in o) {
				if(o.hasOwnProperty(m)) {
					n(m)
				}
			}
		};
		k.isHTTPS = function() {
			return(g.location.href.indexOf("https") == 0)
		}
	})(jwplayer);
	(function(o) {
		var d = "video/",
			i = "audio/",
			g = "image",
			j = "mp4",
			c = "webm",
			n = "ogg",
			b = "aac",
			k = "mp3",
			l = "vorbis",
			m = {
				mp4: d + j,
				vorbis: i + n,
				ogg: d + n,
				webm: d + c,
				aac: i + j,
				mp3: i + "mpeg",
				hls: "application/vnd.apple.mpegurl"
			},
			h = {
				mp4: m[j],
				f4v: m[j],
				m4v: m[j],
				mov: m[j],
				m4a: m[b],
				f4a: m[b],
				aac: m[b],
				mp3: m[k],
				ogv: m[n],
				ogg: m[l],
				oga: m[l],
				webm: m[c],
				m3u8: m.hls
			},
			d = "video",
			f = {
				flv: d,
				f4v: d,
				mov: d,
				m4a: d,
				m4v: d,
				mp4: d,
				aac: d,
				f4a: d,
				mp3: "sound",
				smil: "rtmp",
				m3u8: "hls"
			};
		var a = o.extensionmap = {};
		for(var e in h) {
			a[e] = {
				html5: h[e]
			}
		}
		for(e in f) {
			if(!a[e]) {
				a[e] = {}
			}
			a[e].flash = f[e]
		}
		a.types = m;
		a.mimeType = function(q) {
			for(var p in m) {
				if(m[p] == q) {
					return p
				}
			}
		};
		a.extType = function(p) {
			return a.mimeType(h[p])
		}
	})(jwplayer.utils);
	(function(b) {
		var a = b.loaderstatus = {
				NEW: 0,
				LOADING: 1,
				ERROR: 2,
				COMPLETE: 3
			},
			c = document;
		b.scriptloader = function(e) {
			var f = a.NEW,
				h = jwplayer.events,
				d = new h.eventdispatcher();
			b.extend(this, d);
			this.load = function() {
				var k = b.scriptloader.loaders[e];
				if(k && (k.getStatus() == a.NEW || k.getStatus() == a.LOADING)) {
					k.addEventListener(h.ERROR, g);
					k.addEventListener(h.COMPLETE, i);
					return
				}
				b.scriptloader.loaders[e] = this;
				if(f == a.NEW) {
					f = a.LOADING;
					var j = c.createElement("script");
					if(j.addEventListener) {
						j.onload = i;
						j.onerror = g
					} else {
						if(j.readyState) {
							j.onreadystatechange = function() {
								if(j.readyState == "loaded" || j.readyState == "complete") {
									i()
								}
							}
						}
					}
					c.getElementsByTagName("head")[0].appendChild(j);
					j.src = e
				}
			};

			function g(j) {
				f = a.ERROR;
				d.sendEvent(h.ERROR)
			}

			function i(j) {
				f = a.COMPLETE;
				d.sendEvent(h.COMPLETE)
			}
			this.getStatus = function() {
				return f
			}
		};
		b.scriptloader.loaders = {}
	})(jwplayer.utils);
	(function(a) {
		a.trim = function(b) {
			return b.replace(/^\s*/, "").replace(/\s*$/, "")
		};
		a.pad = function(c, d, b) {
			if(!b) {
				b = "0"
			}
			while(c.length < d) {
				c = b + c
			}
			return c
		};
		a.xmlAttribute = function(b, c) {
			for(var d = 0; d < b.attributes.length; d++) {
				if(b.attributes[d].name && b.attributes[d].name.toLowerCase() == c.toLowerCase()) {
					return b.attributes[d].value.toString()
				}
			}
			return ""
		};
		a.extension = function(b) {
			if(!b || b.substr(0, 4) == "rtmp") {
				return ""
			}
			b = b.substring(b.lastIndexOf("/") + 1, b.length).split("?")[0].split("#")[0];
			if(b.lastIndexOf(".") > -1) {
				return b.substr(b.lastIndexOf(".") + 1, b.length).toLowerCase()
			}
		};
		a.stringToColor = function(b) {
			b = b.replace(/(#|0x)?([0-9A-F]{3,6})$/gi, "$2");
			if(b.length == 3) {
				b = b.charAt(0) + b.charAt(0) + b.charAt(1) + b.charAt(1) + b.charAt(2) + b.charAt(2)
			}
			return parseInt(b, 16)
		}
	})(jwplayer.utils);
	(function(a) {
		var c = "invalid",
			b = "36QXq4W@GSBV^teR";
		a.key = function(h) {
			var g, i, e;

			function f(j) {
				if(!a.exists(j)) {
					j = ""
				}
				try {
					j = d(j);
					var l = j.split("/");
					g = l[0];
					if(!g) {
						g = "free"
					} else {
						if(a.key.valid.indexOf(g) < 0) {
							g = c
						}
					}
					i = l[1];
					if(l[2] && parseInt(l[2]) > 0) {
						e = new Date();
						e.setTime(String(l[2]))
					}
				} catch(k) {
					g = c
				}
			}

			function d(j) {
				return a.tea.decrypt(j, b)
			}
			this.edition = function() {
				if(e && e.getTime() < (new Date()).getTime()) {
					return c
				}
				return g
			};
			this.token = function() {
				return i
			};
			f(h)
		};
		a.key.valid = ["free", "pro"]
	})(jwplayer.utils);
	(function(a) {
		a.key.valid = ["premium", "ads"]
	})(jwplayer.utils);
	(function(b) {
		var c = b.tea = {};
		c.encrypt = function(h, w) {
			if(h.length == 0) {
				return("")
			}
			var x = c.strToLongs(a.encode(h));
			if(x.length <= 1) {
				x[1] = 0
			}
			var l = c.strToLongs(a.encode(w).slice(0, 16)),
				i = x.length,
				r = x[i - 1],
				s = x[0],
				u = 2654435769,
				t, o, f = Math.floor(6 + 52 / i),
				m = 0;
			while(f-- > 0) {
				m += u;
				o = m >>> 2 & 3;
				for(var g = 0; g < i; g++) {
					s = x[(g + 1) % i];
					t = (r >>> 5 ^ s << 2) + (s >>> 3 ^ r << 4) ^ (m ^ s) + (l[g & 3 ^ o] ^ r);
					r = x[g] += t
				}
			}
			var j = c.longsToStr(x);
			return d.encode(j)
		};
		c.decrypt = function(j, w) {
			if(j.length == 0) {
				return("")
			}
			var x = c.strToLongs(d.decode(j)),
				l = c.strToLongs(a.encode(w).slice(0, 16)),
				i = x.length,
				r = x[i - 1],
				s = x[0],
				u = 2654435769,
				t, o, f = Math.floor(6 + 52 / i),
				m = f * u;
			while(m != 0) {
				o = m >>> 2 & 3;
				for(var h = i - 1; h >= 0; h--) {
					r = x[h > 0 ? h - 1 : i - 1];
					t = (r >>> 5 ^ s << 2) + (s >>> 3 ^ r << 4) ^ (m ^ s) + (l[h & 3 ^ o] ^ r);
					s = x[h] -= t
				}
				m -= u
			}
			var g = c.longsToStr(x);
			g = g.replace(/\0+$/, "");
			return a.decode(g)
		};
		c.strToLongs = function(g) {
			var e = new Array(Math.ceil(g.length / 4));
			for(var f = 0; f < e.length; f++) {
				e[f] = g.charCodeAt(f * 4) + (g.charCodeAt(f * 4 + 1) << 8) + (g.charCodeAt(f * 4 + 2) << 16) + (g.charCodeAt(f * 4 + 3) << 24)
			}
			return e
		};
		c.longsToStr = function(f) {
			var e = new Array(f.length);
			for(var g = 0; g < f.length; g++) {
				e[g] = String.fromCharCode(f[g] & 255, f[g] >>> 8 & 255, f[g] >>> 16 & 255, f[g] >>> 24 & 255)
			}
			return e.join("")
		};
		var d = {};
		d.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		d.encode = function(q, s) {
			s = (typeof s == "undefined") ? false : s;
			var j, g, f, u, r, n, m, k, l = [],
				i = "",
				p, t, o;
			var h = d.code;
			t = s ? a.encode(q) : q;
			p = t.length % 3;
			if(p > 0) {
				while(p++ < 3) {
					i += "=";
					t += "\0"
				}
			}
			for(p = 0; p < t.length; p += 3) {
				j = t.charCodeAt(p);
				g = t.charCodeAt(p + 1);
				f = t.charCodeAt(p + 2);
				u = j << 16 | g << 8 | f;
				r = u >> 18 & 63;
				n = u >> 12 & 63;
				m = u >> 6 & 63;
				k = u & 63;
				l[p / 3] = h.charAt(r) + h.charAt(n) + h.charAt(m) + h.charAt(k)
			}
			o = l.join("");
			o = o.slice(0, o.length - i.length) + i;
			return o
		};
		d.decode = function(p, g) {
			g = (typeof g == "undefined") ? false : g;
			var i, f, e, q, m, k, j, s, l = [],
				r, o;
			var h = d.code;
			o = g ? a.decode(p) : p;
			for(var n = 0; n < o.length; n += 4) {
				q = h.indexOf(o.charAt(n));
				m = h.indexOf(o.charAt(n + 1));
				k = h.indexOf(o.charAt(n + 2));
				j = h.indexOf(o.charAt(n + 3));
				s = q << 18 | m << 12 | k << 6 | j;
				i = s >>> 16 & 255;
				f = s >>> 8 & 255;
				e = s & 255;
				l[n / 4] = String.fromCharCode(i, f, e);
				if(j == 64) {
					l[n / 4] = String.fromCharCode(i, f)
				}
				if(k == 64) {
					l[n / 4] = String.fromCharCode(i)
				}
			}
			r = l.join("");
			return g ? a.decode(r) : r
		};
		var a = {};
		a.encode = function(e) {
			var f = e.replace(/[\u0080-\u07ff]/g, function(h) {
				var g = h.charCodeAt(0);
				return String.fromCharCode(192 | g >> 6, 128 | g & 63)
			});
			f = f.replace(/[\u0800-\uffff]/g, function(h) {
				var g = h.charCodeAt(0);
				return String.fromCharCode(224 | g >> 12, 128 | g >> 6 & 63, 128 | g & 63)
			});
			return f
		};
		a.decode = function(f) {
			var e = f.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(h) {
				var g = ((h.charCodeAt(0) & 15) << 12) | ((h.charCodeAt(1) & 63) << 6) | (h.charCodeAt(2) & 63);
				return String.fromCharCode(g)
			});
			e = e.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(h) {
				var g = (h.charCodeAt(0) & 31) << 6 | h.charCodeAt(1) & 63;
				return String.fromCharCode(g)
			});
			return e
		}
	})(jwplayer.utils);
	(function(a) {
		a.events = {
			COMPLETE: "COMPLETE",
			ERROR: "ERROR",
			API_READY: "jwplayerAPIReady",
			JWPLAYER_READY: "jwplayerReady",
			JWPLAYER_FULLSCREEN: "jwplayerFullscreen",
			JWPLAYER_RESIZE: "jwplayerResize",
			JWPLAYER_ERROR: "jwplayerError",
			JWPLAYER_MEDIA_BEFOREPLAY: "jwplayerMediaBeforePlay",
			JWPLAYER_MEDIA_BEFORECOMPLETE: "jwplayerMediaBeforeComplete",
			JWPLAYER_COMPONENT_SHOW: "jwplayerComponentShow",
			JWPLAYER_COMPONENT_HIDE: "jwplayerComponentHide",
			JWPLAYER_MEDIA_BUFFER: "jwplayerMediaBuffer",
			JWPLAYER_MEDIA_BUFFER_FULL: "jwplayerMediaBufferFull",
			JWPLAYER_MEDIA_ERROR: "jwplayerMediaError",
			JWPLAYER_MEDIA_LOADED: "jwplayerMediaLoaded",
			JWPLAYER_MEDIA_COMPLETE: "jwplayerMediaComplete",
			JWPLAYER_MEDIA_SEEK: "jwplayerMediaSeek",
			JWPLAYER_MEDIA_TIME: "jwplayerMediaTime",
			JWPLAYER_MEDIA_VOLUME: "jwplayerMediaVolume",
			JWPLAYER_MEDIA_META: "jwplayerMediaMeta",
			JWPLAYER_MEDIA_MUTE: "jwplayerMediaMute",
			JWPLAYER_MEDIA_LEVELS: "jwplayerMediaLevels",
			JWPLAYER_MEDIA_LEVEL_CHANGED: "jwplayerMediaLevelChanged",
			JWPLAYER_CAPTIONS_CHANGED: "jwplayerCaptionsChanged",
			JWPLAYER_CAPTIONS_LIST: "jwplayerCaptionsList",
			JWPLAYER_PLAYER_STATE: "jwplayerPlayerState",
			state: {
				BUFFERING: "BUFFERING",
				IDLE: "IDLE",
				PAUSED: "PAUSED",
				PLAYING: "PLAYING"
			},
			JWPLAYER_PLAYLIST_LOADED: "jwplayerPlaylistLoaded",
			JWPLAYER_PLAYLIST_ITEM: "jwplayerPlaylistItem",
			JWPLAYER_PLAYLIST_COMPLETE: "jwplayerPlaylistComplete",
			JWPLAYER_DISPLAY_CLICK: "jwplayerViewClick",
			JWPLAYER_CONTROLS: "jwplayerViewControls",
			JWPLAYER_INSTREAM_CLICK: "jwplayerInstreamClicked",
			JWPLAYER_INSTREAM_DESTROYED: "jwplayerInstreamDestroyed"
		}
	})(jwplayer);
	(function(a) {
		var b = jwplayer.utils;
		a.eventdispatcher = function(h, c) {
			var e = h,
				g = c,
				f, d;
			this.resetEventListeners = function() {
				f = {};
				d = []
			};
			this.resetEventListeners();
			this.addEventListener = function(i, l, k) {
				try {
					if(!b.exists(f[i])) {
						f[i] = []
					}
					if(b.typeOf(l) == "string") {
						l = (new Function("return " + l))()
					}
					f[i].push({
						listener: l,
						count: k
					})
				} catch(j) {
					b.log("error", j)
				}
				return false
			};
			this.removeEventListener = function(j, l) {
				if(!f[j]) {
					return
				}
				try {
					for(var i = 0; i < f[j].length; i++) {
						if(f[j][i].listener.toString() == l.toString()) {
							f[j].splice(i, 1);
							break
						}
					}
				} catch(k) {
					b.log("error", k)
				}
				return false
			};
			this.addGlobalListener = function(k, j) {
				try {
					if(b.typeOf(k) == "string") {
						k = (new Function("return " + k))()
					}
					d.push({
						listener: k,
						count: j
					})
				} catch(i) {
					b.log("error", i)
				}
				return false
			};
			this.removeGlobalListener = function(k) {
				if(!k) {
					return
				}
				try {
					for(var i = 0; i < d.length; i++) {
						if(d[i].listener.toString() == k.toString()) {
							d.splice(i, 1);
							break
						}
					}
				} catch(j) {
					b.log("error", j)
				}
				return false
			};
			this.sendEvent = function(k, m) {
				if(!b.exists(m)) {
					m = {}
				}
				b.extend(m, {
					id: e,
					version: jwplayer.version,
					type: k
				});
				if(g) {
					b.log(k, m)
				}
				if(b.typeOf(f[k]) != "undefined") {
					for(var j = 0; j < f[k].length; j++) {
						try {
							f[k][j].listener(m)
						} catch(l) {
							b.log("There was an error while handling a listener: " + l.toString(), f[k][j].listener)
						}
						if(f[k][j]) {
							if(f[k][j].count === 1) {
								delete f[k][j]
							} else {
								if(f[k][j].count > 0) {
									f[k][j].count = f[k][j].count - 1
								}
							}
						}
					}
				}
				var i;
				for(i = 0; i < d.length; i++) {
					try {
						d[i].listener(m)
					} catch(l) {
						b.log("There was an error while handling a listener: " + l.toString(), d[i].listener)
					}
					if(d[i]) {
						if(d[i].count === 1) {
							delete d[i]
						} else {
							if(d[i].count > 0) {
								d[i].count = d[i].count - 1
							}
						}
					}
				}
			}
		}
	})(jwplayer.events);
	(function(a) {
		var c = {},
			b = {};
		a.plugins = function() {};
		a.plugins.loadPlugins = function(e, d) {
			b[e] = new a.plugins.pluginloader(new a.plugins.model(c), d);
			return b[e]
		};
		a.plugins.registerPlugin = function(h, g, f, e) {
			var d = a.utils.getPluginName(h);
			if(!c[d]) {
				c[d] = new a.plugins.plugin(h)
			}
			c[d].registerPlugin(h, g, f, e)
		}
	})(jwplayer);
	(function(a) {
		a.plugins.model = function(b) {
			this.addPlugin = function(c) {
				var d = a.utils.getPluginName(c);
				if(!b[d]) {
					b[d] = new a.plugins.plugin(c)
				}
				return b[d]
			};
			this.getPlugins = function() {
				return b
			}
		}
	})(jwplayer);
	(function(b) {
		var a = jwplayer.utils,
			c = jwplayer.events,
			d = "undefined";
		b.pluginmodes = {
			FLASH: 0,
			JAVASCRIPT: 1,
			HYBRID: 2
		};
		b.plugin = function(e) {
			var l = a.loaderstatus.NEW,
				m, k, f, n;
			var g = new c.eventdispatcher();
			a.extend(this, g);

			function h() {
				switch(a.getPluginPathType(e)) {
					case a.pluginPathType.ABSOLUTE:
						return e;
					case a.pluginPathType.RELATIVE:
						return a.getAbsolutePath(e, window.location.href)
				}
			}

			function j(o) {
				n = setTimeout(function() {
					l = a.loaderstatus.COMPLETE;
					g.sendEvent(c.COMPLETE)
				}, 1000)
			}

			function i(o) {
				l = a.loaderstatus.ERROR;
				g.sendEvent(c.ERROR)
			}
			this.load = function() {
				if(l == a.loaderstatus.NEW) {
					if(e.lastIndexOf(".swf") > 0) {
						m = e;
						l = a.loaderstatus.COMPLETE;
						g.sendEvent(c.COMPLETE);
						return
					} else {
						if(a.getPluginPathType(e) == a.pluginPathType.CDN) {
							l = a.loaderstatus.COMPLETE;
							g.sendEvent(c.COMPLETE);
							return
						}
					}
					l = a.loaderstatus.LOADING;
					var o = new a.scriptloader(h());
					o.addEventListener(c.COMPLETE, j);
					o.addEventListener(c.ERROR, i);
					o.load()
				}
			};
			this.registerPlugin = function(r, q, p, o) {
				if(n) {
					clearTimeout(n);
					n = undefined
				}
				f = q;
				if(p && o) {
					m = o;
					k = p
				} else {
					if(typeof p == "string") {
						m = p
					} else {
						if(typeof p == "function") {
							k = p
						} else {
							if(!p && !o) {
								m = r
							}
						}
					}
				}
				l = a.loaderstatus.COMPLETE;
				g.sendEvent(c.COMPLETE)
			};
			this.getStatus = function() {
				return l
			};
			this.getPluginName = function() {
				return a.getPluginName(e)
			};
			this.getFlashPath = function() {
				if(m) {
					switch(a.getPluginPathType(m)) {
						case a.pluginPathType.ABSOLUTE:
							return m;
						case a.pluginPathType.RELATIVE:
							if(e.lastIndexOf(".swf") > 0) {
								return a.getAbsolutePath(m, window.location.href)
							}
							return a.getAbsolutePath(m, h())
					}
				}
				return null
			};
			this.getJS = function() {
				return k
			};
			this.getTarget = function() {
				return f
			};
			this.getPluginmode = function() {
				if(typeof m != d && typeof k != d) {
					return b.pluginmodes.HYBRID
				} else {
					if(typeof m != d) {
						return b.pluginmodes.FLASH
					} else {
						if(typeof k != d) {
							return b.pluginmodes.JAVASCRIPT
						}
					}
				}
			};
			this.getNewInstance = function(p, o, q) {
				return new k(p, o, q)
			};
			this.getURL = function() {
				return e
			}
		}
	})(jwplayer.plugins);
	(function(b) {
		var a = b.utils,
			c = b.events;
		b.plugins.pluginloader = function(i, h) {
			var o = a.loaderstatus.NEW,
				g = false,
				d = false,
				k = false,
				l, m = h,
				e = new c.eventdispatcher();
			a.extend(this, e);

			function f() {
				if(k) {
					e.sendEvent(c.ERROR, {
						message: l
					})
				} else {
					if(!d) {
						d = true;
						o = a.loaderstatus.COMPLETE;
						e.sendEvent(c.COMPLETE)
					}
				}
			}

			function n() {
				if(!m) {
					f()
				}
				if(!d && !k) {
					var r = 0,
						q = i.getPlugins();
					for(var s in m) {
						var t = a.getPluginName(s),
							w = q[t],
							v = w.getJS(),
							u = w.getTarget(),
							p = w.getStatus();
						if(p == a.loaderstatus.LOADING || p == a.loaderstatus.NEW) {
							r++
						} else {
							if(v && (!u || parseFloat(u) > parseFloat(b.version))) {
								k = true;
								l = "Incompatible player version";
								f()
							}
						}
					}
					if(r == 0) {
						f()
					}
				}
			}
			this.setupPlugins = function(x, s, A) {
				var r = {
						length: 0,
						plugins: {}
					},
					v = {
						length: 0,
						plugins: {}
					},
					u = i.getPlugins();
				for(var w in s.plugins) {
					var y = a.getPluginName(w),
						z = u[y],
						B = z.getFlashPath(),
						C = z.getJS(),
						p = z.getURL();
					if(B) {
						r.plugins[B] = a.extend({}, s.plugins[w]);
						r.plugins[B].pluginmode = z.getPluginmode();
						r.length++
					}
					try {
						if(C && s.plugins && s.plugins[p]) {
							var q = document.createElement("div");
							q.id = x.id + "_" + y;
							q.style.position = "absolute";
							q.style.top = 0;
							q.style.zIndex = v.length + 10;
							v.plugins[y] = z.getNewInstance(x, a.extend({}, s.plugins[p]), q);
							v.length++;
							x.onReady(A(v.plugins[y], q, true));
							x.onResize(A(v.plugins[y], q))
						}
					} catch(t) {
						console.log("ERROR: Failed to load " + y + ".")
					}
				}
				x.plugins = v.plugins;
				return r
			};
			this.load = function() {
				if(a.exists(h) && a.typeOf(h) != "object") {
					n();
					return
				}
				o = a.loaderstatus.LOADING;
				g = true;
				for(var q in h) {
					if(a.exists(q)) {
						var r = i.addPlugin(q);
						r.addEventListener(c.COMPLETE, n);
						r.addEventListener(c.ERROR, j)
					}
				}
				var p = i.getPlugins();
				for(q in p) {
					p[q].load()
				}
				g = false;
				n()
			};
			var j = this.pluginFailed = function(p) {
				if(!k) {
					k = true;
					l = "File not found";
					f()
				}
			};
			this.getStatus = function() {
				return o
			}
		}
	})(jwplayer);
	(function(a) {
		a.playlist = function(c) {
			var d = [];
			if(a.utils.typeOf(c) == "array") {
				for(var b = 0; b < c.length; b++) {
					d.push(new a.playlist.item(c[b]))
				}
			} else {
				d.push(new a.playlist.item(c))
			}
			return d
		}
	})(jwplayer);
	(function(b) {
		var a = b.item = function(d) {
			var c = jwplayer.utils.extend({}, a.defaults, d);
			if(c.sources.length == 0) {
				c.sources = [new b.source(c)]
			}
			for(var e = 0; e < c.sources.length; e++) {
				c.sources[e] = new b.source(c.sources[e])
			}
			return c
		};
		a.defaults = {
			description: "",
			image: "",
			mediaid: "",
			title: "",
			tags: "",
			duration: -1,
			sources: []
		}
	})(jwplayer.playlist);
	(function(d) {
		var b = undefined,
			a = jwplayer.utils,
			c = {
				file: b,
				label: b,
				bitrate: b,
				width: b,
				height: b,
				type: b
			};
		d.source = function(f) {
			var e = a.extend({}, c);
			for(var g in c) {
				if(a.exists(f[g])) {
					e[g] = f[g];
					delete f[g]
				}
			}
			if(e.type && e.type.indexOf("/") > 0) {
				e.type = a.extensionmap.mimeType(e.type)
			}
			return e
		}
	})(jwplayer.playlist);
	(function(b) {
		var a = b.utils,
			c = b.events,
			d = document;
		var e = b.embed = function(u) {
			var q = new e.config(u.config),
				j, l, h, k = q.width,
				m = q.height,
				o = "Error loading player: ",
				i = b.plugins.loadPlugins(u.id, q.plugins);
			if(q.fallbackDiv) {
				h = q.fallbackDiv;
				delete q.fallbackDiv
			}
			q.id = u.id;
			l = d.getElementById(u.id);
			j = d.createElement("div");
			j.id = l.id;
			j.style.width = k.toString().indexOf("%") > 0 ? k : (k + "px");
			j.style.height = m.toString().indexOf("%") > 0 ? m : (m + "px");
			l.parentNode.replaceChild(j, l);

			function n(x, w) {
				for(var v in w) {
					if(typeof x[v] == "function") {
						(x[v]).call(x, w[v])
					}
				}
			}

			function f() {
				if(a.typeOf(q.playlist) == "array" && q.playlist.length < 2) {
					if(q.playlist.length == 0 || !q.playlist[0].sources || q.playlist[0].sources.length == 0) {
						s();
						return
					}
				}
				if(i.getStatus() == a.loaderstatus.COMPLETE) {
					for(var x = 0; x < q.modes.length; x++) {
						if(q.modes[x].type && e[q.modes[x].type]) {
							var v = a.extend({}, q),
								w = new e[q.modes[x].type](j, q.modes[x], v, i, u);
							if(w.supportsConfig()) {
								w.addEventListener(c.ERROR, g);
								w.embed();
								n(u, v.events);
								return u
							}
						}
					}
					if(q.fallback) {
						a.log("No suitable players found and fallback enabled");
						new e.download(j, q, s)
					} else {
						a.log("No suitable players found and fallback disabled");
						r()
					}
				}
			}

			function r() {
				j.parentNode.replaceChild(h, j)
			}

			function g(v) {
				t(j, o + v.message)
			}

			function p(v) {
				t(j, "Could not load plugins: " + v.message)
			}

			function s() {
				t(j, o + "No playable sources found")
			}

			function t(v, x) {
				if(!q.fallback) {
					return
				}
				var w = v.style;
				w.backgroundColor = "#000";
				w.color = "#FFF";
				w.width = a.styleDimension(q.width);
				w.height = a.styleDimension(q.height);
				w.display = "table";
				w.opacity = 1;
				var z = document.createElement("p"),
					y = z.style;
				y.verticalAlign = "middle";
				y.textAlign = "center";
				y.display = "table-cell";
				y.font = "15px/20px Arial, Helvetica, sans-serif";
				z.innerHTML = x.replace(":", ":<br>");
				v.innerHTML = "";
				v.appendChild(z)
			}
			b.embed.errorScreen = t;
			i.addEventListener(c.COMPLETE, f);
			i.addEventListener(c.ERROR, p);
			i.load();
			return u
		}
	})(jwplayer);
	(function(d) {
		var a = d.utils,
			h = d.embed,
			b = d.playlist.item,
			f = undefined;
		var c = h.config = function(j) {
			var l = {
					fallback: true,
					height: 270,
					primary: "html5",
					width: 480,
					base: j.base ? j.base : a.getScriptPath("jwplayer.js")
				},
				k = a.extend(l, j),
				i = {
					html5: {
						type: "html5",
						src: k.base + "jwplayer.html5.js"
					},
					flash: {
						type: "flash",
						src: k.base + "jwplayer.flash.swf"
					}
				};
			k.modes = (k.primary == "flash") ? [i.flash, i.html5] : [i.html5, i.flash];
			if(k.listbar) {
				k.playlistsize = k.listbar.size;
				k.playlistposition = k.listbar.position
			}
			e(k);
			return k
		};
		c.addConfig = function(i, j) {
			e(j);
			return a.extend(i, j)
		};

		function e(l) {
			if(!l.playlist) {
				var n = {};
				for(var k in b.defaults) {
					g(l, n, k)
				}
				if(!n.sources) {
					if(l.levels) {
						n.sources = l.levels;
						delete l.levels
					} else {
						var j = {};
						g(l, j, "file");
						g(l, j, "type");
						n.sources = j.file ? [j] : []
					}
				}
				l.playlist = [n]
			} else {
				for(var m = 0; m < l.playlist.length; m++) {
					l.playlist[m] = new b(l.playlist[m])
				}
			}
		}

		function g(k, i, j) {
			if(a.exists(k[j])) {
				i[j] = k[j];
				delete k[j]
			}
		}
	})(jwplayer);
	(function(e) {
		var g = e.embed,
			j = e.utils,
			i = document,
			h = "pointer",
			c = "none",
			a = "block",
			f = "100%",
			d = "relative",
			b = "absolute";
		g.download = function(n, y, l) {
			var q = j.extend({}, y),
				u, o = q.width ? q.width : 480,
				r = q.height ? q.height : 320,
				z, s, k = y.logo ? y.logo : {
					prefix: "http://p.jwpcdn.com/",
					file: "logo.png",
					margin: 10
				};

			function x() {
				var E, F, D, G, C = q.playlist,
					J, B, G, H = ["mp4", "aac", "mp3"];
				if(C && C.length) {
					J = C[0];
					B = J.sources;
					for(G = 0; G < B.length; G++) {
						var A = B[G],
							I = A.type ? A.type : j.extensionmap.extType(j.extension(A.file));
						if(A.file) {
							for(G in H) {
								if(I == H[G]) {
									E = A.file;
									F = J.image
								} else {
									if(j.isYouTube(A.file)) {
										D = A.file
									}
								}
							}
							if(E || D) {
								continue
							}
						}
					}
				} else {
					return
				}
				if(E) {
					z = E;
					s = F;
					if(k.prefix) {
						if(j.isHTTPS()) {
							k.prefix = k.prefix.replace("http://", "https://ssl.")
						}
						k.prefix += e.version.split(/\W/).splice(0, 2).join("/")
					}
					t();
					p()
				} else {
					if(D) {
						m(D)
					} else {
						l()
					}
				}
			}

			function t() {
				if(n) {
					u = v("a", "display", n);
					v("div", "icon", u);
					v("div", "logo", u);
					if(z) {
						u.setAttribute("href", j.getAbsolutePath(z))
					}
				}
			}

			function w(A, C) {
				var D = i.querySelectorAll(A);
				for(var B = 0; B < D.length; B++) {
					for(var E in C) {
						D[B].style[E] = C[E]
					}
				}
			}

			function p() {
				var A = "#" + n.id + " .jwdownload";
				n.style.width = "";
				n.style.height = "";
				w(A + "display", {
					width: j.styleDimension(Math.max(320, o)),
					height: j.styleDimension(Math.max(180, r)),
					background: "black center no-repeat " + (s ? "url(" + s + ")" : ""),
					backgroundSize: "contain",
					position: d,
					border: c,
					display: a
				});
				w(A + "display div", {
					position: b,
					width: f,
					height: f
				});
				w(A + "logo", {
					top: k.margin + "px",
					right: k.margin + "px",
					background: "top right no-repeat url(" + k.prefix + k.file + ")"
				});
				w(A + "icon", {
					background: "center no-repeat url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAgNJREFUeNrs28lqwkAYB/CZqNVDDj2r6FN41QeIy8Fe+gj6BL275Q08u9FbT8ZdwVfotSBYEPUkxFOoks4EKiJdaDuTjMn3wWBO0V/+sySR8SNSqVRKIR8qaXHkzlqS9jCfzzWcTCYp9hF5o+59sVjsiRzcegSckFzcjT+ruN80TeSlAjCAAXzdJSGPFXRpAAMYwACGZQkSdhG4WCzehMNhqV6vG6vVSrirKVEw66YoSqDb7cqlUilE8JjHd/y1MQefVzqdDmiaJpfLZWHgXMHn8F6vJ1cqlVAkEsGuAn83J4gAd2RZymQygX6/L1erVQt+9ZPWb+CDwcCC2zXGJaewl/DhcHhK3DVj+KfKZrMWvFarcYNLomAv4aPRSFZVlTlcSPA5fDweW/BoNIqFnKV53JvncjkLns/n/cLdS+92O7RYLLgsKfv9/t8XlDn4eDyiw+HA9Jyz2eyt0+kY2+3WFC5hluej0Ha7zQQq9PPwdDq1Et1sNsx/nFBgCqWJ8oAK1aUptNVqcYWewE4nahfU0YQnk4ntUEfGMIU2m01HoLaCKbTRaDgKtaVLk9tBYaBcE/6Artdr4RZ5TB6/dC+9iIe/WgAMYADDpAUJAxjAAAYwgGFZgoS/AtNNTF7Z2bL0BYPBV3Jw5xFwwWcYxgtBP5OkE8i9G7aWGOOCruvauwADALMLMEbKf4SdAAAAAElFTkSuQmCC)"
				})
			}

			function v(A, D, C) {
				var B = i.createElement(A);
				if(D) {
					B.className = "jwdownload" + D
				}
				if(C) {
					C.appendChild(B)
				}
				return B
			}

			function m(A) {
				var B = v("embed", "", n);
				B.src = "http://www.youtube.com/v/" + (/v[=\/](\w*)|\/(\w+)$|^(\w+)$/i).exec(A).slice(1).join("");
				B.type = "application/x-shockwave-flash";
				B.width = o;
				B.height = r
			}
			x()
		}
	})(jwplayer);
	(function(c) {
		var b = c.utils,
			d = c.events,
			a = {};
		var e = c.embed.flash = function(l, m, p, k, n) {
			var h = new c.events.eventdispatcher(),
				i = b.flashVersion();
			b.extend(this, h);

			function q(s, r, t) {
				var u = document.createElement("param");
				u.setAttribute("name", r);
				u.setAttribute("value", t);
				s.appendChild(u)
			}

			function o(s, t, r) {
				return function(u) {
					try {
						if(r) {
							document.getElementById(n.id + "_wrapper").appendChild(t)
						}
						var w = document.getElementById(n.id).getPluginConfig("display");
						if(typeof s.resize == "function") {
							s.resize(w.width, w.height)
						}
						t.style.left = w.x;
						t.style.top = w.h
					} catch(v) {}
				}
			}

			function j(t) {
				if(!t) {
					return {}
				}
				var v = {};
				for(var s in t) {
					var r = t[s];
					for(var u in r) {
						v[s + "." + u] = r[u]
					}
				}
				return v
			}

			function g(u) {
				if(!u) {
					return {}
				}
				var x = {},
					w = [];
				for(var r in u) {
					var t = b.getPluginName(r);
					var s = u[r];
					w.push(r);
					for(var v in s) {
						x[t + "." + v] = s[v]
					}
				}
				x.plugins = w.join(",");
				return x
			}
			this.embed = function() {
				p.id = n.id;
				if(i < 10) {
					h.sendEvent(d.ERROR, {
						message: "Flash version must be 10.0 or greater"
					});
					return false
				}
				var C;
				var v = b.extend({}, p);
				if(l.id + "_wrapper" == l.parentNode.id) {
					C = document.getElementById(l.id + "_wrapper")
				} else {
					C = document.createElement("div");
					C.id = l.id + "_wrapper";
					C.style.position = "relative";
					C.style.width = b.styleDimension(v.width);
					C.style.height = b.styleDimension(v.height);
					l.parentNode.replaceChild(C, l);
					C.appendChild(l)
				}
				var t = k.setupPlugins(n, v, o);
				if(t.length > 0) {
					b.extend(v, g(t.plugins))
				} else {
					delete v.plugins
				}
				if(typeof v["dock.position"] != "undefined") {
					if(v["dock.position"].toString().toLowerCase() == "false") {
						v.dock = v["dock.position"];
						delete v["dock.position"]
					}
				}
				var D = "#000000",
					y, u = v.wmode ? v.wmode : (v.height && v.height <= 40 ? "transparent" : "opaque"),
					w = ["height", "width", "modes", "events", "primary", "base", "fallback", "volume"];
				for(var z = 0; z < w.length; z++) {
					delete v[w[z]]
				}
				var B = b.getCookies();
				for(var s in B) {
					if(typeof(v[s]) == "undefined") {
						v[s] = B[s]
					}
				}
				var r = window.location.pathname.split("/");
				r.splice(r.length - 1, 1);
				r = r.join("/");
				v.base = r + "/";
				a[l.id] = v;
				if(b.isIE()) {
					var A = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" " width="100%" height="100%" id="' + l.id + '" name="' + l.id + '" tabindex=0"">';
					A += '<param name="movie" value="' + m.src + '">';
					A += '<param name="allowfullscreen" value="true">';
					A += '<param name="allowscriptaccess" value="always">';
					A += '<param name="seamlesstabbing" value="true">';
					A += '<param name="wmode" value="' + u + '">';
					A += '<param name="bgcolor" value="' + D + '">';
					A += "</object>";
					l.outerHTML = A;
					y = document.getElementById(l.id)
				} else {
					var x = document.createElement("object");
					x.setAttribute("type", "application/x-shockwave-flash");
					x.setAttribute("data", m.src);
					x.setAttribute("width", "100%");
					x.setAttribute("height", "100%");
					x.setAttribute("bgcolor", D);
					x.setAttribute("id", l.id);
					x.setAttribute("name", l.id);
					x.setAttribute("tabindex", 0);
					q(x, "allowfullscreen", "true");
					q(x, "allowscriptaccess", "always");
					q(x, "seamlesstabbing", "true");
					q(x, "wmode", u);
					l.parentNode.replaceChild(x, l);
					y = x
				}
				n.container = y;
				n.setPlayer(y, "flash")
			};
			this.supportsConfig = function() {
				if(i) {
					if(p) {
						if(b.typeOf(p.playlist) == "string") {
							return true
						}
						try {
							var t = p.playlist[0],
								r = t.sources;
							if(typeof r == "undefined") {
								return true
							} else {
								for(var s = 0; s < r.length; s++) {
									if(r[s].file && f(r[s].file, r[s].type)) {
										return true
									}
								}
							}
						} catch(u) {
							return false
						}
					} else {
						return true
					}
				}
				return false
			};

			function f(r, s) {
				if(b.isYouTube(r)) {
					return true
				}
				if(b.isRtmp(r, s)) {
					return true
				}
				if(s == "hls") {
					return true
				}
				var t = b.extensionmap[s ? s : b.extension(r)];
				if(!t) {
					return false
				}
				return !!(t.flash)
			}
		};
		e.getVars = function(f) {
			return a[f]
		}
	})(jwplayer);
	(function(c) {
		var a = c.utils,
			b = a.extensionmap,
			d = c.events;
		c.embed.html5 = function(g, h, o, f, k) {
			var j = this,
				e = new d.eventdispatcher();
			a.extend(j, e);

			function l(q, r, p) {
				return function(s) {
					try {
						var t = document.querySelector("#" + g.id + " .jwmain");
						if(p) {
							t.appendChild(r)
						}
						if(typeof q.resize == "function") {
							q.resize(t.clientWidth, t.clientHeight);
							setTimeout(function() {
								q.resize(t.clientWidth, t.clientHeight)
							}, 400)
						}
						r.left = t.style.left;
						r.top = t.style.top
					} catch(u) {}
				}
			}
			j.embed = function() {
				if(c.html5) {
					f.setupPlugins(k, o, l);
					g.innerHTML = "";
					var p = c.utils.extend({}, o);
					delete p.volume;
					var q = new c.html5.player(p);
					k.container = document.getElementById(k.id);
					k.setPlayer(q, "html5")
				} else {
					var r = new a.scriptloader(h.src);
					r.addEventListener(d.ERROR, i);
					r.addEventListener(d.COMPLETE, j.embed);
					r.load()
				}
			};

			function i(p) {
				j.sendEvent(p.type, {
					message: "HTML5 player not found"
				})
			}
			j.supportsConfig = function() {
				if(!!c.vid.canPlayType) {
					try {
						if(a.typeOf(o.playlist) == "string") {
							return true
						} else {
							var p = o.playlist[0].sources;
							for(var r = 0; r < p.length; r++) {
								var q = p[r].file,
									s = p[r].type;
								if(n(q, s)) {
									return true
								}
							}
						}
					} catch(t) {
						return false
					}
				}
				return false
			};

			function n(p, q) {
				if(navigator.userAgent.match(/BlackBerry/i) !== null) {
					return false
				}
				if(a.isAndroid() && (a.extension(p) == "m3u" || a.extension(p) == "m3u8")) {
					return false
				}
				if(a.isRtmp(p, q)) {
					return false
				}
				var r = b[q ? q : a.extension(p)];
				if(!r) {
					return false
				}
				if(r.flash && !r.html5) {
					return false
				}
				return m(r.html5)
			}

			function m(p) {
				var q = c.vid;
				if(!p) {
					return true
				}
				try {
					if(q.canPlayType(p)) {
						return true
					} else {
						return false
					}
				} catch(r) {
					return false
				}
			}
		}
	})(jwplayer);
	(function(c) {
		var b = c.embed,
			a = c.utils,
			d = a.extend(function(k) {
				var j = (a.isHTTPS() ? "https://ssl." : "http://") + "p.jwpcdn.com/" + c.version.replace(/(\d+)\.(\d+).*/, "$1/$2/"),
					g = k.config,
					e = g.plugins,
					f = g.analytics,
					i = j + "jwpsrv.js",
					h = new c.utils.key(c.key);
				if(h.edition() == "ads" && g.advertising) {
					g.plugins[j + g.advertising.client + (g.primary == "flash" ? ".swf" : ".js")] = g.advertising
				}
				delete g.advertising;
				g.key = c.key;
				delete g.analytics;
				e = e ? e : {};
				e[i] = f ? f : {};
				g.plugins = e;
				return new b(k)
			}, b);
		c.embed = d
	})(jwplayer);
	(function(c) {
		var b = c.embed,
			a = c.utils.extend(function(e) {
				var d = e.config,
					f = d.plugins ? d.plugins : {};
				delete f.sharing;
				delete f.related;
				if(d.sharing) {
					f.sharing = d.sharing
				}
				if(d.related) {
					f.related = d.related
				}
				if(d.ga) {
					f.ga = d.ga
				}
				d.plugins = f;
				return new b(e)
			}, b);
		c.embed = a
	})(jwplayer);
	(function(d) {
		var c = [],
			a = d.utils,
			e = d.events,
			b = e.state,
			g = document;
		var f = d.api = function(t) {
			var x = this,
				h = {},
				l = {},
				A = {},
				o = [],
				i = undefined,
				D = false,
				p = [],
				y = undefined,
				s = {},
				n = {};
			x.container = t;
			x.id = t.id;
			x.getBuffer = function() {
				return w("jwGetBuffer")
			};
			x.getContainer = function() {
				return x.container
			};
			x.addButton = function(H, F, G, K) {
				try {
					n[K] = G;
					var J = "jwplayer('" + x.id + "').callback('" + K + "')";
					w("jwDockAddButton", H, F, J, K)
				} catch(I) {
					a.log("Could not add dock button" + I.message)
				}
			};
			x.removeButton = function(F) {
				w("jwDockRemoveButton", F)
			}, x.callback = function(F) {
				if(n[F]) {
					n[F]()
				}
			};
			x.getDuration = function() {
				return w("jwGetDuration")
			};
			x.getFullscreen = function() {
				return w("jwGetFullscreen")
			};
			x.getStretching = function() {
				return w("jwGetStretching")
			};
			x.getHeight = function() {
				return w("jwGetHeight")
			};
			x.getLockState = function() {
				return w("jwGetLockState")
			};
			x.getMeta = function() {
				return x.getItemMeta()
			};
			x.getMute = function() {
				return w("jwGetMute")
			};
			x.getPlaylist = function() {
				var G = w("jwGetPlaylist");
				if(x.renderingMode == "flash") {
					a.deepReplaceKeyName(G, ["__dot__", "__spc__", "__dsh__"], [".", " ", "-"])
				}
				for(var F = 0; F < G.length; F++) {
					if(!a.exists(G[F].index)) {
						G[F].index = F
					}
				}
				return G
			};
			x.getPlaylistItem = function(F) {
				if(!a.exists(F)) {
					F = x.getCurrentItem()
				}
				return x.getPlaylist()[F]
			};
			x.getPosition = function() {
				return w("jwGetPosition")
			};
			x.getRenderingMode = function() {
				return x.renderingMode
			};
			x.getState = function() {
				return w("jwGetState")
			};
			x.getVolume = function() {
				return w("jwGetVolume")
			};
			x.getWidth = function() {
				return w("jwGetWidth")
			};
			x.setFullscreen = function(F) {
				if(!a.exists(F)) {
					w("jwSetFullscreen", !w("jwGetFullscreen"))
				} else {
					w("jwSetFullscreen", F)
				}
				return x
			};
			x.setStretching = function(F) {
				w("jwSetStretching", F);
				return x
			};
			x.setMute = function(F) {
				if(!a.exists(F)) {
					w("jwSetMute", !w("jwGetMute"))
				} else {
					w("jwSetMute", F)
				}
				return x
			};
			x.lock = function() {
				return x
			};
			x.unlock = function() {
				return x
			};
			x.load = function(F) {
				w("jwLoad", F);
				return x
			};
			x.playlistItem = function(F) {
				w("jwPlaylistItem", parseInt(F));
				return x
			};
			x.playlistPrev = function() {
				w("jwPlaylistPrev");
				return x
			};
			x.playlistNext = function() {
				w("jwPlaylistNext");
				return x
			};
			x.resize = function(G, F) {
				if(x.renderingMode != "flash") {
					w("jwResize", G, F)
				} else {
					var H = g.getElementById(x.id + "_wrapper");
					if(H) {
						H.style.width = a.styleDimension(G);
						H.style.height = a.styleDimension(F)
					}
				}
				return x
			};
			x.play = function(F) {
				if(typeof F == "undefined") {
					F = x.getState();
					if(F == b.PLAYING || F == b.BUFFERING) {
						w("jwPause")
					} else {
						w("jwPlay")
					}
				} else {
					w("jwPlay", F)
				}
				return x
			};
			x.pause = function(F) {
				if(typeof F == "undefined") {
					F = x.getState();
					if(F == b.PLAYING || F == b.BUFFERING) {
						w("jwPause")
					} else {
						w("jwPlay")
					}
				} else {
					w("jwPause", F)
				}
				return x
			};
			x.stop = function() {
				w("jwStop");
				return x
			};
			x.seek = function(F) {
				w("jwSeek", F);
				return x
			};
			x.setVolume = function(F) {
				w("jwSetVolume", F);
				return x
			};
			x.loadInstream = function(G, F) {
				y = new f.instream(this, i, G, F);
				return y
			};
			x.getQualityLevels = function() {
				return w("jwGetQualityLevels")
			};
			x.getCurrentQuality = function() {
				return w("jwGetCurrentQuality")
			};
			x.setCurrentQuality = function(F) {
				w("jwSetCurrentQuality", F)
			};
			x.getCaptionsList = function() {
				return w("jwGetCaptionsList")
			};
			x.getCurrentCaptions = function() {
				return w("jwGetCurrentCaptions")
			};
			x.setCurrentCaptions = function(F) {
				w("jwSetCurrentCaptions", F)
			};
			x.getControls = function() {
				return w("jwGetControls")
			};
			x.getSafeRegion = function() {
				return w("jwGetSafeRegion")
			};
			x.setControls = function(F) {
				w("jwSetControls", F)
			};
			x.destroyPlayer = function() {
				w("jwPlayerDestroy")
			};
			var r = {
				onBufferChange: e.JWPLAYER_MEDIA_BUFFER,
				onBufferFull: e.JWPLAYER_MEDIA_BUFFER_FULL,
				onError: e.JWPLAYER_ERROR,
				onFullscreen: e.JWPLAYER_FULLSCREEN,
				onMeta: e.JWPLAYER_MEDIA_META,
				onMute: e.JWPLAYER_MEDIA_MUTE,
				onPlaylist: e.JWPLAYER_PLAYLIST_LOADED,
				onPlaylistItem: e.JWPLAYER_PLAYLIST_ITEM,
				onPlaylistComplete: e.JWPLAYER_PLAYLIST_COMPLETE,
				onReady: e.API_READY,
				onResize: e.JWPLAYER_RESIZE,
				onComplete: e.JWPLAYER_MEDIA_COMPLETE,
				onSeek: e.JWPLAYER_MEDIA_SEEK,
				onTime: e.JWPLAYER_MEDIA_TIME,
				onVolume: e.JWPLAYER_MEDIA_VOLUME,
				onBeforePlay: e.JWPLAYER_MEDIA_BEFOREPLAY,
				onBeforeComplete: e.JWPLAYER_MEDIA_BEFORECOMPLETE,
				onDisplayClick: e.JWPLAYER_DISPLAY_CLICK,
				onControls: e.JWPLAYER_CONTROLS,
				onQualityLevels: e.JWPLAYER_MEDIA_LEVELS,
				onQualityChange: e.JWPLAYER_MEDIA_LEVEL_CHANGED,
				onCaptionsList: e.JWPLAYER_CAPTIONS_LIST,
				onCaptionsChange: e.JWPLAYER_CAPTIONS_CHANGED
			};
			a.foreach(r, function(F) {
				x[F] = C(r[F], z)
			});
			var v = {
				onBuffer: b.BUFFERING,
				onPause: b.PAUSED,
				onPlay: b.PLAYING,
				onIdle: b.IDLE
			};
			a.foreach(v, function(F) {
				x[F] = C(v[F], q)
			});

			function C(F, G) {
				return function(H) {
					return G(F, H)
				}
			}
			x.remove = function() {
				if(!D) {
					throw "Cannot call remove() before player is ready";
					return
				}
				m(this)
			};

			function m(F) {
				p = [];
				f.destroyPlayer(F.id)
			}
			x.setup = function(F) {
				if(d.embed) {
					var G = g.getElementById(x.id);
					if(G) {
						F.fallbackDiv = G
					}
					m(x);
					var H = d(x.id);
					H.config = F;
					return new d.embed(H)
				}
				return x
			};
			x.registerPlugin = function(I, H, G, F) {
				d.plugins.registerPlugin(I, H, G, F)
			};
			x.setPlayer = function(F, G) {
				i = F;
				x.renderingMode = G
			};
			x.detachMedia = function() {
				if(x.renderingMode == "html5") {
					return w("jwDetachMedia")
				}
			};
			x.attachMedia = function() {
				if(x.renderingMode == "html5") {
					return w("jwAttachMedia")
				}
			};

			function q(F, G) {
				if(!l[F]) {
					l[F] = [];
					z(e.JWPLAYER_PLAYER_STATE, E(F))
				}
				l[F].push(G);
				return x
			}

			function E(F) {
				return function(H) {
					var G = H.newstate,
						J = H.oldstate;
					if(G == F) {
						var I = l[G];
						if(I) {
							for(var K = 0; K < I.length; K++) {
								if(typeof I[K] == "function") {
									I[K].call(this, {
										oldstate: J,
										newstate: G
									})
								}
							}
						}
					}
				}
			}

			function B(F, G, H) {
				if(!A[F]) {
					A[F] = {}
				}
				if(!A[F][G]) {
					A[F][G] = [];
					z(G, k(F, G))
				}
				A[F][G].push(H);
				return x
			}

			function k(F, G) {
				return function(I) {
					if(F == I.component) {
						var H = A[F][G];
						if(H) {
							for(var J = 0; J < H.length; J++) {
								if(typeof H[J] == "function") {
									H[J].call(this, I)
								}
							}
						}
					}
				}
			}

			function j(F, G) {
				try {
					F.jwAddEventListener(G, 'function(dat) { jwplayer("' + x.id + '").dispatchEvent("' + G + '", dat); }')
				} catch(H) {
					a.log("Could not add internal listener")
				}
			}

			function z(F, G) {
				if(!h[F]) {
					h[F] = [];
					if(i && D) {
						j(i, F)
					}
				}
				h[F].push(G);
				return x
			}
			x.dispatchEvent = function(H) {
				if(h[H]) {
					var G = a.translateEventResponse(H, arguments[1]);
					for(var F = 0; F < h[H].length; F++) {
						if(typeof h[H][F] == "function") {
							h[H][F].call(this, G)
						}
					}
				}
			};
			x.dispatchInstreamEvent = function(F) {
				if(y) {
					y.dispatchEvent(F, arguments)
				}
			};

			function w() {
				if(D) {
					var H = arguments[0],
						F = [];
					for(var G = 1; G < arguments.length; G++) {
						F.push(arguments[G])
					}
					if(typeof i != "undefined" && typeof i[H] == "function") {
						switch(F.length) {
							case 4:
								return(i[H])(F[0], F[1], F[2], F[3]);
							case 3:
								return(i[H])(F[0], F[1], F[2]);
							case 2:
								return(i[H])(F[0], F[1]);
							case 1:
								return(i[H])(F[0]);
							default:
								return(i[H])()
						}
					}
					return null
				} else {
					p.push(arguments)
				}
			}
			x.playerReady = function(F) {
				D = true;
				if(!i) {
					x.setPlayer(g.getElementById(F.id))
				}
				x.container = g.getElementById(x.id);
				a.foreach(h, function(G) {
					j(i, G)
				});
				z(e.JWPLAYER_PLAYLIST_ITEM, function(G) {
					s = {}
				});
				z(e.JWPLAYER_MEDIA_META, function(G) {
					a.extend(s, G.metadata)
				});
				x.dispatchEvent(e.API_READY);
				while(p.length > 0) {
					w.apply(this, p.shift())
				}
			};
			x.getItemMeta = function() {
				return s
			};
			x.getCurrentItem = function() {
				return w("jwGetPlaylistIndex")
			};

			function u(H, J, I) {
				var F = [];
				if(!J) {
					J = 0
				}
				if(!I) {
					I = H.length - 1
				}
				for(var G = J; G <= I; G++) {
					F.push(H[G])
				}
				return F
			}
			return x
		};
		f.selectPlayer = function(i) {
			var h;
			if(!a.exists(i)) {
				i = 0
			}
			if(i.nodeType) {
				h = i
			} else {
				if(typeof i == "string") {
					h = g.getElementById(i)
				}
			}
			if(h) {
				var j = f.playerById(h.id);
				if(j) {
					return j
				} else {
					return f.addPlayer(new f(h))
				}
			} else {
				if(typeof i == "number") {
					return c[i]
				}
			}
			return null
		};
		f.playerById = function(i) {
			for(var h = 0; h < c.length; h++) {
				if(c[h].id == i) {
					return c[h]
				}
			}
			return null
		};
		f.addPlayer = function(h) {
			for(var i = 0; i < c.length; i++) {
				if(c[i] == h) {
					return h
				}
			}
			c.push(h);
			return h
		};
		f.destroyPlayer = function(j) {
			var i = -1,
				k;
			for(var m = 0; m < c.length; m++) {
				if(c[m].id == j) {
					i = m;
					k = c[m];
					continue
				}
			}
			if(i >= 0) {
				var n = k.id,
					h = g.getElementById(n + (k.renderingMode == "flash" ? "_wrapper" : ""));
				if(a.clearCss) {
					a.clearCss("#" + n)
				}
				if(h) {
					if(k.renderingMode == "html5") {
						k.destroyPlayer()
					}
					var l = g.createElement("div");
					l.id = n;
					h.parentNode.replaceChild(l, h)
				}
				c.splice(i, 1)
			}
			return null
		};
		d.playerReady = function(i) {
			var h = d.api.playerById(i.id);
			if(h) {
				h.playerReady(i)
			} else {
				d.api.selectPlayer(i.id).playerReady(i)
			}
		}
	})(jwplayer);
	(function(b) {
		var c = b.events,
			a = c.state;
		b.api.instream = function(e, k, o, r) {
			var j = e,
				d = k,
				i = o,
				l = r,
				g = {},
				q = {};

			function h() {
				j.callInternal("jwLoadInstream", o, r)
			}

			function n(s, t) {
				d.jwInstreamAddEventListener(t, 'function(dat) { jwplayer("' + j.id + '").dispatchInstreamEvent("' + t + '", dat); }')
			}

			function f(s, t) {
				if(!g[s]) {
					g[s] = [];
					n(d, s)
				}
				g[s].push(t);
				return this
			}

			function p(s, t) {
				if(!q[s]) {
					q[s] = [];
					f(c.JWPLAYER_PLAYER_STATE, m(s))
				}
				q[s].push(t);
				return this
			}

			function m(s) {
				return function(u) {
					var t = u.newstate,
						w = u.oldstate;
					if(t == s) {
						var v = q[t];
						if(v) {
							for(var x = 0; x < v.length; x++) {
								if(typeof v[x] == "function") {
									v[x].call(this, {
										oldstate: w,
										newstate: t,
										type: u.type
									})
								}
							}
						}
					}
				}
			}
			this.dispatchEvent = function(v, u) {
				if(g[v]) {
					var t = _utils.translateEventResponse(v, u[1]);
					for(var s = 0; s < g[v].length; s++) {
						if(typeof g[v][s] == "function") {
							g[v][s].call(this, t)
						}
					}
				}
			};
			this.onError = function(s) {
				return f(c.JWPLAYER_ERROR, s)
			};
			this.onFullscreen = function(s) {
				return f(c.JWPLAYER_FULLSCREEN, s)
			};
			this.onMeta = function(s) {
				return f(c.JWPLAYER_MEDIA_META, s)
			};
			this.onMute = function(s) {
				return f(c.JWPLAYER_MEDIA_MUTE, s)
			};
			this.onComplete = function(s) {
				return f(c.JWPLAYER_MEDIA_COMPLETE, s)
			};
			this.onSeek = function(s) {
				return f(c.JWPLAYER_MEDIA_SEEK, s)
			};
			this.onTime = function(s) {
				return f(c.JWPLAYER_MEDIA_TIME, s)
			};
			this.onVolume = function(s) {
				return f(c.JWPLAYER_MEDIA_VOLUME, s)
			};
			this.onBuffer = function(s) {
				return p(a.BUFFERING, s)
			};
			this.onPause = function(s) {
				return p(a.PAUSED, s)
			};
			this.onPlay = function(s) {
				return p(a.PLAYING, s)
			};
			this.onIdle = function(s) {
				return p(a.IDLE, s)
			};
			this.onInstreamClick = function(s) {
				return f(c.JWPLAYER_INSTREAM_CLICK, s)
			};
			this.onInstreamDestroyed = function(s) {
				return f(c.JWPLAYER_INSTREAM_DESTROYED, s)
			};
			this.play = function(s) {
				d.jwInstreamPlay(s)
			};
			this.pause = function(s) {
				d.jwInstreamPause(s)
			};
			this.seek = function(s) {
				d.jwInstreamSeek(s)
			};
			this.destroy = function() {
				d.jwInstreamDestroy()
			};
			this.getState = function() {
				return d.jwInstreamGetState()
			};
			this.getDuration = function() {
				return d.jwInstreamGetDuration()
			};
			this.getPosition = function() {
				return d.jwInstreamGetPosition()
			};
			h()
		}
	})(jwplayer);
	(function(a) {
		var b = a.api,
			c = b.selectPlayer;
		b.selectPlayer = function(d) {
			var e = c(d);
			if(e) {
				return e
			} else {
				return {
					registerPlugin: function(i, h, g, f) {
						a.plugins.registerPlugin(i, h, g)
					}
				}
			}
		}
	})(jwplayer)
}(function(a) {
	var c = "ga";
	var b = function(p, g, d) {
		var k = {
			trackingobject: "_gaq",
			idstring: "file"
		};
		var n = a.utils.extend({}, k, g);
		i("Initializing");
		if(typeof n.trackingobject == "string" && typeof window[n.trackingobject] == "undefined") {
			i("Could not setup because trackingobject is not defined.");
			return
		}

		function o() {
			if(typeof n.trackingobject == "string") {
				return window[n.trackingobject]
			}
			return n.trackingobject
		}

		function l(t, s) {
			if(t == undefined) {
				return ""
			}
			if(s != undefined && t[s] != undefined && t[s].length > 0) {
				if(s == "file") {
					return j(t[s])
				}
				return t[s]
			}
			if(t.file == undefined) {
				if(t.sources) {
					return r(t.sources)
				} else {
					if(t.levels) {
						return r(t.levels)
					}
				}
			}
			if(t.file != undefined) {
				return t.file
			}
			return ""
		}

		function r(s) {
			var t = [],
				u;
			for(u = s.length - 1; u >= 0; u--) {
				if(s[u]["file"]) {
					t.push(s[u]["file"])
				}
			}
			t.sort();
			return j(t[0])
		}

		function e(t) {
			var u = t.indexOf("://");
			var s = t.indexOf("?");
			return(u > 0 && (s < 0 || (s > u)))
		}

		function j(y, x) {
			if(e(y)) {
				return y
			}
			if(!x) {
				x = document.location.href
			}
			var z = x.substring(0, x.indexOf("://") + 3);
			var w = x.substring(z.length, x.indexOf("/", z.length + 1));
			var t;
			if(y.indexOf("/") === 0) {
				t = y.split("/")
			} else {
				var u = x.split("?")[0];
				u = u.substring(z.length + w.length + 1, u.lastIndexOf("/"));
				t = u.split("/").concat(y.split("/"))
			}
			var s = [];
			for(var v = 0; v < t.length; v++) {
				if(!t[v] || t[v] == ".") {} else {
					if(t[v] == "..") {
						s.pop()
					} else {
						s.push(t[v])
					}
				}
			}
			return z + w + "/" + s.join("/")
		}

		function h() {
			var t = false,
				v = "",
				u = false,
				s;
			p.onPlaylistItem(function(w) {
				t = true;
				n.pageURL = window.top == window ? window.location.href : document.referrer;
				n.currentItem = {};
				s = p.getPlaylistItem(w.index);
				n.currentItem.mediaID = v;
				v = l(s, n.idstring);
				n.currentItem.hidden = u;
				if(s["ova.hidden"]) {
					u = true
				} else {
					u = false
				}
			});
			p.onIdle(function(w) {
				t = true
			});
			p.onPlay(function(w) {
				if(t) {
					t = false;
					n.currentItem.mediaID = v;
					n.currentItem.hidden = u;
					q("JW Player Video Plays")
				}
			});
			p.onComplete(function(w) {
				q("JW Player Video Completes")
			})
		}

		function q(t) {
			var s = "Not tracked";
			if(!n.currentItem.hidden) {
				if(typeof o()._trackEvent != "undefined") {
					s = "Tracked Synchronously";
					m(t, n.currentItem.mediaID, n.pageURL)
				} else {
					if(typeof o().push != "undefined") {
						s = "Tracked Asynchronously";
						f(t, n.currentItem.mediaID, n.pageURL)
					}
				}
			} else {
				if(n.currentItem.hidden) {
					s += " - current item is hidden"
				}
			}
			i(s, {
				Category: t,
				Action: n.currentItem.mediaID,
				Label: n.pageURL
			})
		}

		function f(t, u, s) {
			o().push(["_trackEvent", t, u, s])
		}

		function m(t, u, s) {
			o()._trackEvent(t, u, s)
		}

		function i(t, s) {
			if(n.debug) {
				a.utils.log(c + ": " + t, s)
			}
		}
		h()
	};
	a().registerPlugin(c, "6.0", b)
})(jwplayer);
(function(b) {
	var a = b.utils;
	var c = function(f, z, C) {
		var o;
		var h;
		var k;
		var v;
		var B;
		var A;
		var r;
		var s;
		var l = {
			cursor: "pointer",
			position: "absolute",
			left: "120px",
			top: "20px",
			margin: "0px",
			padding: "0px",
			display: "block",
			width: "12px",
			height: "12px"
		};
		var q = {
			backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADICAYAAAAp8ov1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEdJREFUeNpilpSUvMHEwMDwn+k/EEBY+LkwFgMuCWINwDCPVB30cBoDaTpgBMMoQU2CkYkRCCAsNC6pEgyUGoBHYvA6DSDAAOnHjLU15EHNAAAAAElFTkSuQmCC)",
			backgroundRepeat: "no-repeat",
			backgroundSize: "100% 100%",
			opacity: 0,
			"z-index": 101,
			webkitTransition: "opacity 150ms linear",
			MozTransition: "opacity 150ms linear",
			msTransition: "opacity 150ms linear",
			transition: "opacity 150ms linear",
			cursor: "pointer",
			visibility: "hidden"
		};
		var t = {
			position: "absolute",
			border: "none",
			color: "#FFF",
			display: "block",
			font: "15px Arial",
			overflow: "hidden",
			width: "240px",
			margin: "0 0 0 0",
			textAlign: "center",
			textTransform: "none",
			padding: "0 0 0 0"
		};
		var E = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALVJREFUeNqsVMERhCAMzNmAJVgaJWAHlGIJluB1YAnYASXEwOVmctzCR3YmOia7a4IgkQEzO4nI/zg0amSuoxqSnCVOiSTh87Op7cZgrzReNafVkL79N/nJB9BVaDRz2DETMFu4jQWYpjK+rkMAy7B1DDfAz9NEUsIMCLFjGBvfgV/lIgAEpg5amuGG07ddoLk6fhcaOd8nLa5A9O4YotpavIZvm+Eb++HRc/DoPfw5eOtxCzAABeIMZWrWSG0AAAAASUVORK5CYII=";
		var x = function() {
			f.pause(true);
			C.style.visibility = "visible";
			C.style.opacity = 1;
			f.setControls(false);
			if(r == false) {
				G()
			}
		};

		function m(H) {
			if(z.onclick == "play") {
				f.load(H);
				f.play()
			} else {
				window.top.location = H.link
			}
		}

		function D(H) {
			if(z.oncomplete !== false) {
				setTimeout(F, 50)
			}
		}

		function F(H) {
			if(f.getState() == "IDLE") {
				x()
			}
		}

		function n(H) {
			if(H == v) {
				console.log("RELATED: Failed to load " + H)
			} else {
				console.log("RELATED: " + H)
			}
			A.innerHTML = "";
			B.innerHTML = "No related videos found";
			k[4] = 200;
			k[5] = 0;
			d(k[2], k[3])
		}

		function e(H) {
			setTimeout(w, 200);
			C.style.opacity = 0;
			f.setControls(true)
		}

		function w() {
			C.style.visibility = "hidden"
		}

		function u(I) {
			r = false;
			v = undefined;
			s = [];
			A.innerHTML = "";
			e();
			var H = f.getPlaylist()[I.index];
			if(z.file) {
				if(z.file.indexOf("MEDIAID") > 0 && H.mediaid) {
					v = z.file.replace("MEDIAID", H.mediaid)
				} else {
					if(z.file.indexOf("MEDIAID") == -1) {
						v = z.file
					}
				}
			}
			f.addButton(E, "Related Videos", x, "related")
		}

		function G() {
			r = true;
			if(v) {
				B.innerHTML = "";
				a.ajax(v, g, n)
			} else {
				n("No related videos file found")
			}
		}

		function g(I) {
			var K = [];
			try {
				K = b.html5.parsers.rssparser.parse(I.responseXML.firstChild)
			} catch(J) {
				a.log(J);
				n("This feed is not valid XML and/or RSS.");
				return
			}
			for(var H = 0; H < K.length; H++) {
				if(K[H].image && K[H].title && ((z.onclick == "play" && K[H].sources[0].file) || (z.onclick != "play" && K[H].link))) {
					s.push(K[H])
				}
			}
			y()
		}

		function y() {
			A.innerHTML = "";
			if(s !== undefined && s.length) {
				var J = 0;
				var K = 0;
				k[4] = 0;
				k[5] = 0;
				for(var I = 0; I < s.length; I++) {
					var H = b.related.thumb(k[0], k[1], s[I], m);
					A.appendChild(H);
					p(H, {
						left: ((k[0] + 10) * J) + "px",
						top: ((k[1] + 10) * K) + "px"
					});
					k[4] = Math.max(k[4], k[0] * (J + 1) + 10 * J);
					k[5] = Math.max(k[5], k[1] * (K + 1) + 10 * K);
					if((k[0] + 10) * (J + 2) > k[2]) {
						if((k[1] + 10) * (K + 2) > k[3] - 80) {
							break
						} else {
							K++;
							J = 0
						}
					} else {
						J++
					}
				}
				i("Related Videos");
				d(k[2], k[3])
			} else {
				n("RSS feed has 0 entries that contain title,link and image.")
			}
		}

		function j() {
			if(f.getRenderingMode() == "flash") {
				return
			}
			f.onPlaylistItem(u);
			f.onComplete(D);
			p(C, q);
			C.onclick = e;
			h = document.createElement("div");
			p(h, l);
			p(h, {
				background: "transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAItJREFUeNp8kUEOABEMRXUysXQnJ5k5GidxAmcxsbQxmiAlLUlD/df6UDnn1KK2eJQwUOtMAlwQ7TXG+B1ukxv5hRDRHT1ph5EFSRgN9tPh0E2drO6Xo7E8xk2TGKPSWi9NSilLPi2FEI6WrLV+FjAwe2ksAg4e3TgNCyoHS1bx4z4JxtH3hsXvF2AAnU9uUtSy19QAAAAASUVORK5CYII=)"
			});
			h.onclick = e;
			C.appendChild(h);
			B = document.createElement("div");
			i("Related Videos");
			p(B, t);
			C.appendChild(B);
			A = document.createElement("div");
			C.appendChild(A);
			p(A, {
				position: "absolute"
			})
		}
		f.onReady(j);
		f.onPlay(e);

		function i(H) {
			if(z.heading) {
				B.innerHTML = z.heading
			} else {
				B.innerHTML = H
			}
		}
		this.resize = function(I, H) {
			if(f.getRenderingMode() == "flash") {
				return
			}
			k = [140, 90, I, H, 200, 0];
			p(h, {
				left: (I - 32) + "px"
			});
			y()
		};

		function d(I, H) {
			p(C, {
				height: H + "px",
				width: I + "px"
			});
			p(h, {
				left: (I - 32) + "px"
			});
			p(A, {
				left: Math.round(I / 2 - k[4] / 2) + "px",
				top: Math.round(H / 2 - k[5] / 2) + "px"
			});
			p(B, {
				left: Math.round(I / 2 - k[4] / 2) + "px",
				width: k[4] + "px",
				top: Math.round(H / 2 - k[5] / 2 - 30) + "px"
			})
		}

		function p(H, I) {
			for(var J in I) {
				H.style[J] = I[J]
			}
		}
	};
	b().registerPlugin("related", "6.0", c)
})(jwplayer);
(function(a) {
	if(a.related) {
		return
	}
	a.related = {};
	a.related.thumb = function(f, h, n, p) {
		var c;
		var e = {
			webkitBoxShadow: "0 0 4px #000",
			MozBoxShadow: "0 0 4px #000",
			msBoxShadow: "0 0 4px #000",
			boxShadow: "0 0 4px #000",
			backgroundColor: "#000",
			backgroundSize: "cover",
			position: "absolute",
			textDecoration: "none",
			display: "block",
			margin: "0 0 0 0",
			padding: "0 0 0 0",
			overflow: "hidden"
		};
		var k;
		var o = {
			psition: "absolute",
			left: "0px",
			top: "0px",
			border: "none",
			margin: "0 0 0 0",
			padding: "0 0 0 0"
		};
		var m;
		var j = {
			backgroundColor: "rgba(0,0,0,0.8)",
			left: "0px",
			position: "absolute",
			border: "none",
			color: "#CCC",
			display: "block",
			font: "11px Arial",
			margin: "0 0 0 0",
			textAlign: "center",
			textDecoration: "none",
			textTransform: "none",
			padding: "5px"
		};

		function g(q) {
			d(c, {
				webkitBoxShadow: "0 0 4px #FFF",
				MozBoxShadow: "0 0 4px #FFF",
				msBoxShadow: "0 0 4px #FFF",
				boxShadow: "0 0 4px #FFF"
			});
			d(m, {
				color: "#FFF"
			})
		}

		function l(q) {
			d(c, {
				webkitBoxShadow: "0 0 4px #000",
				MozBoxShadow: "0 0 4px #000",
				msBoxShadow: "0 0 4px #000",
				boxShadow: "0 0 4px #000"
			});
			d(m, {
				color: "#CCC"
			})
		}

		function b(q) {
			p(n)
		}

		function i() {
			c = document.createElement("div");
			c.onclick = b;
			c.onmouseout = l;
			c.onmouseover = g;
			d(c, e);
			d(c, {
				backgroundImage: "url(" + n.image + ")",
				width: (f - 2) + "px",
				height: (h - 2) + "px"
			});
			k = document.createElement("img");
			k.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABGCAYAAABL0p+yAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAACF9JREFUeNrsXYtO20gUtccWILoIFgS0IKDQAoUusEBBS///c6IQqwIJoqAdT/z2PO487NjJvZIJNxBnYE7u48yxx/9+9PWCEOL5vs+O+HuhH3+fPOcnzyl9Ep8nPwfhPU/i1xV+XvOn75s9L/Tzx3zs0/eR+tnY8/FwfXZ+kT89Vzqe9G+c/r2A8ZD0/arjkYxPOp7qXObnIjwf9Cg6d35o2Ds9BmHxRKXJVvnFx3QCMj8HoxwMKbBVk0+4wK5NttQHgrEABp8UPjAp0AsTkE1izSecD15hElW+8P0lj+n7p/9P3vikwK7Mla/y87nSBN4fegzpOV5jJwyCoBKZ9MAommzloyjqEc5kC31RlFX5kKjrK8AgGZ8QjNXIIwcjOMpVo3Ap6laBzQ8SNaAD5jA2IPgmCfAG9HXj4g/CIrCqqbYc5UQD9hVgsABjEfhKMGpEIgswlic5PxfJokHFTya/6kujnBYYFFEZEnU1wagR9eI0+0yPEX3tB+8X4ClYI+U2DsZq/ecIjOk/O32/ul+s88RgFEZhk5TrHIwAcBIxGIFR74UeEX1tpPpFsxTMmfz8ky9qYAp1HdfnROEC+KQ+AUSiki+rpzh1FNfXTLktglEUdUt+YW7LPil/8IhWkzFK6rs3aEEoTcFyMHD+AE0wQrpZcdQV+LXuWu7Lu1lRlJOkYOnkE/4HURp1+d2s0NfoZqH1oAJ4cX03TCLe2NO0kNAIqAQfB4zcbtaku4V0r6UOzITa4Ly/KCprp1wVGCDg1AMjr6Fx0c1qUivvSVMReRYWBoRoDhhIrTQCRnueTZpypSlY3M3CqQ07Dq/a3WY+mEN0Qq2UaBRbYxFQRCA7o1a0GwhFai0V+SKS1STlWgK9RTDqNRBAqoU+7/ncJkNIo9gDENLdzrqbhRLKgkhgRigbdLNgDtFVNytb3ZCDERj1lDSKNQADKRjUYAR1t8putgFCGdxNmoARSiibjEcMRtNu1oBQBtMoTlKwiGqpURc6dV4J0C5TriWhbA1GCfWiAUZ5nQdvaGxSLifqadMobiKgDqGsmmSnS21mYJR2sxqEMoxaEVAtEGpFVedJga6XciWEshWN4qQG9B1EOSNC2WppSxV1Ad2sorsV11mVyfZFvizqVsdnSygTALBLUc8JjeIuBTtMudarG5pg7LM8SkUoy31IPZjPTQI8pzSK4y7YjVYPRijry6Oa1eoZ8my6qxuWWj1DQnlCj0ZoFDcAtNLqFf2OaPVMRAkgrR4w5XZHq/dOj0ZpFPsmhCdGcCKPklAXHdTqma8mmKRgt/IoTnf7Qo+Izm3kddzqcqwOyaOqEzSf8ijoeABg9PwR/TIMw/DN64nJ5VgtglHd0MC0ei6A3h2tHohqieu7YRzxKPDGXs8sLAKp+1o929UNS60emNBuXquX1HeDpaWlyOux5SkYrBJpSKunSyg71+qZy6NU4zG58kyyhvsnjnjLy8uv3hzYNAXPUB4F5xRno9XTJ5Rt5FrCBofRKPS5AQXe2Jsjq6dg68sidVc39LR6XZVHyTlE1bXUAjDSNEu/PFN/tLKy8uHNoRVSsIFWz3hpC6rVK/ouo24HtXp+6XUv9Hej1dXVyJtzy1JwtZt1Tij3UaunkEeZavVEKZc+jugzw09/fXrzFsRCEhCFPKrhi7+dyKNIZ7R6BvIoRqPQ5yIKvLG3YBYWU9zMtXpObosh4Bgbl0fppdy4voubirW1tchbYAsDElho9YBpsUmtnsllkaArz3QJZZhWz0tolPX19VcPbZqCXcujzC/+7opWzzmhPKF+DLwBBd4YYVeNgBqrG+CLv53Lo4DdrEN5lK1Wj61WEP85bi42NjY+EG4cAJY+qb3T6jm+E4GCWtGQRzE1yt+bmxFCTEnDkI5q9aAp10yrJ5JHcX0ooe2TUVzfbW5tviG0wF1wYKEaMetmtQnlLmn1KgCP6zv6OqZG2drawvrOJAI2qdXrvzxKGHWZGmV7exvTrPVaMHCtVny9rwt5lOXqRktavaSbHe7s7CCN4i4Fq7V67d6JQMIxNnhbDKEihqVZxt8NdnZ3Mc26T8GOL/5uVKtnurqh0OrxtXvsop6YRtn9/BlplHZSsGOtnpDQVmv13F/8Db4SjdEoX/a+YH032xQsoC56Jo/S0OoxGmVvbw9plFZTsPVGLS2B0dlGLaUaMruoZ39/H+u7WURAkYq43Y1a2tHqFYAdq40HBwcHmGZnXQM2K48y36hFBUbDjVoYjXJweIg0SjdScOBUq9dNeVScZj1GoxweHWGa7WQEnKFWr8HVjYxGOfp6hDRKJwEYEMuNWhTCgdls1MJolOPjY6zv+hIB3Wj12pNH8XwvoVFOTk6QRulNDZjwgO52DWpIqyfeNSijUU6+fcP6rn8pOKhr9WxSLkCrZyqPqvhMjfL99BTTbP9TcF+0en52b5TTszOkUeZmJaT78qhJArzB2fkZptn5ioBBl3cNSm4x64/Of5wjjTK/EbD9jVoUYGQ0yo+LC6zvFqEG7MpGLaka5eLyEmmUxUvBwO7WvVYvo1Euf/7E+m5Rm5AZyKNofecN/rm6wjS76BGwTa1eem+Uq+srpFHQch7QhTxKckPxCT0Do1Gubq4xzaIpeEAAGIEpN1OjXN/cII2CJucBHSpSGI3y7+0t1ndolilYA4wpjXJ7d4c0CppuCjau/ybx9lBxxLu7v8f6Ds00BWvLo5ga5f7hF6ZZNNsICN81iIkCPH/46/EBaRQ0ewD6NUU0t5vN1CgPj4+YZtEcRsA0BUs2PI536qHAQxoFrYEaMCC8bpbRKP89PWF9h9Z8BCxcB8w2PH76/RtpFLS2uuDk3ijEjyjwsL5Da9X+F2AAdhpbcs9KP5oAAAAASUVORK5CYII=");
			d(k, o);
			d(k, {
				width: f - 2 + "px",
				height: h - 20 + "px"
			});
			c.appendChild(k);
			m = document.createElement("div");
			m.innerHTML = n.title;
			d(m, j);
			var q = Math.ceil(n.title.length * 6 / f);
			d(m, {
				width: (f - 10) + "px",
				top: (h - 8 - q * 16) + "px"
			});
			c.appendChild(m);
			return c
		}

		function d(q, r) {
			for(var s in r) {
				q.style[s] = r[s]
			}
		}
		return i()
	}
})(jwplayer);
(function(b) {
	var a = b.sharing = {},
		d = window;
	var c = function(g, u, y) {
		var w;
		var t;
		var j;
		var C;
		var z = "http://www.facebook.com/sharer/sharer.php?u=";
		var x;
		var v;
		var D;
		var l;
		var h;
		var B = "http://twitter.com/intent/tweet?url=";
		var e;

		function m(F) {
			var E = z + encodeURIComponent(D);
			d.open(E, "_blank");
			d.focus();
			return false
		}

		function f(E) {
			if(E.target == y) {
				setTimeout(s, 200);
				y.style.opacity = 0;
				g.setControls(true)
			}
		}

		function s() {
			y.style.visibility = "hidden"
		}

		function q(F) {
			setTimeout(s, 200);
			y.style.opacity = 0;
			g.setControls(true);
			var E = g.getPlaylist()[F.index];
			w = undefined;
			if(u.code) {
				if(u.code.indexOf("MEDIAID") > 0 && E.mediaid) {
					w = u.code.replace("MEDIAID", E.mediaid)
				} else {
					if(u.code.indexOf("MEDIAID") == -1) {
						w = u.code
					}
				}
			}
			if(w && w.substr(0, 3) == "%3C") {
				w = decodeURIComponent(w)
			}
			D = d.location.toString();
			if(d.top != d) {
				D = document.referrer
			}
			if(u.link) {
				if(u.link.indexOf("MEDIAID") > 0 && E.mediaid) {
					D = u.link.replace("MEDIAID", E.mediaid)
				} else {
					if(u.link.indexOf("MEDIAID") == -1) {
						D = u.link
					}
				}
			}
			if(x) {
				t.setText(w);
				l.setText(D);
				if(w) {
					o(t.getDiv(), {
						left: "0px",
						top: "30px",
						display: "block"
					});
					o(l.getDiv(), {
						left: "0px",
						top: "72px"
					});
					o(C, {
						left: "80px",
						top: "114px"
					});
					o(h, {
						left: "120px",
						top: "114px"
					});
					o(e, {
						left: "160px",
						top: "114px"
					})
				} else {
					o(t.getDiv(), {
						display: "none"
					});
					o(l.getDiv(), {
						left: "0px",
						top: "30px"
					});
					o(C, {
						left: "80px",
						top: "72px"
					});
					o(h, {
						left: "120px",
						top: "72px"
					});
					o(e, {
						left: "160px",
						top: "72px"
					})
				}
				n()
			}
		}
		this.resize = function(F, E) {
			if(g.getRenderingMode() == "flash" || !x) {
				return
			}
			j = [F, E];
			n()
		};

		function n() {
			o(y, {
				width: j[0] + "px",
				height: j[1] + "px",
				backgroundPosition: (j[0] - 32) + "px 18px,center center"
			});
			t.resize(j[0]);
			l.resize(j[0]);
			var F = Math.round(j[0] / 2 - t.getWidth() / 2);
			var E = Math.round(j[1] / 2 - 50);
			if(w) {
				E -= 20
			}
			o(x, {
				left: F + "px",
				top: E + "px"
			})
		}

		function i() {
			if(g.getRenderingMode() == "flash") {
				return
			}
			g.onPlaylistItem(q);
			g.addButton("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAMxJREFUeNpiYCAR/P//nx+I1/9HgP0gMQYyDKr/jwn2k2PQfSwG/WchwQB/IBUAxAp4FQHxfCDuB2J9JHF9qNj7//jBe5DieCwSIM3nsYiDAjkfi8HxjGDTGBgE8PjqAhAvAGFGRsaPUJfKA6kEqPwGoPhFBjzORfEmIcCERw4UqB9Iic75BAJyPtQrILX20HSUj5EIoSkVZth7qJfssaSX9egxBbOAGNfG40qAMNdSI1ugZA0mIs3awEAtgMOL8eQYpI9mWD+yPECAAQD6jshl3zhTjgAAAABJRU5ErkJggg==", "Share Video", function() {
				r()
			}, "share");
			y.style.visibility = "hidden";
			y.onclick = f;
			p()
		}
		g.onReady(i);

		function p() {
			o(y, {
				backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAItJREFUeNp8kUEOABEMRXUysXQnJ5k5GidxAmcxsbQxmiAlLUlD/df6UDnn1KK2eJQwUOtMAlwQ7TXG+B1ukxv5hRDRHT1ph5EFSRgN9tPh0E2drO6Xo7E8xk2TGKPSWi9NSilLPi2FEI6WrLV+FjAwe2ksAg4e3TgNCyoHS1bx4z4JxtH3hsXvF2AAnU9uUtSy19QAAAAASUVORK5CYII=),url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADICAYAAAAp8ov1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEdJREFUeNpilpSUvMHEwMDwn+k/EEBY+LkwFgMuCWINwDCPVB30cBoDaTpgBMMoQU2CkYkRCCAsNC6pEgyUGoBHYvA6DSDAAOnHjLU15EHNAAAAAElFTkSuQmCC)",
				backgroundPosition: "right top,center center",
				backgroundRepeat: "no-repeat,no-repeat",
				backgroundSize: "auto auto,100% 100%",
				opacity: 0,
				"z-index": 101,
				webkitTransition: "opacity 150ms linear",
				mozTransition: "opacity 150ms linear",
				msTransition: "opacity 150ms linear",
				oTransition: "opacity 150ms linear",
				transition: "opacity 150ms linear",
				cursor: "pointer"
			});
			x = document.createElement("div");
			y.appendChild(x);
			o(x, {
				cursor: "default",
				position: "absolute",
				border: "none",
				width: "320px"
			});
			v = document.createElement("div");
			if(typeof(u.heading) == "string") {
				v.innerHTML = u.heading
			} else {
				v.innerHTML = "Share Video"
			}
			o(v, {
				position: "absolute",
				border: "none",
				color: "#FFF",
				display: "block",
				font: "15px Arial",
				overflow: "hidden",
				width: "230px",
				height: "20px",
				left: "80px",
				margin: "0 0 0 0",
				textTransform: "none",
				textShadow: "#000 1px 1px 0",
				padding: "0 0 0 0"
			});
			x.appendChild(v);
			t = new a.row("Embed code");
			x.appendChild(t.getDiv());
			l = new a.row("Video link");
			x.appendChild(l.getDiv());
			C = a.shortcut("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARlJREFUeNpiTKzdzEAbwPL/PwPtjP4/FF3NQDOj/5Hl7O9fv3//9v3d63fIgipaKqiu/key0UATFSW5jSzVUyIskcWjKzZS5GqgY4Nc1VMjrDCl0Iwi2WhVWX6s5mIxmtTEpyYrgEvqP7qrSQzrZKTw/fP336odV24+/HD17musKYS0OGRiZERoZma68fDDlTuvqZn44ODS7VeUZvQndx5gFX98+z6cLaOiQE5Yn91SSlDcN28VNQOEmumaBKMpKVSBZsETzJJtVzDTNVGmuGUuhzB2TY9ETohwceonPjzaaWk0GYUqSrnxb0Bc/ePrV0qMxqOdRUVVmhKj8Whn+fXjFyVG49HORLMKfYgazUKqhtCytUSqBAgwAPLTpnqcD79pAAAAAElFTkSuQmCC", "Facebook", m);
			x.appendChild(C);
			h = a.shortcut("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAcpJREFUeNpiXPX1OwNtABMDzQDL/380M/ofAw2N/j8UwxqHoy9cuN3Ttpzh2w8GLo6M3AAbWz2Sjf6LI0D6J25hEJJhEGZi+P9v9oJ9lra6pIc1Dlf/5RFjYGSEslnZb995rqwsSaqrcQAODmSeID/XX9LTNY7kx8aGzBMR4f/17x91XM3Izo7MjU+fgUURF2tOqpuOhjRpYc3AiuJqRkVNLGr+/5+x9MSkpmASswyqq3GBv2xSuEzAndFRwxoX4GHHaQLLX1x5hpWdGHPbfRR//yfV1eworj6WiSU3/vn/78b37z///MNhNC6z2VBcfeTDZzJKvn/EpJDTt18bqwqTmK5xJT52lNy49szj/4yMXOysQLacGCcnGwsFGZ2NFZn3T1xh9ZknDH//gDi/fjL8Belj52bxsZAzUODHVahid7akAOfL76hScmpoan79/rnx8kt9eT7SUkiEEsvE24wE6hE2tv9c3P8YfpCWrlWEfrvJ8Ox6RcB0MXaGv/+/kxbWT379jpb/oSvIufgZw6ufOM2tVv7z7DfpjYWrX77LcP6Zo8PBwYjd7T/+/7/45SsuE4CuxlcKP/n5E4gGX43+j1bNEFq6GiDAAP9eqmJ8yUAWAAAAAElFTkSuQmCC", "Twitter", A);
			x.appendChild(h);
			e = a.shortcut("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAIAAAC0Ujn1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9pJREFUeNqslllLa0EMxzvTqnVfaF9cUBRFBDf02e/pt3F/EtxAEEEUxA0fxF1Pa/2d82/jOL334cINeJqZJP9JMknG3Orq6t3dXbVa/fpPBBSAwLrb29uBgYFKRrmA8vm8GFT5eu8xy/0mdCQNTWq1Wltb2/39vQPx4+PDOYdSpGrGti9j439ELpf3PzqgtbS0eJxvbW2VR1I10PAk7UtNxhLJxNWcmcAUCgVgfblcXltbIwTD4kv4BhSmhWDFi7EgfN4jU6LBBbBUKnkWy8vLLAjBHJFTOqCx8ysbtm+eUgboF4vF9fV1ADnGg4LLQkdgqmEesMHL6MaijCkPgAAFA6x7fX1lN0mS9/f3w8PDlZWVz8/P3F8oKhvMLTJEGxsb8/PzOEoC5FAqY4HLU1NTiGFCg/B+olsl49rBHMPp6emOjg4lFpGn+Ezc19c3OTlJUNRMmJYwCc1BYIgJhp2dnVY5KbQcrGZEjvr7+ycmJnSrVjCqFrtkta54QhQuhvBA60ivHnMZwaghu7q6RkdHMdBtcA0Cko51M1/SitrY2Bh5AM6kSUY+aZBrENlob2/HgDIyAx2gr6mhgFoxI4lE8p2qSolF9vslvqenB4/wfWtri2OkQ0zKIF/ShQgF1EgxIu0bk0IrzFrWS0lSMe+6u7tJyMjIyObmJkBhNoSLiJhQUxAWuqXBRx5BOpkvSYcBYnt7m/ClCcOSTQ4GN6u/2FaO168xHLg6WSnq7e0ltKGhoZ2dHQInOTDDw8OIwFUVhKM+dN9dX19nnQN6LRrB8PQnjfD4+AjW1dUVm4ODg1jRAcfHx3Nzc2FziqxF06cgGjfGHB0dMRCY5syAl5cXNQKW+Kvu3d3dnZmZCdvHJnha2mElKjNiwF1aWnp+fmYHPSpX1Q1TKOQ54+3tbXFxEd/DlMJUKvVCcApT53xlgxH+5ORkYWEB4+bnJsoA2d/f38f38BmqD3HOt6JhzRdcBhhJkC/6UgZqd8UnHhGJinxX+frGhKtZ0ZyenuIvBio1lVHWAuncsY7QbJMCY5n7xFAVrFJOX4/Ly0s45fHs7Ax/wbU3UEnQ7UUvskj1p8s4ODgYHx+3BKZeCxpcDufetPxXwhBzQLRMT1Vo5+fns7OziKM8WKMaNaZNXU1PaJaBCuaAAFWfIfxdXFxwxQ8PD1aCclzXJSwrTU2bsNp0b/Qkxzw9PQEFYPofBD/UP/3W/KyEbflHHn/tDsJ9xgMPrKcb9b6EvaNCtNFMsFFtaWnRhC8GUAQNbGFvb895Vy6VaVzVo3mtZfO/egKVyL6mj083NzfAfgswACBs40J0KAZ5AAAAAElFTkSuQmCC", "Email", k);
			x.appendChild(e)
		}

		function r() {
			if(g.getState() == "PLAYING") {
				g.pause()
			}
			y.style.visibility = "visible";
			y.style.opacity = 1;
			g.setControls(false)
		}

		function o(E, F) {
			for(var G in F) {
				E.style[G] = F[G]
			}
		}

		function A(F) {
			var E = B + encodeURIComponent(D);
			d.open(E, "_blank");
			d.focus();
			return false
		}

		function k(F) {
			var E = "mailto:?body=" + encodeURIComponent(D);
			d.open(E, "_blank");
			d.focus();
			return false
		}
	};
	b().registerPlugin("sharing", "6.0", c)
})(jwplayer);
(function(a) {
	a.row = function(m) {
		var g;
		var f = {
			border: "none",
			position: "absolute",
			left: "0px",
			width: "312px",
			height: "30px",
			margin: "0 0 0 0",
			padding: "0 0 0 0"
		};
		var p;
		var i = {
			position: "absolute",
			left: "80px",
			top: "0px",
			font: "11px Arial",
			webkitBoxShadow: "0 0 4px #000",
			MozBoxShadow: "0 0 4px #000",
			msBoxShadow: "0 0 4px #000",
			oBoxShadow: "0 0 4px #000",
			boxShadow: "0 0 4px #000",
			padding: "0px 5px",
			background: "#FFF",
			width: "190px",
			height: "28px",
			margin: "0 0 0 0",
			border: "none"
		};
		var o;
		var l = {
			border: "none",
			color: "#FFF",
			display: "block",
			font: "12px Arial",
			overflow: "hidden",
			width: "74px",
			position: "absolute",
			top: "10px",
			left: "0px",
			textAlign: "right",
			textTransform: "none",
			padding: "0 0 0 0"
		};
		var e;
		var d = {
			position: "absolute",
			left: "275px",
			background: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAcCAIAAAAvP0KbAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5JREFUeNpisre3Z/r37x8c////H4VPjjgeMYAAAwBV/1FjCd0OtgAAAABJRU5ErkJggg==)",
			backgroundSize: "100% 100%",
			color: "#FFF",
			font: "11px Arial",
			width: "50px",
			height: "28px",
			margin: "0 0 0 0",
			textAlign: "center",
			webkitBoxShadow: "0 0 4px #000",
			MozBoxShadow: "0 0 4px #000",
			msBoxShadow: "0 0 4px #000",
			oBoxShadow: "0 0 4px #000",
			boxShadow: "0 0 4px #000",
			padding: "0px 5px",
			border: "none",
			cursor: "pointer"
		};
		var q = {
			webkitBoxShadow: "0 0 4px #FFFFFF",
			MozBoxShadow: "0 0 4px #FFFFFF",
			msBoxShadow: "0 0 4px #FFFFFF",
			oBoxShadow: "0 0 4px #FFFFFF",
			boxShadow: "0 0 4px #FFFFFF"
		};
		var b = {
			webkitBoxShadow: "0 0 4px #000",
			MozBoxShadow: "0 0 4px #000",
			msBoxShadow: "0 0 4px #000",
			oBoxShadow: "0 0 4px #000",
			boxShadow: "0 0 4px #000"
		};
		this.getDiv = function() {
			return g
		};
		this.setText = function(r) {
			p.setAttribute("value", r)
		};
		this.getWidth = function() {
			return parseInt(e.style.left) + 50
		};
		this.resize = function(r) {
			var s = r - 230;
			if(s < 100) {
				s = 100
			} else {
				if(s > 400) {
					s = 400
				}
			}
			var t = 89 + s;
			c(p, {
				width: s + "px"
			});
			c(e, {
				left: t + "px"
			})
		};

		function j() {
			g = document.createElement("div");
			c(g, f);
			o = document.createElement("label");
			o.innerHTML = m;
			g.appendChild(o);
			c(o, l);
			p = document.createElement("input");
			p.setAttribute("type", "text");
			try {
				document.createEvent("TouchEvent")
			} catch(r) {
				p.setAttribute("readonly", "readonly")
			}
			c(p, i);
			g.appendChild(p);
			e = document.createElement("button");
			e.innerHTML = "Select";
			e.onclick = n;
			e.onmouseover = k;
			e.onmouseout = h;
			c(e, d);
			g.appendChild(e)
		}

		function k() {
			c(p, q);
			c(e, q)
		}

		function h() {
			c(p, b);
			c(e, b)
		}

		function n() {
			p.select()
		}

		function c(r, s) {
			for(var t in s) {
				r.style[t] = s[t]
			}
		}
		j()
	}
})(jwplayer.sharing);
(function(a) {
	a.shortcut = function(b, k, l) {
		var e;
		var d = {
			cursor: "pointer",
			position: "absolute",
			border: "none",
			color: "#FFF",
			display: "block",
			font: "11px/18px Arial,sans-serif",
			margin: "0 0 0 0",
			textAlign: "left",
			textDecoration: "none",
			textTransform: "none",
			padding: "0 0 0 10px",
			width: "30px",
			height: "30px"
		};
		var i;
		var h = {
			webkitBoxShadow: "0 0 4px #000",
			MozBoxShadow: "0 0 4px #000",
			msBoxShadow: "0 0 4px #000",
			oBoxShadow: "0 0 4px #000",
			boxShadow: "0 0 4px #000",
			position: "absolute",
			left: "0px",
			top: "0px",
			width: "30px",
			height: "30px",
			margin: "0 0 0 0",
			padding: "0 0 0 0"
		};

		function f(m) {
			c(i, {
				webkitBoxShadow: "0 0 4px #FFF",
				MozBoxShadow: "0 0 4px #FFF",
				msBoxShadow: "0 0 4px #FFF",
				oBoxShadow: "0 0 4px #FFF",
				boxShadow: "0 0 4px #FFF"
			})
		}

		function j(m) {
			c(i, {
				webkitBoxShadow: "0 0 4px #000",
				MozBoxShadow: "0 0 4px #000",
				msBoxShadow: "0 0 4px #000",
				oBoxShadow: "0 0 4px #000",
				boxShadow: "0 0 4px #000"
			})
		}

		function g() {
			e = document.createElement("div");
			e.onclick = l;
			e.onmouseout = j;
			e.onmouseover = f;
			c(e, d);
			i = document.createElement("img");
			i.setAttribute("src", b);
			c(i, h);
			e.appendChild(i);
			return e
		}

		function c(m, n) {
			for(var o in n) {
				m.style[o] = n[o]
			}
		}
		return g()
	}
})(jwplayer.sharing);