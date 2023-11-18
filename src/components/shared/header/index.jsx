import { useContext } from "react";
import { Menu, Transition, Switch } from "@headlessui/react";
import { Fragment } from "react";
import { HiOutlineSun, HiMoon } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/themeContext";
import SearchBar from "./searchbar";

export default function Header() {
  const navigate = useNavigate();
  // const [enabled, setEnabled] = useState(false);

  // const [selectedOption, setSelectedOption] = useState("Choose Option");
  // const handleOptionChange = (e) => {
  //   setSelectedOption(e.target.value);
  // };

  const {enabled, setEnabled} = useContext(ThemeContext)

  const handleThemeChange = () => {
    setEnabled(!enabled)
  }

  return (
    <div className="bg-transparent h-16 w-screen px-4 flex items-center justify-end ">
      <div className="flex items-center justify-between w-full max-w-screen-xl lg:px-8 py-5">
       <div className="flex flex-row-reverse md:flex-row justify-between w-full gap-5">
       <SearchBar/>
        <div className="flex items-center gap-3 justify-end w-full ">
          <Switch
            checked={enabled}
            onChange={handleThemeChange}
            className={`${
              enabled ? "bg-gray-600" : "bg-gray-200"
            } flex relative  h-8 w-16 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                enabled ? "translate-x-9" : "translate-x-1"
              } h-6 w-6 transform rounded-full bg-white transition flex items-center justify-center`}
            >{enabled ? <HiOutlineSun/> : <HiMoon />}</span>
          </Switch>

          <div className="hidden md:flex flex-col">
            <h1 className="text-sm md:text-md">Hello, Developer User</h1>
            <p className={`${enabled ? "text-gray-100" : "text-gray-800"} text-sm`}>Helpdesk Record Manager</p>
          </div>

          
        </div>
       </div>
        <Menu as="div" className="relative">
            <div>
              <Menu.Button className="ml-2 mr-5 md:mr-10 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400">
                <span className="sr-only">Open user menu</span>
                <div
                  className="h-10 w-10 rounded-full bg-sky-500 bg-cover bg-no-repeat bg-center"
                  style={{
                    backgroundImage:
                      'url("https://source.unsplash.com/80x80?face")',
                  }}
                >
                  <span className="sr-only">Marc Backes</span>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({active}) => (
                    <div className="flex flex-col px-4 py-2">
                    <h1 className="text-sm md:text-md">Hello, Developer User</h1>
                    <p className={`${active && "bg-gray-100"},   text-sm`}>Helpdesk Record Manager</p>
                  </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/profile")}
                      className={`
											${active && "bg-gray-100"},
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										`}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/settings")}
                      className={`
											${active && "bg-gray-100"},
											'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
										`}
                    >
                      Settings
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={`
                  ${active && "bg-gray-100"},
                  'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                `}
                    >
                      Sign out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
      </div>
    </div>
  );
}
