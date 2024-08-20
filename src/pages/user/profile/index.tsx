import React, { useEffect, useState } from "react";
import { MainLayout } from "../../../layout";
import {
  useProfileUserQuery,
  useUpdateUserProfileMutation,
} from "../../../redux/rtk-api";
import { useAppDispatch } from "../../../redux";
import { handleError } from "../../../redux/features";
import { AppButton, AppTabs, TextField } from "../../../component";

import { Formik } from "formik";
import { UserProps } from "../../../interface";
import { toast } from "react-toastify";
import {
  useGetMyTransactionQuery,
  useGetMyWalletQuery,
  useRechargeWalletMutation,
} from "../../../redux/rtk-api/buddy-coin.api";
import moment from "moment";
import clsx from "clsx";
import { AiOutlineClockCircle } from "react-icons/ai";

export const UserProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [amount, setAmount] = useState<number>();
  const {
    data: profile,
    isError: isProfileError,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileUserQuery();
  const {
    data: transactions,
    isError: isTransactionError,
    error: transactionError,
  } = useGetMyTransactionQuery();
  const [
    UpdateProfile,
    {
      isError: isUpdateError,
      error: updateError,
      data: updateData,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateUserProfileMutation();
  const { data: wallet } = useGetMyWalletQuery();
  const [
    RechargeWallet,
    {
      isError: isRechargeError,
      error: rechargeError,
      data: rechargeData,
      isLoading: isRechargeLoading,
      isSuccess: isRechargeSuccess,
    },
  ] = useRechargeWalletMutation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isProfileError) {
      if ((profileError as any).data) {
        dispatch(handleError((profileError as any).data.message));
      } else {
        console.log(profileError);
      }
    }
  }, [isProfileError, profileError, dispatch]);

  useEffect(() => {
    if (isTransactionError) {
      console.log(transactionError);
    }
  }, [isTransactionError, transactionError]);

  useEffect(() => {
    if (isUpdateError) {
      if ((updateError as any)?.data) {
        dispatch(handleError((updateError as any).data.message));
      } else {
        console.log(updateError);
      }
    }
  }, [isUpdateError, updateError, dispatch]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast.success(updateData?.data);
    }
  }, [isUpdateSuccess, updateData?.data]);

  useEffect(() => {
    if (isRechargeError) {
      console.log(rechargeError);
      const error = rechargeError as any;
      if (error.data) {
        toast.error(error.data.message);
      } else {
        toast.error(error);
      }
    }
  }, [isRechargeError, rechargeError]);

  const handleSubmit = async (prop: any) => {
    await UpdateProfile({ ...prop });
  };

  const handleUpdatePassword = async ({
    confirmNewPassword,
    newPassword,
  }: {
    newPassword: string;
    confirmNewPassword: string;
  }) => {
    if (newPassword !== confirmNewPassword) {
      toast.warn("both password should be same");
    } else {
      await UpdateProfile({ password: confirmNewPassword });
    }
  };

  const RenewWallet = async () => {
    // await RechargeWallet()
    if (!amount) {
      toast.warn("please enter amount");
    } else {
      await RechargeWallet(amount);
    }
  };

  useEffect(() => {
    if (isRechargeSuccess) {
      toast.success(rechargeData?.data.message);
      window.location.replace(rechargeData.data.razorPay.short_url);
    }
  }, [isRechargeSuccess, rechargeData]);

  const UserProfile = (
    <div>
      <h6 className="text-2xl">My Profile</h6>
      <Formik
        enableReinitialize
        onSubmit={handleSubmit}
        initialValues={
          {
            name: {
              firstName: profile?.data.name.firstName || "",
              lastName: profile?.data.name.lastName || "",
            },
            email: profile?.data.email || "",
            mobile: profile?.data.mobile || "",
          } as UserProps
        }
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
            <div className="flex gap-5 flex-wrap xl:flex-nowrap">
              <TextField
                outlined
                label="First Name"
                value={values.name.firstName}
                onChange={handleChange("name.firstName")}
                onBlur={handleBlur("name.firstName")}
                touched={touched.firstName as boolean}
                error={errors.firstName as string}
              />
              <TextField
                outlined
                label="Last Name"
                value={values.name.lastName}
                onChange={handleChange("name.lastName")}
                onBlur={handleBlur("name.lastName")}
                touched={touched.lastName as boolean}
                error={errors.lastName as string}
              />
            </div>
            <div>
              <TextField
                outlined
                label="Email Address"
                value={values.email}
                onChange={handleChange("email")}
                onBlur={handleBlur("email")}
                touched={touched.email as boolean}
                error={errors.email as string}
              />
            </div>
            <div>
              <TextField
                outlined
                label="Mobile Number"
                value={values.mobile}
                onChange={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                touched={touched.mobile as boolean}
                error={errors.mobile as string}
              />
            </div>
            <div className="flex justify-end gap-5">
              <AppButton onClick={() => setSelectedTab(4)}>
                Update Password
              </AppButton>
              <AppButton type="submit" outlined loading={isUpdateLoading}>
                Save Changes
              </AppButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );

  const amountOption = [100, 200, 500, 800, 1000];
  const BuddyCoins = (
    <div className="space-y-3">
      <div className="mx-auto w-[60%] bg-white overflow-hidden mt-10">
        <div className="px-6 py-4">
          <h1 className="text-2xl text-gray-800">
            BuddyCoin{" "}
            <span className="text-primary-500 font-semibold">Wallet</span>
          </h1>
          <div className="flex items-start justify-between mt-4">
            <div>
              <h2 className="text-lg text-gray-600">Coins</h2>
              <p className="text-3xl font-bold text-black">
                {wallet?.data.balance}
              </p>
            </div>
            <p className="text-gray-500 text-sm uppercase flex items-center gap-3">
              <AiOutlineClockCircle size={24} />{" "}
              {moment(wallet?.data.updatedAt).format("LLLL")}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                RenewWallet();
              }}
            >
              <div className="flex justify-end mt-5 gap-10">
                <div className="gap-10 flex items-center">
                  <TextField
                    type="number"
                    outlined
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) =>
                      setAmount(parseInt(e.target.value) as number)
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {isRechargeLoading ? "Redirecting..." : "Recharge"}
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3 mt-5">
              {amountOption.map((selectedAmount) => (
                <button
                  className={clsx(
                    amount === selectedAmount &&
                      "focus:ring-2 focus:ring-primary-500 bg-primary-100 ",
                    "py-2 rounded-md px-5 bg-gray-100"
                  )}
                  onClick={() => setAmount(selectedAmount)}
                >
                  {selectedAmount}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const Activity = <div>Activity</div>;
  const Transactions = (
    <div>
      <h6 className="text-2xl font-semibold">
        Buddy Coin <span className="text-primary-500">Transactions</span>
      </h6>
      <h6 className="text-xl text-gray-500">
        Hey! Your BuddyCoins Transactions are here
      </h6>
      {!transactions?.data.length && (
        <div>
          <p>No transaction found</p>
        </div>
      )}
      {transactions?.data.length && (
        <div className="space-y-5 w-[60%]">
          {transactions?.data.map(
            (
              { transactionType, creditAmt, debitAmt, status, createdAt },
              i
            ) => (
              <div className="bg-white rounded-md p-3 flex justify-between items-center">
                <div>
                  <p key={i} className="text-lg capitalize cursor-pointer">
                    {transactionType ? transactionType : "N/A"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {moment(createdAt).format("LLL")}
                  </p>
                </div>
                <div>
                  {creditAmt && (
                    <p className="text-green-500 text-xl">+{creditAmt}</p>
                  )}
                  {debitAmt && (
                    <p className="text-red-500 text-xl">-{debitAmt}</p>
                  )}
                  {status === "success" && (
                    <p className="bg-green-500 text-white px-3 py-1 uppercase rounded-lg">
                      {status}
                    </p>
                  )}
                  {status === "failed" && (
                    <p className="bg-red-500">{status}</p>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
  const Security = (
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

  return (
    <MainLayout loading={isProfileLoading} hideNav={false}>
      <div className="p-3 mt-24 xl:container mx-auto">
        <div className="xl:mt-10">
          <AppTabs
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            tabs={[
              {
                Component: UserProfile,
                label: "profile",
              },
              {
                Component: BuddyCoins,
                label: "Buddy Coins",
              },
              {
                Component: Activity,
                label: "Activity",
              },
              {
                Component: Transactions,
                label: "Transactions",
              },
              {
                Component: Security,
                label: "Security",
              },
            ]}
          />
        </div>
      </div>
    </MainLayout>
  );
};
