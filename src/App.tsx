import React from "react";
import "./App.css";
import MultiSelect, { Option } from "./components/MultiSelect";

function App() {
  // Initial options with emojis as icons
  const options: Option[] = [
    { id: "1", label: "Education", icon: "🎓" },
    { id: "2", label: "Science", icon: "🔬" },
    { id: "3", label: "Art", icon: "🎨" },
    { id: "4", label: "Sport", icon: "⚽" },
    { id: "5", label: "Games", icon: "🎮" },
    { id: "6", label: "Health", icon: "🏥" },
  ];

  const handleSelectionChange = (selectedOptions: Option[]) => {
    console.log("Selected options:", selectedOptions);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Multi-Select Dropdown</h1>
        <div className="demo-container">
          <MultiSelect
            options={options}
            placeholder="Select categories..."
            onSelectionChange={handleSelectionChange}
            allowAddNew={true}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
