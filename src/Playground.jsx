import { useState } from "react";
import "./styles.css";

const TOTAL = 9;
const GRID_SIZE = 3;

export default function GridLights() {
  const [activeCells, setActiveCells] = useState([]);
  const [activationOrder, setActivationOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  console.log(activeCells, "active");

  const handleClick = (index) => {
    // TODO: Implement click logic
    setActiveCells((prev) => {
      const set = new Set(prev);
      if (set.has(index)) return prev; // return same reference, no re-render
      return [...set, index];
    });
  };

  const resetGrid = (order) => {
    let index = activeCells.length;

    // TODO: Implement reverse deactivation
    let timer = setInterval(() => {
      console.log(index, "index");
      index--;
      if (index < 0) {
        clearInterval(timer);
        return;
      }

      setActiveCells((prev) => prev.slice(0, index));
    }, 1000);
  };

  // const resetGrid = () => {
  //   let timer = setInterval(() => {
  //     setActiveCells((prev) => {
  //       if (prev.length === 0) {
  //         clearInterval(timer);
  //         return [];
  //       }

  //       return prev.slice(1); // remove the first item
  //     });
  //   }, 1000);
  // };

  return (
    <div className="main-container">
      <h1 className="grid-title">Grid Lights</h1>

      <div className="button-section">
        <button onClick={resetGrid} data-testid="reset-btn">
          Reset Grid
        </button>
        <input
        id="pin"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="1234"
        style={{
          fontSize: 24,
          padding: 10,
          width: "100%",
          maxWidth: 300,
          marginTop: 10,
        }}
      />
      </div>

      <div className="cinema-hall" data-testid="grid-lights">
        {Array.from({ length: GRID_SIZE }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: GRID_SIZE }, (_, colIdx) => {
              const index = rowIdx * GRID_SIZE + colIdx;
              let checkActive = activeCells.includes(index);

              return (
                <div
                  key={index}
                  className={`cell col ${checkActive ? "active" : ""}`}
                  onClick={() => handleClick(index)}
                  data-testid={`cell-${index}`}
                >
                  {index}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
