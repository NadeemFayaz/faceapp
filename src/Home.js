const Home = ({ status }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        margin: "50px",
      }}
    >
      <div style={{ color: "lightgreen" }}>Status: {status}</div>
      <br />

      <div style={{ fontSize: "100px" }}> Hi!</div>
      <div>You are verified Sucessfully</div>
    </div>
  );
};

export default Home;
