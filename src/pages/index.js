import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  profileEditForm,
  profileInputName,
  profileInputDescription,
  cardAddButton,
  cardAddForm,
  cardAddModal,
  profileEditModal,
} from "../utils/constants.js";
import {
  createNewCard,
  openModal,
  handleCardAddSubmit,
  closeModal,
} from "../utils/utils.js";
import UserInfo from "../components/UserInfo.js";
// import Popup from "../components/Popup.js";
// import PopupWithForm from "../components/PopupWithForm.js";
// import PopupWithImage from "../components/PopupWithImage.js";

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

cardAddButton.addEventListener("click", () => openModal(cardAddModal));

cardAddForm.addEventListener("submit", handleCardAddSubmit);

//Track User Info
const userInfo = new UserInfo("#profile-name", "#profile-description");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileInputName.value = userData.name;
  profileInputDescription.value = userData.job;
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newUserInfo = {
    name: profileInputName.value,
    job: profileInputDescription.value,
  };
  userInfo.setUserInfo(newUserInfo);
  closeModal(profileEditModal);
});
