import { makeAutoObservable } from 'mobx';

export default class UserStore {
   constructor() {
      this._isAuth = null;
      this._user = {};
      this._selectedUser = {};
      makeAutoObservable(this);
   }

   setIsAuth(bool) {
      this._isAuth = bool;
   }

   setUser(user) {
      this._user = user;
   }

   setSelectedUser(user) {
      this._selectedUser = user;
   }

   get isAuth() {
      return this._isAuth;
   }

   get user() {
      return this._user;
   }

   get selectedUser() {
      return this._selectedUser;
   }
}
