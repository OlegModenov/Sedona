// Modal
var open_popup = document.querySelector(".form__btn");
var popup_fail = document.querySelector(".fail");
var close_fail = popup_fail.querySelector(".fail__btn");
var popup_success = document.querySelector(".success");
var close_success = popup_success.querySelector(".success__btn");
var overlay = document.querySelector(".overlay");
var form = document.querySelector(".form");
var person_name = form.querySelector(".person__name");
var surname = form.querySelector(".person__surname");
var phone = form.querySelector("[type=tel]");
var mail = form.querySelector("[name=mail]");

// Закрытие модальных окон по кнопке
close_fail.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup_fail.classList.remove("modal__show");
  overlay.classList.remove("modal__show");
});

close_success.addEventListener("click", function (evt) {
  evt.preventDefault();
  popup_success.classList.remove("modal__show");
  overlay.classList.remove("modal__show");
});

//Закрытие модальных окон по клавиатуре
window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27 && (popup_fail.classList.contains("modal__show") || popup_success.classList.contains("modal__show"))) {
    evt.preventDefault();
    popup_success.classList.remove("modal__show");
    popup_fail.classList.remove("modal__show");
    overlay.classList.remove("modal__show");
  }
});

//Открытие модальных окон при отправке формы
form.addEventListener("submit", function (evt) {
  overlay.classList.add("modal__show")
  if (!person_name.value || !surname.value) {
    evt.preventDefault();
    popup_fail.classList.add("modal__show");
    person_name.classList.add("field__text--error");
    surname.classList.add("field__text--error");
  }
  else {
    evt.preventDefault();
    popup_success.classList.add("modal__show");
    person_name.classList.remove("field__text--error");
    surname.classList.remove("field__text--error");
  }
});
