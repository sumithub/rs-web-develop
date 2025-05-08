"use client"
import Link from "next/link";

export default function Home() {

  return (<>
    <div className="text-secondary text-3xl font-semibold text-center capitalize my-20">
      <div className="flex flex-col gap-y-5">
        <Link href="/login">Login</Link>
        <Link href="/reset-password">Reset password</Link>
        <Link href="/change-email">Change Email</Link>
        <Link href="/verification-email">verification email </Link>
        <Link href="/verify-email">verify email </Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/campaign-dashboard">Campaign Dashboard</Link>
        <Link href="/review">review</Link>
        <Link href="/users">Users Management</Link>
        <Link href="/manage-campaigns">Manage Campaigns</Link>
        <Link href="/campaigns-templates">Campaigns templates</Link>
      </div>
    </div>
  </>)
}