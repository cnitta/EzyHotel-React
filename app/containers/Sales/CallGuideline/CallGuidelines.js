import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EventNoteIcon from "@material-ui/icons/EventNote";
import EditIcon from "@material-ui/icons/Edit";
import classNames from "classnames";
import { Pagination } from '../../../components';
import SERVER_PREFIX from "../../../api/ServerConfig";

const styles = theme => ({
  paper: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class GeneralPagination extends React.Component {
  constructor() {
    super();
    this.state = {
      page: '1',
      content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        'Suspendisse sed urna in justo euismod condimentum',
        'Fusce placerat enim et odio molestie sagittis.',
        'Vestibulum dignissim orci vitae eros rutrum euismod.',],
      guidelineTitle: [],
      selectedGuidelineId: '1',
      contentsPerPage: '20'
    };
    this.onPageChange = this.onPageChange.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onGoFirst = this.onGoFirst.bind(this);
    this.onGoLast = this.onGoLast.bind(this);
  }

  componentDidMount() {
    fetch(SERVER_PREFIX + "/salescallguidelines")
      .then(Response => Response.json())
      .then(findresponse => {
        var contentOutputArray = [];
        var guidelineTitleArray = [];
        //console.log(findresponse);
        for(var i = 0; i < Object.keys(findresponse).length; i++){
          contentOutputArray = contentOutputArray.concat(findresponse[i].content.split('\',\''));
          guidelineTitleArray = guidelineTitleArray.concat(findresponse[i].guidelineTitle)
        }
        //contentOutputArray = findresponse.content.split('\',\'');
        this.setState({
          content: contentOutputArray,
          guidelineTitle: guidelineTitleArray
        });
      });
    //this.forceUpdate();
  }

  onPageChange(page) {
    this.setState({ page, selectedGuidelineId: page });
    //console.log(this.state.selectedGuidelineId);
  }

  onPrev() {
    let { page } = this.state;
    if (page == 2){
      this.setState({ page: 1 , selectedGuidelineId: 1 });
    } else if (page > 1) {
      this.setState({ page: (page -= 1) , selectedGuidelineId: (page -= 1) });
    } else {
      this.setState({ page: 1 , selectedGuidelineId: 1});
    }
  }

  onNext(totalPages) {
    let { page } = this.state;
    if (page == 1){
      this.setState({ page: 2 , selectedGuidelineId: 2 });
    } else if (page < totalPages-1) {
      this.setState({ page: (page += 1), selectedGuidelineId: (page += 1) });
    } else {
      this.setState({ page: totalPages, selectedGuidelineId: totalPages });
    }
  }

  onGoFirst() {
    this.setState({ page: 1, selectedGuidelineId: 1 });
  }

  onGoLast(totalPages) {
    this.setState({ page: totalPages, selectedGuidelineId: totalPages });
  }

  handleCreateClick = () => {
    this.props.history.push("/app/create-guidelines");
    //console.log(this.props.staffId);
  };

  handleUpdateClick = () => {
    this.props.history.push({
      pathname: '/app/update-guidelines',
      state: {selectedGuidelineId: this.state.selectedGuidelineId}});
    //console.log(this.props.staffId);
  };

  render() {
    const { classes } = this.props;
    const { page, content, contentsPerPage, guidelineTitle } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = page * contentsPerPage;
    const indexOfFirstTodo = indexOfLastTodo - contentsPerPage;
    const currentContent = content.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderContent = currentContent.map((ctn, index) => (
      <p key={index.toString()}>{ctn}</p>
    ));

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(content.length / contentsPerPage); i += 1) {
      pageNumbers.push(i);
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <h3>
            {guidelineTitle[page-1]}
          </h3>
          <article>{renderContent}</article>
        </Paper>
        { pageNumbers.length != 1 && 
        <Pagination
          curpage={page}
          totpages={pageNumbers.length}
          boundaryPagesRange={1}
          onChange={this.onPageChange}
          siblingPagesRange={1}
          hideEllipsis={false}
          onPrev={this.onPrev}
          onNext={() => this.onNext(pageNumbers.length)}
          onGoFirst={this.onGoFirst}
          onGoLast={() => this.onGoLast(pageNumbers.length)}
        />
        }
        <Button
          variant="contained"
          onClick={this.handleCreateClick}
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
          onClick={this.handleUpdateClick}
          color="secondary"
          className={classes.button}
        >
          <EditIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          {"UPDATE"}
        </Button>
      </div>
    );
  }
}

GeneralPagination.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GeneralPagination);