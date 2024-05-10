import React, { FC, Fragment } from "react";

import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { AppLink } from "../../../component";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { ICategoryProps, ISubCategoryProps } from "../../../interface";
import { FaChevronDown } from "react-icons/fa";
import { AlterBuddyLogo } from "../../../assets/logo";

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
    <div
      className={clsx(
        "fixed w-full top-0 z-20 bg-opacity-60 backdrop-blur-lg bg-white"
      )}
    >
      {/* <p className="font-mono uppercase absolute bg-white border">Development Mode activated</p> */}
      <nav>
        <div className="px-4 sm:px-6 py-4 lg:px-8">
          <div className="flex items-center  h-16 w-full">
            <div className="flex items-center w-full justify-between gap-10">
              <div className="">
                <Link to="/">
                  <AlterBuddyLogo />
                  <p className="capitalize">FInd Your life’s Brighter Side</p>
                </Link>
              </div>
              <div className="xl:flex-1 hidden md:block w-full xl:flex xl:justify-end ml-5">
                <ul className="flex items-center justify-end gap-5 w-full">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <div className="group relative">
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
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
                          <Menu.Items className="absolute -left-[300px] mt-5 border w-[500px] origin-top-left bg-white shadow-lg rounded-md divide-x p-3 divide-gray-500 flex gap-10">
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
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>

                  <li>
                    <Link to="/blog">Blogs</Link>
                  </li>

                  <li>
                    <Link to="/contact">Contact Us</Link>
                  </li>
                  {!authenticated ? (
                    <li onClick={authModal} className="cursor-pointer">
                      Login
                    </li>
                  ) : (
                    <li className="flex items-center gap-3">
                      <AiOutlineLogout size={25} />
                      Logout
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
