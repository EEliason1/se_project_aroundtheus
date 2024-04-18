import Section from "../components/Section.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, config, formValidators } from "../utils/constants.js";
// import { placeNewCard, createNewCard } from "../utils/utils.js";
// import Popup from "../components/Popup.js";
// import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithImage from "../components/PopupWithImage.js";

//Modals
const modals = document.querySelectorAll(".modal");

// //Profile edit declarations
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileInputName = document.querySelector("#profile-input-name");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileEditForm = document.forms["profile-edit-form"];

// //Add card declarations
const cardAddModal = document.querySelector("#card-add-modal");
const cardList = document.querySelector(".elements__list");
const cardAddButton = document.querySelector("#profile-add-button");
const cardInputTitle = document.querySelector("#card-input-title");
const cardInputURL = document.querySelector("#card-input-url");
const cardAddForm = document.forms["card-add-form"];

// //Preview Image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#image-preview-caption");

//Form Validators
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

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createNewCard(cardData, "#card-template");
      cardSection.addItem(cardElement);
    },
  },
  "elements__list"
);

cardSection.renderItems();
