import React, { useEffect, useRef, useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames/bind";

import styles from "./Search.module.scss";
import { SearchIcon } from "../Icons";
import { getAllProducts } from "~/pages/ProductManage/ProductSlice";
import useDebounce from "~/hook/useDebounce";
import { Wrapper } from "../Popper";
import ProductItem from "../ProductItem";

const cx = classnames.bind(styles);

const Search = () => {
  const [showResults, setShowResults] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const debouncedValue = useDebounce(searchText, 500);

  const inputRef = useRef();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products.values);

  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResults([]);
      return;
    }

    const results = productList.filter((product) => {
      return product.name.includes(debouncedValue);
    });
    setSearchResults(results);

    dispatch(getAllProducts());
  }, [debouncedValue, dispatch, productList]);

  const handleSearchTextChange = (e) => {
    const searchText = e.target.value;
    if (!searchText.startsWith(" ")) {
      setSearchText(searchText);
    }
  };

  const handelHideResults = () => {
    setShowResults(false);
  };

  return (
    <HeadlessTippy
      interactive
      visible={showResults && searchResults.length > 0}
      render={(attrs) => (
        <div className={cx("search-results")} tabIndex="-1" {...attrs}>
          <Wrapper>
            {searchResults.map((result, index) => (
              <ProductItem key={index} data={result} />
            ))}
          </Wrapper>
        </div>
      )}
      onClickOutside={handelHideResults}
    >
      <div className={cx("search")}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          size="10"
          ref={inputRef}
          value={searchText}
          spellCheck={false}
          onFocus={() => setShowResults(true)}
          onChange={handleSearchTextChange}
        />

        <button className={cx("search-btn")}>
          <SearchIcon />
        </button>
      </div>
    </HeadlessTippy>
  );
};

export default Search;
