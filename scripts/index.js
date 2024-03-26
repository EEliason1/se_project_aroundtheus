const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Profile Edit Declarations
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
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
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

//Functions
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardName = cardElement.querySelector(".elements__name");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardName.textContent = cardData.name;
  return cardElement;
}

function openPopup(modal) {
  if (modal == profileEditModal) {
    profileInputName.value = profileName.textContent;
    profileInputDescription.value = profileDescription.textContent;
  }
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileInputName.value;
  profileDescription.textContent = profileInputDescription.value;
  closePopup(profileEditModal);
}

function handleCardAddSubmit(evt) {
  evt.preventDefault();
  const name = cardInputTitle.value;
  const link = cardInputURL.value;
  const cardElement = getCardElement({ name, link });
  cardList.prepend(cardElement);
  closePopup(cardAddModal);
}

profileEditButton.addEventListener("click", () => openPopup(profileEditModal));
cardAddButton.addEventListener("click", () => openPopup(cardAddModal));

profileEditModalClose.addEventListener("click", () =>
  closePopup(profileEditModal)
);
cardAddModalClose.addEventListener("click", () => closePopup(cardAddModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
cardAddForm.addEventListener("submit", handleCardAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardList.prepend(cardElement);
});
