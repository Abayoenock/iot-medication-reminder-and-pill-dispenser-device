import React, { useContext, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import LottiePlayer from "../../lottiePlayer/LottiePlayer"
import sms from "../../../Lotties/sms.json"
import { getTimeDifference } from "../Dashboard/LastSeen"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})
import {
  faTrashCan,
  faCheck,
  faEnvelopeOpenText,
  faEnvelopeCircleCheck,
} from "@fortawesome/free-solid-svg-icons"
import DataTable from "react-data-table-component"
import useFetch from "../../useFetch"
import { AuthContext } from "../../AdminDashbard/Dashboard"
import { toast } from "react-toastify"
import { NavLink, Navigate } from "react-router-dom"
import PageLoader from "../../loaders/pageLoader/PageLoader"

const Notifications = () => {
  const [selectedRows, setSelectedRows] = useState([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [usersData, setUsersData] = useState([])
  const [notificationUpdate, setNotificationUpdate] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [openDialogMessage, setOpenDialogMessage] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [selectedMessageDelete, setSelectedMessageDelete] = useState(null)
  const [messageID, setMessageID] = useState(0)
  const { token } = useContext(AuthContext)
  const url = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=notifications`
  const { isLoading, isError, data: driverData, fetchData } = useFetch(url)
  const mYcallBackFunction = () => {
    fetchData(token, setUsersData)
  }
  useEffect(() => {
    fetchData(token, setUsersData)
    setIsDataLoading(false)
  }, [])

  const urlUpdate = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=notificationsUpdate&msgID=${messageID}`
  const { data: dataUpdate, fetchData: fetchDataUpdate } = useFetch(urlUpdate)
  useEffect(() => {
    const updateSeen = (msgID) => {
      fetchDataUpdate(token, setNotificationUpdate)
    }
    updateSeen()
  }, [messageID])

  const urlDelete = `${
    import.meta.env.VITE_REACT_API_URL
  }/api/requestData.php?t=delete&tbl=notification&col_Name=notificationID&dataID=${selectedMessageDelete}`
  const [success, setSuccess] = useState([])
  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    data,
    fetchData: fetchDataDelete,
  } = useFetch(urlDelete)
  const deleteUser = () => {
    fetchDataDelete(token, setSuccess)
    handleCloseDialog()
  }
  useEffect(() => {
    handleCloseDialog()
    if (success.valid) {
      toast.success(`Message successfuly deleted `, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      mYcallBackFunction()
    } else if (success.valid == false) {
      toast.success(` Failed to delete Message , please try again later `, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }
  }, [success])

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleClickOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialogLock = () => {
    setOpenDialogMessage(false)
  }
  const handleClickOpenDialogMessage = () => {
    setOpenDialogMessage(true)
  }

  const handleChange = (state) => {
    setSelectedRows(state.selectedRows)
  }

  const columns = [
    {
      name: "SMS",
      selector: (row) => (
        <FontAwesomeIcon icon={faCheck} className="text-green-500" />
      ),

      sortable: false,
    },
    // {
    //   name: "Subject",
    //   selector: (row) => row["subject"],
    //   sortable: true,
    // },
    {
      name: "Message",
      selector: (row) => row["message"].substring(0, 20) + "...",

      sortable: false,
    },
    {
      name: "Sent",
      selector: (row) => getTimeDifference(row["dateSent"]),

      sortable: false,
    },

    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-2">
          {row.status == 1 ? (
            <FontAwesomeIcon
              icon={faEnvelopeOpenText}
              className=" p-2 px-3 rounded-sm bg-gray-600 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
              onClick={() => {
                const user = usersData.filter((user) => {
                  return user.id === row.id
                })

                setSelectedMessageDelete(row.id)
                setSelectedMessage(user[0])
                handleClickOpenDialogMessage()
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faEnvelopeCircleCheck}
              className=" p-2 px-3 rounded-sm bg-gray-600 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
              onClick={() => {
                const user = usersData.filter((user) => {
                  return user.id === row.id
                })

                setSelectedMessageDelete(row.id)
                setSelectedMessage(user[0])
                handleClickOpenDialogMessage()
                setMessageID(() => {
                  return row.id
                })
                mYcallBackFunction()
              }}
            />
          )}

          <FontAwesomeIcon
            icon={faTrashCan}
            title="delete user"
            onClick={() => {
              const user = usersData.filter((user) => {
                return user.id === row.id
              })
              setSelectedMessageDelete(row.id)
              setSelectedMessage(user[0])
              handleClickOpenDialog()
            }}
            className=" p-2 px-3 rounded-sm bg-red-400 cursor-pointer text-white transition-all duration-300 hover:scale-105 hover:bg-red-500"
          />
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ]
  return (
    <>
      {isLoading && (
        <div className="flex w-full min-h-[calc(100vh-400px)] justify-center items-center">
          {" "}
          <PageLoader />
        </div>
      )}
      {!isLoading && (
        <div className=" flex gap-x-8 px-6 items-center">
          <div className=" w-full md:w-[80%] mt-3 px-8 rounded-md  py-4">
            <h1 className=" font-bold">Notifications</h1>
            <hr className=" mt-3 bg-blue-400" />
            <DataTable
              title=" "
              columns={columns}
              data={usersData}
              selectableRows="true"
              onSelectedRowsChange={handleChange}
              selectableRowsHighlight="true"
              pointerOnHover="false"
              pagination
              button="false"
              rtl="false"
              visible="false"
              striped="true"
              direction="auto"
              responsive="true"
              contextMessage={{
                singular: "message",
                plural: "messages",
                message: "selected",
              }}
              progressPending={isDataLoading}
            />
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialog}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(37,99,235,0.7)",
                backdropFilter: "blur(3px)",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <DialogTitle>
                <span className=" font-semibold text-lg text-textColor">{`Delete  Message`}</span>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  <span className="text-sm text-lightBlack">
                    Are you sure you want to delete this message from the system
                    Keep in mind that this process can not be reversed
                  </span>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={handleCloseDialog}
                  className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteUser}
                  className="border-none bg-blue-500 p-2 px-3 text-white text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-blue-600 "
                >
                  Confirm
                </button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openDialogMessage}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseDialogLock}
              aria-describedby="alert-dialog-slide-description"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(37,99,235,0.7)",
                backdropFilter: "blur(3px)",

                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
            >
              <DialogContent>
                <div className=" px-2 py-6 w-[400px]">
                  {selectedMessage?.message}
                </div>
              </DialogContent>
              <DialogActions>
                <button
                  onClick={handleCloseDialogLock}
                  className="border-none bg-slate-300 p-2 px-3 text-sm font-semibold rounded-sm transition-all duration-300 hover:bg-slate-400 mr-2"
                >
                  Close
                </button>
              </DialogActions>
            </Dialog>
          </div>
          <div className="w-[20%] md:flex items-center hidden">
            <LottiePlayer src={sms} />
          </div>
        </div>
      )}
    </>
  )
}

export default Notifications
