import { useState } from "react";
import "./App.css";

import * as LZString from "lz-string";

const MS_IN_HOUR = 3600000;

function App() {
  const [encodedSave, setEncodedSave] = useState("");
  const decodedSave = LZString.decompressFromEncodedURIComponent(encodedSave);
  const arraySave: any[] | null = decodedSave
    ? JSON.parse(`[${decodedSave}]`)
    : null;

  const addOfflineTime = (ms: number) => {
    if (!arraySave) {
      console.error("Invalid save");
      return;
    }
    arraySave[1] -= ms;
    setEncodedSave(
      LZString.compressToEncodedURIComponent(
        arraySave.map((v) => JSON.stringify(v)).join(","),
      ),
    );
  };

  return (
    <>
      <div className="text-white flex gap-4">
        <span>Enter a save here:</span>
        <input
          className="border"
          type="text"
          value={encodedSave}
          onChange={(e) => setEncodedSave(e.target.value)}
        />
      </div>
      <div className="flex gap-4 items-center">
        <span>Add offline time:</span>
        <button onClick={() => addOfflineTime(MS_IN_HOUR)}>+1h</button>
        <button onClick={() => addOfflineTime(8 * MS_IN_HOUR)}>+8h</button>
        <button onClick={() => addOfflineTime(24 * MS_IN_HOUR)}>+1d</button>
      </div>
      <div>{JSON.stringify(arraySave)}</div>
    </>
  );
}

export default App;
