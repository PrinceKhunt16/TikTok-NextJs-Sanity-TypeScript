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
    "border border-gray-400 h-[50px] w-[50px] px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-600";
  const topicStyle =
    "border border-gray-300 h-[50px] w-[50px] px-3 py-2 rounded rounded-full flex items-center gap-2 justify-center cursor-pointer text-gray-400";

  return (
    <div className="border-b border-gray-100 pb-4 mt-4">
      <p className="text-gray-500 font-normal font-notoSans mb-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex justify-center xl:justify-start gap-3 flex-wrap h-[298px] xl:h-[236px] overflow-y-scroll">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-xl xl:text-md flex items-center justify-center">
                <Image
                  src={item.icon}
                  height={25}
                  width={25}
                  className="flex items-center justify-center"
                />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
