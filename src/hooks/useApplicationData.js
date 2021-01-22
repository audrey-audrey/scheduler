import { useState, useEffect } from 'react';
import axios from 'axios';

import { fetchDays, fetchAppointments, fetchInterviewers } from "../helpers/helperFunctions";

export default function useApplicationData() {

  // State
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  // setState funcs
  const setDay = day => setState(prev => ({ ...prev, day }));

  // Axios call to fetch info
  useEffect(() => {
    Promise.all([
      fetchDays(),
      fetchAppointments(),
      fetchInterviewers()
    ])
      .then(([days, appointments, interviewers]) => {
        setState(prev => ({
          ...prev,
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }))
      })
  }, [])

  // book interview
  function bookInterview(id, interview) {
    const addSpot = -1;
    const daysArr = [...state.days];
    
    const days = updateSpots(daysArr, id, addSpot);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`api/appointments/${id}`, { interview })
      .then(() => setState({ ...state, days, appointments }))
  }

  // cancelInterview 
  function cancelInterview(id) {

    const addSpot = 1;
    const daysArr = [...state.days];
    
    const days = updateSpots(daysArr, id, addSpot);

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`api/appointments/${id}`)
      .then(() => setState({ ...state, days, appointments }))
  }

  // alt
  const updateSpots = (daysArr, id, num) => {
    let newDaysArr = [];
    
    for (const day of daysArr) {
      if(day.appointments.includes(id)) {
        const newSpots = day.spots + num;
        newDaysArr.push({...day, spots:newSpots})
      } else {
        newDaysArr.push(day);
      }
    };

    return newDaysArr;
  };

  return { state, setDay, bookInterview, cancelInterview }
}