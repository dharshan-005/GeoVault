import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import PlaceList from "../components/PlaceList";
import { AuthContext } from "../../shared/context/auth-context";

const UserPlaces = () => {
  const params = useParams();
  const auth = useContext(AuthContext);
  const userId = params.userId || auth.userId;

  const { isLoading, isError, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  // const userId = useParams().userId;
  // const {userId} = useParams();

  // useEffect(() => {
  //   if (!userId || userId === "undefined") {
  //     return;
  //   }

  //   const fetchPlaces = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${import.meta.env.VITE_BACKEND_URL}/places/user/${userId}`,
  //       );
  //       setLoadedPlaces(responseData.places);
  //     } catch (err) {}
  //   };

  //   fetchPlaces();
  // }, [sendRequest, userId]);

  useEffect(() => {
    if (!userId) return;

    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${import.meta.env.VITE_BACKEND_URL}/places/user/${userId}`,
        );
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };

    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId),
    );
  };

  console.log("USER ID:", userId);

  return (
    <>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
