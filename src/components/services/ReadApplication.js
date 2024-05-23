export const fetchApplications = (setApplication) => {
    return fetch("https://courseworkback.azurewebsites.net/applications/read")
      .then((res) => res.json())
      .then((result) => {
        setApplication(result);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  };