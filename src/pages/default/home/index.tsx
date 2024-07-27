import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import {
  AppButton,
  CallAndVideoIcon,
  ChooseUsIcon,
  DayHours,
  ExportMentors,
  HelpAndSupport,
  HumanBrainIcon,
  ServicesCard,
  ShopUser,
  TestimonialsCard,
  TwoHands,
} from "../../../component";
import {
  handleAgeGroupSelection,
  handleAuthModal,
  handleFaq,
  useAuthenticationSlice,
  useFaqSlice,
  useHomeSlice,
} from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import clsx from "clsx";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import {
  useGetAllFaqQuery,
  useGetAllSubCategoryQuery,
  useGetMentorsListQuery,
} from "../../../redux/rtk-api";
import { getUserToken } from "../../../utils";
import { AiOutlineCheck, AiOutlinePhone } from "react-icons/ai";
import { FiChevronUp } from "react-icons/fi";
export const DefaultHome = () => {
  const { active } = useFaqSlice();
  const { data: mentor } = useGetMentorsListQuery();
  const { authentication } = useAuthenticationSlice();
  const { problems, helpPoints, selectedAgeGroup } = useHomeSlice();

  const {
    // data: subCategory,
    isError: isSubCategoryError,
    isLoading: isSubCategoryLoading,
    error: subCategoryError,
  } = useGetAllSubCategoryQuery();

  const {
    data: faq,
    isError: isFaqError,
    error: faqError,
    isLoading: isFaqLoading,
  } = useGetAllFaqQuery();

  const dispatch = useAppDispatch();

  const localStore = getUserToken();
  useEffect(() => {
    if (isSubCategoryError) {
      console.log(subCategoryError);
      // dispatch(handleError((subCategoryError as any).data));
    }
    if (isFaqError) {
      console.log(faqError);
      // dispatch(handleError((faqError as any).data.message));
    }
  }, [
    authentication,
    dispatch,
    isSubCategoryError,
    subCategoryError,
    isFaqError,
    faqError,
    localStore,
  ]);

  return (
    <MainLayout loading={isSubCategoryLoading || isFaqLoading}>
      <div className="z-50 right-10 bottom-10 bg-primary-500 p-3 rounded-xl fixed text-white shadow-xl">
        <a href="#sectionOne" className="w-full h-full">
          <FiChevronUp size={30} />
        </a>
      </div>
      {/* section one */}
      <div
        id="sectionOne"
        className={clsx(
          `flex items-center gap-10 py-10 bg-gradient-to-bl flex-wrap-reverse flex-row-reverse`,
          "from-primary-200 to-white"
        )}
      >
        <div className="flex-1 p-10">
          <h3 className="text-2xl mt-3 capitalize font-bold font-sans2 whitespace-pre-wrap">
            DISCOVER LIFE’S BRIGHTER SIDE WITH YOUR PERSONAL COACHES AT
            ALTERBUDDY :
          </h3>
          <ul className="my-5">
            <li className="flex items-center gap-3">
              <div className=" text-primary-500 p-2 rounded-full">
                <AiOutlineCheck size={30} />
              </div>
              <p className="text-gray-500 capitalize">MENTAL HEALTH BUDDIES</p>
            </li>
            <li className="flex items-center gap-3">
              <div className=" text-primary-500 p-2 rounded-full">
                <AiOutlineCheck size={30} />
              </div>
              <p className="text-gray-500 capitalize">COMPASSIONATE HEALERS </p>
            </li>
            <li className="flex items-center gap-3">
              <div className=" text-primary-500 p-2 rounded-full">
                <AiOutlineCheck size={30} />
              </div>
              <p className="text-gray-500 capitalize">MANIFESTATION GENIES</p>
            </li>
          </ul>
          <p className="text-xl font-libre font-semibold">
            Take your first step to create a life you desire.
          </p>
          <div className="">
            <div className="flex items-center mt-10 gap-5">
              <div onClick={() => dispatch(handleAuthModal())}>
                <AppButton filled>
                  <AiOutlinePhone size={26} className="rotate-90" />
                  <span>talk to buddy</span>
                </AppButton>
              </div>
              {/* <div>
                <FaGooglePlay className="fill-primary-500" size={50} />
              </div>
              <div className="">
                <FaAppStore size={50} className="fill-primary-500" />
              </div> */}
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
      <div className="mt-20 py-20">
        <h6 className="text-4xl text-center capitalize font-sans2">
          We Understand your{" "}
          <span className="font-semibold text-primary-500">
            Problems/Traumas
          </span>
        </h6>

        <p className="xl:w-[80%] text-gray-600 mx-auto text-center">
          NOTE: (The problems mentioned in a specific age band do not typically
          fall in that category only. The problems can resonate with anyone )
        </p>
        <div className="mt-10 justify-center xl:gap-20 gap-3 flex flex-row px-3">
          {problems.map(({ age, id }, i) => (
            <button
              key={i}
              type="button"
              onClick={() => dispatch(handleAgeGroupSelection(id))}
              className={clsx(
                "border-2 border-gray-400 px-5 py-2 rounded-full",
                selectedAgeGroup === id &&
                  "bg-primary-500 text-white border-2 border-transparent"
              )}
            >
              <h6 className="capitalize xl:text-sm text-xs font-sans2 text-center font-semibold">
                Age Group {age}
              </h6>
            </button>
          ))}
        </div>
        <div className="border py-20 border-primary-500 px-10 xl:w-[80%] rounded-md  mt-10 xl:mx-auto mx-2">
          <ul className="list-disc grid xl:grid-cols-2 gap-x-5 items-start xl:w-[60%] mx-auto">
            {problems[selectedAgeGroup].points.map((elements, i) => (
              <li key={i}>{elements}</li>
            ))}
            <ul className="list-desc grid xl:grid-cols-1 gap-x-5">
              <li></li>
            </ul>
            <ul className="grid xl:grid-cols-1 gap-x-5">
              {problems[selectedAgeGroup].subPoints?.map((element2, i) => (
                <li key={i}>- {element2}</li>
              ))}
            </ul>
          </ul>
        </div>
        <div className="grid xl:grid-cols-2 xl:w-[90%] mx-auto xl:mt-20 mt-10 px-3 xl:px-0">
          <div>
            <p className=" mt-10 text-xl text-gray-500 xl:w-[80%] mx-auto whitespace-pre-line text-justify">
              People and sometimes the situations around us are so toxic, that
              we feel everything bad happens only to us, making us bitter. And
              unconsciously, we send so many negative energies to the universe,
              that it has no choice but to return the same back to us, making us
              even more miserable.
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
              className="w-[70%] rounded-lg"
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-2 xl:w-[90%] mx-auto mt-5">
          <div className="flex items-center justify-center">
            <img
              src="https://images.pexels.com/photos/6624287/pexels-photo-6624287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="w-[70%] rounded-lg"
            />
          </div>
          <p className="text-justify mt-10 text-xl text-gray-500 xl:w-[80%] mx-auto whitespace-pre-line">
            And we are here to help you become the best version of yourself with
            only a positive aura all around you, making sure the universe is at
            your side granting you everything you desire. And we are here to
            help you become the best version of yourself with only a positive
            aura all around you, making sure the universe is at your side
            granting you everything you desire.
            {"\n\n"}
            We get you out of all your traumas and negativity, however bad and
            toxic the situation is for you, healing your wounds from within, at
            the cellular level.
            {"\n\n"}
            We believe that everyone deserves to live a life filled with joy and
            fulfillment. And we are here to give you exactly that.
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <AppButton filled>TALK TO US</AppButton>
      </div>
      <div className="mb-40 mt-20 xl:w-[90%] mx-auto px-3">
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          HOW DO WE{" "}
          <span className="font-semibold text-primary-500">HELP?</span>
        </h6>
        <div className="w-full xl:grid px-3 gap-y-10 xl:grid-cols-12 gap-10 mt-10 items-center lg:grid-cols-6 md:grid-cols-12">
          {helpPoints.map(({ body, image, label, path }, i) => (
            <div className="xl:col-span-3 md:col-span-2 col-span-12 xl:mt-0 mt-10">
              <ServicesCard
                hideReadMore
                body={body}
                image={image}
                label={label}
                path={path}
                key={i}
              />
            </div>
          ))}
        </div>
      </div>

      {/* section two */}
      <div className="my-40 container mx-auto xl:w-[80%]">
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          why <span className="font-semibold text-primary-500">Choose Us?</span>
        </h6>
        <p className="text-center text-gray-500 mt-5">
          At AlterBuddy, we recognize the significance of fostering a positive
          mindset and nurturing mental well-being. That's why we offer trusted
          buddies who are equipped to navigate through any obstacles with you
        </p>
        <div className="my-20 gap-5 grid xl:grid-cols-3 md:grid-cols-3 lg:grid-cols-2">
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
                Our team offers 1 on 1 tailored guidance and support to address
                your unique needs and goals.
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
        <div className="grid gap-10 items-center xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-6 sm:grid-cols-1 grid-cols-1">
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

      <div className="w-[80%] p-3 mx-auto my-20">
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
        <ul className="grid xl:grid-cols-3 md:grid-cols-3 grid-cols-1 flex-wrap items-start mt-10 gap-20">
          <li className=" flex flex-col items-center  xl:mt-0 mt-10">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">01.</span>CHOOSE YOUR MENTOR.
            </h6>
            <p className="text-gray-500 text-center">
              Choose your pick, from the list of our experts.
            </p>
            <div className="mt-10">
              <ChooseUsIcon height={300} />
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
              <CallAndVideoIcon height={270} />
            </div>
          </li>
          <li className=" flex flex-col items-center  xl:mt-0 mt-10">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">03.</span> GET HELP INSTANTLY
            </h6>
            <p className="text-gray-500 text-center">
              Share your problem and heal beautifully
            </p>
            <div className="mt-10">
              <HelpAndSupport height={350} />
            </div>
          </li>
        </ul>
      </div>

      <div className="">
        <div className="container mx-auto pt-20">
          <h6 className="text-4xl capitalize text-center font-sans2">
            Hear from{" "}
            <span className="text-primary-500 font-semibold">Our clients</span>
          </h6>
          <p className="font-extralight text-center text-md text-gray-500 my-5">
            You do not have to take our word for it. Read through the
            testimonials of users who transformed themselves with the guidance
            of Alterbuddy Experts.
          </p>
        </div>
        <div className="flex gap-5 relative px-10 overflow-x-scroll items-center no-scrollbar">
          <div className="w-[400px]">
            <TestimonialsCard
              body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
              user="Samantha Smith"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="AlterBuddy helped me find the perfect therapist who understood my needs and supported me through a difficult time in my life."
              user="Robert Cooper"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="The self-care tools provided by AlterBuddy have been a game-changer for me. I feel more in control of my mental health now."
              user="Robert Rose
"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
              user=" Samantha Smith"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
              user="Samantha Smith"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="AlterBuddy helped me find the perfect therapist who understood my needs and supported me through a difficult time in my life."
              user="Robert Cooper"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="The self-care tools provided by AlterBuddy have been a game-changer for me. I feel more in control of my mental health now."
              user="Robert Rose
"
            />
          </div>
          <div className="w-[400px]">
            <TestimonialsCard
              body="I was hesitant to try online therapy but AlterBuddy made it easy and convenient for me. I highly recommend it."
              user=" Samantha Smith"
            />
          </div>
        </div>
      </div>
      {/* section three */}
      <div className="container mx-auto w-[80%] mt-20">
        <h6 className="text-4xl capitalize text-center font-semibold font-sans2">
          meet our <span className="text-primary-500">experts</span>
        </h6>
        <p className="font-extralight text-center text-md text-gray-500 my-5">
          This is your Team section. It's a great place to introduce your team
          and talk about what makes it special, such as your culture and work
          philosophy. Don't be afraid to illustrate personality and character to
          help users connect with your team.
        </p>
      </div>

      {/* section four */}
      <div className="bg-primary-200 py-20 pb-28 ">
        <div className="container mx-auto grid items-center px-2 justify-center grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-10">
          {mentor?.data
            .map(({ name, _id, accountStatus, category, subCategory }) => (
              <ExportMentors
                status={accountStatus.verification}
                key={_id}
                image="https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                name={`${name?.firstName} ${name?.lastName}`}
                path={`/user/mentor/details/${_id}`}
                specialist={category?.title}
                subCategory={subCategory}
              />
            ))
            .reverse()
            .sort((a, b) => {
              return a.props.specialist - b.props.specialist;
            })}
        </div>
      </div>

      {/* section five */}
      <div className="xl:w-[80%] mx-auto my-20 flex flex-col items-center">
        <AppButton filled>Download the app here</AppButton>
        <div>
          <p className="text-xl font-sans2 text-center py-5">
            “Change your conception of yourself and you will automatically
            change the world in which you live. Do not try to change people;
            they are only messengers telling you who you are. Revalue yourself
            and they will confirm the change.”
          </p>
          <blockquote className="p-4 my-4 w-auto border-s-4 border-primary-300 bg-primary-50 text-primary-500 text-xl text-left">
            -Neville Goddard
          </blockquote>
        </div>
      </div>
      {/* section seven */}
      {faq?.data.length !== 0 && (
        <div className="xl:w-[70%] xl:p-0 px-3 my-20 mx-auto py-20">
          <h6 className="text-4xl font-bold capitalize text-center font-sans2">
            Frequently asked questions
          </h6>
          <div className="mt-10">
            {faq?.data.map(({ question, answer }, i: number) => (
              <div key={i} onClick={() => dispatch(handleFaq(i))}>
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
                    <p className="mt-3 font-extralight">{answer}</p>
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
