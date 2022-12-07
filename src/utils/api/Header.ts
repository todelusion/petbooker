class Header {
  headers: {
    Authorization: string;
  };

  constructor(token: string) {
    this.headers = { Authorization: `Bearer ${token}` };
  }
}

export default Header;
