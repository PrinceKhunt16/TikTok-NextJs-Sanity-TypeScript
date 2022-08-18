import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "../components/Discover";
import SuggestedAccounts from "../components/SuggestedAccounts";
import Footer from "../components/Footer";
import useAuthStore from "../store/authStore";
import Icon from "../public/accessibility-outline.svg";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);
  const { fetchAllUsers, allUsers }: any = useAuthStore();
  const { pathname } = useRouter();

  const activeLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";

  return (
    <div>
      {showSidebar && (
        <div className="w-[65px] xl:w-[236px] flex flex-col justify-start xl:border-0">
          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
