import SecondaryButton from "../../common/SecondaryButton";
import Checkbox from "../../form/Checkbox";
import Input from "../../form/Input";
import Radio from "../../form/Radio";
import Search from "../../form/Search";
import Select from "../../form/Select";
import Model from "../Model";

export default function BoostRequest({ onClose, onSave }) {
    return (
        <Model onClose={onClose} title="Boost Request" modalClass="w-1/2!">
            <div>
                <div className="font-bold text-base">
                    Send Review, Referral, Or Feedback Requests To One Or More Customers
                </div>

                <div className="flex gap-[10vw] mt-4">
                    <Search placeholder="Search by email, name or phone number" mainClass="w-1/2!" />
                    <SecondaryButton title="Add New Customer" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <Input label="Name" isRequired={true} />
                    <Input label="Email" isRequired={true} />
                </div>

                <div>
                    <Input label="Phone Number" isRequired={true} />
                </div>

                <div className="flex justfy-between align-center gap-[6vw]">
                    <div className="font-bold text-xl mt-6">
                        Choose From Existing Customer
                    </div>

                    <div className="mt-4">
                        <SecondaryButton title="select from customer List" />
                    </div>
                </div>

                <div>
                    <Select defaultOption="Default Campaign" label="Choose Campaign" />
                    <div className="mt-2">
                        Customer Will Be Added To This Campaign For Automated Follow-Ups
                    </div>
                </div>

                <div>
                    <div className="font-bold text-xl mt-6">
                        Send Via
                    </div>

                    <div className="flex align-center justfy-between items-center mt-3">
                        <Radio label="Email" />
                        <Radio label="SMS" />
                        <Radio label="Both" />
                    </div>
                </div>

                <div>
                    <div className="flex gap-2">
                        <Checkbox />
                        <div>Override Default Templates?</div>
                    </div>
                </div>

                <div className="mt-3">
                    Check To Use Custom Templates For This Request. (Uncheck To Apply The Campaign's Defaults)
                </div>

                <div>
                    <div className="grid grid-cols-2">
                        <div className="mt-4">E-Mail Template*</div>
                        <div className="mt-2">
                            <SecondaryButton title="Template Selection" />
                        </div>
                    </div>

                    <div>
                        <Input label="Nature Template" placeholder="Nature Template" />
                    </div>
                </div>

                <div>
                    <div className="grid grid-cols-2">
                        <div className="mt-4">SMS Template*</div>
                        <div className="mt-2">
                            <SecondaryButton title="Template Selection" />
                        </div>
                    </div>

                    <div>
                        <Input label="Nature Template" placeholder="Nature Template" />
                    </div>
                </div>

                <div className="mt-4">
                    <div>Campaign's Default Templates Will Apply.</div>
                </div>

                <div>
                    <div className="mt-4 font-bold text-xl">
                        Customer Selection Summary
                    </div>
                </div>
            </div>
        </Model>
    )
}