import Image from "next/image";
import Welcome from "./components/Welcome";

export default function Home() {
  return (<><div className="bg-[#FEFEFE]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2">
        <div></div>
        <div className="bg-primary2 w-full rounded-[20px] mt-[25px]">
          <Welcome />
        </div>
      </div>
      Register
    </div>
  </div>
  </>)
}