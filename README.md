# Anti-Chess

## Description

Anti-Chess is a variant of chess where the objective is to lose all your pieces before your opponent does. This project implements a web-based version of Anti-Chess using React.js.

## Features

- Full implementation of Anti-Chess rules
- Interactive chessboard with move validation
- Piece movement animations
- Game info panel showing current player and piece counts
- Move history sidebar
- Ability to quit or reset the game

## Live Demo

https://suraj826580.github.io/anti-chess/

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies:

5. Open your browser and visit `http://localhost:3000`

## How to Play

1. The game starts with White's turn.
2. Click on a piece to select it. Valid moves will be highlighted.
3. Click on a highlighted square to move the selected piece.
4. If a capture is possible, you must make a capturing move.
5. The goal is to lose all your pieces before your opponent does.
6. The game ends when a player has no pieces left, and that player is declared the winner.

## Rules

- All pieces move as they do in standard chess.
- Capturing is mandatory. If multiple captures are possible, you can choose which one to make.
- There is no check or checkmate.
- Pawns can promote, but only to a queen.
- The king can be captured like any other piece.
- The player who loses all their pieces first wins the game.

## Technologies Used

- React.js
- Styled Components
- JavaScript (ES6+)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Suraj Yadav - surajyadav826580@gmail.com

Project Link: https://github.com/suraj826580/anti-chess

## Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Styled Components](https://styled-components.com/)
- [Chess.js](https://github.com/jhlywa/chess.js) (for inspiration on chess move validation)
