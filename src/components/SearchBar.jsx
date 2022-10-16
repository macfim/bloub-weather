import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLocation, setSearchValue } from "../slices/weatherSlice";

const SearchBar = () => {
  const dispatch = useDispatch();

  const [inputSize, setInputSize] = useState(1);

  const inputRef = useRef();
  const input = inputRef?.current;

  const searchValue = useSelector((state) => state.weather.searchValue);
  const locationStatus = useSelector((state) => state.weather.locationStatus);

  useEffect(() => {
    updateSize();
  }, [searchValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getLocation());
  };

  function updateSize() {
    const inputLength = searchValue?.length;

    if (inputLength === 0) setInputSize(1);
    else if (inputLength > 0 && inputLength < 16)
      setInputSize(input?.value?.length);
  }

  return (
    <form className="inline-block" onSubmit={handleSubmit}>
      <input
        value={searchValue}
        onChange={({ target }) => {
          dispatch(setSearchValue(target.value));
        }}
        size={inputSize}
        ref={inputRef}
        className={`focus:outline-none text-black mx-2 dark:text-white text-center placeholder:text-center bg-inherit ${
          locationStatus === "error"
            ? "border-red-600 dark:border-red-700"
            : "border-gray-500 dark:border-gray-300"
        }  border-b-2`}
      />
    </form>
  );
};

export default SearchBar;
