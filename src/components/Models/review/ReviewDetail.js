import ReviewCard from "../../../components/ReviewCard";
import Select from "../../form/Select";
import Model from "../Model";

export default function ReviewDetail({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Code Preview Box" modalClass="w-[60%]!">
            <div>
                <div>
                    <ReviewCard title="Zain Levin" />
                </div>

                <div className="mt-3 ps-[10vw]">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .
                </div>

                <div>
                    <Select />
                </div>
            </div>
        </Model>
    )
}