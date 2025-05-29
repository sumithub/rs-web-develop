import SecondaryButton from "../../../components/common/SecondaryButton"
import Search from "../../form/Search"
import Model from "../Model"
import TableOrder from '../../../components/TableOrder'
import PaginationDemo from '../../../components/Pagination'
import Checkbox from '../../../components/form/Checkbox'

function SelectedCustomers({ onClose }) {
    return (
        <Model onClose={onClose} title="Selected Customers" modalClass="w-1/2!">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!" />
                    <SecondaryButton title="Add Selected" class_="text-sm! font-normal!" />
                </div>
            </div>

            <div className="table-class">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name" /></th>
                            <th><TableOrder title="Email" /></th>
                            <th><TableOrder title="Phone" /></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>

                        <tr>
                            <td>
                                <div className="flex items-start gap-2">
                                    <Checkbox />
                                    <div>John Doe</div>
                                </div>
                            </td>
                            <td>john@example.com</td>
                            <td>+91 9876543210</td>
                        </tr>
                    </tbody>
                </table>
                <PaginationDemo />
            </div>
        </Model>
    )
}

export default SelectedCustomers