import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";

// 🔐 Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🔑 로그인 함수
export async function loginWithGoogle(): Promise<{ user: User; token: string }> {
  const auth = getAuth();

  // ✅ 세션 기반으로 로그인 유지 설정 (브라우저 껐을 때 자동 로그아웃됨)
  await setPersistence(auth, browserSessionPersistence);
  
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account", // ✅ 핵심 부분!
  });

  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const token = await user.getIdToken();
  return { user: result.user, token };
}

export { auth };