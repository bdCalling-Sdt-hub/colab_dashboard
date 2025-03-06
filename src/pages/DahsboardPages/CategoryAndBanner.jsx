import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import AddCategory from "../../components/ui/AddCategory";
import AddBanner from "../../components/ui/AddBanner";
import CategoryModal from "../../components/ui/CategoryModal";
import { useGetAllCategoryQuery } from "../../redux/api/categoryApi";

const Category = () => {
  const { data: categories, isLoading } = useGetAllCategoryQuery();
  const [category, setCategory] = useState(true);
  const [openAddModal, setOpenAddModal] = useState(false);
  // const [openCategoryModal, setOpenCategoryModal] = useState(false)

  const handleCategoryModal = () => {
    setCategory(true);
  };

  return (
    <div className="bg-[#323232] p-5 rounded-md text-white">
      <div>
        <div className="flex items-center gap-2 mb-3 p-5">
          <p className="flex items-center gap-1 ">
            {" "}
            <Link to={-1}>
              <GoArrowLeft className="text-white" size={22} />
            </Link>
            Category
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* <Input className='max-w-[250px] h-10' prefix={<CiSearch className='text-2xl' />} placeholder="Search" /> */}
        <div className="flex items-center gap-5 px-5">
          <button
            onClick={() => handleCategoryModal()}
            className={` ${
              category
                ? "bg-button-primary text-white"
                : "border border-yellow text-yellow"
            } px-4 rounded-sm start-center gap-1 py-2  flex justify-center items-center whitespace-nowrap`}
          >
            Categories
          </button>
        </div>

        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-button-primary px-4 rounded-sm start-center gap-1 py-2 text-white flex justify-center items-center whitespace-nowrap"
        >
          <FaPlus />
          Add Category
        </button>
      </div>

      {category ? (
        <AddCategory getAllCategory={categories} isLoading={isLoading} />
      ) : (
        <AddBanner />
      )}
      <CategoryModal
        setOpenAddModal={setOpenAddModal}
        openAddModal={openAddModal}
      />
    </div>
  );
};

export default Category;
