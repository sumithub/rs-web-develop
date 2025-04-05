import Image from "next/image";

export default function Sidebar() {
    return <div className="relative">
        <div className="bg-white h-[100vh] w-24 fixed top-0 left-0 z-20">
            <div className="relative h-full flex flex-col justify-between overflow-y-auto custom-scrollbar md:pb-[73px] pb-[65px] shadow-[0px_16px_44px_0px_#00000012]">

                <div className="test-secondary text-base font-semibold uppercase mt-5 text-center">logo</div>
                <div className="relative h-full flex flex-col items-center justify-between overflow-y-auto custom-scrollbar md:pb-[73px] pb-[65px] mt-10">
                    <div>
                        <Image src="/images/location.svg" alt="location" height={48} width={48} unoptimized={true} />
                    </div>
                    <div>
                        {/* <img src="/logos/fav2.png" alt="logo" className="md:w-6 w-4 mr-1" /> */}
                        <div><Image src="/images/avatar1.png" alt="avatar" height={56} width={56} className="h-14 w-14 rounded-full" /></div>

                    </div>
                </div>
            </div>
        </div>

    </div>
}