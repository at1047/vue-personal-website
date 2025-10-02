I want a portable [[Clarent]]!

# Project Goals
- As thin as possible
- Thumb cluster is offset downwards
- Tented, Split, Columnar (naturally)
- Can enclose itself into a slim form factor, no keys facing outwards, to put into bag

# How to get to those goals
## As thin as possible
- Use Kailh Choc switches
- Use PCB with hotswap sockets to route, would be thinner than wires
- Get the minimum height needed for keycaps, switches and HS sockets, will design everything around that height

## Offset thumb cluster
- Compliant from the pinky side with rotating lever
	- side towards pink would be too high?
	- left side would need to slide?
- 4 bar linkage
	- Need to secure, magnets or elastic
	- Springs make design thinner I think? Magnets are 6mm in diameter plus plastic housing
	- Not sure if magnets facing downwards/outwards is good idea
- Use controller holder as a lever for rigidity and for size

# Engineering Challenges

## Smooth rotations
- Some rotating joints are only supported from one side
- Use copper sleeve bushings and shoulder bolts
## Spring close pressure
- How to keep the mechanism open, since key presses want to close the keyboard
- Shock cord? -> Too low spring weight
- Truss calculations/free body diagram
- Python elastic truss calculator
	- Find the maximum press force for the innermost column before the joint moves
```Python
Inputs:
length of main, length of controller, height offsets, length of spring, tension needed to close, friction of feet
Output:
Max key press force before deformation

calc_max_press_force(L_a = 24, L_c = 9.8, A_to_B_offset = -7, L_b = 33, T_b = 12.9, F_u=0)

```
- Source spring from McMasterCarr to get known spring rate/other specifications vs amazon
- McMasterCarr parser to get force at 33mm (conversions and hooke's law), then put back into max press force calculator

## PCB
- Kicad -> Freeroute while fixing bad routes
- Use reversible footprints

## Connector to controller

