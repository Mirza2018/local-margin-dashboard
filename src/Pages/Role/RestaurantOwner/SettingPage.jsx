import React, { useState } from "react";
import SettingsChangePassword from "../../Common/settings/SettingsChangePassword";
import EditProfile from "../../Common/EditProfile";

const SettingPage = () => {
  const [profile, setProfile] = useState(true);
  return (
    <div>
      <div className="flex md:flex-row md:gap-0 gap-5  flex-col  justify-start items-center   w-fit mt-[33px] mb-[21px] ms-2">
        <h1
          onClick={() => setProfile(true)}
          className={`text-xl cursor-pointer py-2 text-nowrap w-56 text-center ${
            profile
              ? "font-bold   bg-gradient-to-b from-[#f9ebcf] to-[#fdf7ed] border-t-2 border-secondary-color"
              : "font-normal text-[#4b5563] border-t-2 "
          }`}
        >
          Edit Profile
        </h1>

        <h1
          onClick={() => setProfile(false)}
          className={`text-xl cursor-pointer py-2  text-nowrap px-4 w-56 text-center ${
            profile
              ? "font-normal text-[#4b5563] border-t-2 "
              : "font-bold   bg-gradient-to-b from-[#f9ebcf] to-[#fdf7ed] border-t-2 border-secondary-color"
          }`}
        >
          Change password
        </h1>
      </div>

      {profile ? <EditProfile /> : <SettingsChangePassword />}
    </div>
  );
};

export default SettingPage;
