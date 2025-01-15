import { Modal } from "antd";

const UserDetailsModel = ({ setOpenAddModal, openAddModal, userDetails }) => {
  console.log(userDetails);
  return (
    <Modal
      open={openAddModal}
      centered
      footer={false}
      onCancel={() => {
        setOpenAddModal(false);
      }}
      className="custom-modal"
    >
      <div className="bg-[#323232] font-poppins">
        {/* <div className="w-16 h-16 mx-auto rounded-full">
          <img
            className="rounded-full"
            src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
            alt=""
          />
        </div>
        <div className="flex items-center flex-col">
          <h1 className="my-3 text-xl">Mehu Khondokar 22</h1>

        </div> */}
        <div className="p-4 max-w-md mx-auto bg-[#323232] rounded-lg shadow-lg">
          {/* Profile Section */}
          <div className="w-16 h-16 mx-auto rounded-full">
            <img
              className="rounded-full"
              src="https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8"
              alt="User Profile"
            />
          </div>
          <div className="flex items-center flex-col text-center">
            <h1 className="my-3 text-xl font-bold text-white">
              Mehu Khondokar 22
            </h1>
            <div className="text-sm text-gray-400">
              <p className="my-2">
                <span className="font-semibold text-gray-200">Main Skill:</span>{" "}
                <span className="bg-button-primary px-2  rounded-full">
                  {" "}
                  Singer
                </span>
              </p>
              <p className="my-2">
                <span className="font-semibold text-gray-200">
                  Additional Skill:
                </span>{" "}
                <span className="bg-button-primary text-white px-2 py-1 rounded-full text-xs">
                  Cover Art
                </span>{" "}
                <span className="bg-button-primary text-white px-2 py-1 rounded-full text-xs">
                  Music
                </span>{" "}
                <span className="bg-button-primary text-white px-2 py-1 rounded-full text-xs">
                  Video
                </span>
              </p>
              <p>
                <span className="font-semibold text-gray-200">Lives in:</span>{" "}
                Montreal, Quebec
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300 leading-relaxed">
              Hi, I’m Khushi, a vocalist with 5 years of experience specializing
              in pop and soul music. I’m passionate about creating melodies that
              inspire.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModel;
