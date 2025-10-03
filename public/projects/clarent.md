Clarent is a **split**, **tented**, **columnar** keyboard featuring a **bistable compliant** mechanical sliding mechanism. This novel implementation allows the entire left-hand key matrix to physically shift, instantly and satisfyingly moving between a standard ASDF layout for typing and a WASD-optimized layout for gaming, solving the ergonomic and functional compromises of other solutions.

![[clarent_3.png#inverted]]

<p style="display: flex; flex-direction: row; justify-content: space-around">
  <img src="/clarent_4.jpg" width="300" />
  <img src="/clarent_5.jpg" width="300" /> 
</p>

*Notice the left 3 columns shifted up such that they are horizontally aligned*
## What is a split, tented, columnar keyboard?
*A breakdown of the core ergonomic concepts:*
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

First of all, the thumb keys were the same switch type as the alpha keys, but when our hand naturally rests on the keyboard, the thumbs should be resting on a lower plane than the rest of the fingers. To solve this, I ordered some low profile switches and keycaps, desoldered the thumb key switches and replaced them with the low profile ones. This greatly improved the ergonomics of the keyboard overall.

My pain points when using ergonomic keyboards on the market:
- Gaming Hand Position: The ergonomic benefits of column stagger are lost during gaming. The standard ASDF home row shifts to WASD, misaligning the fingers with the columns they were designed for (e.g., the index finger moves from F to D).
- Dual-Use Thumb Keys: The primary left thumb key is ideal for Shift during typing but needs to function as Space for gaming, requiring an inconvenient mode switch.
## Conventional solutions and why they are suboptimal
- In-Game Key Remapping (e.g., WASD to ESDF)
	- Not enough keys to the right of ESDF for additional key-binds
	- While it opens up keys on the left, it relies on the less dexterous ring and pinky fingers for access.
	- Some games do not allow alpha keys (like Z) to be used as modifiers, limiting flexibility.
	- Using a Mod-Tap function to make a key Shift on hold and Space on tap introduces latency; the Space action can only register on the key's release, which is too slow for many games.
- Using a Separate Firmware Layer for Gaming
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

## Engineering Considerations
### **Mechanism for Column Translation: Trade-off Analysis**

| Mechanism                    | Pros                                                                                                                                                                                                                | Cons                                                                                                                                                                                                                                                                                                                                                                          |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Simple Sliding Mechanism** | - Easiest to design and model.<br>- Lowest possible part count (can be integrated into the case).<br>- No cost for additional hardware.                                                                             | - Prone to "stiction" (sticking and then jerking free).<br>- Requires significant post-processing (sanding, filing) to achieve smooth motion.<br>- Highly dependent on 3D printer tolerances.<br>- Can feel gritty and wears down quickly from plastic-on-plastic friction.                                                                                                   |
| **Rack and Pinion**          | - Extremely smooth, precise, and reliable motion.<br>- Very durable with low wear.                                                                                                                                  | - High complexity in both design and assembly.<br>- Significantly increases the part count and cost (bearings, rods, fasteners).<br>- Adds bulk and weight, conflicting with the "low profile" design goal.                                                                                                                                                                   |
| **Ball Bearings in Track**   | - Much smoother than a simple sliding mechanism.<br>- Low hardware cost (ball bearings are inexpensive).                                                                                                            | - Assembly can be finicky and difficult.<br>- Requires small components with good tolerances such as bearing races.                                                                                                                                                                                                                                                           |
| **Magnets**                  | - Provides satisfying and positive tactile click when lock into place<br>- Won't wear out like physical detents                                                                                                     | - Will interfere with future implementations of hall effect switches<br>- Still need tracks for sliding mechanism, tolerancing and smoothness issues                                                                                                                                                                                                                          |
| **Compliant Mechanism**      | - **Monolithic design:** The entire mechanism (guide, spring, and structure) can be a single 3D-printed part.<br>- **Zero assembly:** Drastically simplifies production.<br>- **Low cost:** Only requires filament. | - **Fatigue failure:** This is the primary risk. The plastic may weaken and break after many actuation cycles.<br>- **Design complexity:** Requires iterative design and testing to perfect the feel and ensure durability.<br>- **Material dependent:** Performance relies heavily on the chosen filament (e.g., PETG is better suited than brittle PLA) and print settings. |

---
### **Justification for Choosing a Compliant Mechanism**

The compliant mechanism option was chosen because it aligns with the core goals of this project, and presents the most innovative and holistic solution that is the signature of the 3D FDM printing, the manufacturing process of this keyboard.

1.  **Alignment with Production Goals:** The primary goal is to create a keyboard that is easily **3D printable** and **modular**. A compliant mechanism is the epitome of Design for Manufacturing (DFM) for FDM printing. It consolidates what would otherwise be a complex assembly of bearings, fasteners, and rods into a single, elegant, printable part. This eliminates assembly time, sourcing of external hardware, and dramatically lowers the barrier for iteration and community modification.

2.  **Achieving Design Goals:** The goal for a **low-profile** keyboard is directly supported by this choice. Unlike bearings or gears which add significant height and volume, a compliant mechanism can be integrated directly into the case's structure without adding any extra bulk.
3. **Satisfying and Quick Action:** The mechanism can be designed to be **"bistable"**, creating a satisfying tactile snap and allow for quick physical switching between the typing and gaming positions.

4.  **Mitigating the Risks:** The primary disadvantage, fatigue failure, is a known and manageable risk. This risk will be addressed through:
    * **Material Selection:** Using a fatigue-resistant material like ABS instead of a more brittle material like standard PLA.
    * **Iterative Design:** Prototyping multiple designs to distribute stress across the entire flexure evenly.
    * **Design for 3D Printing:** Utilize FDM's strengths along layer lines to increase longevity of flexure, while avoiding its weakness across layer lines.
    * **Modularity:** Because the mechanism is a single modular part, if it were to fail after extensive use, it could be easily replaced without requiring a reprint of the entire keyboard chassis.

## Thumb Keys

## Key Takeaways
## Moving forwards
## Reflection