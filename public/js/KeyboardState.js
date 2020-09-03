const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
  constructor() {
    // Holds the currents state of a given key
    this.keyStates = new Map();

    //holds the callback function for a keycode
    this.keyMap = new Map();
  }

  addMapping(keyCode, callback) {
    this.keyMap.set(keyCode, callback);
  }

  handleEvent(event) {
    const { keyCode } = event;

    if (!this.keyMap.has(keyCode)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === "keydown" ? PRESSED : RELEASED;
    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    this.keyMap.get(keyCode)(keyState);
    console.log(this.keyStates);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach((specificEvent) => {
      window.addEventListener(specificEvent, (event) => {
        this.handleEvent(event);
      });
    });
  }
}
