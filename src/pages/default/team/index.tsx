import React from "react";
import { MainLayout } from "../../../layout";

export const TeamPage = () => {
  interface MarketingHeadProps {
    name: string;
    title: string;
    image?: string;
    company: string;
    responsibilities: string[];
    expertise: {
      yearsOfExperience?: number;
      specializations?: string[];
      skills?: string[];
    };
    contact: {
      email: string;
    };
    uniqueFact: string;
    desc: string;
  }

  const teamMembers: MarketingHeadProps[] = [
    {
      image: require("../../../assets/team-members/mudit.jpeg"),
      name: "Mudit Gambhir",
      desc: "As the Founder of AlterBuddy, I am responsible for guiding the vision and direction of the platform. My focus is on building and nurturing our communities—whether it's manifestation, healing, or mental health—ensuring that each person who visits leaves feeling happier and more connected.",
      title: "Founder",
      company: "AlterBuddy",
      responsibilities: [
        "Guiding the vision and direction of the platform",
        "Building and nurturing communities related to manifestation, healing, and mental health",
      ],
      expertise: {
        yearsOfExperience: 5,
        specializations: ["Spirituality", "Manifestation"],
        skills: [
          "Community development",
          "Engagement",
          "Strategic planning",
          "Leadership",
        ],
      },
      contact: {
        email: "info@alterbuddy.com", // replace with actual email
      },
      uniqueFact:
        "I’ve always believed that happiness should be shared. That’s why I created AlterBuddy—to spread joy and positivity to everyone who joins us. My goal is simple: if you visit us, you leave happier.",
    },
    {
      image: require("../../../assets/team-members/ramandeep.jpeg"),
      name: "Ramandeep Kaur",
      desc: "As a Healer at AlterBuddy, I guide others on their spiritual paths, helping them heal from past traumas and uncover deeper truths. My work involves leading meditation sessions and providing personalized healing practices that align the body, mind, and soul.",
      title: "Healer",
      company: "AlterBuddy",
      responsibilities: [
        "Guiding others on their spiritual paths",
        "Leading meditation sessions",
        "Providing personalized healing practices",
      ],
      expertise: {
        specializations: [
          "Spiritual Healing",
          "Meditation Techniques",
          "Third Eye Activation",
          "Shadow Work",
          "Karmic Cleansing",
        ],
      },
      contact: {
        email: "info@alterbuddy.com", // replace with actual email
      },
      uniqueFact:
        "From the moment my third eye opened, I knew I was meant to help others heal. Spirituality isn't just something I practice—it's who I am.",
    },
    {
      image: require("../../../assets/team-members/placeholder.png"),
      desc: "As the Content Writer at AlterBuddy, I craft content that connects with our audience on a deep level. From blog posts to web copy, my goal is to ensure that every word reflects our brand’s mission of spreading happiness and support.",
      name: "Priyanka Jaiswal",
      title: "Content Writer",
      company: "AlterBuddy",
      responsibilities: [
        "Crafting content that connects with the audience",
        "Ensuring every word reflects the brand’s mission",
      ],
      expertise: {
        specializations: [
          "Creative Writing",
          "Storytelling",
          "SEO Optimization",
          "Content Strategy",
        ],
      },
      contact: {
        email: "info@alterbuddy.com", // replace with actual email
      },
      uniqueFact:
        "I love writing stories inspired by real-life characters, much like how I guide readers through AlterBuddy's services. If you ever feel down, read one of them—you might just be the hero.",
    },
    {
      image: require("../../../assets/team-members/placeholder.png"),
      desc: "As the CEO and psychologist at AlterBuddy, I bring self-discovery and growth vibes from The Alchemist to guide others through their mental health journeys. My goal is to help people navigate life’s challenges, combining empathy with evidence-based practice.",
      name: "Md. Wasti Laskar",
      title: "CEO & Psychologist",
      company: "AlterBuddy",
      responsibilities: [
        "Guiding mental health journeys",
        "Combining empathy with evidence-based practice",
      ],
      expertise: {
        specializations: [
          "Mental Health Counseling",
          "Cognitive Behavioral Therapy (CBT)",
          "Stress Management",
          "Personal Growth and Development",
        ],
      },
      contact: {
        email: "info@alterbuddy.com", // replace with actual email
      },
      uniqueFact:
        "Whether I’m in the ring as a boxer or helping someone achieve a breakthrough, I tackle both physical and mental challenges with equal intensity. And, as much as I love the mental focus, show me a cat, and I’ll completely lose my train of thought!",
    },
    {
      image: require("../../../assets/team-members/placeholder.png"),
      name: "Swarup Kamerkar",
      desc: "As the Marketing Head of Alter Buddy and the Founder of Creative Corner, I am responsible for steering our brand's growth and presence in the digital world. My focus is on crafting compelling strategies that resonate with our audience, ensuring that our message reaches the right people at the right time.",
      title: "Marketing Head",
      company: "AlterBuddy",
      responsibilities: [
        "Steering brand's growth and presence in the digital world",
        "Crafting compelling strategies",
        "Ensuring the message reaches the right people at the right time",
      ],
      expertise: {
        yearsOfExperience: 3,
        specializations: ["Digital Marketing", "Graphic Design"],
        skills: [
          "Building brand identity",
          "Increasing online engagement",
          "Strategic planning",
          "Execution",
        ],
      },
      contact: {
        email: "info@creativecornerindia.in",
      },
      uniqueFact:
        "I believe in the power of creativity and strategy combined. My mission is to create impactful digital experiences that not only engage but also inspire. If you interact with our brand, I want you to leave feeling more connected and informed.",
    },
    {
      image: require("../../../assets/team-members/placeholder.png"),
      name: "SHARDUL RASAL",
      desc: "As the Technical Head of AlterBuddy, I am responsible for overseeing and managing all technical aspects of our platform. My focus is on ensuring that our technology is robust, efficient, and scalable, providing a seamless experience for all our users.",
      title: "TECHNICAL HEAD",
      company: "AlterBuddy",
      responsibilities: [
        "Over 6 years of experience in the tech industry",
        "Specialized in software development and system architecture",
        "Expertise in maintaining and optimizing technical infrastructure",
        "Proficient in leading technical teams and driving innovation",
      ],
      expertise: {
        yearsOfExperience: 3,
        specializations: [],
        skills: [],
      },
      contact: {
        email: "info@creativecornerindia.in",
      },
      uniqueFact:
        "I am passionate about leveraging technology to create solutions that make a difference. At AlterBuddy, my goal is to ensure that our platform runs smoothly, so every user can focus on their journey to happiness and healing.",
    },
  ];

  return (
    <MainLayout>
      <div className="py-20 pb-28 container mx-auto" id="sectionOne">
        <h6 className="text-4xl mb-10 capitalize font-sans2">
          Meet <span className="text-primary-500">our team</span>
        </h6>
        <div className="container mx-auto">
          {teamMembers
            .map(
              (
                {
                  name,
                  company,
                  contact,
                  expertise,
                  responsibilities,
                  title,
                  uniqueFact,
                  desc,
                  image,
                },
                i
              ) => (
                <div
                  data-aos="fade-up"
                  key={i}
                  className="flex xl:lg:md:flex-col xl:flex-row lg:flex-row md:flex-row items-center my-4 gap-5  rounded-md"
                >
                  {i % 2 === 0 ? (
                    <div className="flex xl:lg:md:flex-row items-start bg-white shadow-lg rounded-lg overflow-hidden mx-auto max-w-4xl">
                      <div
                        className="
                      w-1/3 h-full object-cover"
                      >
                        <>
                          <img className="" src={image} alt={`${name}'s`} />
                          <p className="font-semibold my-2 pl-3">Contact:</p>
                          <p className="text-gray-700 pl-3">
                            Email:{" "}
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-blue-500"
                            >
                              {contact.email}
                            </a>
                          </p>
                        </>
                      </div>
                      <div className="p-6 w-2/3">
                        <div className="font-bold text-2xl mb-2">{name}</div>
                        <h2 className="text-xl text-gray-700 mb-2">{title}</h2>
                        <p className="text-gray-500 mb-4">{company}</p>
                        <p className="text-gray-700 mb-4">{desc}</p>
                        <p className="font-semibold mb-2">Responsibilities:</p>
                        <ul className="list-disc list-inside mb-4">
                          {responsibilities.map((resp, index) => (
                            <li key={index} className="text-gray-700">
                              {resp}
                            </li>
                          ))}
                        </ul>
                        <p className="font-semibold mb-2">Expertise:</p>
                        <ul className="list-disc list-inside mb-4">
                          {expertise.yearsOfExperience && (
                            <li className="text-gray-700">
                              Years of Experience: {expertise.yearsOfExperience}
                            </li>
                          )}
                          {expertise.specializations &&
                            expertise.specializations.length > 0 && (
                              <li className="text-gray-700">
                                Specializations:{" "}
                                {expertise.specializations.join(", ")}
                              </li>
                            )}
                          {expertise.skills && expertise.skills.length > 0 && (
                            <li className="text-gray-700">
                              Skills: {expertise.skills.join(", ")}
                            </li>
                          )}
                        </ul>

                        <p className="italic text-gray-500 mb-4">
                          Unique Fact: {uniqueFact}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl">
                      <div className="p-6 w-2/3">
                        <div className="font-bold text-2xl mb-2">{name}</div>
                        <h2 className="text-xl text-gray-700 mb-2">{title}</h2>
                        <p className="text-gray-500 mb-4">{company}</p>
                        <p className="text-gray-700 mb-4">{desc}</p>
                        <p className="font-semibold mb-2">Responsibilities:</p>
                        <ul className="list-disc list-inside mb-4">
                          {responsibilities.map((resp, index) => (
                            <li key={index} className="text-gray-700">
                              {resp}
                            </li>
                          ))}
                        </ul>
                        <p className="font-semibold mb-2">Expertise:</p>
                        <ul className="list-disc list-inside mb-4">
                          {expertise.yearsOfExperience && (
                            <li className="text-gray-700">
                              Years of Experience: {expertise.yearsOfExperience}
                            </li>
                          )}
                          {expertise.specializations &&
                            expertise.specializations.length > 0 && (
                              <li className="text-gray-700">
                                Specializations:{" "}
                                {expertise.specializations.join(", ")}
                              </li>
                            )}
                          {expertise.skills && expertise.skills.length > 0 && (
                            <li className="text-gray-700">
                              Skills: {expertise.skills.join(", ")}
                            </li>
                          )}
                        </ul>
                        <p className="italic text-gray-500 mb-4">
                          Unique Fact: {uniqueFact}
                        </p>
                      </div>
                      <div
                        className="
                      w-1/3 h-full object-cover"
                      >
                        <>
                          <img className="" src={image} alt={`${name}'s`} />
                          <p className="font-semibold my-2 pl-3">Contact:</p>
                          <p className="text-gray-700 pl-3">
                            Email:{" "}
                            <a
                              href={`mailto:${contact.email}`}
                              className="text-blue-500"
                            >
                              {contact.email}
                            </a>
                          </p>
                        </>
                      </div>
                    </div>
                  )}
                </div>
              )
            )
            .sort()}
        </div>
      </div>
    </MainLayout>
  );
};
