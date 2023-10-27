"use client";
// "use server";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface DataItem {
  id: number;
  type: string;
  videoId: string;
  image: string | null;
  status: string;
  urutan: number;
  createdAt: string;
  updatedAt: string;
}

const SliderComponents = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [videoPlayer, setVideoPlayer] = useState("kdklv9Vvjpg");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    axios.get("https://langsacarong.langsakota.go.id/api/ds").then((res) => {
      const responseData: DataItem[] = res.data.data;
      setData(responseData);
      const filteredData = responseData.filter((item) => item.type === "video");
      const minUrutan = Math.min(...filteredData.map((item) => item.urutan));
      const result = filteredData.filter((item) => item.urutan === minUrutan);
      setVideoPlayer(result[counter].videoId);
    });
  }, []);

  const refreshDataAndVideo = () => {
    axios.get("https://langsacarong.langsakota.go.id/api/ds").then((res) => {
      const responseData: DataItem[] = res.data.data;
      setData(responseData);
      console.log(responseData);
    });
  }


  return (
    <ReactPlayer
      url={`https://www.youtube.com/embed/${videoPlayer}?autoplay=1&controls=0`}
      controls={true}
      width={"100%"}
      height={"100%"}
      playing={true}
      onEnded={() => {
        // console.log("ended video");
        if (counter === data.length - 1) {
          setVideoPlayer(data[0].videoId);
          setCounter(0);
          return;
        }
        refreshDataAndVideo();
        setVideoPlayer(data[counter + 1].videoId);
        setCounter(counter + 1);
      }}
    />
  );
};

export default SliderComponents;
