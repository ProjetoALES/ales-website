import moment from 'moment-timezone'

export default function(ctx, inject) {
  moment.tz.guess()
  moment.updateLocale('pt-br', {
    calendar: {
      sameDay: '[Hoje às] LT',
      nextDay: '[Amanhã às] LT',
      nextWeek: 'dddd [às] LT',
      lastDay: '[Ontem às] LT',
      lastWeek() {
        return this.day() === 0 || this.day() === 6
          ? '[Último] dddd [às] LT' // Saturday + Sunday
          : '[Última] dddd [às] LT' // Monday - Friday
      },
      sameElse(now) {
        // If the date is in the past or the date is in the next year
        if (now.isAfter(this) || this.year() > now.year()) return 'L [às] LT'
        return 'D [de] MMMM [às] LT'
      }
    }
  })
  ctx.$moment = moment
  inject('moment', moment)
}
