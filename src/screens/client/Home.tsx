import { Box, Tab, Tabs } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import React from "react";
import ListCard from "../../components/ListCard";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "85%", margin: "0 auto", pt: 10 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            icon={<CategoryIcon />}
            iconPosition="start"
            label="Sản Phẩm"
            {...a11yProps(0)}
          />
          <Tab
            label="Giỏ Hàng"
            icon={<ShoppingCartIcon />}
            iconPosition="start"
            {...a11yProps(1)}
          />
          <Tab
            label="Đơn Hàng"
            icon={<ReceiptLongIcon />}
            iconPosition="start"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ListCard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
};

export default Home;
