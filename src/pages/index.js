import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  cardAddButton,
} from "../utils/constants.js";
import {
  createNewCard,
  handleCardAddSubmit,
  handleProfileFormSubmit,
  initializeProfileEditForm,
  userInfo,
} from "../utils/utils.js";
import PopupWithForm from "../components/PopupWithForm.js";

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
