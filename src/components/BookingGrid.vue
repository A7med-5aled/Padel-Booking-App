<template>
  <div
    class="sm:w-[80%] grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] gap-5 mx-auto px-4 py-5"
  >
    <div
      v-for="(day, dayIndex) in upcomingDays"
      :key="dayIndex"
      class="bg-white rounded-lg shadow-md p-5 text-center"
    >
      <h2 class="text-lg font-bold text-blue-700 mb-4">
        {{ day.label }}
      </h2>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <button
          v-for="(hour, hourIndex) in hours"
          :key="hourIndex"
          @click="handleSlotClick(dayIndex, hourIndex)"
          :disabled="isBooked(dayIndex, hourIndex)"
          :class="[
            'py-2 rounded text-sm font-medium transition',
            isBooked(dayIndex, hourIndex)
              ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600 text-white',
          ]"
        >
          {{ `${hour.slice(0, -2)}:00 ${hour.slice(-1)}` }}
        </button>
      </div>
    </div>

    <!-- Modal تأكيد الحجز -->
    <div
      v-if="selectedSlot"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 text-right"
    >
      <div class="bg-white rounded shadow-lg p-6 w-[90%] max-w-md">
        <h2 class="text-xl font-bold mb-4 text-center">تأكيد الحجز</h2>

        <p class="mb-2 text-gray-700 font-bold">
          الموعد :
          <span class="text-blue-700 font-semibold"
            >{{ selectedSlot.day }} - {{ selectedSlot.time }}</span
          >
        </p>

        <!-- اختيار المدة -->
        <label
          :class="{
            'block mt-4 mb-2 font-medium text-gray-800': true,
            'text-red-500': isOk,
          }"
          >: مدة الحجز</label
        >
        <select
          v-model="selectedDuration"
          :class="{
            'w-full border border-gray-300 rounded p-2 mb-4': true,
            'border-red-500': isOk,
          }"
        >
          <option v-for="n in 5" :key="n" :value="n">{{ n }} ساعة</option>
        </select>
        <!-- رقم الفون -->
        <input
          v-if="!userData.phone"
          type="tel"
          inputmode="numeric"
          placeholder="من فضلك ادخل رقم هاتفك للتواصل "
          class="py-2 px-4 shadow w-full mb-10 text-center"
          v-model="phone"
        />
        <!-- الأزرار -->
        <div class="flex justify-end gap-3">
          <button
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded"
            @click="cancelBooking"
          >
            إلغاء
          </button>
          <button
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
            @click="confirmBooking"
          >
            تأكيد
          </button>
        </div>
        <!-- <h1 v-if="isOk" class="text-center mt-5 font-bold text-red-500">
          مده الحجز قد اي لو سمحت ؟
        </h1>
        <h1 v-if="timeExceed" class="text-center mt-5 font-bold text-red-500">
          برجاء التواصل مع الادمن لحجز مواعييد بعد الساعه 5 ص
        </h1> -->
        <p v-if="isOk" class="text-center mt-5 font-semibold text-red-500">
          من فضلك اختر مدة الحجز
        </p>
        <p
          v-if="timeExceed"
          class="text-center mt-5 font-semibold text-red-500"
        >
          برجاء التواصل مع الإدارة لحجز مواعيد بعد الساعة 5 ص
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Timestamp } from "firebase/firestore";

const dayNames = [
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];
const months = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];
import { createBooking } from "../services/bookingService";
import { getAllBookings } from "../services/bookingService";
import { db } from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      upcomingDays: this.generateUpcomingDays(),
      hours: [
        "6 م",
        "7 م",
        "8 م",
        "9 م",
        "10 م",
        "11 م",
        "12 ص",
        "1 ص",
        "2 ص",
        "3 ص",
        "4 ص",
        "5 ص",
      ],
      bookedSlots: [],
      selectedSlot: null,
      selectedDuration: null,
      isOk: false,
      timeExceed: false,
      phone: null,
    };
  },
  computed: {
    ...mapGetters("auth", {
      userData: "getUserData",
    }),
  },
  mounted() {
    this.loadBookedSlots();
    console.log(this.upcomingDays);
  },

  methods: {
    // generateUpcomingDays() {
    //   const today = new Date();
    //   return Array.from({ length: 30 }).map((_, i) => {
    //     if (i === 0)
    //       const date = new Date(today);
    //       date.setDate(today.getDate() - 1);
    //       const dayName = dayNames[date.getDay()];
    //       const monthName = months[date.getMonth()];
    //       const dateLabel = `${dayName} ${date.getDate()} ${monthName}`;
    //       return {
    //         label: dateLabel,
    //         // date: date.toISOString().split("T")[0],
    //       };
    //     })
    //     // console.log(i, " ");
    //     const date = new Date(today);
    //     date.setDate(today.getDate() + (i-1));
    //     // const newDate = new Date(date);
    //     const dayName = dayNames[date.getDay()];
    //     const monthName = months[date.getMonth()];
    //     const dateLabel = `${dayName} ${date.getDate()} ${monthName}`;
    //     return {
    //       label: dateLabel,
    //       date: date.toISOString().split("T")[0],
    //     };
    //   });
    // },
    generateUpcomingDays() {
      const today = new Date();

      return Array.from({ length: 30 }).map((_, i) => {
        let date = new Date(today);

        if (i === 0) {
          // أول عنصر = اليوم السابق
          date.setDate(today.getDate() - 1);
        } else {
          // باقي العناصر = اليوم الحالي + (i - 1)
          date.setDate(today.getDate() + (i - 1));
        }

        const dayName = dayNames[date.getDay()];
        const monthName = months[date.getMonth()];
        const dateLabel = `${dayName} ${date.getDate()} ${monthName}`;

        return {
          label: dateLabel,
          date: date.toISOString().split("T")[0],
        };
      });
    },

    isBooked(dayIndex, hourIndex) {
      if (this.isTimePast(dayIndex, hourIndex)) return true;
      return this.bookedSlots.some(
        (slot) => slot.dayIndex === dayIndex && slot.hourIndex === hourIndex
      );
    },
    isTimePast(dayIndex, hourIndex) {
      // if (dayIndex == 0 || dayIndex == 1) {
      //   const date = new Date();
      //   const year = date.getFullYear();
      //   let month = date.getMonth() + 1;
      //   let day = date.getDate();
      //   let hour = this.hours[hourIndex];
      //   const isAm = hour.slice(-1);
      //   if (hour.includes("م") && hour != "12 م") {
      //     hour = hour.slice(0, -1);
      //     hour = +hour + 12;
      //   } else if (hour == "12 م") {
      //     hour = "12";
      //   } else if (hour == "12 ص") {
      //     hour = "00";
      //   } else {
      //     hour = hour.slice(0, -2);
      //     hour = hour.padStart(2, "0");
      //   }
      //   if (+day < 10) {
      //     day = "0" + day;
      //   }
      //   if (+month < 10) {
      //     month = "0" + month;
      //   }

      //   const timeStamp = new Date(`${year}-${month}-${day}T${hour}:00:00`);
      // if (isAm == "م") {
      //   if (timeStamp.getTime() < date.getTime()) {
      //     return true;
      //   }
      // } else {
      //   const newDate = new Date(date);
      //   newDate.setDate(date.getDate() + 1);
      //   if (timeStamp > newDate) {
      //     return true;
      //   }
      // }
      // }
      const time = this.upcomingDays[dayIndex].date;

      let hour = this.hours[hourIndex];
      let isAm = false;
      if (hour.includes("م") && hour == "12 م") {
        hour = "12";
      } else if (hour.includes("م") && hour != "12 م") {
        hour = hour.slice(0, -2);
        hour = +hour + 12;
        hour = hour + "";
      } else {
        isAm = true;
        if (hour == "12 ص") {
          hour = "00";
        } else {
          hour = hour.slice(0, -2);
          hour = hour.padStart(2, "0");
        }
      }

      const startTime = new Date(`${time}T${hour}:00`);
      if (isAm) startTime.setDate(startTime.getDate() + 1);
      const now = new Date();

      if (startTime < now) {
        return true;
      }

      return false;
    },
    // handel reservation state
    handleSlotClick(dayIndex, hourIndex) {
      if (this.isBooked(dayIndex, hourIndex)) return;
      this.selectedSlot = {
        day: this.upcomingDays[dayIndex].label,
        time: this.hours[hourIndex],
        dayIndex,
        hourIndex,
      };
    },
    cancelBooking() {
      this.selectedSlot = null;
      this.selectedDuration = null;
      this.isOk = false;
      this.timeExceed = false;
    },
    async confirmBooking() {
      this.$store.commit("auth/loading");

      const regex = /^01[0-2,5]{1}[0-9]{8}$/;
      //  تاريخ اليوم
      const time = this.upcomingDays[this.selectedSlot.dayIndex].date;

      let hour = this.hours[this.selectedSlot.hourIndex];
      let isAm = false;
      if (hour.includes("م") && hour == "12 م") {
        hour = "12";
      } else if (hour.includes("م") && hour != "12 م") {
        hour = hour.slice(0, -2);
        hour = +hour + 12;
        hour = hour + "";
      } else {
        isAm = true;
        if (hour == "12 ص") {
          hour = "00";
        } else {
          hour = hour.slice(0, -2);
          hour = hour.padStart(2, "0");
        }
      }

      const startTime = new Date(`${time}T${hour}:00`);
      if (isAm) startTime.setDate(startTime.getDate() + 1);
      // console.log(startTime);
      this.isOk = false;
      this.timeExceed = false;

      // التأكد من اختيار المدة
      if (!this.selectedDuration) {
        this.isOk = true;
        return;
      }
      if (!this.userData.phone && !regex.test(this.phone)) {
        alert("❌ رقم هاتف غير صالح");
        return;
      }
      // this.selectedDuration+=1;
      // التأكد من عدم تجاوز الوقت المسموح
      if (
        this.selectedDuration > 1 &&
        this.selectedSlot.hourIndex + this.selectedDuration > 12
      ) {
        this.timeExceed = true;
        return;
      }

      // إنشاء مصفوفة بالساعات المطلوبة
      const timeSlots = [];
      for (let i = 0; i < this.selectedDuration; i++) {
        const hourIndex = this.selectedSlot.hourIndex + i;
        if (this.isBooked(this.selectedSlot.dayIndex, hourIndex)) {
          alert("‼️ برجاء اختيار مواعيد متاحة");
          return;
        }
        timeSlots.push(this.hours[hourIndex]);
      }
      const userId = this.$store.getters["auth/userId"];

      // بناء بيانات الحجز
      const bookingData = {
        userId,
        startTime,
        phone: this.userData.phone || this.phone,
        day: this.upcomingDays[this.selectedSlot.dayIndex].label,
        hourIndices: timeSlots,
        timestamp: new Date().toISOString(), // ممكن نستخدمه للترتيب أو المراجعة
      };

      try {
        const docRef = doc(db, "users", userId);
        if (!this.userData.phone && this.phone) {
          await updateDoc(docRef, { phone: this.phone });
        }

        await createBooking(bookingData);
        this.$store.commit("auth/stopLoading");
        // الحفظ في Firestore
        alert("✅ تم الحجز بنجاح");

        // ممكن تحدث البيانات المحلية برضه لو حبيت
        for (let i = 0; i < this.selectedDuration; i++) {
          this.bookedSlots.push({
            dayIndex: this.selectedSlot.dayIndex,
            hourIndex: this.selectedSlot.hourIndex + i,
          });
        }
        this.$store.dispatch("auth/getUserBookings", userId);

        // تصفير المتغيرات
        this.selectedSlot = null;
        this.selectedDuration = null;
      } catch (error) {
        alert("❌ حصل خطأ أثناء الحجز");
        console.error(error);
      }
    },
    async loadBookedSlots() {
      this.$store.commit("auth/loading");

      const bookings = await getAllBookings();

      // نحول الداتا المحلية لصيغة bookedSlots
      const updatedSlots = [];

      bookings.forEach((booking) => {
        const dayIndex = this.upcomingDays.findIndex(
          (d) => d.label === booking.day
        );

        if (dayIndex !== -1) {
          booking.hourIndices.forEach((hourLabel) => {
            const hourIndex = this.hours.indexOf(hourLabel);
            if (hourIndex !== -1) {
              updatedSlots.push({ dayIndex, hourIndex });
            }
          });
        }
      });

      this.bookedSlots = updatedSlots;
      this.$store.commit("auth/stopLoading");
    },
  },
};
</script>
