import { format } from 'date-fns'

export const formattedDate = (date) => {
  let tz = 'unknown'
  const day = date.toString().split(' ')[0]
  const timeStamp = date.toString().split(' ')[4]
  try {
    tz = /.*\s(.+)/.exec(
      new Date().toLocaleDateString(navigator.language, { timeZoneName: 'short' })
    )[1]
  } catch (e) {
    tz = new Date().toTimeString().match(new RegExp('[A-Z](?!.*[(])', 'g')).join('')
  }
  return `${day} | ${format(date, 'MM/dd/yyyy')} | ${timeStamp} | ${tz}`
}
