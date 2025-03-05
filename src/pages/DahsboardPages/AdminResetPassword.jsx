import { Form, Input } from "antd";
import Button from "../../components/ui/Button";
import { useResetPasswordMutation } from "../../redux/api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const AdminResetPassword = () => {
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const onFinish = (values) => {
    const data = {
      email: localStorage.getItem("email"),
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    };
    resetPassword(data)
      .unwrap()
      .then((payload) => {
        localStorage.removeItem("email");
        toast.success(payload?.message);
        navigate("/admin-login");
      })
      .catch((error) => {
        toast.error(error?.data?.message);
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#323232] ">
      <div className="bg-[#252525] text-white rounded-md p-10   min-w-[500px]">
        <h1 className="text-[24px] font-medium text-center">Reset Password</h1>

        {/* <Form onFinish={onFinish} layout="vertical">
          <Form.Item label="New Password" name="password">
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>
          <Form.Item label="Confirm New Password" name="confirmPassword">
            <Input.Password placeholder="Confirm your new password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              className="w-[100%] mt-4 bg-yellow  custom-button"
              htmlType="submit"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form> */}
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>New Password</span>}
          >
            <Input.Password
              //   placeholder="Enter password"
              style={{
                backgroundColor: "#323232",
                color: "white",
              }}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "white" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "white" }} />
                )
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<span style={{ color: "white" }}> Retype New Password</span>}
          >
            <Input.Password
              //   placeholder="Enter password"
              style={{
                backgroundColor: "#323232",
                color: "white",
              }}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined style={{ color: "white" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "white" }} />
                )
              }
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="w-[100%] mt-4 bg-button-primary"
              style={{
                backgroundColor: "#b4007e",
                color: "#ffff",
                border: "none",
              }}
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
