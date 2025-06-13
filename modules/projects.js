const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

let initialize = () => {
  return new Promise((resolve, reject) => {
    try {
      projectData.forEach((project) => {
        let sector = sectorData.find(
          (element) => element.id == project.sector_id
        );
        project.sector = sector.sector_name;
        projects.push(project);
      });
      resolve();
    } catch (error) {
      reject("Failed to initilize data");
    }
  });
};

let getAllProjects = () => {
  return new Promise((resolve, reject) => {
    if (projects.length === 0) {
      reject("No projects found.");
    } else {
      resolve(projects);
    }
  });
};

let getProjectById = (projectId) => {
  return new Promise((resolve, reject) => {
    let project = projects.find((project) => project.id == projectId);
    if (project) {
      resolve(project);
    } else {
      reject("Unable to find project with ID");
    }
  });
};

let getProjectsBySector = (sector) => {
  return new Promise((resolve, reject) => {
    let matches = projects.filter((p) =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (matches.length > 0) {
      resolve(matches);
    } else {
      reject("No projects found for given sector ");
    }
  });
};

module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector,
};

// initialize();
// getAllProjects();
// getProjectById(5);
// getProjectsBySector("agriculture");
