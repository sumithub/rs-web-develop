import Image from "next/image";
import Checkbox from "../../form/Checkbox";
import Search from "../../form/Search";
import Model from "../Model";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import AssignToUser from "../review/AssignToUser"
import { useMemo, useState } from "react";

 const allUsers = [
  { id: 1, name: "John Deo", email: "john@example.com" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com" },
  { id: 3, name: "Alex Brown", email: "alex@example.com" },
];

export default function AssignReviewToUser({ onClose, onSave }) {
    const [openAssign, setOpenAssign] = useState(false)
   const [searchTerm, setSearchTerm] = useState("");
  const [selectedUsers, setSelectedUsers] = useState({});

  const handleCheck = (id, checked) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

 
    return (
        <Model onClose={onClose} title="Assign Review to a user" modalClass="w-[50%]!">
            {openAssign &&
                <AssignToUser
                    onClose={() => {
                        setOpenAssign(false)
                    }}
                    onSave={() => {
                        setOpenAssign(true)
                    }}
                />
            }
            <div className="flex pt-5 items-center justify-between">
                <div className="flex items-start w-full gap-[15px]">
                    <Image src="/images/request.png" alt="request" width={46} height={46} />
                    <div className="w-full">
                        <div className="flex justify-between">
                            <div className="">
                                <h2 className="text-base font-semibold">Zain Levin</h2>
                                <h3 className="text-sm text-text3 pt-1.5">ZainLevin@gmail.com</h3>
                            </div>
                            <div className="flex items-center gap-[15px]">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                    <Image src="/images/star.svg" alt="rating" height={18} width={18} unoptimized={true} />
                                </div>
                                <h2 className="text-sm">Jun 11,2024</h2>
                            </div>
                        </div>
                        <h2 className="text-xs pt-[15px] capitalize leading-normal">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the .</h2>
                    </div>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-2 items-center">
                <div className="font-semibold mt-2">
                    Select User
                </div>

                <div>
                    <Search placeholder="Search by Name or Email"
                        mainClass="w-[80%]! ml-auto!"
                      onSearch={(s) => setSearchTerm(s)}
                    />
                </div>
            </div>

  <div className="flex flex-col gap-y-3 mt-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div className="flex items-center gap-3" key={user.id}>
              <Checkbox
                checked={selectedUsers[user.id] || false}
                onChange={(checked) => handleCheck(user.id, checked)}
              />
              <div className="text-secondary text-sm capitalize">{user.name}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-text3">No users found.</div>
        )}
      </div>

                {/* <div className="flex items-center gap-3 mt-3">
                    <Checkbox />
                    <div className="text-secondary text-sm capitalize">John Deo</div>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox />
                    <div className="text-secondary text-sm capitalize">sarah Smith</div>
                </div>

                <div className="flex items-center gap-3">
                    <Checkbox />
                    <div className="text-secondary text-sm capitalize">Alex Brown</div>
                </div> */}
         
            <div className="grid grid-cols-2 gap-5 mt-[30px]">
                <CancelButton title="Cancel" class_="text-lg! font-medium!" onClick={onClose} />
                <SecondaryButton title="Assign" class_="text-lg! font-medium!" onClick={() => { setOpenAssign(true) }} />
            </div>
        </Model>
    )
}