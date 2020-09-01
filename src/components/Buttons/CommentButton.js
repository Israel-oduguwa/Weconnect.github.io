import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Comment from "../PostActionLayout/Comment"


export default function RecipeReviewCard() {
 
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
   <>
        <IconButton
        
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>

      
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Comment/>
      </Collapse>
   </>
  );
}