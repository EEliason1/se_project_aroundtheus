//Default cards object
import yosemiteImage from "../images/yosemite.jpg";
import lakeLouiseImage from "../images/lake-louise.jpg";
import baldMountainsImage from "../images/bald-mountains.jpg";
import latemarImage from "../images/latemar.jpg";
import vanoiseImage from "../images/vanoise.jpg";
import lagoImage from "../images/lago.jpg";

export const initialCards = [
  {
    name: "Yosemite Valley",
    link: yosemiteImage,
  },
  {
    name: "Lake Louise",
    link: lakeLouiseImage,
  },
  {
    name: "Bald Mountains",
    link: baldMountainsImage,
  },
  {
    name: "Latemar",
    link: latemarImage,
  },
  {
    name: "Vanoise National Park",
    link: vanoiseImage,
  },
  {
    name: "Lago di Braies",
    link: lagoImage,
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

//Change Avatar Form
export const avatarModal = document.querySelector("#avatar-edit-modal");
export const avatarForm = avatarModal.querySelector("#avatar-edit-form");
export const avatarEditButton = document.querySelector("#avatar-edit-button");

export const loadingButtonText = "Saving...";
