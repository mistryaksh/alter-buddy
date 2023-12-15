export const getUserToken = () => {
     return localStorage.getItem("USER_TOKEN");
};

export const setUserToken = (value: string) => {
     return localStorage.setItem("USER_TOKEN", value);
};

export const removeUserToken = () => {
     return localStorage.removeItem("USER_TOKEN");
};
