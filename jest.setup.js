import axios from "axios";

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