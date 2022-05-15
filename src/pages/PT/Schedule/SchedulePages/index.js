import { Card, PageHeader } from "antd";
import React from "react";
import CalenderPt from "../components/CalenderPt";
import NoteCalender from "../components/NoteCalender";
const SchedulePage = () => {
  return (
    <Card
      // headStyle={{ padding: 0 }}
      title={
        <PageHeader
          className="site-page-header tw-p-0"
          onBack={() => window.history.back()}
          title="Xếp Lịch"
        />
      }
    >
      <CalenderPt />
      <NoteCalender />
    </Card>
  );
};

export default SchedulePage;
