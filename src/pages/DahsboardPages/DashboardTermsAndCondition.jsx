/* eslint-disable no-unused-vars */
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  useCreateTermsAndConditionMutation,
  useGetTermsAndConditionQuery,
} from "../../redux/api/dashboardApi";
import { toast } from "sonner";

const DashboardTermsAndCondition = () => {
  const [createTerms] = useCreateTermsAndConditionMutation();
  const { data: getTerms } = useGetTermsAndConditionQuery();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const handleTerms = () => {
    const data = {
      description: content,
    };
    createTerms(data)
      .unwrap()
      .then((payload) =>
        toast.success("Terms and condition create successfully!")
      )
      .catch((error) => toast.error(error?.data?.message));
  };

  const config = {
    readonly: false,
    placeholder: "Start typing...",
    style: {
      height: "70vh",
    },
    buttons: [
      "image",
      "fontsize",
      "bold",
      "italic",
      "underline",
      "|",
      "font",
      "brush",
      "align",
    ],
    events: {
      afterInit: (editor) => {
        // Set editor container styles after initialization
        const editorContainer = editor.editor;
        editorContainer.style.backgroundColor = "#323232"; // Set background color to #323232
        editorContainer.style.color = "white"; // Set text color to white for readability
        editorContainer.style.border = "1px solid #444"; // Optional: Add a border for better visibility
      },
    },
  };

  useEffect(() => {
    if (getTerms?.data?.description) {
      setContent(getTerms?.data?.description);
    }
  }, [getTerms]);
  return (
    <>
      <div className="flex justify-start items-center gap-2 mb-3 relative m-5">
        <div className="absolute top-6 left-2 flex items-center">
          <Link
            to={-1}
            className="py-1 px-2 rounded-md flex justify-start items-center gap-1"
          >
            <IoArrowBackSharp className="text-black " />
          </Link>{" "}
          <p className="font-semibold ">Terms and Condition</p>
        </div>
      </div>

      <div className="custom-jodit-editor mx-5 ">
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
        <div className="flex items-center   justify-center mt-5">
          <button
            onClick={() => handleTerms()}
            className="bg-button-primary  text-white px-4 py-2 rounded-lg test"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardTermsAndCondition;
