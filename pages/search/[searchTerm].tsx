import React, { useEffect, useState } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { IUser, Video } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthStore from "../../store/authStore";

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers }: { allUsers: IUser[] } = useAuthStore();

  const router = useRouter();
  const { searchTerm }: any = router.query;

  const videosCss = isAccounts ? "" : "text-gray-500 font-normal";
  const accountCss = !isAccounts ? "" : "text-gray-500 font-normal";

  const searchedAccounts = allUsers?.filter((user: IUser) => user.userName.toLowerCase().includes(searchTerm));

  return (
    <div className="w-full">
      <div className="flex sticky z-10 pt-2 pb-4 top-0 gap-5 border-b border-gray-200 bg-white w-[95%] mx-auto md:w-[450px] lg:w-[585px]">
        <p
          className={`text-[17px] font-normal cursor-pointer ${videosCss} mt-2`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-[17px] font-normal cursor-pointer ${accountCss} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="w-[95%] mx-auto md:w-[450px] lg:w-[585px]">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link href={`/profile/${user._id}`} key={user._id}>
                <div className='flex justify-start items-center gap-3 pt-2 pb-2 cursor-pointer font-semibold border-b border-slate-200'>
                  <div className='w-[48px] h-[48px]'>
                    <Image
                      width={50}
                      height={50}
                      className='rounded-full object-cover'
                      src={user.image}
                      alt='user-profile'
                      layout='responsive'
                    />
                  </div>
                  <div>
                    <p className='flex gap-1 leading-[13px] text-base font-normal text-primary lowercase'>
                      {user.userName.replace(/\s+/g, '')}
                    </p>
                    <p className='capitalize text-gray-800 font-Caveat text-[18px] pt-1'>
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6">
          {videos.length ? (
            videos.map((post: Video, idx: number) => (
              <VideoCard post={post} key={idx} />
            ))
          ) : ( 
            <NoResults text={`No Video Results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};

export default Search;

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`
  );

  return {
    props: { videos: res.data },
  };
};
