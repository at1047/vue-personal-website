# Rust
- Clippoon
	- A way to have up to 4 copy and paste contexts
- sdev
	- Replace repetitive git commands used at work with smarter text parsing
# Go
- Weather API
	- gets weather data from openweatherAPI and converts into format understandable by arduino C
- Home API
	- combines APIs from different light makers
	- accepts requests from devices
		- able to have a shortcut on apple devices control lights
		- able to have esp32 based macropad also control lights

# Python
- Volleyball Setting Trajectory Model
	- ODE for volleyball trajectory, with air resistance as a function of velocity
	- implement function as 
- Elastic Truss Calculator
	- Carwennan (portable split keyboard) has a four bar linkage in an unstable state when opened, needed to calculate strength of tension spring to keep it open when in use (key presses)
	- 
- Personal Finance Pipeline
	- bank statements (csv) -> pandas (python) -> ML categorization model -> upload via google automation -> google looker studio (free tableau/power bi)
	- LLM Takeaways
		- Tried LLMs with different parameters, bigger ones work so much better, small ones can't follow simple instructions
		- Prompt engineering, can ask existing LLM for prompt
			- fill in the blank
			- clear and concise language
			- examples
		- Use RAG to tailor LLM to dynamically changing database categories
		- RAG pipeline
			- Convert existing database to embedding
			- get most relevant embeddings -> most relevant data
			- pipe most relevant data into LLM prompt as examples
- QMK Layout Parser
# Javascript
- CSV to Table Converter
	- custom csv to table parser with dynammic regex matching
- SQL Analyser
	- analyzes statistics copy and pasted from STATISTICS IO ON from SQL
- Devops Widget
	- widget to change color and text depending on URL options, used as an embedded widget on devops dashboard for release days and times
- Vim Emulator
	- vim movement and editing in javascript
- Grass Scoreboard
	- mobile friendly scoreboard webapp that can and has a reminder to switch sides for outdoor volleyball