import { Form, Input } from 'antd'
import React from 'react'
import Button from '../../components/ui/Button'
import { useResetPasswordMutation } from '../../redux/api/userApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const AdminResetPassword = () => {
    const [resetPassword] = useResetPasswordMutation()
    const navigate = useNavigate()
    const onFinish = (values) => {
        const data = {
            email: localStorage.getItem('email'),
            newPassword: values?.password,
            confirmPassword: values?.confirmPassword
        }
        resetPassword(data).unwrap()
            .then((payload) => {
                localStorage.removeItem('email')
                toast.success(payload?.message)
                navigate('/')
            })
            .catch((error) => {
                toast.error(error?.data?.message)
            });

    }
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[#fbe2b5] '>
            <div className='bg-white rounded-md p-10   min-w-[500px]'>
                <h1 className='text-[24px] font-medium text-center'>Forget Password?</h1>
                <p className='text-[14px] text-center mb-5'>Please enter your email to get verification code</p>
                <Form
                    onFinish={onFinish}
                    layout="vertical"
                >

                    <Form.Item
                        label="New Password"
                        name='password'
                    >
                        <Input.Password placeholder='Enter your new password' />
                    </Form.Item>
                    <Form.Item
                        label="Confirm New Password"
                        name='confirmPassword'
                    >
                        <Input.Password placeholder='Confirm your new password' />
                    </Form.Item>

                    <Form.Item

                    >
                        <Button type="primary" className='w-[100%] mt-4 bg-yellow  custom-button' htmlType="submit">
                            Reset Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default AdminResetPassword