import { useNavigate } from "react-router-dom";

function Denied() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one step in the browser history
  };

  return (
    <div className="h-[100vh] text-white flex flex-col justify-center items-center text-2xl bg-black space-y-6">
      <div className="text-6xl font-bold">404</div>
      <div className="text-2xl">Not Found</div>
      <div>
        <button
          onClick={handleGoBack}
          className="flex items-center text-white p-3 rounded border-2 border-gray-500 hover:bg-gray-500 transition duration-300"
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Denied;
