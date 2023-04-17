const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    if (!this.rootNode) {
      this.rootNode = new Node(data);
      return;
    }

    this.#addNode(this.rootNode, data);
  }

  #addNode(current, data) {
    if (current.data > data) {
      if (current.left === null) {
        current.left = new Node(data);
        return;
      } else {
        this.#addNode(current.left, data);
      }
    } else {
      if (current.right === null) {
        current.right = new Node(data);
        return;
      } else {
        this.#addNode(current.right, data);
      }
    }
  }

  has(data) {
    let current = this.rootNode;

    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.data > data ? current.left : current.right;
    }

    return false;
  }

  find(data) {
    let current = this.rootNode;

    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.data > data ? current.left : current.right;
    }

    return null;
  }

  remove(data) {
    this.root = this.#removeNode(this.rootNode, data);
  }

  #removeNode(current, data) {
    if (!current) {
      return null;
    } else if (data < current.data) {
      current.left = this.#removeNode(current.left, data);
      return current;
    } else if (data > current.data) {
      current.right = this.#removeNode(current.right, data);
      return current;
    } else {
      if (!current.left && !current.right) {
        return null;
      }

      if (!current.left && current.right) {
        current = current.right;
        return current;
      }

      if (current.left && !current.right) {
        current = current.left;
        return current;
      }

      if (current.left && current.right) {
        const minNode = this.#minNode(current.right);
        current.data = minNode.data;

        current.right = this.#removeNode(current.right, minNode.data);
        return current;
      }
    }
  }

  min() {
    return this.#minNode(this.rootNode).data;
  }

  #minNode(node) {
    let current = node;

    while (current) {
      if (current.left) {
        current = current.left;
      } else {
        return current;
      }
    }

    return null;
  }

  max() {
    let current = this.rootNode;

    while (current) {
      if (current.right) {
        current = current.right;
      } else {
        return current.data;
      }
    }

    return null;
  }
}

module.exports = {
  BinarySearchTree
};
