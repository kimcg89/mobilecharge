import "./ShowBox.css"

const ShowBox = ({ showRightContainer, currentImage  }) => {
  return (
    <>
      <div
        className="rightContainer"
        style={{ visibility: showRightContainer ? "visible" : "hidden" }}
      >
        <img
          src={process.env.PUBLIC_URL + `/image/image${currentImage}.png`}
          alt="추천 요금제"
          className="backgroundImage"
        />
      </div>
    </>
  );
};

export default ShowBox;