import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { handlePostRequest } from '../../utils/api/axios';

export const connectToFacebook = async () => {
  const provider = new FacebookAuthProvider().addScope(
    'email, pages_show_list,instagram_basic,pages_read_engagement,pages_manage_metadata,pages_manage_ads'
  );
  const result = await signInWithPopup(auth, provider);
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  return { token };
};

export const disconnectFromFacebook = async () => {
  await auth.signOut();
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider().addScope(
    'email, pages_show_list,instagram_basic,pages_read_engagement,pages_manage_metadata,pages_manage_ads'
  );
  const result = await signInWithPopup(auth, provider);

  const cred = FacebookAuthProvider.credentialFromResult(result);
  const user = result.user;
  console.log(cred, user);
  return await handlePostRequest('facebook/signin', { ...user, ...cred });
};
