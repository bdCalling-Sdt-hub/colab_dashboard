import { Form, Input, Modal, Spin, Upload } from "antd";
import { useState } from "react";
import Button from "./Button";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "../../redux/api/categoryApi";

const CategoryModal = ({ setOpenAddModal, openAddModal }) => {
  // const [isModalOpen, isModalOpen] = useState(false);
  const [createCatrgory, { isLoading }] = useCreateCategoryMutation();

  const [fileList, setFileList] = useState();
  const [form] = Form.useForm();

  // handle upload image
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  /** Add Category function */
  const onFinish = (values) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(values));
    if (!fileList || fileList.length === 0) {
      return toast.error("Please Select an Image!!");
    }

    if (fileList.length > 0) {
      formData.append("category_image", fileList[0].originFileObj);
    }
    createCatrgory(formData)
      .unwrap()
      .then((payload) => {
        toast.success(payload?.message);
        form.resetFields();
        setFileList([]);
        setOpenAddModal(false);
      })
      .catch((error) => toast.error(error?.data?.message));
  };

  return (
    <Modal
      open={openAddModal}
      centered
      footer={false}
      onCancel={() => {
        form.resetFields();
        setFileList([]);
        setOpenAddModal(false);
      }}
      className="custom-modal"
    >
      <h1 className="text-center font-medium mb-5">Add Category</h1>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label={<span className="text-white">Category Name</span>}
          name="name"
        >
          <Input
            style={{
              backgroundColor: "#323232",
              color: "white",
            }}
            placeholder="Enter category name"
          />
        </Form.Item>
        <Form.Item
          label={<span className="text-white">Image</span>}
          style={{ width: "100%" }}
        >
          <div style={{ width: "100%" }}>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              multiple={false}
              beforeUpload={() => false}
              className="upload-full-width"
              maxCount={1}
              required
            >
              <div className="flex items-center justify-center gap-2 text-white">
                <PlusOutlined />
                <div>Add Image</div>
              </div>
            </Upload>
          </div>
        </Form.Item>
        <div className="flex justify-between  gap-3">
          <Form.Item className="w-full">
            <Button className="w-full" disabled={isLoading}>
              {isLoading ? <Spin /> : "Save"}
            </Button>
          </Form.Item>
          <Form.Item className="w-full">
            <button
              className="bg-[#d9000a] text-white w-full p-1 rounded-md"
              onClick={() => {
                form.resetFields();
                setFileList([]);
                setOpenAddModal(false);
              }}
            >
              cancel
            </button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
