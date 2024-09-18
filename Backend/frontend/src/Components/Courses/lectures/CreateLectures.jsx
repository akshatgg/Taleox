import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createlecture } from '../../../Redux/Slices/LectureSlice.js';
import black from '../../../assets/black.png';
import toast from 'react-hot-toast';

function CreateLectures() {
    const { id: courseId } = useParams(); // Extract courseId from URL params
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
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
            fileReader.addEventListener('load', function () {
                setPreviewImage(this.result);
            });

            fileReader.readAsDataURL(uploadImage);
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

        if (!userInput.title || !userInput.description) {
            toast.error('Please fill all the details');
            return;
        }

        if (!courseId) {
            toast.error('Course ID is missing');
            return;
        }

        const formData = new FormData();
        formData.append('title', userInput.title);
        formData.append('description', userInput.description);
        if (userInput.thumbnail) {
            formData.append('thumbnail', userInput.thumbnail);
        }

        try {
            const actionResult = await dispatch(createlecture({ id: courseId,data: formData }));

            if (createlecture.fulfilled.match(actionResult)) {
                navigate('/Courses');
                setUserInput({
                    title: '',
                    description: '',
                    thumbnail: null,
                });
                setPreviewImage('');
            } else {
                // Handle failure case if needed
                toast.error('Failed to create lecture');
            }
        } catch (error) {
            toast.error('Failed to create lecture');
            console.error('Submission error:', error);
        }
    }

    return (
        <div className="flex justify-center items-center h-[90vh] bg-black">
            <form
                className="max-w-[1000px] text-white p-8 shadow-[#44433B] shadow-2xl"
                onSubmit={handleFormSubmit}
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
                        ADD New Lecture
                    </div>
                </div>

                <div className="flex">
                    <div className="flex flex-col mr-4">
                        <div className="mb-4 max-w-[600px]">
                            <label htmlFor="image_uploads" className="cursor-pointer">
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" />
                                ) : (
                                    <img src={black} alt="Default" />
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

                        <div className="flex flex-col">
                            <h1 className="mb-2">Course Title</h1>
                            <input
                                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Title"
                                onChange={handleUserInput}
                                name="title"
                                value={userInput.title}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col">
                            <h1 className="mb-2">Description</h1>
                            <textarea
                                className="bg-black text-white border border-gray-600 rounded p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Description"
                                rows="5"
                                onChange={handleUserInput}
                                name="description"
                                value={userInput.description}
                            ></textarea>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-[#313131] p-2 hover:bg-[#242323]"
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

export default CreateLectures;
