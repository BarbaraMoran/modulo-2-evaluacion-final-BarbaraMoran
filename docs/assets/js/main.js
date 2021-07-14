"use strict";const formEl=document.querySelector(".js-form"),inputEl=document.querySelector(".js-input"),btnEl=document.querySelector(".js-button"),showsListTitle=document.querySelector(".results-section-title"),showsList=document.querySelector(".js-list"),favShowsList=document.querySelector(".js-fav-list");function submitPrevent(e){e.preventDefault()}function getUserSearch(){return inputEl.value}formEl.addEventListener("submit",submitPrevent);let apiData=[],userFavShows=[],keptFavData=[];function getApiData(){const e=getUserSearch();fetch("//api.tvmaze.com/search/shows?q="+e).then((function(e){return e.json()})).then((function(e){apiData=e,renderTvShows()}))}function renderTvShows(){showsListTitle.innerHTML="",showsList.innerHTML="";let e="";for(const s of apiData){e+=void 0===userFavShows.find(e=>e.show.id===s.show.id)?`<li class= "show-list__item item-color js-card" data-id="${s.show.id}">`:`<li class= "show-list__item fav-color js-card" data-id="${s.show.id}">`,null===s.show.image?e+='<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/>':e+=`<img class="item__picture js-picture" src= "${s.show.image.medium}"/>`,e+=`<h3>${s.show.name}</h3>`,e+=`<h5>${s.show.genres.join(" , ")}</h5>`,e+="</li>"}0!==apiData.length&&(showsListTitle.innerHTML="search results"),showsList.innerHTML+=e,addCardListeners()}function addCardListeners(){const e=document.querySelectorAll(".js-card");for(const s of e)s.addEventListener("click",handleFavBtn)}function handleFavBtn(e){const s=e.currentTarget,t=parseInt(s.dataset.id);if(void 0===userFavShows.find(e=>e.show.id===t)){const e=apiData.find(e=>e.show.id===t);userFavShows.push(e)}else userFavShows=userFavShows.filter(e=>e.show.id!==t);lS(userFavShows)}function lS(e){localStorage.setItem("userFavShows",JSON.stringify(e));let s=JSON.parse(localStorage.getItem("userFavShows"));renderTvShows(),renderFavSection(s),0===s.length&&(console.log(s.length),favShowsList.innerHTML="")}function renderFavSection(e){favShowsList.innerHTML="";let s="";for(const t of e)s+=`<li class= "show-list__item js-card" data-id="${t.show.id}">`,null===t.show.image?s+=`<img class="item__picture js-picture" src= "https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${t.show.name}"/>`:s+=`<img class="item__picture js-picture" src= "${t.show.image.medium}" alt="${t.show.name}"/>`,s+='<div class= "fav-info">',s+=`<h3 class= "favorite-show-title">${t.show.name}</h3>`,s+=`<h6 class= "favorite-show-genre">${t.show.genres.join(" , ")}</h6>`,s+="</div>",s+=`<img class= "icon js-icon" data-id="${t.score}" src="./assets/images/274c.png" />`,s+="</li>";favShowsList.innerHTML='<div class= "fav-shows-list__header"> <h2 class= "favorites-section__title">favorite series\n  </h2><img class= "bin-button js-bin" src="./assets/images/trash.jpg" /></div>',favShowsList.innerHTML+=s;document.querySelector(".js-bin").addEventListener("click",handleBin);const t=document.querySelectorAll(".js-icon");for(const e of t)e.addEventListener("click",handleIcon)}function recoverFavorites(){if(0!==JSON.parse(localStorage.getItem("userFavShows")).length){let e=JSON.parse(localStorage.getItem("userFavShows"));userFavShows=e,renderFavSection(userFavShows)}}function handleBin(){userFavShows=[],keptFavData=[],lS(userFavShows),favShowsList.innerHTML=""}function handleIcon(e){const s=e.currentTarget,t=parseInt(s.dataset.id);userFavShows=userFavShows.filter(e=>e.show.id!==t),lS(userFavShows)}btnEl.addEventListener("click",getApiData),document.addEventListener("load",recoverFavorites());