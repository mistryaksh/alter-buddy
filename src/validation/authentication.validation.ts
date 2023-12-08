import * as yup from "yup";

interface SignInProps {
     email: string;
     password: string;
}

interface SignUpProps {
     email: string;
     username: string;
     password: string;
     fname: string;
     lname: string;
}

export const SignInInitialState: SignInProps = {
     email: "",
     password: "",
};

export const SignInValidationSchema = yup.object().shape({
     email: yup.string().required("email is required to sign in").email("email is not valid email"),
     password: yup.string().required("password is required for sign in").min(6).max(16),
});

export const SignUpInitialState: SignUpProps = {
     email: "",
     password: "",
     fname: "",
     lname: "",
     username: "",
};

export const SignUpValidationSchema = yup.object().shape({
     email: yup.string().required("email is required to sign up").email("email is not valid email"),
     password: yup.string().required("password is required for sign up").min(6).max(16),
     fname: yup.string().required("first name is required"),
     lname: yup.string().required("last name is required"),
     username: yup.string().required("username is required"),
});
