import React, { useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosPlay } from "react-icons/io";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Video } from "../types";

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes },
}) => {
  const [playing, setPlaying] = useState(false);
  const [like, setLike] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dropdown, setDropdown] = useState(false);

  console.log(likes);

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
    <div className="flex items-start mt-4 pb-4 border-b border-gray-100 flex-col w-[95%] md:w-[450px] lg:w-[585px] ">
      <div>
        <div className="flex gap-2 cursor-pointer font-semibold rounded ">
          <div className="w-[50px] h-[50px] border border-gray-100 rounded-full">
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
                <p className="flex gap-2 font-notoSans items-center md:text-[15px] font-normal text-primary">
                  {postedBy.userName}{" "}
                </p>
              </div>
            </Link>
            <div className="flex gap-1 overflow-hidden">
              <p className="font-notoSans font-normal text-[15px]">{caption}</p>
            </div>
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
            className="h-[100%] w-[100%] max-h-[420px] md:max-h-[480px] lg:max-h-[550px] cursor-pointer bg-[#f9f9f9]"
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
      <div className="mt-2 w-full flex relative justify-between">
        <h6 className="text-center font-notoSans text-[15px] text-gray-900">
          20 Likes
        </h6>
        <div onClick={() => setDropdown(!dropdown)} className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer">
          {dropdown ? (
            <BsChevronUp className="text-gray-900 text-[20px]" />
            ) : (
            <BsChevronDown className="text-gray-900 text-[20px]" />
          )}
        </div>
        <h6 className="font-notoSans text-[15px] text-gray-900">
          3 Comments
        </h6>
      </div>
      <div>
        {dropdown &&
          <div className="h-[120px] overflow-y-scroll">
            <div className="mt-2 mb-2">
              <div className="flex items-start gap-3">
                <Link href={`/profile/${postedBy?._id}`}>
                  <div className="w-12 h-12">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full cursor-pointer object-cover"
                      src={postedBy?.image}
                      alt="user-profile"
                      layout="responsive"
                    />
                  </div>
                </Link>
                <div>
                  <p className="flex font-notoSans gap-1 items-center text-[12px] font-bold leading-6 text-primary">
                    Rajan Khunt
                  </p>
                  <p className="flex font-notoSans gap-1 items-center text-[15px] font-normal leading-6 text-primary">
                    Wow what a web!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <div className="flex items-start gap-3">
                <Link href={`/profile/${postedBy?._id}`}>
                  <div className="w-12 h-12">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full cursor-pointer object-cover"
                      src={postedBy?.image}
                      alt="user-profile"
                      layout="responsive"
                    />
                  </div>
                </Link>
                <div>
                  <p className="flex font-notoSans gap-1 items-center text-[12px] font-bold leading-6 text-primary">
                    Rajan Khunt
                  </p>
                  <p className="flex font-notoSans gap-1 items-center text-[15px] font-normal leading-6 text-primary">
                    Wow what a web!
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 mb-2">
              <div className="flex items-start gap-3">
                <Link href={`/profile/${postedBy?._id}`}>
                  <div className="w-12 h-12">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-full cursor-pointer object-cover"
                      src={postedBy?.image}
                      alt="user-profile"
                      layout="responsive"
                    />
                  </div>
                </Link>
                <div>
                  <p className="flex font-notoSans gap-1 items-center text-[12px] font-bold leading-6 text-primary">
                    Rajan Khunt
                  </p>
                  <p className="flex font-notoSans gap-1 items-center text-[15px] font-normal leading-6 text-primary">
                    Wow what a web!
                  </p>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <div className="mt-2 flex gap-2 w-[100%]">
        <div>
          <button onClick={() => setLike(!like)} className="flex items-center justify-center w-[46px] h-[46px] bg-[#f9f9f9] border border-[#f4f4f4] rounded-full">
            {like ? (
              <AiFillHeart className="text-gray-900 text-[25px]" />
            ) : (
              <AiOutlineHeart className="text-gray-900 text-[25px]" />
            )}
          </button>
        </div>
        <div className="flex justify-between w-full gap-2">
          <form
            className="w-full relative"
          >
            <input
              className="bg-[#f9f9f9] text-[15px] w-full p-3 pb-[14px] h-[46px] md:text-md font-notoSans text-gray-900 font-normal border border-[#f4f4f4] focus:outline-none rounded-full md:top-0"
              placeholder="Review"
            />
            <AiOutlineComment className="absolute top-[10px] right-[14px] text-gray-900 text-[25px]" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
