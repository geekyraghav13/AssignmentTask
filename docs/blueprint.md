# **App Name**: TwentyFortyFun

## Core Features:

- Board Display: Display a 4x4 grid with tiles representing the game board. The tiles should show values that are powers of 2, starting from 2.
- Move Input: Capture player input (Up, Down, Left, Right) to control tile movement. Use clear visual cues to indicate move direction.
- Game Logic: Implement game logic to shift tiles in the chosen direction, combine tiles of the same value, and add a new tile (2 or 4) to a random empty cell after each move.
- Win/Loss Condition: Detect when a tile with the value 2048 is created, and declare the player as the winner. Also, detect when no valid moves are possible and end the game with a 'Game Over' message.

## Style Guidelines:

- Primary color: A vibrant orange (#FF8C00) to represent the challenge and excitement of the game. It stands out against lighter backgrounds and adds warmth.
- Background color: A very light, desaturated orange (#FAEBD7, also known as AntiqueWhite) that provides a subtle backdrop and ensures the focus remains on the game tiles.
- Accent color: Use a soft yellow (#F0E68C, also known as Khaki), analogous to orange, to highlight specific elements, such as the current score or important notifications. It contrasts gently with the orange and background.
- Clean, modern typography to ensure readability.
- A centered 4x4 grid layout for the game board. Use spacing to clearly distinguish the tiles from each other.
- Smooth transitions when tiles move and merge. These subtle animations give feedback to the user. Do not add too much animation, so the game feels simple.