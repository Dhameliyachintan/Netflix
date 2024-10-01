import express from "express"
import { getMoviedata, getMovieTrailer, getMoviesDetails, getMoviesSimilar, getMoviesCategorys } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getMoviedata);
router.get("/:id/trailers", getMovieTrailer);
router.get("/:id/details", getMoviesDetails);
router.get("/:id/similar", getMoviesSimilar);
router.get("/:category", getMoviesCategorys);

export default  router;