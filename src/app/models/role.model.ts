const ROLES = [
  {
    CODE: 0,
    DISPLAY: 'Administrator',
    ROUTENAMES: ['top', 'admin', 'sample', 'charge', 'treasure']
  },
  {
    CODE: 1,
    DISPLAY: 'VIP',
    ROUTENAMES: ['top', 'sample', 'charge', 'treasure']
  },
  {
    CODE: 2,
    DISPLAY: 'User',
    ROUTENAMES: ['top', 'sample', 'charge']
  },
  {
    CODE: 9,
    DISPLAY: 'Visitor',
    ROUTENAMES: ['top', 'sample']
  }
];

export class Role {
  code: number;
  display: string;
  routeNames: string[];

  constructor (role: number) {
    let ROLE = ROLES.find(ONE => {
      return ONE.CODE === role;
    });
    if (!ROLE) { ROLE = ROLES[ROLES.length - 1]; }
    this.code = ROLE.CODE;
    this.display = ROLE.DISPLAY;
    this.routeNames = ROLE.ROUTENAMES;
  }

  checkAuthority (url: string): boolean {
    let routeName = url.split('/')[1];
    routeName = routeName.split(';')[0];
    if (!routeName) { routeName = 'top'; }
    return this.routeNames.some(one => {
      return routeName === one;
    });
  }

  get isAnonymous (): boolean {
    return this.code === 9;
  }

  get isAdministrator (): boolean {
    return this.code === 0;
  }

  get isVIP (): boolean {
    return this.code === 1;
  }

}
