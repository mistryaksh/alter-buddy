import clsx from "clsx";
import React, { FC, useEffect } from "react";
import { useGetAllCategoryQuery, useGetAllSubCategoryQuery } from "../../../redux/rtk-api";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../../redux";
import { handleAuthModal } from "../../../redux/features";
import { AppButton } from "../../../component";

interface MainFooterProps {}

export const MainFooter: FC<MainFooterProps> = () => {
     const { data: category, isError: isCategoryError, error: categoryError } = useGetAllCategoryQuery();
     const { data: subCategory, isError: isSubCategoryError, error: subCategoryError } = useGetAllSubCategoryQuery();

     useEffect(() => {
          if (isCategoryError) {
               console.log(categoryError);
          }
          if (isSubCategoryError) {
               console.log(subCategoryError);
          }
     }, [isCategoryError, categoryError, isSubCategoryError, subCategoryError]);
     const dispatch = useAppDispatch();

     return (
          <div className={clsx("bg-primary-100")}>
               <footer className={clsx("py-20 border-t")}>
                    <div className="grid xl:grid-cols-4 gap-10 px-2 lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
                         <div className="flex flex-col">
                              <div className="w-[100%]">
                                   <Link to="/">
                                        <img
                                             className=""
                                             src={require("../../../assets/image/logo.jpeg")}
                                             alt="Workflow"
                                        />
                                   </Link>
                              </div>
                              <div className=" mt-10">
                                   <p className="text-gray-500 uppercase">Download App :</p>

                                   <div className="flex items-center mt-2 gap-10">
                                        <a
                                             rel="noreferrer"
                                             href="http://play.google.com/store/apps/details?"
                                             target="_blank"
                                        >
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  x="0px"
                                                  y="0px"
                                                  width="50"
                                                  height="50"
                                                  viewBox="0 0 48 48"
                                             >
                                                  <path
                                                       fill="#4db6ac"
                                                       d="M7.705,4.043C7.292,4.15,7,4.507,7,5.121c0,1.802,0,18.795,0,18.795S7,42.28,7,43.091c0,0.446,0.197,0.745,0.5,0.856l20.181-20.064L7.705,4.043z"
                                                  ></path>
                                                  <path
                                                       fill="#dce775"
                                                       d="M33.237,18.36l-8.307-4.796c0,0-15.245-8.803-16.141-9.32C8.401,4.02,8.019,3.961,7.705,4.043l19.977,19.84L33.237,18.36z"
                                                  ></path>
                                                  <path
                                                       fill="#d32f2f"
                                                       d="M8.417,43.802c0.532-0.308,15.284-8.825,24.865-14.357l-5.601-5.562L7.5,43.947C7.748,44.038,8.066,44.004,8.417,43.802z"
                                                  ></path>
                                                  <path
                                                       fill="#fbc02d"
                                                       d="M41.398,23.071c-0.796-0.429-8.1-4.676-8.1-4.676l-0.061-0.035l-5.556,5.523l5.601,5.562c4.432-2.559,7.761-4.48,8.059-4.653C42.285,24.248,42.194,23.5,41.398,23.071z"
                                                  ></path>
                                             </svg>
                                        </a>
                                        <a
                                             rel="noreferrer"
                                             href="http://play.google.com/store/apps/details?"
                                             target="_blank"
                                        >
                                             <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  x="0px"
                                                  y="0px"
                                                  width="50"
                                                  height="50"
                                                  viewBox="0 0 50 50"
                                             >
                                                  <path d="M 16 3 C 9.38 3 4 8.38 4 15 L 4 35 C 4 41.62 9.38 47 16 47 L 36 47 C 42.62 47 48 41.62 48 35 L 48 15 C 48 8.38 42.62 3 36 3 L 16 3 z M 12.619141 18.070312 C 13.319141 18.070312 13.839844 18.570469 13.839844 19.230469 C 13.839844 19.880469 13.319141 20.380859 12.619141 20.380859 C 11.909141 20.380859 11.390625 19.880469 11.390625 19.230469 C 11.390625 18.570469 11.909141 18.070312 12.619141 18.070312 z M 23.039062 18.640625 C 26.689062 18.640625 28.939453 21.189297 28.939453 25.279297 C 28.939453 29.359297 26.709062 31.929688 23.039062 31.929688 C 19.349062 31.929688 17.109375 29.369297 17.109375 25.279297 C 17.109375 21.179297 19.399062 18.640625 23.039062 18.640625 z M 35.970703 18.640625 C 38.540703 18.640625 40.419062 20.139297 40.539062 22.279297 L 38.619141 22.279297 C 38.429141 21.109297 37.419453 20.380859 35.939453 20.380859 C 34.379453 20.380859 33.349609 21.119531 33.349609 22.269531 C 33.349609 23.169531 34.009922 23.690078 35.669922 24.080078 L 37.060547 24.419922 C 39.670547 25.029922 40.740234 26.080234 40.740234 27.990234 C 40.740234 30.420234 38.859609 31.939453 35.849609 31.939453 C 33.039609 31.939453 31.149766 30.490703 31.009766 28.220703 L 32.960938 28.220703 C 33.130938 29.420703 34.31 30.189453 36 30.189453 C 37.58 30.189453 38.740234 29.370234 38.740234 28.240234 C 38.740234 27.280234 38.010078 26.700781 36.330078 26.300781 L 34.689453 25.910156 C 32.399453 25.370156 31.349609 24.260391 31.349609 22.400391 C 31.349609 20.140391 33.200703 18.640625 35.970703 18.640625 z M 23.039062 20.470703 C 20.649062 20.470703 19.130859 22.339297 19.130859 25.279297 C 19.130859 28.209297 20.599062 30.099609 23.039062 30.099609 C 25.449062 30.099609 26.929688 28.209297 26.929688 25.279297 C 26.929688 22.339297 25.449063 20.470703 23.039062 20.470703 z M 11.679688 22.060547 L 13.560547 22.060547 L 13.560547 31.630859 L 11.679688 31.630859 L 11.679688 22.060547 z"></path>
                                             </svg>
                                        </a>
                                   </div>
                              </div>
                         </div>
                         <div>
                              <label
                                   htmlFor="services"
                                   className="text-gray-900 capitalize font-sans2 font-semibold text-lg"
                              >
                                   Our services
                              </label>
                              <div className="mt-2" id="services">
                                   <p className="text-gray-900 capitalize font-sans2 font-semibold text-lg">
                                        BuddyTube
                                   </p>
                                   <p className="text-gray-900 capitalize font-sans2 font-semibold text-lg">Blogs</p>
                                   <p className="text-gray-900 capitalize font-sans2 font-semibold text-lg">Rant</p>
                              </div>
                         </div>
                         <div className="text-left">
                              <label
                                   htmlFor="categories"
                                   className="text-gray-900  capitalize font-sans2 font-semibold text-lg"
                              >
                                   Talk to experts
                              </label>
                              <div className="mt-2" id="categories">
                                   {category?.data.map(({ title, _id }) => (
                                        <p className="capitalize text-gray-500 " key={_id}>
                                             {title}
                                        </p>
                                   ))}
                              </div>
                         </div>

                         <div>
                              <label
                                   htmlFor="Company"
                                   className="text-gray-900 capitalize font-sans2 font-semibold text-lg"
                              >
                                   Company
                              </label>
                              <div>
                                   <p className="capitalize text-gray-500">Contact</p>
                                   <p className="capitalize text-gray-500">About</p>
                                   <p className="capitalize text-gray-500">privacy-policy</p>
                              </div>
                         </div>
                    </div>
               </footer>
               <div className="bg-primary-200 p-4 flex justify-between items-center">
                    <h6>© 2024 | AlterBuddy - All Rights Reserved</h6>
                    <h6>
                         Developed By <span className="text-primary-500">Akshal Web Solution</span>
                    </h6>
               </div>
          </div>
     );
};
