export const fetchApplications = (setApplication) => {
    return fetch("https://courseworkback.azurewebsites.net/applications/read")
    // return fetch("http://localhost:8080/applications/read")
      .then((res) => res.json())
      .then((result) => {
        setApplication(result);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  };