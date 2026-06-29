import type { Tab } from "../models/tabs.ts";
import { TABS } from "../models/tabs.ts";

interface CategoryTabsProps {
  activeTab: Tab;
  switchTab: (tab: Tab) => void;
}

function CategoryTabs({ activeTab, switchTab }: CategoryTabsProps) {
  return (
    <div
      role="group"
      aria-label="Filter notes by category"
      className="mt-16 sm:mt-32 flex text-primary"
    >
      {
        TABS.map(({value, label}) => (
          <button 
            key={value}
            onClick={() => switchTab(value)} 
            className={`
              py-1 px-8 
              border-r border-muted-light 
              transition duration-200 cursor-pointer 
              ${activeTab==value ? "bg-surface rounded-tr-xl" : "hover:bg-surface/50"}
            `}
          >
            {label}
          </button>
        ))
      }
    </div>
  );
}

export default CategoryTabs;