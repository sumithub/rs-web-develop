import Checkbox from "../../form/Checkbox";
import Search from "../../form/Search";
import Model from "../Model";

export default function AssignReviewToUser({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Assign Review to a user" modalClass="w-[60%]!">
            <div className="grid grid-cols-2 gap-[32vw]">
                <div className="mt-4 ps-10">
                    <div>Zain Levin</div>
                    <div className="font-thin">zainlevin@gmail.com</div>
                </div>

                <div className="mt-8">
                    <div>Jun 11,2024</div>
                </div>
            </div>

            <div className="mt-4">
                <div className="text-sm ps-10">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2">
                <div className="font-semibold mt-2">
                    Select User
                </div>

                <div>
                    <Search placeholder="Search by Name or Email" mainClass="w-full!"/>
                </div>
            </div>

            <div>
                <div className="flex justfy-between align-center gap-3">
                    <Checkbox />
                    <div>John Deo</div>
                </div>

                <div className="flex justfy-between align-center gap-3">
                    <Checkbox />
                    <div>John Deo</div>
                </div>
                
                <div className="flex justfy-between align-center gap-3">
                    <Checkbox />
                    <div>John Deo</div>
                </div>
            </div>
        </Model>
    )
}