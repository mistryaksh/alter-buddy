import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import {
  AppButton,
  CallAndVideoIcon,
  ChooseUsIcon,
  DayHours,
  HelpAndSupport,
  HumanBrainIcon,
  ServicesCard,
  ShopUser,
  TwoHands,
} from "../../../component";
import {
  handleAgeGroupSelection,
  handleFaq,
  useAuthenticationSlice,
  useFaqSlice,
  useHomeSlice,
  useServicesSlice,
} from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import clsx from "clsx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useGetMentorsListQuery } from "../../../redux/rtk-api";
import { AiOutlinePhone } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import { MdStarPurple500 } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { ICategoryProps } from "../../../interface";

export const DefaultHome = () => {
  const { active } = useFaqSlice();
  const { data: mentor } = useGetMentorsListQuery();
  const { authentication } = useAuthenticationSlice();
  const { problems, helpPoints, selectedAgeGroup } = useHomeSlice();
  const { howWeWish, FAQ } = useServicesSlice();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    Aos.init({});
  }, []);

  return (
    <MainLayout>
      <div
        data-aos="fade-up"
        className={clsx(
          `flex items-center gap-10 py-10 bg-gradient-to-bl flex-wrap-reverse flex-row-reverse mt-10`,
          "from-primary-200 to-white"
        )}
      >
        <div className="flex-1 p-10">
          <h3 className="text-3xl leading-8 mt-3 capitalize font-normal font-sans2 whitespace-pre-wrap">
            DISCOVER LIFE’S BRIGHTER SIDE WITH YOUR PERSONAL COACHES AT{" "}
          </h3>
          <p className="text-primary-500 text-4xl my-3">ALTERBUDDY</p>
          <ul className="my-5">
            <li className="flex items-center gap-3">
              <div className=" text-primary-500 p-2 rounded-full">
                <MdStarPurple500 size={30} />
              </div>
              <p className="text-gray-500 capitalize">MENTAL HEALTH BUDDIES</p>
            </li>
            <li className="flex items-center gap-3">
              <div className=" text-primary-500 p-2 rounded-full">
                <MdStarPurple500 size={30} />
              </div>
              <p className="text-gray-500 capitalize">COMPASSIONATE HEALERS </p>
            </li>
            <li className="flex items-center gap-3">
              <div className=" text-primary-500 p-2 rounded-full">
                <MdStarPurple500 size={30} />
              </div>
              <p className="text-gray-500 capitalize">MANIFESTATION GENIES</p>
            </li>
          </ul>
          <p className="text-xl font-libre font-semibold">
            Take your first step to create a life you desire.
          </p>
          <div className="">
            <div className="flex items-center mt-10 gap-5">
              <div
                onClick={() => {
                  if (!authentication) {
                    navigate("/sign-in");
                  } else {
                    navigate("/mentor/list");
                  }
                }}
              >
                <div className="transition-colors duration-100">
                  <AppButton filled>
                    <AiOutlinePhone size={26} className="rotate-90" />
                    <span>talk to buddy</span>
                  </AppButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="xl:flex-1 px-10 flex items-center justify-center">
          <img
            src={require("../../../assets/image/extra/hero-section.png")}
            className="w-[70vh] rounded-full"
            alt=""
          />
        </div>
      </div>
      <div data-aos="fade-up" className="mt-20 py-20">
        <h6 className="text-4xl text-center capitalize font-sans2 mb-5">
          We Understand your{" "}
          <span className="font-semibold text-primary-500">
            Problems/Traumas
          </span>
        </h6>

        <p className="xl:w-[80%] text-gray-600 mx-auto text-center text-xl font-semibold">
          NOTE:- Problems mentioned in a specific age band{" "}
          <span className="text-primary-500">can resonate with anyone</span>,
          not just limited to that group.
        </p>
        <div className="mt-10 justify-center xl:gap-20 gap-3 flex flex-row px-3">
          {problems.map(({ age, id }, i) => (
            <button
              key={i}
              type="button"
              onClick={() => dispatch(handleAgeGroupSelection(id))}
              className={clsx(
                "border-2 border-gray-500 px-5 py-2 rounded-full",
                selectedAgeGroup === id
                  ? "bg-primary-500 text-white border-2 border-transparent"
                  : "text-black"
              )}
            >
              <h6 className="capitalize xl:text-sm text-xs font-sans2 text-center font-semibold">
                Age Group {age}
              </h6>
            </button>
          ))}
        </div>
        <div className="border shadow-2xl shadow-primary-100 py-20 px-5 h-auto xl:w-[80%] rounded-md  mt-10 xl:mx-auto mx-2">
          <ul className="flex flex-wrap gap-5 xl:w-[90%] mx-auto justify-center">
            {problems[selectedAgeGroup].points.map(
              ({ issue, explanation, subPoints }, i) => (
                <li key={i}>
                  <div className="group relative flex">
                    <div className="bg-primary-500 p-3 text-md text-white rounded-lg capitalize">
                      {issue}
                    </div>
                    <div
                      style={{ zIndex: 100 }}
                      className={clsx(
                        "absolute gap-10 top-14 scale-0 transition-all rounded bg-primary-800 p-3 text-sm text-white group-hover:scale-100 shadow-lg",
                        subPoints?.length &&
                          "flex gap-5 bg-transparent shadow-none p-3  top-12"
                      )}
                    >
                      {subPoints?.length
                        ? subPoints.map((element) => (
                            <div
                              className="bg-primary-800 rounded-lg p-3"
                              key={element}
                            >
                              {element}
                            </div>
                          ))
                        : explanation}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex justify-center mt-10">
          <AppButton
            onClick={() => {
              if (!authentication) {
                navigate("/sign-in");
              } else {
                navigate("/mentor/list");
              }
            }}
            filled
          >
            Talk to us!
          </AppButton>
        </div>
        <div className="container mx-auto mt-10 shadow-xl  shadow-primary-100 py-5 border rounded-lg">
          <div
            data-aos="fade-up"
            className="grid px-5 items-center xl:grid-cols-2 xl:w-[90%] mx-auto gap-20 xl:px-0"
          >
            <div className="">
              <p className="mt-10 text-xl text-gray-500 mx-auto whitespace-pre-line text-justify">
                People and sometimes the situations around us are so toxic, that
                we feel everything bad happens only to us, making us bitter. And
                unconsciously, we send so many negative energies to the
                universe, that it has no choice but to return the same back to
                us,{" "}
                <span className="text-primary-500 font-extrabold">
                  making us even more miserable.
                </span>
                {"\n\n"}
                The universe has made it really simple for us to understand:
                {"\n\n"}
                <span className="text-center text-primary-500">
                  ’Whatever you give me, so shall you get back’.
                </span>
              </p>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/6624292/pexels-photo-6624292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="object-cover aspect-video object-top rounded-md"
              />
            </div>
          </div>
          <div
            data-aos="fade-up"
            className="grid items-center px-5 xl:grid-cols-2 mt-5"
          >
            <div className="flex items-center justify-center  xl:order-last order-1">
              <img
                src="https://images.pexels.com/photos/6624287/pexels-photo-6624287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                className="object-cover aspect-video object-top rounded-md"
              />
            </div>
            <div className=" xl:order-last order-1">
              <p className="text-justify mt-10 text-xl text-gray-500 xl:w-[80%] mx-auto whitespace-pre-line">
                And we are here to help you become the best version of yourself
                with only a positive aura all around you, making sure the
                universe is at your side granting you everything you desire.
                {"\n\n"}
                We get you out of all your traumas and negativity, however bad
                and toxic the situation is for you, healing your wounds from
                within, at the cellular level.
                {"\n\n"}
                We believe that everyone deserves to live a life filled with joy
                and fulfillment. And we are here to give you exactly that.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <AppButton
          filled
          onClick={() => {
            if (!authentication) {
              navigate("/sign-in");
            } else {
              navigate("/mentor/list");
            }
          }}
        >
          GET WHAT YOU WANT WITH US!
        </AppButton>
      </div>

      <div data-aos="fade-up" className="my-20 container mx-auto ">
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          How we <span className="font-semibold text-primary-500">Wish?</span>
        </h6>
        <div className="p-3 rounded-md xl:w-[60%] mx-auto mt-5 flex-col flex gap-5">
          <h5 className="text-3xl text-center font-semibold">
            {howWeWish.mainTitle}
          </h5>
          <ul className="flex flex-col gap-3 list-outside">
            {howWeWish.points.map((prop, i) => (
              <li
                key={i}
                className="list-disc text-lg text-gray-500"
                data-aos="fade-up"
              >
                {prop}
              </li>
            ))}
          </ul>
        </div>
        <h6 className="text-gray-50-950 text-xl text-center mt-10">
          {howWeWish.conclusionTitle}
        </h6>
        <p className="text-md text-gray-500 text-center mt-3">
          {howWeWish.conclusion}
        </p>
      </div>

      <div
        data-aos="fade-up"
        className="mb-20 mt-20 xl:w-[90%] mx-auto px-3 container shadow-lg  shadow-primary-100 rounded-lg border py-10"
      >
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          How do we{" "}
          <span className="font-semibold text-primary-500">help?</span>
        </h6>
        <p className="xl:w-[80%] text-gray-600 mx-auto text-center">
          Explore well-being through our four key sections: Mental Health,
          Manifestation, Healing, and Rant (Vent Out). Find support for mental
          health, learn to manifest desires, access tools for holistic healing,
          and safely vent frustrations.
        </p>
        <div className="w-full xl:grid px-3 gap-y-10 xl:grid-cols-12 gap-10 mt-20 items-stretch lg:grid-cols-6 md:grid-cols-12">
          {helpPoints.map(({ body, image, label, path }, i) => (
            <div
              className="xl:col-span-3 md:col-span-2 col-span-12 xl:mt-0"
              key={i}
            >
              <ServicesCard
                hideReadMore
                body={body}
                image={image}
                label={label}
                path={path}
              />
            </div>
          ))}
        </div>
      </div>

      {/* section two */}
      <div data-aos="fade-up" className="my-40 container mx-auto xl:w-[80%]">
        <div className="shadow-xl  shadow-primary-100 border rounded-lg mb-10 py-10">
          <h6 className="font-light text-4xl text-center capitalize font-sans2">
            why{" "}
            <span className="font-semibold text-primary-500">Choose Us?</span>
          </h6>
          <p className="text-center text-gray-500 px-10">
            At AlterBuddy, we recognize the significance of fostering a positive
            mindset and nurturing mental well-being. That's why we offer trusted
            buddies who are equipped to navigate through any obstacles with you
          </p>
          <div
            data-aos="fade-up"
            className="px-10 gap-5 grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-2"
          >
            <div className=" p-4 rounded-lg mb-4 gap-3 w-full flex-col flex items-center">
              <img
                src={require("../../../assets/image/extra/personalized-support.jpg")}
                alt=""
                className=" mb-4 rounded-lg object-cover xl:h-[300px]"
              />
              <div className="flex-1">
                <p className="text-2xl font-bold mb-2 capitalize">
                  personalised support
                </p>
                <p className="text-gray-700">
                  Our team offers 1 on 1 tailored guidance and support to
                  address your unique needs and goals.
                </p>
              </div>
            </div>
            <div className=" p-4 rounded-lg mb-4 gap-3 w-full flex items-center  flex-col">
              <img
                src={require("../../../assets/image/extra/holistic-approch.jpg")}
                alt=""
                className=" mb-4 rounded-lg object-cover xl:h-[300px]"
              />
              <div className="flex-1">
                <p className="text-2xl font-bold mb-2 capitalize">
                  HOLISTIC APPROACH
                </p>
                <p className="text-gray-700">
                  From mental wellness to manifestation and healing, we provide
                  comprehensive services to nurture your mind, body, and spirit
                </p>
              </div>
            </div>
            <div className=" p-4 rounded-lg mb-4 gap-3 w-full flex items-center  flex-col">
              <img
                src={require("../../../assets/image/extra/safe-place.jpg")}
                alt=""
                className=" mb-4 rounded-lg object-cover xl:h-[300px]"
              />
              <div className="flex-1">
                <p className="text-2xl font-bold mb-2 capitalize">
                  your safe space{" "}
                </p>
                <p className="text-gray-700">
                  Feel heard, understood, and supported in a judgment-free
                  environment where you can explore, heal, and transform.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="grid mt-32 gap-10 items-center xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-6 sm:grid-cols-1 grid-cols-1"
        >
          <div className="flex flex-col justify-center gap-2 items-center">
            <HumanBrainIcon height={100} width={100} />
            <p className="text-xl text-center text-gray-500 font-semibold capitalize">
              expert care
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <DayHours height={100} width={100} />
            <p className="text-xl text-center text-gray-500 font-semibold capitalize">
              instant help
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <ShopUser height={100} width={100} />
            <p className="text-xl text-center text-gray-500 font-semibold capitalize">
              your safe space
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 items-center">
            <TwoHands height={100} width={100} />
            <p className="text-xl text-center text-gray-500 font-semibold capitalize">
              experienced team
            </p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up" className="w-[80%] p-3 mx-auto my-20">
        <h6 className="text-4xl capitalize text-center font-sans2">
          How Does It <span className="text-primary-500">Work</span>
        </h6>
        <p className="text-gray-500 text-center">
          Get professional advice and steadfast support whenever and wherever
          you need it
        </p>
        <div className="my-5 flex justify-center">
          <a
            rel="noreferrer"
            href="http://play.google.com/store/apps/details?"
            target="_blank"
          >
            {/* <AppButton filled>Download app</AppButton> */}
          </a>
        </div>
        <ul
          data-aos="fade-up"
          className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 flex-wrap items-start mt-10"
        >
          <li className=" flex flex-col items-center xl:mt-0 mt-10">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">01.</span>CHOOSE YOUR MENTOR.
            </h6>
            <p className="text-gray-500 text-center">
              Choose your pick, from the list of our experts.
            </p>
            <div className="mt-10">
              <ChooseUsIcon width={250} height={250} />
            </div>
          </li>
          <li className=" flex flex-col items-center xl:mt-0 mt-10">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">02.</span> SAY HI OVER A CHAT OR
              CALL
            </h6>
            <p className="text-gray-500 text-center">
              Start a conversation with them.
            </p>
            <div className="mt-16">
              <CallAndVideoIcon width={250} height={250} />
            </div>
          </li>
          <li className=" flex flex-col items-center xl:mt-0 mt-10">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">03.</span> GET HELP INSTANTLY
            </h6>
            <p className="text-gray-500 text-center">
              Share your problem and heal beautifully
            </p>
            <div className="mt-10">
              <HelpAndSupport width={250} height={250} />
            </div>
          </li>
        </ul>
      </div>

      <div className="xl:w-[40%] mx-auto border shadow-xl  shadow-primary-100 rounded-lg p-6 flex flex-col justify-end items-center">
        <h6 className="text-2xl font-extrabold text-primary-500">
          Reach Out Our Experts Now!
        </h6>
        <p className="text-lg text-center py-5">
          Get professional advice and steadfast support whenever and wherever
          you need it.
        </p>
        <p
          className="text-md text-primary-500 cursor-pointer"
          onClick={() => {
            if (!authentication) {
              navigate("/sign-in");
            } else {
              navigate("/mentor/list");
            }
          }}
        >
          Talk to us @ just ₹1
        </p>
      </div>

      {/* section three */}
      <div data-aos="fade-up" className="container mx-auto w-[80%] mt-20">
        <h6 className="text-4xl capitalize text-center font-semibold font-sans2">
          meet our <span className="text-primary-500">experts</span>
        </h6>
      </div>

      {/* section four */}
      <section className=" bg-primary-100 mb-10 mt-10 py-10">
        <div className="lg:mx-auto pl-5 xl:border=">
          <Swiper
            spaceBetween={10}
            autoplay
            className={"mySwiper"}
            height={520}
            modules={[Autoplay]}
            pagination={{
              clickable: true,
            }}
            navigation
            breakpoints={{
              0: {
                slidesPerView: 1.5,
                spaceBetween: 3,
              },
              // Small tablets
              768: {
                slidesPerView: 2.5,
                spaceBetween: 5,
              },
              // Tablets and small desktops
              992: {
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
              // Large desktops
              1200: {
                slidesPerView: 3.5,
                spaceBetween: 15,
              },
              1300: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
            }}
          >
            {mentor?.data?.map(({ name, category, _id, image }) => (
              <SwiperSlide
                className="flex flex-col justify-between items-stretch rounded-md"
                key={_id}
              >
                <img
                  src={image}
                  className="object-cover aspect-square object-top"
                  alt={name.firstName}
                />
                <div className="py-5 px-5 flex flex-col justify-between border bg-white rounded-b-lg">
                  <h6 className="text-xl font-libre capitalize truncate">
                    {name?.firstName} {name?.lastName}
                  </h6>
                  <ul className="list list-disc pl-3 text-sm">
                    {(category as ICategoryProps[]).map((props) => (
                      <li className=" list-item uppercase text-gray-500 my-1">
                        {props.title}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end items-center gap-5 w-full">
                    <AppButton
                      onClick={() => {
                        if (!authentication) {
                          navigate("/sign-in");
                        } else {
                          navigate("/mentor/list");
                        }
                      }}
                      filled
                    >
                      Connect Now
                    </AppButton>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* section five */}
      <div
        data-aos="fade-up"
        className="xl:w-[80%] mx-auto flex flex-col items-center mt-10 pt-10"
      >
        {/* <AppButton filled>Download the app here</AppButton> */}
        <div data-aos="fade-up">
          <p className="text-xl font-sans2 text-center">
            “Change your conception of yourself and you will automatically
            change the world in which you live. Do not try to change people;
            they are only messengers telling you who you are. Revalue yourself
            and they will confirm the change.”
          </p>
          <blockquote className="p-4 my-4 w-auto border-s-4 border-primary-300 bg-primary-50 text-primary-500 text-xl text-center">
            -Neville Goddard
          </blockquote>
        </div>
      </div>
      {/* section seven */}
      {FAQ?.length !== 0 && (
        <div
          data-aos="fade-up"
          className="xl:w-[70%] xl:p-0 px-3 my-20 mx-auto py-20"
        >
          <h6 className="text-4xl font-bold capitalize text-center font-sans2">
            Frequently asked <span className="text-primary-500">questions</span>
          </h6>
          <div className="mt-10">
            {FAQ?.map(({ question, answer }, i: number) => (
              <div
                data-aos="fade-up"
                key={i}
                onClick={() => dispatch(handleFaq(i))}
              >
                <div className="border-b py-8 border-gray-900">
                  <div className="flex items-center justify-between">
                    <h6
                      className={clsx(
                        `text-lg font-semibold capitalize`,
                        i === active && "text-primary-500"
                      )}
                    >
                      {/* {i + 1} */}
                      {question}
                    </h6>
                    {i === active ? (
                      <FaAngleUp size={26} className="text-primary-500" />
                    ) : (
                      <FaAngleDown size={26} />
                    )}
                  </div>
                  {i === active && (
                    <p
                      className="prose customContent"
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MainLayout>
  );
};
