export interface CommandResult {
  isSucceed: boolean;
  errors?: string[];
  data: string;
}

export function Err(message: string): CommandResult {
  return {
    isSucceed: false,
    errors: [message],
    data: "",
  };
}

export function Succeed(): CommandResult {
  return {
    isSucceed: true,
    data: "",
  };
}

export function BadRequest(message: ReturnCode): CommandResult {
  return {
    isSucceed: false,
    errors: [message],
    data: "",
  };
}

export function setupExtraFunction() {
  // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
      padString = String(typeof padString !== "undefined" ? padString : " ");
      if (this.length >= targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;
        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(this);
      }
    };
  }
}
