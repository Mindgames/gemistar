/**
 * Highlights the neighborhood of a selected node in the network graph.
 *
 * When a node is selected, this function highlights the node itself, its direct neighbors (1st degree),
 * and their neighbors (2nd degree) by adjusting their colors and labels.
 * When the selection is cleared, it resets all nodes to their original appearance.
 *
 * @param {object} params - The parameters object, typically from a network event.
 * @param {string[]} params.nodes - An array of selected node IDs.
 */
function neighbourhoodHighlight(params) {
  const allNodes = nodes.get({ returnType: 'Object' });

  if (params.nodes.length > 0) {
    highlightActive = true;
    const selectedNode = params.nodes[0];
    const degrees = 2;

    for (const nodeId in allNodes) {
      allNodes[nodeId].color = 'rgba(200,200,200,0.5)';
      if (allNodes[nodeId].hiddenLabel === undefined) {
        allNodes[nodeId].hiddenLabel = allNodes[nodeId].label;
        allNodes[nodeId].label = undefined;
      }
    }

    const connectedNodes = network.getConnectedNodes(selectedNode);
    let allConnectedNodes = [];

    for (let i = 1; i < degrees; i++) {
      for (let j = 0; j < connectedNodes.length; j++) {
        allConnectedNodes = allConnectedNodes.concat(
          network.getConnectedNodes(connectedNodes[j])
        );
      }
    }

    for (const nodeId of allConnectedNodes) {
      allNodes[nodeId].color = 'rgba(150,150,150,0.75)';
      if (allNodes[nodeId].hiddenLabel !== undefined) {
        allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
        allNodes[nodeId].hiddenLabel = undefined;
      }
    }

    for (const nodeId of connectedNodes) {
      allNodes[nodeId].color = nodeColors[nodeId];
      if (allNodes[nodeId].hiddenLabel !== undefined) {
        allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
        allNodes[nodeId].hiddenLabel = undefined;
      }
    }

    allNodes[selectedNode].color = nodeColors[selectedNode];
    if (allNodes[selectedNode].hiddenLabel !== undefined) {
      allNodes[selectedNode].label = allNodes[selectedNode].hiddenLabel;
      allNodes[selectedNode].hiddenLabel = undefined;
    }
  } else if (highlightActive) {
    for (const nodeId in allNodes) {
      allNodes[nodeId].color = nodeColors[nodeId];
      if (allNodes[nodeId].hiddenLabel !== undefined) {
        allNodes[nodeId].label = allNodes[nodeId].hiddenLabel;
        allNodes[nodeId].hiddenLabel = undefined;
      }
    }
    highlightActive = false;
  }

  const updateArray = Object.values(allNodes);
  nodes.update(updateArray);
}

/**
 * Filters the network graph to show only the selected nodes.
 *
 * When nodes are selected, this function hides all other nodes.
 * When the selection is cleared, it shows all nodes again.
 *
 * @param {object} params - The parameters object, typically from a network event.
 * @param {string[]} params.nodes - An array of selected node IDs.
 */
function filterHighlight(params) {
  const allNodes = nodes.get({ returnType: 'Object' });

  if (params.nodes.length > 0) {
    filterActive = true;
    const selectedNodes = new Set(params.nodes);

    for (const nodeId in allNodes) {
      if (!selectedNodes.has(nodeId)) {
        allNodes[nodeId].hidden = true;
        if (allNodes[nodeId].savedLabel === undefined) {
          allNodes[nodeId].savedLabel = allNodes[nodeId].label;
          allNodes[nodeId].label = undefined;
        }
      } else {
        allNodes[nodeId].hidden = false;
        if (allNodes[nodeId].savedLabel !== undefined) {
          allNodes[nodeId].label = allNodes[nodeId].savedLabel;
          allNodes[nodeId].savedLabel = undefined;
        }
      }
    }
  } else if (filterActive) {
    for (const nodeId in allNodes) {
      allNodes[nodeId].hidden = false;
      if (allNodes[nodeId].savedLabel !== undefined) {
        allNodes[nodeId].label = allNodes[nodeId].savedLabel;
        allNodes[nodeId].savedLabel = undefined;
      }
    }
    filterActive = false;
  }

  const updateArray = Object.values(allNodes);
  nodes.update(updateArray);
}

/**
 * Selects a single node and highlights its neighborhood.
 *
 * @param {string[]} nodes - An array containing the ID of the node to select.
 * @returns {string[]} The array of selected node IDs.
 */
function selectNode(nodes) {
  network.selectNodes(nodes);
  neighbourhoodHighlight({ nodes });
  return nodes;
}

/**
 * Selects multiple nodes and filters the graph to show only them.
 *
 * @param {string[]} nodes - An array of node IDs to select.
 * @returns {string[]} The array of selected node IDs.
 */
function selectNodes(nodes) {
  network.selectNodes(nodes);
  filterHighlight({ nodes });
  return nodes;
}

/**
 * Selects nodes based on a filter applied to their properties or the properties of their connected edges.
 *
 * @param {object} filter - The filter configuration.
 * @param {string} filter.item - The item to filter on ('node' or 'edge').
 * @param {string} filter.property - The property of the item to filter by.
 * @param {string[]} filter.value - An array of values to match against the property.
 */
function highlightFilter(filter) {
  const selectedNodes = new Set();
  const { item, property, value } = filter;

  if (item === 'node') {
    const allNodes = nodes.get({ returnType: 'Object' });
    for (const nodeId in allNodes) {
      if (
        allNodes[nodeId][property] &&
        value.includes(allNodes[nodeId][property].toString())
      ) {
        selectedNodes.add(nodeId);
      }
    }
  } else if (item === 'edge') {
    const allEdges = edges.get({ returnType: 'Object' });
    for (const edgeId in allEdges) {
      const edge = allEdges[edgeId];
      if (edge[property] && value.includes(edge[property].toString())) {
        selectedNodes.add(edge.from);
        selectedNodes.add(edge.to);
      }
    }
  }
  selectNodes(Array.from(selectedNodes));
}