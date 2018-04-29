!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){!function(t,n){e.exports=n()}(0,function(){return function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var n={};return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){this._events={}}return e.prototype.on=function(e,t,n){void 0===n&&(n={}),this._events[e]=this._events[e]||[],this._events[e].push({fn:t,options:n})},e.prototype.run=function(e){for(var t=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var a=this._events[e];console.assert(!!a,"No subscriber for event: "+e),a&&(this._events[e]=a.filter(function(r){var a=r.fn,i=r.options;return i.delay?t.delay(e,a,n,i):a.apply(t,n),!r.options.once}))},e.prototype.once=function(e,t){this.on(e,t)},e.prototype.delay=function(e,t,n,r){var a=this;r._t&&clearTimeout(r._t),r._t=setTimeout(function(){clearTimeout(r._t),t.apply(a,n)},r.delay)},e}();t.App=r,t.default=new r},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n(7),i=n(5);t.Component=i.Component;var o=n(4),u=n(2);t.on=u.on,t.update=u.update,t.event=u.update,r.default.createElement=a.createElement,r.default.render=a.render,r.default.Fragment=a.Fragment,r.default.start=function(e,t,n,r,a){var o=Object.assign(a||{},{render:!0,global_event:!0}),u=new i.Component(t,n,r);return a&&a.rendered&&(u.rendered=a.rendered),u.mount(e,o),u};var l=r.default,s=e||window;s.app&&s.app.start?l=s.app:(s.app=l,"object"==typeof document&&document.addEventListener("DOMContentLoaded",function(){return new o.default})),t.default=l,r.default.on("debug",function(e){return 0})}).call(this,n(8))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Reflect={meta:new WeakMap,defineMetadata:function(e,t,n){this.meta.has(n)||this.meta.set(n,{}),this.meta.get(n)[e]=t},getMetadataKeys:function(e){return e=Object.getPrototypeOf(e),this.meta.get(e)?Object.keys(this.meta.get(e)):[]},getMetadata:function(e,t){return t=Object.getPrototypeOf(t),this.meta.get(t)?this.meta.get(t)[e]:null}},t.update=function(e,n){return void 0===n&&(n={}),function(r,a,i){return e=a+(e?","+e:""),t.Reflect.defineMetadata("apprun-update:"+e,{name:e,action:[i.value,n]},r),i}},t.on=function(e,n){return void 0===n&&(n={}),function(n,r){e=r+(e?","+e:""),t.Reflect.defineMetadata("apprun-update:"+e,{name:e,key:r},n)}}},function(e,t,n){"use strict";function r(e){var t=[],n=function(e){null!==e&&void 0!==e&&""!==e&&t.push("function"==typeof e||"object"==typeof e?e:""+e)};return e&&e.forEach(function(e){Array.isArray(e)?e.forEach(function(e){return n(e)}):n(e)}),t}function a(e,t){if(d=0,null!=t&&e)if(Array.isArray(t))o(e,t);else{var n=t;e.firstChild?i(e.firstChild,n):e.appendChild(l(n))}}function i(e,t){console.assert(!!e),function(e,t){return e.nodeName===(""+(t.tag||"")).toUpperCase()}(e,t)?(o(e,t.children),s(e,t.props)):e.parentNode.replaceChild(l(t),e)}function o(e,t){for(var n=Math.min(e.childNodes.length,t.length),r=0;r<n;r++){var a=t[r],o=e.childNodes[r];if("string"==typeof a)o.textContent!==a&&(3===o.nodeType?o.textContent=a:e.replaceChild(u(a),o));else{var s=a.props&&a.props.key;if(s)if(o.key===s)i(e.childNodes[r],a);else{var c=s&&h[s];c?(e.replaceChild(c,o),e.appendChild(o),i(e.childNodes[r],a)):(e.appendChild(l(a),o),i(e.childNodes[r],a))}else i(e.childNodes[r],a)}}for(var f=e.childNodes.length;f>n;)e.removeChild(e.lastChild),f--;if(t.length>n){var d=document.createDocumentFragment();for(r=n;r<t.length;r++)d.appendChild(l(t[r]));e.appendChild(d)}}function u(e){if(0===e.indexOf("_html:")){var t=document.createElement("div");return t.insertAdjacentHTML("afterbegin",e.substring(6)),t}return document.createTextNode(e)}function l(e){if(console.assert(null!==e&&void 0!==e),"string"==typeof e)return u(e);if(!e.tag)return u(JSON.stringify(e));var t="svg"===e.tag?document.createElementNS("http://www.w3.org/2000/svg",e.tag):document.createElement(e.tag);return s(t,e.props),e.children&&e.children.forEach(function(e){return t.appendChild(l(e))}),t}function s(e,t){console.assert(!!e);var n=e[f]||{};for(var r in t=function(e,t){var n={};return e&&Object.keys(e).forEach(function(e){return n[e]=""}),t&&Object.keys(t).forEach(function(e){return n[e]=t[e]}),n}(n,t),e[f]=t,t){var a=t[r];if(n[r]!==a)if("style"===r)for(var i in e.style.cssText&&(e.style.cssText=""),a)e.style[i]!==a[i]&&(e.style[i]=a[i]);else if(r.startsWith("data-")){var o=r.substring(5);e.dataset[o]!==a&&(e.dataset[o]=a)}else e[r]!==a&&(e[r]=a),"key"===r&&a&&(h[a]=e)}}Object.defineProperty(t,"__esModule",{value:!0});var c=n(6),f="_props";t.createElement=function(e,t){for(var n=[],a=2;a<arguments.length;a++)n[a-2]=arguments[a];var i=r(n);if("string"==typeof e)return{tag:e,props:t,children:i};if(void 0===e&&n)return i;if(Object.getPrototypeOf(e).__isAppRunComponent){var o=t&&t.id||"_"+e.name+"_"+ ++d;return c.default(e,o,t)}return e(t,i)};var d=0,h={};t.updateElement=a,t.render=a,t.Fragment=function(e){for(var t=[],n=1;n<arguments.length;n++)t[n-1]=arguments[n];return r(t)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0);r.default.on("//",function(e){}),r.default.on("#",function(e){});var a=function(){function e(){var e=this;r.default.on("route",function(t){return e.route(t)}),window.onpopstate=function(t){return e.route(location.hash)},this.route(location.hash)}return e.prototype.route=function(e){if(e||(e="#"),e.indexOf("/")>0){var t=e.split("/"),n=t[0],a=t.slice(1);r.default.run.apply(r.default,[n].concat(a)),r.default.run.apply(r.default,["//",n].concat(a))}else r.default.run(e),r.default.run("//",e)},e}();t.default=a},function(e,t,n){"use strict";var r=this&&this.__assign||Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e};Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),i=n(2),o=function(){function e(e,t,n,i){var o=this;this.state=e,this.view=t,this.update=n,this.options=i,this._app=new a.App,this._history=[],this._history_idx=-1,this.start=function(e,t){return void 0===e&&(e=null),void 0===t&&(t={render:!0}),o.mount(e,r({},t,{render:!0}))},this.render=function(){return o.view(o.state)}}return e.prototype.renderState=function(e){if(this.view){var t=this.view(e);a.default.run("debug",{component:this,state:e,vdom:t||"[vdom is null - no render]"});var n="string"==typeof this.element?document.getElementById(this.element):this.element;n&&(n._component=this),n&&a.default.render&&(a.default.render(n,t),this.rendered&&this.rendered(this.state))}},e.prototype.setState=function(e,t){var n=this;if(e instanceof Promise)e.then(function(e){n.setState(e,t)}).catch(function(e){throw console.error(e),e});else{if(null==e)return;this.state=e,!1!==t.render&&this.renderState(e),!1!==t.history&&this.enable_history&&(this._history=this._history.concat([e]),this._history_idx=this._history.length-1),"function"==typeof t.callback&&t.callback(this.state)}},e.prototype.mount=function(e,t){var n=this;return void 0===e&&(e=null),console.assert(!this.element,"Component already mounted."),this.options=t=Object.assign(this.options||{},t),this.element=e,this.global_event=t.global_event,this.enable_history=!!t.history,this.enable_history&&(this.on(t.history.prev||"history-prev",function(){n._history_idx--,n._history_idx>=0?n.setState(n._history[n._history_idx],{render:!0,history:!1}):n._history_idx=0}),this.on(t.history.next||"history-next",function(){n._history_idx++,n._history_idx<n._history.length?n.setState(n._history[n._history_idx],{render:!0,history:!1}):n._history_idx=n._history.length-1})),this.add_actions(),void 0===this.state&&(this.state=this.model||{}),t.render?this.setState(this.state,{render:!0,history:!0}):this.setState(this.state,{render:!1,history:!0}),this},e.prototype.is_global_event=function(e){return e&&(e.startsWith("#")||e.startsWith("/"))},e.prototype.add_action=function(e,t,n){var r=this;void 0===n&&(n={}),t&&"function"==typeof t&&this.on(e,function(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];var u=t.apply(void 0,[r.state].concat(i));a.default.run("debug",{component:r,event:e,e:i,state:r.state,newState:u,options:n}),r.setState(u,n)},n)},e.prototype.add_actions=function(){var e=this,t=this.update||{};i.Reflect.getMetadataKeys(this).forEach(function(n){if(n.startsWith("apprun-update:")){var r=i.Reflect.getMetadata(n,e);t[r.name]=r.action||e[r.key]}});var n={};Object.keys(t).forEach(function(e){var r=t[e];("function"==typeof r||Array.isArray(r))&&e.split(",").forEach(function(e){return n[e.trim()]=r})}),Object.keys(n).forEach(function(t){var r=n[t];"function"==typeof r?e.add_action(t,r):Array.isArray(r)&&e.add_action(t,r[0],r[1])})},e.prototype.run=function(e){for(var t,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return this.global_event||this.is_global_event(e)?a.default.run.apply(a.default,[e].concat(n)):(t=this._app).run.apply(t,[e].concat(n))},e.prototype.on=function(e,t,n){return this.global_event||this.is_global_event(e)?a.default.on(e,t,n):this._app.on(e,t,n)},e.__isAppRunComponent=!0,e}();t.Component=o},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a={};t.default=function(e,t,n){var i=a[t]?a[t]:a[t]=new e(n).mount(t);return r.default.createElement("div",{id:t},i.render&&i.render())}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(3);t.createElement=r.createElement,t.Fragment=r.Fragment,t.render=function(e,t){console.assert(!!e),r.updateElement(e,t)}},function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])})},function(e,t,n){"use strict";function r(e,t){return e||(e=0),1===e?e+t:e+t+"s"}function a(e){var t=Date.now()/1e3-Number(e);return t<3600?r(~~(t/60)," minute"):t<86400?r(~~(t/3600)," hour"):r(~~(t/86400)," day")}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0);n(2),i.default.on("//",function(e){});var o={},u=function(e){var t=e.comment;if(t)return i.default.createElement("li",{className:"comment"},i.default.createElement("div",{className:"meta"},i.default.createElement("span",null,"by ",t.by)," | ",i.default.createElement("span",null,a(t.time)," ago")),i.default.createElement("div",{className:"text"},"_html:"+t.text),i.default.createElement(l,{item:t}))},l=function(e){var t=e.item;if(t&&t.kids){var n=t.kids,a=t.kids&&t.kids.filter(function(e){return!t.deleted&&!t.dead}).length;return i.default.createElement("div",null,a&&i.default.createElement("div",{className:"toggle"},r(a," comment")," "),i.default.createElement("ul",{className:"comment-list"}," ",n.filter(function(e){return!e.deleted}).map(function(e){return i.default.createElement(u,{comment:e})})))}},s=function(e){var t=e.item;if(t)return i.default.createElement("div",{className:"story"},i.default.createElement("h4",null,i.default.createElement("a",{href:t.url},t.title)),t.text&&i.default.createElement("div",{className:"text"},"_html:"+t.text),i.default.createElement("div",{className:"meta"},i.default.createElement("span",null,r(t.score," point"))," | ",i.default.createElement("span",null,"by ",t.by)," | ",i.default.createElement("span",null,a(t.time)," ago")," | ",i.default.createElement("span",null,r(t.descendants," comment")," (in total)  | "),i.default.createElement("span",null,i.default.createElement("a",{onclick:function(){return history.back()}},"back"))),i.default.createElement(l,{item:t}))},c=function(e){var t=e.item;e.idx;if(t){var n="#/item/"+t.id;return i.default.createElement("li",null,i.default.createElement("div",{className:"score"},t.score),i.default.createElement("div",null,i.default.createElement("a",{href:t.url||n},t.title)),i.default.createElement("div",{className:"meta"},i.default.createElement("span",null,"by ",t.by)," | ",i.default.createElement("span",null,a(t.time)," ago")," | ",i.default.createElement("span",null,i.default.createElement("a",{href:""+n},r(t.descendants," comment")))))}},f=function(e){var t=e.list;if(t&&t.items)return i.default.createElement("div",null,i.default.createElement("ul",{className:"story-list"}," ",t.items.filter(function(e,n){return n>=t.min&&n<t.max&&"number"!=typeof e}).map(function(e){return i.default.createElement(c,{item:e,idx:t.items.indexOf(e)+1})})),i.default.createElement("div",{className:"more"},i.default.createElement("span",null,t.min+1," - ",t.max," (",t.items.length,")  "),t.items&&t.max<t.items.length&&i.default.createElement("a",{onclick:function(){return i.default.run("more")}}," |  More ...")))},d=function(e){if(!(e instanceof Promise)){var t=function(t){return{"font-weight":t===e.type?"bold":"normal"}};return i.default.createElement("div",{className:"hn "+e.type},i.default.createElement("div",{className:"header"},i.default.createElement("div",{className:"inner"},i.default.createElement("div",{style:{float:"left"}},i.default.createElement("span",{style:{"margin-right":"20px"}},i.default.createElement("a",{href:"https://github.com/yysun/apprun"},"AppRun")," ❤ ",i.default.createElement("a",{href:"https://news.ycombinator.com"},"HN")),i.default.createElement("a",{style:t("top"),href:"#/top"},"Top")," | ",i.default.createElement("a",{style:t("new"),href:"#/new"},"New")," | ",i.default.createElement("a",{style:t("best"),href:"#/best"},"Best")," | ",i.default.createElement("a",{style:t("show"),href:"#/show"},"Show")," | ",i.default.createElement("a",{style:t("ask"),href:"#/ask"},"Ask")," | ",i.default.createElement("a",{style:t("job"),href:"#/job"},"Jobs")))),i.default.createElement("div",{className:"main"},i.default.createElement("div",{className:"inner"},"item"===e.type?i.default.createElement(s,{item:e[e.id]}):i.default.createElement(f,{list:e[e.type]}))),i.default.createElement("div",{className:"footer"},i.default.createElement("div",{className:"inner"},"Powered by ",i.default.createElement("a",{href:"https://github.com/yysun/apprun"},"AppRun"),", Source code: ",i.default.createElement("a",{href:"https://github.com/yysun/apprun-hn"},"Github"))))}},h={"#":function(e,t,n){t=t||e.type||"top",e.type=t,e[t]=e[t]||{min:0,max:30,items:[]},e.id=n,"item"===t?i.default.run("get-item",n,e):i.default.run("get-list",t,e[t])},render:function(e){return e},more:function(e){var t=e[e.type];t.max=Math.min(t.max+30,t.items.length),i.default.run("get-list",e.type,t)}},p=function(e){return localStorage.setItem("hn",JSON.stringify(e))};localStorage.getItem("hn");i.default.start("my-app",o,d,h,{rendered:p}),document.body.addEventListener("click",function(e){var t=e.target;t.matches(".toggle")&&(t.classList.toggle("closed"),t.nextElementSibling&&t.nextElementSibling.classList.toggle("collapsed"))})},function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(a,i){function o(e){try{l(r.next(e))}catch(e){i(e)}}function u(e){try{l(r.throw(e))}catch(e){i(e)}}function l(e){e.done?a(e.value):new n(function(t){t(e.value)}).then(o,u)}l((r=r.apply(e,t||[])).next())})},a=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(a)throw new TypeError("Generator is already executing.");for(;l;)try{if(a=1,i&&(o=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(o=o.call(i,n[1])).done)return o;switch(i=0,o&&(n=[0,o.value]),n[0]){case 0:case 1:o=n;break;case 4:return l.label++,{value:n[1],done:!1};case 5:l.label++,i=n[1],n=[0];continue;case 7:n=l.ops.pop(),l.trys.pop();continue;default:if(o=l.trys,!(o=o.length>0&&o[o.length-1])&&(6===n[0]||2===n[0])){l=0;continue}if(3===n[0]&&(!o||n[1]>o[0]&&n[1]<o[3])){l.label=n[1];break}if(6===n[0]&&l.label<o[1]){l.label=o[1],o=n;break}if(o&&l.label<o[2]){l.label=o[2],l.ops.push(n);break}o[2]&&l.ops.pop(),l.trys.pop();continue}n=t.call(e,l)}catch(e){n=[6,e],i=0}finally{a=o=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var a,i,o,u,l={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:n(0),throw:n(1),return:n(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u},i=this;Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),u=n(3);u.initializeApp({databaseURL:"https://hacker-news.firebaseio.com"});var l=u.database().ref("/v0"),s=function(e){return r(i,void 0,void 0,function(){var t;return a(this,function(n){return t=l.child(e),[2,new Promise(function(e,n){t.once("value",function(t){return e(t.val())},n)})]})})},c=function(e){return r(i,void 0,void 0,function(){var t,n,i=this;return a(this,function(o){switch(o.label){case 0:return[4,s("item/"+e)];case 1:return(t=o.sent())&&t.kids?(n=t,[4,Promise.all(t.kids.map(function(e){return r(i,void 0,void 0,function(){var t;return a(this,function(n){switch(n.label){case 0:return"number"!=typeof e?[3,2]:[4,c(e)];case 1:return t=n.sent(),[3,3];case 2:t=e,n.label=3;case 3:return[2,t]}})})}))]):[3,3];case 2:n.kids=o.sent(),o.label=3;case 3:return[2,t]}})})};o.default.on("get-list",function(e,t){var n=function(e){var t=e.items,n=e.min,u=e.max;return r(i,void 0,void 0,function(){var e=this;return a(this,function(i){switch(i.label){case 0:return[4,Promise.all(t.map(function(i,o){return r(e,void 0,void 0,function(){var e,r;return a(this,function(a){switch(a.label){case 0:return o>=n&&o<u&&"number"==typeof i?(e=t,r=o,[4,s("item/"+i)]):[3,2];case 1:e[r]=a.sent(),a.label=2;case 2:return[2]}})})}))];case 1:return i.sent(),o.default.run("render"),[2]}})})};if(t.items.length)return n(t);l.child(e+"stories").on("value",function(e){return r(i,void 0,void 0,function(){return a(this,function(r){return t.items=e.val(),n(t),[2]})})})}),o.default.on("get-item",function(e,t){if(e){l.child("item/"+e).on("value",function(n){return r(i,void 0,void 0,function(){var i,u=this;return a(this,function(l){switch(l.label){case 0:return t[e]=n.val(),t[e].kids?(i=t[e],[4,Promise.all(t[e].kids.map(function(e){return r(u,void 0,void 0,function(){var t;return a(this,function(n){switch(n.label){case 0:return"number"!=typeof e?[3,2]:[4,c(e)];case 1:return t=n.sent(),[3,3];case 2:t=e,n.label=3;case 3:return[2,t]}})})}))]):[3,2];case 1:i.kids=l.sent(),l.label=2;case 2:return o.default.run("render"),[2]}})})})}})},function(e,t){e.exports=firebase}]);
//# sourceMappingURL=app.js.map