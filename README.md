#  Weather app (React + TypeScript + Vite)

## How to run 
In the root of the folder, runt these following commands:

> npm install

> npm run dev

> visit https://localhost:5173

## Review of the project

Time available for the project: 4 hrs

Actual taken time: 6hrs

### How it went

Firstly, I divided the app in three main features
1. Search
2. Current weather
3. Upcoming days

From this I made an very roughtly sketch of the application (15min)

#### These are done:
#### 1. Search bar

The [Open Meteo API](https://open-meteo.com/en/docs) takes location in form of latitude and longitude.
This information can be fetched from [Open Meteo's GeoCoding API](https://open-meteo.com/en/docs/geocoding-api). We'll get the first found location and use the geo data to further do fetch weather data. This took about 3 hr.

#### 2. Current Weather
With the data fetched, we'll  display it in this section. Time taken is about 1 hr.

#### 3. Upcoming days
This is missing due to time limit.

## Further development
* Create the daily weather section, here I would make a toolbar with date, max/min temperature and then render the list of info.
* Make a design in maybe Figma, I felt stuck when not having a clear vision of the design.
* Translate the weather code and show actual image
* Implement the weather toggle, there are already preperation for that.
* Write tickets to have more focus on each task.
* Add loading spinner, maybe on the search button
* Add search on key down
