import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import CodeDiff from './CodeDiff';

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
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [text_1, setText_1] = React.useState('');
  const [text_2, setText_2] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleTextChange_1 = (event) => {
    setText_1(event.target.value);
    props.update("control", event.target.value);
  };
  const handleTextChange_2 = (event) => {
    setText_2(event.target.value);
    props.update("variant", event.target.value);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Input" {...a11yProps(0)} />
          <Tab label="Output" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div style={{
          width: "100%",
          height: "90vh",
          display: "flex"
        }}>
          <div style={{
            width: "50%",
          }}>
            <TextField
              id="standard-multiline-flexible"
              label="CONTROL"
              fullWidth
              multiline
              value={text_1}
              onChange={handleTextChange_1}
              variant="standard"
            />
          </div>
          <div style={{
            width: "50%",
          }}>
            <TextField
              id="standard-multiline-flexible"
              label="VARIANT"
              fullWidth
              multiline
              value={text_2}
              onChange={handleTextChange_2}
              variant="standard"
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div style={{
          height: "90vh",
          width: "100%",
          backgroundColor: "red"
        }}>
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
                horizontal: "auto"
              },
              automaticLayout: true,
              minimap: {
                enabled: false
              },
              enableSplitViewResizing: false,
              readOnly: true
            }} />
        </div>
      </TabPanel>
    </div>
  );
}
