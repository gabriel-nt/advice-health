export const possibleTimesInMinutes = Array.from(Array(10).keys())
  .map((item) => [
    {
      disabled: !!((item + 8) * 60 === 720 || (item + 8) * 60 === 750),
      startTimeInMinutes: (item + 8) * 60,
    },
    {
      disabled: !!((item + 8) * 60 === 720 || (item + 8) * 60 === 750),
      startTimeInMinutes: (item + 9) * 60 - 30,
    },
  ])
  .flat()
