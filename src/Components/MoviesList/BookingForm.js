import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  createStyles,
  makeStyles,
  Paper,
  Typography,
  Button,
  TextField,
  Snackbar,
  SnackbarContent,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const BookingForm = () => {
  const classes = useStyles();
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [authenticationStatus, setAuthenticationStatus] = useState("");
  const showsDetails = useSelector((state) => state.showsList.list);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [msg, setMsg] = useState("");
  const params = useParams();
  useEffect(() => {
    console.log(
      "selected-movies",
      showsDetails.find((item) => item.show.id == params.id)
    );
    const obj = showsDetails.find((item) => item.show.id == params.id);
    // console.log("object", obj);
    setData(obj);
  }, [showsDetails, params]);
  const handleOnchange = (event) => {
    setName(event.target.value);
    setNumber(event.target.value);
  };
  const handleClick = () => {
    if (name != "" && number != "" && date != "") {
      setSnackbarStatus(true);
      setAuthenticationStatus("your booking has successfuly done");
      let obj = {
        name: name,
        "phone Number": number,
        Date: date,
        Movie: data?.show?.name,
      };

      localStorage.setItem("userDeatils", JSON.stringify(obj));
    } else {
      setSnackbarStatus(true);
      setAuthenticationStatus("please enter the information");
    }
  };
  return (
    <>
      <Box className={classes.main_box}>
        {/* <Box className={classes.top_Heading} ><Typography>booking for {data?.show?.name} </Typography></Box> */}
        <Paper elevation={2} className={classes.crad}>
          <img src={data?.show?.image?.medium} alt={data?.show?.name} />

          <Typography className={classes.movie_name} variant="h5">
            {data?.show?.name}
          </Typography>
        </Paper>
        <Paper elevation={3} className={classes.summary_card}>
            <div className={classes.summary} dangerouslySetInnerHTML={{__html: data?.show?.summary}}></div>

          {/* <Typography>{data?.show?.summary.substring(3)   }</Typography> */}
        </Paper>
        <Box className={classes.form}>
          <TextField
            variant="outlined"
            type="text"
            label="enter your name"
            value={name}
            className={classes.text}
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            type="number"
            label="mobile number"
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />
          <TextField
            variant="outlined"
            type="date"
            className={classes.date}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          <Button
            className={classes.btn}
            variant="outlined"
            onClick={handleClick}
          >
            Book my Show
          </Button>
        </Box>
      </Box>
      <Snackbar
        message={authenticationStatus}
        open={snackbarStatus}
        autoHideDuration={5000}
        onClose={() => setSnackbarStatus(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
    </>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid #808191",
      width: "24%",
      padding: "4%",
      marginTop: "3%",
      borderRadius: "12px",
      height:"35%"
    },
    date: {
      paddingTop: "3%",
    },
    crad: {
      marginTop: "4%",
      height:"35%"

    },
    movie_name: {
      textTransform: "capitalize",
      fontSize: "x-large",
      color: "#808191",
      background: "black",
    },
    text: {
      paddingBottom: "3%",
    },
    summary_card: {
      width: "30%",
      display: "flex",
      textAlign: "justify",
      padding: " 3%",
      marginTop: "4%",
      borderRadius: "12px",
      backgroundColor: "black",
      color: "#808191",
      textTransform: "capitalize",
      height: "35%",

    },
    summary:{
        textAlign: 'justify',
        fontWeight: '800'
    },
    main_box: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: "6%",
      backgroundColor: "rgb(218, 220, 224)",
      height:"100vh"
      
    },
    btn: {
      marginTop: "4%",
    },
  })
);
export default BookingForm;
