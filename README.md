# Tiled World Synthesis

My attempt at generating a tiled world from a set of connection rules. Inspirated by [Wave Function Collapse](https://github.com/mxgmn/WaveFunctionCollapse) - by [ExUtumno](https://github.com/mxgmn).

[Click here to see it as of now](https://rawgit.com/GuilhermeRossato/TiledWorldSynthesis/master/index.html)

# How it should work

![Expected Result](https://rawgit.com/GuilhermeRossato/TiledWorldSynthesis/master/Assets/images/expected.png)

It is possible to reconstruct a similar world using a list of connecting rules.

It's also possible to finish an unfinished tiled world based on the part that was already created by recreating the sets of rules used in that world.

And you know computers, you can give them all sorts of instructions to vary your output to adapt to different things!

Here's the set of rules that should generate the world in the picture above:

'''javascript
Models.Knots = {
    name:"Knots",
    tileSize: 10,
    tiles: [
        {
            index: 0,
            image: "knots/corner.png",
            rotation: 0
        }, {
            index: 1,
            image: "knots/corner.png",
            rotation: 1
        }, {
            index: 2,
            image: "knots/corner.png",
            rotation: 2
        }, {
            index: 3,
            image: "knots/corner.png",
            rotation: 3
        }, {
            index: 4,
            image: "knots/line.png",
            rotation: 1
        }, {
            index: 5,
            image: "knots/line.png",
            rotation: 0
        }
    ],
    connections: [
        {
            left: 0,
            right: 2
        }, {
            left: 0,
            right: 3
        }, {
            bottom: 0,
            top: 1
        }, {
            bottom: 0,
            top: 2
        }, {
            left: 0,
            right: 4
        }, {
            bottom: 0,
            top: 5
        }, {
            left: 1,
            right: 2
        }, {
            left: 1,
            right: 3
        }, {
            bottom: 1,
            top: 0
        }, {
            bottom: 1,
            top: 3
        }, {
            left: 1,
            right: 4
        }, {
            bottom: 1,
            top: 4
        }, {
            left: 2,
            right: 0
        }, {
            left: 2,
            right: 1
        }, {
            bottom: 2,
            top: 0
        }, {
            bottom: 2,
            top: 3
        }, {
            bottom: 2,
            top: 4
        }, {
            left: 2,
            right: 5
        }, {
            left: 3,
            right: 0
        }, {
            left: 3,
            right: 1
        }, {
            bottom: 3,
            top: 1
        }, {
            bottom: 3,
            top: 2
        }, {
            bottom: 3,
            top: 5
        }, {
            left: 3,
            right: 5
        }, {
            left: 4,
            right: 4
        }, {
            left: 4,
            right: 2
        }, {
            left: 4,
            right: 3
        }, {
            bottom: 4,
            top: 0
        }, {
            bottom: 4,
            top: 3
        }, {
            bottom: 5,
            top: 5
        }, {
            bottom: 5,
            top: 1
        }, {
            bottom: 5,
            top: 2
        }, {
            left: 5,
            right: 0
        }, {
            left: 5,
            right: 1
        }
    ]
};
'''
