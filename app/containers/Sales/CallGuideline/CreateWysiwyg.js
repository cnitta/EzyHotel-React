import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Button from "@material-ui/core/Button";
import EventNoteIcon from "@material-ui/icons/EventNote";
import ViewListIcon from "@material-ui/icons/ViewList";
import classNames from "classnames";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import "dan-styles/vendors/react-draft-wysiwyg/react-draft-wysiwyg.css";
import styles from "dan-components/Sales/CallGuideline/email-jss";
import SERVER_PREFIX from "../../../api/ServerConfig";

const content = {
  blocks: [
    {
      key: "637gr",
      text: "Please Enter Your Guideline here...",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {}
};

class Wysiwyg extends PureComponent {
  constructor(props) {
    super(props);
    const contentBlock = convertFromRaw(content);
    if (contentBlock) {
      const editorState = EditorState.createWithContent(contentBlock);
      this.state = {
        editorState,
        guidelineTitleValue: '',
        open: false,
      };
    }
  }

  handleClose = (event, reason) => {
  	const { close } = this.props;
  	if (reason === "clickaway") {
  		return;
    }
    this.setState({ open: false });
  };

  componentWillUpdate(prevProps) {
    this.setState({guidelineTitleValue: prevProps.guidelineTitleValue});
    //console.log(prevProps.guidelineTitleValue);
  }

  handleCreateClick(editorState) {
    if(this.state.guidelineTitleValue == ''){
      this.props.createError("*Required")
    } else {
      const postRequest = new Request(
        SERVER_PREFIX + "/salescallguidelineswysiwyg/title/" + this.state.guidelineTitleValue,
        {
          method: "POST",
          body: JSON.stringify(editorState),
          headers: { "Content-Type": "application/json" }
        }
      );
      fetch(postRequest)
        .then(response => response.json())
        .then(findresponse => {this.setState({ open: true });})
        .catch(error => {
          return error;
        });
    }
  };
   
  handleViewClick() {
    //console.log(this.props);
    this.props.history.push("/app/call-guidelines");
    //console.log(this.props.staffId);
  };

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  render() {
    const { editorState } = this.state;
    const { classes } = this.props;
    return (
      <Fragment>
        <Grid
          container
          alignItems="flex-start"
          justify="space-around"
          direction="row"
          spacing={24}
        >
          <Grid item xs={12}>
            <Editor
              editorState={editorState}
              editorClassName={classes.textEditor}
              toolbarClassName={classes.toolbarEditor}
              onEditorStateChange={this.onEditorStateChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => {this.handleCreateClick(editorState)}}
              color="secondary"
              className={classes.button}
            >
              <EventNoteIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              {"CREATE"}
            </Button>
            <Button
              variant="contained"
              onClick={() => {this.handleViewClick()}}
              color="secondary"
              className={classes.button}
            >
              <ViewListIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              {"VIEW ALL"}
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              open={this.state.open}
              autoHideDuration={3000}
              onClose={() => this.handleClose()}
              ContentProps={{
                "aria-describedby": "message-id",
              }}
              message="Guideline Created"
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={() => this.handleClose()}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Wysiwyg.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Wysiwyg);
