import {
  Calendar1Icon,
  ChevronLeft,
  MessageCircleIcon,
  PlusIcon,
  SettingsIcon,
  User2Icon,
} from "lucide-react";
import IconButton from "./icon-button";
import SignOutButton from "../sign-out-button";

export default function SideBar() {
  return (
    <div className="flex flex-col rounded-2xl h-full items-center justify-between py-11 px-4">
      <IconButton Icon={ChevronLeft} />
      <div className="flex flex-col gap-4">
        <IconButton Icon={PlusIcon} />
        <IconButton Icon={MessageCircleIcon} />
        <IconButton Icon={Calendar1Icon} />
      </div>
      <div className="flex flex-col gap-4">
        <SignOutButton />
        <IconButton Icon={SettingsIcon} />
        <IconButton Icon={User2Icon} />
      </div>
    </div>
  );
}
