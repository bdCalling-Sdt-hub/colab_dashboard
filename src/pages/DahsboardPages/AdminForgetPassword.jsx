import { Button, Form, Input } from "antd";
import { useForgetPasswordMutation } from "../../redux/api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminForgetPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword] = useForgetPasswordMutation();

  const onFinish = (values) => {
    forgetPassword(values)
      .unwrap()
      .then((payload) => {
        localStorage.setItem("email", values?.email);
        toast.success(payload?.message);
        navigate("/admin-verification-code");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#323232]">
      <div className="bg-[#252525] text-white rounded-md p-10   min-w-[500px]">
        <h1 className="text-[24px] font-medium text-center">
          Forget Password?
        </h1>
        <p className="text-[14px] text-center mb-5">
          Please enter your email to get verification code
        </p>
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item
            name="email"
            label={<span style={{ color: "white" }}>Email</span>}
          >
            <Input
              placeholder="Enter your gmail"
              style={{
                backgroundColor: "#323232",
                color: "white",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="w-[100%] mt-4 bg-button-primary"
              htmlType="submit"
            >
              Continue
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminForgetPassword;
