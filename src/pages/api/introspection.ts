import type { NextApiRequest, NextApiResponse } from "next";
import {
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: 実行時エラーになるのでコメントアウト
// import { getAnalytics } from "firebase/analytics";

type Data = {
  result: boolean;
};

// TODO: POSTで受けるようにする
export default async function handler(
  req: Pick<NextApiRequest, "query">,
  res: Pick<NextApiResponse<Data>, "status">
  /* eslint @typescript-eslint/explicit-function-return-type: 0 */
) {
  const { email, password } = req.query;

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

  auth.onAuthStateChanged((async (user) => {
      if (user) {
      } else {
        setSignInCheck(true);
      })

}
