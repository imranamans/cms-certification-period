import { DateTime } from "luxon/src/luxon";

export default {

    currentDate() {
        return DateTime.local().startOf("day").toISODate();
    },

}