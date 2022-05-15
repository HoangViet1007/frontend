import { Avatar, Card, Empty } from "antd";
import React, { useEffect } from "react";
import { getEventsCustomer } from "../../AllScheduleCustomer/AllScheduleCustomerSlice";
import moment from "moment";
import "moment/locale/vi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ROUTER from "../../../../router/router";
const ScheduleDay = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.AllscheduleCustomer);
  const newEvents = events?.slice(0, 3);
  useEffect(() => {
    const presentTime = moment().format("YYYY-MM-DD");
    dispatch(getEventsCustomer(presentTime));
  }, [dispatch]);
  return (
    <Card
      title={
        <div className="tw-text-blue-500 tw-font-semibold">
          Lịch học hôm nay
        </div>
      }
      style={{ height: "100%", borderRadius: "0.5rem" }}
      bodyStyle={{
        paddingLeft: "10px",
        paddingRight: "4px",
        paddingTop: "5px",
        height: "100%",
      }}
    >
      <div>
        {newEvents?.length > 0 ? (
          newEvents.map((event, i) => {
            return (
              <div className="tw-border-b tw-flex tw-py-3" key={i}>
                <Avatar
                  size="large"
                  src={event?.course_student.courses?.image}
                />
                <div className="tw-flex-1 tw-pl-2">
                  <div className="tw-text-xs tw-text-gray-400">
                    {event?.time_start} - {event?.time_end}
                  </div>
                  <div className="tw-font-medium">
                    {event?.course_student.courses?.name}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="tw-flex tw-justify-center">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={<span>không có lịch học</span>}
            ></Empty>
          </div>
        )}
      </div>
      {events?.length > 2 && (
        <div className="tw-absolute tw-bottom-2 tw-left-1/2 tw-transform tw--translate-x-1/2">
          <Link
            to={ROUTER.CLIENT.SCHEDULEDAY}
            className="tw-text-blue-400 hover:tw-text-blue-600"
          >
            Xem tất cả
          </Link>
        </div>
      )}
    </Card>
  );
};

export default ScheduleDay;
