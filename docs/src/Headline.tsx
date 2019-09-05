import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2)
    }
  });

const Headline: React.FunctionComponent<WithStyles<typeof styles>> = props => {
  return <Typography variant="h5" {...props} />;
};

export default withStyles(styles)(Headline);
