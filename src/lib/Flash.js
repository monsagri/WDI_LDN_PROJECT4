class Flash {

  static _messages = null;

  static setMessage(type, message) {
    this._messages = this._messages || {};
    this._messages[type] = message;
    console.log(message);
  }

  static getMessages() {
    return this._messages;
  }

  static clearMessages() {
    this._messages = null;
  }
}

export default Flash;
