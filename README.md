# Modular Calculator

This was originally a test task I completed as part of a job application procces. The instructions to this task can be found here (in Russian): https://sendsay.notion.site/Frontend-e378a45c3a934dafb6e44f79da2a0040

I had a lot of fun with this project and I decided to add it to my portfolio (with permission from the task issuer).

The live version of this app can be found here: https://modular-calculator.netlify.app/

## Features
### Constructor Mode
- In this mode, buttons are inactive
- Drag and drop any module from the left pane to the right one
- Drag any module in the right pane to change its position
- Display module always goes to the top and can't be moved
- While any module is being dragged, a blue indicator line shows where it will land if dropped
- Double click any module to remove it from the right pane
### Runtime Mode
- Modules can't be moved but the buttons become active
- The app behaves as a calculator (even if not all modules have been added to the right pane)
- The font of the display can scale down to accomodate longer values
- The results get rounded up and formatted so that they fit the display
- The calculator's display and memory get reset upon switching between modes

## Technologies Used
- React framework
- TypeScript for type checking
- SCSS for style management. The file *variables.scss* can be used to modify styles globally
- Redux (w/ Redux Toolkit) for state management. All app components interact with Redux through an abstraction layer implemented in *interface-hooks.ts*
- classNames library for managing dynamic class names