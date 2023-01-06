import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: 実行時エラーになるのでコメントアウト
// import { getAnalytics } from "firebase/analytics";

// TODO: スネークケースとキャメルの相互変換Typeを作りたい
type ErrorResponse = {
  errorMessage: string;
};

export default async function handler(
  req: Pick<NextApiRequest, "method" | "body">,
  res: Pick<NextApiResponse<ErrorResponse>, "status" | "statusMessage">
) {
  if (req.method !== "POST") {
    return res.status(400).json({ errorMessage: "システムエラーです。" });
  }
  // TODO: bodyがanyなのでせめてobjectにキャストしたい...
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { email, password } = req.body;

  const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTU_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  };

  /* eslint @typescript-eslint/no-unused-vars: 0 */
  const app = initializeApp(firebaseConfig);
  // TODO: 実行時エラーになるのでコメントアウト
  // const analytics = getAnalytics(app);

  const auth = getAuth();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  await signInWithEmailAndPassword(auth, email, password)
    .then((e: UserCredential) => {
      return res.status(200);
    })
    .catch(() => {
      return res.status(401).json({
        errorMessage: "メールアドレスまたはパスワードが誤っています。",
      });
    });
}
