var el = require('./element');

var ul = el('ul', { id: 'list' }, [
  el('li', { class: 'item' }, ['Item 1']),
  el('li', { class: 'item' }, ['Item 2']),
  el('li', { class: 'item' }, ['Item 3']),
]);

function diff(oldTree, newTree) {
  var index = 0; // 当前节点的标志
  var patches = {}; // 节点的差异
  dfWalk(oldTree, newTree, index, patch);
  return patches;
}

// 树的深度优先的遍历算法
function dfWalk(oldTree, newTree, index, patches) {
  patches[index] = ''; // 记录差异
  diffChildren(oldTree.children, newTree.children, index, patches);
}

function diffChildren(oldChildren, newChildren, index, patches) {
  let leftNode = null;
  let currentNodeIndex = index;
  oldChildren.forEach((child, i) => {
    var newChild = newChildren[i];
    currentNodeIndex =
      leftNode && leftNode.count ? currentNodeIndex + leftNode.count + 1 : currentNodeIndex + 1;
    dfsWalk(child, newChild, currentNodeIndex, patches); // 深度遍历子节点
    leftNode = child;
  });
}

const ele = ul.render();
document.body.appendChild(ele);
