<template>
  <footer class="bg-gray-950 text-white pt-10 pb-6 px-4">
    <div
      class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
    >
      <!-- عمود 1: عن الملعب -->
      <div>
        <h2 class="text-lg font-bold mb-3">
          About <span class="font-bold text-red-700 text-[20px]">Best Padel : </span>
        </h2>
        <p class="text-sm text-white/70 leading-relaxed">
          At our court, we offer you a unique padel experience in a comfortable
          and enjoyable atmosphere. We’ve carefully designed the space so you
          can enjoy every moment .
        </p>
      </div>

      <!-- عمود 2: تواصل معنا -->
      <div>
        <h2 class="text-lg font-bold mb-3">تواصل معنا</h2>
        <ul class="space-y-2 text-sm text-white/80">
          <li>
            <i class="fas fa-phone-alt mr-2 text-blue-400"></i> ⁦+20 10
            94981753⁩
          </li>
          <li>
            <i class="fas fa-envelope mr-2 text-blue-400"></i>
            bestpadel1@gmail.com
          </li>
          <li>
            <i class="fas fa-map-marker-alt mr-2 text-blue-400"></i> السنبلاوين
            - اول طريق نوب - أمام ملعب الزمهلوية
          </li>
        </ul>
      </div>

      <!-- عمود 3: تابعنا -->
      <div class="flex flex-col items-center">
        <h2 class="text-lg font-bold mb-3">تابعنا</h2>
        <div class="flex space-x-4 mt-2">
          <a
            href="https://www.facebook.com/profile.php?id=61550753406794&mibextid=ZbWKwL"
            target="_blank"
            class="hover:text-blue-500 text-xl transition"
          >
            <i class="fab fa-facebook-square"></i>
          </a>
          <a
            href="https://www.instagram.com/best_padel1/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=="
            target="_blank"
            class="hover:text-pink-500 text-xl transition"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://chat.whatsapp.com/Le0YyQBrGXo8dNOQamVyxb"
            target="_blank"
            class="hover:text-sky-400 text-xl transition"
          >
            <i class="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>
    </div>

    <!-- الخط السفلي -->
    <div
      class="mt-10 border-t border-white/10 pt-4 text-center text-sm text-white/50"
    >
      © {{ currentYear }} Best Padel جميع الحقوق محفوظه
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>
