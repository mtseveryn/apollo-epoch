function FiberNode(fiberNode) {
  const originalFiber = fiberNode;
  let state;
  let component;
  let name;
  let type;
  let timingData;
  const children = [];
  let parent;

  // Keep properties private
  Object.defineProperties(this, {
    state: {
      get() {
        return state;
      },
    },

    component: {
      get() {
        return component;
      },
    },

    name: {
      get() {
        return name;
      },
    },

    type: {
      get() {
        return type;
      },
    },

    timingData: {
      get() {
        return timingData;
      },
    },

    children: {
      get() {
        return children;
      },
    },

    parent: {
      get() {
        return parent;
      },
    },

    originalFiber: {
      get() {
        return originalFiber;
      },
    },
  });
}

FiberNode.prototype.processFiber = function () {
  const {
    sibling,
    stateNode,
    child,
    memoizedState,
    memoizedProps,
    elementType,
    tag,
    actualDuration,
    actualStartTime,
    selfBaseDuration,
    treeBaseDuration,
  } = this.originalFiber;
};
