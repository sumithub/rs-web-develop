import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";

export default function Clone({ onClose }) {
    return <Model title="Clone" onClose={onClose} modalClass="w-1/2!">
        <div>
            <div className="flex items-center justify-between mb-5">
                <div className="text-secondary text-xl font-semibold capitalize">Lorem Ipsum is simply</div>
                <button className="py-2 px-3 border border-border-color rounded-lg text-text3 text-xs text-center cursor-pointer">Clone Template</button>
            </div>

            <div className="text-text3 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it</div>

            <div className="grid grid-cols-2 gap-3 mt-5">
                <CancelButton title="Cancel" onClick={onClose}/>
                <SecondaryButton title="save" />
            </div>
        </div>
    </Model>
}