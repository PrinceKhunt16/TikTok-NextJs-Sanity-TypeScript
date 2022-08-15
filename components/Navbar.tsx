import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import TikTok from "../public/TikTok.png";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { userProfile, removeUser, addUser } = useAuthStore();
  const router = useRouter();

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
    <div className="w-full flex justify-between items-center border-b border-gray-100 box-border">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[65px] h-[65px] flex items-center">
          <h1 className="font-light text-gray-700 cursor-pointer font-notoSans text-[35px]">
            TikTok
          </h1>
        </div>
      </Link>
      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-gray-100 p-3 h-[44px] md:text-md font-openSans border text-gray-400 border-gray-100 focus:outline-none w-[300px] md:w-[350px] rounded-[5px] md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-[10px] right-[10px] top-[10px] pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-4 h-[42px]">
            <Link href="/upload">
              <button className="border h-[42px] w-[42px] text-md font-semibold flex items-center justify-center box-border rounded-full">
                <IoMdAdd className="text-2xl text-gray-400" />
              </button>
            </Link>
            <button
              type="button"
              className="border h-[42px] w-[42px] flex items-center justify-center rounded-full cursor-pointer outline-none"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              >
              <AiOutlineLogout color="gray" fontSize={20} />
            </button>
              {userProfile.image && (
                <Link href={`/profile/${userProfile._id}`}>
                  <div>
                    <Image
                      className="rounded-full cursor-pointer"
                      src={userProfile.image}
                      alt="user"
                      width={42}
                      height={42}
                    />
                  </div>
                </Link>
              )}
          </div>
        ) : (
          <>
            <span className="font-notoSans">
              <GoogleLogin
                onSuccess={(response) => {createOrGetUser(response, addUser);}}
                onError={() => {console.log("Error");}}    
                text="signin"
                size="large"
                theme="outline"
                shape="square"
                width="100px"
              />
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
