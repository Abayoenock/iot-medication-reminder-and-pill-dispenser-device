import React, { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock, faPills, faWifi } from "@fortawesome/free-solid-svg-icons"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import useFetch from "../../useFetch"
import { getTimeDifference } from "./LastSeen"
function DashboardStats() {
  const { token, userId, firstName, lastName } = useContext(AuthContext)
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
    <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 pb-4">
      <div className="w-full shadow-lg rounded-md border-[1px] border-blue-100 p-2 px-4 relative bg-cyan-800 text-white transition-all duration-300 hover:scale-105 cursor-pointer ">
        <div className="">
          <h2 className="font-semibold text-[13px] opacity-60 ">
            Active Reminders
          </h2>

          <p className="text-2xl opacity-80">
            {summary?.reminders ? summary?.reminders : 0}&nbsp;
          </p>
        </div>
        <FontAwesomeIcon
          icon={faClock}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 bg-cyan-700 p-2 text-gray-100 rounded-md "
        />
      </div>

      <div className="w-full shadow-lg rounded-md border-[1px] border-blue-100 p-2 px-4 relative bg-red-700 text-white transition-all duration-300 hover:scale-105 cursor-pointer ">
        <div className="">
          <h2 className="font-semibold text-[13px] opacity-60 ">
            Missed Medication
          </h2>

          <p className="text-2xl opacity-80">{summary?.missed}&nbsp;</p>
        </div>
        <FontAwesomeIcon
          icon={faPills}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 bg-red-800 p-2 text-gray-100 rounded-md "
        />
      </div>

      <div className="w-full shadow-lg rounded-md border-[1px] border-blue-100 p-2 px-4 relative bg-green-700 text-white transition-all duration-300 hover:scale-105 cursor-pointer ">
        <div className="">
          <h2 className="font-semibold text-[13px] opacity-60 ">
            Taken Medication
          </h2>

          <p className="text-2xl opacity-80">{summary?.taken}&nbsp;</p>
        </div>

        <FontAwesomeIcon
          icon={faPills}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 bg-green-800 p-2 text-gray-100 rounded-md "
        />
      </div>

      <div className="w-full shadow-lg rounded-md border-dotted border-[1px] border-blue-100 p-2 px-4 relative  text-gray-700 transition-all duration-300 hover:scale-105 cursor-pointer ">
        <div className="">
          <h2 className="font-semibold text-[13px] opacity-60 ">
            Device Active
          </h2>

          <p className="text-xs opacity-80 mt-2">
            {summary?.lastSeen
              ? getTimeDifference(summary?.lastSeen)
              : "No Data"}
            &nbsp;
          </p>
        </div>

        <FontAwesomeIcon
          icon={faWifi}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl opacity-80 bg-yellow-600 p-2 text-gray-100 animate-pulse rounded-md "
        />
      </div>
    </div>
  )
}

export default DashboardStats
