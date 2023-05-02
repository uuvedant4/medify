import GaugeChart from "react-gauge-chart";

const Guage = ({ gauge }) => {
  const chartStyle = {
    width: 420,
  };

  const gaugeContainerStyle = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "120%",
  };

  return (
    <div style={gaugeContainerStyle}>
      <GaugeChart
        nrOfLevels={5}
        colors={["#ffcc00", "#99cc33", "#339900", "#FF5F1F", "#E10600"]}
        arcWidth={0.3}
        needleColor="#C0C0C0"
        needleBaseColor="gray"
        animDelay={0}
        textColor="#000"
        formatTextValue={(value) => value}
        percent={gauge}
        style={chartStyle}
        animateDuration={7000}
      />
    </div>
  );
};

export default Guage;
