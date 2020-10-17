const appBaseRoute = "/smad-web";
const apiBaseUrl = process.env.assayDataApiUrl; // ? process.env.assayDataApiUrl : "http://scoring-data-api.mcf-np.local";
const gridConfigUrl = process.env.gridConfigUrl; // ? process.env.gridConfigUrl : "http://ui-application-configs.mcf-np.local"

const getDropDownsUrl = apiBaseUrl + "/getDropDowns";

const customerReport = "/customerReport";
const customerReportRoute = appBaseRoute + customerReport;
const customerReportUrl = apiBaseUrl + customerReport;

const customerReportEmail = customerReport + "/email";
const customerReportEmailRoute = appBaseRoute + customerReportEmail;
const customerReportEmailUrl = apiBaseUrl + customerReportEmail;

const customerReportDownload = customerReport + "/download";
const customerReportDownloadRoute = appBaseRoute + customerReportDownload;
const customerReportDownloadUrl = apiBaseUrl + customerReportDownload;

// const listenerUrl = "http://localhost:8080/sse";

const scoringAssayData = '/scoringAssayData';
const assayDataRoute = appBaseRoute + scoringAssayData;
const allMarkerPlatesByProjectUrl = apiBaseUrl + "/project/markerPlates";
const allMarkerPlatesUrl = apiBaseUrl + "/allMarkerPlates";

const getGridConfig = '/getGridConfig';
const gridConfigRoute = appBaseRoute + getGridConfig;
const getGridConfigUrl = gridConfigUrl + "/getColumnsConfig";

const saveGridConfig = '/saveGridConfig';
const saveGridConfigRoute = appBaseRoute + saveGridConfig;
const saveGridConfigUrl = gridConfigUrl + "/saveColumnsConfig";

const resetGridConfig = '/resetGridConfig';
const resetGridConfigRoute = appBaseRoute + resetGridConfig;
const resetGridConfigUrl = gridConfigUrl + resetGridConfig;

const syncGridConfig = '/syncGridConfig';
const syncGridConfigRoute = appBaseRoute + syncGridConfig;
const syncGridConfigUrl = gridConfigUrl + syncGridConfig;

const updatePredictedCall = '/updatePredictedCall';
const updatePredictedCallRoute = appBaseRoute + updatePredictedCall;
const updateWellInfoUrl = apiBaseUrl + "/updateWellInfo";

const getProjects = '/getProjects';
const getProjectsRoute = appBaseRoute + getProjects;
const getProjectsUrl = apiBaseUrl + "/projects";

const assignAnalyst = '/assignAnalyst';
const assignAnalystRoute = appBaseRoute + assignAnalyst;
const assignAnalystUrl = apiBaseUrl + assignAnalyst;

const savePlateStatus = '/savePlateStatus';
const savePlateStatusRoute = appBaseRoute + savePlateStatus;
const savePlateStatusUrl = apiBaseUrl + savePlateStatus;

const readyToReview = "/readyToReview";
const readyToReviewRoute = appBaseRoute + readyToReview;
const readyToReviewUrl = apiBaseUrl + readyToReview;

const updateProject = "/project/update";
const updateProjectRoute = appBaseRoute + updateProject;
const updateProjectUrl = apiBaseUrl + updateProject;

const getStatusList = '/getStatusList';
const getStatusListRoute = appBaseRoute + getStatusList;
const getStatusListUrl = getDropDownsUrl;

const getSampleData = "/getSampleData";
const getSampleDataRoute = appBaseRoute + getSampleData;
const getSampleDataUrl = apiBaseUrl + getSampleData;

const cherrypickSamples = "/cherrypickSamples";
const cherrypickSamplesRoute = appBaseRoute + cherrypickSamples;
const cherrypickSamplesUrl = apiBaseUrl + cherrypickSamples;

const getSampleInfoFilters = "/getSampleInfoFilters";
const getSampleInfoFiltersRoute = appBaseRoute + getSampleInfoFilters;
const getSampleInfoFiltersUrl = apiBaseUrl + getSampleInfoFilters;

const requestDetails = "/requestDetails";
const requestDetailsRoute = appBaseRoute + requestDetails;
const requestDetailsUrl = apiBaseUrl + requestDetails;

const submitRedo = '/submitRedo';
const submitRedoRoute = appBaseRoute + submitRedo;
const submitRedoUrl = apiBaseUrl + submitRedo;

const deliverRequest = "/deliverRequest";
const deliverRequestRoute = appBaseRoute + deliverRequest;
const deliverRequestUrl = apiBaseUrl + deliverRequest;

const saveNotes = "/notes/save";
const saveNotesRoute = appBaseRoute + saveNotes;
const saveNotesUrl = apiBaseUrl + saveNotes;

const deleteNotes = "/notes/delete";
const deleteNotesRoute = appBaseRoute + deleteNotes;
const deleteNotesUrl = apiBaseUrl + deleteNotes;

const deleteMarkerPlates = "/markerPlates/delete";
const deleteMarkerPlatesRoute = appBaseRoute + deleteMarkerPlates;
const deleteMarkerPlatesUrl = apiBaseUrl + deleteMarkerPlates;

const samplesForPlate = "/markerPlate/samples";
const samplesForPlateRoute = appBaseRoute + samplesForPlate;
const samplesForPlateUrl = apiBaseUrl + samplesForPlate;

const getDropdownsConfig = "/getDropdownOptions";
const getDropdownsConfigRoute = appBaseRoute + getDropdownsConfig;
const getDropdownsConfigUrl = gridConfigUrl + getDropdownsConfig;

const getAppConfig = "/getAppConfig";
const getAppConfigRoute = appBaseRoute + getAppConfig;
const getAppConfigUrl = gridConfigUrl + getAppConfig;

const saveAppConfig = "/saveAppConfig";
const saveAppConfigRoute = appBaseRoute + saveAppConfig;
const saveAppConfigUrl = gridConfigUrl + saveAppConfig;

const resetAppConfig = "/resetAppConfig";
const resetAppConfigRoute = appBaseRoute + resetAppConfig;
const resetAppConfigUrl = gridConfigUrl + resetAppConfig;

const advanceFilter = "/advanceFilter";
const getAdvanceFilterRoute = appBaseRoute + advanceFilter;
const getAdvanceFilterUrl = apiBaseUrl + advanceFilter;
const saveAdvanceFilter = advanceFilter + "/save";
const saveAdvanceFilterRoute = appBaseRoute + saveAdvanceFilter;
const saveAdvanceFilterUrl = apiBaseUrl + saveAdvanceFilter;
const deleteAdvanceFilter = advanceFilter + "/delete";
const deleteAdvanceFilterRoute = appBaseRoute + deleteAdvanceFilter;
const deleteAdvanceFilterUrl = apiBaseUrl + deleteAdvanceFilter;
const applyAdvanceFilter = advanceFilter + "/apply";
const applyAdvanceFilterRoute = appBaseRoute + applyAdvanceFilter;
const applyAdvanceFilterUrl = apiBaseUrl + applyAdvanceFilter;

const reload = "/reload";
const reloadRoute = appBaseRoute + reload;
const reloadUrl = apiBaseUrl + reload;

module.exports = {
    appBaseRoute,
    allMarkerPlatesUrl, allMarkerPlatesByProjectUrl,
    assayDataRoute, scoringAssayData,
    updatePredictedCall, updatePredictedCallRoute, updateWellInfoUrl,
    saveGridConfig, saveGridConfigRoute, saveGridConfigUrl,
    getGridConfig, gridConfigRoute, getGridConfigUrl,
    getProjectsRoute, getProjectsUrl, getProjects,
    assignAnalyst, assignAnalystRoute, assignAnalystUrl,
    resetGridConfig, resetGridConfigRoute, resetGridConfigUrl,
    savePlateStatusUrl, savePlateStatus, savePlateStatusRoute,
    getStatusListUrl, getStatusList, getStatusListRoute,
    submitRedo, submitRedoUrl, submitRedoRoute,
    deliverRequest, deliverRequestRoute, deliverRequestUrl,
    requestDetails, requestDetailsRoute, requestDetailsUrl,
    getSampleInfoFilters, getSampleInfoFiltersRoute, getSampleInfoFiltersUrl,
    getSampleData, getSampleDataRoute, getSampleDataUrl,
    cherrypickSamples, cherrypickSamplesRoute, cherrypickSamplesUrl,
    customerReport, customerReportRoute, customerReportUrl,
    customerReportEmail, customerReportEmailRoute, customerReportEmailUrl,
    customerReportDownload, customerReportDownloadRoute, customerReportDownloadUrl,
    getDropdownsConfig, getDropdownsConfigRoute, getDropdownsConfigUrl,
    getAppConfig, getAppConfigRoute, getAppConfigUrl,
    saveAppConfig, saveAppConfigRoute, saveAppConfigUrl,
    resetAppConfig, resetAppConfigRoute, resetAppConfigUrl,
    saveNotes, saveNotesRoute, saveNotesUrl,
    deleteNotes, deleteNotesRoute, deleteNotesUrl,
    syncGridConfig, syncGridConfigRoute, syncGridConfigUrl,
    readyToReview, readyToReviewRoute, readyToReviewUrl,
    updateProject, updateProjectRoute, updateProjectUrl,
    deleteMarkerPlates, deleteMarkerPlatesRoute, deleteMarkerPlatesUrl,
    samplesForPlate, samplesForPlateRoute, samplesForPlateUrl,
    advanceFilter, getAdvanceFilterRoute, getAdvanceFilterUrl,
    saveAdvanceFilter, saveAdvanceFilterRoute, saveAdvanceFilterUrl,
    deleteAdvanceFilter, deleteAdvanceFilterRoute, deleteAdvanceFilterUrl,
    applyAdvanceFilter, applyAdvanceFilterRoute, applyAdvanceFilterUrl,
    reload, reloadRoute, reloadUrl
};
