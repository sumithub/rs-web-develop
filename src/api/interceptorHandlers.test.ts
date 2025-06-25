import { requestInterceptor, responseInterceptorError } from "./interceptorHandlers";

import type { InternalAxiosRequestConfig } from "axios";

describe("requestInterceptor", () => {
  let config: InternalAxiosRequestConfig;

  beforeEach(() => {
    localStorage.clear();
    config = {
      headers: {},
      method: "get",
      url: "/test",
    } as InternalAxiosRequestConfig; // Type assertion for minimum config
  });

  it("adds Authorization header if token exists", () => {
    localStorage.setItem("token", "mockToken");

    const result = requestInterceptor(config);

    expect(result.headers.Authorization).toBe("Bearer mockToken");
  });

  it("does not add Authorization header if no token", () => {
    const result = requestInterceptor(config);

    expect(result.headers.Authorization).toBeUndefined();
  });
});

describe("responseInterceptorError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("logs a warning for 401 Unauthorized", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const error = {
      response: { status: 401 },
    };

    await expect(responseInterceptorError(error)).rejects.toEqual(error);
    expect(warnSpy).toHaveBeenCalledWith("Unauthorized. Redirecting to login...");
  });

  it("logs an error for 500 Server Error", async () => {
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const error = {
      response: { status: 500 },
    };

    await expect(responseInterceptorError(error)).rejects.toEqual(error);
    expect(errorSpy).toHaveBeenCalledWith("Server error.");
  });

  it("does not log anything for other status codes", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    const error = {
      response: { status: 403 },
    };

    await expect(responseInterceptorError(error)).rejects.toEqual(error);
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });

  it("handles missing response object gracefully", async () => {
    const error = { message: "Some network error" };

    await expect(responseInterceptorError(error)).rejects.toEqual(error);
    // Should not throw even if response is missing
  });
});