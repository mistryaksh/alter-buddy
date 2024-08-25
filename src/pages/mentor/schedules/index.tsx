import React, { Fragment, useEffect, useState } from "react";

import { MentorLayout } from "../../../layout";
import {
  useMentorCreateScheduleMutation,
  useMentorGetMySchedulesQuery,
  useMentorProfileQuery,
} from "../../../redux/rtk-api";
import { AppButton, TextField } from "../../../component";
import { AiOutlineLoading } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ISlotProps } from "../../../interface";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { FiChevronDown, FiPlus } from "react-icons/fi";
import clsx from "clsx";
import { toast } from "react-toastify";
import moment from "moment";

export const SchedulesMentorPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<ISlotProps[]>([]);

  // MAKE NEW SLOT DATA
  const [newDate, setNewDate] = useState(""); // State for selected date
  const [newSlots, setNewSlots] = useState([{ time: "", booked: false }]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  let [isOpen, setIsOpen] = useState(false);

  const { data: profile } = useMentorProfileQuery();
  const { data, isLoading } = useMentorGetMySchedulesQuery();
  const [
    CreateSlot,
    {
      isError: isNewError,
      error: newError,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
      data: newData,
    },
  ] = useMentorCreateScheduleMutation();

  useEffect(() => {
    if (isNewError) {
      console.log(newError);
    }
    if (isNewSuccess) {
      setIsOpen(false);
      toast.success(newData?.data);
      setNewDate("");
      setNewSlots([]);
    }
  }, [isNewError, newError, isNewSuccess, newData?.data]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    const selectedDate = newDate.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
    const slotsForDate = data?.data.find((day) => {
      return day.slotsDate === selectedDate;
    });
    setSelectedSlots(slotsForDate ? slotsForDate.slots : []);
  };

  const getTileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const hasSlots = data?.data.some((day) => day.slotsDate === dateString);
    return hasSlots ? "has-slot-tile" : "";
  };

  // Handle change in date input
  const handleNewDateChange = (event) => {
    setNewDate(event.target.value.toString());
  };

  // Handle change in time input
  const handleTimeChange = (index, event) => {
    const newSlot = [...newSlots];
    newSlots[index].time = event.target.value;
    setNewSlots(newSlot);
  };

  // Add a new time slot
  const addTimeSlot = () => {
    setNewSlots([...newSlots, { time: "", booked: false }]);
  };

  // Remove a time slot
  const removeTimeSlot = (index) => {
    const newSlot = newSlots.filter((_, i) => i !== index);
    setNewSlots(newSlot);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const slotData = {
      slots: newSlots,
      slotsDate: newDate,
    };
    await CreateSlot({
      slots: slotData.slots,
      slotsDate: moment(slotData.slotsDate).format("YYYY-MM-DD"),
      mentorId: profile?.data._id as string,
    });
    console.log(slotData); // Here you would normally send the data to the server or update the state
  };

  return (
    <MentorLayout>
      {isLoading && (
        <div className="h-[300px] flex justify-center">
          <AiOutlineLoading className="animate-spin" size={30} />
        </div>
      )}
      {!isLoading && (
        <>
          <div>
            <div className="flex justify-between items-center xl:lg:md:gap-10  flex-wrap">
              <div className="xl:md:lg:flex-1">
                <h5 className="text-3xl font-semibold">
                  Manage your{" "}
                  <span className="text-primary-500">
                    AlterBuddy's Schedule
                  </span>
                </h5>
                <p className="text-gray-600">
                  Here you can view and manage your available time slots. Users
                  will be able to book slots based on your availability. To
                  ensure a smooth booking process, please make sure your slots
                  are up-to-date.
                </p>
              </div>
              <div className="xl:lg:md:w-[15%] mt-5 xl:lg:md:mt-0 flex justify-end">
                <AppButton onClick={() => setIsOpen(true)} filled>
                  Schedule New
                </AppButton>
              </div>
            </div>
          </div>
          <div className="flex mt-20 gap-5 flex-wrap pb-10">
            <Calendar
              onChange={handleDateChange}
              tileClassName={getTileClassName}
              value={date}
              className="flex-1 transition-all duration-300"
              minDate={new Date()}
            />
            <div className="flex-1">
              <div className="mt-6">
                {selectedSlots.length > 0 && (
                  <h3 className="text-xl text-gray-700 mb-4">
                    🚀 You're all set for{" "}
                    <span className="text-primary-500">
                      {date.toISOString().split("T")[0]}
                    </span>{" "}
                    with{" "}
                    <span className="text-primary-500">
                      {selectedSlots.length}
                    </span>{" "}
                    exciting slot
                    {selectedSlots.length > 1 ? "s" : ""} available for
                    sessions. Let’s get those slots booked and make the most out
                    of your day!
                  </h3>
                )}
                <ul className=" flex flex-col flex-wrap gap-3">
                  {selectedSlots.length > 0 ? (
                    selectedSlots.map((slot, index) => (
                      <div>
                        <li
                          key={index}
                          className={`px-4 py-3 rounded-md flex items-center ${
                            slot.booked
                              ? "border border-primary-500 text-primary-500"
                              : "border-2 border-green-600 text-green-600"
                          }`}
                        >
                          {slot.time} - {slot.booked ? "Session" : "Available"}{" "}
                        </li>
                        {slot.booked && (
                          <Menu>
                            <MenuButton as={Fragment}>
                              {({ active }) => (
                                <button
                                  className={clsx(
                                    active
                                      ? "bg-primary-300 text-gray-500"
                                      : "bg-primary-500 text-white",
                                    "rounded-md px-5 py-3 flex items-center gap-3 w-full mt-1"
                                  )}
                                >
                                  Session with {slot?.userId?.name?.firstName}{" "}
                                  {slot?.userId?.name?.lastName}{" "}
                                  <FiChevronDown size={24} />
                                </button>
                              )}
                            </MenuButton>
                            <MenuItems
                              anchor="bottom start"
                              className="w-64 z-50 right-4 px-3  space-y-4 bg-white py-2 rounded-md shadow-xl shadow-primary-500 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <MenuItem as={Fragment}>
                                {({ focus }) => <div>Accept Appointment</div>}
                              </MenuItem>

                              <MenuItem as={Fragment}>
                                {({ focus }) => <div>Cancel Appointment</div>}
                              </MenuItem>
                            </MenuItems>
                          </Menu>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="shadow-lg border flex flex-col justify-center items-center w-full h-full p-3">
                      <p className="text-lg">
                        No slots available for this date.
                      </p>
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <Dialog
              open={isOpen}
              onClose={() => setIsOpen(false)}
              className="relative z-50"
            >
              <div className="fixed  bg-gray-950 bg-opacity-50 inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-6 rounded-lg">
                  <DialogTitle className="font-bold">
                    Upload New Slot
                  </DialogTitle>
                  <Description>
                    Please note that once a slot is uploaded, it cannot be
                    modified or removed.
                  </Description>
                  <div className="flex flex-col gap-4">
                    <TextField
                      label="Date"
                      outlined
                      type="date"
                      value={newDate}
                      onChange={handleNewDateChange}
                    />
                    {newSlots.map((slot, index) => (
                      <div key={index} className=" flex items-center gap-3">
                        <TextField
                          type="time"
                          id={`time-input-${index}`}
                          value={slot.time}
                          onChange={(event) => handleTimeChange(index, event)}
                          className="p-2 border border-gray-300 rounded-md w-full"
                          required
                        />
                        <AppButton
                          outlined
                          onClick={() => removeTimeSlot(index)}
                        >
                          Remove
                        </AppButton>
                      </div>
                    ))}
                    <AppButton filled type="button" onClick={addTimeSlot}>
                      <FiPlus size={24} /> Add More Magic Hours
                    </AppButton>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <button onClick={() => setIsOpen(false)}>Cancel</button>
                    <button onClick={handleSubmit}>
                      {isNewLoading ? "loading..." : "Save"}
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </Dialog>
          </div>
        </>
      )}
    </MentorLayout>
  );
};
