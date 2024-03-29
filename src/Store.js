import isEmpty from 'lodash/isEmpty';
import { DateTime } from "luxon/src/luxon";

export default {
    state() {
        return {
            socDate: DateTime.local().startOf("day").toISODate(),
            userDateFormat: 'MM/dd/yyyy'
        };
    },

    mutations: {
        setSocDate(state, socDate) {
            state.socDate = socDate;
        },
        setUserDateFormat(state, userDateFormat) {
            state.userDateFormat = userDateFormat;
        }
    },

    actions: {
        async updateSocDate({ commit }, socDate) {
            if (isEmpty(socDate)) {
                return;
            }
            commit('setSocDate', socDate);
        },
        async updateUserDateFormat({ commit }, userDateFormat) {
            commit('setUserDateFormat', userDateFormat);
        }
    }
};