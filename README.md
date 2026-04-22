#  Weather app (React + TypeScript + Vite)

## How to run 
In the root of the folder, runt these following commands:

> npm install

> npm run dev

> visit https://localhost:5173

### How it went

Firstly, I divided the app in three main features
1. Search
2. Todays weather
3. Upcoming days

From this I made an very roughtly sketch of the application (15min) at first. Then used Google Stitch AI tool to create the wireframes.

#### These are done:
#### 1. Search bar

The [Open Meteo API](https://open-meteo.com/en/docs) takes location in form of latitude and longitude.
This information can be fetched from [Open Meteo's GeoCoding API](https://open-meteo.com/en/docs/geocoding-api). We'll get the first found location and use the geo data to further do fetch weather data.

When searching, a drowpdown of the best matched locations will show, then can me selected to fetch the weather data.

#### 2. Current Weather
With the data fetched, we'll  display the weather in hourly for today.

#### 3. Upcoming days
Another section to show the weather of upcoming days.

## Further development
* Create the daily weather section, here I would make a toolbar with date, max/min temperature and then render the list of info.
* Make a design in maybe Figma, I felt stuck when not having a clear vision of the design.
* Translate the weather code and show actual image
* Implement the weather toggle, there are already preperation for that.
* Write tickets to have more focus on each task.
* Add loading spinner, maybe on the search button
* Add search on key down
