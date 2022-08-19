import axios from "axios";
import type { NextPage } from "next";
import NoResults from "../components/NoResults";
import VideoCard from "../components/VideoCard";
import { Video } from "../types";

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  console.log(videos);

  return (
    <div className="flex flex-col items-center videos w-full">
      {videos.length ? (
        videos?.map((video: Video) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={`No Videos`} />
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({
  query: { topic },
}: {
  query: { topic: string };
}) => {
  let response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);

  if (topic) {
    response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`);
  }

  return {
    props: { videos: response.data },
  };
};
