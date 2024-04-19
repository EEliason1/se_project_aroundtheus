//Default cards object
export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "./images/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "./images/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "./images/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "./images/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "./images/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "./images/lago.jpg",
  },
];

//Validation declarations
export const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
export const formValidators = {};

//Profile edit declarations
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileInputName = document.querySelector("#profile-input-name");
export const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
export const profileEditForm = document.forms["profile-edit-form"];

//Add card declarations
export const cardList = document.querySelector(".elements__list");
export const cardAddButton = document.querySelector("#profile-add-button");
