import { cardList, formValidators } from "./constants.js";

import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";

export function createNewCard(cardData, template) {
  return new Card(cardData, template, handleImageClick).generateCard();
}

export function placeNewCard(cardData, wrapper) {
  const newCard = createNewCard(cardData, "#card-template");
  wrapper.prepend(newCard);
}

export function handleImageClick(name, link) {
  const popupWithImage = new PopupWithImage(name, link, "#preview-image-modal");
  popupWithImage.setEventListeners();
  popupWithImage.open(name, link);
}

export function openModal(modal) {
  modal.classList.add("modal_opened");
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

export const handleCardAddSubmit = (cardInfo) => {
  const newCardInfo = {
    name: cardInfo.title,
    link: cardInfo.link,
  };
  placeNewCard(newCardInfo, cardList);
  formValidators["card-add-form"].disableButton();
};
