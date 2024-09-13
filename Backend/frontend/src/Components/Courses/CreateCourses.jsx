import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import black from "../../assets/black.png";
import toast from "react-hot-toast";
import { createcourse } from "../../Redux/Slices/CourseSlice.js";
function CreateCourses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewimage, setpreviewimage] = useState("");
  const [userinput, setuserinput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
  });

  function handleImageupload(e) {
    const uploadImage = e.target.files[0];

    if (uploadImage) {
      setuserinput({
        ...userinput,
        thumbnail: uploadImage,
      });

      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadImage);
      fileReader.addEventListener("load", function () {
        setpreviewimage(this.result);
      });
    }
  }
 
  function handleuserInput(e) {
    const { name, value } = e.target;
    setuserinput({
      ...userinput,
      [name]: value,
    });
  }

  async function handleformSubmit(e) {
    e.preventDefault();

    if (
      !userinput.title ||
      !userinput.description ||
      !userinput.category ||
      !userinput.createdBy
    ) {
      toast.error("Please fill every field");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", userinput.title);
    formData.append("description", userinput.description);
    formData.append("category", userinput.category);
    formData.append("createdBy", userinput.createdBy);
    formData.append("thumbnail", userinput.thumbnail);

    const res = await dispatch(createcourse(formData));

    if (res?.payload?.success) navigate("/Courses");

    setuserinput({
      title: "",
      description: "",
      thumbnail: "",
      createdBy: "",
      category: "",
    });
    setpreviewimage("");
  }

  return (
    <div className="flex justify-center items-center h-[90vh] bg-black">
      <form
        className=" max-w-[1000px] text-white p-8 shadow-[#44433B] shadow-2xl"
        onSubmit={handleformSubmit}
      >
        <div className="flex mb-4">
          <div className="mr-2 flex justify-start cursor-pointer">
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
          <div className="font-semibold text-3xl flex justify-center items-center">
            Create New Courses
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col mr-4">
            <div className="mb-4 max-w-[600px]">
              <label htmlFor="image_uploads" className="cursor-pointer">
                {previewimage ? (
                  <img className="" src={previewimage} alt="Preview" />
                ) : (
                  <img src={black} alt="Default" />
                )}
              </label>
              <input
                className="hidden"
                type="file"
                id="image_uploads"
                accept=".jpg,.png,.svg,.jpeg"
                onChange={handleImageupload}
                name="thumbnail"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-2">Course Title</h1>
              <input
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Title"
                onChange={handleuserInput}
                name="title"
                value={userinput.title}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <h1 className="mb-2">Course Instructor</h1>
              <input
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Instructor"
                onChange={handleuserInput}
                name="createdBy"
                value={userinput.createdBy}
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-2">Category</h1>
              <input
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
                onChange={handleuserInput}
                name="category"
                value={userinput.category}
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-2">Description</h1>
              <textarea
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
                rows="5"
                onChange={handleuserInput}
                name="description"
                value={userinput.description}
              ></textarea>
            </div>

            <div className="flex justify-center transition-none">
            <button
  onClick={handleformSubmit}
  className="bg-[#313131] p-2 transition-none transform-none hover:scale-100 focus:scale-100 active:scale-100 hover:bg-[#242323]"
>
  Create
</button>

            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCourses;


























