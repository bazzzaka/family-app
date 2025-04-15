/**
 * Processes family members data into a hierarchical structure for rendering a tree
 * @param {Array} familyMembers - Array of family member objects from the API
 * @returns {Object} - Hierarchical tree structure
 */
export const processTreeData = (familyMembers) => {
  if (!familyMembers || !familyMembers.length) return null;
  
  // First, organize all members by ID for easy lookup
  const membersById = familyMembers.reduce((acc, member) => {
    acc[member._id] = {
      ...member,
      children: [],  // Will be populated later
      processed: false
    };
    return acc;
  }, {});
  
  // Connect parents and children
  Object.values(membersById).forEach(member => {
    // Add children to their parents
    if (member.parents && member.parents.length > 0) {
      member.parents.forEach(parentId => {
        if (membersById[parentId]) {
          membersById[parentId].children.push(member._id);
        }
      });
    }
  });
  
  // Find root members (those without parents or with unknown parents)
  const rootMembers = Object.values(membersById)
    .filter(member => !member.parents || member.parents.length === 0);
  
  // If no clear root, just return the first member as root
  if (rootMembers.length === 0 && familyMembers.length > 0) {
    const firstMember = membersById[familyMembers[0]._id];
    return buildTreeNode(firstMember, membersById);
  }
  
  // Build tree structure for each root
  const treeNodes = rootMembers.map(rootMember => 
    buildTreeNode(rootMember, membersById)
  );
  
  // If multiple roots, create a virtual root node to connect them
  if (treeNodes.length > 1) {
    return {
      name: "Family",
      children: treeNodes
    };
  }
  
  // Return single root if there's only one
  return treeNodes[0];
};

/**
 * Recursively builds a tree node and its descendants
 * @param {Object} member - The current family member
 * @param {Object} membersById - Lookup object for all family members
 * @returns {Object} - Tree node structure
 */
const buildTreeNode = (member, membersById) => {
  if (!member || member.processed) return null;
  
  // Mark as processed to avoid circular references
  member.processed = true;
  
  // Format attributes for react-d3-tree
  const attributes = {
    gender: member.gender,
    birthDate: member.birthDate || "",
  };
  
  // Add partner info to attributes if exists
  if (member.partners && member.partners.length > 0) {
    const partner = member.partners[0];
    const partnerId = typeof partner === 'string' ? partner : partner.type;
    const partnerMember = membersById[partnerId];
    
    if (partnerMember) {
      attributes.partner = partnerMember.name;
      attributes.relationship = partner.relationship || 'married';
    }
  }
  
  const node = {
    name: member.name,
    attributes,
    _id: member._id, // Keep the ID for reference
    photo: member.photo, // Keep the photo for custom rendering
    children: []
  };
  
  // Process children
  if (member.children && member.children.length > 0) {
    node.children = member.children
      .map(childId => {
        const child = membersById[childId];
        if (child && !child.processed) {
          return buildTreeNode(child, membersById);
        }
        return null;
      })
      .filter(Boolean); // Remove null values
  }
  
  return node;
};

/**
 * Gets the label color based on gender
 * @param {String} gender - The gender of the family member
 * @returns {String} - CSS color value
 */
export const getGenderColor = (gender) => {
  switch (gender) {
    case 'male':
      return '#2196F3';  // Blue
    case 'female':
      return '#E91E63';  // Pink
    default:
      return '#9C27B0';  // Purple
  }
};

/**
 * Finds the shortest path between two family members
 * @param {Array} familyMembers - Array of family member objects
 * @param {String} startId - ID of the starting family member
 * @param {String} endId - ID of the target family member
 * @returns {Array} - Array of member IDs representing the path
 */
export const findRelationshipPath = (familyMembers, startId, endId) => {
  if (!familyMembers || !startId || !endId) return [];
  
  // Build adjacency list for bidirectional graph
  const graph = {};
  
  familyMembers.forEach(member => {
    graph[member._id] = new Set();
    
    // Add parents
    if (member.parents) {
      member.parents.forEach(parentId => {
        graph[member._id].add(parentId);
      });
    }
    
    // Add children
    if (member.children) {
      member.children.forEach(childId => {
        graph[member._id].add(childId);
      });
    }
    
    // Add partners
    if (member.partners) {
      member.partners.forEach(partner => {
        const partnerId = typeof partner === 'string' ? partner : partner.type;
        graph[member._id].add(partnerId);
      });
    }
  });
  
  // BFS to find shortest path
  const queue = [[startId]];
  const visited = new Set([startId]);
  
  while (queue.length > 0) {
    const path = queue.shift();
    const currentId = path[path.length - 1];
    
    if (currentId === endId) {
      return path;
    }
    
    if (graph[currentId]) {
      for (const neighbor of graph[currentId]) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
  }
  
  return []; // No path found
}; 