import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";
import Image from "next/image";

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    "border border-gray-400 text-sm h-[35px] px-3 py-2 rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-600";
  const topicStyle =
    "border border-gray-300 text-sm h-[35px] px-3 py-2 rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-400";

  return (
    <div className="border-b border-gray-100 pb-4 mt-4">
      <p className="text-gray-500 font-normal mb-4 hidden md:block">
        Popular Topics
      </p>
      <div className="flex justify-center md:justify-start gap-2 flex-wrap">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
