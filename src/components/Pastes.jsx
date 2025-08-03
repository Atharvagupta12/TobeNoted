import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );


  function handleDelete(pasteId) {
    dispatch(removeToPastes(pasteId));
  }

  return (
    <div className="bg-black rounded-2xl mt-4 md:w-[40vw] p-4 ">
      <div className="m-1 p-1 justify-between border-b-[1px] border-[#646cff] flex bg-black rounded-2xl place-content-between">
        <input
          type="search"
          className="w-full p-2 focus:outline-none text-white placeholder-gray-400"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="text-center mt-10">
        <h1 className="text-xl font-semibold">All Your Notes</h1>
      </div>

      <div className="m-2 p-1">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div className="border border-blue-100 mt-5 p-3 text-center" key={paste?._id}>
                <div className="text-amber-200">{paste.title}</div>
                <div className="text-green-200 my-2">{paste.content}</div>
                <div className="md:flex place-content-evenly text-sm ">
                  <button className="m-1 bg-[#1a1a1a] focus:outline-none">
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button className="m-1 text-[#646cff] bg-[#1a1a1a] focus:outline-none">
                    <a href={`/pastes/${paste._id}`}>View</a>
                  </button>
                  <button
                    onClick={() => handleDelete(paste?._id)}
                    className="m-2 text-[#646cff] bg-[#1a1a1a] focus:outline-none"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste?.content);
                      toast.success("Content Copied");
                    }}
                    className="m-2 text-[#646cff] bg-[#1a1a1a] focus:outline-none"
                  >
                    Copy
                  </button>
                  <button 
                 onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/pastes/${paste._id}`);
                      toast.success("Link Copied");
                    }}
                  className="m-2 text-[#646cff] bg-[#1a1a1a] focus:outline-none">Share</button>
                </div>
                <div className="mt-2 text-white">
                  {new Date(paste.createAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Pastes;
