import { vcObjectKeyNull } from './other/value-checker';

export function userParser(data) {
  const user = vcObjectKeyNull('id')(vcObjectKeyNull('accessToken')(data));
  if (user) {
    user.token = user.token || user.accessToken;
    user.accessToken = user.token;
  }
  return user;
}
