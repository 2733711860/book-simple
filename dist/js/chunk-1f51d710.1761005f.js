(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1f51d710"],{"365c":function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"e",(function(){return y})),r.d(t,"d",(function(){return h})),r.d(t,"b",(function(){return m})),r.d(t,"c",(function(){return b}));r("19d8");var n=r("b46d"),o=r("cebe"),i=r.n(o),a={headers:{"Content-Type":"application/json; charset=UTF-8",Authorization:null},timeout:3e4,emulateJSON:!0,withCredentials:!1,responseType:"json",maxContentLength:2e3,validateStatus:function(e){return e>=200&&e<300},maxRedirects:5},c=r("7503"),s=r.n(c);const l=(e="加载中...")=>{n["a"].loading({forbidClick:!0,duration:0,message:e})},u=()=>{n["a"].clear()};function f(e,t={}){return new Promise((r,n)=>{i.a.get(e,{params:t},a).then(e=>{r(e.data)}).catch(e=>{n(e)})})}i.a.interceptors.request.use(e=>(l(),"get"===e.method&&(e.paramsSerializer=function(e){return s.a.stringify(e,{arrayFormat:"repeat"})}),e),e=>Promise.reject(err)),i.a.interceptors.response.use(e=>(u(),202001==e.data.code&&router.push({path:"/login",query:{redirect:router.currentRoute.fullPath}}),e),e=>(u(),Promise.reject(e)));const p="https://www.fastmock.site/mock/f5b0436d25760cd9e4b88fdf3de4d459/api",d=e=>f(p+"/crawl/biquge/search",e),y=e=>f(p+"/get/biquge/search",e),h=e=>f(p+"/get/biquge/detail",e),m=e=>f(p+"/get/biquge/chapter",e),b=e=>f(p+"/get/biquge/content",e)},"4e22":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"all-page searchPage"},[r("van-nav-bar",{scopedSlots:e._u([{key:"title",fn:function(){return[r("van-search",{attrs:{"show-action":"",autofocus:"",shape:"round",background:"#fff",placeholder:"请输入搜索关键词"},on:{search:e.onSearch,cancel:e.onCancel},model:{value:e.keyWord,callback:function(t){e.keyWord=t},expression:"keyWord"}})]},proxy:!0}])}),r("div",{staticClass:"page-content"},[e._l(e.resultList,(function(t,n){return r("van-field",{key:n,attrs:{label:"["+t.bookType+"]",readonly:"","input-align":"right"},on:{click:function(r){return e.goDetail(t)}},model:{value:t.bookName,callback:function(r){e.$set(t,"bookName",r)},expression:"item.bookName"}})})),e.resultList&&!e.isDeepResult?r("div",{staticClass:"search-tips"},[e._v("没有想要的结果？试试"),r("span",{on:{click:e.deepSearch}},[e._v("深度搜索")])]):e._e()],2)],1)},o=[],i=(r("f557"),r("8fdf")),a=r("365c"),c={data(){return{keyWord:"",resultList:"",isDeepResult:!1}},methods:{onSearch(){this.keyWord?Object(a["e"])({keyWord:this.keyWord}).then(e=>{200==e.status?(this.isDeepResult=!1,this.resultList=e.data):Object(i["a"])(e.msg)}).catch(()=>{Object(i["a"])("网络异常，请稍后再试")}):Object(i["a"])("请输入检索关键字")},deepSearch(){this.keyWord?Object(a["a"])({keyWord:this.keyWord}).then(e=>{200==e.status?(this.isDeepResult=!0,this.resultList=e.data):Object(i["a"])(e.msg)}).catch(()=>{Object(i["a"])("网络异常，请稍后再试")}):Object(i["a"])("请输入检索关键字")},goDetail(e){this.$router.push({path:"/detail",query:{bookId:e.bookId}})},onCancel(){history.go(-1)}}},s=c,l=(r("ef77"),r("7fcb"),r("5d22")),u=Object(l["a"])(s,n,o,!1,null,"a8085d70",null);t["default"]=u.exports},"5c28":function(e,t,r){},"648d":function(e,t,r){"use strict";var n=r("7a9a"),o=r("e94a"),i=Object.prototype.hasOwnProperty,a={brackets:function(e){return e+"[]"},comma:"comma",indices:function(e,t){return e+"["+t+"]"},repeat:function(e){return e}},c=Array.isArray,s=Array.prototype.push,l=function(e,t){s.apply(e,c(t)?t:[t])},u=Date.prototype.toISOString,f=o["default"],p={addQueryPrefix:!1,allowDots:!1,charset:"utf-8",charsetSentinel:!1,delimiter:"&",encode:!0,encoder:n.encode,encodeValuesOnly:!1,format:f,formatter:o.formatters[f],indices:!1,serializeDate:function(e){return u.call(e)},skipNulls:!1,strictNullHandling:!1},d=function(e){return"string"===typeof e||"number"===typeof e||"boolean"===typeof e||"symbol"===typeof e||"bigint"===typeof e},y=function e(t,r,o,i,a,s,u,f,y,h,m,b,g,v){var j=t;if("function"===typeof u?j=u(r,j):j instanceof Date?j=h(j):"comma"===o&&c(j)&&(j=n.maybeMap(j,(function(e){return e instanceof Date?h(e):e}))),null===j){if(i)return s&&!g?s(r,p.encoder,v,"key",m):r;j=""}if(d(j)||n.isBuffer(j)){if(s){var O=g?r:s(r,p.encoder,v,"key",m);return[b(O)+"="+b(s(j,p.encoder,v,"value",m))]}return[b(r)+"="+b(String(j))]}var w,k=[];if("undefined"===typeof j)return k;if("comma"===o&&c(j))w=[{value:j.length>0?j.join(",")||null:void 0}];else if(c(u))w=u;else{var x=Object.keys(j);w=f?x.sort(f):x}for(var S=0;S<w.length;++S){var N=w[S],C="object"===typeof N&&void 0!==N.value?N.value:j[N];if(!a||null!==C){var D=c(j)?"function"===typeof o?o(r,N):r:r+(y?"."+N:"["+N+"]");l(k,e(C,D,o,i,a,s,u,f,y,h,m,b,g,v))}}return k},h=function(e){if(!e)return p;if(null!==e.encoder&&void 0!==e.encoder&&"function"!==typeof e.encoder)throw new TypeError("Encoder has to be a function.");var t=e.charset||p.charset;if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var r=o["default"];if("undefined"!==typeof e.format){if(!i.call(o.formatters,e.format))throw new TypeError("Unknown format option provided.");r=e.format}var n=o.formatters[r],a=p.filter;return("function"===typeof e.filter||c(e.filter))&&(a=e.filter),{addQueryPrefix:"boolean"===typeof e.addQueryPrefix?e.addQueryPrefix:p.addQueryPrefix,allowDots:"undefined"===typeof e.allowDots?p.allowDots:!!e.allowDots,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:p.charsetSentinel,delimiter:"undefined"===typeof e.delimiter?p.delimiter:e.delimiter,encode:"boolean"===typeof e.encode?e.encode:p.encode,encoder:"function"===typeof e.encoder?e.encoder:p.encoder,encodeValuesOnly:"boolean"===typeof e.encodeValuesOnly?e.encodeValuesOnly:p.encodeValuesOnly,filter:a,format:r,formatter:n,serializeDate:"function"===typeof e.serializeDate?e.serializeDate:p.serializeDate,skipNulls:"boolean"===typeof e.skipNulls?e.skipNulls:p.skipNulls,sort:"function"===typeof e.sort?e.sort:null,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:p.strictNullHandling}};e.exports=function(e,t){var r,n,o=e,i=h(t);"function"===typeof i.filter?(n=i.filter,o=n("",o)):c(i.filter)&&(n=i.filter,r=n);var s,u=[];if("object"!==typeof o||null===o)return"";s=t&&t.arrayFormat in a?t.arrayFormat:t&&"indices"in t?t.indices?"indices":"repeat":"indices";var f=a[s];r||(r=Object.keys(o)),i.sort&&r.sort(i.sort);for(var p=0;p<r.length;++p){var d=r[p];i.skipNulls&&null===o[d]||l(u,y(o[d],d,f,i.strictNullHandling,i.skipNulls,i.encode?i.encoder:null,i.filter,i.sort,i.allowDots,i.serializeDate,i.format,i.formatter,i.encodeValuesOnly,i.charset))}var m=u.join(i.delimiter),b=!0===i.addQueryPrefix?"?":"";return i.charsetSentinel&&("iso-8859-1"===i.charset?b+="utf8=%26%2310003%3B&":b+="utf8=%E2%9C%93&"),m.length>0?b+m:""}},7503:function(e,t,r){"use strict";var n=r("648d"),o=r("f53c"),i=r("e94a");e.exports={formats:i,parse:o,stringify:n}},"7a9a":function(e,t,r){"use strict";var n=r("e94a"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a=function(){for(var e=[],t=0;t<256;++t)e.push("%"+((t<16?"0":"")+t.toString(16)).toUpperCase());return e}(),c=function(e){while(e.length>1){var t=e.pop(),r=t.obj[t.prop];if(i(r)){for(var n=[],o=0;o<r.length;++o)"undefined"!==typeof r[o]&&n.push(r[o]);t.obj[t.prop]=n}}},s=function(e,t){for(var r=t&&t.plainObjects?Object.create(null):{},n=0;n<e.length;++n)"undefined"!==typeof e[n]&&(r[n]=e[n]);return r},l=function e(t,r,n){if(!r)return t;if("object"!==typeof r){if(i(t))t.push(r);else{if(!t||"object"!==typeof t)return[t,r];(n&&(n.plainObjects||n.allowPrototypes)||!o.call(Object.prototype,r))&&(t[r]=!0)}return t}if(!t||"object"!==typeof t)return[t].concat(r);var a=t;return i(t)&&!i(r)&&(a=s(t,n)),i(t)&&i(r)?(r.forEach((function(r,i){if(o.call(t,i)){var a=t[i];a&&"object"===typeof a&&r&&"object"===typeof r?t[i]=e(a,r,n):t.push(r)}else t[i]=r})),t):Object.keys(r).reduce((function(t,i){var a=r[i];return o.call(t,i)?t[i]=e(t[i],a,n):t[i]=a,t}),a)},u=function(e,t){return Object.keys(t).reduce((function(e,r){return e[r]=t[r],e}),e)},f=function(e,t,r){var n=e.replace(/\+/g," ");if("iso-8859-1"===r)return n.replace(/%[0-9a-f]{2}/gi,unescape);try{return decodeURIComponent(n)}catch(o){return n}},p=function(e,t,r,o,i){if(0===e.length)return e;var c=e;if("symbol"===typeof e?c=Symbol.prototype.toString.call(e):"string"!==typeof e&&(c=String(e)),"iso-8859-1"===r)return escape(c).replace(/%u[0-9a-f]{4}/gi,(function(e){return"%26%23"+parseInt(e.slice(2),16)+"%3B"}));for(var s="",l=0;l<c.length;++l){var u=c.charCodeAt(l);45===u||46===u||95===u||126===u||u>=48&&u<=57||u>=65&&u<=90||u>=97&&u<=122||i===n.RFC1738&&(40===u||41===u)?s+=c.charAt(l):u<128?s+=a[u]:u<2048?s+=a[192|u>>6]+a[128|63&u]:u<55296||u>=57344?s+=a[224|u>>12]+a[128|u>>6&63]+a[128|63&u]:(l+=1,u=65536+((1023&u)<<10|1023&c.charCodeAt(l)),s+=a[240|u>>18]+a[128|u>>12&63]+a[128|u>>6&63]+a[128|63&u])}return s},d=function(e){for(var t=[{obj:{o:e},prop:"o"}],r=[],n=0;n<t.length;++n)for(var o=t[n],i=o.obj[o.prop],a=Object.keys(i),s=0;s<a.length;++s){var l=a[s],u=i[l];"object"===typeof u&&null!==u&&-1===r.indexOf(u)&&(t.push({obj:i,prop:l}),r.push(u))}return c(t),e},y=function(e){return"[object RegExp]"===Object.prototype.toString.call(e)},h=function(e){return!(!e||"object"!==typeof e)&&!!(e.constructor&&e.constructor.isBuffer&&e.constructor.isBuffer(e))},m=function(e,t){return[].concat(e,t)},b=function(e,t){if(i(e)){for(var r=[],n=0;n<e.length;n+=1)r.push(t(e[n]));return r}return t(e)};e.exports={arrayToObject:s,assign:u,combine:m,compact:d,decode:f,encode:p,isBuffer:h,isRegExp:y,maybeMap:b,merge:l}},"7fcb":function(e,t,r){"use strict";r("5c28")},e70b:function(e,t,r){},e94a:function(e,t,r){"use strict";var n=String.prototype.replace,o=/%20/g,i={RFC1738:"RFC1738",RFC3986:"RFC3986"};e.exports={default:i.RFC3986,formatters:{RFC1738:function(e){return n.call(e,o,"+")},RFC3986:function(e){return String(e)}},RFC1738:i.RFC1738,RFC3986:i.RFC3986}},ef77:function(e,t,r){"use strict";r("e70b")},f53c:function(e,t,r){"use strict";var n=r("7a9a"),o=Object.prototype.hasOwnProperty,i=Array.isArray,a={allowDots:!1,allowPrototypes:!1,arrayLimit:20,charset:"utf-8",charsetSentinel:!1,comma:!1,decoder:n.decode,delimiter:"&",depth:5,ignoreQueryPrefix:!1,interpretNumericEntities:!1,parameterLimit:1e3,parseArrays:!0,plainObjects:!1,strictNullHandling:!1},c=function(e){return e.replace(/&#(\d+);/g,(function(e,t){return String.fromCharCode(parseInt(t,10))}))},s=function(e,t){return e&&"string"===typeof e&&t.comma&&e.indexOf(",")>-1?e.split(","):e},l="utf8=%26%2310003%3B",u="utf8=%E2%9C%93",f=function(e,t){var r,f={},p=t.ignoreQueryPrefix?e.replace(/^\?/,""):e,d=t.parameterLimit===1/0?void 0:t.parameterLimit,y=p.split(t.delimiter,d),h=-1,m=t.charset;if(t.charsetSentinel)for(r=0;r<y.length;++r)0===y[r].indexOf("utf8=")&&(y[r]===u?m="utf-8":y[r]===l&&(m="iso-8859-1"),h=r,r=y.length);for(r=0;r<y.length;++r)if(r!==h){var b,g,v=y[r],j=v.indexOf("]="),O=-1===j?v.indexOf("="):j+1;-1===O?(b=t.decoder(v,a.decoder,m,"key"),g=t.strictNullHandling?null:""):(b=t.decoder(v.slice(0,O),a.decoder,m,"key"),g=n.maybeMap(s(v.slice(O+1),t),(function(e){return t.decoder(e,a.decoder,m,"value")}))),g&&t.interpretNumericEntities&&"iso-8859-1"===m&&(g=c(g)),v.indexOf("[]=")>-1&&(g=i(g)?[g]:g),o.call(f,b)?f[b]=n.combine(f[b],g):f[b]=g}return f},p=function(e,t,r,n){for(var o=n?t:s(t,r),i=e.length-1;i>=0;--i){var a,c=e[i];if("[]"===c&&r.parseArrays)a=[].concat(o);else{a=r.plainObjects?Object.create(null):{};var l="["===c.charAt(0)&&"]"===c.charAt(c.length-1)?c.slice(1,-1):c,u=parseInt(l,10);r.parseArrays||""!==l?!isNaN(u)&&c!==l&&String(u)===l&&u>=0&&r.parseArrays&&u<=r.arrayLimit?(a=[],a[u]=o):a[l]=o:a={0:o}}o=a}return o},d=function(e,t,r,n){if(e){var i=r.allowDots?e.replace(/\.([^.[]+)/g,"[$1]"):e,a=/(\[[^[\]]*])/,c=/(\[[^[\]]*])/g,s=r.depth>0&&a.exec(i),l=s?i.slice(0,s.index):i,u=[];if(l){if(!r.plainObjects&&o.call(Object.prototype,l)&&!r.allowPrototypes)return;u.push(l)}var f=0;while(r.depth>0&&null!==(s=c.exec(i))&&f<r.depth){if(f+=1,!r.plainObjects&&o.call(Object.prototype,s[1].slice(1,-1))&&!r.allowPrototypes)return;u.push(s[1])}return s&&u.push("["+i.slice(s.index)+"]"),p(u,t,r,n)}},y=function(e){if(!e)return a;if(null!==e.decoder&&void 0!==e.decoder&&"function"!==typeof e.decoder)throw new TypeError("Decoder has to be a function.");if("undefined"!==typeof e.charset&&"utf-8"!==e.charset&&"iso-8859-1"!==e.charset)throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");var t="undefined"===typeof e.charset?a.charset:e.charset;return{allowDots:"undefined"===typeof e.allowDots?a.allowDots:!!e.allowDots,allowPrototypes:"boolean"===typeof e.allowPrototypes?e.allowPrototypes:a.allowPrototypes,arrayLimit:"number"===typeof e.arrayLimit?e.arrayLimit:a.arrayLimit,charset:t,charsetSentinel:"boolean"===typeof e.charsetSentinel?e.charsetSentinel:a.charsetSentinel,comma:"boolean"===typeof e.comma?e.comma:a.comma,decoder:"function"===typeof e.decoder?e.decoder:a.decoder,delimiter:"string"===typeof e.delimiter||n.isRegExp(e.delimiter)?e.delimiter:a.delimiter,depth:"number"===typeof e.depth||!1===e.depth?+e.depth:a.depth,ignoreQueryPrefix:!0===e.ignoreQueryPrefix,interpretNumericEntities:"boolean"===typeof e.interpretNumericEntities?e.interpretNumericEntities:a.interpretNumericEntities,parameterLimit:"number"===typeof e.parameterLimit?e.parameterLimit:a.parameterLimit,parseArrays:!1!==e.parseArrays,plainObjects:"boolean"===typeof e.plainObjects?e.plainObjects:a.plainObjects,strictNullHandling:"boolean"===typeof e.strictNullHandling?e.strictNullHandling:a.strictNullHandling}};e.exports=function(e,t){var r=y(t);if(""===e||null===e||"undefined"===typeof e)return r.plainObjects?Object.create(null):{};for(var o="string"===typeof e?f(e,r):e,i=r.plainObjects?Object.create(null):{},a=Object.keys(o),c=0;c<a.length;++c){var s=a[c],l=d(s,o[s],r,"string"===typeof e);i=n.merge(i,l,r)}return n.compact(i)}}}]);
//# sourceMappingURL=chunk-1f51d710.1761005f.js.map