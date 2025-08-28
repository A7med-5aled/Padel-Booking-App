<template>
  <div class="w-full min-h-screen flex flex-col">
    <!-- Hero Section -->
    <section
      class="flex-1 bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white flex flex-col justify-center items-center text-center px-6 py-20"
    >
      <h1 class="text-4xl md:text-6xl font-bold mb-6">
        احجز بسهولة وسرعة
      </h1>
      <p class="text-lg md:text-xl max-w-2xl mb-8">
        موقعك المفضل للحجز  في أي وقت 
        اختار اليوم والساعة اللي تناسبك
      </p>
      <router-link
        :to="{name:'Booking'}"
        class="px-6 py-3 bg-teal-400 text-black font-semibold rounded-full shadow-lg hover:bg-teal-300 transition"
      >
        ابدأ الحجز الآن
    </router-link>
    </section>

    <!-- Image / Placeholder -->
    <section 
    class="bg-gray-100 py-16 px-6 text-center bg-purple-900 bg-[url('./padel2.jpg')] bg-cover bg-center bg-bottom   bg-blend-overlay" >
      <h2 class="text-2xl md:text-3xl text-white font-bold mb-8">عن ملعبنا</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <!-- صورة مؤقتة -->
        <div class="w-full h-64 bg-gray-300 rounded-lg shadow-md flex items-center justify-center text-gray-600 overflow-hidden">
          <img src="/padel2.jpg" alt="صوره الملعب"
          class="w-full h-full object-cover object-center">
        </div>
        <!-- وصف -->
        <p class="text-lg text-green-400 font-bold leading-relaxed">
          ملعبنا مجهز على أعلى مستوى، مصمم لعشاق رياضة البادل. سواء كنت محترف أو هاوي،
          تقدر تستمتع بأجواء مميزة وخدمة سهلة وسريعة في الحجز
        </p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>