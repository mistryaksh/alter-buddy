import React, { FC } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";
interface TabProps {
  label: string;
  Component: JSX.Element;
}
export interface TabGroupProps {
  tabs: TabProps[];
  selectedTab: number;
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

export const AppTabs: FC<TabGroupProps> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  return (
    <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
      <TabList className="xl:gap-x-10 xl:gap-y-3 lg:gap-x-5 lg:gap-y-2 gap-x-3 gap-y-2 flex flex-wrap transition-all duration-200 ease-in  data-[closed]:opacity-0">
        {tabs.map(({ label }, i) => (
          <Tab
            key={label}
            className={clsx(
              selectedTab === i && "bg-primary-500 text-white",
              "px-5 py-3 uppercase rounded-md  text-sm focus:outline-none bg-gray-100"
            )}
          >
            {label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className={clsx("bg-white py-5")}>
        {tabs.map(
          ({ Component }, i) =>
            tabs[i] && (
              <TabPanel key={i} className="bg-gray-100 rounded-lg py-5 px-4">
                {Component}
              </TabPanel>
            )
        )}
      </TabPanels>
    </TabGroup>
  );
};
