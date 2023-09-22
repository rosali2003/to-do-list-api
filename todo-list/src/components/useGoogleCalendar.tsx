import { GoogleLogin } from "react-google-login";
import axios from "axios";

export const useGoogleCalendar = () => {
  const loginGoogleCalendar = () => {
    const handleLoginSuccess = (response) => {
      const token = response.accessToken;
      createEvent(token);
    };

    return (
      <GoogleLogin
        clientId="567748474164-pa6hirvi6nmgdtmi5s0ccs3gma7n9vc3.apps.googleusercontent.com"
        buttonText="Sign in & Authorize Google Calendar"
        onSuccess={handleLoginSuccess}
        onFailure={(error) => console.error(error)}
        cookiePolicy={"single_host_origin"}
        responseType="code"
        accessType="offline"
        scope="openid email profile https://www.googleapis.com/auth/calendar"
      />
    );
  };

  function createEvent(token) {
    const endpoint =
      "https://www.googleapis.com/calendar/v3/calendars/primary/events";

    const event = {
      summary: "Test Event",
      start: {
        dateTime: "2023-10-01T10:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: "2023-10-01T11:00:00-07:00",
        timeZone: "America/Los_Angeles",
      },
    };

    axios
      .post(endpoint, event, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Event created:", response.data);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  }

  // const createGoogleCalendarEvent = () => {
  //   const event = {
  //     summary: "Meeting with John",
  //     start: {
  //       dateTime: "2023-09-14T09:00:00-07:00",
  //       timeZone: "America/Los_Angeles"
  //     },
  //     end: {
  //       dateTime: "2023-09-14T10:00:00-07:00",
  //       timeZone: "America/Los_Angeles"
  //     }
  //   };
  
  //   axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", event, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then(response => {
  //     console.log('Event created: ', response.data);
  //   })
  //   .catch(error => {
  //     console.error("Error creating event: ", error);
  //   });
  // };

  return { loginGoogleCalendar };
};


