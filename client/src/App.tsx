import React, { useState } from "react";
import { useGetDirectoryQuery } from "./services/directory";

function App() {
  const { data, error, isLoading } = useGetDirectoryQuery("");

  return (
    <div className="App">
      <ul>{data && data.map((file) => <li>{file.name}</li>)}</ul>
    </div>
  );
}

export default App;
