import React, { useRef } from "react";
import SchoolGeneralInfoPanel from "./pages/admin/SchoolGeneralInfoPanel";
import { motion, AnimatePresence } from "motion/react";
import { ImageCropperModal } from "./components/ImageCropperModal";
import { SignaturePad } from "./components/SignaturePad";
import { getTranslation } from "./translations";
import { School, Edit3, Mail, Globe, MapPin } from "lucide-react";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Header from "./components/layout/Header";
import ProfileBanner from "./components/ui/ProfileBanner";
import Sidebar from "./components/layout/Sidebar";
import OverviewTab from "./pages/admin/OverviewTab";
import AdmissionsTab from "./pages/admin/AdmissionsTab";
import IdCardsTab from "./pages/admin/IdCardsTab";
import AdminsTab from "./pages/admin/AdminsTab";
import StudentsDirTab from "./pages/admin/StudentsDirTab";
import TeachersTab from "./pages/admin/TeachersTab";
import ClassesTab from "./pages/admin/ClassesTab";
import AuditLogsTab from "./pages/admin/AuditLogsTab";
import TeacherOnboardingTab from "./pages/teacher/TeacherOnboardingTab";
import TeacherAllocationsTab from "./pages/teacher/TeacherAllocationsTab";
import ProfileTab from "./pages/shared/ProfileTab";
import StudentApplicationTab from "./pages/student/StudentApplicationTab";
import StudentIdCardTab from "./pages/student/StudentIdCardTab";
import StudentSchoolInfoPanel from "./pages/student/StudentSchoolInfoPanel";
import { ClassModal } from "./components/modals/ClassModal";
import { StudentModal } from "./components/modals/StudentModal";
import { TeacherModal } from "./components/modals/TeacherModal";
import { AdminModal } from "./components/modals/AdminModal";
import { CardEditModal } from "./components/modals/CardEditModal";
import { CardViewModal } from "./components/modals/CardViewModal";
import { AiStudentModal } from "./components/modals/AiStudentModal";
import { AiTeacherModal } from "./components/modals/AiTeacherModal";
import { PrintPreviewModal } from "./components/modals/PrintPreviewModal";
import { CommandPalette } from "./components/modals/CommandPalette";
import { DocumentViewerModal } from "./components/modals/DocumentViewerModal";
import { useAppStore } from "./store/useAppStore";
import { useAppHandlers } from "./hooks/useAppHandlers";
import { CheckCircle, AlertTriangle, Info } from "lucide-react";
import { useFetchInitialData } from "./hooks/useFetchInitialData";
export default function App() {
  useFetchInitialData();
  const store = useAppStore();
  const handlers = useAppHandlers();
  const {
    onCropComplete,
    setOnCropComplete,
    adminStats,
    setAdminStats,
    adminApplications,
    setAdminApplications,
    adminTeachers,
    setAdminTeachers,
    adminStudents,
    setAdminStudents,
    adminIdCards,
    setAdminIdCards,
    adminAuditLogs,
    setAdminAuditLogs,
    classesList,
    setClassesList,
    schoolInfo,
    setSchoolInfo,
    lang,
    setLang,
    user,
    setUser,
    isLoginView,
    setIsLoginView,
    email,
    setEmail,
    password,
    setPassword,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    authRole,
    setAuthRole,
    authLang,
    setAuthLang,
    authError,
    setAuthError,
    authSuccess,
    setAuthSuccess,
    toast,
    setToast,
    studentApplication,
    setStudentApplication,
    studentCard,
    setStudentCard,
    wizardStep,
    setWizardStep,
    targetClass,
    setTargetClass,
    lastSchoolName,
    setLastSchoolName,
    lastGeneralGrade,
    setLastGeneralGrade,
    transcriptFile,
    setTranscriptFile,
    receiptFile,
    setReceiptFile,
    recommendationFile,
    setRecommendationFile,
    isDraggingTranscript,
    setIsDraggingTranscript,
    isDraggingReceipt,
    setIsDraggingReceipt,
    isDraggingRecLetter,
    setIsDraggingRecLetter,
    idPhoto,
    setIdPhoto,
    croppingImage,
    setCroppingImage,
    activeSidebarTab,
    setActiveSidebarTab,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    adminUsers,
    setAdminUsers,
    selectedApplication,
    setSelectedApplication,
    rejectionReason,
    setRejectionReason,
    teacherProfile,
    setTeacherProfile,
    teacherQualifications,
    setTeacherQualifications,
    teacherExperience,
    setTeacherExperience,
    teacherCurriculumNotes,
    setTeacherCurriculumNotes,
    showTeacherModal,
    setShowTeacherModal,
    editingTeacherId,
    setEditingTeacherId,
    formTeacherFirst,
    setFormTeacherFirst,
    formTeacherLast,
    setFormTeacherLast,
    formTeacherEmail,
    setFormTeacherEmail,
    formTeacherQual,
    setFormTeacherQual,
    formTeacherExp,
    setFormTeacherExp,
    formTeacherNotes,
    setFormTeacherNotes,
    formTeacherClasses,
    setFormTeacherClasses,
    formTeacherCourses,
    setFormTeacherCourses,
    adminUserMenuOpen,
    setAdminUserMenuOpen,
    selectedStudentIds,
    setSelectedStudentIds,
    studentSearchQuery,
    setStudentSearchQuery,
    studentClassFilter,
    setStudentClassFilter,
    studentSortField,
    setStudentSortField,
    studentSortOrder,
    setStudentSortOrder,
    teacherSearchQuery,
    setTeacherSearchQuery,
    teacherClassFilter,
    setTeacherClassFilter,
    teacherSortField,
    setTeacherSortField,
    teacherSortOrder,
    setTeacherSortOrder,
    auditSearchQuery,
    setAuditSearchQuery,
    auditActionFilter,
    setAuditActionFilter,
    selectedStudentAiProfile,
    setSelectedStudentAiProfile,
    selectedTeacherAiProfile,
    setSelectedTeacherAiProfile,
    loadingAiAnalysis,
    setLoadingAiAnalysis,
    showStudentModal,
    setShowStudentModal,
    editingStudentId,
    setEditingStudentId,
    formStudentFirst,
    setFormStudentFirst,
    formStudentLast,
    setFormStudentLast,
    formStudentEmail,
    setFormStudentEmail,
    formStudentClass,
    setFormStudentClass,
    formStudentSchool,
    setFormStudentSchool,
    formStudentGrade,
    setFormStudentGrade,
    formStudentLang,
    setFormStudentLang,
    showAdminModal,
    setShowAdminModal,
    formAdminFirst,
    setFormAdminFirst,
    formAdminLast,
    setFormAdminLast,
    formAdminEmail,
    setFormAdminEmail,
    formAdminPassword,
    setFormAdminPassword,
    formAdminLang,
    setFormAdminLang,
    adminCardFilterTab,
    setAdminCardFilterTab,
    showCardModal,
    setShowCardModal,
    editingCard,
    setEditingCard,
    formCardFirst,
    setFormCardFirst,
    formCardLast,
    setFormCardLast,
    formCardClass,
    setFormCardClass,
    formCardPhoto,
    setFormCardPhoto,
    formCardStatus,
    setFormCardStatus,
    formCardValidUntil,
    setFormCardValidUntil,
    viewingCard,
    setViewingCard,
    profileFirstName,
    setProfileFirstName,
    profileLastName,
    setProfileLastName,
    profileLang,
    setProfileLang,
    profileEmail,
    setProfileEmail,
    showClassModal,
    setShowClassModal,
    editingClassId,
    setEditingClassId,
    formClassName,
    setFormClassName,
    formClassCapacity,
    setFormClassCapacity,
    formClassTeachers,
    setFormClassTeachers,
    formClassSubjects,
    setFormClassSubjects,
    newSubjectInput,
    setNewSubjectInput,
    assignTeacherId,
    setAssignTeacherId,
    assignTopic,
    setAssignTopic,
    principalSignature,
    setPrincipalSignature,
    showCommandPalette,
    setShowCommandPalette,
    commandPaletteQuery,
    setCommandPaletteQuery,
    showPrintModal,
    setShowPrintModal,
    printScope,
    setPrintScope,
    isEditingSchoolInfo,
    setIsEditingSchoolInfo,
    showAuth,
    setShowAuth,
    formSchoolName,
    setFormSchoolName,
    formSchoolLogo,
    setFormSchoolLogo,
    formSchoolHistory,
    setFormSchoolHistory,
    formSchoolReferences,
    setFormSchoolReferences,
    formSchoolEmail,
    setFormSchoolEmail,
    formSchoolPhone,
    setFormSchoolPhone,
    formSchoolAddress,
    setFormSchoolAddress,
    formSchoolLat,
    setFormSchoolLat,
    formSchoolLng,
    setFormSchoolLng,
    formSchoolMapIframe,
    setFormSchoolMapIframe,
    formSchoolMotto,
    setFormSchoolMotto,
    formSchoolEstablished,
    setFormSchoolEstablished,
    formSchoolPrincipal,
    setFormSchoolPrincipal,
    formSchoolWebsite,
    setFormSchoolWebsite,
    formSchoolColor,
    setFormSchoolColor,
    emailAlertLogs,
    setEmailAlertLogs,
  } = store;
  const {
    handleBulkDelete,
    handleRemoveTeacherAssignmentFromClass,
    handleEvaluateApplication,
    handleEnrollmentSubmit,
    displayTeachers,
    handlePhotoUpload,
    handleOpenEditCard,
    handleDeleteTeacherClick,
    handleBatchPdfDownload,
    filteredTeachers,
    handleSavePhotoForIDCard,
    handleAnalyzeTeacher,
    handleTeacherOnboardingSubmit,
    handleAnalyzeStudent,
    handleAdminDeleteAdmin,
    filteredAuditLogs,
    filteredStudents,
    handleSaveSchoolInfo,
    handleDeleteClass,
    handleTeacherSortChange,
    getStudentName,
    toggleFormClass,
    sortedStudents,
    handleLogout,
    handleIdCardRequest,
    displayStudents,
    handleSchoolLogoUpload,
    handleAdminSaveAdmin,
    handleRealFileChange,
    handleSaveClass,
    resetStudentForm,
    handleSaveSignature,
    handleFileUploadSim,
    handleDeleteStudentClick,
    resetTeacherForm,
    toggleLanguage,
    fetchPortalData,
    toggleFormCourse,
    handleSaveEditCard,
    handleProfileUpdateSubmit,
    handleApproveIdCard,
    handleBulkExport,
    handleCardPhotoUpload,
    handleStudentSortChange,
    getFilteredCommandPaletteItems,
    sortedTeachers,
    handleQuickLogin,
    handleExportCSV,
    handleExportTeachersCSV,
    handleAuthSubmit,
    handleSaveStudent,
    handleEditStudentClick,
    showNotification,
    handleAdminSaveTeacher,
    handleEditTeacherClick,
    handleBulkApprove,
  } = handlers;
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const photoInputRef = useRef(null);
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 transition-colors duration-300">
      {/* --- FLOATING TOAST ALERTS --- */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-lg flex items-center gap-3 border text-sm font-medium ${
              toast.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : toast.type === "error"
                  ? "bg-rose-50 text-rose-800 border-rose-200"
                  : "bg-blue-50 text-blue-800 border-blue-200"
            }`}
          >
            {toast.type === "success" && (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            )}
            {toast.type === "error" && (
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-blue-600" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- PROFESSIONAL HEADER NAVIGATION --- */}
      <Header
        user={user}
        lang={lang}
        schoolInfo={schoolInfo}
        showAuth={showAuth}
        setShowAuth={setShowAuth}
        setIsLoginView={setIsLoginView}
        mobileSidebarOpen={mobileSidebarOpen}
        setMobileSidebarOpen={setMobileSidebarOpen}
        setShowCommandPalette={setShowCommandPalette}
        toggleLanguage={toggleLanguage}
        handleLogout={handleLogout}
      />

      {/* --- MAIN PAGE CONTAINER --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* --- VIEW ROUTER --- */}
        {!user ? (
          !showAuth ? (
            <LandingPage
              lang={lang}
              onNavigateToAuth={(role, isRegister) => {
                setAuthRole(role);
                setIsLoginView(!isRegister);
                setShowAuth(true);
              }}
              classesCount={classesList.length}
              teachersCount={adminTeachers.length}
            />
          ) : (
            <Auth
              isLoginView={isLoginView}
              setIsLoginView={setIsLoginView}
              authError={authError}
              setAuthError={setAuthError}
              authSuccess={authSuccess}
              setAuthSuccess={setAuthSuccess}
              lang={lang}
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              authRole={authRole}
              setAuthRole={setAuthRole}
              authLang={authLang}
              setAuthLang={setAuthLang}
              handleAuthSubmit={handleAuthSubmit}
              handleQuickLogin={handleQuickLogin}
            />
          )
        ) : (
          /* ========================================================
           MAIN AUTHENTICATED SYSTEM DASHBOARDS
           ======================================================== */
          <div className="flex flex-col md:flex-row gap-8 items-start relative w-full text-left">
            {/* Sidebar Navigation */}
            <Sidebar
              user={user}
              lang={lang}
              activeSidebarTab={activeSidebarTab}
              setActiveSidebarTab={setActiveSidebarTab}
              mobileSidebarOpen={mobileSidebarOpen}
              setMobileSidebarOpen={setMobileSidebarOpen}
              adminUserMenuOpen={adminUserMenuOpen}
              setAdminUserMenuOpen={setAdminUserMenuOpen}
            />

            {/* Main Content Area */}
            <div className="flex-1 w-full space-y-8">
              {/* Quick Profile Summary Banner */}
              <ProfileBanner user={user} lang={lang} />

              {/* --- PORTAL DISPATCHER --- */}

              {activeSidebarTab === "profile" && (
                <ProfileTab
                  lang={lang}
                  user={user}
                  profileFirstName={profileFirstName}
                  setProfileFirstName={setProfileFirstName}
                  profileLastName={profileLastName}
                  setProfileLastName={setProfileLastName}
                  profileEmail={profileEmail}
                  profileLang={profileLang}
                  setProfileLang={setProfileLang}
                  handleProfileUpdateSubmit={handleProfileUpdateSubmit}
                />
              )}

              {/* ========================================================
               PORTAL A: STUDENT PORTAL & MULTILINGUAL ENROLLMENT WIZARD
               ======================================================== */}
              {user.role === "student" && (
                <div className="w-full space-y-8">
                  {activeSidebarTab === "application" && (
                    <StudentApplicationTab
                      lang={lang}
                      getTranslation={getTranslation}
                      wizardStep={wizardStep}
                      setWizardStep={setWizardStep}
                      classesList={classesList}
                      targetClass={targetClass}
                      setTargetClass={setTargetClass}
                      lastSchoolName={lastSchoolName}
                      setLastSchoolName={setLastSchoolName}
                      lastGeneralGrade={lastGeneralGrade}
                      setLastGeneralGrade={setLastGeneralGrade}
                      showNotification={showNotification}
                      transcriptFile={transcriptFile}
                      setTranscriptFile={setTranscriptFile}
                      receiptFile={receiptFile}
                      setReceiptFile={setReceiptFile}
                      recommendationFile={recommendationFile}
                      setRecommendationFile={setRecommendationFile}
                      isDraggingTranscript={isDraggingTranscript}
                      setIsDraggingTranscript={setIsDraggingTranscript}
                      isDraggingReceipt={isDraggingReceipt}
                      setIsDraggingReceipt={setIsDraggingReceipt}
                      isDraggingRecLetter={isDraggingRecLetter}
                      setIsDraggingRecLetter={setIsDraggingRecLetter}
                      fileInputRef1={fileInputRef1}
                      fileInputRef2={fileInputRef2}
                      fileInputRef3={fileInputRef3}
                      handleRealFileChange={handleRealFileChange}
                      handleEnrollmentSubmit={handleEnrollmentSubmit}
                      studentApplication={studentApplication}
                      setStudentApplication={setStudentApplication}
                    />
                  )}

                  {activeSidebarTab === "id_card_request" && (
                    <StudentIdCardTab
                      lang={lang}
                      getTranslation={getTranslation}
                      user={user}
                      studentApplication={studentApplication}
                      studentCard={studentCard}
                      idPhoto={idPhoto}
                      photoInputRef={photoInputRef}
                      handlePhotoUpload={handlePhotoUpload}
                      handleIdCardRequest={handleIdCardRequest}
                      handleSavePhotoForIDCard={handleSavePhotoForIDCard}
                      targetClass={targetClass}
                      principalSignature={principalSignature}
                    />
                  )}

                  {/* School General Info & Interactive Map Panel */}
                  <StudentSchoolInfoPanel lang={lang} schoolInfo={schoolInfo} />
                </div>
              )}

              {/* ========================================================
               PORTAL B: RICH ADMINISTRATIVE DASHBOARD & SCREENING CENTER
               ======================================================== */}
              {(user.role === "admin" || user.role === "principal") && (
                <div className="space-y-8">
                  {activeSidebarTab === "overview" && (
                    <OverviewTab lang={lang} />
                  )}

                  {activeSidebarTab === "admissions" && (
                    <AdmissionsTab
                      lang={lang}
                      getStudentName={getStudentName}
                      showNotification={showNotification}
                      handleEvaluateApplication={handleEvaluateApplication}
                      selectedApplication={selectedApplication}
                      setSelectedApplication={setSelectedApplication}
                      rejectionReason={rejectionReason}
                      setRejectionReason={setRejectionReason}
                    />
                  )}

                  {activeSidebarTab === "id_cards" && (
                    <IdCardsTab
                      lang={lang}
                      principalSignature={principalSignature}
                      getStudentName={getStudentName}
                      setActiveSidebarTab={setActiveSidebarTab}
                      adminCardFilterTab={adminCardFilterTab}
                      setAdminCardFilterTab={setAdminCardFilterTab}
                      handleBatchPdfDownload={handleBatchPdfDownload}
                      setViewingCard={setViewingCard}
                      handleOpenEditCard={handleOpenEditCard}
                      handleApproveIdCard={handleApproveIdCard}
                      handleDeleteStudentClick={handleDeleteStudentClick}
                    />
                  )}

                  {activeSidebarTab === "admins" && (
                    <AdminsTab
                      lang={lang}
                      adminUsers={adminUsers}
                      user={user}
                      setShowAdminModal={setShowAdminModal}
                      handleAdminDeleteAdmin={handleAdminDeleteAdmin}
                    />
                  )}

                  {activeSidebarTab === "students_dir" && (
                    <StudentsDirTab
                      lang={lang}
                      adminIdCards={adminIdCards}
                      loadingAiAnalysis={loadingAiAnalysis}
                      selectedStudentIds={selectedStudentIds}
                      setSelectedStudentIds={setSelectedStudentIds}
                      studentSearchQuery={studentSearchQuery}
                      setStudentSearchQuery={setStudentSearchQuery}
                      studentClassFilter={studentClassFilter}
                      setStudentClassFilter={setStudentClassFilter}
                      studentSortField={studentSortField}
                      studentSortOrder={studentSortOrder}
                      handleStudentSortChange={handleStudentSortChange}
                      displayStudents={displayStudents}
                      adminStudents={adminStudents}
                      setShowPrintModal={setShowPrintModal}
                      setPrintScope={setPrintScope}
                      handleExportCSV={handleExportCSV}
                      resetStudentForm={resetStudentForm}
                      setShowStudentModal={setShowStudentModal}
                      handleBulkApprove={handleBulkApprove}
                      handleBulkExport={handleBulkExport}
                      handleBulkDelete={handleBulkDelete}
                      setViewingCard={setViewingCard}
                      handleAnalyzeStudent={handleAnalyzeStudent}
                      handleEditStudentClick={handleEditStudentClick}
                      handleDeleteStudentClick={handleDeleteStudentClick}
                    />
                  )}

                  {activeSidebarTab === "teachers" && (
                    <TeachersTab
                      lang={lang}
                      getTranslation={getTranslation}
                      teacherSearchQuery={teacherSearchQuery}
                      setTeacherSearchQuery={setTeacherSearchQuery}
                      teacherClassFilter={teacherClassFilter}
                      setTeacherClassFilter={setTeacherClassFilter}
                      teacherSortField={teacherSortField}
                      teacherSortOrder={teacherSortOrder}
                      handleTeacherSortChange={handleTeacherSortChange}
                      displayTeachers={displayTeachers}
                      adminTeachers={adminTeachers}
                      handleExportTeachersCSV={handleExportTeachersCSV}
                      setPrintScope={setPrintScope}
                      setShowPrintModal={setShowPrintModal}
                      resetTeacherForm={resetTeacherForm}
                      setShowTeacherModal={setShowTeacherModal}
                      loadingAiAnalysis={loadingAiAnalysis}
                      handleAnalyzeTeacher={handleAnalyzeTeacher}
                      handleEditTeacherClick={handleEditTeacherClick}
                      handleDeleteTeacherClick={handleDeleteTeacherClick}
                    />
                  )}

                  {activeSidebarTab === "classes" && (
                    <ClassesTab
                      lang={lang}
                      classesList={classesList}
                      adminApplications={adminApplications}
                      setEditingClassId={setEditingClassId}
                      setFormClassName={setFormClassName}
                      setFormClassCapacity={setFormClassCapacity}
                      setFormClassTeachers={setFormClassTeachers}
                      setFormClassSubjects={setFormClassSubjects}
                      setAssignTeacherId={setAssignTeacherId}
                      setAssignTopic={setAssignTopic}
                      setShowClassModal={setShowClassModal}
                      handleRemoveTeacherAssignmentFromClass={
                        handleRemoveTeacherAssignmentFromClass
                      }
                      handleDeleteClass={handleDeleteClass}
                    />
                  )}

                  {activeSidebarTab === "audit_logs" && (
                    <AuditLogsTab
                      lang={lang}
                      adminAuditLogs={adminAuditLogs}
                      auditSearchQuery={auditSearchQuery}
                      setAuditSearchQuery={setAuditSearchQuery}
                      auditActionFilter={auditActionFilter}
                      setAuditActionFilter={setAuditActionFilter}
                      filteredAuditLogs={filteredAuditLogs}
                    />
                  )}

                  {activeSidebarTab === "overview" && (
                    <SchoolGeneralInfoPanel />
                  )}

                  {activeSidebarTab === "overview" && (
                    <SignaturePad
                      onSave={handleSaveSignature}
                      initialSignatureUrl={principalSignature}
                      lang={lang}
                    />
                  )}

                  {activeSidebarTab === "admissions" && (
                    /* --- SIMULATED BACKGROUND MULTILINGUAL EMAIL COMMUNICATIONS LOGS --- */
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm text-left">
                      <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
                            Asynchronous Email Dispatch Log Simulator
                          </h3>
                        </div>
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-mono rounded">
                          ● LIVE CHANNEL
                        </span>
                      </div>

                      <div className="p-6 font-mono text-xs text-slate-600 space-y-4 max-h-80 overflow-y-auto">
                        {emailAlertLogs.length === 0 ? (
                          <p className="text-slate-400 text-xs italic text-center py-6">
                            Admissions activity (Approvals / Rejections) will
                            log simulated notification emails in real-time here.
                          </p>
                        ) : (
                          emailAlertLogs.map((log) => (
                            <div
                              key={log.id}
                              className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2"
                            >
                              <div className="flex justify-between text-[10px] text-slate-400 border-b border-slate-200/80 pb-1.5">
                                <span>Recipient: {log.recipient}</span>
                                <span>Simulated Sent At: {log.timestamp}</span>
                              </div>
                              <p className="text-blue-600 font-bold">
                                Subject: {log.subject}
                              </p>
                              <p className="text-[11px] whitespace-pre-wrap leading-relaxed text-slate-600">
                                {log.body}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ========================================================
               PORTAL C: TEACHER ONBOARDING PROFILE & CURRICULUM ALLOCATIONS
               ======================================================== */}
              {user.role === "teacher" && (
                <div className="w-full space-y-8 text-left">
                  {activeSidebarTab === "onboarding" && (
                    <TeacherOnboardingTab
                      lang={lang}
                      getTranslation={getTranslation}
                      handleTeacherOnboardingSubmit={
                        handleTeacherOnboardingSubmit
                      }
                      teacherQualifications={teacherQualifications}
                      setTeacherQualifications={setTeacherQualifications}
                      teacherExperience={teacherExperience}
                      setTeacherExperience={setTeacherExperience}
                      teacherCurriculumNotes={teacherCurriculumNotes}
                      setTeacherCurriculumNotes={setTeacherCurriculumNotes}
                    />
                  )}

                  {activeSidebarTab === "allocations" && (
                    <TeacherAllocationsTab
                      lang={lang}
                      classesList={classesList}
                      user={user}
                      teacherProfile={teacherProfile}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <StudentModal />
      <TeacherModal />
      <ClassModal />
      <DocumentViewerModal />
      <AdminModal />
      <CardEditModal />
      <CardViewModal />
      <AiStudentModal />
      <AiTeacherModal />
      <PrintPreviewModal />
      <CommandPalette />

      {/* --- IMAGE CROPPER MODAL (ALWAYS ON TOP) --- */}
      <AnimatePresence>
        {croppingImage && onCropComplete && (
          <ImageCropperModal
            imageSrc={croppingImage}
            onClose={() => {
              setCroppingImage(null);
              setOnCropComplete(null);
            }}
            onCrop={(cropped) => {
              onCropComplete(cropped);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
