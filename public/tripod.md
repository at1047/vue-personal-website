![[d73a66f5-5536-4363-82bb-1d1d7d1bb1a6.jpeg]]

# Problem Overview
- I record volleyball videos with a phone
- Phone + tripod occasionally gets hit by a fast moving volleyball
- Tripods are usually made from thin sheet metal usually break and replacement costs are adding up

# Final Product
- Design a tripod with designated compliant spots and failure points
- Use of TPU parts allow parts to flex instead of break
- Designed specific failure points (phone adaptor, legs getting unlocked) with easy to replace parts to avoid hard-to-replace parts getting destroyed instead
- Multiple parts to get the best strength directions when 3D printing
- Use of screws and heat-set inserts to reinforce 3D printed parts perpendicular to layer lines

# Project Goals
- Strength and durability -> Use clever geometry, hardware, and design parts with strength directions in consideration
- Modularity - Ability to change out broken parts on the fly
- DFM - Mostly 3D printed and off-the-shelf hardware

# Engineering Considerations

## How to have a little flex in the base for the legs to absorb impact, but not compromise the stability of the tripod
- 
## Material Selection
- Use TPU to allow parts to flex instead of break

## Locking Mechanism
- Use not completely rigid foot locking mechanism to allow legs to unfold, instead of breaking

# FEA (ANSYS)

## So the tripod broke...

![[tripod_2.jpeg]]

## Ran some FEA in ANSYS

Left is the old one, right is the improved one

![[tripod_1.png]]
## Takeaways from FEA
- import STEP model from fusion
- merge together first to avoid having to model screw forces (pre-tension)
- initial model with constraint on dowel, with force applied perpendicular to tripod leg at the end
- force calculated by chatgpt
	- speed of hit from pro
	- mass of volleyball
	- contact time of volleyball
- new model with shell
- use von-mises stress, see stress points at where the tripod broke
- make changes
	- rib (ugly)
	- reduce radius
	- increase wall thickness
	- incorporate flutes (reduced strength somehow?)
		- sanity test with flat objects, still had reduced strength and increased deflection
		- need to check second moment of inertia theory
- used to find local maximum stresses
- able to reduce by 180MPa