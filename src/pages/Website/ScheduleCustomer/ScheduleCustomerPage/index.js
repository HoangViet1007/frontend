import { Card, PageHeader } from "antd";
import CalenderCustom from "../components/CalenderCustom";
import NoteCalender from "../components/NoteCalender";

const ScheduleCustomer = () => {
  return (
    <Card
      title={
        <PageHeader
          className="site-page-header tw-p-0"
          onBack={() => window.history.back()}
          title="Xếp Lịch"
        />
      }
    >
      <CalenderCustom />
      <NoteCalender />
    </Card>
  );
};

export default ScheduleCustomer;
