import Welcome from "./components/Welcome";

export default function Home() {
  return (<><div className="bg-[#FEFEFE]">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2">
        <div></div>
        <Welcome />
      </div>
      Register
    </div>
  </div>
  </>)
}