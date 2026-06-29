import { create } from "zustand";
export const useStore = create((set) => ({
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
}));
