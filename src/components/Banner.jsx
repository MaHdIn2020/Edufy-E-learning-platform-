const Banner = () => {
  return (
    <div
      className=" text-white flex justify-center items-center flex-col bg-cover bg-no-repeat rounded-3xl md:w-full h-full md:h-[40rem] mb-10 p-10 lg:p-0"
      style={{
        backgroundImage: "url(https://i.ibb.co.com/m9BPPGq/banner.jpg)",
      }}
    >
      {/* banner image */}
      <div>
        <img src="./images/banner-main.png" alt="" />
      </div>
      {/* banner text */}
      <div className="space-y-6 mt-10 text-center">
        <h1 className="text-4xl font-bold">
          Assemble Your Ultimate Dream 11 Cricket Team
        </h1>
        <h6 className="text-2xl text-[rgba(255,255,255,0.7)]">
          Beyond Boundaries Beyond Limits
        </h6>
        <button className="bg-[#E7FE29] btn">Claim Free Credit</button>
      </div>
    </div>
  );
};

export default Banner;
