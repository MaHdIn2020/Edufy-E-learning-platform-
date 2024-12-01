/* eslint-disable react/prop-types */

const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center my-8 w-11/12 md:w-7/12  mx-auto space-y-3">
      <h1 className="text-3xl font-bold ">{title}</h1>
      <p className="text-black ">{subtitle}</p>
    </div>
  );
};

export default Heading;
