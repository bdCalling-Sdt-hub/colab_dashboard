import { Form, Input } from 'antd'
import React from 'react'
import Button from './Button'

const EditAddAddress = () => {
    const [form] = Form.useForm()
    const onFinish  = (values)=>{
    }
    return (
        <div>
            <h1 className='text-yellow font-medium'>Edit Address</h1>
            <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
            >
                <div className=' gap-5 mt-5'>
                    <div >
                        <Form.Item
                            name="fullName"
                            label={<p className="text-[16px]  font-normal">Full
                                Name</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    border: "",
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5 '
                                placeholder="Robert Smith"
                            />
                        </Form.Item>
                        <Form.Item
                            name="streetAddress"
                            label={<p className=" text-[16px] font-normal">Street Address</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder={`xyz@gmail.com`}
                            />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Form.Item
                            name="mobileNumber"
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">City</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="San Jose"
                            />
                        </Form.Item>
                        <Form.Item
                            name="state"
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">State</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="South Dhaka"
                            />
                        </Form.Item>
                        <Form.Item
                            name="zip"
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Zip Code</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="6295"
                            />
                        </Form.Item>
                        <Form.Item
                            name="mobileNumber"
                            label={<p className="text-[#919191] text-[16px] leading-5 font-normal">Phone Number</p>}
                        >
                            <Input
                                style={{
                                    width: "100%",
                                    height: 40,
                                    borderRadius: "5px",
                                    color: "#919191",
                                    outline: "none"
                                }}
                                className='text-[16px] leading-5'
                                placeholder="+9900700007"
                            />
                        </Form.Item>
                       
                    </div>
                </div>

                <Form.Item
                    style={{
                        marginBottom: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"

                        className='px-5 '
                    >
                        Save  Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditAddAddress