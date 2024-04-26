// eslint-disable-next-line react/prop-types
function Carouserslide({ title, description, image }) {
  return (
    <div className="text-white">
      <div className="flex justify-center">
        <img
          src={image}
          className="rounded-full max-h-[180px] border-gray-500 border-2"
          alt={title}
          style={{ fontWeight: "semibold" }}
        />
      </div>

      <div className="flex justify-center font-serif text-xl mt-[2%]">
        {description}
      </div>
      <div className="flex justify-center font-semibold text-2xl mt-[3%]">
        {title}
      </div>
    </div>
  );
}

export default Carouserslide;
