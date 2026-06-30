import { useEffect, useRef } from "react";
import { useAppStore } from "../store/useAppStore";
import { getTranslation } from "../translations";
import {
  School,
  UserIcon,
  FileText,
  Plus,
  BookOpen,
  GraduationCap,
} from "lucide-react";
export const useAppHandlers = () => {
  const store = useAppStore();
  const {
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
    parentFullName,
    setParentFullName,
    parentPhone,
    setParentPhone,
    parentPlaceOfLiving,
    setParentPlaceOfLiving,
    transcriptFile,
    setTranscriptFile,
    transcriptBase64,
    setTranscriptBase64,
    receiptFile,
    setReceiptFile,
    receiptBase64,
    setReceiptBase64,
    recommendationFile,
    setRecommendationFile,
    recommendationBase64,
    setRecommendationBase64,
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
    formStudentParentName,
    setFormStudentParentName,
    formStudentParentPhone,
    setFormStudentParentPhone,
    formStudentParentLiving,
    setFormStudentParentLiving,
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
    profileParentName,
    setProfileParentName,
    profileParentPhone,
    setProfileParentPhone,
    profileParentLiving,
    setProfileParentLiving,
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
    setAssignDayOfWeek,
    setAssignTimeSlot,
    principalSignature,
    setPrincipalSignature,
    showCommandPalette,
    setShowCommandPalette,
    commandPaletteQuery,
    setCommandPaletteQuery,
    showPrintModal,
    setShowPrintModal,
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
    formSchoolYear,
    setFormSchoolYear,
    adminPrincipals,
    setAdminPrincipals,
    showPrincipalModal,
    setShowPrincipalModal,
    editingPrincipalId,
    setEditingPrincipalId,
    formPrincipalUser,
    setFormPrincipalUser,
    formPrincipalFirst,
    setFormPrincipalFirst,
    formPrincipalLast,
    setFormPrincipalLast,
    formPrincipalYear,
    setFormPrincipalYear,
    formPrincipalIsCurrent,
    setFormPrincipalIsCurrent,
    emailAlertLogs,
    setEmailAlertLogs,
    onCropComplete,
    setOnCropComplete,
  } = store;
  useEffect(() => {
    if (user) {
      if (user.role === "admin" || user.role === "principal") {
        setActiveSidebarTab("overview");
      } else if (user.role === "teacher") {
        setActiveSidebarTab("onboarding");
      } else if (user.role === "student") {
        setActiveSidebarTab("application");
      }
    }
  }, [user]);
  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts if user is typing in an input/textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }
      // Cmd+K or Ctrl+K to open search command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
      // 'n' or 'N' to open Add New record modal
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        if (user && (user.role === "admin" || user.role === "principal")) {
          if (activeSidebarTab === "classes") {
            setShowClassModal(true);
          } else if (activeSidebarTab === "overview") {
            setShowStudentModal(true);
          } else {
            setShowStudentModal(true);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [user, activeSidebarTab]);
  // Admin Portal State
  // Teacher Onboarding State & Assigned Curriculum Info
  // Admin Teacher Manage Modal/Form State
  // Admin User Menu / Directory State
  // Audit Logs Filter States
  // AI Feature States
  // Admin Administrator Management State
  // Admin Student Card Management & Modal State
  // Admin View Popup State for ID Card
  // Profile Edit State (for all users)
  // Dynamic Classes State
  // School General Info State & Admin Edit Fields
  // Simulation Console Logs shown on UI for visual verification
  // --- COMPONENT REFS ---
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const photoInputRef = useRef(null);
  const hasLoadedStudentDraftRef = useRef(null);
  const hasLoadedTeacherDraftRef = useRef(null);
  // --- EFFECT: LOAD RELEVANT USER DATA ON ROLE SWITCH ---
  useEffect(() => {
    if (user) {
      setLang(user.preferred_language);
      setProfileFirstName(user.first_name);
      setProfileLastName(user.last_name);
      setProfileLang(user.preferred_language);
      setProfileEmail(user.email);
      setProfileParentName(user.parent_full_name || "");
      setProfileParentPhone(user.parent_phone || "");
      setProfileParentLiving(user.parent_place_of_living || "");
      fetchPortalData();
    }
  }, [user]);
  // Toast timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  // Auto-save enrollment wizard form draft
  useEffect(() => {
    if (
      user &&
      user.role === "student" &&
      hasLoadedStudentDraftRef.current === user.id &&
      !studentApplication
    ) {
      const draft = {
        targetClass,
        lastSchoolName,
        lastGeneralGrade,
        parentFullName,
        parentPhone,
        parentPlaceOfLiving,
        transcriptFile,
        receiptFile,
        recommendationFile,
        wizardStep,
      };
      localStorage.setItem(
        "enrollment_wizard_draft_" + user.id,
        JSON.stringify(draft),
      );
    }
  }, [
    targetClass,
    lastSchoolName,
    lastGeneralGrade,
    parentFullName,
    parentPhone,
    parentPlaceOfLiving,
    transcriptFile,
    receiptFile,
    recommendationFile,
    wizardStep,
    user,
    studentApplication,
  ]);
  // Auto-save teacher profile form draft
  useEffect(() => {
    if (
      user &&
      user.role === "teacher" &&
      hasLoadedTeacherDraftRef.current === user.id
    ) {
      const draft = {
        teacherQualifications,
        teacherExperience,
        teacherCurriculumNotes,
      };
      localStorage.setItem(
        "teacher_profile_draft_" + user.id,
        JSON.stringify(draft),
      );
    }
  }, [teacherQualifications, teacherExperience, teacherCurriculumNotes, user]);
  // Show customized toasts
  const showNotification = (message, type = "success") => {
    setToast({ message, type });
  };
  // --- FETCHING LOGIC ---
  const fetchPortalData = async () => {
    if (!user) return;
    try {
      if (user.role === "student") {
        // Fetch student application
        const appRes = await fetch(`/api/applications?student_id=${user.id}`);
        if (appRes.ok) {
          const apps = await appRes.json();
          if (apps.length > 0) {
            setStudentApplication(apps[0]);
            setTargetClass(apps[0].target_class);
            setLastSchoolName(apps[0].last_school_name);
            setLastGeneralGrade(
              apps[0].last_general_grade != null
                ? String(apps[0].last_general_grade)
                : "",
            );
            setParentFullName(apps[0].parent_full_name || "");
            setParentPhone(apps[0].parent_phone || "");
            setParentPlaceOfLiving(apps[0].parent_place_of_living || "");
            setTranscriptFile(apps[0].transcript_file_name);
            setReceiptFile(apps[0].payment_receipt_name);
            setRecommendationFile(apps[0].recommendation_letter_name);
            setWizardStep(5); // Go straight to application outcome step
            hasLoadedStudentDraftRef.current = user.id;
          } else {
            setStudentApplication(null);
            if (hasLoadedStudentDraftRef.current !== user.id) {
              const savedDraft = localStorage.getItem(
                "enrollment_wizard_draft_" + user.id,
              );
              if (savedDraft) {
                try {
                  const draft = JSON.parse(savedDraft);
                  if (draft.targetClass) setTargetClass(draft.targetClass);
                  if (draft.lastSchoolName)
                    setLastSchoolName(draft.lastSchoolName);
                  if (draft.lastGeneralGrade)
                    setLastGeneralGrade(draft.lastGeneralGrade);
                  if (draft.parentFullName) setParentFullName(draft.parentFullName);
                  if (draft.parentPhone) setParentPhone(draft.parentPhone);
                  if (draft.parentPlaceOfLiving) setParentPlaceOfLiving(draft.parentPlaceOfLiving);
                  if (draft.transcriptFile)
                    setTranscriptFile(draft.transcriptFile);
                  if (draft.receiptFile) setReceiptFile(draft.receiptFile);
                  if (draft.recommendationFile)
                    setRecommendationFile(draft.recommendationFile);
                  if (draft.wizardStep) setWizardStep(draft.wizardStep);
                } catch (e) {
                  console.error("Failed to parse wizard draft", e);
                }
              } else {
                setWizardStep(1);
              }
              hasLoadedStudentDraftRef.current = user.id;
            }
          }
        }
        // Fetch ID request
        const cardRes = await fetch("/api/id-cards");
        if (cardRes.ok) {
          const cards = await cardRes.json();
          const card = cards.find((c) => c.student_id === user.id);
          if (card) {
            setStudentCard(card);
            setIdPhoto(card.profile_photo_url);
          } else {
            setStudentCard(null);
            setIdPhoto(null);
          }
        }
      }
      if (user.role === "admin" || user.role === "principal") {
        // Fetch stats
        const statsRes = await fetch("/api/stats");
        if (statsRes.ok) {
          const stats = await statsRes.json();
          setAdminStats(stats);
        }
        // Fetch applications
        const appsRes = await fetch("/api/applications");
        if (appsRes.ok) {
          const apps = await appsRes.json();
          setAdminApplications(apps);
        }
        // Fetch ID cards
        const cardsRes = await fetch("/api/id-cards");
        if (cardsRes.ok) {
          const cards = await cardsRes.json();
          setAdminIdCards(cards);
        }
        // Fetch Teachers
        const teachersRes = await fetch("/api/teachers");
        if (teachersRes.ok) {
          const teachers = await teachersRes.json();
          setAdminTeachers(teachers);
        }
        // Fetch Students
        const studentsRes = await fetch("/api/students");
        if (studentsRes.ok) {
          const students = await studentsRes.json();
          setAdminStudents(students);
        }
        // Fetch Users list to map names and details
        const usersRes = await fetch("/api/users");
        if (usersRes.ok) {
          const usersList = await usersRes.json();
          setAdminUsers(usersList);
        }
        // Fetch Audit Logs
        const auditLogsRes = await fetch(
          `/api/audit-logs?requester_id=${user.id}`,
        );
        if (auditLogsRes.ok) {
          const logs = await auditLogsRes.json();
          setAdminAuditLogs(logs);
        }
        if (user.role === "admin") {
          const principalsRes = await fetch(`/api/admin/principals?requester_id=${user.id}`);
          if (principalsRes.ok) {
            const list = await principalsRes.json();
            setAdminPrincipals(list);
          }
        }
      }
      if (user.role === "teacher") {
        // Fetch teacher syllabus profiles
        const teachersRes = await fetch("/api/teachers");
        if (teachersRes.ok) {
          const teachers = await teachersRes.json();
          const profile = teachers.find((t) => t.id === user.id);
          if (profile) {
            setTeacherProfile(profile);
            if (hasLoadedTeacherDraftRef.current !== user.id) {
              const savedDraft = localStorage.getItem(
                "teacher_profile_draft_" + user.id,
              );
              if (savedDraft) {
                try {
                  const draft = JSON.parse(savedDraft);
                  setTeacherQualifications(
                    draft.teacherQualifications !== undefined
                      ? draft.teacherQualifications
                      : profile.qualifications || "",
                  );
                  setTeacherExperience(
                    draft.teacherExperience !== undefined
                      ? Number(draft.teacherExperience)
                      : profile.experience_years || 0,
                  );
                  setTeacherCurriculumNotes(
                    draft.teacherCurriculumNotes !== undefined
                      ? draft.teacherCurriculumNotes
                      : profile.curriculum_notes || "",
                  );
                } catch (e) {
                  console.error("Failed to parse teacher profile draft", e);
                  setTeacherQualifications(profile.qualifications || "");
                  setTeacherExperience(profile.experience_years || 0);
                  setTeacherCurriculumNotes(profile.curriculum_notes || "");
                }
              } else {
                setTeacherQualifications(profile.qualifications || "");
                setTeacherExperience(profile.experience_years || 0);
                setTeacherCurriculumNotes(profile.curriculum_notes || "");
              }
              hasLoadedTeacherDraftRef.current = user.id;
            }
          } else {
            setTeacherProfile(null);
            if (hasLoadedTeacherDraftRef.current !== user.id) {
              const savedDraft = localStorage.getItem(
                "teacher_profile_draft_" + user.id,
              );
              if (savedDraft) {
                try {
                  const draft = JSON.parse(savedDraft);
                  if (draft.teacherQualifications)
                    setTeacherQualifications(draft.teacherQualifications);
                  if (draft.teacherExperience)
                    setTeacherExperience(Number(draft.teacherExperience));
                  if (draft.teacherCurriculumNotes)
                    setTeacherCurriculumNotes(draft.teacherCurriculumNotes);
                } catch (e) {
                  console.error("Failed to parse teacher profile draft", e);
                }
              } else {
                setTeacherQualifications("");
                setTeacherExperience(0);
                setTeacherCurriculumNotes("");
              }
              hasLoadedTeacherDraftRef.current = user.id;
            }
          }
        }
      }
      // Fetch general school info for all roles
      const infoRes = await fetch("/api/school-info");
      if (infoRes.ok) {
        const info = await infoRes.json();
        setSchoolInfo(info);
        // Pre-fill form fields for admin editing
        setFormSchoolName(info.name);
        setFormSchoolLogo(info.logo_url);
        setFormSchoolHistory(info.history);
        setFormSchoolReferences(info.references);
        setFormSchoolEmail(info.contact_email);
        setFormSchoolPhone(info.contact_phone);
        setFormSchoolAddress(info.contact_address);
        setFormSchoolLat(info.geolocation_lat);
        setFormSchoolLng(info.geolocation_lng);
        setFormSchoolMapIframe(info.map_iframe_url);
      }
      // Fetch principal's signature
      try {
        const sigRes = await fetch("/api/principal/signature");
        if (sigRes.ok) {
          const sigData = await sigRes.json();
          setPrincipalSignature(sigData.signature);
        }
      } catch (e) {
        console.error("Failed to fetch principal signature", e);
      }
      // Fetch dynamic classes
      const classesRes = await fetch("/api/classes");
      if (classesRes.ok) {
        const classesData = await classesRes.json();
        setClassesList(classesData);
      }
    } catch (err) {
      console.error("Error fetching dashboard data", err);
      showNotification("Failed to update live dashboard state.", "error");
    }
  };
  // --- ACTIONS ---
  // Language Toggle
  const toggleLanguage = async () => {
    const nextLang = lang === "en" ? "fr" : "en";
    setLang(nextLang);
    showNotification(
      nextLang === "en" ? "Switched to English" : "Passé au Français",
      "info",
    );
    // Update server language preference if user is active
    if (user) {
      try {
        const res = await fetch("/api/auth/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: user.id, preferred_language: nextLang }),
        });
        if (res.ok) {
          const updatedUser = await res.json();
          setUser(updatedUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // Auth: Submit Login or Register
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    try {
      if (isLoginView) {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
          const authData = await res.json();
          const loggedUser = authData.user;
          setUser(loggedUser);
          localStorage.setItem("user", JSON.stringify(loggedUser));
          localStorage.setItem("school_auth_token", authData.token);
          showNotification(
            loggedUser.preferred_language === "fr"
              ? "Connexion réussie !"
              : "Welcome back!",
            "success",
          );
        } else {
          const errData = await res.json();
          setAuthError(errData.error || "Invalid login details.");
        }
      } else {
        // Register
        if (!firstName || !lastName || !email || !password) {
          setAuthError("Please fill in all registration fields.");
          return;
        }
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role: authRole,
            preferred_language: authLang,
          }),
        });
        if (res.ok) {
          setAuthSuccess(
            lang === "fr"
              ? "Compte créé ! Vous pouvez vous connecter."
              : "Account registered! Please sign in.",
          );
          setIsLoginView(true);
          // Auto-fill registration email
          setEmail(email);
          setPassword("password");
        } else {
          const errData = await res.json();
          setAuthError(errData.error || "Registration failed.");
        }
      }
    } catch (err) {
      setAuthError("Connection error occurred.");
    }
  };
  // Quick Account Login Selector
  const handleQuickLogin = (role) => {
    setAuthError("");
    setIsLoginView(true);
    if (role === "admin") {
      setEmail("admin@school.edu");
    } else if (role === "student") {
      setEmail("student@school.edu");
    } else if (role === "principal") {
      setEmail("principal@school.edu");
    } else {
      setEmail("teacher@school.edu");
    }
    setPassword("password");
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("school_auth_token");
    setStudentApplication(null);
    setStudentCard(null);
    setEmail("");
    setPassword("");
    setAuthError("");
    setAuthSuccess("");
    setShowAuth(false);
    // Clear draft state fields to prevent data leakage between sessions
    setTargetClass("Grade 10-A");
    setLastSchoolName("");
    setLastGeneralGrade("");
    setParentFullName("");
    setParentPhone("");
    setParentPlaceOfLiving("");
    setTranscriptFile(null);
    setReceiptFile(null);
    setRecommendationFile(null);
    setWizardStep(1);
    setTeacherQualifications("");
    setTeacherExperience(0);
    setTeacherCurriculumNotes("");
    setAdminAuditLogs([]);
    setAuditSearchQuery("");
    setAuditActionFilter("ALL");
    // Reset draft loaded refs
    hasLoadedStudentDraftRef.current = null;
    hasLoadedTeacherDraftRef.current = null;
    showNotification("Logged out successfully.", "info");
  };
  // Student Application Wizard File Handling Simulators and Real File Handlers
  const handleFileUploadSim = (step, fileName) => {
    if (step === "transcript") setTranscriptFile(fileName);
    if (step === "receipt") setReceiptFile(fileName);
    if (step === "recLetter") setRecommendationFile(fileName);
    showNotification(`${fileName} loaded successfully!`, "success");
  };
  const handleRealFileChange = (category, file) => {
    if (!file) return;
    if (category === "transcript") setTranscriptFile(file.name);
    if (category === "receipt") setReceiptFile(file.name);
    if (category === "recLetter") setRecommendationFile(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      if (category === "transcript") setTranscriptBase64(reader.result);
      if (category === "receipt") setReceiptBase64(reader.result);
      if (category === "recLetter") setRecommendationBase64(reader.result);
    };
    reader.readAsDataURL(file);

    showNotification(
      lang === "fr"
        ? `Fichier "${file.name}" importé avec succès!`
        : `File "${file.name}" uploaded successfully!`,
      "success",
    );
  };
  // Convert uploaded student ID photo to Base64 for instant preview & PDF injection
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCroppingImage(reader.result);
        setOnCropComplete(() => (cropped) => {
          setIdPhoto(cropped);
          showNotification(
            lang === "fr"
              ? "Photo cadrée avec succès !"
              : "Photo framed and saved successfully!",
            "success",
          );
        });
      };
      reader.readAsDataURL(file);
    }
  };
  // Student application wizard submit
  const handleEnrollmentSubmit = async () => {
    if (!user) return;
    if (!lastSchoolName || !lastGeneralGrade) {
      showNotification(
        lang === "fr"
          ? "Veuillez remplir tous les critères."
          : "Please answer all questions before submitting.",
        "error",
      );
      return;
    }
    const gradeVal = parseFloat(lastGeneralGrade);
    if (isNaN(gradeVal) || gradeVal < 0 || gradeVal > 20) {
      showNotification(
        lang === "fr"
          ? "La note doit être comprise entre 0 et 20."
          : "General score must be a number from 0 to 20.",
        "error",
      );
      return;
    }
    if (!transcriptFile || !receiptFile || !recommendationFile) {
      showNotification(
        lang === "fr"
          ? "Tous les fichiers requis doivent être joints."
          : "All three required document categories must be uploaded.",
        "error",
      );
      return;
    }
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          target_class: targetClass,
          last_school_name: lastSchoolName,
          last_general_grade: gradeVal,
          parent_full_name: parentFullName,
          parent_phone: parentPhone,
          parent_place_of_living: parentPlaceOfLiving,
          transcript_file_name: transcriptFile,
          payment_receipt_name: receiptFile,
          recommendation_letter_name: recommendationFile,
          transcript_base64: transcriptBase64,
          payment_receipt_base64: receiptBase64,
          recommendation_letter_base64: recommendationBase64,
        }),
      });
      if (res.ok) {
        const app = await res.json();
        setStudentApplication(app);
        setTranscriptBase64(null);
        setReceiptBase64(null);
        setRecommendationBase64(null);
        setWizardStep(5);
        showNotification(
          getTranslation("applicationSubmittedSuccess", lang),
          "success",
        );
        // Clear locally stored wizard draft on successful submission
        localStorage.removeItem("enrollment_wizard_draft_" + user.id);
        fetchPortalData();
      } else {
        showNotification("Submission error", "error");
      }
    } catch (err) {
      showNotification("Submission failed", "error");
    }
  };
  // Student submit ID request
  const handleIdCardRequest = async () => {
    if (!user || !idPhoto) return;
    try {
      const res = await fetch("/api/id-cards/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          profile_photo_url: idPhoto,
        }),
      });
      if (res.ok) {
        const card = await res.json();
        setStudentCard(card);
        showNotification(
          lang === "fr"
            ? "Demande de carte envoyée !"
            : "ID Request submitted!",
          "success",
        );
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Request failed", "error");
    }
  };
  // Student save photo for generated/approved ID Card with no photo
  const handleSavePhotoForIDCard = async () => {
    if (!user || !idPhoto) return;
    if (!principalSignature) {
      showNotification(
        lang === "fr"
          ? "La signature du directeur n'a pas encore été configurée par l'administration."
          : "Principal signature must be added by the administration before ID card photo can be saved & activated.",
        "error",
      );
      return;
    }
    try {
      const res = await fetch("/api/id-cards/update-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: user.id,
          profile_photo_url: idPhoto,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setStudentCard(data.card);
        showNotification(
          lang === "fr"
            ? "Photo de profil enregistrée avec succès !"
            : "Profile photo successfully saved!",
          "success",
        );
        fetchPortalData();
      } else {
        showNotification("Failed to save photo", "error");
      }
    } catch (err) {
      showNotification("Save failed", "error");
    }
  };
  // Admin evaluate student admission
  const handleEvaluateApplication = async (status) => {
    if (!selectedApplication) return;
    if (status === "rejected" && !rejectionReason.trim()) {
      showNotification(getTranslation("rejectionRequired", lang), "error");
      return;
    }
    if (status === "approved" && !principalSignature) {
      showNotification(
        lang === "fr"
          ? "La signature du directeur est obligatoire pour approuver l'admission (génération de carte)."
          : "Principal signature must be added in Institution Overview before approving applications.",
        "error",
      );
      return;
    }
    try {
      const res = await fetch(
        `/api/applications/${selectedApplication.id}/evaluate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status,
            rejection_reason: status === "rejected" ? rejectionReason : null,
          }),
        },
      );
      if (res.ok) {
        const updated = await res.json();
        // Log the simulated alert in the client-side console visual logger
        const student = adminUsers.find(
          (u) => u.id === selectedApplication.student_id,
        );
        if (student) {
          const isFr = student.preferred_language === "fr";
          const logsSubject = isFr
            ? "Statut de votre Admission - Académie"
            : "Admissions Update - Saint Jude Academy";
          const logsBody = isFr
            ? `Cher ${student.first_name},\nVotre demande pour ${updated.target_class} a été ${status === "approved" ? "APPROUVÉE" : "REJETÉE"}.`
            : `Dear ${student.first_name},\nYour application for ${updated.target_class} has been ${status === "approved" ? "APPROVED" : "REJECTED"}.`;
          setEmailAlertLogs((prev) => [
            {
              id: Math.random().toString(),
              timestamp: new Date().toLocaleTimeString(),
              recipient: student.email,
              subject: logsSubject,
              body:
                status === "rejected"
                  ? `${logsBody}\n\nMotif : "${rejectionReason}"`
                  : logsBody,
            },
            ...prev,
          ]);
        }
        showNotification(
          lang === "fr"
            ? "Évaluation prise en compte ! Notification simulée."
            : "Evaluation updated! Localized email alert simulated.",
          "success",
        );
        setSelectedApplication(null);
        setRejectionReason("");
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Evaluation failed", "error");
    }
  };
  // Admin Approve ID card generation request
  const handleApproveIdCard = async (cardId) => {
    if (!principalSignature) {
      showNotification(
        lang === "fr"
          ? "La signature du directeur est obligatoire pour approuver/générer la carte d'identité."
          : "Principal signature must be added in Institution Overview before approving ID cards.",
        "error",
      );
      return;
    }
    try {
      const res = await fetch(`/api/id-cards/${cardId}/approve`, {
        method: "POST",
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Carte d'identité approuvée & PDF généré !"
            : "ID card approved and PDF generated!",
          "success",
        );
        fetchPortalData();
      }
    } catch (err) {
      showNotification("ID Approval failed", "error");
    }
  };
  // Admin Open Edit Card Modal
  const handleOpenEditCard = (card) => {
    const studentUser = adminUsers.find((u) => u.id === card.student_id);
    const studentApp = adminApplications.find(
      (a) => a.student_id === card.student_id,
    );
    setEditingCard(card);
    setFormCardFirst(studentUser?.first_name || "");
    setFormCardLast(studentUser?.last_name || "");
    setFormCardClass(studentApp?.target_class || "Grade 10-A");
    setFormCardPhoto(card.profile_photo_url || "");
    setFormCardStatus(card.card_status);
    setFormCardValidUntil(card.valid_until || "");
    setShowCardModal(true);
  };
  // Admin Save Edit Card Changes
  const handleSaveEditCard = async (e) => {
    e.preventDefault();
    if (!editingCard) return;
    if (formCardStatus === "generated" && !principalSignature) {
      showNotification(
        lang === "fr"
          ? "La signature du directeur est obligatoire pour générer/activer la carte d'identité."
          : "Principal signature must be added in Institution Overview before generating/activating ID cards.",
        "error",
      );
      return;
    }
    try {
      const res = await fetch(`/api/id-cards/${editingCard.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formCardFirst,
          last_name: formCardLast,
          target_class: formCardClass,
          profile_photo_url: formCardPhoto,
          card_status: formCardStatus,
          valid_until: formCardValidUntil,
        }),
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Carte d'étudiant mise à jour avec succès !"
            : "Student card updated successfully!",
          "success",
        );
        setShowCardModal(false);
        setEditingCard(null);
        fetchPortalData();
      } else {
        showNotification("Failed to update student card", "error");
      }
    } catch (err) {
      showNotification("Error saving card changes", "error");
    }
  };
  // Admin Card Modal Photo Upload
  const handleCardPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCroppingImage(reader.result);
        setOnCropComplete(() => (cropped) => {
          setFormCardPhoto(cropped);
          showNotification(
            lang === "fr"
              ? "Photo cadrée avec succès !"
              : "Photo framed and saved successfully!",
            "success",
          );
        });
      };
      reader.readAsDataURL(file);
    }
  };
  // Admin Update School Information
  const handleSaveSchoolInfo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/school-info", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formSchoolName,
          logo_url: formSchoolLogo,
          history: formSchoolHistory,
          references: formSchoolReferences,
          contact_email: formSchoolEmail,
          contact_phone: formSchoolPhone,
          contact_address: formSchoolAddress,
          geolocation_lat: Number(formSchoolLat),
          geolocation_lng: Number(formSchoolLng),
          map_iframe_url: formSchoolMapIframe,
          motto: formSchoolMotto,
          established_year: Number(formSchoolEstablished),
          principal_name: formSchoolPrincipal,
          website_url: formSchoolWebsite,
          color_theme: formSchoolColor,
          requester_id: user?.id,
        }),
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Informations sur l'école mises à jour !"
            : "School information updated successfully!",
          "success",
        );
        setIsEditingSchoolInfo(false);
        fetchPortalData();
      } else {
        showNotification("Failed to update school information", "error");
      }
    } catch (err) {
      showNotification("Error saving school information", "error");
    }
  };
  const handleSaveSignature = async (base64Data) => {
    try {
      const res = await fetch("/api/principal/signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ signature: base64Data, requester_id: user?.id }),
      });
      if (res.ok) {
        setPrincipalSignature(base64Data);
        showNotification(
          lang === "fr"
            ? "Signature enregistrée avec succès !"
            : "Signature saved successfully!",
          "success",
        );
      } else {
        showNotification(
          lang === "fr"
            ? "Erreur lors de l'enregistrement."
            : "Failed to save signature.",
          "error",
        );
      }
    } catch (err) {
      console.error(err);
      showNotification(
        lang === "fr"
          ? "Erreur de connexion."
          : "Network error saving signature.",
        "error",
      );
    }
  };
  const handleSchoolLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormSchoolLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleExportCSV = () => {
    if (displayStudents.length === 0) {
      showNotification(
        lang === "fr"
          ? "Aucune donnée à exporter."
          : "No student records to export.",
        "info",
      );
      return;
    }
    // CSV Headers
    const headers = [
      lang === "fr" ? "ID Étudiant" : "Student ID",
      lang === "fr" ? "Prénom" : "First Name",
      lang === "fr" ? "Nom" : "Last Name",
      lang === "fr" ? "Email" : "Email",
      lang === "fr" ? "Langue Préférée" : "Preferred Language",
      lang === "fr" ? "Classe Assignée" : "Assigned Class",
      lang === "fr" ? "École Précédente" : "Previous School",
      lang === "fr" ? "Moyenne / Note" : "GPA / Grade",
      lang === "fr" ? "Statut" : "Status",
      lang === "fr" ? "Date d'Inscription" : "Registration Date",
    ];
    // Map rows
    const rows = displayStudents.map((s) => {
      const regDate = s.created_at
        ? new Date(s.created_at).toLocaleDateString(
            lang === "fr" ? "fr-FR" : "en-US",
          )
        : "N/A";
      return [
        s.id || "",
        s.first_name || "",
        s.last_name || "",
        s.email || "",
        s.preferred_language || "en",
        s.target_class || "Not Allocated",
        s.last_school_name || "Saint Jude Academy",
        s.last_general_grade != null ? String(s.last_general_grade) : "0",
        s.status || "approved",
        regDate,
      ];
    });
    // Helper to escape values for CSV
    const escapeCSVValue = (val) => {
      const stringified = String(val);
      if (
        stringified.includes(",") ||
        stringified.includes('"') ||
        stringified.includes("\n") ||
        stringified.includes("\r")
      ) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };
    // Combine headers and rows
    const csvContent =
      "\uFEFF" +
      [
        headers.map(escapeCSVValue).join(","),
        ...rows.map((row) => row.map(escapeCSVValue).join(",")),
      ].join("\n");
    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const formattedDate = new Date().toISOString().split("T")[0];
    const filename = `student_directory_${formattedDate}.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(
      lang === "fr" ? "Export CSV réussi !" : "CSV Export successful!",
      "success",
    );
  };
  const handleExportTeachersCSV = () => {
    if (displayTeachers.length === 0) {
      showNotification(
        lang === "fr"
          ? "Aucun enseignant à exporter."
          : "No teacher records to export.",
        "info",
      );
      return;
    }
    const headers = [
      lang === "fr" ? "ID Enseignant" : "Teacher ID",
      lang === "fr" ? "Prénom" : "First Name",
      lang === "fr" ? "Nom" : "Last Name",
      lang === "fr" ? "Email" : "Email",
      lang === "fr" ? "Langue" : "Language",
      lang === "fr" ? "Qualifications" : "Qualifications",
      lang === "fr" ? "Expérience (années)" : "Experience (years)",
      lang === "fr" ? "Classes Assignées" : "Assigned Classes",
      lang === "fr" ? "Matières Assignées" : "Assigned Courses",
      lang === "fr" ? "Notes de Programme" : "Curriculum Notes",
    ];

    const rows = displayTeachers.map((t) => [
      t.id || "",
      t.first_name || "",
      t.last_name || "",
      t.email || "",
      t.preferred_language || "en",
      t.qualifications || "",
      t.experience_years != null ? String(t.experience_years) : "0",
      t.assigned_classes ? t.assigned_classes.join("; ") : "",
      t.assigned_courses ? t.assigned_courses.join("; ") : "",
      t.curriculum_notes || "",
    ]);

    const escapeCSVValue = (val) => {
      const stringified = String(val);
      if (
        stringified.includes(",") ||
        stringified.includes('"') ||
        stringified.includes("\n") ||
        stringified.includes("\r")
      ) {
        return `"${stringified.replace(/"/g, '""')}"`;
      }
      return stringified;
    };

    const csvContent =
      "\uFEFF" +
      [
        headers.map(escapeCSVValue).join(","),
        ...rows.map((row) => row.map(escapeCSVValue).join(",")),
      ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const formattedDate = new Date().toISOString().split("T")[0];
    const filename = `teacher_directory_${formattedDate}.csv`;
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification(
      lang === "fr" ? "Export CSV réussi !" : "CSV Export successful!",
      "success",
    );
  };
  // Teacher self-updates qualifications (Onboarding panel)
  const handleTeacherOnboardingSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await fetch(`/api/teachers/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qualifications: teacherQualifications,
          experience_years: Number(teacherExperience),
          curriculum_notes: teacherCurriculumNotes,
        }),
      });
      if (res.ok) {
        const profile = await res.json();
        setTeacherProfile(profile);
        showNotification(
          getTranslation("teacherOnboardingSuccess", lang),
          "success",
        );
        // Clear locally stored teacher profile draft on successful submission
        localStorage.removeItem("teacher_profile_draft_" + user.id);
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Failed to update credentials.", "error");
    }
  };
  // Admin save/edit teacher details & schedule allocations (CRUD)
  const handleAdminSaveTeacher = async (e) => {
    e.preventDefault();
    if (!formTeacherFirst || !formTeacherLast || !formTeacherEmail) {
      showNotification("Please fill required teacher details", "error");
      return;
    }
    const payload = {
      first_name: formTeacherFirst,
      last_name: formTeacherLast,
      email: formTeacherEmail,
      qualifications: formTeacherQual,
      experience_years: formTeacherExp,
      curriculum_notes: formTeacherNotes,
      assigned_classes: formTeacherClasses,
      assigned_courses: formTeacherCourses,
    };
    try {
      let res;
      if (editingTeacherId) {
        // UPDATE
        res = await fetch(`/api/teachers/${editingTeacherId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // CREATE NEW
        res = await fetch("/api/teachers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      if (res.ok) {
        showNotification(
          editingTeacherId
            ? lang === "fr"
              ? "Enseignant mis à jour avec succès !"
              : "Teacher record updated successfully!"
            : lang === "fr"
              ? "Nouvel enseignant créé avec succès !"
              : "New teacher record registered successfully!",
          "success",
        );
        setShowTeacherModal(false);
        resetTeacherForm();
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Operation failed", "error");
    }
  };
  const handleEditTeacherClick = (teacher) => {
    setEditingTeacherId(teacher.id);
    setFormTeacherFirst(teacher.first_name);
    setFormTeacherLast(teacher.last_name);
    setFormTeacherEmail(teacher.email);
    setFormTeacherQual(teacher.qualifications || "");
    setFormTeacherExp(teacher.experience_years || 0);
    setFormTeacherNotes(teacher.curriculum_notes || "");
    setFormTeacherClasses(teacher.assigned_classes || []);
    setFormTeacherCourses(teacher.assigned_courses || []);
    setShowTeacherModal(true);
  };
  const handleDeleteTeacherClick = async (id) => {
    if (!window.confirm(getTranslation("deleteTeacherConfirm", lang))) {
      return;
    }
    try {
      const res = await fetch(`/api/teachers/${id}?requester_id=${user?.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Enseignant retiré de l'annuaire."
            : "Teacher record successfully de-allocated.",
          "info",
        );
        fetchPortalData();
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Delete failed", "error");
      }
    } catch (err) {
      showNotification("Delete failed", "error");
    }
  };
  const handleDeleteStudentClick = async (studentId) => {
    if (
      !window.confirm(
        lang === "fr"
          ? "Êtes-vous sûr de vouloir supprimer définitivement le profil de cet étudiant ainsi que sa carte ?"
          : "Are you sure you want to permanently delete this student profile and their ID card?",
      )
    ) {
      return;
    }
    try {
      const res = await fetch(
        `/api/students/${studentId}?requester_id=${user?.id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Profil de l'étudiant supprimé."
            : "Student profile successfully deleted.",
          "info",
        );
        setSelectedStudentIds((prev) => prev.filter((id) => id !== studentId));
        fetchPortalData();
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Delete failed", "error");
      }
    } catch (err) {
      showNotification("Delete failed", "error");
    }
  };
  const handleBulkDelete = async () => {
    if (selectedStudentIds.length === 0) return;
    if (
      !window.confirm(
        lang === "fr"
          ? `Êtes-vous sûr de vouloir supprimer définitivement les profils de ces ${selectedStudentIds.length} étudiants ?`
          : `Are you sure you want to permanently delete these ${selectedStudentIds.length} selected student profiles?`,
      )
    ) {
      return;
    }
    try {
      let successCount = 0;
      for (const studentId of selectedStudentIds) {
        const res = await fetch(
          `/api/students/${studentId}?requester_id=${user?.id}`,
          {
            method: "DELETE",
          },
        );
        if (res.ok) {
          successCount++;
        }
      }
      showNotification(
        lang === "fr"
          ? `${successCount} profils supprimés avec succès.`
          : `${successCount} student profiles successfully deleted.`,
        "info",
      );
      if (successCount > 0) {
        try {
          await fetch("/api/audit-logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requester_id: user?.id,
              action: "BULK_DELETION",
              details: `Bulk deleted ${successCount} student profiles.`,
            }),
          });
        } catch (e) {
          console.error("Failed to post audit log for bulk deletion", e);
        }
      }
      setSelectedStudentIds([]);
      fetchPortalData();
    } catch (err) {
      showNotification("Bulk delete failed", "error");
    }
  };
  const handleBulkApprove = async () => {
    if (selectedStudentIds.length === 0) return;
    if (!principalSignature) {
      showNotification(
        lang === "fr"
          ? "La signature du directeur est obligatoire pour approuver les admissions."
          : "Principal signature must be added in Institution Overview before bulk approving.",
        "error",
      );
      return;
    }
    try {
      let appsApproved = 0;
      let cardsApproved = 0;
      for (const studentId of selectedStudentIds) {
        // Find any pending applications for this student
        const app = adminApplications.find(
          (a) => a.student_id === studentId && a.status === "pending",
        );
        if (app) {
          const res = await fetch(`/api/applications/${app.id}/evaluate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              status: "approved",
              rejection_reason: null,
            }),
          });
          if (res.ok) {
            appsApproved++;
          }
        }
        // Find any non-approved ID card request for this student
        const card = adminIdCards.find(
          (c) => c.student_id === studentId && c.card_status !== "generated",
        );
        if (card) {
          const res = await fetch(`/api/id-cards/${card.id}/approve`, {
            method: "POST",
          });
          if (res.ok) {
            cardsApproved++;
          }
        } else {
          // If no ID card exists, request/create one!
          const res = await fetch("/api/id-cards/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              student_id: studentId,
              profile_photo_url: null,
            }),
          });
          if (res.ok) {
            const cardData = await res.json();
            // Automatically approve the newly created card
            await fetch(`/api/id-cards/${cardData.id}/approve`, {
              method: "POST",
            });
            cardsApproved++;
          }
        }
      }
      showNotification(
        lang === "fr"
          ? `Admissions et cartes approuvées pour les étudiants sélectionnés.`
          : `Successfully approved admissions & ID cards for selected students.`,
        "success",
      );
      if (appsApproved > 0 || cardsApproved > 0) {
        try {
          await fetch("/api/audit-logs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              requester_id: user?.id,
              action: "BULK_APPROVAL",
              details: `Bulk approved admissions for ${appsApproved} applications and generated ${cardsApproved} ID cards.`,
            }),
          });
        } catch (e) {
          console.error("Failed to post audit log for bulk approval", e);
        }
      }
      setSelectedStudentIds([]);
      fetchPortalData();
    } catch (err) {
      showNotification("Bulk approval failed", "error");
    }
  };
  const handleBulkExport = () => {
    if (selectedStudentIds.length === 0) return;
    // Filter out student details for selection
    const exportData = adminStudents.filter((student) =>
      selectedStudentIds.includes(student.id),
    );
    // Prepare CSV Content
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Preferred Language",
      "Class",
      "Previous School",
      "GPA/Grade",
    ];
    const rows = exportData.map((s) => [
      s.id,
      s.first_name || "",
      s.last_name || "",
      s.email || "",
      s.preferred_language || "",
      s.target_class || "",
      s.last_school_name || "",
      s.last_general_grade ?? "",
    ]);
    // Add UTF-8 BOM so Excel opens it with correct encoding (French accents)
    const csvContent =
      "\uFEFF" +
      [
        headers.join(","),
        ...rows.map((e) =>
          e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","),
        ),
      ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `student_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification(
      lang === "fr" ? "Exportation CSV réussie !" : "CSV Export successful!",
      "success",
    );
  };
  const handleBatchPdfDownload = async () => {
    // Collect all valid "generated" ID cards currently in view
    const visibleCards = adminIdCards.filter((c) =>
      adminCardFilterTab === "pending" ? c.card_status === "pending" : true,
    );
    const generatedCards = visibleCards.filter(
      (c) => c.card_status === "generated",
    );
    if (generatedCards.length === 0) {
      showNotification(
        lang === "fr"
          ? "Aucune carte d'étudiant générée n'est disponible pour l'impression dans la vue actuelle."
          : "No generated student ID cards available to print in the current view.",
        "error",
      );
      return;
    }
    const studentIds = generatedCards.map((c) => c.student_id);
    try {
      const res = await fetch(`/api/id-cards/batch-download?lang=${lang}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student_ids: studentIds }),
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `Batch_Student_ID_Cards_${new Date().toISOString().split("T")[0]}.pdf`,
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showNotification(
          lang === "fr"
            ? `PDF généré avec succès pour ${studentIds.length} carte(s).`
            : `Batch PDF successfully generated for ${studentIds.length} card(s).`,
          "success",
        );
      } else {
        const text = await res.text();
        showNotification(text || "Batch download failed.", "error");
      }
    } catch (err) {
      console.error(err);
      showNotification("Batch PDF download failed.", "error");
    }
  };
  const handleProfileUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          first_name: profileFirstName,
          last_name: profileLastName,
          preferred_language: profileLang,
          parent_full_name: profileParentName,
          parent_phone: profileParentPhone,
          parent_place_of_living: profileParentLiving,
        }),
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setLang(profileLang);
        showNotification(
          profileLang === "fr"
            ? "Profil mis à jour avec succès !"
            : "Profile updated successfully!",
          "success",
        );
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Update failed", "error");
      }
    } catch (err) {
      showNotification("Update failed", "error");
    }
  };
  // Class Management Action Handlers
  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!formClassName || !formClassCapacity) {
      showNotification(
        lang === "fr"
          ? "Veuillez entrer un nom et une capacité."
          : "Class name and capacity are required.",
        "error",
      );
      return;
    }
    try {
      const url = editingClassId
        ? `/api/classes/${editingClassId}`
        : "/api/classes";
      const method = editingClassId ? "PUT" : "POST";
      const body = {
        name: formClassName,
        capacity: Number(formClassCapacity),
        subjects: formClassSubjects,
        teachers: formClassTeachers,
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showNotification(
          editingClassId
            ? lang === "fr"
              ? "Classe modifiée avec succès."
              : "Class updated successfully."
            : lang === "fr"
              ? "Classe ajoutée avec succès."
              : "Class created successfully.",
          "success",
        );
        setShowClassModal(false);
        setEditingClassId(null);
        setFormClassName("");
        setFormClassCapacity(30);
        setFormClassTeachers([]);
        setFormClassSubjects([]);
        setAssignTeacherId("");
        setAssignTopic("");
        setAssignDayOfWeek("");
        setAssignTimeSlot("");
        fetchPortalData();
      } else {
        showNotification("Operation failed", "error");
      }
    } catch (err) {
      showNotification("Failed to save class", "error");
    }
  };
  const handleDeleteClass = async (id) => {
    if (
      !window.confirm(
        lang === "fr"
          ? "Voulez-vous vraiment supprimer cette classe ?"
          : "Are you sure you want to remove this class?",
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/classes/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showNotification(
          lang === "fr" ? "Classe supprimée." : "Class successfully removed.",
          "info",
        );
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Delete failed", "error");
    }
  };

  const handleSavePrincipal = async (e) => {
    e.preventDefault();
    if (!formPrincipalUser || !formPrincipalYear) {
      showNotification(
        lang === "fr"
          ? "Veuillez remplir tous les champs obligatoires."
          : "All fields are required.",
        "error",
      );
      return;
    }
    try {
      const url = editingPrincipalId
        ? `/api/admin/principals/${editingPrincipalId}`
        : "/api/admin/principals";
      const method = editingPrincipalId ? "PUT" : "POST";
      const body = {
        requester_id: user?.id,
        principal: formPrincipalUser,
        year: formPrincipalYear,
        is_current: formPrincipalIsCurrent,
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showNotification(
          editingPrincipalId
            ? lang === "fr"
              ? "Principal mis à jour avec succès."
              : "Principal updated successfully."
            : lang === "fr"
              ? "Principal ajouté avec succès."
              : "Principal added successfully.",
          "success",
        );
        setShowPrincipalModal(false);
        setEditingPrincipalId(null);
        setFormPrincipalUser("");
        setFormPrincipalFirst("");
        setFormPrincipalLast("");
        setFormPrincipalYear("");
        setFormPrincipalIsCurrent(false);
        fetchPortalData();
      } else {
        showNotification("Operation failed", "error");
      }
    } catch (err) {
      showNotification("Failed to save principal", "error");
    }
  };

  const handleDeletePrincipal = async (id) => {
    if (
      !window.confirm(
        lang === "fr"
          ? "Voulez-vous vraiment supprimer ce principal ?"
          : "Are you sure you want to remove this principal?",
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/principals/${id}?requester_id=${user?.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showNotification(
          lang === "fr" ? "Principal supprimé." : "Principal successfully removed.",
          "info",
        );
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Delete failed", "error");
    }
  };

  const handleSetCurrentPrincipal = async (principalRec) => {
    try {
      const res = await fetch(`/api/admin/principals/${principalRec.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requester_id: user?.id,
          principal: principalRec.principal,
          first_name: principalRec.first_name,
          last_name: principalRec.last_name,
          year: principalRec.year,
          is_current: true,
        }),
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Principal actuel mis à jour."
            : "Active principal successfully updated.",
          "success",
        );
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Failed to update active principal", "error");
    }
  };

  const handleRemoveTeacherAssignmentFromClass = async (
    classId,
    teacherId,
    topic,
  ) => {
    if (
      !window.confirm(
        lang === "fr"
          ? "Voulez-vous vraiment retirer cet enseignant de cette classe ?"
          : "Are you sure you want to remove this teacher assignment?",
      )
    ) {
      return;
    }
    const cls = classesList.find((c) => c.id === classId);
    if (!cls) return;
    const updatedTeachers = (cls.teachers || []).filter(
      (t) => !(t.teacher_id === teacherId && t.topic === topic),
    );
    try {
      const res = await fetch(`/api/classes/${classId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teachers: updatedTeachers }),
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Affectation retirée."
            : "Teacher assignment successfully removed.",
          "info",
        );
        fetchPortalData();
      }
    } catch (err) {
      showNotification("Operation failed", "error");
    }
  };
  const handleAdminSaveAdmin = async (e) => {
    e.preventDefault();
    if (
      !formAdminFirst ||
      !formAdminLast ||
      !formAdminEmail ||
      !formAdminPassword
    ) {
      showNotification(
        lang === "fr"
          ? "Veuillez remplir tous les champs."
          : "Please fill all required fields.",
        "error",
      );
      return;
    }
    const payload = {
      first_name: formAdminFirst,
      last_name: formAdminLast,
      email: formAdminEmail,
      password: formAdminPassword,
      preferred_language: formAdminLang,
    };
    try {
      const res = await fetch("/api/admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Nouvel administrateur enregistré !"
            : "New administrator registered successfully!",
          "success",
        );
        setShowAdminModal(false);
        // Reset form
        setFormAdminFirst("");
        setFormAdminLast("");
        setFormAdminEmail("");
        setFormAdminPassword("");
        setFormAdminLang("en");
        fetchPortalData();
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Operation failed", "error");
      }
    } catch (err) {
      showNotification("Operation failed", "error");
    }
  };
  const handleAdminDeleteAdmin = async (id) => {
    if (id === user?.id) {
      showNotification(
        lang === "fr"
          ? "Vous ne pouvez pas vous supprimer vous-même !"
          : "You cannot remove your own administrator account!",
        "error",
      );
      return;
    }
    if (
      !window.confirm(
        lang === "fr"
          ? "Êtes-vous sûr de vouloir supprimer cet administrateur ?"
          : "Are you sure you want to remove this administrator?",
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/admins/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        showNotification(
          lang === "fr"
            ? "Administrateur supprimé avec succès."
            : "Administrator removed successfully.",
          "info",
        );
        fetchPortalData();
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Operation failed", "error");
      }
    } catch (err) {
      showNotification("Delete failed", "error");
    }
  };
  const resetTeacherForm = () => {
    setEditingTeacherId(null);
    setFormTeacherFirst("");
    setFormTeacherLast("");
    setFormTeacherEmail("");
    setFormTeacherQual("");
    setFormTeacherExp(0);
    setFormTeacherNotes("");
    setFormTeacherClasses([]);
    setFormTeacherCourses([]);
  };
  const resetStudentForm = () => {
    setEditingStudentId(null);
    setFormStudentFirst("");
    setFormStudentLast("");
    setFormStudentEmail("");
    setFormStudentClass("Grade 10-A");
    setFormStudentSchool("");
    setFormStudentGrade("15.0");
    setFormStudentLang("en");
    setFormStudentParentName("");
    setFormStudentParentPhone("");
    setFormStudentParentLiving("");
  };
  const handleEditStudentClick = (student) => {
    setEditingStudentId(student.id);
    setFormStudentFirst(student.first_name);
    setFormStudentLast(student.last_name);
    setFormStudentEmail(student.email);
    setFormStudentClass(student.target_class || "Grade 10-A");
    setFormStudentSchool(student.last_school_name || "");
    setFormStudentGrade((student.last_general_grade ?? 15.0).toString());
    setFormStudentLang(student.preferred_language || "en");
    setFormStudentParentName(student.parent_full_name || "");
    setFormStudentParentPhone(student.parent_phone || "");
    setFormStudentParentLiving(student.parent_place_of_living || "");
    setShowStudentModal(true);
  };
  const handleSaveStudent = async (e) => {
    e.preventDefault();
    if (!formStudentFirst || !formStudentLast || !formStudentEmail) {
      showNotification(
        lang === "fr"
          ? "Le prénom, le nom et l'adresse e-mail sont obligatoires."
          : "First name, last name, and email are required.",
        "error",
      );
      return;
    }
    try {
      const url = editingStudentId
        ? `/api/students/${editingStudentId}`
        : "/api/students";
      const method = editingStudentId ? "PUT" : "POST";
      const body = {
        first_name: formStudentFirst,
        last_name: formStudentLast,
        email: formStudentEmail,
        target_class: formStudentClass,
        last_school_name: formStudentSchool,
        last_general_grade: Number(formStudentGrade) || 15.0,
        preferred_language: formStudentLang,
        parent_full_name: formStudentParentName,
        parent_phone: formStudentParentPhone,
        parent_place_of_living: formStudentParentLiving,
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        showNotification(
          editingStudentId
            ? lang === "fr"
              ? "Étudiant mis à jour avec succès."
              : "Student updated successfully."
            : lang === "fr"
              ? "Étudiant créé avec succès."
              : "Student created successfully.",
          "success",
        );
        setShowStudentModal(false);
        resetStudentForm();
        fetchPortalData();
      } else {
        const errData = await res.json();
        showNotification(errData.error || "Operation failed", "error");
      }
    } catch (err) {
      showNotification("Operation failed", "error");
    }
  };
  const toggleFormClass = (cName) => {
    setFormTeacherClasses((prev) =>
      prev.includes(cName) ? prev.filter((c) => c !== cName) : [...prev, cName],
    );
  };
  const toggleFormCourse = (crsName) => {
    setFormTeacherCourses((prev) =>
      prev.includes(crsName)
        ? prev.filter((c) => c !== crsName)
        : [...prev, crsName],
    );
  };
  const handleStudentSortChange = (val) => {
    const [field, order] = val.split("-");
    setStudentSortField(field);
    setStudentSortOrder(order);
  };
  const handleTeacherSortChange = (val) => {
    const [field, order] = val.split("-");
    setTeacherSortField(field);
    setTeacherSortOrder(order);
  };
  const handleAnalyzeStudent = async (student) => {
    try {
      setLoadingAiAnalysis(student.id);
      const res = await fetch("/api/gemini/analyze-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: student.first_name,
          last_name: student.last_name,
          target_class: student.target_class,
          last_school_name: student.last_school_name,
          last_general_grade: student.last_general_grade,
          lang,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch AI analysis.");
      }
      const data = await res.json();
      setSelectedStudentAiProfile({
        student,
        analysis: data,
      });
    } catch (err) {
      console.error(err);
      showNotification(
        lang === "fr"
          ? "Erreur lors de l'analyse IA."
          : "Error generating AI analysis.",
        "error",
      );
    } finally {
      setLoadingAiAnalysis(null);
    }
  };
  const handleAnalyzeTeacher = async (teacher) => {
    try {
      setLoadingAiAnalysis(teacher.id);
      const res = await fetch("/api/gemini/analyze-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          qualifications: teacher.qualifications,
          experience_years: teacher.experience_years,
          curriculum_notes: teacher.curriculum_notes,
          lang,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to fetch AI matching analysis.");
      }
      const data = await res.json();
      setSelectedTeacherAiProfile({
        teacher,
        analysis: data,
      });
    } catch (err) {
      console.error(err);
      showNotification(
        lang === "fr"
          ? "Erreur lors de l'analyse de correspondance IA."
          : "Error generating AI matching analysis.",
        "error",
      );
    } finally {
      setLoadingAiAnalysis(null);
    }
  };
  // Helper mapping helper names for files
  const getStudentName = (studentId) => {
    const s = adminUsers.find((u) => u.id === studentId);
    if (s) return `${s.first_name} ${s.last_name}`;
    // Fallback based on preseeded
    if (studentId === "usr_student1") return "Ibrahim Sawadogo";
    if (studentId === "usr_student2") return "Adama Kaboré";
    if (studentId === "usr_student3") return "Mariam Diallo";
    if (studentId === "usr_student4") return "Fatoumata Traoré";
    return studentId;
  };
  // Computed filter logic
  const filteredStudents = adminStudents.filter((student) => {
    const q = studentSearchQuery.toLowerCase().trim();
    const nameMatch = `${student.first_name || ""} ${student.last_name || ""}`
      .toLowerCase()
      .includes(q);
    const emailMatch = (student.email || "").toLowerCase().includes(q);
    const classMatch = (student.target_class || "").toLowerCase().includes(q);
    const idMatch = (student.id || "").toLowerCase().includes(q);
    const matchesSearch =
      !q || nameMatch || emailMatch || classMatch || idMatch;
    const matchesClass =
      studentClassFilter === "All" ||
      student.target_class === studentClassFilter;
    return matchesSearch && matchesClass;
  });
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (studentSortField === "name") {
      const nameA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
      const nameB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase();
      return studentSortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    if (studentSortField === "date") {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return studentSortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    if (studentSortField === "grade") {
      const gradeA = Number(a.last_general_grade) || 0;
      const gradeB = Number(b.last_general_grade) || 0;
      return studentSortOrder === "asc" ? gradeA - gradeB : gradeB - gradeA;
    }
    return 0;
  });
  const filteredAuditLogs = adminAuditLogs.filter((log) => {
    const q = auditSearchQuery.toLowerCase().trim();
    const searchMatch =
      !q ||
      (log.user_email || "").toLowerCase().includes(q) ||
      (log.details || "").toLowerCase().includes(q) ||
      (log.action || "").toLowerCase().includes(q);
    const actionMatch =
      auditActionFilter === "ALL" || log.action === auditActionFilter;
    return searchMatch && actionMatch;
  });
  const filteredTeachers = adminTeachers.filter((teach) => {
    const q = teacherSearchQuery.toLowerCase().trim();
    const nameMatch = `${teach.first_name || ""} ${teach.last_name || ""}`
      .toLowerCase()
      .includes(q);
    const emailMatch = (teach.email || "").toLowerCase().includes(q);
    const classMatch = Array.isArray(teach.assigned_classes)
      ? teach.assigned_classes.some((c) => c.toLowerCase().includes(q))
      : false;
    const courseMatch = Array.isArray(teach.assigned_courses)
      ? teach.assigned_courses.some((c) => c.toLowerCase().includes(q))
      : false;
    const idMatch = (teach.id || "").toLowerCase().includes(q);
    const matchesSearch =
      !q || nameMatch || emailMatch || classMatch || courseMatch || idMatch;
    const matchesClass =
      teacherClassFilter === "All" ||
      (Array.isArray(teach.assigned_classes) &&
        teach.assigned_classes.includes(teacherClassFilter));
    return matchesSearch && matchesClass;
  });
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (teacherSortField === "name") {
      const nameA = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
      const nameB = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase();
      return teacherSortOrder === "asc"
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
    if (teacherSortField === "date") {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return teacherSortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    if (teacherSortField === "experience") {
      const expA = Number(a.experience_years) || 0;
      const expB = Number(b.experience_years) || 0;
      return teacherSortOrder === "asc" ? expA - expB : expB - expA;
    }
    return 0;
  });
  const displayStudents = sortedStudents;
  const displayTeachers = sortedTeachers;
  // Command palette search matching
  const getFilteredCommandPaletteItems = () => {
    const q = commandPaletteQuery.toLowerCase().trim();
    const actions = [
      {
        type: "action",
        id: "go_overview",
        label:
          lang === "fr" ? "Aller à l'Aperçu" : "Go to Institution Overview",
        description: "Navigate to school stats & settings",
        icon: School,
        action: () => {
          setActiveSidebarTab("overview");
          setShowCommandPalette(false);
        },
      },
      {
        type: "action",
        id: "go_admissions",
        label: lang === "fr" ? "Aller aux Sélections" : "Go to Screening Queue",
        description: "Review student applications",
        icon: FileText,
        action: () => {
          setActiveSidebarTab("admissions");
          setShowCommandPalette(false);
        },
      },
      {
        type: "action",
        id: "go_id_cards",
        label:
          lang === "fr"
            ? "Aller aux Cartes d'identité"
            : "Go to Student ID Cards",
        description: "Manage & print student id cards",
        icon: UserIcon,
        action: () => {
          setActiveSidebarTab("id_cards");
          setShowCommandPalette(false);
        },
      },
      {
        type: "action",
        id: "go_classes",
        label:
          lang === "fr"
            ? "Aller à la Gestion des Classes"
            : "Go to Classes & Sections",
        description: "Schedule subjects & assign teachers",
        icon: BookOpen,
        action: () => {
          setActiveSidebarTab("classes");
          setShowCommandPalette(false);
        },
      },
      {
        type: "action",
        id: "add_student",
        label: lang === "fr" ? "Ajouter un Étudiant" : "Add New Student Record",
        description: "Register a new administrative student profile",
        icon: Plus,
        action: () => {
          setShowStudentModal(true);
          setShowCommandPalette(false);
        },
      },
      {
        type: "action",
        id: "add_teacher",
        label:
          lang === "fr" ? "Ajouter un Enseignant" : "Add New Teacher Profile",
        description: "Onboard a new faculty member",
        icon: Plus,
        action: () => {
          setShowTeacherModal(true);
          setShowCommandPalette(false);
        },
      },
      {
        type: "action",
        id: "add_class",
        label: lang === "fr" ? "Ajouter une Classe" : "Add New Class Section",
        description: "Create a new course cohort",
        icon: Plus,
        action: () => {
          setShowClassModal(true);
          setShowCommandPalette(false);
        },
      },
    ];
    if (!q) {
      return actions;
    }
    const items = [];
    // Search students (applicants and approved)
    adminApplications.forEach((app) => {
      const fullName =
        `${app.first_name || ""} ${app.last_name || ""}`.toLowerCase();
      if (fullName.includes(q) || (app.email || "").toLowerCase().includes(q)) {
        items.push({
          type: "student",
          id: app.id,
          label: `${app.first_name} ${app.last_name}`,
          description:
            app.status === "approved"
              ? `Approved Student • ${app.email || ""}`
              : `Applicant Profile • ${app.email || ""}`,
          icon: GraduationCap,
          action: () => {
            if (app.status === "approved") {
              handleEditStudentClick(app);
            } else {
              setSelectedApplication(app);
              setActiveSidebarTab("admissions");
            }
            setShowCommandPalette(false);
          },
        });
      }
    });
    // Search teachers
    adminTeachers.forEach((t) => {
      const fullName =
        `${t.first_name || ""} ${t.last_name || ""}`.toLowerCase();
      if (fullName.includes(q) || (t.email || "").toLowerCase().includes(q)) {
        items.push({
          type: "teacher",
          id: t.id,
          label: `${t.first_name} ${t.last_name}`,
          description: `Teacher Faculty • ${t.email || ""}`,
          icon: BookOpen,
          action: () => {
            handleEditTeacherClick(t);
            setShowCommandPalette(false);
          },
        });
      }
    });
    // Match actions
    actions.forEach((act) => {
      if (
        act.label.toLowerCase().includes(q) ||
        act.description.toLowerCase().includes(q)
      ) {
        items.push(act);
      }
    });
    return items.slice(0, 8); // Top 8 matches
  };
  // --- SUB-COMPONENTS & LAYOUTS ---
  return {
    resetStudentForm,
    resetTeacherForm,
    fetchPortalData,
    toggleLanguage,
    handleAuthSubmit,
    handleQuickLogin,
    handleLogout,
    handleFileUploadSim,
    handleRealFileChange,
    handlePhotoUpload,
    handleEnrollmentSubmit,
    handleIdCardRequest,
    handleSavePhotoForIDCard,
    handleEvaluateApplication,
    handleApproveIdCard,
    handleOpenEditCard,
    handleSaveEditCard,
    handleCardPhotoUpload,
    handleSaveSchoolInfo,
    handleSaveSignature,
    handleSavePrincipal,
    handleDeletePrincipal,
    handleSetCurrentPrincipal,
    handleSchoolLogoUpload,
    handleExportCSV,
    handleExportTeachersCSV,
    handleTeacherOnboardingSubmit,
    handleAdminSaveTeacher,
    handleEditTeacherClick,
    handleDeleteTeacherClick,
    handleDeleteStudentClick,
    handleBulkDelete,
    handleBulkApprove,
    handleBulkExport,
    handleBatchPdfDownload,
    handleProfileUpdateSubmit,
    handleSaveClass,
    handleDeleteClass,
    handleRemoveTeacherAssignmentFromClass,
    handleAdminSaveAdmin,
    handleAdminDeleteAdmin,
    handleEditStudentClick,
    handleSaveStudent,
    toggleFormClass,
    toggleFormCourse,
    handleStudentSortChange,
    handleTeacherSortChange,
    handleAnalyzeStudent,
    handleAnalyzeTeacher,
    getStudentName,
    getFilteredCommandPaletteItems,
    filteredStudents,
    sortedStudents,
    displayStudents,
    filteredAuditLogs,
    filteredTeachers,
    sortedTeachers,
    displayTeachers,
    showNotification,
  };
};
