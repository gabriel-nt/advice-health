import { Box, Typography } from '@mui/material';
import { PointTooltipProps } from '@nivo/line';
import useStyles from './useStyles';

const CustomTooltip = ({ point }: PointTooltipProps) => {
  const classes = useStyles();

  return (
    <Box className={classes.tooltipContainer}>
      <Box display="flex" alignItems="center" gap={1}>
        <svg width="12" height="12">
          <rect
            width="10px"
            height="10px"
            fill={point.serieColor}
            rx="2"
            ry="2"
          />
        </svg>
        <Box display="flex" gap={1 / 2} alignItems="center">
          <Typography>{point.data.xFormatted}: </Typography>
          <Typography className="subTitle">{point.data.y}%</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomTooltip;
