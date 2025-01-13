import { signOut } from "@/utils/actions";
import { LogOutIcon } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={signOut}
      className="flex items-center justify-center rounded-full backdrop-blur-sm border border-white/30 p-2 transition-colors bg-red-500/20 hover:bg-red-500/20"
    >
      <LogOutIcon size={17} color="red" />
    </button>
  );
}
