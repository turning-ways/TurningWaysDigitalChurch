export const formatTheDate = (dateString: string): string => {
    const date = new Date(dateString);

    const getOrdinalNum = (n: number) => {
      return (
        n +
        (n > 0
          ? ["th", "st", "nd", "rd"][
              (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
            ]
          : "")
      );
    };

    const day = getOrdinalNum(date.getUTCDate());
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getUTCFullYear();

    let hours = date.getUTCHours() + 1;
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${day} ${month} ${year} ${formattedTime}`;
  };