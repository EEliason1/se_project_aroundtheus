import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  cardAddButton,
  profileInputName,
  profileInputDescription,
} from "../utils/constants.js";
import { createNewCard, handleCardAddSubmit } from "../utils/utils.js";
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

//Handle User Data
const userInfo = new UserInfo("#profile-name", "#profile-description");

const initializeProfileEditForm = (userInfo) => {
  const userData = userInfo.getUserInfo();
  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;
};

const handleProfileFormSubmit = (userInput) => {
  const newUserInfo = {
    name: userInput.name,
    job: userInput.job,
  };
  userInfo.setUserInfo(newUserInfo);
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
