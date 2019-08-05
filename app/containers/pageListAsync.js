import Loadable from "react-loadable";
import Loading from "dan-components/Loading";

// Landing Page
export const HomePage = Loadable({
  loader: () => import("./LandingPage/HomePage"),
  loading: Loading
});
export const SliderPage = Loadable({
  loader: () => import("./LandingPage/SliderPage"),
  loading: Loading
});
export const BlogHome = Loadable({
  loader: () => import("./Pages/Blog"),
  loading: Loading
});
export const Article = Loadable({
  loader: () => import("./Pages/Blog/Article"),
  loading: Loading
});
// Dashboard
export const PersonalDashboard = Loadable({
  loader: () => import("./Dashboard/PersonalDashboard"),
  loading: Loading
});
export const CrmDashboard = Loadable({
  loader: () => import("./Dashboard/CrmDashboard"),
  loading: Loading
});
export const CryptoDashboard = Loadable({
  loader: () => import("./Dashboard/CryptoDashboard"),
  loading: Loading
});

// Widgets
export const Infographics = Loadable({
  loader: () => import("./Widgets/Infographics"),
  loading: Loading
});
export const MiniApps = Loadable({
  loader: () => import("./Widgets/MiniApps"),
  loading: Loading
});
export const Analytics = Loadable({
  loader: () => import("./Widgets/Analytics"),
  loading: Loading
});
export const InfoUpdates = Loadable({
  loader: () => import("./Widgets/InfoUpdates"),
  loading: Loading
});
export const Status = Loadable({
  loader: () => import("./Widgets/Status"),
  loading: Loading
});

// Layouts
export const AppLayout = Loadable({
  loader: () => import("./Layouts/AppLayout"),
  loading: Loading
});
export const Responsive = Loadable({
  loader: () => import("./Layouts/Responsive"),
  loading: Loading
});
export const Grid = Loadable({
  loader: () => import("./Layouts/Grid"),
  loading: Loading
});

// Tables
export const SimpleTable = Loadable({
  loader: () => import("./Tables/BasicTable"),
  loading: Loading
});
export const AdvancedTable = Loadable({
  loader: () => import("./Tables/AdvancedTable"),
  loading: Loading
});
export const TreeTable = Loadable({
  loader: () => import("./Tables/TreeTable"),
  loading: Loading
});
export const EditableCell = Loadable({
  loader: () => import("./Tables/EditableCell"),
  loading: Loading
});
export const TablePlayground = Loadable({
  loader: () => import("./Tables/TablePlayground"),
  loading: Loading
});

// Forms
export const ReduxForm = Loadable({
  loader: () => import("./Forms/ReduxForm"),
  loading: Loading
});
export const DateTimePicker = Loadable({
  loader: () => import("./Forms/DateTimePicker"),
  loading: Loading
});
export const CheckboxRadio = Loadable({
  loader: () => import("./Forms/CheckboxRadio"),
  loading: Loading
});
export const Switches = Loadable({
  loader: () => import("./Forms/Switches"),
  loading: Loading
});
export const Selectbox = Loadable({
  loader: () => import("./Forms/Selectbox"),
  loading: Loading
});
export const Rating = Loadable({
  loader: () => import("./Forms/Rating"),
  loading: Loading
});
export const SliderRange = Loadable({
  loader: () => import("./Forms/SliderRange"),
  loading: Loading
});
export const Buttons = Loadable({
  loader: () => import("./Forms/Buttons"),
  loading: Loading
});
export const ToggleButton = Loadable({
  loader: () => import("./Forms/ToggleButton"),
  loading: Loading
});
export const DialButton = Loadable({
  loader: () => import("./Forms/DialButton"),
  loading: Loading
});
export const Textbox = Loadable({
  loader: () => import("./Forms/Textbox"),
  loading: Loading
});
export const Autocomplete = Loadable({
  loader: () => import("./Forms/Autocomplete"),
  loading: Loading
});
export const TextEditor = Loadable({
  loader: () => import("./Forms/TextEditor"),
  loading: Loading
});
export const Upload = Loadable({
  loader: () => import("./Forms/Upload"),
  loading: Loading
});

// UI Components
export const Badges = Loadable({
  loader: () => import("./UiElements/Badges"),
  loading: Loading
});
export const Avatars = Loadable({
  loader: () => import("./UiElements/Avatars"),
  loading: Loading
});
export const Accordion = Loadable({
  loader: () => import("./UiElements/Accordion"),
  loading: Loading
});
export const List = Loadable({
  loader: () => import("./UiElements/List"),
  loading: Loading
});
export const PopoverTooltip = Loadable({
  loader: () => import("./UiElements/PopoverTooltip"),
  loading: Loading
});
export const Snackbar = Loadable({
  loader: () => import("./UiElements/Snackbar"),
  loading: Loading
});
export const Typography = Loadable({
  loader: () => import("./UiElements/Typography"),
  loading: Loading
});
export const Tabs = Loadable({
  loader: () => import("./UiElements/Tabs"),
  loading: Loading
});
export const Cards = Loadable({
  loader: () => import("./UiElements/Cards"),
  loading: Loading
});
export const ImageGrid = Loadable({
  loader: () => import("./UiElements/ImageGrid"),
  loading: Loading
});
export const Progress = Loadable({
  loader: () => import("./UiElements/Progress"),
  loading: Loading
});
export const DialogModal = Loadable({
  loader: () => import("./UiElements/DialogModal"),
  loading: Loading
});
export const Steppers = Loadable({
  loader: () => import("./UiElements/Steppers"),
  loading: Loading
});
export const DrawerMenu = Loadable({
  loader: () => import("./UiElements/DrawerMenu"),
  loading: Loading
});
export const Paginations = Loadable({
  loader: () => import("./UiElements/Paginations"),
  loading: Loading
});
export const Breadcrumbs = Loadable({
  loader: () => import("./UiElements/Breadcrumbs"),
  loading: Loading
});
export const Icons = Loadable({
  loader: () => import("./UiElements/Icons"),
  loading: Loading
});
export const IonIcons = Loadable({
  loader: () => import("./UiElements/IonIcons"),
  loading: Loading
});
export const SliderCarousel = Loadable({
  loader: () => import("./UiElements/SliderCarousel"),
  loading: Loading
});
export const Tags = Loadable({
  loader: () => import("./UiElements/Tags"),
  loading: Loading
});
export const Dividers = Loadable({
  loader: () => import("./UiElements/Dividers"),
  loading: Loading
});

// Chart
export const LineCharts = Loadable({
  loader: () => import("./Charts/LineCharts"),
  loading: Loading
});
export const BarCharts = Loadable({
  loader: () => import("./Charts/BarCharts"),
  loading: Loading
});
export const AreaCharts = Loadable({
  loader: () => import("./Charts/AreaCharts"),
  loading: Loading
});
export const PieCharts = Loadable({
  loader: () => import("./Charts/PieCharts"),
  loading: Loading
});
export const RadarCharts = Loadable({
  loader: () => import("./Charts/RadarCharts"),
  loading: Loading
});
export const ScatterCharts = Loadable({
  loader: () => import("./Charts/ScatterCharts"),
  loading: Loading
});
export const CompossedCharts = Loadable({
  loader: () => import("./Charts/CompossedCharts"),
  loading: Loading
});
export const DoughnutCharts = Loadable({
  loader: () => import("./Charts/DoughnutCharts"),
  loading: Loading
});
export const BarDirection = Loadable({
  loader: () => import("./Charts/BarDirection"),
  loading: Loading
});
export const LineScatterChart = Loadable({
  loader: () => import("./Charts/LineScatterChart"),
  loading: Loading
});
export const AreaFilledChart = Loadable({
  loader: () => import("./Charts/AreaFilledChart"),
  loading: Loading
});
export const RadarPolarCharts = Loadable({
  loader: () => import("./Charts/RadarPolarCharts"),
  loading: Loading
});

// Pages
export const Login = Loadable({
  loader: () => import("./Pages/Users/Login"),
  loading: Loading
});
export const LoginV2 = Loadable({
  loader: () => import("./Pages/Users/LoginV2"),
  loading: Loading
});
export const LoginV3 = Loadable({
  loader: () => import("./Pages/Users/LoginV3"),
  loading: Loading
});
export const Register = Loadable({
  loader: () => import("./Pages/Users/Register"),
  loading: Loading
});
export const RegisterV2 = Loadable({
  loader: () => import("./Pages/Users/RegisterV2"),
  loading: Loading
});
export const RegisterV3 = Loadable({
  loader: () => import("./Pages/Users/RegisterV3"),
  loading: Loading
});
export const ComingSoon = Loadable({
  loader: () => import("./Pages/ComingSoon"),
  loading: Loading
});
export const Profile = Loadable({
  loader: () => import("./Pages/UserProfile"),
  loading: Loading
});
export const Timeline = Loadable({
  loader: () => import("./Pages/Timeline"),
  loading: Loading
});
export const BlankPage = Loadable({
  loader: () => import("./Pages/BlankPage"),
  loading: Loading
});
export const Pricing = Loadable({
  loader: () => import("./Pages/Pricing"),
  loading: Loading
});
export const Ecommerce = Loadable({
  loader: () => import("./Pages/Ecommerce"),
  loading: Loading
});
export const ProductPage = Loadable({
  loader: () => import("./Pages/Ecommerce/ProductPage"),
  loading: Loading
});
export const CheckoutPage = Loadable({
  loader: () => import("./Pages/Ecommerce/CheckoutPage"),
  loading: Loading
});
export const Contact = Loadable({
  loader: () => import("./Pages/Contact"),
  loading: Loading
});
export const ResetPassword = Loadable({
  loader: () => import("./Pages/Users/ResetPassword"),
  loading: Loading
});
export const LockScreen = Loadable({
  loader: () => import("./Pages/Users/LockScreen"),
  loading: Loading
});
export const Chat = Loadable({
  loader: () => import("./Pages/Chat"),
  loading: Loading
});
export const Email = Loadable({
  loader: () => import("./Pages/Email"),
  loading: Loading
});
export const Photos = Loadable({
  loader: () => import("./Pages/Photos"),
  loading: Loading
});
export const Calendar = Loadable({
  loader: () => import("./Pages/Calendar"),
  loading: Loading
});
export const TaskBoard = Loadable({
  loader: () => import("./Pages/TaskBoard"),
  loading: Loading
});
export const Invoice = Loadable({
  loader: () => import("./Pages/Invoice"),
  loading: Loading
});

// Maps
export const MapMarker = Loadable({
  loader: () => import("./Maps/MapMarker"),
  loading: Loading
});
export const MapDirection = Loadable({
  loader: () => import("./Maps/MapDirection"),
  loading: Loading
});
export const SearchMap = Loadable({
  loader: () => import("./Maps/SearchMap"),
  loading: Loading
});
export const TrafficIndicator = Loadable({
  loader: () => import("./Maps/TrafficIndicator"),
  loading: Loading
});
export const StreetViewMap = Loadable({
  loader: () => import("./Maps/StreetViewMap"),
  loading: Loading
});

// Other
export const NotFound = Loadable({
  loader: () => import("./NotFound/NotFound"),
  loading: Loading
});
export const NotFoundDedicated = Loadable({
  loader: () => import("./Pages/Standalone/NotFoundDedicated"),
  loading: Loading
});
export const Error = Loadable({
  loader: () => import("./Pages/Error"),
  loading: Loading
});
export const Maintenance = Loadable({
  loader: () => import("./Pages/Maintenance"),
  loading: Loading
});
export const Parent = Loadable({
  loader: () => import("./Parent"),
  loading: Loading
});
export const Settings = Loadable({
  loader: () => import("./Pages/Settings"),
  loading: Loading
});
export const HelpSupport = Loadable({
  loader: () => import("./Pages/HelpSupport"),
  loading: Loading
});

//Housekeeping
export const EstCleaningTime = Loadable({
  loader: () => import("./Housekeeping/EstCleaingTime"),
  loading: Loading
});

export const ForecastTable = Loadable({
  loader: () => import("./Housekeeping/Forecast/ForecastTable"),
  loading: Loading
});

export const ForcastTaskBoard = Loadable({
  loader: () => import("./Housekeeping/Taskboard"),
  loading: Loading
});

export const StatusScreen = Loadable({
  loader: () => import("./Housekeeping/HousekeepingTracking/StatusScreen"),
  loading: Loading
});

export const RoomStatusScreen = Loadable({
  loader: () => import("./Housekeeping/HousekeepingTracking/RoomStatus"),
  loading: Loading
});

export const HousekeepingSchedule = Loadable({
  loader: () => import("./Housekeeping/Schedule"),
  loading: Loading
});

export const PersonnelDashboard = Loadable({
  loader: () => import("./Housekeeping/Personnel/Dashboard/Status"),
  loading: Loading
});

export const ActivityList = Loadable({
  loader: () => import("./Housekeeping/Personnel/Dashboard/ActivityList"),
  loading: Loading
});

export const DoActivity = Loadable({
  loader: () => import("./Housekeeping/Personnel/ActivityList/CheckoutPage"),
  loading: Loading
});

export const RequestTable = Loadable({
  loader: () => import("./Housekeeping/Request/RequestTable"),
  loading: Loading
});

export const MenuItemList = Loadable({
  loader: () => import("./Housekeeping/RoomService/MenuItemList"),
  loading: Loading
});

export const MenuItemCreate = Loadable({
  loader: () => import("./Housekeeping/RoomService/MenuItemCreate"),
  loading: Loading
});

export const RoomServiceOrder = Loadable({
  loader: () => import("./Housekeeping/RoomService/RoomServiceOrder"),
  loading: Loading
});

export const RoomServiceDelivery = Loadable({
  loader: () => import("./Housekeeping/RoomService/RoomServiceDelivery"),
  loading: Loading
});

//Hotel Stay Management
export const Device = Loadable({
  loader: () => import("./HotelStay/Device/DeviceAdvFilter"),
  loading: Loading
});

// export const DeviceCategory = Loadable({
//   loader: () => import("./HotelStay/Device/DeviceCategory"),
//   loading: Loading
// });

export const CreateDevice = Loadable({
  loader: () => import("./HotelStay/Device/CreateDevice"),
  loading: Loading
});

export const EditDevice = Loadable({
  loader: () => import("./HotelStay/Device/EditDevice"),
  loading: Loading
});

export const Affiliate = Loadable({
  loader: () => import("./HotelStay/Affiliate/AffiliateAdvFilter"),
  loading: Loading
});

// export const AffiliateCategory = Loadable({
//   loader: () => import("./HotelStay/Affiliate/AffiliateCategory"),
//   loading: Loading
// });

export const CreateAffiliate = Loadable({
  loader: () => import("./HotelStay/Affiliate/CreateAffiliate"),
  loading: Loading
});

export const EditAffiliate = Loadable({
  loader: () => import("./HotelStay/Affiliate/EditAffiliate"),
  loading: Loading
});

export const AffiliateContent = Loadable({
  loader: () =>
    import("./HotelStay/AffiliateContent/AffiliateContentAdvFilter"),
  loading: Loading
});

export const CreateAffiliateContent = Loadable({
  loader: () => import("./HotelStay/AffiliateContent/CreateAffiliateContent"),
  loading: Loading
});

export const EditAffiliateContent = Loadable({
  loader: () => import("./HotelStay/AffiliateContent/EditAffiliateContent"),
  loading: Loading
});

export const Merchandise = Loadable({
  loader: () => import("./HotelStay/Merchandise/Merchandise"),
  loading: Loading
});

export const MerchandiseCategory = Loadable({
  loader: () => import("./HotelStay/Merchandise/MerchandiseCategory"),
  loading: Loading
});

//HR
export const HRStaffTable = Loadable({
  loader: () => import("./HumanResource/StaffMgt/HRStaffMgtPage"),
  loading: Loading
});

export const StaffProfileMain = Loadable({
  loader: () => import("./HumanResource/UserProfile/StaffProfileMain"),
  loading: Loading
});
export const UserLeaveTable = Loadable({
  loader: () => import("./HumanResource/UserLeave/UserLeaveMgtPage"),
  loading: Loading
});
export const LeaveApprovalTable = Loadable({
  loader: () => import("./HumanResource/LeaveApproval/LeaveApprovalMgtPage"),
  loading: Loading
});
export const WorkRosterTable = Loadable({
  loader: () => import("./HumanResource/WorkRoster/WorkRosterTable"),
  loading: Loading
});

export const WorkRosterParts = Loadable({
  loader: () => import("./HumanResource/WorkRosterParts"),
  loading: Loading
});
export const EditIndividual = Loadable({
  loader: () => import("./HumanResource/UserProfile/EditableIndividualForm"),
  loading: Loading
});

//Sales and Marketing - Call Report
export const CallReport = Loadable({
  loader: () => import("./Sales/CallReport/CallReport"),
  loading: Loading
});
export const CallReportCategory = Loadable({
  loader: () => import("./Sales/CallReport/CallReportCategory"),
  loading: Loading
});

//Sales and Marketing - Call Guidelines
export const CallGuidelines = Loadable({
  loader: () => import("./Sales/CallGuideline/CallGuidelines"),
  loading: Loading
});
export const CreateCallGuidelines = Loadable({
  loader: () => import("./Sales/CallGuideline/CreateCallGuidelines"),
  loading: Loading
});
export const UpdateCallGuidelines = Loadable({
  loader: () => import("./Sales/CallGuideline/UpdateCallGuidelines"),
  loading: Loading
});

//Sales and Marketing - Room Price Rate
export const SuperiorRoomPriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/SuperiorRoomPriceRate"),
  loading: Loading
});
export const DeluxeRoomPriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/DeluxeRoomPriceRate"),
  loading: Loading
});
export const JuniorSuitePriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/JuniorSuitePriceRate"),
  loading: Loading
});
export const ExecutiveSuitePriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/ExecutiveSuitePriceRate"),
  loading: Loading
});
export const PresidentSuitePriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/PresidentSuitePriceRate"),
  loading: Loading
});
// Sales - Loyalty
export const LoyaltyProgram = Loadable({
  loader: () => import("./Sales/LoyaltyProgram"),
  loading: Loading
});

//Sales and Marketing - Facility Price Rate
export const MeetingRoomPriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/MeetingRoomPriceRate"),
  loading: Loading
});
export const ConferenceRoomPriceRate = Loadable({
  loader: () => import("./Sales/PriceRate/ConferenceRoomPriceRate"),
  loading: Loading
});

//Sales and Marketing - Convention Booking
export const MeetingRoomAvailability = Loadable({
  loader: () => import("./Sales/ConventionBooking/MeetingRoomAvailability"),
  loading: Loading
});
export const ConferenceRoomAvailability = Loadable({
  loader: () => import("./Sales/ConventionBooking/ConferenceRoomAvailability"),
  loading: Loading
});
export const ConventionHistory = Loadable({
  loader: () => import("./Sales/ConventionBooking/ConventionHistory"),
  loading: Loading
});
export const ReserveFacility = Loadable({
  loader: () => import("./Sales/ConventionBooking/ReserveFacility"),
  loading: Loading
});
export const CreateProgramEntry = Loadable({
  loader: () => import("./Sales/ConventionBooking/CreateProgramEntry"),
  loading: Loading
});
export const ReviewAllDetails = Loadable({
  loader: () => import("./Sales/ConventionBooking/ReviewAllDetails"),
  loading: Loading
});
export const ConventionBookingInvoice = Loadable({
  loader: () => import("./Sales/ConventionBooking/ConventionBookingInvoice"),
  loading: Loading
});

//Sales and Marketing - Sales Packages
export const CreateSalesPackage = Loadable({
  loader: () => import("./Sales/SalesPackage/CreateSalesPackage"),
  loading: Loading
});
export const ViewSalesPackage = Loadable({
  loader: () => import("./Sales/SalesPackage/ViewSalesPackage"),
  loading: Loading
});

//Sales and Marketing - Sales Reporting
export const SalesPerformance = Loadable({
  loader: () => import("./Sales/SalesReporting/SalesPerformance"),
  loading: Loading
});

// Hotel Proptery Management
export const HotelPage = Loadable({
  loader: () => import("./HPM/Hotel/HotelPage"),
  loading: Loading
});

export const RoomPage = Loadable({
  loader: () => import("./HPM/Room/RoomPage"),
  loading: Loading
});

export const RoomType = Loadable({
  loader: () => import("./HPM/RoomType/RoomType"),
  loading: Loading
});

export const FacilityPage = Loadable({
  loader: () => import("./HPM/Facility/FacilityPage"),
  loading: Loading
});

export const HotelTest = Loadable({
  loader: () => import("./HPM/HotelTest"),
  loading: Loading
});

export const Hotel = Loadable({
  loader: () => import("./Pages/Hotel"),
  loading: Loading
});

export const IndiHotel = Loadable({
  loader: () => import("./HPM/IndiHotel"),
  loading: Loading
});

export const CreateHotel = Loadable({
  loader: () => import("./HPM/CreateHotel"),
  loading: Loading
});

export const RoomByHotel = Loadable({
  loader: () => import("./HPM/RoomByHotel"),
  loading: Loading
});

export const RoomTypeByHotel = Loadable({
  loader: () => import("./HPM/RoomTypeByHotel"),
  loading: Loading
});

export const HotelFacility = Loadable({
  loader: () => import("./HPM/HotelFacility"),
  loading: Loading
});

export const ListOfRooms = Loadable({
  loader: () => import("./HPM/ListOfRooms"),
  loading: Loading
});

export const CreateRoom = Loadable({
  loader: () => import("./HPM/CreateRoom"),
  loading: Loading
});

export const EditRoom = Loadable({
  loader: () => import("./HPM/EditRoom"),
  loading: Loading
});

export const FacilitiesInHotel = Loadable({
  loader: () => import("./HPM/FacilitiesInHotel"),
  loading: Loading
});

export const RoomTypeInHotel = Loadable({
  loader: () => import("./HPM/RoomTypeInHotel"),
  loading: Loading
});

export const EditHotel = Loadable({
  loader: () => import("./HPM/EditHotel"),
  loading: Loading
});

export const RoomsInHotel = Loadable({
  loader: () => import("./HPM/RoomsInHotel"),
  loading: Loading
});

//Login
export const LoginPage = Loadable({
  loader: () => import("./Account/Login"),
  loading: Loading
});

//Common Infrastructure
export const Accounts = Loadable({
  loader: () => import("./CommonInfrastructure/Accounts/Accounts"),
  loading: Loading
});

export const Logs = Loadable({
  loader: () => import("./CommonInfrastructure/Logs/Logs"),
  loading: Loading
});
export const setNewPassword = Loadable({
  loader: () => import("./ResetPassword/ResetPassword"),
  loading: Loading
});
// FrontDesk
export const AllocateRooms = Loadable({
  loader: () => import("./FrontDesk/AllocateRooms"),
  loading: Loading
});

export const ProcessCheckOut = Loadable({
  loader: () => import("./FrontDesk/ProcessCheckOut"),
  loading: Loading
});

export const RoomCalendar = Loadable({
  loader: () => import("./FrontDesk/RoomCalendar"),
  loading: Loading
});
export const TodayCheckIn = Loadable({
  loader: () => import("./FrontDesk/TodayCheckIn"),
  loading: Loading
});

export const TodayCheckOut = Loadable({
  loader: () => import("./FrontDesk/TodayCheckOut"),
  loading: Loading
});

export const ViewBookings = Loadable({
  loader: () => import("./FrontDesk/ViewBookings"),
  loading: Loading
});

export const ViewRoomStatus = Loadable({
  loader: () => import("./FrontDesk/ViewRoomStatus"),
  loading: Loading
});

export const ViewAllRooms = Loadable({
  loader: () => import("./FrontDesk/ViewAllRooms"),
  loading: Loading
});

export const ViewInvoiceList = Loadable({
  loader: () => import("./FrontDesk/ViewInvoiceList"),
  loading: Loading
});

export const ProcessPayment = Loadable({
  loader: () => import("./FrontDesk/ProcessPayment"),
  loading: Loading
});

export const PaymentSuccess = Loadable({
  loader: () => import("./FrontDesk/PaymentSuccess"),
  loading: Loading
});

export const ViewRoomOrderList = Loadable({
  loader: () => import("./FrontDesk/ViewRoomOrderList"),
  loading: Loading
});

export const ProcessRoomOrderPayment = Loadable({
  loader: () => import("./FrontDesk/ProcessRoomOrderPayment"),
  loading: Loading
});

export const PaymentRoomOrderSuccess = Loadable({
  loader: () => import("./FrontDesk/PaymentRoomOrderSuccess"),
  loading: Loading
});

//Useless

export const RetrieveTodayCheckIn = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/RetrieveTodayCheckIn"),
  loading: Loading
});

export const FrontDeskCheckInForm = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/CheckInForm"),
  loading: Loading
});
export const FrontDeskGetRoomNo = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/getRoomNo"),
  loading: Loading
});

export const FrontDeskCustomerIndex = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/CustomerIndex"),
  loading: Loading
});

export const FrontDeskViewBooking = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/ViewBooking"),
  loading: Loading
});

export const FrontDeskViewRoomForm = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/ViewRoomForm"),
  loading: Loading
});

export const ViewAllFrontDeskRooms = Loadable({
  loader: () => import("./FrontDesk/roomAllocation/ViewAllRooms"),
  loading: Loading
});
//export const ViewAllRooms = Loadable({
//    loader: () => import("./FrontDesk/roomAllocation/ViewAllRooms"),
//    loading: Loading
//});

export const CreateRoomType = Loadable({
  loader: () => import("./HPM/CreateRoomType"),
  loading: Loading
});

export const EditFacility = Loadable({
  loader: () => import("./HPM/EditFacility"),
  loading: Loading
});

export const CreateFacility = Loadable({
  loader: () => import("./HPM/CreateFacility"),
  loading: Loading
});

export const EditRoomType = Loadable({
  loader: () => import("./HPM/EditRoomType"),
  loading: Loading
});

// Pre-Post Arrival
export const Bookings = Loadable({
  loader: () => import("./PrePostArrival/Bookings"),
  loading: Loading
});
