import "./ShowBox.css"

const ShowBox = ({ showRightContainer, currentImage  }) => {
  return (
    <>
      <div
        className="rightContainer"
        style={{ visibility: showRightContainer ? "visible" : "hidden" }}
      >
        <img
          src={`/image/image${currentImage}.png`}
          alt="background"
          className="backgroundImage"
        />
      </div>
    </>
  );
};

export default ShowBox;