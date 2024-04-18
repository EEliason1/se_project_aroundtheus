export default class UserInfo {
  constructor(userNameSelector, userJobSelector) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._userName.innerText,
      job: this._userJob.innerText,
    };
    return userInfo;
  }

  setUserInfo({ name, job }) {
    this._userName.innerText = name;
    this._userJob.innerText = job;
  }
}
