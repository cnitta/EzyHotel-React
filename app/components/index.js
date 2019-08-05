import { fromRenderProps } from "recompose";
import RoomTypeNotification from "./HPM/RoomType/RoomTypeNotification";
import RoomFloatingPanel from "./HPM/Room/RoomFloatingPanel";
import ForcastChart from "./Housekeeping/Forcast/ForcastChart";
import ScheduleTriTable from "./Housekeeping/Schedule/ScheduleTriTable";
import DoActivitySide from "./Housekeeping/Personnel/DoActivitySide";
import DoActivityMinibar from "./Housekeeping/Personnel/DoActivityMinibar";
import RequestTableForm from "./Housekeeping/Request/RequestTableForm";

// Main Components
export Header from "./Header/Header";
export HeaderMenu from "./Header/HeaderMenu";
export Sidebar from "./Sidebar/Sidebar";
export BreadCrumb from "./BreadCrumb/BreadCrumb";
export SourceReader from "./SourceReader/SourceReader";
export PapperBlock from "./PapperBlock/PapperBlock";
export SearchUi from "./Search/SearchUi";
// Landing Page
export Banner from "./LandingPage/Banner";
export Contact from "./LandingPage/Contact";
export Feature from "./LandingPage/Feature";
export Footer from "./LandingPage/Footer";
export HeaderLanding from "./LandingPage/Header";
export Pricing from "./LandingPage/Pricing";
export Showcase from "./LandingPage/Showcase";
export ShowcaseSlider from "./LandingPage/ShowcaseSlider";
export Technology from "./LandingPage/Technology";
export Testimonials from "./LandingPage/Testimonials";
export SideNav from "./LandingPage/SideNav";
// Dashboard and Widget
export CounterWidget from "./Counter/CounterWidget";
export CounterTrading from "./Counter/CounterTrading";
export SliderWidget from "./Widget/SliderWidget";
export CounterChartWidget from "./Widget/CounterChartWidget";
export CounterIconsWidget from "./Widget/CounterIconsWidget";
export CounterCryptoWidget from "./Widget/CounterCryptoWidget";
export PerformanceChartWidget from "./Widget/PerformanceChartWidget";
export TableWidget from "./Widget/TableWidget";
export MarketPlaceWIdget from "./Widget/MarketPlaceWIdget";
export TaskWidget from "./Widget/TaskWidget";
export ProfileWidget from "./Widget/ProfileWidget";
export ProgressWidget from "./Widget/ProgressWidget";
export SalesChartWidget from "./Widget/SalesChartWidget";
export CarouselWidget from "./Widget/CarouselWidget";
export AlbumWidget from "./Widget/AlbumWidget";
export MapWidget from "./Widget/MapWidget";
export ContactWidget from "./Widget/ContactWidget";
export WeatherWidget from "./Widget/WeatherWidget";
export DateWidget from "./Widget/DateWidget";
export FilesWidget from "./Widget/FilesWidget";
export NewsWidget from "./Widget/NewsWidget";
export CalculatorWidget from "./Widget/CalculatorWidget";
export TimelineWidget from "./Widget/TimelineWidget";
export CryptoChartWidget from "./Widget/CryptoChartWidget";
export TradingFormWidget from "./Widget/TradingFormWidget";
export LatestTransactionWidget from "./Widget/LatestTransactionWidget";
export CryptoWalletWidget from "./Widget/CryptoWalletWidget";
export TransferCryptoWidget from "./Widget/TransferCryptoWidget";
export HistoryWidget from "./Widget/HistoryWidget";
export NewsListWidget from "./Widget/NewsListWidget";
export PerformanceWidget from "./Widget/PerformanceWidget";
// Calculator
export Calculator from "./Calculator";
// Guide
export GuideSlider from "./GuideSlider";
// Table Components
export TreeTable from "./Tables/TreeTable";
export CrudTable from "./Tables/CrudTable";
export CrudTableForm from "./Tables/CrudTableForm";
export AdvTable from "./Tables/AdvTable";
export TradingTable from "./Tables/TradingTable";
export EmptyData from "./Tables/EmptyData";
// Form
export Notification from "./Notification/Notification";
export MaterialDropZone from "./Forms/MaterialDropZone";
export LoginForm from "./Forms/LoginForm";
export LoginFormV2 from "./Forms/LoginFormV2";
export LoginFormV3 from "./Forms/LoginFormV3";
export RegisterForm from "./Forms/RegisterForm";
export RegisterFormV2 from "./Forms/RegisterFormV2";
export RegisterFormV3 from "./Forms/RegisterFormV3";
export ResetForm from "./Forms/ResetForm";
export LockForm from "./Forms/LockForm";
export AddressForm from "./Forms/AddressForm";
export PaymentForm from "./Forms/PaymentForm";
export Review from "./Forms/Review";
export SideReview from "./Forms/SideReview";
// Texteditor Toolbar
export HeadlinesButton from "./TextEditor/HeadlinesButton";
// UI
export LimitedBadges from "./Badges/LimitedBadges";
export Quote from "./Quote/Quote";
export Pagination from "./Pagination/Pagination";
export ImageLightbox from "./ImageLightbox/ImageLightbox";
export Rating from "./Rating/Rating";
// Social Media
export Cover from "./SocialMedia/Cover";
export Timeline from "./SocialMedia/Timeline";
export SideSection from "./SocialMedia/SideSection";
export WritePost from "./SocialMedia/WritePost";
export Comments from "./Comments";
// Profile
export About from "./Profile/About";
export Albums from "./Profile/Albums";
export Connection from "./Profile/Connection";
export Favorites from "./Profile/Favorites";
// Card
export ProfileCard from "./CardPaper/ProfileCard";
export GeneralCard from "./CardPaper/GeneralCard";
export NewsCard from "./CardPaper/NewsCard";
export HorizontalNewsCard from "./CardPaper/HorizontalNewsCard";
export PlayerCard from "./CardPaper/PlayerCard";
export PostCard from "./CardPaper/PostCard";
export ProductCard from "./CardPaper/ProductCard";
export VideoCard from "./CardPaper/VideoCard";
export IdentityCard from "./CardPaper/IdentityCard";
export PricingCard from "./CardPaper/PricingCard";
export ShowcaseCard from "./CardPaper/ShowcaseCard";
export HeadlineCard from "./CardPaper/HeadlineCard";
// Search
export SearchProduct from "./Search/SearchProduct";
// Product
export ProductGallery from "./Product/ProductGallery";
export ProductDesc from "./Product/ProductDesc";
// Gallery
export PhotoGallery from "./Gallery/PhotoGallery";
// Invoice
export CommercialInvoice from "./DynamicInvoice/CommercialInvoice";
// Panel
export FloatingPanel from "./Panel/FloatingPanel";
export Cart from "./Cart/Cart";
// Contact
export AddContact from "./Contact/AddContact";
export ContactList from "./Contact/ContactList";
export ContactDetail from "./Contact/ContactDetail";
// Chat
export ChatHeader from "./Chat/ChatHeader";
export ChatRoom from "./Chat/ChatRoom";
// Email
export EmailHeader from "./Email/EmailHeader";
export EmailSidebar from "./Email/EmailSidebar";
export EmailList from "./Email/EmailList";
export ComposeEmail from "./Email/ComposeEmail";
// Calendar
export EventCalendar from "./Calendar/EventCalendar";
export DetailEvent from "./Calendar/DetailEvent";
export AddEvent from "./Calendar/AddEvent";
export AddEventForm from "./Calendar/AddEventForm";
// TaskBoard
export TaskBoard from "./TaskBoard/TaskBoard";
export AddBoard from "./TaskBoard/AddBoard";
// Error
export ErrorWrap from "./Error/ErrorWrap";
// Theme an Layout Settings
export TemplateSettings from "./TemplateSettings";

// Hotel Stay Management - Device
export DeviceCrudTableForm from "./HotelStay/Device/DeviceCrudTableForm";
export DeviceFloatingPanel from "./HotelStay/Device/DeviceFloatingPanel";
export DeviceNotification from "./HotelStay/Device/DeviceNotification";
export DeviceSourceReader from "./HotelStay/Device/SourceReader";
export DevicePapperBlock from "./HotelStay/Device/PapperBlock";
export ViewDeviceButton from "./HotelStay/Device/ViewDeviceButton";
export ViewTheDeviceButton from "./HotelStay/Device/ViewTheDeviceButton";

// Hotel Stay Management - Affiliate
export AffiliateCrudTableForm from "./HotelStay/Affiliate/AffiliateCrudTableForm";
export AffiliateFloatingPanel from "./HotelStay/Affiliate/AffiliateFloatingPanel";
export AffiliateNotification from "./HotelStay/Affiliate/AffiliateNotification";
export AffiliateSourceReader from "./HotelStay/Affiliate/SourceReader";
export AffiliatePapperBlock from "./HotelStay/Affiliate/PapperBlock";
export ViewTheAffiliateButton from "./HotelStay/Affiliate/ViewTheAffiliateButton";

// Hotel Stay Management - AffiliateContent
export ViewTheAffiliateContentButton from "./HotelStay/AffiliateContent/ViewTheAffiliateContentButton";

// Hotel Stay Management - Merchandise
export MerchandiseCrudTableForm from "./HotelStay/Merchandise/MerchandiseCrudTableForm";
export MerchandiseFloatingPanel from "./HotelStay/Merchandise/MerchandiseFloatingPanel";
export MerchandiseNotification from "./HotelStay/Merchandise/MerchandiseNotification";
export MerchandiseSourceReader from "./HotelStay/Merchandise/SourceReader";
export MerchandisePapperBlock from "./HotelStay/Merchandise/PapperBlock";

//Housekeeping
export EstCleaningTimeCrudTableForm from "./Housekeeping/EstCleaningTimeCrudTableForm";
export ForcastChart from "./Housekeeping/Forcast/ForcastChart";
export ForecastTaskBoard from "./Housekeeping/Taskboard/Taskboard";
export ScheduleTriTable from "./Housekeeping/Schedule/ScheduleTriTable";
export PersonnelPerformanceWidget from "./Housekeeping/Personnel/PerformanceWidget";
export PersonnelProfileWidget from "./Housekeeping/Personnel/ProfileWidget";
export PersonnelTimelineWidget from "./Housekeeping/Personnel/TimeLineWidget";
export DoActivitySide from "./Housekeeping/Personnel/DoActivitySide";
export DoActivityRoom from "./Housekeeping/Personnel/DoActivityRoom";
export DoActivityToilet from "./Housekeeping/Personnel/DoActivityToilet";
export DoActivityMinibar from "./Housekeeping/Personnel/DoActivityMinibar";
export RequestTableForm from "./Housekeeping/Request/RequestTableForm";
export MenuItemCard from "./CardPaper/MenuItemCard";

//Staff
export StaffCrudTableForm from "./HumanResource/StaffMgt/StaffCrudTableForm";
export StaffNotification from "./HumanResource/StaffMgt/StaffNotification";
export StaffPapperBlock from "./HumanResource/StaffMgt/StaffPapperBlock";
export StaffSourceReader from "./HumanResource/StaffMgt/StaffSourceReader";

//IndividualLeave
export UserLeaveCrudTableForm from "./HumanResource/UserLeave/CrudTableForm";
export UserLeaveNotification from "./HumanResource/UserLeave/Notification";
export UserLeavePapperBlock from "./HumanResource/UserLeave/PapperBlock";
export UserLeaveSourceReader from "./HumanResource/UserLeave/SourceReader";

//LeaveApproval
export LeaveApprovalCrudTableForm from "./HumanResource/LeaveApproval/CrudTableForm";
export LeaveApprovalNotification from "./HumanResource/LeaveApproval/Notification";
export LeaveApprovalPapperBlock from "./HumanResource/LeaveApproval/PapperBlock";
export LeaveApprovalSourceReader from "./HumanResource/LeaveApproval/SourceReader";

//Work Roster
export WorkRosterCrudTableForm from "./HumanResource/WorkRoster1/WorkRosterCrudTableForm";
export WorkRosterNotification from "./HumanResource/WorkRoster1/WorkRosterNotification";
export WorkRosterPapperBlock from "./HumanResource/WorkRoster1/WorkRosterPapperBlock";
export WorkRosterSourceReader from "./HumanResource/WorkRoster1/WorkRosterSourceReader";

// Sales and Marketing Management - Call Report
export CallReportCrudTableForm from "./Sales/CallReport/CallReportCrudTableForm";
export CallReportFloatingPanel from "./Sales/CallReport/CallReportFloatingPanel";
export CallReportNotification from "./Sales/CallReport/CallReportNotification";
export CallReportSourceReader from "./Sales/CallReport/SourceReader";
export CallReportPapperBlock from "./Sales/CallReport/PapperBlock";

// Sales and Marketing Management - Room Price
export RoomPricingCard from "./Sales/PriceRate/RoomPricingCard";
export SuperiorRoomCrudTable from "./Sales/PriceRate/SuperiorRoomCrudTable";
export SuperiorRoomNotification from "./Sales/PriceRate/SuperiorRoomNotification";
export DeluxeRoomCrudTable from "./Sales/PriceRate/DeluxeRoomCrudTable";
export DeluxeRoomNotification from "./Sales/PriceRate/DeluxeRoomNotification";
export JuniorSuiteCrudTable from "./Sales/PriceRate/JuniorSuiteCrudTable";
export JuniorSuiteNotification from "./Sales/PriceRate/JuniorSuiteNotification";
export ExecutiveSuiteCrudTable from "./Sales/PriceRate/ExecutiveSuiteCrudTable";
export ExecutiveSuiteNotification from "./Sales/PriceRate/ExecutiveSuiteNotification";
export PresidentSuiteCrudTable from "./Sales/PriceRate/PresidentSuiteCrudTable";
export PresidentSuiteNotification from "./Sales/PriceRate/PresidentSuiteNotification";
export MeetingRoomCrudTable from "./Sales/PriceRate/MeetingRoomCrudTable";
export MeetingRoomNotification from "./Sales/PriceRate/MeetingRoomNotification";
export ConferenceRoomCrudTable from "./Sales/PriceRate/ConferenceRoomCrudTable";
export ConferenceRoomNotification from "./Sales/PriceRate/ConferenceRoomNotification";

// Sales and Marketing Management - Convention Booking
export ConventionBookingInvoice from "./Sales/ConventionBooking/ConventionBookingInvoice";
export MeetingRoomAvailabilityEventCalendar from "./Sales/ConventionBooking/MeetingRoomAvailabilityEventCalendar";
export MeetingRoomAvailabilityDetailEvent from "./Sales/ConventionBooking/MeetingRoomAvailabilityDetailEvent";
export MeetingRoomAvailabilityAddEvent from "./Sales/ConventionBooking/MeetingRoomAvailabilityAddEvent";
export MeetingRoomAvailabilityAddEventForm from "./Sales/ConventionBooking/MeetingRoomAvailabilityAddEventForm";
export MeetingRoomAvailabilityNotification from "./Sales/ConventionBooking/MeetingRoomAvailabilityNotification";
export ConferenceRoomAvailabilityEventCalendar from "./Sales/ConventionBooking/ConferenceRoomAvailabilityEventCalendar";
export ConferenceRoomAvailabilityDetailEvent from "./Sales/ConventionBooking/ConferenceRoomAvailabilityDetailEvent";
export ConferenceRoomAvailabilityAddEvent from "./Sales/ConventionBooking/ConferenceRoomAvailabilityAddEvent";
export ConferenceRoomAvailabilityAddEventForm from "./Sales/ConventionBooking/ConferenceRoomAvailabilityAddEventForm";
export ConferenceRoomAvailabilityNotification from "./Sales/ConventionBooking/ConferenceRoomAvailabilityNotification";

// Sales and Marketing Management - Sales Package
export SalesPackageCrudTableForm from "./Sales/SalesPackage/SalesPackageCrudTableForm";
export SalesPackageFloatingPanel from "./Sales/SalesPackage/SalesPackageFloatingPanel";
export SalesPackageNotification from "./Sales/SalesPackage/SalesPackageNotification";
export SalesPackageSourceReader from "./Sales/SalesPackage/SourceReader";
export SalesPackagePapperBlock from "./Sales/SalesPackage/PapperBlock";

// Sales and Marketing Management - Sales Reporting
export SalesPerformanceCounterIconsWidget from "./Sales/SalesReporting/SalesPerformanceCounterIconsWidget";

//Login
export HotelLoginForm from "./Account/LoginForm";
//Set Password
export StaffResetForm from "./ResetPassword/ResetForm";

// Common Infrastructure
export AccountsCrudTableForm from "./CommonInfrastructure/Accounts/AccountsCrudTableForm";
export AccountsFloatingPanel from "./CommonInfrastructure/Accounts/AccountsFloatingPanel";
export AccountsNotification from "./CommonInfrastructure/Accounts/AccountsNotification";
export AccountsSourceReader from "./CommonInfrastructure/Accounts/SourceReader";
export AccountsPapperBlock from "./CommonInfrastructure/Accounts/PapperBlock";

// HPM - Hotel
export HotelCrudTableForm from "./HPM/Hotel/HotelCrudTableForm";
export HotelFloatingPanel from "./HPM/Hotel/HotelFloatingPanel";
export HotelNotification from "./HPM/Hotel/HotelNotification";

export VUDButtons from "./HPM/VUDButtons";
export FacilityCrudTableForm from "./HPM/Facility/FacilityCrudTableForm";
export ViewFacilityButton from "./HPM/Facility/ViewFacilityButton";
export ViewTheFacilityButton from "./HPM/Facility/ViewTheFacilityButton";

export RoomFloatingPanel from "./HPM/Room/RoomMainTableForm";
export RoomCrudTableForm from "./HPM/Room/RoomCrudTableForm";
export ViewRoomButton from "./HPM/Room/ViewRoomButton";
export VUDRoom from "./HPM/Room/VUDRoom";

export RoomTypeCrudTableForm from "./HPM/RoomType/RoomTypeCrudTableForm";
export RoomTypeNotification from "./HPM/RoomType/RoomTypeNotification";
export RoomTypeFloatingPanel from "./HPM/RoomType/RoomTypeFloatingPanel";
export ViewRoomTypeButton from "./HPM/RoomType/ViewRoomTypeButton";
export ViewARoomTypeButton from "./HPM/RoomType/ViewARoomTypeButton";

//FrontDesk
export ViewTodayCheckIn from "./FrontDesk/ViewCheckIn/ViewTodayCheckIn";
export ViewFrontDeskRoomButton from "./FrontDesk/ViewAllRooms/ViewFrontDeskRoomButton";
export ViewTodayCheckOut from "./FrontDesk/ViewCheckOut/ViewTodayCheckOut";
export EditRoomAllocation from "./FrontDesk/ViewAllBooking/EditRoomAllocation";
export EventCalendars from "./FrontDesk/CalendarComponent/EventCalendar";
export DetailEvents from "./FrontDesk/CalendarComponent/DetailEvent";
export AddEvents from "./FrontDesk/CalendarComponent/AddEvent";
export AddEventForms from "./FrontDesk/CalendarComponent/AddEventForm";
export ViewUnpaidInvoice from "./FrontDesk/ViewInvoice/ViewUnpaidInvoice";
export ViewUnpaidRoomOrder from "./FrontDesk/ViewRoomOrder/ViewUnpaidRoomOrder";

//useless
//export FrontDeskViewRoomButton from "./FrontDesk/ViewAllRooms/ViewRoomButton";
export ViewBookingCrudTableForm from "./FrontDesk/RoomAllocation/ViewBookingCrudTableForm";
export ViewBookingFloatingPanel from "./FrontDesk/RoomAllocation/ViewBookingFloatingPanel";
export ViewBookingNotification from "./FrontDesk/RoomAllocation/ViewBookingNotification";
export ViewBookingSourceReader from "./FrontDesk/RoomAllocation/ViewBookingSourceReader";
export ViewBookingPapperBlock from "./FrontDesk/RoomAllocation/ViewBookingPapperBlock";
