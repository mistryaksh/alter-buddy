import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../..";

interface HomeSliceProps {
  problems: {
    age: string;
    points: string[];
  }[];
  helpPoints: {
    body: string;
    image: string;
    label: string;
    path: string;
  }[];
}

const initialState: HomeSliceProps = {
  problems: [
    {
      age: "13-25",
      points: [
        "Your Crush doesn’t notice you?",
        "Relationship Issues",
        "Academic pressure or exam stress",
        "Social anxiety",
        "Peer pressure",
        "Identity and confidence issues",
        "Body Shaming/ Self Image",
        "Bullying",
        "Family Conflicts",
        "Break-up Trauma",
        "Uncertainty about your career choices",
        "Substance abuse",
        "Addiction of any sort",
        "Facing Issues In Coping with transitions such as:",
        "moving away from home",
        "starting college",
      ],
    },
    {
      age: "25-50",
      points: [
        "Rejection in marriage or love",
        "In love with someone who doesn’t want you",
        "Work stress and burnout",
        "Stress at Home",
        "Loneliness",
        "Issues on Being Single",
        "Societal Pressure",
        "Pressure of Work-Life Balance",
        "Marital problems or divorce",
        "Issues of not being able to have a child",
        "Financial stress and managing debt",
        "Existential questions about your life’s purpose",
        "Coping with aging parents",
        "Health concerns",
        "Issues of Spouse and Parents not getting along",
        "Career Problems",
        "Feeling stuck or unfulfilled in life",
        "Dealing with children leaving home",
      ],
    },
    {
      age: "above 50",
      points: [
        "Has problems in adjusting to retirement",
        "Is facing loneliness, especially after the loss of loved ones",
        "Has health concerns",
        "Has problems in coping with age-related changes and limitations",
        "Is dealing with regrets or unresolved issues from the past",
        "Has problems maintaining mental sharpness",
        "Is facing financial worries",
        "Is finding purpose and meaning in life",
      ],
    },
  ],
  helpPoints: [
    {
      body: "our psychologists (your buddies) help you overcome anxiety, stress, and confusion. they will help you gain clarity and confidence in your life's direction.",
      image:
        "https://res.cloudinary.com/nowandme/image/upload/v1699332230/landing/services/card/sadness_eylxtc.webp",
      label: "mental health services",
      path: "#",
    },
    {
      body: "our coaches (your genies) will guide you in manifesting your desires for love, relationships, success, money, and good health, helping you transform your reality and create the life you always desired.",
      image:
        "https://res.cloudinary.com/nowandme/image/upload/v1699332230/landing/services/card/sadness_eylxtc.webp",
      label: "manifestation",
      path: "#",
    },
    {
      body: "our compassionate healers offer emotional and spiritual healing to help you heal past traumas, find inner peace, and rediscover balance and harmony in your life..",
      image:
        "https://res.cloudinary.com/nowandme/image/upload/v1699332230/landing/services/card/sadness_eylxtc.webp",
      label: "healing",
      path: "#",
    },
    {
      body: "feeling overwhelmed? just vent it out. we are here to listen. our rant-out buddies provide a safe space for you to vent your frustrations and emotions without fear of judgment.",
      image:
        "https://res.cloudinary.com/nowandme/image/upload/v1699332230/landing/services/card/sadness_eylxtc.webp",
      label: "rant (vent out) services",
      path: "#",
    },
  ],
};

const HomeSlice = createSlice({
  initialState,
  name: "home",
  reducers: {},
});

export const HomeReducer = HomeSlice.reducer;
export const useHomeSlice = () =>
  useSelector((state: RootState) => {
    return state.home;
  });
