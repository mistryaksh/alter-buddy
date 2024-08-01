import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";

interface ServicesSliceProps {
  howWeWish: {
    mainTitle: string;
    points: string[];
    conclusionTitle: string;
    conclusion: string;
  };
  pageContent: {
    label: string;
    id: number;
    title: string;
    banner: string;
    secondaryImage: string;
    subTitle: string;
    sectionOne: {
      title: string;
      subTitle: string;
      points: string[];
      description: string;
      highlightDescription: string;
    };
    sectionThree: {
      title: string;
      description: string;
    }[];
    sectionFour: {
      image: string;
      points: string[];
    };
    solution?: {
      title: string;
      paragraph: string;
    };
    conclusion: {
      title: string;
      description: string;
      author: string;
    };
  }[];
}

const initialState: ServicesSliceProps = {
  howWeWish: {
    conclusion:
      "With our services,we help you manifest and attract the right energies towards you, with the right mindset.",
    conclusionTitle: "And what if I say that any or all of these are possible?",
    mainTitle:
      "There would come a Genie, who would come out of a lamp and say:",
    points: [
      "You will have the most loving soulmate in the entire universe.",
      "You will have the person you crave for, chase you like crazy.",
      "You will attract plenty of money.",
      "You will have the most awesome career.",
      "You will reach ladders of success like nobody else.",
      "You will live the healthiest Life.",
      "You will have the looks of an angel.",
      "You will live a life of contentment and satisfaction.",
    ],
  },
  pageContent: [
    {
      banner: require("../../assets/image/mental-health-2.jpg"),
      secondaryImage: require("../../assets/image/youssef-naddam-iJ2IG8ckCpA-unsplash.jpg"),
      label: "mental health",
      id: 1,
      title: "Your Journey to Mental Wellness Begins Here",
      subTitle:
        "Find Compassionate Support To Navigate Through Life's Challenges with Confidence",
      sectionOne: {
        title: "WE UNDERSTAND YOUR PAINS:",
        description:
          "Know that you are not alone in these struggles. We've been there too, facing our own battles with anxiety, depression, and uncertainty. We understand the pain of feeling lost, the heaviness of carrying burdens, and the longing for peace and clarity in the midst of chaos.",
        subTitle:
          "The journey of life frequently resembles a narrow road with many unexpected bends and twists. Along the road, we could encounter obstacles that appear impossible to solve, emotional weights that feel impossible to bear, and feelings that might overpower us.",
        highlightDescription:
          "But we also know that it doesn't have to be this way. You deserve to experience a life filled with joy, purpose, and fulfilment. You deserve to embrace your inner peace and navigate life's challenges with confidence and resilience.",
        points: [
          "do you struggle with anxiety",
          "Depression",
          "Stress Management",
          "Self-esteem and self-confidence",
          "Anger management",
          "Coping with grief and loss",
          "Communication skills",
          "Assertiveness training",
          "Boundary setting",
          "Emotional regulation",
          "Goal setting and motivation",
          "Relationship issues",
          "Marriage counselling",
          "Family dynamics",
          "Parenting skills",
          "Work-life balance",
          "Career counselling",
          "Personal growth and development",
          "Coping with life transitions",
          "Addiction recovery",
          "Trauma healing",
          "PTSD (Post-Traumatic Stress Disorder)",
          "Phobias and fears",
          "Sleep disorders and insomnia",
          "Chronic illness management",
        ],
      },
      sectionThree: [
        {
          title: "Cognitive Behavioral Therapy (CBT):",
          description:
            "Together, we'll uncover the root causes of your negative thought patterns and develop practical strategies to challenge and reframe them.",
        },
        {
          title: "Mindfulness Practices:",
          description:
            "Through mindfulness exercises and meditation, we'll cultivate present-moment awareness, allowing you to find peace and clarity in the here and now.",
        },
        {
          title: "Emotion Regulation Techniques: ",
          description:
            "Learn to navigate the ebb and flow of your emotions with grace and resilience, developing healthy coping mechanisms to manage stress and anxiety.",
        },
        {
          title: "Stress Management Strategies:",
          description:
            "Discover personalized tools and techniques to cope with life's stressors, build resilience, and foster a sense of balance and well-being.",
        },
        {
          title: "Positive Psychology Interventions: ",
          description:
            "Together, we'll explore the power of gratitude, optimism, and self-compassion, helping you cultivate a positive mindset and enhance your overall psychological well-being.",
        },
      ],
      sectionFour: {
        image: "",
        points: [
          "Gain a deeper understanding of yourself, your thoughts, and your emotions.",
          "Get acquainted with practical tools and strategies to manage stress, anxiety, and depression.",
          "Strengthen your relationships, communication skills, and emotional resilience.",
          "Cultivate a greater sense of self-esteem, confidence, and well-being.",
          "Experience a renewed sense of purpose, joy, and fulfilment in your life.",
          "Discover the peace and clarity that comes from embracing your inner wisdom and resilience.",
        ],
      },
      solution: {
        title: "The Solution",
        paragraph:
          "At Alter Buddy, we offer more than just a listening ear or a shoulder to lean on. We provide a safe and nurturing space where you can explore your feelings, unpack your thoughts, and embark on a journey of self-discovery and healing.",
      },
      conclusion: {
        title: "IN SHORT ‘YOU GET TO MEET THE BEST VERSION OF YOURSELF’",
        description:
          "As you embark on your journey to mental wellness, remember that every step you take, no matter how small, brings you closer to the peace, joy, and fulfillment you seek. Trust in the process, believe in your strength, and know that you are never alone.",
        author: "- Brene Brown",
      },
    },
    {
      secondaryImage: require("../../assets/image/manifestation-secondary.jpeg"),
      banner: require("../../assets/image/image2.jpg"),
      label: "MANIFESTATION",
      id: 2,
      title: "Ready To Manifest Your Next Level of Abundance and Success?",
      subTitle:
        "We all have that one desire- and that is having a perfect life. A life where we are:",
      sectionOne: {
        title: "",
        subTitle: "",
        description:
          "✔ Living With Your Loving Soulmate\n✔ Scaling the heights of Success \n✔ Making Immense amounts of Money \n✔ Attracting Top- Notch, High-paying Clients\n✔ Having That Perfect Dream Body\n✔ Living a Purpose-Driven Life ",
        points: [],
        highlightDescription: "",
      },
      conclusion: {
        title: "",
        author: "",
        description:
          "True manifestation is not about changing the world around you, but rather, changing the world within you. When you align your thoughts, emotions, and actions with your deepest desires, miracles happen.",
      },
      sectionFour: {
        image: "",
        points: [
          "Living With Your Loving Soulmate",
          "Scaling the heights of Success",
          "Making Immense amounts of Money",
          "Attracting Top- Notch, High-paying Clients",
          "Having That Perfect Dream Body",
          "Living a Purpose-Dranriven Life",
          "Legal Issue",
        ],
      },
      sectionThree: [
        {
          title:
            "And believe us when we say that, we have seen amazing results happening.",
          description:
            "✔  Manifest more money doing what you love\n✔  Reach your next degree of success and impact.\n✔  Attract Dream Clients\n✔ Call in your Soulmate\n✔  Attract new Friendships\n✔  Deepen your Spiritual Connection\n✔  Manifest Weight Loss\n✔  Discover your Purpose\n✔  Manifest Weight Loss\n✔ Uplevel ALL areas of your Life - health, relationships, home, ",
        },
      ],
    },
    {
      secondaryImage: require("../../assets/image/image5.jpg"),
      banner: require("../../assets/image/manifestation2.jpeg"),
      solution: {
        title: "The Solution",
        paragraph:
          "At Alter Buddy, we're more than just listeners. Here, we create a safe sanctuary for your innermost thoughts and emotions to flourish. It's a journey of self-discovery and healing, where every step is embraced with warmth and compassion",
      },
      label: "HEALING",
      id: 3,
      title: "Transform Pain into Power: Embrace Healing and Wholeness",
      subTitle:
        "Release Past Traumas and Experience Profound Healing on a Physical, Emotional, and Spiritual Level",
      sectionOne: {
        title: "WE UNDERSTAND YOUR PAINS:",
        subTitle: "",
        description:
          "Our spiritual and emotional scars from life's journey can be very heavy on our hearts and souls. Unsolved sorrow, unsolved traumas, and lingering emotions can weigh us down and prevent us from reaching true peace and clarity.",
        highlightDescription:
          "Trust us when we say this, that you are not alone. We and many people like us have walked similar paths, facing their battles with pain and uncertainty. And through healing have beautifully found their way back to wholeness.",
        points: [
          "Do you find it difficult to forgive and let go of the hurts and betrayals from the past?",
          "Are you having trouble finding closure and acceptance because of the memories of loss, grief, or abandonment?",
          "Do you wish you could reconnect with your inner self and recover your sense of significance and purpose?",
          "Are you navigating personal problems or mental obstacles and looking for direction and clarity?",
          "Do you long to connect with people, the world, and yourself on a deeper level, yet feel blocked by fear, doubt, or uncertainty?",
        ],
      },
      sectionThree: [
        {
          title: "Tarot Reading: ",
          description:
            "Using a deck of cards to gain insights into past, present, and future events, providing guidance and clarity on life's questions and challenges.",
        },
        {
          title: "Psychic Reading: ",
          description:
            "Tapping into intuitive abilities to perceive information beyond the five senses, offering guidance and predictions about various aspects of life.",
        },
        {
          title: "Automatic Reading: ",
          description:
            "Channeling subconscious thoughts and energies to provide spontaneous insights and messages without conscious control or interpretation.",
        },
        {
          title: "Ancient Divine Reading: ",
          description:
            "Drawing upon ancient divination methods and rituals to access higher wisdom and spiritual guidance for individuals seeking clarity and direction.",
        },
        {
          title: "Numerology Reading: ",
          description:
            "Analysing numbers and their symbolic meanings to uncover insights about personality traits, life paths, and future possibilities.",
        },
        {
          description:
            "Interpreting facial features and expressions to understand personality traits, emotions, and life patterns, providing insights into individual behaviour and character.",
          title: "Face Reading: ",
        },
        {
          description:
            "Using a swinging pendulum to access subconscious knowledge and spiritual guidance, providing yes or no answers to specific questions.",
          title: "Pendulum Reading: ",
        },
        {
          title: "Soul Reading: ",
          description:
            "Connecting with an individual's soul essence to uncover deep-seated truths, past-life experiences, and spiritual lessons for personal growth and healing.",
        },
        {
          description:
            "Gain insights into past, present, and future accessing universal energy for spiritual growth. Our experts help you uncover valuable information and wisdom to support your spiritual journey and personal growth.",
          title: "Akashic Records: ",
        },
        {
          title: "Cord Cutting: ",
          description:
            "A powerful technique for cutting cords with toxic relationships. We facilitate the removal of attachments that may be draining your energy or hindering your progress. This leads to a greater sense of freedom, clarity, and emotional well-being.",
        },
        {
          title: "Mediumship",
          description:
            "Communicating with spirits of the deceased to provide messages, closure, and reassurance to the living, facilitating healing and connection with the spirit world.",
        },
      ],
      sectionFour: {
        image: "",
        points: [
          "Emotional distress",
          "Relationship conflicts",
          "Family issues",
          "Trauma Recovery",
          "Grief and loss",
          "Stress management",
          "Anxiety and panic attacks",
          "Depression",
          "Low self-esteem",
          "Anger management",
          "Addiction recovery",
          "Life transitions",
          "Work-related stress",
          "Burnout prevention",
          "Personal growth and development",
          "Coping with chronic illness",
          "Self-discovery and identity exploration",
          "Healing from past abuse",
          "Spiritual crises",
          "Goal setting and achievement",
          "Communication skills improvement",
          "Boundary setting and assertiveness training",
          "Coping with perfectionism",
          "Overcoming procrastination",
          "Building resilience and coping skills",
        ],
      },
      conclusion: {
        title:
          "IN SHORT ‘WE BECOME YOUR GUIDING ANGEL ON YOUR JOURNEY TOWARDS GROWTH’",
        description:
          "Believe in yourself and your dreams, for you are the architect of your destiny. Let your actions speak louder than your fears.",
        author: "- Brendon Burchard",
      },
    },
    {
      secondaryImage: require("../../assets/image/rant.jpeg"),
      banner: require("../../assets/image/rant-background.jpeg"),
      label: "RANT (VENT IT OUT)",
      id: 4,
      title: "Release, Renew, Reclaim: Embrace relief with our Rant Support",
      subTitle:
        "Let Go of Stress and Tension in a Safe Environment, without the fear of being judged.",
      sectionOne: {
        title: "We understand your pains:",
        description: `Our Rant (Vent it Out) Services, where your feelings find a safe harbour amidst lifes storms.\nWe understand that sometimes, the weight of emotions can be too heavy to carry alone.\n\n" That's why we're here, offering you a compassionate space to unload, express, and release whatevers weighing on your heart and mind.\n\n We believe that sharing your burdens is the first step towards healing, and were here to listen, without judgement or interruption.\nSo take a deep breath, let it all out, and know that you're not alone on this journey.`,
        highlightDescription:
          "Whether you're dealing with work-related stress, relationship issues, or simply need to vent about life's frustrations, our trained listeners are here to offer support and understanding. You can pour out your heart without fear of judgement or interruption, allowing you to release negative emotions and find relief.",
        points: [
          "Overwhelming Stress",
          "Emotional Turmoil",
          "Bottled-up Feelings",
          "Communication Barriers",
          "Mental Exhaustion",
          "Loneliness and Isolation",
          "Decision Paralysis",
          "Lack of Support",
          "Coping with Trauma",
          "Seeking Validation",
        ],
        subTitle: "",
      },
      sectionThree: [
        {
          title: "Active Listening:",
          description:
            "Our listeners are trained to provide empathetic and non-judgmental support, allowing you to express yourself freely.",
        },
        {
          title: "Emotional Validation: ",
          description:
            "We understand that your feelings are valid, and we're here to acknowledge and validate them without criticism",
        },
        {
          title: "Confidentiality: ",
          description:
            "Your privacy is our priority. Rest assured that anything you share during your rant session will be kept confidential.",
        },
      ],
      sectionFour: {
        image: "",
        points: [
          "Release pent-up emotions and frustrations, leading to a sense of relief.",
          "Feel heard, understood, and supported in a safe and non-judgmental environment.",
          "Gain clarity and perspective on your challenges by expressing them openly and honestly.",
          "Reduce stress and tension, promoting overall emotional well-being and mental health.",
        ],
      },
      conclusion: {
        title: "",
        author: "",
        description:
          "Sometimes, the most powerful thing you can do is simply let it out. By giving voice to your struggles and frustrations, you create space for healing and transformation to occur.",
      },
    },
  ],
};

const ServicesSlice = createSlice({
  initialState,
  name: "services",
  reducers: {},
});

export const useServicesSlice = () =>
  useSelector((state: RootState) => {
    return state.services;
  });
export const ServicesReducer = ServicesSlice.reducer;
