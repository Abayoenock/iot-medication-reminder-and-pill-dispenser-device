import React, { useContext, useEffect, useState } from "react"
import Avatar from "@mui/material/Avatar"
import ImageAvatar from "../../Images/webImages/avatar.webp"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAddressCard, faPowerOff } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../AdminDashbard/Dashboard"
function DashboardHeader({ navToggle, setNavToggle, logOut }) {
  const userProfileData = useContext(AuthContext)
  const [avatarMenu, setAvatarMenu] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#navLinks") && avatarMenu == true) {
        setAvatarMenu(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <>
      <header
        className={`flex transition-all duration-300 ${
          navToggle == false
            ? "bg-cyan-50 bg-opacity-80 shadow-sm backdrop-blur-sm z-[90]"
            : " bg-transparent z-[33]  "
        }  w-full  justify-between  md:justify-end p-2 px-8 items-center gap-2 md:z-[30] fixed top-[0px]  `}
      >
        <div
          className={`flex gap-x-4 flex-row-reverse md:flex-row items-center transition-all duration-500 ease-out ${
            navToggle == false ? "flex" : "hidden"
          }`}
        >
          <p className="text-sm font-semibold ">
            <span className="text-blue-600 ">Hi</span> ,{" "}
            {userProfileData.firstName} {userProfileData.lastName}
          </p>
          <div className="relative">
            <Avatar
              alt={userProfileData.firstName}
              src={userProfileData.profile ? userProfileData.profile : Avatar}
              sx={{
                cursor: "pointer",
                backgroundColor: "rgba(22 78 99)",
                color: "white",
              }}
              onClick={() => {
                setAvatarMenu((currentState) => {
                  return !currentState
                })
              }}
            />

            <div className="absolute -right-2 -bottom-[85px] ">
              <ul
                id="navLinks"
                className={` w-fit min-w-[140px] bg-blue-100  backdrop-blur-sm  flex-col gap-3 p-2 rounded-md  px-4 before:absolute  before:w-[10px] before:h-[10px] before:bg-blue-100 before:right-6 before:-top-[5px] before:rotate-45 shadow-md  z-[9999]  transition-all duration-300  ${
                  avatarMenu == true
                    ? "flex opacity-100 "
                    : "   hidden opacity-0 "
                }   `}
              >
                <NavLink to="./profile">
                  <li
                    className="flex gap-3 items-center"
                    onClick={() => {
                      setAvatarMenu(false)
                    }}
                  >
                    <FontAwesomeIcon icon={faAddressCard} />
                    Profile
                  </li>
                </NavLink>

                <li className="flex gap-3 items-center" onClick={logOut}>
                  <FontAwesomeIcon icon={faPowerOff} />
                  Log Out
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="z-[100] flex items-center ">
          <input
            type="checkbox"
            id="menu"
            checked={navToggle}
            onChange={() => {
              setNavToggle(() => {
                return !navToggle
              })
            }}
          />
          <label htmlFor="menu" className="icon icon2 md:hidden   ">
            <div className="menu"></div>
          </label>
        </div>
      </header>
    </>
  )
}

export default DashboardHeader
