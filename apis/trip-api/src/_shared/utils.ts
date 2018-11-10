export interface CommandResult {
  isSucceed: boolean;
  errors?: String[];
}

export function Err(message: String): CommandResult {
  return {
    isSucceed: false,
    errors: [message]
  };
}

export function Succeed(): CommandResult {
  return {
    isSucceed: true
  };
}
