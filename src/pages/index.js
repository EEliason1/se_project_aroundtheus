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
import Api from "../components/API.js";

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

//Create API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0e6b8e99-3fb6-490c-b2a5-5d193b29415c",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
    cardSection.renderItems(result);
  })
  .catch((err) => {
    console.error(err);
  });
