"use client"
import Slider from "react-slick";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Welcome() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        //autoplaySpeed: 3000,
        //autoplay: true,
    };


    return (<div className="flex items-center h-screen py-5">
        <div className="bg-primary2 w-full rounded-[20px] overflow-hidden h-[calc(100vh-40px)]">
            <Slider {...settings} className="h-full">
                <Item />
                <Item />
                <Item />
                <Item />
            </Slider>
        </div>
    </div>
    );
}

const Item = ({ }) => {
    let imgName = "";
    const pathname = usePathname();

    if (pathname === "/login") {
        imgName = "login"
    } else if (pathname === "/reset-password") {
        imgName = "reset-password"
    } else {
        imgName = "signup"
    }

    return (<div className="h-full flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center transition transition-all duration-700 py-5" >
            <div className="relative w-full px-14 h-full flex items-center justify-center">
                <Image
                    src={`/images/image-1.svg`}
                    alt="image-1"
                    width={209}
                    height={209}
                    className="absolute right-3 z-0 -top-16"
                />
                <Image
                    id="scroll-image"
                    src={`/images/auth/${imgName}.png`}
                    alt="signup"
                    width={502}
                    height={500}
                    className="z-10 rounded-[23px] object-contain max-h-[400px]"
                />
                <Image
                    src="/images/image-2.svg"
                    alt="image-2"
                    width={209}
                    height={209}
                    className="absolute left-5 z-0 -bottom-11"
                />
            </div>
        </div>
        <div className="bg-white/[13%] pt-8 pb-12 px-10"
            id="text-container">
            <h2 className="text-[32px] text-text tracking-tight font-medium text-center">Welcome To Our Platform!</h2>
            <p className="text-sm font-medium capitalize text-text text-center">Few things make me feel more powerful than setting up <br /> automations to make my life easier and more efficient.</p>
        </div>
    </div>
    );
}