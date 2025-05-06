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
                                <Image src="/images/google.svg" alt="google.svg" width={17} height={17} />
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
                                <Image src="/images/yelp.svg" alt="yelp.svg" width={38} height={15} />
                                Yelp
                            </div>
                        </td>
                        <td>200</td>
                        <td>70</td>
                        <td>123</td>
                        <td>123</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="flex gap-2.5">
                                <Image src="/images/tripadvisor.svg" alt="tripadvisor.svg" width={17} height={17} />
                                Tripadvisor
                            </div>
                        </td>
                        <td>150</td>
                        <td>35</td>
                        <td>123</td>
                        <td>123</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
}