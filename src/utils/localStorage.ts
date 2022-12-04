import Cookies from "js-cookie";

export function saveAccessToken(accessToken: string) {
  Cookies.set("accessToken", accessToken);
}

export function saveRefreshToken(refreshToken: string) {
  Cookies.set("refreshToken", refreshToken);
}

export function getAccessToken(): string {
  const accessToken = Cookies.get("accessToken");

  if (!accessToken) {
    return "";
  }

  return accessToken;
}

export function getRefreshToken(): string {
  const refreshToken = Cookies.get("refreshToken");

  if (!refreshToken) {
    return "";
  }

  return refreshToken;
}
