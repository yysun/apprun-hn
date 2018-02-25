!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=n(8),i=n(10);t.Component=i.Component;var o=n(11),l=n(4);t.on=l.on,t.update=l.update,r.default.createElement=a.createElement,r.default.render=a.render,r.default.start=function(e,t,n,r,a){var o=Object.assign(a||{},{render:!0,global_event:!0}),l=new i.Component(t,n,r);return l.mount(e,o),l};var u=r.default;"object"==typeof window&&(window.app&&window.app.start?u=window.app:(window.app=u,document.addEventListener("DOMContentLoaded",function(){return new o.default}))),t.default=u},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){this._events={}}return e.prototype.on=function(e,t,n){void 0===n&&(n={}),n.debug&&console.log("on: "+e),this._events[e]=this._events[e]||[],this._events[e].push({fn:t,options:n})},e.prototype.run=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var a=this._events[e];console.assert(!!a,"No subscriber for event: "+e),a&&(this._events[e]=a.filter(function(r){var a=r.fn,i=r.options;return i.delay?t.delay(e,a,n,i):(i.debug&&console.log("run: "+e,n),a.apply(t,n)),!r.options.once}))},e.prototype.delay=function(e,t,n,r){var a=this;r._t&&clearTimeout(r._t),r._t=setTimeout(function(){clearTimeout(r._t),r.debug&&console.log("run-delay "+r.delay+":"+e,n),t.apply(a,n)},r.delay)},e}();t.App=r,t.default=new r},,,function(e,t,n){"use strict";function r(e,n){return void 0===n&&(n={}),function(r,a,i){return e=a+(e?","+e:""),t.Reflect.defineMetadata("apprun-update:"+e,{name:e,action:[i.value,n]},r),i}}function a(e,n){return void 0===n&&(n={}),function(n,r){e=r+(e?","+e:""),t.Reflect.defineMetadata("apprun-update:"+e,{name:e,key:r},n)}}Object.defineProperty(t,"__esModule",{value:!0}),t.Reflect={meta:new WeakMap,defineMetadata:function(e,t,n){this.meta.has(n)||this.meta.set(n,{}),this.meta.get(n)[e]=t},getMetadataKeys:function(e){return e=Object.getPrototypeOf(e),this.meta.get(e)?Object.keys(this.meta.get(e)):[]},getMetadata:function(e,t){return t=Object.getPrototypeOf(t),this.meta.get(t)?this.meta.get(t)[e]:null}},t.update=r,t.on=a},,function(e,t,n){"use strict";function r(e,t){d=0,t&&e&&(e.firstChild?i(e.firstChild,t):e.appendChild(l(t)))}function a(e,t){return e.nodeName===(""+(t.tag||"")).toUpperCase()}function i(e,t){if(console.assert(!!e),!a(e,t))return void e.parentNode.replaceChild(l(t),e);for(var n=Math.min(e.childNodes.length,t.children.length),r=0;r<n;r++){var u=t.children[r],c=e.childNodes[r];if("string"==typeof u)c.textContent!==u&&(3===c.nodeType?c.textContent=u:e.replaceChild(o(u),c));else{var f=u.props&&u.props.key;if(f)if(c.key===f)i(e.childNodes[r],u);else{var d=f&&h[f];d?(e.replaceChild(d,c),e.appendChild(c),i(e.childNodes[r],u)):(e.appendChild(l(t),c),i(e.childNodes[r],u))}else i(e.childNodes[r],u)}}for(var p=e.childNodes.length;p>n;)e.removeChild(e.lastChild),p--;if(t.children.length>n){for(var m=document.createDocumentFragment(),r=n;r<t.children.length;r++)m.appendChild(l(t.children[r]));e.appendChild(m)}s(e,t.props)}function o(e){if(0===e.indexOf("_html:")){var t=document.createElement("div");return t.insertAdjacentHTML("afterbegin",e.substring(6)),t}return document.createTextNode(e)}function l(e){if(console.assert(null!==e&&void 0!==e),"string"==typeof e)return o(e);if(!e.tag)return o(JSON.stringify(e));var t="svg"===e.tag?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag);return s(t,e.props),e.children&&e.children.forEach(function(e){return t.appendChild(l(e))}),t}function u(e,t){var n={};return e&&Object.keys(e).forEach(function(e){return n[e]=""}),t&&Object.keys(t).forEach(function(e){return n[e]=t[e]}),n}function s(e,t){console.assert(!!e);var n=e[f]||{};t=u(n,t),e[f]=t;for(var r in t){var a=t[r];if(n[r]!==a)if("style"===r){e.style.cssText&&(e.style.cssText="");for(var i in a)e.style[i]!==a[i]&&(e.style[i]=a[i])}else e[r]!==a&&(e[r]=a),"key"===r&&a&&(h[a]=e)}}Object.defineProperty(t,"__esModule",{value:!0});var c=n(9),f="_props";t.createElement=function(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var a=[],i=function(e){null!==e&&void 0!==e&&""!==e&&a.push("function"==typeof e||"object"==typeof e?e:""+e)};if(n.forEach(function(e){Array.isArray(e)?e.forEach(function(e){return i(e)}):i(e)}),"string"==typeof e)return{tag:e,props:t,children:a};if(Object.getPrototypeOf(e).name){var o=t&&t.id||"_"+e.name+"_"+ ++d;return c.default(e,o,t)}return e(t,a)};var d=0,h={};t.updateElement=r,t.render=r,t.default={createElement:t.createElement,updateElement:t.updateElement}},,function(e,t,n){"use strict";function r(e,t){console.assert(!!e),a.updateElement(e,t)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(6);t.createElement=a.createElement,t.render=r},function(e,t,n){"use strict";function r(e,t,n){var r=i[t]?i[t]:i[t]=new e(n).mount(t);return a.default.createElement("div",{id:t},r.render&&r.render())}Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),i={};t.default=r},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++){t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e};Object.defineProperty(t,"__esModule",{value:!0});var a=n(1),i=n(4),o=function(){function e(e,t,n,i){var o=this;this.state=e,this.view=t,this.update=n,this.options=i,this._app=new a.App,this._history=[],this._history_idx=-1,this.start=function(e,t){return void 0===e&&(e=null),void 0===t&&(t={render:!0}),o.mount(e,r({},t,{render:!0}))},this.render=function(){return o.view(o.state)}}return e.prototype.renderState=function(e){if(this.view){var t=this.view(e),n="string"==typeof this.element?document.getElementById(this.element):this.element;n&&(n._component=this),n&&a.default.render&&(a.default.render(n,t),this.rendered&&this.rendered(this.state))}},e.prototype.setState=function(e,t){var n=this;if(e instanceof Promise)e.then(function(e){n.setState(e,t)}).catch(function(e){throw console.error(e),e});else{if(null==e)return;this.state=e,!1!==t.render&&this.renderState(e),!1!==t.history&&this.enable_history&&(this._history=this._history.concat([e]),this._history_idx=this._history.length-1),"function"==typeof t.callback&&t.callback(this.state)}},e.prototype.mount=function(e,t){var n=this;if(void 0===e&&(e=null),console.assert(!this.element,"Component already mounted."),this.options=t=Object.assign(this.options||{},t),this.element=e,this.global_event=t.global_event,this.enable_history=!!t.history,this.enable_history){var r=function(){n._history_idx--,n._history_idx>=0?n.setState(n._history[n._history_idx],{render:!0,history:!1}):n._history_idx=0},a=function(){n._history_idx++,n._history_idx<n._history.length?n.setState(n._history[n._history_idx],{render:!0,history:!1}):n._history_idx=n._history.length-1};this.on(t.history.prev||"history-prev",r),this.on(t.history.next||"history-next",a)}return this.add_actions(),void 0===this.state&&(this.state=this.model||{}),t.render?this.setState(this.state,{render:!0,history:!0}):this.setState(this.state,{render:!1,history:!0}),this},e.prototype.is_global_event=function(e){return e&&(e.startsWith("#")||e.startsWith("/"))},e.prototype.add_action=function(e,t,n){var r=this;void 0===n&&(n={}),t&&"function"==typeof t&&this.on(e,function(){for(var e=[],a=0;a<arguments.length;a++)e[a]=arguments[a];var i=t.apply(void 0,[r.state].concat(e));r.setState(i,n)},n)},e.prototype.add_actions=function(){var e=this,t=this.update||{};i.Reflect.getMetadataKeys(this).forEach(function(n){if(n.startsWith("apprun-update:")){var r=i.Reflect.getMetadata(n,e);t[r.name]=r.action||e[r.key]}});var n={};Object.keys(t).forEach(function(e){var r=t[e];("function"==typeof r||Array.isArray(r))&&e.split(",").forEach(function(e){return n[e.trim()]=r})}),Object.keys(n).forEach(function(t){var r=n[t];"function"==typeof r?e.add_action(t,r):Array.isArray(r)&&e.add_action(t,r[0],r[1])})},e.prototype.run=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return this.global_event||this.is_global_event(e)?a.default.run.apply(a.default,[e].concat(t)):(r=this._app).run.apply(r,[e].concat(t));var r},e.prototype.on=function(e,t,n){return this.global_event||this.is_global_event(e)?a.default.on(e,t,n):this._app.on(e,t,n)},e}();t.Component=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(1),a=function(){function e(){var e=this;r.default.on("route",function(t){return e.route(t)}),window.onpopstate=function(t){return e.route(location.hash)},this.route(location.hash)}return e.prototype.route=function(e){if(e||(e="#"),e.indexOf("/")>0){var t=e.split("/"),n=t[0],a=t.slice(1);r.default.run.apply(r.default,[n].concat(a)),r.default.run.apply(r.default,["//",n].concat(a))}else r.default.run(e),r.default.run("//",e)},e}();t.default=a}])})},function(e,t,n){"use strict";function r(e,t){return e||(e=0),1===e?e+t:e+t+"s"}function a(e){var t=Date.now()/1e3-Number(e);return t<3600?r(~~(t/60)," minute"):t<86400?r(~~(t/3600)," hour"):r(~~(t/86400)," day")}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0);n(2),i.default.on("//",function(e){});var o={},l=function(e){var t=e.comment;if(t)return i.default.createElement("li",{className:"comment"},i.default.createElement("div",{className:"meta"},i.default.createElement("span",null,"by ",t.by)," | ",i.default.createElement("span",null,a(t.time)," ago")),i.default.createElement("div",{className:"text"},"_html:"+t.text),i.default.createElement(u,{item:t}))},u=function(e){var t=e.item;if(t&&t.kids){var n=t.kids,a=t.kids&&t.kids.filter(function(e){return!t.deleted&&!t.dead}).length;return i.default.createElement("div",null,a&&i.default.createElement("div",{className:"toggle"},r(a," comment")," "),i.default.createElement("ul",{className:"comment-list"}," ",n.filter(function(e){return!e.deleted}).map(function(e){return i.default.createElement(l,{comment:e})})))}},s=function(e){var t=e.item;if(t)return i.default.createElement("div",{className:"story"},i.default.createElement("h4",null,i.default.createElement("a",{href:t.url},t.title)),t.text&&i.default.createElement("div",{className:"text"},"_html:"+t.text),i.default.createElement("div",{className:"meta"},i.default.createElement("span",null,r(t.score," point"))," | ",i.default.createElement("span",null,"by ",t.by)," | ",i.default.createElement("span",null,a(t.time)," ago")," | ",i.default.createElement("span",null,r(t.descendants," comment")," (in total)  | "),i.default.createElement("span",null,i.default.createElement("a",{onclick:function(){return history.back()}},"back"))),i.default.createElement(u,{item:t}))},c=function(e){var t=e.item;e.idx;if(t){var n="#/item/"+t.id;return i.default.createElement("li",null,i.default.createElement("div",{className:"score"},t.score),i.default.createElement("div",null,i.default.createElement("a",{href:t.url||n},t.title)),i.default.createElement("div",{className:"meta"},i.default.createElement("span",null,"by ",t.by)," | ",i.default.createElement("span",null,a(t.time)," ago")," | ",i.default.createElement("span",null,i.default.createElement("a",{href:""+n},r(t.descendants," comment")))))}},f=function(e){var t=e.list;if(t&&t.items)return i.default.createElement("div",null,i.default.createElement("ul",{className:"story-list"}," ",t.items.filter(function(e,n){return n>=t.min&&n<t.max&&"number"!=typeof e}).map(function(e){return i.default.createElement(c,{item:e,idx:t.items.indexOf(e)+1})})),i.default.createElement("div",{className:"more"},i.default.createElement("span",null,t.min+1," - ",t.max," (",t.items.length,")  "),t.items&&t.max<t.items.length&&i.default.createElement("a",{onclick:function(){return i.default.run("more")}}," |  More ...")))},d=function(e){if(!(e instanceof Promise)){var t=function(t){return{"font-weight":t===e.type?"bold":"normal"}};return i.default.createElement("div",{className:"hn "+e.type},i.default.createElement("div",{className:"header"},i.default.createElement("div",{className:"inner"},i.default.createElement("div",{style:{float:"left"}},i.default.createElement("span",{style:{"margin-right":"20px"}},i.default.createElement("a",{href:"https://github.com/yysun/apprun"},"AppRun")," ❤ ",i.default.createElement("a",{href:"https://news.ycombinator.com"},"HN")),i.default.createElement("a",{style:t("top"),href:"#/top"},"Top")," | ",i.default.createElement("a",{style:t("new"),href:"#/new"},"New")," | ",i.default.createElement("a",{style:t("best"),href:"#/best"},"Best")," | ",i.default.createElement("a",{style:t("show"),href:"#/show"},"Show")," | ",i.default.createElement("a",{style:t("ask"),href:"#/ask"},"Ask")," | ",i.default.createElement("a",{style:t("job"),href:"#/job"},"Jobs")))),i.default.createElement("div",{className:"main"},i.default.createElement("div",{className:"inner"},"item"===e.type?i.default.createElement(s,{item:e[e.id]}):i.default.createElement(f,{list:e[e.type]}))),i.default.createElement("div",{className:"footer"},i.default.createElement("div",{className:"inner"},"Powered by ",i.default.createElement("a",{href:"https://github.com/yysun/apprun"},"AppRun"),", Source code: ",i.default.createElement("a",{href:"https://github.com/yysun/apprun-hn"},"Github"))))}},h={"#":function(e,t,n){t=t||e.type||"top",e.type=t,e[t]=e[t]||{min:0,max:30,items:[]},e.id=n,"item"===t?i.default.run("get-item",n,e):i.default.run("get-list",t,e[t])},render:function(e){return e},more:function(e){var t=e[e.type];t.max=Math.min(t.max+30,t.items.length),i.default.run("get-list",e.type,t)}};i.default.start("my-app",o,d,h),document.body.addEventListener("click",function(e){var t=e.target;t.matches(".toggle")&&(t.classList.toggle("closed"),t.nextElementSibling&&t.nextElementSibling.classList.toggle("collapsed"))})},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,i){function o(e){try{u(r.next(e))}catch(e){i(e)}}function l(e){try{u(r.throw(e))}catch(e){i(e)}}function u(e){e.done?a(e.value):new n(function(t){t(e.value)}).then(o,l)}u((r=r.apply(e,t||[])).next())})},a=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(a)throw new TypeError("Generator is already executing.");for(;u;)try{if(a=1,i&&(o=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(o=o.call(i,n[1])).done)return o;switch(i=0,o&&(n=[0,o.value]),n[0]){case 0:case 1:o=n;break;case 4:return u.label++,{value:n[1],done:!1};case 5:u.label++,i=n[1],n=[0];continue;case 7:n=u.ops.pop(),u.trys.pop();continue;default:if(o=u.trys,!(o=o.length>0&&o[o.length-1])&&(6===n[0]||2===n[0])){u=0;continue}if(3===n[0]&&(!o||n[1]>o[0]&&n[1]<o[3])){u.label=n[1];break}if(6===n[0]&&u.label<o[1]){u.label=o[1],o=n;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(n);break}o[2]&&u.ops.pop(),u.trys.pop();continue}n=t.call(e,u)}catch(e){n=[6,e],i=0}finally{a=o=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var a,i,o,l,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return l={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l},i=this;Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),l=n(3);l.initializeApp({databaseURL:"https://hacker-news.firebaseio.com"});var u=l.database().ref("/v0"),s=function(e){return r(i,void 0,void 0,function(){var t;return a(this,function(n){return t=u.child(e),[2,new Promise(function(e,n){t.once("value",function(t){return e(t.val())},n)})]})})},c=function(e){return r(i,void 0,void 0,function(){var t,n,i=this;return a(this,function(o){switch(o.label){case 0:return[4,s("item/"+e)];case 1:return(t=o.sent())&&t.kids?(n=t,[4,Promise.all(t.kids.map(function(e){return r(i,void 0,void 0,function(){var t;return a(this,function(n){switch(n.label){case 0:return"number"!=typeof e?[3,2]:[4,c(e)];case 1:return t=n.sent(),[3,3];case 2:t=e,n.label=3;case 3:return[2,t]}})})}))]):[3,3];case 2:n.kids=o.sent(),o.label=3;case 3:return[2,t]}})})};o.default.on("get-list",function(e,t){var n=function(e){var t=e.items,n=e.min,l=e.max;return r(i,void 0,void 0,function(){var e=this;return a(this,function(i){switch(i.label){case 0:return[4,Promise.all(t.map(function(i,o){return r(e,void 0,void 0,function(){var e,r;return a(this,function(a){switch(a.label){case 0:return o>=n&&o<l&&"number"==typeof i?(e=t,r=o,[4,s("item/"+i)]):[3,2];case 1:e[r]=a.sent(),a.label=2;case 2:return[2]}})})}))];case 1:return i.sent(),o.default.run("render"),[2]}})})};if(t.items.length)return n(t);u.child(e+"stories").on("value",function(e){return r(i,void 0,void 0,function(){return a(this,function(r){return t.items=e.val(),n(t),[2]})})})}),o.default.on("get-item",function(e,t){if(e){u.child("item/"+e).on("value",function(n){return r(i,void 0,void 0,function(){var i,l=this;return a(this,function(u){switch(u.label){case 0:return t[e]=n.val(),t[e].kids?(i=t[e],[4,Promise.all(t[e].kids.map(function(e){return r(l,void 0,void 0,function(){var t;return a(this,function(n){switch(n.label){case 0:return"number"!=typeof e?[3,2]:[4,c(e)];case 1:return t=n.sent(),[3,3];case 2:t=e,n.label=3;case 3:return[2,t]}})})}))]):[3,2];case 1:i.kids=u.sent(),u.label=2;case 2:return o.default.run("render"),[2]}})})})}})},function(e,t){e.exports=firebase}]);
//# sourceMappingURL=app.js.map