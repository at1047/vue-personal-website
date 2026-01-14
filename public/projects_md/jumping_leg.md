## Executive Summary

This project focused on the control and simulation of a 3-DOF under-actuated monopod (shank, thigh, and torso) capable of vertical jumping. The system was modeled as a Hybrid System, incorporating both pinned in stance and free in flight. This was achieved through a non-linear controller using Input-Output Linearization and Virtual Constraints to enforce Center of Mass (CoM) trajectories. The control architecture was validated through a high-fidelity MATLAB simulation, demonstrating successful transitions between squat, takeoff, flight, and landing phases while respecting physical torque and ground reaction force limits.

![[ezgif-69aa3ef2b5144262.gif]]

## Engineering Approach
### Dynamics Modelling

- Derived the equations of motion for a 3-link system to get relationship between joint angles and CoM of each link and the entire system
- Modeled the system in two distinct domains:
    - Stance Phase: Modeled as a pinned 3-link chain where the toe is fixed to the ground
    - Flight Phase: Modeled as an unconstrained floating base system
### Input-output Linearization Controller

- Design "Virtual Constraints" for tracking X and Y position of system CoM
- Obtain Lie Derivatives for these virtual constraints so that we can linearize this non-linear system
- After the system is linearized we can apply a PD controller to drive the system CoM to our desired X and Y position
### Trajectory Generation

