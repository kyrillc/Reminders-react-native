"use strict";
import moment from "moment";

export default class DateTimeUtilities {
  /**
   * Returns a date rounded to 5 minutes from now, to which is added 5 minutes.
   *
   * **Example**: If current date&time is `01/12/2019 09:42`, nearFutureDate() will return 01/12/2019 09:45 + 5 minutes -> `01/12/2019 09:50`
   */
  static nearFutureDate() {
    var date = new Date();
    const rounded = this.roundedDate(date, 5);
    var future = moment(rounded).add(5, "minutes");
    return future.toDate();
  }

  static roundedDate(date, minutesToRoundTo) {
    const coeff = 1000 * 60 * minutesToRoundTo;
    return new Date(Math.round(date.getTime() / coeff) * coeff);
  }

  static formattedDateTimeString(date) {
    return (
      moment(date).format("ddd DD/MM/YYYY") +
      " at " +
      moment(date).format("HH:mm")
    );
  }
}
