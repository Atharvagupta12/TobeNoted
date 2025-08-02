import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';


const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] =  useSearchParams();
  const pasteId  = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes)

  useEffect(() => {
      if(pasteId){
        const paste = allPastes.find((p) => p._id === pasteId);
        setTitle(paste.title);
        setValue(paste.content);
      }
  }, [pasteId]);

  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId ||
      Date.now().toString(36),
      createAt:new Date().toISOString(),
    }

    if(pasteId){
      // update
      dispatch(updateToPastes(paste));
    }
    else{
      // create
      dispatch(addToPastes(paste));

    }

    // after creating/updating clear ui
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className='bg-black rounded-2xl mt-4 md:w-[40vw]'>
      <div className='m-2 p-3 justify-between flex bg-black rounded-2xl place-content-between'>
      <input
      className='border-none focus:outline-none'
      type='text'
      placeholder='Enter the Title here'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>

    </div>

    <div>
      <textarea className='m-2 p-3 bg-[#000000b7] w-[95%] focus:outline-none'   
      value={value}
      placeholder="Enter the Content"
      onChange={(e) => setValue(e.target.value)}
      rows={10}

      ></textarea>
    </div>
    </div>
  )
}

export default Home
