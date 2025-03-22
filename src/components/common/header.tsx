import { useUserPreferences } from "../../context/user-preferences-context";
import React, { useState } from "react";
import { FiltersIcon, Logo, SearchIcon } from "../../assets/icons";
import { NewsSource } from "../../global.types";
import CustomDropdown from "./custom-dropdown";
import CustomCheckbox from "./custom-checkbox";
import { Link, useNavigate } from "react-router-dom";
import { availableCategories, availableSources } from "../../utils/constants";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPreferenceItems, setIsPreferenceItems] = useState<boolean>(false);
  const { sources, setSources, category, setCategory } = useUserPreferences();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex md:justify-between justify-center flex-wrap gap-2 items-center">
          {/* <Logo /> */}
          <Link to="/" className="flex items-center space-x-3">
            <Logo />
            <h1 className="text-2xl font-bold text-gray-800">
              News Aggregator
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            <form
              onSubmit={handleSearch}
              className="flex items-center border border-gray-300 rounded-lg overflow-hidden"
            >
              <input
                type="text"
                className="px-3 py-1 md:w-64 w-44 focus:outline-none"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-gray-200 px-3 py-1 cursor-pointer hover:bg-gray-300"
              >
                <SearchIcon />
              </button>
            </form>

            <button
              className="cursor-pointer"
              onClick={() => setIsPreferenceItems((prev) => !prev)}
            >
              <FiltersIcon />
            </button>
          </div>
        </div>
        {isPreferenceItems && (
          <div className="mt-4">
            <div className="flex gap-6 flex-wrap">
              {/* News Source Selector */}
              <div>
                <h6 className="font-medium">Sources:</h6>
                <div className="flex flex-wrap space-x-4">
                  {availableSources.map((source) => (
                    <CustomCheckbox<NewsSource>
                      key={source.value}
                      label={source.label}
                      value={source.value as NewsSource}
                      isChecked={sources.includes(source.value as NewsSource)}
                      onChange={() => {
                        if (!sources?.includes(source?.value)) {
                          setSources([...sources, source?.value as NewsSource]);
                        } else {
                          setSources(
                            sources?.filter((s) => s !== source.value)
                          );
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Category Selector */}
              <div>
                <h6 className="font-medium">Category:</h6>
                <CustomDropdown
                  options={availableCategories}
                  selectedValue={category}
                  onChange={setCategory}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
