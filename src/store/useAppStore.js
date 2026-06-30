import { create } from "zustand";
export const useAppStore = create((set, get) => ({
  onCropComplete: null,
  setOnCropComplete: (val) =>
    set({
      onCropComplete:
        typeof val === "function" ? val(get().onCropComplete) : val,
    }),
  adminStats: null,
  setAdminStats: (adminStats) => set({ adminStats }),
  adminApplications: [],
  setAdminApplications: (adminApplications) => set({ adminApplications }),
  adminTeachers: [],
  setAdminTeachers: (adminTeachers) => set({ adminTeachers }),
  adminStudents: [],
  setAdminStudents: (adminStudents) => set({ adminStudents }),
  adminIdCards: [],
  setAdminIdCards: (adminIdCards) => set({ adminIdCards }),
  adminAuditLogs: [],
  setAdminAuditLogs: (adminAuditLogs) => set({ adminAuditLogs }),
  classesList: [],
  setClassesList: (classesList) => set({ classesList }),
  schoolInfo: null,
  setSchoolInfo: (schoolInfo) => set({ schoolInfo }),
  lang: "en",
  setLang: (val) =>
    set({ lang: typeof val === "function" ? val(get().lang) : val }),
  user: (() => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })(),
  setUser: (val) =>
    set({ user: typeof val === "function" ? val(get().user) : val }),
  isLoginView: true,
  setIsLoginView: (val) =>
    set({
      isLoginView: typeof val === "function" ? val(get().isLoginView) : val,
    }),
  email: "",
  setEmail: (val) =>
    set({ email: typeof val === "function" ? val(get().email) : val }),
  password: "",
  setPassword: (val) =>
    set({ password: typeof val === "function" ? val(get().password) : val }),
  firstName: "",
  setFirstName: (val) =>
    set({ firstName: typeof val === "function" ? val(get().firstName) : val }),
  lastName: "",
  setLastName: (val) =>
    set({ lastName: typeof val === "function" ? val(get().lastName) : val }),
  authRole: "student",
  setAuthRole: (val) =>
    set({ authRole: typeof val === "function" ? val(get().authRole) : val }),
  authLang: "en",
  setAuthLang: (val) =>
    set({ authLang: typeof val === "function" ? val(get().authLang) : val }),
  authError: "",
  setAuthError: (val) =>
    set({ authError: typeof val === "function" ? val(get().authError) : val }),
  authSuccess: "",
  setAuthSuccess: (val) =>
    set({
      authSuccess: typeof val === "function" ? val(get().authSuccess) : val,
    }),
  toast: null,
  setToast: (val) =>
    set({ toast: typeof val === "function" ? val(get().toast) : val }),
  studentApplication: null,
  setStudentApplication: (val) =>
    set({
      studentApplication:
        typeof val === "function" ? val(get().studentApplication) : val,
    }),
  studentCard: null,
  setStudentCard: (val) =>
    set({
      studentCard: typeof val === "function" ? val(get().studentCard) : val,
    }),
  wizardStep: 1,
  setWizardStep: (val) =>
    set({
      wizardStep: typeof val === "function" ? val(get().wizardStep) : val,
    }),
  targetClass: "Grade 10-A",
  setTargetClass: (val) =>
    set({
      targetClass: typeof val === "function" ? val(get().targetClass) : val,
    }),
  lastSchoolName: "",
  setLastSchoolName: (val) =>
    set({
      lastSchoolName:
        typeof val === "function" ? val(get().lastSchoolName) : val,
    }),
  lastGeneralGrade: "",
  setLastGeneralGrade: (val) =>
    set({
      lastGeneralGrade:
        typeof val === "function" ? val(get().lastGeneralGrade) : val,
    }),
  parentFullName: "",
  setParentFullName: (val) =>
    set({
      parentFullName:
        typeof val === "function" ? val(get().parentFullName) : val,
    }),
  parentPhone: "",
  setParentPhone: (val) =>
    set({
      parentPhone: typeof val === "function" ? val(get().parentPhone) : val,
    }),
  parentPlaceOfLiving: "",
  setParentPlaceOfLiving: (val) =>
    set({
      parentPlaceOfLiving:
        typeof val === "function" ? val(get().parentPlaceOfLiving) : val,
    }),
  transcriptFile: null,
  setTranscriptFile: (val) =>
    set({
      transcriptFile:
        typeof val === "function" ? val(get().transcriptFile) : val,
    }),
  transcriptBase64: null,
  setTranscriptBase64: (val) =>
    set({
      transcriptBase64:
        typeof val === "function" ? val(get().transcriptBase64) : val,
    }),
  receiptFile: null,
  setReceiptFile: (val) =>
    set({
      receiptFile: typeof val === "function" ? val(get().receiptFile) : val,
    }),
  receiptBase64: null,
  setReceiptBase64: (val) =>
    set({
      receiptBase64: typeof val === "function" ? val(get().receiptBase64) : val,
    }),
  recommendationFile: null,
  setRecommendationFile: (val) =>
    set({
      recommendationFile:
        typeof val === "function" ? val(get().recommendationFile) : val,
    }),
  recommendationBase64: null,
  setRecommendationBase64: (val) =>
    set({
      recommendationBase64:
        typeof val === "function" ? val(get().recommendationBase64) : val,
    }),
  isDraggingTranscript: false,
  setIsDraggingTranscript: (val) =>
    set({
      isDraggingTranscript:
        typeof val === "function" ? val(get().isDraggingTranscript) : val,
    }),
  isDraggingReceipt: false,
  setIsDraggingReceipt: (val) =>
    set({
      isDraggingReceipt:
        typeof val === "function" ? val(get().isDraggingReceipt) : val,
    }),
  isDraggingRecLetter: false,
  setIsDraggingRecLetter: (val) =>
    set({
      isDraggingRecLetter:
        typeof val === "function" ? val(get().isDraggingRecLetter) : val,
    }),
  idPhoto: null,
  setIdPhoto: (val) =>
    set({ idPhoto: typeof val === "function" ? val(get().idPhoto) : val }),
  croppingImage: null,
  setCroppingImage: (val) =>
    set({
      croppingImage: typeof val === "function" ? val(get().croppingImage) : val,
    }),
  activeSidebarTab: "overview",
  setActiveSidebarTab: (val) =>
    set({
      activeSidebarTab:
        typeof val === "function" ? val(get().activeSidebarTab) : val,
    }),
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (val) =>
    set({
      mobileSidebarOpen:
        typeof val === "function" ? val(get().mobileSidebarOpen) : val,
    }),
  adminUsers: [],
  setAdminUsers: (val) =>
    set({
      adminUsers: typeof val === "function" ? val(get().adminUsers) : val,
    }),
  selectedApplication: null,
  setSelectedApplication: (val) =>
    set({
      selectedApplication:
        typeof val === "function" ? val(get().selectedApplication) : val,
    }),
  rejectionReason: "",
  setRejectionReason: (val) =>
    set({
      rejectionReason:
        typeof val === "function" ? val(get().rejectionReason) : val,
    }),
  teacherProfile: null,
  setTeacherProfile: (val) =>
    set({
      teacherProfile:
        typeof val === "function" ? val(get().teacherProfile) : val,
    }),
  teacherQualifications: "",
  setTeacherQualifications: (val) =>
    set({
      teacherQualifications:
        typeof val === "function" ? val(get().teacherQualifications) : val,
    }),
  teacherExperience: 0,
  setTeacherExperience: (val) =>
    set({
      teacherExperience:
        typeof val === "function" ? val(get().teacherExperience) : val,
    }),
  teacherCurriculumNotes: "",
  setTeacherCurriculumNotes: (val) =>
    set({
      teacherCurriculumNotes:
        typeof val === "function" ? val(get().teacherCurriculumNotes) : val,
    }),
  showTeacherModal: false,
  setShowTeacherModal: (val) =>
    set({
      showTeacherModal:
        typeof val === "function" ? val(get().showTeacherModal) : val,
    }),
  editingTeacherId: null,
  setEditingTeacherId: (val) =>
    set({
      editingTeacherId:
        typeof val === "function" ? val(get().editingTeacherId) : val,
    }),
  formTeacherFirst: "",
  setFormTeacherFirst: (val) =>
    set({
      formTeacherFirst:
        typeof val === "function" ? val(get().formTeacherFirst) : val,
    }),
  formTeacherLast: "",
  setFormTeacherLast: (val) =>
    set({
      formTeacherLast:
        typeof val === "function" ? val(get().formTeacherLast) : val,
    }),
  formTeacherEmail: "",
  setFormTeacherEmail: (val) =>
    set({
      formTeacherEmail:
        typeof val === "function" ? val(get().formTeacherEmail) : val,
    }),
  formTeacherQual: "",
  setFormTeacherQual: (val) =>
    set({
      formTeacherQual:
        typeof val === "function" ? val(get().formTeacherQual) : val,
    }),
  formTeacherExp: 0,
  setFormTeacherExp: (val) =>
    set({
      formTeacherExp:
        typeof val === "function" ? val(get().formTeacherExp) : val,
    }),
  formTeacherNotes: "",
  setFormTeacherNotes: (val) =>
    set({
      formTeacherNotes:
        typeof val === "function" ? val(get().formTeacherNotes) : val,
    }),
  formTeacherClasses: [],
  setFormTeacherClasses: (val) =>
    set({
      formTeacherClasses:
        typeof val === "function" ? val(get().formTeacherClasses) : val,
    }),
  formTeacherCourses: [],
  setFormTeacherCourses: (val) =>
    set({
      formTeacherCourses:
        typeof val === "function" ? val(get().formTeacherCourses) : val,
    }),
  adminUserMenuOpen: true,
  setAdminUserMenuOpen: (val) =>
    set({
      adminUserMenuOpen:
        typeof val === "function" ? val(get().adminUserMenuOpen) : val,
    }),
  selectedStudentIds: [],
  setSelectedStudentIds: (val) =>
    set({
      selectedStudentIds:
        typeof val === "function" ? val(get().selectedStudentIds) : val,
    }),
  studentSearchQuery: "",
  setStudentSearchQuery: (val) =>
    set({
      studentSearchQuery:
        typeof val === "function" ? val(get().studentSearchQuery) : val,
    }),
  studentClassFilter: "All",
  setStudentClassFilter: (val) =>
    set({
      studentClassFilter:
        typeof val === "function" ? val(get().studentClassFilter) : val,
    }),
  studentSortField: "name",
  setStudentSortField: (val) =>
    set({
      studentSortField:
        typeof val === "function" ? val(get().studentSortField) : val,
    }),
  studentSortOrder: "asc",
  setStudentSortOrder: (val) =>
    set({
      studentSortOrder:
        typeof val === "function" ? val(get().studentSortOrder) : val,
    }),
  teacherSearchQuery: "",
  setTeacherSearchQuery: (val) =>
    set({
      teacherSearchQuery:
        typeof val === "function" ? val(get().teacherSearchQuery) : val,
    }),
  teacherClassFilter: "All",
  setTeacherClassFilter: (val) =>
    set({
      teacherClassFilter:
        typeof val === "function" ? val(get().teacherClassFilter) : val,
    }),
  teacherSortField: "name",
  setTeacherSortField: (val) =>
    set({
      teacherSortField:
        typeof val === "function" ? val(get().teacherSortField) : val,
    }),
  teacherSortOrder: "asc",
  setTeacherSortOrder: (val) =>
    set({
      teacherSortOrder:
        typeof val === "function" ? val(get().teacherSortOrder) : val,
    }),
  auditSearchQuery: "",
  setAuditSearchQuery: (val) =>
    set({
      auditSearchQuery:
        typeof val === "function" ? val(get().auditSearchQuery) : val,
    }),
  auditActionFilter: "ALL",
  setAuditActionFilter: (val) =>
    set({
      auditActionFilter:
        typeof val === "function" ? val(get().auditActionFilter) : val,
    }),
  selectedStudentAiProfile: null,
  setSelectedStudentAiProfile: (val) =>
    set({
      selectedStudentAiProfile:
        typeof val === "function" ? val(get().selectedStudentAiProfile) : val,
    }),
  selectedTeacherAiProfile: null,
  setSelectedTeacherAiProfile: (val) =>
    set({
      selectedTeacherAiProfile:
        typeof val === "function" ? val(get().selectedTeacherAiProfile) : val,
    }),
  loadingAiAnalysis: null,
  setLoadingAiAnalysis: (val) =>
    set({
      loadingAiAnalysis:
        typeof val === "function" ? val(get().loadingAiAnalysis) : val,
    }),
  showStudentModal: false,
  setShowStudentModal: (val) =>
    set({
      showStudentModal:
        typeof val === "function" ? val(get().showStudentModal) : val,
    }),
  editingStudentId: null,
  setEditingStudentId: (val) =>
    set({
      editingStudentId:
        typeof val === "function" ? val(get().editingStudentId) : val,
    }),
  formStudentFirst: "",
  setFormStudentFirst: (val) =>
    set({
      formStudentFirst:
        typeof val === "function" ? val(get().formStudentFirst) : val,
    }),
  formStudentLast: "",
  setFormStudentLast: (val) =>
    set({
      formStudentLast:
        typeof val === "function" ? val(get().formStudentLast) : val,
    }),
  formStudentEmail: "",
  setFormStudentEmail: (val) =>
    set({
      formStudentEmail:
        typeof val === "function" ? val(get().formStudentEmail) : val,
    }),
  formStudentClass: "Grade 10-A",
  setFormStudentClass: (val) =>
    set({
      formStudentClass:
        typeof val === "function" ? val(get().formStudentClass) : val,
    }),
  formStudentSchool: "",
  setFormStudentSchool: (val) =>
    set({
      formStudentSchool:
        typeof val === "function" ? val(get().formStudentSchool) : val,
    }),
  formStudentGrade: "15.0",
  setFormStudentGrade: (val) =>
    set({
      formStudentGrade:
        typeof val === "function" ? val(get().formStudentGrade) : val,
    }),
  formStudentLang: "en",
  setFormStudentLang: (val) =>
    set({
      formStudentLang:
        typeof val === "function" ? val(get().formStudentLang) : val,
    }),
  formStudentParentName: "",
  setFormStudentParentName: (val) =>
    set({
      formStudentParentName: typeof val === "function" ? val(get().formStudentParentName) : val,
    }),
  formStudentParentPhone: "",
  setFormStudentParentPhone: (val) =>
    set({
      formStudentParentPhone: typeof val === "function" ? val(get().formStudentParentPhone) : val,
    }),
  formStudentParentLiving: "",
  setFormStudentParentLiving: (val) =>
    set({
      formStudentParentLiving: typeof val === "function" ? val(get().formStudentParentLiving) : val,
    }),
  showAdminModal: false,
  setShowAdminModal: (val) =>
    set({
      showAdminModal:
        typeof val === "function" ? val(get().showAdminModal) : val,
    }),
  formAdminFirst: "",
  setFormAdminFirst: (val) =>
    set({
      formAdminFirst:
        typeof val === "function" ? val(get().formAdminFirst) : val,
    }),
  formAdminLast: "",
  setFormAdminLast: (val) =>
    set({
      formAdminLast: typeof val === "function" ? val(get().formAdminLast) : val,
    }),
  formAdminEmail: "",
  setFormAdminEmail: (val) =>
    set({
      formAdminEmail:
        typeof val === "function" ? val(get().formAdminEmail) : val,
    }),
  formAdminPassword: "",
  setFormAdminPassword: (val) =>
    set({
      formAdminPassword:
        typeof val === "function" ? val(get().formAdminPassword) : val,
    }),
  formAdminLang: "en",
  setFormAdminLang: (val) =>
    set({
      formAdminLang: typeof val === "function" ? val(get().formAdminLang) : val,
    }),
  adminCardFilterTab: "pending",
  setAdminCardFilterTab: (val) =>
    set({
      adminCardFilterTab:
        typeof val === "function" ? val(get().adminCardFilterTab) : val,
    }),
  showCardModal: false,
  setShowCardModal: (val) =>
    set({
      showCardModal: typeof val === "function" ? val(get().showCardModal) : val,
    }),
  editingCard: null,
  setEditingCard: (val) =>
    set({
      editingCard: typeof val === "function" ? val(get().editingCard) : val,
    }),
  formCardFirst: "",
  setFormCardFirst: (val) =>
    set({
      formCardFirst: typeof val === "function" ? val(get().formCardFirst) : val,
    }),
  formCardLast: "",
  setFormCardLast: (val) =>
    set({
      formCardLast: typeof val === "function" ? val(get().formCardLast) : val,
    }),
  formCardClass: "",
  setFormCardClass: (val) =>
    set({
      formCardClass: typeof val === "function" ? val(get().formCardClass) : val,
    }),
  formCardPhoto: "",
  setFormCardPhoto: (val) =>
    set({
      formCardPhoto: typeof val === "function" ? val(get().formCardPhoto) : val,
    }),
  formCardStatus: "pending",
  setFormCardStatus: (val) =>
    set({
      formCardStatus:
        typeof val === "function" ? val(get().formCardStatus) : val,
    }),
  formCardValidUntil: "",
  setFormCardValidUntil: (val) =>
    set({
      formCardValidUntil:
        typeof val === "function" ? val(get().formCardValidUntil) : val,
    }),
  viewingCard: null,
  setViewingCard: (val) =>
    set({
      viewingCard: typeof val === "function" ? val(get().viewingCard) : val,
    }),
  profileFirstName: "",
  setProfileFirstName: (val) =>
    set({
      profileFirstName:
        typeof val === "function" ? val(get().profileFirstName) : val,
    }),
  profileLastName: "",
  setProfileLastName: (val) =>
    set({
      profileLastName:
        typeof val === "function" ? val(get().profileLastName) : val,
    }),
  profileLang: "en",
  setProfileLang: (val) =>
    set({
      profileLang: typeof val === "function" ? val(get().profileLang) : val,
    }),
  profileEmail: "",
  setProfileEmail: (val) =>
    set({
      profileEmail: typeof val === "function" ? val(get().profileEmail) : val,
    }),
  profileParentName: "",
  setProfileParentName: (val) =>
    set({
      profileParentName: typeof val === "function" ? val(get().profileParentName) : val,
    }),
  profileParentPhone: "",
  setProfileParentPhone: (val) =>
    set({
      profileParentPhone: typeof val === "function" ? val(get().profileParentPhone) : val,
    }),
  profileParentLiving: "",
  setProfileParentLiving: (val) =>
    set({
      profileParentLiving: typeof val === "function" ? val(get().profileParentLiving) : val,
    }),
  showClassModal: false,
  setShowClassModal: (val) =>
    set({
      showClassModal:
        typeof val === "function" ? val(get().showClassModal) : val,
    }),
  editingClassId: null,
  setEditingClassId: (val) =>
    set({
      editingClassId:
        typeof val === "function" ? val(get().editingClassId) : val,
    }),
  formClassName: "",
  setFormClassName: (val) =>
    set({
      formClassName: typeof val === "function" ? val(get().formClassName) : val,
    }),
  formClassCapacity: 30,
  setFormClassCapacity: (val) =>
    set({
      formClassCapacity:
        typeof val === "function" ? val(get().formClassCapacity) : val,
    }),
  formClassTeachers: [],
  setFormClassTeachers: (val) =>
    set({
      formClassTeachers:
        typeof val === "function" ? val(get().formClassTeachers) : val,
    }),
  formClassSubjects: [],
  setFormClassSubjects: (val) =>
    set({
      formClassSubjects:
        typeof val === "function" ? val(get().formClassSubjects) : val,
    }),
  newSubjectInput: "",
  setNewSubjectInput: (val) =>
    set({
      newSubjectInput:
        typeof val === "function" ? val(get().newSubjectInput) : val,
    }),
  assignTeacherId: "",
  setAssignTeacherId: (val) =>
    set({
      assignTeacherId:
        typeof val === "function" ? val(get().assignTeacherId) : val,
    }),
  assignTopic: "",
  setAssignTopic: (val) =>
    set({
      assignTopic: typeof val === "function" ? val(get().assignTopic) : val,
    }),
  assignDayOfWeek: "",
  setAssignDayOfWeek: (val) =>
    set({
      assignDayOfWeek:
        typeof val === "function" ? val(get().assignDayOfWeek) : val,
    }),
  assignTimeSlot: "",
  setAssignTimeSlot: (val) =>
    set({
      assignTimeSlot:
        typeof val === "function" ? val(get().assignTimeSlot) : val,
    }),
  principalSignature: null,
  setPrincipalSignature: (val) =>
    set({
      principalSignature:
        typeof val === "function" ? val(get().principalSignature) : val,
    }),
  showCommandPalette: false,
  setShowCommandPalette: (val) =>
    set({
      showCommandPalette:
        typeof val === "function" ? val(get().showCommandPalette) : val,
    }),
  commandPaletteQuery: "",
  setCommandPaletteQuery: (val) =>
    set({
      commandPaletteQuery:
        typeof val === "function" ? val(get().commandPaletteQuery) : val,
    }),
  showPrintModal: false,
  setShowPrintModal: (val) =>
    set({
      showPrintModal:
        typeof val === "function" ? val(get().showPrintModal) : val,
    }),
  printScope: "students",
  setPrintScope: (val) =>
    set({
      printScope: typeof val === "function" ? val(get().printScope) : val,
    }),
  isEditingSchoolInfo: false,
  setIsEditingSchoolInfo: (val) =>
    set({
      isEditingSchoolInfo:
        typeof val === "function" ? val(get().isEditingSchoolInfo) : val,
    }),
  showAuth: false,
  setShowAuth: (val) =>
    set({ showAuth: typeof val === "function" ? val(get().showAuth) : val }),
  formSchoolName: "",
  setFormSchoolName: (val) =>
    set({
      formSchoolName:
        typeof val === "function" ? val(get().formSchoolName) : val,
    }),
  formSchoolLogo: "",
  setFormSchoolLogo: (val) =>
    set({
      formSchoolLogo:
        typeof val === "function" ? val(get().formSchoolLogo) : val,
    }),
  formSchoolHistory: "",
  setFormSchoolHistory: (val) =>
    set({
      formSchoolHistory:
        typeof val === "function" ? val(get().formSchoolHistory) : val,
    }),
  formSchoolReferences: "",
  setFormSchoolReferences: (val) =>
    set({
      formSchoolReferences:
        typeof val === "function" ? val(get().formSchoolReferences) : val,
    }),
  formSchoolEmail: "",
  setFormSchoolEmail: (val) =>
    set({
      formSchoolEmail:
        typeof val === "function" ? val(get().formSchoolEmail) : val,
    }),
  formSchoolPhone: "",
  setFormSchoolPhone: (val) =>
    set({
      formSchoolPhone:
        typeof val === "function" ? val(get().formSchoolPhone) : val,
    }),
  formSchoolAddress: "",
  setFormSchoolAddress: (val) =>
    set({
      formSchoolAddress:
        typeof val === "function" ? val(get().formSchoolAddress) : val,
    }),
  formSchoolLat: 0,
  setFormSchoolLat: (val) =>
    set({
      formSchoolLat: typeof val === "function" ? val(get().formSchoolLat) : val,
    }),
  formSchoolLng: 0,
  setFormSchoolLng: (val) =>
    set({
      formSchoolLng: typeof val === "function" ? val(get().formSchoolLng) : val,
    }),
  formSchoolMapIframe: "",
  setFormSchoolMapIframe: (val) =>
    set({
      formSchoolMapIframe:
        typeof val === "function" ? val(get().formSchoolMapIframe) : val,
    }),
  formSchoolMotto: "",
  setFormSchoolMotto: (val) =>
    set({
      formSchoolMotto:
        typeof val === "function" ? val(get().formSchoolMotto) : val,
    }),
  formSchoolEstablished: 1982,
  setFormSchoolEstablished: (val) =>
    set({
      formSchoolEstablished:
        typeof val === "function" ? val(get().formSchoolEstablished) : val,
    }),
  formSchoolPrincipal: "",
  setFormSchoolPrincipal: (val) =>
    set({
      formSchoolPrincipal:
        typeof val === "function" ? val(get().formSchoolPrincipal) : val,
    }),
  formSchoolWebsite: "",
  setFormSchoolWebsite: (val) =>
    set({
      formSchoolWebsite:
        typeof val === "function" ? val(get().formSchoolWebsite) : val,
    }),
  formSchoolColor: "#2563eb",
  setFormSchoolColor: (val) =>
    set({
      formSchoolColor:
        typeof val === "function" ? val(get().formSchoolColor) : val,
    }),
  formSchoolYear: "",
  setFormSchoolYear: (val) =>
    set({
      formSchoolYear:
        typeof val === "function" ? val(get().formSchoolYear) : val,
    }),
  adminPrincipals: [],
  setAdminPrincipals: (val) =>
    set({
      adminPrincipals:
        typeof val === "function" ? val(get().adminPrincipals) : val,
    }),
  showPrincipalModal: false,
  setShowPrincipalModal: (val) =>
    set({
      showPrincipalModal:
        typeof val === "function" ? val(get().showPrincipalModal) : val,
    }),
  editingPrincipalId: null,
  setEditingPrincipalId: (val) =>
    set({
      editingPrincipalId:
        typeof val === "function" ? val(get().editingPrincipalId) : val,
    }),
  formPrincipalUser: "",
  setFormPrincipalUser: (val) =>
    set({
      formPrincipalUser:
        typeof val === "function" ? val(get().formPrincipalUser) : val,
    }),
  formPrincipalFirst: "",
  setFormPrincipalFirst: (val) =>
    set({
      formPrincipalFirst:
        typeof val === "function" ? val(get().formPrincipalFirst) : val,
    }),
  formPrincipalLast: "",
  setFormPrincipalLast: (val) =>
    set({
      formPrincipalLast:
        typeof val === "function" ? val(get().formPrincipalLast) : val,
    }),
  formPrincipalYear: "",
  setFormPrincipalYear: (val) =>
    set({
      formPrincipalYear:
        typeof val === "function" ? val(get().formPrincipalYear) : val,
    }),
  formPrincipalIsCurrent: false,
  setFormPrincipalIsCurrent: (val) =>
    set({
      formPrincipalIsCurrent:
        typeof val === "function" ? val(get().formPrincipalIsCurrent) : val,
    }),
  emailAlertLogs: [],
  setEmailAlertLogs: (val) =>
    set({
      emailAlertLogs:
        typeof val === "function" ? val(get().emailAlertLogs) : val,
    }),
  viewingDocument: null,
  setViewingDocument: (val) =>
    set({
      viewingDocument:
        typeof val === "function" ? val(get().viewingDocument) : val,
    }),
}));
