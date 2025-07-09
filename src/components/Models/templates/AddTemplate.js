"use client"
import CreateTemplate from "../../CreateTemplate"
import Model from '../Model'


function AddTemplate({ onClose, id }) {
  return <Model onClose={onClose} title={(!id ? "Create Email Template" : "Edit Email Template")} modalBodyClass='max-h-[85vh]'>
    <CreateTemplate />
  </Model>
}

export default AddTemplate

