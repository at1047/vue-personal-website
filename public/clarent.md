![[clarent_3.png#inverted]]

# Overview
What is a split, tented, columnar keyboard?
*in order of deepness?*
- Columnar
	- Positioning key matrix in columns rather than rows
	- Staggering key columns for different finger lengths
- Split
	- Ability to position the the two halves further apart
	- Ability to angle keyboards so wrist are in line with arms (reduce ulnar deviation)
- Tented
	- Wrist's natural position is 0° (wrist perpendicular to desk)
	- Allows keyboard to be tilted so wrists don't have to pronate as much

# Defining the problem
My pain points when using ergonomic keyboards on the market:
- When gaming, column stagger tailored for individual finger lengths doesn't fit anymore since home position is shifted over by one, from asdf to wasd (index on F -> D)
- Only control key on bottom left, missing a control for additional inputs (can’t move to thumb cluster, control key often use in conjunction with space key)
- Primary left thumb key used for shift when typing, needs to be space when gaming

# Conventional solutions and why they are suboptimal
- Remapping game (Remap movement keys from WASD to ESDF)
	- Not enough keys on the right of ESDF for additional key-binds
	- Additional keys on the left, but pinky and ring finger is less dexterous than pointer finger
	- No more modifiers on left besides Control key, can't use alpha keys as modifiers in some games
	- Using Mod-Tap for Shift -> Space is slow because the Space registers on the falling edge of the keypress
- Gaming layer (Add a toggleable layer to shift all keys to the right by one)
	- Removes an entire column from the keyboard, can’t type normally without switching layers
	- Needs pressing of a button, sometimes forget to switch layers even with visual cue (RGB)
	- Slow to switch, additional mental overhead

# Goals
### Design Goals
- Split, tented (adjustable), columnar
- Good for gaming and typing
- Fast switching between gaming and typing modes
- As low profile as possible
- Thumb keys lower than alpha keys
- Key-well
- Hot-swappable

### Production Goals
- 3D Printable
- Modular for iterations
	- Thumb cluster
- PCBs for hot-swap switches

### Secondary Design Goals
- Use with mousepad or not
- Wires come out from top
# What is Clarent
- Split, Tented
- Bistable
- Offset thumb cluster
- 

# Prototyping/concepts
- How to translate columns up and down smoothly (use tradeoffs table)
	- Sliding mechanism with sanding for tolerances
	- Gears/Bearings
	- Ball bearings sliding in track
	- Magnets for endpoints
	- *Compliant mechanism*
	- FMEA (Failure Mode and Effects Analysis)
		- Fatigue stress in compliant mechanism
- Key layout considerations
- DFM for FDM 3D Printing

# Final product
# Key Takeaways
# Moving forwards
# Reflection