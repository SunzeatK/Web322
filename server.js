/********************************************************************************
 *  WEB322 – Assignment 03
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Sujit Khadka Student ID: 137630232 Date: 13/06/2025
 *
 *  Published URL: ___________________________________________________________
 *
 ********************************************************************************/

const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

const projectData = require("./modules/projects");

app.use(express.json());
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// About route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Projects route (supports sector filtering)
app.get("/solutions/projects", (req, res) => {
  const sector = req.query.sector;

  if (sector) {
    projectData
      .getProjectsBySector(sector)
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  } else {
    projectData
      .getAllProjects()
      .then((projects) => {
        res.json(projects);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  }
});

// Dynamic project by ID route
app.get("/solutions/projects/:id", (req, res) => {
  const id = parseInt(req.params.id);

  projectData
    .getProjectById(id)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

// Custom 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Initialize and start the server
projectData
  .initialize()
  .then(() => {
    console.log("Project data initialized");
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Initialization Error", error);
    process.exit(1);
  });
