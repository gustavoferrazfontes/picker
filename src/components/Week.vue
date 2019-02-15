<template >
  <div class="trvl-picker-week">
    <span v-for="day in weeks" :key="day" class="trvl-picker-week-day">{{ day }}</span>
  </div>
</template>

<script>
export default {
  props: {
    weeks: {
      type: Array,
      default: () => ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
    }
  }
};
</script>


<style lang="scss">
.trvl-picker-week {
  display: flex;

  &-day {
    width: $day-size;
    font-size: 14px;
    text-align: center;
  }
}
</style>
