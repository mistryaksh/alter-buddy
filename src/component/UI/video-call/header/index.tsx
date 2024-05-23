import React, { FC } from "react";
import { AlterBuddyLogo } from "../../../../assets/logo";

interface CallHeaderProps {
  width: string;
}

export const CallHeader: FC<CallHeaderProps> = ({ width }) => {
  return (
    <header
      className={`fixed top-10 w-[${width}] bg-gray-950 rounded-lg backdrop-blur-md gap-3 flex items-center justify-start p-5`}
    >
      <AlterBuddyLogo />
    </header>
  );
};
