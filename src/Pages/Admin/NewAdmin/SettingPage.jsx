import React, { useState } from "react";
import SettingsChangePassword from "../../Common/settings/SettingsChangePassword";
import EditProfile from "../../Common/EditProfile";

const SettingPage = () => {
  const [profile, setProfile] = useState(true);
  return (
    <div>
      <div className="flex justify-start items-center gap-3 border-t w-fit mt-[33px] mb-[21px] ms-2">
        <h1
          onClick={() => setProfile(true)}
          className={`text-xl cursor-pointer ${
            profile
              ? "font-bold  text-secondary-color bg-[#fdf7ed] border-t-2 border-secondary-color"
              : "font-normal text-[#4b5563]"
          }`}
        >
          Edit Profile
        </h1>

        <h1
          onClick={() => setProfile(false)}
          className={`text-xl cursor-pointer ${
            profile
              ? "font-normal text-[#4b5563]"
              : "font-bold  text-secondary-color bg-[#fdf7ed] border-t-2 border-secondary-color"
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
