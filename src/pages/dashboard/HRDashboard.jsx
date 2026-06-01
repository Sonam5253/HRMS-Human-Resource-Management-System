import HRStatsCard from "../../components/hr-dashboard/HRStatsCard";
import RecruitmentPipelineCard from "../../components/hr-dashboard/RecruitmentPipelineCard";
import LeaveApprovalsCard from "../../components/hr-dashboard/LeaveApprovalsCard";
import HRProfileCard from "../../components/hr-dashboard/HRProfileCard";
import EmployeeDirectoryCard from "../../components/hr-dashboard/EmployeeDirectoryCard";
import HRAnalyticsCard from "../../components/hr-dashboard/HRAnalyticsCard";


export default function HRDashboard() {
  return (
    <div className="space-y-4">

      <HRProfileCard />

      <HRStatsCard />

      {/* 1️⃣ Pipeline + Leave */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <RecruitmentPipelineCard />
        <LeaveApprovalsCard />
        <EmployeeDirectoryCard />
        <HRAnalyticsCard />
      </div>
      

    </div>
  );
}