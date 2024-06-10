import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import black from "../../assets/black.png";
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

  function handleformSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="flex justify-center items-center h-[90vh] bg-black">
      <form className="border border-white max-w-[700px] text-white p-4">
        <div className="flex items-center mb-4">
          <div className="mr-2">
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
          <div className="font-semibold text-3xl">Create New Courses</div>
        </div>

        <div className="flex">
          <div className="flex flex-col mr-4">
            <div className="mb-4">
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
              />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col">
              <h1 className="mb-2">Course Instructor</h1>
              <input
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Instructor"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-2">Category</h1>
              <input
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Category"
              />
            </div>

            <div className="flex flex-col">
              <h1 className="mb-2">Description</h1>
              <input
                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description"
              />
              
            </div>

          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCourses;
