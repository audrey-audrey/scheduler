const daysArr = [
  {
    id: 1,
    name: "Monday",
    appointments: "[1, 2, 3, 4, 5]",
    interviewers: "[3, 5, 6, 8, 9]",
    spots: 1,
  },
  {
    id: 2,
    name: "Tuesday",
    appointments: "[6, 7, 8, 9, 10]",
    interviewers: "[2, 5, 6, 8, 10]",
    spots: 2,
  },
  {
    id: 3,
    name: "Wednesday",
    appointments: "[11, 12, 13, 14, 15]",
    interviewers: "[2, 4, 7, 8, 10]",
    spots: 4,
  },
  {
    id: 4,
    name: "Thursday",
    appointments: "[16, 17, 18, 19, 20]",
    interviewers: "[1, 3, 4, 6, 9]",
    spots: 4,
  },
  {
    id: 5,
    name: "Friday",
    appointments: "[21, 22, 23, 24, 25]",
    interviewers: "[1, 3, 4, 6, 8]",
    spots: 3,
  },
];

const updateSpots = (daysArr, id, num) => {
  const newDaysArr = daysArr.map((day) =>
    day.appointments.includes(id) ? { ...day, spots: day.spots + num } : day
  );
  return newDaysArr;
};

console.log(updateSpots(daysArr, 3, 1));
