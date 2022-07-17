import { useEffect, useState } from "react";
import { List, Search } from "semantic-ui-react";
import { fetchSubjects } from "../api/api";
import api from "../api/axios";
import axios from "axios";

const SubjectLink = ({ setSubjectId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState(-1);

  const getSubjects = async () => {
    try {
      const data = await fetchSubjects();
        setItems(data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  const onClickItem = (e, index) => {
    const value = e.target.getAttribute("data-value");
    setSubjectId(value);
    setActiveItem(index);
  };

  const [searchValue, setSearchValue] = useState("");
  const filteredItems = items.filter(item => {
    return item.p01.toLowerCase().includes(searchValue.toLowerCase());
  });


  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <>
      <Search
        placeholder="Поиск..."
        onSearchChange={handleSearchChange}
        showNoResults={false}
        style={{ textAlign: "center", width: "250px" }}
      />
      {!loading &&
        <List link style={{ overflowY: "scroll", maxHeight: "70vh" }}>
          {filteredItems.map((item, index) => (
            <List.Item
              active={index === activeItem}
              key={index} as={"a"}
              onClick={(e) => onClickItem(e, index)}
              value={item.p00}
            >{item.p01}</List.Item>
          ))}
        </List>
      }
    </>
  );
};
export default SubjectLink;