const format_date = (date_string: string) => {
  const date = new Date(date_string);

  const day = date.getUTCDate();
  const month_index = date.getUTCMonth();
  const year = date.getUTCFullYear();

  const month_names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${day} ${month_names[month_index]} ${year}`;
};

export default format_date;
