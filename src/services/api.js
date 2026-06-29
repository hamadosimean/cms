/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * Custom Error for API calls to preserve status code and structured errors.
 */
// Intercept fetch calls to append authentication tokens automatically
if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    window.fetch = async (url, options = {}) => {
        const token = localStorage.getItem('school_auth_token');
        if (token && typeof url === 'string' && url.startsWith('/api')) {
            options.headers = {
                ...options.headers,
                'Authorization': `Bearer ${token}`,
            };
        }
        return originalFetch(url, options);
    };
}

export class APIError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.name = 'APIError';
        this.status = status;
    }
}
/**
 * Helper to handle fetch responses and handle non-OK statuses gracefully.
 */
async function handleResponse(response) {
    if (!response.ok) {
        let errMsg = 'An unexpected error occurred';
        try {
            const errData = await response.json();
            errMsg = errData.message || errData.error || errMsg;
        }
        catch {
            // Ignore if parsing fails
        }
        throw new APIError(errMsg, response.status);
    }
    return response.json();
}
export const APIService = {
    // --- AUTH SERVICES ---
    async getProfile() {
        const res = await fetch('/api/auth/profile');
        return handleResponse(res);
    },
    async login(email, role) {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, role }),
        });
        return handleResponse(res);
    },
    async register(data) {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
    // --- APPLICATION SERVICES ---
    async getApplications() {
        const res = await fetch('/api/applications');
        return handleResponse(res);
    },
    async getApplicationByStudent(studentId) {
        const res = await fetch(`/api/applications?student_id=${studentId}`);
        return handleResponse(res);
    },
    async createApplication(data) {
        const res = await fetch('/api/applications', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
    async evaluateApplication(id, evaluation) {
        const res = await fetch(`/api/applications/${id}/evaluate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(evaluation),
        });
        return handleResponse(res);
    },
    // --- ID CARD SERVICES ---
    async getIDCards() {
        const res = await fetch('/api/id-cards');
        return handleResponse(res);
    },
    async requestIDCard(studentId) {
        const res = await fetch('/api/id-cards/request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student_id: studentId }),
        });
        return handleResponse(res);
    },
    async updateIDCardPhoto(cardId, photoBase64) {
        const res = await fetch('/api/id-cards/update-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ card_id: cardId, profile_photo_url: photoBase64 }),
        });
        return handleResponse(res);
    },
    async approveIDCard(cardId, customExpiry) {
        const res = await fetch(`/api/id-cards/${cardId}/approve`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valid_until: customExpiry }),
        });
        return handleResponse(res);
    },
    async updateIDCardValidity(cardId, validUntil) {
        const res = await fetch(`/api/id-cards/${cardId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ valid_until: validUntil }),
        });
        return handleResponse(res);
    },
    // --- INSTITUTION & STATS SERVICES ---
    async getStats() {
        const res = await fetch('/api/stats');
        return handleResponse(res);
    },
    async getAuditLogs() {
        const res = await fetch('/api/audit-logs');
        return handleResponse(res);
    },
    async getSchoolInfo() {
        const res = await fetch('/api/school-info');
        return handleResponse(res);
    },
    async saveSchoolInfo(data) {
        const res = await fetch('/api/school-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
    async getPrincipalSignature() {
        const res = await fetch('/api/principal/signature');
        return handleResponse(res);
    },
    async savePrincipalSignature(signatureBase64) {
        const res = await fetch('/api/principal/signature', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ signature: signatureBase64 }),
        });
        return handleResponse(res);
    },
    // --- CLASSES & ACADEMICS ---
    async getClasses() {
        const res = await fetch('/api/classes');
        return handleResponse(res);
    },
    async createClass(classData) {
        const res = await fetch('/api/classes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classData),
        });
        return handleResponse(res);
    },
    async updateClass(id, classData) {
        const res = await fetch(`/api/classes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classData),
        });
        return handleResponse(res);
    },
    async deleteClass(id) {
        const res = await fetch(`/api/classes/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    },
    // --- USER/PEOPLE MANAGEMENT ---
    async getTeachers() {
        const res = await fetch('/api/teachers');
        return handleResponse(res);
    },
    async getStudents() {
        const res = await fetch('/api/students');
        return handleResponse(res);
    },
    async getUsers() {
        const res = await fetch('/api/users');
        return handleResponse(res);
    },
    async getAdmins() {
        const res = await fetch('/api/admins');
        return handleResponse(res);
    },
    async createAdmin(data) {
        const res = await fetch('/api/admins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
    async deleteAdmin(id) {
        const res = await fetch(`/api/admins/${id}`, {
            method: 'DELETE',
        });
        return handleResponse(res);
    },
    // --- TEACHER PROFILE SERVICES ---
    async getTeacherProfile(teacherId) {
        const res = await fetch(`/api/teachers/${teacherId}`);
        return handleResponse(res);
    },
    async saveTeacherProfile(teacherId, profile) {
        const res = await fetch(`/api/teachers/${teacherId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
        });
        return handleResponse(res);
    },
    async createTeacherProfile(profile) {
        const res = await fetch('/api/teachers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
        });
        return handleResponse(res);
    },
    // --- GEMINI INTELLIGENT AGENT ASSISTANCE ---
    async analyzeStudent(studentId, requesterId) {
        const res = await fetch(`/api/students/${studentId}?requester_id=${requesterId}`);
        const data = await handleResponse(res);
        const analysisRes = await fetch('/api/gemini/analyze-student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ student: data.student }),
        });
        return handleResponse(analysisRes);
    },
    async analyzeTeacher(teacherId, requesterId) {
        const res = await fetch(`/api/teachers/${teacherId}?requester_id=${requesterId}`);
        const data = await handleResponse(res);
        const analysisRes = await fetch('/api/gemini/analyze-teacher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ teacher: data.teacher, profile: data.profile }),
        });
        return handleResponse(analysisRes);
    }
};
