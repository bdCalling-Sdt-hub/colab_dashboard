/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { IoCameraOutline } from "react-icons/io5";
import { imageUrl } from "../../redux/api/baseApi";
import {
  useChangePasswordMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../redux/api/userApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [updateProfile, { isLoading }] = useUpdateUserProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const { data: getProfile } = useGetUserProfileQuery();
  console.log("get profile", getProfile);
  const [image, setImage] = useState(null);
  const [form] = Form.useForm();
  const [tab, setTab] = useState(
    new URLSearchParams(window.location.search).get("tab") || "Profile"
  );
  const [passError, setPassError] = useState("");
  const handlePageChange = (tab) => {
    setTab(tab);
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tab);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  const onFinish = (values) => {
    if (values?.newPassword === values.oldPassword) {
      return setPassError("Your old password cannot be your new password");
    }
    if (values?.newPassword !== values?.confirmNewPassword) {
      return setPassError("Confirm password doesn't match");
    }
    changePassword(values)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        navigate("/admin-login");
      })
      .catch((error) => toast.error(error?.data?.message));
  };
  const onEditProfile = (values) => {
    const { email, ...other } = values;
    const formData = new FormData();
    formData.append("data", JSON.stringify(other));
    if (image) {
      formData.append("profile_image", image);
    }
    updateProfile(formData)
      .unwrap()
      .then((payload) => toast.success(payload?.message))
      .catch((error) => toast.error(error?.data?.message));
  };

  useEffect(() => {
    if (getProfile?.data) {
      form.setFieldsValue({
        name: getProfile?.data.name,
        email: getProfile?.data.email,
        phone_number: getProfile?.data.phone_number,
        streetAddress: getProfile?.data?.streetAddress || "N/A",
      });
    }
  }, [getProfile?.data, form]);

  return (
    <div>
      <div className="rounded-md  bg-[#323232]">
        <div className=" py-9 px-10 rounded flex items-center justify-center flex-col gap-6 bg-[#252525] text-white">
          <div className="relative w-[140px] h-[124px] mx-auto bg-black">
            <input
              type="file"
              onInput={handleChange}
              id="img"
              style={{ display: "none" }}
            />
            <img
              style={{ width: 140, height: 140, borderRadius: "100%" }}
              src={`${
                image
                  ? URL.createObjectURL(image)
                  : `${imageUrl}${getProfile?.data?.profile_image}`
              }`}
              alt=""
              className="border-2 shadow-md border-[#C924ED] p-[2px] object-cover"
            />

            {tab === "Profile" && (
              <label
                htmlFor="img"
                className="
                            absolute top-[80px] -right-2
                            bg-[var(--primary-color)]
                            rounded-full
                            w-6 h-6
                            flex items-center justify-center
                            cursor-pointer
                        "
              >
                <div className="bg-yellow p-1 rounded-full">
                  <IoCameraOutline className="text-white " />
                </div>
              </label>
            )}
          </div>
          <div className="w-fit">
            <p className=" text-white text-[24px] leading-[32px] font-semibold">
              {getProfile?.data?.name || "Mr Admin"}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mb-6 text-white">
          <p
            onClick={() => handlePageChange("Profile")}
            className={`
                        ${
                          tab === "Profile"
                            ? "border-[#C924ED] border-b-2 font-semibold text-[#C924ED]"
                            : "border-b-2 border-none border-transparent font-normal text-gray-600"
                        }
                        cursor-pointer text-[16px] leading-5  
                    `}
          >
            Edit Profile
          </p>
          <p
            onClick={() => handlePageChange("Change Password")}
            className={`
                        ${
                          tab === "Change Password"
                            ? "border-[#C924ED] border-b-2 font-semibold text-[#C924ED]"
                            : "border-b-2 border-none border-transparent font-normal  text-gray-600"
                        }
                         cursor-pointer text-base leading-[18px]  
                    `}
          >
            Change Password
          </p>
        </div>
        {tab === "Profile" ? (
          <div className="max-w-[480px] mx-auto rounded-lg p-6 bg-[#252525] text-white">
            <h1 className="text-center text-[var(--primary-color)] leading-7 text-2xl font-medium mb-7">
              Edit Your Profile
            </h1>
            <Form onFinish={onEditProfile} layout="vertical" form={form}>
              <Form.Item
                name="name"
                label={
                  <p className="text-[16px] text-white font-normal">Name</p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "none", // Remove the border
                    borderRadius: "5px",
                    color: "#919191", // Text color inside the input
                    backgroundColor: "#2F2F31", // Background color
                    outline: "none", // Remove the outline
                  }}
                  className="text-[16px] leading-5 placeholder-white"
                  placeholder="Your Name"
                  placeholderStyle={{
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={
                  <p className="text-[16px] text-white font-normal">Email</p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "none", // Remove the border
                    borderRadius: "5px",
                    color: "#919191", // Text color inside the input
                    backgroundColor: "#2F2F31", // Background color
                    outline: "none", // Remove the outline
                  }}
                  className="text-[16px] leading-5 placeholder-white"
                  placeholder=""
                  placeholderStyle={{
                    color: "white",
                  }}
                />
              </Form.Item>

              {/* <Form.Item
                name="address"
                label={
                  <p className="text-[16px] text-white font-normal">Address</p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "none", // Remove the border
                    borderRadius: "5px",
                    color: "#919191", // Text color inside the input
                    backgroundColor: "#2F2F31", // Background color
                    outline: "none", // Remove the outline
                  }}
                  className="text-[16px] leading-5 placeholder-white"
                  placeholder="Your Address"
                  placeholderStyle={{
                    color: "white",
                  }}
                />
              </Form.Item> */}

              <Form.Item
                style={{
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FCFCFC",
                    backgroundColor: "#b4007e",
                  }}
                  className="font-normal text-[16px] leading-6  rounded-full"
                >
                  {isLoading ? <Spin /> : "Save & Changes"}
                </Button>
              </Form.Item>
            </Form>
          </div>
        ) : (
          <div className="max-w-[481px] mx-auto rounded-lg p-6 bg-[#252525] text-white">
            <h1 className="text-center text-[var(--primary-color)] leading-7 text-2xl font-medium mb-7">
              Change Your Password
            </h1>
            <Form layout="vertical" onFinish={onFinish} form={form}>
              <Form.Item
                name="oldPassword"
                label={
                  <p className="text-[16px] text-white font-normal">
                    Current Password
                  </p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "none", // Remove the border
                    borderRadius: "5px",
                    color: "#919191", // Text color inside the input
                    backgroundColor: "#2F2F31", // Background color
                    outline: "none", // Remove the outline
                  }}
                  className="text-[16px] leading-5 placeholder-white"
                  // placeholder="Your Name"
                  placeholderStyle={{
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label={
                  <p className="text-[16px] text-white font-normal">
                    New Password
                  </p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "none", // Remove the border
                    borderRadius: "5px",
                    color: "#919191", // Text color inside the input
                    backgroundColor: "#2F2F31", // Background color
                    outline: "none", // Remove the outline
                  }}
                  className="text-[16px] leading-5 placeholder-white"
                  // placeholder="Your Name"
                  placeholderStyle={{
                    color: "white",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="confirmNewPassword"
                label={
                  <p className="text-[16px] text-white font-normal">
                    Retype New Password
                  </p>
                }
              >
                <Input
                  style={{
                    width: "100%",
                    height: 40,
                    border: "none", // Remove the border
                    borderRadius: "5px",
                    color: "#919191", // Text color inside the input
                    backgroundColor: "#2F2F31", // Background color
                    outline: "none", // Remove the outline
                  }}
                  className="text-[16px] leading-5 placeholder-white"
                  // placeholder="Your Name"
                  placeholderStyle={{
                    color: "white",
                  }}
                />
              </Form.Item>
              {passError && (
                <p className="text-yellow -mt-4 my-5 ">{passError}</p>
              )}
              <Form.Item
                style={{
                  marginBottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{
                    width: 197,
                    height: 48,
                    color: "#FFFFFF",
                    backgroundColor: "#b4007e",
                  }}
                  className="font-normal text-[16px] leading-6 bg-yellow rounded-full"
                >
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
