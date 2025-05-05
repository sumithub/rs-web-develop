import Signup from "../components/Signup";
import Welcome from "../components/common/Welcome";
export default function Home() {
  return (<><div className="bg-[#FEFEFE]">
    <div className="max-w-7xl mx-auto xl:px-0 px-12">
      <div className="grid grid-cols-2 gap-16">
        <div>
          <Signup />
        </div>
          <Welcome />
      </div>
    </div>
  </div>
  </>)
}