function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},i={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){i[e]=t},t.parcelRequired7c6=o);var r,a=o("81RIQ"),s=o("eWCmQ"),c=o("fZKcF"),f=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,d=/^0o[0-7]+$/i,p=parseInt,g="object"==typeof t&&t&&t.Object===Object&&t,m="object"==typeof self&&self&&self.Object===Object&&self,y=g||m||Function("return this")(),v=Object.prototype.toString,w=Math.max,h=Math.min,b=function(){return y.Date.now()};function T(e,t,n){var i,o,r,a,s,c,f=0,u=!1,l=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function p(t){var n=i,r=o;return i=o=void 0,f=t,a=e.apply(r,n)}function g(e){return f=e,s=setTimeout(y,t),u?p(e):a}function m(e){var n=e-c;return void 0===c||n>=t||n<0||l&&e-f>=r}function y(){var e=b();if(m(e))return v(e);s=setTimeout(y,function(e){var n=t-(e-c);return l?h(n,r-(e-f)):n}(e))}function v(e){return s=void 0,d&&i?p(e):(i=o=void 0,a)}function T(){var e=b(),n=m(e);if(i=arguments,o=this,c=e,n){if(void 0===s)return g(c);if(l)return s=setTimeout(y,t),p(c)}return void 0===s&&(s=setTimeout(y,t)),a}return t=x(t)||0,j(n)&&(u=!!n.leading,r=(l="maxWait"in n)?w(x(n.maxWait)||0,t):r,d="trailing"in n?!!n.trailing:d),T.cancel=function(){void 0!==s&&clearTimeout(s),f=0,i=c=o=s=void 0},T.flush=function(){return void 0===s?a:v(b())},T}function j(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function x(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==v.call(e)}(e))return NaN;if(j(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=j(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(f,"");var n=l.test(e);return n||d.test(e)?p(e.slice(2),n?2:8):u.test(e)?NaN:+e}r=function(e,t,n){var i=!0,o=!0;if("function"!=typeof e)throw new TypeError("Expected a function");return j(n)&&(i="leading"in n?!!n.leading:i,o="trailing"in n?!!n.trailing:o),T(e,t,{leading:i,maxWait:t,trailing:o})};let $=0,E=0,L=!1,O=!0;const N=document.querySelector("#search-form"),H=document.querySelector("input"),q=document.querySelector(".gallery");function M(e){const t=e.map((e=>{const{webformatURL:t,largeImageURL:n,tags:i,likes:o,views:r,comments:a,downloads:s}=e;return`<div class="photo-card">\n      <a class='link' href="${n}">\n      <img src="${t}" alt="${i}" loading="lazy" width='200' height='140' />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes</b> ${o}\n    </p>\n    <p class="info-item">\n      <b>Views</b> ${r}\n    </p>\n    <p class="info-item">\n      <b>Comments</b> ${a}\n    </p>\n    <p class="info-item">\n      <b>Downloads</b> ${s}\n    </p>\n  </div>\n      </a>\n  </div>`})).join("");q.insertAdjacentHTML("beforeend",t)}async function S(){const t=document.body.offsetHeight,n=window.innerHeight;if(window.scrollY+n>=t-n/4)try{await async function(){const t=H.value;try{if(L||!O)return;L=!0,E+=a.page,$+=a.per_page;const n=await(0,a.fetchImages)(t,E),i=n.hits;if(n.totalHits<=$)return e(s).Notify.info("We're sorry, but you've reached the end of search results."),W(i),window.removeEventListener("scroll",e(r)(S,250)),window.removeEventListener("resize",e(r)(S,250)),void(O=!1);W(i),L=!1}catch(e){console.log(e.message)}}()}catch(e){console.log(e.message)}}function W(t){M(t);new(e(c))(".gallery a")}N.addEventListener("submit",(async function(t){t.preventDefault(),q.innerHTML="",L=!1,O=!0;const n=t.currentTarget.elements.safesearch.value.trim();try{const t=await(0,a.fetchImages)(n),i=t.hits,o=t.totalHits;if(0===i.length)e(s).Notify.failure("Sorry, there are no images matching your search query. Please try again.");else{if(""===n)return;e(s).Notify.success(`Hooray! We found ${o} images.`,{timeout:3e3,position:"left-top"}),M(i);new(e(c))(".gallery a",{});$=a.per_page,E=a.page,window.addEventListener("scroll",e(r)(S,250)),window.addEventListener("resize",e(r)(S,250))}}catch(e){console.log(e.message)}}));
//# sourceMappingURL=infinite_scroll.1ece228d.js.map
