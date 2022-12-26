import Cookies from "js-cookie";

export function saveToken(token: string, tokenType: string) {
  Cookies.set(tokenType, token);
}

export function getToken(tokenType: string) {
  const token = Cookies.get(tokenType);

  if (!token) {
    return "";
  }

  return token;
}
