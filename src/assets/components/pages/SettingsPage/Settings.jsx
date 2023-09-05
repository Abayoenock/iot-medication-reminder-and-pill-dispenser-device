import React, { useContext, useEffect, useState } from "react"
import { useSubmit } from "react-router-dom"
import useSubmitData from "../../useSubmitData/useSubmitData"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import DotMin from "../../loaders/minDotLoader/DotMin"
import { toast } from "react-toastify"
import ReminderList from "./RemindersList"
function Settings() {
  const [slot1, setSlot1] = useState(false)
  const [slot2, setSlot2] = useState(false)
  const { token } = useContext(AuthContext)
  const [isSubmit, setIsSubmit] = useState(false)
  const [serverResponse, setServerResponse] = useState({})
  const [listKey, setListKey] = useState(0)
  const [inputValues, setInPutValues] = useState({
    medName1: "",
    medName2: "",
    pills1: "",
    pills2: "",
    time: "",
  })
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=add-time`
  const { isLoading, isError, data, SubmitData } = useSubmitData(
    url,
    token,
    setServerResponse
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmit(true)
    let formBody = JSON.stringify(inputValues)
    console.log(formBody)
    SubmitData(formBody)
  }

  useEffect(() => {
    const updateResponse = () => {
      setServerResponse(serverResponse)
      if (!serverResponse?.success) {
        toast.error(serverResponse?.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmit(false)

        return
      }
      if (serverResponse?.success) {
        toast.success(serverResponse?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
        setIsSubmit(false)
        setSlot1(false)
        setSlot2(false)
        setInPutValues({
          medName1: "",
          medName2: "",
          pills1: "",
          pills2: "",
          time: "",
        })
        setListKey((prev) => prev + 1)
        return
      }
    }
    updateResponse()
  }, [serverResponse])

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setInPutValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }))
  }
  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-5">
        <div className=" col-span-3">
          <ReminderList key={listKey} />
        </div>
        <div className="w-full pt-[30px] p-8 col-span-2">
          <form
            className="w-full bg-cyan-900 text-white  rounded-lg relative pt-[80px] px-4 p-6 flex flex-col gap-8"
            method="post"
            onSubmit={handleSubmit}
          >
            <div className=" absolute left-4 -top-4 text-gray-800 ">
              <input
                type="time"
                className="border-[1px] border-dotted focus:outline-0 transition-all duration-300 focus:border-dashed rounded-md px-6 p-2 border-cyan-700 shadow-custom-input "
                placeholder="Time"
                name="time"
                value={inputValues.time}
                onChange={handleInputChange}
              />
            </div>
            <div className=" border-[1px] border-dashed border-cyan-200 p-2 pt-4 relative">
              <span className="p-2 px-3 flex justify-center items-center font-bold absolute bg-yellow-500 text-black rounded-md -top-[14px] -right-[10px] gap-3 text-xs z-10">
                {" "}
                <input
                  type="checkBox"
                  checked={slot1}
                  onChange={() => {
                    setSlot1(!slot1)
                    setInPutValues({ ...inputValues, medName1: "", pills1: "" })
                  }}
                />
                slot 1
              </span>
              <div
                className={`${
                  !slot1
                    ? " absolute top-0 left-0 w-full bg-black bg-opacity-10 h-full backdrop-blur-[0.7px] z-1"
                    : "z-0  hidden"
                } `}
              ></div>
              <div
                className={` ${
                  !slot1 && "pointer-events-none"
                } relative z-0 mb-6 w-full group`}
              >
                <input
                  type="text"
                  name="medName1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white-600 peer"
                  placeholder=" "
                  disabled={!slot1}
                  value={inputValues.medName1}
                  onChange={handleInputChange}
                  required
                />
                <label
                  htmlFor="medName1"
                  className="absolute text-xs text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Medication Name
                </label>
              </div>
              <div
                className={` ${
                  !slot1 && "pointer-events-none"
                } relative z-0 mb-6 w-full group`}
              >
                <input
                  type="number"
                  name="pills1"
                  className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white-600 peer"
                  min={1}
                  placeholder=" "
                  required
                  value={inputValues.pills1}
                  onChange={handleInputChange}
                  disabled={!slot1}
                />
                <label
                  htmlFor="medName1"
                  className="absolute text-xs text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Number of Pills
                </label>
              </div>
            </div>
            <div className=" border-[1px] border-dashed border-cyan-200 p-2 pt-4 relative">
              <span className="p-2 px-3 flex justify-center items-center font-bold absolute bg-yellow-500 text-black rounded-md -top-[14px] -right-[10px] gap-3 text-xs z-10">
                {" "}
                <input
                  type="checkBox"
                  checked={slot2}
                  onChange={() => {
                    setSlot2(!slot2)
                    setInPutValues({ ...inputValues, medName2: "", pills2: "" })
                  }}
                />
                slot 2
              </span>
              <div
                className={`${
                  !slot2
                    ? " absolute top-0 left-0 w-full bg-black bg-opacity-10 h-full backdrop-blur-[0.7px] z-1"
                    : "z-0  hidden"
                } `}
              ></div>
              <div
                className={` ${
                  !slot2 && "pointer-events-none"
                } relative z-0 mb-6 w-full group`}
              >
                <input
                  type="text"
                  name="medName2"
                  className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white-600 peer"
                  placeholder=" "
                  value={inputValues.medName2}
                  onChange={handleInputChange}
                  disabled={!slot2}
                  required
                />
                <label
                  htmlFor="medName1"
                  className="absolute text-xs text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Medication Name
                </label>
              </div>
              <div
                className={` ${
                  !slot2 && "pointer-events-none"
                } relative z-0 mb-6 w-full group`}
              >
                <input
                  type="number"
                  name="pills2"
                  className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-white-600 peer"
                  min={1}
                  placeholder=" "
                  value={inputValues.pills2}
                  onChange={handleInputChange}
                  required
                  disabled={!slot2}
                />
                <label
                  htmlFor="pills2"
                  className="absolute text-xs text-gray-200  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-white  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Number of Pills
                </label>
              </div>
            </div>
            <div className="w-full flex  ">
              <button
                type="submit"
                disabled={
                  !(
                    inputValues.time &&
                    ((inputValues.medName1 && inputValues.pills1) ||
                      (inputValues.medName2 && inputValues.pills2))
                  )
                }
                className={`${
                  !(
                    inputValues.time &&
                    ((inputValues.medName1 && inputValues.pills1) ||
                      (inputValues.medName2 && inputValues.pills2))
                  )
                    ? "bg-gray-400 cursor-not-allowed "
                    : "bg-cyan-700 hover:bg-cyan-800"
                }  w-full  text-white   focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm   px-5 py-2.5 text-center `}
              >
                Add reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Settings
