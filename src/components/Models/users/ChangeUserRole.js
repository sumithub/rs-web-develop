import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Select from "../../form/Select";
import Status from "../../Status";
import Model from "../Model";

export default function ChangeUserRole({ onClose }) {
    return <Model title="Change User Role" onClose={onClose} modalClass="w-1/2!">
        <div>
            <div className="text-secondary text-xl font-semibold capitalize">are you sure you want to changes the role for</div>

            <div className="bg-dark rounded-lg p-4 mt-7">
                <div className="flex items-center justify-between">
                    <div className="text-secondary text-lg">Johan deo</div>
                    <Status status="Active" />
                </div>
                <hr className="border-t border-border-color my-2" />
                <div className="text-secondary text-lg">johan@example.com</div>
            </div>

            <div className="text-secondary text-lg font-medium capitalize my-3">Current Role: Manager</div>

            <div className="flex items-center gap-3">
                <div className="text-secondary text-sm font-semibold mt-2">New role:</div>
                <Select label="" selectClass_="py-2.5! px-2.5! focus:border-primary/60!">
                    <option value="owner">Owner</option>
                    <option value="manager">Manager</option>
                    <option value="viewer">Viewer</option>
                </Select>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton />
                <SecondaryButton title="Change Role" />
            </div>
        </div>

    </Model>
}