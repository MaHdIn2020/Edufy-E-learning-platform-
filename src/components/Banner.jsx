const Banner = () => {
  return (
    <div
      className="text-white flex justify-center items-center flex-col bg-cover bg-no-repeat rounded-3xl md:w-full h-full md:h-[40rem] mb-10 p-10 lg:p-0"
      style={{
        backgroundImage: "url(https://i.ibb.co/m9BPPGq/banner.jpg)",
      }}
    >
      {/* Logo/Image Section */}
      {/* <div>
        <img
          src="https://i.ibb.co/ScNNtRy/edufy-logo.png" // Replace this with your actual logo/image path
          alt="Edufy Logo"
          className="w-36 md:w-48"
        />
      </div> */}

      {/* Text Section */}
      <div className="space-y-6 mt-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Learn Smarter, Achieve More
        </h1>
        <h6 className="text-lg md:text-2xl text-[rgba(255,255,255,0.7)]">
          Join Edufy to explore your passion for knowledge with curated courses,
          top-notch instructors, and a vibrant learning community.
        </h6>
        <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white text-lg font-semibold shadow-md">
          Explore Courses Below
        </button>
      </div>
    </div>
  );
};

export default Banner;
