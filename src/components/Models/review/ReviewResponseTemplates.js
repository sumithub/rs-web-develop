import Image from "next/image";
import Search from "../../../components/form/Search";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import PaginationDemo from "../../Pagination";
import TableOrder from "../../TableOrder";
import Model from "../Model";

export default function ReviewResponseTemplates({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Review Response Templates" modalClass="w-[60%]!" modalBodyClass="max-h-[90vh]!">
            <div>
                <div className="flex gap-3">
                    <Search placeholder="Search by Template Name" mainClass="w-1/2!" />
                    <CancelButton title="Filter by Rating" />
                    <SecondaryButton title="Create New Template" />
                </div>

                <div className="table-class mt-3">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th><TableOrder title="Template Name" /></th>
                                <th><TableOrder title="Last Updated" /></th>
                                <th><TableOrder title="Template Name" /></th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>Positive Feedback</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-1">
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                    </div>
                                </td>
                                <td>Jun 18,2024</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Positive Feedback</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-1">
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                    </div>
                                </td>
                                <td>Jun 18,2024</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Positive Feedback</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-1">
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                    </div>
                                </td>
                                <td>Jun 18,2024</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            <tr>
                                <td>Positive Feedback</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center gap-1">
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                        <Image src="/images/star.svg" alt="rating" height={16} width={16} unoptimized={true} />
                                    </div>
                                </td>
                                <td>Jun 18,2024</td>
                                <td>
                                    <div className='flex items-center gap-2'>
                                        <button className='cursor-pointer'>
                                            <Image src="/images/edit.svg" alt='edit' height={28} width={28} />
                                        </button>

                                        <button className='cursor-pointer'>
                                            <Image src="/images/delete1.svg" alt='delete' height={28} width={28} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div>
                    <PaginationDemo />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <CancelButton title="Cancel"/>
                    <SecondaryButton title="Add Review"/>
                </div>
            </div>
        </Model>
    )
}