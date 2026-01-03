
## Executive Summary

Clarent is a split, tented, columnar keyboard with a bistable compliant mechanism that physically shifts between typing and gaming layouts. <span class="hide-on-mobile">This implementation allows the entire left-hand key matrix to physically shift with a satisfying and tactile click, to switch between a standard ASDF layout for typing and a WASD-optimized layout for gaming. The project integrates ergonomic analysis, compliant mechanism design, and DFM-conscious mechanical engineering to produce a fully 3D-printable, modular input device.</span>

<img src="ezgif-1306001d1e5c97.gif"/>

<div style="text-align: center;"><em>Notice the left 3 columns shifted up such that they are horizontally aligned</em></div>

## My journey and problems I found

I type a lot. I also game. I got my first split keyboard in 2021, the Keebio Iris. It was split, columnar, tented, a significant step up for typing. However, as I used it more, I began noticing some problems and making adjustments.

*(explanation of terms in appendix)*

Firstly, Columnar keyboards are optimized around assuming the user has a fixed home-row. While gaming, the home position shifts from ASDF to WASD, throwing off finger alignment (e.g., the index finger moves from F to D).

Secondly, the thumb keys were the same height the alpha keys. When our hand naturally rests on the keyboard, the thumbs should be resting on a lower plane than the rest of the fingers.

%%  To solve this, I ordered some low profile switches and keycaps, desoldered the thumb key switches and replaced them with the low profile ones. This greatly improved the ergonomics. %%

## Conventional solutions and why they are suboptimal
### In-Game Key Remapping (e.g., WASD to ESDF)
One common solution is to remap every game you play to use ESDF movement instead of WASD, and similarly rebind all the other keys to be around these new movement keys. Drawbacks of this are:
- Not enough keys to the right of ESDF for additional key-binds
- While it opens up keys on the left, it relies on the less dexterous ring and pinky fingers for access.
- Some games do not allow alpha keys (like Z) to be used as modifiers
%% - Using a Mod-Tap function to make a key Shift on hold and Space on tap introduces latency; the Space action can only register on the key's release, which is unacceptable for gaming %%
### Using a Toggleable Firmware Layer
Another common solution was to have a "gaming mode" that is toggled on and off via firmware. Drawbacks of this are:
- Toggling this mode shifts all keys one position to the right effectively removes an entire column, making it impossible to type without switching back
- It's easy to forget which layer is active
- Adds two additional key presses needed to type in game

# My Solution: Clarent

![[clarent_full.jpg]]

My solution was to design a mechanism that physically shifts the staggered columns back up so they are level with the other columns.%% , which reduces the ergonomic benefits, but made more sense for both WASD usage and typing. Since I don't spend the majority of my time gaming and typing, I'd want to be able to shift the columns back down when I know for sure I'm not gaming. %%

## Project Goals
### Primary Design Goals
- A split, tented, columnar foundation with adjustable tenting
- Seamlessly accommodates both typing and gaming use cases
- Clear switching between typing and gaming modes
- Low-profile construction to keep hands closer to the desk surface
- Ergonomic thumb cluster positioned slightly lower than the main alpha keys
- A concave key-well to reduce finger travel distance
- Hot-swappable switch sockets for easy customization and repair
### Production Goals
- The case and key components should be 3D printable on consumer-grade FDM printers
- Modular design to allow for easy iteration and testing, especially for the thumb cluster
- Custom PCBs designed to support hot-swap sockets
### Secondary Design Goals
- Compatible with use on a large desk mat or mousepad
- Cable routing that exits from the top/front edge of the keyboard to avoid interference

## Implementation

Do achieve my goals, I chose to use a compliant mechanism. Compliant mechanisms are particularly well suited to FDM 3D printing; they replace traditional assemblies—such as bearings, rails, and fasteners—with elastic deformation in a single printed part. I was able to come to an elegant solution that satisfies multiple requirements simultaneously: bistability, simplicity (in assembly), DFM for 3D printing, with the bonus of nice tactile feedback.

Read more on why I picked a compliant mechanism: [[Clarent Engineering Decisions]]

### Left Half
- Implemented compliant mechanism to shift columns up and down here
- Modular columns were hand-wired because the wire I had on hand wasn't flexible enough to survive movement

![[clarent_under_left.jpg]]

### Right Half
- Uses entirely flexible PCBs and Hotswap sockets
- Uses more flexible silicone wire

![[clarent_under_right.jpg]]


## Non-technical Takeaways

- Not every use case is solved for
- Low hanging fruit
## Future work
- Maybe incorporate Hall Effect Switches
- Thumb keys that are more than a single direction (joysticks, omnidirectional buttons)
- Portability

# Appendix
## Breakdown of Core Ergonomic Definitions
- **Columnar Layout**
	- Positions keys in vertical columns rather than the staggered horizontal rows of traditional keyboards.
	- Staggers each column vertically to better match the natural lengths of different fingers.
- **Split Design**
	- Ability to position the the two halves further apart arms don't have to meet near the centerline of body
	- Ability to angle keyboards so wrist are in line with arms (reduce ulnar deviation)
- **Tented** 
	- Raises the inner edge of each keyboard half, similar to a tent.
	- This allows the wrists to rest in a more neutral, "handshake" position, reducing forearm pronation (the twisting motion required to lay your hands flat).


