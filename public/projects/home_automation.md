# Home Light control
Technologies used: GoLang, Postman, APIs

## Defining the Problem
- Multiple brand of smart light in the house, each with their own app
- Previous workflow is: unlock phone -> open app -> wait for app to load -> do the light control
- Apps have no IOS widgets

## My Solution
- API hosted locally on RaspberryPi (to avoid bad actors)
- Consolidates the various interfaces from different companies into one unified API and scheme for control
- Create Shortcuts (iOS) to make requests to API
	- Way more accessible than previous workflow
	- Wake up phone -> Swipe to left for widgets -> Click a button
- Ability to customize commands (e.g. "Toggle light" from off to on would turn on light at 100% brightness, regardless of previous brightness)
- Ability to interface with other IoT devices, such as a [[Macropad]] powered by an ESP8266

## Engineering
- Wanted to learn about Go (programming language)
- Able to get experience with Go Paradigm (e.g. Error handling, Modules, compile to binary, environmental variables for secrets), Gin (routing), net/http (HTTP client and server implementations)
- Hosted with Docker and ran as a Linux service to start automatically on boot, and restart after error
- Infinitely extensible for future devices

# Weather Display
## The problem:
To check the temperature before I change to go out, I’d have to walk back from the closet to my desk and unlock my phone

## My solution:
- An OLED display that displays the outside temperature and weather
- Uses an API hosted by me that digests information from OpenWeather and parses it into a format that Arduino C can easily process
- Offloading data pipeline logic to a Go (programming language) instead of Arduino C makes processing much simpler

# Future considerations:
- OLED screen will have burn in eventually - I’ll just replace the whole device when that happens
- Could turn OLED off during the night but I wanted low hanging fruit prototype with minimal resistance
- Don’t want to query OpenWeather too often - My hosted API queries it once every 30 minutes
- Can only update during the day so it doesn’t update when I’m asleep
