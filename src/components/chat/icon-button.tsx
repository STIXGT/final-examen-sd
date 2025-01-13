import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface IconButtonProps {
  Icon: LucideIcon;
}

const IconButton: React.FC<IconButtonProps> = ({ Icon }) => (
  <button
    className={cn(
      "flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-2 hover:bg-white/30 transition-colors"
    )}
  >
    <Icon size={17} />
  </button>
);

export default IconButton;
