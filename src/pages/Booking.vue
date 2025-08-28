<!-- <template>
  <main class="max-w-6xl mx-auto px-4 py-10">
    <h1 class="text-2xl font-bold mb-6 text-center">احجز ميعادك</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="(day, index) in weekSchedule"
        :key="index"
        class="bg-white rounded shadow p-4"
      >
        <h2 class="text-lg font-semibold mb-2 text-blue-600">{{ day.date }}</h2>
        <ul class="space-y-2">
          <li
            v-for="(slot, i) in day.slots"
            :key="i"
            class="flex justify-between items-center text-sm"
          >
            <span>{{ slot.time }}</span>
            <button
              class="bg-blue-500 text-white py-1 px-3 rounded text-xs hover:bg-blue-600 transition"
            >
              احجز
            </button>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      weekSchedule: [
        {
          date: "السبت 3 أغسطس",
          slots: [
            { time: "5:00 م" },
            { time: "6:00 م" },
            { time: "7:00 م" },
          ],
        },
        {
          date: "الأحد 4 أغسطس",
          slots: [
            { time: "4:00 م" },
            { time: "5:00 م" },
          ],
        },
        {
          date: "الإثنين 5 أغسطس",
          slots: [
            { time: "6:00 م" },
            { time: "7:00 م" },
          ],
        },
        // ... باقي الأسبوع حسب رغبتك
      ],
    };
  },
};
</script> -->

<template >
  <main class="w-[90%]  mx-auto px-4 py-10">
    <h1 class="text-2xl font-bold mb-6 text-center">نظام حجز المواعيد</h1>

    <div class="flex items-center  gap-10  justify-end">

      <div class="flex items-center gap-3 ">
        <label for="green">المواعييد المتاحه</label>
        <button
          id="green"
          class="bg-green-500 w-[30px] h-[30px] rounded"
        ></button>
      </div>
      <div class="flex items-center gap-3 ">
        <label for="gray">المواعييد المحجوزه</label>
        <button
          id="gray"
          class="bg-gray-500 w-[30px] h-[30px] rounded"
        ></button>
      </div>
    </div>
    <BookingGrid />
  </main>
</template>

<script>
import BookingGrid from "../components/BookingGrid.vue";

export default {
  components: {
    BookingGrid,
  },
};
</script>
