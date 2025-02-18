import { Modal } from "antd";
import { RiVerifiedBadgeFill } from "react-icons/ri";

const UserDetailsModel = ({ setOpenAddModal, openAddModal, userDetails }) => {
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
        <div className="p-4 max-w-md mx-auto bg-[#323232] rounded-lg ">
          {/* Profile Section */}
          <div className="w-16 h-16 mx-auto rounded-full">
            <img
              className="rounded-full w-16 h-16"
              src={userDetails?.img}
              alt="User Profile"
            />
            {userDetails?.isPremium && (
              <RiVerifiedBadgeFill
                className="absolute top-20 right-56"
                fontSize={20}
                color="#138DF0"
              />
            )}
          </div>
          <div className="flex items-center flex-col text-center">
            <h1 className="my-3 text-xl font-bold text-white">
              {userDetails?.name}
            </h1>
            <div className="text-sm text-gray-400">
              <p className="my-2">
                <span className="font-semibold text-gray-200">Main Skill:</span>{" "}
                <span className="bg-button-primary px-2  rounded-full">
                  {" "}
                  {userDetails?.mainSkill?.name}
                </span>
              </p>
              <p className="my-2">
                <span className="font-semibold text-gray-200">
                  Additional Skill:
                </span>{" "}
                {userDetails?.additionalSkills?.map((skill, i) => (
                  <span key={i}>
                    <span className="bg-button-primary text-white px-2 py-1 rounded-full text-xs">
                      {skill?.name}
                    </span>
                  </span>
                ))}
              </p>
              <p>
                {/* TODO: need to show real location */}
                <span className="font-semibold text-gray-200">
                  Lives in:
                </span>{" "}
                Montreal, Quebec
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-300 leading-relaxed">
              {userDetails?.bio || "Bio Not Available"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserDetailsModel;
