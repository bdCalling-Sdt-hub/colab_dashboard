import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { useCreateHelpMutation, useGetHelpQuery } from '../../redux/api/dashboardApi';

const Help = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const {data : getHelp} = useGetHelpQuery()
    const [createHelp] = useCreateHelpMutation()
    
    const handleTerms = () => {
      const data = {
        'description': content
      }
      createHelp(data).unwrap()
        .then((payload) => toast.success('Help create successfully!'))
        .catch((error) => toast.error(error?.data?.message));
    }
    const config = {
      readonly: false,
      placeholder: 'Start typings...',
      style: {
        height: '70vh',
      },
      buttons: [
        'image', 'fontsize', 'bold', 'italic', 'underline', '|',
        'font', 'brush',
        'align'
      ]
    }

    useEffect(() => {
        if (getHelp?.data?.description) {
          setContent(getHelp?.data?.description);
        }
      }, [getHelp])
  return (
    <>
    <div className='flex justify-between items-center  gap-2 mb-3 relative m-5'>
      <div className='absolute top-6 left-2 flex items-center'>
        <Link to={-1} className='py-1 px-2 rounded-md flex justify-start items-center gap-1'><IoArrowBackSharp className='text-yellow' /></Link> <p className='font-semibold'>Help</p>
      </div>
    </div>

    <div className="custom-jodit-editor mx-5 ">
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={newContent => setContent(newContent)}
        onChange={newContent => { }}
      />
      <div className='flex items-center   justify-center mt-5'>
        <button onClick={() => handleTerms()} className='bg-yellow  text-white px-4 py-2 rounded-lg test'>Save Changes</button>
      </div>

    </div>
  </>
  )
}

export default Help