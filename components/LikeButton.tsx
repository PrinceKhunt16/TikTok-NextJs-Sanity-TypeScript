import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { NextPage } from "next";
import useAuthStore from "../store/authStore";

interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({ likes, handleLike, handleDislike }) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();

  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div >
        {alreadyLiked ? (
          <button onClick={handleDislike} className="flex items-center justify-center w-[46px] h-[46px] bg-[#f9f9f9] border border-[#f4f4f4] rounded-full">
            <AiFillHeart className="text-gray-900 text-[25px]" />
          </button>
        ) : (
          <button onClick={handleLike} className="flex items-center justify-center w-[46px] h-[46px] bg-[#f9f9f9] border border-[#f4f4f4] rounded-full">
            <AiOutlineHeart className="text-gray-900 text-[25px]" />
          </button>
        )}
    </div>
  );
};

export default LikeButton;
