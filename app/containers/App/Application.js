import React from "react";
import { PropTypes } from "prop-types";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../Templates/Dashboard";
import {
  PersonalDashboard,
  SimpleTable,
  NotFound,
  CrmDashboard,
  TablePlayground,
  HelpSupport,
  ComingSoon,
  EditableCell,
  Device,
  // DeviceCategory,
  CreateDevice,
  EditDevice,
  Affiliate,
  CreateAffiliate,
  EditAffiliate,
  // AffiliateCategory,
  AffiliateContent,
  CreateAffiliateContent,
  EditAffiliateContent,
  Merchandise,
  MerchandiseCategory,
  EstCleaningTime,
  HRStaffTable,
  StaffProfileMain,
  UserLeaveTable,
  LeaveApprovalTable,
  WorkRosterTable,
  DialogModal,
  CallReport,
  CallReportCategory,
  SuperiorRoomPriceRate,
  DeluxeRoomPriceRate,
  JuniorSuitePriceRate,
  ExecutiveSuitePriceRate,
  PresidentSuitePriceRate,
  MeetingRoomPriceRate,
  ConferenceRoomPriceRate,
  CallGuidelines,
  CreateCallGuidelines,
  UpdateCallGuidelines,
  MeetingRoomAvailability,
  ConferenceRoomAvailability,
  ConventionHistory,
  ReserveFacility,
  CreateProgramEntry,
  ReviewAllDetails,
  ConventionBookingInvoice,
  ViewSalesPackage,
  SalesPerformance,
  CreateSalesPackage,
  Calendar,
  Accounts,
  Logs,
  setNewPassword,
  Hotel,
  HotelTest,
  TheHotel,
  RoomPage,
  RoomType,
  FacilityPage,
  ForecastTable,
  StatusScreen,
  RoomStatusScreen,
  CreateHotel,
  RoomByHotel,
  RoomTypeByHotel,
  HotelFacility,
  ListOfRooms,
  FacilitiesInHotel,
  RoomTypeInHotel,
  TodayCheckIn,
  AllocateRooms,
  TodayCheckOut,
  ProcessCheckOut,
  ViewRoomStatus,
  RoomCalendar,
  ViewBookings,
  ViewInvoiceList,
  ProcessPayment,
  PaymentSuccess,
  ViewRoomOrderList,
  ProcessRoomOrderPayment,
  PaymentRoomOrderSuccess,
  RetrieveTodayCheckIn,
  ViewAllFrontDeskRooms,
  FrontDeskCheckInForm,
  FrontDeskCustomerIndex,
  FrontDeskGetRoomNo,
  FrontDeskViewBooking,
  FrontDeskViewRoomForm,
  ViewAllRooms,
  ViewRoomForm,
  EditIndividual,
  TaskBoard,
  ForcastTaskBoard,
  HousekeepingSchedule,
  PersonnelDashboard,
  ActivityList,
  DoActivity,
  CreateFacility,
  EditFacility,
  EditRoomType,
  CreateRoomType,
  RequestTable,
  MenuItemList,
  MenuItemCreate,
  RoomServiceDelivery,
  CreateRoom,
  EditRoom,
  EditHotel,
  LoyaltyProgram,
  RoomsInHotel,
  RoomServiceOrder,
  Bookings,
  CreateRoster,
  WorkRosterParts
} from "../pageListAsync";

import StaffIdManager from "./staffIdManager";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: StaffIdManager.getStaffId()
      // staffId: this.props.staffId //hardcode area
    };
  }

  render() {
    StaffIdManager.checkUserLoggedIn(this.props);
    // console.log("application.js: ", this.props);
    console.log("application.js state staffId: " + this.state.staffId);
    const { changeMode, history } = this.props;
    //console.log("application.js: " + this.props.staffId);
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          {/* Home */}
          <Route
            exact
            path="/app"
            render={props => (
              <StaffProfileMain {...props} staffId={this.props.staffId} />
            )}
          />
          {/* Common Infrastructure */}
          <Route path="/app/user-accounts" component={Accounts} />
          <Route path="/app/logs" component={Logs} />
          {/* Hotel Property */}
          <Route path="/app/hotels" component={HotelTest} />
          <Route path="/app/edit-hotel" component={EditHotel} />
          <Route path="/app/create-hotel" component={CreateHotel} />
          <Route path="/app/hotel-rooms" component={RoomByHotel} />
          <Route path="/app/rooms" component={RoomPage} />
          <Route path="/app/list-of-rooms" component={ListOfRooms} />
          <Route path="/app/create-room" component={CreateRoom} />
          <Route path="/app/edit-a-room" component={EditRoom} />
          <Route path="/app/rooms-in-hotel" component={RoomsInHotel} />
          {/* <Route path="/app/room-types" component={RoomType} /> */}
          <Route path="/app/hotel-room-types" component={RoomTypeByHotel} />
          <Route path="/app/room-types" component={RoomTypeInHotel} />
          <Route path="/app/edit-room-type" component={EditRoomType} />
          <Route path="/app/create-room-type" component={CreateRoomType} />
          <Route path="/app/hotel-facilities" component={HotelFacility} />
          <Route
            path="/app/facilities-in-hotel"
            component={FacilitiesInHotel}
          />
          <Route path="/app/facilities" component={FacilityPage} />
          <Route path="/app/create-facility" component={CreateFacility} />
          <Route path="/app/edit-facility" component={EditFacility} />
          {/* Human Resource */}
          <Route path="/app/work-roster" component={WorkRosterParts} />
          <Route path="/app/create-work-roster" component={CreateRoster} />
          <Route path="/app/staff" component={HRStaffTable} />
          <Route
            path="/app/individualStaff/"
            render={props => (
              <StaffProfileMain {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/editIndividual/"
            render={props => (
              <EditIndividual {...props} staffId={this.props.staffId} />
            )}
          />
          <Route path="/app/trainings" component={SimpleTable} />
          <Route path="/app/leave" component={SimpleTable} />
          <Route
            path="/app/Userleave/"
            render={props => (
              <UserLeaveTable {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/LeaveApproval/"
            render={props => (
              <LeaveApprovalTable {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/work-roster"
            render={props => (
              <WorkRosterTable {...props} staffId={this.props.staffId} />
            )}
          />
          {/* Sales & Marketing */}
          <Route
            path="/app/call-reports"
            render={props => (
              <CallReport {...props} staffId={this.props.staffId} />
            )}
          />
          <Route path="/app/reports-category" component={CallReportCategory} />

          <Route
            path="/app/superior-room"
            render={props => (
              <SuperiorRoomPriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/deluxe-room"
            render={props => (
              <DeluxeRoomPriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/junior-suite"
            render={props => (
              <JuniorSuitePriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/executive-suite"
            render={props => (
              <ExecutiveSuitePriceRate
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/president-suite"
            render={props => (
              <PresidentSuitePriceRate
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/meeting-room"
            render={props => (
              <MeetingRoomPriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/conference-room"
            render={props => (
              <ConferenceRoomPriceRate
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/call-guidelines"
            render={props => (
              <CallGuidelines {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/create-guidelines"
            render={props => (
              <CreateCallGuidelines {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/update-guidelines"
            render={props => (
              <UpdateCallGuidelines {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/meeting-availability"
            render={props => (
              <MeetingRoomAvailability
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/conference-availability"
            render={props => (
              <ConferenceRoomAvailability
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/convention-history"
            render={props => (
              <ConventionHistory {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/reserve-facility"
            render={props => (
              <ReserveFacility {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/create-program"
            render={props => (
              <CreateProgramEntry {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/review-details"
            render={props => (
              <ReviewAllDetails {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/convention-invoice"
            render={props => (
              <ConventionBookingInvoice
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/sales-package"
            render={props => (
              <ViewSalesPackage {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/create-package"
            render={props => (
              <CreateSalesPackage {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/sales-performance"
            render={props => (
              <SalesPerformance {...props} staffId={this.props.staffId} />
            )}
          />

          <Route
            path="/app/superior-room"
            render={props => (
              <SuperiorRoomPriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/deluxe-room"
            render={props => (
              <DeluxeRoomPriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/junior-suite"
            render={props => (
              <JuniorSuitePriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/executive-suite"
            render={props => (
              <ExecutiveSuitePriceRate
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/president-suite"
            render={props => (
              <PresidentSuitePriceRate
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/meeting-room"
            render={props => (
              <MeetingRoomPriceRate {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/conference-room"
            render={props => (
              <ConferenceRoomPriceRate
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/call-guidelines"
            render={props => (
              <CallGuidelines {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/create-guidelines"
            render={props => (
              <CreateCallGuidelines {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/update-guidelines"
            render={props => (
              <UpdateCallGuidelines {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/meeting-availability"
            render={props => (
              <MeetingRoomAvailability
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/conference-availability"
            render={props => (
              <ConferenceRoomAvailability
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/convention-history"
            render={props => (
              <ConventionHistory {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/reserve-facility"
            render={props => (
              <ReserveFacility {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/create-program"
            render={props => (
              <CreateProgramEntry {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/review-details"
            render={props => (
              <ReviewAllDetails {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/convention-invoice"
            render={props => (
              <ConventionBookingInvoice
                {...props}
                staffId={this.props.staffId}
              />
            )}
          />
          <Route
            path="/app/sales-package"
            render={props => (
              <ViewSalesPackage {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/create-package"
            render={props => (
              <CreateSalesPackage {...props} staffId={this.props.staffId} />
            )}
          />
          <Route
            path="/app/sales-performance"
            render={props => (
              <SalesPerformance {...props} staffId={this.props.staffId} />
            )}
          />

          {/* Front Desk */}
          <Route path="/app/room-allocation" component={RoomCalendar} />
          <Route path="/app/check-in" component={TodayCheckIn} />
          <Route path="/app/view-rooms" component={ViewAllRooms} />
          <Route path="/app/successfully-checkin" component={AllocateRooms} />
          <Route path="/app/edit-room" component={ViewBookings} />
          <Route path="/app/check-out" component={TodayCheckOut} />
          <Route
            path="/app/successfully-checkout"
            component={ProcessCheckOut}
          />
          <Route path="/app/view-room-status" component={ViewRoomStatus} />
          <Route path="/app/view-invoice" component={ViewInvoiceList} />
          <Route path="/app/payment-invoice" component={ProcessPayment} />
          <Route path="/app/payment-successful" component={PaymentSuccess} />
          <Route path="/app/view-room-orders" component={ViewRoomOrderList} />
          <Route
            path="/app/payment-room-orders"
            component={ProcessRoomOrderPayment}
          />
          <Route
            path="/app/payment-orders-successful"
            component={PaymentRoomOrderSuccess}
          />
          <Route path="/app/loyalty-program" component={LoyaltyProgram} />
          {/*useless link*/}
          <Route path="/app/check-in" component={FrontDeskCheckInForm} />
          <Route path="/app/room-number" component={FrontDeskGetRoomNo} />
          <Route path="/app/view-room" component={ViewAllFrontDeskRooms} />
          <Route path="/app/view-room-2" component={FrontDeskViewRoomForm} />
          <Route
            path="/app/customer-index"
            component={FrontDeskCustomerIndex}
          />
          <Route path="/app/check-out" component={Calendar} />
          <Route path="/app/view-booking" component={FrontDeskViewBooking} />

          {/* Housekeeping & Room Service */}
          <Route
            path="/app/forecast"
            render={props => <ForecastTable {...props} />}
          />
          <Route path="/app/forecast-workroster" component={ForcastTaskBoard} />
          <Route path="/app/schedule" component={HousekeepingSchedule} />
          <Route
            path="/app/estimated-cleaning-time"
            component={EstCleaningTime}
          />
          <Route path="/app/status-screen" component={StatusScreen} />
          <Route path="/app/room-status-screen" component={RoomStatusScreen} />
          <Route
            path="/app/personnel-dashboard"
            component={PersonnelDashboard}
          />
          <Route
            path="/app/activity-list"
            render={props => <ActivityList {...props} />}
          />
          <Route
            path="/app/do-activity"
            render={props => <DoActivity {...props} />}
          />
          <Route path="/app/all-requests" component={RequestTable} />
          <Route
            path="/app/menu-items"
            render={props => <MenuItemList {...props} />}
          />
          <Route
            path="/app/menu-item-create"
            render={props => <MenuItemCreate {...props} />}
          />
          <Route
            path="/app/room-service-order"
            render={props => <RoomServiceOrder {...props} />}
          />
          <Route
            path="/app/room-service-delivery"
            component={RoomServiceDelivery}
          />
          {/* Pre/Post Arrival */}
          <Route path="/app/bookings" component={Bookings} />
          <Route path="/app/feedback-ratings" component={SimpleTable} />
          <Route path="/app/information-mgt" component={SimpleTable} />

          {/* Hotel Stay */}
          {/* <Route path="/app/devices" component={Device} /> */}
          <Route
            path="/app/devices"
            render={props => <Device {...props} staffId={this.props.staffId} />}
          />
          {/* <Route path="/app/device-category" component={DeviceCategory} /> */}
          <Route path="/app/create-device" component={CreateDevice} />
          <Route path="/app/edit-device" component={EditDevice} />
          {/* <Route path="/app/self-service" component={SimpleTable} /> */}
          <Route
            path="/app/affiliate-advertising/affiliate"
            component={Affiliate}
          />
          <Route
            path="/app/affiliate-advertising/create-affiliate"
            component={CreateAffiliate}
          />
          <Route
            path="/app/affiliate-advertising/edit-affiliate"
            component={EditAffiliate}
          />

          <Route
            path="/app/affiliate-advertising/affiliate-content"
            component={AffiliateContent}
          />
          <Route
            path="/app/affiliate-advertising/create-affiliate-content"
            component={CreateAffiliateContent}
          />
          <Route
            path="/app/affiliate-advertising/edit-affiliate-content"
            component={EditAffiliateContent}
          />
          <Route path="/app/hotel-merchandise" component={Merchandise} />
          {/* <Route path="/app/customer-recommendations" component={SimpleTable} /> */}
          {/* <Route path="/app/interactive-elements" component={ComingSoon} />
          <Route path="/app/smart-hotel-room" component={ComingSoon} /> */}
          {/* Reporting & Analytics */}
          <Route
            path="/app/hotel-performance-dashboard"
            component={PersonalDashboard}
          />
          <Route
            path="/app/projection-forecasting"
            component={PersonalDashboard}
          />
          {/* Default */}
          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    );
  }
}

Application.propTypes = {
  changeMode: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export default Application;
