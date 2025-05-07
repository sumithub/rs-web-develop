import Image from "next/image";

export default function Table() {
    return <div>
        <div className="mt-8 table-class">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Total Reviews</th>
                        <th>Last 30 Days</th>
                        <th>This Month</th>
                        <th>Last Month</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div className="flex gap-2.5">
                                <Image src="/images/google.svg" alt="google.svg" width={17} height={17} unoptimized={true} />
                                Google
                            </div>
                        </td>
                        <td>500</td>
                        <td>300</td>
                        <td>300</td>
                        <td>123</td>
                    </tr>

                    <tr>
                        <td>
                            <div className="flex gap-2.5">
                                <Image src="/images/google.svg" alt="google.svg" width={17} height={17} unoptimized={true} />
                                Google
                            </div>
                        </td>
                        <td>500</td>
                        <td>300</td>
                        <td>300</td>
                        <td>123</td>
                    </tr>

                    <tr>
                        <td>
                            <div className="flex gap-2.5">
                                <Image src="/images/google.svg" alt="google.svg" width={17} height={17} unoptimized={true} />
                                Google
                            </div>
                        </td>
                        <td>500</td>
                        <td>300</td>
                        <td>300</td>
                        <td>123</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
}