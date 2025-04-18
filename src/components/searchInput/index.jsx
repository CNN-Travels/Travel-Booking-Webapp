import React, { useState, useRef, useEffect } from "react";
import { CalenderDown, CalenderUp, Flight, Home } from "../../assets";

const SearchInputText = ({  
  value = {
    destination: '',
    goingTo: ''
  },
  data,
  dropDownData = [], 
  dropDownPlace = [], 
  onInputChange,
  initialDestination = "",
  initialGoingTo = ""
}) => {
  // Use value object properties or fall back to other sources
  const destination = value.destination || initialDestination || "";
  const goingTo = value.goingTo || initialGoingTo || "";

  const [citizenIsFocused, setCitizenIsFocused] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showGoingToDropdown, setShowGoingToDropdown] = useState(false);
  const [goingToIsFocused, setGoingToIsFocused] = useState(false);

  const citizenInputRef = useRef(null);
  const fromDropdownRef = useRef(null);
  const goingToInputRef = useRef(null);
  const goingToDropdownRef = useRef(null);

  // Update input values when data changes
  useEffect(() => {
    if (citizenInputRef.current) {
      citizenInputRef.current.value = destination;
    }
    
    if (goingToInputRef.current) {
      goingToInputRef.current.value = goingTo;
    }
  }, [destination, goingTo]);

  const handleFromInputBlur = () => {
    // Add a small delay to allow for click events on dropdown items
    setTimeout(() => {
      setCitizenIsFocused(false);
      setShowFromDropdown(false);
    }, 200);
  };

  const handleFromInputFocus = () => {
    setCitizenIsFocused(true);
    setShowFromDropdown(true);
    setShowGoingToDropdown(false);
  };

  const handleCitizenIconClick = () => {
    if (citizenInputRef.current) {
      citizenInputRef.current.focus();
    }
  };
  
  const handleOptionSelect = (option, inputRef, isFromInput) => {
    if (inputRef.current) {
      inputRef.current.value = option.title;
      
      // Update parent component state through the callback
      if (isFromInput) {
        onInputChange("destination", option.title);
        setShowFromDropdown(false);
      } else {
        onInputChange("goingTo", option.title);
        setShowGoingToDropdown(false);
      }
    }
  };

  const handleGoingToIconClick = () => {
    if (goingToInputRef.current) {
      goingToInputRef.current.focus();
    }
  };

  const handleGoingToFocus = () => {
    setGoingToIsFocused(true);
    setShowGoingToDropdown(true);
    setShowFromDropdown(false);
  };

  const handleGoingToBlur = () => {
    // Add a small delay to allow for click events on dropdown items
    setTimeout(() => {
      setGoingToIsFocused(false);
      setShowGoingToDropdown(false);
    }, 200);
  };

  return (
    <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl md:flex-row">
      <div className="w-full relative">
        <div className="flex items-center p-3">
          <span
            className={`mr-2 cursor-pointer ${
              citizenIsFocused ? "opacity-100" : "opacity-20"
            }`}
            onClick={handleCitizenIconClick}
          >
            <img src={Home} alt="Home icon" />
          </span>
          <input
            style={{ border: "none" }}
            ref={citizenInputRef}
            type="text"
            value={destination}
            placeholder="Search destinations, attractions..."
            className="w-full bg-transparent outline-none"
            onFocus={handleFromInputFocus}
            onBlur={handleFromInputBlur}
            onChange={(e) => onInputChange("destination", e.target.value)}
          />
        </div>

        {showFromDropdown && dropDownData && dropDownData.length > 0 && (
          <div
            ref={fromDropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {dropDownData.map((option) => (
              <div
                key={option.id}
                className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOptionSelect(option, citizenInputRef, true)}
              >
                <div className="flex">
                  <p className="flex items-center text-[14px] gap-2">
                    {option.icon}
                    <span>{option.title}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full relative">
        <div className="flex items-center p-3">
          <span
            className={`mr-2 cursor-pointer ${
              goingToIsFocused ? "opacity-100" : "opacity-20"
            }`}
            onClick={handleGoingToIconClick}
          >
            <img src={Flight} alt="Flight icon" />
          </span>
          <input
            style={{ border: "none" }}
            ref={goingToInputRef}
            type="text"
            value={goingTo}
            placeholder="Going to"
            className="w-full bg-transparent outline-none"
            onFocus={handleGoingToFocus}
            onBlur={handleGoingToBlur}
            onChange={(e) => onInputChange("goingTo", e.target.value)}
          />
        </div>

        {showGoingToDropdown && dropDownPlace && dropDownPlace.length > 0 && (
          <div
            ref={goingToDropdownRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
          >
            {dropDownPlace.map((option) => (
              <div
                key={option.id}
                className="flex items-start px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleOptionSelect(option, goingToInputRef, false)}
              >
                <div className="flex">
                  <p className="flex items-center text-[14px] gap-2">
                    {option.icon}
                    <span>{option.title}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchInputDate = ({ 
  data,
  onDateChange,
  initialTravelDate = "",
  initialReturnDate = ""
}) => {

  
  const travelDateValue = initialTravelDate || (data && data.travelDate) || "";
  const returnDateValue = initialReturnDate || (data && data.returnDate) || "";

  const [travelDateIsFocused, setTravelDateIsFocused] = useState(false);
  const travelDateInputRef = useRef(null);
  const returnDateInputRef = useRef(null);
  const [returnDateIsFocused, setReturnDateIsFocused] = useState(false);
    useEffect(() => {
    if (travelDateInputRef.current) {
      travelDateInputRef.current.value = travelDateValue;
    }
    
    if (returnDateInputRef.current) {
      returnDateInputRef.current.value = returnDateValue;
    }
  }, [travelDateValue, returnDateValue]);
  
  const handleTravelDateIconClick = () => {
    travelDateInputRef.current.focus();
  };
  
  const handleReturnDateIconClick = () => {
    returnDateInputRef.current.focus();
  };
  
  return (
    <div className="flex bg-[#BBC2FF29] border-[#A6BFFF82] border-1 rounded-2xl md:flex-row">
      <div className="w-full">
        <div className="flex items-center p-3">
          <span
            className={`mr-2 cursor-pointer ${
              travelDateIsFocused ? "opacity-100" : "opacity-20"
            }`}
            onClick={handleTravelDateIconClick}
          >
            <img src={CalenderUp} alt="Calendar icon" />
          </span>
          <input
            style={{ border: "none" }}
            ref={travelDateInputRef}
            type="date"
            placeholder="Travel Date"
            className="w-full bg-transparent outline-none"
            onFocus={() => setTravelDateIsFocused(true)}
            onBlur={() => setTravelDateIsFocused(false)}
            onChange={(e) => onDateChange("travelDate", e.target.value)}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center p-3">
          <span
            className={`mr-2 cursor-pointer ${
              returnDateIsFocused ? "opacity-100" : "opacity-20"
            }`}
            onClick={handleReturnDateIconClick}
          >
            <img src={CalenderDown} alt="Calendar icon" />
          </span>
          <input
            style={{ border: "none" }}
            ref={returnDateInputRef}
            type="date"
            placeholder="Return Date"
            className="w-full bg-transparent outline-none"
            onFocus={() => setReturnDateIsFocused(true)}
            onBlur={() => setReturnDateIsFocused(false)}
            onChange={(e) => onDateChange("returnDate", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export { SearchInputText, SearchInputDate };