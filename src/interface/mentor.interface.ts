export interface MentorDataProps {
     id: string;
     name: {
          fname: string;
          lname: string;
     };
     image: string;
     specialist: string[];
     exp: number;
     languages: string[];
}
