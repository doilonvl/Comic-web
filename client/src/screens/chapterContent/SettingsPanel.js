import React from "react";
import { GearFill } from "react-bootstrap-icons";

const SettingsPanel = ({
  settings,
  setSettings,
  showSettings,
  toggleSettings,
}) => {
  if (!settings) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const labelStyle = {
    margin: "5px 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
  };

  const inputStyle = {
    margin: "5px 0 15px",
    padding: "8px",
    border: "1px solid #ced4da",
    borderRadius: "4px",
    width: "100%",
  };
  const panelContainerStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 1000,
  };

  const panelStyle = {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
    display: showSettings ? "flex" : "none",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const gearIconStyle = {
    cursor: "pointer",
    marginBottom: "10px",
  };

  const selectStyle = {
    ...inputStyle,
    cursor: "pointer",
  };

  return (
    <div style={panelContainerStyle}>
      <GearFill
        style={gearIconStyle}
        size={24}
        color="gray"
        onClick={toggleSettings}
        title="Cài đặt nội dung đọc"
      />
      <div className="settings-panel" style={panelStyle}>
        <div style={labelStyle}>Kích thước chữ:</div>
        <input
          style={inputStyle}
          type="number"
          name="fontSize"
          value={settings.fontSize}
          onChange={handleChange}
          min="12"
          // max="24"
        />
        <div style={labelStyle}>Phông chữ:</div>
        <select
          style={selectStyle}
          name="fontFamily"
          value={settings.fontFamily}
          onChange={handleChange}
        >
          <option value="Arial">Arial</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>
    </div>
  );
};

export default SettingsPanel;
