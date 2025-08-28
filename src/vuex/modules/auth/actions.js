import { db } from "../../../firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import router from "../../../router/router";
let timeout;
export default {
  async signUp(context, payload) {
    const email = payload.email;
    const password = payload.password;
    const name = payload.name;

    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuKrUVS_bHepldclaBoyOkyunhB55o7qk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();

    if (!res.ok) {
      const error = new Error(data.error.message);
      throw error;
    }
    const tokenData = {
      userId: data.localId,
      tokenId: data.idToken,
      expiresIn: data.expiresIn,
      email: data.email,
      refreshToken: data.refreshToken,
    };
    localStorage.setItem("tokenData", JSON.stringify(tokenData));

    await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCuKrUVS_bHepldclaBoyOkyunhB55o7qk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: data.idToken,
        }),
      }
    );
    // const data2 = await verfiy.json();
    // console.log("this is verfiy", data2);

    await setDoc(doc(db, "users", data.localId), {
      name: name,
      email: email,
      key: password + "!!",
      createdAt: new Date(),
    });
    context.commit("setUser", {
      userId: data.localId,
      tokenId: data.idToken,
      expiresIn: data.expiresIn,
      email: data.email,
      refreshToken: data.refreshToken,
    });
    alert("تم إنشاء الحساب، من فضلك فعّل بريدك قبل تسجيل الدخول");
    router.replace({ name: "VerifyEmail" });

    // console.log(data);
  },
  async login(context, payload) {
    const email = payload.email;
    const password = payload.password;
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuKrUVS_bHepldclaBoyOkyunhB55o7qk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      const error = new Error(data.error.message);
      throw error;
    }
    const tokenData = {
      userId: data.localId,
      tokenId: data.idToken,
      expiresIn: data.expiresIn,
      email: data.email,
      refreshToken: data.refreshToken,
    };

    // 2️⃣ التحقق من حالة التفعيل
    const lookupRes = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCuKrUVS_bHepldclaBoyOkyunhB55o7qk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idToken: data.idToken }),
      }
    );

    const lookupData = await lookupRes.json();

    if (!lookupRes.ok) {
      throw new Error(lookupData.error.message);
    }
    const isVerified = lookupData.users[0].emailVerified;

    if (!isVerified) {
      alert("من فضلك فعل بريدك الإلكتروني قبل تسجيل الدخول.");
      return;
    }
    const expireDate = new Date().getTime() + +tokenData.expiresIn * 1000;
    localStorage.setItem(
      "tokenData",
      JSON.stringify({ ...tokenData, expireDate })
    );

    // 3️⃣ لو متفعل يدخل على السيستم
    // alert("تم تسجيل الدخول بنجاح!");
    context.commit("setUser", tokenData);

    router.push({ name: "Home" });
    context.dispatch("getUserBookings", data.localId);
    context.dispatch("getUserData", data.localId);
    context.dispatch("autoLogOut", +tokenData.expiresIn * 1000);
  },
  async getUserBookings(context, userId) {
    const now = new Date();
    const q = query(collection(db, "bookings"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const bookings = [];
    querySnapshot.forEach((doc) => {
      if (new Date(doc.data().startTime.seconds * 1000) > now) {
        bookings.push({ id: doc.id, ...doc.data() });
      }
    });
    localStorage.setItem("userBookings", JSON.stringify(bookings));
    context.commit("setUserBookings", bookings);
  },
  // userData
  async getUserData(context, userId) {
    const docRef = doc(db, "users", userId);
    const userData = await getDoc(docRef);
    localStorage.setItem("userData", JSON.stringify(userData.data()));

    context.commit("setUserData", userData.data());
  },
 async autoLogin(context) {
    const tokenData = JSON.parse(localStorage.getItem("tokenData"));
    if (!tokenData) return;
    const diff = tokenData.expireDate - new Date().getTime();
    if (diff > 10000) {
      context.dispatch("autoLogOut", diff);
    } else if (diff <= 0) {
      context.commit("logout");
    }

    console.log("data is : ", tokenData);
    context.commit("setUser", tokenData);
  },
  autoLogOut({ commit }, expiresIn) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      commit("logout");
    }, expiresIn);
  },
};
