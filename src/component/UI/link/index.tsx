import clsx from "clsx";
import React, { FC } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

interface AppLinkProps {
     path: string;
     label: string;
}

export const AppLink: FC<AppLinkProps> = ({ label, path }) => {
     let resolved = useResolvedPath(path);
     let match = useMatch({ path: resolved.pathname, end: true });
     return (
          <Link className={clsx(match ? "text-primary-500" : "text-gray-400", "capitalize")} to={path}>
               {label}
          </Link>
     );
};
