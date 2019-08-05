import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Api from './hotelData';
import { VUDButtons } from 'dan-components';

const styles = theme => ({
  table: {
    '& > div': {
      overflow: 'auto'
    },
    '& table': {
      minWidth: 500,
      [theme.breakpoints.down('md')]: {
        '& td': {
          height: 40
        }
      }
    }
  },
  button: {
    margin: theme.spacing.unit
  }
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
class AdvFilter extends React.Component {
  constructor(props) {
    super(props);
    const { classes } = this.props;
    this.state = {
      hotels: [],
      columns: [
        {
          name: 'Name',
          options: {
            filter: true
          }
        },
        {
          name: 'Address',
          options: {
            filter: false
          }
        },
        {
          name: 'Email',
          options: {
            filter: true
          }
        },
        {
          name: 'Country'
        },
        {
          name: 'Telephone Number',
          options: {
            filter: false
          }
        },
        {
          name: 'Actions',
          options: {
            filter: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return <VUDButtons hotelId={value} />;
            }
          }
        }
      ]
    };
  }
  handleView(event) {
    alert(event.currentTarget.getAttribute('hotelId'));
  }

  componentDidMount() {
    this._isMounted = true;
    this.reloadData();
  }

  reloadData() {
    Api.getAllHotels()
      .done(result => {
        console.log('Before data');
        console.log(this.state.hotels);

        this.setState({
          hotels: result
        });
        console.log('After data');
        console.log(this.state.hotels);
      })
      .fail(() => {
        alert('Unable to load data');
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { classes } = this.props;
    const options = {
      filterType: 'dropdown',
      responsive: 'stacked',
      print: true,
      rowsPerPage: 10,
      page: 1,
      selectableRows: false
    };
    return (
      <div className={classes.table}>
        <MUIDataTable
          title="Hotel list"
          data={this.state.hotels.map(hotel => {
            return [
              hotel.name,
              hotel.address,
              hotel.email,
              hotel.country,
              hotel.telephoneNumber,
              hotel.hotelId
            ];
          })}
          columns={this.state.columns}
          options={options}
        />
      </div>
    );
  }
}

AdvFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdvFilter);
