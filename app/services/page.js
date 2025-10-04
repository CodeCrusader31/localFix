import HomeServices from "./cleaning"; // ✅ use alias if set up in jsconfig/tsconfig
import RepairAndMaintaince from "./repairAndMaintainance";
import OutDoor from "./outdoor";
export default function ServicesPage() {
  return (
    <div>
      <HomeServices />
      <RepairAndMaintaince />
      <OutDoor />
    </div>
  );
}
