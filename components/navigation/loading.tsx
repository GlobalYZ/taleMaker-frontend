import { Image } from "react-native";

const Loading = () => {
  return (
    <div className="fixed w-screen h-screen bg-bg-primary top-0 left-0 z-50">
      <div className="flex items-center justify-center min-h-screen pb-20">
        <Image
          source={require("@/assets/images/loading.png")}
          alt="Loading..."
          width={40}
          height={40}
          className="animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loading;
