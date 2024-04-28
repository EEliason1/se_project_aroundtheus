import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  config,
  formValidators,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/API.js";

import "../pages/index.css";
import PopupWithDeleteConfirm from "../components/PopupWithDeleteConfirm.js";

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

//Create API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0e6b8e99-3fb6-490c-b2a5-5d193b29415c",
    "Content-Type": "application/json",
  },
});

//Card Actions
let cardSection;

api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createNewCard(cardData, "#card-template");
          cardSection.addItem(cardElement);
        },
      },
      "elements__list"
    );
    cardSection.renderItems();
  })
  .catch((err) => {
    console.error(err);
  });

//New Card Functions
function createNewCard(cardData, template) {
  return new Card(
    cardData,
    template,
    handleImageClick,
    handleDeleteClick
  ).generateCard();
}

function handleDeleteClick(cardId, cardElement) {
  confirmDelete.open(cardId, cardElement);
}

function handleDeleteSubmit(cardId, cardElement) {
  cardElement.remove();
  api.deleteCard({ _id: cardId }).then(() => {
    console.log("This post has been deleted");
  });
}

const confirmDelete = new PopupWithDeleteConfirm(
  "#card-delete-modal",
  handleDeleteSubmit
);

confirmDelete.setEventListeners();

const handleCardAddSubmit = (cardInfo) => {
  const newCardInfo = {
    name: cardInfo.title,
    link: cardInfo.link,
  };
  api.createCard(newCardInfo).then((newCard) => {
    const newCardElement = createNewCard(newCard, "#card-template");
    cardSection.addNewItem(newCardElement);
    formValidators["card-add-form"].disableButton();
  });
};

//Handle User Data
api
  .getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
  })
  .catch((err) => {
    console.error(err);
  });

const userInfo = new UserInfo("#profile-name", "#profile-description");

const initializeProfileEditForm = () => {
  api
    .getUserInfo()
    .then((userInfo) => {
      popupWithFormEdit.setInputValues(userInfo);
    })
    .catch((err) => {
      console.error(err);
    });
};

const handleProfileFormSubmit = (userInput) => {
  api
    .patchUserInfo(userInput)
    .then((input) => {
      userInfo.setUserInfo(input);
    })
    .catch((err) => {
      console.error(err);
    });
};

//Avatar Change
const handleAvatarEditSubmit = () => {};

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

const popupWithFormAvatar = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarEditSubmit
);

popupWithFormAvatar.setEventListeners();

avatarEditButton.addEventListener("click", () => {
  popupWithFormAvatar.open();
});

//Create Popup with Image
const popupWithImage = new PopupWithImage("#preview-image-modal");
popupWithImage.setEventListeners();

function handleImageClick(name, link) {
  popupWithImage.open(name, link);
}
