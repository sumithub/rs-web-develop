import AuthLayout from "../../components/common/AuthLayout";
import Link from 'next/link';
import Image from 'next/image';

function VerificationEmail() {

    return (<AuthLayout>
        <div>
            <h2 className="text-[34px] leading-none font-semibold text-secondary capitalize text-center">verification email sent</h2>

            <div className='flex items-center justify-between mt-8'>
                <div className='text-base text-text3 capitalize'>a new verification email has been sent to</div>
                <div className='text-base text-secondary font-medium'>anu@gmail.com</div>
            </div>

            <div className='mt-5'>
                <div className='flex gap-2'>
                    <Image src="images/warning.svg" alt='warning' height={22} width={22} />
                    <div className='text-sm text-secondary font-medium capitalize'>please check your inbox(or spam folder) and click the verification link.</div>
                </div>

                <div className='flex gap-2 mt-2'>
                    <Image src="images/warning.svg" alt='warning' height={22} width={22} />
                    <div className='text-sm text-secondary font-medium capitalize'>of you don’t receive an email, wait 60 second before trying again.</div>
                </div>
            </div>

            <button className="text-lg font-medium bg-dark hover:bg-white text-text3 w-full mt-5 py-3 rounded-[10px] border border-dark hover:border-border-color cursor-pointer">Resend</button>

            <div className='flex items-center justify-between mt-5'>
                <Link href="/change-email" className='text-sm text-primary font-medium underline underline-offset-4'>Change Email</Link>
                <div className='text-sm text-secondary'>00.59</div>
            </div>

            <div className='flex justify-center mt-5'>
                <Link href="/login" className="flex gap-[15px]">
                    <Image src="/images/arrow.svg" alt='arrow.svg' width={20} height={20} />
                    <h2 className='text-sm text-secondary'>Back To Login</h2>
                </Link>
            </div>
        </div>


    </AuthLayout>
    )
}

export default VerificationEmail