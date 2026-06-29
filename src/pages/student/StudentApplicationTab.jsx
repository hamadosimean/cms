import React from "react";
import {
  FileText,
  ChevronRight,
  Check,
  Clock,
  CheckCircle,
  X,
} from "lucide-react";
export default function StudentApplicationTab({
  lang,
  getTranslation,
  wizardStep,
  setWizardStep,
  classesList,
  targetClass,
  setTargetClass,
  lastSchoolName,
  setLastSchoolName,
  lastGeneralGrade,
  setLastGeneralGrade,
  showNotification,
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
  fileInputRef1,
  fileInputRef2,
  fileInputRef3,
  handleRealFileChange,
  handleEnrollmentSubmit,
  studentApplication,
  setStudentApplication,
}) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-5 bg-white text-slate-800 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
              {getTranslation("enrollmentWizard", lang)}
            </h3>
          </div>
          <span className="font-mono text-xs text-slate-400">
            Step {wizardStep <= 3 ? wizardStep : 4} of 4
          </span>
        </div>

        {/* Step wizard indicator tracks */}
        <div className="grid grid-cols-4 border-b border-slate-100 bg-slate-50 text-center">
          {[
            { step: 1, label: getTranslation("wizardStepInfo", lang) },
            { step: 2, label: getTranslation("wizardStepDocs", lang) },
            { step: 3, label: lang === "fr" ? "Vérification" : "Verification" },
            { step: 4, label: getTranslation("wizardStepStatus", lang) },
          ].map((item) => (
            <div
              key={item.step}
              className={`py-3 text-xs font-semibold tracking-wide border-r border-slate-100 last:border-0 transition duration-150 ${
                wizardStep === item.step
                  ? "bg-blue-50 text-blue-800 font-bold"
                  : wizardStep > item.step
                    ? "text-emerald-700 bg-emerald-50/50"
                    : "text-slate-400"
              }`}
            >
              <span className="inline-block mr-1">
                {wizardStep > item.step ? "✓" : item.step}.
              </span>
              {item.label}
            </div>
          ))}
        </div>

        {/* Wizard Step Forms */}
        <div className="p-6 sm:p-8">
          {wizardStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {getTranslation("targetClass", lang)}
                  </label>
                  <select
                    value={targetClass}
                    onChange={(e) => setTargetClass(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  >
                    {classesList.length > 0 ? (
                      classesList.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Grade 10-A">
                          Grade 10-A (Secondary Core)
                        </option>
                        <option value="Grade 10-B">
                          Grade 10-B (Language Core)
                        </option>
                        <option value="Grade 11-A">
                          Grade 11-A (Advanced Maths)
                        </option>
                        <option value="Grade 11-B">
                          Grade 11-B (Sciences focus)
                        </option>
                        <option value="Grade 12-A">
                          Grade 12-A (Post-Matric Physics)
                        </option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
                    {getTranslation("lastSchoolName", lang)}
                  </label>
                  <input
                    type="text"
                    required
                    value={lastSchoolName}
                    onChange={(e) => setLastSchoolName(e.target.value)}
                    placeholder="e.g. Lycée National de Paris"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  {getTranslation("lastGeneralGrade", lang)}
                </label>
                <span className="text-[10px] text-blue-600 block mb-2">
                  {getTranslation("gradeHelp", lang)}
                </span>
                <div className="relative max-w-xs">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.01"
                    required
                    value={lastGeneralGrade}
                    onChange={(e) => setLastGeneralGrade(e.target.value)}
                    placeholder="e.g. 14.50"
                    className="w-full pl-3.5 pr-12 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 transition font-mono"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                    / 20
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => {
                    if (!lastSchoolName || !lastGeneralGrade) {
                      showNotification(
                        "Please fill in prior academic details to advance.",
                        "error",
                      );
                      return;
                    }
                    const g = parseFloat(lastGeneralGrade);
                    if (isNaN(g) || g < 0 || g > 20) {
                      showNotification(
                        "Grade must be between 0.00 and 20.00",
                        "error",
                      );
                      return;
                    }
                    setWizardStep(2);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 touch-manipulation min-h-11"
                >
                  <span>Next: Document Upload</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div className="space-y-6">
              <p className="text-xs text-slate-500 italic">
                {lang === "fr"
                  ? "Téléchargez vos fichiers requis. Glissez-déposez un fichier ou cliquez sur chaque boîte pour téléverser votre relevé de notes certifié, un reçu des frais scolaires, et une lettre de recommandation."
                  : "Onboard your core credentials. Drag & drop files or click on each section below to upload your physical credentials for transcript files, payment receipts, and recommendation letters."}
              </p>

              {/* Hidden Real File Inputs */}
              <input
                type="file"
                ref={fileInputRef1}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleRealFileChange(
                    "transcript",
                    e.target.files?.[0] || null,
                  )
                }
              />
              <input
                type="file"
                ref={fileInputRef2}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleRealFileChange("receipt", e.target.files?.[0] || null)
                }
              />
              <input
                type="file"
                ref={fileInputRef3}
                className="hidden"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={(e) =>
                  handleRealFileChange("recLetter", e.target.files?.[0] || null)
                }
              />

              {/* Upload blocks */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Transcript upload */}
                <div
                  onClick={() => fileInputRef1.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingTranscript(true);
                  }}
                  onDragLeave={() => setIsDraggingTranscript(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingTranscript(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleRealFileChange("transcript", file);
                  }}
                  className={`p-4 rounded-xl border-2 border-dashed text-center cursor-pointer transition ${
                    isDraggingTranscript
                      ? "border-blue-500 bg-blue-50/50"
                      : transcriptFile
                        ? "border-emerald-300 bg-emerald-50/30"
                        : "border-slate-200 hover:border-blue-500/50 hover:bg-slate-50/50"
                  }`}
                >
                  <FileText
                    className={`w-8 h-8 mx-auto mb-2 ${transcriptFile ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  <span className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation("transcriptFile", lang)}
                  </span>
                  {transcriptFile ? (
                    <div className="text-[10px] text-emerald-800 font-mono break-all mt-1 bg-white px-2 py-1 rounded border border-emerald-100 flex items-center justify-between">
                      <span>{transcriptFile}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {isDraggingTranscript
                        ? lang === "fr"
                          ? "Déposez le fichier ici..."
                          : "Drop file here..."
                        : getTranslation("dragAndDrop", lang)}
                    </span>
                  )}
                </div>

                {/* Payment Receipt */}
                <div
                  onClick={() => fileInputRef2.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingReceipt(true);
                  }}
                  onDragLeave={() => setIsDraggingReceipt(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingReceipt(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleRealFileChange("receipt", file);
                  }}
                  className={`p-4 rounded-xl border-2 border-dashed text-center cursor-pointer transition ${
                    isDraggingReceipt
                      ? "border-blue-500 bg-blue-50/50"
                      : receiptFile
                        ? "border-emerald-300 bg-emerald-50/30"
                        : "border-slate-200 hover:border-blue-500/50 hover:bg-slate-50/50"
                  }`}
                >
                  <FileText
                    className={`w-8 h-8 mx-auto mb-2 ${receiptFile ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  <span className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation("receiptFile", lang)}
                  </span>
                  {receiptFile ? (
                    <div className="text-[10px] text-emerald-800 font-mono break-all mt-1 bg-white px-2 py-1 rounded border border-emerald-100 flex items-center justify-between">
                      <span>{receiptFile}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {isDraggingReceipt
                        ? lang === "fr"
                          ? "Déposez le fichier ici..."
                          : "Drop file here..."
                        : getTranslation("dragAndDrop", lang)}
                    </span>
                  )}
                </div>

                {/* Recommendation Letter */}
                <div
                  onClick={() => fileInputRef3.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingRecLetter(true);
                  }}
                  onDragLeave={() => setIsDraggingRecLetter(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingRecLetter(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleRealFileChange("recLetter", file);
                  }}
                  className={`p-4 rounded-xl border-2 border-dashed text-center cursor-pointer transition ${
                    isDraggingRecLetter
                      ? "border-blue-500 bg-blue-50/50"
                      : recommendationFile
                        ? "border-emerald-300 bg-emerald-50/30"
                        : "border-slate-200 hover:border-blue-500/50 hover:bg-slate-50/50"
                  }`}
                >
                  <FileText
                    className={`w-8 h-8 mx-auto mb-2 ${recommendationFile ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  <span className="block text-xs font-bold text-slate-700 mb-1">
                    {getTranslation("recommendationFile", lang)}
                  </span>
                  {recommendationFile ? (
                    <div className="text-[10px] text-emerald-800 font-mono break-all mt-1 bg-white px-2 py-1 rounded border border-emerald-100 flex items-center justify-between">
                      <span>{recommendationFile}</span>
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-400 block mt-1">
                      {isDraggingRecLetter
                        ? lang === "fr"
                          ? "Déposez le fichier ici..."
                          : "Drop file here..."
                        : getTranslation("dragAndDrop", lang)}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => setWizardStep(1)}
                  className="px-5 py-2 text-xs font-semibold uppercase text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (
                      !transcriptFile ||
                      !receiptFile ||
                      !recommendationFile
                    ) {
                      showNotification(
                        lang === "fr"
                          ? "Tous les fichiers requis doivent être joints."
                          : "All three required document categories must be uploaded.",
                        "error",
                      );
                      return;
                    }
                    setWizardStep(3);
                  }}
                  className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 touch-manipulation shadow-md cursor-pointer"
                >
                  <span>Next: Review Info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review and Verify Info */}
          {wizardStep === 3 && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
                {lang === "fr"
                  ? "Veuillez relire attentivement vos informations avant de soumettre. Une fois soumis, votre dossier ne pourra plus être modifié."
                  : "Please review your details carefully before submitting. Once sent, you will not be able to modify your application during administrative screening."}
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-150 bg-slate-50/50">
                <div className="px-5 py-4 grid grid-cols-3 gap-4 text-xs">
                  <span className="font-bold text-slate-500 uppercase">
                    {getTranslation("targetClass", lang)}
                  </span>
                  <span className="col-span-2 text-slate-800 font-semibold">
                    {targetClass}
                  </span>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 text-xs">
                  <span className="font-bold text-slate-500 uppercase">
                    {getTranslation("lastSchoolName", lang)}
                  </span>
                  <span className="col-span-2 text-slate-800 font-semibold">
                    {lastSchoolName}
                  </span>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 text-xs">
                  <span className="font-bold text-slate-500 uppercase">
                    {getTranslation("lastGeneralGrade", lang)}
                  </span>
                  <span className="col-span-2 text-slate-800 font-mono font-bold">
                    {lastGeneralGrade} / 20
                  </span>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 text-xs">
                  <span className="font-bold text-slate-500 uppercase">
                    {getTranslation("transcriptFile", lang)}
                  </span>
                  <span className="col-span-2 text-emerald-800 font-mono break-all bg-emerald-50/30 px-2 py-0.5 rounded border border-emerald-155 w-fit">
                    {transcriptFile}
                  </span>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 text-xs">
                  <span className="font-bold text-slate-500 uppercase">
                    {getTranslation("receiptFile", lang)}
                  </span>
                  <span className="col-span-2 text-emerald-800 font-mono break-all bg-emerald-50/30 px-2 py-0.5 rounded border border-emerald-155 w-fit">
                    {receiptFile}
                  </span>
                </div>
                <div className="px-5 py-4 grid grid-cols-3 gap-4 text-xs">
                  <span className="font-bold text-slate-500 uppercase">
                    {getTranslation("recommendationFile", lang)}
                  </span>
                  <span className="col-span-2 text-emerald-800 font-mono break-all bg-emerald-50/30 px-2 py-0.5 rounded border border-emerald-155 w-fit">
                    {recommendationFile}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-between">
                <button
                  onClick={() => setWizardStep(2)}
                  className="px-5 py-2 text-xs font-semibold uppercase text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleEnrollmentSubmit}
                  className="px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 touch-manipulation shadow-md cursor-pointer"
                >
                  <span>{getTranslation("submitApplication", lang)}</span>
                </button>
              </div>
            </div>
          )}

          {wizardStep === 4 && studentApplication && (
            <div className="space-y-6">
              {/* Main Admission Notification Card based on Evaluated Status */}
              {studentApplication.status === "pending" && (
                <div className="p-6 bg-blue-50/50 border border-blue-200 rounded-xl text-blue-900 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 animate-pulse">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide">
                        {getTranslation("statusPending", lang)}
                      </h4>
                      <p className="text-xs text-blue-800 mt-0.5">
                        {getTranslation("pendingMessage", lang)}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/70 rounded-lg text-xs space-y-2 text-slate-700">
                    <p>
                      <strong>Target Grade:</strong>{" "}
                      {studentApplication.target_class}
                    </p>
                    <p>
                      <strong>Previous School:</strong>{" "}
                      {studentApplication.last_school_name}
                    </p>
                    <p>
                      <strong>Academic Score:</strong>{" "}
                      {studentApplication.last_general_grade} / 20
                    </p>
                  </div>
                </div>
              )}

              {studentApplication.status === "approved" && (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide">
                        {getTranslation("statusApproved", lang)}
                      </h4>
                      <p className="text-xs text-emerald-800 mt-0.5">
                        {getTranslation("congratsMessage", lang)}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-white/75 rounded-lg text-xs space-y-2 text-slate-700">
                    <p>
                      <strong>Admitted To:</strong>{" "}
                      {studentApplication.target_class}
                    </p>
                    <p>
                      <strong>Matricule ID:</strong>{" "}
                      {studentApplication.student_id.toUpperCase()}
                    </p>
                    <p>
                      <strong>Official Academic Score:</strong>{" "}
                      {studentApplication.last_general_grade} / 20
                    </p>
                  </div>
                </div>
              )}

              {studentApplication.status === "rejected" && (
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-600">
                      <X className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm uppercase tracking-wide">
                        {getTranslation("statusRejected", lang)}
                      </h4>
                      <p className="text-xs text-rose-800 mt-0.5">
                        Your application has been declined during screening.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-rose-100">
                    <span className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                      {getTranslation("rejectionReasonLabel", lang)}
                    </span>
                    <p className="text-xs text-slate-800 font-medium italic">
                      "{studentApplication.rejection_reason}"
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setStudentApplication(null);
                      setWizardStep(1);
                      setLastSchoolName("");
                      setLastGeneralGrade("");
                      setTranscriptFile(null);
                      setReceiptFile(null);
                      setRecommendationFile(null);
                    }}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Re-Submit Fresh Application
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
