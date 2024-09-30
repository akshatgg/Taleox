import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createlecture } from '../../../Redux/Slices/LectureSlice.js';
import black from '../../../assets/black.png';
import toast from 'react-hot-toast';

function CreateLectures() {
    const { id: courseId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('');
    const [previewVideo, setPreviewVideo] = useState('');

    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
        thumbnail: null,
        video: null,
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

    function handleVideoUpload(e) {
        const uploadVideo = e.target.files[0];
        if (uploadVideo) {
            setUserInput({
                ...userInput,
                video: uploadVideo,
            });

            const fileReader = new FileReader();
            fileReader.addEventListener('load', function () {
                setPreviewVideo(this.result);
            });

            fileReader.readAsDataURL(uploadVideo);
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
        if (userInput.video) {
            formData.append('video', userInput.video);
        }

        try {
            const actionResult = await dispatch(createlecture({ id: courseId, data: formData }));

            if (createlecture.fulfilled.match(actionResult)) {
                navigate('/Courses');
                setUserInput({
                    title: '',
                    description: '',
                    thumbnail: null,
                    video: null,
                });
                setPreviewImage('');
                setPreviewVideo('');
            } else {
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
                className="max-w-[1000px] text-white p-8 shadow-[#44433B] shadow-2xl rounded-lg space-y-6"
                onSubmit={handleFormSubmit}
            >
                <div className="flex items-center mb-6">
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
                    <h1 className="text-3xl font-semibold">Add New Lecture</h1>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                        {/* Image Upload Section */}
                        <div className="relative w-full h-auto max-w-[600px]  rounded-lg p-4">
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

                        {/* Video Upload Section */}
                        <div className="relative w-full h-auto max-w-[600px] border border-gray-600 rounded-lg p-4">
                            <label htmlFor="video_uploads" className="cursor-pointer">
                                {previewVideo ? (
                                    <video width="100%" controls className="rounded-lg">
                                        <source src={previewVideo} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <div className="text-white text-center">Upload a video</div>
                                )}
                            </label>
                            <input
                                className="hidden"
                                type="file"
                                id="video_uploads"
                                accept="video/mp4,video/mkv"
                                onChange={handleVideoUpload}
                                name="video"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Course Title Section */}
                        <div>
                            <label htmlFor="title" className="text-lg mb-2 block">Course Title</label>
                            <input
                                className="w-full bg-black text-white border border-gray-600 rounded-lg p-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter course title"
                                onChange={handleUserInput}
                                name="title"
                                value={userInput.title}
                            />
                        </div>

                        {/* Description Section */}
                        <div>
                            <label htmlFor="description" className="text-lg mb-2 block">Description</label>
                            <textarea
                                className="w-full bg-black text-white border border-gray-600 rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter course description"
                                rows="8"
                                onChange={handleUserInput}
                                name="description"
                                value={userInput.description}
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-[#313131] text-white px-6 py-3 rounded-lg hover:bg-[#242323] transition duration-200"
                            >
                                Create Lecture
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateLectures;
