import Link from "next/link";
import Panel from "@/components/panel";
import Dropdown from "@/components/panel/dropdown";

function Sidebar() {
  return (
    <Panel bool className=" w-full max-w-xs !items-start">
      <nav className="flex h-6 w-full flex-row items-end border-b-[1px]  border-current py-1 text-xs hover:text-blue-600 dark:hover:text-blue-400">
        <Link href="/docs" className="font-bold">
          tour360 docs
        </Link>
      </nav>
      <Dropdown
        title="Getting Started"
        data={[{ title: "How It Works", link: "/docs/how-it-works" }]}
      />
      <Dropdown
        title="Blank"
        data={[
          { title: "blank", link: "/docs/" },
          { title: "blank2", link: "/docs/" },
          { title: "blank3", link: "/docs/" },
        ]}
      />
    </Panel>
  );
}

export default Sidebar;
