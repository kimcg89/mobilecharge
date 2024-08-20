import { useState } from "react";
// npm install react-range
import { Range } from "react-range";
import "./OptionBox.css";

const OptionBox1 = () => {
  const dataOptions = [0, 1, 2, 3, 5, 10, 50, 100, "무제한"];
  const voiceOptions = [0, 50, 100, 250, 500, "무제한"];
  const smsOptions = [0, 50, 100, 250, 500, "무제한"];

  const [dataValue, setDataValue] = useState([
    dataOptions[0],
    dataOptions[dataOptions.length - 1],
  ]);
  const [voiceValue, setVoiceValue] = useState([
    voiceOptions[0],
    voiceOptions[voiceOptions.length - 1],
  ]);
  const [smsValue, setSmsValue] = useState([
    smsOptions[0],
    smsOptions[smsOptions.length - 1],
  ]);

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
    <div className="sliderBox">
      <div className="sliders">
        <div className="sliderContainer">
          <h2>데이터: {formatRange(dataValue, "GB")}</h2>
          {createSlider(dataValue, setDataValue, dataOptions)}
          <div className="sliderLabels">
            {dataOptions.map((option, index) => (
              <span
                key={index}
                style={{
                  left: `${(index / (dataOptions.length - 1)) * 100}%`,
                  whiteSpace: "nowrap",
                }}
              >
                {option === "무제한" ? option : `${option}GB`}
              </span>
            ))}
          </div>
        </div>
        <div className="sliderContainer">
          <h2>음성량: {formatRange(voiceValue, "분")}</h2>
          {createSlider(voiceValue, setVoiceValue, voiceOptions)}
          <div className="sliderLabels">
            {voiceOptions.map((option, index) => (
              <span
                key={index}
                style={{
                  left: `${(index / (voiceOptions.length - 1)) * 100}%`,
                  whiteSpace: "nowrap",
                }}
              >
                {option === "무제한" ? option : `${option}분`}
              </span>
            ))}
          </div>
        </div>
        <div className="sliderContainer">
          <h2>문자: {formatRange(smsValue, "건")}</h2>
          {createSlider(smsValue, setSmsValue, smsOptions)}
          <div className="sliderLabels">
            {smsOptions.map((option, index) => (
              <span
                key={index}
                style={{
                  left: `${(index / (smsOptions.length - 1)) * 100}%`,
                  whiteSpace: "nowrap",
                }}
              >
                {option === "무제한" ? option : `${option}건`}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionBox1;
