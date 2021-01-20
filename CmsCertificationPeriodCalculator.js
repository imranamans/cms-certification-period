
export default {
    data() {
        return {
            message: 'Select or enter a patient\'s start of care date to display the patient\'s home health certification period.',
            socDate: luxon.DateTime.local().toISODate(),
            defaultCertPeriodDisplayCount: 10
        };
    },
    methods: {
        getNextCertPeriod(socDate, index) {
            const certStart = luxon.DateTime.fromISO(socDate).plus({ days: (index - 1) * 60 });
            const certEnd = certStart.plus({ days: 59 });
            return {
                start: certStart,
                end: certEnd,
                isCurrent: this.isCurrentCertPeriod(certStart, certEnd)
            };
        },
        isCurrentCertPeriod(start, end) {
            const today = luxon.DateTime.local();
            return today <= end && today >= start;
        },
        getFormattedCertPeriod(certPeriod) {
            const {start, end, isCurrent} = certPeriod;
            return `Start: ${start.toFormat('MM/dd/yyyy')} End: ${end.toFormat('MM/dd/yyyy')} ${ isCurrent ? '< Current Cert Period' : ''}`;
        }
    },
    template: `
        <div class="container is-max-desktop">

            <div class="notification is-success is-light">{{message}}</div>

            <div id="certPeriodInputsForm">

                <div class="field is-horizontal">
                    <div class="field-label is-normal">
                        <label class="label">Start of Care Date</label>
                    </div>
                    <div class="field-body">
                        <p class="control">
                            <input id="socDate" v-model="socDate" class="input" type="date" placeholder="mm/dd/yyyy"/>
                        </p>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label is-normal"></div>
                    <div class="field-body">
                        <p>Or</p>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label">
                        <label class="label">Today is in the</label>
                    </div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" name="certWindow" id="first55Days"/>
                                        first 55 days of the Current Certification Period, optionally pick a day
                                </label>
                            </div>
                        </div>
                        <div class="field is-narrow">
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select id="dayInFirst55Days">
                                        <option v-for="n in 55" :key="n">{{n}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field is-horizontal">
                    <div class="field-label"></div>
                    <div class="field-body">
                        <div class="field is-narrow">
                            <div class="control">
                                <label class="radio">
                                    <input type="radio" name="certWindow" id="last5Days"/> 
                                        last 5 days of the Current Certification Period, optionally pick a day
                                </label>
                            </div>
                        </div>
                        <div class="field is-narrow">
                            <div class="control">
                                <div class="select is-fullwidth">
                                    <select id="dayInLast5Days">
                                        <option v-for="n in _.range(56, 61)" :key="n">{{n}}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="">
                <ul class="is-family-monospace has-text-weight-bold block">
                    <li v-for="n in defaultCertPeriodDisplayCount" :key="n"> Cert Period #{{ ('00' + n).slice(-2) }} {{ getFormattedCertPeriod(getNextCertPeriod(socDate, n)) }} </li>
                    <li><a @click="defaultCertPeriodDisplayCount = defaultCertPeriodDisplayCount + 3">more</a></li>
                </ul>
            </div>

        </div> <!-- container -->
        `
}