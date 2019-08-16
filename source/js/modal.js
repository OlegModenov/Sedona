var open_popup = document.querySelector(".form__btn");
var popup_fail = document.querySelector(".fail");
var close_fail = popup_fail.querySelector(".fail__btn");
var popup_success = document.querySelector(".success");
var close_success = popup_success.querySelector(".success__btn");
var overlay = document.querySelector(".modal__overlay");
var form = document.querySelector(".form");
var name = form.querySelector(".person__name").value;
var surname = form.querySelector(".person__surname").value;
var phone = form.querySelector("[type=tel]").value;
var mail = form.querySelector("[name=mail]").value;

// Открытие модальных окон по кнопке
// open_popup.addEventListener("click", function (evt) {
//     evt.preventDefault();
//     overlay.classList.add("modal__show")
//     popup_fail.classList.add("modal__show");
//     popup_success.classList.add("modal__show");
//   });

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

form.addEventListener("submit", function (evt) {
  // overlay.classList.add("modal__show")
  console.log(name);
  if (!name) {
    evt.preventDefault();
    console.log("Error");
    // popup_fail.classList.add("modal__show");
  }
  else {
    evt.preventDefault();
    console.log("Success");
    // popup_success.classList.add("modal__show");
  }
});
