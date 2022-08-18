import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
}) => {
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
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

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

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
          <Link href={`/detail/${_id}`}>
            <video
              loop
              ref={videoRef}
              src={video.asset.url}
              className="h-[100%] w-[100%] max-h-[420px] md:max-h-[480px] lg:max-h-[550px] cursor-pointer bg-[#f9f9f9]"
            ></video>
          </Link>
          {isHover && (
            <div className="absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3">
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={onVideoPress}>
                  <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
              {isVideoMuted ? (
                <button onClick={() => setIsVideoMuted(false)}>
                  <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                </button>
              ) : (
                <button onClick={() => setIsVideoMuted(true)}>
                  <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
