import React, { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { AppButton, AppLink } from "../../../component";
import { Link } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import { ICategoryProps, ISubCategoryProps } from "../../../interface";
import { FaChevronDown } from "react-icons/fa";

interface MainNavBarProps {
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
          <div className={clsx("fixed w-full top-0 z-20 bg-opacity-60 backdrop-blur-lg bg-white")}>
               <nav>
                    <div className="px-4 sm:px-6 py-2 lg:px-8">
                         <div className="flex items-center justify-between h-16 w-full">
                              <div className="flex items-center justify-between gap-10">
                                   <div className="w-[15%]">
                                        <Link to="/">
                                             <img
                                                  className=""
                                                  src={require("../../../assets/image/logo.jpeg")}
                                                  alt="Workflow"
                                             />
                                        </Link>
                                   </div>
                                   <div className="flex-1 hidden md:block w-full xl:flex xl:justify-end">
                                        <ul className="flex items-center gap-5 w-full justify-end">
                                             <li>
                                                  <AppLink path="/" label="home" />
                                             </li>
                                             <li>
                                                  <AppLink path="/about" label="About" />
                                             </li>
                                             <li>
                                                  <div className="group relative">
                                                       <Menu as="div" className="relative inline-block text-left">
                                                            <Menu.Button className="flex items-center gap-1 text-gray-400 capitalize hover:text-primary-500">
                                                                 Services
                                                                 <FaChevronDown size={12} />
                                                            </Menu.Button>
                                                            <Transition
                                                                 as={Fragment}
                                                                 enter="transition ease-out duration-100"
                                                                 enterFrom="transform opacity-0 scale-95"
                                                                 enterTo="transform opacity-100 scale-100"
                                                                 leave="transition ease-in duration-75"
                                                                 leaveFrom="transform opacity-100 scale-100"
                                                                 leaveTo="transform opacity-0 scale-95"
                                                            >
                                                                 <Menu.Items
                                                                      className="absolute left-0 mt-5 border
                                                            w-[550px] origin-top-right bg-white shadow-2xl rounded-2xl divide-x p-5 divide-gray-500 flex gap-20"
                                                                 >
                                                                      <div className="">
                                                                           <label
                                                                                htmlFor="service"
                                                                                className="uppercase font-semibold text-sm text-primary-500"
                                                                           >
                                                                                get help for:
                                                                           </label>
                                                                           <div className="flex flex-1 flex-col gap-3 ">
                                                                                {subCategory?.map(({ label, _id }) => (
                                                                                     <div
                                                                                          className="flex gap-3"
                                                                                          key={_id}
                                                                                     >
                                                                                          <Menu.Item>
                                                                                               {({ active }) => (
                                                                                                    <Link
                                                                                                         to={`/category/${_id}`}
                                                                                                         className={`${
                                                                                                              active
                                                                                                                   ? "text-primary-500"
                                                                                                                   : "text-gray-500"
                                                                                                         } group flex w-full
                                                                                                    font-bold items-center capitalize`}
                                                                                                    >
                                                                                                         {label}
                                                                                                    </Link>
                                                                                               )}
                                                                                          </Menu.Item>
                                                                                     </div>
                                                                                ))}
                                                                           </div>
                                                                      </div>
                                                                      <div className="flex-1 h-full pl-3">
                                                                           <label
                                                                                htmlFor="service"
                                                                                className="uppercase font-semibold text-sm text-primary-500"
                                                                           >
                                                                                Therapy for mental wellness:
                                                                           </label>
                                                                           <div className="flex flex-col gap-3">
                                                                                <Link
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                     to="#"
                                                                                >
                                                                                     marriage counseling
                                                                                </Link>
                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     relationship counseling
                                                                                </Link>
                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     Depression counseling
                                                                                </Link>

                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     LGBTQ therapy
                                                                                </Link>
                                                                                <Link
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                     to="#"
                                                                                >
                                                                                     marriage counseling
                                                                                </Link>
                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     relationship counseling
                                                                                </Link>
                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     Depression counseling
                                                                                </Link>

                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     LGBTQ therapy
                                                                                </Link>
                                                                                <Link
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                     to="#"
                                                                                >
                                                                                     marriage counseling
                                                                                </Link>
                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     relationship counseling
                                                                                </Link>
                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     Depression counseling
                                                                                </Link>

                                                                                <Link
                                                                                     to="#"
                                                                                     className="capitalize text-gray-500 font-bold"
                                                                                >
                                                                                     LGBTQ therapy
                                                                                </Link>
                                                                           </div>
                                                                      </div>
                                                                 </Menu.Items>
                                                            </Transition>
                                                       </Menu>
                                                  </div>
                                             </li>
                                             <li className="group relative w-[70px]">
                                                  <Menu as="div" className="relative inline-block text-left">
                                                       <div>
                                                            <Menu.Button className="flex items-center gap-1 text-gray-400 capitalize hover:text-primary-500">
                                                                 Talk to
                                                                 <FaChevronDown size={12} />
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
                                                            <Menu.Items className="absolute right-0 mt-5 shadow-2xl w-[350px] origin-top-left bg-white rounded-2xl border px-5">
                                                                 {category?.map(({ _id, title }) => (
                                                                      <div className="p-2" key={_id}>
                                                                           <Menu.Item>
                                                                                {({ active }) => (
                                                                                     <Link
                                                                                          to={`/mentor/category/${_id}`}
                                                                                          className={`${
                                                                                               active
                                                                                                    ? " text-primary-500"
                                                                                                    : "text-gray-500"
                                                                                          } group flex w-full items-center rounded-md px-2 capitalize`}
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
                                                  <AppLink path="/blog" label="BuddyTube" />
                                             </li>
                                             <li>
                                                  <AppLink path="/rant" label="rant" />
                                             </li>
                                             <li className="w-[120px]">
                                                  <AppLink path="/privacy-policy" label="Privacy Policy" />
                                             </li>
                                        </ul>
                                   </div>
                                   <div className="hidden xl:justify-end md:block xl:flex items-center justify-between gap-5 xl:w-[20%]">
                                        <AppButton flexed={false} outlined>
                                             Talk to expert
                                        </AppButton>
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
                                             <AppLink path="/about" label="About" />
                                        </li>
                                        <div className="group relative">
                                             <Menu as="div" className="relative inline-block text-left">
                                                  <Menu.Button className="flex items-center gap-1 text-gray-500 capitalize">
                                                       Services
                                                       <FaChevronDown />
                                                  </Menu.Button>
                                                  <Transition
                                                       as={Fragment}
                                                       enter="transition ease-out duration-100"
                                                       enterFrom="transform opacity-0 scale-95"
                                                       enterTo="transform opacity-100 scale-100"
                                                       leave="transition ease-in duration-75"
                                                       leaveFrom="transform opacity-100 scale-100"
                                                       leaveTo="transform opacity-0 scale-95"
                                                  >
                                                       <Menu.Items
                                                            className="absolute left-0 mt-2
                                                            w-[500px] origin-top-right bg-white shadow-lg rounded-md divide-x p-3 divide-gray-500 flex gap-20"
                                                       >
                                                            <div className="">
                                                                 <label
                                                                      htmlFor="service"
                                                                      className="uppercase font-semibold text-sm text-primary-500"
                                                                 >
                                                                      get help for:
                                                                 </label>
                                                                 <div className="flex flex-1 flex-col gap-3 ">
                                                                      {subCategory?.map(({ label, _id }) => (
                                                                           <div className="flex gap-3" key={_id}>
                                                                                <Menu.Item>
                                                                                     {({ active }) => (
                                                                                          <Link
                                                                                               to={`/category/${_id}`}
                                                                                               className={`${
                                                                                                    active
                                                                                                         ? "text-primary-500"
                                                                                                         : "text-gray-500"
                                                                                               } group flex w-full
                                                                                                    font-bold items-center capitalize`}
                                                                                          >
                                                                                               {label}
                                                                                          </Link>
                                                                                     )}
                                                                                </Menu.Item>
                                                                           </div>
                                                                      ))}
                                                                 </div>
                                                            </div>
                                                            <div className="flex-1 h-full pl-3">
                                                                 <label
                                                                      htmlFor="service"
                                                                      className="uppercase font-semibold text-sm text-primary-500"
                                                                 >
                                                                      Therapy for mental wellness:
                                                                 </label>
                                                                 <div className="flex flex-col gap-3">
                                                                      <Link
                                                                           className="capitalize text-gray-500 font-bold"
                                                                           to="#"
                                                                      >
                                                                           marriage counseling
                                                                      </Link>
                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           relationship counseling
                                                                      </Link>
                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           Depression counseling
                                                                      </Link>

                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           LGBTQ therapy
                                                                      </Link>
                                                                      <Link
                                                                           className="capitalize text-gray-500 font-bold"
                                                                           to="#"
                                                                      >
                                                                           marriage counseling
                                                                      </Link>
                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           relationship counseling
                                                                      </Link>
                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           Depression counseling
                                                                      </Link>

                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           LGBTQ therapy
                                                                      </Link>
                                                                      <Link
                                                                           className="capitalize text-gray-500 font-bold"
                                                                           to="#"
                                                                      >
                                                                           marriage counseling
                                                                      </Link>
                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           relationship counseling
                                                                      </Link>
                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           Depression counseling
                                                                      </Link>

                                                                      <Link
                                                                           to="#"
                                                                           className="capitalize text-gray-500 font-bold"
                                                                      >
                                                                           LGBTQ therapy
                                                                      </Link>
                                                                 </div>
                                                            </div>
                                                       </Menu.Items>
                                                  </Transition>
                                             </Menu>
                                        </div>
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
                                                       <Menu.Items className="absolute right-0 mt-2 w-[300px] origin-top-right bg-white  rounded-md">
                                                            {category?.map(({ _id, title }) => (
                                                                 <div className="px-1 py-1" key={_id}>
                                                                      <Menu.Item>
                                                                           {({ active }) => (
                                                                                <Link
                                                                                     to={`/mentor/category/${_id}`}
                                                                                     className={`${
                                                                                          active
                                                                                               ? " text-primary-500"
                                                                                               : "text-gray-500"
                                                                                     } group flex w-full items-center rounded-md px-2 capitalize`}
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
                         )}
                    </Transition>
               </nav>
          </div>
     );
};
