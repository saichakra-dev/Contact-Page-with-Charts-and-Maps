# Contact Management App with Charts and Maps

This is a simple contact management application built with **ReactJS**, **TypeScript**, **Redux**, **React Query**, **React Router**, **TailwindCSS**, and **React Leaflet**. The application allows users to manage contacts by adding, editing, and deleting them, and also provides a dashboard with COVID-19 data visualized through charts and maps.

## Features

- **Contact Management**:
  - Add new contacts with first name, last name, and status (Active/Inactive).
  - View a list of all contacts with options to edit or delete them.
  - Update existing contacts' details.
- **Charts and Maps**:
  - A dashboard that shows a **line chart** of global COVID-19 case fluctuations (cases, deaths, recoveries) over time.
  - An interactive **map** with markers showing the country name and COVID-19 statistics (active cases, recovered, and deaths) using **React Leaflet**.

## Technologies Used

- **ReactJS**: Frontend library for building user interfaces.
- **TypeScript**: Superset of JavaScript with static typing.
- **Redux**: State management library for managing the contact list.
- **React Query**: Data-fetching and server-state management.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **React Router**: Routing library for navigating between pages.
- **React Leaflet**: Map library for interactive maps.
- **Chart.js**: For rendering line charts.

## How to Run the App

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v12 or higher)
- **npm** or **yarn**

### Installation Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/contact-management-app.git
   cd contact-management-app
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Run the application**:

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   This will start the development server, and the app will be available at `http://localhost:5173`.

### Project Structure

- **components/**: Contains reusable components like `ContactForm`, `Contacts`, `Charts`, and `Map`.
- **features/**: Redux slice for managing contact state.
- **App.tsx**: Main application entry point where routes are defined.
- **AppRoutes.tsx**: Handles routing to the different pages like Contact List, Create Contact, Charts, and Maps.

### API Usage

The app uses the following APIs to display COVID-19 data:

- **Worldwide COVID-19 Data**: `https://disease.sh/v3/covid-19/all`
- **Country-Specific COVID-19 Data**: `https://disease.sh/v3/covid-19/countries`
- **COVID-19 Historical Data**: `https://disease.sh/v3/covid-19/historical/all?lastdays=all`

These APIs are used in the `Charts` and `Map` components to fetch data and display charts and maps accordingly.

---

This `README.md` provides a high-level overview of the application and instructions for installation and running the project.
