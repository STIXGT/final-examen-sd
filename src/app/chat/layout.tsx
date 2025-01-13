import SideBar from "@/components/chat/sidebar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(200,230,255,.5)_100%)]"></div>
      <SideBar />
      <div className="flex-1 my-3 mr-3">
        <div className="bg-white rounded-3xl h-full w-full shadow-sm p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
