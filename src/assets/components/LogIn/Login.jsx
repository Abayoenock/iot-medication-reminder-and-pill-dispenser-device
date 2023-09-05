import React from "react"
import LottiePlayer from "../lottiePlayer/LottiePlayer"
import phoneAnimation from "../../Lotties/iphoneX.json"
import bgAnimation from "../../Lotties/homeBg2.json"
import fuels from "../../Lotties/FUELS.json"
import { Route, Routes } from "react-router-dom"
import LoginForm from "./LoginForm"
import RegisterUser from "./RegisterUser"
import ForgotPassword from "./ForgotPassword"
function Login() {
  return (
    <div>
      <div className="bg-white ">
        <div className="flex justify-center h-screen">
          <div className="hidden bg-cover lg:block lg:w-[55%] relative">
            <div className=" w-full absolute bottom-0 left-0  ">
              <LottiePlayer src={bgAnimation} />
            </div>

            <div className="flex h-full px-20 bg-blue-700 backdrop-blur-[1px] bg-opacity-75">
              <div className="mt-12">
                <h2 className="text-4xl font-bold text-center text-white  ">
                  IOT Vehicle <span className="animate-pulse">Tracking </span>{" "}
                  <span className=" animate-spin ">& </span>
                  <span className="animate-pulse">Fuel</span> Monitoring system
                </h2>
              </div>
            </div>
            <div className=" w-[200px]  bg-white shadow-lg  rounded-lg pr-4 absolute top-1/2 right-20 z-2 bg-opacity-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-4 hover:-translate-x-3 hover:bg-opacity-80 ">
              <LottiePlayer src={fuels} />
            </div>
            <div className=" w-[200px] absolute bottom-0 -right-12  ">
              <LottiePlayer src={phoneAnimation} />
            </div>
          </div>

          <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-[45%]">
            {/* login form */}
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/create-account" element={<RegisterUser />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
