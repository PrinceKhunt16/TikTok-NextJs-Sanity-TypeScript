import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const { user, userVideos, userLikedVideos } = data;
  const videos = showUserVideos ? "" : "text-gray-500 font-normal font-notoSans";
  const liked = !showUserVideos ? "" : "text-gray-500 font-normal font-notoSans";

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  return (
    <div className="mt-[50px]">
      <div className="flex flex-col items-center justify-center gap-[12px] mb-4 bg-white w-full">
        <div className="w-[70px] h-[70px] md:w-[80px] md:h-[80px]">
          <Image
            width={60}
            height={60}
            layout="responsive"
            className="rounded-full object-cover"
            src={user.image}
            alt="user-profile"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[18px] font-bold font-Caveat"> {user.userName}</p>
        </div>
      </div>
      <div>
        <div className="flex sticky z-10 pb-2 top-0 gap-5 mb-4 mt-[40px] border-b border-gray-200 bg-white w-[95%] mx-auto md:w-[450px] lg:w-[585px]">
          <p
            className={`text-[17px] font-normal font-notoSans cursor-pointer ${videos} mt-2`}
            onClick={() => setShowUserVideos(true)}
          >
            Videos
          </p>
          <p
            className={`text-[17px] font-normal font-notoSans cursor-pointer ${liked} mt-2`}
            onClick={() => setShowUserVideos(false)}
          >
            Liked
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults
              text={`No ${showUserVideos ? "" : "Liked"} Videos Yet`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async ({
  params: { userId },
}: {
  params: { userId: string };
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile/${userId}`
  );

  return {
    props: { data: res.data },
  };
};