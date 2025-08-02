import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
const {id} = useParams();
const allPastes = useSelector((state) => state.paste.pastes)
const paste = allPastes.filter((p) => p._id === id)[0];

  return (
    <div className="bg-black rounded-2xl mt-4 md:w-[40vw]">
      <div className="m-2 p-3 justify-between flex bg-black rounded-2xl place-content-between">
        <input
          className="border-none focus:outline-none "
          type="text"
          placeholder="Enter the Title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success('Content Copied')
                    }} className="m-2 text-[#646cff]">Copy</button>
        </div>
      </div>

      <div>
        <textarea
          className="m-2 p-3 bg-[#000000b7] w-[95%] focus:outline-none"
          value={paste.content}
          placeholder="Enter the Content"
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
