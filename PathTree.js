const _ = require('lodash');

class TreeNode {
    /**
     * @param {String} pathPart a snippet of a path, eg api.meetup.com/pathpart/pathpart/pathpart/etc
     * @param {TreeNode[]} children
     */
    constructor(pathPart, children) {
        this.pathPart = pathPart;
        this.parent = undefined;
        this.children = [];
        if (children) {
            children.forEach( (child) => this.setChild(children));
        }
    }

    setChild(childNode) {
        this.children = [ ...this.children, childNode ];
        childNode.parent = this;
    }

    /**
     * @returns {String} returns a path string from root to this node (really only meant to be used for leaf nodes...?)
     */
    getPath() {
        let pathAccum = this.pathPart;
        let parentNode = this.parent;
        while (parentNode && parentNode.pathPart !== "") {
            pathAccum = `${parentNode.pathPart}/${pathAccum}`;
            parentNode = parentNode.parent;
        }
        return `/${pathAccum}`;
    }

}

/**
 *
 * @param pathString eg "/pathpart/pathpart/pathpart...", or "pathpart/pathpart/pathpart..."
 * @returns {String[]}
 */
const getPathPartArray = (pathString) => {
    const arr = _.split(pathString, '/');
    if (_.startsWith(pathString, "/")) {
        return arr.slice(1);
    }
    return arr;
};

/**
 * @param root a tree node
 * @param pathPartArray an array of path parts to be added as nodes beneath the root
 * @returns a tree node (the root that was given, but with the path added beneath it)
 */
const addPath = (root, pathPartArray ) => {

    const addPathInner = (accum, parentNode, remainingPaths) => {

        if (!remainingPaths || remainingPaths.length === 0) { return accum; }

        const pathPart = remainingPaths[0];
        const remaining = remainingPaths.slice(1);
        if (!accum) {
            // new tree, no root yet
            const newRoot = new TreeNode(pathPart);
            return addPathInner(newRoot, newRoot, remaining);
        }
        else {
            const childNodeMatchingPathPart = _.find(parentNode.children, ['pathPart', pathPart]);
            if ( childNodeMatchingPathPart ) {
                return addPathInner(accum, childNodeMatchingPathPart, remaining);
            }
            else {
                const newChild = new TreeNode(pathPart);
                parentNode.setChild(newChild);
                return addPathInner(accum, newChild, remaining);
            }
        }
    };

    return addPathInner(root, root, pathPartArray)
};

/**
 * Creates a new tree with a common root node for all given paths
 * @param {String[]} paths array of paths, e.g. "/i/am/a/path"
 * @returns {TreeNode} root node of the tree
 */
const createPathTree = (paths) => {
    if (paths.length === 0) {
        throw new Error("stop wasting my time!");
    }
    const root = addPath(undefined, [""]); // initialize a root for the tree (all API paths share the same root)
    paths.forEach((path) =>
        addPath(root, getPathPartArray(path))
    );
    return root;
};

/**
 * @param {TreeNode} node
 * @returns {String[]} the tree beneath the node, converted into an array of path strings.
 */
const getPathsArray = (node) => {
    if (treeIsEmpty(node)) return []; // shouldn't happen since createPathTree doesn't allow it, but still.
    if (node.children.length === 0) {
        return [node.getPath()];
    }
    return node.children.reduce( (accum, curr) => {
        return [...accum, ...getPathsArray(curr)];
    }, []);
};

/**
 * @param root a TreeNode, presumably the root
 * @returns {boolean}
 */
const treeIsEmpty = (root) => {
    return !root.parent && root.children.length === 0;
};

/**
 * the stringify function as-is doesn't know how to print out circular paths, so this takes care of that for you
 */
const printTree = (node) => {
    return JSON.stringify(node, ((key,value) => {
        if (key === 'parent' && value) return value.pathPart;
        else if (key === 'parent' && !value) return "root node?";
        else return value;
    }), 2);
};

module.exports = {
    createPathTree,
    getPathsArray,
    printTree
};