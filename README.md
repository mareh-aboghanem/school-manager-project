# School Management CLI

This is a template for a school management CLI application. The application will allow users to manage courses and trainees through a command-line interface.
Project specification and requirements can be found in the following link: https://hub.hackyourfuture.nl/core-program-week-7

## Setup

1. Click on "Use this template" to create a new repository on your GitHub account based on this template. ![template](./assets/template.png)
2. Clone the newly created repository to your local machine.
3. Install the dependencies by running `npm install` in the terminal.
4. Start the application by running `npm start` in the terminal.

## Tests

To run the tests, use the command `npm test` in the terminal. This will execute all the test files in the `tests` directory.

## Folder Structure

- `src`: directory contains all the source code for your application. Those are the JavaScript files that will implement the logic for your CLI application.
- `tests`: directory contains all the test files for your application.
- `data`: directory will contain the data of the trainees and courses. This is where the data is saved.

## Architecture

High level of the architecture of the application

![Diagram of the architecture](./assets/architecture-chart.png)

As you can see, the application is divided into several components:

- **Command Parser**: Responsible for parsing the user input, extracting the command, subcommand, and arguments, and returning them in a structured format.

- **Course/Trainee Command handler**: Reads the subcommand and calls the appropriate function with the arguments.

- **Storage**: Responsible for saving and loading data from a file. This will be used to persist the courses and trainee data.

## Source files

- `index.js`: The entry point of your application. It will ask the user for input, parse the command, and call the appropriate handler trainees handler / mentor handler based on the command.
- `command-parser.js`: Contains the logic to parse (read and process) the user input.
- `traineeCommands.js`: Contains functions related to trainee management, such as adding a trainee, listing trainees, etc.
- `courseCommands.js`: Contains functions related to course management, such as adding a course, listing courses, etc.
- `storage.js`: Contains functions to save and load data from a JSON file, which will be used to persist the courses and trainee data.

You may create additional files if needed.

Project setup completed

## Project Description

This project is a Node.js CLI application that simulates a simple school management system.  
It allows managing trainees and courses, including creating, updating, deleting, and viewing entities, as well as enrolling and removing trainees from courses.

The application follows a modular architecture with clear separation between command parsing, command handling, validation logic, and data persistence.

## Features Implemented

### Trainee Management

- Create trainee
- Update trainee
- Delete trainee
- View trainee with enrolled courses
- View all trainees (sorted by the last Name)

### Course Management

- Create course
- Update course
- Delete course
- View course with participants
- View all courses (sorted by the start Date)
- Join course
- Leave course

### Business Rules

- A trainee can join a maximum of 5 courses
- Each course has a maximum capacity of 20 trainees
- Unique ID generation for trainees and courses

## Validation & Error Handling

- Command parsing with input normalization
- Validation for required parameters
- Entity existence validation
- Course date format validation (YYYY-MM-DD)
- CLI error handling using Chalk
- Storage error logging using console.error

## Additional Files

- `commonFunctions.js`: Utility functions for validation and shared logic, including unique ID generation, entity existence checks, and course date format validation.

## Learning Reflection

This project helped me practice building a larger JavaScript application with multiple modules, implementing business rules, working with CLI input parsing, and applying Git workflow using branches and pull requests.  
The JOIN functionality was particularly challenging and required careful reasoning about data relationships and constraints.
