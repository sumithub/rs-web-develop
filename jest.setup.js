import axios from "axios";

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

jest.mock("axios");
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
 useRouter: () => ({
   push: mockPush,
   replace: jest.fn(),
   prefetch: jest.fn(),
   back: jest.fn()
 })
}));

afterEach(() => {
  jest.clearAllMocks();
});

global.mockPush = mockPush;