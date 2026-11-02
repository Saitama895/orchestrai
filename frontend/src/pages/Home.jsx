import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../utils/firebase";
import api from "../../utils/axios.js";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice.js";
import SideBar from "../components/SideBar.jsx";
import ChatArea from "../components/ChatArea.jsx";
import Artifact from "../components/Artifact.jsx";

function Home() {
    const {userData} = useSelector(state => state.user)
    console.log(userData)
    const dispatch = useDispatch()

    const handleLogin = async (token) => {
    try {
      const { data } = await api.post("/api/auth/login", { token });
      dispatch(setUserData(data))
    } catch (error) {
      console.error(
        "Backend login failed:",
        error.response?.data ?? error.message
      );
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      // Don't log the actual token in production.
      console.log("Firebase user:", result.user.uid);

      await handleLogin(token);
    } catch (error) { 
      console.error("Google sign-in failed:", error);
    }
  };

  return (
    <div className="h-screen bg-[#0d0f14] text-white overflow-hidden">
      
      <SideBar/>
      <ChatArea/>
      <Artifact/>

        {!userData &&
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
            <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight'>
                        Welcome to CortexAI
                    </h2>
                    <p className='text-[13px] text-slate-500'>
                        Please login to continue using the app.
                    </p>
                </div>

                <button className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-white bg-black/90 hover:bg-gray-200 hover:text-black transition-all duration-150 cursor-pointer' onClick={googleLogin}>
                    <FcGoogle size={15} />
                    Continue With Google
                </button>
            </div>
        </div>}

    </div>
  );
}

export default Home