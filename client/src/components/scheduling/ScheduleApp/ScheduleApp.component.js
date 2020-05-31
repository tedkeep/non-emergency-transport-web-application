import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import useApi from "../../../hooks/useApi.hook";
import { Alert } from "reactstrap";

import initialData from "./initial-data";

import ScheduleList from "./ScheduleList.component";
import TripList from "./TripList.component";
import ScheduleManagement from "./ScheduleManagement.component";
import BacklogManagement from "./BacklogManagement.component";
import AppManagement from "./AppManagement.component";

const App = styled.div`
  display: grid;
  grid-template-columns: 20% 60% 20%;
  grid-template-rows: 5rem auto;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  margin-right: 10px;
  height: 100%;
  min-height: 100%;
`;

const Main = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  height: 100%;
`;

const Side = styled.div`
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 2;
  grid-row-end: 3;
  height: 100%;
`;

const TopLeft = styled.div`
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const TopMiddle = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
`;

const TopRight = styled.div`
  grid-column-start: 3;
  grid-column-end: 3;
  grid-row-start: 1;
  grid-row-end: 1;
`;

let id = 1;

const ScheduleApp = () => {
  const [{ data }, doFetch] = useApi();
  const [appData, setAppData] = useState();
  const [response, setResponse] = useState();
  const [alert, setAlert] = useState({
    visible: false,
    color: "primary",
    message: ""
  });
  const [scheduleDate, setScheduleDate] = useState(() => {
    const today = new Date();
    return today.toISOString().substring(0, 10);
  });

  useEffect(() => {
    doFetch("get", `/api/schedule/app/${scheduleDate}`);
  }, [scheduleDate]);

  useEffect(() => {
    if (data != undefined) {
      if (!data.status) setAppData(data);
      else if (data.status === "OK") {
        setAlert({
          visible: true,
          color: "success",
          message: "Schedules saved successfully"
        });

        for (let [key, value] of Object.entries(appData.schedules)) {
          if (value.hasOwnProperty("error")) {
            delete appData.schedules[key].error;
          }
        }
      } else if (data.status === "ERROR") {
        setAlert({
          visible: true,
          color: "danger",
          message:
            "An error occurred when saving the highlighted schedules. Un-highlighted schedules saved successfully."
        });

        // add alerts to schedules with errors
        data.errors.forEach(error => {
          console.log(error.vehicle);
          for (let [key, schedule] of Object.entries(appData.schedules)) {
            console.log(schedule.vehicle);
            if (error.vehicle === schedule.vehicle) {
              console.log("oh yeah baby");
              setAppData({
                ...appData,
                schedules: {
                  ...appData.schedules,
                  [key]: {
                    ...appData.schedules[key],
                    error: error.error
                  }
                }
              });
            }
          }
        });
      }
    }
  }, [data]);

  // useEffect(() => {
  //   console.log(response);
  // }, [response]);

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    // if no drop location was given
    if (!destination) return;

    // if the draggable is dropped in the original place
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if schedule is moved
    if (type === "schedule") {
      const newScheduleOrder = Array.from(appData.scheduleOrder);
      newScheduleOrder.splice(source.index, 1);
      newScheduleOrder.splice(destination.index, 0, draggableId);

      const newAppData = {
        ...appData,
        scheduleOrder: newScheduleOrder
      };
      setAppData(newAppData);
      return;
    }

    // if a trip was moved
    let start = null;
    let finish = null;

    if (source.droppableId === "backlog") {
      start = appData.backlog;
    } else {
      start = appData.schedules[source.droppableId];
    }

    if (destination.droppableId === "backlog") {
      finish = appData.backlog;
    } else {
      finish = appData.schedules[destination.droppableId];
    }

    // if the trip was moved within the same list
    if (start === finish) {
      const newTripIds = Array.from(start.trips);
      newTripIds.splice(source.index, 1);
      newTripIds.splice(destination.index, 0, draggableId);

      const newData = {
        ...start,
        trips: newTripIds
      };

      if (source.droppableId === "backlog") {
        setAppData({
          ...appData,
          backlog: newData
        });
      } else {
        setAppData({
          ...appData,
          schedules: {
            ...appData.schedules,
            [newData._id]: newData
          }
        });
      }
      return;
    }

    // moving from one list to another
    const startTripIds = Array.from(start.trips);
    startTripIds.splice(source.index, 1);
    const newStart = {
      ...start,
      trips: startTripIds
    };

    const finishTripIds = Array.from(finish.trips);
    finishTripIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      trips: finishTripIds
    };

    if (source.droppableId === "backlog") {
      setAppData({
        ...appData,
        schedules: {
          ...appData.schedules,
          [newFinish._id]: newFinish
        },
        backlog: newStart
      });
    } else if (destination.droppableId === "backlog") {
      setAppData({
        ...appData,
        schedules: {
          ...appData.schedules,
          [newStart._id]: newStart
        },
        backlog: newFinish
      });
    } else {
      setAppData({
        ...appData,
        schedules: {
          ...appData.schedules,
          [newStart._id]: newStart,
          [newFinish._id]: newFinish
        }
      });
    }
  };

  const addSchedule = vehicle => {
    const idString = id.toString();
    setAppData({
      ...appData,
      schedules: {
        ...appData.schedules,
        [idString]: {
          _id: idString,
          vehicle: vehicle._id,
          date: scheduleDate,
          trips: [],
          staff: [],
          reg_num: vehicle.reg_num
        }
      },
      scheduleOrder: [...appData.scheduleOrder, idString]
    });
    id++;
  };

  const changeDate = date => {
    setScheduleDate(date);
    onDismiss();
  };

  const handleScheduleEmployeeChange = (employees, scheduleId) => {
    setAppData({
      ...appData,
      schedules: {
        ...appData.schedules,
        [scheduleId]: {
          ...appData.schedules[scheduleId],
          staff: employees
        }
      }
    });
  };

  const onDismiss = () => {
    setAlert({
      ...alert,
      visible: false,
      message: ""
    });
  };

  const onSubmit = () => {
    console.log(appData.schedules);

    if (Object.keys(appData.schedules).length === 0) {
      setAlert({
        visible: true,
        color: "danger",
        message:
          "No schedules exist for this date. Create some schedules before submitting."
      });
      return;
    }

    const formattedSchedules = { schedules: [] };
    for (const scheduleId in appData.schedules) {
      const schedule = appData.schedules[scheduleId];
      formattedSchedules.schedules.push({
        vehicle: schedule.vehicle,
        staff: schedule.staff,
        trips: schedule.trips,
        date: schedule.date,
        start_time: "00:00:00",
        finish_time: "00:00:00"
      });
    }
    console.log(formattedSchedules);
    doFetch("post", `/api/schedule/app/submit`, formattedSchedules);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <App>
        <TopLeft>
          {appData != undefined && (
            <ScheduleManagement data={appData} addSchedule={addSchedule} />
          )}
        </TopLeft>
        <TopMiddle>
          <AppManagement
            data={appData}
            dateChange={changeDate}
            onSubmit={onSubmit}
          />
        </TopMiddle>
        <TopRight>
          <BacklogManagement />
        </TopRight>
        <Main>
          {alert.visible && (
            <Alert
              color={alert.color}
              isOpen={alert.visible}
              toggle={onDismiss}
            >
              {alert.message}
            </Alert>
          )}
          {appData != undefined && (
            <ScheduleList
              data={appData}
              handleScheduleEmployeeChange={handleScheduleEmployeeChange}
            />
          )}
        </Main>
        <Side>{appData != undefined && <TripList data={appData} />}</Side>
      </App>
    </DragDropContext>
  );
};

export default ScheduleApp;
