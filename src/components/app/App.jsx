import Citizen from "components/citizen";

import "./app.css";

const App = ({
  citizens,
  editId,
  setEditIdHandler,
  updateCitizenDataHandler,
}) => {
  return (
    <div className="container">
      <h1 className="title">Жители</h1>
      {citizens.map((citizen) => (
        <Citizen
          key={citizen._id}
          citizen={citizen}
          editId={editId}
          setEditIdHandler={setEditIdHandler}
          updateCitizenDataHandler={updateCitizenDataHandler}
        />
      ))}
    </div>
  );
};

export default App;
