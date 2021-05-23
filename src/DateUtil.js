import { DateTime } from "luxon";

export default {

    currentDate() {
        return DateTime.local().startOf("day").toISODate();
    },

}