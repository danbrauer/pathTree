const _ = require('lodash');
const tree = require('./PathTree');

// const pathsIn = [
//     "/pro/something/whatevs",
//     "/pro/something/foo",
//     "/pro/x/y",
//     "/feedback"
// ];

const pathsIn = [
    "pro/something/whatevs",
    "pro/something/foo",
    "pro/x/y",
    "feedback"
];


// const pathsIn = [
//     "/pro/something/whatevs"
// ];

// const pathsIn = [
//     "pro/something/whatevs"
// ];

// const pathsIn = [
//     ""
// ];

// const pathsIn = []; // should throw an error


const root = tree.createPathTree(pathsIn);
const pathsRetrieved = tree.getPathsArray(root);
console.log(`paths in:  ${JSON.stringify(pathsIn)}`);
console.log(`paths out: ${JSON.stringify(pathsRetrieved)}`);
console.log(`tree: ${tree.printTree(root)}`);


