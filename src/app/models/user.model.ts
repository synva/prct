import { Data } from '../types/data';
import { Role } from './role.model';

export class User {
  id = '';
  password = '';
  role: Role;

  constructor (data: Data.User) {
    this.login(data);
  }

  login (data: Data.User) {
    if (data) {
      this.id = data._id;
      this.password = data.password;
      this.role = new Role(data.role);
    } else {
      this.logout();
    }
  }

  logout () {
    this.id = '';
    this.password = '';
    this.role = new Role(null);
  }

  get isAnonymous (): boolean {
    return this.role.isAnonymous;
  }

  get isAdministrator (): boolean {
    return this.role.isAdministrator;
  }

  get isVIP (): boolean {
    return this.role.isVIP;
  }

  checkAuthority (url: string): boolean {
    return this.role.checkAuthority(url);
  }

}
