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

// export const modals = document.querySelectorAll(".modal");

//Profile edit declarations
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileName = document.querySelector("#profile-name");
export const profileDescription = document.querySelector(
  "#profile-description"
);
export const profileInputName = document.querySelector("#profile-input-name");
export const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
export const profileEditForm = document.forms["profile-edit-form"];

//Add card declarations
export const cardAddModal = document.querySelector("#card-add-modal");
export const cardList = document.querySelector(".elements__list");
export const cardAddButton = document.querySelector("#profile-add-button");
export const cardInputTitle = document.querySelector("#card-input-title");
export const cardInputURL = document.querySelector("#card-input-url");
export const cardAddForm = document.forms["card-add-form"];

//Preview Image
export const previewImageModal = document.querySelector("#preview-image-modal");
export const previewImage = document.querySelector("#preview-image");
export const previewImageCaption = document.querySelector(
  "#image-preview-caption"
);
