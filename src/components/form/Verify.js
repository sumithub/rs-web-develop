"use client";

import Image from "next/image";

export default function Verify() {
    return (<>
        <div className="mt-2.5">
            <div className="border border-[#0096FF]/10 flex justify-between p-[15px] rounded-lg border-l-8 border-l-primary">
                <h2 className="text-secondary text-sm">Click To Verify</h2>
                <Image src="/images/geetest.png" alt="geetest.png" width={20} height={20} />
            </div>
        </div>
    </>
    );
}
