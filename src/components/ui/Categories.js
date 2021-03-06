import React, { useEffect, useState } from "react";
import { getCategories } from "../util/CategoryUtil";

const Categories = ({ videos, selectedCat, setSelectedCat }) => {
  const [availableCat, setAvailableCat] = useState(new Map());
  const [categories, setCategories] = useState({});
  const [targetCats, setTargetCats] = useState([]);
  // targetCats = [
  //   {
  //     value: "small_category",
  //     catBig: "big_category",
  //     colorIdx: 1,
  //     selected: true,
  //   },
  // ];

  useEffect(() => {
    console.log("Categories useEffect()");
    const tempCategories = getCategories(videos);
    setCategories(tempCategories);
    console.log(tempCategories);
  }, [videos]);

  function clearBig() {
    const selectedBigBtn = document.querySelectorAll(
      ".category-big .btn-cat.btn-cat--selected"
    );
    selectedBigBtn.forEach((button) => {
      button.classList.remove("btn-cat--selected");
    });
    setTargetCats([]);
    setAvailableCat(new Map());
    setSelectedCat(new Map());
  }

  function allBig() {
    const bigButton = document.querySelectorAll(".category-big .btn-cat");
    bigButton.forEach((button) => {
      button.classList.add("btn-cat--selected");
    });

    const tempSelectedCat = new Map();
    const tempTargetCats = [];
    for (const [catBig, categoryObj] of Object.entries(categories)) {
      const tempSmallSet = new Set();
      categoryObj.catSmallList.forEach((small) => {
        tempSmallSet.add(small);
        tempTargetCats.push({
          value: small,
          catBig: catBig,
          colorIdx: categoryObj.colorIdx,
          selected: true,
        });
      });
      tempSelectedCat.set(catBig, tempSmallSet);
    }
    setTargetCats(tempTargetCats);
    setAvailableCat(tempSelectedCat);
    setSelectedCat(tempSelectedCat);
  }

  function toggleBig(e) {
    const catBig = e.target.innerText;
    const tempSelectedCat = new Map(selectedCat);
    const tempAvailableCat = new Map(availableCat);
    let tempTargetCats = [...targetCats];
    if (e.target.classList.contains("btn-cat--selected")) {
      tempSelectedCat.delete(catBig);
      tempAvailableCat.delete(catBig);
      tempTargetCats = tempTargetCats.filter(
        (targetCat) => targetCat.catBig !== catBig
      );
    } else {
      const categoryObj = categories[catBig];
      const tempSmallSet = new Set(categoryObj.catSmallList);
      tempSelectedCat.set(catBig, tempSmallSet);
      tempAvailableCat.set(catBig, tempSmallSet);
      tempSmallSet.forEach((value) => {
        tempTargetCats.push({
          value: value,
          catBig: catBig,
          colorIdx: categoryObj.colorIdx,
          selected: true,
        });
      });
    }
    e.target.classList.toggle("btn-cat--selected");
    setSelectedCat(tempSelectedCat);
    setAvailableCat(tempAvailableCat);
    setTargetCats(tempTargetCats);
    console.log(tempTargetCats);
  }

  function clearSmall() {
    const selectedSmallBtn = document.querySelectorAll(
      ".category-small .btn-cat.btn-cat--selected"
    );
    selectedSmallBtn.forEach((button) => {
      button.classList.remove("btn-cat--selected");
    });

    const tempSelectedCat = new Map();
    selectedCat.forEach((value, key, map) => {
      tempSelectedCat.set(key, new Set());
    });
    setSelectedCat(tempSelectedCat);

    const tempTargetCats = [...targetCats];
    tempTargetCats.forEach((targetCat) => {
      targetCat.selected = false;
    });
    setTargetCats(tempTargetCats);
  }

  function allSmall() {
    const smallButton = document.querySelectorAll(".category-small .btn-cat");
    smallButton.forEach((button) => {
      button.classList.add("btn-cat--selected");
    });

    const tempSelectedCat = new Map(selectedCat);
    selectedCat.forEach((value, key, map) => {
      const availableSmallCat = availableCat.get(key);
      tempSelectedCat.set(key, availableSmallCat);
    });
    setSelectedCat(tempSelectedCat);

    const tempTargetCats = [...targetCats];
    tempTargetCats.forEach((targetCat) => {
      targetCat.selected = true;
    });
    setTargetCats(tempTargetCats);
  }

  function toggleSmall(e) {
    const catSmall = e.target.innerText;
    const catBig = e.target.getAttribute("catbig");
    const index = e.target.getAttribute("index");
    console.log(catSmall, catBig, index);

    const tempSelectedCat = new Map(selectedCat);
    const tempSelectedSmCatSet = tempSelectedCat.get(catBig);
    const tempTargetCats = [...targetCats];
    if (e.target.classList.contains("btn-cat--selected")) {
      tempSelectedSmCatSet.delete(catSmall);
      tempTargetCats[index].selected = false;
    } else {
      tempSelectedSmCatSet.add(catSmall);
      tempTargetCats[index].selected = true;
    }
    e.target.classList.toggle("btn-cat--selected");
    setSelectedCat(tempSelectedCat);
    setTargetCats(tempTargetCats);
  }

  return (
    <>
      <div className="category-big">
        <div className="category-nav">
          <h3 className="heading-3">카테고리(대)</h3>
          <div className="category-nav--menu">
            <button className="btn-text btn-text--category" onClick={clearBig}>
              Clear
            </button>
            <button className="btn-text btn-text--category" onClick={allBig}>
              Select All
            </button>
          </div>
        </div>
        {Object.keys(categories).map((catBig) => (
          <button
            key={catBig}
            onClick={toggleBig}
            className={`btn-cat btn-cat--${categories[catBig].colorIdx}`}
          >
            {catBig}
          </button>
        ))}
      </div>
      <div className="category-small">
        <div className="category-nav">
          <h3 className="heading-3">카테고리(소)</h3>
          <div className="category-nav--menu">
            <button
              className="btn-text btn-text--category"
              onClick={clearSmall}
            >
              Clear
            </button>
            <button className="btn-text btn-text--category" onClick={allSmall}>
              Select All
            </button>
          </div>
        </div>
        {targetCats.map((targetCat, i) => (
          <button
            key={i}
            index={i}
            onClick={toggleSmall}
            className={`btn-cat btn-cat--${targetCat.colorIdx} btn-cat--selected`}
            catbig={targetCat.catBig}
          >
            {targetCat.value}
          </button>
        ))}
      </div>
    </>
  );
};

export default Categories;
