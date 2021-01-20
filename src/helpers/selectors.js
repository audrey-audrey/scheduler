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
};


