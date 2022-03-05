import React, { useEffect, useState } from "react";
import {
  Box,
  createStyles,
  makeStyles,
  Paper,
  Typography,
  Button,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const MovieDetails = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const showsDetails = useSelector((state) => state.showsList.list);

  useEffect(() => {
    // console.log(
    //   "selected-movies",
    //   showsDetails.find((item) => item.show.id == params.id)
    // );
    const obj = showsDetails.find((item) => item.show.id == params.id);
    // console.log("object", obj);
    setData(obj);
  }, [showsDetails, params]);

  const handleClick = () => {
    navigate(`/booking/${params.id}/${params.movie_name}`);
  };

  return (
    <div className={classes.main_div}>
      <Paper elevation={3} className={classes.card}>
        <Box
          style={{
            backgroundImage: `url(${data?.show?.image?.original})`,
            backgroundSize: "cover",
            height: "100vh",
            backgroundPosition: "initial",
          }}
        >
          <Box className={classes.card_content}>
            <Paper className={classes.inner_content}>
              <img src={data?.show?.image?.medium} alt={data?.show?.name} />
              <Box className={classes.head}>
                <Typography variant="h4" className={classes.summery}>
                  {data?.show?.name}
                </Typography>

                <Typography className={classes.summery}>
                  {data?.show?.genres.toString()}
                </Typography>
                <Typography className={classes.summery}>
                  language : <span>{data?.show?.language} </span>
                </Typography>

                <a
                  href={data?.show?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.link}
                >
                  <Typography>official website</Typography>
                </a>

                <Typography className={classes.rating}>
                  premier : <span>{data?.show?.premiered} </span>
                </Typography>
                <Typography className={classes.rating}>
                  Ratings : <span>{data?.show?.rating.average} </span>
                </Typography>
                <Button variant="outlined" className={classes.btn} onClick={handleClick}>
                  Book now
                </Button>
              </Box>
              <Box className={classes.summery_box}>
                <div
                  className={classes.summary}
                  dangerouslySetInnerHTML={{ __html: data?.show?.summary }}
                ></div>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};
const useStyles = makeStyles((theme) =>
  createStyles({
    main_div: {
      backgroundColor: "black",
    },

    card_content: {
      display: "flex",
      flexDirection: "row",
      padding: "31px",
    },
    summery: {
      paddingBottom: "2%",
      color: "#808191",
    },
    inner_content: {
      width: "-webkit-fill-available",
      display: "flex",
      backgroundColor: "#393b42fa",
      borderRadius: "12px",
      height: "405px",
    },
    head: {
      display: "flex",
      flexDirection: "column",
      textAlign: "initial",
      width: "40%",
      padding: "4%",
    },
    link: {
      color: "#808191",
      textDecoration: "none",
    },
    summery_box: {
      display: "flex",
      justifyContent: "end",
      marginTop: "4%",
      paddingRight: "4%",
      width: "50%",
    },
    fullsummery: {
      paddingBottom: "2%",
      color: "#fff",
      textAlign: "justify",
    },
    rating: {
      paddingBottom: "2%",
      paddingTop: "2%",
      color: "#fff",
    },
    summary: {
      textAlign: "justify",
      fontWeight: "800",
      color: "#fff",
      lineHeight: "27px",
    },
    btn:{
      color:"#fff"
    }
  })
);

export default MovieDetails;
