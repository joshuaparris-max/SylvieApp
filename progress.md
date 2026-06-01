Original prompt: qa the whole app, look for bugs and fix them please, make sure it is all fun and works well

## QA Log

- Started whole-app QA pass.
- Initial code review targets: localStorage shape resilience, touch interactions, puzzle completion, block builder duplicate blocks, route coverage, and child-friendly feedback.
- Fixed robustness issues across saved state: settings, fairy garden, farm, drawings, puzzles, stories, sorting, and block builder now tolerate old or malformed localStorage.
- Fixed child-experience bugs: block cells now replace instead of stacking duplicates, sorting gives clearer selected-item feedback, and the movement timer can restart after finishing.
- Browser QA found that animated Fairy Garden star buttons never became stable and were harder to tap. Fixed by keeping the tappable star buttons stationary.
- Browser QA also showed the colouring canvas sat too low on phone-sized screens. Moved the canvas above controls on mobile so finger painting is easier to discover.
- Browser QA found placed blocks covered their grid cells, making recolouring awkward. Fixed placed blocks so tapping one recolours it with the active colour, or selects it if the colour already matches.
