import React, { useState } from 'react'
import OTPInput from 'react-otp-input'
import Button from '../../components/ui/Button'
import { useForgetPasswordMutation, useVerifyOtpMutation } from '../../redux/api/userApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AdminVerificationCode = () => {
    const [otp, setOtp] = useState("");
    const [forgetPassword] = useForgetPasswordMutation()
    const [verifyOtp] = useVerifyOtpMutation()
    const navigate = useNavigate()
    const handleVerifyOtp = () => {
        const data = {
            email: localStorage.getItem('email'),
            verifyCode: Number(otp)
        }
        verifyOtp(data).unwrap()
            .then((payload) => {
                
                    navigate('/admin-reset-password')
                
                toast.success(payload?.message)
            })
            .catch((error) => toast.error(error?.data?.message));
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-[#fbe2b5] '>
            <div className='bg-white rounded-md px-10  min-w-[200px]  py-16'>
                <h1 className='text-[24px] font-medium text-center'>Check your email</h1>
                <p className='text-[14px] text-center mb-5 w-[500px] mx-auto'>We sent a reset link to contact@dscode...com enter 5 digit code that mentioned in the email</p>
                <div className=' flex justify-center items-center my-10'>
                    <OTPInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        inputStyle={{
                            height: "44px",
                            width: "44px",
                            borderRadius: "8px",
                            marginRight: "16px",
                            fontSize: "20px",
                            border: "1px solid #F3A211",
                            color: "#F3A211",
                            outline: "none"
                        }}
                        renderInput={(props) => <input {...props} />}
                    />
                </div>
                <div className='flex items-center justify-center'>
                    <Button onClick={handleVerifyOtp} className=' '>Verify</Button>

                </div>
                <div className='text-center mt-5'>
                    You have not received the email? <span className='text-yellow cursor-pointer' onClick={() => forgetPassword(localStorage.getItem('email'))} >Resend</span>
                </div>
            </div>
        </div>
    )
}

export default AdminVerificationCode