import React from "react";
import {
  GraduationCap,
  AlertTriangle,
  Upload,
  Clock,
  CheckCircle,
  Download,
  X,
} from "lucide-react";
import { StudentIDCard } from "../../components/StudentIDCard";
export default function StudentIdCardTab({
  lang,
  getTranslation,
  user,
  studentApplication,
  studentCard,
  idPhoto,
  photoInputRef,
  handlePhotoUpload,
  handleIdCardRequest,
  handleSavePhotoForIDCard,
  targetClass,
  principalSignature,
}) {
  return (
    <div className="space-y-8">
      {/* Card Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 bg-white text-slate-800 border-b border-slate-200 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <h3 className="font-bold text-sm uppercase tracking-wider text-slate-800">
            {getTranslation("idCardTitle", lang)}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {!studentApplication || studentApplication.status !== "approved" ? (
            <div className="text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h4 className="text-xs font-bold uppercase text-slate-700">
                {lang === "fr" ? "Accès Restreint" : "Access Restricted"}
              </h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                {lang === "fr"
                  ? "Vous ne pouvez demander une carte d'étudiant que si votre dossier d'inscription a été accepté et validé."
                  : "You can request a Student ID Card only after your school admission application is officially approved."}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-6">
                {/* Photo upload trigger */}
                {(!studentCard ||
                  !studentCard.profile_photo_url ||
                  studentCard.card_status === "pending") && (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-500 uppercase">
                      {getTranslation("uploadPhoto", lang)}
                    </label>
                    <div
                      onClick={() => photoInputRef.current?.click()}
                      className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-blue-500 hover:bg-slate-50 text-center cursor-pointer transition relative"
                    >
                      {idPhoto ? (
                        <div className="space-y-2">
                          <img
                            src={idPhoto}
                            alt="Profile Photo preview"
                            className="w-20 h-20 rounded-lg object-cover mx-auto shadow border border-slate-300"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-[10px] font-mono text-emerald-600 block">
                            ✓ photo_loaded.png
                          </span>
                        </div>
                      ) : (
                        <div className="py-2">
                          <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
                          <span className="text-[10px] text-slate-400 block">
                            Click to select portrait photo
                          </span>
                        </div>
                      )}
                      <input
                        ref={photoInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </div>

                    {idPhoto && !studentCard && (
                      <button
                        onClick={handleIdCardRequest}
                        className="w-full py-2.5 bg-blue-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition shadow cursor-pointer"
                      >
                        {getTranslation("requestID", lang)}
                      </button>
                    )}

                    {idPhoto &&
                      studentCard &&
                      !studentCard.profile_photo_url && (
                        <button
                          onClick={handleSavePhotoForIDCard}
                          className="w-full py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition shadow cursor-pointer"
                        >
                          {lang === "fr"
                            ? "Enregistrer la photo de profil"
                            : "Save & Activate ID Card Photo"}
                        </button>
                      )}
                  </div>
                )}

                {/* ID Status Tracker Info */}
                {studentCard && (
                  <div
                    className={`p-3 rounded-lg text-xs border ${
                      studentCard.card_status === "pending"
                        ? "bg-blue-50 border-blue-200 text-blue-800"
                        : "bg-emerald-50 border-emerald-200 text-emerald-800"
                    }`}
                  >
                    {studentCard.card_status === "pending" ? (
                      <p className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-4 h-4 shrink-0 animate-spin text-blue-500" />
                        <span>{getTranslation("idPendingReview", lang)}</span>
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {studentCard.profile_photo_url ? (
                          <>
                            <p className="flex items-center gap-1.5 font-bold">
                              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                              <span>
                                {getTranslation("idGeneratedSuccess", lang)}
                              </span>
                            </p>

                            {/* Print download CTA triggers Express binary stream download */}
                            <a
                              href={`/api/id-cards/download/${user.id}?lang=${lang}`}
                              download={`Student_ID_Card_${user.last_name}.pdf`}
                              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow"
                            >
                              <Download className="w-4 h-4" />
                              <span>{getTranslation("downloadPDF", lang)}</span>
                            </a>
                          </>
                        ) : (
                          <div className="space-y-2 text-left">
                            <p className="flex items-center gap-1.5 font-bold text-rose-600">
                              <X className="w-4 h-4 shrink-0" />
                              <span>
                                {lang === "fr"
                                  ? "Photo de profil requise"
                                  : "Photo Required Before Download"}
                              </span>
                            </p>
                            <p className="text-[11px] text-slate-500 leading-normal">
                              {lang === "fr"
                                ? "Veuillez téléverser votre photo de profil ci-dessus avant de pouvoir télécharger votre carte d'étudiant."
                                : "Please upload and save your profile photo above first to enable downloading your ID card."}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Live Preview Card Overlay */}
                {(idPhoto ||
                  (studentCard && studentCard.profile_photo_url)) && (
                  <div className="space-y-3">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {getTranslation("previewIDCard", lang)}
                    </label>

                    <StudentIDCard
                      lang={lang}
                      studentId={user.id}
                      firstName={user.first_name}
                      lastName={user.last_name}
                      targetClass={targetClass}
                      idPhoto={idPhoto || studentCard.profile_photo_url}
                      validUntil={studentCard?.valid_until}
                      principalSignature={principalSignature}
                      cardStatus={studentCard?.card_status}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
