"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CancelButton from "../../common/CancelButton";
import SecondaryButton from "../../common/SecondaryButton";
import Status from "../../Status";
import Model from "../Model";
import { getError } from "../../../../helper";
import SelectForm from "../../form/SelectForm";

export default function ChangeUserRole({ onClose, id, user = {} }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sending, setSending] = useState(false);

  const { name = "Johan Deo", email = "johan@example.com", role = "Manager", status = "Active" } = user;

  const onSubmit = async (data) => {
    try {
      setSending(true);

      await axios.put("/api", data);

      toast.success("Role Changed Successfully");
      onClose();
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <Model title="Change User Role" onClose={onClose} modalClass="w-1/2!">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-secondary text-xl font-semibold capitalize">
          Are you sure you want to changes the role for
        </div>

        <div className="bg-dark rounded-lg p-4 mt-7">
          <div className="flex items-center justify-between">
            <div className="text-secondary text-lg">{name}</div>
            <Status status={status} />
          </div>
          <hr className="border-t border-border-color my-2" />
          <div className="text-secondary text-lg">{email}</div>
        </div>

        <div className="text-secondary text-lg font-medium capitalize my-3">
          Current Role: {role}
        </div>

        <div className="flex items-center gap-3 mt-2">
          <div className="text-secondary text-sm font-semibold mt-2">New Role:</div>
          <SelectForm
            label=""
            selectClass_="py-2.5! px-2.5! focus:border-primary/60!"
            formProps={{
              ...register("role", { required: true }),
            }}
          >
            <option value="owner">Owner</option>
            <option value="manager">Manager</option>
            <option value="viewer">Viewer</option>
          </SelectForm>
        </div>
        {errors.role && (
          <div className="text-red-500 text-sm mt-1">Please select a role</div>
        )}

        <div className="grid grid-cols-2 gap-3 mt-5">
          <CancelButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Change Role" type="submit" disabled={sending} />
        </div>
      </form>
    </Model>
  );
}
