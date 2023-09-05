import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import LottiePlayer from "../lottiePlayer/LottiePlayer"
import logo from "../../Lotties/pills.json"

import {
  faGauge,
  faUsers,
  faCar,
  faUserGear,
  faBell,
  faPowerOff,
  faFileShield,
  faCogs,
} from "@fortawesome/free-solid-svg-icons"

import { AuthContext } from "../AdminDashbard/Dashboard"
import useFetch from "../useFetch"
import { NavLink } from "react-router-dom"
import "./activeLinkStyles.css"
import CurrentDateTime from "../pages/Dashboard/CurrentDateTime"
function DashboardSide({ navToggle, setNavToggle, logOut }) {
  const { token, userId, firstName, lastName, role } = useContext(AuthContext)
  const [summary, setSummary] = useState({})
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=summary`
  const { isLoading, isError, data: summaryData, fetchData } = useFetch(url)

  useEffect(() => {
    fetchData(token, setSummary)
    const intID = setInterval(() => {
      fetchData(token, setSummary)
    }, 1000)
    return () => {
      clearInterval(intID)
    }
  }, [])
  return (
    <>
      <aside
        className={` w-full transition-all duration-300 ${
          navToggle == false ? "-translate-x-full" : "translate-x-0"
        }  md:translate-x-0   md:w-[250px] fixed top-0 left-0 min-h-screen bg-hero2 bg-contain z-[30]`}
      >
        <div className=" w-full h-screen bg-cyan-900 bg-opacity-95 backdrop-blur-[1px]   ">
          <NavLink
            to={"./dashboard"}
            className=" w-full p-2 px-1 flex items-center gap-2  border-opacity-5 "
          >
            <div className="flex h-[50px] w-fit text-[9px] font-bold ml-[12px] mt-[40px] rounded-sm overflow-hidden">
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
          </NavLink>
          <div className="">
            <CurrentDateTime />
          </div>
          <ul className=" flex flex-col gap-0  w-full  mt-4 text-[15px]">
            {role == 1 && (
              <>
                <NavLink
                  to="./dashboard"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative pl-4  p-3  flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faGauge}
                      className=" text-xl opacity-90  "
                    />
                    Dashboard
                  </li>
                </NavLink>
                <NavLink
                  to="./notifications"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative pl-4  p-3  flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg    "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <div className="relative ">
                      <FontAwesomeIcon
                        icon={faBell}
                        className=" text-xl  opacity-90 "
                      />
                      <span className="absolute -top-2 -left-[10px]  p-[2px] px-[6px] text-center bg-red-700 text-xs rounded-sm font-semibold text-white">
                        {summary?.notifications ? summary?.notifications : 0}
                      </span>
                    </div>
                    Notifications
                  </li>
                </NavLink>
                <NavLink
                  to="./report"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative pl-4  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faFileShield}
                      className=" text-xl opacity-90  "
                    />{" "}
                    Report
                  </li>
                </NavLink>

                <NavLink
                  to="./settings"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "ActiveLink" : ""
                  }
                >
                  <li
                    className=" transition-all duration-300 w-full relative pl-4 p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                    onClick={() => {
                      if (window.innerWidth <= 500) {
                        setNavToggle(() => {
                          return !navToggle
                        })
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faCogs}
                      className=" text-xl  opacity-90  "
                    />
                    Settings
                  </li>
                </NavLink>
              </>
            )}

            {role == 0 && (
              <NavLink
                to="./users"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "ActiveLink" : ""
                }
              >
                <li
                  className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                  onClick={() => {
                    if (window.innerWidth <= 500) {
                      setNavToggle(() => {
                        return !navToggle
                      })
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className=" text-xl  opacity-90  "
                  />{" "}
                  Users
                </li>
              </NavLink>
            )}

            <NavLink
              to="./profile"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "ActiveLink" : ""
              }
            >
              <li
                className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
                onClick={() => {
                  if (window.innerWidth <= 500) {
                    setNavToggle(() => {
                      return !navToggle
                    })
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faUserGear}
                  className=" text-xl  opacity-90  "
                />{" "}
                Profile
              </li>
            </NavLink>
            <li
              className=" transition-all duration-300 w-full relative  p-3 flex gap-2 items-center  cursor-pointer   text-white hover:bg-white hover:bg-opacity-10 hover:pl-6 before:w-[20px] before:h-[20px] before:transition-all before:duration-300 before:bg-transparent before:absolute before:right-0 before:-top-[20px] before:rounded-lg after:w-[20px] after:h-[20px]  after:transition-all after:duration-300 after:bg-transparent after:absolute after:right-0 after:-bottom-[20px] after:rounded-lg   "
              onClick={() => {
                logOut()
              }}
            >
              <FontAwesomeIcon
                icon={faPowerOff}
                className=" text-xl  opacity-90  "
              />
              Logout
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default DashboardSide
