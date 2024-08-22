import clsx from "clsx";
import React, { FC } from "react";
import { IconType } from "react-icons";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface IconLinkButtonProps {
     Icon: IconType;
     path: string;
     isHighlighted?: boolean;
}

export const IconLinkButton: FC<IconLinkButtonProps> = ({ Icon, path, isHighlighted }) => {
     let resolved = useResolvedPath(path);
     let match = useMatch({ path: resolved.pathname, end: true });
     return (
          <>
               <Link to={path} className={clsx(" relative p-3 rounded-md", match && "bg-primary-400 text-white")}>
                    {isHighlighted && (
                         <span className="absolute top-0 right-0 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                         </span>
                    )}
                    <Icon size={32} className="text-white" />
               </Link>
          </>
     );
};
