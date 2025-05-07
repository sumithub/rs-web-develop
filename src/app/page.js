import Link from "next/link";

export default function Home() {
  return (<>
    <div className="text-secondary text-5xl font-semibold text-center my-80">
      <div className="flex flex-col gap-y-5">
        <Link href="/dashboard" >Dashboard</Link>
        <Link href="/login" >Login</Link>
        <Link href="/reset-password">Reset password</Link>
        <Link href="/change-email">Change Email</Link>
      </div>
    </div>
  </>)
}