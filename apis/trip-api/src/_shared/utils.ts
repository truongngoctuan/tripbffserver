export interface CommandResult {
  isSucceed: boolean;
  errors?: String[];
  data: String;
}

export function Err(message: String): CommandResult {
  return {
    isSucceed: false,
    errors: [message],
    data: ''
  };
}

export function Succeed(): CommandResult {
  return {
    isSucceed: true,
    data: ''
  };
}

export function BadRequest(message: ReturnCode): CommandResult {
  return {
    isSucceed: false,
    errors: [message],
    data: ''
  }
}