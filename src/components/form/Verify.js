"use client";

import Image from "next/image";

export default function Verify({ onClick, verificationSuccess }) {
    if (verificationSuccess) {
        return <div className="mt-2.5" >
            <div className="border border-success bg-[#08D467]/4 flex justify-between p-[15px] rounded-lg border-l-8 border-l-success">
                <h2 className="text-success text-sm">Verification Success</h2>
                <Image src="/images/geetest-success.svg" alt="geetest" width={20} height={20} />
            </div>
        </div>
    }
    return (<>
        <div className="mt-2.5 cursor-pointer" onClick={() => {
            if (onClick) {
                onClick()
            }
        }}>
            <div className="border border-[#0096FF]/10 flex justify-between p-[15px] rounded-lg border-l-8 border-l-primary">
                <h2 className="text-secondary text-sm">Click To Verify</h2>
                <Image src="/images/geetest.png" alt="geetest.png" width={20} height={20} />
            </div>
        </div>
    </>
    );
}
