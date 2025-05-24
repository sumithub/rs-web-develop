import SecondaryButton from "../../common/SecondaryButton";
import Model from "../Model";

export default function CodePreviewBox({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Code Preview Box" modalClass="w-[60%]!">
            <div>
                <div className="border border-border-color rounded-md bg-[#0396FF1a]">
                    <p className="mt-2 mb-2 pl-2 decoration-[#0000FF]">
                        script src="https://your-domain.com/widget.js"
                        <br />
                        data-widget-id="XYZ"
                        <br />
                        async/script
                    </p>
                </div>

                <div className="mt-4">
                    <SecondaryButton title="Copy Code" />
                </div>

                <div className="mt-4">
                    Instructions: Copy and paste the above JavaScript snippet into your website's HTML
                    <br />
                    where you want the widget to appear.
                </div>
            </div>
        </Model>
    )
}