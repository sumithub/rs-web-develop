import SecondaryButton from "../../../components/common/SecondaryButton"
import Search from "../../form/Search"
import Model from "../Model"
import TableOrder from '../../../components/TableOrder'
import PaginationDemo from '../../../components/Pagination'
import Checkbox from '../../../components/form/Checkbox'
import Status from '../../Status'



function SelectedCustomers({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="schedule campaign" modalClass="w-[60%]!" modalBodyClass="max-h-[90vh]!">
            <div>
                <div className="flex items-center justify-between mb-3">
                    <Search placeholder="Search by Filter by name, email, phone" />
                    <SecondaryButton title="Add Selected"></SecondaryButton>
                </div>
            </div>

            <div className="table-class">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Customer Name" /></th>
                            <th><TableOrder title="Email" /></th>
                            <th><TableOrder title="Phone" /></th>
                            <th><TableOrder title="Tags" /></th>
                            <th><TableOrder title="Source" /></th>
                            <th><TableOrder title="Date Added" /></th>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
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
                            <td><Status status="At Risk" /></td>
                            <td>Manual</td>
                            <td>Jun 18,2024</td>
                        </tr>
                    </tbody>
                </table>
                <PaginationDemo />
            </div>
        </Model>
    )
}

export default SelectedCustomers