import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing.unit * 2
    }
  });

const Headline: React.SFC<WithStyles<typeof styles>> = props => {
  return <Typography variant="headline" {...props} />;
};

export default withStyles(styles)(Headline);
