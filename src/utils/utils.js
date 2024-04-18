// import {
//   profileEditButton,
//   cardAddButton,
//   profileEditForm,
//   cardAddForm,
//   initialCards,
//   cardList,
//   previewImage,
//   previewImageCaption,
//   previewImageModal,
// } from "./constants.js";

// import Card from "../components/Card.js";

// export const openModal = (modalWindow) => {
//   modalWindow.classList.add("modal__opened");
//   document.addEventListener("keyup", handleEscUp);
// };

// export const closeModal = (modalWindow) => {
//   modalWindow.classList.remove("modal__opened");
//   document.removeEventListener("keyup", handleEscUp);
// };

// export const handleEscUp = (evt) => {
//   evt.preventDefault();
//   isEscEvent(evt, closeModal);
// };

// export const isEscEvent = (evt, action) => {
//   const activePopup = document.querySelector(".modal__opened");
//   if (evt.key === "Esc") {
//     action(activePopup);
//   }
// };

// export const isCloseEvent = (evt, action) => {
//   const activePopup = document.querySelector(".modal__opened");
//   if (
//     evt.target.classList.contains("modal") ||
//     evt.target.classList.contains("modal__exit-button")
//   ) {
//     action(activePopup);
//   }
// };

// export function handleImageClick(name, link) {
//   previewImage.src = link;
//   previewImage.alt = name;
//   previewImageCaption.textContent = name;
//   openModal(previewImageModal);
// }

// export function createNewCard(cardData, template) {
//   return new Card(cardData, template, handleImageClick).generateCard();
// }

// export function placeNewCard(cardData, wrapper) {
//   const newCard = createNewCard(cardData, "#card-template");
//   wrapper.prepend(newCard);
// }

// // function handleProfileEditSubmit(evt) {
// //   evt.preventDefault();
// //   profileName.textContent = profileInputName.value;
// //   profileDescription.textContent = profileInputDescription.value;
// //   closeModal(profileEditModal);
// // }

// // function handleCardAddSubmit(evt) {
// //   evt.preventDefault();
// //   const name = cardInputTitle.value;
// //   const link = cardInputURL.value;
// //   placeNewCard({ link, name }, cardList);
// //   closeModal(cardAddModal);
// //   cardAddForm.reset();
// //   formValidators["card-add-form"].disableButton();
// // }

// // function initializeProfileModal() {
// //   profileInputName.value = profileName.textContent;
// //   profileInputDescription.value = profileDescription.textContent;
// //   openModal(profileEditModal);
// // }

// // profileEditButton.addEventListener("click", initializeProfileModal);
// // cardAddButton.addEventListener("click", () => openModal(cardAddModal));

// // profileEditForm.addEventListener("submit", handleProfileEditSubmit);
// // cardAddForm.addEventListener("submit", handleCardAddSubmit);
