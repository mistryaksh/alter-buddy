import React, { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { FaRegMoon, FaRegSun } from "react-icons/fa";
import { AppButton, AppLink } from "../../../component";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { ICategoryProps, ISubCategoryProps } from "../../../interface";
import { FaChevronDown } from "react-icons/fa";

interface MainNavBarProps {
     toggle: () => void;
     darkMode: boolean;
     mobile: boolean;
     handleMenu: () => void;
     authModal: () => void;
     authenticated: boolean;
     logout: () => void;
     navLoading?: boolean;
     subCategory: ISubCategoryProps[];
     category: ICategoryProps[];
}

export const MainNavBar: FC<MainNavBarProps> = ({
     darkMode,
     toggle,
     handleMenu,
     mobile,
     authModal,
     authenticated,
     logout,
     navLoading,
     subCategory,
     category,
}) => {
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
                                        <Link to="/">
                                             <img
                                                  className="w-[50%]"
                                                  src={require("../../../assets/image/logo.png")}
                                                  alt="Workflow"
                                             />
                                        </Link>
                                   </div>
                                   <div className="flex-1 hidden md:block">
                                        <ul className="flex items-center gap-5">
                                             <li>
                                                  <AppLink path="/about" label="About" />
                                             </li>
                                             <li className="group relative">
                                                  <Menu as="div" className="relative inline-block text-left">
                                                       <div>
                                                            <Menu.Button className="flex items-center gap-1 text-gray-500 capitalize">
                                                                 Services
                                                                 <FaChevronDown />
                                                            </Menu.Button>
                                                       </div>
                                                       <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                       >
                                                            <Menu.Items className="absolute right-0 mt-2 w-[300px] origin-top-left bg-primary-100 rounded-md">
                                                                 {subCategory?.map(({ label, _id }) => (
                                                                      <div className="px-1 py-1 " key={_id}>
                                                                           <Menu.Item>
                                                                                {({ active }) => (
                                                                                     <Link
                                                                                          to={`/category/${_id}`}
                                                                                          className={`${
                                                                                               active
                                                                                                    ? "bg-primary-500 text-white"
                                                                                                    : "text-gray-900"
                                                                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                                                                                     >
                                                                                          {label}
                                                                                     </Link>
                                                                                )}
                                                                           </Menu.Item>
                                                                      </div>
                                                                 ))}
                                                            </Menu.Items>
                                                       </Transition>
                                                  </Menu>
                                             </li>
                                             <li className="group relative">
                                                  <Menu as="div" className="relative inline-block text-left">
                                                       <div>
                                                            <Menu.Button className="flex items-center gap-1 text-gray-500 capitalize">
                                                                 Talk to
                                                                 <FaChevronDown />
                                                            </Menu.Button>
                                                       </div>
                                                       <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                       >
                                                            <Menu.Items className="absolute right-0 mt-2 w-[300px] origin-top-left bg-primary-100 rounded-md">
                                                                 {category?.map(({ _id, title }) => (
                                                                      <div className="px-1 py-1" key={_id}>
                                                                           <Menu.Item>
                                                                                {({ active }) => (
                                                                                     <Link
                                                                                          to={`/mentor/category/${_id}`}
                                                                                          className={`${
                                                                                               active
                                                                                                    ? "bg-primary-500 text-white"
                                                                                                    : "text-gray-900"
                                                                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                                                                                     >
                                                                                          {title}
                                                                                     </Link>
                                                                                )}
                                                                           </Menu.Item>
                                                                      </div>
                                                                 ))}
                                                            </Menu.Items>
                                                       </Transition>
                                                  </Menu>
                                             </li>
                                             <li>
                                                  <AppLink path="/coming-soon" label="Contact" />
                                             </li>
                                             <li>
                                                  <AppLink path="/blog" label="Blog" />
                                             </li>
                                             <li>
                                                  <AppLink path="/rant" label="rant" />
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
                                        <ul className="flex items-center gap-3">
                                             {!navLoading && authenticated && (
                                                  <>
                                                       <li>
                                                            <Link to="/user/profile" className="capitalize">
                                                                 my profile
                                                            </Link>
                                                       </li>
                                                       <li>
                                                            <button onClick={logout} className="capitalize">
                                                                 Log out
                                                            </button>
                                                       </li>
                                                  </>
                                             )}
                                             {!authenticated && (
                                                  <li>
                                                       <button onClick={authModal}>Log in</button>
                                                  </li>
                                             )}
                                             {navLoading && (
                                                  <li>
                                                       <AiOutlineLoading
                                                            size={24}
                                                            color="#000"
                                                            className="animate-spin"
                                                       />
                                                  </li>
                                             )}
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
