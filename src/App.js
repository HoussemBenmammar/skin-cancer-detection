import "./App.css";
import ImageUploader from "./Components/ImageUploader";

function App() {
  return (
    <div className="flex justify-center py-5">
      <div className="flex flex-col gap-4 w-[70%]">
        <h3 className="flex justify-center text-primary font-bold font-popins">
          Please Upload your skin image here
        </h3>

        <ImageUploader />
        <div className="flex justify-center">
          <button className="w-[200px] h-10 text-white enabled:bg-primary rounded-md text-base font-semibold cursor-pointer transition duration-200 ease-in-out outline-none hover:opacity-90 disabled:bg-primarygray disabled:cursor-not-allowed disabled:opacity-20 hover:underline">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
