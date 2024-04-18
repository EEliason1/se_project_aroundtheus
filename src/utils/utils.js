import {
  previewImage,
  previewImageCaption,
  previewImageModal,
  cardInputTitle,
  cardInputURL,
  cardList,
  cardAddModal,
  cardAddForm,
  formValidators,
  profileDescription,
  profileInputDescription,
  profileName,
  profileInputName,
  profileEditModal,
} from "./constants.js";

import Card from "../components/Card.js";

export function createNewCard(cardData, template) {
  return new Card(cardData, template, handleImageClick).generateCard();
}

export function placeNewCard(cardData, wrapper) {
  const newCard = createNewCard(cardData, "#card-template");
  wrapper.prepend(newCard);
}

export function handleImageClick(name, link) {
  previewImage.src = link;
  previewImage.alt = name;
  previewImageCaption.textContent = name;
  openModal(previewImageModal);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleModalCloseEsc);
  modal.addEventListener("mousedown", handleModalCloseClick);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleModalCloseEsc);
  modal.removeEventListener("mousedown", handleModalCloseClick);
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

export function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const name = cardInputTitle.value;
  const link = cardInputURL.value;
  placeNewCard({ link, name }, cardList);
  closeModal(cardAddModal);
  cardAddForm.reset();
  formValidators["card-add-form"].disableButton();
}
