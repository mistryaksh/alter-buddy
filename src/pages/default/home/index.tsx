import React, { useEffect } from "react";
import { MainLayout } from "../../../layout";
import {
  AppButton,
  DayHours,
  ExportMentors,
  HumanBrainIcon,
  ServicesCard,
  ShopUser,
  TestimonialsCard,
  TwoHands,
} from "../../../component";
import { Link } from "react-router-dom";
import {
  handleAuthModal,
  handleFaq,
  useAuthenticationSlice,
  useFaqSlice,
  useHomeSlice,
} from "../../../redux/features";
import { useAppDispatch } from "../../../redux";
import clsx from "clsx";
import {
  FaAngleDown,
  FaAngleUp,
  FaGooglePlay,
  FaAppStore,
} from "react-icons/fa";
import {
  useGetAllFaqQuery,
  useGetAllSubCategoryQuery,
  useGetMentorsListQuery,
} from "../../../redux/rtk-api";
import { getUserToken } from "../../../utils";
import { AiOutlineCheck, AiOutlinePhone } from "react-icons/ai";
export const DefaultHome = () => {
  const { active } = useFaqSlice();
  const { data: mentor } = useGetMentorsListQuery();
  const { authentication } = useAuthenticationSlice();
  const { problems, helpPoints } = useHomeSlice();

  const {
    data: subCategory,
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
      {/* section one */}
      <div
        className={clsx(
          `flex items-center gap-10 py-10 bg-gradient-to-bl `,
          "from-primary-200 to-white"
        )}
      >
        <div className="flex-1 p-10">
          <h3 className="text-2xl mt-3 capitalize font-bold font-sans2 whitespace-pre-wrap">
            DISCOVER LIFE’S BRIGHTER SIDE WITH YOUR PERSONAL COACHES AT ALTER
            BUDDY :
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
          <p>Take your first step to create a life you desire.</p>
          <div className="">
            <div className="flex items-center mt-10 gap-5">
              <div onClick={() => dispatch(handleAuthModal())}>
                <AppButton filled>
                  <AiOutlinePhone size={26} className="rotate-90" />
                  <span>talk to buddy</span>
                </AppButton>
              </div>
              <div>
                <FaGooglePlay className="fill-primary-500" size={50} />
              </div>
              <div className="">
                <FaAppStore size={50} className="fill-primary-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img
            src="https://static.wixstatic.com/media/7cc31a_fd24e6bc5c1147c0a1e69922ca52d1b0~mv2.png/v1/fill/w_708,h_610,al_c,q_90,enc_auto/7cc31a_fd24e6bc5c1147c0a1e69922ca52d1b0~mv2.png"
            alt=""
          />
        </div>
      </div>
      <div className="my-20 py-20">
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          WE UNDERSTAND YOUR{" "}
          <span className="font-semibold text-primary-500">
            PROBLEMS/TRAUMAS
          </span>
        </h6>
        <p className="text-center text-gray-500 xl:w-[80%] mx-auto">
          People and sometimes the situations around us are so toxic, that we
          feel everything bad happens only to us, making us bitter. And
          unconsciously, we send so many negative energies to the universe, that
          it has no choice but to return the same back to us, making us even
          more miserable.
        </p>
        <div className="mt-10 justify-center gap-20 flex flex-col px-3">
          {problems.map(({ age, points }) => (
            <div className="shadow-lg py-10 border-2 rounded-md overflow-hidden">
              <h6 className="capitalize text-xl text-center font-semibold text-gray-900">
                Age Group {age}
              </h6>
              <div className="marquee flex flex-row gap-10 items-start my-3">
                {points.map((prop, i) => (
                  <div
                    key={i}
                    className="w-auto hover:bg-primary-500 group text-nowrap px-5 py-2 border border-primary-500 rounded-full"
                  >
                    <p className="text-primary-500 group-hover:text-white capitalize select-none">
                      <span className="pr-3">{i + 1}</span>
                      {prop}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                <AppButton filled>Get in touch with us?</AppButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="my-40 ">
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          HOW DO WE{" "}
          <span className="font-semibold text-primary-500">HELP?</span>
        </h6>
        <div className="w-full xl:grid px-3 xl:grid-cols-12 gap-10 mt-10 items-center lg:grid-cols-6 md:grid-cols-12">
          {helpPoints.map(({ body, image, label, path }, i) => (
            <div className="col-span-3">
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
      <div className="my-40 container mx-auto w-[80%]">
        <h6 className="font-light text-4xl text-center capitalize font-sans2">
          why{" "}
          <span className="font-semibold text-primary-500">AlterBuddy?</span>
        </h6>
        <p className="text-center text-gray-500">
          At AlterBuddy, we recognize the significance of fostering a positive
          mindset and nurturing mental well-being. That's why we offer trusted
          buddies who are equipped to navigate through any obstacles with you
        </p>
        <div className="my-20 gap-5 flex">
          <div className=" p-4 rounded-lg mb-4 gap-3 w-full flex-col flex items-center">
            <img
              src="https://images.pexels.com/photos/4672717/pexels-photo-4672717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="mb-4 rounded-lg"
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
              src="https://images.pexels.com/photos/3761504/pexels-photo-3761504.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt=""
              className=" mb-4 rounded-lg"
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
          <div className=" p-4 rounded-lg mb-4  gap-3 w-full flex items-center  flex-col">
            <img
              src="https://images.pexels.com/photos/4672717/pexels-photo-4672717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
              className="mb-4 rounded-lg"
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
        <div className="grid grid-cols-12 gap-10 items-center xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-6">
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
        <h6 className="text-5xl capitalize text-left font-sans2">
          How Does It <span className="text-primary-500">Works</span>
        </h6>
        <div className="mt-10 flex justify-start">
          <a
            rel="noreferrer"
            href="http://play.google.com/store/apps/details?"
            target="_blank"
          >
            <AppButton filled>Download app</AppButton>
          </a>
        </div>
        <ul className="flex flex-wrap items-start mt-10">
          <li className="flex-1 flex flex-col items-center">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">01.</span>CHOOSE YOUR MENTOR.
            </h6>
            <p className="text-gray-500 text-center">
              Choose your pick, from the list of our experts.
            </p>
            <img
              src={require("../../../assets/image/app-home-user.jpeg")}
              className="mt-5 w-[70%]"
              alt=""
            />
          </li>
          <li className="flex-1  flex flex-col items-center">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">02.</span> SAY HI OVER A CHAT OR
              CALL
            </h6>
            <p className="text-gray-500 text-center">
              Start a conversation with them.
            </p>
            <img
              src={require("../../../assets/image/app-mentor-list.jpeg")}
              className="mt-5 w-[70%]"
              alt=""
            />
          </li>
          <li className="flex-1 flex flex-col items-center">
            <h6 className="text-gray-900 text-xl font-bold">
              <span className="select-none">03.</span> GET HELP INSTANTLY
            </h6>
            <p className="text-gray-500 text-center">
              Share your problem and heal beautifully
            </p>
            <img
              src={require("../../../assets/image/app-chat-user.jpeg")}
              className="mt-5 w-[70%]"
              alt=""
            />
          </li>
        </ul>
      </div>

      <div className="">
        <div className="container mx-auto pt-20">
          <h6 className="text-5xl capitalize text-left font-sans2">
            Client{" "}
            <span className="text-primary-500 font-semibold">Testimonials</span>
          </h6>
          <p className="font-extralight text-md text-gray-500 my-5">
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
        <h6 className="text-5xl capitalize text-left font-semibold font-sans2">
          meet our <span className="text-primary-500">experts</span>
        </h6>
        <p className="font-extralight text-md text-gray-500 my-5">
          This is your Team section. It's a great place to introduce your team
          and talk about what makes it special, such as your culture and work
          philosophy. Don't be afraid to illustrate personality and character to
          help users connect with your team.
        </p>
      </div>

      {/* section four */}
      <div className="bg-primary-200 py-20 pb-28 ">
        <div className="container mx-auto grid items-center px-2 justify-center grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-10 md:col-span-12">
          {mentor?.data
            .map(({ name, _id, accountStatus, category, subCategory }) => (
              <ExportMentors
                status={accountStatus.verification}
                key={_id}
                image="https://static.wixstatic.com/media/413494fe1952433685bef1305e765971.jpg/v1/fill/w_574,h_646,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Personal%20Trainer.jpg"
                name={`${name?.firstName} ${name?.lastName}`}
                path={`/user/mentor/details/${_id}`}
                specialist={category.title}
                subCategory={subCategory}
              />
            ))
            .reverse()}
        </div>
      </div>

      {/* section six */}
      <div>
        <div className=" mx-auto w-[70%] pt-20 pb-10">
          <h6 className="text-5xl capitalize text-left font-sans2">
            We got your{" "}
            <span className="text-primary-500 font-semibold">back for</span>
          </h6>
        </div>
        <div className="xl:w-[90%] mx-auto px-5">
          <div className="w-full xl:grid xl:grid-cols-3 gap-10 mt-10 lg:grid-cols-3 md:grid-cols-12 sm:grid-cols-12 grid-cols-4">
            {subCategory?.data.map(({ label, desc, _id }) => (
              <div className="" key={_id}>
                <ServicesCard
                  body={desc}
                  image="https://res.cloudinary.com/nowandme/image/upload/v1699332230/landing/services/card/sadness_eylxtc.webp"
                  label={label}
                  path={`/category/${_id}`}
                />
              </div>
            ))}
          </div>
          <div className="w-full text-center py-10">
            <Link
              to="/services"
              className="hover:underline font-extralight text-lg text-primary-500 text-center"
            >
              Browse all services
            </Link>
          </div>
        </div>
      </div>

      {/* section five */}

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
