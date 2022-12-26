import Cookies from "js-cookie";

import * as localStorageUtils from "../../utils/localStorage";

describe("LocalStorageUtil", () => {
  it("The cookie is set at local storage", () => {
    localStorageUtils.saveToken("test", "test");

    const token = localStorageUtils.getToken("test");

    expect(token).toBe("test");

    Cookies.remove("test");
  });
});
