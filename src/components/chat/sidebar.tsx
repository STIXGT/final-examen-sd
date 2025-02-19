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
import Link from "next/dist/client/link";

export default function SideBar() {
  return (
    <div className="flex flex-col rounded-2xl h-full items-center justify-between py-11 px-4">
      <div className="flex flex-col gap-4">
        <Link href="/home">
          <IconButton Icon={ChevronLeft} />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <SignOutButton />
        <Link href="/home/settings">
          <IconButton Icon={SettingsIcon} />
        </Link>
        <IconButton Icon={User2Icon} />
      </div>
    </div>
  );
}
