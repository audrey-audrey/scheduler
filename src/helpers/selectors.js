/**
 * 
 * @param {*} state object - { days: [{ id: 1, 
 *                                      name: "Monday",  
 *                                      appointments: [1, 2, 3]}}, .... ], 
 *                            appointments: { "1": { id: 1,
                                                      time: "12pm",
                                                      interview: { student: "Archie Cohen", interviewer: 2 }}, ... }
 * @param {*} day string - "Monday" etc
 */
export function getAppointmentsForDay(state, day) {
  const resultsArr = [];
  const appointmentsArr = [];   // appointment ids only

  const days = state.days;
  const appointments = state.appointments;

  for (const item of days) {
    if (item.name === day) {
      appointmentsArr.push(...item.appointments);
    }
  }

  if (appointmentsArr.length) {
    for (const id of appointmentsArr) {
      resultsArr.push(appointments[id]);
    }
  }

  return resultsArr;
};

export function getInterview(state, interview) {
  let interviewData = null;
  const interviewers = state.interviewers;

  if (interview) {
    const interviewerID = interview.interviewer;
    interviewData = { ...interview, interviewer: interviewers[interviewerID] };
  }

  return interviewData;
}

export function getInterviewersForDay(state, day) {
  const resultsArr = [];
  const interviewersArr = [];   // interviewer ids only

  const days = state.days;
  const interviewers = state.interviewers;
  // console.log(interviewers)

  for (const item of days) {
    if (item.name === day) {
      interviewersArr.push(...item.interviewers);
    }
  }

  if (interviewersArr.length) {
    for (const id of interviewersArr) {
      resultsArr.push(interviewers[id]);
    }
  }

  return resultsArr;
};

