Clarent is a split, tented, columnar keyboard with a bistable compliant mechanism that physically shifts between typing and gaming layouts. <span class="hide-on-mobile">This implementation allows the entire left-hand key matrix to physically shift with a satisfying and tactile click, to switch between a standard ASDF layout for typing and a WASD-optimized layout for gaming.</span>

<img src="ezgif-1306001d1e5c97.gif"/>

<div style="text-align: center;"><em>Notice the left 3 columns shifted up such that they are horizontally aligned</em></div>

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

## The problem
I type a lot. I also game. I got my first split keyboard in 2021, the Keebio Iris. (https://keeb.io/collections/iris-split-ergonomic-keyboard) This was a split, columnar, tented design. This was a significant step up for typing. However, as I used it more, I started to notice some problems and made some adjustments.

Firstly, the thumb keys were the same switch type as the alpha keys, but when our hand naturally rests on the keyboard, the thumbs should be resting on a lower plane than the rest of the fingers. To solve this, I ordered some low profile switches and keycaps, desoldered the thumb key switches and replaced them with the low profile ones. This greatly improved the ergonomics of the keyboard overall.

Secondly, the ergonomic benefits of the column stagger are lost during gaming. The standard ASDF home row shifts to WASD, misaligning the fingers with the columns they were designed for (e.g., the index finger moves from F to D). This is the primary issue I'm aiming to address, and I'll discuss some conventional solutions below.
## Conventional solutions and why they are suboptimal
### In-Game Key Remapping (e.g., WASD to ESDF)
- Not enough keys to the right of ESDF for additional key-binds
- While it opens up keys on the left, it relies on the less dexterous ring and pinky fingers for access.
- Some games do not allow alpha keys (like Z) to be used as modifiers, or vice versa, limiting flexibility.
- Using a Mod-Tap function to make a key Shift on hold and Space on tap introduces latency; the Space action can only register on the key's release, which is unacceptable for gaming
### Using a Toggleable Firmware Layer
- Toggling a layer that shifts all keys one position to the right effectively removes an entire column, making it impossible to type normally without switching back.
- It requires a manual button press to activate, and it's easy to forget which layer is active, even with visual cues like RGB lighting.
- The need to manually switch layers is slow and adds unnecessary mental overhead.
## Project Goals
### Primary Design Goals
- A split, tented, columnar foundation with adjustable tenting.
- Seamlessly accommodates both typing and gaming use cases.
- Instantaneous or automatic switching between typing and gaming modes.
- Low-profile construction to keep hands closer to the desk surface.
- Ergonomic thumb cluster positioned slightly lower than the main alpha keys.
- A concave key-well to reduce finger travel distance.
- Hot-swappable switch sockets for easy customization and repair.
### Production Goals
- The case and key components should be 3D printable on consumer-grade FDM printers.
- Modular design to allow for easy iteration and testing, especially for the thumb cluster.
- Custom PCBs designed to support hot-swap sockets.
### Secondary Design Goals
- Compatible with use on a large desk mat or mousepad.
- Cable routing that exits from the top/front edge of the keyboard to avoid interference.

[[Clarent Engineering Decisions]]
## Key Takeaways
## Moving forwards
## Reflection