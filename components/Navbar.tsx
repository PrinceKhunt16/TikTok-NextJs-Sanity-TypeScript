import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";
import { addIcon, logoutIcon, searchIcon } from "../utils/constants";

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
    <div className="w-full flex justify-between items-center border-b border-gray-100 box-border relative">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[65px] h-[65px] flex items-center pl-1 xl:pl-0">
          <h1 className="font-light pl-1 cursor-pointer font-notoSans text-[35px] mb-[2px]">
            TikTok
          </h1>
        </div>
      </Link>
      <div className="absolute hidden sm:block top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <form
          onSubmit={handleSearch}
          className="absolute sm:static top-10 left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-gray-100 p-3 pb-[14px] h-[44px] md:text-md font-notoSans font-light tracking-[0.2px] border text-gray-400 border-gray-100 focus:outline-none w-[320px] sm:w-[280px] md:w-[310px] rounded-[5px] md:top-0"
            placeholder="Search accounts and videos"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-[10px] right-[10px] top-[8px] pl-4 text-2xl text-gray-400"
          >
            <Image
              className="rounded-full cursor-pointer"
              src={searchIcon}
              alt="search"
              width={23}
              height={23}
            />
          </button>
        </form>
      </div>
      <div>
        {userProfile ? (
          <div className="flex gap-3 h-[42px] pr-2 xl:pr-0">
            <Link href="/upload">
              <button className="border h-[42px] w-[42px] text-xl font-semibold flex items-center justify-center box-border rounded-full">
                <Image
                  className="rounded-full cursor-pointer"
                  src={addIcon}
                  alt="user"
                  width={22}
                  height={22}
                />
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
              <Image
                className="rounded-full cursor-pointer"
                src={logoutIcon}
                alt="user"
                width={22}
                height={22}
              />
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
            <span className="font-notoSans flex items-center justify-center pr-2 xl:pr-0">
              <GoogleLogin
                onSuccess={(response) => {
                  createOrGetUser(response, addUser);
                }}
                onError={() => {
                  console.log("Error");
                }}
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
