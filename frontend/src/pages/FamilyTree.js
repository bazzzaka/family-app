import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Alert,
  useTheme,
  TextField,
  InputAdornment,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Snackbar,
  Tooltip
} from '@mui/material';
import { 
  Add as AddIcon, 
  ZoomIn, 
  ZoomOut, 
  Close as CloseIcon, 
  Search as SearchIcon,
  Refresh as RefreshIcon,
  FilterList as FilterIcon,
  Download as DownloadIcon,
  Print as PrintIcon,
  Undo as UndoIcon,
  ViewCompact as ViewCompactIcon,
  ViewComfy as ViewComfyIcon
} from '@mui/icons-material';
import Tree from 'react-d3-tree';
import { processTreeData, getGenderColor } from '../utils/familyTreeUtils';
import { getFamilyTree } from '../services/familyTreeService';
import AddFamilyMemberForm from '../components/family/AddFamilyMemberForm';
import styles from './FamilyTree.module.css';
import FamilyTreeNode from '../components/family/FamilyTreeNode';

// Add a new SearchToolbar component
const SearchToolbar = ({ 
  onSearch, 
  onFilter, 
  onRefresh, 
  onViewChange, 
  onDownload, 
  onPrint,
  compactView,
  filters,
  searchQuery
}) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [filterOpen, setFilterOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  
  // Update local state when props change
  useEffect(() => {
    setLocalQuery(searchQuery);
    setLocalFilters(filters);
  }, [searchQuery, filters]);
  
  const handleSearchChange = (e) => {
    setLocalQuery(e.target.value);
  };
  
  const handleSearch = () => {
    onSearch(localQuery);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const handleFilterToggle = () => {
    setFilterOpen(!filterOpen);
  };
  
  const handleFilterChange = (type, value) => {
    const newFilters = { ...localFilters, [type]: value };
    setLocalFilters(newFilters);
    onFilter(newFilters);
  };
  
  return (
    <Paper 
      elevation={1} 
      sx={{ 
        p: 2, 
        mb: 2,
        borderRadius: 1
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search family members..."
            size="small"
            value={localQuery}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: localQuery && (
                <InputAdornment position="end">
                  <IconButton 
                    size="small" 
                    onClick={() => {
                      setLocalQuery('');
                      onSearch('');
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>
        
        <Grid item>
          <Tooltip title="Refresh Family Tree">
            <IconButton onClick={onRefresh} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        
        <Grid item>
          <Tooltip title="Filter">
            <IconButton 
              onClick={handleFilterToggle} 
              color={Object.values(localFilters).some(v => v !== 'all') ? "primary" : "default"}
            >
              <FilterIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        
        <Grid item>
          <Tooltip title={compactView ? "Expanded View" : "Compact View"}>
            <IconButton onClick={onViewChange} color={compactView ? "primary" : "default"}>
              {compactView ? <ViewComfyIcon /> : <ViewCompactIcon />}
            </IconButton>
          </Tooltip>
        </Grid>
        
        <Grid item>
          <Tooltip title="Download as PNG">
            <IconButton onClick={onDownload}>
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        
        <Grid item>
          <Tooltip title="Print">
            <IconButton onClick={onPrint}>
              <PrintIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        
        {Object.values(localFilters).some(v => v !== 'all') && (
          <Grid item xs={12}>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              {Object.entries(localFilters).map(([key, value]) => {
                if (value !== 'all') {
                  return (
                    <Chip 
                      key={key}
                      label={`${key}: ${value}`}
                      onDelete={() => handleFilterChange(key, 'all')}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  );
                }
                return null;
              }).filter(Boolean)}
              
              {Object.values(localFilters).some(v => v !== 'all') && (
                <Chip 
                  label="Clear All Filters"
                  onDelete={() => {
                    const resetFilters = Object.keys(localFilters).reduce((acc, key) => {
                      acc[key] = 'all';
                      return acc;
                    }, {});
                    setLocalFilters(resetFilters);
                    onFilter(resetFilters);
                  }}
                  size="small"
                  color="error"
                  deleteIcon={<UndoIcon />}
                />
              )}
            </Stack>
          </Grid>
        )}
      </Grid>
      
      {filterOpen && (
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl size="small" fullWidth>
                <InputLabel id="gender-filter-label">Gender</InputLabel>
                <Select
                  labelId="gender-filter-label"
                  id="gender-filter"
                  value={localFilters.gender || 'all'}
                  label="Gender"
                  onChange={(e) => handleFilterChange('gender', e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl size="small" fullWidth>
                <InputLabel id="relationship-filter-label">Relationship</InputLabel>
                <Select
                  labelId="relationship-filter-label"
                  id="relationship-filter"
                  value={localFilters.relationship || 'all'}
                  label="Relationship"
                  onChange={(e) => handleFilterChange('relationship', e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="married">Married</MenuItem>
                  <MenuItem value="divorced">Divorced</MenuItem>
                  <MenuItem value="engaged">Engaged</MenuItem>
                  <MenuItem value="partner">Partner</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <FormControl size="small" fullWidth>
                <InputLabel id="generation-filter-label">Generation</InputLabel>
                <Select
                  labelId="generation-filter-label"
                  id="generation-filter"
                  value={localFilters.generation || 'all'}
                  label="Generation"
                  onChange={(e) => handleFilterChange('generation', e.target.value)}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="root">Root</MenuItem>
                  <MenuItem value="parent">Parents</MenuItem>
                  <MenuItem value="child">Children</MenuItem>
                  <MenuItem value="grandchild">Grandchildren</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

const FamilyTree = () => {
  const { familyGroupId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [treeData, setTreeData] = useState(null);
  const [filteredTreeData, setFilteredTreeData] = useState(null);
  const [rawData, setRawData] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const treeContainerRef = useRef(null);
  const treeRef = useRef(null);

  // Set dimensions from the container div
  const [dimensions, setDimensions] = useState(null);

  // Add search and filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gender: 'all',
    relationship: 'all',
    generation: 'all'
  });
  const [compactView, setCompactView] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  // Fetch family tree data
  const fetchFamilyTree = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFamilyTree(familyGroupId);
      setRawData(data);
      const processedData = processTreeData(data);
      setTreeData(processedData);
      setFilteredTreeData(processedData);
    } catch (err) {
      setError('Failed to load family tree. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [familyGroupId]);

  // Determine the container dimensions on initial render
  useEffect(() => {
    if (treeContainerRef.current) {
      setDimensions({
        width: treeContainerRef.current.offsetWidth,
        height: treeContainerRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    fetchFamilyTree();
  }, [fetchFamilyTree]);

  // Center the tree when data is loaded
  useEffect(() => {
    if (filteredTreeData && dimensions) {
      // Center the tree
      setTranslate({
        x: dimensions.width / 2,
        y: dimensions.height / 5
      });
    }
  }, [filteredTreeData, dimensions]);

  // Filter and search tree data
  useEffect(() => {
    if (!treeData) return;

    // Create a deep copy of the tree data
    const filterTree = (node, query, filters, path = []) => {
      // Base case: no node
      if (!node) return null;

      // Check if this node matches the search query
      const nameMatch = !query || node.name.toLowerCase().includes(query.toLowerCase());
      
      // Check if this node matches filters
      const genderMatch = filters.gender === 'all' || (node.attributes?.gender === filters.gender);
      const relationshipMatch = filters.relationship === 'all' || 
        (node.attributes?.relationship === filters.relationship);
      
      // Generation filter (more complex, depends on the path length)
      let generationMatch = filters.generation === 'all';
      if (!generationMatch) {
        if (filters.generation === 'root' && path.length === 0) {
          generationMatch = true;
        } else if (filters.generation === 'parent' && path.length === 1) {
          generationMatch = true;
        } else if (filters.generation === 'child' && path.length === 2) {
          generationMatch = true;
        } else if (filters.generation === 'grandchild' && path.length >= 3) {
          generationMatch = true;
        }
      }
      
      // Process children
      let matchingChildren = [];
      if (node.children && node.children.length > 0) {
        matchingChildren = node.children
          .map(child => filterTree(child, query, filters, [...path, node]))
          .filter(Boolean);
      }
      
      // Include this node if it matches OR if any children match
      if ((nameMatch && genderMatch && relationshipMatch && generationMatch) || matchingChildren.length > 0) {
        return {
          ...node,
          children: matchingChildren
        };
      }
      
      return null;
    };

    // Apply filters
    const filtered = filterTree(treeData, searchQuery, filters);
    setFilteredTreeData(filtered);
  }, [treeData, searchQuery, filters]);

  // Custom node renderer for the tree
  const renderCustomNodeElement = ({ nodeDatum, toggleNode }) => {
    return (
      <g onClick={() => handleNodeClick(nodeDatum)}>
        <FamilyTreeNode 
          nodeDatum={nodeDatum} 
          toggleNode={toggleNode} 
          compactView={compactView}
        />
      </g>
    );
  };

  // Handle node click to show details
  const handleNodeClick = (nodeDatum) => {
    setSelectedMember(nodeDatum);
  };

  // Handle zoom in
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 0.2, 2));
  };

  // Handle zoom out
  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 0.2, 0.4));
  };

  // Handle adding a new member
  const handleAddMember = () => {
    setOpenAddDialog(true);
  };

  // Handle closing the add member dialog
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  // Handle successful member addition
  const handleMemberAdded = () => {
    setOpenAddDialog(false);
    fetchFamilyTree(); // Refresh the tree data
    setSnackbar({
      open: true,
      message: 'Family member added successfully',
      severity: 'success'
    });
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle filters
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle view change
  const handleViewChange = () => {
    setCompactView(!compactView);
  };

  // Handle download tree as PNG
  const handleDownload = () => {
    if (!treeContainerRef.current) return;
    
    // Use the html2canvas library or similar to create a PNG
    setSnackbar({
      open: true,
      message: 'Download feature coming soon!',
      severity: 'info'
    });
  };

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  // Render the member details dialog
  const renderMemberDetailsDialog = () => {
    if (!selectedMember) return null;

    return (
      <Dialog 
        open={selectedMember !== null} 
        onClose={() => setSelectedMember(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedMember.name}
          <IconButton
            onClick={() => setSelectedMember(null)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {selectedMember.photo && (
              <Box sx={{ textAlign: 'center' }}>
                <img 
                  src={selectedMember.photo} 
                  alt={selectedMember.name} 
                  style={{ maxWidth: '150px', borderRadius: '50%' }}
                />
              </Box>
            )}
            
            <Typography variant="body1">
              <strong>Gender:</strong> {selectedMember.attributes?.gender}
            </Typography>
            
            {selectedMember.attributes?.birthDate && (
              <Typography variant="body1">
                <strong>Birth Date:</strong> {selectedMember.attributes.birthDate}
              </Typography>
            )}
            
            {selectedMember.attributes?.partner && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Partner:</strong> {selectedMember.attributes.partner}
                </Typography>
                <Typography variant="body2">
                  Relationship: {selectedMember.attributes.relationship || 'married'}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedMember(null)}>Close</Button>
          <Button variant="contained" color="primary">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button 
          variant="outlined" 
          onClick={fetchFamilyTree} 
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Family Tree
      </Typography>
      
      {/* Search & Filter Toolbar */}
      <SearchToolbar
        onSearch={handleSearch}
        onFilter={handleFilter}
        onRefresh={fetchFamilyTree}
        onViewChange={handleViewChange}
        onDownload={handleDownload}
        onPrint={handlePrint}
        compactView={compactView}
        filters={filters}
        searchQuery={searchQuery}
      />

      <Paper 
        elevation={3} 
        sx={{ 
          height: '70vh', 
          position: 'relative',
          overflow: 'hidden'
        }}
        ref={treeContainerRef}
      >
        {/* Tree visualization */}
        {filteredTreeData ? (
          <div className={styles.treeContainer}>
            <svg width="0" height="0">
              <defs>
                <clipPath id="clipCircle">
                  <circle r="15" cx="0" cy="0" />
                </clipPath>
              </defs>
            </svg>
            <Tree 
              data={filteredTreeData}
              orientation="vertical"
              pathFunc="step"
              renderCustomNodeElement={renderCustomNodeElement}
              translate={translate}
              zoom={zoom}
              onNodeClick={handleNodeClick}
              separation={{ siblings: compactView ? 1 : 1.5, nonSiblings: compactView ? 1.2 : 2 }}
              nodeSize={{ x: compactView ? 80 : 120, y: compactView ? 80 : 120 }}
              enableLegacyTransitions={true}
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              ref={treeRef}
            />
          </div>
        ) : (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              flexDirection: 'column',
              gap: 2
            }}
          >
            <Typography variant="h6">
              No family members yet
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<AddIcon />}
              onClick={handleAddMember}
            >
              Add First Family Member
            </Button>
          </Box>
        )}

        {/* Zoom controls */}
        <div className={styles.zoomControls}>
          <IconButton 
            color="primary" 
            onClick={handleZoomIn}
            sx={{ bgcolor: theme.palette.background.paper }}
          >
            <ZoomIn />
          </IconButton>
          <IconButton 
            color="primary" 
            onClick={handleZoomOut}
            sx={{ bgcolor: theme.palette.background.paper }}
          >
            <ZoomOut />
          </IconButton>
        </div>

        {/* Add member button */}
        <div className={styles.addButtonContainer}>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleAddMember}
          >
            Add Family Member
          </Button>
        </div>
      </Paper>

      {/* Add member dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseAddDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Add Family Member
          <IconButton
            onClick={handleCloseAddDialog}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <AddFamilyMemberForm 
            familyGroupId={familyGroupId}
            existingMembers={rawData}
            onSuccess={handleMemberAdded}
          />
        </DialogContent>
      </Dialog>

      {/* Member details dialog */}
      {renderMemberDetailsDialog()}

      {/* Snackbar notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default FamilyTree; 