import axios from 'axios';

// Axios call to fetch info
export function fetchDays() {
  return axios({
    url: `/api/days`,
    method: 'GET'
  })
};

export function fetchAppointments() {
  return axios({
    url: `/api/appointments`,
    method: 'GET'
  })
};

export function fetchInterviewers() {
  return axios({
    url: `/api/interviewers`,
    method: 'GET'
  })
}