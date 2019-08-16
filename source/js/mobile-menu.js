var toggle = document.querySelector(".page-header__toggle");
var navigation = document.querySelector(".main-nav");

toggle.classList.remove('page-header__toggle--nojs');

toggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  navigation.classList.toggle("main-nav--opened");
  toggle.classList.toggle("page-header__toggle--opened");
  navigation.classList.toggle("main-nav--closed");
  toggle.classList.toggle("page-header__toggle--closed");
});
