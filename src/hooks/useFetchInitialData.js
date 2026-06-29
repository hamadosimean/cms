import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import { APIService } from '../services/api';

export function useFetchInitialData() {
  const {
    setAdminStats,
    setAdminApplications,
    setAdminTeachers,
    setAdminStudents,
    setAdminIdCards,
    setAdminAuditLogs,
    setClassesList,
    setSchoolInfo,
    setAdminUsers
  } = useAppStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          stats,
          applications,
          teachers,
          students,
          idCards,
          classes,
          schoolInfo,
          users,
          auditLogs
        ] = await Promise.all([
          APIService.getStats(),
          APIService.getApplications(),
          APIService.getTeachers(),
          APIService.getStudents(),
          APIService.getIDCards(),
          APIService.getClasses(),
          APIService.getSchoolInfo(),
          APIService.getUsers(),
          APIService.getAuditLogs()
        ]);
        
        setAdminStats(stats);
        setAdminApplications(applications);
        setAdminTeachers(teachers);
        setAdminStudents(students);
        setAdminIdCards(idCards);
        setClassesList(classes);
        setSchoolInfo(schoolInfo);
        setAdminUsers(users);
        setAdminAuditLogs(auditLogs);
      } catch (e) {
        console.error("Error fetching initial data", e);
      }
    };

    loadData();
  }, []); // Run once on mount
}
