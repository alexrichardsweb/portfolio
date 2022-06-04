export default {
  COMPACT_NUMBER_FORMATTER: new Intl.NumberFormat(undefined, {
    notation: `compact`,
  }),
  DIVISIONS: [
    {
      amount: 60, name: `seconds`,
    },
    {
      amount: 60, name: `minutes`,
    },
    {
      amount: 24, name: `hours`,
    },
    {
      amount: 7, name: `days`,
    },
    {
      amount: 4.34524, name: `weeks`,
    },
    {
      amount: 12, name: `months`,
    },
    {
      amount: Number.POSITIVE_INFINITY, name: `years`,
    },
  ],
  RELATIVE_DATE_FORMATTER: new Intl.RelativeTimeFormat(undefined, {
    numeric: `auto`,
  }),
};
