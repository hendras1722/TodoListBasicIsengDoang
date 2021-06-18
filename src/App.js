import "./App.css";
import Data from "./data.json";
import { useEffect, useState } from "react";

function App() {
  const [stateData, setStateData] = useState([]);
  const [stateChange, setChange] = useState(null);
  const [stateKondisi, setKondisi] = useState(null);
  const [stateKondisi2, setKondisi2] = useState(false);
  const [stateUpdate, setUpdate] = useState(null);
  const [stateName, setStateName] = useState("");

  useEffect(() => {
    const onRenderData = () => {
      setStateData(Data.data);
    };
    onRenderData();
  }, []);

  const onTambah = () => {
    setStateData((prevState) => [
      { name: stateChange, ready: true },
      ...prevState,
    ]);
    setChange("");
    setStateName("");
  };
  const onChange = (e) => {
    setChange(e.target.value);
  };

  const onEnter = (e) => {
    if (String(e.key).toLowerCase() === "enter") {
      onTambah();
    }
  };

  const onKondisi = (e) => {
    setKondisi(e);
    setKondisi2(!stateKondisi2);
  };

  const onUpdate = (e) => {
    setChange(e.name);
    setUpdate(stateData.findIndex((item) => item.name === e.name));
    setStateName("update");
  };

  const onDeleteData = (e) => {
    const deleteData = [...stateData];
    deleteData.splice(
      stateData.findIndex((data) => data.name === e.name),
      1
    );
    setStateData(deleteData);
  };

  const onhandleupdate = () => {
    let newArray = [...stateData];
    newArray[stateUpdate].ready = false;
    setStateData(newArray);
    setChange("");
    setStateName("");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="App"
    >
      <div>
        <div>
          Masukkan Todo list &nbsp;
          <input
            onChange={onChange}
            onKeyDown={onEnter}
            value={stateChange}
            disabled={stateName === "update" ? true : false}
          />
          {stateName === "update" ? (
            <button onClick={() => onhandleupdate()}>Update Selesai</button>
          ) : (
            <button onClick={() => onTambah()}>Simpan</button>
          )}
        </div>
        <div style={{ maxHeight: 330 }}>
          {stateData.length > 0 &&
            stateData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: 20,
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() => onKondisi(index)}
              >
                {stateKondisi === index && stateKondisi2 ? (
                  <>
                    <button onClick={() => onUpdate(item)}>Update</button>
                    <button onClick={() => onDeleteData(item)}>Delete</button>
                  </>
                ) : (
                  <>
                    <div>{item.name}</div>
                    <div>
                      {item.ready ? (
                        <img
                          src="https://image.flaticon.com/icons/png/512/2530/2530973.png"
                          style={{ width: 30 }}
                          alt="ceklistSukses"
                        />
                      ) : (
                        <img
                          src="https://image.flaticon.com/icons/png/512/304/304671.png"
                          style={{ width: 20 }}
                          alt="ceklistFalse"
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
