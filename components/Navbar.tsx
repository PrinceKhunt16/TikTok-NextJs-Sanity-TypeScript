import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import TikTok from "../public/TikTok.png";

const Navbar = () => {
  const { userProfile, removeUser, addUser } = useAuthStore();

  return (
    <div className="w-full flex justify-between items-center border-b border-gray-200 box-border px-3">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[65px] h-[65px] flex items-center">
          <h1 className="font-light cursor-pointer font-notoSans text-4xl pb-1">
            TikTok
          </h1>
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{" "}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href={`/profile/${userProfile._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className=" border-2 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => {
              createOrGetUser(response, addUser);
            }}
            onError={() => {
              console.log("Error");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
