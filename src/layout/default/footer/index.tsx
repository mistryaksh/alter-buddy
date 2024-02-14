import clsx from "clsx";
import React, { FC, useEffect } from "react";
import { useGetAllCategoryQuery, useGetAllSubCategoryQuery } from "../../../redux/rtk-api";
import { Link } from "react-router-dom";

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

     return (
          <div className={clsx("")}>
               <footer className={clsx("py-10 bg-primary-300", " py-5")}>
                    <div className="flex container mx-auto">
                         <div className="flex flex-col w-[40%]">
                              <img className="w-[50%]" src={require("../../../assets/image/logo.png")} alt="Workflow" />
                              <p className="text-primary-500 font-mono text-lg">Lorem ipsum dolor sit amet.</p>
                         </div>
                         <div className="flex-1 flex gap-3 justify-between">
                              <ul>
                                   <label htmlFor="link2" className="font-semibold text-primary-500 uppercase">
                                        Categories
                                   </label>
                                   {category?.data.map(({ title, _id }) => (
                                        <Link key={_id} to={`/mentor/category/${_id}`}>
                                             <li className="capitalize font-semibold">{title}</li>
                                        </Link>
                                   ))}
                              </ul>
                              <ul>
                                   <label htmlFor="link1" className="font-semibold text-primary-500 uppercase">
                                        Mentor's sub categories
                                   </label>
                                   {subCategory?.data.map(({ label, _id }) => (
                                        <Link key={_id} to={`/category/${_id}`}>
                                             <li className="font-semibold capitalize">{label}</li>
                                        </Link>
                                   ))}
                              </ul>
                              <ul>
                                   <label htmlFor="link3" className="font-semibold text-primary-500">
                                        Helpful Links
                                   </label>
                                   <Link to="/blog">
                                        <li>Privacy Policy</li>
                                   </Link>

                                   <Link to="/blog">
                                        <li>Terms & Conditions</li>
                                   </Link>
                              </ul>
                              <ul>
                                   <label htmlFor="link3" className="font-semibold text-primary-500">
                                        More Links
                                   </label>
                                   <Link to="/blog">
                                        <li>Blogs</li>
                                   </Link>
                                   <Link to="/rant">
                                        <li>Rant</li>
                                   </Link>
                                   <Link to="/about">
                                        <li>About us</li>
                                   </Link>
                                   <Link to="/contact">
                                        <li>Contact us</li>
                                   </Link>
                                   <Link to="/faq">
                                        <li>FAQs</li>
                                   </Link>
                                   <Link to="/sitemap">
                                        <li>Sitemap</li>
                                   </Link>
                              </ul>
                         </div>
                    </div>
               </footer>
          </div>
     );
};
