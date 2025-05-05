import Image from "next/image";

export default function Sidebar() {
    return <div className="relative">
        <div className="bg-white h-[100vh] w-24 fixed top-0 left-0 z-20 rounded-tl-[20px] rounded-bl-[20px]  shadow-[0px_16px_44px_0px_#00000012]">
            <div className="relative h-full pb-10">

                <div className="test-secondary text-base font-semibold uppercase pt-5 text-center">logo</div>
                <div className="relative h-full flex flex-col items-center justify-between overflow-y-auto custom-scrollbar pb-10 pt-10">
                    <div className="flex flex-col items-center justify-center gap-y-8">
                        <button className="cursor-pointer">
                            <Image src="/images/location.svg" alt="location" height={48} width={48} unoptimized={true} />
                        </button>

                        <button className="cursor-pointer">
                            <Image src="/images/dashboard.svg" alt="dashboard" height={22} width={22} unoptimized={true} />
                        </button>
                    </div>

                    <div>
                        <div className="border-b-2 border-border2 mb-8" />
                        <Image src="/images/avatar1.png" alt="avatar" height={56} width={56} className="h-14 w-14 rounded-full border border-border2" />
                    </div>
                </div>
            </div>
        </div>
    </div>
}