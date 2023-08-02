// add test for TodoCard
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

// Create a new instance of the mock adapter
const mock = new MockAdapter(axios);

// Mock a GET request to '/api/data' and return a response
mock.onGet("/api/data").reply(200, { data: "Mocked data" });

// Test your code that uses Axios
test("fetches data using Axios", async () => {
  const response = await axios.get("/api/data");
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ data: "Mocked data" });
});
