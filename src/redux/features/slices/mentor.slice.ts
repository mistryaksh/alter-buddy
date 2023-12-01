import { createSlice, nanoid } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../";
import { MentorDataProps } from "../../../interface";

const MentorSlice = createSlice({
     initialState: {
          data: [
               {
                    id: nanoid(),
                    exp: 1,
                    image: "https://static.wixstatic.com/media/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png/v1/crop/x_0,y_0,w_1697,h_1576/fill/w_214,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png",
                    name: {
                         fname: "Don",
                         lname: "Francis",
                    },
                    languages: ["English", "hindi", "marathi"],
                    specialist: ["Counseling Psychologist"],
               },
               {
                    id: nanoid(),
                    exp: 1,
                    image: "https://static.wixstatic.com/media/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png/v1/crop/x_0,y_0,w_1697,h_1576/fill/w_214,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png",
                    name: {
                         fname: "Don",
                         lname: "Francis",
                    },
                    languages: ["English", "hindi", "marathi"],
                    specialist: ["Counseling Psychologist"],
               },
               {
                    id: nanoid(),
                    exp: 1,
                    image: "https://static.wixstatic.com/media/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png/v1/crop/x_0,y_0,w_1697,h_1576/fill/w_214,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png",
                    name: {
                         fname: "Don",
                         lname: "Francis",
                    },
                    languages: ["English", "hindi", "marathi"],
                    specialist: ["Counseling Psychologist"],
               },
               {
                    id: nanoid(),
                    exp: 1,
                    image: "https://static.wixstatic.com/media/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png/v1/crop/x_0,y_0,w_1697,h_1576/fill/w_214,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png",
                    name: {
                         fname: "Don",
                         lname: "Francis",
                    },
                    languages: ["English", "hindi", "marathi"],
                    specialist: ["Counseling Psychologist"],
               },
               {
                    id: nanoid(),
                    exp: 1,
                    image: "https://static.wixstatic.com/media/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png/v1/crop/x_0,y_0,w_1697,h_1576/fill/w_214,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png",
                    name: {
                         fname: "Don",
                         lname: "Francis",
                    },
                    languages: ["English", "hindi", "marathi"],
                    specialist: ["Counseling Psychologist"],
               },
               {
                    id: nanoid(),
                    exp: 1,
                    image: "https://static.wixstatic.com/media/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png/v1/crop/x_0,y_0,w_1697,h_1576/fill/w_214,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_7759ebb25c9040a9a1d177611e3b11be~mv2.png",
                    name: {
                         fname: "Don",
                         lname: "Francis",
                    },
                    languages: ["English", "hindi", "marathi"],
                    specialist: ["Counseling Psychologist"],
               },
          ] as MentorDataProps[],
     },
     name: "mentors",
     reducers: {},
});

export const useMentorSlice = () =>
     useSelector((state: RootState) => {
          return state.mentors;
     });
export const MentorReducer = MentorSlice.reducer;
// export const {} = MentorSlice.actions;
