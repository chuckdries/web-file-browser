import React, { useState } from "react";
import { useGetDirectoryQuery } from "./services/directory";

function App() {
  const { data, error, isLoading } = useGetDirectoryQuery("");

  return (
    <div className="App">
      <ul>
        {data &&
          data.map((file) =>
            file.isDir ? (
              <li>{file.name}</li>
            ) : (
              <li>
                <a
                  className="text-blue-600 underline"
                  target="_blank"
                  href={`http://localhost:3001${file.url}`}
                >
                  {file.name}
                </a>
              </li>
            )
          )}
      </ul>
    </div>
  );
}

export default App;
