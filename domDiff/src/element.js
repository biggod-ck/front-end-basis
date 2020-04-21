function Element(tag, props, children) {
  this.tag = tag;
  this.props = props;
  this.children = children;
}

Element.prototype.render = function () {
  const el = document.createElement(this.tag);
  const props = this.props;
  for (const [attr,value] of Object.entries(props)) {
    el.setAttribute(attr,value)
  }
  const children = this.children || [];
  children.forEach((child) => {
    const childEl = child instanceof Element ? child.render() : document.createTextNode(child);
    el.appendChild(childEl);
  });
  return el
};

module.exports = (tag, props, children) => {
  return new Element(tag, props, children);
};
