import { Form, Input, Modal, Select, Upload } from 'antd';
import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { toast } from 'sonner';
import { useGetAllCategoryQuery, useUpdateAuctionMutation } from '../../redux/api/dashboardApi';
import JoditEditor from 'jodit-react';

const UpdateAuctionModal = ({ isModalOpen, setIsModalOpen, singleAuction }) => {
    const { data: getAllCategory } = useGetAllCategoryQuery()

    const [updateAuction] = useUpdateAuctionMutation()
    const [fileList, setFileList] = useState([]);
    const [isFinancingAvailable, setIsFinancingAvailable] = useState(singleAuction?.financeAvailable);
    const editor = useRef(null);
    const [content, setContent] = useState('');

    // Update the financing availability state when singleAuction changes
    useEffect(() => {
        if (singleAuction?.financeAvailable !== undefined) {
            setIsFinancingAvailable(singleAuction.financeAvailable);
        }
    }, [singleAuction]);

    const [form] = Form.useForm();
    // Handle upload image 
    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handleRemove = (file) => {
        setFileList(fileList.filter((item) => item.uid !== file.uid));
    };
    // Update auction product
    const onFinish = (values) => {
        const id = singleAuction?.id;
        const data = {
            ...values,
            ...(values?.totalMonthForFinance && {
                totalMonthForFinance: Number(values?.totalMonthForFinance),
            }),
            incrementValue: Number(values?.incrementValue),
            reservedBid: Number(values?.reservedBid),
        };

        const existingImages = fileList.filter(file => file.url).map(file => file.url);
        const newImages = fileList.filter(file => file.originFileObj);

        const formData = new FormData();
        formData.append('data', JSON.stringify({
            ...data,
            images: existingImages,
        }));

        newImages.forEach((file) => {
            formData.append('product_image', file.originFileObj);
        });

        // Send the formData to the server
        updateAuction({ formData, id }).unwrap()
            .then((payload) => {
                toast.success(payload?.message);
                setIsModalOpen(false);
                form.resetFields();
                setFileList([]);
            })
            .catch((error) => {
                toast.error(error?.data?.message);
            });
    };

    // Handle the change in financing selection
    const handleFinancingChange = (value) => {
        if (value) {
            setIsFinancingAvailable(value);
        } else {
            setIsFinancingAvailable(false)
        }
    };



    // Set initial values when singleAuction changes

    useEffect(() => {
        if (singleAuction) {
            form.setFieldsValue({
                name: singleAuction.name,
                category: singleAuction.category?._id,
                reservedBid: singleAuction.reservedBid,
                incrementValue: singleAuction.incrementValue,
                startingDate: singleAuction.statingAndEndTime.split('-at-')[0],
                startingTime: singleAuction.statingAndEndTime.split('-at-')[1].trim(),
                endingDate: singleAuction.endDataAndEndTime.split('-at-')[0],
                endingTime: singleAuction?.endDataAndEndTime?.split('-at-')[1].trim(),
                financeAvailable: singleAuction?.financeAvailable,
                totalMonthForFinance: singleAuction?.totalMonthForFinance,
                description: singleAuction.description || '',
            });

            // If there are images, set them in the fileList
            if (singleAuction.img && singleAuction.img.length > 0) {
                const images = singleAuction.img.map((url, index) => ({
                    uid: index,
                    name: `image-${index}.png`,
                    status: 'done',
                    url: url,
                }));
                setFileList(images);
            }
        }
    }, [singleAuction, form]);

    const config = {
        readonly: false,
        placeholder: 'Write description here...',
        style: {
            height: '15vh',
        },
        buttons: [
            'image', 'fontsize', 'bold', 'italic', 'underline', '|',
            'font', 'brush',
            'align'
        ]
    }

    return (
        <div>
            <Modal
                centered
                open={isModalOpen}
                footer={false}
                width={800}
                onCancel={() => {
                    setIsModalOpen(false);
                    form.resetFields();
                    setFileList([]);
                }}
            >
                <h1 className='text-center font-medium text-[20px]'>Update Auction</h1>

                <Form form={form} onFinish={onFinish} layout='vertical'>
                    <div className='flex justify-between items-center gap-2 mt-5'>
                        <Form.Item
                            label="Item Name"
                            name="name"
                            className='w-full'
                            rules={[{ required: true, message: 'Please input item name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Category"
                            name="category"
                            className='w-full'
                        // rules={[{ required: true, message: 'Please input category!' }]}
                        >
                            {/* <Input /> */}
                            <Select>
                                {getAllCategory?.data?.map((category) => (
                                    <Option key={category._id} value={category._id}>
                                        {category.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <Form.Item
                            label="Reserved Bid"
                            name='reservedBid'
                            className='w-full'
                            rules={[{ required: true, message: 'Please input reserved bid!' }]}
                        >
                            <Input type='number' />
                        </Form.Item>
                        <Form.Item
                            label="Increment Value"
                            name='incrementValue'
                            className='w-full'
                            rules={[{ required: true, message: 'Please input increment value!' }]}
                        >
                            <Input type='number' />
                        </Form.Item>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <Form.Item
                            label="Starting Date"
                            name='startingDate'
                            className='w-full'
                            rules={[{ required: true, message: 'Please select starting date!' }]}
                        >
                            <Input type='date' />
                        </Form.Item>
                        <Form.Item
                            label="Starting Time"
                            name='startingTime'
                            className='w-full'
                            rules={[{ required: true, message: 'Please select starting time!' }]}
                        >
                            <Input type='time' />
                        </Form.Item>
                    </div>
                    <div className='flex justify-between items-center gap-2'>
                        <Form.Item
                            label="End Date"
                            name='endingDate'
                            className='w-full'
                            rules={[{ required: true, message: 'Please select end date!' }]}
                        >
                            <Input type='date' />
                        </Form.Item>
                        <Form.Item
                            label="End Time"
                            name='endingTime'
                            className='w-full'
                            rules={[{ required: true, message: 'Please select end time!' }]}
                        >
                            <Input type='time' />
                        </Form.Item>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'center', justifyContent: 'space-between' }}>
                        {/* Financing Select */}
                        <div>
                            <Form.Item
                                label="Financing"
                                name='financeAvailable'
                                initialValue={false}
                            >
                                <Select
                                    defaultValue="Select"
                                    style={{ width: 350 }}
                                    onChange={handleFinancingChange}
                                >
                                    <Option value={true}>Available</Option>
                                    <Option value={false}>Not Available</Option>
                                </Select>
                            </Form.Item>

                        </div>

                        {/* Months Input */}
                        <div>
                            <Form.Item
                                label='Month'
                                name="totalMonthForFinance"
                            >
                                <Input
                                    placeholder="12 Months"
                                    type='number'
                                    style={{ width: 350 }}
                                    disabled={!isFinancingAvailable}
                                />
                            </Form.Item>

                        </div>
                    </div>
                    <Form.Item
                        label="Description"
                        name='description'
                        rules={[{ required: true, message: 'Please enter a description!' }]}
                    >
                        {/* <TextArea /> */}
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={config}
                            tabIndex={1}
                            onBlur={newContent => setContent(newContent)}
                            onChange={newContent => { }}
                        />
                    </Form.Item>

                    <Form.Item label="Upload Images">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            onChange={handleUploadChange}
                            onRemove={handleRemove}
                            beforeUpload={() => false}
                            multiple
                        >
                            {fileList.length >= 4 ? null : (
                                <div className='flex items-center gap-2'>
                                    <PlusOutlined />
                                    <div >Add Image</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <div className='flex justify-between gap-3'>
                        <Form.Item className='w-full'>
                            <Button className='w-full'>Save</Button>
                        </Form.Item>
                        <Form.Item className='w-full'>
                            <button
                                type="button"
                                className='bg-[#d9000a] text-white w-full p-1 rounded-md'
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default UpdateAuctionModal;
