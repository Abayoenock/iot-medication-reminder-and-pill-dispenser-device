import React from "react"
import bgImage from "../../Images/webImages/man-with-medical-problems.jpg"

import LottiePlayer from "../lottiePlayer/LottiePlayer"

import didYouKnow from "../../Lotties/did-u-know.json"
import hero from "../../Lotties/phone-blue.json"
import logo from "../../Lotties/pills.json"
import phoneAnimation from "../../Lotties/sms.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faQuoteLeftAlt,
  faQuoteRightAlt,
  faUserLock,
  faWifi,
} from "@fortawesome/free-solid-svg-icons"
import LoginForm from "../LogIn/LoginForm"
import { Route, Routes } from "react-router-dom"
import RegisterUser from "../LogIn/RegisterUser"
import ForgotPassword from "../LogIn/ForgotPassword"
function Home() {
  return (
    <>
      <header>
        <div className="w-full min-h-screen grid grid-cols-2   ">
          <div className=" w-full h-screen overflow-y-hidden bg-homeBg bg-cover bg-no-repeat bg-left  ">
            <div className="w-full h-full bg-black bg-opacity-70 backdrop-blur-[1px] flex flex-col relative">
              <div className="w-full h-[65%]">
                <div className=" flex items-center ">
                  <div className="flex h-[50px] w-fit text-3xl font-bold ml-[40px] mt-[40px] rounded-sm overflow-hidden">
                    {" "}
                    <span className="h-full w-full bg-white text-yellow-600 flex justify-center items-center  px-2 pl-0 ">
                      <span className="w-[55px] overflow-x-hidden">
                        <span className="w-[180%">
                          <LottiePlayer src={logo} loop={true} />
                        </span>
                      </span>
                      MEDICATION
                    </span>{" "}
                    <span className="h-full w-full bg-yellow-600 text-white flex justify-center items-center  px-2">
                      REMINDER
                    </span>{" "}
                  </div>
                </div>

                <div className=" w-[200px] ml-[13px]">
                  <LottiePlayer src={didYouKnow} loop={true} />
                </div>
                <div className="text-white w-full p-3 -translate-y-[60px] ">
                  <article className="pl-[30px] w-[80%] text-[13px]">
                    Approximately 50% of patients with chronic illnesses do not
                    take their medications as prescribed, And among elderly
                    individuals, the non-adherence rate can be as high as 70%
                  </article>
                </div>
              </div>
              <div className=" h-[55%]   text-white flex flex-col gap-3 -translate-y-[30px]">
                <h1 className="text-4xl font-bold w-fit self-center bg-white text-black z-1 p-1 px-2">
                  Good <span className="text-yellow-500 rotate-3">News</span>{" "}
                </h1>
                <div className=" bg-cyan-500 h-screen w-full bg-opacity-50 -translate-y-[40px] pt-[50px] relative rounded-tr-[80px] transition-all duration-300">
                  <div className=" w-[100px] absolute -top-14">
                    <LottiePlayer src={phoneAnimation} loop={true} />
                  </div>
                  <p className="text-[13px] text-opacity-70 w-[80%] pl-[42px]">
                    <FontAwesomeIcon icon={faQuoteLeftAlt} className="mr-2" />
                    Welcome to our world of smarter healthcare solutions.
                    Explore our IoT devices designed to seamlessly manage your
                    medications and enhance your well-being. Embrace the future
                    of health with us
                    <FontAwesomeIcon icon={faQuoteRightAlt} className="ml-2" />
                  </p>
                  <div className="w-[25%] absolute bottom-8 right-0 ">
                    <LottiePlayer src={hero} loop={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  bg-heroBg bg-cover   ">
            <div className="w-full h-full bg-cyan-300 bg-opacity-20 backdrop-blur-sm flex justify-center items-center">
              <div className=" flex w-[70%] bg-white p-3 rounded-md bg-opacity-70 shadow-sm backdrop-blur-[1px]">
                <Routes>
                  <Route path="/" element={<LoginForm />} />
                  <Route path="/create-account" element={<RegisterUser />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Home
