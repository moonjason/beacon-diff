import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function DenseTable(props) {
  const [data,setData] = React.useState({});
  const getData = () => {
    fetch("aa.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (myJson) {
        console.log(myJson);
        setData(myJson)
      });
  };

  React.useEffect(()=>{
    getData()
  },[])
  
  const convertObjToArr = (obj) => {
    const arr = [];
    for (const property in obj) {
      let regExp = data[property] ? new RegExp(data[property]) : new RegExp("(?=a)b");
      arr.push({
        name: [property],
        value: obj[property],
        match: regExp.test(obj[property]) ? "Yes" : "No",
      });
    }
    return arr;
  };
  const rows = convertObjToArr(props.beacon);
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell style={{ maxWidth: 100 }}>Param</TableCell>
            <TableCell align="right" style={{ maxWidth: 100 }}>
              Value
            </TableCell>
            <TableCell align="right" style={{ maxWidth: 100 }}>
              Match
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ maxWidth: 100 }}>
                {row.name}
              </TableCell>
              <TableCell align="right" style={{ maxWidth: 100 }}>
                {row.value}
              </TableCell>
              <TableCell align="right" style={{ maxWidth: 100 }}>
                {row.match}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
