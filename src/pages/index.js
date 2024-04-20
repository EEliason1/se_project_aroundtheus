import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  cardAddButton,
  cardList,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import "../pages/index.css";

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

//Create Card Section
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

//New Card Functions
function createNewCard(cardData, template) {
  return new Card(cardData, template, handleImageClick).generateCard();
}

const handleCardAddSubmit = (cardInfo) => {
  const newCardInfo = {
    name: cardInfo.title,
    link: cardInfo.link,
  };
  cardSection.addNewItem(createNewCard(newCardInfo, "#card-template"));
  formValidators["card-add-form"].disableButton();
};

//Handle User Data
const userInfo = new UserInfo("#profile-name", "#profile-description");

const initializeProfileEditForm = (userInfo) => {
  const userData = userInfo.getUserInfo();
  popupWithFormEdit.setInputValues(userData);
};

const handleProfileFormSubmit = (userInput) => {
  userInfo.setUserInfo(userInput);
};

//Create Popups With Forms
const popupWithFormEdit = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileFormSubmit
);
popupWithFormEdit.setEventListeners();

profileEditButton.addEventListener("click", () => {
  initializeProfileEditForm(userInfo);
  popupWithFormEdit.open();
});

const popupWithFormCard = new PopupWithForm(
  "#card-add-modal",
  handleCardAddSubmit
);
popupWithFormCard.setEventListeners();

cardAddButton.addEventListener("click", () => {
  popupWithFormCard.open();
});

//Create Popup with Image
const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}
