// src/services/bookingService.js

import { db } from "../firebase"; // بنستورد الاتصال بـ Firebase
import { collection, addDoc, getDocs } from "firebase/firestore";

// 🔸 اسم المجموعة (اللي هي جدول الحجوزات)
const bookingsCollection = collection(db, "bookings");

// 🔹 1. إنشاء حجز جديد
export async function createBooking(data) {
  try {
    const docRef = await addDoc(bookingsCollection, data);
    console.log("✅ تم إنشاء الحجز برقم:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ حصل خطأ أثناء الحجز:", error);
    throw error;
  }
}

// 🔹 2. قراءة كل الحجوزات
export async function getAllBookings() {
  try {
    const snapshot = await getDocs(bookingsCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("❌ فشل في جلب الحجوزات:", error);
    throw error;
  }
}
