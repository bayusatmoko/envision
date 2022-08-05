import moment from 'moment'

export const successResponse = (req, res, data, code = 200) => res.send({
  code,
  data,
  success: true,
});

export const errorResponse = (
  req,
  res,
  errorMessage = 'Something went wrong',
  code = 500,
  error = {},
) => res.status(500).json({
  code,
  errorMessage,
  error,
  data: null,
  success: false,
});

// export const checkIfToday = (birthdayDate, location) => {
//   const today = moment().tz(process.env.SERVER_TIMEZONE);
//   const userBirthday = moment.tz(birthdayDate, 'YYYY-MM-DD', location)
//   return today.date() === userBirthday.date() && today.month() === userBirthday.month()
// };

export const checkIfToday = (birthdayDate) => {
  const today = moment().utc();
  const userBirthday = moment(birthdayDate).utc()
  return today.date() === userBirthday.date() && today.month() === userBirthday.month()
};

export const isBirthdayDayPassed = (birthdayDate) => {
  const today = moment().utc();
  const userBirthday = moment(birthdayDate).utc().add(1, 'days')
  return today.date() > userBirthday.date() && today.month() >= userBirthday.month()
};

export const shouldSendMessage = (sendTime, status) => {
  const today = moment().utc();
  const userSendTime = moment(sendTime).utc() 
  return status == "FAILED" || today.hour() >= userSendTime.hour()
};

export const convertToUTC = (date, location) => {
  return moment.tz(date, location).utc().format('MM-DD-YYYY HH:mm:ss')
}

export const addTime = (date, hour) => {
  return moment(date).utc().add(hour, 'hours')
}

