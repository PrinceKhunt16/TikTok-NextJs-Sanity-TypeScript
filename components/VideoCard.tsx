import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IoIosPlay } from "react-icons/io";
import { AiOutlineComment } from 'react-icons/ai';
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { IUser, Video } from "../types";
import LikeButton from "./LikeButton";
import useAuthStore from "../store/authStore";
import axios from "axios";
import { BASE_URL } from "../utils";

interface IProps {
  post: Video;
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const VideoCard: NextPage<IProps> = ({
  post: { caption, postedBy, video, _id, likes, comments },
}) => {
  const [playing, setPlaying] = useState(false);
  const [like, setLike] = useState(likes?.length);
  const [commentLength, setCommentLength] = useState(comments?.length);
  const [post, setPost] = useState({ caption, postedBy, video, _id, likes, comments });
  const [allComments, setAllComments] = useState(comments);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dropdown, setDropdown] = useState(false);
  const [comment, setComment] = useState<string>('');
  const { allUsers, userProfile }: any = useAuthStore();

  const onVideoPress = () => {
    if (playing) {
      videoRef?.current?.pause();
      setPlaying(false);
    } else {
      videoRef?.current?.play();
      setPlaying(true);
    }
  };

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: _id,
        like
      });
      setPost({ ...post, likes: res.data.likes });
      setLike(res.data.likes?.length || 0);
    }
  };

  const refreshComments = async () => {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`);
    setAllComments(data.comments);
    console.log(data.comments);
  }

  const addComment = async (e) => {
    e.preventDefault();

    if (userProfile && comment) {
      const { data } = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      });

      setPost({ ...post, comments: data.comments });
      setComment('');
      setCommentLength(data.comments?.length || 0);
      refreshComments();
    }
  }

  return (
    <div className="flex items-start mt-4 pb-3 border-b border-gray-100 flex-col w-[95%] md:w-[450px] lg:w-[585px]">
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
                <p className="flex gap-2 items-center md:text-[15px] font-normal text-primary">
                  {postedBy.userName}{" "}
                </p>
              </div>
            </Link>
            <div className="flex gap-1 overflow-hidden">
              <p className="font-normal text-[15px]">{caption}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center relative mt-4 w-[100%]">
        <div
          className="w-[100%]"
        >
          <video
            loop
            onClick={onVideoPress}
            ref={videoRef}
            src={video.asset.url}
            className="h-[100%] w-[100%] max-h-[420px] md:max-h-[480px] lg:max-h-[550px] cursor-pointer bg-[#f9f9f9]"
          ></video>
          <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer">
            {!playing && (
              <button onClick={onVideoPress} className="p-2">
                <IoIosPlay className="text-gray-900 text-[32px]" />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-2 w-[100%]">
        <div>
          <LikeButton
            likes={post.likes}
            handleLike={() => handleLike(true)}
            handleDislike={() => handleLike(false)}
          />
        </div>
        <div className="flex justify-between w-full gap-2">
          <form
            className="w-full relative"
            onSubmit={addComment}
          >
            <input
              className="bg-[#f9f9f9] text-[15px] w-full p-3 pb-[14px] h-[46px] md:text-md text-gray-900 font-normal border border-[#f4f4f4] focus:outline-none rounded-full md:top-0"
              placeholder="Add a Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <AiOutlineComment className="absolute top-[10px] right-[14px] text-gray-900 text-[25px]" />
          </form>
        </div>
      </div>
      <div className="mt-2 w-full flex relative justify-between">
        <h6 className="text-center text-[15px] text-gray-900">
          {`${like} Likes`}
        </h6>
        <div onClick={() => setDropdown(!dropdown)} className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] cursor-pointer">
          {dropdown ? (
            <BsChevronUp className="text-gray-900 text-[20px]" />
          ) : (
            <BsChevronDown className="text-gray-900 text-[20px]" />
          )}
        </div>
        <h6 className="text-[15px] text-gray-900">
          {commentLength ? (
            commentLength
          ) : (
            0
          )}
          {" "}
          Comments
        </h6>
      </div>
      <div>
        {dropdown &&
          <div className="max-h-[180px] mt-1 mb-1 overflow-y-scroll">
            {allComments &&
              allComments.map((comment: IComment, idx: number) => (
                <>
                  {allUsers?.map(
                    (user: IUser) =>
                      user._id === (comment.postedBy._ref || comment.postedBy._id) && (
                        <div className="mt-2 mb-2">
                          <div className="flex items-start gap-3">
                            <Link href={`/profile/${postedBy?._id}`}>
                              <div className="w-12 h-12">
                                <Image
                                  width={48}
                                  height={48}
                                  className="rounded-full cursor-pointer object-cover"
                                  src={user.image}
                                  alt="user-profile"
                                  layout="responsive"
                                />
                              </div>
                            </Link>
                            <div>
                              <p className="flex gap-1 items-center text-[12px] font-bold leading-6 text-primary">
                                {user.userName}
                              </p>
                              <p className="flex gap-1 items-center text-[15px] font-normal leading-6 text-primary">
                                {comment.comment}
                              </p>
                            </div>
                          </div>
                        </div>
                      )
                  )}
                </>
              ))
            }
          </div>
        }
      </div>
    </div>
  );
};

export default VideoCard;
