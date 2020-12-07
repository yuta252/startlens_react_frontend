import React from 'react'

import { useDispatch } from "react-redux";
import { toggleSignIn } from "../auth/authSlice";
import { AppDispatch } from '../../app/store';

const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    // TODO: ログアウトはHeaderで実装する
    const Logout = () => {
        localStorage.removeItem("localJWT");
        dispatch(toggleSignIn());
        window.location.href = "/";
    };

    return (
        <div>
            <button onClick={() => Logout()}>ログアウト</button>
            <p>プロフィールページ</p>
        </div>
    )
}

export default Profile;
