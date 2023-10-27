import SliderComponents from "@/components/SliderComponents";

const Home = () => {
  return (
    <div className="bg-slate-950 h-screen">
      <div className="bg-slate-950 h-1/3">
        <SliderComponents />
      </div>
      <div className="bg-slate-950 h-2/3">
        <iframe
          src="https://dashboard.langsakota.go.id"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
