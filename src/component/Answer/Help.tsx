const Help = () => {
  return (
    <div className="flex lg:flex-row flex-col lg:items-center lg:justify-between lg:my-40 my-10">
      <h5 className="heading5 font-semibold">Нужна дополнительная помощь?</h5>
      <button
        className="lg:px-8 px-6 lg:py-[15px] py-2 lg:text-lg font-semibold rounded-md text-white"
        style={{
          background: "linear-gradient(90deg, #092880 0%, #03051B 100%)",
        }}
      >
        Связаться с нами
      </button>
    </div>
  );
};

export default Help;
