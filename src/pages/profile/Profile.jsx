import ProfileHeaderCard from "../../components/profile/ProfileHeaderCard";
import IdentityCard from "../../components/profile/IdentityCard";
import PersonalDetailsCard from "../../components/profile/PersonalDetailsCard";
import EmploymentDetailsCard from "../../components/profile/EmploymentDetailsCard";
import ContactEmergencyCard from "../../components/profile/ContactEmergencyCard";
import DocumentsCard from "../../components/profile/DocumentsCard";
import SettingsCard from "../../components/profile/SettingsCard";

export default function Profile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">

  {/* LEFT */}
  <div className="space-y-3">
    <ProfileHeaderCard />
    <IdentityCard />
    <ContactEmergencyCard />
    <SettingsCard /> 
  </div>

  {/* RIGHT */}
  <div className="space-y-3">
    <PersonalDetailsCard />
    <EmploymentDetailsCard />
    <DocumentsCard />
  </div>

</div>
  );
}