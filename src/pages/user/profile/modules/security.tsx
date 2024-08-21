import { Formik } from "formik";
import { AppButton, TextField } from "../../../../component";
import { Dispatch, FC, SetStateAction } from "react";

export interface IUserSecurityProps {
  handleUpdatePassword: ({
    confirmNewPassword,
    newPassword,
  }: {
    newPassword: string;
    confirmNewPassword: string;
  }) => void;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

export const Security: FC<IUserSecurityProps> = ({
  handleUpdatePassword,
  setSelectedTab,
}) => {
  return (
    <div>
      <Formik
        onSubmit={handleUpdatePassword}
        initialValues={{ confirmNewPassword: "", newPassword: "" }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h6 className="text-3xl">
                Account <span className="text-primary-500">Security</span>
              </h6>
              <p className="text-gray-500">
                We are encrypt your password so no one misuse even they got the
                password
              </p>
            </div>
            <div className="mt-5">
              <TextField
                outlined
                value={values.newPassword}
                onChange={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                touched={touched.newPassword}
                error={errors.newPassword}
                label="Enter New Password"
                placeholder="New Password Must be 12 character long"
              />
            </div>
            <div>
              <TextField
                outlined
                value={values.confirmNewPassword}
                onChange={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                touched={touched.confirmNewPassword}
                error={errors.confirmNewPassword}
                label="Confirm New Password"
                placeholder="Type your new password again"
              />
            </div>
            <div className="flex justify-end">
              <AppButton onClick={() => setSelectedTab(0)} type="button">
                Change Profile Details
              </AppButton>
              <AppButton type="submit" filled>
                Change Password
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
