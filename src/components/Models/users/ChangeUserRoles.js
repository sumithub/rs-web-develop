import Image from "next/image";
import Select from "../../form/Select";
import Status from "../../Status";
import TableOrder from "../../TableOrder";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";

export default function ChangeUserRoles({ onClose }) {
    return <Model title="Change User Roles" onClose={onClose} modalClass="w-1/2!" modalBodyClass="max-h-[85vh]!">
        <div>
            <div className="text-secondary text-xl font-semibold capitalize">you are about to change role for these users</div>
            <div className="text-secondary text-base font-semibold mt-5">Selected Users (05)</div>

            <div className="table-class mt-5">
                <table className="w-full">

                    <thead>
                        <tr>
                            <th><TableOrder title="Name" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th><TableOrder title="Role" /></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Jaylon Torff</td>
                            <td><Status status="Active" /></td>
                            <td>Manager</td>
                        </tr>

                        <tr>
                            <td>Jaylon Torff</td>
                            <td><Status status="Active" /></td>
                            <td>Manager</td>
                        </tr>

                        <tr>
                            <td>Jaylon Torff</td>
                            <td><Status status="Active" /></td>
                            <td>Manager</td>
                        </tr>

                        <tr>
                            <td>Jaylon Torff</td>
                            <td><Status status="Active" /></td>
                            <td>Manager</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Select label="select new role" isRequired={true} selectClass_="py-3.5! px-2.5! focus:border-primary/60!">
                <option value="owner">Owner</option>
                <option value="manager">Manager</option>
                <option value="viewer">Viewer</option>
            </Select>

            <div className="text-primary text-sm font-semibold capitalize my-4">Changing roles will update user permissions.</div>

            <div className="flex items-center gap-2 my-5">
                <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                <div className="text-danger text-lg font-semibold capitalize">The following users were removed because they are pending</div>
            </div>

            <div className="flex items-center justify-between mt-5">
                <div className="text-base font-medium text-secondary capitalize">john deo  ( johan@exmaple.com )</div>
                <div className="text-base text-text3 capitalize"><Status status="Pending Invite" /></div>
            </div>
            <hr className="border-t border-border-color mt-3" />

            <div className="flex items-center justify-between mt-5">
                <div className="text-base font-medium text-secondary capitalize">john deo  ( johan@exmaple.com )</div>
                <div className="text-base text-text3 capitalize"><Status status="Pending Invite" /></div>
            </div>
            <hr className="border-t border-border-color mt-3" />

            <div className="flex items-center justify-between mt-5">
                <div className="text-base font-medium text-secondary capitalize">john deo  ( johan@exmaple.com )</div>
                <div className="text-base text-text3 capitalize"><Status status="Pending Invite" /></div>
            </div>

            <div className="flex items-center gap-2 my-5">
                <Image src="/images/warning.svg" alt="warning" height={22} width={22} />
                <div className="text-danger text-lg font-semibold capitalize">Role changes are only allowed for active users.</div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
                <CancelButton />
                <SecondaryButton title="Apply Changes" />
            </div>
        </div>

    </Model>
}