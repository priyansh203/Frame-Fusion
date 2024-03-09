import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import img1 from "../assets/img.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import Fuse from "fuse.js";
import Search from "./search";
import Arts from "./Arts";
import './home.css';
import PriceSlider from "../PriceSlider";

const Home = () => {
  const name = useSelector((state) => state.name);
  const [arts, setArts] = useState([]);
  const img = [img1, img2, img3, img4, img5, img6];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredArts, setFilteredArts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sliderValue, setSliderValue] = useState([1, 10000]);

  const fuse = new Fuse(arts, {
    keys: ["title", "artistUserId"],
    threshold: 0.3,
  });
  const artCategories = [
    "Paintings",
    "Drawings",
    "Mixed Media",
    "Textile Art",
    "Ceramics",
    "Glass Art",
    "Origami"
  ];


  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    // Fetch arts from the server
    const fetchArts = async () => {
      try {
        const response = await fetch("http://localhost:5001/art/getArts"); // Replace with your API endpoint
        const data = await response.json();
        setArts(data);
        setFilteredArts(data);
      } catch (error) {
        console.error("Error fetching arts:", error);
      }
    };

    fetchArts();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % img.length);
    }, 3000); // Change the background image every 5 seconds
    return () => clearInterval(intervalId);
  }, [arts, img.length]);

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setFilteredArts(arts);
      setSearchQuery('');
      return;
    }

    const filteredArtsByCategory = arts.filter(art => selectedCategories.includes(art.category));
    setFilteredArts(filteredArtsByCategory);
  }, [selectedCategories, arts]);

  useEffect(() => {

    if (selectedCategories.length > 0) {
      const filteredArtsByPrice = filteredArts.filter(art => art.price >= sliderValue[0] && art.price <= sliderValue[1]);
      setFilteredArts(filteredArtsByPrice);
    }
    if (selectedCategories.length === 0 && searchQuery.length === 0) {
      const filteredArtsByPrice = arts.filter(art => art.price >= sliderValue[0] && art.price <= sliderValue[1]);
      setFilteredArts(filteredArtsByPrice);
    } if (searchQuery.length > 0) {
      const filteredArtsByPrice = filteredArts.filter(art => art.price >= sliderValue[0] && art.price <= sliderValue[1]);
      setFilteredArts(filteredArtsByPrice);
    }
  }, [sliderValue, arts, filteredArts, searchQuery,]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.length > 0) {
      const results = fuse.search(query);
      setFilteredArts(results.map((r) => r.item));
    } else if (query.length === 0 && selectedCategories.length > 0) {
      const filteredArtsByCategory = arts.filter(art => selectedCategories.includes(art.category));
      setFilteredArts(filteredArtsByCategory);
    }
    else {
      setFilteredArts(arts);
    }
  };

  const handleSliderChange = (newValues) => {
    setSliderValue(newValues);
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter(category => category !== value));
    }
  };

  return (
    <div className="bg-gray-100">
      <Search
        img={img}
        currentImageIndex={currentImageIndex}
        name={name}
        handleSearch={handleSearch}
        searchQuery={searchQuery}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 max-h-full gap-4 mx-4 pt-5">
        <div className="col-span-1 ">
          <div className="bg-white rounded-lg  shadow-lg ">
            <div className="font-bold text-xl text-black border-b">
              <div className="flex items-center ml-4 py-4">Filters</div>
            </div>
            <div className=" border-b">
              <div className="text-sm text-black">
                <div className="flex items-center ml-4 py-3">CATEGORIES</div>
              </div>
              <div>
                {artCategories.map((category, index) => (
                  <div key={index} className="ml-8 flex items-center my-2">
                    <input
                      type="checkbox"
                      id={category}
                      name={category}
                      value={category}
                      className="mr-2 appearance-none h-6 w-6 rounded border border-gray-300 checked:bg-blue-500 checked:border-transparent focus:outline-none"
                      onChange={handleCategoryChange}
                    />
                    <label htmlFor={category} className="text-gray-800">{category}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-sm text-black">
              <div className="flex items-center ml-4 py-3">PRICES</div>
              <div className="mt-4 mx-2 pb-4">
                <PriceSlider max={10000} min={1} onChange={handleSliderChange} />

              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <Arts filteredArts={filteredArts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
