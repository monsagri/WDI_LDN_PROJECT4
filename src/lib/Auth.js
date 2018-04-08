class Auth {


  static logout() {
    //when we log out, we remove the token
    localStorage.removeItem('token');
  }

  static setToken(token) {
    localStorage.setItem('token', token);
  }


  static getToken() {
    return localStorage.getItem('token');
  }


  // at the moment theres a 6 hours timeout on tokens
  static getPayload() {
    const token = this.getToken();
    if(!token) return false; // if there's no token return false, as we couldnt find the payload

    const parts = token.split('.');
    if (parts.length < 3) return false;

    return JSON.parse(atob(parts[1]));
  }


  static isAuthenticated() {

    const payload = this.getPayload();
    if(!payload || !payload.exp) return false;
    // payload.exp;
    // check that it hasnt expired
    const now = Math.round(Date.now() / 1000 );

    // we want to make sure the token is still valid

    return now < payload.exp;

  }

  // static isAuthenticated() {
  //
  //   // check for a token
  //   // check for valid JWT token
  //   const token = localStorage.getItem('token');
  //   if(!token) return false;
  //   //this will give us an array of 3 sections
  //   // token.split('.').length === 3;
  //   // check it has an expiry.  payload has the expiry, which is in the middle of the array.
  //   const parts = token.split('.');
  //   // parts.length === 3;
  //   if (parts.length < 3) return false;
  //   // payload = parts[1];
  //   // This is json, not an object.  Turn into an object
  //   // const payload = JSON.parse(atob(parts[1]));
  //   const payload = this.getPayload();
  //   if(!payload || payload.exp) return false;
  //   // payload.exp;
  //   // check that it hasnt expired
  //   const now = Math.round(Date.now() / 1000 );
  //
  //   // we want to make sure the token is still valid
  //
  //   return now < payload.exp;
  //
  // }

}

export default Auth;
