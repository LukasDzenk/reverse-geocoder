const ONE_HOUR_IN_SECONDS = 60 * 60

const THREE_MONTHS_IN_SECONDS = 60 * 60 * 24 * 30 * 3
const THREE_MONTHS_IN_MILLISECONDS = THREE_MONTHS_IN_SECONDS * 1000

const getThreeMonthsAgoDate = () => {
  return new Date(Date.now() - THREE_MONTHS_IN_MILLISECONDS)
}

const time = {
  ONE_HOUR_IN_SECONDS,
  THREE_MONTHS_IN_SECONDS,

  getThreeMonthsAgoDate,
} as const

export default time
