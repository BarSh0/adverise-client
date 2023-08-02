import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { handlePostRequest } from '../../utils/api/axios';

export const connectToTwitter = async () => {
  const provider = new TwitterAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const credential = TwitterAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  const secret = credential?.secret;
  return { token, secret };
};

export const disconnectFromTwitter = async () => {
  await auth.signOut();
};

export const signInWithTwitter = async () => {
  const provider = new TwitterAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const cred = TwitterAuthProvider.credentialFromResult(result);
  const user = result.user;
  return await handlePostRequest('twitter/signin', { ...user, ...cred });
};
