import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  createStyles,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { useNavigate, useParams } from "react-router-dom";
import { movies } from "./Action";
import { useSelector, useDispatch } from "react-redux";
import { showsList } from "./Reducer";

const MoviesList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const showsDetails = useSelector((state) => state.showsList.list);

  useEffect(() => {
    if (showsDetails.length == 0) {
      dispatch(movies());
    }
  }, [showsDetails.length]);

  const handleClick = (currItem) => {
    // console.log("curritem", currItem);
    // console.log("show-details", showsDetails);
    let selectedItem = showsDetails.find(
      (item) => item.show.id === currItem.show.id
    );
    let myShowId = selectedItem.show.id;
    let myShowname = selectedItem.show.name;
    navigate(`movie/${myShowId}/${myShowname}`);
  };
  useEffect(() => {
    // console.log("params", params);
  }, [params]);
  return (
    <Box className={classes.main_box}>
      <Box>
        <Typography variant="h3" className={classes.top_head}>
          Book your show
        </Typography>
      </Box>
      <Grid container spacing={6}>
        {showsDetails.map((item) => {
          return (
            <Grid className={classes.grid_item} item sm={3} key={item.show.id}>
              <Box className={classes.cardCont} key={item.show.id}>
                <img
                  src={item.show.image.medium}
                  alt={item.show.name}
                  className={classes.img}
                />
                <Box className={classes.details}>
                  <Typography className={classes.movies_details}>
                    Netflix original series
                  </Typography>
                  <Typography variant="h5" className={classes.movies_name}>
                    {item.show.name}
                  </Typography>
                  <Typography variant="h5" className={classes.movies_type}>
                    {item.show.genres.toString()}
                  </Typography>
                  <Typography variant="h5" className={classes.movies_name}>
                    language :
                    <span className={classes.span}> {item.show.language} </span>
                  </Typography>
                  <Button
                    className={classes.btn}
                    onClick={() => handleClick(item)}
                  >
                    Go for movie
                  </Button>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    grid_item: {
      justifyContent: "center",
      display: "flex",
    },
    top_head: {
      color: "#808191",
      paddingTop: "6%",
      marginBottom: "12px",
    },
    main_box: {
      // backgroundColor: "currentcolor",
      backgroundColor: "rgb(218, 220, 224)",
    },
    movies_details: {
      color: "#808191",
      fontWeight: "700",
    },
    details: {
      display: "flex",
      flexDirection: "column",
      alignItems: "baseline",
      border: "1px solid #d9d9d9",
      borderRadius: "6px",
      padding: "16px",
    },
    movies_name: {
      fontSize: "medium",
      fontWeight: "600",
    },
    movies_type: {
      fontSize: "medium",
      fontWeight: "600",
      color: "#808191",
    },
    span: {
      color: "#808191",
      fontWeight: "600",
    },
    btn: {
      background: "black",
      marginTop: "4%",
      color: "#fff",
      textTransform: "capitalize",
      fontSize: "medium",
      "&:hover": {
        background: "#1c273e",
        color: "#fff",
      },
    },
    cardCont: {
      backgroundColor: "#ffffff",
      width: "86%",
      boxShadow:
        "rgb(0 0 0 / 10%) 0px 20px 25px -5px, rgb(0 0 0 / 4%) 0px 10px 10px -5px",
      paddingTop: "10%",
      boxSizing: "border-box",
      padding: "8%",
      borderRadius: "10px",
    },
    img: {
      borderRadius: "8px",
      marginBottom: "15px",
    },
  })
);
export default MoviesList;
