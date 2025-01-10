"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import BandCard from "./BandCard";
import { IoMdArrowDropdown } from "react-icons/io";
import { api } from "../api";

const fetcher = (url) => fetch(url).then((res) => res.json());

function LineUpComponent() {
  const BASE_URL = `${api}/logos/`;
  const BANDS_URL = `${api}/bands`;
  let { data, error, isLoading } = useSWR(BANDS_URL, fetcher);
  let [isListAscending, setIsListAscending] = useState(false);
  let [dataThatIsMapping, setDataThatIsMapping] = useState([]);
  let [pickedGenre, setPickedGenre] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setDataThatIsMapping(data);
    }
  }, [data]);

  function handleAscending() {
    let sortedBands = []; //Behøves ikke hvis data mappes igennem istedet - .sort ændrer også selve data. Jeg elsker dig skat <3 <3 <3
    if (isListAscending === true) {
      sortedBands = data.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else {
      sortedBands = data.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    setDataThatIsMapping(sortedBands);
    setIsListAscending(!isListAscending);
  }
  const currentData = dataThatIsMapping.length > 0 ? dataThatIsMapping : data; //Behøves ikke, hvis vi mapper igennem dataThatIsMapping istedet

  if (error) return <div>Error loading schedule: {error.message}</div>;
  if (isLoading) return <div>Loading schedule...</div>;

  let genres = [...new Set(data.map((band) => band.genre))];

  return (
    <article>
      <div className="font-bold justify-center flex-row  text-2xl sm:text-3xl inline-flex gap-8 font-rethink text-main-1 my-6">
        <div className="select-container ">
          <select
            className="select-box"
            name="genres"
            id="select-genre"
            onChange={(e) => setPickedGenre(e.target.value)}
          >
            <option value="">FILTER BY GENRE</option>
            {genres.map((genre, index) => {
              return (
                <option value={genre} key={index}>
                  {genre}
                </option>
              );
            })}
          </select>
          <div className="select-icon cursor-pointer">
            <IoMdArrowDropdown size={35} />
          </div>
        </div>
        <div>
          <button
            className="text-main-1 uppercase font-rethink "
            onClick={handleAscending}
          >
            {isListAscending ? "Z-A" : "A-Z"}
          </button>
        </div>
      </div>
      <div className="bg-[url('/illustrations/svg/circle.svg')] bg-contain bg-repeat-y bg-no-repeat-x  -mx-mobile lg:-mx-desktop py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center place-items-center gap-10 mx-mobile pb-16 lg:mx-desktop">
          {currentData.map((band) => {
            const logo = band.logo.startsWith("http")
              ? band.logo
              : `${BASE_URL}${band.logo}`;
            return (
              (!pickedGenre || band.genre === pickedGenre) && (
                <BandCard
                  alt={`Logo of ${band.name}`}
                  key={band.name}
                  imgSrc={logo}
                  name={band.name}
                  genre={band.genre}
                  slug={band.slug}
                />
              )
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default LineUpComponent;
