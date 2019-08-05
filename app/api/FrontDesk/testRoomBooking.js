import Api from "../../containers/FrontDesk/TodayCheckIn/roomData";
class eventData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testSampleData: []
    };
  }
  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    Api.viewCalendar()
      .done(result => {
        console.log("Before test Json data");
        console.log(this.state.testSampleData);
        this.setState({
          bookingList: result
        });
        console.log("After test Json data");
        console.log(this.state.testSampleData);
      })
      .fail(() => {
        alert("Unable to load data");
      });
  }
  render() {
    const eventData = this.state.testSampleData.map(sampleData => {
      [
        {
          title: sampleData.title,
          allDay: sampleData.allDay,
          start: new Date(sampleData.start),
          end: new Date(sampleData.end),
          RoomNumber: sampleData.roomNumber,
          RoomType: sampleData.roomType,
          RoomStatus: sampleData.roomStatus,
          hexColor: sampleData.hexColor
        }
      ];
    });
    return eventData;
  }
}
export default eventData;
