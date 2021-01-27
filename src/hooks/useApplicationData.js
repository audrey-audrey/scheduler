import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  // setState funcs
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  useEffect(() => {

    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(
        ([days, appointments, interviewers]) => {
          setState((prev) => ({
            ...prev,
            days: days.data,
            appointments: appointments.data,
            interviewers: interviewers.data,
          }));
        }
      );
  }, []);

  // book interview
  function bookInterview(id, interview) {
    const daysArr = [...state.days];
    const addSpot = state.appointments[id].interview ? 0 : -1;
    const days = updateSpots(daysArr, id, addSpot);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, days, appointments }));
  }

  // cancelInterview
  function cancelInterview(id) {
    const addSpot = 1;
    const daysArr = [...state.days];

    const days = updateSpots(daysArr, id, addSpot);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`api/appointments/${id}`)
      .then(() => setState({ ...state, days, appointments }));
  }

  // update spots
  const updateSpots = (daysArr, id, num) => {
    const newDaysArr = daysArr.map((day) =>
      day.appointments.includes(id) ? { ...day, spots: day.spots + num } : day
    );
    return newDaysArr;
  };

  return { state, setDay, bookInterview, cancelInterview };
}
