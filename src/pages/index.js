import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

//Modals
const modals = document.querySelectorAll(".modal");

//Profile edit declarations
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileInputName = document.querySelector("#profile-input-name");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileEditForm = document.forms["profile-edit-form"];

//Add card declarations
const cardAddModal = document.querySelector("#card-add-modal");
const cardList = document.querySelector(".elements__list");
const cardAddButton = document.querySelector("#profile-add-button");
const cardInputTitle = document.querySelector("#card-input-title");
const cardInputURL = document.querySelector("#card-input-url");
const cardAddForm = document.forms["card-add-form"];

//Preview Image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#image-preview-caption");

//Form Validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

//Functions
function createNewCard(cardData, template) {
  return new Card(cardData, template, handleImageClick).generateCard();
}

function placeNewCard(cardData, wrapper) {
  const newCard = createNewCard(cardData, "#card-template");
  wrapper.prepend(newCard);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalCloseEsc);
  modal.addEventListener("mousedown", handleModalCloseClick);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalCloseEsc);
  modal.removeEventListener("mousedown", handleModalCloseClick);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closeModal(profileEditModal);
}

function handleModalCloseClick(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__exit-button")
  ) {
    closeModal(evt.currentTarget);
  }
}

function handleModalCloseEsc(evt) {
  if (evt.key == "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const name = cardInputTitle.value;
  const link = cardInputURL.value;
  placeNewCard({ link, name }, cardList);
  closeModal(cardAddModal);
  cardAddForm.reset();
  formValidators["card-add-form"].disableButton();
}

function initializeProfileModal() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
}

function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewImageCaption.textContent = name;
  openModal(previewImageModal);
}

profileEditButton.addEventListener("click", initializeProfileModal);
cardAddButton.addEventListener("click", () => openModal(cardAddModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

initialCards.forEach((cardData) => placeNewCard(cardData, cardList));
