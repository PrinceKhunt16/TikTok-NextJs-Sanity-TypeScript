import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Navbar = () => {
  return (
    <div className='w-full flex justify-between items-center border-b border-gray-200 box-border px-3'>
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[65px] h-[65px] flex items-center">
          <h1 className="font-light cursor-pointer font-notoSans text-4xl pb-1">TikTok</h1>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
