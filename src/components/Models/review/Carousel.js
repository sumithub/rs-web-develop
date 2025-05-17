import Input from "../../form/Input";
import Select from "../../form/Select";
import Model from "../Model";
import Checkbox from "../../form/Checkbox";
import SecondaryButton from "../../common/SecondaryButton";
import CancelButton from "../../common/CancelButton";

export default function Carousel({ onClose, OnSave }) {
    return (
        <Model onClose={onClose} title="Carousel" modalClass="w-[60%]!">
            <div>
                <div className="border border-border-color rounded-md">
                    <div className="mt-2 pl-2 font-semibold text-lg">
                        Design
                    </div>

                    <div className="grid grid-cols-3 gap-2 p-2">
                        <Input label="Color Scheme" isRequired={true} placeholder="Select Color" />
                        <Select defaultOption="Select Font" label="Font Family" isRequired={true} />
                        <Input label="Border Radius" isRequired={true} placeholder="Select Border Color" />
                    </div>
                </div>

                <div className="border border-border-color rounded-md mt-2">
                    <div className="mt-2 pl-2 font-semibold text-lg">
                        Content
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-2 ">
                        <Input label="Number of Reviews" isRequired={true} placeholder="Enter review count" />
                        <Input label="Minimum Rating" isRequired={true} placeholder="Enter Filtering" />
                    </div>

                    <div className="p-2">
                        <Input label="Sorting" isRequired={true} placeholder="Enter sorting" />
                    </div>

                    <div className="p-2 mb-2">
                        Show Reviewer Details
                    </div>
                </div>

                <div className="border border-border-color rounded-md mt-2 ">
                    <div className="font-semibold text-lg mt-2 pl-2">
                        Review Sources
                    </div>

                    <div className="pl-2">
                        Select up to 3
                    </div>

                    <div className="pl-2 flex gap-2 mb-2">
                        <Checkbox />
                        <div>Google</div>

                        <Checkbox />
                        <div>Trustpilot</div>

                        <Checkbox />
                        <div>Yelp</div>
                    </div>
                </div>

                <div className="border border-border-color rounded-md mt-2 ">
                    <div className="font-semibold text-lg mt-2 pl-2">
                        Behaviour
                    </div>

                    <div className="p-2">
                        <Select defaultOption="Select transitions" label="transitions" isRequired={true}/>
                    </div>

                    <div className="mb-2">
                        <div className="pl-2">Auto-Scroll</div>
                    </div>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-4">
                    <SecondaryButton title="Save"/>
                    <CancelButton title="Next"/>
                </div>
            </div>
        </Model>
    )
}