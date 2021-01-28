export function getAppointmentsForDay(state, day) {
  const resultsArr = [];
  const appointmentsArr = []; 

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
}

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
  const interviewersArr = []; 

  const days = state.days;
  const interviewers = state.interviewers;

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
}
