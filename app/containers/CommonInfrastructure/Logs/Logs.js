import React from 'react';
import LogsApi from './LogsApi.js';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';
import Ionicon from 'react-ionicons';

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
  }
});

class Logs extends React.Component {
  _isMounted = false;
    state = {
      columns: [
        {
          name: 'DateTimestamp',
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value) =>{
              var date = new Date(value);

              var dateString, monthString;
              if(date.getDate() < 10){
                dateString = "0" + date.getDate();
              }else{
                dateString = date.getDate();
              }

              if(date.getMonth() < 10){
                monthString = "0" + date.getMonth();
              }else{
                monthString = date.getMonth();
              }

              var dateFormat = dateString + "-" + monthString + "-" + date.getFullYear(); 
              var time = date.toLocaleTimeString();
              var finalDateFormat = dateFormat + " " + time;
              return finalDateFormat;
            }
          }
        },
        {
          name: 'LogStatus',
          options: {
            filter: true,
            sort:true,
          }
        },
        {
          name: 'Message',
          options: {
            filter: false,
            sort: true,
          }
        },
        {
          name: 'SystemCategory',
          options: {
            filter: true,
            sort: true,
          }
        },     
      ],
      apiData: [],
      data: [],       
    } 
  
    componentDidMount() {
      this._isMounted = true;
      this.reloadData();
    }

    reloadData() {
      LogsApi.getAllLogs()
        .done(apiData => {
          var data =[];
          for(let i=0; i < apiData['logs'].length; i++){
            
            var arr=[];
            for(var key in apiData['logs'][i]){
              arr.push(apiData['logs'][i][key]);
            }
            data.push(arr);
          }

          this.setState({
            data: data
          });

        })
        .fail(() => {
          alert('Unable to load data');
        });
    }

    componentWillUnmount()
    {
      this._isMounted = false;
    }

    render() {
      const { classes } = this.props;
      const options = {
        selectableRows: false,
        filterType: 'checkbox',
        responsive: 'stacked',
        print: false,
        rowsPerPage: 20,
        page: 1,
        downloadOptions:{
          filename: 'logs.csv',
          separator: ','
        },
        toolbar: {
          search: "Search",
          downloadCsv: "Download CSV",
          viewColumns: "View Columns",
          filterTable: "Filter Table",
        },
      };

      return (
        <div className={classes.table}>
          <MUIDataTable

            title="Log list"
            data={this.state.data}
            columns={this.state.columns}
            options={options}
          />
        </div>
      )
    }
}
Logs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Logs);