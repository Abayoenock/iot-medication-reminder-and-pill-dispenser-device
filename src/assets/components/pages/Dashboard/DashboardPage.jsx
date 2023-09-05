import React, { useContext, useEffect, useRef, useState } from "react"

import { AuthContext } from "../../AdminDashbard/Dashboard"

import DashboardStats from "./DashboardStats"
import { LineChartAdmin } from "../../charts/LineChart/LineChartAdmin"
import Select from "react-select"
import ReminderList from "../SettingsPage/RemindersList"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
function DashboardPage() {
  const { token, userId, firstName, lastName } = useContext(AuthContext)

  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())

  const optionsMonth = [
    {
      value: "",
      label: "Select Month",
    },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "Septemper" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const optionsYear = [
    {
      value: "",
      label: "Select Year",
    },
    { value: "2022", label: "2022" },
    { value: "2023", label: "2023" },
    { value: "2024", label: "2024" },
  ]

  return (
    <div className="w-full flex  flex-col p-3 ">
      <DashboardStats />
      <div className=" w-full grid grid-cols-1 md:grid-cols-6 ">
        <div className=" w-full col-span-3 pt-[10px] no-header">
          <div className="flex justify-between pb-[20px]">
            <h1 className="text-cyan-800 font-semibold text-lg pl-[20px]  pb-2 ">
              Active reminders{" "}
            </h1>
            <NavLink to={"../settings"}>
              <button className="mr-[20px] p-2 px-3 bg-cyan-700 text-white flex items-center gap-2 text-xs rounded-md cursor-pointer transition-all duration-300 hover:bg-cyan-900">
                <FontAwesomeIcon icon={faClock} /> Add new Reminder
              </button>
            </NavLink>
          </div>

          <ReminderList />
        </div>
        <div className=" w-full col-span-3">
          <div className="w-full  border-[1px] border-cyan-300 border-dotted p-6  mt-5">
            <div className="w-full flex gap-3">
              <div className="flex flex-col text-[12px] w-fit  gap-2">
                <label htmlFor="Month">Month</label>
                <Select
                  className="basic-single focus:border-cyan-300"
                  classNamePrefix="select"
                  defaultValue={optionsMonth[new Date().getMonth() + 1]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="Month"
                  options={optionsMonth}
                  onChange={(selected) => {
                    setMonth(selected.value)
                  }}
                />
              </div>
              <div className="flex flex-col text-[12px] w-fit  gap-2">
                <label htmlFor="Month">Year</label>
                <Select
                  className="basic-single focus:border-cyan-300"
                  classNamePrefix="select"
                  defaultValue={optionsYear[2]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  name="Year"
                  options={optionsYear}
                  onChange={(selected) => {
                    setYear(selected.value)
                  }}
                />
              </div>
            </div>
            <div className="w-full min-h-[300px] ">
              <LineChartAdmin year={year} month={month} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
