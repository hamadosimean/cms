import React from "react";
import { FileText, ImageIcon } from "lucide-react";
import { useAppStore } from "../../store/useAppStore";
import { getTranslation } from "../../translations";
export default function AdmissionsTab({
  lang,
  getStudentName,
  showNotification,
  handleEvaluateApplication,
  selectedApplication,
  setSelectedApplication,
  rejectionReason,
  setRejectionReason,
}) {
  const { adminApplications, setViewingDocument } = useAppStore();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Admissions Screening requests Table (Left 2 cols) */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {getTranslation("applicantsTable", lang)}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">
                  {getTranslation("studentName", lang)}
                </th>
                <th className="p-4">Target Class</th>
                <th className="p-4">{getTranslation("grade", lang)}</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right pr-6">
                  {getTranslation("actions", lang)}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {adminApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/50 transition">
                  <td className="p-4 pl-6 font-semibold text-slate-800">
                    {getStudentName(app.student_id)}
                  </td>
                  <td className="p-4 text-slate-500 font-mono text-xs">
                    {app.target_class}
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-700">
                    {app.last_general_grade} / 20
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        app.status === "approved"
                          ? "bg-emerald-50 text-emerald-700"
                          : app.status === "rejected"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {app.status === "approved"
                        ? lang === "fr"
                          ? "Admis"
                          : "Approved"
                        : app.status === "rejected"
                          ? lang === "fr"
                            ? "Refusé"
                            : "Rejected"
                          : lang === "fr"
                            ? "En examen"
                            : "Pending"}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setRejectionReason(app.rejection_reason || "");
                      }}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white transition duration-150 min-h-11"
                    >
                      {getTranslation("viewDetails", lang)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Evaluation Actions Panel / Dialog card */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Admissions Screening Panel
          </h4>

          {selectedApplication ? (
            <div className="space-y-5 text-left">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                <p className="text-sm font-bold text-slate-800">
                  {getStudentName(selectedApplication.student_id)}
                </p>
                <p className="text-xs text-slate-500">
                  <strong>Prior School:</strong>{" "}
                  {selectedApplication.last_school_name}
                </p>
                <p className="text-xs text-slate-500">
                  <strong>GPA Score:</strong>{" "}
                  <span className="font-mono font-bold text-slate-800">
                    {selectedApplication.last_general_grade} / 20
                  </span>
                </p>
              </div>

              {/* Action links to simulated physical files */}
              <div className="space-y-2">
                <span className="block text-[10px] font-bold text-slate-400 uppercase">
                  Uploaded Documents
                </span>
                <div className="space-y-1.5">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewingDocument(
                        selectedApplication.transcript_file_name,
                      );
                    }}
                    className="block text-xs text-blue-600 hover:underline flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="truncate">
                      {selectedApplication.transcript_file_name}
                    </span>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewingDocument(
                        selectedApplication.payment_receipt_name,
                      );
                    }}
                    className="block text-xs text-blue-600 hover:underline flex items-center gap-1.5"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span className="truncate">
                      {selectedApplication.payment_receipt_name}
                    </span>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewingDocument(
                        selectedApplication.recommendation_letter_name,
                      );
                    }}
                    className="block text-xs text-blue-600 hover:underline flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="truncate">
                      {selectedApplication.recommendation_letter_name}
                    </span>
                  </a>
                </div>
              </div>

              {/* Rejection input */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-500 uppercase">
                  {getTranslation("rejectionReasonLabel", lang)}
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder={getTranslation("writeRejectionReason", lang)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 text-xs min-h-20 focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                />
              </div>

              {/* Review buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleEvaluateApplication("approved")}
                  className="py-2.5 px-3 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleEvaluateApplication("rejected")}
                  className="py-2.5 px-3 bg-rose-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-rose-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              <FileText className="w-8 h-8 mx-auto mb-2 text-slate-300" />
              <p>
                Select a student applicant from the admissions registry to start
                the evaluation workflow.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
