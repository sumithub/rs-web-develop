import Image from "next/image";
import Input from "../../form/Input";
import Model from "../Model";
import Link from "next/link";

export default function ShareOnSocialMedia({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Share on social media" modalClass="w-[50%]!" modalBodyClass="max-h-[90vh]!">
            <div>
                <div className="font-semibold">
                    Share This Review:
                </div>
                <div className="mt-[30px] grid grid-cols-6 gap-[18px]">
                    <Link href="https://www.facebook.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/fb.svg" alt="fb" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Facebook</h2>
                    </Link>
                    <Link href="https://x.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/x.svg" alt="twitter" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Twitter</h2>
                    </Link>
                    <Link href="https://www.linkedin.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/in.svg" alt="in" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Linkedin</h2>
                    </Link>
                    <Link href="https://www.instagram.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/insta.svg" alt="insta" width={45} height={45} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Instagram</h2>
                    </Link>
                    <Link href="https://dribbble.com/" target="_blank" className="text-center">
                        <Image unoptimized={true} src="/images/dribble.svg" alt="dribble" width={45} height={45} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">Dribble</h2>
                    </Link>
                    <Link href="/" className="text-center">
                        <Image unoptimized={true} src="/images/more.svg" alt="more" width={41} height={41} className="mx-auto" />
                        <h2 className="mt-[15px] text-sm font-medium">More</h2>
                    </Link>
                </div>
                <div>
                    <Input
                        icon="/images/copy2.svg"
                        class_="mt-[25px]!"
                        placeholder="https://code-with.com"
                        label=""
                    />
                </div>
            </div>
        </Model>
    )
}