import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../../redux/api/userApi";
import { toast } from "sonner";
import { EyeOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined } from "@ant-design/icons";

const AdminLogin = () => {
  const [loginAdmin] = useLoginAdminMutation();
  const navigate = useNavigate();
  const onFinish = (values) => {
    loginAdmin(values)
      .unwrap()
      .then((payload) => {
        if (payload?.data?.accessToken) {
          localStorage.setItem(
            "token",
            JSON.stringify(payload?.data?.accessToken)
          );
          navigate("/");
          toast.success(payload?.message);
        }
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#323232] ">
      <div className="bg-[#252525] text-white rounded-md p-10   min-w-[500px]">
        <h1 className="text-[24px] font-medium text-center">
          Login to Account
        </h1>
        <p className="text-[14px] text-center mb-5">
          Please enter your email and password to continue
        </p>
        {/* <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <Input placeholder="esteban_schiller@gmail.com" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input.Password placeholder="**********" />
          </Form.Item>
          <div className="flex justify-between items-center">
            <Checkbox>Remember me</Checkbox>
            <Link
              to="/admin-forget-password"
              className="text-[#F3A211] hover:text-[#F3A211] font-medium"
            >
              Forget Password?
            </Link>
          </div>
          <Form.Item>
            <Button
              className="w-[100%] mt-4 bg-yellow hover:bg-yellow custom-button"
              style={{
                backgroundColor: "#f29d0c",
                color: "#ffff",
                border: "none",
              }}
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form> */}
        <Form layout="vertical" onFinish={onFinish}>
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
          {/* <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>Password</span>}
          >
            <Input.Password
              placeholder="Enter password"
              style={{
                backgroundColor: "#323232",
                color: "white",
              }}
            />
          </Form.Item> */}
          <Form.Item
            name="password"
            label={<span style={{ color: "white" }}>Password</span>}
          >
            <Input.Password
              placeholder="Enter password"
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

          <div className="flex justify-between items-center">
            <Checkbox className="text-white">Remember me</Checkbox>
            <Link
              to="/admin-forget-password"
              className="text-[#b4007e] font-medium"
            >
              Forget Password?
            </Link>
          </div>
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

export default AdminLogin;
