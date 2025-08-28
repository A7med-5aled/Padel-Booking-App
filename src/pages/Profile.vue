<template>
  <!-- <h1>profile</h1> -->
  <!-- <h1 v-if="userBookings.length === 0">مفيش حجوزات</h1> -->

  <!-- <h1 v-for="book in userBookings" :key="book.id">
        {{ book.day }} <span v-for="hour in book.hourIndices" :key="hour">{{ hour }}</span>
    </h1> -->

  <section class="w-full min-h-screen bg-gray-200 pt-[50px] ">
    <div
      class="flex items-center flex-col bg-gray-300 p-5 m-auto rounded-[20px] shadow-2xl max-w-[800px]"
    >
      <div class="image overflow-hidden rounded-[50%] my-3">
        <img src="/person.jpg" alt="" class="w-[150px] mix-blend-image" />
      </div>
      <h1 class="font-medium text-[25px]">{{ userData.name }}</h1>
      <p class="text-[20px] text-gray-600">{{ userData.phone }}</p>

      <div class="bookings w-full">
        <h1 class="font-medium my-2 text-[20px] text-right my-5 mr-5">
           : الحجوزات بتاعتي
        </h1>
        <ul class="" v-if="userBookings.length">
          <li
            v-for="book in userBookings"
            :key="book.id"
            class="flex items-center bg-white/60 rounded-[15px] my-3 justify-between py-4 px-5 shadow-xl"
          >
            <div class="text-center">
              <h1>
                {{
                  new Date(book.startTime.seconds * 1000).toLocaleString(
                    "ar-EG",
                    {
                      weekday: "long",
                      // year: "numeric",
                      month: "long",
                      day: "numeric",
                      // hour: "2-digit",
                      // minute: "2-digit",
                    }
                  )
                }}
              </h1>
              <p class="text-gray-500">
                [ <span v-for="(hour , i) in book.hourIndices" :key="hour" 
                class="inline-block mx-1">{{ i== book.hourIndices.length-1 ? `${hour}` : `${hour} , ` }}</span>  ]
             
              </p>
            </div>
            <button
              class="font-bold cursor-pointer bg-blue-500 py-2 px-4 rounded-[8px] text-white hover:bg-blue-800 transition-all"
              @click="deleteBooking(book.id, book.userId)"
            >
              الغاء الحجز
            </button>
          </li>
        </ul>
        <h1 v-else class="text-center text-red-600 font-bold text-[18px]">مفيش مواعييد محجوزه </h1>
      </div>
    </div>
  </section>
</template>

<script>
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { mapGetters } from "vuex";
import { ssrExportNameKey } from "vite/module-runner";
export default {
  computed: {
    ...mapGetters("auth", {
      userBookings: "getUserBookings",
      userData: "getUserData",
    }),
  },
  mounted() {
    console.log("userBookings: ", this.userBookings);
  },
  methods: {
    async deleteBooking(id, userId) {
      const docRef = doc(db, "bookings", id);
      this.$store.commit("auth/loading");
      await deleteDoc(docRef);
      await this.$store.dispatch("auth/getUserBookings", userId);

      this.$store.commit("auth/stopLoading");
    },
  },
};
</script>
