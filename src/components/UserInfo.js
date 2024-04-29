export default class UserInfo {
  constructor(userNameSelector, userJobSelector, userAvatarSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.innerText,
      about: this._userJob.innerText,
      avatar: this._userAvatar.src,
    };
    return userInfo;
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.innerText = name;
    this._userJob.innerText = about;
    this._userAvatar.src = avatar;
  }
}
