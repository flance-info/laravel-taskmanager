<template>
    <div class="col-md-3 mb-2">
        <label for="dateRange">Диапазон дат:</label>
        <VueDatePicker
            :format-locale="ru"
            v-model="localDateRange"
            range
            multi-calendars
            locale="ru"
            cancelText="Отмена"
            selectText="Применить"
            :format="format"

        />
    </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import {ru} from 'date-fns/locale';

export default {
    name: "DateRanges",
    props: ['selectedDateRange'],
    emits: ['update:selectedDateRange'],
    data() {
        return {
            format: "dd MMM yyyy",
            ru: ru,
            localDateRange: this.selectedDateRange,
        }
    },

    components: {
        VueDatePicker
    },
    methods: {
        updateSelectedDateRange(value) {
            this.$emit('update:selectedDateRange', value);
        },
        emitDateRangeChange() {
             this.$emit('update:selectedDateRange', this.localDateRange);
        }
    },
    watch: {
        // Watch for changes to the selectedDateRange prop and update localDateRange
        selectedDateRange: {
            handler(newValue) {
                this.localDateRange = newValue;
            },
            deep: true
        },
        localDateRange: {
            handler(newValue) {
                this.emitDateRangeChange();
            }

        },
    }
}
</script>
