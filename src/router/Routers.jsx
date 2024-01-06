import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import ThankYou from "../pages/ThankYou";
import SearchResultList from "./../pages/SearchResultList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Navigate to="/home" />} />
      <Route path="/home" exact element={<Home />} />
      <Route path="/tours" exact element={<Tours />} />
      <Route path="/tours/:id" exact element={<TourDetails />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/thank-you" exact element={<ThankYou />} />
      <Route path="/tours/search" exact element={<SearchResultList />} />
    </Routes>
  );
};

export default Routers;
