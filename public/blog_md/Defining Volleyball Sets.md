*We should define sets with position and temporally, not height and speed*

I've been setting since 2015. I'm also an engineer. Therefore, I'd like to propose an unambiguous way to describe sets.

A big part of setting is giving the hitter the ball they want, one that they can perform the best with. As a result, communication of preferences between the hitter and the setter is of utmost importance.

*"I want a higher set"*. This is something I often hear, but what does this mean? Do they mean they want a set with a higher apex, so that the ball reaches them after a longer time period? Or do they mean they want to be able to hit the ball higher, and I should be aiming for a higher contact point?

Instead, I think we should describe the set with two components. One is the position of the contact point. Whether this be higher, lower, further out or more inside, this component is independent to the second component, which is time. Time is the interval which it takes for the ball to travel from the setter's hands to the hitter's contact window.

For example, a high set can be fast, a flat arc that the hitter would cut off high above the net. A low set can be slow, a more parabolic arc that the hitter would cut off lower above the net.

## Additional Physics

1. A set from farther away and a set from closer should have the same apex height to reach the target at the same time. The vertical trajectory component is independent of the horizontal component
2. Jump setting worsens the trajectory of farther sets. I built a physics simulator that solves for the dynamics of a volleyball in motion. Setting shoots from a lower point actually causes the ball to travel


## Volleyball Trajectory Solver Findings

<a href="http://setting.andrew-tai.com">Link to Trajectory Solver</a>

<a href="https://github.com/at1047/py-volleyball-trajectory">Github</a>

- A shoot trajectory is better when you don't jump set
- Better is defined as in the hitting window for longer

![[combined_traj.png]]
## This solver:
- Models volleyball flight dynamics with gravity and aerodynamic drag
- Solves an inverse problem: Given start position, target position, and desired airtime, what is the launch angle and velocity required
- Validated physics with pre-existing trajectory from video
- Visualizes a hitting window representing acceptable spatial–temporal tolerance
- Uses time spent inside that window as a measure of set quality
