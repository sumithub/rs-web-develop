import Link from "next/link";
import SecondaryButton from "../common/SecondaryButton";
import Model from "./Model";
import Image from "next/image";

export default function NotificationModel({ onClose }) {
    return (
        <Model onClose={onClose} title="Notification" modalClass="w-[40%]!">
            <div className="flex justify-between gap-2.5">
                <div className="w-auto">
                    <Image src="/images/upload2.svg" alt="upload2" width={42} height={42} />
                </div>
                <div className="w-full">
                    <h2 className="text-lg font-semibold">Uploading &#39;image 123-Finalbatch.exe&#39;</h2>
                    <p className="text-sm text-text3 py-2">Please wait while we upload your file.</p>
                    <div>
                        <div className="bg-text3 w-full h-2.5 rounded-3xl">
                            <div className="bg-primary  w-3/4 h-2.5 rounded-3xl"></div>
                        </div>
                        <h2 className="text-end text-xs font-semibold mt-2.5">80% uploaded...</h2>
                        <div className="flex items-center gap-4">
                            <h3 className="text-xs">Cancel</h3>
                            <h3 className="text-xs text-primary font-semibold">Upload another</h3>
                        </div>
                    </div>
                </div>
                <div className="w-auto">
                    <Image src="/images/cancel.svg" alt="cancel" width={20} height={20} />
                </div>
            </div>
            <hr className="border-t border-border2 my-3.5" />
            <div className="bg-secondary2 rounded-lg mb-2.5">
                <Card />
            </div>
            <Card />
            <Link href="/notifications-management">
                <SecondaryButton title="View all" />
            </Link>
        </Model>
    )
}
const Card = () => {
    return <>
        <div className="flex justify-between gap-2.5 p-3.5 mb-5">
            <div className="w-auto">
                <Image src="/images/carmen.png" alt="carmen" width={46} height={46} />
            </div>
            <div className="w-full">
                <h2 className="text-base font-medium">Carmen Parksouth</h2>
                <p className="text-sm text-text3 pt-2">Hey, can you check the latest documents posted in the group?</p>
            </div>
            <div className="w-[10%]">
                <h2 className="text-sm text-end shrink-0 text-text3">1 day</h2>
            </div>
        </div>
    </>
}