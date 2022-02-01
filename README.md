# Exam 2021 | Landrup Dans

## Description

This project has consisted of coding a mobile app for the dance school, Landrup Dans.

They have had to use an app to be able to give users an easy way to sign up for teams and for instructors to be able to see registered teams and team participants.

The sub-tasks have been completed: cookies + deployment automation

The app is a SPA that was bootstrapped with create-react app and does not make use of any React frameworks.

Find an optimized build on Netlify: NOTE: This requires a locally running API.

## Tech stack

```
React
React-hook-form
Gatsbyjs/reach-router
Axios
Sass
Animate.css
React-cookie
Styled-components
```

### React

In order to easier build user interfaces I've used React, as my go to JavaScript library.

My reasons why:

- Easy to Learn and Use
- Built to be used with Single Page Applications
- Creating Dynamic Web Applications Becomes Easier
  (React utilizes JSX to write HTML inside components, Hook API)
- Known to be SEO friendly, and Performance Enhanced
- Has a lot of Handy tools and NPM packages
- It's one of the most supported and popular frameworks in use

### React-hook-form

Performant, flexible and extensible forms with easy-to-use validation.

Benefits:

- Reduces the amount of re-renders your form makes
- Write forms with less code
- Easy form validation

### Gatsbyjs/reach-router

I've used the reach-router from gatsbyjs, as it's updated to be compatible with the latest version of React.

Benefits:

- Create navigatable Links easier
- Parse Data From the URL

### Axios

Used instead of the Fetch API for CRUD operations.

- Decreases amount of code needed (Better Readability)
- Automatically takes care of converting response
- Has wider browser adoption compared to the Fetch API

### React-cookie

- Utilize cookies with less writable code

### Sass

Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.

### Animate.css

Animate.css is a css effects library which contains anything from transitions, to rotations

Benefits:

- Write and add effects with less code

### Styled-components

Styled-components is a library for React and React Native that allows you to use component-level styles in your application that are written with a mixture of JavaScript and CSS using a technique called CSS-in-JS.

Benefits:

- Sass Compatible
- Dynamic Styling with Props
- Theming using React’s Context API
- Consistency through no clashing with CSS selectors

## Code examples

### Cookies

In Home.js I've used cookies to set Token which contains basic user information, this ensures that the app runs accordingly to a user being logged in or not.

```react
const [token, setToken] = useState(null);
  const [cookies] = useCookies(["bf-token"]);

  useEffect(() => {
    if (cookies["bf-token"]) {
      setToken(cookies["bf-token"]);
    }
  }, []);
```

in UserCalendar.js I've used cookies to set URL parameters and Authorization token

```react
const response = await axios.get(
        `http://localhost:4000/api/v1/users/${cookies["bf-token"].userId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies["bf-token"].token}`,
          },
        }
      );
```

### Hide bottom navigation based on URL + Ternary operators for Routing and hide/show

In App.js I have used a <LocationProvider> to give components access to URL parameters through Reach Router.

A ternary operator is used in Line 13 to switch between two components. In this case the two calendars.

The LocationProvider works by adding a context to the desired page view through Conditional Rendering:

```react
App.js
    <LocationProvider value={history}>
      {(context) => (
        <Store.Provider value={{ token, setToken }}>
          <Router>
            <Welcome path="/" />
            <Home path="hjem" />
            <SearchPage path="soeg" />
            <Login default path="login" />
            <ClassDetails path="aktivitet/:id" context={context} />
            <TeamDetails path="hold/:id" />
            {/* If user role is instructor, show specific calendar otherwise user calendar */}
            {token?.role === "instructor" ? (
              <InstructorCalendar path="/kalender" />
            ) : (
              <UserCalendar path="/kalender" />
            )}
          </Router>

          <Paper
            sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            elevation={3}
          >
            <BottomNavbar context={context} />
          </Paper>
        </Store.Provider>
      )}
    </LocationProvider>
```

In our navigation BottomNavbar.js
We can then pass the context through the component as a Prop:

```react
export default function BottomNavbar({ context })
```

And write a ternary operator in Line 29 which return nothing if the URL is "/" and <BottomNavigation> on any other page if the URL is anything else:

```react
 return context.location.pathname === "/" ? null : (
    <Box sx={{ width: "100vw" }}>
      {/* Nav wrapper settings */}
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* If you are at home screen, show home button otherwise back button */}
        {context.location.pathname === "/hjem" ? (
          <BottomNavigationAction
            label="Hjem"
            icon={<HomeIcon />}
          />
        ) : (
          <BottomNavigationAction
            label="Tilbage"
            icon={<ArrowBackIcon />}
          />
        )}
```
