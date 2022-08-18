import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { IUser } from '../types';

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

const SuggestedAccounts: NextPage<IProps> = ({ fetchAllUsers, allUsers }) => {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const users = allUsers
  .sort(() => 0.5 - Math.random())
  .slice(0, allUsers.length);

  return (
    <div className='border-b border-gray-100 pb-2 pt-2'>
      <p className='text-gray-500 font-normal font-notoSans mb-2 mt-2 hidden md:block'>
        Popular Accounts
      </p>
      <div>
        {users?.slice(0, 4).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className='flex justify-center md:justify-start gap-3 pt-2 pb-2 cursor-pointer font-semibold rounded'>
              <div className='w-[50px] h-[50px]'>
                <Image
                  width={50}
                  height={50}
                  className='rounded-full object-cover'
                  src={user.image}
                  alt='user-profile'
                  layout='responsive'
                />
              </div>
              <div className='hidden md:block'>
                <p className='flex gap-1 leading-[14px] text-base font-normal font-notoSans text-primary lowercase'>
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className='text-blue-400' />
                </p>
                <p className='capitalize text-gray-400 font-notoSans font-normal text-xs pt-1'>
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SuggestedAccounts
