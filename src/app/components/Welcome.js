import Image from "next/image";

export default function Welcome() {
    return (<><div>
        <div className="bg-primary2 w-full rounded-[20px] mt-[25px]">
            <div className=" relative">
                <Image src="/images/image-1.svg" alt="image-1" width={209} height={209} className="absolute right-3 z-0 -top-16" />
                <div>
                    <Image src="/images/signup.png" alt="signup" width={502} height={500} className="mx-auto mt-[99px] z-10 relative rounded-[23px]" />
                </div>
                <Image src="/images/image-2.svg" alt="image-2" width={209} height={209} className="absolute left-6 z-0 -bottom-14" />
            </div>
            <div className="bg-white/[13%] mt-[141px] py-12 px-10">
                <h2 className="text-[32px] text-text tracking-tight font-medium text-center">Welcome To Our Platform!</h2>
                <p className="text-sm font-medium text-text text-center">Few things make me feel more powerful than setting up <br /> automations to make my life easier and more efficient.</p>
            </div>
        </div>
    </div>
    </>)
}