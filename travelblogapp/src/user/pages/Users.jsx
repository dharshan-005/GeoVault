import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import UserList from "../components/UserList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const { isError, sendRequest, clearError } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          import.meta.env.VITE_BACKEND_URL + "/users",
        );
        setLoadedUsers(responseData.users);
      } catch (err) {}
      setIsInitialLoading(false);
    };

    fetchUsers();
  }, [sendRequest]);

  // console.log("BACKEND:", process.env.REACT_APP_BACKEND_URL);
  // console.log("ASSETS:", process.env.REACT_APP_ASSETS_URL);

  return (
    <>
      <ErrorModal error={isError} onClear={clearError} />

      {isInitialLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}

      {!isInitialLoading && loadedUsers && <UserList items={loadedUsers} />}
    </>
  );
};

export default Users;

// import React, { useEffect, useState } from "react";
// import { useHttpClient } from "../../shared/hooks/http-hook";

// import UserList from "../components/UserList";
// import ErrorModal from "../../shared/components/UIElements/ErrorModal";
// import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import { useRef } from "react";

// const Users = () => {
//   const { isLoading, isError, sendRequest, clearError } = useHttpClient();
//   const [loadedUsers, setLoadedUsers] = useState();
//   const initialLoad = useRef(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const responseData = await sendRequest(
//           "http://localhost:5000/api/users",
//         );

//         setLoadedUsers(responseData.users);
//         initialLoad.current = false;
//       } catch (err) {}
//     };
//     if (initialLoad.current) {
//       fetchUsers();
//     }
//   }, [sendRequest]);

//   return (
//     <>
//       <ErrorModal error={isError} onClear={clearError} />
//       {isLoading && initialLoad.current && (
//         <div className="center">
//           <LoadingSpinner />
//         </div>
//       )}
//       {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
//     </>
//   );
// };

// export default Users;
