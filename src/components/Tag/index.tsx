import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';

import { tabStyle } from './styles';

type TagProps = {
  label: string;
  isVisible: boolean;
  isLoading: boolean;
};

export const Tag = ({ label, isVisible, isLoading }: TagProps) => {
  if (!isVisible) return null;
  if (isLoading) return <Skeleton width="110px" height="40px" />;

  return (
    <Box mt={1}>
      <span style={tabStyle}>{label}</span>
    </Box>
  );
};

Tag.defaultProps = {
  isVisible: false,
};

export default Tag;