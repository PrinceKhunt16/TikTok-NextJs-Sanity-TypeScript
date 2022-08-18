import React from "react";
import Discover from "../components/Discover";
import SuggestedAccounts from "../components/SuggestedAccounts";
import Footer from "../components/Footer";
import useAuthStore from "../store/authStore";

const Sidebar = () => {
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  return (
    <div>
      <div className="w-[65px] md:w-[182px] xl:w-[236px] md:pl-2 xl:pl-0 flex flex-col justify-start xl:border-0">
        <Discover />
        <SuggestedAccounts
          fetchAllUsers={fetchAllUsers}
          allUsers={allUsers}
        />
        <Footer />
      </div>
    </div>
  );
};

export default Sidebar;
