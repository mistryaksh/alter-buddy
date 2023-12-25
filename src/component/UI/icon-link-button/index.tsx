import clsx from "clsx";
import React, { FC } from "react";
import { IconType } from "react-icons";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface IconLinkButtonProps {
     Icon: IconType;
     path: string;
}

export const IconLinkButton: FC<IconLinkButtonProps> = ({ Icon, path }) => {
     let resolved = useResolvedPath(path);
     let match = useMatch({ path: resolved.pathname, end: true });
     return (
          <Link to={path} className={clsx(" p-3 rounded-md", match && "bg-primary-400 text-white")}>
               <Icon size={32} className="text-white" />
          </Link>
     );
};
