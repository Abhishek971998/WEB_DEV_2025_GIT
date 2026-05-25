import React, { useState } from "react";

function CinemaHall() {
  const ROWS: number = 10,
    COLS: number = 10;

  const [currentSelect, setCurrentSeat] = useState<string[]>([]);

  function getSeatNum(p1: number, p2: number): string {
    return `${String.fromCharCode(65 + p1)}${p2}`;
  }

  function handleSelectSeats(param: string) {
    setCurrentSeat((prev: string[]) => {
      if (prev?.includes(param)) return prev;

      return [...prev, param];
    });
  }

  return (
    <div
      className="main-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div>CinemaHall</div>
      <div>
        <button>Booked</button>
        <button>CLear</button>
      </div>
      <div
        className="cinema-columns"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {Array.from({ length: ROWS }, (_, rowINdex) => {
          return (
            <div>
              {Array.from({ length: COLS }, (_, colInd) => {
                const seatNum = getSeatNum(rowINdex, colInd);
                return (
                  <div
                    style={{
                      border: "2px solid",
                      padding: 10,
                      margin: 10,
                      background: currentSelect.includes(seatNum)
                        ? "red "
                        : "white",
                    }}
                    onClick={() => handleSelectSeats(seatNum)}
                  >
                    {seatNum}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CinemaHall;
