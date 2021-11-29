import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CodeDiff from "./CodeDiff";
import DenseTable from "./DenseTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTextChange_control = (event) => {
    props.update("control", event.target.value);
  };
  const handleTextChange_variant = (event) => {
    props.update("variant", event.target.value);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Input" {...a11yProps(0)} />
          <Tab label="Diff" {...a11yProps(1)} />
          <Tab label="SDD" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div
          style={{
            width: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "50%",
              padding: "1%",
            }}
          >
            <TextField
              id="standard-multiline-flexible"
              label="CONTROL"
              fullWidth
              multiline
              value={props.control.raw}
              onChange={handleTextChange_control}
              variant="standard"
            />
          </div>
          <div
            style={{
              width: "50%",
              padding: "1%",
            }}
          >
            <TextField
              id="standard-multiline-flexible"
              label="VARIANT"
              fullWidth
              multiline
              value={props.variant.raw}
              onChange={handleTextChange_variant}
              variant="standard"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div
          style={{
            height: "90vh",
            width: "100%",
            backgroundColor: "red",
          }}
        >
          <CodeDiff
            language="json"
            originalValue={JSON.stringify(props.control.decoded, undefined, 2)}
            modifiedValue={JSON.stringify(props.variant.decoded, undefined, 2)}
            options={{
              theme: "vs",
              height: "100%",
              width: "100%",
              scrollbar: {
                vertical: "auto",
                horizontal: "auto",
              },
              automaticLayout: true,
              minimap: {
                enabled: false,
              },
              enableSplitViewResizing: false,
              readOnly: true,
            }}
          />
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
          }}
        >
          <div
            style={{
              width: "50%",
              padding: "1%",
            }}
          >
            <DenseTable beacon={props.control.decoded} />
          </div>
          <div
            style={{
              width: "50%",
              padding: "1%",
            }}
          >
            <DenseTable beacon={props.variant.decoded} />
          </div>
        </div>
      </TabPanel>
    </Box>
  );
}
