import Image from "next/image";

export default function ReviewCard({ img, title }) {
    return <main>
        <div>
            <div className="flex items-center gap-3">
                <div><Image unoptimized={true} src="/images/image.svg" alt="user" height={71} width={71} /></div>
                <div>
                    <div className="text-secondary text-base">{title}</div>
                    <div className="flex items-center gap-1">
                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                    </div>
                </div>
            </div>

        </div>
    </main>
}