"use client"
import Slider from "react-slick";
import Image from "next/image";

export default function Welcome() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 3000,
        autoplay: true,
    };

    return (        <div className="bg-primary2 w-full rounded-[20px] my-[25px]">
        <Slider {...settings}>
            <Item />
            <Item />
            <Item />
            <Item />
        </Slider>
    </div>)
}

const Item = () => {
    return <div className="">
        <div className=" relative">
            <Image src="/images/image-1.svg" alt="image-1" width={209} height={209} className="absolute right-3 z-0 -top-16" />
            <div>
                <Image src="/images/signup.png" alt="signup" width={502} height={500} className="mx-auto mt-[99px] z-10 w-full px-14 relative rounded-[23px]" />
            </div>
            <Image src="/images/image-2.svg" alt="image-2" width={209} height={209} className="absolute left-5 z-0 -bottom-11" />
        </div>
        <div className="bg-white/[13%] mt-[100px] pt-12 pb-[78px] px-10">
            <h2 className="text-[32px] text-text tracking-tight font-medium text-center">Welcome To Our Platform!</h2>
            <p className="text-sm font-medium capitalize text-text text-center">Few things make me feel more powerful than setting up <br /> automations to make my life easier and more efficient.</p>
            {/* <h2 className="mt-[30px] text-center">---</h2> */}
        </div>
    </div>
}