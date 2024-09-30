import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import black from "../../assets/black.png";
import toast from "react-hot-toast";
import { createcourse } from "../../Redux/Slices/CourseSlice.js";

function CreateCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
  });

  function handleImageUpload(e) {
    const uploadImage = e.target.files[0];
    if (uploadImage) {
      setUserInput({
        ...userInput,
        thumbnail: uploadImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  function handleUserInput(e) {
    const { name, value } = e.target;
    setUserInput({
      ...userInput,
      [name]: value,
    });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (
      !userInput.title ||
      !userInput.description ||
      !userInput.category ||
      !userInput.createdBy
    ) {
      toast.error("Please fill every field");
      return;
    }

    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("category", userInput.category);
    formData.append("createdBy", userInput.createdBy);
    formData.append("thumbnail", userInput.thumbnail);

    const res = await dispatch(createcourse(formData));
    if (res?.payload?.success) navigate("/Courses");

    setUserInput({
      title: "",
      description: "",
      thumbnail: "",
      createdBy: "",
      category: "",
    });
    setPreviewImage("");
  }

  return (
    <div className="flex justify-center items-center h-[90vh] bg-black">
      <form
        className="max-w-[1000px] w-full bg-[#1C1C1C] text-white p-8 shadow-2xl rounded-lg space-y-8"
        onSubmit={handleFormSubmit}
      >
        {/* Header Section */}
        <div className="flex items-center mb-6 space-x-3">
          <div className="mr-2 cursor-pointer">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 6L8 12L14 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold">Create New Course</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Section: Image Upload */}
          <div className="space-y-6">
            <div className="relative max-w-[600px] p-4 rounded-lg bg-[#2C2C2C]">
              <label htmlFor="image_uploads" className="cursor-pointer">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" className="rounded-lg" />
                ) : (
                  <img src={black} alt="Default" className="rounded-lg" />
                )}
              </label>
              <input
                className="hidden"
                type="file"
                id="image_uploads"
                accept=".jpg,.png,.svg,.jpeg"
                onChange={handleImageUpload}
                name="thumbnail"
              />
            </div>

            {/* Course Title */}
            <div>
              <label htmlFor="title" className="block mb-2 text-lg font-semibold">Course Title</label>
              <input
                className="w-full bg-[#1C1C1C] text-white border border-gray-600 rounded-lg p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course title"
                onChange={handleUserInput}
                name="title"
                value={userInput.title}
              />
            </div>
          </div>

          {/* Right Section: Input Fields */}
          <div className="space-y-6">
            {/* Instructor Name */}
            <div>
              <label htmlFor="createdBy" className="block mb-2 text-lg font-semibold">Course Instructor</label>
              <input
                className="w-full bg-[#1C1C1C] text-white border border-gray-600 rounded-lg p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter instructor name"
                onChange={handleUserInput}
                name="createdBy"
                value={userInput.createdBy}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block mb-2 text-lg font-semibold">Category</label>
              <input
                className="w-full bg-[#1C1C1C] text-white border border-gray-600 rounded-lg p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category"
                onChange={handleUserInput}
                name="category"
                value={userInput.category}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block mb-2 text-lg font-semibold">Description</label>
              <textarea
                className="w-full bg-[#1C1C1C] text-white border border-gray-600 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter course description"
                rows="4"
                onChange={handleUserInput}
                name="description"
                value={userInput.description}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Centered Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#313131] px-8 py-3 text-lg rounded-lg hover:bg-[#242323] transition ease-in-out duration-200"
          >
            Create Course
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateCourses;
