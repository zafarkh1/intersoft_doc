import MyAccordion from "../component/Home/MyAccordion";
import Search from "../component/Home/Search";

const Home = () => {
  return (
    <section className="lg:my-56 my-40 w-full flex flex-col items-center">
      <Search />
      <MyAccordion />
    </section>
  );
};

export default Home;
