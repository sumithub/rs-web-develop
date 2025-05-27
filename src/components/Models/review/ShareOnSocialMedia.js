import Input from "../../form/Input";
import Model from "../Model";

export default function ShareOnSocialMedia({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Share on social media" modalClass="w-[60%]!" modalBodyClass="max-h-[90vh]!">
            <div>
                <div className="font-semibold">
                    Share This Review:
                </div>

                <div>

                </div>

                <div>
                    <Input icon={true}/>
                </div>
            </div>
        </Model>
    )
}