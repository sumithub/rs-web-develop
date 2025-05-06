import Link from "next/link";

export default function Home() {
  return (<>
    <div className="text-secondary text-5xl font-semibold text-center my-80">
      <Link href="/dashboard" >Dashboard</Link>
    </div>
  </>)
}