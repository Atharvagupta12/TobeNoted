import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToPastes } from "../redux/pasteSlice";
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId){
    dispatch(removeToPastes(pasteId));
  }

  return (
    <div className="bg-black rounded-2xl mt-4 md:w-[40vw] p-4 ">
      <div className="m-1 p-1 justify-between border-b-[1px] border-[#646cff] flex bg-black rounded-2xl place-content-between">
        <input
          type="search"
          className="w-full p-2 focus:outline-none"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

        <div className="m-2 p-1">
          {
            filteredData.length >0 && 
            filteredData.map((paste) => {
              return (
                <div className="border mt-5 p-3 text-center" key={paste?._id}>
                  <div className="text-amber-200">
                   {paste.title}
                  </div>
                  <div className="text-green-200">
                   {paste.content}
                  </div>
                  <div className="md:flex place-content-evenly text-sm ">
                    <button className="m-1">
                      <a href={`/?pasteId=${paste?._id}`}>
                        Edit
                      </a>
                      </button>
                    <button className="m-1 text-[#646cff]">
                    <a href={`/pastes/${paste._id}`}>
                        View
                    </a>
                    </button>
                    <button onClick={() => handleDelete(paste?._id)} className="m-2 text-[#646cff]">Delete</button>
                    <button onClick={() => {
                      navigator.clipboard.writeText(paste?.content)
                      toast.success('Content Copied')
                    }} className="m-2 text-[#646cff]">Copy</button>
                    <button className="m-2 text-[#646cff]">Share</button>
                  </div>
                  <div>
                    {paste.createAt}
                  </div>
                  
                </div>
              )
            })
          }
        </div>
    </div>
  );
};

export default Pastes;
