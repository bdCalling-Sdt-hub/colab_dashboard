import { Form, Input, Modal } from 'antd'
import React, { useState } from 'react'
import { GoPlus } from 'react-icons/go'
import { IoArrowBackSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useCreateFaqMutation, useGetFaqQuery } from '../../redux/api/dashboardApi'
import { toast } from 'sonner'
const { TextArea } = Input;

const DashboardFaqs = () => {
  const [createFaq] = useCreateFaqMutation()
  const [form] = Form.useForm()
  const { data: getFaq } = useGetFaqQuery()
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const faq = getFaq?.data?.map(faq => {
  //   return {
  //     question: faq?.question,
  //     answer: faq?.answer
  //   }
  // }

  // )

  // add question and answer modal function
  const handleAddFaq = () => {
    setIsModalOpen(true)

  }

  const onFinish = (values) => {
    createFaq(values).unwrap()
      .then((payload) =>{
        toast.success('FAQ create successfully!')
        form.resetFields()
      })
      .catch((error) => toast.error(error?.data?.message));
    setIsModalOpen(false)
  }

  return (
    <div className='bg-white rounded-md p-5'>
      <div className='flex'>
        <Link to={-1} className='py-1 px-2 rounded-md flex justify-start items-center gap-1  '><IoArrowBackSharp className='text-[var(--primary-color)]' /></Link> <p className='font-semibold text-[18px]'>FAQ</p>
      </div>


      {/* all question and answer */}

      <div className='grid grid-cols-2 gap-5 mt-2'>
        {
          getFaq?.data?.map((qusetion, i) => <div key={i} className='p-2'>
            <p className='pb-3'>Question no: {i + 1}</p>
            <p className='bg-[#F2F2F2] p-2 rounded-md'>{qusetion?.question}</p>
            <p className='py-2'>Answer</p>
            <p className='bg-[#F2F2F2] p-2 rounded-md'>{qusetion?.answer}</p>
          </div>)
        }


      </div>
      <div className='flex items-center justify-center mt-20'>
        <button onClick={() => handleAddFaq()} className='flex items-center gap-2 bg-yellow text-white px-10 py-2 rounded-3xl'><GoPlus size={20} /><span> Add FAQ</span></button>
      </div>


      {/* Modal  */}


      <Modal centered open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
        <p className='text-center font-semibold pb-5 text-xl'>Add FAQ</p>
        <Form
          onFinish={onFinish}
          form={form}
          onCancel={
            form.resetFields()
          }
        >
          <Form.Item
            name='question'
          >
            <Input placeholder="Type Answer Here.." variant="filled" />

          </Form.Item>
          <Form.Item name='answer'>
            <TextArea rows={4} placeholder="Type question here.." variant="filled" />
          </Form.Item>
          <div className='flex items-center justify-center mt-2'>
            <button className='flex w-full items-center justify-center gap-2 bg-yellow text-white px-10 py-2 text-xl rounded-3xl'> Save</button>
          </div>
        </Form>

      </Modal>


    </div>
  )
}

export default DashboardFaqs