function e(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},s={},i=n.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in s){var n=s[e];delete s[e];var i={id:e,exports:{}};return t[e]=i,n.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,n){s[e]=n},n.parcelRequired7c6=i);var o=i("81RIQ"),a=i("eWCmQ");i("2shzp");var r=i("fZKcF");let l=0,c=0;const d=document.querySelector("#search-form"),u=document.querySelector("input"),f=document.querySelector(".gallery"),m=document.querySelector(".load-more");async function h(){const n=u.value;c+=o.page,l+=o.per_page,m.classList.add("visually-hidden");try{const t=await(0,o.fetchImages)(n,c),s=t.hits;if(t.totalHits<=l)return e(a).Notify.info("We're sorry, but you've reached the end of search results."),p(s),m.classList.add("visually-hidden"),void m.removeEventListener("click",h);p(s),m.classList.remove("visually-hidden")}catch(e){console.log(e.message)}}function g(e){const n=e.map((e=>{const{webformatURL:n,largeImageURL:t,tags:s,likes:i,views:o,comments:a,downloads:r}=e;return`<div class="photo-card">\n      <a class='link' href="${t}">\n      <img src="${n}" alt="${s}" loading="lazy" width='200' height='140' />\n  <div class="info">\n    <p class="info-item">\n      <b>Likes</b> ${i}\n    </p>\n    <p class="info-item">\n      <b>Views</b> ${o}\n    </p>\n    <p class="info-item">\n      <b>Comments</b> ${a}\n    </p>\n    <p class="info-item">\n      <b>Downloads</b> ${r}\n    </p>\n  </div>\n      </a>\n  </div>`})).join("");f.insertAdjacentHTML("beforeend",n)}function p(n){g(n),function(){const e=f.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:2*e,behavior:"smooth"})}();new(e(r))(".gallery a").refresh()}d.addEventListener("submit",(async function(n){n.preventDefault(),f.innerHTML="",l=0,m.classList.add("visually-hidden");const t=n.currentTarget.elements.safesearch.value.trim();try{const n=await(0,o.fetchImages)(t),s=n.hits,i=n.totalHits;if(0===s.length)e(a).Notify.failure("Sorry, there are no images matching your search query. Please try again.");else{if(""===t)return;e(a).Notify.success(`Hooray! We found ${i} images.`,{timeout:3e3,position:"left-top"}),g(s);new(e(r))(".gallery a",{});l=o.per_page,c=o.page,m.classList.remove("visually-hidden"),m.addEventListener("click",h)}}catch(e){console.log(e.message)}}));
//# sourceMappingURL=index.eee6d0d5.js.map