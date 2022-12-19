import React, { useEffect, useState } from "react";
import { SanityAssetDocument } from "@sanity/client";
import { useRouter } from "next/router";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { client } from "../utils/client";
import { topics } from '../utils/constants';
import useAuthStore from '../store/authStore';
import { BASE_URL } from '../utils';

const Upload = () => {
  const [caption, setCaption] = useState('');
  const [topic, setTopic] = useState<String>(topics[0].name);
  const [loading, setLoading] = useState<Boolean>(false);
  const [savingPost, setSavingPost] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);

  const userProfile: any = useAuthStore((state) => state.userProfile);
  const router = useRouter();

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ["video/mp4", "video/webm", "video/ogg"];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload("file", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  const handlePost = async () => {
    if (caption && videoAsset?._id && topic) {
      setSavingPost(true);

      const doc = {
        _type: 'post',
        caption,
        video: {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: videoAsset?._id,
          },
        },
        userId: userProfile?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: userProfile?._id,
        },
        topic,
      };

      await axios.post(`${BASE_URL}/api/post`, doc);
        
      router.push('/');
    }
  };

  const handleDiscard = () => {
    setSavingPost(false);
    setVideoAsset(undefined);
    setCaption('');
    setTopic('');
  };

  useEffect(() => {
    if (!userProfile){
      router.push('/');
    }
  }, [userProfile, router]);

  return (
    <div className='flex w-[95%] md:w-[450px] lg:w-[585px] mx-auto'>
      <div className='bg-white rounded-lg flex flex-col w-full gap-6 pt-4'>
        <div>
          <div>
            <p className='text-[21px] font-normal'>Upload Video</p>
            <p className='text-gray-500 text-[24px] font-normal font-Caveat'>Post a video to your account</p>
          </div>
          <div className='border rounded-xl border-gray-200 w-full flex flex-col justify-center items-center outline-none mt-6 cursor-pointer hover:border-gray-500 hover:bg-gray-50'>
            {loading ? (
              <p className='text-center text-[21px] py-20 font-normal'>
                Uploading
              </p>
            ) : (
              <div>
                {!videoAsset ? (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center pt-5 justify-center'>
                      <div className='flex flex-col justify-center items-center'>
                        <p className='text-xl font-normal'>
                          Select video to upload
                        </p>
                      </div>
                      <p className='text-gray-400 text-center mt-4 text-sm leading-7'>
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      onChange={(e) => uploadVideo(e)}
                      className='w-0 h-0'
                    />
                  </label>
                ) : (
                  <div className='flex py-4 flex-col gap-6 justify-center items-center'>
                    <video
                      className='h-[462px] bg-black'
                      controls
                      loop
                      src={videoAsset?.url}
                    />
                    <div className='flex justify-between'>
                      <button
                        type='button'
                        className='rounded-full bg-gray-200 text-gray-500 p-2 text-[24px] cursor-pointer outline-none'
                        onClick={() => setVideoAsset(undefined)}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {wrongFileType && (
            <p className='text-center text-red-600 mt-4'>
              Please select an video file (mp4 or webm or ogg)
            </p>
          )}
        </div>
        <div className='flex flex-col gap-3 pb-10'>
          <label className='text-gray-500 font-normal'>Caption</label>
          <input
            type='text'
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className='rounded outline-none text-md border border-gray-200 p-3'
          />
          <label className='text-gray-500 font-normal'>Choose a topic</label>
          <select
            onChange={(e) => {
              setTopic(e.target.value);
            }}
            className='outline-none border border-gray-200 text-md capitalize p-3 rounded cursor-pointer'
          >
            {topics.map((item) => (
              <option
                key={item.name}
                className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-300'
                value={item.name}
              >
                {item.name}
              </option>
            ))}
          </select>
          <div className='flex gap-1.5 sm:gap-3 mt-3'>
            <button
              onClick={handleDiscard}
              type='button'
              className='border-gray-300 border text-md font-normal p-3 rounded w-32 outline-none'
            >
              Discard
            </button>
            <button
              disabled={videoAsset?.url ? false : true}
              onClick={handlePost}
              type='button'
              className='bg-gray-300 border-gray-300 border text-md font-normal p-3 rounded w-32 outline-none'
            >
              {savingPost ? 'Posting' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
