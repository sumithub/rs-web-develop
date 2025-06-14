import ReviewCard from "../../../components/ReviewCard";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Select from "../../form/Select";
import Model from "../Model";

export default function NoActionRequiredState({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="No Action Required State" modalClass="w-[60%]!">
            <div>
                <div>
                    <ReviewCard title="Zain Levin" />
                </div>

                <div className="mt-3 ps-[10vw]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .
                </div>

                <div>
                    <Select defaultOption="No Action Required" />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                    <CancelButton title="copy reply" class_="text-lg!" />
                    <SecondaryButton title="share" class_="text-lg!" />
                    <SecondaryButton title="mark as responded" class_="text-lg!" />
                </div>
            </div>
        </Model>
    )
}