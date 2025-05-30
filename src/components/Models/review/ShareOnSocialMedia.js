import Image from "next/image";
import Input from "../../form/Input";
import Model from "../Model";

export default function ShareOnSocialMedia({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Share on social media" modalClass="w-[50%]!" modalBodyClass="max-h-[90vh]!">
            <div>
                <div className="font-semibold">
                    Share This Review:
                </div>
                <div className="mt-2.5 grid grid-cols-6 gap-[18px]">
                    <div className="text-center">
                        <Image src="/images/fb.png" alt="fb" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Facebook</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/twitter.png" alt="twitter" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Twitter</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/in.png" alt="in" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Linkedin</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/insta.png" alt="insta" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Instagram</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/dribble.png" alt="dribble" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Dribble</h2>
                    </div>
                    <div className="text-center">
                        <Image src="/images/more.png" alt="more" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">More</h2>
                    </div>
                </div>
                <div>
                    <Input
                        icon="/images/copy2.svg"
                        class_="mt-[25px]!"
                        placeholder="https://code-with.com"
                    />
                </div>
            </div>
        </Model>
    )
}