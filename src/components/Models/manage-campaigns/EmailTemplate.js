import Search from "../../form/Search";
import Radio from "../../form/Radio";
import SecondaryButton from "../../common/SecondaryButton";
import Select from "../../form/Select"
import TableOrder from "../../TableOrder"
import Model from "../Model";

export default function EmailTemplate({ onClose }) {
    return <Model title="E-mail Templates" onClose={onClose} modalClass="w-1/2!">
        <main>
            <div className="flex items-center justify-between mb-5">
                <Search placeholder="Search by Filter by name, email, phone" mainClass="w-1/2!" />
                <div className="flex items-center gap-2">
                    <Select defaultOption="Filters" class_="mt-0!"></Select>
                    <SecondaryButton title="Add Selected" class_="text-sm! font-normal! py-[7px]!" />
                </div>
            </div>

            <div className="table-class">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th><TableOrder title="Template Name " /></th>
                            <th><TableOrder title="Description" /></th>
                            <th><TableOrder title="Template Type " /></th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td><div className="flex items-center"><Radio mainClass="gap-0!" inputClass="mb-2!" class_="mt-2!" />Nature Template</div></td>
                            <td><div className="line-clamp-1">Lorem ipsum..</div></td>
                            <td>Email Template</td>
                        </tr>

                        <tr>
                            <td><div className="flex items-center"><Radio mainClass="gap-0!" inputClass="mb-2!" class_="mt-2!" />Nature Template</div></td>
                            <td><div className="line-clamp-1">Lorem ipsum..</div></td>
                            <td>Email Template</td>
                        </tr>

                        <tr>
                            <td><div className="flex items-center"><Radio mainClass="gap-0!" inputClass="mb-2!" class_="mt-2!" />Nature Template</div></td>
                            <td><div className="line-clamp-1">Lorem ipsum..</div></td>
                            <td>Email Template</td>
                        </tr>

                        <tr>
                            <td><div className="flex items-center"><Radio mainClass="gap-0!" inputClass="mb-2!" class_="mt-2!" />Nature Template</div></td>
                            <td><div className="line-clamp-1">Lorem ipsum..</div></td>
                            <td>Email Template</td>
                        </tr>

                        <tr>
                            <td><div className="flex items-center"><Radio mainClass="gap-0!" inputClass="mb-2!" class_="mt-2!" />Nature Template</div></td>
                            <td><div className="line-clamp-1">Lorem ipsum..</div></td>
                            <td>Email Template</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </Model>
}