import { AnyAction, Dispatch, ThunkDispatch } from '@reduxjs/toolkit';
import {
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { NavigateFunction } from 'react-router-dom';
import { logout } from 'store/ducks/userSlice';

type signInWithGoogleDispatch = ThunkDispatch<
  {
    user: {
      user: {
        authChecked: boolean;
        avatar: string;
        description: string;
        nickname: string;
        uid: string;
      };
    };
  },
  undefined,
  AnyAction
> &
  Dispatch<AnyAction>;

export const signInWithGoogle = async (
  navigate: NavigateFunction,
  dispatch: signInWithGoogleDispatch,
  fromPathName: string
) => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);

    if (getAdditionalUserInfo(result)?.isNewUser) {
      navigate('/onboarding', {
        state: {
          from: {
            pathname: fromPathName,
          },
        },
      });
      return;
    }
    navigate(fromPathName);
  } catch (error: any) {
    dispatch(logout());
    if (error.code === 'auth/account-exists-with-different-credential') {
      alert(
        `${error.customData.email}は他のSNSと連携した既存ユーザーが登録済みです。既存ユーザーでログイン後、こちらのSNSとの連携が可能です`
      );
      return;
    }
    alert(`ログイン/新規登録に失敗しました。\n${error.message}`);
  }
};
