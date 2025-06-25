const axiosMock = {
  post: jest.fn(),
  get: jest.fn(),
  create: jest.fn(() => axiosMock), // important for axiosInstance.create()
  interceptors: {
    request: { use: jest.fn() },
    response: { use: jest.fn() },
  },
};

export default axiosMock;