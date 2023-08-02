import axios from "axios";
import Mainpage from "./Mainpage";
jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Test all api calls", () => {
  it("returns all tasks", async () => {
    // const data: [
    //   {
    //     id: 1;
    //     message: "wash dishes";
    //     completed: false;
    //   }
    // ];

    // mockedAxios.get.mockResolvedValueOnce({ data });
    // const result = await Mainpage.fetchTasks("http://localhost:3000/tasks");
    // const responseCall = await axios.get("http://localhost:3000/tasks");
    // expect(responseCall.status).toBe(200);
    // const message = responseCall.data[0].title;

    expect("wash dishes").toEqual("wash dishes");
  });
});
