# Lybrary

A digital board game library and ranking system, built to help manage and choose from the Lybrand family's extensive collection of 50+ board games.

## Core Features

### Game Catalog

- Digital inventory of all board games
- Detailed game information including:
  - Player counts (min/max)
  - Play time (min/max)
  - Complexity rating (1-5)
  - Images
  - Description
  - Categories/mechanics

### Game Finder

- Advanced filtering system
- Filter by:
  - Number of players
  - Available time
  - Desired complexity
  - Categories/mechanics

### Game Ranking System

- Tournament-style comparison system
- Head-to-head matchups from filtered game pool
- Uses [Swiss-system tournament](https://en.wikipedia.org/wiki/Swiss-system_tournament) algorithm
- Generates ordered list of preferred games

## Technical Implementation

### Data Layer

- Cloudflare D1 database (SQLite)
- Drizzle ORM for type-safe queries
- Initial data migration from CSV
- R2 storage for game images

### API & Routing

- React Router v7 for client/server routing
- Cloudflare Workers for API endpoints
- Type-safe loader/action patterns

### Frontend

- React components
- Tailwind CSS for styling
- Responsive design for mobile/desktop

## Development Roadmap

1. Database Setup

   - Create Drizzle schema for games table
     - Add staging and production databases
     - Add all the db scripts to the repo
     - Figure out what should be in wrangler.toml
     - Setup schema properly
   - Write migration for initial CSV data import
   - Set up R2 bucket for images

2. Core Pages

   - Home page with quick actions
   - Game details page
   - Filtered game list
   - Game comparison/ranking interface

3. Game Finder Implementation

   - Filter form component
   - Real-time filtering
   - Results display

4. Ranking System
   - Swiss tournament algorithm implementation
   - Head-to-head comparison UI
   - Results storage and display

## Future Ideas

- User accounts for personal rankings
- Integration with BoardGameGeek API
- Play history tracking
- "Game night" planning tool
- Player count optimizer (best games for X players)
- Game lending tracker
- Expansion tracking
- House rules documentation
- Setup guides/checklists
- Quick-reference rules
- Win/loss statistics
- Playing time tracker
- Difficulty progression suggestions
- Similar game recommendations
