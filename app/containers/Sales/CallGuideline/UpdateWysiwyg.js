import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { convertFromRaw, EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
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
      text: "Lorem ipsum dolor sit amet 😀",
      type: "ordered-list-item",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "5o3i5",
      text: "Lorem ipsum dolor sit amet 😀",
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
    this.state = {
      editorState: EditorState.createWithContent(contentBlock),
      guidelineTitleValue: '',
      open: false,
    };
    //console.log(this.props.selectedGuidelineId);
  }

  handleClose = (event, reason) => {
  	const { close } = this.props;
  	if (reason === "clickaway") {
  		return;
    }
    this.setState({ open: false });
  };

  componentWillMount() {
    fetch(SERVER_PREFIX + "/salescallguidelines/" + this.props.selectedGuidelineId)
      .then(Response => Response.json())
      .then(findresponse => {
        var blocks = [];
        //console.log(findresponse[0]);
        for(var i = 0; i < Object.keys(findresponse).length; i++){
          blocks = blocks.concat(findresponse[i]);
        }
        var contentBlockValue = {blocks,entityMap: {}};
        //console.log(contentBlock);
        const contentBlock = convertFromRaw(contentBlockValue);
        this.setState({
          editorState: EditorState.createWithContent(contentBlock),
          guidelineTitleValue: findresponse[0].guidelineTitle
        });
        this.props.updateValue(findresponse[0].guidelineTitle);
      });
    //this.forceUpdate();
  }

  componentWillUpdate(prevProps) {
    if(prevProps.guidelineTitleValue != ""){
      this.setState({guidelineTitleValue: prevProps.guidelineTitleValue});
    }    
  }

  handleUpdateClick(editorState) {
    if (this.state.guidelineTitleValue == '') {
      this.props.createError("*Required")
    } else {
      const postRequest = new Request(
        SERVER_PREFIX + "/salescallguidelineswysiwyg/" + this.props.selectedGuidelineId + "/title/" + this.state.guidelineTitleValue,
        {
          method: "PUT",
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
              onClick={() => {this.handleUpdateClick(editorState)}}
              color="secondary"
              className={classes.button}
            >
              <EditIcon
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              {"UPDATE"}
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
              message="Guideline Updated"
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
