import { useState } from "react";
import { Range } from "react-range";
import "./FilterBox.css";

const FilterBox = () => {
  const priceOptions = [
    "0원",
    "40만원",
    "80만원",
    "120만원",
    "160만원",
    "160만원+",
  ];

  const [priceValue, setPriceValue] = useState([
    priceOptions[0],
    priceOptions[priceOptions.length - 1],
  ]);

  // 휴대폰 종류와 제조사 버튼의 active 상태를 관리하는 상태 추가
  const [activePhoneType, setActivePhoneType] = useState("전체");
  const [activeManufacturer, setActiveManufacturer] = useState("전체");

  // 버튼 클릭 이벤트 처리 함수
  const handlePhoneTypeClick = (type) => {
    setActivePhoneType(type);
  };

  const handleManufacturerClick = (manufacturer) => {
    setActiveManufacturer(manufacturer);
  };

  const renderThumb = ({ props }) => (
    <div
      {...props}
      style={{
        ...props.style,
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        backgroundColor: "#FFF",
        border: "2px solid #CCC",
        boxShadow: "0 2px 6px #AAA",
      }}
    />
  );

  const renderTrack = ({ props, children, value, options }) => {
    const index1 = options.indexOf(value[0]);
    const index2 = options.indexOf(value[1]);
    const stepSize = 100 / (options.length - 1);
    const start = index1 * stepSize;
    const end = index2 * stepSize;
    return (
      <div
        {...props}
        style={{
          ...props.style,
          height: "6px",
          width: "100%",
          background: `linear-gradient(to right, #CCC ${start}%, #FF0000 ${start}%, #FF8C00 ${end}%, #CCC ${end}%)`,
          borderRadius: "4px",
        }}
      >
        {children}
      </div>
    );
  };

  const convertValueToPercentage = (value, options) =>
    value.map((v) => {
      const index = options.indexOf(v);
      return index >= 0 ? (index / (options.length - 1)) * 100 : 0;
    });

  const handleRangeChange = (setValue, options) => (values) => {
    const stepSize = 100 / (options.length - 1);
    const newValues = values.map((v) => options[Math.round(v / stepSize)]);
    setValue(newValues);
  };

  const createSlider = (value, setValue, options) => (
    <Range
      step={1}
      min={0}
      max={100}
      values={convertValueToPercentage(value, options)}
      onChange={handleRangeChange(setValue, options)}
      renderTrack={({ props, children }) =>
        renderTrack({ props, children, value, options })
      }
      renderThumb={renderThumb}
    />
  );

  const formatRange = (values, unit) => {
    const formattedValues = values.map((v) =>
      v === "무제한" || v === "160만원+" ? v : `${v}${unit}`
    );
    return `${formattedValues[0]} ~ ${formattedValues[1]}`;
  };

  return (
    <>
      <div className="filterBox">
        <div className="filters">
          <div className="filterSection">
            <h2>휴대폰 종류</h2>
            <div className="buttonGroup">
              {[
                "전체",
                "자급제 휴대폰",
                "중고 휴대폰",
                "요금제 결합 휴대폰",
              ].map((type) => (
                <button
                  key={type}
                  className={`button ${
                    activePhoneType === type ? "active" : ""
                  }`}
                  onClick={() => handlePhoneTypeClick(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div className="filterSection">
            <h2>제조사</h2>
            <div className="buttonGroup">
              {["전체", "삼성", "LG", "Apple", "기타"].map((manufacturer) => (
                <button
                  key={manufacturer}
                  className={`button ${activeManufacturer === manufacturer ? 'active' : ''}`}
                  onClick={() => handleManufacturerClick(manufacturer)}
                >
                  {manufacturer}
                </button>
              ))}
            </div>
          </div>
          <div className="sliderContainer">
            <h2>가격대: {formatRange(priceValue, "")}</h2>
            {createSlider(priceValue, setPriceValue, priceOptions)}
            <div className="sliderLabels">
              {priceOptions.map((option, index) => (
                <span
                  key={index}
                  style={{
                    left: `${(index / (priceOptions.length - 1)) * 100}%`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterBox;
