import { Form, Modal, Spin, Upload } from 'antd';
import React, { useState } from 'react'
import Button from './Button';
import { PlusOutlined } from '@ant-design/icons';
import { useCreateBannerMutation } from '../../redux/api/dashboardApi';
import { toast } from 'sonner';


const BannerModal = ({ setOpenBannerModal, openBannerModal }) => {
    const [createBanner, {isLoading}] = useCreateBannerMutation()
    const [fileList, setFileList] = useState();
    const [form] = Form.useForm()
    // handle upload image 
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = () => {
        const formData = new FormData()
        if (!fileList || fileList.length === 0) {
            return toast.error('Please Select an Image!!');
        }
        if (fileList.length > 0) {

            formData.append('banner_image', fileList[0].originFileObj)
        }
        createBanner(formData).unwrap()
            .then((payload) => {
                toast.success(payload?.message)
                setOpenBannerModal(false)
                setFileList([])
            })
            .catch((error) => toast.error(error?.data?.message));
    }


    return (
        <Modal open={openBannerModal} centered footer={false} onCancel={() => setOpenBannerModal(false)}  >
            <h1 className='text-center font-medium mb-5'>Add Banner</h1>
            <Form
                layout='vertical'
                onFinish={onFinish}
                form={form}
            >

                <Form.Item>
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                        className="upload-full-width"
                        maxCount={1}
                        required>
                        <div className='flex items-center gap-2'>
                            <PlusOutlined />
                            <div >Add Image</div>
                        </div>
                    </Upload>
                </Form.Item>
                <div className='flex justify-between  gap-3'>
                    <Form.Item className='w-full' >
                        <Button className='w-full' disabled={isLoading} >
                            {isLoading ? <Spin/> : "Save"}
                        </Button>
                    </Form.Item>
                    <Form.Item className='w-full' >
                        <button className='bg-[#d9000a] text-white w-full p-1 rounded-md' onClick={() => setOpenBannerModal(false)} >cancel</button>
                    </Form.Item>

                </div>
            </Form>
        </Modal>
    )
}

export default BannerModal