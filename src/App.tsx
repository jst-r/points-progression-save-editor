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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encodedSave);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Save Data</label>
        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-600 rounded px-3 py-2 bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Paste your save here..."
            value={encodedSave}
            onChange={(e) => setEncodedSave(e.target.value)}
          />
          <button onClick={copyToClipboard}>Copy</button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Add Offline Time</label>
        <div className="flex gap-2">
          <button onClick={() => addOfflineTime(MS_IN_HOUR)}>+1 hour</button>
          <button onClick={() => addOfflineTime(8 * MS_IN_HOUR)}>
            +8 hours
          </button>
          <button onClick={() => addOfflineTime(24 * MS_IN_HOUR)}>
            +1 day
          </button>
        </div>
      </div>

      {arraySave && (
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-400">Decoded Save</label>
          <pre className="text-left bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-gray-300 overflow-auto max-h-64">
            {JSON.stringify(arraySave, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;
