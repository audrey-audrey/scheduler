import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // State
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  };

  // Using reducer
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day };
      case SET_APPLICATION_DATA:
        const { days, appointments, interviewers } = action.value;
        return {
          ...state,
          days,
          appointments,
          interviewers
        };
      case SET_INTERVIEW: {
        const { days, appointments } = action.value;
        return { ...state, days, appointments };
      }
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // setState funcs
  const setDay = (day) => dispatch({ type: SET_DAY, day: day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then(([days, appointments, interviewers]) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data,
        },
      });
    });
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
      .then(()=>dispatch({ type: SET_INTERVIEW, value: { days, appointments } }));
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
      .then(()=>dispatch({ type: SET_INTERVIEW, value: { days, appointments } }));
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