## Executive Summary

I designed and built an impact-resistant tripod by repurposing components from a failed commercial tripod and integrating custom 3D-printed parts. The system was kinematically designed to absorb high-energy impacts—such as a volleyball strike—without catastrophic failure. Structural geometry was iteratively optimized using FEA, and multiple materials (TPU, Nylon, PETG) were selectively employed to balance stiffness, compliance, and durability. All components were designed for FDM 3D printing and modular replacement, enabling rapid repair and low-cost iteration.

![[tripod_icon.jpeg]]

## Problem Overview
- Camera tripods occasionally experience strong impacts during volleyball sessions
- Tripods are usually made from thin sheet metal, which are brittle and hard to repair
## Project Goals
- Impact resistance: must survive impacts without undergoing plastic deformation or fracturing
- Modularity: have the ability to change out broken parts on the fly
- DFM: must use 3D printed components and off-the-shelf hardware
## Final Product
- Introduced compliant regions to absorb impact energy, use of TPU parts allow parts to flex instead of break
- Designed nylon inserts to kinematically maintain stability with compliance from the TPU parts
- Designed specific failure points (phone adaptor, legs getting unlocked) with easy to replace parts to avoid hard-to-replace parts getting destroyed instead
- Utilize assembly of multiple parts to get the best strength directions when 3D printing
- Use of screws and heat-set inserts to reinforce 3D printed parts perpendicular to layer lines


## Cool Engineering Problems I solved

### How to have flex to absorb impact, but not compromise the stability of the tripod

The first iteration had a completely rigid base, which as you might imagine, fractured quite easily. The second iteration used TPU for the base, which solved the issue of fracturing, but would flex when simply standing, causing the whole system to fall over. The final design uses Nylon inserts (the triangular shaped things), which are pressed against the metal tripod body, and are the two points of contact that kinematically constrain the angle of the legs relative to the tripod body. This design is statically stable, but also allows for flex for impact absorption.

### Locking Mechanism

The triangular Nylon locking piece has a hole that is not circular by design. This is because when the legs are locked open, the locking tab is in tension between the circular side of the nylon piece, and the tripod body. However, when the locking tab needs to be disengaged, the user can bend the leg slightly outwards to move the pin inwards towards the tripod body, and disengage the locking pin.

## FEA (ANSYS)

After surviving for months, one time the tripod broke in a place that was not the folding mechanism. Therefore, to improve the durability, I had to improve the structural geometry of this part. I used ANSYS to run some FEA analysis, applying contact forces at the pin and locking mechanism holes, and applying an impact to the tip of the leg, applied at an angle that's realistic to the tripod's impact with a ball or a wall.

![[tripod_2.jpeg]]


### FEA: Before (left) and After (right)

![[tripod_1.png]]
### Takeaways from FEA
- import STEP model from fusion
- merge together first to avoid having to model screw forces (pre-tension)
- initial model with constraint on pin hole, with force applied perpendicular to tripod leg at the end
- force of impact calculated by:
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
