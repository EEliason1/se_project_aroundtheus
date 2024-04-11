// import Card from "../components/Card.js";
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

const cardData = {
  name: "Yosemite Valley",
  link: "./images/yosemite.jpg",
};

// CARD TEST
// const newTestCard = new Card(cardData, "#card-template");
// console.log(newTestCard);

// VALID TEST

//Modals
const modals = document.querySelectorAll(".modal");

//Profile edit declarations
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModalClose = profileEditModal.querySelector(
  "#profile-edit-modal-close-button"
);
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileInputName = document.querySelector("#profile-input-name");
const profileInputDescription = document.querySelector(
  "#profile-input-description"
);
const profileEditForm = document.querySelector("#profile-edit-form");

//Add card declarations
const cardAddModal = document.querySelector("#card-add-modal");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".elements__card");
const cardList = document.querySelector(".elements__list");
const cardAddButton = document.querySelector("#profile-add-button");
const cardAddModalClose = cardAddModal.querySelector(
  "#card-add-modal-close-button"
);
const cardTitle = document.querySelector("#card-title");
const cardURL = document.querySelector("#card-URL");
const cardInputTitle = document.querySelector("#card-input-title");
const cardInputURL = document.querySelector("#card-input-url");
const cardAddForm = document.querySelector("#card-add-form");

//Preview image
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageModalClose = document.querySelector(
  "#image-preview-close-button"
);
const previewImage = document.querySelector("#preview-image");
const previewImageCaption = document.querySelector("#image-preview-caption");

//Functions
function createNewCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardName = cardElement.querySelector(".elements__name");
  const likeButton = cardElement.querySelector("#like-button");
  const deleteButton = cardElement.querySelector("#card-delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;

  cardImage.addEventListener("click", () => {
    previewImage.src = cardImage.src;
    previewImage.alt = cardImage.name;
    previewImageCaption.textContent = cardName.textContent;
    openModal(previewImageModal);
  });

  return cardElement;
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
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
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
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  closeModal(cardAddModal);
  cardAddForm.reset();
}

function initializeProfileModal() {
  profileInputName.value = profileName.textContent;
  profileInputDescription.value = profileDescription.textContent;
  openModal(profileEditModal);
}

profileEditButton.addEventListener("click", initializeProfileModal);
cardAddButton.addEventListener("click", () => openModal(cardAddModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

initialCards.forEach((cardData) => createNewCard(cardData, cardList));
