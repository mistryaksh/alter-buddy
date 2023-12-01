import React, { FC } from "react";

import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { AppButton, AppLink } from "../../../component";

interface MainNavBarProps {
     toggle: () => void;
     darkMode: boolean;
     mobile: boolean;
     handleMenu: () => void;
     authModal: () => void;
}

export const MainNavBar: FC<MainNavBarProps> = ({ darkMode, toggle, handleMenu, mobile, authModal }) => {
     return (
          <div
               className={clsx(
                    darkMode ? "text-white bg-gray-900 " : "light",
                    "fixed w-full top-0 z-20 bg-opacity-90 backdrop-blur-sm"
               )}
          >
               <nav>
                    <div className="mx-auto px-4 sm:px-6 py-2 lg:px-8 p-">
                         <div className="flex items-center justify-between h-16">
                              <div className="flex items-center justify-between w-full">
                                   <div className="flex-shrink-0 flex-1">
                                        <img
                                             className="w-[50%]"
                                             src={require("../../../assets/image/logo.png")}
                                             alt="Workflow"
                                        />
                                   </div>
                                   <div className="flex-1 hidden md:block">
                                        <ul className="flex items-center gap-10">
                                             <li>
                                                  <AppLink path="/services" label="services" />
                                             </li>
                                             <li>
                                                  <AppLink path="/services" label="Talk to" />
                                             </li>
                                             <li>
                                                  <AppLink path="/about" label="About" />
                                             </li>
                                             <li>
                                                  <AppLink path="/contact" label="Contact" />
                                             </li>
                                             <li>
                                                  <AppLink path="/about" label="Blog" />
                                             </li>
                                        </ul>
                                   </div>
                                   <div className="hidden flex-1 xl:justify-end md:block xl:w-full xl:flex items-center justify-between gap-5">
                                        <AppButton flexed={false} outlined>
                                             Talk to Buddy
                                        </AppButton>
                                        <button onClick={toggle}>
                                             {darkMode ? <FaRegMoon size={22} /> : <FaRegSun size={22} />}
                                        </button>
                                        <ul className="flex items-center gap-10">
                                             <li>
                                                  <button onClick={authModal}>Log in</button>
                                             </li>
                                        </ul>
                                   </div>
                              </div>
                              <div className="flex gap-5 md:hidden items-center">
                                   <div className="">
                                        <button onClick={toggle} className="bg-primary-500 p-3 rounded-full text-white">
                                             {darkMode ? <FaRegMoon size={22} /> : <FaRegSun size={22} />}
                                        </button>
                                   </div>
                                   <button
                                        onClick={handleMenu}
                                        type="button"
                                        aria-controls="mobile-menu"
                                        aria-expanded="false"
                                   >
                                        <span className="sr-only">Open main menu</span>
                                        {!mobile ? (
                                             <svg
                                                  className="block h-6 w-6"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                  aria-hidden="true"
                                             >
                                                  <path
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       strokeWidth="2"
                                                       d="M4 6h16M4 12h16M4 18h16"
                                                  />
                                             </svg>
                                        ) : (
                                             <svg
                                                  className="block h-6 w-6"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  fill="none"
                                                  viewBox="0 0 24 24"
                                                  stroke="currentColor"
                                                  aria-hidden="true"
                                             >
                                                  <path
                                                       strokeLinecap="round"
                                                       strokeLinejoin="round"
                                                       strokeWidth="2"
                                                       d="M6 18L18 6M6 6l12 12"
                                                  />
                                             </svg>
                                        )}
                                   </button>
                              </div>
                         </div>
                    </div>

                    <Transition
                         show={mobile}
                         enter="transition ease-out duration-100 transform"
                         enterFrom="opacity-0 scale-95"
                         enterTo="opacity-100 scale-100"
                         leave="transition ease-in duration-75 transform"
                         leaveFrom="opacity-100 scale-100"
                         leaveTo="opacity-0 scale-95"
                    >
                         {(ref) => (
                              <div className="md:hidden" id="mobile-menu">
                                   <ul className="flex items-start px-10 flex-col gap-10 pb-5">
                                        <li>
                                             <AppLink path="/services" label="services" />
                                        </li>
                                        <li>
                                             <AppLink path="/services" label="Talk to" />
                                        </li>
                                        <li>
                                             <AppLink path="/about" label="About" />
                                        </li>
                                        <li>
                                             <AppLink path="/contact" label="Contact" />
                                        </li>
                                        <li>
                                             <AppLink path="/about" label="Blog" />
                                        </li>
                                   </ul>
                              </div>
                         )}
                    </Transition>
               </nav>
          </div>
     );
};
