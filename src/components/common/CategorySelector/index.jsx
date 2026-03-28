import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { categoryServices } from "@services/category.service";
import { ConfigProvider, Select } from "antd";
import "./style.css";
const CategorySelector = ({ onLeafSelect }) => {
  const [selectedLevel1, setSelectedLevel1] = useState("");
  const [selectedLevel2, setSelectedLevel2] = useState("");
  const [selectedLevel3, setSelectedLevel3] = useState("");

  // Level 1 —  fetch root category
  const { data: level1Data, isLoading: loadingL1 } = useQuery({
    queryKey: ["categories", null],
    queryFn: () => categoryServices.getSubCategories(null),
  });

  // Level 2 — fetch when level 1 is selected
  const { data: level2Data, isLoading: loadingL2 } = useQuery({
    queryKey: ["categories", selectedLevel1],
    queryFn: () => categoryServices.getSubCategories(selectedLevel1),
    enabled: !!selectedLevel1,
  });

  // Level 3 — fetch when level 2 is selected
  const { data: level3Data, isLoading: loadingL3 } = useQuery({
    queryKey: ["categories", selectedLevel2],
    queryFn: () => categoryServices.getSubCategories(selectedLevel2),
    enabled: !!selectedLevel2,
  });

  const level1Options = (level1Data?.data?.data ?? []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));
  const level2Options = (level2Data?.data?.data ?? []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));
  const level3Options = (level3Data?.data?.data ?? []).map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const handleLevel1Change = (value) => {
    setSelectedLevel1(value);
    setSelectedLevel2("");
    setSelectedLevel3("");
  };

  const handleLevel2Change = (value) => {
    setSelectedLevel2(value);
    setSelectedLevel3("");
  };

  const handleLevel3Change = (v) => {
    const value = v;
    setSelectedLevel3(value);
    onLeafSelect(value);
  };

  const selectTheme = {
    components: {
      Select: {
        colorBgContainer: "#ffffff",
        colorText: "#000000",
        colorBorder: "#e5e7eb",
        borderRadius: 9,
        activeOutlineColor: "transparent",
        colorBgElevated: "#fff",
        controlHeight: 40,
        hoverBorderColor: "#d9d9d9",
        activeBorderColor: "#d9d9d9",
      },
    },
  };

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {/* Level 1 */}

      <ConfigProvider theme={selectTheme}>
        <Select
          placeholder="Select category"
          onChange={handleLevel1Change}
          options={level1Options}
          className="category-select"
          style={{ minWidth: 200 }}
          disabled={loadingL1}
          popupClassName="category-custom-dropdown"
        />
      </ConfigProvider>

      {/* Level 2 */}
      {selectedLevel1 && (
        <ConfigProvider theme={selectTheme}>
          <Select
            placeholder="Select Sub category"
            onChange={handleLevel2Change}
            options={level2Options}
            className="category-select"
            style={{ minWidth: 200 }}
            disabled={!selectedLevel1 || loadingL2}
            popupClassName="category-custom-dropdown"
          />
        </ConfigProvider>
      )}

      {/* Level 3 */}
      {selectedLevel2 && (
        <ConfigProvider theme={selectTheme}>
          <Select
            placeholder="Select Sub-subcategory"
            onChange={handleLevel3Change}
            options={level3Options}
            className="category-select"
            style={{ minWidth: 200 }}
            disabled={!selectedLevel2 || loadingL3}
            popupClassName="category-custom-dropdown"
          />
        </ConfigProvider>
      )}
    </div>
  );
};

export default CategorySelector;
