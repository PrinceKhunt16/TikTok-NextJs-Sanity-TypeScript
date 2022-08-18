import React, { useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosPlay } from "react-icons/io";
import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  return (
    <div className="flex items-start mt-4 mb-4 flex-col w-[95%] md:w-[450px] lg:w-[585px] ">
      <div>
        <div className="flex items-center gap-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-[52px] md:h-[52px] w-[50px] h-[50px] border border-gray-100 rounded-full bg-gray-100">
            <Link href={`/profile/${postedBy?._id}`}>
              <Image
                src={postedBy?.image}
                width={64}
                height={64}
                className="rounded-full object-cover"
                alt="user-profile"
                layout="responsive"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-between">
            <Link href={`/profile/${postedBy?._id}`}>
              <div className="flex items-center gap-2">
                <p className="flex gap-2 font-notoSans items-center md:text-[16px] font-normal text-primary">
                  {postedBy.userName}{" "}
                </p>
              </div>
            </Link>
            <Link href={`/detail/${_id}`}>
              <p className="font-notoSans font-normal text-[15px]">{caption}</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative mt-4 w-[100%]">
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="w-[100%]"
        >
          {/* <Link href={`/detail/${_id}`}> */}
          <video
            loop
            onClick={onVideoPress}
            ref={videoRef}
            src={video.asset.url}
            className="h-[100%] w-[100%] max-h-[420px] md:max-h-[480px] lg:max-h-[550px] cursor-pointer bg-[#00000008]"
          ></video>
          {/* </Link> */}
          <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoPress} className="p-2">
                <IoIosPlay className="text-gray-900 text-[32px]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
